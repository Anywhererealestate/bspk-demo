import { Button } from '@bspk/ui/Button';
import { SwitchOption } from '@bspk/ui/SwitchOption';
import { ComponentPageExample } from 'components/ComponentPageExample';
import { ComponentProvider, resetComponentContext } from 'components/ComponentProvider';
import { ComponentVariants } from 'components/ComponentVariants';
import { ErrorBoundary } from 'components/ErrorBoundary';
import { Markup } from 'components/Markup';
import { useMetaContext } from 'components/MetaProvider';
import { NavContents } from 'components/NavContents';
import { Syntax } from 'components/Syntax';
import { TypeProps } from 'components/TypeProps';
import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { CodeExample } from 'src/components/CodeExample';
import { TagComponent } from 'src/components/TagComponent';
import { useGlobalState } from 'src/utils/globalState';
import { kebabCase } from 'src/utils/kebabCase';
import { useComponentDemo } from 'src/utils/useComponentDemo';

function ComponentPage({ componentName }: { componentName: string }) {
    const { getComponentMeta } = useMetaContext();
    const componentDemo = useComponentDemo(componentName);
    const { setShowTouchTarget, showTouchTarget } = useGlobalState();

    if (!componentDemo) return <h1>Component not available.</h1>;

    const componentMeta = getComponentMeta(componentDemo.name);

    if (!componentMeta) return <h1>Component meta not available.</h1>;

    console.log(!!componentDemo.sections, !!componentDemo.sections?.length, componentDemo);

    return (
        <>
            <div data-component-page data-page>
                <header data-header>
                    <h1 data-nav-target data-nav-target-label="Introduction" id="introduction">
                        {componentDemo.name}
                    </h1>
                    {componentDemo.phase && (
                        <TagComponent component={{ ...componentDemo, phase: componentMeta.phase }} />
                    )}
                </header>
                <article>
                    <Markup>{componentDemo.description}</Markup>
                    {componentDemo.usage && (
                        <>
                            <h2 data-nav-target id="usage">
                                Usage
                            </h2>
                            {!!componentDemo.usage.description && <Markup>{componentDemo.usage.description}</Markup>}
                            <Syntax code={componentDemo.usage.code} language="typescript" pretty />
                        </>
                    )}
                    {componentDemo.sections?.map(({ content: Content, title }, index) => (
                        <div
                            key={index}
                            style={{
                                marginTop: 'var(--spacing-sizing-06)',
                            }}
                        >
                            <h2 data-nav-target id={`section-${index}`}>
                                {title}
                            </h2>
                            <div>
                                <Content
                                    CodeExample={CodeExample}
                                    Component={Content}
                                    Syntax={Syntax}
                                    props={componentDemo.defaultState || {}}
                                />
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
                        {componentDemo.showExample && (
                            <>
                                <h2 data-nav-target id="demo">
                                    Demo
                                </h2>
                                {componentDemo.hasTouchTarget && (
                                    <div data-touch-target-toggle style={{ marginBottom: '0.75em' }}>
                                        <SwitchOption
                                            checked={showTouchTarget}
                                            label="Show Touch Target"
                                            name="data-touch-target"
                                            onChange={(checked) => setShowTouchTarget(checked)}
                                        />
                                    </div>
                                )}
                            </>
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
                        <ComponentProvider component={componentDemo}>
                            <ComponentPageExample />
                            {!!componentDemo.references?.length && (
                                <>
                                    <h3 data-nav-target id="references">
                                        References
                                    </h3>
                                    {componentDemo.references.map((ref) => (
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
                            {componentDemo.showExample && componentDemo.variants !== false && <ComponentVariants />}
                        </ComponentProvider>
                    </ErrorBoundary>
                    {[
                        {
                            id: 'dependencies',
                            title: 'Dependencies',
                            description: 'Dependencies are components that this component relies on.',
                            components: componentDemo.dependencies,
                        },
                        {
                            id: 'dependents',
                            title: 'Dependents',
                            description: 'Dependents are components that rely on this component.',
                            components: componentDemo.dependents,
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
                                            return <TagComponent component={d} key={index} />;
                                        })}
                                    </p>
                                </Fragment>
                            )
                        );
                    })}
                    <h3 data-nav-target id="style">
                        Style
                    </h3>
                    {componentDemo.css ? (
                        <p>
                            This is the CSS for the component. The css variables used within are available in the{' '}
                            <Link to={{ pathname: '/styles' }}>styles package</Link>.
                        </p>
                    ) : (
                        <p>This component does not have any specific styles.</p>
                    )}
                    {!!componentDemo.dependencies.length && (
                        <p>
                            This component may inherit styles from one of it&apos;s{' '}
                            <a href="#dependencies">dependencies</a>.
                        </p>
                    )}
                    {componentDemo.css && (
                        <Syntax
                            code={componentDemo.css}
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
