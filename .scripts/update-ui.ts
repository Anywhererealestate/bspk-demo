/**
 * $ vite-node .scripts/setup-prod.ts
 *
 * This script is used to test the production build of the project.
 *
 * It is similar to the dev-setup script, but it uses the production version of the UI library.
 */
import { execSync } from 'child_process';

import packageJson from '../package.json';

import { Command, runCommands } from './utils';

const commands: Command[] = [
    // SUPPORT icons later
    // uninstall local package and install the latest version
    // 'npm uninstall @icons/local',
    // 'npm install @bspk/icons',

    'npm uninstall @bspk/ui',
    `echo "installing @bspk/ui from artifactory..."`,
    'npm install @bspk/ui@latest',
];

const latestVersionPublished = execSync('npm view @bspk/ui version', { encoding: 'utf-8' }).trim();
const versionInstalled = packageJson.dependencies['@bspk/ui']?.replace('^', '') || '';

if (versionInstalled === latestVersionPublished) {
    console.info('production already installed');
    process.exit(0);
}

if (versionInstalled.startsWith('file:')) console.info('echo "uninstalling @bspk/ui local"');
else console.info('echo "updating @bspk/ui version"');

runCommands(commands);

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */