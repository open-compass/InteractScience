const { test, expect } = require('@playwright/test');

test.describe('Arrhenius versus Eyring-Polanyi Model', () => {
  const fileUrl = 'file://' + require('path').resolve(__dirname, '../pages/ArrheniusVersusEyringPolanyiModel.html');

  test.beforeEach(async ({ page }) => {
    await page.goto(fileUrl);
  });

  test('Initial state with Eyring-Polanyi data generation at low temperatures', async ({ page }) => {
    await page.screenshot({ path: './snapshots/ArrheniusVersusEyringPolanyiModel-1.png', fullPage: true });
  });

  test('Arrhenius data generation with high Tmax limit and specific parameters', async ({ page }) => {
    await page.locator('#btn-model-ar').click();
    await page.locator('#btn-tmax-high').click();
    await page.locator('#slider-tmin').fill('0');
    await page.locator('#slider-tmax').fill('51');
    await page.locator('#slider-tref').fill('25');
    await page.locator('#slider-param').fill('3000');
    await page.screenshot({ path: './snapshots/ArrheniusVersusEyringPolanyiModel-2.png', fullPage: true });
  });

  test('Arrhenius data generation with a wide temperature range up to 1200 °C', async ({ page }) => {
    await page.locator('#btn-model-ar').click();
    await page.locator('#btn-tmax-high').click();
    await page.locator('#slider-tmin').fill('25');
    await page.locator('#slider-tmax').fill('1200');
    await page.locator('#slider-tref').fill('120');
    await page.locator('#slider-param').fill('5000');
    await page.screenshot({ path: './snapshots/ArrheniusVersusEyringPolanyiModel-3.png', fullPage: true });
  });

  test('Arrhenius data generation with adjusted reference temperature and parameter', async ({ page }) => {
    await page.locator('#btn-model-ar').click();
    await page.locator('#btn-tmax-high').click();
    await page.locator('#slider-tmin').fill('25');
    await page.locator('#slider-tmax').fill('100');
    await page.locator('#slider-tref').fill('40');
    await page.locator('#slider-param').fill('4500');
    await page.screenshot({ path: './snapshots/ArrheniusVersusEyringPolanyiModel-4.png', fullPage: true });
  });
});