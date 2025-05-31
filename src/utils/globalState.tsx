import { Brand } from '@bspk/ui';
import { createContext, useContext } from 'react';

export const COLOR_THEMES = ['light', 'dark'] as const;

export type ColorTheme = (typeof COLOR_THEMES)[number];

export const globalStateDefault: GlobalStateContext = {
    theme: 'light',
    brand: 'anywhere',
    showTouchTarget: false,
    setBrand: () => {},
    setTheme: () => {},
    setShowTouchTarget: () => {},
    resetGlobalState: () => {},
} as const;

export type GlobalState = {
    brand: Brand;
    theme: ColorTheme;
    showTouchTarget?: boolean;
};

export type GlobalStateContext = GlobalState & {
    setBrand: (brand: Brand) => void;
    setTheme: (theme: ColorTheme) => void;
    setShowTouchTarget: (showTouchTarget: boolean) => void;
    resetGlobalState: () => void;
};

export const globalStateContext = createContext<GlobalStateContext | null>(null);

export function useGlobalState(): GlobalStateContext {
    return useContext(globalStateContext) || { ...globalStateDefault, brand: 'anywhere' };
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
