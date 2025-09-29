const { test, expect } = require('@playwright/test');

test.describe('LocalSolutionOfANonlinearODEUsingAPowerSeriesExpansion', () => {
  const fileUrl = 'file://' + require('path').resolve(__dirname, '../pages/LocalSolutionOfANonlinearODEUsingAPowerSeriesExpansion.html');

  test.beforeEach(async ({ page }) => {
    await page.goto(fileUrl);
  });

  test('Default state with expansion order 5, f(0)=2.0, and f\'(0)=0.0', async ({ page }) => {
    await page.locator('#slider-order').fill('5');
    await page.locator('#slider-a').fill('2');
    await page.locator('#slider-b').fill('0');
    await page.screenshot({ path: './snapshots/LocalSolutionOfANonlinearODEUsingAPowerSeriesExpansion-1.png', fullPage: true });
  });

  test('f(0)=0.6 and f\'(0)=1.2 with expansion order 5', async ({ page }) => {
    await page.locator('#slider-a').fill('0.6');
    await page.locator('#slider-b').fill('1.2');
    await page.screenshot({ path: './snapshots/LocalSolutionOfANonlinearODEUsingAPowerSeriesExpansion-2.png', fullPage: true });
  });

  test('f(0)=0.9 and f\'(0)=1.5 with expansion order 3', async ({ page }) => {
    await page.locator('#slider-order').fill('3');
    await page.locator('#slider-a').fill('0.9');
    await page.locator('#slider-b').fill('1.5');
    await page.screenshot({ path: './snapshots/LocalSolutionOfANonlinearODEUsingAPowerSeriesExpansion-3.png', fullPage: true });
  });
});