const { test, expect } = require('@playwright/test');

test.describe('HueSaturationBrightnessHSBExplorer', () => {
  const fileUrl = 'file://' + require('path').resolve(__dirname, '../pages/HueSaturationBrightnessHSBExplorer.html');

  test('Initial/Reset state with red hue', async ({ page }) => {
    await page.goto(fileUrl);
    await page.locator('#btn-reset').click();
    await page.screenshot({ path: './snapshots/HueSaturationBrightnessHSBExplorer-1.png', fullPage: true });
  });

  test('State with purple hue and reduced brightness', async ({ page }) => {
    await page.goto(fileUrl);
    await page.locator('#slider-hue').fill('0.81');
    await page.locator('#slider-saturation').fill('0.392');
    await page.locator('#slider-brightness').fill('0.63');
    await page.screenshot({ path: './snapshots/HueSaturationBrightnessHSBExplorer-2.png', fullPage: true });
  });

  test('State with dark desaturated green hue', async ({ page }) => {
    await page.goto(fileUrl);
    await page.locator('#slider-hue').fill('0.312');
    await page.locator('#slider-saturation').fill('0.275');
    await page.locator('#slider-brightness').fill('0.312');
    await page.screenshot({ path: './snapshots/HueSaturationBrightnessHSBExplorer-3.png', fullPage: true });
  });

  test('State with bright blue hue', async ({ page }) => {
    await page.goto(fileUrl);
    await page.locator('#slider-hue').fill('0.598');
    await page.locator('#slider-saturation').fill('0.878');
    await page.locator('#slider-brightness').fill('0.709');
    await page.screenshot({ path: './snapshots/HueSaturationBrightnessHSBExplorer-4.png', fullPage: true });
  });
});