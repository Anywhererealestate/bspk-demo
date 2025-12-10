import { test } from '@playwright/test';

import { gotoUrl } from '../utils';

test('text input element screenshot comparison', async ({ page }) => {
    await gotoUrl(page, '/input');

    // Locate the element
    const input = page.locator('[data-main-example] [data-example-render] input');

    await input.fill('Response');
});

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
