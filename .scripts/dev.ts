/**
 * $ vite-node .scripts/setup-dev.ts
 *
 * This script is used to setup the local development environment.
 */
import { execSync, spawn } from 'child_process';
import fs from 'fs';
import path from 'path';

const uiRootPath = path.resolve(__dirname, '../../bspk-ui');
const demoRootPath = path.resolve(__dirname, '../');

// ensure the bspk-ui is where we expect it

if (!fs.existsSync(uiRootPath)) {
    throw new Error(`bspk-ui not found at ${uiRootPath}`);
}

const version = execSync('npm view @bspk/ui version', { encoding: 'utf-8' }).trim();

// add package json to the bspk-ui/src so we can link to src

fs.writeFileSync(
    path.join(uiRootPath, 'src/package.json'),
    `${JSON.stringify(
        {
            name: '@bspk/ui',
            version,
        },
        null,
        4,
    )}\n`,
);

// run npm link in bspk-ui/src

execSync(`cd "${uiRootPath}/src" && npm link`, { stdio: 'inherit' });

// run npm link @bspk/ui in this repo

execSync(`cd "${demoRootPath}" && npm link @bspk/ui`, { stdio: 'inherit' });

// ensures that the linking worked

const linkedPath = execSync('npm ls --depth=0')
    .toString()
    .match(/@bspk\/ui@.* -> (.*)/)?.[1];

if (!linkedPath)
    throw new Error(
        `Could not find linked path (${linkedPath}) for @bspk/ui. Please run npm link @bspk/ui in the demo repo. uiRoot: ${uiRootPath}`,
    );

if (linkedPath.endsWith('./../bspk-ui/src')) {
    console.log(`Your local development environment is already setup!`);
} else {
    const absolutePath = path.resolve(__dirname, '../', linkedPath);

    if (!fs.existsSync(absolutePath)) {
        throw new Error(`Linked path ${absolutePath} does not exist. Please run npm link @bspk/ui in the demo repo.`);
    }

    console.log(`Your local development environment is setup! UI is pointing to: "${absolutePath}"`);
}

function runDevVite() {
    let watcher;
    try {
        spawn('npm', ['run', 'dev:vite'], { stdio: 'inherit' });
        watcher = watchFiles();
    } catch (error) {
        console.error('Error running dev:vite:', error);

        console.error('Please check your local UI changes.');

        const count = 0;
        const interval = setInterval(() => {
            if (count > 5) {
                clearInterval(interval);
                return;
            }
            process.stdout.write('\r\x1b[K');
            process.stdout.write(`Restating in ${5 - count} seconds.`);
        }, 1000);

        watcher?.close();

        setTimeout(() => runDevVite(), 6000);
    }
}

runDevVite();

function watchFiles() {
    const localUIPath = path.resolve(__dirname, '../../bspk-ui');

    const filesToWatch: {
        watchPath: string;
        callback: () => void;
        ignore?: (file: string) => boolean;
    }[] = [
        {
            watchPath: path.resolve(localUIPath, 'src'),
            callback: () => {
                execSync('npx tsx ./.scripts/tasks/runMetaLocally.ts', { stdio: 'inherit' });
            },
            ignore: (file) => file.endsWith('.scss'),
        },
    ];

    const filesBeingWatched: string[] = [];

    const queueTimeouts: Record<string, ReturnType<typeof setTimeout>> = {};

    const queueCallback = (watchPath: string) => {
        if (queueTimeouts[watchPath]) clearTimeout(queueTimeouts[watchPath]);

        queueTimeouts[watchPath] = setTimeout(() => {
            filesToWatch.find((file) => file.watchPath === watchPath)?.callback();
            delete queueTimeouts[watchPath];
        }, 1000);
    };

    let watchers: fs.FSWatcher[] = [];

    let close = () => {
        watchers.forEach((w) => w.close());
        Object.values(queueTimeouts).forEach((timeout) => clearTimeout(timeout));
        console.info(`Stopped watching files:`, filesBeingWatched);
    };

    try {
        watchers = filesToWatch.flatMap(({ watchPath, ignore }) => {
            if (!fs.existsSync(watchPath)) {
                console.error(`File ${watchPath} does not exist.`);
                return [];
            }

            filesBeingWatched.push(watchPath);

            return fs.watch(watchPath, { recursive: true }, (_, fileName) => {
                // console.log(`Directory ${watchPath} was changed`);

                if (!fileName || ignore?.(fileName)) {
                    // console.log(`Ignoring file ${fileName} in ${watchPath}`);
                    return;
                }

                // console.log(`File ${fileName} was changed in ${watchPath} not ignored`);

                try {
                    queueCallback(watchPath);
                } catch (error) {
                    console.error(`Error executing callback for ${watchPath}:`, error);
                }
            });
        });
    } catch (error) {
        console.error(`Error watching files:`, error);
        console.error(`Please check your local UI changes.`);
        close();
        close = watchFiles().close;
    }

    console.info(`Watching files:`, filesBeingWatched);

    watchers.forEach((watcher) => {
        watcher.on('error', (error) => {
            console.error(`Error watching file:`, error);
            close();
            close = watchFiles().close;
        });
    });

    return {
        close,
    };
}
