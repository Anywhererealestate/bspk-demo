import { test, expect } from '@playwright/test';

import { components, gotoUrl } from '../utils';

for (const component of components) {
    test(`should not have any console error ${component.name}`, async ({ page }) => {
        const errors: string[] = [];
        page.on('console', (msg) => {
            if (msg.type() === 'error') {
                errors.push(msg.text());
                console.log('Forwarded:', msg.text());
            }
        });

        await gotoUrl(page, `/${component.slug}`);

        await page.waitForLoadState('networkidle');

        expect(errors.length).toEqual(0);

        console.info(`Pass ${component.name}`);
    });
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
