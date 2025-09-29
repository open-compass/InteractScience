const { test, expect } = require('@playwright/test');

const fileUrl = 'file://' + require('path').resolve(__dirname, '../pages/FirstOrderSolutionToGlassIceStefanProblem.html');

test.describe('First Order Solution to Glass-Ice Stefan Problem', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(fileUrl);
    // Wait for Plotly to render
    // await page.waitForSelector('#div-plot .plot-container');
    await page.waitForTimeout(500);
  });

  test('Time Slider Control', async ({ page }) => {
    // 1. Assert: The time slider (`#slider-time`) is visible on the page.
    await expect(page.locator('#slider-time')).toBeVisible();

    // 2. Assert: The slider's value is 9.8 and the numeric display (`#span-time-value`) shows "9.8".
    await expect(page.locator('#slider-time')).toHaveValue('9.8');
    await expect(page.locator('#span-time-value')).toHaveText(/^9\.80*$/);

    // Capture initial state for visual comparison
    const initialCanvasScreenshot = await page.locator('#canvas-material-bar').screenshot();
    const initialPlotScreenshot = await page.locator('#div-plot').screenshot();

    // 3. Action: Drag the slider to the middle, setting its value to approximately 50.
    await page.locator('#slider-time').fill('50');

    // 4. Assert: The numeric display updates to "50.0", the width of the light blue water layer on the canvas visualization changes, and the vertical indicator line on the plot moves horizontally.
    await expect(page.locator('#span-time-value')).toHaveText(/^50\.00*$/);
    await expect(page.locator('#canvas-material-bar')).not.toHaveScreenshot(initialCanvasScreenshot);
    await expect(page.locator('#div-plot')).not.toHaveScreenshot(initialPlotScreenshot);

    // 5. Action: Drag the slider to its maximum value, 100.
    await page.locator('#slider-time').fill('100');

    // 6. Assert: The numeric display shows "100.0" and the visualizations update to reflect the new time.
    await expect(page.locator('#span-time-value')).toHaveText(/^100\.00*$/);
    await expect(page.locator('#canvas-material-bar')).toHaveScreenshot('time-slider-control-canvas-max.png');
    await expect(page.locator('#div-plot')).toHaveScreenshot('time-slider-control-plot-max.png');
  });

  test('Reset Button Control', async ({ page }) => {
    // 1. Assert: The reset button (`#btn-reset`) is visible on the page.
    await expect(page.locator('#btn-reset')).toBeVisible();

    // 2. Assert: The time slider is at its default value of 9.8.
    await expect(page.locator('#slider-time')).toHaveValue('9.8');

    // 3. Action: Click the reset button.
    await page.locator('#btn-reset').click();

    // 4. Assert: The time slider's value changes to 0, the numeric display updates to "0.0", the light blue water layer on the canvas disappears, and the vertical indicator on the plot moves to x=0.
    await expect(page.locator('#slider-time')).toHaveValue('0');
    await expect(page.locator('#span-time-value')).toHaveText(/^0\.00*$/);
    await expect(page.locator('#canvas-material-bar')).toHaveScreenshot('reset-button-control-canvas-reset.png');
    await expect(page.locator('#div-plot')).toHaveScreenshot('reset-button-control-plot-reset.png');

    // 5. Action: After resetting, interact with the time slider to set it to a non-zero value, like 25.
    await page.locator('#slider-time').fill('25');

    // 6. Assert: The visualization updates correctly to t=25, showing that the system is responsive after a reset.
    await expect(page.locator('#span-time-value')).toHaveText(/^25\.00*$/);
    await expect(page.locator('#canvas-material-bar')).toHaveScreenshot('reset-button-control-canvas-t25.png');
    await expect(page.locator('#div-plot')).toHaveScreenshot('reset-button-control-plot-t25.png');
  });
});