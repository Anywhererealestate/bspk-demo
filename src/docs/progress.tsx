import { Page } from 'components/Page';
import { Fragment } from 'react';
import { TagComponent } from 'src/components/TagComponent';
import { ComponentPhase, componentsMeta, COMPONENT_PHASES } from 'src/meta';

const BACKLOG_COMPONENTS = [
    'Chart',
    'FormField',
    'Image',
    'MultiSelection',
    'NavigationRail',
    'TopNavigation',
] as const;

const componentExamplesList: { name: string; phase: ComponentPhase; slug?: string }[] = [
    ...componentsMeta.map(({ name, phase, slug }) => ({
        name,
        phase,
        slug,
    })),
    ...BACKLOG_COMPONENTS.map((name) => ({
        name,
        phase: COMPONENT_PHASES.Backlog.id,
    })),
];

const progressData = Object.entries(COMPONENT_PHASES).map(([, phase]) => {
    const phaseComponents = componentExamplesList.filter((c) => c.phase === phase.id);
    return {
        ...phase,
        components: phaseComponents,
        count: phaseComponents.length,
    };
});

export function Progress() {
    return (
        <Page>
            <h1>Progress</h1>
            {progressData.map((phase) => {
                return (
                    <Fragment key={phase.id}>
                        <h2>{phase.title}</h2>

                        <p>{phase.description}</p>

                        <p>{`There ${phase.count === 1 ? 'is' : 'are'} ${phase.count === 0 ? 'no' : phase.count} component${phase.count === 1 ? '' : 's'} in this phase.`}</p>

                        <div
                            style={{
                                display: 'flex',
                                gap: '8px',
                                flexWrap: 'wrap',
                            }}
                        >
                            {phase.components.map((component, componentIndex) => (
                                <TagComponent component={component} key={componentIndex} />
                            ))}
                        </div>
                    </Fragment>
                );
            })}
        </Page>
    );
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
