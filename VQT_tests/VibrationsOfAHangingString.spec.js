const { test, expect } = require('@playwright/test');

const fileUrl = 'file://' + require('path').resolve(__dirname, '../pages/VibrationsOfAHangingString.html');

test.describe('VibrationsOfAHangingString', () => {

  test('Mode k=2 with time t=0.1 and visible axes', async ({ page }) => {
    await page.goto(fileUrl);
    await page.locator('#slider-t').fill('0.1');
    await page.locator('#slider-k').fill('2');
    await page.screenshot({ path: './snapshots/VibrationsOfAHangingString-1.png', fullPage: true });
  });

  test('Mode k=3 with time t=0.42 and visible axes', async ({ page }) => {
    await page.goto(fileUrl);
    await page.locator('#slider-t').fill('0.42');
    await page.locator('#slider-k').fill('3');
    await page.screenshot({ path: './snapshots/VibrationsOfAHangingString-2.png', fullPage: true });
  });

  test('Mode k=6 with time t=1.29 and axes hidden', async ({ page }) => {
    await page.goto(fileUrl);
    await page.locator('#slider-t').fill('1.29');
    await page.locator('#slider-k').fill('6');
    await page.locator('#checkbox-axes').uncheck();
    await page.screenshot({ path: './snapshots/VibrationsOfAHangingString-3.png', fullPage: true });
  });

  test('Mode k=6 with time t=1.43 and axes visible', async ({ page }) => {
    await page.goto(fileUrl);
    await page.locator('#slider-t').fill('1.43');
    await page.locator('#slider-k').fill('6');
    await page.locator('#checkbox-axes').check();
    await page.screenshot({ path: './snapshots/VibrationsOfAHangingString-4.png', fullPage: true });
  });

});