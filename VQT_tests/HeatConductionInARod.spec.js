const { test, expect } = require('@playwright/test');

test.describe('Heat Conduction in a Rod', () => {
  const fileUrl = 'file://' + require('path').resolve(__dirname, '../pages/HeatConductionInARod.html');

  test.beforeEach(async ({ page }) => {
    await page.goto(fileUrl);
  });

  test('Initial state with default parameters', async ({ page }) => {
    // 1. Action: Load the web page.
    // This is handled by the beforeEach hook.
    
    // 2. Assert: Take a screenshot of the current UI state.
    await page.screenshot({ path: './snapshots/HeatConductionInARod-1.png', fullPage: true });
  });

  test('State with fewer collocation points and increased time', async ({ page }) => {
    // 1. Action: Set the "collocation points" slider to the value 15.
    await page.locator('#slider-points').fill('15');
    
    // 2. Action: Set the "t" slider to the value 0.139.
    await page.locator('#slider-time').fill('0.139');
    
    // 3. Assert: Take a screenshot of the current UI state.
    await page.screenshot({ path: './snapshots/HeatConductionInARod-2.png', fullPage: true });
  });

  test('State with more collocation points and decreased time', async ({ page }) => {
    // 1. Action: Set the "collocation points" slider to the value 22.
    await page.locator('#slider-points').fill('22');
    
    // 2. Action: Set the "t" slider to the value 0.024.
    await page.locator('#slider-time').fill('0.024');
    
    // 3. Assert: Take a screenshot of the current UI state.
    await page.screenshot({ path: './snapshots/HeatConductionInARod-3.png', fullPage: true });
  });

  test('State with maximum collocation points and minimum time', async ({ page }) => {
    // 1. Action: Set the "collocation points" slider to the value 29.
    await page.locator('#slider-points').fill('29');
    
    // 2. Action: Set the "t" slider to the value 0.001.
    await page.locator('#slider-time').fill('0.001');
    
    // 3. Assert: Take a screenshot of the current UI state.
    await page.screenshot({ path: './snapshots/HeatConductionInARod-4.png', fullPage: true });
  });
});