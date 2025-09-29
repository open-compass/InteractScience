const { test, expect } = require('@playwright/test');
const path = require('path');

const fileUrl = 'file://' + path.resolve(__dirname, '../pages/ConvolutionMethodInHydrologicComputations.html');

test.describe('ConvolutionMethodInHydrologicComputations', () => {

  test('Initial state with default precipitation and UH values', async ({ page }) => {
    await page.goto(fileUrl);
    await page.locator('#slider-precip-1').fill('1');
    await page.locator('#slider-precip-2').fill('0');
    await page.locator('#slider-precip-3').fill('0');
    await page.locator('#slider-uh-1').fill('1');
    await page.locator('#slider-uh-2').fill('5');
    await page.locator('#slider-uh-3').fill('3');
    await page.locator('#slider-uh-4').fill('1');
    await page.screenshot({ path: './snapshots/ConvolutionMethodInHydrologicComputations-1.png', fullPage: true });
  });

  test('Precipitation set to hour 2 only', async ({ page }) => {
    await page.goto(fileUrl);
    await page.locator('#slider-precip-1').fill('0');
    await page.locator('#slider-precip-2').fill('9');
    await page.screenshot({ path: './snapshots/ConvolutionMethodInHydrologicComputations-2.png', fullPage: true });
  });

  test('Multi-hour precipitation with increasing intensity', async ({ page }) => {
    await page.goto(fileUrl);
    await page.locator('#slider-precip-1').fill('1');
    await page.locator('#slider-precip-2').fill('2');
    await page.locator('#slider-precip-3').fill('9');
    await page.screenshot({ path: './snapshots/ConvolutionMethodInHydrologicComputations-3.png', fullPage: true });
  });

  test('High precipitation and modified UH streamflow', async ({ page }) => {
    await page.goto(fileUrl);
    await page.locator('#slider-precip-1').fill('3');
    await page.locator('#slider-precip-2').fill('9');
    await page.locator('#slider-precip-3').fill('7');
    await page.locator('#slider-uh-4').fill('8');
    await page.screenshot({ path: './snapshots/ConvolutionMethodInHydrologicComputations-4.png', fullPage: true });
  });

});