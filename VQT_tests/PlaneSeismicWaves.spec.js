const { test, expect } = require('@playwright/test');

test.describe('Plane Seismic Waves', () => {
  const fileUrl = 'file://' + require('path').resolve(__dirname, '../pages/PlaneSeismicWaves.html');

  test('Initial state with visible particle trails', async ({ page }) => {
    await page.goto(fileUrl);

    // Set slider values
    await page.locator('#slider-time').fill('0');
    await page.locator('#slider-trail').fill('5');
    await page.locator('#slider-points').fill('50');
    await page.locator('#slider-p-amp').fill('0.2');
    await page.locator('#slider-p-wl').fill('3');
    await page.locator('#slider-s-amp').fill('0.1');
    await page.locator('#slider-s-wl').fill('1');

    await page.screenshot({ path: './snapshots/PlaneSeismicWaves-1.png', fullPage: true });
  });

  test('Pressure wave only with no trails', async ({ page }) => {
    await page.goto(fileUrl);

    await page.locator('#btn-reset').click();
    await page.locator('#slider-trail').fill('0');
    await page.locator('#slider-p-amp').fill('0.134');
    await page.locator('#slider-p-wl').fill('2.02');
    await page.locator('#slider-s-amp').fill('0');
    await page.locator('#slider-s-wl').fill('2.93');

    await page.screenshot({ path: './snapshots/PlaneSeismicWaves-2.png', fullPage: true });
  });

  test('Shear wave only with time offset and increased points', async ({ page }) => {
    await page.goto(fileUrl);

    await page.locator('#btn-reset').click();
    await page.locator('#slider-time').fill('1.17');
    await page.locator('#slider-trail').fill('0');
    await page.locator('#slider-points').fill('65');
    await page.locator('#slider-p-amp').fill('0');
    await page.locator('#slider-p-wl').fill('1');
    await page.locator('#slider-s-amp').fill('0.2555');
    await page.locator('#slider-s-wl').fill('1.98');

    await page.screenshot({ path: './snapshots/PlaneSeismicWaves-3.png', fullPage: true });
  });

  test('Combination of P and S waves with specific amplitudes and wavelengths', async ({ page }) => {
    await page.goto(fileUrl);

    await page.locator('#btn-reset').click();
    await page.locator('#slider-trail').fill('0');
    await page.locator('#slider-p-amp').fill('0.161');
    await page.locator('#slider-p-wl').fill('1.79');
    await page.locator('#slider-s-amp').fill('0.191');
    await page.locator('#slider-s-wl').fill('1.62');

    await page.screenshot({ path: './snapshots/PlaneSeismicWaves-4.png', fullPage: true });
  });
});