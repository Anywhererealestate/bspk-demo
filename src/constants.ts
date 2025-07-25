import { ColorVariant } from '@bspk/ui/utils/colorVariants';
import { COMPONENT_PHASES, ComponentPhase } from 'src/meta';

export { COMPONENT_PHASES };

export const COMPONENT_PHASE_COLORS: Record<ComponentPhase, ColorVariant> = {
    Backlog: 'grey',
    Dev: 'blue',
    QA: 'yellow',
    UXReview: 'purple',
    Stable: 'green',
    Utility: 'magenta',
};

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
