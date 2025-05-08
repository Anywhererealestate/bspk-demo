import { Divider } from '@bspk/ui/Divider';

import { Placeholder } from '../components/Placeholder';
import { ComponentExampleProps } from '../types';

export const dividerExample: ComponentExampleProps = {
    Component: Divider,
    render: ({ demoProps: props }) => {
        let dimensions = { height: 100 as number | string, width: '300px' as number | string };

        if (props.orientation === 'vertical') dimensions = { height: 300, width: 100 };

        return (
            <div
                style={{
                    display: 'flex',
                    flexDirection: props.orientation === 'vertical' ? 'row' : 'column',
                    alignItems: props.orientation === 'vertical' ? 'center' : 'stretch',
                    justifyContent: props.orientation === 'vertical' ? 'center' : 'stretch',
                    maxWidth: props.orientation !== 'vertical' ? '300px' : 'auto',
                }}
            >
                <Placeholder {...dimensions} direction={props.orientation !== 'vertical' ? 'row' : 'column'} />
                <Divider {...props} />
                <Placeholder {...dimensions} direction={props.orientation !== 'vertical' ? 'row' : 'column'} />
            </div>
        );
    },
};

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
