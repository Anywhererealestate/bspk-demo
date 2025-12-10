import { PropsWithChildren, CSSProperties, useEffect } from 'react';
import { useRouteMeta } from 'src/utils/useRouteMeta';

interface PageProps extends PropsWithChildren {
    style?: CSSProperties;
}

export function Page({ children, style }: PageProps) {
    const routeMeta = useRouteMeta();

    useEffect(() => {
        if (routeMeta?.title) {
            document.title = `BSPK - ${routeMeta.title} `;
        } else {
            document.title = 'BSPK';
        }
    }, [routeMeta?.title]);

    return (
        <div data-page style={style}>
            {children}
        </div>
    );
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
