import { DemoPreset } from '@bspk/ui/demo/utils';
import { type AxeResults } from 'axe-core';
import { createContext, PropsWithChildren, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { DemoComponent } from 'src/types';
import store from 'store';

type ComponentContext<Props = Record<string, any>> = {
    state: Record<string, any>;
    setState: (state: Partial<Props>) => void;
    resetState: () => void;
    changed: boolean;
    axeResults: Record<string, AxeResults>;
    setAxeResults: (axeResult: AxeResults | undefined, html: string) => void;
    setPreset: (index: string) => void;
    preset?: DemoPreset;
    component: DemoComponent;
};

const componentContext = createContext<ComponentContext>({
    state: {},
    setState: () => {},
    resetState: () => {},
    changed: false,
    axeResults: {},
    setAxeResults: () => {},
    setPreset: () => {},
    component: undefined as unknown as DemoComponent,
});

export type StateUpdate = Record<string, any>;

export type StateUpdateDispatch = (state: StateUpdate) => StateUpdate;

export const COMPONENT_STATE_EVENT = 'componentStateUpdateEvent' as const;

function componentStateUpdateEvent(update: StateUpdate | StateUpdateDispatch | null) {
    return new CustomEvent(COMPONENT_STATE_EVENT, { detail: update });
}

export function updateComponentContext<P extends Record<string, any>>(update: Partial<P> | ((state: P) => P)) {
    document.dispatchEvent(componentStateUpdateEvent(update));
}

export function resetComponentContext() {
    document.dispatchEvent(componentStateUpdateEvent(null));
}

function deepEqualObjects(obj1: Record<string, any>, obj2: Record<string, any>): boolean {
    if (obj1 === obj2) return true;

    if (!obj1 || !obj2) return false;

    if (typeof obj1 !== 'object' || typeof obj2 !== 'object') return false;

    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    if (keys1.length !== keys2.length) return false;

    return keys1.every((key) => keys2.includes(key) && deepEqualObjects(obj1[key], obj2[key]));
}

export function ComponentProvider({ children, component }: PropsWithChildren<{ component: DemoComponent }>) {
    const { name, defaultState, presets } = component;

    const storeKey = useMemo(() => `bspk-${name}`, [name]);
    const storeKeyAxeResults = useMemo(() => `bspk-${name}-axe-results`, [name]);

    useEffect(() => {
        const storeValue = store.get(storeKey);
        if (storeValue) console.warn('Component state loaded from store. Reset state to clear.', storeValue);
    }, [storeKey]);

    const [state, setAllState] = useState<Record<string, any>>(store.get(storeKey) || defaultState);
    const [axeResults, setAllAxeResults] = useState<Record<string, any>>(store.get(storeKeyAxeResults) || {});
    const [presetValue, setPreset] = useState<string | undefined>(() => presets?.[0]?.value);
    const [changed, setChanged] = useState(!deepEqualObjects(state, defaultState));

    const resetState = useCallback(() => {
        setChanged(false);
        setAllState(defaultState);
        store.set(storeKey, defaultState);
        store.set(storeKeyAxeResults, {});
    }, [defaultState, storeKey, storeKeyAxeResults]);

    const setState = useCallback(
        (update: StateUpdate | StateUpdateDispatch | null) => {
            if (update === null) {
                resetState();
                return;
            }
            setAllState(typeof update === 'function' ? update : (prev) => ({ ...prev, ...update }));
            setChanged(true);
        },
        [resetState],
    );

    const setAxeResults = (axeResult: AxeResults | undefined, code: string) => {
        setAllAxeResults((prev) => ({
            ...prev,
            [code]: axeResult,
        }));
    };

    useEffect(() => {
        store.set(storeKey, state);
    }, [state, storeKey]);

    useEffect(() => {
        store.set(storeKeyAxeResults, axeResults);
    }, [axeResults, storeKeyAxeResults]);

    useEffect(() => {
        const listener = (event: any) => {
            // console.log('Component state update event received:', event.detail);
            setState(event.detail as StateUpdate | StateUpdateDispatch);
        };
        document.addEventListener(COMPONENT_STATE_EVENT, listener);
        return () => document.removeEventListener(COMPONENT_STATE_EVENT, listener);
    }, [setState, state]);

    return (
        <componentContext.Provider
            value={{
                component,
                state,
                setState,
                resetState,
                changed,
                axeResults,
                setAxeResults,
                setPreset: (nextPresetId) => {
                    if (presets?.some((p) => p.value === nextPresetId)) setPreset(nextPresetId);
                },
                preset: presets?.find((p) => p.value === presetValue),
            }}
        >
            {children}
        </componentContext.Provider>
    );
}

export function useComponentContext() {
    return useContext(componentContext);
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
