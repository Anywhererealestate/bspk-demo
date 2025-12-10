import { DemoComponent } from 'src/types';

export function generateComponentCode<Props extends Record<string, unknown>>(
    component: DemoComponent<Props>,
    propState: Record<string, any>,
): string {
    // TODO: add state management

    return componentToString(component.name, propState, component.props);
}

function componentToString<Props extends Record<string, unknown>>(
    componentName: string,
    propState: Record<string, any>,
    propsMeta?: DemoComponent<Props>['props'],
): string {
    const propsString = Object.entries(propState)
        .map(([key, value]) => {
            const propMeta = propsMeta?.find((prop) => prop.name === key);

            let formattedValue;
            if (typeof value === 'string') {
                formattedValue = `"${value}"`;
                if (propMeta?.type === 'BspkIcon') formattedValue = `{<Svg${value} />}`;
            } else if (typeof value === 'boolean' || typeof value === 'number') {
                formattedValue = `{${value}}`;
            } else if (isReactElement(value)) {
                const subComponentName = typeof value.type === 'string' ? value.type : value.type.name || 'Component';
                formattedValue = `{${componentToString(subComponentName, value.props)}}`;
            } else if (Array.isArray(value) || typeof value === 'object') {
                formattedValue = `{${JSON.stringify(value, null, 2)}}`;
            } else if (value === null) {
                formattedValue = '{null}';
            } else if (value === undefined) {
                return ''; // skip undefined props
            } else {
                formattedValue = `{${value.toString()}}`;
            }
            return `    ${key}=${formattedValue}`;
        })
        .filter(Boolean)
        .join('\n');

    return `<${componentName}\n${propsString}\n/>`;
}

function isReactElement(value: any): boolean {
    return (
        typeof value === 'object' &&
        value !== null &&
        (value.$$typeof === Symbol.for('react.element') ||
            (value.type && (typeof value.type === 'string' || typeof value.type === 'function')))
    );
}
