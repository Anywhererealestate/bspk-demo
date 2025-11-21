export function generateComponentCode(componentName: string, propState: Record<string, any>): string {
    const propsString = Object.entries(propState)
        .map(([key, value]) => {
            let formattedValue;
            if (typeof value === 'string') {
                formattedValue = `"${value}"`;
            } else if (typeof value === 'boolean' || typeof value === 'number') {
                formattedValue = `{${value}}`;
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
