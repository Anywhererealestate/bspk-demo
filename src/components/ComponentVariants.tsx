import { Tag } from '@bspk/ui/Tag';
import { useErrorLogger } from '@bspk/ui/utils/errors';
import { Markup } from 'components//Markup';
import { CodeExample } from 'components/CodeExample';
import { useComponentContext } from 'src/components/ComponentProvider';
import { ComponentRender } from 'src/components/ComponentRender';
import { components, TypeProperty } from 'src/meta';
import { kebabCase } from 'utils/kebabCase';

export function ComponentVariants() {
    const { component, state } = useComponentContext();

    const hiddenVariants = Array.isArray(component.hideVariants) ? component.hideVariants : [];

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
        typeof component.containerStyle === 'function' ? component.containerStyle(state) : component.containerStyle;

    return (
        <>
            <h2 data-nav-target id="variants">
                Variants
            </h2>
            <p>These are all the possible variants of the component.</p>
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
