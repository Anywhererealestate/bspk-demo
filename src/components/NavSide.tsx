import { Button } from '@bspk/ui/Button';
import { Divider } from '@bspk/ui/Divider';
import { Txt } from '@bspk/ui/Txt';
import { css } from '@emotion/react';
import { Fragment } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { routes } from '../routes';
import { RouteLink } from '../types';

export const NavSide = ({ resetGlobalState }: { resetGlobalState: () => void }) => {
    const location = useLocation();
    return (
        <nav css={style} data-navigation>
            <div role="menu">
                {routes.map(
                    (route, index) =>
                        !route.hide && (
                            <Fragment key={route.title}>
                                {route.children && route.children.length > 0 && (
                                    <>
                                        {index > 0 && <Divider />}
                                        <Txt data-header variant="labels-base">
                                            {route.title}
                                        </Txt>
                                    </>
                                )}
                                {(route.children || [route]).map(
                                    (r: RouteLink) =>
                                        !r.hide && (
                                            <Link
                                                data-link
                                                data-selected={location.pathname === r.path || undefined}
                                                key={r.path}
                                                to={r.path!}
                                            >
                                                {r.title}
                                            </Link>
                                        ),
                                )}
                            </Fragment>
                        ),
                )}
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

export const style = css`
    height: calc(100vh - var(--spacing-sizing-16));
    width: var(--left-nav-width);
    position: fixed;
    flex: 0 0 var(--left-nav-width);
    margin: var(--spacing-sizing-16) 0 0;
    padding: 0;
    overflow-y: scroll;
    top: 0;
    overflow-x: hidden;

    div[role='menu'] {
        height: auto;
        display: flex;
        flex-direction: column;

        [data-divider] {
            margin: var(--spacing-sizing-02) var(--spacing-sizing-03);
        }

        [data-header] {
            display: flex;
            flex-direction: row;
            align-items: center;
            height: var(--spacing-sizing-09);
            padding: 0 var(--spacing-sizing-03);
        }

        a[data-link] {
            display: flex;
            flex-direction: row;
            align-items: center;
            height: var(--spacing-sizing-12);
            position: relative;
            margin: 0;
            text-decoration: none;
            font: var(--labels-small);
            color: var(--foreground-neutral-on-surface);
            padding: 0 var(--spacing-sizing-03);

            &[data-selected] {
                color: var(--foreground-brand-primary);
                &::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: var(--spacing-sizing-01);
                    height: 100%;
                    background-color: var(--foreground-brand-primary);
                    border-top-right-radius: var(--radius-small);
                    border-bottom-right-radius: var(--radius-small);
                }
            }
        }
    }

    > [data-button] {
        margin-bottom: 3rem;
    }

    [data-dialog-root] & {
        width: 100%;
        position: relative;
    }
`;

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
