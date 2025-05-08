import { test, expect } from '@playwright/test';

import { gotoUrl } from '../utils';

test.skip('text input element screenshot comparison', async ({ page }) => {
    await gotoUrl(page, '/text-input');

    page.locator('[data-main-example] [data-text-input] input').fill('Response');

    // Locate the element
    const element = page.locator('[data-main-example] [data-example-render]');

    // Compare against the reference image
    await expect(element).toHaveScreenshot();
});

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
