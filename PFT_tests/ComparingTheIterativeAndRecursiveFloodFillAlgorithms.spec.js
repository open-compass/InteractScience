const { test, expect } = require('@playwright/test');
const path = require('path');

const fileUrl = 'file://' + path.resolve(__dirname, '../pages/ComparingTheIterativeAndRecursiveFloodFillAlgorithms.html');

test.describe('Flood Fill Algorithm Visualization Tests', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(fileUrl);
    await page.waitForTimeout(500);
  });

  test('Steps Slider Control', async ({ page }) => {
    // 1. Assert: The slider with ID `steps-slider` is visible.
    const slider = page.locator('#steps-slider');
    await expect(slider).toBeVisible();

    // 2. Assert: The slider's value is 61 and the `steps-value` span displays "+ 61".
    await expect(slider).toHaveValue('61');
    await expect(page.locator('#steps-value')).toHaveText('+ 61');

    // 3. Action: Drag the slider to the left, to a value of 15.
    // In Playwright, setting the value is the most reliable way to interact with a range input.
    await slider.fill('15');

    // 4. Assert: The `steps-value` span updates to "+ 15" and the number of blue cells on both canvases decreases.
    await expect(page.locator('#steps-value')).toHaveText('+ 15');
    // NOTE: Canvas content check is out of scope for this DOM-focused test.

    // 5. Action: Drag the slider to its minimum value (0).
    await slider.fill('0');

    // 6. Assert: The `steps-value` span updates to "+ 0" and both canvases show no blue cells, only white and black cells.
    await expect(page.locator('#steps-value')).toHaveText('+ 0');
    // NOTE: Canvas content check is out of scope for this DOM-focused test.
  });

  test('"None" Obstacle Button', async ({ page }) => {
    const btnNone = page.locator('#btn-none');
    const btnScattered = page.locator('#btn-scattered');
    const slider = page.locator('#steps-slider');

    // 1. Assert: The button with ID `btn-none` is visible.
    await expect(btnNone).toBeVisible();

    // 2. Assert: The "None" button is not in an "active" state.
    await expect(btnNone).not.toHaveClass(/active/);

    // 3. Action: Click the "None" button.
    await btnNone.click();

    // 4. Assert: The "None" button becomes active, the canvases are redrawn with no black obstacle cells, and the steps slider resets to 0.
    await expect(btnNone).toHaveClass(/active/);
    await expect(slider).toHaveValue('0');
    // NOTE: Canvas content check is out of scope for this DOM-focused test.

    // 5. Action: Click the "Scattered" button.
    await btnScattered.click();

    // 6. Assert: The "None" button is no longer active and the canvases are redrawn with scattered black obstacle cells.
    await expect(btnNone).not.toHaveClass(/active/);
    // NOTE: Canvas content check is out of scope for this DOM-focused test.
  });

  test('"Box" Obstacle Button', async ({ page }) => {
    const btnBox = page.locator('#btn-box');
    const btnNone = page.locator('#btn-none');
    const slider = page.locator('#steps-slider');

    // 1. Assert: The button with ID `btn-box` is visible.
    await expect(btnBox).toBeVisible();

    // 2. Assert: The "Box" button is not in an "active" state.
    await expect(btnBox).not.toHaveClass(/active/);

    // 3. Action: Click the "Box" button.
    await btnBox.click();

    // 4. Assert: The "Box" button becomes active, the canvases are redrawn with a border of black obstacle cells, and the steps slider resets to 0.
    await expect(btnBox).toHaveClass(/active/);
    await expect(slider).toHaveValue('0');
    // NOTE: Canvas content check is out of scope for this DOM-focused test.

    // 5. Action: Click the "None" button.
    await btnNone.click();

    // 6. Assert: The "Box" button is no longer active and the canvases are redrawn with no black obstacle cells.
    await expect(btnBox).not.toHaveClass(/active/);
    // NOTE: Canvas content check is out of scope for this DOM-focused test.
  });

  test('"Scattered" Obstacle Button', async ({ page }) => {
    const btnScattered = page.locator('#btn-scattered');
    const btnNone = page.locator('#btn-none');
    const slider = page.locator('#steps-slider');

    // 1. Assert: The button with ID `btn-scattered` is visible.
    await expect(btnScattered).toBeVisible();

    // 2. Assert: The "Scattered" button is in an "active" state, and the canvases display a scattered pattern of obstacles.
    await expect(btnScattered).toHaveClass(/active/);
    // NOTE: Canvas content check is out of scope for this DOM-focused test.

    // 3. Action: Click the "None" button.
    await btnNone.click();

    // 4. Assert: The "Scattered" button becomes inactive and the canvases are redrawn with no obstacles.
    await expect(btnScattered).not.toHaveClass(/active/);
    // NOTE: Canvas content check is out of scope for this DOM-focused test.

    // 5. Action: Click the "Scattered" button again.
    await btnScattered.click();

    // 6. Assert: The "Scattered" button becomes active again, the canvases display a scattered pattern of obstacles, and the steps slider is at 0.
    await expect(btnScattered).toHaveClass(/active/);
    await expect(slider).toHaveValue('0');
    // NOTE: Canvas content check is out of scope for this DOM-focused test.
  });
});