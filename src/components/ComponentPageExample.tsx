import { Button } from '@bspk/ui/Button';
import { SegmentedControl } from '@bspk/ui/SegmentedControl';
import { CodeExample } from 'components/CodeExample';
import { useComponentContext } from 'components/ComponentProvider';
import { ErrorLogContext } from 'components/ErrorLogContext';
import { TypeProps } from 'components/TypeProps';
import { useId } from 'react';
import { ComponentRender } from 'src/components/ComponentRender';
import { components } from 'src/meta';
import { useGlobalState } from 'src/utils/globalState';

export const CUSTOM_PRESET_VALUE = 'custom' as const;

export function ComponentPageExample() {
    const { propState, resetAllState, changed, setPreset, preset, component } = useComponentContext();

    const { showTouchTarget } = useGlobalState();

    const errorId = useId();

    const containerStyle =
        typeof component.containerStyle === 'function' ? component.containerStyle(propState) : component.containerStyle;

    if (!components[component.name as keyof typeof components]) {
        console.warn(`Component "${component.name}" not found in components meta.`);
        return <h1>Component not available.</h1>;
    }

    const props = component.props.map((p) => ({ ...p, disabled: component.disableProps?.includes(p.name) }));

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
                        {component.showExample && changed && (
                            <Button label="Reset" onClick={() => resetAllState()} size="small" variant="secondary" />
                        )}
                    </div>
                    <TypeProps props={props} state={component.showExample ? propState : undefined} />
                </>
            )}
        </>
    );
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
