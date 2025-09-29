const { test, expect } = require('@playwright/test');

const fileUrl = 'file://' + require('path').resolve(__dirname, '../pages/TensionOfARopeWithAHangingMass.html');

test.describe('TensionOfARopeWithAHangingMass', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(fileUrl);
  });

  test('Initial state with default parameters', async ({ page }) => {
    await page.screenshot({ path: './snapshots/TensionOfARopeWithAHangingMass-1.png', fullPage: true });
  });

  test('Mass at 2.41, x-position at 7, and y-position at 2', async ({ page }) => {
    await page.locator('#slider-m').fill('2.41');
    await page.locator('#slider-x').fill('7');
    await page.locator('#slider-y').fill('2');
    await page.screenshot({ path: './snapshots/TensionOfARopeWithAHangingMass-2.png', fullPage: true });
  });

  test('Mass increased to 2.96, with x and y positions constant', async ({ page }) => {
    await page.locator('#slider-x').fill('7');
    await page.locator('#slider-y').fill('2');
    await page.locator('#slider-m').fill('2.96');
    await page.screenshot({ path: './snapshots/TensionOfARopeWithAHangingMass-3.png', fullPage: true });
  });

  test('Mass further increased to 4.5, with x and y positions constant', async ({ page }) => {
    await page.locator('#slider-x').fill('7');
    await page.locator('#slider-y').fill('2');
    await page.locator('#slider-m').fill('4.5');
    await page.screenshot({ path: './snapshots/TensionOfARopeWithAHangingMass-4.png', fullPage: true });
  });
});