const { test, expect } = require('@playwright/test');

test.describe('ThomsonProblemSolutions', () => {
  const fileUrl = 'file://' + require('path').resolve(__dirname, '../pages/ThomsonProblemSolutions.html');

  test.beforeEach(async ({ page }) => {
    await page.goto(fileUrl);
  });

  test('Initial 3D view with 20 points', async ({ page }) => {
    await page.locator('#slider-points').fill('20');
    await page.screenshot({ path: './snapshots/ThomsonProblemSolutions-1.png', fullPage: true });
  });

  test('3D view with 186 points', async ({ page }) => {
    await page.locator('#slider-points').fill('186');
    await page.screenshot({ path: './snapshots/ThomsonProblemSolutions-2.png', fullPage: true });
  });

  test('2D plot view with 182 points', async ({ page }) => {
    await page.locator('#slider-points').fill('182');
    await page.locator('#btn-2d').click();
    await page.screenshot({ path: './snapshots/ThomsonProblemSolutions-3.png', fullPage: true });
  });

  test('3D view with 25 points', async ({ page }) => {
    await page.locator('#slider-points').fill('25');
    await page.screenshot({ path: './snapshots/ThomsonProblemSolutions-4.png', fullPage: true });
  });
});