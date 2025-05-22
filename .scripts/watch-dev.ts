/**
 * $ vite-node .scripts/watch-dev.ts
 *
 * This script is used to setup the local development environment.
 *
 * It is similar to the prod-test script, but it uses the local version of the UI library.
 */
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const localUIPath = path.resolve(__dirname, '../../bspk-ui');

interface FileWatchConfig {
    watchPath: string;
    callback: () => void;
    ignore?: (file: string) => boolean;
}

const filesToWatch: FileWatchConfig[] = [
    {
        watchPath: path.resolve(localUIPath, 'src'),
        callback: () => {
            execSync(`npm run meta`, { stdio: 'inherit' });
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

filesToWatch.forEach(({ watchPath, ignore }) => {
    if (!fs.existsSync(watchPath)) {
        console.error(`File ${watchPath} does not exist.`);
        return;
    }

    filesBeingWatched.push(watchPath);

    if (fs.lstatSync(watchPath).isDirectory()) {
        fs.watch(watchPath, { recursive: true }, (_, fileName) => {
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
        return;
    }

    fs.watchFile(watchPath, { interval: 2000 }, (curr, prev) => {
        if (curr.mtime !== prev.mtime) {
            console.log(`File ${watchPath} was changed`);
            try {
                queueCallback(watchPath);
            } catch (error) {
                console.error(`Error executing callback for ${watchPath}:`, error);
            }
        }
    });
});

console.info(`Watching files:`, filesBeingWatched);

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
