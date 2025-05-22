import { execSync } from 'child_process';
import path from 'path';

export function getUIRoot() {
    const pkgs = execSync('npm ls --depth=0', { encoding: 'utf-8' }).toString();
    const linkedPathToUI = pkgs.match(/@bspk\/ui@.* -> (.*)/)?.[1];
    return path
        .resolve(__dirname, '../', linkedPathToUI?.replace('src', '') || 'node_modules/@bspk/ui')
        .replace('bspk-demo/bspk-demo', 'bspk-demo');
}
