import { marked } from 'marked';
import { LINKS } from 'src/utils/links';

/**
 * Adds links to a string returning ReactNode. Markdown and HTML is supported.
 *
 * @param {string} md - The markdown string to convert to HTML.
 * @returns String
 */
export function mdToHtml(md: string): Promise<string> {
    const sourceWithLinks = Object.entries(LINKS).reduce((acc, [word, link]) => {
        return acc.replace(new RegExp(`\\b${word}\\b`, 'g'), `[${word}](${link})`);
    }, md);

    marked.use({
        async: false,
        renderer: {
            link({ href, text }) {
                return `<a ${href.includes('http') ? 'target="_blank"' : ''} href="${href}">${text}</a>`;
            },
        },
    });

    return marked(sourceWithLinks) as Promise<string>;
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
