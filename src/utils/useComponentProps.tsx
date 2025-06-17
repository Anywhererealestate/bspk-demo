import { SvgIcon } from '@bspk/icons/SvgIcon';
import { meta } from '@bspk/icons/meta';
import { TypePropertyDemo } from '@bspk/ui/demo/utils';
import { useComponentContext } from 'src/components/ComponentProvider';

/**
 * UseComponentProps is a custom hook that retrieves and computes the properties for a component based on its state,
 * props, and any overrides provided.
 *
 * It combines the component's state, any overrides, and properties derived from the component's props and renders them
 * into a single object that can be used to render the component.
 */
export function useComponentProps(overrideState?: Record<string, any>): Record<string, any> {
    const { component, state } = useComponentContext();

    const { props, functionProps } = component;

    const combinedState = { ...state, ...overrideState };

    const propsFromState: Record<string, any> = getPropsFromState(props, combinedState);

    return { ...combinedState, ...propsFromState, ...functionProps };
}

function getPropsFromState(props: TypePropertyDemo[], state: Record<string, any>): Record<string, any> {
    const stateProps: Record<string, any> = {};

    const iconProp = props.find((prop) => prop.name === 'icon' && prop.type === 'BspkIcon');

    if (iconProp)
        stateProps.icon =
            typeof state.icon === 'string' && state.icon in meta ? <SvgIcon name={state.icon as any} /> : undefined;

    return stateProps;
}
