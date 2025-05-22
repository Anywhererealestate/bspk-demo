import { execSync } from 'child_process';
import path from 'path';

import { getUIRoot } from '.scripts/utils';

const uiPath = getUIRoot();

const metaFilePath = path.resolve(__dirname, '../src/meta.ts');

console.log(`Running meta generation script at ${uiPath}`);

execSync(`cd ${uiPath} && npm run meta ${metaFilePath}`, { stdio: 'inherit' });

execSync(`npx eslint --fix ${metaFilePath}`, { stdio: 'inherit' });
