import { SvgLink } from '@bspk/icons/Link';
import { ListItem } from '@bspk/ui/ListItem';
import { Txt } from '@bspk/ui/Txt';
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
            document
                .querySelector('main[data-main]')
                ?.querySelectorAll<HTMLElement>(
                    [1, 2, 3, 4, 5, 6].map((n) => `h${n}[id]:not([data-nav-target="false"])`).join(','),
                ) || [],
        );

        if (!targets.length || mountedRef.current) return;

        mountedRef.current = true;

        setMenuItems(
            targets.map((item) => ({
                title: item.dataset.navTargetLabel || item.textContent || item.id,
                hash: `#${item.id}`,
            })),
        );

        // add the link and link icon
        targets.forEach((item) => {
            const label = item.textContent;
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
            <div data-nav-contents>
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

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
