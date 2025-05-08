import { useCallback, useEffect, useRef } from 'react';

export default function useMountedState(): () => boolean {
    const mountedRef = useRef<boolean>(false);
    const get = useCallback(() => mountedRef.current, []);

    useEffect(() => {
        mountedRef.current = true;

        return () => {
            mountedRef.current = false;
        };
    }, []);

    return get;
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
