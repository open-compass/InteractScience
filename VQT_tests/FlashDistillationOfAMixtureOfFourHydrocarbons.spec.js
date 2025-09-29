const { test, expect } = require('@playwright/test');

const fileUrl = 'file://' + require('path').resolve(__dirname, '../pages/FlashDistillationOfAMixtureOfFourHydrocarbons.html');

test.describe('Flash Distillation of a Mixture of Four Hydrocarbons', () => {

  test('Initial state with default flash pressure and heat load', async ({ page }) => {
    await page.goto(fileUrl);
    await page.screenshot({ path: './snapshots/FlashDistillationOfAMixtureOfFourHydrocarbons-1.png', fullPage: true });
  });

  test('Return to the initial state after adjusting sliders', async ({ page }) => {
    await page.goto(fileUrl);
    await page.locator('#slider-pressure').fill('500');
    await page.locator('#slider-heat').fill('5000');
    await page.locator('#slider-pressure').fill('180');
    await page.locator('#slider-heat').fill('0');
    await page.screenshot({ path: './snapshots/FlashDistillationOfAMixtureOfFourHydrocarbons-2.png', fullPage: true });
  });

  test('State with flash pressure at 171 kPa and heat load at 3000 kJ/hr', async ({ page }) => {
    await page.goto(fileUrl);
    await page.locator('#slider-pressure').fill('171');
    await page.locator('#slider-heat').fill('3000');
    await page.screenshot({ path: './snapshots/FlashDistillationOfAMixtureOfFourHydrocarbons-3.png', fullPage: true });
  });

  test('State with flash pressure at 188 kPa and heat load at 3000 kJ/hr', async ({ page }) => {
    await page.goto(fileUrl);
    await page.locator('#slider-pressure').fill('188');
    await page.locator('#slider-heat').fill('3000');
    await page.screenshot({ path: './snapshots/FlashDistillationOfAMixtureOfFourHydrocarbons-4.png', fullPage: true });
  });

});