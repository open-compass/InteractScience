const { test, expect } = require('@playwright/test');

test.describe('Cascade of Two Continuous Stirred-Tank Reactors with Recycle', () => {
  const fileUrl = 'file://' + require('path').resolve(__dirname, '../pages/CascadeOfTwoContinuousStirredTankReactorsWithRecycle.html');

  test.beforeEach(async ({ page }) => {
    await page.goto(fileUrl);
  });

  test('Solution list view with alpha set to 0.04', async ({ page }) => {
    // Action: Click the "solution list" button.
    await page.locator('#btn-table').click();
    
    // Action: Set the "α" slider, id="slider-alpha", to the value 0.04.
    await page.locator('#slider-alpha').fill('0.04');
    
    // Assert: Take a screenshot of the current UI state.
    await page.screenshot({ path: './snapshots/CascadeOfTwoContinuousStirredTankReactorsWithRecycle-1.png', fullPage: true });
  });

  test('T₂(α) plot view with alpha at its default value of 0.039', async ({ page }) => {
    // Action: Click the "T₂(α)" button.
    await page.locator('#btn-plot').click();
    
    // Action: Set the "α" slider, id="slider-alpha", to the value 0.039.
    await page.locator('#slider-alpha').fill('0.039');
    
    // Assert: Take a screenshot of the current UI state.
    await page.screenshot({ path: './snapshots/CascadeOfTwoContinuousStirredTankReactorsWithRecycle-2.png', fullPage: true });
  });

  test('Solution list view with alpha set to 0.039', async ({ page }) => {
    // Action: Click the "solution list" button.
    await page.locator('#btn-table').click();
    
    // Assert: Take a screenshot of the current UI state.
    await page.screenshot({ path: './snapshots/CascadeOfTwoContinuousStirredTankReactorsWithRecycle-3.png', fullPage: true });
  });

  test('Turning points view displaying green markers on the plot', async ({ page }) => {
    // Action: Click the "turning points" button.
    await page.locator('#btn-turning-points').click();
    
    // Assert: Take a screenshot of the current UI state.
    await page.screenshot({ path: './snapshots/CascadeOfTwoContinuousStirredTankReactorsWithRecycle-4.png', fullPage: true });
  });
});