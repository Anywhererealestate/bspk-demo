import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const demoRoot = path.resolve(__dirname, '../src');

console.log(`Running @bspk/ui meta generation script`);

const localUIPath = path.resolve('../bspk-ui');

if (fs.existsSync(localUIPath)) {
    const fileUpdated = process.argv[2] ? ` -- ${process.argv[2]}` : '';

    execSync(`export DEV_GIT_TOKEN=local && cd ${localUIPath} && npm run meta ${demoRoot} ${fileUpdated}`, {
        stdio: 'inherit',
    });

    if (!fileUpdated) execSync(`npx eslint --fix ${demoRoot}/meta.ts`, { stdio: 'inherit' });
} else {
    execSync(`npm explore @bspk/ui -- npm run meta ${demoRoot}`, { stdio: 'inherit' });

    execSync(`npx eslint --fix ${demoRoot}/meta.ts`, { stdio: 'inherit' });
}
