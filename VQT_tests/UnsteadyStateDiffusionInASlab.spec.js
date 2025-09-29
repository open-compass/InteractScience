const { test, expect } = require('@playwright/test');

test.describe('Unsteady-State Diffusion in a Slab', () => {
  const fileUrl = 'file://' + require('path').resolve(__dirname, '../pages/UnsteadyStateDiffusionInASlab.html');

  test.beforeEach(async ({ page }) => {
    await page.goto(fileUrl);
  });

  test('Initial state with default time and diffusivity settings', async ({ page }) => {
    // Action: Wait for the page to fully load. The plot should render with the default values.
    // (No action needed as beforeEach handles navigation and initial load)
    
    // Assert: Take a screenshot of the current UI state.
    await page.screenshot({ path: './snapshots/UnsteadyStateDiffusionInASlab-1.png', fullPage: true });
  });

  test('Concentration profile at time zero', async ({ page }) => {
    // Action: Drag the "time" slider handle all the way to the left to set its value to 0.
    await page.locator('#time-slider').fill('0');
    
    // Assert: Take a screenshot of the current UI state.
    await page.screenshot({ path: './snapshots/UnsteadyStateDiffusionInASlab-2.png', fullPage: true });
  });

  test('Concentration profile with time returned to 100', async ({ page }) => {
    // Action: Drag the "time" slider handle from its current position (0) to the value 100.
    // To achieve the state of "returning from 0", we first set it to 0 and then to 100.
    await page.locator('#time-slider').fill('0');
    await page.locator('#time-slider').fill('100');
    
    // Assert: Take a screenshot of the current UI state.
    await page.screenshot({ path: './snapshots/UnsteadyStateDiffusionInASlab-3.png', fullPage: true });
  });

  test('Concentration profile at maximum time', async ({ page }) => {
    // Action: Drag the "time" slider handle all the way to the right to set its value to 2500.
    await page.locator('#time-slider').fill('2500');
    
    // Assert: Take a screenshot of the current UI state.
    await page.screenshot({ path: './snapshots/UnsteadyStateDiffusionInASlab-4.png', fullPage: true });
  });
});