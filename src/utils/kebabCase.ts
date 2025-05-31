export function kebabCase(str: string): string {
    return (
        str
            .normalize('NFD') // Normalize to decompose accents
            .replace(/[\u0300-\u036f&()']/g, '') // Remove accents
            // Handle camelCase by inserting hyphens between lowercase and uppercase
            .replace(/([a-zA-Z])([A-Z][a-z])/g, '$1-$2')
            // do it again for the next uppercase letter
            .replace(/([a-zA-Z])([A-Z][a-z])/g, '$1-$2')
            .replace(/[^a-zA-Z0-9]+/g, '-') // Replace non-alphanumeric characters with hyphens
            .replace(/^-+|-+$/g, '') // Trim leading or trailing hyphens
            .replace(/--+/g, '-') // Replace multiple hyphens with a single hyphen
            .toLowerCase()
    ); // Convert to lowercase
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
