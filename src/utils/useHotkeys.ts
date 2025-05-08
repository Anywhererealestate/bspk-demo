import { useEffect, useCallback } from 'react';

export type HotkeyCallback = (event: KeyboardEvent) => void;

const useHotkeys = (keyCombination: string, callback: HotkeyCallback) => {
    const handleKeyDown = useCallback(
        (event: KeyboardEvent) => {
            const keys = keyCombination.split('+');
            const keyPressed = keys.every((key) => {
                switch (key) {
                    case 'ctrl':
                        return event.ctrlKey;
                    case 'shift':
                        return event.shiftKey;
                    case 'alt':
                        return event.altKey;
                    case 'meta':
                        return event.metaKey;
                    default:
                        return event.key.toLowerCase() === key.toLowerCase();
                }
            });

            if (keyPressed) {
                callback(event);
            }
        },
        [keyCombination, callback],
    );

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleKeyDown]);
};

export default useHotkeys;

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
