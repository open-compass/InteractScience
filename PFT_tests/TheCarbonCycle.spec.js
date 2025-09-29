const { test, expect } = require('@playwright/test');
const path = require('path');

const fileUrl = 'file://' + path.resolve(__dirname, '../pages/TheCarbonCycle.html');

test.describe('The Carbon Cycle Visualization', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(fileUrl);
    // Wait for the canvas to be ready, assuming p5.js might take a moment to initialize
    // await page.waitForSelector('#canvas-container canvas');
    await page.waitForTimeout(500);
  });

  test('Carbon Cycle Steps Slider', async ({ page }) => {
    // 1. Assert: The slider with id `slider-steps` is visible.
    await expect(page.locator('#slider-steps')).toBeVisible();

    // 2. Assert: The slider's value is 0 and no arrows or labels are visible on the canvas.
    await expect(page.locator('#slider-steps')).toHaveValue('0');
    // Visually verify the canvas is in its initial state with no processes shown.
    await expect(page.locator('#canvas-container')).toHaveScreenshot('carbon-cycle-step-0.png');

    // 3. Action: Drag the slider handle to the middle, setting its value to 4.
    await page.locator('#slider-steps').fill('4');

    // 4. Assert: The canvas updates to show new arrows and labels, including "Photosynthesis".
    // Visually verify that processes up to step 4 (including Photosynthesis) are visible.
    await expect(page.locator('#canvas-container')).toHaveScreenshot('carbon-cycle-step-4.png');

    // 5. Action: Drag the slider handle to the maximum position, setting its value to 7.
    await page.locator('#slider-steps').fill('7');

    // 6. Assert: The canvas updates to show the final "CO2 Diffusion" arrows and label.
    // Visually verify all processes, including CO2 Diffusion, are now visible.
    await expect(page.locator('#canvas-container')).toHaveScreenshot('carbon-cycle-step-7.png');
  });

  test('Process Label Hover Tooltip', async ({ page }) => {
    const canvasContainer = page.locator('#canvas-container');

    // 1. Assert: The "Photosynthesis" process label is not visible, and no tooltip is visible. (Requires slider at default 0).
    // The initial state (same as step-0 in the previous test) shows no labels or tooltips.
    await expect(canvasContainer).toHaveScreenshot('tooltip-test-initial-state.png');

    // 2. Assert: After setting the `slider-steps` value to 4 or higher, the "Photosynthesis" label becomes visible on the canvas.
    await page.locator('#slider-steps').fill('4');
    // Visually confirm the "Photosynthesis" label is now visible (and no tooltip is shown yet).
    await expect(canvasContainer).toHaveScreenshot('tooltip-test-label-visible.png');

    // 3. Action: Move the mouse cursor over the "Photosynthesis" label.
    // Coordinates from plan: label at (360, 120) on a 600x500 canvas.
    await canvasContainer.hover({ position: { x: 360, y: 120 } });

    // 4. Assert: A tooltip appears on the canvas containing the text "Plants use sunlight, water, and carbon dioxide...".
    // Visually confirm the tooltip appears over the canvas.
    await expect(canvasContainer).toHaveScreenshot('tooltip-test-tooltip-visible.png');

    // 5. Action: Move the mouse cursor off of the "Photosynthesis" label.
    // Move to a corner of the canvas where there are no labels.
    await canvasContainer.hover({ position: { x: 10, y: 10 } });

    // 6. Assert: The tooltip disappears from the canvas.
    // The canvas should return to the state from step 2.
    await expect(canvasContainer).toHaveScreenshot('tooltip-test-label-visible.png');
  });
});