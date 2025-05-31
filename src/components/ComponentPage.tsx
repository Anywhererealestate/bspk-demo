import { Button } from '@bspk/ui/Button';
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
import { COMPONENT_PHASE } from 'src/componentPhases';
import { DEV_PHASES } from 'src/constants';
import { MetaComponentName } from 'src/meta';
import { kebabCase } from 'src/utils/kebabCase';
import { useComponentDemo } from 'src/utils/useComponentDemo';

function ComponentPage({ componentName }: { componentName: MetaComponentName }) {
    const component = useComponentDemo(componentName);

    if (!component) return <h1>Component not available.</h1>;

    return (
        <>
            <div data-component-page data-page>
                <header data-header>
                    <h1 data-nav-target data-nav-target-label="Introduction" id="introduction">
                        {component.name}
                    </h1>
                    {component.phase && (
                        <Tag as="div" color={component.phase.color}>
                            {component.phase.title}
                        </Tag>
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
                    <h2 data-nav-target id="demo">
                        Demo
                    </h2>
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

                    {!!component.dependencies.length && (
                        <>
                            <h3 data-nav-target id="dependencies">
                                Dependencies
                            </h3>
                            <p>Dependencies are components that this component relies on.</p>
                            <p
                                style={{
                                    display: 'flex',
                                    gap: '8px',
                                    flexWrap: 'wrap',
                                }}
                            >
                                {component.dependencies.map((d, index) => {
                                    const dependencyPhaseId = COMPONENT_PHASE[d.name as MetaComponentName] || 'Backlog';

                                    const dependencyPhase = DEV_PHASES[dependencyPhaseId];

                                    return dependencyPhaseId === 'Backlog' ? (
                                        <Tag color="grey" key={index}>
                                            {d.name}
                                        </Tag>
                                    ) : (
                                        <Tag
                                            as={Link}
                                            color={dependencyPhase?.color}
                                            key={index}
                                            to={{
                                                pathname: `/${d.slug}`,
                                            }}
                                        >
                                            {d.name}
                                        </Tag>
                                    );
                                })}
                            </p>
                        </>
                    )}
                    {!!component.dependents.length && (
                        <>
                            <h3 data-nav-target id="dependents">
                                Dependents
                            </h3>
                            <p>Dependents are components that rely on this component.</p>
                            <p
                                style={{
                                    display: 'flex',
                                    gap: '8px',
                                    flexWrap: 'wrap',
                                }}
                            >
                                {component.dependents.map((d, index) => {
                                    const dependencyPhaseId = COMPONENT_PHASE[d.name as MetaComponentName] || 'Backlog';

                                    const dependencyPhase = DEV_PHASES[dependencyPhaseId];

                                    return dependencyPhaseId === 'Backlog' ? (
                                        <Tag color="grey" key={index}>
                                            {d.name}
                                        </Tag>
                                    ) : (
                                        <Tag
                                            as={Link}
                                            color={dependencyPhase?.color}
                                            key={index}
                                            to={{
                                                pathname: `/${d.slug}`,
                                            }}
                                        >
                                            {d.name}
                                        </Tag>
                                    );
                                })}
                            </p>
                        </>
                    )}
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

                    <h5 style={{ marginTop: 'var(--spacing-sizing-18)' }}>Last Modified</h5>
                    <p style={{ paddingBottom: 'var(--spacing-sizing-18)' }}>
                        {new Intl.DateTimeFormat('en-US', {
                            dateStyle: 'full',
                            timeStyle: 'long',
                        }).format(new Date(component.modified))}
                    </p>
                </article>
            </div>
            <NavContents />
        </>
    );
}

export { ComponentPage };

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
