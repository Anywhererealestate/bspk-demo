import { Button } from '@bspk/ui/Button/Button';
import { Page } from 'src/components/Page';

export function Welcome() {
    return (
        <Page>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    marginTop: '20vh',
                    textAlign: 'center',
                }}
            >
                <h1>BSPK: The Foundation for Your Next Project</h1>
                <p>
                    A set of custom designed components that you can customize, extend, and build on. BSPK makes
                    following the Bespoke Design System easier than ever. Open Source. Open Code.
                </p>
                <div
                    style={{
                        display: 'flex',
                        gap: 'var(--spacing-sizing-06)',
                        marginTop: 'var(--spacing-sizing-02)',
                        flexWrap: 'wrap',
                        justifyContent: 'center',
                    }}
                >
                    <Button as="a" href="/get-started" label="Get Started" size="small" variant="secondary" />
                    <Button as="a" href="/components" label="View Components" size="small" variant="secondary" />
                </div>
            </div>
        </Page>
    );
}
