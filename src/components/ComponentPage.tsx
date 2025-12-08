import { Button } from '@bspk/ui/Button/Button';
import { Flex } from '@bspk/ui/Flex/Flex';
import { SwitchOption } from '@bspk/ui/SwitchOption';
import { ComponentPageSection } from '@bspk/ui/utils/demo';
import { ComponentPageExample } from 'components/ComponentPageExample';
import { ComponentProvider } from 'components/ComponentProvider';
import { ComponentVariants } from 'components/ComponentVariants';
import { Markup } from 'components/Markup';
import { Syntax } from 'components/Syntax';
import { TypeProps } from 'components/TypeProps';
import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { CodeExample } from 'src/components/CodeExample';
import { CodePlayground } from 'src/components/CodePlayground';
import { Page } from 'src/components/Page';
import { TagComponent } from 'src/components/TagComponent';
import { COMPONENT_PHASES, components, MetaComponentName } from 'src/meta';
import { DemoComponent } from 'src/types';
import { generateComponentCode } from 'src/utils/generateComponentCode';
import { GitHubIcon } from 'src/utils/githubIcon';
import { useGlobalState } from 'src/utils/globalState';
import { kebabCase } from 'src/utils/kebabCase';
import { useComponentDemo } from 'src/utils/useComponentDemo';

export function ComponentPage({ componentName }: { componentName: MetaComponentName }) {
    const component = useComponentDemo(componentName);
    const { setShowTouchTarget, showTouchTarget } = useGlobalState();

    if (!component) return <h3>Component not available.</h3>;

    const Component = components[component.name as keyof typeof components];

    return (
        <Page data-component-page>
            <Flex align="center" justify="space-between" style={{ width: '100%' }}>
                <h3 title="Introduction">{component.name}</h3>
                <Flex align="center" gap="8">
                    <Button
                        as="a"
                        href={`https://github.com/Anywhererealestate/bspk-ui/blob/main/src/components/${component.name}/${component.name}.tsx`}
                        iconOnly
                        label="View Source on GitHub"
                        rel="noopener noreferrer"
                        size="small"
                        target="_blank"
                        tooltip="View Source on GitHub"
                        variant="tertiary"
                    >
                        <GitHubIcon height={24} width={24} />
                    </Button>
                    {component.phase && (
                        <TagComponent component={{ ...component, name: COMPONENT_PHASES[component.phase].title }} />
                    )}
                </Flex>
            </Flex>
            <ComponentProvider component={component}>
                <article>
                    <Markup>{component.description}</Markup>
                    {component.usage && (
                        <>
                            <h3>Basic usage</h3>
                            {!!component.usage.description && <Markup>{component.usage.description}</Markup>}
                            <CodePlayground defaultCode={component.usage.code} />
                            {/* 
                                <Syntax code={component.usage.code} language="typescript" pretty /> */}
                        </>
                    )}
                    {component.presets
                        ?.filter((p) => p.designPattern)
                        .map((preset, index) => (
                            <div
                                key={index}
                                style={{
                                    marginTop: 'var(--spacing-sizing-06)',
                                }}
                            >
                                <h3 id={kebabCase(`Design-pattern-${preset.label}`)}>{preset.label}</h3>
                                {typeof preset.designPattern === 'string' && <p>{preset.designPattern}</p>}
                                <CodePlayground defaultCode={generateComponentCode(component, preset.propState)} />
                            </div>
                        ))}
                    {component.sections
                        ?.filter((s) => s.location === 'beforeDemo')
                        .map(({ content: Content, title }, index) => (
                            <Section
                                Component={Component}
                                component={component}
                                content={Content}
                                key={index}
                                title={title}
                            />
                        ))}
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginTop: 'var(--spacing-sizing-06)',
                        }}
                    >
                        {component.showExample && (
                            <>
                                <h3>Demo</h3>
                                {component.hasTouchTarget && (
                                    <div data-touch-target-toggle style={{ marginBottom: '0.75em' }}>
                                        <SwitchOption
                                            checked={showTouchTarget}
                                            label="Show Touch Target"
                                            name="data-touch-target"
                                            onChange={(checked) => setShowTouchTarget(checked)}
                                            value="data-touch-target"
                                        />
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                    <ComponentPageExample />
                    {!!component.references?.length && (
                        <>
                            <h3>References</h3>
                            {component.references.map((ref) => (
                                <Fragment key={ref.id}>
                                    <h4 id={kebabCase(`reference-${ref.name}`)}>{ref.name}</h4>
                                    <Markup>{ref.description}</Markup>
                                    <TypeProps props={ref.properties!} />
                                </Fragment>
                            ))}
                        </>
                    )}
                    {component.showExample && component.variants !== false && <ComponentVariants />}
                    {component.sections
                        ?.filter((s) => !s.location || s.location === 'afterDemo')
                        .map(({ content: Content, title }, index) => (
                            <Section
                                Component={Component}
                                component={component}
                                content={Content}
                                key={index}
                                title={title}
                            />
                        ))}
                    {[
                        {
                            id: 'dependencies',
                            title: 'Dependencies',
                            description: 'Dependencies are components that this component relies on.',
                            components: component.dependencies,
                        },
                        {
                            id: 'dependents',
                            title: 'Dependents',
                            description: 'Dependents are components that rely on this component.',
                            components: component.dependents,
                        },
                    ].map((section) => {
                        return (
                            !!section.components.length && (
                                <Fragment key={section.title}>
                                    <h3>{section.title}</h3>
                                    <p>{section.description}</p>
                                    <p
                                        style={{
                                            display: 'flex',
                                            gap: '8px',
                                            flexWrap: 'wrap',
                                        }}
                                    >
                                        {section.components.map((d, index) => {
                                            return <TagComponent component={d} key={index} />;
                                        })}
                                    </p>
                                </Fragment>
                            )
                        );
                    })}
                    <h3>Stylesheet</h3>
                    {component.css ? (
                        <p>
                            This is the CSS for the component. The css variables used within are available in the{' '}
                            <Link to={{ pathname: '/styles' }}>styles package</Link>.
                        </p>
                    ) : (
                        <p>This component does not have any specific styles.</p>
                    )}
                    {!!component.dependencies.length && (
                        <p>
                            This component may inherit styles from one of it&apos;s{' '}
                            <a href="#dependencies">dependencies</a>.
                        </p>
                    )}
                    {component.css && (
                        <Syntax
                            code={component.css}
                            language="scss"
                            style={{ maxHeight: '400px', overflowY: 'scroll' }}
                        />
                    )}
                </article>
            </ComponentProvider>
        </Page>
    );
}

// eslint-disable-next-line react/no-multi-comp
function Section({
    content: Content,
    title,
    component,
    Component,
}: ComponentPageSection & { component: DemoComponent; Component?: React.ComponentType<any> }) {
    return (
        <div
            style={{
                marginTop: 'var(--spacing-sizing-06)',
            }}
        >
            <h3 id={kebabCase(`section-${title}`)}>{title}</h3>
            <div>
                <Content
                    CodeExample={CodeExample}
                    Component={Component}
                    Playground={CodePlayground}
                    Syntax={Syntax}
                    props={component.defaultState || {}}
                />
            </div>
        </div>
    );
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
