/* eslint-disable react/no-multi-comp */
export function Block({
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
