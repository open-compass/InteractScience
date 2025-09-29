const { test, expect } = require('@playwright/test');

test.describe('Radiation Pattern for Double-Couple Earthquake Sources', () => {
  const fileUrl = 'file://' + require('path').resolve(__dirname, '../pages/RadiationPatternForDoubleCoupleEarthquakeSources.html');

  test.beforeEach(async ({ page }) => {
    await page.goto(fileUrl);
    // Wait for MathJax to render, if necessary, by waiting for a known element to be visible.
    // This helps prevent flaky tests where screenshots are taken before the page is fully rendered.
    // await page.waitForSelector('#control-panel', { state: 'visible' });
  });

  test('P-wave pattern with default fault plane orientation', async ({ page }) => {
    await page.locator('#slider-strike').fill('180');
    await page.locator('#slider-dip').fill('60');
    await page.locator('#slider-rake').fill('90');
    await page.locator('#btn-p').click();
    await page.screenshot({ path: './snapshots/RadiationPatternForDoubleCoupleEarthquakeSources-1.png', fullPage: true });
  });

  test('SV-wave pattern with default fault plane orientation', async ({ page }) => {
    await page.locator('#slider-strike').fill('180');
    await page.locator('#slider-dip').fill('60');
    await page.locator('#slider-rake').fill('90');
    await page.locator('#btn-sv').click();
    await page.screenshot({ path: './snapshots/RadiationPatternForDoubleCoupleEarthquakeSources-2.png', fullPage: true });
  });

  test('SH-wave pattern with default fault plane orientation', async ({ page }) => {
    await page.locator('#slider-strike').fill('180');
    await page.locator('#slider-dip').fill('60');
    await page.locator('#slider-rake').fill('90');
    await page.locator('#btn-sh').click();
    await page.screenshot({ path: './snapshots/RadiationPatternForDoubleCoupleEarthquakeSources-3.png', fullPage: true });
  });

  test('SH-wave pattern with bounding box enabled', async ({ page }) => {
    await page.locator('#slider-strike').fill('180');
    await page.locator('#slider-dip').fill('60');
    await page.locator('#slider-rake').fill('90');
    await page.locator('#btn-sh').click();
    await page.locator('#checkbox-box').check();
    await page.screenshot({ path: './snapshots/RadiationPatternForDoubleCoupleEarthquakeSources-4.png', fullPage: true });
  });
});