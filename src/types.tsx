import type { ComponentProps, ComponentType, ReactElement, ReactNode } from 'react';
import type { RouteObject } from 'react-router-dom';
import { ComponentMeta, MetaComponentName, TypeProperty } from 'src/meta';

export type DemoComponent = ComponentExampleProps &
    Omit<ComponentMeta, 'dependencies'> & {
        name: MetaComponentName;
        props?: TypeExample;
        dependencies: ComponentMeta[];
        dependents: ComponentMeta[];
    };

export type ActionCallback = (message: string) => void;

export type Noop = () => void;

export type TypeExample = TypePropertyExample[];

export type TypePropertyExample = TypeProperty & {
    render?: (state: any) => any;
    renderCode?: (state: any) => {
        imports?: string[];
        output?: string;
    };
    properties?: TypePropertyExample[];
    libraryDefault?: TypeProperty['default'];
    label?: string;
    controlType?: string;
};

export type TypePropertyExampleWithControls = Pick<TypeProperty, 'type'> &
    TypePropertyExample & {
        haveControl: boolean;
        typeOptions: number[] | string[] | undefined;
        properties?: TypePropertyExampleWithControls[];
        multiline?: boolean;
    };

export type RenderWrap = ({ children }: { children: ReactNode }) => ReactNode;

export type DevPhase =
    | 'AccessibilityReview'
    | 'Backlog'
    | 'DesignReview'
    | 'ProductionReady'
    | 'Utility'
    | 'WorkInProgress';

export type ComponentExampleRenderProps = {
    demoProps: Record<string, any>;
    state: Record<string, any>;
};

export type ComponentExampleProps<Props extends Record<string, any> = Record<string, any>> = {
    Component: ComponentType<any>;
    renderContainer?: ComponentProps<'div'>;
    render?: (params: ComponentExampleRenderProps) => ReactElement;
    renderCode?: (params: { codeProps: Record<string, string | undefined> }) => {
        imports: (string | undefined)[];
        children?: string;
        properties?: Record<string, string | undefined>;
    };
    props?: TypePropertyExample[];
    hideVariants?: string[] | true;
    presets?: Preset<Props>[];
    defaults?: Partial<Props>;
    /** The default state for each of the variants. */
    variantDefaults?: {
        [variantName: string]: {
            [variantValue: string]: Record<string, any>;
        };
    };
};

export type Preset<TComponentProps> = {
    /** The name of the preset. This is used to display the preset in the UI. */
    name: string;
    /** The state of the component. This is used to set the initial state of the component. */
    state?: Partial<TComponentProps>;
    /** The props of the component. This is used to set props of the component. These values can't be changed in the UI. */
    props?: Partial<TComponentProps>;
    /** Determines if the preset is the default preset. This is used to set the initial state of the component. */
    isDefault?: boolean;
};

export type RouteLink = RouteObject & {
    title: string;
    hide?: boolean;
    description?: string;
    children?: RouteLink[];
    active?: boolean;
    noIndex?: boolean;
};

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
