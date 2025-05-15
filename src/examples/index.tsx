import { SvgCloud } from '@bspk/icons/Cloud';
import { SvgCloudFill } from '@bspk/icons/CloudFill';
import { SvgDiamond } from '@bspk/icons/Diamond';
import { SvgDiamondFill } from '@bspk/icons/DiamondFill';
import { SvgDoNotDisturbOn } from '@bspk/icons/DoNotDisturbOn';
import { SvgSquare } from '@bspk/icons/Square';
import { SvgSquareFill } from '@bspk/icons/SquareFill';
import { SvgIcon } from '@bspk/icons/SvgIcon';
import { Avatar, AvatarProps } from '@bspk/ui/Avatar';
import { Badge, BadgeProps } from '@bspk/ui/Badge';
import { BannerAlert, BannerAlertProps } from '@bspk/ui/BannerAlert';
import { Button } from '@bspk/ui/Button';
import { Card } from '@bspk/ui/Card';
import { Checkbox, CheckboxProps } from '@bspk/ui/Checkbox';
import { CheckboxGroup, CheckboxGroupProps } from '@bspk/ui/CheckboxGroup';
import { CheckboxOption, CheckboxOptionProps } from '@bspk/ui/CheckboxOption';
import { Chip, ChipProps } from '@bspk/ui/Chip';
import { DropdownProps } from '@bspk/ui/Dropdown';
import { DropdownField, DropdownFieldProps } from '@bspk/ui/DropdownField';
import { EmptyState, EmptyStateProps } from '@bspk/ui/EmptyState';
import { InlineAlert } from '@bspk/ui/InlineAlert';
import { Link, LinkProps } from '@bspk/ui/Link';
import { NumberField } from '@bspk/ui/NumberField';
import { NumberInput, NumberInputProps } from '@bspk/ui/NumberInput';
import { Popover, PopoverProps } from '@bspk/ui/Popover';
import { ProgressBar, ProgressBarProps } from '@bspk/ui/ProgressBar';
import { ProgressCircle, ProgressCircleProps } from '@bspk/ui/ProgressCircle';
import { ProgressionStepper, ProgressionStepperItem, ProgressionStepperProps } from '@bspk/ui/ProgressionStepper';
import { ProgressionStepperBar, ProgressionStepperBarProps } from '@bspk/ui/ProgressionStepperBar';
import { Radio, RadioProps } from '@bspk/ui/Radio';
import { RadioGroup, RadioGroupProps } from '@bspk/ui/RadioGroup';
import { RadioOption, RadioOptionProps } from '@bspk/ui/RadioOption';
import { SearchBarProps } from '@bspk/ui/SearchBar';
import { SegmentedControl, SegmentedControlProps } from '@bspk/ui/SegmentedControl';
import { Skeleton, SkeletonProps } from '@bspk/ui/Skeleton';
import { Switch, SwitchProps } from '@bspk/ui/Switch';
import { SwitchGroup, SwitchGroupProps } from '@bspk/ui/SwitchGroup';
import { SwitchOption, SwitchOptionProps } from '@bspk/ui/SwitchOption';
import { TabGroup, TabGroupProps } from '@bspk/ui/TabGroup';
import { Tag, TagProps } from '@bspk/ui/Tag';
import { TextField, TextFieldProps } from '@bspk/ui/TextField';
import { TextInput, TextInputProps } from '@bspk/ui/TextInput';
import { Textarea, TextareaProps } from '@bspk/ui/Textarea';
import { TextareaField, TextareaFieldProps } from '@bspk/ui/TextareaField';
import { Tooltip } from '@bspk/ui/Tooltip';
import { Txt, TxtProps } from '@bspk/ui/Txt';
import { MetaComponentName } from '@bspk/ui/meta';
import { TXT_VARIANTS, TxtVariant } from '@bspk/ui/utils/txtVariants';
import { useId } from 'react';

import { updateComponentState } from '../components/ComponentStateProvider';
import { Placeholder } from '../components/Placeholder';
import { ComponentExampleProps } from '../types';
import { action } from '../utils/actions';

import { buttonExample, fabExample } from './Button';
import { dialogExample } from './Dialog';
import { dividerExample } from './Divider';
import { dropdownExample } from './Dropdown';
import { ListItemExample } from './ListItem';
import { menuExample } from './Menu';
import { modalExample } from './Modal';
import { SearchBarExample } from './SearchBar';
import loremIpsum from './loremIpsum';
import { setPresets, typeProps } from './utils';

