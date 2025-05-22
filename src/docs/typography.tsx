import { CodeExample } from 'src/components/CodeExample';
import { Page } from 'src/components/Page';

export function Typography() {
    const sections: { title: string; content: string }[] = [
        {
            title: 'Headings',
            content: `
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
            content: `
<p>
  This is a sample paragraph. It contains some text to demonstrate the paragraph styling.
  You can use paragraphs to separate blocks of text and make your content more readable.
</p>
      `,
        },
        {
            title: 'Unordered List',
            content: `
<ul>
  <li>List item 1</li>
  <li>List item 2</li>
  <li>List item 3</li>
</ul>
      `,
        },
        {
            title: 'Ordered List',
            content: `
<ol>
  <li>List item 1</li>
  <li>List item 2</li>
  <li>List item 3</li>
</ol>
      `,
        },
        {
            title: 'Blockquote',
            content: `
<blockquote>
  This is a blockquote. It is used to highlight a section of text, often a quote from another source.
  <cite>Someone famous in Source Title</cite>
</blockquote>
      `,
        },
        {
            title: 'Horizontal Rule',
            content: `
<hr />
      `,
        },
        {
            title: 'Links',
            content: `
<a href="#">This is a link</a>
      `,
        },
        {
            title: 'Tables',
            content: `
<table>
  <thead>
    <tr>
      <th>Header 1</th>
      <th>Header 2</th>
      <th>Header 3</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Row 1, Cell 1</td>
      <td>Row 1, Cell 2</td>
      <td>Row 1, Cell 3</td>
    </tr>
    <tr>
      <td>Row 2, Cell 1</td>
      <td>Row 2, Cell 2</td>
      <td>Row 2, Cell 3</td>
    </tr>
    <tr>
      <td>Row 3, Cell 1</td>
      <td>Row 3, Cell 2</td>
      <td>Row 3, Cell 3</td>
    </tr>
  </tbody>
</table>
      `,
        },
        {
            title: 'Keyboard',
            content: `
To save the file, press <kbd>Cmd</kbd> + <kbd>S</kbd> on your keyboard.
      `,
        },
        {
            title: 'Abbreviation',
            content: `
The <abbr title="World Health Organization">WHO</abbr> was founded in 1948.
      `,
        },
        {
            title: 'Mark',
            content: `
You can use the <mark>mark</mark> element to <mark>highlight</mark> text.
      `,
        },
        {
            title: 'Subscript',
            content: `
H<sub>2</sub>O
      `,
        },
        {
            title: 'Superscript',
            content: `
10<sup>10</sup>
      `,
        },
        {
            title: 'Deleted Text',
            content: `
<del>This text has been deleted</del>
      `,
        },
        {
            title: 'Inserted Text',
            content: `
<ins>This text has been inserted</ins>
      `,
        },
        {
            title: 'Small Text',
            content: `
<small>This is smaller text</small>
      `,
        },
        {
            title: 'Strong Text',
            content: `
<strong>This is strong text</strong>
      `,
        },
        {
            title: 'Emphasized Text',
            content: `
<em>This is emphasized text</em>
      `,
        },
        {
            title: 'Italic Text',
            content: `
<i>This is italic text</i>
      `,
        },
        {
            title: 'Bold Text',
            content: `
<b>This is bold text</b>
      `,
        },
        {
            title: 'Underlined Text',
            content: `
<u>This is underlined text</u>
      `,
        },
        {
            title: 'Strikethrough Text',
            content: `
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
            {sections.map((section, index) => (
                <section key={index} style={{ margin: '2rem 0' }}>
                    <h3>{section.title}</h3>

                    <CodeExample code={section.content} language="html">
                        <div dangerouslySetInnerHTML={{ __html: section.content }} />
                    </CodeExample>
                </section>
            ))}
        </Page>
    );
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
