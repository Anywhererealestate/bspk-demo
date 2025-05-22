import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import readline from 'node:readline';

import packageJson from 'package.json';

const menu = [
    {
        item: 1,
        description: '(Local) Run the @bspk/ui meta generation script',
        name: 'runMetaLocally',
        callback: runMetaLocally,
    },
    {
        item: 2,
        description: 'Report missing CSS variables',
        name: 'reportMissingVariables',
        callback: reportMissingVariables,
    },
    {
        item: 3,
        description: 'Ensure latest version of @bspk/ui is installed',
        name: 'ensureLatestUIVersion',
        callback: ensureLatestUIVersion,
    },
    {
        item: 4,
        description: 'Run the @bspk/ui meta generation script',
        name: 'runMeta',
        callback: () => {
            console.log('Running @bspk/ui meta generation script');
            execSync('npm run meta', { stdio: 'inherit' });
        },
    },
    {
        item: 5,
        description: 'Update the @bspk/ui package to the latest version / run css vars checker',
        name: 'updateUI',
        callback: () => {
            execSync('npm unlink @bspk/ui && npm un @bspk/ui && npm i @bspk/ui', { stdio: 'inherit' });
            reportMissingVariables();
        },
    },
];

// a node cli script that displays a menu, waits for an input of an item number, then runs the callback, allow the menu to be skipped if an argument is passed, after the callback is run, the menu is displayed again, until the user selects exit
function runMenu(looped = false) {
    const args = process.argv.slice(2);

    if (!looped && args.length > 0) {
        const selectedItem = parseInt(args[0], 10);
        const menuItem = menu.find(({ item }) => item === selectedItem);
        if (menuItem) {
            console.log(`\n\n⚡️\tRunning ${menuItem.name}...\n\n`);
            menuItem.callback();
            console.log('\n\n⚡️\tComplete!\n\n');
            runMenu(true);
            return;
        } else {
            console.log('Invalid selection.');
            return;
        }
    }

    console.log(
        looped
            ? '\n\t⚡️Select another option or press Ctrl+C to exit.'
            : '\n\n⚡️\tSelect an option or press Ctrl+C to exit.',
    );
    menu.forEach(({ item, description }) => {
        console.log(`\n${item}. ${description}`);
    });

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    rl.on('SIGINT', function () {
        rl?.close();
        process.exit();
    });

    rl.question('\nEnter the number of the option you want to run: ', (answer) => {
        const selectedItem = parseInt(answer, 10);
        const menuItem = menu.find(({ item }) => item === selectedItem);
        if (menuItem) {
            console.log(`\n\n⚡️\tRunning ${menuItem.name}...\n\n`);
            menuItem.callback();
            console.log('\n\t⚡️Complete!\n\n');
            runMenu(true);
            return;
        } else {
            console.log('Invalid selection.');
        }
    });

    // Call runMenu again to allow for another selection
    rl?.on('close', () => {
        console.log('Exiting...');
        process.exit(0);
    });
    // Call runMenu again to allow for another selection
}

runMenu();

export function runMetaLocally() {
    const metaFilePath = path.resolve(__dirname, '../src/meta.ts');
    const uiRoot = path.resolve(__dirname, '../../bspk-ui');
    console.log(`Running @bspk/ui meta generation script`);
    execSync(`cd ${uiRoot} && npm run meta ${metaFilePath} && npx eslint --fix ${metaFilePath}`, {
        stdio: 'inherit',
    });
}

export function reportMissingVariables() {
    // ensure all sass files in src do not reference variables not in anywhere.css

    // reference only - import '@bspk/styles/anywhere.css';
    // we use the anywhere.css file to extract the variables --- all brands have the same variables
    const anywhereCssFile = path.resolve(__dirname, '../node_modules/@bspk/styles/anywhere.css');
    const variableMatches = fs.readFileSync(anywhereCssFile, 'utf8').matchAll(/(--[^:]+):\s*([^\n;]+)/g);
    const variables: Record<string, string> = Object.fromEntries(
        [...variableMatches].map((match) => [match[1], match[2]]),
    );

    const srcFiles = fs
        .readdirSync(path.resolve(__dirname, '../src'), { withFileTypes: true })
        .filter((file) => file.isFile() && file.name.endsWith('.scss'))
        .map((file) => {
            const filePath = path.resolve(__dirname, '../src', file.name);
            return {
                content: fs.readFileSync(filePath, 'utf-8'),
                filePath,
            };
        });

    const variableBeingSetRegex = /--[^:)]+:/g;
    const variablesBeingUsedRegex = /var\(--[^)\s]+\)/g;

    const uiRoot = path.resolve(__dirname, '../../bspk-ui');

    const baseContent = fs.readFileSync(path.join(uiRoot, '/src/base.scss'), 'utf-8');
    const colorsContent = fs.readFileSync(path.join(uiRoot, '/src/colors.scss'), 'utf-8');

    const variableBeingSetMatchesBase = [
        ...(baseContent.match(variableBeingSetRegex)?.map((match) => match.replace(':', '')) || []),
        ...(colorsContent.match(variableBeingSetRegex)?.map((match) => match.replace(':', '')) || []),
    ];

    const missingVariables = srcFiles.flatMap(({ content, filePath }) => {
        const variablesBeingUsedMatches = content
            .match(variablesBeingUsedRegex)
            ?.map((match) => match.replace(/var\((--[^)]+)\)/, '$1'));
        if (!variablesBeingUsedMatches) return [];

        const variableBeingSetMatches = content.match(variableBeingSetRegex)?.map((match) => match.replace(':', ''));

        const missing = variablesBeingUsedMatches.filter((variable) => {
            // check if variable is
            // NOT in anywhere.css
            // NOT being set in the current file
            // AND NOT being set in base.scss
            return (
                !variables[variable] &&
                !variableBeingSetMatches?.includes(variable) &&
                !variableBeingSetMatchesBase?.includes(variable)
            );
        });

        if (missing.length) {
            console.error(`\nMissing variables in ${filePath}\n: ${[...new Set([...missing])].join(', ')}`);
        }
        return missing;
    });

    if (missingVariables.length) {
        console.error(`Missing variables in src: ${missingVariables.join(', ')}`);
        process.exit(1);
    }

    console.log('No undefined CSS variables found :)');
}

export function ensureLatestUIVersion() {
    const latestVersionPublished = execSync('npm view @bspk/ui version', { encoding: 'utf-8' }).trim();
    const versionInstalled = packageJson.dependencies['@bspk/ui']?.replace('^', '') || '';

    if (versionInstalled !== latestVersionPublished) {
        console.error(
            '\n\x1b[31m%s\x1b[0m\n',
            `pre-commit failed: latest version of  @bspk/ui (${latestVersionPublished}) not installed, found (${versionInstalled}).`,
        );
    }

    console.log(`@bspk/ui version is up to date (${versionInstalled})`);
}
