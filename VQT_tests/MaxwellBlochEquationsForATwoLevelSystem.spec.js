const { test, expect } = require('@playwright/test');
const path = require('path');

const fileUrl = 'file://' + path.resolve(__dirname, '../pages/MaxwellBlochEquationsForATwoLevelSystem.html');

test.describe('Maxwell-Bloch Equations for a Two-Level System', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(fileUrl);
    // Wait for Plotly to render the initial plots
    // await page.waitForSelector('#plot-intensity .plot-container');
  });

  test('Initial state with z = 0', async ({ page }) => {
    // Action: Wait for the demo to fully load and render is handled by beforeEach.
    // Assert: Take a screenshot of the current UI state.
    await page.screenshot({ path: './snapshots/MaxwellBlochEquationsForATwoLevelSystem-1.png', fullPage: true });
  });

  test('Slider set to z ≈ 7.02', async ({ page }) => {
    // Action: Drag the "z (m)" slider until its value display shows "7.02439".
    // In Playwright, we can set the value of a range input directly.
    await page.locator('#slider-z').fill('7.02439');

    // Assert: Take a screenshot of the current UI state.
    await page.screenshot({ path: './snapshots/MaxwellBlochEquationsForATwoLevelSystem-2.png', fullPage: true });
  });

  test('Slider set to z ≈ 16.39', async ({ page }) => {
    // Action: Drag the "z (m)" slider until its value display shows "16.3902".
    await page.locator('#slider-z').fill('16.3902');

    // Assert: Take a screenshot of the current UI state.
    await page.screenshot({ path: './snapshots/MaxwellBlochEquationsForATwoLevelSystem-3.png', fullPage: true });
  });

  test('Slider set to the maximum value, z = 32', async ({ page }) => {
    // Action: Drag the "z (m)" slider to the far right until its value display shows "32.".
    await page.locator('#slider-z').fill('32');

    // Assert: Take a screenshot of the current UI state.
    await page.screenshot({ path: './snapshots/MaxwellBlochEquationsForATwoLevelSystem-4.png', fullPage: true });
  });

});