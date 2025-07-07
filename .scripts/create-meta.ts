import { execSync } from 'child_process';
import path from 'path';

const outDir = path.resolve(__dirname, '../src/meta');

console.log(`Running @bspk/ui meta generation script`);

const DEV_GIT_TOKEN = process.env.DEV_GIT_TOKEN;

if (DEV_GIT_TOKEN) {
    console.log('Installing dev branch of bspk-ui package...\n\n');

    execSync(`npm install https://${DEV_GIT_TOKEN}@github.com/Anywhererealestate/bspk-ui#dev`, {
        stdio: 'inherit',
    });
} else {
    console.log('DEV_GIT_TOKEN not set, skipping dev package installation.');
}

// Get the current commit hash of the @bspk/ui package
const hash = execSync('npm list @bspk/ui', { encoding: 'utf-8' }).trim().split('#')[1]?.substring(0, 7) || 'unknown';

const build =
    execSync(`npm explore @bspk/ui -- git rev-list --count origin/main..origin/dev`, {
        encoding: 'utf-8',
    }).trim() || '0';

execSync(`npm explore @bspk/ui -- npm run meta out=${outDir} hash=${hash} build=${build}`, { stdio: 'inherit' });

execSync(`npx eslint --fix ${outDir}/index.ts`, { stdio: 'inherit' });
