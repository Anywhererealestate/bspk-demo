import { SvgDarkMode } from '@bspk/icons/DarkMode';
import { SvgDarkModeFill } from '@bspk/icons/DarkModeFill';
import { SvgSearch } from '@bspk/icons/Search';
import { Brand, BRANDS } from '@bspk/ui';
import { Button } from '@bspk/ui/Button';
import { Dialog } from '@bspk/ui/Dialog';
import { Dropdown } from '@bspk/ui/Dropdown';
import { MenuButton } from '@bspk/ui/MenuButton';
import { useModalState } from '@bspk/ui/hooks/useModalState';
import { css } from '@emotion/react';
import { useEffect, useId, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { VERSION } from '../search-index';
import { useGlobalState, useGlobalSetter } from '../utils/globalState';
import useHotkeys from '../utils/useHotkeys';

import { NavSide } from './NavSide';
import { SearchModal } from './SearchModal';

function useScreenSize<T extends { size: string; minWidth: number }[]>(
    sizesProp: T,
): keyof T[number]['size'] | undefined {
    const [screenSize, setScreenSize] = useState<keyof T[number]['size'] | undefined>(undefined);

    const sizes = sizesProp.sort((a, b) => a.minWidth - b.minWidth);

    useEffect(() => {
        const handleResize = () => {
            let nextSize: string | undefined = undefined;
            sizes.forEach((size) => {
                if (window.innerWidth >= size.minWidth) nextSize = size.size;
            });
            if (nextSize) setScreenSize(nextSize);
            document.body.setAttribute('data-screen-size', nextSize || '');
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [sizes]);

    return screenSize;
}

export function Nav() {
    const { onOpen, ...searchModalProps } = useModalState();
    const navModalState = useModalState();
    const { brand, theme } = useGlobalState();
    const { setBrand, resetGlobalState, setTheme } = useGlobalSetter();

    const screenSize = useScreenSize([
        {
            size: 'small',
            minWidth: 0,
        },
        {
            size: 'medium',
            minWidth: 1280,
        },
        {
            size: 'large',
            minWidth: 1440,
        },
    ]);

    useHotkeys('meta+k', onOpen);

    const location = useLocation();
    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'instant',
        });
    }, [location.pathname]);

    useEffect(() => {
        const element = location.hash && document.querySelector(location.hash);
        if (!element) return;
        window.scrollTo({
            top: element.getBoundingClientRect()?.top + window.scrollY - 100,
            behavior: 'instant',
        });
    }, [location.hash]);

    return (
        <>
            <div css={style} data-navbar>
                <span data-backdrop />
                <div data-header>
                    {screenSize === 'small' && <MenuButton onClick={() => navModalState.onOpen()} />}
                    <h1 data-logo>
                        <img alt="Bespoke" src="/logo.png" style={{ height: 32 }} />
                        <span>Version: {VERSION}</span>
                    </h1>
                </div>
                <div data-navbar-right="">
                    <Button
                        icon={theme === 'light' ? <SvgDarkMode /> : <SvgDarkModeFill />}
                        label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
                        onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                        showLabel={false}
                        variant="secondary"
                    />
                    <div data-brand-dropdown>
                        <Dropdown
                            aria-label="Brand"
                            id={useId()}
                            name="brand"
                            onChange={(value) => {
                                setBrand((value?.[0] || 'anywhere') as Brand);
                            }}
                            options={BRANDS.map((b) => {
                                return { label: b.title, value: b.slug };
                            })}
                            style={{ width: '280px' }}
                            value={[brand]}
                        />
                    </div>
                    <Button
                        data-search-button
                        label='Search for components (Press "⌘K" to focus)'
                        onClick={(event) => {
                            (event.target as HTMLInputElement).blur();
                            onOpen();
                        }}
                        variant="secondary"
                    >
                        <SvgSearch />
                        Search...
                        <span data-shortcut>⌘K</span>
                    </Button>
                    <SearchModal {...searchModalProps} />
                </div>
            </div>
            {screenSize === 'small' ? (
                <Dialog aria-label="Navigation" {...navModalState} placement="left">
                    <NavSide resetGlobalState={resetGlobalState} />
                </Dialog>
            ) : (
                <NavSide resetGlobalState={resetGlobalState} />
            )}
        </>
    );
}

export const style = css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    justify-items: center;
    padding: 0 var(--spacing-sizing-05);
    box-shadow: var(--drop-shadow-south);
    height: var(--spacing-sizing-14);
    position: fixed;
    width: 100%;
    z-index: var(--z-index-navbar);
    -webkit-backdrop-filter: blur(5px);
    backdrop-filter: blur(8px);
    top: 0;

    [data-backdrop] {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: var(--background-shade);
        opacity: 0.75;
        z-index: -1;
    }

    [data-header] {
        margin-right: var(--spacing-sizing-03);
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: var(--spacing-sizing-02);
        justify-content: baseline;
    }

    > * {
        margin: 0;
    }

    [data-logo] {
        margin: 0;
        display: flex;
        align-items: center;
        flex-direction: row;
        font: var(--body-large);
        color: var(--foreground-neutral-on-surface);
        img {
            height: var(--spacing-sizing-08);
            width: auto;
        }
        span {
            display: block;
            padding: 6px 0 0 var(--spacing-sizing-03);
            margin-left: var(--spacing-sizing-03);
            height: var(--spacing-sizing-08);
            border-left: solid 1px var(--stroke-neutral-low);
        }
    }

    [data-theme='dark'] & [data-logo] img {
        filter: brightness(0) invert(1);
    }

    [data-navbar-right] {
        display: flex;
        gap: var(--spacing-sizing-03);
        align-items: center;
        justify-content: flex-end;

        [data-dropdown] {
            min-width: 200px;
        }
    }

    [data-brand-dropdown] {
        //
    }

    [data-search-button] {
        display: flex;
        gap: var(--spacing-sizing-01);
        align-items: center;
        padding: 0 var(--spacing-sizing-03);
        font: var(--body-base);
        border: 1px solid var(--stroke-brand-primary);
        box-shadow: none;
        color: var(--foreground-neutral-on-surface);

        svg {
            width: var(--spacing-sizing-05);
            height: var(--spacing-sizing-05);
        }

        [data-txt] {
            color: var(--colors-neutral-48);
            margin-left: var(--spacing-sizing-03);
        }
    }
`;

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
