import { useEffect, useMemo, useState } from 'react';
import { kebabCase } from 'src/utils/kebabCase';

export type ActionLog = { message: string; location: string; key: string };

const demoActionEvent = (message: string) => new CustomEvent('demoAction', { detail: message });

export function action(...str: any[]) {
    const message = str
        .flat()
        .map((s) =>
            typeof s === 'object'
                ? JSON.stringify(s, (_, value) => {
                      console.info(value);
                      return value.toString();
                  })
                : s.toString(),
        )
        .join(',');

    document.dispatchEvent(demoActionEvent(message));
}

export function useActionLog() {
    const [actions, setActions] = useState<ActionLog[]>([]);

    const timeouts: Record<string, ReturnType<typeof setTimeout>> = useMemo(() => ({}), []);

    useEffect(() => {
        const demoActionListener = (e: any) => {
            const message = e.detail;

            const key = kebabCase(`${document.location.hash} // ${message}${Date.now()}`);
            setActions([{ location: document.location.hash, message, key }, ...actions]);

            // start fade out
            timeouts[key] = setTimeout(() => {
                const inlineAlert = document.querySelector<HTMLElement>(`[data-inline-alert="${key}"]`);
                if (inlineAlert) inlineAlert.style.opacity = '0';

                // remove from state
                timeouts[key] = setTimeout(() => {
                    setActions((prevActions) => prevActions.filter((a) => a.key !== key));
                }, 1000);
            }, 3000);

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
