import { Button } from '@bspk/ui/Button';
import { Modal, ModalProps } from '@bspk/ui/Modal';
import { useModalState } from '@bspk/ui/hooks/useModalState';
import { typesMeta } from '@bspk/ui/meta';
import { useId } from 'react';

import { updateComponentState } from '../components/ComponentStateProvider';
import { ComponentExampleProps, ComponentExampleRenderProps } from '../types';
import { action } from '../utils/actions';

import { typeProps } from './utils';

export function ModalRender({ demoProps, state }: ComponentExampleRenderProps) {
    const dialogId = useId();

    const openKey = `${dialogId}-open`;

    const { open, onClose, onOpen } = useModalState(!!state[openKey], (next) =>
        updateComponentState<ModalProps>({ [openKey]: next }),
    );

    let label = 'Open Modal';

    if ('data-variant-value' in state) label += ` (${state['data-variant-value']})`;

    return (
        <>
            <Button label={label} onClick={() => onOpen()} />
            <Modal
                data-example-component
                description={state.description}
                header={state.header}
                id={dialogId}
                {...demoProps}
                {...state}
                onClose={onClose}
                open={open}
            >
                <pre>{JSON.stringify(demoProps, null, '\t')}</pre>
            </Modal>
        </>
    );
}

export const modalExample: ComponentExampleProps = {
    Component: Modal,
    hideVariants: ['open'],
    render: ModalRender,
    //hideVariants: true,
    props: typeProps<ModalProps>([
        {
            name: 'onClose',
            default: () => {
                action('Modal closed');
                updateComponentState<ModalProps>({ open: false });
            },
        },
        {
            name: 'open',
            controlType: 'null',
            description: `${
                typesMeta.find((t) => t.name === 'ModalProps')?.properties?.find((t) => t.name === 'open')?.description
            }\n\n On this demo page the button in each example controls this.`,
        },
    ]),
};

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
