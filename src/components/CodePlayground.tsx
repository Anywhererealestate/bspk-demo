/* eslint-disable react/no-multi-comp */

import { SvgIcon } from '@bspk/icons/SvgIcon';
import { Card } from '@bspk/ui/Card';
import { Snackbar } from '@bspk/ui/Snackbar';
import { useTimeout } from '@bspk/ui/hooks/useTimeout';
import { DemoAction } from '@bspk/ui/utils/demo';
import { SnackbarProps } from 'components/Snackbar/index';
import { themes } from 'prism-react-renderer';
import { useContext, useEffect, useRef, useState } from 'react';
import { LiveProvider, LiveError, LivePreview, LiveEditor, LiveContext } from 'react-live';
import { useGlobalState } from 'src/utils/globalState';
import { pretty } from 'src/utils/pretty';

export function CodePlayground({
    code: externalCode,
    scope: externalScope = {},
}: {
    code: string;
    scope?: Record<string, unknown>;
}) {
    const [snackbar, setSnackbar] = useState<SnackbarProps | undefined>();

    const { theme } = useGlobalState();

    const action: DemoAction = (message: string) => {
        setSnackbar({
            text: message,
            onClose: () => setSnackbar(undefined),
            timeout: 1000,
        });
    };

    const [code, setCodeState] = useState('');
    const [scope, setScope] = useState<Record<string, unknown>>({ ...externalScope, useState });

    // debounce calls to setCode to avoid excessive re-renders
    const debounceTimeout = useTimeout();

    const setCode = (newCode: string) => {
        debounceTimeout.set(() => {
            // update scope if icons are referenced in the new code and not already present in the scope
            const foundIcons = newCode.match(/Svg[A-Za-z0-9_]*/g) || [];
            const newIcons = foundIcons.filter((iconName) => !scope[iconName]);

            if (newIcons && newIcons.length > 0) {
                const nextScope = { ...scope };

                newIcons.forEach((iconName) => {
                    nextScope[iconName] = () => <SvgIcon name={iconName.replace(/^Svg/, '') as any} />;
                });

                setScope(nextScope);
                setCodeState(newCode);
            } else {
                setCodeState(newCode);
            }
        }, 300);
    };

    useEffect(() => {
        pretty(externalCode || '').then((formatted) => setCode(formatted));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [externalCode]);

    const lastError = useRef<string | undefined>('');
    const manageError = (error: string | undefined) => {
        if (lastError.current === error) return;

        lastError.current = error;
    };

    return (
        <>
            {snackbar && <Snackbar {...snackbar} open />}
            <Card data-code-editor variant="outlined">
                <LiveProvider code={removeImports(code)} enableTypeScript scope={{ ...scope, action }}>
                    <LivePreview data-preview />
                    <LiveErrorReporter onError={manageError} />
                    <div data-editor>
                        <LiveEditor
                            onChange={(newCode) => setCode(newCode)}
                            theme={theme === 'dark' ? themes.vsDark : themes.vsLight}
                        />
                    </div>
                </LiveProvider>
            </Card>
        </>
    );
}

function removeImports(code: string) {
    return code.replace(/import [^;]+;?\n/g, '').trim();
}

function LiveErrorReporter({
    onError,
    report = true,
}: {
    onError: (error: string | undefined) => void;
    report?: boolean;
}) {
    const { error } = useContext(LiveContext);
    useEffect(() => onError(error), [error, onError]);
    return report && <LiveError data-error />;
}
