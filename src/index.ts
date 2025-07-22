import React from 'react';
import meta from 'src/meta/data.json';

export const componentsMeta = meta.componentsMeta as ComponentMeta[];
export const utilitiesMeta = meta.utilitiesMeta as UtilityMeta[];
export const typesMeta = meta.typesMeta as TypeMeta[];
export const MODE = meta.MODE as 'development' | 'production' | 'test';
export const UI_HASH = meta.UI_HASH as string;
export const VERSION = meta.VERSION as string;
export const BUILD = meta.BUILD as string;

/**
 * This file is used to build the meta types for the project. It's used in the build-meta.ts file and also copied in to
 * the meta output file.
 */

export type BaseMeta = {
    name: string;
    description?: string;
    file?: string;
    example?: string;
};

export type TypeMeta = BaseMeta & {
    id: string;
    references?: string[];
    properties?: TypeProperty[];
    components?: string[];
};

export type TypeProperty = {
    name: string;
    description?: string;
    type?: string[] | string;
    exampleType?: string;
    default?: unknown;
    required?: boolean;
    options?: number[] | string[];
    variants?: string[];
    references?: string[];
    minimum?: number;
    maximum?: number;
    example?: string;
};

export type ComponentMeta = BaseMeta & {
    slug: string;
    dependencies: string[];
    css: string;
    hasTouchTarget: boolean;
    usage?: {
        code: string;
        description?: string;
    };
    phase: ComponentPhase;
};

export type UtilityMeta = BaseMeta & {
    param?: string;
    returns?: string;
};

export type ComponentPhase =
    | 'AccessibilityReview'
    | 'Backlog'
    | 'DesignReview'
    | 'EngineeringReview'
    | 'ProductionReady'
    | 'Utility'
    | 'WorkInProgress';

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */

export type MetaComponentName = 'Skeleton';

export const components: Partial<Record<MetaComponentName, React.LazyExoticComponent<any>>> = {
    Skeleton: React.lazy(() => import('@bspk/ui/Skeleton').then((module) => ({ default: module.Skeleton }))),
};
