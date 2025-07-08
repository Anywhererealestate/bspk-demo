import { errorContext } from '@bspk/ui/utils/errors';

export function ErrorLogContext({ children, id }: { children: React.ReactNode; id: string }) {
    return <errorContext.Provider value={id}>{children}</errorContext.Provider>;
}
