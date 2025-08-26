/* eslint-disable react/no-multi-comp */
import { LinkDemo } from '@bspk/ui/Link/LinkExample';
import { CodeExample } from 'components/CodeExample';
import { Page } from 'components/Page';
import { ComponentType } from 'react';

export function Typography() {
    const sections: { title: string; code?: string; Content?: ComponentType }[] = [
        {
            title: 'Headings',
            code: `
<h1>Heading 1</h1>
<h2>Heading 2</h2>
<h3>Heading 3</h3>
<h4>Heading 4</h4>
<h5>Heading 5</h5>
<h6>Heading 6</h6>
      `,
        },
        {
            title: 'Paragraphs',
            code: `
<p>
  This is a sample paragraph. It contains some text to demonstrate the paragraph styling.
  You can use paragraphs to separate blocks of text and make your content more readable.
</p>
      `,
        },
        {
            title: 'Unordered List',
            code: `
<ul>
  <li>List item 1</li>
  <li>List item 2</li>
  <li>List item 3</li>
</ul>
      `,
        },
        {
            title: 'Ordered List',
            code: `
<ol>
  <li>List item 1</li>
  <li>List item 2</li>
  <li>List item 3</li>
</ol>
      `,
        },
        {
            title: 'Blockquote',
            code: `
<blockquote>
  This is a blockquote. It is used to highlight a section of text, often a quote from another source.
  <cite>Someone famous in Source Title</cite>
</blockquote>
      `,
        },
        {
            title: 'Horizontal Rule',
            code: `
<hr />
      `,
        },
        {
            title: 'Links',
            Content: () => {
                return (
                    <>
                        <p>This is your basic inline link. For sizing and other options use the Link Component.</p>
                        <LinkDemo />
                    </>
                );
            },
        },
        {
            title: 'Keyboard',
            code: `
To save the file, press <kbd>Cmd</kbd> + <kbd>S</kbd> on your keyboard.
      `,
        },
        {
            title: 'Abbreviation',
            code: `
The <abbr title="World Health Organization">WHO</abbr> was founded in 1948.
      `,
        },
        {
            title: 'Mark',
            code: `
You can use the <mark>mark</mark> element to <mark>highlight</mark> text.
      `,
        },
        {
            title: 'Subscript',
            code: `
H<sub>2</sub>O
      `,
        },
        {
            title: 'Superscript',
            code: `
10<sup>10</sup>
      `,
        },
        {
            title: 'Deleted Text',
            code: `
<del>This text has been deleted</del>
      `,
        },
        {
            title: 'Inserted Text',
            code: `
<ins>This text has been inserted</ins>
      `,
        },
        {
            title: 'Small Text',
            code: `
<small>This is smaller text</small>
      `,
        },
        {
            title: 'Strong Text',
            code: `
<strong>This is strong text</strong>
      `,
        },
        {
            title: 'Emphasized Text',
            code: `
<em>This is emphasized text</em>
      `,
        },
        {
            title: 'Italic Text',
            code: `
<i>This is italic text</i>
      `,
        },
        {
            title: 'Bold Text',
            code: `
<b>This is bold text</b>
      `,
        },
        {
            title: 'Underlined Text',
            code: `
<u>This is underlined text</u>
      `,
        },
        {
            title: 'Strikethrough Text',
            code: `
<s>This is strikethrough text</s>
      `,
        },
    ];

    return (
        <Page>
            <h1>Typography</h1>
            <p>
                Without using any additional CSS, you can use the following standard HTML elements and have the bespoke
                styles applied.
            </p>
            {sections.map(({ title, Content: Content, code: content }, index) => (
                <section key={index} style={{ margin: '2rem 0' }}>
                    <h3>{title}</h3>
                    {content ? (
                        <CodeExample
                            code={{
                                str: content,
                                language: 'html',
                            }}
                        >
                            <div dangerouslySetInnerHTML={{ __html: content }} />
                        </CodeExample>
                    ) : (
                        Content && <Content />
                    )}
                </section>
            ))}
        </Page>
    );
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
