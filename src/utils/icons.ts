import { IconName, meta, IconMeta, IconType } from '@bspk/icons/meta';

export * from '@bspk/icons/SvgIcon';

export const ICONS = meta;

export const ICON_META = Object.fromEntries(meta.map((icon) => [icon.name, icon])) as Record<IconName, IconMeta>;

export const ICON_NAMES = meta.map((icon) => icon.name);

export type { IconName, IconMeta, IconType };

export function isIconName(name: string): name is IconName {
    return typeof name === 'string' && ICON_NAMES.includes(name as IconName);
}
