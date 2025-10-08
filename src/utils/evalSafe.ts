import { updateComponentContext } from 'src/components/ComponentProvider';
import { action as actionBase } from 'src/utils/actions';

export function evalSafe<T>(code: unknown, fallback: T): T {
    const context = { setState: updateComponentContext, action: actionBase };
    if (!code) return fallback;
    if (typeof code !== 'string') return code as T;
    const codeToEvaluate = code?.trim() || '';

    try {
        if (!codeToEvaluate) return fallback;
        const evaluator = new Function(...Object.keys(context), `return ${codeToEvaluate}`);
        return evaluator(...Object.values(context)) as T;
    } catch {
        return fallback;
    }
}
