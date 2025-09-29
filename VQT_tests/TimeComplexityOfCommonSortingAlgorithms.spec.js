const { test, expect } = require('@playwright/test');

test.describe('TimeComplexityOfCommonSortingAlgorithms', () => {
    const fileUrl = 'file://' + require('path').resolve(__dirname, '../pages/TimeComplexityOfCommonSortingAlgorithms.html');

    test('Test Case 1: Initial plot view with default settings', async ({ page }) => {
        await page.goto(fileUrl);
        // 1. Assert: Take a screenshot of the current UI state.
        await page.screenshot({ path: './snapshots/TimeComplexityOfCommonSortingAlgorithms-1.png', fullPage: true });
    });

    test('Test Case 2: Plot with 20 elements and altered algorithm selections', async ({ page }) => {
        await page.goto(fileUrl);
        // 1. Action: Drag the "number of elements" slider with id `slider-elements` to the maximum value of 20.
        await page.locator('#slider-elements').fill('20');
        // 2. Action: Uncheck the checkbox with label "bubble" and id `check-bubble`.
        await page.locator('#check-bubble').uncheck();
        // 3. Action: Uncheck the checkbox with label "selection" and id `check-selection`.
        await page.locator('#check-selection').uncheck();
        // 4. Action: Check the checkbox with label "quick" and id `check-quick`.
        await page.locator('#check-quick').check();
        // 5. Action: Check the checkbox with label "heap" and id `check-heap`.
        await page.locator('#check-heap').check();
        // 6. Action: Check the checkbox with label "bogo" and id `check-bogo`.
        await page.locator('#check-bogo').check();
        // 7. Assert: Take a screenshot of the current UI state.
        await page.screenshot({ path: './snapshots/TimeComplexityOfCommonSortingAlgorithms-2.png', fullPage: true });
    });

    test('Test Case 3: Plot with logarithmic scale and 20 elements', async ({ page }) => {
        await page.goto(fileUrl);
        // 1. Action: Drag the "number of elements" slider with id `slider-elements` to the maximum value of 20.
        await page.locator('#slider-elements').fill('20');
        // 2. Action: Uncheck the checkbox with label "bubble" and id `check-bubble`.
        await page.locator('#check-bubble').uncheck();
        // 3. Action: Uncheck the checkbox with label "selection" and id `check-selection`.
        await page.locator('#check-selection').uncheck();
        // 4. Action: Check the checkbox with label "quick" and id `check-quick`.
        await page.locator('#check-quick').check();
        // 5. Action: Check the checkbox with label "heap" and id `check-heap`.
        await page.locator('#check-heap').check();
        // 6. Action: Check the checkbox with label "bogo" and id `check-bogo`.
        await page.locator('#check-bogo').check();
        // 7. Action: Click the "logarithmic" radio button with id `radio-scale-logarithmic`.
        await page.locator('#radio-scale-logarithmic').check();
        // 8. Assert: Take a screenshot of the current UI state.
        await page.screenshot({ path: './snapshots/TimeComplexityOfCommonSortingAlgorithms-3.png', fullPage: true });
    });

    test('Test Case 4: Plot with automatic range and 10 elements', async ({ page }) => {
        await page.goto(fileUrl);
        // 1. Action: Click the "automatic" plot range radio button with id `radio-range-automatic`.
        await page.locator('#radio-range-automatic').check();
        // 2. Action: Uncheck the checkbox with label "bubble" and id `check-bubble`.
        await page.locator('#check-bubble').uncheck();
        // 3. Action: Uncheck the checkbox with label "selection" and id `check-selection`.
        await page.locator('#check-selection').uncheck();
        // 4. Action: Check the checkbox with label "quick" and id `check-quick`.
        await page.locator('#check-quick').check();
        // 5. Action: Check the checkbox with label "heap" and id `check-heap`.
        await page.locator('#check-heap').check();
        // 6. Action: Check the checkbox with label "bogo" and id `check-bogo`.
        await page.locator('#check-bogo').check();
        // 7. Assert: Take a screenshot of the current UI state.
        await page.screenshot({ path: './snapshots/TimeComplexityOfCommonSortingAlgorithms-4.png', fullPage: true });
    });
});