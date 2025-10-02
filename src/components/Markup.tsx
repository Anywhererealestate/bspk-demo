import { marked } from 'marked';
import { ComponentProps, ElementType, ReactNode } from 'react';
import { useMetaContext } from 'src/components/MetaProvider';
import { kebabCase } from 'src/utils/kebabCase';

export type WrapHtmlProps<As extends ElementType> = {
    as?: As;
    children?: string;
};

/**
 * Adds links to a string returning ReactNode. Markdown and HTML is supported.
 *
 * @param {WrapHtmlProps} props
 * @returns {ReactNode}
 */
export function Markup<As extends ElementType>({
    children,
    as: As = 'div',
    ...otherProps
}: ComponentProps<As> & WrapHtmlProps<As>): ReactNode {
    const { componentsMeta, utilitiesMeta, typesMeta } = useMetaContext();
    if (!children) return children;

    const links = {
        ...Object.fromEntries(componentsMeta.map((m) => [m.name, `/${kebabCase(m.name)}`])),
        ...Object.fromEntries(
            utilitiesMeta.filter((u) => u.name.startsWith('use')).map((m) => [m.name, `/hooks/#${kebabCase(m.name)}`]),
        ),
        'aria-label': 'https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-label',
        'aria-errormessage':
            'https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-errormessage',
        ref: 'https://react.dev/learn/referencing-values-with-refs#refs-and-the-dom',
        'input control name': 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#name',
        ...Object.fromEntries(typesMeta.map((m) => [m.name, `#${kebabCase(m.name)}`])),
        'React.ReactNode': 'https://reactnative.dev/docs/react-node',
    };

    const sourceWithLinks = Object.entries(links).reduce((acc, [word, link]) => {
        return acc.replace(new RegExp(`\\b${word}\\b`, 'g'), `[${word}](${link})`);
    }, children);

    marked.use({
        async: false,
        renderer: {
            link({ href, text }) {
                return `<a ${href.includes('http') ? 'target="_blank"' : ''} href="${href}">${text}</a>`;
            },
        },
    });

    return <As dangerouslySetInnerHTML={{ __html: marked(sourceWithLinks) as string }} {...otherProps} />;
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
