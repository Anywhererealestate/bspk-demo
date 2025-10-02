import { ComponentMeta, TypeMeta, UtilityMeta } from '@bspk/ui/types/meta';
import { createContext, PropsWithChildren, useContext } from 'react';
import meta from 'src/meta/data.json';

type MetaContext = {
    componentsMeta: ComponentMeta[];
    utilitiesMeta: UtilityMeta[];
    typesMeta: TypeMeta[];
    getComponentMeta: (name: string) => ComponentMeta | undefined;
};

const metaContext = createContext<MetaContext>({
    componentsMeta: [],
    utilitiesMeta: [],
    typesMeta: [],
    getComponentMeta: () => undefined,
});

export function MetaProvider({ children }: PropsWithChildren) {
    const componentsMeta = meta.componentsMeta as ComponentMeta[];
    const componentsMetaMap = new Map(componentsMeta.map((comp) => [comp.name, comp]));

    const getComponentMeta = (name: string) => {
        return componentsMetaMap.get(name);
    };

    return (
        <metaContext.Provider
            value={{
                componentsMeta,
                utilitiesMeta: meta.utilitiesMeta as UtilityMeta[],
                typesMeta: meta.typesMeta as TypeMeta[],
                getComponentMeta,
            }}
        >
            {children}
        </metaContext.Provider>
    );
}

export function useMetaContext() {
    return useContext(metaContext);
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
