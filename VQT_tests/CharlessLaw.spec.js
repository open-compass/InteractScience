const { test, expect } = require('@playwright/test');

test.describe("Charles's Law", () => {
  const fileUrl = 'file://' + require('path').resolve(__dirname, '../pages/CharlessLaw.html');

  test('Initial state with default values in Celsius', async ({ page }) => {
    await page.goto(fileUrl);
    await page.screenshot({ path: './snapshots/CharlessLaw-1.png', fullPage: true });
  });

  test('State with Kelvin units and minimum temperature', async ({ page }) => {
    await page.goto(fileUrl);
    await page.locator('#radio-kelvin').click();
    await page.locator('#slider-T').fill('0');
    await page.screenshot({ path: './snapshots/CharlessLaw-2.png', fullPage: true });
  });

  test('State with Celsius units and a high temperature', async ({ page }) => {
    await page.goto(fileUrl);
    // Min: -273, Max: 727. Range = 1000. 90% value = -273 + 0.9 * 1000 = 627
    await page.locator('#slider-T').fill('627');
    await page.screenshot({ path: './snapshots/CharlessLaw-3.png', fullPage: true });
  });

  test('State with high initial volume and medium temperature in Kelvin', async ({ page }) => {
    await page.goto(fileUrl);
    // Min: 100, Max: 500. Range = 400. 90% value = 100 + 0.9 * 400 = 460
    await page.locator('#slider-v0').fill('460');
    await page.locator('#radio-kelvin').click();
    // Min: 0, Max: 1000. 40% value is 400.
    await page.locator('#slider-T').fill('400');
    await page.screenshot({ path: './snapshots/CharlessLaw-4.png', fullPage: true });
  });
});