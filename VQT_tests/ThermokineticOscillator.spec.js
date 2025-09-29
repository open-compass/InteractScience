const { test, expect } = require('@playwright/test');
const path = require('path');

const fileUrl = 'file://' + path.resolve(__dirname, '../pages/ThermokineticOscillator.html');

test.describe('ThermokineticOscillator', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(fileUrl);
    await page.waitForLoadState('networkidle');
  });

  test('Initial plot with stable steady-state behavior', async ({ page }) => {
    // Assert: Take a screenshot of the current UI state
    await page.screenshot({ path: './snapshots/ThermokineticOscillator-1.png', fullPage: true });
  });

  test('Plot with damped oscillations for intermediate parameter values', async ({ page }) => {
    // Action: Set the α slider (id="slider-alpha") to 0.1046.
    await page.locator('#slider-alpha').fill('0.1046');

    // Action: Set the β slider (id="slider-beta") to 10.96.
    await page.locator('#slider-beta').fill('10.96');

    // Action: Set the γ slider (id="slider-gamma") to 966.
    await page.locator('#slider-gamma').fill('966');

    // Assert: Take a screenshot of the current UI state
    await page.screenshot({ path: './snapshots/ThermokineticOscillator-2.png', fullPage: true });
  });

  test('Plot with sustained, stable oscillations (limit cycle)', async ({ page }) => {
    // Action: Set the α slider (id="slider-alpha") to 0.1562.
    await page.locator('#slider-alpha').fill('0.1562');

    // Action: Set the β slider (id="slider-beta") to 10.28.
    await page.locator('#slider-beta').fill('10.28');

    // Action: Set the γ slider (id="slider-gamma") to 673.
    await page.locator('#slider-gamma').fill('673');

    // Assert: Take a screenshot of the current UI state
    await page.screenshot({ path: './snapshots/ThermokineticOscillator-3.png', fullPage: true });
  });

  test('Plot with sharp relaxation oscillations at high γ', async ({ page }) => {
    // Action: Set the α slider (id="slider-alpha") to 0.0816.
    await page.locator('#slider-alpha').fill('0.0816');

    // Action: Set the β slider (id="slider-beta") to 9.62.
    await page.locator('#slider-beta').fill('9.62');

    // Action: Set the γ slider (id="slider-gamma") to 1701.
    await page.locator('#slider-gamma').fill('1701');

    // Assert: Take a screenshot of the current UI state
    await page.screenshot({ path: './snapshots/ThermokineticOscillator-4.png', fullPage: true });
  });
});