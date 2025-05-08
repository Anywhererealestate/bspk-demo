import { Tag } from '@bspk/ui/Tag';
import { TypeProperty } from '@bspk/ui/meta';
import { useErrorLogger } from '@bspk/ui/utils/errors';
import { css } from '@emotion/react';

import { DemoComponent, TypePropertyExample } from '../types';
import { getPropsFromState } from '../utils/getPropsFromState';
import { kebabCase } from '../utils/kebabCase';

import { CodeExample } from './CodeExample';
import { useComponentState } from './ComponentStateProvider';
import { Markup } from './Markup';

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
                    <section key={prop.name} style={{ margin: 'var(--spacing-sizing-08) 0' }}>
                        <h4 data-nav-target="false" id={kebabCase(`variant-${prop.name}`)}>
                            {prop.name}
                        </h4>
                        <Markup data-description>{prop.description}</Markup>
                        {/* <Layout as="p" gap="4" style={{ flexWrap: 'wrap' }}>
              {variants.map((variant, index) => (
                <Tag color="grey" key={index}>{variant.toString()}</Tag>
              ))}
            </Layout> */}
                        <CodeExample
                            renderContainer={{ css: variantExampleStyle }}
                            style={{ marginBottom: 'var(--spacing-sizing-02)' }}
                        >
                            {variants?.map((option) => {
                                const variantState = { ...state, [prop.name]: option, 'data-variant-value': option };
                                const { demoProps } = getPropsFromState(variantState, props, handleProps, logError);
                                return (
                                    <div data-option-container key={option.toString()}>
                                        <Tag color="grey">{option.toString()}</Tag>
                                        <div
                                            {...component?.renderContainer}
                                            style={{ width: 'fit-content', ...component?.renderContainer?.style }}
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

const variantExampleStyle = css`
    display: flex !important;
    flex-wrap: wrap;
    gap: var(--spacing-sizing-05);

    [data-option-container] {
        display: flex;
        flex-direction: column;
        gap: var(--spacing-sizing-04);
        width: 100%;

        & + [data-option-container] {
            padding-top: var(--spacing-sizing-04);
            border-top: solid 1px var(--stroke-neutral-base);
        }
    }
`;

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
