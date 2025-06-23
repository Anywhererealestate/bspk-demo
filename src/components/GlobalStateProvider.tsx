/* eslint-disable react-hooks/exhaustive-deps */
import { Brand, BRANDS } from '@bspk/ui';
import { PropsWithChildren, useMemo, useEffect } from 'react';
import { StylesProvider } from 'src/components/StylesProvider';
import { BUILD, VERSION } from 'src/meta';
import { GlobalState, ColorTheme, COLOR_THEMES, globalStateContext, globalStateDefault } from 'src/utils/globalState';
import { useStoreState } from 'src/utils/useStoreState';

export function GlobalStateProvider({ children }: PropsWithChildren) {
    const [globalState, setState] = useStoreState<GlobalState>(`bspk-global-${VERSION}.${BUILD}`, globalStateDefault);

    useEffect(() => {
        const searchParams = Object.fromEntries(new URLSearchParams(globalThis.location.search).entries());

        let overrideTheme: ColorTheme | undefined;
        let overrideBrand: Brand | undefined;

        if (
            searchParams.theme &&
            COLOR_THEMES.includes(searchParams.theme as ColorTheme) &&
            searchParams.theme !== globalState.theme
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

        if (overrideTheme || overrideBrand)
            setState((prev) => ({
                ...prev,
                theme: overrideTheme || prev.theme,
                brand: overrideBrand || prev.brand,
            }));
    }, []);

    const { brand, theme, showTouchTarget } = globalState;

    useEffect(() => {
        document.querySelectorAll('link[data-syntax-theme]').forEach((link) => link.setAttribute('disabled', 'true'));
        document.querySelector(`link[data-syntax-theme="${theme}"]`)?.removeAttribute('disabled');
        document.documentElement.setAttribute('data-theme', theme);
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
                        setTheme: (nextTheme: ColorTheme) => setState((prev) => ({ ...prev, theme: nextTheme })),
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
