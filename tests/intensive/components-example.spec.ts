import { test, expect } from '@playwright/test';

import { components, gotoUrl } from '../utils';

for (const component of components) {
    test(`example(s) should exist for ${component.name}`, async ({ page }) => {
        await gotoUrl(page, `/${component.slug}`);

        const examples = await page.locator('[data-example-render]').all();

        expect(examples.length).toBeGreaterThan(0);

        console.info(`Pass ${component.name}`);
    });
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
