import { SvgIcon } from '@bspk/icons/SvgIcon';
import { Button, ButtonProps } from '@bspk/ui/Button';
import { Fab } from '@bspk/ui/Fab';
import { setPresets, typeProps } from 'src/examples/utils';
import { ComponentExampleProps, TypePropertyExample } from 'src/types';

export const buttonExampleChildren: Pick<TypePropertyExample, 'default' | 'renderCode'> = {
    renderCode: (state) => {
        const icon = state?.icon;

        const elements: string[] = [];
        if (icon) elements.push(`<Svg${icon} />`);
        if (state?.children?.label) elements.push(state?.children?.label);

        return {
            imports: [icon && `import { Svg${icon} } from '@bspk/icons/${icon}';`],
            output: elements.length > 1 ? `<>${elements.join('\n')}</>` : elements[0] || '',
        };
    },
};

export const buttonExamplePresets = setPresets<ButtonProps>([
    {
        name: 'Icon & Text',
        state: {
            icon: 'Add',
            label: 'Add',
        },
    },
    {
        name: 'Text only',
        state: {
            label: 'Add',
        },
    },
    {
        name: 'Icon only',
        state: {
            showLabel: false,
            icon: 'Add',
            label: 'Add',
        },
    },
]);

const props = typeProps([
    {
        name: 'children',
        ...buttonExampleChildren,
    },
    {
        name: 'icon',
        renderCode: () => {
            return {
                imports: [],
                output: '',
            };
        },
        render: ({ icon }) => {
            return icon && <SvgIcon name={icon} />;
        },
    },
]);

export const buttonExample: ComponentExampleProps = {
    renderContainer: {
        style: {
            minHeight: '100px',
        },
    },
    Component: Button,
    presets: buttonExamplePresets,
    props,
    defaults: {
        icon: undefined,
        label: undefined,
    },
};

export const fabExample: ComponentExampleProps = {
    renderContainer: {
        style: {
            minHeight: '100px',
        },
    },
    Component: Fab,
    presets: [buttonExamplePresets[2], buttonExamplePresets[1], buttonExamplePresets[0]],
    props,
    hideVariants: true,
};

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
