const { test, expect } = require('@playwright/test');

const fileUrl = 'file://' + require('path').resolve(__dirname, '../pages/FourierTransformOfRadiallySymmetricPotentialFunctions.html');

test.describe('Fourier Transform of Radially Symmetric Potential Functions', () => {

  test('Default view with all functions and linear axes', async ({ page }) => {
    await page.goto(fileUrl);
    // 1. Action: Load the application. The UI should be in its default state.
    // 2. Assert: Take a screenshot of the current UI state.
    await page.screenshot({ path: './snapshots/FourierTransformOfRadiallySymmetricPotentialFunctions-1.png', fullPage: true });
  });

  test('Log-linear axes with a reduced wave number range', async ({ page }) => {
    await page.goto(fileUrl);
    // 1. Action: Click the "log-linear" button in the "axes" control group.
    await page.locator('#btn-log-linear').click();
    // 2. Action: Drag the "wave number k" slider to the left until its value is exactly 25.02.
    await page.locator('#slider-k').fill('25.02');
    // 3. Assert: Take a screenshot of the current UI state.
    await page.screenshot({ path: './snapshots/FourierTransformOfRadiallySymmetricPotentialFunctions-2.png', fullPage: true });
  });

  test('Gaussian function disabled and plot ranges adjusted', async ({ page }) => {
    await page.goto(fileUrl);
    // 1. Action: Uncheck the "Gaussian" checkbox.
    await page.locator('#checkbox-gaussian').click();
    // 2. Action: Drag the "radius r" slider to the left until its value is exactly 1.
    await page.locator('#slider-r').fill('1');
    // 3. Action: Drag the "wave number k" slider to the right until its value is exactly 100.
    await page.locator('#slider-k').fill('100');
    // 4. Assert: Take a screenshot of the current UI state.
    await page.screenshot({ path: './snapshots/FourierTransformOfRadiallySymmetricPotentialFunctions-3.png', fullPage: true });
  });

  test('Zoomed-in view of the Fourier transform for two functions', async ({ page }) => {
    await page.goto(fileUrl);
    // 1. Action: Uncheck the "Gaussian" checkbox.
    await page.locator('#checkbox-gaussian').click();
    // 2. Action: Drag the "radius r" slider to the left until its value is exactly 1.
    await page.locator('#slider-r').fill('1');
    // 3. Action: Drag the "wave number k" slider to the left until its value is exactly 9.96.
    await page.locator('#slider-k').fill('9.96');
    // 4. Assert: Take a screenshot of the current UI state.
    await page.screenshot({ path: './snapshots/FourierTransformOfRadiallySymmetricPotentialFunctions-4.png', fullPage: true });
  });
});