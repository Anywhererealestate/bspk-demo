import { Flex } from '@bspk/ui/Flex';
import { Select } from '@bspk/ui/Select/Select';
import { Tag } from '@bspk/ui/Tag/Tag';
import { Tooltip } from '@bspk/ui/Tooltip/Tooltip';
import { useId } from '@bspk/ui/hooks/useId';
import { CodeExample } from 'components/CodeExample';
import { useComponentContext } from 'components/ComponentProvider';
import { ErrorLogContext } from 'components/ErrorLogContext';
import { TypeProps } from 'components/TypeProps';
import { ComponentRender } from 'src/components/ComponentRender';
import { components } from 'src/meta';
import { useGlobalState } from 'src/utils/globalState';

export function ComponentPageExample() {
    const { propState, setPreset, preset, component, setPropState } = useComponentContext();

    const { showTouchTarget } = useGlobalState();

    const errorId = useId();

    if (!components[component.name as keyof typeof components]) {
        console.warn(`Component "${component.name}" not found in components meta.`);
        return <h2>Component not available.</h2>;
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
                <ErrorLogContext id={errorId}>
                        <CodeExample
                            accessibility
                            containerStyle={component.containerStyle}
                            data-main-example
                            data-show-touch-targets={showTouchTarget || undefined}
                        >
                            <ComponentRender />
                        </CodeExample>
                    </ErrorLogContext>
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
                        <h2 title="Props">{component.name}Props</h2>
                        {component.showExample && (
                            <Flex>
                                {!!component.presets?.length && (
                                    <div>
                                        <Select
                                            aria-label="Preset"
                                            menuWidth="max-content"
                                            name="preset-select"
                                            onChange={(value) => setPreset(value as string)}
                                            options={
                                                component.presets
                                                    .filter((p) => !p.hideDemo)
                                                    .map((p) => ({
                                                        label: p.label,
                                                        value: p.value,
                                                        id: p.value,
                                                        trailing: p.designPattern ? (
                                                            <Tooltip
                                                                label={
                                                                    typeof p.designPattern === 'string'
                                                                        ? p.designPattern
                                                                        : ''
                                                                }
                                                            >
                                                                {(...triggerProps) => (
                                                                    <Tag
                                                                        {...triggerProps}
                                                                        color="blue"
                                                                        label="Design Pattern"
                                                                        size="x-small"
                                                                    />
                                                                )}
                                                            </Tooltip>
                                                        ) : null,
                                                    })) || []
                                            }
                                            placeholder="Select Preset"
                                            size="small"
                                            value={preset?.value}
                                        />
                                    </div>
                                )}
                            </Flex>
                        )}
                    </div>
                    <TypeProps
                        onChange={component.disableProps !== true && component.showExample ? setPropState : undefined}
                        props={props}
                        state={component.showExample ? propState : undefined}
                    />
                </>
            )}
        </>
    );
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
