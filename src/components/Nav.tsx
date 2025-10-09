import { SvgDarkMode } from '@bspk/icons/DarkMode';
import { SvgDarkModeFill } from '@bspk/icons/DarkModeFill';
import { SvgSearch } from '@bspk/icons/Search';
import { Button } from '@bspk/ui/Button';
import { Dialog } from '@bspk/ui/Dialog';
import { MenuButton } from '@bspk/ui/MenuButton';
import { Select } from '@bspk/ui/Select';
import { BRANDS } from '@bspk/ui/constants/brands';
import { useModalState } from '@bspk/ui/hooks/useModalState';
import { Brand } from '@bspk/ui/types/common';
import { NavSide } from 'components/NavSide';
import { SearchModal } from 'components/SearchModal';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { MODE, VERSION, UI_HASH, BUILD } from 'src/meta';
import { useGlobalState } from 'src/utils/globalState';
import useHotkeys from 'src/utils/useHotkeys';

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
    const { brand, theme, setBrand, setTheme } = useGlobalState();

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
        let element;

        try {
            element = location.hash && document.querySelector(location.hash);
        } catch {
            // location.hash may not be a valid selector.
        }
        if (!element) return;
        window.scrollTo({
            top: element.getBoundingClientRect()?.top + window.scrollY - 100,
            behavior: 'instant',
        });
    }, [location.hash]);

    return (
        <>
            <div data-body-width data-navbar>
                <span data-backdrop />
                <div data-header>
                    {screenSize === 'small' && <MenuButton aria-label="Menu" onClick={() => navModalState.onOpen()} />}
                    <h1 data-logo>
                        <span data-name>BSPK</span>
                        {BUILD === 'local' ? (
                            <span>LOCAL ({UI_HASH})</span>
                        ) : (
                            <>
                                <span>
                                    Version: {VERSION}
                                    {BUILD !== '0' ? `.${BUILD}` : ''}
                                </span>
                                {MODE === 'development' && (
                                    <span>
                                        DEV
                                        {UI_HASH ? ` (${UI_HASH})` : ''}
                                    </span>
                                )}
                                {MODE === 'test' && (
                                    <span>
                                        TEST
                                        {UI_HASH ? ` (${UI_HASH})` : ''}
                                    </span>
                                )}
                            </>
                        )}
                    </h1>
                </div>
                <div data-navbar-right="">
                    <Button
                        icon={theme === 'light' ? <SvgDarkMode /> : <SvgDarkModeFill />}
                        iconOnly
                        label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
                        onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                        variant="secondary"
                    />
                    <div data-brand-dropdown>
                        <Select
                            id="brand-dropdown"
                            label="Brand"
                            name="brand"
                            onChange={(value) => {
                                setBrand((value || 'anywhere') as Brand);
                            }}
                            options={BRANDS.map((b) => {
                                return { label: b.title, value: b.slug };
                            })}
                            style={{ width: '280px' }}
                            value={brand}
                        />
                    </div>
                    <Button
                        data-search-button={true}
                        label="Search... ⌘K"
                        onClick={(event) => {
                            (event.target as HTMLInputElement).blur();
                            onOpen();
                        }}
                        variant="secondary"
                    >
                        <SvgSearch />
                        Search... ⌘K
                    </Button>
                    <SearchModal {...searchModalProps} />
                </div>
            </div>
            {screenSize === 'small' ? (
                <Dialog aria-label="Navigation" {...navModalState} placement="left">
                    <NavSide />
                </Dialog>
            ) : (
                <NavSide />
            )}
        </>
    );
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
