import { Tag } from '@bspk/ui/Tag';
import { DemoPreset } from '@bspk/ui/demo/utils';
import { useErrorLogger } from '@bspk/ui/utils/errors';
import { Markup } from 'components//Markup';
import { CodeExample } from 'components/CodeExample';
import { useComponentContext } from 'src/components/ComponentProvider';
import { components, TypeProperty } from 'src/meta';
import { DemoComponent } from 'src/types';
import { useComponentProps } from 'src/utils/useComponentProps';
import { kebabCase } from 'utils/kebabCase';

export function ComponentVariants() {
    const { component, preset } = useComponentContext();
    const componentProps = useComponentProps();

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
        typeof component.containerStyle === 'function'
            ? component.containerStyle(componentProps)
            : component.containerStyle;

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
                                    <VariantExample
                                        Component={Component}
                                        component={component as DemoComponent}
                                        option={option}
                                        preset={preset as DemoPreset}
                                        prop={prop}
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

// eslint-disable-next-line react/no-multi-comp
function VariantExample({
    option,
    prop,
    Component,
    component,
    preset,
}: {
    option: boolean | number | string;
    prop: TypeProperty;
    Component: React.ComponentType<any>;
    component: DemoComponent;
    preset: DemoPreset;
}) {
    const componentProps = useComponentProps(
        {
            [prop.name]: option,
        },
        {
            variantValue: option,
            variantName: prop.name,
        },
    );

    return <>{component.render?.({ props: componentProps, preset, Component }) || <Component {...componentProps} />}</>;
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
