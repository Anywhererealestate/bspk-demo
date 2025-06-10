import { Brand, BRANDS } from '@bspk/ui';
import { PropsWithChildren, useState, useMemo, useEffect } from 'react';
import { StylesProvider } from 'src/components/StylesProvider';
import { VERSION } from 'src/meta';
import {
    GlobalState,
    GlobalStateContext,
    ColorTheme,
    COLOR_THEMES,
    globalStateContext,
    globalStateDefault,
} from 'src/utils/globalState';
import store from 'store';

const setStoreState = (state: GlobalState) => {
    store.set('bspkState', { ...state, version: VERSION });
};

const getStoreState = (): GlobalState => {
    const storedState = store.get('bspkState') as (GlobalStateContext & { version: string }) | undefined;
    if (!storedState) return globalStateDefault;

    if (storedState.version !== VERSION) {
        // If the stored state version does not match the current version, reset to default
        setStoreState(globalStateDefault);
        return globalStateDefault;
    }

    return storedState;
};

export function GlobalStateProvider({ children }: PropsWithChildren) {
    const [state, setState] = useState<GlobalState>(getStoreState());

    useEffect(() => setStoreState(state), [state]);

    const {
        theme = state.theme,
        brand = state.brand,
        showTouchTarget = false,
    } = useMemo(() => {
        const searchParams = Object.fromEntries(new URLSearchParams(globalThis.location.search).entries());

        const nextState = { ...state };

        if (searchParams.theme && COLOR_THEMES.includes(searchParams.theme as ColorTheme)) {
            nextState.theme = searchParams.theme as ColorTheme;
        }

        if (searchParams.brand && BRANDS.find((b) => b.slug === searchParams.brand)) {
            nextState.brand = searchParams.brand as Brand;
        }

        return nextState;
    }, [state]);

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
