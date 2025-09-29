const { test, expect } = require('@playwright/test');

test.describe('ComparingTheIterativeAndRecursiveFloodFillAlgorithms', () => {
  const fileUrl = 'file://' + require('path').resolve(__dirname, '../pages/ComparingTheIterativeAndRecursiveFloodFillAlgorithms.html');

  test.beforeEach(async ({ page }) => {
    await page.goto(fileUrl);
  });

  test('Initial state with Scattered pattern at 61 steps', async ({ page }) => {
    // Action: Wait for the application to initialize. The "Scattered" pattern is selected and the slider is set to 61 by default.
    // The page load handles initialization, so no explicit action is needed here.
    
    // Assert: Take a screenshot of the current UI state
    await page.screenshot({ path: './snapshots/ComparingTheIterativeAndRecursiveFloodFillAlgorithms-1.png', fullPage: true });
  });

  test('None pattern with 15 steps', async ({ page }) => {
    // Action: Click the "None" button in the "box" control group.
    await page.locator('#btn-none').click();
    
    // Action: Drag the "steps" slider to the value 15.
    await page.locator('#steps-slider').fill('15');
    
    // Assert: Take a screenshot of the current UI state
    await page.screenshot({ path: './snapshots/ComparingTheIterativeAndRecursiveFloodFillAlgorithms-2.png', fullPage: true });
  });

  test('Box pattern with 18 steps', async ({ page }) => {
    // Action: Click the "Box" button in the "box" control group.
    await page.locator('#btn-box').click();
    
    // Action: Drag the "steps" slider to the value 18.
    await page.locator('#steps-slider').fill('18');
    
    // Assert: Take a screenshot of the current UI state
    await page.screenshot({ path: './snapshots/ComparingTheIterativeAndRecursiveFloodFillAlgorithms-3.png', fullPage: true });
  });

  test('Scattered pattern with 36 steps', async ({ page }) => {
    // Action: Click the "Scattered" button in the "box" control group.
    await page.locator('#btn-scattered').click();
    
    // Action: Drag the "steps" slider to the value 36.
    await page.locator('#steps-slider').fill('36');
    
    // Assert: Take a screenshot of the current UI state
    await page.screenshot({ path: './snapshots/ComparingTheIterativeAndRecursiveFloodFillAlgorithms-4.png', fullPage: true });
  });
});