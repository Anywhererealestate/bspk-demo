import { Tag } from '@bspk/ui/Tag';
import { useErrorLogger } from '@bspk/ui/utils/errors';
import { Markup } from 'components//Markup';
import { CodeExample } from 'components/CodeExample';
import { useComponentContext } from 'src/components/ComponentProvider';
import { ComponentRender } from 'src/components/ComponentRender';
import { components, TypeProperty } from 'src/meta';
import { kebabCase } from 'utils/kebabCase';

export function ComponentVariants() {
    const { component, propState } = useComponentContext();

    // `hideVariants` is an array of property names that should not be displayed.
    // always hide the 'open' variant
    const hiddenVariants = [...(Array.isArray(component.hideVariants) ? component.hideVariants : []), 'open'];

    const variantProperties: TypeProperty[] =
        component.props?.filter(
            (prop) =>
                !hiddenVariants.includes(prop.name) &&
                (prop.type === 'boolean' || (prop.options && prop.options?.length > 1)),
        ) || [];

    const { logError } = useErrorLogger();

    if (!variantProperties.length) return <></>;

    const Component = components[component.name as keyof typeof components];

    if (!Component) {
        logError(true, `Component "${component.name}" not found in components meta.`);
        return <p>Component not found.</p>;
    }

    const containerStyle =
        typeof component.containerStyle === 'function' ? component.containerStyle(propState) : component.containerStyle;

    const Content = component.variantsExample;

    return (
        <>
            <h2 data-nav-target id="variants">
                Variants
            </h2>

            <p>These are possible variants of the component.</p>
            {Content && (
                <div
                    style={{
                        padding: 'var(--spacing-sizing-06)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: '1px solid var(--surface-neutral-t3-low)',
                        borderRadius: 'var(--radius-sm)',
                    }}
                >
                    <Content Component={Component as typeof Content} props={component.defaultState || {}} />
                </div>
            )}
            {variantProperties.map((prop) => {
                const variants = prop.options || [true, false];
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
                            {variants?.map((option) => (
                                <div data-option-container key={`${prop.name}-${option}`}>
                                    <Tag color="grey">{option.toString()}</Tag>
                                    <ComponentRender
                                        context={{
                                            variantValue: option,
                                            variantName: prop.name,
                                        }}
                                        overrideState={{
                                            [prop.name]: option,
                                        }}
                                    />
                                </div>
                            ))}
                        </CodeExample>
                    </section>
                );
            })}
        </>
    );
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
