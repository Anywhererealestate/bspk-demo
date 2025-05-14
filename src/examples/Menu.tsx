import { Menu, MenuProps, MenuItem } from '@bspk/ui/Menu';
import { AvatarProps, Avatar } from '@bspk/ui/Avatar';
import { Tag } from '@bspk/ui/Tag';
import { Txt } from '@bspk/ui/Txt';
import { ColorVariant } from '@bspk/ui/utils/colorVariants';

import { updateComponentState } from '../components/ComponentStateProvider';
import { ComponentExampleProps } from '../types';

import { typeProps, setPresets, asProps } from './utils';

export const menuExample: ComponentExampleProps = {
    renderContainer: { style: { width: '300px' } },
    Component: (state) => {
        return <Menu {...state} />;
    },
    props: typeProps<MenuProps<any>>([
        {
            name: 'noResultsMessage',
            default: '[Replace this message with an empty state message]',
        },
        {
            name: 'onChange',
            default: (selectedValues: string[]) => {
                updateComponentState<MenuProps>({ selectedValues });
            },
        },
        {
            name: 'selectedValues',
            type: 'string[]',
            controlType: 'string',
            default: [],
        },
        {
            name: 'items',
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
                let output = '';

                if (state.preset === 'Trailing Tags')
                    output = `{(props) => {
            return {
              trailing:
                props.item.tag && props.item.tagColor ? (
                  <Tag color={props.item.tagColor!} size="x-small">
                    {props.item.tag}
                  </Tag>
                ) : null,
            };
          }}`;

                if (state.preset === 'Trailing Text')
                    output = `{(props) => {
            return {
              trailing: (
                <Txt>{\`\${new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: 'USD',
                }).format(props.item.price / 100)}\`}</Txt>
              ),
            };
          }}`;

                if (state.preset === 'Leading Avatar')
                    output = `{(props) => {
            return {
              leading: <Avatar {...props.item.profile} />,
            };
          }}`;

                const imports: string[] = [];
                return {
                    output: output,
                    imports: imports,
                };
            },
        },
    ]),
    presets: setPresets<MenuProps<MenuItem & any>>([
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
                MenuProps<
                    MenuItem & {
                        tag?: string;
                        tagColor?: ColorVariant;
                    }
                >
            >({
                items: [
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
                MenuProps<
                    MenuItem & {
                        price: number;
                    }
                >
            >({
                items: [
                    //
                    { value: '400', label: 'Option A', price: 400 },
                    { value: '1000', label: 'Option B', price: 1000 },
                    { value: '1600', label: 'Option C', price: 1600 },
                    { value: '2000', label: 'Option D', price: 2000 },
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
                MenuProps<
                    MenuItem & {
                        profile: AvatarProps;
                    }
                >
            >({
                items: [
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
    hideVariants: true,
};

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
