const { test, expect } = require('@playwright/test');

test.describe('SylvestersPostageStampProblem', () => {
  const fileUrl = 'file://' + require('path').resolve(__dirname, '../pages/SylvestersPostageStampProblem.html');

  test.beforeEach(async ({ page }) => {
    await page.goto(fileUrl);
  });

  test('Default state showing the equation 7x+8y=24 in dots mode', async ({ page }) => {
    await page.screenshot({ path: './snapshots/SylvestersPostageStampProblem-1.png', fullPage: true });
  });

  test('Numbers mode for equation 7x+5y=35', async ({ page }) => {
    await page.locator('#checkbox-mode').uncheck();
    await page.locator('#input-b').fill('5');
    await page.locator('#slider-c').fill('35');
    await page.screenshot({ path: './snapshots/SylvestersPostageStampProblem-2.png', fullPage: true });
  });

  test('Dots mode for equation 7x+5y=33', async ({ page }) => {
    await page.locator('#input-b').fill('5');
    await page.locator('#slider-c').fill('33');
    await page.screenshot({ path: './snapshots/SylvestersPostageStampProblem-3.png', fullPage: true });
  });

  test('Error message for non-coprime inputs a=6 and b=3', async ({ page }) => {
    await page.locator('#input-a').fill('6');
    await page.locator('#input-b').fill('3');
    await page.locator('#checkbox-display').check();
    await page.screenshot({ path: './snapshots/SylvestersPostageStampProblem-4.png', fullPage: true });
  });
});