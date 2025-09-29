const { test, expect } = require('@playwright/test');

test.describe('Simple Simulation of Tides', () => {
  const fileUrl = 'file://' + require('path').resolve(__dirname, '../pages/SimpleSimulationOfTides.html');

  test.beforeEach(async ({ page }) => {
    await page.goto(fileUrl);
  });

  test('Default simulation state after reset', async ({ page }) => {
    await page.locator('#slider-moon-pull').fill('100');
    await page.locator('#btn-reset').click();
    await page.screenshot({ path: './snapshots/SimpleSimulationOfTides-1.png', fullPage: true });
  });

  test('Tides with moon at default position and sun at 360 degrees', async ({ page }) => {
    await page.locator('#slider-sun-pos').fill('360');
    await page.screenshot({ path: './snapshots/SimpleSimulationOfTides-2.png', fullPage: true });
  });

  test('Strong tides with moon at 90 degrees and sun at 144 degrees', async ({ page }) => {
    await page.locator('#slider-moon-pos').fill('90');
    await page.locator('#slider-moon-pull').fill('80');
    await page.locator('#slider-sun-pos').fill('144');
    await page.locator('#slider-sun-pull').fill('80');
    await page.screenshot({ path: './snapshots/SimpleSimulationOfTides-3.png', fullPage: true });
  });
});