import { SvgContentCopy } from '@bspk/icons/ContentCopy';
import { SvgRefresh } from '@bspk/icons/Refresh';
import { SvgIcon } from '@bspk/icons/SvgIcon';
import { Button } from '@bspk/ui/Button/Button';
import { Card } from '@bspk/ui/Card';
import { FieldDescription, FieldError, FieldLabel } from '@bspk/ui/Field';
import { InputElement } from '@bspk/ui/Input';
import { sendSnackbar } from '@bspk/ui/Snackbar';
import { DemoAction } from '@bspk/ui/utils/demo';
import { themes } from 'prism-react-renderer';
import React, { useContext, useEffect, useState } from 'react';
import { LiveProvider, LiveError, LivePreview, LiveEditor, LiveContext } from 'react-live';
import { components } from 'src/meta';
import { useGlobalState } from 'src/utils/globalState';
import { pretty } from 'src/utils/pretty';

const action: DemoAction = (message: string) => {
    sendSnackbar({
        text: message,
        timeout: 1000,
    });
};

type CodePlaygroundProps = {
    defaultCode: string;
    githubLink?: string;
};

/**
 * A code playground component that provides an editor and live preview for code snippets.
 *
 * 1. Initial previewCode and editorCode is set from externalCode
 * 2. OnChange editorCode updates immediately
 * 3. PreviewCode updated with debounced editorCode updates
 * 4. If no errors in preview, previewCode is saved to lastValidCodeRef
 * 5. If errors in preview, previewCode is set back to lastValidCodeRef
 * 6. When externalCode changes, editorCode and previewCode are updated immediately
 */
export function CodePlayground({ defaultCode, githubLink }: CodePlaygroundProps) {
    const { theme } = useGlobalState();

    // this is the code shown in the editor, should be updated immediately when externalCode changes

    const [code, setCode] = useState<string>(defaultCode);

    useEffect(() => {
        pretty(defaultCode || '', { parser: 'typescript' }).then(setCode);
    }, [defaultCode]);

    const [showCode, setShowCode] = useState<boolean>(false);

    return (
        <>
            <Card data-code-editor variant="outlined">
                <LiveProvider
                    code={transformPreviewCode(code)}
                    enableTypeScript
                    scope={{
                        ...components,
                        ...React,
                        action,
                        sendSnackbar,
                        SvgIcon,
                        FieldLabel,
                        FieldDescription,
                        FieldError,
                        InputElement,
                    }}
                >
                    <LogErrors />
                    <LivePreview data-preview />
                    <LiveError data-error />
                </LiveProvider>
                {showCode && (
                    <div data-editor>
                        <LiveEditor
                            code={code}
                            language="typescript"
                            onChange={(newCode) => setCode(newCode)}
                            theme={theme === 'dark' ? themes.vsDark : themes.vsLight}
                        />
                    </div>
                )}
                <div data-code-options>
                    <Button
                        label={showCode ? 'Collapse code' : 'Expand code'}
                        onClick={() => setShowCode((p) => !p)}
                        size="x-small"
                        style={{ borderRadius: 'var(--radius-full)' }}
                        variant="secondary"
                    />
                    <Button
                        icon={<SvgContentCopy />}
                        iconOnly
                        label="Copy code"
                        onClick={() => {
                            navigator.clipboard.writeText(code || '');
                            sendSnackbar({ text: 'Code copied to clipboard', timeout: 3000 });
                        }}
                        size="small"
                        variant="tertiary"
                    />
                    <Button
                        icon={<SvgRefresh />}
                        iconOnly
                        label="Reset"
                        onClick={() => {
                            pretty(defaultCode || '', { parser: 'typescript' }).then(setCode);
                        }}
                        size="small"
                        variant="tertiary"
                    />
                    {githubLink && (
                        <Button
                            as="a"
                            href={githubLink}
                            icon={
                                <svg
                                    aria-hidden="true"
                                    className="octicon octicon-mark-github v-align-middle"
                                    data-view-component="true"
                                    height="32"
                                    version="1.1"
                                    viewBox="0 0 24 24"
                                    width="32"
                                >
                                    <path d="M12 1C5.923 1 1 5.923 1 12c0 4.867 3.149 8.979 7.521 10.436.55.096.756-.233.756-.522 0-.262-.013-1.128-.013-2.049-2.764.509-3.479-.674-3.699-1.292-.124-.317-.66-1.293-1.127-1.554-.385-.207-.936-.715-.014-.729.866-.014 1.485.797 1.691 1.128.99 1.663 2.571 1.196 3.204.907.096-.715.385-1.196.701-1.471-2.448-.275-5.005-1.224-5.005-5.432 0-1.196.426-2.186 1.128-2.956-.111-.275-.496-1.402.11-2.915 0 0 .921-.288 3.024 1.128a10.193 10.193 0 0 1 2.75-.371c.936 0 1.871.123 2.75.371 2.104-1.43 3.025-1.128 3.025-1.128.605 1.513.221 2.64.111 2.915.701.77 1.127 1.747 1.127 2.956 0 4.222-2.571 5.157-5.019 5.432.399.344.743 1.004.743 2.035 0 1.471-.014 2.654-.014 3.025 0 .289.206.632.756.522C19.851 20.979 23 16.854 23 12c0-6.077-4.922-11-11-11Z" />
                                </svg>
                            }
                            iconOnly
                            label="View on GitHub"
                            size="small"
                            target="_blank"
                            variant="tertiary"
                        />
                    )}
                </div>
            </Card>
        </>
    );
}

function transformPreviewCode(code: string | undefined) {
    const next = code
        // Remove import statements
        ?.replace(/import [^;]+;?\n/g, '')
        // Replace individual SVG imports with SvgIcon usage
        .replace(/<Svg([^ ]+) \/>/g, '<SvgIcon name="$1" />')
        //replace comment lines
        .replace(/\n[\s]+\/\/.*/g, '')
        .trim();

    return next;
}

// eslint-disable-next-line react/no-multi-comp
function LogErrors() {
    const { error, code } = useContext(LiveContext);
    if (error) console.error('CodePlayground Error:', { error, code });
    return null;
}
