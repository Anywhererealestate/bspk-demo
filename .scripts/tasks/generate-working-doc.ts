/* eslint-disable @cspell/spellchecker */
/**
 * - Generate an html page based on the componentsMeta and typesMeta
 * - Each component should have a header
 * - Each property should be a bullet point
 * - Each property should show name, type, default, and description as a sub-bullet points
 * - The output should be written to temp.html
 *
 * $ npx tsx .scripts/tasks/generate-working-doc.ts
 */

import * as fs from 'fs';
import * as path from 'path';

import { ComponentMeta, TypeMeta } from 'src/meta';

const { componentsMeta, typesMeta } = JSON.parse(fs.readFileSync(path.join('src/meta/data.json'), 'utf-8')) as {
    componentsMeta: ComponentMeta[];
    typesMeta: TypeMeta[];
};

const outputPath = path.join('temp.html');

function generateContent() {
    let HTML = '';

    HTML += `<p>This document reviews existing component properties, their descriptions, options, and defaults.</p>\n\n`;

    HTML += `<p>We aim to update descriptions, names, and other data to better align with design and development needs.</p>\n\n`;

    HTML += `<h3>Stake Holders</h3>\n\n`;

    HTML += `<ul>\n`;
    HTML += `  <li>Bryan Blake</li>\n`;
    HTML += `  <li>Brian Reed</li>\n`;
    HTML += `  <li>Jessica McIntosh</li>\n`;
    HTML += `  <li>Emile Fleming</li>\n`;
    HTML += `  <li>Janelle Cipriano</li>\n`;
    HTML += `  <li>Lihan Huang</li>\n`;
    HTML += `  <li>Yifan Zhu</li>\n`;
    HTML += `  <li>Robert Kissinger</li>\n`;
    HTML += `</ul>\n\n`;

    for (const component of componentsMeta) {
        HTML += `<h2>${component.name}</h2>\n\n`;
        HTML += `<p><em style="font-size: 0.5em; color: gray;">(${component.phase})</em></p>\n\n`;
        HTML += `<p>${component.description}</p>\n\n`;
        HTML += `<p><a href="https://bspk.anywhere.re/${component.slug}">https://bspk.anywhere.re/${component.slug}</a></p>\n\n`;

        HTML += `<h3>Properties</h3>\n\n`;
        const typeInfo = typesMeta.find((t) => t.name === `${component.name}Props`);

        for (const prop of typeInfo?.properties || []) {
            const name = prop.name || '';
            const type = prop.type || '';
            const defaultValue = 'default' in prop ? prop.default : 'None';
            const description = 'description' in prop ? prop.description : '';
            HTML += `<h4>${name}</h4>\n`;
            HTML += `<p>${description}</p>\n`;

            HTML += '<table>\n';
            // type
            HTML += '  <tr>\n';
            HTML += `    <td><strong>Type</strong></td>\n`;
            HTML += `    <td><code>${type}</code></td>\n`;
            HTML += '  </tr>\n';

            // options
            if (prop.options) {
                HTML += '  <tr>\n';
                HTML += `    <td><strong>Options</strong></td>\n`;
                HTML += `    <td><code>${prop.options.join(', ')}</code></td>\n`;
                HTML += '  </tr>\n';
            }

            // default
            HTML += '  <tr>\n';
            HTML += `    <td><strong>Default</strong></td>\n`;
            HTML += `    <td><code>${defaultValue}</code></td>\n`;
            HTML += '  </tr>\n';
            HTML += '</table>\n';
        }

        HTML += '<hr>\n';
    }

    return HTML;
}

fs.writeFileSync(outputPath, generateContent());
console.log(`Component documentation written to ${outputPath}`);
