import { Tag } from '@bspk/ui/Tag';
import { componentsMeta } from '@bspk/ui/meta';
import { Fragment } from 'react';
import { Link } from 'react-router-dom';

import { COMPONENT_PHASE } from '../componentPhases';
import { Page } from '../components/Page';
import { DEV_PHASES } from '../constants';

const componentExamplesList = Object.entries(COMPONENT_PHASE).map(([name, phase]) => ({
    name,
    phase,
    slug: componentsMeta.find((c) => c.name === name)?.slug,
}));

const progressData = Object.entries(DEV_PHASES).map(([, phase]) => {
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

                        <p>{`There ${phase.count === 1 ? 'is' : 'are'} ${phase.count === 0 ? 'no' : phase.count} component${phase.count === 1 ? '' : 's'} ${phase.descriptor}.`}</p>

                        <div
                            style={{
                                display: 'flex',
                                gap: '8px',
                                flexWrap: 'wrap',
                            }}
                        >
                            {phase.components.map((component, componentIndex) =>
                                phase.title === 'Backlog' ? (
                                    <Tag color={phase.color} key={componentIndex}>
                                        {component.name}
                                    </Tag>
                                ) : (
                                    <Tag
                                        as={Link}
                                        color={phase.color}
                                        key={componentIndex}
                                        to={{
                                            pathname: `/${component.slug}`,
                                        }}
                                    >
                                        {component.name}
                                    </Tag>
                                ),
                            )}
                        </div>
                    </Fragment>
                );
            })}
        </Page>
    );
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
