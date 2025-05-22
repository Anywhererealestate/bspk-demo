import { SvgContentCopy } from '@bspk/icons/ContentCopy';
import { Fab } from '@bspk/ui/Fab';
import { useTimeout } from '@bspk/ui/hooks/useTimeout';
import hljs from 'highlight.js';
import { CSSProperties, useEffect, useId, useRef, useState } from 'react';
import { pretty, PrettyParser } from 'utils/pretty';
import useMountedState from 'utils/useMountState';

export function Syntax({
    code: preCode,
    language = 'typescript',
    style: propStyle = {},
    pretty: prettyProp,
}: {
    code: string;
    language?: PrettyParser;
    style?: CSSProperties;
    pretty?: boolean;
}) {
    const makePretty =
        prettyProp || language === 'typescript' || language.endsWith('css') || language.endsWith('script');

    const preId = useId();

    const [code, setCode] = useState('');

    const isMounted = useMountedState();

    const element = useRef<HTMLElement | null>(null);

    useEffect(() => {
        element.current = document.querySelector<HTMLElement>(`pre[id="${preId}"] code`)!;
    }, [preId]);

    useEffect(() => {
        if (!makePretty) {
            setCode(preCode);
            return;
        }
        pretty(preCode, language).then((next) => {
            if (isMounted()) setCode(next);
            delete element.current!.dataset.highlighted;
        });
    }, [preCode, isMounted, makePretty, language]);

    useEffect(() => {
        if (!element.current) return;

        if (code && element.current?.dataset.highlighted !== 'yes') hljs.highlightElement(element.current);
    }, [code, preId]);

    const [copyLabel, setCopyLabel] = useState(() => 'Copy code');
    const copyTimeout = useTimeout();

    return (
        <div data-syntax style={propStyle}>
            <Fab
                data-copy-code
                icon={<SvgContentCopy />}
                label={copyLabel}
                onClick={() => {
                    if (!navigator?.clipboard?.writeText) return;

                    navigator.clipboard.writeText(code);
                    setCopyLabel('Copied');
                    copyTimeout.set(() => {
                        setCopyLabel('Copy code');
                    }, 2000);
                }}
                placement="top-right"
                showLabel={false}
                size="small"
                style={{ marginTop: '-10px', marginRight: '-10px' }}
            />
            <pre id={preId}>
                <code className={`language-${language}`}>{code}</code>
            </pre>
        </div>
    );
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
