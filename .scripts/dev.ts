/**
 * $ vite-node .scripts/setup-dev.ts
 *
 * This script is used to setup the local development environment.
 */
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const uiRootPath = path.resolve(__dirname, '../../bspk-ui');
const demoRootPath = path.resolve(__dirname, '../');

// ensure the bspk-ui is where we expect it

if (!fs.existsSync(uiRootPath)) {
    throw new Error(`bspk-ui not found at ${uiRootPath}`);
}

const version = execSync('npm view @bspk/ui version', { encoding: 'utf-8' }).trim();

execSync(
    [
        // add package json to the bspk-ui/src so we can link to src
        `cd "${uiRootPath}"`,
        `echo '{ "name": "@bspk/ui", "version": "${version}" }' > 'src/package.json'`,
        // run npm link in bspk-ui/src
        `cd "${uiRootPath}/src"`,
        `npm link`,
        // run npm link @bspk/ui in the demo repo
        `cd "${demoRootPath}"`,
        `npm link @bspk/ui`,
    ].join(' && '),
    {
        stdio: 'inherit',
    },
);

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
