export function Flex({
    children,
    gap = 'var(--spacing-sizing-02)',
    direction = 'row',
    wrap = true,
    justify = 'flex-start',
    align = 'stretch',
    ...rest
}: React.HTMLAttributes<HTMLDivElement> & {
    children: React.ReactNode;
    gap?: string;
    direction?: 'column' | 'row';
    wrap?: boolean;
    justify?: string;
    align?: string;
}) {
    return (
        <div
            data-demo-flex
            {...rest}
            style={{
                ...rest.style,
                display: 'flex',
                gap: gap || 'var(--spacing-sizing-02)',
                flexWrap: wrap ? 'wrap' : 'nowrap',
                flexDirection: direction || 'row',
                justifyContent: justify || 'flex-start',
                alignItems: align || 'stretch',
            }}
        >
            {children}
        </div>
    );
}
