import { Button } from '@bspk/ui/Button';
import { SwitchOption } from '@bspk/ui/SwitchOption';
import { Tag } from '@bspk/ui/Tag';
import { ComponentPageExample } from 'components/ComponentPageExample';
import { ComponentProvider, resetComponentContext } from 'components/ComponentProvider';
import { ComponentVariants } from 'components/ComponentVariants';
import { ErrorBoundary } from 'components/ErrorBoundary';
import { Markup } from 'components/Markup';
import { NavContents } from 'components/NavContents';
import { Syntax } from 'components/Syntax';
import { TypeProps } from 'components/TypeProps';
import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { COMPONENT_PHASES, COMPONENT_PHASE_COLORS } from 'src/constants';
import { components, MetaComponentName } from 'src/meta';
import { useGlobalState } from 'src/utils/globalState';
import { kebabCase } from 'src/utils/kebabCase';
import { useComponentDemo } from 'src/utils/useComponentDemo';

function ComponentPage({ componentName }: { componentName: MetaComponentName }) {
    const component = useComponentDemo(componentName);
    const { setShowTouchTarget, showTouchTarget } = useGlobalState();

    if (!component) return <h1>Component not available.</h1>;

    const componentPhase = COMPONENT_PHASES[component.phase || 'Backlog'];

    const Component = components[component.name as keyof typeof components];

    return (
        <>
            <div data-component-page data-page>
                <header data-header>
                    <h1 data-nav-target data-nav-target-label="Introduction" id="introduction">
                        {component.name}
                    </h1>
                    {component.phase && (
                        <Tag label={componentPhase.title} color={COMPONENT_PHASE_COLORS[component.phase]} />
                    )}
                </header>
                <article>
                    <Markup>{component.description}</Markup>
                    {component.usage && (
                        <>
                            <h2 data-nav-target id="usage">
                                Usage
                            </h2>
                            {!!component.usage.description && <Markup>{component.usage.description}</Markup>}
                            <Syntax code={component.usage.code} language="typescript" pretty />
                        </>
                    )}
                    {component.sections?.map(({ content: Content, title }, index) => (
                        <div
                            key={index}
                            style={{
                                marginTop: 'var(--spacing-sizing-06)',
                            }}
                        >
                            <h2 data-nav-target id={`section-${index}`}>
                                {title}
                            </h2>
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
                        </div>
                    ))}
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginTop: 'var(--spacing-sizing-06)',
                        }}
                    >
                        <h2 data-nav-target id="demo">
                            Demo
                        </h2>
                        {component.hasTouchTarget && (
                            <div data-touch-target-toggle style={{ marginBottom: '0.75em' }}>
                                <SwitchOption
                                    checked={showTouchTarget}
                                    label="Show Touch Target"
                                    name="data-touch-target"
                                    onChange={(checked) => setShowTouchTarget(checked)}
                                />
                            </div>
                        )}
                    </div>
                    <ErrorBoundary
                        fallback={
                            <>
                                <p>Failed to render component.</p>
                                <Button
                                    label="Reset"
                                    onClick={() => resetComponentContext()}
                                    size="small"
                                    variant="secondary"
                                />
                            </>
                        }
                    >
                        <ComponentProvider component={component}>
                            <ComponentPageExample />
                            {!!component.references?.length && (
                                <>
                                    <h3 data-nav-target id="references">
                                        References
                                    </h3>
                                    {component.references.map((ref) => (
                                        <Fragment key={ref.id}>
                                            <h4 data-nav-target="false" id={kebabCase(ref.name)}>
                                                {ref.name}
                                            </h4>
                                            <Markup>{ref.description}</Markup>
                                            <TypeProps props={ref.properties!} />
                                        </Fragment>
                                    ))}
                                </>
                            )}
                            {(!component.hideVariants || Array.isArray(component.hideVariants)) && (
                                <ComponentVariants />
                            )}
                        </ComponentProvider>
                    </ErrorBoundary>
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
                                    <h3 data-nav-target id={section.id}>
                                        {section.title}
                                    </h3>
                                    <p>{section.description}</p>
                                    <p
                                        style={{
                                            display: 'flex',
                                            gap: '8px',
                                            flexWrap: 'wrap',
                                        }}
                                    >
                                        {section.components.map((d, index) => {
                                            const dependencyPhase = COMPONENT_PHASES[d.phase || 'Backlog'];
                                            const dependencyPhaseColor = COMPONENT_PHASE_COLORS[dependencyPhase.id];

                                            return dependencyPhase.id === 'Backlog' ? (
                                                <Tag color="grey" key={index} label={d.name} />
                                            ) : (
                                                <Tag
                                                    color={dependencyPhaseColor}
                                                    key={index}
                                                    label={d.name}
                                                    // to={{
                                                    //     pathname: `/${d.slug}`,
                                                    // }}
                                                />
                                            );
                                        })}
                                    </p>
                                </Fragment>
                            )
                        );
                    })}
                    <h3 data-nav-target id="style">
                        Style
                    </h3>
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
            </div>
            <NavContents />
        </>
    );
}

export { ComponentPage };

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
