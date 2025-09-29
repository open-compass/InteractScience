const { test, expect } = require('@playwright/test');

test.describe("Ullman's Theorem in Two Dimensions", () => {
    const fileUrl = 'file://' + require('path').resolve(__dirname, '../pages/UllmansTheoremInTwoDimensions.html');

    test.beforeEach(async ({ page }) => {
        await page.goto(fileUrl);
    });

    test('Visualization with default parameter values', async ({ page }) => {
        await page.locator('#slider-au').fill('0.8');
        await page.locator('#slider-bu').fill('-0.5');
        await page.locator('#slider-av').fill('1.2');
        await page.locator('#slider-bv').fill('1');
        await page.locator('#slider-aw').fill('1.1');
        await page.locator('#slider-bw').fill('-0.2');
        await page.locator('#slider-x-scale').fill('80');
        await page.locator('#slider-y-scale').fill('80');

        await page.screenshot({ path: './snapshots/UllmansTheoremInTwoDimensions-1.png', fullPage: true });
    });

    test('Zoomed-out view after reducing scale', async ({ page }) => {
        await page.locator('#slider-au').fill('0.8');
        await page.locator('#slider-bu').fill('-0.5');
        await page.locator('#slider-av').fill('1.2');
        await page.locator('#slider-bv').fill('1');
        await page.locator('#slider-aw').fill('1.1');
        await page.locator('#slider-bw').fill('-0.2');
        await page.locator('#slider-x-scale').fill('50');
        await page.locator('#slider-y-scale').fill('50');

        await page.screenshot({ path: './snapshots/UllmansTheoremInTwoDimensions-2.png', fullPage: true });
    });
});