import React from 'react';
import meta from 'src/meta.json';

export const componentsMeta = meta.componentsMeta as ComponentMeta[];
export const utilitiesMeta = meta.utilitiesMeta as UtilityMeta[];
export const typesMeta = meta.typesMeta as TypeMeta[];
export const MODE = meta.MODE as 'development' | 'production';
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
    default?: unknown;
    required?: boolean;
    options?: number[] | string[];
    variants?: string[];
    properties?: TypeProperty[];
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
};

export type UtilityMeta = BaseMeta & {
    param?: string;
    returns?: string;
};

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */

export type MetaComponentName =
    | 'Avatar'
    | 'AvatarGroup'
    | 'Badge'
    | 'BannerAlert'
    | 'Button'
    | 'Card'
    | 'Checkbox'
    | 'CheckboxGroup'
    | 'CheckboxOption'
    | 'Chip'
    | 'Dialog'
    | 'Divider'
    | 'EmptyState'
    | 'Fab'
    | 'FormField'
    | 'Img'
    | 'InlineAlert'
    | 'Layout'
    | 'Link'
    | 'ListItem'
    | 'Menu'
    | 'MenuButton'
    | 'Modal'
    | 'NumberField'
    | 'NumberInput'
    | 'Popover'
    | 'Portal'
    | 'ProgressBar'
    | 'ProgressCircle'
    | 'ProgressionStepper'
    | 'ProgressionStepperBar'
    | 'Radio'
    | 'RadioGroup'
    | 'RadioOption'
    | 'SearchBar'
    | 'SegmentedControl'
    | 'Select'
    | 'SelectField'
    | 'Skeleton'
    | 'StylesProviderAnywhere'
    | 'StylesProviderBetterHomesGardens'
    | 'StylesProviderCartus'
    | 'StylesProviderCentury21'
    | 'StylesProviderColdwellBanker'
    | 'StylesProviderCorcoran'
    | 'StylesProviderDenaliBoss'
    | 'StylesProviderEra'
    | 'StylesProviderSothebys'
    | 'Switch'
    | 'SwitchOption'
    | 'TabGroup'
    | 'Table'
    | 'Tag'
    | 'Textarea'
    | 'TextareaField'
    | 'TextField'
    | 'TextInput'
    | 'ToggleOption'
    | 'Tooltip'
    | 'TopNavigation'
    | 'Txt';

