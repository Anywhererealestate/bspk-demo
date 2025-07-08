import { DemoPreset } from '@bspk/ui/utils/demo';
import { type AxeResults } from 'axe-core';
import { createContext, PropsWithChildren, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { CUSTOM_PRESET_VALUE } from 'src/components/ComponentPageExample';
import { BUILD, VERSION } from 'src/meta';
import { DemoComponent } from 'src/types';
import { removeReactNodes } from 'src/utils/removeReactNodes';
import { useStoreState } from 'src/utils/useStoreState';

type ComponentContext<Props = Record<string, any>> = {
    propState: Record<string, any>;
    setPropState: (propState: Partial<Props>) => void;
    resetAllState: () => void;
    changed: boolean;
    axeResults: Record<string, AxeResults>;
    setAxeResults: (param: { [html: string]: AxeResults | undefined }) => void;
    setPreset: (presetValue?: string | null | undefined) => void;
    preset?: DemoPreset;
    component: DemoComponent;
};

const componentContext = createContext<ComponentContext>({
    propState: {},
    setPropState: () => {},
    resetAllState: () => {},
    changed: false,
    axeResults: {},
    setAxeResults: () => {},
    setPreset: () => {},
    component: undefined as unknown as DemoComponent,
});

export type StateUpdate<S = Record<string, unknown>> = S | ((prev: S) => S);

export const COMPONENT_STATE_EVENT = 'componentStateUpdateEvent' as const;

function componentStateUpdateEvent<S = Record<string, unknown>>(update: StateUpdate<S> | null) {
    return new CustomEvent(COMPONENT_STATE_EVENT, { detail: update });
}

export function updateComponentContext<P extends Record<string, unknown>>(update: StateUpdate<P> | null) {
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
    const key = `bspk-${VERSION}.${BUILD}-${name}`;

    const [propState, setPropStateBase, resetPropState, hasPropStore] = useStoreState<Record<string, any>>(
        `${key}-prop-state`,
        defaultState,
        removeReactNodes,
    );

    const [presetValue, setPreset, resetPreset] = useStoreState<string | undefined>(
        `${key}-preset`,
        CUSTOM_PRESET_VALUE,
    );
    const preset = useMemo(
        () => presets?.find((p) => p.value === (presetValue || CUSTOM_PRESET_VALUE)),
        [presets, presetValue],
    );

    // on load we set the prop state to the saved preset state, this ensures we load the react nodes
    useEffect(() => {
        if (preset?.propState) setPropStateBase(preset?.propState);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const [axeResults, setAxeResults, resetAxeResults] = useStoreState<Record<string, any>>(`${key}-axe-results`, {});

    const [changed, setChanged] = useState(!deepEqualObjects(propState, defaultState));

    useEffect(() => {
        if (hasPropStore())
            console.warn('Component property state loaded from store. Reset all state to clear.', propState);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const resetAllState = useCallback(() => {
        setChanged(false);
        resetPropState();
        resetPreset();
        resetAxeResults();
    }, [resetPropState, resetPreset, resetAxeResults]);

    const setPropState = useCallback(
        (update: StateUpdate | null, presetUpdate?: boolean) => {
            if (update === null) {
                resetPropState();
                return;
            }

            const nextState = typeof update === 'function' ? update(propState) : update;

            setPropStateBase(nextState);
            setChanged(true);

            // this is a preset update so we don't want to set the preset
            if (presetUpdate) return;

            const presetStateValueUpdated =
                // if the update is a function, we don't check for preset state overlap
                typeof update === 'function' ||
                // if there is no preset, we don't check for preset state overlap
                (preset?.propState &&
                    // if the preset state is empty, we don't check for preset state overlap
                    Object.keys(preset.propState).length > 0 &&
                    // if the update overlaps with the preset state, we reset the preset to custom
                    update &&
                    // check if any property in the preset state is updated
                    Object.entries(preset.propState).some(
                        ([propName, value]) => update[propName] !== undefined && update[propName] !== value,
                    ));

            if (presetStateValueUpdated)
                // hear we reset the preset to custom if the update overlaps with the preset state
                setPreset(CUSTOM_PRESET_VALUE);
        },
        [propState, setPropStateBase, preset?.propState, setPreset, resetPropState],
    );

    useEffect(() => {
        const listener = (event: any) => {
            setPropState(event.detail as StateUpdate);
        };
        document.addEventListener(COMPONENT_STATE_EVENT, listener);
        return () => document.removeEventListener(COMPONENT_STATE_EVENT, listener);
    }, [setPropState, propState, preset]);

    return (
        <componentContext.Provider
            value={{
                component,
                propState,
                setPropState,
                resetAllState,
                changed,
                axeResults,
                setAxeResults,
                setPreset: (nextPresetValue) => {
                    const nextPreset = presets?.find((p) => p.value === nextPresetValue);
                    setPreset(nextPreset?.value || CUSTOM_PRESET_VALUE);
                    setPropState({ ...functionProps, ...(nextPreset?.propState || defaultState) }, true);
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
