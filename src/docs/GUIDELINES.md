# Developer Guidelines

## Typescript

### Basics

- Prefer `type` over `interface` for defining object shapes. `type` is more flexible: it can represent primitives, unions, intersections, tuples, and more, while `interface` is limited to describing object structures.

```typescript
export type ComponentProps = CommonProps<'name' | 'onChange' | 'value'> & {
    size: 'small' | 'medium' | 'large';
};
```

- Use `unknown` instead of `any` when the type is not known.
- Use `Object.freeze` to mark properties that should not be reassigned.
- Use `as const` over `enum` for related constants.
- Use `handleClick` over `onClick` for event handlers. See: https://react.dev/learn/responding-to-events#adding-event-handlers
- Use `-/hooks/useId` for generating unique IDs instead of React's built-in `useId` - The library's implementation allows for a default.

## Components

- Every Component gets a JSDoc.
- Use `function Component() {}` over `const Component = () => {}`. This is honestly just a preference, looks cleaner.

## Styles

### Z-Indexes

- **Tooltip / Popover**: `1100`
- **Dialog**: `1000`
- **Dropdown**: `900`
- **Fab**: `800`
- **Navbar**: `700`
- **Footer**: `600`

<!--- Copyright 2025 Anywhere Real Estate - CC BY 4.0 -->
