const { test, expect } = require('@playwright/test');

test.describe('Firm Costs Optimization Problem In Primal And Dual Form', () => {
  const fileUrl = 'file://' + require('path').resolve(__dirname, '../pages/FirmCostsOptimizationProblemInPrimalAndDualForm.html');

  test.beforeEach(async ({ page }) => {
    await page.goto(fileUrl);
  });

  test('Initial state of the application', async ({ page }) => {
    // Action: Load the demo page. (Handled by beforeEach)
    // Assert: Take a screenshot of the current UI state.
    await page.screenshot({ path: './snapshots/FirmCostsOptimizationProblemInPrimalAndDualForm-1.png', fullPage: true });
  });

  test('State after adjusting all parameter and problem sliders', async ({ page }) => {
    // Action: Set the value of the slider with id `slider-alpha` to 0.33.
    await page.locator('#slider-alpha').fill('0.33');
    // Action: Set the value of the slider with id `slider-beta` to 0.58.
    await page.locator('#slider-beta').fill('0.58');
    // Action: Set the value of the slider with id `slider-w` to 1.9.
    await page.locator('#slider-w').fill('1.9');
    // Action: Set the value of the slider with id `slider-r` to 0.1.
    await page.locator('#slider-r').fill('0.1');
    // Action: Set the value of the slider with id `slider-Q` to 3.7.
    await page.locator('#slider-Q').fill('3.7');
    // Action: Set the value of the slider with id `slider-C` to 1.0.
    await page.locator('#slider-C').fill('1');
    // Assert: Take a screenshot of the current UI state.
    await page.screenshot({ path: './snapshots/FirmCostsOptimizationProblemInPrimalAndDualForm-2.png', fullPage: true });
  });

  test('State with extreme parameter values for alpha and beta', async ({ page }) => {
    // Action: Set the value of the slider with id `slider-alpha` to 0.1.
    await page.locator('#slider-alpha').fill('0.1');
    // Action: Set the value of the slider with id `slider-beta` to 0.1.
    await page.locator('#slider-beta').fill('0.1');
    // Action: Set the value of the slider with id `slider-w` to 1.4.
    await page.locator('#slider-w').fill('1.4');
    // Action: Set the value of the slider with id `slider-r` to 1.51.
    await page.locator('#slider-r').fill('1.51');
    // Action: Set the value of the slider with id `slider-Q` to 5.3.
    await page.locator('#slider-Q').fill('5.3');
    // Action: Set the value of the slider with id `slider-C` to 4.9.
    await page.locator('#slider-C').fill('4.9');
    // Assert: Take a screenshot of the current UI state.
    await page.screenshot({ path: './snapshots/FirmCostsOptimizationProblemInPrimalAndDualForm-3.png', fullPage: true });
  });

  test('State with low factor prices and adjusted parameters', async ({ page }) => {
    // Action: Set the value of the slider with id `slider-alpha` to 0.53.
    await page.locator('#slider-alpha').fill('0.53');
    // Action: Set the value of the slider with id `slider-beta` to 0.57.
    await page.locator('#slider-beta').fill('0.57');
    // Action: Set the value of the slider with id `slider-w` to 0.25.
    await page.locator('#slider-w').fill('0.25');
    // Action: Set the value of the slider with id `slider-r` to 0.52.
    await page.locator('#slider-r').fill('0.52');
    // Action: Set the value of the slider with id `slider-Q` to 2.5.
    await page.locator('#slider-Q').fill('2.5');
    // Action: Set the value of the slider with id `slider-C` to 3.0.
    await page.locator('#slider-C').fill('3');
    // Assert: Take a screenshot of the current UI state.
    await page.screenshot({ path: './snapshots/FirmCostsOptimizationProblemInPrimalAndDualForm-4.png', fullPage: true });
  });
});