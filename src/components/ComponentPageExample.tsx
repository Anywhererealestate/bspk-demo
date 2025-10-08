import { Button } from '@bspk/ui/Button';
import { SegmentedControl } from '@bspk/ui/SegmentedControl';
import { useId } from '@bspk/ui/hooks/useId';
import { CodeExample } from 'components/CodeExample';
import { useComponentContext } from 'components/ComponentProvider';
import { ErrorLogContext } from 'components/ErrorLogContext';
import { TypeProps } from 'components/TypeProps';
import { useEffect, useState } from 'react';
import { ComponentRender } from 'src/components/ComponentRender';
import { Flex } from 'src/components/Flex';
import { components } from 'src/meta';
import { useGlobalState } from 'src/utils/globalState';

export const CUSTOM_PRESET_VALUE = 'custom' as const;

export function ComponentPageExample() {
    const { propState, resetAllState, setPreset, changed, preset, component, setPropState } = useComponentContext();
    const [localState, setLocalState] = useState(propState);
    useEffect(() => setLocalState(propState), [propState]);

    const [localChanged, setChanged] = useState(false);

    const onChange = (nextState: Record<string, any>) => {
        setChanged(true);
        setLocalState((prev) => {
            const next = { ...prev, ...nextState };
            return next;
        });
    };

    const { showTouchTarget } = useGlobalState();

    const errorId = useId();

    const containerStyle =
        typeof component.containerStyle === 'function' ? component.containerStyle(propState) : component.containerStyle;

    if (!components[component.name as keyof typeof components]) {
        console.warn(`Component "${component.name}" not found in components meta.`);
        return <h1>Component not available.</h1>;
    }

    const props = component.props.map((p) => ({
        ...p,
        disabled:
            component.disableProps === true ||
            (Array.isArray(component.disableProps) && component.disableProps.includes(p.name)),
    }));

    return (
        <>
            {component.showExample && (
                <div data-example-wrapper>
                    <ErrorLogContext id={errorId}>
                        <CodeExample
                            accessibility
                            containerStyle={containerStyle}
                            data-main-example
                            data-show-touch-targets={showTouchTarget || undefined}
                        >
                            <ComponentRender />
                        </CodeExample>
                    </ErrorLogContext>
                    <div data-example-settings>
                        <div data-presets>
                            {component.presets && (
                                <SegmentedControl
                                    label="Presets"
                                    onChange={setPreset}
                                    options={component.presets}
                                    value={preset?.value || CUSTOM_PRESET_VALUE}
                                />
                            )}
                        </div>
                    </div>
                </div>
            )}
            {component.props?.length > 0 && (
                <>
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            marginTop: 'var(--spacing-sizing-06)',
                        }}
                    >
                        <h2 data-nav-target id="properties">
                            Properties
                        </h2>
                        {component.showExample && (
                            <Flex>
                                {changed && (
                                    <Button
                                        label="Reset"
                                        onClick={() => {
                                            resetAllState();
                                            setChanged(false);
                                        }}
                                        size="small"
                                        variant="secondary"
                                    />
                                )}
                                {localChanged && (
                                    <Button
                                        label="Save"
                                        onClick={() => {
                                            setPropState(localState);
                                            setChanged(false);
                                        }}
                                        size="small"
                                        variant="primary"
                                    />
                                )}
                            </Flex>
                        )}
                    </div>
                    <TypeProps
                        onChange={component.disableProps !== true && component.showExample ? onChange : undefined}
                        props={props}
                        state={component.showExample ? localState : undefined}
                    />
                </>
            )}
        </>
    );
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
