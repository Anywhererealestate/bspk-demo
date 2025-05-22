import { execSync } from 'child_process';
import path from 'path';

const metaFilePath = path.resolve(__dirname, '../src/meta.ts');

console.log(`Running @bspk/ui meta generation script`);

execSync(`npm explore @bspk/ui -- npm run meta ${metaFilePath} && npx eslint --fix ${metaFilePath}`, {
    stdio: 'inherit',
});
