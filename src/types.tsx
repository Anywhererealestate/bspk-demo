import { ComponentExample, DemoPreset, TypePropertyDemo } from '@bspk/ui/demo/utils';
import type { RouteObject } from 'react-router-dom';
import { ComponentMeta, TypeMeta } from 'src/meta';

export type ActionCallback = (message: string) => void;

export type Noop = () => void;

export type RouteLink = RouteObject & {
    title: string;
    hide?: boolean;
    description?: string;
    children?: RouteLink[];
    active?: boolean;
    noIndex?: boolean;
};

export type DemoComponent = Omit<ComponentExample, 'presets'> &
    Omit<ComponentMeta, 'dependencies'> & {
        name: string;
        props: TypePropertyDemo[];
        dependencies: ComponentMeta[];
        dependents: ComponentMeta[];
        references: TypeMeta[];
        presets?: DemoPreset[];
        functionProps: Record<string, () => void>;
        defaultState: Record<string, any>;
    };

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
