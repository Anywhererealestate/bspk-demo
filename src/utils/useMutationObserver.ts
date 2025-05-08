import { useEffect } from 'react';

export function useMutationObserver(
    target: HTMLElement | undefined,
    callback: MutationCallback,
    options: MutationObserverInit = {
        attributes: true,
        characterData: true,
        childList: true,
        subtree: true,
    },
) {
    useEffect(() => {
        if (target) {
            const observer = new MutationObserver(callback);
            observer.observe(target, options);
            return () => observer.disconnect();
        }
    }, [callback, options, target]);
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
