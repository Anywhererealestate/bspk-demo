import { DemoPreset } from '@bspk/ui/demo/utils';
import { type AxeResults } from 'axe-core';
import { createContext, PropsWithChildren, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { DemoComponent } from 'src/types';
import { action } from 'src/utils/actions';
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
    const { name, defaultState, presets, functionProps } = component;

    const storeKey = useMemo(() => `bspk-${name}`, [name]);
    const storeKeyAxeResults = useMemo(() => `bspk-${name}-axe-results`, [name]);

    useEffect(() => {
        const storeValue = store.get(storeKey);
        if (storeValue) console.warn('Component state loaded from store. Reset state to clear.', storeValue);
    }, [storeKey]);

    const [state, setAllState] = useState<Record<string, any>>(store.get(storeKey) || defaultState);
    const [axeResults, setAllAxeResults] = useState<Record<string, any>>(store.get(storeKeyAxeResults) || {});
    const [presetValue, setPreset] = useState<string | undefined>('custom');
    const [changed, setChanged] = useState(!deepEqualObjects(state, defaultState));

    const preset = useMemo(() => presets?.find((p) => p.value === presetValue), [presets, presetValue]);

    const resetState = useCallback(() => {
        setChanged(false);
        setAllState(defaultState);
        store.set(storeKey, defaultState);
        store.set(storeKeyAxeResults, {});
    }, [defaultState, storeKey, storeKeyAxeResults]);

    const setState = useCallback(
        (update: StateUpdate | StateUpdateDispatch | null, presetUpdate?: boolean) => {
            if (update === null) {
                resetState();
                return;
            }

            setAllState(typeof update === 'function' ? update : (prev) => ({ ...prev, ...update }));
            setChanged(true);

            // this is a preset update so we don't want to set the preset
            if (presetUpdate) return;

            const presetStateValueUpdated =
                // if the update is a function, we don't check for preset state overlap
                typeof update === 'function' ||
                // if there is no preset, we don't check for preset state overlap
                (preset?.state &&
                    // if the preset state is empty, we don't check for preset state overlap
                    Object.keys(preset.state).length > 0 &&
                    // if the update overlaps with the preset state, we reset the preset to custom
                    update &&
                    // check if any property in the preset state is updated
                    Object.entries(preset.state).some(
                        ([propName, value]) => update[propName] !== undefined && update[propName] !== value,
                    ));

            if (presetStateValueUpdated)
                // hear we reset the preset to custom if the update overlaps with the preset state
                setPreset('custom');
        },
        [preset?.state, resetState],
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
    }, [setState, state, preset]);

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
                    const nextPreset = presets?.find((p) => p.value === nextPresetId);
                    if (!nextPreset) return;
                    setPreset(nextPresetId);

                    if (!nextPreset.state) return;

                    action(`Preset ${nextPreset.label} state applied`, 'success');

                    // we include functionProps
                    setState({ ...functionProps, ...nextPreset.state }, true);
                },
                preset,
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
