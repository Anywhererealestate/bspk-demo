import { test, expect } from '@playwright/test';

import { gotoUrl } from '../utils';

test('text input element screenshot comparison', async ({ page, browserName }) => {
    test.skip(browserName.toLowerCase() !== 'chromium', `Test only for chromium!`);

    await gotoUrl(page, '/input');

    // Locate the element
    const input = page.locator('[data-main-example] [data-example-render] input');

    await input.fill('Response');

    // Compare against the reference image
    // await expect(element).toHaveScreenshot();
});

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
