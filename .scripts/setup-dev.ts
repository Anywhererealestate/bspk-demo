/**
 * $ vite-node .scripts/setup-dev.ts
 *
 * This script is used to setup the local development environment.
 *
 * It is similar to the prod-test script, but it uses the local version of the UI library.
 */
import fs from 'fs';

import packageJson from '../package.json';

import { Command, runCommands } from './utils';

const commands: Command[] = [
    // SUPPORT icons later
    // uninstall local package and install the latest version
    // 'npm uninstall @bspk/icons',

    'echo "uninstalling @bspk/ui and referencing local repo... "',
    'npm uninstall @bspk/ui --force',
    () => {
        const newPackage = { ...packageJson };
        newPackage['dependencies']['@bspk/ui'] = 'file:../bspk-ui/src';
        fs.writeFileSync('./package.json', JSON.stringify(newPackage, null, 2));
        return [];
    },
    'npm install --force',
];

const prodInstalled = !packageJson.dependencies['@bspk/ui'].startsWith('file:');

runCommands(!prodInstalled ? ['echo "dev already installed"'] : commands);

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */