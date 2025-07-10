import { execSync } from 'child_process';

const { DEV_GIT_TOKEN } = process.env;

if (DEV_GIT_TOKEN) {
    console.log('Installing dev branch of bspk-ui package and building\n\n');

    execSync(
        `npm install https://${DEV_GIT_TOKEN}@github.com/Anywhererealestate/bspk-ui#dev && npm explore @bspk/ui -- npm run build`,
        {
            stdio: 'inherit',
        },
    );
}

execSync(`npm run meta && vite-node ./.scripts/search-index.ts && vite build && cp dist/index.html dist/404.html`, {
    stdio: 'inherit',
});
