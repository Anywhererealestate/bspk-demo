import { ESLint } from 'eslint';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import config from '../../eslint.config';

export async function lint(code: string) {
    const eslint = new ESLint({
        baseConfig: config,
        fix: true,
    });

    const results = await eslint.lintText(code);

    const formatter = await eslint.loadFormatter('stylish');

    return await formatter.format(results);
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
