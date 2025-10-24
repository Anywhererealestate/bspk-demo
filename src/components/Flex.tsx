import { ElementProps } from '@bspk/ui/types/common';
import { CSSProperties, ElementType } from 'react';

export type FlexProps<As extends ElementType = ElementType> = {
    children: React.ReactNode;
    gap?: string;
    direction?: 'column' | 'row';
    wrap?: boolean;
    justify?: string;
    align?: CSSProperties['alignItems'];
    as?: As;
};

export function Flex<As extends ElementType = ElementType>({
    children,
    gap = 'var(--spacing-sizing-02)',
    direction = 'row',
    wrap = true,
    justify = 'flex-start',
    align = 'stretch',
    as,
    ...rest
}: ElementProps<FlexProps<As>, As>) {
    const As = as || 'div';
    return (
        <As
            data-demo-flex
            {...rest}
            style={{
                ...rest.style,
                display: 'flex',
                gap: gap || 'var(--spacing-sizing-02)',
                flexWrap: wrap ? 'wrap' : 'nowrap',
                flexDirection: direction || 'row',
                justifyContent: justify || 'flex-start',
                alignItems: align || 'stretch',
            }}
        >
            {children}
        </As>
    );
}
