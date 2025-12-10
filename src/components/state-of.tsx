/* eslint-disable @cspell/spellchecker */
import { SvgContactSupport } from '@bspk/icons/ContactSupport';
import { SvgDescription } from '@bspk/icons/Description';
import { SvgEvent } from '@bspk/icons/Event';
import { Flex } from '@bspk/ui/Flex/Flex';
import { Tag } from '@bspk/ui/Tag';
import { Txt } from '@bspk/ui/Txt';
import { useEventListener } from '@bspk/ui/hooks/useEventListener';
import { handleKeyDown } from '@bspk/ui/utils/handleKeyDown';
import { useLayoutEffect, useRef, useState } from 'react';
import 'src/components/state-of.scss';
import { GitHubIcon } from 'src/utils/githubIcon';

export function StateOf() {
    const [slideIndex, setSlideIndex] = useState(0);

    const slides = useRef<NodeListOf<Element> | null>(null);

    useLayoutEffect(() => {
        slides.current = document.querySelectorAll('[data-slide]');
    }, []);

    useLayoutEffect(() => {
        slides.current?.[slideIndex]?.scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'center' });
    }, [slideIndex]);

    const next = () => setSlideIndex((i) => Math.min((slides.current?.length || 1) - 1, i + 1));

    const prev = () => setSlideIndex((i) => Math.max(0, i - 1));

    useEventListener('keydown', (e) =>
        handleKeyDown(
            {
                ArrowRight: () => next(),
                ArrowLeft: () => prev(),
                ArrowUp: () => prev(),
                ArrowDown: () => next(),
            },
            {
                preventDefault: true,
            },
        )(e as any),
    );

    return (
        <div data-state-of-bspk>
            <Slide data-center style={{ padding: 24 }}>
                <h2 style={{ fontSize: '200%' }}>Bespoke Design System Development Updates</h2>
                <h3 style={{ fontSize: '150%' }}>December 2025</h3>
            </Slide>

            <Slide>
                <h2>What is BSPK?</h2>

                <p>
                    The Bespoke Design System is a comprehensive, central toolkit of reusable components, standards, and
                    guidelines for use on internal web applications across Anywhere Real Estate.
                </p>

                <p>
                    The team consists of designers, developers, and product managers dedicated to creating a unified
                    design language and implementation.
                </p>

                <p>The development team is comprised of three members. </p>

                <ul>
                    <li>Brian Reed</li>
                    <li>Emile Fleming</li>
                    <li>Jessica McIntosh</li>
                </ul>
            </Slide>

            <Slide>
                <h2>Our Libraries</h2>

                <p>
                    Our design system development assets are the first open-source project within the Anywhere Real
                    Estate ecosystem. These assets include the following libraries:
                </p>
                <p>
                    <strong>@bspk/ui</strong> - <Tag color="green" label="Released" /> The core React component library
                    used across web applications.
                </p>
                <ul>
                    <li>
                        70+ <strong>stable*</strong> components
                    </li>
                </ul>
                <p>
                    <strong>@bspk/styles</strong> - <Tag color="green" label="Released" /> Stylesheets and other assets
                    built for each Brand generated directly from the Figma Design tokens.
                </p>
                <ul>
                    <li>9 Brand themes</li>
                </ul>
                <p>
                    <strong>@bspk/icons</strong> - <Tag color="green" label="Released" /> A curated library of SVG
                    icons, provided as ready-to-use React components and standalone SVGs for use across applications.
                </p>
                <ul>
                    <li>65 custom icons built by the BSPK Design team</li>
                    <li>1000+ icons from the Material Design icon library</li>
                    <li>232 country icons and flags</li>
                </ul>
                <p>
                    <strong>@bspk/ui-ngx</strong> - <Tag color="orange" label="Prerelease" /> The core Angular component
                    library used across web applications; includes all icons provided as Angular components.
                </p>
            </Slide>
            <Slide>
                <h2>Q4 2025 Updates</h2>
                <ul>
                    <li>
                        Phase 1 complete for @bspk/ui with 70+ <strong>stable*</strong> components
                    </li>
                    <li>Started Angular component development and demo site with 17+ components in @bspk/ui-ngx</li>

                    <li>Documentation site improvements</li>
                    <li>
                        Improved component accessibility
                        <ul>
                            <li>ARIA live region support for Pagination component</li>
                            <li>Better keyboard navigation for Dropdowns, DatePicker, and TimePicker components</li>
                            <li>Improved screen reader support across all components</li>
                        </ul>
                    </li>
                    <li>Improved component testing coverage</li>
                </ul>
            </Slide>
            <Slide>
                <h2>Contribute and Collaborate</h2>

                <Flex direction="column" gap="24">
                    <Flex align="center" as="p" gap="12" justify="center">
                        <GitHubIcon height={80} width={80} />
                        <a data-subtle="true" href="https://github.com/Anywhererealestate">
                            Repositories
                            <br />
                            github.com/Anywhererealestate
                        </a>
                    </Flex>

                    <Flex align="center" as="p" gap="12" justify="center">
                        <SvgDescription width={80} />
                        <a data-subtle="true" href="https://bspk.anywhere.com">
                            Documentation
                            <br />
                            bspk.anywhere.com
                        </a>
                    </Flex>

                    <Flex align="center" as="p" gap="12" justify="center">
                        <SvgEvent width={80} />
                        <a
                            data-bspk="link"
                            data-subtle="true"
                            href="https://teams.microsoft.com/l/chat/19:meeting_NTBhMTRjYzgtNGExZC00Y2I2LThlZTctM2MyYjNiODQ5NGQ2@thread.v2/conversations?context=%7B%22contextType%22%3A%22chat%22%7D"
                        >
                            Office Hours / Chat
                            <br />
                            teams.microsoft.com - Wednesdays at 1:30 PM ET
                        </a>
                    </Flex>

                    <Flex align="center" as="p" gap="12" justify="center">
                        <SvgContactSupport width={80} />
                        <a
                            data-subtle="true"
                            href="https://anywherere.atlassian.net/jira/software/c/projects/BSPK/form/2341"
                        >
                            Submit a Bug or Request
                            <br />
                            anywherere.atlassian.net/jira/software/c/projects/BSPK/form/2341
                        </a>
                    </Flex>
                </Flex>
            </Slide>
            <Slide>
                <Txt as="h2" variant="display-semibold-large">
                    Thank You!
                </Txt>
                <Txt variant="subheader-xxx-large">Questions?</Txt>
            </Slide>
        </div>
    );
}

// eslint-disable-next-line react/no-multi-comp
function Slide({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div data-slide {...props}>
            {children}
        </div>
    );
}
