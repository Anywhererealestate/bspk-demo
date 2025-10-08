import { useId } from '@bspk/ui/hooks/useId';
import { ComponentExampleRenderProps, TypePropertyDemo } from '@bspk/ui/utils/demo';
import { randomString } from '@bspk/ui/utils/random';
import { updateComponentContext, useComponentContext } from 'src/components/ComponentProvider';
import { components } from 'src/meta';
import { isIconName, SvgIcon } from 'src/utils/icons';

export type ComponentRenderProps = {
    overrideState?: Record<string, any>;
    variant?: ComponentExampleRenderProps<any>['variant'];
};

export function ComponentRender({ overrideState, variant }: ComponentRenderProps): React.ReactNode {
    const { component, propState, preset } = useComponentContext();
    const id = useId();

    const Component = components[component.name as keyof typeof components];

    if (!Component) {
        console.warn(`Component "${component.name}" not found in components meta.`);
        return;
    }

    const renderProps = {
        ...component.functionProps,
        ...propState,
        ...overrideState,
        ...getPropsFromState(component.props, propState),
    };

    // change any id props to a random string
    Object.keys(renderProps).forEach((key) => {
        if (key === 'id' || key.endsWith('Id')) renderProps[key] = `example-${randomString()}`;
    });

    return typeof component.render === 'function' ? (
        component.render({
            Component,
            props: renderProps,
            preset,
            setState: updateComponentContext,
            id,
            variant,
        })
    ) : (
        <Component key={preset?.label || ''} {...renderProps} />
    );
}

/**
 * Certins props we don't want top put into state (like ReactNodes)
 *
 * This Just-in-time converts strings and other types to their correct types (like ReactNodes).
 */
function getPropsFromState(props: TypePropertyDemo[], propState: Record<string, any>): Record<string, any> {
    const stateProps: Record<string, any> = {};

    const iconProps = props.filter((prop) => prop.type === 'BspkIcon');

    iconProps.forEach((prop) => {
        const propValue = propState[prop.name];

        stateProps[prop.name] = isIconName(propValue) ? <SvgIcon name={propValue} /> : undefined;
    });

    return stateProps;
}
