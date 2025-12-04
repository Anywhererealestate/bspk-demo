/**
 * Generate color data from @bspk/styles/anywhere.css
 *
 * $ npx vite-node .scripts/tasks/generateColorData.ts
 */

import { execSync } from 'child_process';
import { writeFileSync } from 'fs';
import { join } from 'path';

type ColorInfo = {
    brightnessLevel?: number;
    r: number;
    g: number;
    b: number;
    value: string;
};

type ColorRow = {
    name: string;
    description?: string;
    dark?: ColorInfo;
    root?: ColorInfo;
    var: string;
};

type VarMap = {
    [key: string]: ColorRow;
};

const cssContent = execSync('npm explore @bspk/styles -- cat anywhere.css').toString();

const outputFilePath = join(__dirname, '../../src/meta/colors-meta.json');

const lines = cssContent.split('\n');

let currentComment = '';
let currentDescription = '';
let parent: 'dark' | 'root' | null = null;

const varMap: VarMap = {};

lines.forEach((line) => {
    line = line.trim();
    if (line.startsWith('/*') && line.endsWith('*/')) {
        const comment = line.slice(2, -2).trim();
        const [name, ...descriptions] = comment.split(' - ');
        currentComment = name;
        currentDescription = descriptions.join(' - ');
    } else if (line.startsWith(':root')) {
        parent = 'root';
    } else if (line.startsWith("[data-theme='dark']")) {
        parent = 'dark';
    } else if (line.startsWith('--')) {
        if (line.match(/#[0-9a-fA-F]{6}/)) {
            const varNameMatch = line.match(/^--([\w-]+):/);
            const hexMatch = line.match(/#([0-9a-fA-F]{6})/);
            if (varNameMatch && hexMatch && parent) {
                const varName = varNameMatch[1];

                if (varMap[varName]) {
                    // Update existing entry
                    varMap[varName][parent] = {
                        value: hexMatch[0],
                        brightnessLevel: getBrightnessLevel(hexMatch[0]),
                        r: parseInt(hexMatch[0].slice(1, 3), 16),
                        g: parseInt(hexMatch[0].slice(3, 5), 16),
                        b: parseInt(hexMatch[0].slice(5, 7), 16),
                    };
                    return;
                }

                varMap[varName] = {
                    name: currentComment || varName,
                    [parent]: {
                        value: hexMatch[0],
                        brightnessLevel: getBrightnessLevel(hexMatch[0]),
                        r: parseInt(hexMatch[0].slice(1, 3), 16),
                        g: parseInt(hexMatch[0].slice(3, 5), 16),
                        b: parseInt(hexMatch[0].slice(5, 7), 16),
                    },
                    description: currentDescription || undefined,
                    [`${parent}BrightnessLevel`]: getBrightnessLevel(hexMatch[0]),
                    var: `--${varName}`,
                };
                currentComment = '';
                currentDescription = '';
            }
        }
    }
});

function getBrightnessLevel(hex: string): number {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return Math.round((brightness / 255) * 100);
}

const colorRows: ColorRow[] = Object.values(varMap);

writeFileSync(outputFilePath, JSON.stringify(colorRows, null, 2), 'utf-8');
console.log(`Generated color data with ${colorRows.length} entries to ${outputFilePath}`);
