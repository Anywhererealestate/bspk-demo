import { Dialog, DialogProps } from '@bspk/ui/Dialog';
import { Tag } from '@bspk/ui/Tag';
import { TextInput } from '@bspk/ui/TextInput';
import { Txt } from '@bspk/ui/Txt';
import { useTimeout } from '@bspk/ui/hooks/useTimeout';
import { Fragment, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import searchIndex from 'src/meta/search-index.json';

import 'src/components/searchModal.scss';

export type Result = {
    title: string;
    url: string;
    content: (string | { match: string })[];
    kind: string;
};

const EXCERPT_LENGTH = 150;

const trimContent = (content: string, matchIndex: number, excerptLength: number = EXCERPT_LENGTH): string => {
    const sliceStart = Math.max(matchIndex - excerptLength / 2, 0);
    const sliceEnd = Math.min(sliceStart + excerptLength, content.length);

    let chunk = content.slice(sliceStart, sliceEnd);

    // Ensure words under 15 characters are not cut off at the start
    if (sliceStart > 0) {
        const startMatch = chunk.match(/^[^\s]{1,15}\s/);
        if (startMatch) {
            chunk = chunk.slice(startMatch[0].length);
        }
    }

    // Ensure words under 15 characters are not cut off at the end
    if (sliceEnd < content.length) {
        const endMatch = chunk.match(/\s[^\s]{1,15}$/);
        if (endMatch) {
            chunk = chunk.slice(0, -endMatch[0].length);
        }
    }

    return (matchIndex ? '...' : '') + chunk.trim() + (sliceEnd < content.length ? '...' : '');
};

export function SearchModal(props: DialogProps) {
    //
    const [search, setSearch] = useState('');

    // 1. no search term - null
    // 2. search term entered - 'searching'
    // 3. search term entered, debounce timeout complete, results found - Result[]
    const [results, setResults] = useState<Result[] | 'searching' | null>(null);

    const resultsRef = useRef<HTMLDivElement | null>(null);
    const timeout = useTimeout();
    const navigate = useNavigate();

    const updateSearch = (next: string) => {
        setSearch(next);

        timeout.clear();

        if (!search.length) {
            setResults(null);
            return;
        }

        setResults('searching');

        timeout.set(() => {
            const searchString = search.toLowerCase().trim();

            const nextResultIndexes = searchIndex
                .flatMap((page) => {
                    const titleMatch = page.title.toLowerCase().includes(searchString);

                    const match = page.content.match(new RegExp(searchString, 'i')) || { index: 0, 0: '' };

                    const trimmedContent = trimContent(page.content, match.index || 0);

                    let content: Result['content'] = [trimmedContent];

                    if (match[0]) {
                        content = trimmedContent.split(match[0]);
                        content.splice(1, 0, {
                            match: match[0],
                        });
                    }

                    return match[0] || titleMatch
                        ? {
                              ...page,
                              content,
                              score: titleMatch ? 1 : 0.5,
                          }
                        : [];
                })
                .sort((a, b) => b.score - a.score);

            setResults(nextResultIndexes);

            resultsRef?.current?.scrollTo({
                top: 0,
                behavior: 'smooth',
            });
        }, 500);
    };

    return (
        <Dialog data-search-modal {...props} placement="top">
            <TextInput
                aria-label="Search"
                name="search"
                onChange={updateSearch}
                trailing={
                    <Txt style={{ color: 'var(--colors-neutral-48)' }} variant="labels-x-small">
                        ESC
                    </Txt>
                }
                value={search}
            />
            <div data-search-results ref={resultsRef}>
                {results === 'searching' && <p>Searching...</p>}
                {Array.isArray(results) && results?.length === 0 && <p>No results found.</p>}
                {Array.isArray(results) &&
                    results?.map((result) => {
                        return (
                            <div
                                data-search-result
                                key={result.url}
                                onClickCapture={() => {
                                    navigate(result.url);
                                    props.onClose();
                                }}
                            >
                                <header
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        marginBottom: 'var(--spacing-sizing-02)',
                                    }}
                                >
                                    <h5>{result.title}</h5>
                                    <Tag color="grey" label={result.kind} size="x-small" />
                                </header>

                                <div>
                                    {result.content.map((fragment, index) => (
                                        <Fragment key={index}>
                                            {typeof fragment === 'string' ? (
                                                fragment
                                            ) : (
                                                <span style={{ fontWeight: '600' }}>{fragment.match}</span>
                                            )}
                                        </Fragment>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
            </div>
        </Dialog>
    );
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
