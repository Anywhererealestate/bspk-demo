import { execSync } from 'child_process';
import { writeFileSync } from 'fs';
import { join } from 'path';

// Brightness utilities: perceived brightness (HSP) and WCAG relative luminance

// Example: integrate into existing color generation
// If this script produces a JSON of colors, include brightness fields.
// Use getPerceivedBrightness for UI thresholding; getRelativeLuminance for WCAG checks.
/**
 * Generate color data from @bspk/styles/anywhere.css
 *
 * $ npx vite-node .scripts/tasks/generateColorData.ts
 */

function parseHex(hex: string): { r: number; g: number; b: number } {
    const h = hex.trim().replace(/^#/, '');
    if (![3, 6].includes(h.length)) throw new Error(`Invalid hex: ${hex}`);
    const full =
        h.length === 3
            ? h
                  .split('')
                  .map((c) => c + c)
                  .join('')
            : h;
    const num = parseInt(full, 16);
    const r = (num >> 16) & 0xff;
    const g = (num >> 8) & 0xff;
    const b = num & 0xff;
    return { r, g, b };
}

export function getPerceivedBrightness(hex: string): number {
    const { r, g, b } = parseHex(hex);
    const brightness = Math.sqrt(0.299 * r * r + 0.587 * g * g + 0.114 * b * b);
    return +((brightness / 255) * 100).toFixed(0); // percent 0-100
}

function srgbToLinear(c: number): number {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
}

export function getRelativeLuminance(hex: string): number {
    const { r, g, b } = parseHex(hex);
    const R = srgbToLinear(r);
    const G = srgbToLinear(g);
    const B = srgbToLinear(b);
    const L = 0.2126 * R + 0.7152 * G + 0.0722 * B; // 0-1
    return +(L * 100).toFixed(2); // percent 0-100
}

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
                        brightnessLevel: getPerceivedBrightness(hexMatch[0]),
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
                        brightnessLevel: getPerceivedBrightness(hexMatch[0]),
                        r: parseInt(hexMatch[0].slice(1, 3), 16),
                        g: parseInt(hexMatch[0].slice(3, 5), 16),
                        b: parseInt(hexMatch[0].slice(5, 7), 16),
                    },
                    description: currentDescription || undefined,
                    [`${parent}BrightnessLevel`]: getPerceivedBrightness(hexMatch[0]),
                    var: `--${varName}`,
                };
                currentComment = '';
                currentDescription = '';
            }
        }
    }
});

const colorRows: ColorRow[] = Object.values(varMap);

writeFileSync(outputFilePath, JSON.stringify(colorRows, null, 2), 'utf-8');
console.log(`Generated color data with ${colorRows.length} entries to ${outputFilePath}`);
