const { test, expect } = require('@playwright/test');

test.describe('Deformation Pattern in an Earthquake Source Region', () => {
    const fileUrl = 'file://' + require('path').resolve(__dirname, '../pages/DeformationPatternInAnEarthquakeSourceRegion.html');

    test('Initial state with default parameters', async ({ page }) => {
        await page.goto(fileUrl);
        // Action: The application loads with default values (strike: 180, dip: 60, slip angle: 90, slip amount: 0.5).
        // Assert: Take a screenshot of the current UI state.
        await page.screenshot({ path: './snapshots/DeformationPatternInAnEarthquakeSourceRegion-1.png', fullPage: true });
    });

    test('Deformation with slip angle at -90 and slip amount at 0.9', async ({ page }) => {
        await page.goto(fileUrl);
        // Action: Set the "slip angle λ" slider (#slider-slip-angle) to -90.
        await page.locator('#slider-slip-angle').fill('-90');
        // Action: Set the "amount of slip" slider (#slider-slip-amount) to 0.9.
        await page.locator('#slider-slip-amount').fill('0.9');
        // Assert: Take a screenshot of the current UI state.
        await page.screenshot({ path: './snapshots/DeformationPatternInAnEarthquakeSourceRegion-2.png', fullPage: true });
    });

    test('Deformation with maximum dip and minimum slip angle', async ({ page }) => {
        await page.goto(fileUrl);
        // Action: Set the "dip angle δ" slider (#slider-dip) to 90.
        await page.locator('#slider-dip').fill('90');
        // Action: Set the "slip angle λ" slider (#slider-slip-angle) to -180.
        await page.locator('#slider-slip-angle').fill('-180');
        // Action: Set the "amount of slip" slider (#slider-slip-amount) to 0.5.
        await page.locator('#slider-slip-amount').fill('0.5');
        // Assert: Take a screenshot of the current UI state.
        await page.screenshot({ path: './snapshots/DeformationPatternInAnEarthquakeSourceRegion-3.png', fullPage: true });
    });

    test('Reset to the default state from a modified configuration', async ({ page }) => {
        await page.goto(fileUrl);
        // Action: Click the reset button (#btn-reset) in the top right of the control panel.
        await page.locator('#btn-reset').click();
        // Assert: Take a screenshot of the current UI state.
        await page.screenshot({ path: './snapshots/DeformationPatternInAnEarthquakeSourceRegion-4.png', fullPage: true });
    });
});