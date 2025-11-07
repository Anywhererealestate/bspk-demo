import { Button } from '@bspk/ui/Button/Button';
import { useId } from '@bspk/ui/hooks/useId';
import { ComponentExampleRenderProps, TypePropertyDemo } from '@bspk/ui/utils/demo';
import { randomString } from '@bspk/ui/utils/random';
import { resetComponentContext, updateComponentContext, useComponentContext } from 'src/components/ComponentProvider';
import { ErrorBoundary } from 'src/components/ErrorBoundary';
import { components, typesMeta } from 'src/meta';
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

    const mergedState = convertIconProps(component.props, { ...propState, ...overrideState });

    const renderProps = {
        ...component.functionProps,
        ...mergedState,
    };

    // change any id props to a random string
    Object.keys(renderProps).forEach((key) => {
        if (key === 'id' || key.endsWith('Id')) renderProps[key] = `example-${randomString()}`;
    });

    return (
        <ErrorBoundary
            fallback={
                <>
                    <p>Failed to render component.</p>
                    <Button label="Reset" onClick={() => resetComponentContext()} size="small" variant="secondary" />
                </>
            }
        >
            {typeof component.render === 'function' ? (
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
            )}
        </ErrorBoundary>
    );
}

/**
 * We don't want to put ReactNodes in the demo state, so we use icon names instead.
 *
 * This function converts those icon names to actual icon components.
 *
 * It also handles arrays of objects with icon props.
 */
function convertIconProps(props: TypePropertyDemo[], propState: Record<string, any>): Record<string, any> {
    return Object.fromEntries(
        Object.entries(propState)
            .map(([key, value]) => {
                const propertyMeta = props.find((prop) => prop.name === key);

                // no property meta, return the value as is
                if (!propertyMeta) return [key, value];

                // handle BspkIcon type
                if (propertyMeta.type === 'BspkIcon') {
                    if (isIconName(value)) {
                        return [
                            [`${key}:icon-name`, value],
                            [key, <SvgIcon key={value} name={value} />],
                        ];
                    }
                    return [key, undefined];
                }

                // handle array of objects with potential icon props
                if (propertyMeta?.arrayType && Array.isArray(value)) {
                    const properties = typesMeta.find((t) => t.name === propertyMeta.arrayType)?.properties;

                    // if no properties or no icon type props, return value as is
                    if (!properties || properties.every((p) => p.type !== 'BspkIcon')) return [key, value];

                    // convert icon props in each object of the array
                    return [key, value.map((v: any) => convertIconProps(properties, v))];
                }

                return [key, value];
            })
            .flatMap((returnValue) => (Array.isArray(returnValue[0]) ? returnValue : [returnValue])),
    );
}
