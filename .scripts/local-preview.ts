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

const ORANGE = '\x1b[33m';
const RESET = '\x1b[0m';

// ensure the bspk-ui is where we expect it

if (!fs.existsSync(uiRootPath)) {
    throw new Error(`bspk-ui not found at ${uiRootPath}`);
}

const mode = process.argv[2] || 'local';

console.log(`${ORANGE}Running in ${mode.toUpperCase()} preview mode${RESET}`);

if (mode === 'dev') {
    execSync(`npm install https:/github.com/Anywhererealestate/bspk-ui#dev && npm explore @bspk/ui -- npm run build`, {
        stdio: 'inherit',
    });
}

if (mode === 'prod') {
    execSync(`npm unlink @bspk/ui && npm install @bspk/ui@latest`, {
        stdio: 'inherit',
    });
}
if (mode === 'local') {
    execSync(`cd "${uiRootPath}" && npm run build && npm link && cd "${demoRootPath}" && npm link @bspk/ui`, {
        stdio: 'inherit',
    });
}

execSync(`vite preview --port 8080 --open`, {
    stdio: 'inherit',
});
