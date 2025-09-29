const { test, expect } = require('@playwright/test');

const fileUrl = 'file://' + require('path').resolve(__dirname, '../pages/ComparingSortingAlgorithmsOnRainbowColoredBarCharts.html');

test.describe('ComparingSortingAlgorithmsOnRainbowColoredBarCharts', () => {

  test('Initial randomized state with 20 elements, with slider value reset to 10', async ({ page }) => {
    await page.goto(fileUrl);
    await page.locator('#slider-elements').fill('20');
    await page.locator('#btn-randomize').click();
    await page.locator('#slider-elements').fill('10');
    await page.screenshot({ path: './snapshots/ComparingSortingAlgorithmsOnRainbowColoredBarCharts-1.png', fullPage: true });
  });

  test('Cocktail sort selected with 42 elements', async ({ page }) => {
    await page.goto(fileUrl);
    await page.locator('#slider-elements').fill('42');
    await page.locator('#btn-cocktail').click();
    await page.screenshot({ path: './snapshots/ComparingSortingAlgorithmsOnRainbowColoredBarCharts-2.png', fullPage: true });
  });

  test('Shellsort with 48 elements, midway through sorting at step 11', async ({ page }) => {
    await page.goto(fileUrl);
    await page.locator('#slider-elements').fill('48');
    await page.locator('#btn-shellsort').click();
    await page.locator('#slider-step').fill('11');
    await page.screenshot({ path: './snapshots/ComparingSortingAlgorithmsOnRainbowColoredBarCharts-3.png', fullPage: true });
  });

  test('Bogosort selected with 47 elements', async ({ page }) => {
    await page.goto(fileUrl);
    await page.locator('#slider-elements').fill('47');
    await page.locator('#btn-bogosort').click();
    await page.screenshot({ path: './snapshots/ComparingSortingAlgorithmsOnRainbowColoredBarCharts-4.png', fullPage: true });
  });

});