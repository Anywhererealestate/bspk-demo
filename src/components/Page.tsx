import { PropsWithChildren, CSSProperties, useEffect } from 'react';

interface PageProps extends PropsWithChildren {
    style?: CSSProperties;
    title: string;
}

export function Page({ children, style, title }: PageProps) {
    useEffect(() => {
        document.title = `BSPK - ${title}`;
    }, [title]);

    return (
        <div data-page style={style}>
            {children}
        </div>
    );
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
