/* eslint-disable react/no-multi-comp */
import { ComponentPage } from 'components/ComponentPage';
import { Markdown } from 'components/Markdown.tsx';
import { Page } from 'components/Page';
import { Page404 } from 'components/Page404.tsx';
import { Welcome } from 'src/components/Welcome';
import Changelog from 'src/docs/CHANGELOG.md?raw';
import Contributing from 'src/docs/CONTRIBUTING.md?raw';
import { Components } from 'src/docs/components';
import { Demo } from 'src/docs/demo';
import { Hooks } from 'src/docs/hooks';
import { Icons } from 'src/docs/icons';
import Intro from 'src/docs/intro.md?raw';
import { Stylesheets } from 'src/docs/styles';
import { Typography } from 'src/docs/typography.tsx';
import { componentsMeta, MetaComponentName, MODE, typesMeta } from 'src/meta';
import { RouteLink } from 'src/types';

export const routes: RouteLink[] = [
    {
        title: 'BSPK',
        path: '/',
        Component: Welcome,
        hide: true,
        hideSideNav: true,
    },
    {
        title: 'Sections',
        children: [
            {
                path: '/get-started',
                Component: () => (
                    <Page>
                        <Markdown md={Intro} />
                    </Page>
                ),
                title: 'Get Started',
            },
            { path: '/icons', Component: Icons, title: 'Icons', noIndex: true },
            { path: '/styles', Component: Stylesheets, title: 'Styles' },
            { path: '/components', Component: Components, title: 'Progress' },
            { path: '/typography', Component: Typography, title: 'Typography' },
            {
                path: '/changelog',
                Component: () => (
                    <Page>
                        <Markdown md={Changelog} />
                    </Page>
                ),
                title: 'Changelog',
                hide: true,
            },
            {
                path: '/contributing',
                Component: () => (
                    <Page>
                        <Markdown md={Contributing} />
                    </Page>
                ),
                title: 'Contributing',
            },
            { path: '/demo', Component: Demo, title: 'Demo', hide: true },
        ],
    },
    {
        title: 'Components',
        children: [
            ...componentsMeta.flatMap((component): RouteLink[] => {
                if (['Utility', 'Backlog'].includes(component.phase)) return [];

                return [
                    {
                        path: `/${component.slug}`,
                        id: component.slug,
                        title: pascalCaseToTitleCase(component.name),
                        Component: () => <ComponentPage componentName={component.name as MetaComponentName} />,
                    },
                ];
            }),
        ],
    },
    {
        path: '*',
        title: 'Not Found',
        hide: true,
        Component: Page404,
        noIndex: true,
    },
];

if (MODE === 'development') {
    routes.push({
        title: 'Utilities',
        children: [
            ...componentsMeta.flatMap((component): RouteLink[] => {
                if (component.phase !== 'Utility') return [];

                const componentProps = typesMeta.find((t) => t.name === `${component.name}Props`);
                if (!componentProps?.properties?.length) return [];

                return [
                    {
                        path: `/${component.slug}`,
                        id: component.slug,
                        title: pascalCaseToTitleCase(component.name),
                        Component: () => <ComponentPage componentName={component.name as MetaComponentName} />,
                    },
                ];
            }),
            { path: '/hooks', Component: Hooks, title: 'Hooks', noIndex: true },
        ],
    });
}

// pascal case to title case regex js handle sequential uppercase letters and keep them uppercase
function pascalCaseToTitleCase(str?: string) {
    if (!str) return '';
    return str
        .replace(/([a-z])([A-Z])/g, '$1 $2') // Add space between camelCase words
        .replace(/([A-Z])([A-Z][a-z])/g, '$1 $2') // Add space between sequential uppercase letters followed by lowercase
        .replace(/^./, (char) => char.toUpperCase()); // Capitalize the first letter
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
