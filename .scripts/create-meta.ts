import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const demoRoot = path.resolve(__dirname, '../src');

console.log(`Running @bspk/ui meta generation script`);

const localUIPath = path.resolve('../bspk-ui');

const isLocalDev = execSync('npm ls @bspk/ui', { encoding: 'utf-8' }).trim().includes('bspk-ui/src');

if (fs.existsSync(localUIPath) && isLocalDev) {
    const fileUpdated = process.argv[2] ? ` -- update=${process.argv[2]}` : '';

    execSync(
        `export DEV_GIT_TOKEN=local && cd ${localUIPath} && npm run meta hash=local out=${demoRoot} ${fileUpdated}`,
        {
            stdio: 'inherit',
        },
    );

    if (!fileUpdated) execSync(`npx eslint --fix ${demoRoot}/meta.ts`, { stdio: 'inherit' });
} else {
    const DEV_GIT_TOKEN = process.env.DEV_GIT_TOKEN;

    if (DEV_GIT_TOKEN) {
        console.log('Installing dev branch of bspk-ui package...\n\n');

        execSync(`npm install https://${DEV_GIT_TOKEN}@github.com/Anywhererealestate/bspk-ui#dev`, {
            stdio: 'inherit',
        });
    } else {
        console.log('DEV_GIT_TOKEN not set, skipping dev package installation.');
    }
    const hash = execSync('npm explore @bspk/ui -- git rev-parse --short HEAD', { encoding: 'utf-8' }).trim();

    execSync(`npm explore @bspk/ui -- npm run meta out=${demoRoot} hash=${hash}`, { stdio: 'inherit' });

    execSync(`npx eslint --fix ${demoRoot}/meta.ts`, { stdio: 'inherit' });
}
