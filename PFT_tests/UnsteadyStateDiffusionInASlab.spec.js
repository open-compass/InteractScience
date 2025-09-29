const { test, expect } = require('@playwright/test');
const path = require('path');

const fileUrl = 'file://' + path.resolve(__dirname, '../pages/UnsteadyStateDiffusionInASlab.html');

test.describe('Unsteady-State Diffusion in a Slab', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(fileUrl);
    await page.waitForTimeout(500);
  });

  test('Time Slider Control', async ({ page }) => {
    // 1. Assert: The time slider (#time-slider) is visible.
    const timeSlider = page.locator('#time-slider');
    await expect(timeSlider).toBeVisible();

    // 2. Assert: The time slider's value is 100, and its corresponding value display (#time-value) shows "100.".
    const timeValue = page.locator('#time-value');
    await expect(timeSlider).toHaveValue('100');
    await expect(timeValue).toHaveText('100.');
    const initialPlotScreenshot = await page.locator('#plot-div').screenshot();

    // 3. Action: Drag the time slider to the middle of its range (e.g., set its value to 1500).
    await timeSlider.fill('1500');

    // 4. Assert: The value display (#time-value) updates to "1500.", and the plot in #plot-div changes.
    await expect(timeValue).toHaveText('1500.');
    const midPlotScreenshot = await page.locator('#plot-div').screenshot();
    await expect(midPlotScreenshot).not.toEqual(initialPlotScreenshot);

    // 5. Action: Drag the time slider to its minimum value (0).
    await timeSlider.fill('0');

    // 6. Assert: The value display updates to "0.", and the plot updates to show a straight line.
    await expect(timeValue).toHaveText('0.');
    const finalPlotScreenshot = await page.locator('#plot-div').screenshot();
    await expect(finalPlotScreenshot).not.toEqual(midPlotScreenshot);
  });

  test('Diffusivity Slider Control', async ({ page }) => {
    // 1. Assert: The diffusivity slider (#diffusivity-slider) is visible.
    const diffusivitySlider = page.locator('#diffusivity-slider');
    await expect(diffusivitySlider).toBeVisible();

    // 2. Assert: The diffusivity slider's value is 4e-9, and its corresponding value display (#diffusivity-value) shows "4.0 x 10⁻⁹".
    const diffusivityValue = page.locator('#diffusivity-value');
    await expect(diffusivitySlider).toHaveValue('4e-9');
    await expect(diffusivityValue).toHaveText('4.0 x 10⁻⁹');
    const initialPlotScreenshot = await page.locator('#plot-div').screenshot();

    // 3. Action: Drag the diffusivity slider to a new value (e.g., set its value to 8e-9).
    await diffusivitySlider.fill('8e-9');

    // 4. Assert: The value display (#diffusivity-value) updates to "8.0 x 10⁻⁹", and the plot in #plot-div changes.
    await expect(diffusivityValue).toHaveText('8.0 x 10⁻⁹');
    const midPlotScreenshot = await page.locator('#plot-div').screenshot();
    await expect(midPlotScreenshot).not.toEqual(initialPlotScreenshot);

    // 5. Action: Drag the diffusivity slider to its maximum value (1e-8).
    await diffusivitySlider.fill('1e-8');

    // 6. Assert: The value display updates to "1.0 x 10⁻⁸", and the plot changes.
    await expect(diffusivityValue).toHaveText('1.0 x 10⁻⁸');
    const finalPlotScreenshot = await page.locator('#plot-div').screenshot();
    await expect(finalPlotScreenshot).not.toEqual(midPlotScreenshot);
  });
});