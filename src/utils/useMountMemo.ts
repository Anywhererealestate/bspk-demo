import { useMemo } from 'react';

export function useMountMemo<T>(factory: () => T) {
    return useMemo(factory, [factory]);
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
