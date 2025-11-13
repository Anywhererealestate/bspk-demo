import { test, expect } from '@playwright/test';

import { components, gotoUrl } from './utils';

for (const component of components) {
    test(`should not have any console error ${component.name}`, async ({ page, browserName }) => {
        // test.skip(browserName.toLowerCase() !== 'chromium', `Test only for chromium!`);

        const errors: string[] = [];
        page.on('console', (msg) => {
            // Only consider error messages
            if (msg.type() !== 'error') return;

            // Ignore 404 errors
            if (msg.text().includes('404')) return;

            // Only capture error messages that are not 404s
            errors.push(msg.text());

            console.log('Forwarded:', msg.text());
        });

        await gotoUrl(page, `/${component.slug}`);

        await page.waitForLoadState('networkidle');

        console.error('Console errors:', errors);
        expect(errors.length).toEqual(0);

        console.info(`Pass ${component.name}`);
    });
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
