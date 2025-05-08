import { MetaTypeName, typesMeta } from '@bspk/ui/meta';

import { DemoComponent, TypePropertyExample } from '../types';

import { action } from './actions';
import { useMountMemo } from './useMountMemo';

export function useProps(componentExample: DemoComponent & { name: string }) {
    return useMountMemo(() => {
        const componentName = componentExample.name;
        const componentPropsName = `${componentName}Props` as MetaTypeName;
        const propsExample = componentExample.props || [];
        const typeMeta = typesMeta?.find((t) => t.name === componentPropsName);

        const props: TypePropertyExample[] = (typeMeta?.properties || []).map((prop): TypePropertyExample => {
            const propExample = propsExample?.find((pe) => pe.name === prop.name);

            const childProps = prop.properties || propExample?.properties;

            return {
                ...prop,
                ...propExample,
                libraryDefault: prop.default,
                properties: childProps?.map((childProp) => ({
                    ...childProp,
                    ...propExample?.properties?.find((pe) => pe.name === childProp.name),
                    libraryDefault: childProp.default,
                })),
            };
        });

        // these are the default values from the library not the example state
        const libraryDefaults: Record<string, any> = {};

        // these are the default values for the example state
        const defaultState: Record<string, any> = {};

        const references =
            typeMeta?.references?.flatMap((name) => {
                const referenceMeta = typesMeta.find((t) => t.name === name);
                if (!referenceMeta || !referenceMeta.properties) return [];
                return referenceMeta;
            }) || [];

        props.forEach((prop) => {
            if (typeof prop.default === 'function') return;
            if (prop.libraryDefault !== undefined) libraryDefaults[prop.name] = prop.libraryDefault;
            // if (prop.default!== undefined)
            defaultState[prop.name] = prop.default;

            if (prop.properties) {
                prop.properties.forEach((childProp: TypePropertyExample) => {
                    if (childProp.libraryDefault !== undefined)
                        libraryDefaults[prop.name] = {
                            ...(prop.libraryDefault || {}),
                            [childProp.name]: childProp.libraryDefault,
                        };

                    if (childProp.default)
                        defaultState[prop.name] = {
                            ...(defaultState[prop.name] || {}),
                            [childProp.name]: childProp.default,
                        };
                });

                return;
            }

            if (prop.required && defaultState[prop.name] === undefined) {
                let defaultValue: any = null;

                if (prop.type === 'boolean') defaultValue = false;

                if (prop.type === 'number') defaultValue = 0;

                if (prop.name === 'name') defaultValue = `${prop.name}-example`;

                if (prop.name === 'children') defaultValue = `This is the ${componentName} children content.`;

                if (prop.name === 'label') defaultValue = `Label example`;

                if (prop.name === 'aria-label') defaultValue = `${prop.name} example describing element`;

                defaultState[prop.name] = defaultValue === null ? `${prop.name} example` : defaultValue;
            }
        });

        return {
            references,
            libraryDefaults,
            defaultState,
            props,
            handleProps: generateHandleProps(props, componentName),
        };
    });
}

function generateHandleProps(props: TypePropertyExample[], contextName: string): Record<string, () => void> {
    return Object.fromEntries(
        props
            .map((prop): any[] => {
                if (prop.properties) {
                    const childHandleProps = generateHandleProps(prop.properties, `${contextName} ${prop.name}`);
                    return Object.keys(childHandleProps).length > 0 ? [prop.name, childHandleProps] : [];
                }

                let handleProp: any = null;
                if (typeof prop.default === 'function') handleProp = prop.default;

                if (!handleProp && /^on[A-Z]/.test(prop.name)) {
                    handleProp = () => {
                        action(`Fired ${contextName} ${prop.name}`);
                    };
                }

                if (handleProp) return [prop.name, handleProp];

                return [];
            })
            .filter((i) => i.length),
    );
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