export const componentExamples: Partial<Record<MetaComponentName, ComponentExampleProps>> = {
    Link: {
        Component: (state) => {
            return (
                <div
                    style={{
                        display: 'flex',
                        width: '100%',
                        justifyContent: 'center',
                        background: state.variant === 'subtle-inverse' ? 'black' : '',

                        minHeight: ' var(--spacing-sizing-24)',
                    }}
                >
                    <Link {...state} />
                </div>
            );
        },
        props: typeProps<LinkProps>([
            {
                name: 'label',
                default: 'Link text',
            },
            {
                name: 'href',
                default: 'https://bspk.dev',
            },
        ]),
        renderContainer: {
            style: {
                display: 'flex',
                width: '100%',
                justifyContent: 'center',
                minHeight: ' var(--spacing-sizing-24)',
            },
        },
    },
    ProgressionStepperBar: {
        Component: ProgressionStepperBar,
        props: typeProps<ProgressionStepperBarProps>([
            {
                name: 'stepCount',
                default: 5,
            },
            {
                name: 'size',
                default: 'large',
            },
            {
                name: 'stepCompleted',
                default: 2,
            },
        ]),
    },
    ProgressionStepper: {
        Component: ProgressionStepper,
        props: typeProps<ProgressionStepperProps>([
            {
                name: 'steps',
                default: [
                    { name: '[Name of step to proceed forward 1]' },
                    { name: '[Name of step to proceed forward 2]' },
                    { name: '[Name of step to proceed forward 3]' },
                ] as ProgressionStepperItem[],
            },
        ]),
        presets: setPresets<ProgressionStepperProps>([
            {
                name: 'Horizontal',
                state: {
                    variant: 'horizontal',
                    currentStep: 2,
                    steps: [{ name: '[Name of step 1]' }, { name: '[Name of step 2]' }, { name: '[Name of step 3]' }],
                },
            },
            {
                name: 'Vertical',
                state: {
                    variant: 'vertical',
                    currentStep: 2,
                    steps: [
                        {
                            name: '[Name of step 1]',
                            subtext: `[${loremIpsum.mid}]`,
                        },
                        {
                            name: '[Name of step 2]',
                            subtext: `[${loremIpsum.mid}]`,
                        },
                        {
                            name: '[Name of step 3]',
                            subtext: `[${loremIpsum.mid}]`,
                        },
                    ],
                },
            },
            {
                name: 'Widget',
                state: {
                    variant: 'widget',
                    currentStep: 2,
                    steps: [
                        { name: '[Name of step 1]' },
                        { name: '[Name of step 2]' },
                        { name: '[Name of step 3]' },
                        { name: '[Name of step 4]' },
                        { name: '[Name of step 5]' },
                        { name: '[Name of step 6]' },
                        { name: '[Name of step 7]' },
                    ],
                },
            },
        ]),
    },
    ProgressBar: {
        Component: (state) => {
            return <ProgressBar {...state} />;
        },
        props: typeProps<ProgressBarProps>([
            {
                name: 'completion',
                default: 50,
            },
        ]),
    },
    NumberField: {
        Component: NumberField,
    },
    Avatar: {
        renderContainer: {
            style: { display: 'grid', width: '100%', columnFill: 'auto', columnCount: 2, justifyContent: 'center' },
        },
        Component: (state) => {
            return (
                <>
                    <div> {state['data-variant-value']}</div>
                    <Avatar {...state} />
                </>
            );
        },
        props: typeProps<AvatarProps>([
            {
                name: 'initials',
                default: 'BR',
            },
            {
                name: 'icon',
                render: (state) => {
                    return (state.icon && typeof state.icon === 'string' && <SvgIcon name={state.icon} />) || '';
                },
                renderCode: (state) => {
                    return {
                        output: `{<Svg${state.icon} />}`,
                        imports: [`import { Svg${state.icon} } from '@bspk/icons/${state.icon}';`],
                    };
                },
            },
        ]),
        presets: setPresets<AvatarProps>([
            {
                name: 'Initials',
                state: { initials: 'BR', icon: undefined, overflowCount: undefined, image: undefined },
            },
            {
                name: 'Icon',
                state: { icon: 'Person', initials: undefined, overflowCount: undefined, image: undefined },
            },
            {
                name: 'Image',
                state: { initials: undefined, icon: undefined, overflowCount: undefined, image: '/profile.jpg' },
            },
            {
                name: 'Overflow',
                state: {
                    overflowCount: 4,
                    initials: undefined,
                    icon: undefined,
                    image: undefined,
                },
            },
        ]),
    },
    NumberInput: {
        Component: NumberInput,
        props: typeProps<NumberInputProps>([
            {
                name: 'onChange',
                default: (value: number) => updateComponentState<NumberInputProps>({ value }),
            },
        ]),
    },
    Chip: {
        Component: Chip,
        props: typeProps<ChipProps>([
            {
                name: 'children',
                default: 'Chocolate',
            },
        ]),
    },
    SearchBar: {
        renderContainer: { style: { width: '280px' } },
        Component: SearchBarExample,
        props: typeProps<SearchBarProps>([]),
    },
    Menu: menuExample,
    TextareaField: {
        renderContainer: { style: { width: '280px' } },
        Component: TextareaField,
        props: typeProps<TextareaFieldProps>([
            {
                name: 'onChange',
                default: (value: string | undefined) => updateComponentState<TextareaFieldProps>({ value }),
            },
        ]),
    },
    Textarea: {
        renderContainer: { style: { width: '280px' } },
        Component: Textarea,
        props: typeProps<TextareaProps>([
            {
                name: 'onChange',
                default: (value: any) => updateComponentState<TextareaProps>({ value }),
            },
            {
                name: 'value',
                default: '[Describe the ...]',
            },
        ]),
    },
    EmptyState: {
        Component: (state) => {
            return (
                <>
                    <EmptyState {...state}>
                        <Placeholder height="200px" width="60%" />
                    </EmptyState>
                </>
            );
        },
        props: typeProps<EmptyStateProps>([
            {
                name: 'header',
                default: 'No payment methods added',
            },
            {
                name: 'body',
                default: 'Add a card to your account for faster checkout.',
            },
            {
                name: 'callToAction',
                properties: [
                    {
                        name: 'label',
                        default: 'Add payment method',
                    },
                    {
                        name: 'onClick',
                    },
                ],
            },
        ]),
    },
    Card: {
        Component: (state) => {
            let dimensions = 325;

            if (!state.hidePadding) dimensions -= 24;

            if (state.variant === 'outlined') dimensions -= 2;

            return (
                <Card {...state}>
                    <Placeholder height={dimensions} width={dimensions} />
                </Card>
            );
        },
    },
    TabGroup: {
        Component: (state) => {
            return <TabGroup {...state} />;
        },
        props: typeProps<TabGroupProps>([
            {
                name: 'onChange',
                default: (value: string | undefined) => updateComponentState<TabGroupProps>({ value }),
            },
            {
                name: 'value',
                default: '1',
            },
        ]),
        presets: setPresets<TabGroupProps>([
            {
                name: 'Default',
                state: {
                    value: '1',
                    options: [
                        { value: '1', label: 'Option 1' },
                        { value: '2', label: 'Option 2' },
                        { value: '3', label: 'Option 3' },
                    ],
                },
            },
            {
                name: 'With icons',
                state: {
                    value: '1',
                    options: [
                        { value: '1', label: 'Option 1', icon: <SvgDiamond />, iconActive: <SvgDiamondFill /> },
                        { value: '2', label: 'Disabled 2', disabled: true, icon: <SvgDoNotDisturbOn /> },
                        { value: '3', label: 'Option 3', icon: <SvgSquare />, iconActive: <SvgSquareFill /> },
                    ],
                },
            },
            {
                name: 'With badges',
                state: {
                    value: '1',
                    options: [
                        {
                            value: '1',
                            label: 'Option 1',
                            icon: <SvgDiamond />,
                            iconActive: <SvgDiamondFill />,
                            badge: 1,
                        },
                        { value: '2', label: 'Disabled 2', disabled: true, icon: <SvgDoNotDisturbOn />, badge: 2 },
                        { value: '3', label: 'Option 3', icon: <SvgCloud />, iconActive: <SvgCloudFill /> },
                    ],
                },
            },
        ]),
    },
    Badge: {
        Component: (state) => {
            return (
                <>
                    <Badge {...state} />
                    {!state.count?.toString() && <Txt>Badge will not appear if count not provided.</Txt>}
                </>
            );
        },
        props: typeProps<BadgeProps>([
            {
                name: 'count',
                default: '7',
            },
        ]),
    },
    Tooltip: {
        Component: (state) => {
            return (
                <>
                    <Tooltip label="Tooltip text" {...state} placement={[state.placement].flat()[0] || 'top'}>
                        <Button
                            label={`Hover over me ${'data-variant-value' in state ? `(${state['data-variant-value']})` : ''}`}
                            variant="secondary"
                        />
                    </Tooltip>
                </>
            );
        },
    },
    Popover: {
        Component: (state) => {
            return (
                <>
                    <Popover label="Tooltip text" {...state}>
                        <Button label={`Click me (${state.placement})`} variant="secondary" />
                    </Popover>
                </>
            );
        },
        props: typeProps<PopoverProps>([
            {
                name: 'children',
                renderCode: (state) => {
                    const placement = [state.placement].flat()[0] || 'top';
                    return {
                        output: `<Button variant="secondary" label="Hover over me (${placement})" />`,
                        imports: [`import { Button } from '@bspk/ui/Button';`],
                    };
                },
            },
            {
                name: 'header',
                default: '[This is a tooltip]',
            },
            {
                name: 'content',
                default: '[Tooltips are text labels that appear when the user hovers over or focuses on an element.]',
            },
            {
                name: 'callToAction',
                properties: [
                    {
                        name: 'label',
                        default: 'Button',
                        controlType: 'string',
                    },
                    {
                        name: 'onClick',
                    },
                ],
            },
        ]),
    },
    Skeleton: {
        Component: Skeleton,
        renderContainer: {
            style: {
                width: '280px',
                minHeight: '180px',
                position: 'relative',
            },
        },
        props: typeProps<SkeletonProps>([
            {
                name: 'variant',
                render: (state) => (Array.isArray(state?.variant) ? state.variant[0] : state.variant),
            },
        ]),
    },
    SegmentedControl: {
        Component: SegmentedControl,
        presets: setPresets<SegmentedControlProps>([
            {
                name: 'Default',
                state: {
                    value: '1',
                    options: [
                        { value: '1', label: 'Option 1' },
                        { value: '2', label: 'Option 2' },
                        { value: '3', label: 'Option 3' },
                    ],
                },
            },
            {
                name: 'With icons',
                state: {
                    value: '1',
                    options: [
                        { value: '1', label: 'Option 1', icon: <SvgDiamond />, iconActive: <SvgDiamondFill /> },
                        { value: '2', label: 'Disabled 2', disabled: true, icon: <SvgDoNotDisturbOn /> },
                        { value: '3', label: 'Option 3', icon: <SvgSquare />, iconActive: <SvgSquareFill /> },
                    ],
                },
            },
        ]),
        props: typeProps<SegmentedControlProps>([
            {
                name: 'onChange',
                default: (value: string | undefined) => updateComponentState<SegmentedControlProps>({ value }),
            },
            {
                name: 'value',
                default: '1',
            },
        ]),
    },
    ProgressCircle: {
        Component: ProgressCircle,
        props: typeProps<ProgressCircleProps>([
            {
                name: 'label',
                default: 'Saving ...',
            },
        ]),
    },
    Fab: fabExample,
    Button: buttonExample,
    Checkbox: {
        Component: (props) => <Checkbox {...props} />,
        props: typeProps<CheckboxProps>([
            {
                name: 'onChange',
                default: (checked: any) => updateComponentState<CheckboxProps>({ checked }),
            },
        ]),
    },
    Radio: {
        Component: (props) => {
            const uid = useId();
            return <Radio {...props} name={props.name + uid} />;
        },
        props: typeProps<RadioProps>([
            {
                name: 'onChange',
                default: (checked: any) => updateComponentState<RadioProps>({ checked }),
            },
        ]),
    },
    Switch: {
        Component: (props) => <Switch {...props} />,
        props: typeProps<SwitchProps>([
            {
                name: 'onChange',
                default: (checked: any) => updateComponentState<SwitchProps>({ checked }),
            },
        ]),
    },
    Dialog: dialogExample,
    Modal: modalExample,
    BannerAlert: {
        Component: BannerAlert,
        props: typeProps<BannerAlertProps>([
            {
                name: 'callToAction',
                properties: [
                    {
                        name: 'label',
                        default: '[Call to Action]',
                        controlType: 'string',
                    },
                    {
                        name: 'onClick',
                    },
                ],
            },
            {
                name: 'onClose',
                default: null,
                render: (state) => {
                    return state['onClose']?.['include-close']
                        ? () => {
                              action('Banner alert closed');
                          }
                        : null;
                },
                properties: [
                    {
                        name: 'include-close',
                        label: 'Include',
                        type: 'boolean',
                        default: false,
                    },
                ],
            },
        ]),
        variantDefaults: {
            variant: {
                informational: {
                    header: 'This is informational banner',
                },
                success: {
                    header: 'This is success banner',
                },
                warning: {
                    header: 'This is warning banner',
                },
                error: {
                    header: 'This is error banner',
                },
            },
        },
    },
    CheckboxOption: {
        Component: CheckboxOption,
        props: typeProps<CheckboxOptionProps>([
            {
                name: 'onChange',
                default: (checked: any) => updateComponentState<CheckboxOptionProps>({ checked }),
            },
        ]),
    },
    CheckboxGroup: {
        Component: CheckboxGroup,
        props: typeProps<CheckboxGroupProps>([
            {
                name: 'onChange',
                default: (values: any) => updateComponentState<CheckboxGroupProps>({ values }),
            },
            {
                name: 'options',
                default: [
                    { value: '1', label: 'Option 1' },
                    { value: '2', label: 'Option 2' },
                    { value: '3', label: 'Option 3' },
                ],
            },
        ]),
    },
    Divider: dividerExample,
    Dropdown: dropdownExample,
    DropdownField: {
        renderContainer: { style: { width: '280px' } },
        Component: DropdownField,
        props: typeProps<DropdownFieldProps>([
            {
                name: 'value',
                controlType: 'string',
            },
            {
                name: 'onChange',
                default: (value: any) => updateComponentState<DropdownProps>({ value }),
            },
            {
                name: 'options',
                default: [
                    { value: '1', label: 'Option 1' },
                    { value: '2', label: 'Option 2' },
                    { value: '3', label: 'Option 3' },
                    { value: '4', label: 'Option 4' },
                    { value: '5', label: 'Option 5' },
                    { value: '6', label: 'Option 6' },
                    { value: '7', label: 'Option 7' },
                    { value: '8', label: 'Option 8' },
                    { value: '9', label: 'Option 9' },
                    { value: '10', label: 'Option 10' },
                ],
            },
        ]),
    },
    InlineAlert: {
        Component: InlineAlert,
        renderContainer: {
            style: {
                width: '280px',
            },
        },
    },
    TextInput: {
        renderContainer: { style: { width: '280px' } },
        Component: TextInput,
        props: typeProps<TextInputProps>([
            {
                name: 'onChange',
                default: (value: any) => updateComponentState<TextInputProps>({ value }),
            },
        ]),
        presets: setPresets<TextInputProps>([
            {
                name: 'Default',
                state: {
                    type: 'text',
                    leading: undefined,
                    trailing: undefined,
                },
            },
            {
                name: 'Currency',
                state: {
                    type: 'number',
                    leading: '$',
                    trailing: undefined,
                    placeholder: 'currency',
                },
            },
            {
                name: 'Percent',
                state: {
                    type: 'number',
                    leading: undefined,
                    trailing: '%',
                    placeholder: 'percent',
                },
            },
            {
                name: 'Dimension',
                state: {
                    type: 'number',
                    leading: undefined,
                    placeholder: 'dimensions',
                    trailing: 'ft',
                },
            },
        ]),
    },
    ListItem: ListItemExample,
    RadioOption: {
        Component: RadioOption,
        props: typeProps<RadioOptionProps>([
            {
                name: 'onChange',
                default: (checked: any) => updateComponentState<RadioOptionProps>({ checked }),
            },
        ]),
    },
    RadioGroup: {
        Component: RadioGroup,
        props: typeProps<RadioGroupProps>([
            {
                name: 'onChange',
                default: (value: any) => updateComponentState<RadioGroupProps>({ value }),
            },
            {
                name: 'options',
                default: [
                    { value: '1', label: 'Option 1', description: 'Description here' },
                    { value: '2', label: 'Option 2' },
                    { value: '3', label: 'Option 3' },
                ] as RadioGroupProps['options'],
            },
        ]),
    },
    SwitchOption: {
        Component: SwitchOption,
        props: typeProps<SwitchOptionProps>([
            {
                name: 'onChange',
                default: (checked: any) => updateComponentState<SwitchOptionProps>({ checked }),
            },
        ]),
    },
    SwitchGroup: {
        Component: SwitchGroup,
        props: typeProps<SwitchGroupProps>([
            {
                name: 'onChange',
                default: (values: any) => updateComponentState<SwitchGroupProps>({ values }),
            },
            {
                name: 'options',
                default: [
                    { value: '1', label: 'Option 1' },
                    { value: '2', label: 'Option 2' },
                    { value: '3', label: 'Option 3' },
                ],
            },
        ]),
    },
    Tag: {
        Component: Tag,
        props: typeProps<TagProps>([
            {
                name: 'children',
                default: 'New',
            },
            {
                name: 'color',
                default: 'primary',
            },
        ]),
    },
    TextField: {
        Component: TextField,
        renderContainer: { style: { width: '280px' } },
        props: typeProps<TextFieldProps>([
            {
                name: 'onChange',
                default: (value: any) => updateComponentState<TextFieldProps>({ value }),
            },
        ]),
    },
    Txt: {
        Component: Txt,
        props: typeProps<TxtProps>([
            {
                name: 'variant',
                options: TXT_VARIANTS as TxtVariant[],
            },
        ]),
    },
};

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
