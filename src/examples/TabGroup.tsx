import { SvgCloud } from '@bspk/icons/Cloud';
import { SvgCloudFill } from '@bspk/icons/CloudFill';
import { SvgDiamond } from '@bspk/icons/Diamond';
import { SvgDiamondFill } from '@bspk/icons/DiamondFill';
import { SvgDoNotDisturbOn } from '@bspk/icons/DoNotDisturbOn';
import { SvgSquare } from '@bspk/icons/Square';
import { SvgSquareFill } from '@bspk/icons/SquareFill';
import { TabGroup, TabGroupProps } from '@bspk/ui/TabGroup';
import { updateComponentState } from 'src/components/ComponentStateProvider';
import { typeProps, setPresets } from 'src/examples/utils';
import { ComponentExampleProps } from 'src/types';

const presets = setPresets<TabGroupProps>([
    {
        name: 'Default',
        state: {
            value: '1',
        },
        props: {
            options: [
                { value: '1', label: 'Option 1' },
                { value: '2', label: 'Option 2' },
                { value: '3', label: 'Option 3' },
            ],
        },
        isDefault: true,
    },
    {
        name: 'With icons',
        state: {
            value: '1',
        },
        props: {
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
        },
        props: {
            options: [
                {
                    value: '1',
                    label: 'Option 1',
                    icon: <SvgDiamond />,
                    iconActive: <SvgDiamondFill />,
                    badge: 1,
                },
                { value: '2', label: 'Disabled 2', disabled: true, icon: <SvgDoNotDisturbOn />, badge: 2 },
                { value: '3', label: 'Option 3', icon: <SvgCloud />, iconActive: <SvgCloudFill />, badge: 3 },
            ],
        },
    },
]);

export const tabGroupExample: ComponentExampleProps = {
    Component: TabGroup,
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
    presets: presets,
};
