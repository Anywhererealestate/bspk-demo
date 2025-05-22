import { type AxeResults } from 'axe-core';
import { createContext, PropsWithChildren, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { MetaComponentName } from 'src/meta';
import { DemoComponent } from 'src/types';
import store from 'store';

const componentState = createContext<{
    state: Record<string, any>;
    setState: (state: Record<string, any>) => void;
    resetState: () => void;
    changed: boolean;
    axeResults: Record<string, AxeResults>;
    setAxeResults: (axeResult: AxeResults | undefined, html: string) => void;
    setPreset: (index: number | string) => void;
}>({
    state: {},
    setState: () => {},
    resetState: () => {},
    changed: false,
    axeResults: {},
    setAxeResults: () => {},
    setPreset: () => {},
});

export type StateUpdate = Record<string, any>;

export type StateUpdateDispatch = (state: StateUpdate) => StateUpdate;

export const COMPONENT_STATE_EVENT = 'componentStateUpdateEvent' as const;

function componentStateUpdateEvent(update: StateUpdate | StateUpdateDispatch | null) {
    return new CustomEvent(COMPONENT_STATE_EVENT, { detail: update });
}

export function updateComponentState<P extends Record<string, any>>(update: Partial<P> | ((state: P) => P)) {
    document.dispatchEvent(componentStateUpdateEvent(update));
}

export function resetComponentState() {
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

export function ComponentStateProvider({
    children,
    defaultState: defaultStateProp,
    component,
}: PropsWithChildren<{ defaultState: Record<string, any>; component: DemoComponent }>) {
    const componentName = component.name as MetaComponentName;

    const defaultState = useMemo(() => {
        if (component.presets?.length)
            return {
                ...defaultStateProp,
                ...component.presets[0].state,
                'data-preset-index': 0,
                'data-preset-name': component.presets[0].name,
            };
        return defaultStateProp;
    }, [component.presets, defaultStateProp]);

    const storeKey = useMemo(() => `bspk-${componentName}`, [componentName]);
    const storeKeyAxeResults = useMemo(() => `bspk-${componentName}-axe-results`, [componentName]);

    const [state, setAllState] = useState<Record<string, any>>(store.get(storeKey) || defaultState);
    const [axeResults, setAllAxeResults] = useState<Record<string, any>>(store.get(storeKeyAxeResults) || {});

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
        const listener = (event: any) => setState(event.detail as StateUpdate | StateUpdateDispatch);
        document.addEventListener(COMPONENT_STATE_EVENT, listener);
        return () => document.removeEventListener(COMPONENT_STATE_EVENT, listener);
    }, [setState, state]);

    return (
        <componentState.Provider
            value={{
                state,
                setState,
                resetState,
                changed,
                axeResults,
                setAxeResults,
                setPreset: (index: number | string) => {
                    const preset = component.presets?.[index as number];

                    if (!preset) return;

                    setAllState({
                        ...defaultStateProp,
                        ...preset.state,
                        'data-preset-index': index,
                        'data-preset-name': preset.name,
                    });
                },
            }}
        >
            {children}
        </componentState.Provider>
    );
}

export function useComponentState() {
    return useContext(componentState);
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
