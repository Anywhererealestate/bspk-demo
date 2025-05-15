import { SvgContentCopy } from '@bspk/icons/ContentCopy';
import { SvgDiamond } from '@bspk/icons/Diamond';
import { Avatar } from '@bspk/ui/Avatar';
import { Checkbox } from '@bspk/ui/Checkbox';
import { Img } from '@bspk/ui/Img';
import { LEADING_COMPONENTS, ListItem, ListItemProps, TRAILING_COMPONENTS } from '@bspk/ui/ListItem';
import { Radio } from '@bspk/ui/Radio';
import { Switch } from '@bspk/ui/Switch';
import { Tag } from '@bspk/ui/Tag';
import { Txt } from '@bspk/ui/Txt';

import { updateComponentState } from '../components/ComponentStateProvider';
import { ComponentExampleProps } from '../types';
import { action } from '../utils/actions';

import { typeProps } from './utils';

const createChildrenElement = (state: Record<string, any>, name: string) => {
    const componentName = state[name];

    if (componentName === 'Checkbox' || componentName === 'Radio' || componentName === 'Switch') {
        let As: typeof Checkbox | typeof Radio | typeof Switch = Checkbox;
        if (componentName === 'Radio') As = Radio;
        else if (componentName === 'Switch') As = Switch;

        return (
            <As
                aria-label={`${componentName} demo`}
                checked={state[`${name}-toggle`]}
                name={`${name}-toggle`}
                onChange={(checked: boolean) => {
                    updateComponentState({ [`${name}-toggle`]: checked });
                }}
                onClick={() => action(`${name} ${componentName} clicked`)}
                value={`${name}-${componentName}`}
            />
        );
    }

    if (componentName === 'ListItemButton')
        return (
            <ListItem.Button
                icon={<SvgContentCopy />}
                label="LI Button"
                onClick={() => action('ListItem button clicked')}
            />
        );

    if (componentName === 'Img') return <Img alt="placeholder" src="/placeholder.svg" />;

    if (componentName === 'Avatar') return <Avatar aria-label="List Item" initials="LI" />;

    if (componentName === 'Tag') {
        return <Tag>Tag</Tag>;
    }

    if (componentName === 'Txt') return <Txt>Text</Txt>;

    if (componentName === 'Icon') return <SvgDiamond />;

    return null;
};

export const ListItemExample: ComponentExampleProps = {
    renderContainer: { style: { width: '50%' } },
    Component: ListItem,
    renderCode: ({ codeProps }) => {
        const nextCodeProps = { ...codeProps };

        nextCodeProps.leading = nextCodeProps.trailing = codeProps.trailing ? `{<${codeProps.trailing} />}` : undefined;

        return {
            imports: [
                codeProps.leading && `import { ${codeProps.leading} } from '@bspk/ui/${codeProps.leading}';`,
                codeProps.trailing && `import { ${codeProps.trailing} } from '@bspk/ui/${codeProps.trailing}';`,
            ],
            properties: nextCodeProps,
        };
    },
    props: typeProps<ListItemProps>([
        {
            name: 'leading',
            options: [...LEADING_COMPONENTS],
            type: 'select',
            render: (state) => createChildrenElement(state, 'leading'),
            renderCode: (state) => ({
                output: state.leading ? `{<${state.leading} />}` : undefined,
            }),
            variants: [...LEADING_COMPONENTS],
        },
        {
            name: 'trailing',
            options: [...TRAILING_COMPONENTS],
            render: (state) => createChildrenElement(state, 'trailing'),
            renderCode: (state) => {
                return {
                    output: state.trailing ? `{<${state.trailing} />}` : undefined,
                };
            },
        },
    ]),
};

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
