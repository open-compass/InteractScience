const { test, expect } = require('@playwright/test');

test.describe('First-Order Solution to Glass-Ice Stefan Problem', () => {
  const fileUrl = 'file://' + require('path').resolve(__dirname, '../pages/FirstOrderSolutionToGlassIceStefanProblem.html');

  test.beforeEach(async ({ page }) => {
    await page.goto(fileUrl);
  });

  test('Initial state with time set to 9.8 seconds', async ({ page }) => {
    // Action: Load the application. The slider is initialized to 9.8.
    // Assert: Take a screenshot of the current UI state.
    await page.screenshot({ path: './snapshots/FirstOrderSolutionToGlassIceStefanProblem-1.png', fullPage: true });
  });

  test('State after moving the time slider to 58.6 seconds', async ({ page }) => {
    // Action: Set the value of the slider with ID `slider-time` to 58.6.
    await page.locator('#slider-time').fill('58.6');
    // Assert: Take a screenshot of the current UI state.
    await page.screenshot({ path: './snapshots/FirstOrderSolutionToGlassIceStefanProblem-2.png', fullPage: true });
  });

  test('State after moving the time slider to 80.8 seconds', async ({ page }) => {
    // Action: Set the value of the slider with ID `slider-time` to 80.8.
    await page.locator('#slider-time').fill('80.8');
    // Assert: Take a screenshot of the current UI state.
    await page.screenshot({ path: './snapshots/FirstOrderSolutionToGlassIceStefanProblem-3.png', fullPage: true });
  });

  test('State after moving the time slider to its maximum value of 100 seconds', async ({ page }) => {
    // Action: Set the value of the slider with ID `slider-time` to 100.
    await page.locator('#slider-time').fill('100');
    // Assert: Take a screenshot of the current UI state.
    await page.screenshot({ path: './snapshots/FirstOrderSolutionToGlassIceStefanProblem-4.png', fullPage: true });
  });
});