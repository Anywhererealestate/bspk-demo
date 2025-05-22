import { ElementProps } from '@bspk/ui';
import { TabGroup } from '@bspk/ui/TabGroup';
import { ComponentProps, CSSProperties, ReactNode, useRef, useState } from 'react';
import { AccessibilitySection } from 'src/components/AccessibilitySection';
import ComponentLogs from 'src/components/ComponentLogs';
import { ErrorBoundary } from 'src/components/ErrorBoundary';
import { Syntax } from 'src/components/Syntax';
import { DemoComponent } from 'src/types';
import { PrettyParser } from 'utils/pretty';

export function CodeExample({
    renderContainer,
    code,
    children,
    language = 'typescript',
    ...elementProps
}: ElementProps<
    {
        renderContainer?: ComponentProps<'div'> & { css?: CSSProperties };
        code?: string;
        children: ReactNode;
        language?: PrettyParser;
        usage?: DemoComponent['usage'];
    },
    'div'
>) {
    const TABS = [
        { label: 'Example', value: 'example' },
        { label: 'Code', value: 'code' },
        { label: 'Accessibility', value: 'accessibility' },
    ];

    const [demoTab, setDemoTab] = useState<(typeof TABS)[number]['value']>('example');

    const exampleRef = useRef<HTMLDivElement | null>(null);

    return (
        <div data-example-code {...elementProps}>
            {code && (
                <TabGroup
                    onChange={(nextDemoTab) => setDemoTab(nextDemoTab as any)}
                    options={[...TABS].filter((tab) => tab.value !== 'accessibility' || exampleRef)}
                    showTrail
                    style={{ width: '100%' }}
                    value={demoTab}
                />
            )}
            <section data-active-tab={demoTab === 'example' || undefined} data-example>
                <ErrorBoundary>
                    <div
                        data-example-render
                        ref={exampleRef}
                        style={{ ...renderContainer?.style }}
                        {...(renderContainer || {})}
                    >
                        {children}
                    </div>
                </ErrorBoundary>
            </section>
            {code && (
                <section data-active-tab={demoTab === 'code' || undefined} data-code>
                    {demoTab === 'code' && <Syntax code={code} language={language} pretty />}
                </section>
            )}
            {exampleRef && (
                <section data-accessibility data-active-tab={demoTab === 'accessibility' || undefined}>
                    {demoTab === 'accessibility' && <AccessibilitySection code={code} context={exampleRef.current} />}
                </section>
            )}
            <ComponentLogs />
        </div>
    );
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
