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
/**
 * Ensure the bspk-ui is where we expect it.
 *
 * Checks if the bspk-ui package is present at the expected location.
 */
if (!fs.existsSync(uiRootPath)) {
    throw new Error(`bspk-ui not found at ${uiRootPath}`);
}

const args = process.argv.slice(2);

const updateMeta = !args.includes('no-meta');

if (updateMeta) execSync(`npm run meta`, { stdio: 'inherit' });

/**
 * Set up the local development environment by linking the bspk-ui package to src folder with a package.json
 *
 * This allows the demo project to use the local version of bspk-ui without needing to build it first.
 */
execSync(
    [
        // add package json to the bspk-ui/src so we can link to src
        `cd "${uiRootPath}/src"`,
        `echo '${JSON.stringify(createPackageJson(), null, '\t')}' > 'package.json'`,
        `npm link`,
        // run npm link @bspk/ui in the demo repo
        `cd "${demoRootPath}"`,
        `npm link @bspk/ui`,
    ].join(' && '),
    {
        stdio: 'inherit',
    },
);

/**
 * Ensures that the linking worked.
 *
 * Checks if the linked path for @bspk/ui is correct and points to the expected location.
 */
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

/**
 * Runs the search index generation script and starts the Vite development server.
 *
 * This script generates the search index for the BSPK UI components and then starts the Vite server.
 */

execSync(
    [
        `vite-node ./.scripts/search-index.ts`,
        `rm -rf node_modules/.vite`,
        `UPDATE_META=${updateMeta} vite dev --force --open`,
    ].join(' && '),
    {
        stdio: 'inherit',
    },
);

function createPackageJson() {
    const version = execSync('npm view @bspk/ui version', { encoding: 'utf-8' }).trim();

    const packageFile: any = {
        name: '@bspk/ui',
        version: `${version}`,
        exports: {
            './*': './*.ts',
            '.': './index.ts',
        },
    };

    fs.readdirSync(path.resolve(uiRootPath, './src/components'), { withFileTypes: true }).forEach((dirent) => {
        if (!dirent.isDirectory() || dirent.name.startsWith('.')) return;
        packageFile.exports[`./${dirent.name}/*`] = `./components/${dirent.name}/*.tsx`;
        packageFile.exports[`./${dirent.name}`] = `./components/${dirent.name}/index.tsx`;
    });

    return packageFile;
}
