import { SvgCheck } from '@bspk/icons/Check';
import { SvgSearch } from '@bspk/icons/Search';
import { META } from '@bspk/styles/data/meta';
import { Button } from '@bspk/ui/Button';
import { Input } from '@bspk/ui/Input';
import { Select } from '@bspk/ui/Select';
import { sendSnackbar } from '@bspk/ui/Snackbar/Manager';
import { Table, TableColumn, TableRow } from '@bspk/ui/Table';
import { useMemo, useState } from 'react';
import { Page } from 'src/components/Page';

const COLOR_ROWS = META.filter(
    (m) => m.type === 'token' && (m.cssValue?.startsWith('#') || m.cssValues?.[0].value.startsWith('#')),
).map((color) => {
    return {
        ...color,
        id: color.varName,
        root: Boolean(color.cssValues?.every((v) => !v.modes.includes('dark'))) || Boolean(color.cssValue),
    };
});

type ColorTableRow = (typeof COLOR_ROWS)[number] & TableRow;

const columns: TableColumn<ColorTableRow>[] = [
    {
        label: 'Name',
        key: 'name',
        formatter: (row: ColorTableRow) =>
            row.description ? (
                <div>
                    {row.tokenName}
                    <br />
                    <small>{row.description}</small>
                </div>
            ) : (
                row.tokenName
            ),
        sort: 'string',
    },
    {
        label: 'Swatch',
        key: 'swatch',
        formatter(row) {
            return <div style={{ backgroundColor: `var(${row.cssVariable})`, width: '40px', height: '40px' }} />;
        },
        width: '60px',
    },
    {
        label: 'Variable Name',
        key: 'cssVariable',
        formatter(row: ColorTableRow) {
            return (
                <Button
                    label={row.cssVariable}
                    onClick={() => {
                        navigator.clipboard.writeText(`var(${row.cssVariable})`);
                        sendSnackbar({ text: `Copied to clipboard`, timeout: 1000 });
                    }}
                    variant="tertiary"
                >
                    <span
                        style={{
                            whiteSpace: 'nowrap',
                            fontFamily: 'monospace',
                            fontSize: '14px',
                            maxWidth: '300px',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                        }}
                    >
                        {row.cssVariable}
                    </span>
                </Button>
            );
        },
        sort: 'string',
    },
    {
        label: 'Root',
        key: `root`,
        sort: 'boolean',
        formatter(row) {
            return row.root ? <SvgCheck /> : '';
        },
        width: '60px',
    },
];

type ColorType = (typeof COLOR_TYPES)[number];

const COLOR_TYPES = ['Theme', 'Root'] as const;

export function Colors() {
    const [filter, setFilter] = useState<{ search: string; type: ColorType | null }>({
        search: '',
        type: null,
    });

    const filtered = useMemo(() => {
        return COLOR_ROWS.filter((color) => {
            const matchesSearch =
                filter.search === '' ||
                color.tokenName.toLowerCase().includes(filter.search.toLowerCase()) ||
                color.cssVariable.toLowerCase().includes(filter.search.toLowerCase()) ||
                (color.description && color.description.toLowerCase().includes(filter.search.toLowerCase()));
            const matchesType =
                !filter.type ||
                (filter.type === 'Theme' && color.cssValues?.some((v) => v.modes.includes('dark'))) ||
                (filter.type === 'Root' &&
                    (color.cssValues?.every((v) => !v.modes.includes('dark')) || Boolean(color.cssValue)));

            return matchesSearch && matchesType;
        });
    }, [filter]);

    return (
        <Page>
            <h2>Colors</h2>
            <p>
                These include colors which have both dark and light variants (Theme) and colors with a single variant
                (Root).
            </p>
            <div data-page-icons style={{ marginBottom: '16px' }}>
                <div data-filters>
                    <Input
                        aria-label="Search colors"
                        data-search
                        id="color-search"
                        leading={<SvgSearch />}
                        name="color-search"
                        onChange={(search) => {
                            setFilter((p) => ({
                                ...p,
                                search: search || '',
                            }));
                        }}
                        placeholder="Search for an color"
                        value={filter.search}
                    />
                    <Select
                        aria-label="Icon type"
                        data-type
                        name="color-type"
                        onChange={(value) => {
                            setFilter((p) => ({
                                ...p,
                                type: value as ColorType | null,
                            }));
                        }}
                        options={[
                            { label: 'All types', value: '' },
                            ...COLOR_TYPES.map((type) => ({
                                label: type,
                                value: type,
                            })),
                        ]}
                        value={filter.type || 'all'}
                    />
                </div>
                {(filter.search || filter.type) && (
                    <p>
                        {filtered.length} item{filtered.length === 1 ? '' : 's'}
                        {filter.search && ` matching "${filter.search}"`}
                        {filter.type && ` of type "${filter.type}"`}
                    </p>
                )}
            </div>
            <Table columns={columns} data={filtered} pageSize={999999} size="large" />
        </Page>
    );
}
