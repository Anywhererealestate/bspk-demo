import { PrettyParser } from '@bspk/ui/utils/demo';
import { format } from 'prettier';
import prettierPluginEstree from 'prettier/plugins/estree';
import prettierPluginHtml from 'prettier/plugins/html';
import prettierPluginCss from 'prettier/plugins/postcss';
import prettierPluginTypescript from 'prettier/plugins/typescript';

export async function pretty(source: string, parser: PrettyParser) {
    return await format(source, {
        semi: true,
        singleQuote: true,
        trailingComma: 'all',
        tabWidth: 2,
        printWidth: 80,
        parser,
        plugins: [prettierPluginTypescript, prettierPluginEstree, prettierPluginCss, prettierPluginHtml],
    }).catch((err) => {
        console.error(err);
        return source;
    });
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
