/* eslint-disable react/no-multi-comp */
import { ComponentPage } from 'components/ComponentPage';
import { Markdown } from 'components/Markdown.tsx';
import { Page } from 'components/Page';
import { Page404 } from 'components/Page404.tsx';
import Changelog from 'docs/CHANGELOG.md?raw';
import Contributing from 'docs/CONTRIBUTING.md?raw';
import { Demo } from 'docs/demo';
import { Hooks } from 'docs/hooks';
import { Icons } from 'docs/icons';
import Intro from 'docs/intro.md?raw';
import { Progress } from 'docs/progress';
import { Stylesheets } from 'docs/styles';
import { Typography } from 'docs/typography.tsx';
import { componentExamples } from 'src/examples';
import { componentsMeta, MetaComponentName } from 'src/meta';
import { RouteLink } from 'src/types';

export const routes: RouteLink[] = [
    {
        title: 'General',
        children: [
            {
                path: '/',
                Component: () => (
                    <Page>
                        <Markdown md={Intro} />
                    </Page>
                ),
                title: 'Introduction',
            },
            { path: '/icons', Component: Icons, title: 'Icons', noIndex: true },
            { path: '/styles', Component: Stylesheets, title: 'Styles' },
            { path: '/hooks', Component: Hooks, title: 'Hooks', noIndex: true },
            { path: '/progress', Component: Progress, title: 'Progress' },
            { path: '/typography', Component: Typography, title: 'Typography' },

            {
                path: '/changelog',
                Component: () => (
                    <Page>
                        <Markdown md={Changelog} />
                    </Page>
                ),
                title: 'Changelog',
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
        children: componentsMeta.flatMap((component): RouteLink[] => {
            if (!componentExamples[component.name as MetaComponentName]) return [];

            return [
                {
                    path: `/${component.slug}`,
                    id: component.slug,
                    title: component.name,
                    Component: () => <ComponentPage componentName={component.name as MetaComponentName} />,
                },
            ];
        }),
    },
    {
        path: '*',
        title: 'Not Found',
        hide: true,
        Component: Page404,
        noIndex: true,
    },
];

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
