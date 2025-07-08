import { isValidElement } from 'react';

/**
 * Ensure that the value does not contain any React nodes.
 *
 * @param value - The value to remove React nodes from.
 * @returns - The value with React nodes removed.
 */
export function removeReactNodes<T>(value: T): T {
    if (!value) return value;

    if (Array.isArray(value)) return value.map((item) => removeReactNodes(item)) as T;

    if (typeof value === 'function') return value;

    if (typeof value === 'object') {
        if (isValidElement(value)) return undefined as unknown as T; // Remove React nodes

        return Object.fromEntries(Object.entries(value).map(([key, val]) => [key, removeReactNodes(val)])) as T;
    }

    return value;
}
