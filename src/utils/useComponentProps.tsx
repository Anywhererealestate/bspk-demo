import { SvgIcon } from '@bspk/icons/SvgIcon';
import { meta } from '@bspk/icons/meta';
import { TypePropertyDemo } from '@bspk/ui/demo/examples';
import { useComponentContext } from 'src/components/ComponentProvider';

/**
 * UseComponentProps is a custom hook that retrieves and computes the properties for a component based on its state,
 * props, and any overrides provided.
 *
 * It combines the component's state, any overrides, and properties derived from the component's props and renders them
 * into a single object that can be used to render the component.
 */
export function useComponentProps(
    overrideState?: Record<string, any>,
    context?: Record<string, any>,
): Record<string, any> {
    const { component, state, preset } = useComponentContext();

    const { props, propRenderOverrides, functionProps } = component;

    const combinedState = { ...state, ...overrideState, ...preset?.state };

    const propsFromState: Record<string, any> = getPropsFromState(props, combinedState);

    const renderedProps: Record<string, any> = propRenderOverrides?.(combinedState, { ...context, preset }) || {};

    // console.log({ combinedState, propsFromState, functionProps, renderedProps });

    return { ...combinedState, ...propsFromState, ...functionProps, ...renderedProps };
}

function getPropsFromState(props: TypePropertyDemo[], state: Record<string, any>): Record<string, any> {
    const stateProps: Record<string, any> = {};

    const iconProp = props.find((prop) => prop.name === 'icon' && prop.type === 'BspkIcon');

    if (iconProp)
        stateProps.icon =
            typeof state.icon === 'string' && state.icon in meta ? <SvgIcon name={state.icon as any} /> : undefined;

    return stateProps;
}
