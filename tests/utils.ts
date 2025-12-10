import { Page } from '@playwright/test';
import data from '../src/meta/data.json' with { type: 'json' };

const { componentsMeta } = data;

const TEST_URL = process.env.TEST_URL || `http://127.0.0.1:8080`;

async function gotoUrl(page: Page, pathName: string) {
    await page.goto(`${TEST_URL}${pathName}`);
    return await page.waitForLoadState('networkidle');
}

const components = [...componentsMeta.filter((component) => component.phase !== 'Backlog')];

components.sort((a, b) => a.name.localeCompare(b.name));

export { components, gotoUrl };

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
