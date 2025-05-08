import { Button } from '@bspk/ui/Button';
import { Tag } from '@bspk/ui/Tag';
import { componentsMeta, MetaComponentName } from '@bspk/ui/meta';
import { css } from '@emotion/react';
import { Fragment } from '@emotion/react/jsx-runtime';
import { Link } from 'react-router-dom';

import { COMPONENT_PHASE } from '../componentPhases';
import { DEV_PHASES } from '../constants';
import { componentExamples } from '../examples';
import { DemoComponent, DevPhase } from '../types';
import { kebabCase } from '../utils/kebabCase';
import { useMountMemo } from '../utils/useMountMemo';
import { useProps } from '../utils/useProps';

import { ComponentExample } from './ComponentExample';
import { ComponentStateProvider, resetComponentState } from './ComponentStateProvider';
import { ComponentVariants } from './ComponentVariants';
import { ErrorBoundary } from './ErrorBoundary';
import { Markup } from './Markup';
import { NavContents } from './NavContents';
import { Syntax } from './Syntax';
import { TypeProps } from './TypeProps';

function ComponentPage({ componentName }: { componentName: MetaComponentName }) {
    const component: DemoComponent = useMountMemo(() => {
        const componentMeta = componentsMeta.find((c) => c.name === componentName)!;
        return {
            ...componentMeta,
            ...componentExamples[componentName]!,
            name: componentName,
            props: componentExamples[componentName]?.props,
            dependencies: componentMeta.dependencies.map((d) => componentsMeta.find((c) => c.name === d)!),
            dependents: componentsMeta.flatMap((c) => (c.dependencies.includes(componentName) ? c : [])),
        };
    });

    const { defaultState, props, libraryDefaults, references, handleProps } = useProps(component);

    if (!component || !component.Component) return <h1>Component not available.</h1>;

    const componentPhaseId: DevPhase = COMPONENT_PHASE[component.name as keyof typeof COMPONENT_PHASE] || 'Backlog';

    const phase = DEV_PHASES[componentPhaseId];

    return (
        <>
            <div css={style} data-component-page data-page>
                <header data-header>
                    <h1 data-nav-target data-nav-target-label="Introduction" id="introduction">
                        {component.name}
                    </h1>
                    {phase && (
                        <Tag as="div" color={phase.color}>
                            {phase.title}
                        </Tag>
                    )}
                </header>
                <article>
                    <Markup>{component.description}</Markup>
                    <ErrorBoundary
                        fallback={
                            <>
                                <p>Failed to render component.</p>
                                <Button
                                    label="Reset"
                                    onClick={() => resetComponentState()}
                                    size="small"
                                    variant="secondary"
                                />
                            </>
                        }
                    >
                        <ComponentStateProvider component={component} defaultState={defaultState}>
                            <ComponentExample
                                component={component}
                                handleProps={handleProps}
                                libraryDefaults={libraryDefaults}
                                props={props}
                            />
                            {!!references?.length && (
                                <>
                                    <h3 data-nav-target id="references">
                                        References
                                    </h3>
                                    {references.map((ref) => (
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
                                <ComponentVariants component={component} handleProps={handleProps} props={props} />
                            )}
                        </ComponentStateProvider>
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

export const style = css`
    [data-header] {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }
`;

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
