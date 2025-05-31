import { SvgIcon } from '@bspk/icons/SvgIcon';
import { IconName, meta as iconsMeta } from '@bspk/icons/meta';
import { CheckboxOption } from '@bspk/ui/CheckboxOption';
import { Layout } from '@bspk/ui/Layout';
import { TextInput as TextInput } from '@bspk/ui/TextInput';
import { Tooltip } from '@bspk/ui/Tooltip';
import { Page } from 'components/Page';
import { Fragment, useMemo, useState, useRef, useEffect } from 'react';

const titleCase = (word: string) => word[0].toUpperCase() + word.slice(1);

const icons = Object.entries(iconsMeta).map(([name, v]) => ({
    name: name as IconName,
    ...v,
    description: name.replace(/([A-Z])/g, ' $1'),
}));

export type IconMeta = (typeof icons)[number];

export function Icons() {
    const [filter, setFilter] = useState({
        search: '',
        unfilled: true,
        filled: true,
    });

    const filtered = useMemo(() => {
        const searchBlob = filter.search.toLowerCase().trim();
        return icons
            .filter(
                (icon) =>
                    `${icon.name} ${icon.description} ${icon.type}`.toLowerCase().includes(searchBlob) &&
                    (icon.filled ? filter.filled : filter.unfilled),
            )
            .sort((a, b) => a.name.localeCompare(b.name));
    }, [filter.filled, filter.search, filter.unfilled]);

    const importText = (icon: IconMeta) => `import { Svg${icon.name} } from '@bspk/icons/${icon.name}';`;

    const [clippedIcon, setClippedIcon] = useState('');

    const clipTimeout = useRef<ReturnType<typeof setTimeout> | undefined>();

    const clip = (icon: IconMeta) => {
        // copy text to clipboard

        setClippedIcon(icon.name);

        if (clipTimeout.current) clearTimeout(clipTimeout.current);

        clipTimeout.current = setTimeout(() => setClippedIcon(''), 3000);

        navigator.clipboard.writeText(importText(icon));
    };

    useEffect(() => {
        return () => {
            if (clipTimeout.current) clearTimeout(clipTimeout.current);
        };
    }, []);

    return (
        <Page>
            <h1>Icons</h1>
            <p>Click an icon to copy it&apos;s import code.</p>
            <div data-page-icons>
                <div data-filters>
                    <Layout align="center">
                        <CheckboxOption
                            aria-label="Unfilled"
                            checked={filter.unfilled}
                            label="Unfilled"
                            name="unfilled"
                            onChange={(checked) => {
                                setFilter((p) => ({ ...p, unfilled: checked }));
                            }}
                            value="unfilled"
                        />
                        <CheckboxOption
                            aria-label="Filled"
                            checked={filter.filled}
                            label="Filled"
                            name="filled"
                            onChange={(checked) => {
                                setFilter((p) => ({ ...p, filled: checked }));
                            }}
                            value="filled"
                        />
                    </Layout>
                    <TextInput
                        aria-label="Search icons"
                        id=""
                        name="icon-search"
                        onChange={(search) => {
                            setFilter((p) => ({
                                ...p,
                                search,
                            }));
                        }}
                        placeholder="Search for an icon"
                        value={filter.search}
                    />
                </div>
                {(filter.filled !== filter.unfilled || filter.search) && (
                    <p>
                        {filtered.length} item{filtered.length === 1 ? '' : 's'}
                        {filter.search && ` matching "${filter.search}"`}
                        {filter.filled !== filter.unfilled &&
                            ((filter.unfilled && ' unfilled') || (filter.filled && ' filled'))}
                    </p>
                )}
                {['material', 'anywhere', 'country'].map((type) => {
                    const byType = filtered.filter((icon) => icon.type === type);

                    if (byType.length === 0) return null;

                    return (
                        <Fragment key={type}>
                            <h2 style={{ margin: '0.75em 0 0.5em' }}>{titleCase(type)}</h2>
                            <div data-icons>
                                {byType.map((icon, index) => {
                                    return (
                                        <Tooltip
                                            key={index}
                                            label={clippedIcon === icon.name ? 'Import code copied' : icon.name}
                                            placement="top"
                                        >
                                            <button data-icon onClick={() => clip(icon)}>
                                                <SvgIcon name={icon.name} width={48} />
                                            </button>
                                        </Tooltip>
                                    );
                                })}
                            </div>
                        </Fragment>
                    );
                })}
            </div>
        </Page>
    );
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
