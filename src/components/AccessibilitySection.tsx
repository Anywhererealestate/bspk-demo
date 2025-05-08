import { SvgCheck } from '@bspk/icons/Check';
import { SvgRemove } from '@bspk/icons/Remove';
import { ListItem } from '@bspk/ui/ListItem';
import { Skeleton } from '@bspk/ui/Skeleton';
import { Txt } from '@bspk/ui/Txt';
import { css } from '@emotion/react';
import axe from 'axe-core';
import { useEffect, useMemo, useRef } from 'react';

import { useComponentState } from './ComponentStateProvider';
import { Syntax } from './Syntax';

export type AccessibilitySectionProps = {
    context: HTMLElement | null;
    code: string | undefined;
};

export function AccessibilitySection({ context, code }: AccessibilitySectionProps) {
    const { axeResults, setAxeResults } = useComponentState();

    const loadingRef = useRef(false);

    const runTimeout = useRef<ReturnType<typeof setTimeout>>();

    useEffect(() => {
        if (!context || !code || axeResults[code] || loadingRef.current) return;
        loadingRef.current = true;
        if (runTimeout.current) clearTimeout(runTimeout.current);

        runTimeout.current = setTimeout(() => {
            axe.run(context).then((results) => {
                setAxeResults(results, code);
                console.info('Accessibility Results', { results });
                loadingRef.current = false;
            });
        }, 1000);
    }, [context, setAxeResults, axeResults, code, runTimeout]);

    const results = useMemo(() => (code ? axeResults[code] : undefined), [axeResults, code]);

    return (
        <div css={style} data-axe-results>
            <Txt as="h5" variant="heading-h5">
                Violations
            </Txt>

            {!results && <Skeleton lines={3} variant="body-base" />}

            {results?.violations.length === 0 ? (
                <p style={{ color: 'var(--status-success)' }}>No accessibility violations found.</p>
            ) : (
                results?.violations.map((violation) => (
                    <div data-axe-violations key={violation.id}>
                        <ListItem
                            as="div"
                            css={css`
                                color: var(--status-error);
                                [data-item-label] [data-text] {
                                    color: var(--status-error);
                                }
                            `}
                            data-axe-violations
                            label={violation.description}
                            leading={<SvgRemove />}
                        />
                        {violation.nodes.map((node, index) => (
                            <div data-axe-node key={index}>
                                <Syntax code={node.html} language="html" />
                                <p>Failure Summary:</p>
                                <p>{node.failureSummary}</p>
                            </div>
                        ))}
                    </div>
                ))
            )}

            <Txt as="h5" variant="heading-h5">
                Passes
            </Txt>

            {!results && <Skeleton lines={3} variant="body-base" />}

            {results?.passes.length === 0 ? (
                <p>No passes reported.</p>
            ) : (
                results?.passes.map((pass) => (
                    <ListItem
                        as="div"
                        css={css`
                            color: var(--status-success);
                            [data-item-label] [data-text] {
                                color: var(--status-success);
                            }
                        `}
                        data-axe-pass
                        key={pass.id}
                        label={pass.description}
                        leading={<SvgCheck />}
                    />
                ))
            )}
        </div>
    );
}

const style = css`
    display: flex;
    flex-direction: column;
    padding: var(--spacing-sizing-05);
`;

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
