/* eslint-disable @typescript-eslint/ban-ts-comment, @typescript-eslint/no-unused-vars */
import { updateComponentContext } from 'src/components/ComponentProvider';
import { action as actionBase } from 'src/utils/actions';

export function evalSafe<T>(code: unknown, fallback: T): T {
    // @ts-ignore -- setState may be used in the evaluated code block
    const setState = updateComponentContext;
    // @ts-ignore -- setState may be used in the evaluated code block
    const action = actionBase;

    if (!code) return fallback;

    if (typeof code !== 'string') return code as T;

    const codeToEvaluate = code?.trim() || '';
    try {
        return codeToEvaluate ? (eval(codeToEvaluate) as T) : fallback;
    } catch {
        return fallback;
    }
}
