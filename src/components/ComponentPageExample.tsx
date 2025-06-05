import { Button } from '@bspk/ui/Button';
import { SegmentedControl } from '@bspk/ui/SegmentedControl';
import { SwitchOption } from '@bspk/ui/SwitchOption';
import { ErrorLogContext } from '@bspk/ui/utils/errors';
import { CodeExample } from 'components/CodeExample';
import { useComponentContext } from 'components/ComponentProvider';
import { TypeProps } from 'components/TypeProps';
import { useId, useMemo } from 'react';
import { components } from 'src/meta';
import { useGlobalState } from 'src/utils/globalState';
import { useComponentProps } from 'src/utils/useComponentProps';

export function ComponentPageExample() {
    const { state, resetState, changed, setPreset, preset, component } = useComponentContext();

    const { setShowTouchTarget, showTouchTarget } = useGlobalState();
    const props = useComponentProps({ 'data-example-component': true });

    const errorId = useId();

    const componentProps = useMemo(() => {
        //
        return component.propControlsOverrides
            ? component.props.map((prop) => ({ ...prop, ...component.propControlsOverrides?.[prop.name] }))
            : component.props;
    }, [component.props, component.propControlsOverrides]);

    const containerStyle =
        typeof component.containerStyle === 'function' ? component.containerStyle(props) : component.containerStyle;

    const Component = components[component.name as keyof typeof components];

    if (!Component) {
        console.warn(`Component "${component.name}" not found in components meta.`);
        return <h1>Component not available.</h1>;
    }

    return (
        <div data-example-wrapper>
            <ErrorLogContext id={errorId}>
                <CodeExample
                    containerStyle={containerStyle}
                    data-main-example
                    data-show-touch-targets={showTouchTarget || undefined}
                >
                    {component.render?.({ props, preset, Component }) || <Component {...props} />}
                </CodeExample>
            </ErrorLogContext>
            <div data-example-settings>
                <div data-presets>
                    {component.presets && preset && (
                        <SegmentedControl
                            onChange={(nextValue) => nextValue && setPreset(nextValue)}
                            options={component.presets}
                            value={preset.value}
                        />
                    )}
                </div>
                {component.hasTouchTarget && (
                    <div data-touch-target-toggle>
                        <SwitchOption
                            checked={showTouchTarget}
                            label="Show Touch Target"
                            name="data-touch-target"
                            onChange={(checked) => setShowTouchTarget(checked)}
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
                {changed && <Button label="Reset" onClick={() => resetState()} size="small" variant="secondary" />}
            </div>
            {componentProps && <TypeProps props={componentProps} state={state} />}
        </div>
    );
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
