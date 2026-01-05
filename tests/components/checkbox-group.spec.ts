import { test, expect } from '@playwright/test';

import { gotoUrl } from '../utils';

test(`checkbox group`, async ({ page }) => {
    const getGroupCheckbox = (nth: number) =>
        page.locator(`[data-main-example] [data-example] [data-bspk-owner="checkbox-option"]:nth-child(${nth})`);

    await gotoUrl(page, '/checkbox-group');

    await page.waitForLoadState('networkidle');

    const selectAllCheckbox = getGroupCheckbox(1);
    expect(selectAllCheckbox).toHaveCount(1);

    // ensure it's on
    // If it's not checked, click it to check it.
    const selectAllCheckboxChecked = selectAllCheckbox.locator('input:checked');
    if (!(await selectAllCheckboxChecked.count())) await selectAllCheckbox.click();

    // Check a checkbox and ensure the select all checkbox is in indeterminate state

    const secondCheckbox = getGroupCheckbox(2);
    await secondCheckbox.click();

    const selectAllIndeterminate = selectAllCheckbox.locator('input:indeterminate');
    await expect(selectAllIndeterminate).toHaveCount(1);

    // ensure other checkboxes are still checked if they aren't disabled

    const thirdCheckbox = getGroupCheckbox(3);
    const thirdCheckboxInput = thirdCheckbox.locator('input');
    if (!(await thirdCheckboxInput.isDisabled())) {
        await expect(thirdCheckboxInput).toBeChecked();
    }

    const fourthCheckbox = getGroupCheckbox(4);
    const fourthCheckboxInput = fourthCheckbox.locator('input');
    if (!(await fourthCheckboxInput.isDisabled())) {
        await expect(fourthCheckboxInput).toBeChecked();
    }

    // Now click the select all until it is unchecked
    await selectAllCheckbox.click();
    const selectAllUnchecked = () => selectAllCheckbox.locator('input:not(:checked):not(:indeterminate)');
    if (!(await selectAllUnchecked().count())) await selectAllCheckbox.click();

    await expect(selectAllUnchecked()).toHaveCount(1);

    // Ensure all other checkboxes are unchecked
    for (let i = 2; i <= 4; i++) {
        const checkbox = getGroupCheckbox(i);
        const checkboxInput = checkbox.locator('input');
        if (!(await checkboxInput.isDisabled())) {
            await expect(checkboxInput).not.toBeChecked();
        }
    }
});

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
