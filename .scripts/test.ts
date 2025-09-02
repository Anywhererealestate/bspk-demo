/**
 * Used to set up meta data from the tests
 *
 * $ npm run tests
 */
import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const demoRootPath = path.resolve(__dirname, '../');
const testRootPath = path.resolve(__dirname, '../', 'tests');

const metaDataPath = path.join(demoRootPath, 'src/meta/data.json');
const metaDataTestPath = path.join(testRootPath, '.tmp/meta.ts');
const metaDataObjectPath = metaDataTestPath.replace(/.json$/, '.ts');

function main() {
    if (fs.existsSync(metaDataTestPath)) return;

    if (!fs.existsSync(metaDataPath)) execSync('npm run meta', { stdio: 'inherit' });

    const metaData = fs.readFileSync(metaDataPath, 'utf-8');

    fs.writeFileSync(metaDataObjectPath, `export default ${metaData};\n`);

    execSync(`eslint ${metaDataObjectPath}`, { stdio: 'inherit' });
}

main();
