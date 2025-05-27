import fs from 'fs';
import path from 'path';

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
