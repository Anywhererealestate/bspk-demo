/* eslint-disable react-hooks/exhaustive-deps */
import { StylesProviderDemo as StylesProvider } from '@bspk/ui/StylesProviderDemo';
import { BRANDS } from '@bspk/ui/constants/brands';
import { useUIContext } from '@bspk/ui/hooks/useUIContext';
import { Brand } from '@bspk/ui/types/common';
import { COLOR_THEMES, ColorTheme } from '@bspk/ui/utils/uiContext';
import { PropsWithChildren, useMemo, useEffect } from 'react';
import { BUILD, VERSION } from 'src/meta';
import { GlobalState, globalStateContext, globalStateDefault } from 'src/utils/globalState';
import { useStoreState } from 'src/utils/useStoreState';

export function GlobalStateProvider({ children }: PropsWithChildren) {
    const [globalState, setState] = useStoreState<GlobalState>(`bspk-global-${VERSION}.${BUILD}`, globalStateDefault);

    const { theme, setTheme } = useUIContext();

    useEffect(() => {
        const searchParams = Object.fromEntries(new URLSearchParams(globalThis.location.search).entries());

        let overrideTheme: ColorTheme | undefined;
        let overrideBrand: Brand | undefined;

        if (
            searchParams.theme &&
            COLOR_THEMES.includes(searchParams.theme as ColorTheme) &&
            searchParams.theme !== theme
        ) {
            overrideTheme = searchParams.theme as ColorTheme;
        }

        if (
            searchParams.brand &&
            BRANDS.find((b) => b.slug === searchParams.brand) &&
            searchParams.brand !== globalState.brand
        ) {
            overrideBrand = searchParams.brand as Brand;
        }

        if (overrideBrand)
            setState((prev) => ({
                ...prev,
                brand: overrideBrand || prev.brand,
            }));

        if (overrideTheme) setTheme(overrideTheme);

        if (globalState.theme) setTheme(globalState.theme);
    }, []);

    const { brand, showTouchTarget } = globalState;

    useEffect(() => {
        document.querySelectorAll('link[data-syntax-theme]').forEach((link) => link.setAttribute('disabled', 'true'));
        document.querySelector(`link[data-syntax-theme="${theme}"]`)?.removeAttribute('disabled');

        if (theme !== globalState.theme) setState((prev) => ({ ...prev, theme }));
    }, [theme]);

    return (
        <>
            <StylesProvider brand={brand} />
            <globalStateContext.Provider
                value={useMemo(
                    () => ({
                        brand,
                        theme,
                        showTouchTarget,
                        setTheme,
                        setBrand: (nextBrand: Brand) => setState((prev) => ({ ...prev, brand: nextBrand })),
                        setShowTouchTarget: (show: boolean) => setState((prev) => ({ ...prev, showTouchTarget: show })),
                        resetGlobalState: () => {
                            store.clearAll();
                            setState(globalStateDefault);
                        },
                    }),
                    [brand, showTouchTarget, theme],
                )}
            >
                {children}
            </globalStateContext.Provider>
        </>
    );
}
