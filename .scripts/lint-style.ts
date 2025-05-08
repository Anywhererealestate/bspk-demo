/**
 * $ ts-node .scripts/lint-style.ts
 *
 * This script copies over css files from style package then ensures all CSS variables are defined in all the brand css
 * files.
 */
import fs from 'fs';
import path from 'path';

import { getUiPaths } from './utils';

const STYLES_DIR = getUiPaths().stylesDir;

function variableTest() {
    // variableName: fileName[]
    const fails: Record<string, string[]> = {};

    const brandCssFiles = fs.readdirSync(STYLES_DIR).flatMap((file) => {
        if (!file.endsWith('.css')) return [];
        return [`${STYLES_DIR}/${file}`];
    });

    const regexToMatchAllCSSVariablesBeingUsed = /var\((--[^)]+)\)/g;

    const srcDefinedVariables: string[] = [];

    const filesToSearch = fs
        .readdirSync('src', { recursive: true, encoding: 'utf-8' })
        .filter((file) => file.endsWith('.scss') || file.endsWith('.ts') || file.endsWith('.tsx'))
        .map((file) => {
            const filePath = path.resolve('src', file);
            const content = fs.readFileSync(filePath, { encoding: 'utf-8' });
            const varsCalled = [...content.matchAll(regexToMatchAllCSSVariablesBeingUsed)].map((i) => i[1]);
            const varsDefined = [...content.matchAll(/(--[^:]+): /g)].map((i) => i[1]);
            srcDefinedVariables.push(...varsDefined);
            return {
                file: filePath,
                content,
                varsCalled: varsCalled.filter((varName) => !varsDefined.includes(varName)),
            };
        });

    const libraryVariables = brandCssFiles.flatMap((brandCssFile) => {
        const definedVariablesAll = [
            ...fs.readFileSync(brandCssFile, { encoding: 'utf-8' }).matchAll(/(--[^:]+):/g),
        ].map((i) => i[1]);
        return [...new Set(definedVariablesAll)];
    });

    filesToSearch.forEach((fileVars) => {
        const missingVars = fileVars.varsCalled.filter(
            (varName) => !libraryVariables.includes(varName) && !srcDefinedVariables.includes(varName),
        );

        missingVars.forEach((varName) => {
            fails[varName] = fails[varName] || [];
            fails[varName].push(fileVars.file);
        });
    });

    if (libraryVariables.length === 0) {
        console.error('No variables found in the library');
        process.exit(0);
    }

    if (Object.keys(fails).length) {
        console.error('Some variables are not defined in styles.');
        Object.entries(fails).forEach(([variable, files]) => {
            console.error(`Variable ${variable} is used in: \n${files.map((file) => `  - ${file}`)}\n`);
        });
        process.exit(0);
    }

    console.log('All variables are defined in styles.');
}

variableTest();

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */