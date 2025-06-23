import { type Page } from '@playwright/test';
import { componentsMeta } from './bspk-ui/meta';

const TEST_PORT = process.env.TEST_PORT || 8080;
async function gotoUrl(page: Page, pathName: string) {
    await page.goto(`http://localhost:${TEST_PORT}${pathName}`);
    return await page.waitForLoadState('networkidle');
}

const components = [...componentsMeta.filter((component) => component.phase !== 'Backlog')];

components.sort((a, b) => a.name.localeCompare(b.name));

export { components, gotoUrl };

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
