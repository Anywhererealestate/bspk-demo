export function pascalCaseToTitleCase(str?: string) {
    if (!str) return '';
    return str
        .replace(/([a-z])([A-Z])/g, '$1 $2') // Add space between camelCase words
        .replace(/([A-Z])([A-Z][a-z])/g, '$1 $2') // Add space between sequential uppercase letters followed by lowercase
        .replace(/^./, (char) => char.toUpperCase()); // Capitalize the first letter
}

export function toKebabCase(name: string) {
    return name
        .replace(/([a-z0-9])([A-Z])/g, '$1-$2') // aB -> a-B, 0B -> 0-B
        .replace(/([A-Z]+)([A-Z][a-z0-9]+)/g, '$1-$2') // ABc -> A-Bc, AZAscend -> A-Z-Ascend
        .replace(/([A-Z])(\d)/g, '$1-$2') // A2 -> A-2
        .replace(/([0-9])([A-Z])/g, '$1-$2') // 2F -> 2-F
        .replace(/([a-z])([0-9])/g, '$1-$2') // y2 -> y-2
        .replace(/([A-Z])([A-Z])/g, '$1-$2') // AZ -> A-Z
        .replace(/^-/, '') // Remove leading dash if present
        .toLowerCase();
}
