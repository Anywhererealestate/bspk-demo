import { Page } from 'components/Page';
import { Syntax } from 'components/Syntax';

export function Stylesheets() {
    return (
        <Page>
            <h1 id="stylesheets">Style</h1>
            <p>
                The stylesheets are built with CSS variables, so you can easily switch between light and dark themes.
                The default theme is light and does not require a data-theme attribute.
            </p>
            <p>
                To enable the dark theme add the <code>data-theme=&quot;dark&quot;</code> attribute to your html or body
                tag. Light theme is enabled by default.
            </p>
            <div>
                <Syntax code='<body data-theme="dark">' language="html" />
            </div>

            <h2>Stylesheets</h2>
            <p>
                If you are not using <strong>@bspk/ui</strong> React components you can use the stylesheets directly
                from the
                <code>@bspk/styles</code> package.
            </p>
            <p>
                Each stylesheet consists of a set of root CSS variables, and unique CSS variables for light themes
                (default) and dark theme. Each CSS variables mirror the tokens from Figma. You can search the stylesheet
                for the exact Figma token name, collection name, or description as it&apos;s included as a comment.
            </p>
            <p>
                For projects not using the <code>@bspk/ui</code> package, you can include the stylesheets in your
                project directly from the <code>@bspk/styles</code> package.
            </p>
            <Syntax
                code={`import '@bspk/ui/styles/base.css';\nimport '@bspk/styles/anywhere.css';`}
                language="typescript"
            />

            <h4 id="vs-code-plugins-for-css-variables">CSS Variables Plugin</h4>
            <p>
                For Bspk UI development we use{' '}
                <a href="https://marketplace.visualstudio.com/items?itemName=vunguyentuan.vscode-css-variables">
                    CSS Variable Autocomplete
                </a>{' '}
                extension to help with CSS variable autocompletion.
            </p>
            <p>
                It&apos;s super helpful when you&apos;re working with CSS variables and need to include the exact name
                of the variable.
            </p>

            <h2>Providers</h2>
            <p>
                If you are using <strong>@bspk/ui</strong> React components you only need to bring in your brand&apos;s
                style provider. The provider will automatically add the correct stylesheets to your project.
            </p>
            <p>Each brand has their own style provider available.</p>
            <Syntax
                code="import {StylesProviderAnywhere} from '@bspk/ui/StylesProviderAnywhere';
      
      
createRoot(document.getElementById('root')!).render(
  <StrictMode>
  <StylesProviderAnywhere />
    <RouterProvider router={router} />
  </StrictMode>,
);

      "
                language="typescript"
            />

            <h2>MUI Theme</h2>
            <p>
                While we don&apos;t use MUI in our components, we understand that until the component library is
                officially released some projects use MUI for their components. We are currently working on a MUI theme
                that will be available in the future.
            </p>
            <p>
                Until those brand specific themes are available, you can use the{' '}
                <code>@bspk/styles/data/anywhere.ts</code> files to get the base variables in a javascript object. This
                is a temporary solution until the MUI theme is available helping to remove the magic strings in your
                code.
            </p>
        </Page>
    );
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
