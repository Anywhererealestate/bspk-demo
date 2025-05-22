import { Brand, BRANDS } from '@bspk/ui';
import { createContext, PropsWithChildren, useContext, useEffect, useMemo, useState } from 'react';
import { StylesProvider } from 'src/components/StylesProvider';
import { VERSION } from 'src/search-index';

export const COLOR_THEMES = ['light', 'dark'] as const;

export type ColorTheme = (typeof COLOR_THEMES)[number];

export type GlobalState = {
    version: string;
    theme: ColorTheme;
};

const globalStateDefault: GlobalState = {
    version: VERSION,
    theme: 'light',
} as const;

export type GlobalContext = {
    version: string;
    brand: Brand;
    theme: ColorTheme;
};

const globalStateContext = createContext<GlobalContext | null>(null);

const globalStateSetter = createContext<{
    setGlobalState: (state: Partial<GlobalState>) => void;
    resetGlobalState: () => void;
    setBrand: (brand: Brand) => void;
    setTheme: (theme: ColorTheme) => void;
}>({
    setGlobalState: () => {},
    resetGlobalState: () => {},
    setBrand: () => {},
    setTheme: () => {},
});

export function useGlobalState(): GlobalContext {
    return useContext(globalStateContext) || { ...globalStateDefault, brand: 'anywhere' };
}

export function useGlobalSetter() {
    return useContext(globalStateSetter);
}

export function GlobalStateProvider({ children }: PropsWithChildren) {
    const [state, setState] = useState(() => {
        let globalStateNext = { ...globalStateDefault };

        if (localStorage.getItem('bspkState')) {
            try {
                globalStateNext = {
                    ...JSON.parse(localStorage.getItem('bspkState') || '{}'),
                };
            } catch {
                // localStorage.getItem('bspkState') is not a valid JSON
                // lets set it to default
                localStorage.setItem('bspkState', JSON.stringify(globalStateDefault));
            }

            if (globalStateNext.version !== VERSION) {
                localStorage.setItem(
                    'bspkState',
                    JSON.stringify({
                        ...globalStateNext,
                        version: VERSION,
                    }),
                );
            }
        }

        return { ...globalStateNext };
    });

    const setGlobalState = useMemo(
        () => (next: Partial<GlobalState>) => {
            setState((prev) => {
                const newState = { ...prev, ...next };

                localStorage.setItem('bspkState', JSON.stringify(newState));

                return newState;
            });
        },
        [],
    );

    const stateOverrides = useMemo(() => {
        const searchParams = Object.fromEntries(new URLSearchParams(globalThis.location.search).entries());

        const next: {
            theme?: ColorTheme;
            brand?: Brand;
        } = {};
        if (searchParams.theme && COLOR_THEMES.includes(searchParams.theme as ColorTheme)) {
            next.theme = searchParams.theme as ColorTheme;
        }

        if (searchParams.brand && BRANDS.find((b) => b.slug === searchParams.brand)) {
            next.brand = searchParams.brand as Brand;
        }

        return next;
    }, []);

    const [theme, setTheme] = useState<ColorTheme>('light');
    const [brand, setBrand] = useState<Brand>('anywhere');

    useEffect(() => {
        document.querySelectorAll('link[data-syntax-theme]').forEach((link) => link.setAttribute('disabled', 'true'));
        document.querySelector(`link[data-syntax-theme="${theme}"]`)?.removeAttribute('disabled');
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    useEffect(() => {
        if (stateOverrides.theme) setTheme(stateOverrides.theme);
    }, [setTheme, stateOverrides.theme]);

    return (
        <globalStateSetter.Provider
            value={useMemo(
                () => ({
                    setBrand,
                    setTheme,
                    setGlobalState,
                    resetGlobalState: () => {
                        setState(globalStateDefault);
                        localStorage.setItem('bspkState', JSON.stringify(globalStateDefault));
                    },
                }),
                [setGlobalState, setTheme],
            )}
        >
            <StylesProvider brand={brand} />
            <globalStateContext.Provider value={useMemo(() => ({ ...state, brand, theme }), [brand, state, theme])}>
                {children}
            </globalStateContext.Provider>
        </globalStateSetter.Provider>
    );
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
