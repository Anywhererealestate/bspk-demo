import { Tag } from '@bspk/ui/Tag';
import { ComponentVariantOverrides } from '@bspk/ui/utils/demo';
import { useErrorLogger } from '@bspk/ui/utils/errors';
import { Markup } from 'components//Markup';
import { CodeExample } from 'components/CodeExample';
import { useComponentContext } from 'src/components/ComponentProvider';
import { ComponentRender } from 'src/components/ComponentRender';
import { components, TypeProperty } from 'src/meta';
import { kebabCase } from 'utils/kebabCase';

export function ComponentVariants() {
    const { component, propState } = useComponentContext();
    const { logError } = useErrorLogger();

    if (component.variants === false) return <></>;

    let variantOverrides: ComponentVariantOverrides = {};
    if (typeof component.variants === 'object') variantOverrides = component.variants;

    const variantProperties: TypeProperty[] =
        component.props?.filter(
            (prop) =>
                variantOverrides[prop.name] !== false &&
                (prop.type === 'boolean' || (prop.options && prop.options?.length > 1) || variantOverrides[prop.name]),
        ) || [];

    if (!variantProperties.length) return <></>;

    const Component = components[component.name as keyof typeof components];

    if (!Component) {
        logError(true, `Component "${component.name}" not found in components meta.`);
        return <p>Component not found.</p>;
    }

    const containerStyle =
        typeof component.containerStyle === 'function' ? component.containerStyle(propState) : component.containerStyle;

    return (
        <>
            <h2 data-nav-target id="variants">
                Variants
            </h2>

            <p>These are possible variants of the component.</p>

            {variantProperties.map((prop) => {
                let options: unknown[] = prop.options || [true, false];

                const variantStateOverrides = variantOverrides[prop.name];
                if (
                    typeof variantStateOverrides === 'object' &&
                    'propOptions' in variantStateOverrides &&
                    Array.isArray(variantStateOverrides.propOptions)
                )
                    options = variantStateOverrides.propOptions;

                return (
                    <section data-variants key={prop.name} style={{ margin: 'var(--spacing-sizing-08) 0' }}>
                        <h4 data-nav-target="false" id={kebabCase(`variant-${prop.name}`)}>
                            {prop.name}
                        </h4>
                        <Markup data-description>{prop.description}</Markup>

                        <CodeExample
                            containerStyle={containerStyle}
                            style={{ marginBottom: 'var(--spacing-sizing-02)' }}
                        >
                            {options?.map((option) => {
                                const overrideState = { [prop.name]: option };

                                const secondaryOverrides: Record<string, unknown>[] = [];

                                if (variantStateOverrides) {
                                    let overrides: Record<string, unknown> = {};
                                    if (typeof variantStateOverrides === 'function')
                                        overrides = variantStateOverrides(overrideState);
                                    else overrides = variantStateOverrides;

                                    Object.entries(overrides).map(([key, value]) => {
                                        if (
                                            value &&
                                            typeof value === 'object' &&
                                            'options' in value &&
                                            Array.isArray(value.options)
                                        ) {
                                            secondaryOverrides.push(
                                                ...value.options.map((optionValue) => ({
                                                    [key]: optionValue,
                                                })),
                                            );
                                        } else {
                                            overrideState[key] = value;
                                        }
                                    });
                                }

                                return (
                                    <div data-option-container key={`${prop.name}-${option}`}>
                                        <Tag color="grey" label={String(option)} />
                                        <div data-option-render>
                                            {(secondaryOverrides.length ? secondaryOverrides : [{}]).map(
                                                (secondaryOverride, index) => (
                                                    <ComponentRender
                                                        key={`${prop.name}-${option}-${index}`}
                                                        overrideState={{ ...overrideState, ...secondaryOverride }}
                                                        variant={{
                                                            value: option,
                                                            name: prop.name,
                                                        }}
                                                    />
                                                ),
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </CodeExample>
                    </section>
                );
            })}
        </>
    );
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
