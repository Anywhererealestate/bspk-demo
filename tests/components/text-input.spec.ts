import { test, expect } from '@playwright/test';

import { gotoUrl } from '../utils';

test('text input element screenshot comparison', async ({ page }) => {
    await gotoUrl(page, '/text-input');

    // Locate the element
    const element = page.locator('[data-main-example] [data-example-render]');

    element.locator('input').fill('Response');

    // Compare against the reference image
    await expect(element).toHaveScreenshot();
});

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
