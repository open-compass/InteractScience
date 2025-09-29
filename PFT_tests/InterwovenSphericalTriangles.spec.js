const { test, expect } = require('@playwright/test');
const fileUrl = 'file://' + require('path').resolve(__dirname, '../pages/InterwovenSphericalTriangles.html');

test.describe('Interwoven Spherical Triangles Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(fileUrl);
    // await page.waitForSelector('#main-canvas');
    await page.waitForTimeout(500);
  });

  test('"units in x direction" Radio Buttons', async ({ page }) => {
    // 1. Assert: The radio button group with name="unitsX" is visible.
    await expect(page.locator('#radio-x-0')).toBeVisible();

    // 2. Assert: The radio button with id="radio-x-2" is checked by default.
    await expect(page.locator('#radio-x-2')).toBeChecked();
    const initialCanvasState = await page.locator('#main-canvas').screenshot();

    // 3. Action: Click the radio button with id="radio-x-4".
    await page.locator('#radio-x-4').click();

    // 4. Assert: The number of shapes in the horizontal direction on the canvas increases.
    // This is a visual check, so we compare the new state to the initial one.
    await expect(page.locator('#main-canvas')).not.toHaveScreenshot(initialCanvasState);

    // 5. Action: Click the radio button with id="radio-x-0".
    await page.locator('#radio-x-0').click();

    // 6. Assert: The shapes are removed from the canvas.
    // This is a visual check, so we take a snapshot of the empty canvas state.
    await expect(page.locator('#main-canvas')).toHaveScreenshot('x-units-zero.png');
  });

  test('"units in y direction" Radio Buttons', async ({ page }) => {
    // 1. Assert: The radio button group with name="unitsY" is visible.
    await expect(page.locator('#radio-y-0')).toBeVisible();

    // 2. Assert: The radio button with id="radio-y-2" is checked by default.
    await expect(page.locator('#radio-y-2')).toBeChecked();
    const initialCanvasState = await page.locator('#main-canvas').screenshot();

    // 3. Action: Click the radio button with id="radio-y-4".
    await page.locator('#radio-y-4').click();

    // 4. Assert: The number of shapes in the vertical direction on the canvas increases.
    await expect(page.locator('#main-canvas')).not.toHaveScreenshot(initialCanvasState);
    const increasedCanvasState = await page.locator('#main-canvas').screenshot();

    // 5. Action: Click the radio button with id="radio-y-1".
    await page.locator('#radio-y-1').click();

    // 6. Assert: The number of shapes in the vertical direction on the canvas decreases.
    await expect(page.locator('#main-canvas')).not.toHaveScreenshot(increasedCanvasState);
  });

  test('"trim" Slider', async ({ page }) => {
    // 1. Assert: The slider with id="slider-trim" is visible.
    await expect(page.locator('#slider-trim')).toBeVisible();

    // 2. Assert: The slider's default value is `0.8` and the `label-trim-value` span displays "0.8".
    await expect(page.locator('#slider-trim')).toHaveValue('0.8');
    await expect(page.locator('#label-trim-value')).toHaveText(/^0\.80*$/);

    // 3. Action: Drag the slider to the left, to a lower value (e.g., 0.71).
    await page.locator('#slider-trim').fill('0.71');

    // 4. Assert: The shapes on the canvas become visibly "spikier" and the `label-trim-value` span updates.
    await expect(page.locator('#label-trim-value')).toHaveText(/^0\.7100*$/);
    await expect(page.locator('#main-canvas')).toHaveScreenshot('trim-spiky.png');

    // 5. Action: Drag the slider to its maximum value (`0.9`).
    await page.locator('#slider-trim').fill('0.9');

    // 6. Assert: The shapes on the canvas become visibly "rounder" and the `label-trim-value` span updates to "0.900".
    await expect(page.locator('#label-trim-value')).toHaveText(/^0\.9000*$/);
    await expect(page.locator('#main-canvas')).toHaveScreenshot('trim-round.png');
  });

  test('"double" Checkbox', async ({ page }) => {
    // 1. Assert: The checkbox with id="checkbox-double" is visible.
    await expect(page.locator('#checkbox-double')).toBeVisible();

    // 2. Assert: The checkbox is unchecked by default.
    await expect(page.locator('#checkbox-double')).not.toBeChecked();
    const initialCanvasState = await page.locator('#main-canvas').screenshot();

    // 3. Action: Click the "double" checkbox to check it.
    await page.locator('#checkbox-double').check();

    // 4. Assert: A new set of interwoven, cyan-colored shapes appears on the canvas.
    await expect(page.locator('#main-canvas')).toHaveScreenshot('double-checked.png');

    // 5. Action: Click the "double" checkbox again to uncheck it.
    await page.locator('#checkbox-double').uncheck();

    // 6. Assert: The interwoven, cyan-colored shapes disappear from the canvas.
    await expect(page.locator('#main-canvas')).toHaveScreenshot(initialCanvasState);
  });

  test('"sphere" Checkbox', async ({ page }) => {
    // 1. Assert: The checkbox with id="checkbox-sphere" is visible.
    await expect(page.locator('#checkbox-sphere')).toBeVisible();

    // 2. Assert: The checkbox is unchecked by default.
    await expect(page.locator('#checkbox-sphere')).not.toBeChecked();
    const initialCanvasState = await page.locator('#main-canvas').screenshot();

    // 3. Action: Click the "sphere" checkbox to check it.
    await page.locator('#checkbox-sphere').check();

    // 4. Assert: A reference sphere appears on the canvas.
    await expect(page.locator('#main-canvas')).toHaveScreenshot('sphere-checked.png');

    // 5. Action: Click the "sphere" checkbox again to uncheck it.
    await page.locator('#checkbox-sphere').uncheck();

    // 6. Assert: The reference sphere disappears from the canvas.
    await expect(page.locator('#main-canvas')).toHaveScreenshot(initialCanvasState);
  });

  test('"triangles" Checkbox', async ({ page }) => {
    // 1. Assert: The checkbox with id="checkbox-triangles" is visible.
    await expect(page.locator('#checkbox-triangles')).toBeVisible();

    // 2. Assert: The checkbox is unchecked by default.
    await expect(page.locator('#checkbox-triangles')).not.toBeChecked();
    const initialCanvasState = await page.locator('#main-canvas').screenshot();

    // 3. Action: Click the "triangles" checkbox to check it.
    await page.locator('#checkbox-triangles').check();

    // 4. Assert: A grid of semi-transparent planar triangles and small black points appears on the canvas.
    await expect(page.locator('#main-canvas')).toHaveScreenshot('triangles-checked.png');

    // 5. Action: Click the "triangles" checkbox again to uncheck it.
    await page.locator('#checkbox-triangles').uncheck();

    // 6. Assert: The grid of triangles and points disappears from the canvas.
    await expect(page.locator('#main-canvas')).toHaveScreenshot(initialCanvasState);
  });

  test('Reset View Button', async ({ page }) => {
    // 1. Assert: The button with id="btn-reset-view" is visible.
    await expect(page.locator('#btn-reset-view')).toBeVisible();

    // 2. Assert: The camera is in its default position.
    const defaultCameraState = await page.locator('#main-canvas').screenshot();

    // 3. Action: Rotate, pan, and zoom the camera to a new position. Click the `btn-reset-view` button.
    const canvas = page.locator('#main-canvas');
    const bb = await canvas.boundingBox();
    await canvas.hover();
    await page.mouse.down();
    await page.mouse.move(bb.x + bb.width / 2 + 100, bb.y + bb.height / 2 + 50);
    await page.mouse.up();
    
    // Ensure the view has changed before reset
    await expect(page.locator('#main-canvas')).not.toHaveScreenshot(defaultCameraState);

    await page.locator('#btn-reset-view').click();

    // 4. Assert: The camera position and orientation resets to its initial state.
    await expect(page.locator('#main-canvas')).toHaveScreenshot(defaultCameraState);

    // 5. Action: Click the `btn-reset-view` button again without changing the view.
    await page.locator('#btn-reset-view').click();

    // 6. Assert: The camera view remains in the reset state.
    await expect(page.locator('#main-canvas')).toHaveScreenshot(defaultCameraState);
  });
});