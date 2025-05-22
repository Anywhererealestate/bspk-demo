import { AvatarProps, Avatar } from '@bspk/ui/Avatar';
import { Dropdown, DropdownProps } from '@bspk/ui/Dropdown';
import { MenuItem } from '@bspk/ui/Menu';
import { Tag } from '@bspk/ui/Tag';
import { Txt } from '@bspk/ui/Txt';
import { ColorVariant } from '@bspk/ui/utils/colorVariants';
import { updateComponentState } from 'src/components/ComponentStateProvider';
import { typeProps, setPresets, asProps } from 'src/examples/utils';
import { ComponentExampleProps } from 'src/types';

export const dropdownExample: ComponentExampleProps = {
    renderContainer: { style: { width: '300px' } },
    Component: (state) => {
        return <Dropdown {...state} />;
    },
    props: typeProps<DropdownProps<any>>([
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
        {
            name: 'renderListItem',
            renderCode: (state) => {
                if (state['data-preset-name'] === 'Multi') return {};
                if (state['data-preset-name'] === 'Simple') return {};
                if (state['data-preset-name'] === 'Trailing Tags')
                    return {
                        output: `{(props) => {
            return {
              trailing:
                props.item.tag && props.item.tagColor ? (
                  <Tag color={props.item.tagColor!} size="x-small">
                    {props.item.tag}
                  </Tag>
                ) : null,
            };
          }}`,
                        imports: [],
                    };
                if (state['data-preset-name'] === 'Trailing Text')
                    return {
                        imports: ["import { Txt } from '@bspk/ui/Txt';"],
                        output: `{(props) => {
            return {
              trailing: (
                <Txt>{\`\${new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: 'USD',
                }).format(props.item.price / 100)}\`}</Txt>
              ),
            };
          }}`,
                    };
                if (state['data-preset-name'] === 'Leading Avatar')
                    return {
                        output: `{(props) => {
            return {
              leading: <Avatar {...props.item.profile} />,
            };
          }}`,
                    };
                return {};
            },
        },
    ]),
    presets: setPresets<DropdownProps<MenuItem & any>>([
        {
            name: 'Simple',
            state: {},
        },
        {
            name: 'Multi',
            state: { isMulti: true },
        },
        {
            name: 'Trailing Tags',
            state: asProps<
                DropdownProps<
                    MenuItem & {
                        tag?: string;
                        tagColor?: ColorVariant;
                    }
                >
            >({
                options: [
                    //
                    { value: 'a', label: 'Package A', tag: 'Recommended', tagColor: 'blue' },
                    { value: 'b', label: 'Package B', tag: 'Best Value', tagColor: 'green' },
                    { value: 'c', label: 'Package C' },
                    { value: 'd', label: 'Package D' },
                ],
                renderListItem: (props) => {
                    return {
                        trailing:
                            props.item.tag && props.item.tagColor ? (
                                <Tag color={props.item.tagColor!} size="x-small">
                                    {props.item.tag}
                                </Tag>
                            ) : null,
                    };
                },
            }),
        },
        {
            name: 'Trailing Text',
            state: asProps<
                DropdownProps<
                    MenuItem & {
                        price: number;
                    }
                >
            >({
                options: [
                    //
                    { value: '1', label: 'Option A', price: 400 },
                    { value: '2', label: 'Option B', price: 1000 },
                    { value: '3', label: 'Option C', price: 1600 },
                    { value: '4', label: 'Option D', price: 2000 },
                ],
                renderListItem: (props) => {
                    return {
                        trailing: (
                            <Txt>{`${new Intl.NumberFormat('en-US', {
                                style: 'currency',
                                currency: 'USD',
                            }).format(props.item.price / 100)}`}</Txt>
                        ),
                    };
                },
            }),
        },
        {
            name: 'Leading Avatar',
            state: asProps<
                DropdownProps<
                    MenuItem & {
                        profile: AvatarProps;
                    }
                >
            >({
                options: [
                    //
                    { value: 'Jessica', label: 'Jessica P.', profile: { 'aria-label': 'Jessica P.', initials: 'JP' } },
                    { value: 'Louis', label: 'Louis L.', profile: { 'aria-label': 'Louis L.', initials: 'LL' } },
                    { value: 'Harvey', label: 'Harvey S.', profile: { 'aria-label': 'Harvey S.', initials: 'HS' } },
                    { value: 'Mike', label: 'Mike R.', profile: { 'aria-label': 'Mike R.', initials: 'MR' } },
                ],
                renderListItem: (props) => {
                    return {
                        leading: <Avatar size="small" {...props.item.profile} />,
                    };
                },
            }),
        },
    ]),
};

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
