const { test, expect } = require('@playwright/test');

test.describe('Sum of Reciprocals of Triangular Numbers Visualization', () => {
  const fileUrl = 'file://' + require('path').resolve(__dirname, '../pages/SumOfReciprocalsOfTriangularNumbers.html');

  test.beforeEach(async ({ page }) => {
    await page.goto(fileUrl);
  });

  test('Visualization with n set to 2', async ({ page }) => {
    await page.locator('#input-n').fill('2');
    await page.screenshot({ path: './snapshots/SumOfReciprocalsOfTriangularNumbers-1.png', fullPage: true });
  });

  test('Visualization with n set to 1', async ({ page }) => {
    await page.locator('#input-n').fill('1');
    await page.screenshot({ path: './snapshots/SumOfReciprocalsOfTriangularNumbers-2.png', fullPage: true });
  });

  test('Visualization with n set to 4', async ({ page }) => {
    await page.locator('#slider-n').fill('4');
    await page.screenshot({ path: './snapshots/SumOfReciprocalsOfTriangularNumbers-3.png', fullPage: true });
  });

  test('Visualization with n set to 8', async ({ page }) => {
    await page.locator('#input-n').fill('8');
    await page.screenshot({ path: './snapshots/SumOfReciprocalsOfTriangularNumbers-4.png', fullPage: true });
  });
});