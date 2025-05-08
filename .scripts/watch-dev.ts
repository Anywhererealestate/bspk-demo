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

const filesToWatch: [string, () => void][] = [
    [
        path.resolve(__dirname, 'changelog.ts'),
        () => {
            execSync('npm run changelog', { stdio: 'inherit' });
        },
    ],

    [
        path.resolve(__dirname, '../../bspk-ui/src'),
        () => {
            console.warn('bspk-ui/src changed');
        },
    ],
    [
        path.resolve(__dirname, '../../bspk-ui/src/styles/base.css'),
        () => {
            console.log('generateBaseStyleExport');
            generateBaseStyleExport();
        },
    ],
    [
        path.resolve(__dirname, './create-meta.tsx'),
        () => {
            execSync('npm run meta', { stdio: 'inherit' });
        },
    ],
    [
        path.resolve(__dirname, '../src/componentPhases.ts'),
        () => {
            console.warn('componentPhases changed');
        },
    ],
];

const filesBeingWatched: string[] = [];

filesToWatch.forEach(([file, callback]) => {
    if (!fs.existsSync(file)) {
        console.error(`File ${file} does not exist.`);
        return;
    }
    filesBeingWatched.push(file);

    fs.watchFile(file, { interval: 2000 }, (curr, prev) => {
        if (curr.mtime !== prev.mtime) {
            console.log(`File ${file} was changed`);
            try {
                callback();
            } catch (error) {
                console.error(`Error executing callback for ${file}:`, error);
            }
        }
    });
});

console.info(`Watching files:`, filesBeingWatched);

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */