import { TypePropertyExample } from '../types';

export const typeProps = <P extends Record<string, any> = Record<string, any>, N = keyof P>(
    p: (Omit<TypePropertyExample, 'name'> & {
        name: N;
    })[],
): (Omit<TypePropertyExample, 'name'> & {
    name: N;
})[] => p;

export const asProps = <P extends Record<string, any>>(p: Partial<P>): Partial<P> => p;

export const setPresets = <P extends Record<string, any>>(
    p: {
        name: string;
        state: Partial<P>;
        default?: boolean;
    }[],
) => p;

export const defaults = <P extends Record<string, any>>(x: Partial<P>) => x;

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
