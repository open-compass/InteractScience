const { test, expect } = require('@playwright/test');

test.describe('Moving Wave Analysis', () => {
  const fileUrl = 'file://' + require('path').resolve(__dirname, '../pages/MovingWaveAnalysis.html');

  test('Initial state of the wave visualization', async ({ page }) => {
    await page.goto(fileUrl);

    await page.locator('#slider-amplitude').fill('1.5');
    await page.locator('#slider-frequency').fill('0.3');
    await page.locator('#slider-wavelength').fill('4.5');
    await page.locator('#slider-time').fill('2.5');
    await page.locator('#select-phase').selectOption({ value: String(-Math.PI / 2) });

    await page.screenshot({ path: './snapshots/MovingWaveAnalysis-1.png', fullPage: true });
  });

  test('Wave with increased amplitude and frequency, and phase shifted to π/3', async ({ page }) => {
    await page.goto(fileUrl);

    await page.locator('#slider-amplitude').fill('1.58');
    await page.locator('#slider-frequency').fill('0.43');
    await page.locator('#slider-wavelength').fill('4.9');
    await page.locator('#slider-time').fill('1.74419');
    await page.locator('#select-phase').selectOption({ value: String(Math.PI / 3) });

    await page.screenshot({ path: './snapshots/MovingWaveAnalysis-2.png', fullPage: true });
  });

  test('Wave with default parameters and phase shifted to π/2', async ({ page }) => {
    await page.goto(fileUrl);

    await page.locator('#slider-amplitude').fill('1.5');
    await page.locator('#slider-frequency').fill('0.3');
    await page.locator('#slider-wavelength').fill('4.5');
    await page.locator('#slider-time').fill('2.5');
    await page.locator('#select-phase').selectOption({ value: String(Math.PI / 2) });

    await page.screenshot({ path: './snapshots/MovingWaveAnalysis-3.png', fullPage: true });
  });

  test('Wave with modified parameters and phase shifted to π', async ({ page }) => {
    await page.goto(fileUrl);

    await page.locator('#slider-amplitude').fill('1.37');
    await page.locator('#slider-frequency').fill('0.22');
    await page.locator('#slider-wavelength').fill('5.34');
    await page.locator('#slider-time').fill('4.56');
    await page.locator('#select-phase').selectOption({ value: String(Math.PI) });

    await page.screenshot({ path: './snapshots/MovingWaveAnalysis-4.png', fullPage: true });
  });
});