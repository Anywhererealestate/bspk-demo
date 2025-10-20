import { Button } from '@bspk/ui/Button/Button';
import { Page } from 'components/Page';
import { componentsMeta } from 'src/meta';

const BACKLOG_COMPONENTS = ['Chart', 'Image', 'MultiSelection', 'NavigationRail', 'TopNavigation'] as const;

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
            <h1>Components</h1>
            {componentsMeta
                .filter(({ phase }) => phase !== 'Utility' && phase !== 'Backlog')
                .map((component) => (
                    <Button as="a" href={`/${component.slug}`} key={component.name} label={component.name} />
                ))}
        </Page>
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
