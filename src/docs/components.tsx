/* eslint-disable react/no-multi-comp */
import { Button } from '@bspk/ui/Button/Button';
import { Divider } from '@bspk/ui/Divider/Divider';
import { Tooltip } from '@bspk/ui/Tooltip/Tooltip';
import { Txt } from '@bspk/ui/Txt/Txt';
import { COMPONENT_PHASE_COLORS as color } from '@bspk/ui/constants/phases';
import { ElementProps } from '@bspk/ui/types/common';
import { COMPONENT_PHASES } from '@bspk/ui/types/meta';
import { Page } from 'components/Page';
import { Flex } from 'src/components/Flex';
import { Grid } from 'src/components/Grid';
import { componentsMeta } from 'src/meta';

// const componentExamplesList: { name: string; phase: ComponentPhase; slug?: string }[] = [
//     ...componentsMeta.map(({ name, phase, slug }) => ({
//         name,
//         phase,
//         slug,
//     })),
//     ...BACKLOG_COMPONENTS.map((name) => ({
//         name,
//         phase: COMPONENT_PHASES.Backlog.id,
//     })),
// ];

// const progressData = Object.entries(COMPONENT_PHASES).map(([, phase]) => {
//     const phaseComponents = componentExamplesList.filter((c) => c.phase === phase.id);
//     return {
//         ...phase,
//         components: phaseComponents,
//         count: phaseComponents.length,
//     };
// });

export function Components() {
    return (
        <Page>
            <Flex direction="column" gap="var(--spacing-sizing-10)">
                <Txt variant="heading-h1">Components</Txt>
                <p>
                    Here you can find all the components available in the library. We are working on adding more
                    components.
                </p>
                <Grid columnWidths={[1, 1, 1]} gap="var(--spacing-sizing-08)" style={{ maxWidth: '900px' }}>
                    {componentsMeta
                        .filter(({ phase }) => phase !== 'Utility' && phase !== 'Backlog')
                        .map((component) => (
                            <div key={component.name}>
                                <Button
                                    as="a"
                                    href={`/${component.slug}`}
                                    label={component.name}
                                    style={{ height: 'auto', padding: 0, minWidth: 'fit-content' }}
                                    variant="tertiary"
                                    width="hug"
                                >
                                    {component.name}{' '}
                                    <Tooltip label={COMPONENT_PHASES[component.phase].title}>
                                        {(triggerProps) => <Dot {...triggerProps} color={color[component.phase]} />}
                                    </Tooltip>
                                </Button>
                            </div>
                        ))}
                </Grid>
                <Divider />
                <Flex>
                    <span>
                        UX Review <Dot color={color.UXReview} />
                    </span>
                    <span>
                        Development <Dot color={color.Dev} />
                    </span>
                </Flex>
                <Txt variant="heading-h2">Utility Components</Txt>
                <p>
                    Utility components are used to build complex components by composing simpler ones. These are not
                    meant to be used directly in applications but can be useful in prototyping and building new
                    components.
                </p>
                <Grid columnWidths={[1, 1, 1]} gap="var(--spacing-sizing-08)" style={{ maxWidth: '900px' }}>
                    {componentsMeta
                        .filter(({ phase }) => phase === 'Utility')
                        .map((component) => (
                            <div key={component.name}>
                                <Button
                                    as="a"
                                    href={`/${component.slug}`}
                                    label={component.name}
                                    style={{ height: 'auto', padding: 0, minWidth: 'fit-content' }}
                                    variant="tertiary"
                                    width="hug"
                                >
                                    {component.name}
                                </Button>
                            </div>
                        ))}
                </Grid>
            </Flex>
        </Page>
    );
}

function Dot({ color, ...props }: ElementProps<{ color: string }, 'span'>) {
    return (
        <span
            {...props}
            style={{
                display: 'inline-block',
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                backgroundColor: color,
                marginRight: '8px',
            }}
        />
    );
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */

// { progressData.map((phase) => {
//     return (
//         <Fragment key={phase.id}>
//             <h2>{phase.title}</h2>

//             <p>{phase.description}</p>

//             <p>{`There ${phase.count === 1 ? 'is' : 'are'} ${phase.count === 0 ? 'no' : phase.count} component${phase.count === 1 ? '' : 's'} in this phase.`}</p>

//             <div
//                 style={{
//                     display: 'flex',
//                     gap: '8px',
//                     flexWrap: 'wrap',
//                 }}
//             >
//                 {phase.components.map((component, componentIndex) => (
//                     <TagComponent component={component} key={componentIndex} />
//                 ))}
//             </div>
//         </Fragment>
//     );
// })}
