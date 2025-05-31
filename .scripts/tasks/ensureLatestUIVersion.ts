import { execSync } from 'child_process';

export function ensureLatestUIVersion(run?: boolean): boolean {
    const latestVersionPublished = execSync('npm view @bspk/ui version', { encoding: 'utf-8' }).trim();
    const versionInstalled = execSync('npm ls --depth=0', { encoding: 'utf-8' })?.match(
        /@bspk\/ui@(\d+\.\d+\.\d+)/,
    )?.[1];

    if (versionInstalled !== latestVersionPublished) {
        if (!run)
            console.error(
                '\n\x1b[31m%s\x1b[0m\n',
                `pre-commit failed: latest version of  @bspk/ui (${latestVersionPublished}) not installed, found (${versionInstalled}).`,
            );

        return false;
    }
    if (!run)
        console.log(
            `@bspk/ui version is up to date (versionInstalled: ${versionInstalled}, latestVersionPublished: ${latestVersionPublished})`,
        );

    return true;
}

if (process.argv.includes('run')) ensureLatestUIVersion(true);
