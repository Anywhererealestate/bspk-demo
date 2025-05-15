/**
 * $ vite-node .scripts/lint-types.ts
 *
 * This script ensures all required fields have default values in examplesType.tsx.
 */

import { MetaTypeName, typesMeta, componentsMeta } from '@bspk/ui/meta';

import { componentExamples } from '../src/examples';

const typeExamples = Object.fromEntries(
    Object.entries(componentExamples)
        .filter(([, componentExample]) => !componentExample.props)
        .map(([componentName, componentExample]) => [`${componentName}Props`, componentExample.props]),
);

const logs: Record<string, any[]> = {};

typesMeta.forEach((typeMeta) => {
    const componentMeta = componentsMeta.find((meta) => meta.name === typeMeta.name.replace(/Props$/, ''));

    const log = (logs[typeMeta.name] = [] as any[]);

    if (!componentMeta) {
        // log.push('ignoring type', componentMeta?.phase || 'no component meta');
        return;
    }

    const reqPropsWithoutDefault =
        typeMeta?.properties?.filter((property) => property.required && !property.default) || [];

    if (reqPropsWithoutDefault.length === 0) {
        //log.push('ignoring type', 'no required properties with missing default values');
        return;
    }

    const typeExample = typeExamples[typeMeta.name as MetaTypeName];

    if (!typeExample) {
        //log.push(`No example found`);
        return;
    }

    reqPropsWithoutDefault.forEach((property) => {
        const propertyExample = typeExample.find((exampleProperty) => exampleProperty.name === property.name);

        if (propertyExample?.default !== undefined) return;

        if (property.name.includes('onChange')) {
            //log.push(`ignoring missing default value for ${property.name} / ${property.type}`);
            return;
        }

        // Check if the property is an object with required properties
        if (property.properties?.length) {
            const reqChildPropsWithoutDefault =
                property.properties?.filter((childProp) => childProp.required && !childProp.default) || [];

            if (reqChildPropsWithoutDefault.length === 0) {
                //log.push('ignoring type', 'no required properties with missing default values');
                return;
            }

            reqChildPropsWithoutDefault.forEach((childProp) => {
                const missingExampleDefault =
                    typeExample.find((exampleProperty) => exampleProperty.name === childProp.name)?.default ===
                    undefined;

                if (!missingExampleDefault) return;

                if (childProp.name.includes('onChange')) {
                    //log.push(`ignoring missing default value for ${property.name} / ${property.type}`);
                    return;
                }

                log.push(`missing default value for ${property.name} / ${childProp} / ${property.type}`);
            });
        }

        const everyExampleChildPropertyIsDefined =
            propertyExample?.properties &&
            propertyExample?.properties?.length > 0 &&
            propertyExample?.properties?.every(
                (childPropExample) => !childPropExample.required || childPropExample.default !== undefined,
            );

        if (everyExampleChildPropertyIsDefined) return;

        log.push(`missing default value for ${property.name} / ${property.type}`);
    });
});

console.info(
    Object.entries(logs)
        .filter(([, errors]) => errors.length > 0)
        .map(([name, errors]) => `${name}\n   ${errors.join('\n   ')}`)
        .join('\n\n'),
);

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
