/**
 * Local preview script builds the bspk-ui library and links it to the demo project.
 *
 * $ vite-node .scripts/preview-local.ts
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

execSync(
    [
        // we ensure the linked version is at the root of the bspk-ui and not in the src folder for dev
        `cd "${uiRootPath}" && npm run build && npm link`,
        // re link the coirrect local version of bspk-ui to the demo repo
        `cd "${demoRootPath}" && npm link @bspk/ui`,
    ].join(' && '),
    {
        stdio: 'inherit',
    },
);
