import { Tag } from '@bspk/ui/Tag';
import { Page } from 'components/Page';
import { Fragment } from 'react';
import { COMPONENT_PHASE_COLORS, COMPONENT_PHASES } from 'src/constants';
import { ComponentPhase, componentsMeta } from 'src/meta';

const BACKLOG_COMPONENTS = [
    'Accordion',
    'AvatarGroup',
    'BottomNavigation',
    'BottomSheet',
    'Breadcrumb',
    'ButtonDock',
    'Chart',
    'DatePicker',
    'Drawer',
    'FileUpload',
    'FormField',
    'Image',
    'Img',
    'MultiSelection',
    'NavigationRail',
    'OTPInput',
    'PageControl',
    'PasswordInput',
    'PhoneNumberInput',
    'ProgressionStepper',
    'Rating',
    'SliderInput',
    'Snackbar',
    'Table',
    'TimePicker',
    'ToggleOption',
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
                const phaseColor = COMPONENT_PHASE_COLORS[phase.id];
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
                            {phase.components.map((component, componentIndex) =>
                                phase.title === 'Backlog' || !component.slug ? (
                                    <Tag color={phaseColor} key={componentIndex} label={component.name} />
                                ) : (
                                    <a
                                        href={`/${component.slug}`}
                                        key={componentIndex}
                                        style={{
                                            textDecoration: 'none',
                                        }}
                                        title={component.name}
                                    >
                                        <Tag color={phaseColor} key={componentIndex} label={component.name} />
                                    </a>
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
