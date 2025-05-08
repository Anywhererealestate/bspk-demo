import { ElementProps } from '@bspk/ui';
import { ElementType, ReactNode } from 'react';
import { Link } from 'react-router-dom';

import { LINKS } from '../utils/links';

export type LinkUpProps<As extends ElementType = 'span'> = {
    as?: As;
    children?: string | undefined;
};
/**
 * Adds links to a string returning ReactNode. No markdown or HTML is supported.
 *
 * @param {LinkUpProps} props
 * @returns {ReactNode}
 */
export function LinkUp<As extends ElementType = 'span'>(props: ElementProps<LinkUpProps<As>, As>): ReactNode {
    const { as: As = 'span', children, ...otherProps } = props;

    if (!children) return children;

    const nodes = Object.keys(LINKS)
        .reduce((acc, word) => acc.replace(new RegExp(`\\b${word}\\b`, 'g'), `|||${word}|||`), children)
        .split('|||')
        .filter(Boolean)
        .map((segment, index) => {
            const link = LINKS[segment];

            if (!link) return segment;

            if (link.startsWith('#'))
                return (
                    <Link key={index} to={{ hash: link }}>
                        {segment}
                    </Link>
                );
            if (link.startsWith('/'))
                return (
                    <Link key={index} to={link}>
                        {segment}
                    </Link>
                );
            if (link.startsWith('http'))
                return (
                    <a href={link} key={index} rel="noreferrer" target="_blank">
                        {segment}
                    </a>
                );

            return segment;
        });

    return <As {...otherProps}>{nodes}</As>;
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
