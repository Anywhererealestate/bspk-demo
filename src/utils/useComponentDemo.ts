import { DemoPreset, TypePropertyDemo } from '@bspk/ui/utils/demo';
import { CUSTOM_PRESET_VALUE } from 'src/components/ComponentPageExample';
import { updateComponentContext } from 'src/components/ComponentProvider';
import { TypeProperty, MetaComponentName, componentsMeta, typesMeta } from 'src/meta';
import { examples } from 'src/meta/examples';
import { DemoComponent } from 'src/types';
import { action } from 'src/utils/actions';
import { evalSafe } from 'src/utils/evalSafe';
import { useMountMemo } from 'src/utils/useMountMemo';

/**
 * Generates a default state value for a given property based on its type and requirements.
 *
 * This function handles various property types, including strings, numbers, booleans, arrays, and objects.
 *
 * It also handles special cases for properties like BspkIcon, which may have an example value.
 */
const getDefaultState = (prop: TypePropertyDemo): any => {
    if (prop.example) return prop.example;

    // if the prop is not required, we don't need to set a default value
    if (!prop.required) return;

    if (prop.type === 'string' || prop.type === 'multiline') return `Example ${prop.name}`;

    if (prop.type === 'number') return 0;

    if (prop.type === 'boolean') return false;

    if (prop.type === 'array') return [];

    if (prop.type === 'object') return {};

    if (typeof prop.type === 'string' && prop.type.startsWith('Array<')) return [];

    if (prop.options && prop.options.length > 0) {
        return prop.options[0];
    }
};

/**
 * Generates an example value for a given property based on its type and default value.
 *
 * This function handles special cases for function and array types, as well as specific component props like BspkIcon.
 *
 * It evaluates the default value safely, ensuring that it can be used in the component demo without causing errors.
 */
const getExample = (prop: TypeProperty, propNames: string[]): any => {
    const setState = updateComponentContext;

    let defaultValue = typeof prop.example === 'undefined' ? prop.default : prop.example;

    if (typeof defaultValue === 'string') defaultValue = defaultValue.trim();

    if (prop.type === 'BspkIcon' && typeof defaultValue === 'string') {
        const matchedIcon = defaultValue.match(/<Svg(.*?) \/>/);

        return matchedIcon?.[1];
    }

    // check if we need to evaluate a function or array
    if (prop.name.match(/^on[A-Z]/)) {
        const defaultExample = () => {
            if (prop.name !== 'onChange')
                return prop.required ? () => action(`Called "${prop.name}" function`) : undefined;

            // some props have value and checked properties - we look for checked first
            if (propNames.includes('checked')) return (checked: boolean) => setState({ checked });

            if (propNames.includes('value'))
                return (value: any) => {
                    setState({ value });
                };

            return () => action(`onChange function called without value or checked`, 'warning');
        };

        return evalSafe(defaultValue, defaultExample()) as () => void;
    }

    if (typeof prop.type === 'string' && prop.type.startsWith('Array<')) {
        return evalSafe(defaultValue, []);
    }

    if (typeof defaultValue === 'string' && defaultValue.startsWith('{') && defaultValue.endsWith('}')) {
        const evaluated = evalSafe(`(${defaultValue})`, {});
        return evaluated;
    }

    if (defaultValue) return defaultValue;

    if (prop.name === 'value' && typeof prop.type === 'string') {
        return '';
    }
};

/**
 * Creates or evaluates examples for function or array props.
 *
 * This ensures that the examples are safe to use in the component demo.
 *
 * Converts TypeProperty to TypePropertyDemo and sets default values for props.
 */
function setPropExamples(props: TypeProperty[]): {
    props: TypePropertyDemo[];
    functionProps: Record<string, () => void>;
    defaultState: Record<string, any>;
} {
    const propNames = props.map((prop) => prop.name);

    const nextFunctionProps: Record<string, () => void> = {};
    const defaultState: Record<string, any> = {};

    // set props, default state and function props
    const nextProps = props.map((prop) => {
        const example = getExample(prop, propNames);
        const nextProp = { ...prop, example, libraryDefault: prop.default } as TypePropertyDemo;

        if (typeof example === 'function') nextFunctionProps[prop.name] = example;
        else defaultState[prop.name] = getDefaultState(nextProp);

        return nextProp;
    });

    return {
        props: nextProps,
        defaultState,
        functionProps: nextFunctionProps,
    };
}

export function useComponentDemo(componentName: MetaComponentName) {
    return useMountMemo(() => {
        const componentMeta = componentsMeta.find((c) => c.name === componentName);

        if (!componentMeta) {
            console.warn(`Component "${componentName}" not found in components meta.`);
            return null;
        }

        const typeMeta = typesMeta?.find((t) => t.name === `${componentName}Props`);

        const example = componentName in examples && examples[componentName as keyof typeof examples];

        const componentExample = !example
            ? {}
            : typeof example === 'function'
              ? example({ action, setState: updateComponentContext, componentsMeta })
              : example;

        const { props, functionProps, defaultState } = setPropExamples(typeMeta?.properties || []);

        let presets: DemoPreset<any>[] | undefined;
        if (Array.isArray(componentExample?.presets) && componentExample.presets.length > 0) {
            presets = [
                { label: 'Custom', value: CUSTOM_PRESET_VALUE, propState: {} },
                ...componentExample.presets.map((p, index) => ({ ...p, value: `preset-${index}` })),
            ];
        }

        const nextComponent: DemoComponent<any> = {
            ...componentMeta,
            ...componentExample,
            name: componentName,
            props,
            functionProps,
            defaultState: { ...defaultState, ...componentExample?.defaultState },
            dependencies: componentMeta.dependencies.map((d) => componentsMeta.find((c) => c.name === d)!),
            dependents: componentsMeta.flatMap((c) => (c.dependencies.includes(componentName) ? c : [])),
            presets,
            references:
                typeMeta?.references?.flatMap((name) => {
                    const referenceMeta = typesMeta.find((t) => t.name === name);
                    if (!referenceMeta || !referenceMeta.properties) return [];
                    return referenceMeta;
                }) || [],
            showExample: !!componentExample.render || componentMeta.phase !== 'Utility',
        };

        return nextComponent;
    });
}
