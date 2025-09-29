const { test, expect } = require('@playwright/test');

const fileUrl = 'file://' + require('path').resolve(__dirname, '../pages/VectorPlotOfHelmholtzCoilInEarthsMagneticField.html');

test.describe("Vector Plot of Helmholtz Coil in Earth's Magnetic Field", () => {
  test('Initial state of the vector plot', async ({ page }) => {
    await page.goto(fileUrl);
    await page.locator('#slider-current').fill('0.8');
    await page.locator('#btn-reset').click();
    await page.screenshot({ path: './snapshots/VectorPlotOfHelmholtzCoilInEarthsMagneticField-1.png', fullPage: true });
  });

  test('Vector plot with increased current and earth field, and decreased radius', async ({ page }) => {
    await page.goto(fileUrl);
    await page.locator('#slider-current').fill('0.7');
    await page.locator('#slider-earth-field').fill('0.000024');
    await page.locator('#slider-radius').fill('0.31');
    await page.screenshot({ path: './snapshots/VectorPlotOfHelmholtzCoilInEarthsMagneticField-2.png', fullPage: true });
  });

  test('Vector plot with reduced earth field and radius, and medium current', async ({ page }) => {
    await page.goto(fileUrl);
    await page.locator('#slider-current').fill('0.5');
    await page.locator('#slider-earth-field').fill('0.000009');
    await page.locator('#slider-radius').fill('0.26');
    await page.screenshot({ path: './snapshots/VectorPlotOfHelmholtzCoilInEarthsMagneticField-3.png', fullPage: true });
  });
});