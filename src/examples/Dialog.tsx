import { Button } from '@bspk/ui/Button';
import { Dialog, DialogProps } from '@bspk/ui/Dialog';
import { useModalState } from '@bspk/ui/hooks/useModalState';
import { typesMeta } from '@bspk/ui/meta';
import { useId } from 'react';

import { updateComponentState } from '../components/ComponentStateProvider';
import { ComponentExampleProps, ComponentExampleRenderProps } from '../types';
import { action } from '../utils/actions';

import { typeProps } from './utils';

export function DialogRender({ demoProps, state }: ComponentExampleRenderProps) {
    const dialogId = useId();

    const openKey = `${dialogId}-open`;

    const { open, onClose, onOpen } = useModalState(!!state[openKey], (next) =>
        updateComponentState<DialogProps>({ [openKey]: next }),
    );

    let label = 'Open Dialog';

    if ('data-variant-value' in state) label += ` (${state['data-variant-value']})`;

    return (
        <>
            <Button label={label} onClick={() => onOpen()} />
            <Dialog data-example-component id={dialogId} {...demoProps} onClose={onClose} open={open}>
                <pre>{JSON.stringify(demoProps, null, '\t')}</pre>
            </Dialog>
        </>
    );
}

export const dialogExample: ComponentExampleProps = {
    Component: Dialog,
    render: DialogRender,
    hideVariants: ['open'],
    props: typeProps<DialogProps>([
        {
            name: 'onClose',
            default: () => {
                action('Dialog closed');
                updateComponentState<DialogProps>({ open: false });
            },
        },
        {
            name: 'open',
            controlType: 'null',
            description: `${
                typesMeta.find((t) => t.name === 'DialogProps')?.properties?.find((t) => t.name === 'open')?.description
            }\n\n On this demo page the button in each example controls this.`,
        },
    ]),
};

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
