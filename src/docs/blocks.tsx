import { Button } from '@bspk/ui/Button';
import { Layout } from '@bspk/ui/Layout';
import { useState } from 'react';
import { Page } from 'src/components/Page';
import { useGlobalState } from 'src/utils/globalState';

const blocks = ['Page Headers', 'Cards', 'EmptyState'];

export function Blocks() {
    useGlobalState();

    const [section, setSection] = useState(blocks[0]);

    return (
        <Page style={{ padding: '0' }}>
            <section
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding: 'var(--spacing-sizing-10)',
                    textAlign: 'center',
                }}
            >
                <h2>Building Blocks for BSPK</h2>
                <p>Building blocks you can copy and paste into your apps.</p>
            </section>
            <section
                style={{
                    width: '100%',
                    maxWidth: '1280px',
                    padding: 'var(--spacing-sizing-10)',
                }}
            >
                <Layout align="start" gap="4">
                    {blocks.map((block) => (
                        <Button
                            key={block}
                            label={block}
                            onClick={() => setSection(block)}
                            style={{ fontWeight: section === block ? 'bold' : undefined }}
                            variant="tertiary"
                        />
                    ))}
                </Layout>
            </section>
        </Page>
    );
}
