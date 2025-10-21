import { ComponentMeta, UtilityMeta, TypeMeta } from '@bspk/ui/types/meta';
import meta from 'src/meta/data.json';

export const componentsMeta = meta.componentsMeta as ComponentMeta[];
export const utilitiesMeta = meta.utilitiesMeta as UtilityMeta[];
export const typesMeta = meta.typesMeta as TypeMeta[];
export const MODE = meta.MODE as 'development' | 'production' | 'test';
export const UI_HASH = meta.UI_HASH as string;
export const VERSION = meta.VERSION as string;
export const BUILD = meta.BUILD as string;

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