export const components: Partial<Record<MetaComponentName, React.LazyExoticComponent<any>>> = {
    Avatar: React.lazy(() => import('@bspk/ui/Avatar').then((module) => ({ default: module.Avatar }))),
    AvatarGroup: React.lazy(() => import('@bspk/ui/AvatarGroup').then((module) => ({ default: module.AvatarGroup }))),
    Badge: React.lazy(() => import('@bspk/ui/Badge').then((module) => ({ default: module.Badge }))),
    BannerAlert: React.lazy(() => import('@bspk/ui/BannerAlert').then((module) => ({ default: module.BannerAlert }))),
    Button: React.lazy(() => import('@bspk/ui/Button').then((module) => ({ default: module.Button }))),
    Card: React.lazy(() => import('@bspk/ui/Card').then((module) => ({ default: module.Card }))),
    Checkbox: React.lazy(() => import('@bspk/ui/Checkbox').then((module) => ({ default: module.Checkbox }))),
    CheckboxGroup: React.lazy(() =>
        import('@bspk/ui/CheckboxGroup').then((module) => ({ default: module.CheckboxGroup })),
    ),
    CheckboxOption: React.lazy(() =>
        import('@bspk/ui/CheckboxOption').then((module) => ({ default: module.CheckboxOption })),
    ),
    Chip: React.lazy(() => import('@bspk/ui/Chip').then((module) => ({ default: module.Chip }))),
    Dialog: React.lazy(() => import('@bspk/ui/Dialog').then((module) => ({ default: module.Dialog }))),
    Divider: React.lazy(() => import('@bspk/ui/Divider').then((module) => ({ default: module.Divider }))),
    EmptyState: React.lazy(() => import('@bspk/ui/EmptyState').then((module) => ({ default: module.EmptyState }))),
    Fab: React.lazy(() => import('@bspk/ui/Fab').then((module) => ({ default: module.Fab }))),
    FormField: React.lazy(() => import('@bspk/ui/FormField').then((module) => ({ default: module.FormField }))),
    Img: React.lazy(() => import('@bspk/ui/Img').then((module) => ({ default: module.Img }))),
    InlineAlert: React.lazy(() => import('@bspk/ui/InlineAlert').then((module) => ({ default: module.InlineAlert }))),
    Layout: React.lazy(() => import('@bspk/ui/Layout').then((module) => ({ default: module.Layout }))),
    Link: React.lazy(() => import('@bspk/ui/Link').then((module) => ({ default: module.Link }))),
    ListItem: React.lazy(() => import('@bspk/ui/ListItem').then((module) => ({ default: module.ListItem }))),
    Menu: React.lazy(() => import('@bspk/ui/Menu').then((module) => ({ default: module.Menu }))),
    MenuButton: React.lazy(() => import('@bspk/ui/MenuButton').then((module) => ({ default: module.MenuButton }))),
    Modal: React.lazy(() => import('@bspk/ui/Modal').then((module) => ({ default: module.Modal }))),
    NumberField: React.lazy(() => import('@bspk/ui/NumberField').then((module) => ({ default: module.NumberField }))),
    NumberInput: React.lazy(() => import('@bspk/ui/NumberInput').then((module) => ({ default: module.NumberInput }))),
    Popover: React.lazy(() => import('@bspk/ui/Popover').then((module) => ({ default: module.Popover }))),
    Portal: React.lazy(() => import('@bspk/ui/Portal').then((module) => ({ default: module.Portal }))),
    ProgressBar: React.lazy(() => import('@bspk/ui/ProgressBar').then((module) => ({ default: module.ProgressBar }))),
    ProgressCircle: React.lazy(() =>
        import('@bspk/ui/ProgressCircle').then((module) => ({ default: module.ProgressCircle })),
    ),
    ProgressionStepper: React.lazy(() =>
        import('@bspk/ui/ProgressionStepper').then((module) => ({ default: module.ProgressionStepper })),
    ),
    ProgressionStepperBar: React.lazy(() =>
        import('@bspk/ui/ProgressionStepperBar').then((module) => ({ default: module.ProgressionStepperBar })),
    ),
    Radio: React.lazy(() => import('@bspk/ui/Radio').then((module) => ({ default: module.Radio }))),
    RadioGroup: React.lazy(() => import('@bspk/ui/RadioGroup').then((module) => ({ default: module.RadioGroup }))),
    RadioOption: React.lazy(() => import('@bspk/ui/RadioOption').then((module) => ({ default: module.RadioOption }))),
    SearchBar: React.lazy(() => import('@bspk/ui/SearchBar').then((module) => ({ default: module.SearchBar }))),
    SegmentedControl: React.lazy(() =>
        import('@bspk/ui/SegmentedControl').then((module) => ({ default: module.SegmentedControl })),
    ),
    Select: React.lazy(() => import('@bspk/ui/Select').then((module) => ({ default: module.Select }))),
    SelectField: React.lazy(() => import('@bspk/ui/SelectField').then((module) => ({ default: module.SelectField }))),
    Skeleton: React.lazy(() => import('@bspk/ui/Skeleton').then((module) => ({ default: module.Skeleton }))),
    StylesProviderAnywhere: React.lazy(() =>
        import('@bspk/ui/StylesProviderAnywhere').then((module) => ({ default: module.StylesProviderAnywhere })),
    ),
    StylesProviderBetterHomesGardens: React.lazy(() =>
        import('@bspk/ui/StylesProviderBetterHomesGardens').then((module) => ({
            default: module.StylesProviderBetterHomesGardens,
        })),
    ),
    StylesProviderCartus: React.lazy(() =>
        import('@bspk/ui/StylesProviderCartus').then((module) => ({ default: module.StylesProviderCartus })),
    ),
    StylesProviderCentury21: React.lazy(() =>
        import('@bspk/ui/StylesProviderCentury21').then((module) => ({ default: module.StylesProviderCentury21 })),
    ),
    StylesProviderColdwellBanker: React.lazy(() =>
        import('@bspk/ui/StylesProviderColdwellBanker').then((module) => ({
            default: module.StylesProviderColdwellBanker,
        })),
    ),
    StylesProviderCorcoran: React.lazy(() =>
        import('@bspk/ui/StylesProviderCorcoran').then((module) => ({ default: module.StylesProviderCorcoran })),
    ),
    StylesProviderDenaliBoss: React.lazy(() =>
        import('@bspk/ui/StylesProviderDenaliBoss').then((module) => ({ default: module.StylesProviderDenaliBoss })),
    ),
    StylesProviderEra: React.lazy(() =>
        import('@bspk/ui/StylesProviderEra').then((module) => ({ default: module.StylesProviderEra })),
    ),
    StylesProviderSothebys: React.lazy(() =>
        import('@bspk/ui/StylesProviderSothebys').then((module) => ({ default: module.StylesProviderSothebys })),
    ),
    Switch: React.lazy(() => import('@bspk/ui/Switch').then((module) => ({ default: module.Switch }))),
    SwitchOption: React.lazy(() =>
        import('@bspk/ui/SwitchOption').then((module) => ({ default: module.SwitchOption })),
    ),
    TabGroup: React.lazy(() => import('@bspk/ui/TabGroup').then((module) => ({ default: module.TabGroup }))),
    Table: React.lazy(() => import('@bspk/ui/Table').then((module) => ({ default: module.Table }))),
    Tag: React.lazy(() => import('@bspk/ui/Tag').then((module) => ({ default: module.Tag }))),
    Textarea: React.lazy(() => import('@bspk/ui/Textarea').then((module) => ({ default: module.Textarea }))),
    TextareaField: React.lazy(() =>
        import('@bspk/ui/TextareaField').then((module) => ({ default: module.TextareaField })),
    ),
    TextField: React.lazy(() => import('@bspk/ui/TextField').then((module) => ({ default: module.TextField }))),
    TextInput: React.lazy(() => import('@bspk/ui/TextInput').then((module) => ({ default: module.TextInput }))),
    ToggleOption: React.lazy(() =>
        import('@bspk/ui/ToggleOption').then((module) => ({ default: module.ToggleOption })),
    ),
    Tooltip: React.lazy(() => import('@bspk/ui/Tooltip').then((module) => ({ default: module.Tooltip }))),
    TopNavigation: React.lazy(() =>
        import('@bspk/ui/TopNavigation').then((module) => ({ default: module.TopNavigation })),
    ),
    Txt: React.lazy(() => import('@bspk/ui/Txt').then((module) => ({ default: module.Txt }))),
};
