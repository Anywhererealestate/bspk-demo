export function kebabCase(str: string) {
    return str.replace(/(?<!^)([A-Z][a-z])/g, (...args) => `-${args[0]}`).toLowerCase();
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
