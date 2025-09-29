const { test, expect } = require('@playwright/test');

test.describe('TheCarbonCycle', () => {
  const fileUrl = 'file://' + require('path').resolve(__dirname, '../pages/TheCarbonCycle.html');

  test.beforeEach(async ({ page }) => {
    await page.goto(fileUrl);
  });

  test('Initial view of the carbon cycle landscape 1', async ({ page }) => {
    await page.screenshot({ path: './snapshots/TheCarbonCycle-1.png', fullPage: true });
  });

  test('Initial view of the carbon cycle landscape 2', async ({ page }) => {
    await page.screenshot({ path: './snapshots/TheCarbonCycle-2.png', fullPage: true });
  });

  test('Carbon cycle with first three steps visible', async ({ page }) => {
    await page.locator('#slider-steps').fill('3');
    await page.screenshot({ path: './snapshots/TheCarbonCycle-3.png', fullPage: true });
  });

  test('Carbon cycle with all seven steps visible', async ({ page }) => {
    await page.locator('#slider-steps').fill('7');
    await page.screenshot({ path: './snapshots/TheCarbonCycle-4.png', fullPage: true });
  });
});