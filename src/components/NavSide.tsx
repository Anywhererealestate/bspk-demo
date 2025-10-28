import { Button } from '@bspk/ui/Button';
import { Divider } from '@bspk/ui/Divider';
import { Fragment } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { routes } from 'src/routes';
import { RouteLink } from 'src/types';
import { useGlobalState } from 'src/utils/globalState';

export const NavSide = () => {
    const location = useLocation();
    const { resetGlobalState } = useGlobalState();

    return (
        <nav data-navigation>
            <div role="menu">
                {routes
                    .filter((r) => !r.hide)
                    .map((route, index) => (
                        <Fragment key={route.title}>
                            {route.children && route.children.length > 0 && (
                                <>
                                    {index > 0 && <Divider />}
                                    <div data-header>{route.title}</div>
                                </>
                            )}
                            {(route.children || [route])
                                .filter((r) => !r.hide)
                                .map((r: RouteLink) => (
                                    <Link
                                        data-link
                                        data-selected={location.pathname === r.path || undefined}
                                        data-subtle
                                        key={r.path}
                                        role="menuitem"
                                        to={r.path!}
                                    >
                                        {r.title}
                                    </Link>
                                ))}
                        </Fragment>
                    ))}
            </div>
            <Button
                destructive
                label="Reset All"
                onClick={() => {
                    resetGlobalState();
                    setTimeout(() => window.location.reload(), 100);
                }}
                size="x-small"
                style={{ marginTop: 'var(--spacing-sizing-04)' }}
            />
        </nav>
    );
};

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
