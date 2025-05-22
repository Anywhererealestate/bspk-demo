import { LogError } from '@bspk/ui/utils/errors';
import { TypePropertyExample } from 'src/types';

export function getPropsFromState(
    state: Record<string, any>,
    props: TypePropertyExample[],
    handleProps: Record<string, () => void>,
    logError: LogError,
) {
    const imports: string[] = [];

    const demoProperties = Object.fromEntries(
        props.map((prop) => {
            if (prop?.render) return [prop.name, prop?.render(state)];

            const propHandle = handleProps[prop.name];
            let propValue = state[prop.name];

            if (prop.properties) {
                return [
                    prop.name,
                    Object.fromEntries(
                        prop.properties.map((childProp) => {
                            let childValue = propValue?.[childProp.name];

                            const childPropHandle =
                                propHandle &&
                                typeof propHandle === 'object' &&
                                (propHandle as Record<string, () => void>)[childProp.name];

                            if (typeof childPropHandle === 'function') childValue = childPropHandle;

                            if (childProp.required)
                                logError(
                                    childValue === undefined || childValue === null || childValue === '',
                                    `The prop "${prop.name}/${childProp.name}" is required but not provided`,
                                );

                            return [childProp.name, childValue];
                        }) as any,
                    ),
                ];
            }

            if (typeof propHandle === 'function') propValue = propHandle;

            if (prop.required)
                logError(
                    propValue === undefined || propValue === null || propValue === '',
                    `The prop "${prop.name}" is required but not provided`,
                );

            return [prop.name, propValue];
        }),
    );

    const codeProperties = Object.fromEntries(
        Object.entries(demoProperties).map(([name, demoValue]) => {
            const value = demoValue;
            const prop = props.find((p) => p.name === name)!;
            const valueType = typeof value;

            if (prop?.renderCode) return [name, 'renderCode'];

            if (value === undefined || value === false) return ['', ''];
            if (value === true) return [name, ''];
            if (prop.type === 'number' || valueType === 'number') return [name, `{${value}}`];
            if (valueType === 'string') return [name, `"${value}"`];
            if (valueType === 'function') return [name, `{${value}}`];
            if (valueType === 'object') {
                let objectStr = '';

                try {
                    objectStr = JSON.stringify(value, (_, val) => {
                        if (typeof val === 'function') {
                            return `FUNC>${val}<FUNC`.replace(/\n|\s{2,}/g, ' ');
                        }
                        return val;
                    });
                } catch {
                    // do nothing
                    console.warn('Error parsing prop', prop, value);
                }

                return [name, `{${objectStr}}`.replace(/"FUNC>(.*)<FUNC"/g, (_, b) => b)];
            }

            return [name, `{${value}}`];
        }),
    );

    return {
        demoProps: demoProperties,
        codeProps: codeProperties,
        codeImports: imports,
    };
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
