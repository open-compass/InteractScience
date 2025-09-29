const { test, expect } = require('@playwright/test');
const path = require('path');

const fileUrl = 'file://' + path.resolve(__dirname, '../pages/SurfaceDisplacementsDueToUndergroundFaults.html');

test.describe('SurfaceDisplacementsDueToUndergroundFaults', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(fileUrl);
    // Wait for the plot to be potentially rendered
    // await page.waitForSelector('#plot .surface');
  });

  test('Initial state of the visualization with default parameters', async ({ page }) => {
    // 1. Assert: Take a screenshot of the current UI state.
    await page.screenshot({ path: './snapshots/SurfaceDisplacementsDueToUndergroundFaults-1.png', fullPage: true });
  });

  test('UI state after changing and reverting a parameter', async ({ page }) => {
    // 1. Action: Click the "strike-slip" button with id `btn-fault-strike-slip`.
    await page.locator('#btn-fault-strike-slip').click();
    
    // 2. Action: Click the "tensile" button with id `btn-fault-tensile`.
    await page.locator('#btn-fault-tensile').click();
    
    // 3. Assert: Take a screenshot of the current UI state.
    await page.screenshot({ path: './snapshots/SurfaceDisplacementsDueToUndergroundFaults-2.png', fullPage: true });
  });

  test('Visualization with maximum fault dip', async ({ page }) => {
    // 1. Action: Set the value of the "fault dip" slider with id `slider-dip` to 90.
    await page.locator('#slider-dip').fill('90');
    
    // 2. Assert: Take a screenshot of the current UI state.
    await page.screenshot({ path: './snapshots/SurfaceDisplacementsDueToUndergroundFaults-3.png', fullPage: true });
  });

  test('Visualization with maximum fault dip and maximum fault depth', async ({ page }) => {
    // 1. Action: Set the value of the "fault dip" slider with id `slider-dip` to 90.
    await page.locator('#slider-dip').fill('90');
    
    // 2. Action: Set the value of the "fault depth" slider with id `slider-depth` to 1000.
    await page.locator('#slider-depth').fill('1000');
    
    // 3. Assert: Take a screenshot of the current UI state.
    await page.screenshot({ path: './snapshots/SurfaceDisplacementsDueToUndergroundFaults-4.png', fullPage: true });
  });

});