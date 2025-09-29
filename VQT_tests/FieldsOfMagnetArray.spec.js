const { test, expect } = require('@playwright/test');

test.describe('Fields of Magnet Array', () => {
  const fileUrl = 'file://' + require('path').resolve(__dirname, '../pages/FieldsOfMagnetArray.html');

  test.beforeEach(async ({ page }) => {
    await page.goto(fileUrl);
  });

  test('Initial state with mixed magnet orientations and stream plot', async ({ page }) => {
    await page.screenshot({ path: './snapshots/FieldsOfMagnetArray-1.png', fullPage: true });
  });

  test('All magnets oriented to the right (→) with stream plot', async ({ page }) => {
    await page.locator('#magnet-orientation-down-0').click({ clickCount: 3 });
    await page.locator('#magnet-orientation-down-1').click({ clickCount: 2 });
    await page.locator('#magnet-orientation-up-2').click({ clickCount: 2 });
    await page.locator('#magnet-orientation-up-3').click();
    await page.screenshot({ path: './snapshots/FieldsOfMagnetArray-2.png', fullPage: true });
  });

  test('Halbach array configuration {→, ↑, ←, ↓, →} with stream plot', async ({ page }) => {
    await page.locator('#magnet-orientation-down-0').click({ clickCount: 3 });
    await page.locator('#magnet-orientation-down-2').click({ clickCount: 3 });
    await page.locator('#magnet-orientation-down-3').click({ clickCount: 2 });
    await page.screenshot({ path: './snapshots/FieldsOfMagnetArray-3.png', fullPage: true });
  });

  test('Halbach array configuration with density plot', async ({ page }) => {
    await page.locator('#magnet-orientation-down-0').click({ clickCount: 3 });
    await page.locator('#magnet-orientation-down-2').click({ clickCount: 3 });
    await page.locator('#magnet-orientation-down-3').click({ clickCount: 2 });
    await page.locator('#btn-density-plot').click();
    await page.screenshot({ path: './snapshots/FieldsOfMagnetArray-4.png', fullPage: true });
  });
});