import { execSync } from 'child_process';

const { DEV_GIT_TOKEN, MODE } = process.env;

console.log(`Building in ${MODE} mode`);

if (MODE !== 'production') {
    let branch = '';
    if (MODE === 'development') branch = 'dev';
    else if (MODE === 'test') branch = 'test';

    console.log(`Installing ${branch} branch of bspk-ui package and building\n\n`);

    execSync(
        `npm install https://${DEV_GIT_TOKEN}@github.com/Anywhererealestate/bspk-ui#${branch} && npm explore @bspk/ui -- npm run build`,
        {
            stdio: 'inherit',
        },
    );
}

execSync(`npm run meta && vite-node ./.scripts/search-index.ts && vite build && cp dist/index.html dist/404.html`, {
    stdio: 'inherit',
});
