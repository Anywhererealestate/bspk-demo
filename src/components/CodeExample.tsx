import { ElementProps } from '@bspk/ui';
import { TabGroup } from '@bspk/ui/TabGroup';
import { AccessibilitySection } from 'components/AccessibilitySection';
import ComponentLogs from 'components/ComponentLogs';
import { ErrorBoundary } from 'components/ErrorBoundary';
import { CSSProperties, ReactNode, useRef, useState } from 'react';

export function CodeExample({
    children,
    containerStyle,
    ...elementProps
}: ElementProps<
    {
        containerStyle?: CSSProperties;
        children: ReactNode;
    },
    'div'
>) {
    const TABS = [
        { label: 'Example', value: 'example' },
        { label: 'Accessibility', value: 'accessibility' },
    ];

    const [demoTab, setDemoTab] = useState<(typeof TABS)[number]['value']>('example');

    const exampleRef = useRef<HTMLDivElement | null>(null);

    return (
        <div data-example-code {...elementProps}>
            <TabGroup
                onChange={(nextDemoTab) => setDemoTab(nextDemoTab as any)}
                options={[...TABS].filter((tab) => tab.value !== 'accessibility' || exampleRef)}
                showTrail
                style={{ width: '100%' }}
                value={demoTab}
            />
            <section data-active-tab={demoTab === 'example' || undefined} data-example>
                <ErrorBoundary>
                    <div data-example-render ref={exampleRef} style={containerStyle}>
                        {children}
                    </div>
                </ErrorBoundary>
            </section>
            {exampleRef && (
                <section data-accessibility data-active-tab={demoTab === 'accessibility' || undefined}>
                    {demoTab === 'accessibility' && <AccessibilitySection context={exampleRef.current} />}
                </section>
            )}
            <ComponentLogs />
        </div>
    );
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
