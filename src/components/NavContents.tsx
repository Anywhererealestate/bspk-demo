import { SvgLink } from '@bspk/icons/Link';
import { ListItem } from '@bspk/ui/ListItem';
import { Txt } from '@bspk/ui/Txt';
import { css, Global } from '@emotion/react';
import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Displays the nav targets in the screen.
 *
 * To make an element a nav target, add the attribute data-nav-target to it and ensure the unique element id is set.
 *
 * The nav target must only contain a string.
 *
 * To make the nav target a link but not add it to the nav contents, add the attribute data-nav-target="false" to it.
 *
 * @name NavContents
 */
export function NavContents() {
    const mountedRef = useRef(false);
    const templateRef = useRef<HTMLTemplateElement | null>(null);
    const location = useLocation();

    const [menuItems, setMenuItems] = useState<{ title: string; hash: string }[]>([]);

    useEffect(() => {
        const targets = Array.from(
            document.querySelector('main[data-main]')?.querySelectorAll<HTMLElement>('[data-nav-target]') || [],
        );

        if (!targets.length || mountedRef.current) return;

        mountedRef.current = true;

        setMenuItems(
            targets.flatMap((item) =>
                item.dataset.navTarget === 'false'
                    ? []
                    : {
                          title: item.dataset.navTargetLabel || item.textContent || item.id,
                          hash: `#${item.id}`,
                      },
            ),
        );

        // add the link and link icon
        targets.forEach((item) => {
            const label = item.textContent;
            item.removeAttribute('data-nav-target');
            const link = document.createElement('a');
            link.setAttribute('data-nav-target', '');
            link.textContent = label;
            link.href = `#${item.id}`;
            if (templateRef.current?.firstChild)
                link.appendChild(templateRef.current?.firstChild.cloneNode(true) as Node);
            item.replaceChildren(link);
        });
    }, []);

    return (
        <>
            <Global
                styles={css`
                    [data-nav-target] {
                        display: block;
                        position: relative;
                        font: inherit !important;
                        font-style: inherit !important;
                        color: inherit !important;
                        text-decoration: inherit !important;
                        width: fit-content;

                        [data-link] {
                            display: none;
                            svg {
                                width: var(--spacing-sizing-05);
                            }
                        }

                        &:hover {
                            [data-link] {
                                display: block;
                                position: absolute;
                                right: calc(var(--spacing-sizing-08) * -1);
                                top: 0;
                                opacity: 0.5;
                            }
                        }
                    }
                `}
            />
            <div css={style} data-nav-contents>
                <Txt as="div" variant="heading-h4">
                    Content
                </Txt>
                <nav>
                    {menuItems.flatMap(
                        (link) =>
                            !!link && (
                                <ListItem
                                    as="a"
                                    data-selected={location.hash === link.hash || undefined}
                                    href={link.hash}
                                    key={link.hash}
                                    label={link.title}
                                />
                            ),
                    )}
                </nav>
            </div>
            <template ref={templateRef}>
                <span data-link>
                    <SvgLink />
                </span>
            </template>
        </>
    );
}

export const style = css`
    position: fixed;
    top: var(--spacing-sizing-20);
    right: var(--spacing-sizing-06);
    margin: 0;
    padding: 0;
    width: var(--nav-contents-width);

    [data-txt] {
        margin: 0;
    }

    nav {
        display: flex;
        flex-direction: column;

        [data-list-item] {
            border-left: 3px solid transparent;

            &[data-selected] {
                border-left-color: var(--interactions-neutral-press-opacity);
            }
        }
    }
`;

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
