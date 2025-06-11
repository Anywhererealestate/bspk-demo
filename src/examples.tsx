/* eslint-disable @cspell/spellchecker */
import { SkeletonProps } from '@bspk/ui/Skeleton';
import { examples, setPresets } from '@bspk/ui/demo/examples';
import { useTimeout } from '@bspk/ui/hooks/useTimeout';
import { useEffect, useState } from 'react';
import { updateComponentContext } from 'src/components/ComponentProvider';
import { action } from 'src/utils/actions';

/**
 * Examples can come from the @bspk/ui library or be custom examples below.
 *
 * We probably want to keep the examples in this file as minimal as possible, so that we can easily update them when the
 * library changes.
 */

const componentExamples = examples(updateComponentContext, action);

function SkeletonTransition({ Component, ...props }: { Component: React.ComponentType<Record<string, unknown>> }) {
    const loadingTimeout = useTimeout();

    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        loadingTimeout.set(() => setLoaded(true), 3000);
    }, [loadingTimeout]);

    return (
        <Component {...props}>
            {loaded && (
                <p>
                    Synergestic actionables turn the ship, or vertical integration, offerings locked and loaded, so get
                    buy-in.
                </p>
            )}
        </Component>
    );
}

componentExamples['Skeleton'] = {
    ...componentExamples['Skeleton'],
    render: ({ props, preset, Component }) => {
        if (preset?.label === 'Loading Transition') return <SkeletonTransition {...props} Component={Component} />;

        return <Component {...props} />;
    },
    presets: setPresets<SkeletonProps>([
        {
            label: 'Loading Transition',
            state: {
                textVariant: 'body-base',
                textLines: 3,
            },
        },
    ]),
};

export { componentExamples };
