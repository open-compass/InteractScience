const { test, expect } = require('@playwright/test');

const fileUrl = 'file://' + require('path').resolve(__dirname, '../pages/RecursivelyDefinedPartialTilingsOfThePlane.html');

test.describe('Recursively Defined Partial Tilings of the Plane', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(fileUrl);
    });

    test('Initial state with 2 steps and DarkRainbow color scheme', async ({ page }) => {
        await page.screenshot({ path: './snapshots/RecursivelyDefinedPartialTilingsOfThePlane-1.png', fullPage: true });
    });

    test('Base tiling with 0 steps and SiennaTones color scheme', async ({ page }) => {
        await page.locator('#input-steps').fill('0');
        await page.locator('#select-color').selectOption('SiennaTones');
        await page.screenshot({ path: './snapshots/RecursivelyDefinedPartialTilingsOfThePlane-2.png', fullPage: true });
    });

    test('Zoomed-in view with 2 steps and RustTones color scheme', async ({ page }) => {
        await page.locator('#checkbox-zoom').check();
        await page.locator('#select-color').selectOption('RustTones');
        await page.screenshot({ path: './snapshots/RecursivelyDefinedPartialTilingsOfThePlane-3.png', fullPage: true });
    });

    test('Tiling with 3 steps and FuchsiaTones color scheme', async ({ page }) => {
        await page.locator('#input-steps').fill('3');
        await page.locator('#select-color').selectOption('FuchsiaTones');
        await page.screenshot({ path: './snapshots/RecursivelyDefinedPartialTilingsOfThePlane-4.png', fullPage: true });
    });
});