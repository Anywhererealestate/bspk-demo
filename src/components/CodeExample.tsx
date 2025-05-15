import { ElementProps } from '@bspk/ui';
import { TabGroup } from '@bspk/ui/TabGroup';
import { css, SerializedStyles } from '@emotion/react';
import { ComponentProps, ReactNode, useRef, useState } from 'react';

import { PrettyParser } from '../utils/pretty';

import { AccessibilitySection } from './AccessibilitySection';
import ComponentLogs from './ComponentLogs';
import { ErrorBoundary } from './ErrorBoundary';
import { Syntax } from './Syntax';

export const TABS = [
    { label: 'Example', value: 'example' },
    { label: 'Code', value: 'code' },
    { label: 'Accessibility', value: 'accessibility' },
] as const;

export function CodeExample({
    renderContainer,
    code,
    children,
    language = 'typescript',
    ...elementProps
}: ElementProps<
    {
        renderContainer?: ComponentProps<'div'> & { css?: SerializedStyles };
        code?: string;
        children: ReactNode;
        language?: PrettyParser;
    },
    'div'
>) {
    const [demoTab, setDemoTab] = useState<(typeof TABS)[number]['value']>('example');

    const exampleRef = useRef<HTMLDivElement | null>(null);

    return (
        <div data-example-code {...elementProps} css={style}>
            {code && (
                <TabGroup
                    onChange={(nextDemoTab) => setDemoTab(nextDemoTab as any)}
                    options={[...TABS].filter((tab) => tab.value !== 'accessibility' || exampleRef)}
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

export const style = css`
    background: var(--surface-neutral-t1-base);
    border: solid 1px var(--stroke-neutral-low-contrast);
    border-radius: var(--radius-medium);

    [data-example-render] {
        width: 100%;
        min-width: 280px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    section:not([data-active-tab]) {
        position: absolute;
        opacity: 0;
        left: -9999px;
    }

    [data-example] {
        padding: var(--spacing-sizing-04);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        border-radius: var(--radius-small);
        min-height: var(--spacing-sizing-24);
        position: relative;
        &[data-checkers] {
            background-image:
                linear-gradient(45deg, var(--background-shade) 25%, transparent 25%),
                linear-gradient(-45deg, var(--background-shade) 25%, transparent 25%),
                linear-gradient(45deg, transparent 75%, var(--background-shade) 75%),
                linear-gradient(-45deg, transparent 75%, var(--background-shade) 75%);
            background-size: 20px 20px;
            background-position:
                0 0,
                0 10px,
                10px -10px,
                -10px 0px;
        }
    }

    [data-code] {
        border-radius: var(--radius-small);
        border-top: solid 1px var(--stroke-neutral-low-contrast);
        min-height: var(--spacing-sizing-24);

        [data-syntax] {
            margin: 0;

            code {
                min-height: var(--spacing-sizing-24);
            }
        }
    }

    [data-example]:has(+ * + [data-actions-errors]),
    [data-code]:has(+ [data-actions-errors]) {
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;
    }

    [data-actions-errors] {
        //
        padding: var(--spacing-sizing-02);
        display: flex;
        flex-direction: column;
        gap: var(--spacing-sizing-01);
    }

    [data-errors] {
        opacity: 0.7;
        padding: 0.5rem 1rem;
        background-color: var(--status-error);
        border-radius: var(--radius-small);
        border-top-left-radius: 0;
        border-top-right-radius: 0;
        border-top: 0;
        color: var(--foreground-neutral-on-color);
        font: var(--body-small);
        font-family: monospace;
        width: 100%;
    }

    [data-actions] {
        width: 100%;
    }

    [data-inline-alert] {
        transition: opacity 1s;
        opacity: 1;
    }
`;

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
