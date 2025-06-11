// if it's dev mode, we install the dev version of the ui package
import { execSync } from 'child_process';

const DEV_GIT_TOKEN = process.env.DEV_GIT_TOKEN;

if (DEV_GIT_TOKEN) {
    console.log('Installing dev version of bspk-ui package...');

    // execSync(`echo '//npm.pkg.github.com/:_authToken=${DEV_GIT_TOKEN}' > .npmrc `, { stdio: 'inherit' });

    execSync(`npm install github:Anywhererealestate/bspk-ui#dev`, { stdio: 'inherit' });
} else {
    console.log('DEV_GIT_TOKEN not set, skipping dev package installation.');
}
