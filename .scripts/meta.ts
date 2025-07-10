/**
 * @bspk/ui meta generation script
 *
 * This script generates the meta information for the @bspk/ui package.
 *
 * $ vite-node .scripts/meta.ts
 */
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const outDir = path.resolve(__dirname, '../src/meta');
const uiRootPath = path.resolve(__dirname, '../../bspk-ui');

if (fs.existsSync(uiRootPath)) {
    console.log(`Running @bspk/ui meta generation script for local development\n\n`);
    runMetaLocal();
} else {
    console.log(`Running @bspk/ui meta generation script\n\n`);
    runMeta();
}

function runMetaCommand({ prefix, hash, updated }: { prefix: string; hash: string; updated?: string }) {
    let build = '';

    try {
        build = execSync(`${prefix} git rev-list --count origin/main..origin/dev`, { encoding: 'utf-8' }).trim() || '0';
    } catch {
        // If the git command fails, we assume no new commits have been made
    }

    console.log({ prefix });
    execSync(`${prefix} npm run meta out=${outDir} hash=${hash} build=${build} ${updated ? `update=${updated}` : ''}`, {
        stdio: 'inherit',
    });

    execSync(`npx eslint --fix ${outDir}/index.ts`, { stdio: 'inherit' });
}

function runMeta() {
    const hash = execSync('npm list @bspk/ui', { encoding: 'utf-8' }).trim().split('#')[1]?.substring(0, 7);
    runMetaCommand({ prefix: 'npm explore @bspk/ui -- ', hash });
}

function runMetaLocal() {
    const updated = process.argv?.[2];
    runMetaCommand({ prefix: `cd ${uiRootPath} &&`, hash: 'local', updated });
}
