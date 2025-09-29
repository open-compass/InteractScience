const { test, expect } = require('@playwright/test');

const fileUrl = 'file://' + require('path').resolve(__dirname, '../pages/HarmonicDistortionOfNonlinearTransferFunction.html');

test.describe('Harmonic Distortion of Nonlinear Transfer Function', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto(fileUrl);
        // Wait for Plotly to be loaded and the initial plots to be rendered
        // await page.waitForSelector('#plot-signal .plot-container');
        // await page.waitForSelector('#plot-spectrum .plot-container');
    });

    test('Initial state with no distortion or clipping', async ({ page }) => {
        // Test Case 1: Initial state
        await page.screenshot({ path: './snapshots/HarmonicDistortionOfNonlinearTransferFunction-1.png', fullPage: true });
    });

    test('Initial state with no distortion or clipping (identical to first screenshot)', async ({ page }) => {
        // Test Case 2: Initial state (duplicate)
        await page.screenshot({ path: './snapshots/HarmonicDistortionOfNonlinearTransferFunction-2.png', fullPage: true });
    });

    test('Clipped signal with linear spectrum view', async ({ page }) => {
        // Test Case 3: Enable clipping
        // 1. Action: Click the checkbox with ID `checkbox-clipping`.
        await page.locator('#checkbox-clipping').click();

        // 2. Assert: Take a screenshot of the current UI state
        await page.screenshot({ path: './snapshots/HarmonicDistortionOfNonlinearTransferFunction-3.png', fullPage: true });
    });

    test('Clipped signal with decibel spectrum view', async ({ page }) => {
        // Test Case 4: Enable clipping and switch spectrum to decibel
        // 1. Action: Click the checkbox with ID `checkbox-clipping`.
        await page.locator('#checkbox-clipping').click();
        
        // 2. Action: Click the button with ID `btn-decibel`.
        await page.locator('#btn-decibel').click();

        // 3. Assert: Take a screenshot of the current UI state
        await page.screenshot({ path: './snapshots/HarmonicDistortionOfNonlinearTransferFunction-4.png', fullPage: true });
    });
});