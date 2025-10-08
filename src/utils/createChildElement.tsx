import { SvgContentCopy } from '@bspk/icons/ContentCopy';
import { SvgDiamond } from '@bspk/icons/Diamond';
import { Avatar } from '@bspk/ui/Avatar';
import { Checkbox } from '@bspk/ui/Checkbox';
import { Img } from '@bspk/ui/Img';
import { ListItem } from '@bspk/ui/ListItem';
import { Radio } from '@bspk/ui/Radio';
import { Switch } from '@bspk/ui/Switch';
import { Tag } from '@bspk/ui/Tag';
import { Txt } from '@bspk/ui/Txt';
import { updateComponentContext } from 'src/components/ComponentProvider';
import { action } from 'src/utils/actions';

export const createChildrenElement = (state: Record<string, any>, name: string) => {
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
                    updateComponentContext({ [`${name}-toggle`]: checked });
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

    if (componentName === 'Avatar') return <Avatar name="List Item" />;

    if (componentName === 'Tag') return <Tag label="Tag" />;

    if (componentName === 'Txt') return <Txt>Text</Txt>;

    if (componentName === 'Icon') return <SvgDiamond />;

    return null;
};
