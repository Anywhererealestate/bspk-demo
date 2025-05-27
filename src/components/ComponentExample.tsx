import { ElementProps } from '@bspk/ui';
import { Button } from '@bspk/ui/Button';
import { SegmentedControl } from '@bspk/ui/SegmentedControl';
import { SwitchOption } from '@bspk/ui/SwitchOption';
import { ErrorLogContext, useErrorLogger } from '@bspk/ui/utils/errors';
import { useId, useMemo } from 'react';
import { CodeExample } from 'src/components/CodeExample';
import { useComponentState } from 'src/components/ComponentStateProvider';
import { TypeProps } from 'src/components/TypeProps';
import { DemoComponent, TypePropertyExample } from 'src/types';
import { getPropsFromState } from 'utils/getPropsFromState';

export function ComponentExample({
    component,
    libraryDefaults,
    props,
    handleProps,
}: ElementProps<
    {
        component: DemoComponent;
        libraryDefaults: Record<string, unknown>;
        props: TypePropertyExample[];
        handleProps: Record<string, () => void>;
    },
    'div'
>) {
    const { Component } = component;

    const { state, resetState, changed, setPreset, setState } = useComponentState();

    const handleResetState = () => {
        resetState();
    };

    const { logError } = useErrorLogger();

    const { codeProps, codeImports, demoProps } = useMemo(
        () => getPropsFromState(state, props, handleProps, logError),
        [state, props, handleProps, logError],
    );

    const code = useMemo(() => {
        let children = '';
        let properties: Record<string, string | undefined> = { ...codeProps };
        const renders = component?.renderCode?.({ codeProps });

        if (renders?.properties) properties = { ...properties, ...renders.properties };

        if (properties.children) {
            // Remove quotes from children
            children = properties.children.replace(/^"(.+)"$/, '$1');
            delete properties.children;
        }

        if (renders?.children) children = renders.children;

        const propertiesStr = Object.entries(properties)
            .flatMap(([name, maybeValue]) => {
                if (!name) return [];

                let value = maybeValue?.toString();

                if (value === 'renderCode') {
                    const { output, imports } = props.find((p) => p.name === name)?.renderCode?.(state) || {};

                    if (!output && !imports?.length) return [];

                    codeImports.push(...(imports || []));
                    value = output;
                }

                return `${name}${value ? `=${value}` : ''}`;
            })
            .join(' ');

        return `
        import { ${component.name} } from '@bspk/ui/${component.name}';
        ${codeImports.filter(Boolean).join('\n') || ''}
      
        ${
            children
                ? `return (<${component.name} ${propertiesStr}>${children}</${component.name}>)`
                : `return (<${component.name} ${propertiesStr} />)`
        }`;
    }, [codeImports, codeProps, component, props, state]);

    const componentState = Object.fromEntries(
        props.flatMap((prop) => (prop.name && prop.name in state ? [[prop.name, state[prop.name]]] : [])),
    );

    const typePropsState = useMemo(() => ({ ...libraryDefaults, ...state }), [libraryDefaults, state]);

    const currentPreset = useMemo(() => {
        return component.presets?.[Number(state['data-preset-index'] || 0)];
    }, [state, component.presets]);

    return (
        <div data-example-wrapper>
            <ErrorLogContext id={useId()}>
                <CodeExample
                    code={code}
                    data-main-example
                    data-show-touch-targets={!!state['data-touch-target'] || undefined}
                    renderContainer={component?.renderContainer}
                    usage={component?.usage}
                >
                    {component?.render?.({
                        demoProps: { ...demoProps, ...currentPreset?.props },
                        state: componentState,
                    }) || (
                        <Component
                            data-example-component
                            {...componentState}
                            {...demoProps}
                            {...currentPreset?.props}
                        />
                    )}
                </CodeExample>
            </ErrorLogContext>
            <div data-example-settings>
                <div data-presets>
                    {component.presets && (
                        <SegmentedControl
                            onChange={(nextValue) => setPreset(nextValue || 0)}
                            options={component.presets.map((preset, index) => ({
                                label: preset.name,
                                value: `${index}`,
                            }))}
                            value={`${state['data-preset-index']}`}
                        />
                    )}
                </div>
                {component.hasTouchTarget && (
                    <div data-touch-target-toggle>
                        <SwitchOption
                            checked={!!state['data-touch-target']}
                            label="Show Touch Target"
                            name="data-touch-target"
                            onChange={(checked) => {
                                setState({ 'data-touch-target': checked });
                            }}
                            size="small"
                        />
                    </div>
                )}
            </div>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    margin: 'var(--spacing-sizing-04) 0',
                }}
            >
                <h2 data-nav-target id="properties">
                    Properties
                </h2>
                {changed && <Button label="Reset" onClick={handleResetState} size="small" variant="secondary" />}
            </div>
            <TypeProps props={props} state={typePropsState} />
        </div>
    );
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
