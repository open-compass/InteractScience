const { test, expect } = require('@playwright/test');

test.describe('AdvancedCelestialSphere', () => {
    const fileUrl = 'file://' + require('path').resolve(__dirname, '../pages/AdvancedCelestialSphere.html');

    test.beforeEach(async ({ page }) => {
        await page.goto(fileUrl);
    });

    test('Initial view of the celestial sphere', async ({ page }) => {
        await page.screenshot({ path: './snapshots/AdvancedCelestialSphere-1.png', fullPage: true });
    });

    test('View with "all" family selected and celestial sphere hidden', async ({ page }) => {
        await page.locator('#select-family').selectOption('all');
        await page.locator('#check-sphere').uncheck();
        await page.screenshot({ path: './snapshots/AdvancedCelestialSphere-2.png', fullPage: true });
    });

    test('View with celestial sphere hidden and no constellation selected', async ({ page }) => {
        await page.locator('#check-sphere').uncheck();
        await page.locator('#select-constellation').selectOption('None');
        await page.screenshot({ path: './snapshots/AdvancedCelestialSphere-3.png', fullPage: true });
    });

    test('View showing only the Capricornus constellation on the sphere', async ({ page }) => {
        await page.locator('#select-constellation').selectOption('Capricornus');
        await page.locator('#check-stars').uncheck();
        await page.locator('#check-equator').uncheck();
        await page.locator('#check-ecliptic').uncheck();
        await page.locator('#check-zenith').uncheck();
        await page.locator('#check-aries').uncheck();
        await page.screenshot({ path: './snapshots/AdvancedCelestialSphere-4.png', fullPage: true });
    });
});