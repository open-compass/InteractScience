const { test, expect } = require('@playwright/test');

test.describe('KeplerOrbits', () => {
  const fileUrl = 'file://' + require('path').resolve(__dirname, '../pages/KeplerOrbits.html');

  test.beforeEach(async ({ page }) => {
    await page.goto(fileUrl);
  });

  test('Circular orbit at eccentricity 0 with fractional energy', async ({ page }) => {
    // Action: Set the "eccentricity ε" slider to the value 0.5.
    await page.locator('#slider-eccentricity').fill('0.5');

    // Action: Set the "eccentricity ε" slider to the value 0.
    await page.locator('#slider-eccentricity').fill('0');

    // Assert: Take a screenshot of the current UI state.
    await page.screenshot({ path: './snapshots/KeplerOrbits-1.png', fullPage: true });
  });

  test('Elliptical orbit at eccentricity 0.8', async ({ page }) => {
    // Action: Set the "eccentricity ε" slider to the value 0.8.
    await page.locator('#slider-eccentricity').fill('0.8');

    // Assert: Take a screenshot of the current UI state.
    await page.screenshot({ path: './snapshots/KeplerOrbits-2.png', fullPage: true });
  });

  test('Parabolic orbit at eccentricity 1.0', async ({ page }) => {
    // Action: Set the "eccentricity ε" slider to the value 1.0.
    await page.locator('#slider-eccentricity').fill('1');

    // Assert: Take a screenshot of the current UI state.
    await page.screenshot({ path: './snapshots/KeplerOrbits-3.png', fullPage: true });
  });
});