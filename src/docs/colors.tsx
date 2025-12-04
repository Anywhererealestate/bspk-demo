import { Button } from '@bspk/ui/Button';
import { sendSnackbar } from '@bspk/ui/Snackbar/Manager';
import { Table, TableCellValueFormatter, TableColumn, TableRow } from '@bspk/ui/Table';
import { Page } from 'src/components/Page';
import colorMeta from 'src/meta/colors-meta.json';
import { useGlobalState } from 'src/utils/globalState';

type ColorInfo = {
    brightnessLevel?: number;
    r: number;
    g: number;
    b: number;
    value: string;
};

type ColorRow = {
    name: string;
    description?: string;
    dark?: ColorInfo;
    root?: ColorInfo;
    var: string;
};

const COLOR_ROWS = colorMeta.map(
    (r): ColorTableRow => ({
        ...r,
        id: r.var,
        darkRed: r.dark?.r,
        darkGreen: r.dark?.g,
        darkBlue: r.dark?.b,
        rootRed: r.root?.r,
        rootGreen: r.root?.g,
        rootBlue: r.root?.b,
        darkBrightnessLevel: r.dark?.brightnessLevel,
        rootBrightnessLevel: r.root?.brightnessLevel,
    }),
);

type ColorTableRow = ColorRow & TableRow;

const swatch: TableCellValueFormatter<ColorTableRow> = function Swatch(row) {
    return <div style={{ backgroundColor: `var(${row.var})`, width: '40px', height: '40px' }} />;
};

const columns = (variant: 'dark' | 'root'): TableColumn<ColorTableRow>[] => [
    {
        label: 'Name',
        key: 'name',
        formatter: (row: ColorRow) =>
            row.description ? (
                <div>
                    <strong>{row.name}</strong>
                    <br />
                    <small>{row.description}</small>
                </div>
            ) : (
                row.name
            ),
        sort: 'string',
    },
    {
        label: 'Swatch',
        key: 'swatch',
        formatter: swatch,
        width: '60px',
    },
    {
        label: 'Variable Name',
        key: 'var',
        formatter: (row: ColorRow) => (
            <Button
                label={row.var}
                onClick={() => {
                    navigator.clipboard.writeText(`var(${row.var})`);
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
                    {row.var}
                </span>
            </Button>
        ),
        sort: 'string',
    },
    {
        label: 'Brightness',
        key: `${variant}BrightnessLevel`,
        sort: 'number',
        formatter: (row) => `${row[`${variant}BrightnessLevel`]}%`,
        width: '80px',
    },
    // {
    //     label: 'Red',
    //     key: `${variant}Red`,
    //     sort: 'number',
    //     formatter: (row) => row[variant]?.r ?? '',
    //     width: '60px',
    // },
    // {
    //     label: 'Green',
    //     key: `${variant}Green`,
    //     sort: 'number',
    //     formatter: (row) => row[variant]?.g ?? '',
    //     width: '60px',
    // },
    // {
    //     label: 'Blue',
    //     key: `${variant}Blue`,
    //     sort: 'number',
    //     formatter: (row) => row[variant]?.b ?? '',
    //     width: '60px',
    // },
];

export function Colors() {
    const { theme } = useGlobalState();

    return (
        <Page style={{ padding: '0' }}>
            <h2>Colors</h2>

            <h3>Theme Colors</h3>
            <p>These are colors designed for direct use as they have both dark and light variants.</p>
            <Table
                columns={columns(theme === 'dark' ? 'dark' : 'root')}
                data={COLOR_ROWS.filter((c) => c.dark)}
                pageSize={100}
                size="large"
            />

            <h3>Root Colors</h3>
            <p>
                These are colors without a dark and light variant. These are usually primitives and not designed for
                direct use.
            </p>
            <Table columns={columns('root')} data={COLOR_ROWS.filter((c) => !c.dark)} pageSize={100} size="large" />
        </Page>
    );
}
