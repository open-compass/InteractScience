const { test, expect } = require('@playwright/test');

test.describe('The Phosphorus Cycle', () => {
  const fileUrl = 'file://' + require('path').resolve(__dirname, '../pages/ThePhosphorusCycle.html');

  test.beforeEach(async ({ page }) => {
    await page.goto(fileUrl);
  });

  test('Initial view of the Phosphorus Cycle', async ({ page }) => {
    await page.screenshot({ path: './snapshots/ThePhosphorusCycle-1.png', fullPage: true });
  });

  test('View after resetting the cycle', async ({ page }) => {
    await page.locator('#slider-phase').fill('4');
    await page.locator('#btn-reset').click();
    await page.screenshot({ path: './snapshots/ThePhosphorusCycle-2.png', fullPage: true });
  });

  test('Phosphorus cycle at phase 3', async ({ page }) => {
    await page.locator('#slider-phase').fill('3');
    await page.screenshot({ path: './snapshots/ThePhosphorusCycle-3.png', fullPage: true });
  });

  test('Complete phosphorus cycle visualization', async ({ page }) => {
    await page.locator('#slider-phase').fill('8');
    await page.screenshot({ path: './snapshots/ThePhosphorusCycle-4.png', fullPage: true });
  });
});