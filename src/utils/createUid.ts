export function createUid(prefix: string = 'uid'): string {
    return `${prefix}-${Math.random().toString(36).substring(2, 9)}`;
}
