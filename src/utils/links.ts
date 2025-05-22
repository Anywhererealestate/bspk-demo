import { componentsMeta, utilitiesMeta, typesMeta } from 'src/meta';
import { kebabCase } from 'src/utils/kebabCase';

export const LINKS: Record<string, string> = {
    ...Object.fromEntries(componentsMeta.map((m) => [m.name, `/${kebabCase(m.name)}`])),
    ...Object.fromEntries(
        utilitiesMeta.filter((u) => u.name.startsWith('use')).map((m) => [m.name, `/hooks/#${kebabCase(m.name)}`]),
    ),
    'aria-label': 'https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-label',
    'aria-errormessage': 'https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-errormessage',
    ref: 'https://react.dev/learn/referencing-values-with-refs#refs-and-the-dom',
    'input control name': 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#name',
    ...Object.fromEntries(typesMeta.map((m) => [m.name, `#${kebabCase(m.name)}`])),
    'React.ReactNode': 'https://reactnative.dev/docs/react-node',
};

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
