export function Flex({
    children,
    gap = 'var(--spacing-sizing-02)',
    direction = 'row',
    wrap = true,
    ...rest
}: React.HTMLAttributes<HTMLDivElement> & {
    children: React.ReactNode;
    gap?: string;
    direction?: 'column' | 'row';
    wrap?: boolean;
}) {
    return (
        <div
            style={{
                display: 'flex',
                gap: gap || 'var(--spacing-sizing-02)',
                flexWrap: wrap ? 'wrap' : 'nowrap',
                flexDirection: direction,
            }}
            {...rest}
        >
            {children}
        </div>
    );
}
