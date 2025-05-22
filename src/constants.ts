import { ColorVariant } from '@bspk/ui/utils/colorVariants';
import { DevPhase } from 'src/types';

export const DEV_PHASES: Record<
    DevPhase,
    {
        title: string;
        id: DevPhase | 'Utility';
        description: string;
        descriptor: string;
        color: ColorVariant;
    }
> = {
    Backlog: {
        title: 'Backlog',
        id: 'Backlog',
        description:
            'The component has been initiated but is currently on hold. It awaits further development and is not actively being worked on at this time.',
        descriptor: 'in the Backlog',
        color: 'grey',
    },
    WorkInProgress: {
        title: 'Work in Progress',
        id: 'WorkInProgress',
        description:
            'The component is actively under development. This phase includes the creation of visual elements and integration tests to ensure comprehensive functionality.',
        descriptor: 'currently being worked on',
        color: 'yellow',
    },
    DesignReview: {
        title: 'Design Review',
        id: 'DesignReview',
        description:
            'The component is being carefully evaluated by our Bespoke Design team. They are ensuring that it aligns with our high standards of aesthetics and user experience.',
        descriptor: 'in Design Review',
        color: 'purple',
    },
    AccessibilityReview: {
        title: 'Accessibility Review',
        id: 'AccessibilityReview',
        description:
            'The component is under thorough assessment by our Bespoke Accessibility team. They are verifying that it is inclusive and accessible to all users.',
        descriptor: 'in Accessibility Review',
        color: 'blue',
    },
    ProductionReady: {
        title: 'Production Ready',
        id: 'ProductionReady',
        description:
            'The component has successfully passed all reviews and tests. It is now officially released and ready for use in a production environment.',
        descriptor: 'which are Production Ready',
        color: 'green',
    },
    Utility: {
        title: 'Utility',
        id: 'Utility',
        description: "The component progress isn't tracked as it's a utility component.",
        descriptor: 'as a Utility',
        color: 'pink',
    },
};

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
