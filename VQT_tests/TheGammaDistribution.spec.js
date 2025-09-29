const { test, expect } = require('@playwright/test');
const path = require('path');

const fileUrl = 'file://' + path.resolve(__dirname, '../pages/TheGammaDistribution.html');

test.describe('The Gamma Distribution', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(fileUrl);
  });

  test('Initial state with α = 1.825 and β = 1.945', async ({ page }) => {
    await page.screenshot({ path: './snapshots/TheGammaDistribution-1.png', fullPage: true });
  });

  test('State with α = 0.965 and β = 2.0', async ({ page }) => {
    await page.locator('#slider-alpha').fill('0.965');
    await page.locator('#slider-beta').fill('2');
    await page.screenshot({ path: './snapshots/TheGammaDistribution-2.png', fullPage: true });
  });

  test('State with α = 2.0 and β = 1.07', async ({ page }) => {
    await page.locator('#slider-alpha').fill('2');
    await page.locator('#slider-beta').fill('1.07');
    await page.screenshot({ path: './snapshots/TheGammaDistribution-3.png', fullPage: true });
  });

  test('State with α = 1.12 and β = 3.0', async ({ page }) => {
    await page.locator('#slider-alpha').fill('1.12');
    await page.locator('#slider-beta').fill('3');
    await page.screenshot({ path: './snapshots/TheGammaDistribution-4.png', fullPage: true });
  });

});