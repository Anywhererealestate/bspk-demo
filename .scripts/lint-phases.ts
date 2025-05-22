/**
 * $ vite-node .scripts/lint-phases.ts
 *
 * This script ensures all components not in the backlog have an example.
 */

import { COMPONENT_PHASE } from 'src/componentPhases';
import { componentExamples } from 'src/examples';

const componentsThatShouldHaveAnExample = Object.entries(COMPONENT_PHASE).filter(([component, phase]) => {
    if (phase === 'Backlog' || phase === 'Utility') return false;

    return !(component in componentExamples);
});

if (componentsThatShouldHaveAnExample.length) {
    console.error('The following components are not in the backlog and do not have an example:');
    console.error(componentsThatShouldHaveAnExample);
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
