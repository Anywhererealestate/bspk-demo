import { AlertVariant } from '@bspk/ui/types/common';
import { DemoAction } from '@bspk/ui/utils/demo';
import { useEffect, useMemo, useState } from 'react';
import { kebabCase } from 'src/utils/kebabCase';

export type ActionLog = { message: string; variant?: AlertVariant; location: string; key: string };

const demoActionEvent = (detail: { message: string; variant?: AlertVariant }) =>
    new CustomEvent('demoAction', { detail });

export const action: DemoAction = (message: string, variant?: AlertVariant) => {
    document.dispatchEvent(demoActionEvent({ message, variant }));
};

export function useActionLog() {
    const [actions, setActions] = useState<ActionLog[]>([]);

    const timeouts: Record<string, ReturnType<typeof setTimeout>> = useMemo(() => ({}), []);

    useEffect(() => {
        const demoActionListener = (e: any) => {
            const { message, variant } = e.detail as { message: string; variant?: AlertVariant };

            const key = kebabCase(`${document.location.hash} // ${message} ${Date.now()}`);

            setActions([{ location: document.location.hash, message, variant, key }, ...actions]);

            // start fade out
            timeouts[key] = setTimeout(() => {
                const inlineAlert = document.querySelector<HTMLElement>(`[data-bspk="inline-alert"][id="${key}"]`);
                if (inlineAlert) inlineAlert.style.opacity = '0';

                // remove from state
                timeouts[key] = setTimeout(() => {
                    setActions((prevActions) => prevActions.filter((a) => a.key !== key));
                }, 1000);
            }, 2000);

            console.trace();
        };

        document.addEventListener('demoAction', demoActionListener);

        return () => {
            document.removeEventListener('demoAction', demoActionListener);
        };
    }, [actions, timeouts]);

    useEffect(() => {
        // clear timeouts on unmount
        return () => {
            Object.keys(timeouts).forEach((key) => clearTimeout(timeouts[key]));
        };
    }, [timeouts]);

    return { actions, action };
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
