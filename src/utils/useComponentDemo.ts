import { DevPhase, TypePropertyDemo } from '@bspk/ui/demo/examples';
import { COMPONENT_PHASE } from 'src/componentPhases';
import { updateComponentContext } from 'src/components/ComponentProvider';
import { DEV_PHASES } from 'src/constants';
import { componentExamples } from 'src/examples';
import { TypeProperty, MetaComponentName, componentsMeta, typesMeta } from 'src/meta';
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

    const defaultValue = typeof prop.example === 'undefined' ? prop.default : prop.example;

    if (prop.type === 'BspkIcon' && typeof defaultValue === 'string') {
        const matchedIcon = defaultValue.match(/<Svg(.*?) \/>/);

        return matchedIcon?.[1];
    }

    // check if we need to evaluate a function or array
    if (prop.name.match(/^on[A-Z]/)) {
        const defaultExample = () => {
            if (prop.name !== 'onChange') return () => action(`Called "${prop.name}" function`);

            // some props have value and checked properties - we look for checked first
            if (propNames.includes('checked')) return (checked: boolean) => setState({ checked });

            if (propNames.includes('value'))
                return (value: any) => {
                    setState({ value });
                };

            return () => action(`onChange function called without value or checked`);
        };

        return evalSafe(defaultValue, defaultExample()) as () => void;
    }

    if (typeof prop.type === 'string' && prop.type.startsWith('Array<')) {
        return evalSafe(defaultValue, []);
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

    // set examples
    const nextProps = props.map((prop) => {
        const example = getExample(prop, propNames);
        return { ...prop, example, libraryDefault: prop.default } as TypePropertyDemo;
    });

    const nextFunctionProps: Record<string, () => void> = {};
    const defaultState: Record<string, any> = {};

    // set default state and function props
    nextProps.forEach((prop) => {
        if (typeof prop.example === 'function') nextFunctionProps[prop.name] = prop.example;
        else defaultState[prop.name] = getDefaultState(prop);
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
        const componentExample = componentExamples[componentName];

        const { props, functionProps, defaultState } = setPropExamples(typeMeta?.properties || []);

        const componentPhaseId: DevPhase = COMPONENT_PHASE[componentName] || 'Backlog';

        const presets = componentExample?.presets?.map((p, index) => ({ ...p, value: `preset-${index}` }));
        if (presets && presets.length > 0) presets.unshift({ label: 'Default', value: 'default' });

        const nextComponent: DemoComponent = {
            ...componentMeta,
            ...componentExample,
            name: componentName,
            props,
            functionProps,
            defaultState,
            dependencies: componentMeta.dependencies.map((d) => componentsMeta.find((c) => c.name === d)!),
            dependents: componentsMeta.flatMap((c) => (c.dependencies.includes(componentName) ? c : [])),
            presets,
            propRenderOverrides: componentExample?.propRenderOverrides,
            references:
                typeMeta?.references?.flatMap((name) => {
                    const referenceMeta = typesMeta.find((t) => t.name === name);
                    if (!referenceMeta || !referenceMeta.properties) return [];
                    return referenceMeta;
                }) || [],
            phase: DEV_PHASES[componentPhaseId],
        };
        return nextComponent;
    });
}
