const { test, expect } = require('@playwright/test');

const fileUrl = 'file://' + require('path').resolve(__dirname, '../pages/TheEquationOfTimeForASundial.html');

test.describe('TheEquationOfTimeForASundial', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(fileUrl);
    // Wait for p5.js to be initialized and draw the initial canvas
    // A simple wait for a timeout can be a pragmatic way to ensure rendering is complete
    await page.waitForTimeout(1000);
  });

  test('Initial default state of the application', async ({ page }) => {
    // The beforeEach hook handles navigation.
    // The test case specifies waiting for the page to load and render.
    // The initial screenshot captures the default state.
    await page.screenshot({ path: './snapshots/TheEquationOfTimeForASundial-1.png', fullPage: true });
  });

  test('Angle at minimum and increased eccentricity', async ({ page }) => {
    await page.locator('#slider-angle').fill('0');
    await page.locator('#slider-eccentricity').fill('0.054');
    await page.waitForTimeout(500); // Allow time for canvas to re-render
    await page.screenshot({ path: './snapshots/TheEquationOfTimeForASundial-2.png', fullPage: true });
  });

  test('Angle at minimum and high eccentricity', async ({ page }) => {
    await page.locator('#slider-angle').fill('0');
    await page.locator('#slider-eccentricity').fill('0.546');
    await page.waitForTimeout(500); // Allow time for canvas to re-render
    await page.screenshot({ path: './snapshots/TheEquationOfTimeForASundial-3.png', fullPage: true });
  });

  test('High angle and maximum eccentricity', async ({ page }) => {
    await page.locator('#slider-angle').fill('50.2');
    await page.locator('#slider-eccentricity').fill('0.99');
    await page.waitForTimeout(500); // Allow time for canvas to re-render
    await page.screenshot({ path: './snapshots/TheEquationOfTimeForASundial-4.png', fullPage: true });
  });

});