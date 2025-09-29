const { test, expect } = require('@playwright/test');

const fileUrl = 'file://' + require('path').resolve(__dirname, '../pages/LogarithmicSpiralsAndMoebiusTransformations.html');

test.beforeEach(async ({ page }) => {
  await page.goto(fileUrl);
  // Wait for the canvas to be ready, assuming p5 setup is synchronous with page load
  // await page.waitForSelector('#p5-canvas');
  await page.waitForTimeout(500);
});

test.describe('Logarithmic Spirals and Moebius Transformations', () => {

  test("Type Selection Button 'single'", async ({ page }) => {
    // 1. Assert: The "single" button (#btn-type-single) is visible.
    await expect(page.locator('#btn-type-single')).toBeVisible();

    // 2. Assert: The "single" button is not active by default; the "double" button (#btn-type-double) is active. The canvas shows a double spiral with two locators.
    await expect(page.locator('#btn-type-single')).not.toHaveClass(/active/);
    await expect(page.locator('#btn-type-double')).toHaveClass(/active/);
    await expect(page.locator('#canvas-container')).toHaveScreenshot('default-double-spiral.png', { maxDiffPixels: 100 });

    // 3. Action: Click the "single" button.
    await page.locator('#btn-type-single').click();

    // 4. Assert: The "single" button becomes active, the "double" button becomes inactive, and the canvas updates to show a single spiral with one locator.
    await expect(page.locator('#btn-type-single')).toHaveClass(/active/);
    await expect(page.locator('#btn-type-double')).not.toHaveClass(/active/);
    await expect(page.locator('#canvas-container')).toHaveScreenshot('single-spiral.png', { maxDiffPixels: 100 });

    // 5. Action: Click the "double" button.
    await page.locator('#btn-type-double').click();

    // 6. Assert: The "single" button becomes inactive, and the canvas visualization reverts to a double spiral.
    await expect(page.locator('#btn-type-single')).not.toHaveClass(/active/);
    await expect(page.locator('#btn-type-double')).toHaveClass(/active/);
    await expect(page.locator('#canvas-container')).toHaveScreenshot('default-double-spiral.png', { maxDiffPixels: 100 });
  });

  test("Item Selection Button 'filled fox'", async ({ page }) => {
    // 1. Assert: The "filled fox" button (#btn-item-filled-fox) is visible.
    await expect(page.locator('#btn-item-filled-fox')).toBeVisible();

    // 2. Assert: The "filled fox" button is not active by default; the "point" button is active.
    await expect(page.locator('#btn-item-filled-fox')).not.toHaveClass(/active/);
    await expect(page.locator('#btn-item-point')).toHaveClass(/active/);

    // 3. Action: Click the "filled fox" button.
    await page.locator('#btn-item-filled-fox').click();

    // 4. Assert: The button becomes active, and the canvas updates to show filled fox shapes along the spiral instead of points.
    await expect(page.locator('#btn-item-filled-fox')).toHaveClass(/active/);
    await expect(page.locator('#canvas-container')).toHaveScreenshot('filled-foxes-spiral.png', { maxDiffPixels: 100 });

    // 5. Action: Click the "none" button (#btn-item-none).
    await page.locator('#btn-item-none').click();

    // 6. Assert: The "filled fox" button becomes inactive, and the canvas updates to show only the spiral curve without any items.
    await expect(page.locator('#btn-item-filled-fox')).not.toHaveClass(/active/);
    await expect(page.locator('#canvas-container')).toHaveScreenshot('spiral-no-items.png', { maxDiffPixels: 100 });
  });

  test("Spiral Growth Slider Control", async ({ page }) => {
    // 1. Assert: The "spiral growth" slider (#slider-growth) is visible.
    await expect(page.locator('#slider-growth')).toBeVisible();

    // 2. Assert: The slider's default value is 0.15, and the corresponding value display (#display-growth) shows "0.15".
    await expect(page.locator('#slider-growth')).toHaveValue('0.15');
    await expect(page.locator('#display-growth')).toHaveText(/^0\.150*$/);

    // 3. Action: Drag the slider to a new value, such as 0.4.
    await page.locator('#slider-growth').fill('0.4');

    // 4. Assert: The value display updates to show a value near "0.4000", and the shape of the spiral on the canvas changes.
    await expect(page.locator('#display-growth')).toHaveText(/^0\.40000*$/);
    await expect(page.locator('#canvas-container')).toHaveScreenshot('spiral-growth-0.4.png', { maxDiffPixels: 100 });

    // 5. Action: Drag the slider to its minimum value (0.01).
    await page.locator('#slider-growth').fill('0.01');

    // 6. Assert: The value display updates to "0.0100", and the spiral shape on the canvas changes to be much tighter.
    await expect(page.locator('#display-growth')).toHaveText(/^0\.01000*$/);
    await expect(page.locator('#canvas-container')).toHaveScreenshot('spiral-growth-0.01.png', { maxDiffPixels: 100 });
  });

  test("Spiral Growth Reset Button", async ({ page }) => {
    // 1. Assert: The reset button (#btn-reset-growth) is visible.
    await expect(page.locator('#btn-reset-growth')).toBeVisible();

    // 2. Assert: The current slider value is 0.15, which is different from the reset value of 0.25.
    await expect(page.locator('#slider-growth')).toHaveValue('0.15');

    // 3. Action: Click the reset button.
    await page.locator('#btn-reset-growth').click();

    // 4. Assert: The slider's value is set to 0.25, the value display updates to "0.25", and the canvas is redrawn with the new spiral shape.
    await expect(page.locator('#slider-growth')).toHaveValue('0.25');
    await expect(page.locator('#display-growth')).toHaveText(/^0\.250*$/);
    await expect(page.locator('#canvas-container')).toHaveScreenshot('spiral-growth-reset.png', { maxDiffPixels: 100 });

    // 5. Action: Move the slider to a different value (e.g., 0.5), then click the reset button again.
    await page.locator('#slider-growth').fill('0.5');
    await page.locator('#btn-reset-growth').click();

    // 6. Assert: The slider's value returns to 0.25, the value display updates, and the canvas is redrawn.
    await expect(page.locator('#slider-growth')).toHaveValue('0.25');
    await expect(page.locator('#display-growth')).toHaveText(/^0\.250*$/);
    await expect(page.locator('#canvas-container')).toHaveScreenshot('spiral-growth-reset.png', { maxDiffPixels: 100 });
  });

  test("Double Spiral Locator Drag Interaction", async ({ page }) => {
    // 1. Assert: A yellow locator (z_plus_loc) is visible on the left side of the canvas in the default double spiral view.
    // 2. Assert: The double spiral is rendered based on the locator's default position.
    await expect(page.locator('#canvas-container')).toHaveScreenshot('double-spiral-initial-state.png', { maxDiffPixels: 100 });
    
    // Define drag coordinates based on canvas size and world coordinates
    const canvas = page.locator('#p5-canvas');
    const canvasBox = await canvas.boundingBox();
    const startX = canvasBox.x + canvasBox.width / 2 - 100; // z_plus_loc at (-100, 0)
    const startY = canvasBox.y + canvasBox.height / 2;
    const endX = startX + 80; // Move up and to the right
    const endY = startY - 80;

    // 3. Action: Press the mouse down on the yellow locator and drag it to a new position (e.g., up and to the right).
    await page.mouse.move(startX, startY);
    await page.mouse.down();
    await page.mouse.move(endX, endY, { steps: 10 });

    // 4. Assert: The locator follows the mouse cursor, and the shape of the double spiral on the canvas updates continuously during the drag.
    await expect(page.locator('#canvas-container')).toHaveScreenshot('double-spiral-during-drag.png', { maxDiffPixels: 100 });
    
    // 5. Action: Release the mouse button.
    await page.mouse.up();

    // 6. Assert: The locator remains in its new position, and the spiral visualization is stable in its final dragged state.
    await expect(page.locator('#canvas-container')).toHaveScreenshot('double-spiral-after-drag.png', { maxDiffPixels: 100 });
  });

});