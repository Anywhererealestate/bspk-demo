/* eslint-disable react/no-multi-comp */

/**
 * These are placeholder components used to document building blocks for BSPK. They do not render any actual UI.
 *
 * They are used in the .scripts/tasks/generateBlocksMeta.ts file to extract metadata about the blocks for blocks page.
 */

export function Block({
    name,
    description,
    children,
    order,
}: {
    name: string;
    description?: string;
    children: React.ReactNode;
    order?: number;
}) {
    console.log({ name, description, children, order });
    return null;
}

export function BlockExample({
    name,
    description,
    children,
}: {
    name: string;
    description?: string;
    children: React.ReactNode;
}) {
    console.log({ name, description, children });
    return null;
}
