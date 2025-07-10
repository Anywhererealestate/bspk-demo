import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const { DEV_GIT_TOKEN } = process.env;

const RESET = '\x1b[0m';
const ORANGE = '\x1b[33m';

if (DEV_GIT_TOKEN) {
    console.log('Installing dev branch of bspk-ui package and building\n\n');

    execSync(
        `npm install https://${DEV_GIT_TOKEN}@github.com/Anywhererealestate/bspk-ui#dev && npm explore @bspk/ui -- npm run build`,
        {
            stdio: 'inherit',
        },
    );
}

const uiRootPath = path.resolve(__dirname, '../../bspk-ui');

if (fs.existsSync(uiRootPath)) {
    console.log(`${ORANGE}Running in preview mode, linking bspk-ui package to bspk-demo${RESET}\n\n`);

    const demoRootPath = path.resolve(__dirname, '../../bspk-demo');
    execSync(
        `npm unlink @bspk/ui && cd ${uiRootPath} && npm run build && npm link && cd ${demoRootPath} && npm link @bspk/ui`,
        {
            stdio: 'inherit',
        },
    );
}

execSync(`npm run meta && vite-node ./.scripts/search-index.ts && vite build && cp dist/index.html dist/404.html`, {
    stdio: 'inherit',
});
