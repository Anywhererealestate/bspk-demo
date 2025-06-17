import { SvgIcon } from '@bspk/icons/SvgIcon';
import { meta } from '@bspk/icons/meta';
import { TypePropertyDemo } from '@bspk/ui/demo/utils';
import { useId } from 'react';
import { updateComponentContext, useComponentContext } from 'src/components/ComponentProvider';
import { components } from 'src/meta';

export type ComponentRenderProps = {
    overrideState?: Record<string, any>;
    context?: Record<string, any>;
};

export function ComponentRender({ overrideState, context }: ComponentRenderProps): React.ReactNode {
    const { component, state, preset } = useComponentContext();
    const id = useId();

    const Component = components[component.name as keyof typeof components];

    if (!Component) {
        console.warn(`Component "${component.name}" not found in components meta.`);
        return;
    }

    const renderProps = {
        ...component.functionProps,
        ...state,
        ...overrideState,
        ...getPropsFromState(component.props, state),
    };

    return component.render ? (
        component.render({
            Component,
            props: renderProps,
            preset,
            setState: updateComponentContext,
            id,
            context,
        })
    ) : (
        <Component {...renderProps} />
    );
}

/**
 * Certins props we don't want top put into state (like ReactNodes)
 *
 * This Just-in-time converts strings and other types to their correct types (like ReactNodes).
 */
function getPropsFromState(props: TypePropertyDemo[], state: Record<string, any>): Record<string, any> {
    const stateProps: Record<string, any> = {};

    const iconProp = props.find((prop) => prop.name === 'icon' && prop.type === 'BspkIcon');

    if (iconProp)
        stateProps.icon =
            typeof state.icon === 'string' && state.icon in meta ? <SvgIcon name={state.icon as any} /> : undefined;

    return stateProps;
}
