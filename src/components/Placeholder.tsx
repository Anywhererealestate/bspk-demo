import { ElementProps } from '@bspk/ui';
import { Txt } from '@bspk/ui/Txt';
import { css } from '@emotion/react';
import { useRef } from 'react';

const dimension = (value: number | string) => (typeof value === 'number' ? `${value}px` : value);

export function Placeholder({
    hideSize = false,
    height = 100,
    width = '100%',
    direction = 'row',
    ...props
}: ElementProps<
    { hideSize?: boolean; height?: number | string; width?: number | string; direction?: 'column' | 'row' },
    'div'
>) {
    const ref = useRef<HTMLDivElement | null>(null);

    return (
        <div
            {...props}
            css={css`
                width: ${dimension(width)};
                display: flex;
                justify-content: center;
                align-items: center;
                height: ${dimension(height)};
                background-color: var(--surface-neutral-t3-low);
                flex-direction: ${direction};
                column-gap: var(--spacing-sizing-01);
            `}
            data-placeholder
            ref={ref}
        >
            {!hideSize && (
                <>
                    <Txt variant="labels-large">{dimension(width)}</Txt>
                    <Txt>&times;</Txt>
                    <Txt variant="labels-large">{dimension(height)}</Txt>
                </>
            )}
        </div>
    );
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
