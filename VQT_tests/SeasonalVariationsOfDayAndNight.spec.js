const { test, expect } = require('@playwright/test');

test.describe('Seasonal Variations of Day and Night', () => {
    const fileUrl = 'file://' + require('path').resolve(__dirname, '../pages/SeasonalVariationsOfDayAndNight.html');

    test.beforeEach(async ({ page }) => {
        await page.goto(fileUrl);
    });

    test('Initial view on March 20 at noon from the ground', async ({ page }) => {
        await page.locator('#slider-date').fill('79');
        await page.locator('#slider-latitude').fill('45');
        await page.locator('#slider-time').fill('12');
        await page.screenshot({ path: './snapshots/SeasonalVariationsOfDayAndNight-1.png', fullPage: true });
    });

    test('Space view on November 11 at 14:00', async ({ page }) => {
        await page.locator('#slider-date').fill('315');
        await page.locator('#slider-time').fill('14');
        await page.locator('#select-view').selectOption('space');
        await page.screenshot({ path: './snapshots/SeasonalVariationsOfDayAndNight-2.png', fullPage: true });
    });

    test('Ground view on November 11 showing daytime constellations', async ({ page }) => {
        await page.locator('#slider-date').fill('315');
        await page.locator('#slider-time').fill('14');
        await page.locator('#check-constellations-day').check();
        await page.screenshot({ path: './snapshots/SeasonalVariationsOfDayAndNight-3.png', fullPage: true });
    });

    test('Night view on November 11 with visible constellations', async ({ page }) => {
        await page.locator('#slider-date').fill('315');
        await page.locator('#slider-time').fill('21.8');
        await page.screenshot({ path: './snapshots/SeasonalVariationsOfDayAndNight-4.png', fullPage: true });
    });
});