/** Called by the vite config when updates are made to the files. */
import { execSync } from 'node:child_process';
import path from 'path';

const outDir = path.resolve(__dirname, '../src/meta');

const uiRootPath = path.resolve(__dirname, '../../bspk-ui');

const build =
    execSync(`cd ${uiRootPath} && git rev-list --count origin/main..origin/dev`, {
        encoding: 'utf-8',
    }).trim() || '0';

execSync(`cd ${uiRootPath} && npm run meta out=${outDir} hash=local build=${build} ${process.argv[2]} `, {
    stdio: 'inherit',
});

execSync(`npx eslint --fix ${outDir}/index.ts`, { stdio: 'inherit' });
