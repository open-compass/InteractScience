const { test, expect } = require('@playwright/test');

test.describe('RelativeMotionForTwoIonsInAPenningTrap', () => {
  const fileUrl = 'file://' + require('path').resolve(__dirname, '../pages/RelativeMotionForTwoIonsInAPenningTrap.html');

  test.beforeEach(async ({ page }) => {
    await page.goto(fileUrl);
    // Wait for MathJax and initial three.js rendering to complete
    await page.waitForTimeout(1000);
  });

  test('Initial state of the simulation with default parameters', async ({ page }) => {
    // Assert: Take a screenshot of the current UI state
    await page.screenshot({ path: './snapshots/RelativeMotionForTwoIonsInAPenningTrap-1.png', fullPage: true });
  });

  test('Ion path with adjusted ζ₀ and e₀ values', async ({ page }) => {
    // Action: Set the value of the number input with id `input-zeta0` to `0.3`.
    await page.locator('#input-zeta0').fill('0.3');
    // Action: Set the value of the number input with id `input-e0` to `3.27`.
    await page.locator('#input-e0').fill('3.27');
    
    // Wait for visualization update
    await page.waitForTimeout(500);

    // Assert: Take a screenshot of the current UI state
    await page.screenshot({ path: './snapshots/RelativeMotionForTwoIonsInAPenningTrap-2.png', fullPage: true });
  });

  test('Ion path with low ρ₀ and high e₀ values', async ({ page }) => {
    // Action: Set the value of the number input with id `input-rho0` to `0.83`.
    await page.locator('#input-rho0').fill('0.83');
    // Action: Set the value of the number input with id `input-zeta0` to `0.3`.
    await page.locator('#input-zeta0').fill('0.3');
    // Action: Set the value of the number input with id `input-e0` to `3.33`.
    await page.locator('#input-e0').fill('3.33');
    
    // Wait for visualization update
    await page.waitForTimeout(500);

    // Assert: Take a screenshot of the current UI state
    await page.screenshot({ path: './snapshots/RelativeMotionForTwoIonsInAPenningTrap-3.png', fullPage: true });
  });

  test('Ion path with low ζ₀ and high λ values', async ({ page }) => {
    // Action: Set the value of the number input with id `input-zeta0` to `0.15`.
    await page.locator('#input-zeta0').fill('0.15');
    // Action: Set the value of the number input with id `input-lambda` to `1.62`.
    await page.locator('#input-lambda').fill('1.62');
    
    // Wait for visualization update
    await page.waitForTimeout(500);

    // Assert: Take a screenshot of the current UI state
    await page.screenshot({ path: './snapshots/RelativeMotionForTwoIonsInAPenningTrap-4.png', fullPage: true });
  });
});