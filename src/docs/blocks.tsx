import { CodePlayground } from 'src/components/CodePlayground';
import { Page } from 'src/components/Page';
import blocks from 'src/meta/blocks-meta.json';

const blocksSorted: Block[] = blocks.sort((a, b) => {
    if ((a.order ?? 99) !== (b.order ?? 99)) return (a.order ?? 99) - (b.order ?? 99);
    return a.name.localeCompare(b.name);
});

type Block = {
    order?: number;
    name: string;
    description?: string;
    examples: { name: string; description?: string; code: string }[];
};

export function Blocks() {
    return (
        <Page style={{ padding: 'var(--spacing-sizing-09) var(--spacing-sizing-05)' }}>
            <h2 title="Intro">Building Blocks for BSPK</h2>

            <p>The following blocks are design patterns consisting of reusable components and examples.</p>

            {blocksSorted.map((block) => (
                <div key={block.name} style={{ marginTop: 'var(--spacing-sizing-14)' }}>
                    <h3>{block.name}</h3>
                    {block.description && <p>{block.description}</p>}
                    {block.examples.map((example) => (
                        <div key={example.name} style={{ marginTop: 'var(--spacing-sizing-08)' }}>
                            <h4>{example.name}</h4>
                            {example.description && <p>{example.description}</p>}
                            <CodePlayground defaultCode={example.code} />
                        </div>
                    ))}
                </div>
            ))}
        </Page>
    );
}
