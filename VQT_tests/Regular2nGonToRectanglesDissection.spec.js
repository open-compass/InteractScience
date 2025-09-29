const { test, expect } = require('@playwright/test');

const fileUrl = 'file://' + require('path').resolve(__dirname, '../pages/Regular2nGonToRectanglesDissection.html');

test.describe('Regular 2n-gon to Rectangles Dissection', () => {
  test('Initial state with n=6 selected', async ({ page }) => {
    await page.goto(fileUrl);
    await page.screenshot({ path: './snapshots/Regular2nGonToRectanglesDissection-1.png', fullPage: true });
  });

  test('View with n=7 selected, showing an odd polygon dissection', async ({ page }) => {
    await page.goto(fileUrl);
    await page.locator('#btn-n-7').click();
    await page.screenshot({ path: './snapshots/Regular2nGonToRectanglesDissection-2.png', fullPage: true });
  });

  test('View with n=10 selected', async ({ page }) => {
    await page.goto(fileUrl);
    await page.locator('#btn-n-10').click();
    await page.screenshot({ path: './snapshots/Regular2nGonToRectanglesDissection-3.png', fullPage: true });
  });
});