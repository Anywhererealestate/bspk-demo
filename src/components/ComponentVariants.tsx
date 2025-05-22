import { Tag } from '@bspk/ui/Tag';
import { useErrorLogger } from '@bspk/ui/utils/errors';
import { useComponentState } from 'components//ComponentStateProvider';
import { Markup } from 'components//Markup';
import { CodeExample } from 'components/CodeExample';
import { TypeProperty } from 'src/meta';
import { DemoComponent, TypePropertyExample } from 'src/types';
import { getPropsFromState } from 'utils/getPropsFromState';
import { kebabCase } from 'utils/kebabCase';

export function ComponentVariants({
    props,
    handleProps,
    component,
}: {
    props: TypePropertyExample[];
    handleProps: Record<string, () => void>;
    component: DemoComponent;
}) {
    const { state } = useComponentState();

    const hiddenVariants = Array.isArray(component.hideVariants) ? component.hideVariants : [];

    const variantProperties: TypeProperty[] =
        props?.filter(
            (prop) =>
                !hiddenVariants.includes(prop.name) &&
                (prop.type === 'boolean' || (prop.options && prop.options?.length > 1)),
        ) || [];

    const { logError } = useErrorLogger();

    if (!variantProperties.length) return <></>;

    const { Component } = component;

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
                        {/* <Layout as="p" gap="4" style={{ flexWrap: 'wrap' }}>
              {variants.map((variant, index) => (
                <Tag color="grey" key={index}>{variant.toString()}</Tag>
              ))}
            </Layout> */}
                        <CodeExample style={{ marginBottom: 'var(--spacing-sizing-02)' }}>
                            {variants?.map((option) => {
                                const variantDefaultStates =
                                    component.variantDefaults?.[prop.name]?.[option.toString()];

                                const variantState = {
                                    ...state,
                                    [prop.name]: option,
                                    'data-variant-value': option,
                                    ...variantDefaultStates,
                                };
                                const { demoProps } = getPropsFromState(variantState, props, handleProps, logError);
                                return (
                                    <div data-option-container key={option.toString()}>
                                        <Tag color="grey">{option.toString()}</Tag>
                                        <div
                                            {...component?.renderContainer}
                                            style={{ ...component?.renderContainer?.style }}
                                        >
                                            {component?.render?.({ demoProps, state: variantState }) || (
                                                <Component data-example-component {...variantState} {...demoProps} />
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
