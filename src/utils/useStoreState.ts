import { useState } from 'react';
import store from 'store';

/**
 * This hook is used to manage a state that is also stored in a key-value store.
 *
 * @param key {string} - The key to use for the store
 * @param initialState {S} - The initial state to use for the store
 * @param filterState {(state: S) => S | undefined} - Filter the state before setting it in the store.
 * @returns
 */
export function useStoreState<S = Record<string, unknown> | number | string>(
    key: string,
    initialState: S | (() => S),
    filterState?: (state: S) => S | undefined,
): [
    state: S,
    setState: (nextState: Partial<S> | ((prev: S) => Partial<S>), complete?: boolean) => void,
    resetState: () => void,
    hasStore: () => boolean,
] {
    const defaultValue = typeof initialState === 'function' ? (initialState as () => S)() : initialState;

    const [state, setState] = useState(store.get(key) || defaultValue);

    return [
        state,
        (nextState: Partial<S> | ((prev: S) => Partial<S>), complete?: boolean) => {
            const nextStatePartial = typeof nextState === 'function' ? nextState(state) : nextState;

            let completeState = nextStatePartial as S;

            if (typeof defaultValue === 'object' && defaultValue !== null)
                completeState = complete ? nextStatePartial : { ...state, ...nextStatePartial };

            setState(completeState);
            const filteredState = filterState ? filterState(completeState) : completeState;

            store.set(key, filteredState);
        },
        () => {
            setState(defaultValue);
            store.remove(key);
        },
        () => store.get(key) !== undefined && store.get(key) !== null,
    ];
}
