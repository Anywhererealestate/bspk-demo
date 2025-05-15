import { execSync } from 'node:child_process';

import packageJson from '../package.json';

function ensureLatestUIVersion() {
    const latestVersionPublished = execSync('npm view @bspk/ui version', { encoding: 'utf-8' }).trim();
    const versionInstalled = packageJson.dependencies['@bspk/ui']?.replace('^', '') || '';

    if (versionInstalled !== latestVersionPublished) {
        console.error('\n\x1b[31m%s\x1b[0m\n', `pre-commit failed: latest version of  @bspk/ui (${latestVersionPublished}) not installed, found (${versionInstalled}).`);
        process.exit(1);
    }
}

ensureLatestUIVersion();

// execSync('npm run test:prod', { stdio: 'inherit' });

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */