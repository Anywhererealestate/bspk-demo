/**
 * $ vite-node .scripts/search-index.tsx
 *
 * This script generates the tsx file which contains the component definitions data and hooks data scraped from JSdoc
 * comments.
 */
import { execSync } from 'child_process';
import fs from 'fs';

import { componentsMeta, typesMeta, utilitiesMeta } from 'src/meta';
import { kebabCase } from 'src/utils/kebabCase';

export function searchIndex() {
    const index: { title?: string; content?: string; url?: string; kind: string }[] = [];

    index.push(
        ...componentsMeta.flatMap((component) => {
            let content = component.description;

            const typeMeta = typesMeta.find((tm) => {
                return tm.name === `${component.name}Props`;
            });

            typeMeta?.properties?.forEach((prop) => {
                content += ` ${prop.name} ${prop.description} ${prop.default}`;
            });

            typeMeta?.references?.forEach((ref) => {
                const refMeta = typesMeta.find((tm) => {
                    return tm.name === ref;
                });

                refMeta?.properties?.forEach((prop) => {
                    content += ` ${prop.name} ${prop.description} ${prop.default}`;
                });
            });

            return {
                title: component.name,
                content,
                url: `/${component.slug}`,
                kind: 'Component',
            };
        }),
    );

    index.push(
        ...utilitiesMeta
            .filter((u) => u.name.startsWith('use'))
            .flatMap((utility) => {
                return {
                    title: utility.name,
                    content: utility.description,
                    url: `/hooks#${kebabCase(utility.name)}`,
                    kind: 'Hook',
                };
            }),
    );

    const filePath = 'src/meta/search-index.json';

    fs.writeFileSync(filePath, JSON.stringify(index, null, 2)); // Pretty format JSON

    execSync(`npx prettier --write "${filePath}"`, { stdio: 'inherit' });

    console.info('Search index complete.');
}

export async function main() {
    searchIndex();

    process.exit(0);
}

main();

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
