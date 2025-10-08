import { useUIContext } from '@bspk/ui/hooks/useUIContext';
import { Brand } from '@bspk/ui/types/common';
import { ColorTheme } from '@bspk/ui/utils/uiContext';
import { createContext, useContext } from 'react';

export const globalStateDefault: GlobalStateContext = {
    brand: 'anywhere',
    showTouchTarget: false,
    setBrand: () => {},
    setShowTouchTarget: () => {},
    resetGlobalState: () => {},
    theme: 'dark',
} as const;

export type GlobalState = {
    brand: Brand;
    showTouchTarget?: boolean;
    theme: ColorTheme;
};

export type GlobalStateContext = GlobalState & {
    setBrand: (brand: Brand) => void;
    setShowTouchTarget: (showTouchTarget: boolean) => void;
    resetGlobalState: () => void;
};

export const globalStateContext = createContext<GlobalStateContext | null>(null);

export function useGlobalState(): GlobalStateContext & { theme: ColorTheme; setTheme: (theme: ColorTheme) => void } {
    const globalState = useContext(globalStateContext);

    const { theme, setTheme } = useUIContext();

    return { ...(globalState || globalStateDefault), theme, setTheme };
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
