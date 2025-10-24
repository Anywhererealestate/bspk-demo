import React, { ReactNode } from 'react';

type GridProps = {
    columnWidths?: number[]; // in fr
    children: ReactNode;
    gap?: string;
    style?: React.CSSProperties;
};

export function Grid({ columnWidths, children, gap = '1rem', style }: GridProps) {
    const gridTemplateColumns = columnWidths?.map((width) => `${width}fr`).join(' ') || 'auto';

    return (
        <div
            style={{
                width: '100%',
                display: 'grid',
                gridTemplateColumns,
                gap,
                ...style,
            }}
        >
            {children}
        </div>
    );
}

export default Grid;
