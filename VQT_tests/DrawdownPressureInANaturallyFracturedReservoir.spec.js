const { test, expect } = require('@playwright/test');

test.describe('Drawdown Pressure in a Naturally Fractured Reservoir', () => {
  const fileUrl = 'file://' + require('path').resolve(__dirname, '../pages/DrawdownPressureInANaturallyFracturedReservoir.html');

  test('Initial state with default parameters', async ({ page }) => {
    await page.goto(fileUrl);
    await page.screenshot({ path: './snapshots/DrawdownPressureInANaturallyFracturedReservoir-1.png', fullPage: true });
  });

  test('Plot with increased permeability and decreased storativity', async ({ page }) => {
    await page.goto(fileUrl);

    // Calculate slider values from target display values
    const lambdaSliderValue = Math.log10(0.00017378).toFixed(2); // ≈ -3.76
    const omegaSliderValue = Math.log10(0.00636796).toFixed(2); // ≈ -2.20

    await page.locator('#slider-lambda').fill(lambdaSliderValue);
    await page.locator('#slider-omega').fill(omegaSliderValue);

    await page.screenshot({ path: './snapshots/DrawdownPressureInANaturallyFracturedReservoir-2.png', fullPage: true });
  });

  test('Plot with low permeability and high storativity', async ({ page }) => {
    await page.goto(fileUrl);

    // Calculate slider values from target display values
    const lambdaSliderValue = Math.log10(2.75423e-7).toFixed(2); // ≈ -6.56
    const omegaSliderValue = Math.log10(0.0317687).toFixed(2); // ≈ -1.50

    await page.locator('#slider-lambda').fill(lambdaSliderValue);
    await page.locator('#slider-omega').fill(omegaSliderValue);

    await page.screenshot({ path: './snapshots/DrawdownPressureInANaturallyFracturedReservoir-3.png', fullPage: true });
  });

  test('"Difference" plot view with low permeability and storativity', async ({ page }) => {
    await page.goto(fileUrl);
    
    // Calculate slider values from target display values
    const lambdaSliderValue = Math.log10(1.65959e-7).toFixed(2); // ≈ -6.78
    const omegaSliderValue = Math.log10(0.00452898).toFixed(2); // ≈ -2.34

    await page.locator('#slider-lambda').fill(lambdaSliderValue);
    await page.locator('#slider-omega').fill(omegaSliderValue);
    
    await page.locator('#btn-difference').click();

    await page.screenshot({ path: './snapshots/DrawdownPressureInANaturallyFracturedReservoir-4.png', fullPage: true });
  });
});