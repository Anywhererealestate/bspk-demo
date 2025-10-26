import React, { ReactNode, CSSProperties } from 'react';

interface LayoutProps {
    children: ReactNode;
    minColumnWidth: string; // e.g., '200px'
    gap?: string; // optional, e.g., '16px'
}

const Layout: React.FC<LayoutProps> = ({ children, minColumnWidth, gap = '16px' }) => {
    const style: CSSProperties = {
        display: 'grid',
        gridTemplateColumns: `repeat(auto-fit, minmax(${minColumnWidth}, 1fr))`,
        gap,
    };

    return <div style={style}>{children}</div>;
};

export { Layout };
