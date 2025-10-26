import { NavContents } from 'components/NavContents';
import { PropsWithChildren, CSSProperties } from 'react';

interface PageProps extends PropsWithChildren {
    style?: CSSProperties;
}

export function Page({ children, style }: PageProps) {
    return (
        <div data-page style={style}>
            {children}
            <NavContents />
        </div>
    );
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
