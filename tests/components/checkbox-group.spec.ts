import { test, expect } from '@playwright/test';

import { gotoUrl } from '../utils';

test(`checkbox group`, async ({ page }) => {
    const getGroupCheckbox = (nth: number) =>
        page.locator(`[data-main-example] [data-bspk="toggle-option"]:nth-child(${nth})`);

    await gotoUrl(page, '/checkbox-group');

    await page.waitForLoadState('networkidle');

    // Locate the element
    const element = page.locator('[data-main-example] [data-example-render]');

    const selectAllSwitch = await page.waitForSelector('[data-testid="selectAll-Switch"]');
    await selectAllSwitch.click();

    const selectAllCheckbox = getGroupCheckbox(1);
    expect(selectAllCheckbox).toHaveCount(1);

    const secondCheckbox = getGroupCheckbox(2);
    await secondCheckbox.click();

    // The select all should have an indeterminate checkbox .
    expect(selectAllCheckbox.locator('input[data-indeterminate]')).toHaveCount(1);
    await selectAllCheckbox.click();

    // The select all should be checked.
    expect(selectAllCheckbox.locator('input:checked')).toHaveCount(1);
    // The second checkbox should be checked.
    expect(secondCheckbox.locator('input:checked')).toHaveCount(1);
    // The third checkbox should be checked.
    expect(getGroupCheckbox(3).locator('input:checked')).toHaveCount(1);
    // The fourth checkbox should be checked.
    expect(getGroupCheckbox(4).locator('input:checked')).toHaveCount(1);

    await expect(element).toHaveScreenshot();

    console.info('Pass checkbox group, select all is indeterminate');
});

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
