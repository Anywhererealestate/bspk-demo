import { execSync } from 'child_process';
import path from 'path';

const __dirname = path.dirname(new URL(import.meta.url).pathname);

export function runMetaLocally() {
    const metaFilePath = path.resolve(__dirname, '../../src/meta.ts');
    const uiRoot = path.resolve(__dirname, '../../../bspk-ui');
    console.log(`Running @bspk/ui meta generation script`);
    execSync(`cd ${uiRoot} && npm run meta ${metaFilePath} && npx eslint --fix ${metaFilePath}`, {
        stdio: 'inherit',
    });
}

runMetaLocally();
