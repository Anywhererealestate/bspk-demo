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

import { generateBaseStyleExport } from '../../bspk-ui/.scripts/utils';

interface FileWatchConfig {
    watchPath: string;
    callback: () => void;
    ignores?: string[];
}

const filesToWatch: FileWatchConfig[] = [
    {
        watchPath: path.resolve(__dirname, '../../bspk-ui/src'),
        callback: () => {
            const uiRoot = path.resolve(__dirname, '../../bspk-ui');
            execSync(`cd "${uiRoot}" && npm run meta`, { stdio: 'inherit' });
        },
        ignores: ['meta.ts', 'base.css'],
    },
    {
        watchPath: path.resolve(__dirname, '../../bspk-ui/src/styles/base.css'),
        callback: () => {
            console.log('generateBaseStyleExport');
            generateBaseStyleExport();
        },
    },
    {
        watchPath: path.resolve(__dirname, './create-meta.tsx'),
        callback: () => {
            execSync('npm run meta', { stdio: 'inherit' });
        },
    },
];

const filesBeingWatched: string[] = [];

filesToWatch.forEach(({ watchPath, callback, ignores }) => {
    if (!fs.existsSync(watchPath)) {
        console.error(`File ${watchPath} does not exist.`);
        return;
    }

    filesBeingWatched.push(watchPath);

    if (fs.lstatSync(watchPath).isDirectory()) {
        fs.watch(watchPath, { recursive: true }, (_, fileName) => {
            console.log(`Directory ${watchPath} was changed`);

            console.log(`File ${fileName} was changed in ${watchPath}`, ignores);

            if (ignores?.some((ignore) => fileName?.includes(ignore))) {
                console.log(`Ignoring file ${fileName} in ${watchPath}`);
                return;
            } else {
                console.log(`File ${fileName} was changed in ${watchPath} not ignored`);
            }
            try {
                callback();
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
                callback();
            } catch (error) {
                console.error(`Error executing callback for ${watchPath}:`, error);
            }
        }
    });
});

console.info(`Watching files:`, filesBeingWatched);

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
