const { test, expect } = require('@playwright/test');

const fileUrl = 'file://' + require('path').resolve(__dirname, '../pages/CompositionOfVaporAndLiquidPhasesForATernaryIdealMixture.html');

test.describe('CompositionOfVaporAndLiquidPhasesForATernaryIdealMixture', () => {

  test('Default state with A/C volatility at 0.6 and B/C at 3.93', async ({ page }) => {
    await page.goto(fileUrl);
    await page.locator('#btn-reset').click();
    await page.screenshot({ path: './snapshots/CompositionOfVaporAndLiquidPhasesForATernaryIdealMixture-1.png', fullPage: true });
  });

  test('State with A/C volatility at 1.5 and B/C at 2.5', async ({ page }) => {
    await page.goto(fileUrl);
    await page.locator('#slider-ac').fill('1.5');
    await page.locator('#slider-bc').fill('2.5');
    await page.screenshot({ path: './snapshots/CompositionOfVaporAndLiquidPhasesForATernaryIdealMixture-2.png', fullPage: true });
  });

  test('State with A/C volatility at 0.44 and B/C at 4.35', async ({ page }) => {
    await page.goto(fileUrl);
    await page.locator('#slider-ac').fill('0.44');
    await page.locator('#slider-bc').fill('4.35');
    await page.screenshot({ path: './snapshots/CompositionOfVaporAndLiquidPhasesForATernaryIdealMixture-3.png', fullPage: true });
  });

  test('State with A/C volatility at 0.18 and B/C at 1.09', async ({ page }) => {
    await page.goto(fileUrl);
    await page.locator('#slider-ac').fill('0.18');
    await page.locator('#slider-bc').fill('1.09');
    await page.screenshot({ path: './snapshots/CompositionOfVaporAndLiquidPhasesForATernaryIdealMixture-4.png', fullPage: true });
  });

});