const { test, expect } = require('@playwright/test');
const path = require('path');

const fileUrl = 'file://' + path.resolve(__dirname, '../pages/2DKinematicsOnAFigureEightCurve.html');

test.describe('2D Kinematics on a Figure-Eight Curve', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(fileUrl);
    // Wait for the canvas to be ready, assuming p5.js has initialized it.
    // await page.waitForSelector('#canvas-container canvas');
    await page.waitForTimeout(500);
  });

  test('Time Slider Interaction', async ({ page }) => {
    // 1. Assert: The time slider (`#slider-time`) is visible.
    await expect(page.locator('#slider-time')).toBeVisible();

    // 2. Assert: The slider's value is at the default of `0.4`.
    await expect(page.locator('#slider-time')).toHaveValue('0.4');
    const initialCanvas = page.locator('#canvas-container');

    // 3. Action: Drag the slider handle to a value of `3.14`.
    await page.locator('#slider-time').fill('3.14');

    // 4. Assert: The black dot on the figure-eight curve moves to a new position, and the acceleration vector changes.
    await expect(page.locator('#slider-time')).toHaveValue('3.14');
    await expect(initialCanvas).toHaveScreenshot('time-slider-at-3.14.png');

    // 5. Action: Drag the slider handle to its maximum value (`6.283`).
    await page.locator('#slider-time').fill('6.283');

    // 6. Assert: The black dot on the curve moves to a different position.
    await expect(page.locator('#slider-time')).toHaveValue('6.283');
    await expect(initialCanvas).toHaveScreenshot('time-slider-at-max.png');
  });

  test('Time Reset Button', async ({ page }) => {
    // 1. Assert: The time reset button (`#btn-reset-time`) is visible next to the slider.
    await expect(page.locator('#btn-reset-time')).toBeVisible();

    // 2. Assert: The time slider's value is `0.4`.
    await expect(page.locator('#slider-time')).toHaveValue('0.4');
    const initialCanvasState = await page.locator('#canvas-container').screenshot();

    // 3. Action: Drag the time slider to `5.0`, then click the reset button.
    await page.locator('#slider-time').fill('5');
    await expect(page.locator('#slider-time')).toHaveValue('5.0');
    await page.locator('#btn-reset-time').click();

    // 4. Assert: The time slider's value returns to `0.4`, and the black dot on the curve moves back to its initial position.
    await expect(page.locator('#slider-time')).toHaveValue('0.4');
    await expect(page.locator('#canvas-container')).toHaveScreenshot(initialCanvasState);
    
    // 5. Action: Drag the time slider to its minimum value (`0`), then click the reset button.
    await page.locator('#slider-time').fill('0');
    await expect(page.locator('#slider-time')).toHaveValue('0');
    await page.locator('#btn-reset-time').click();

    // 6. Assert: The time slider's value returns to `0.4`, and the dot on the curve moves.
    await expect(page.locator('#slider-time')).toHaveValue('0.4');
    await expect(page.locator('#canvas-container')).toHaveScreenshot(initialCanvasState);
  });

  test('Position Vector Toggle Switch', async ({ page }) => {
    // 1. Assert: The "position" toggle switch is visible.
    await expect(page.locator('#toggle-position')).toBeVisible();

    // 2. Assert: The toggle is in the "off" state by default and no position vector is drawn on the canvas.
    await expect(page.locator('#radio-position-off')).toBeChecked();
    await expect(page.locator('#canvas-container')).toHaveScreenshot('position-vector-off.png');

    // 3. Action: Click the "on" option for the "position" toggle.
    await page.locator('label[for="radio-position-on"]').click();

    // 4. Assert: A position vector appears on the canvas, originating from the origin and ending at the point on the curve.
    await expect(page.locator('#radio-position-on')).toBeChecked();
    await expect(page.locator('#canvas-container')).toHaveScreenshot('position-vector-on.png');

    // 5. Action: Click the "off" option for the "position" toggle.
    await page.locator('label[for="radio-position-off"]').click();
    
    // 6. Assert: The position vector disappears from the canvas.
    await expect(page.locator('#radio-position-off')).toBeChecked();
    await expect(page.locator('#canvas-container')).toHaveScreenshot('position-vector-off.png');
  });

  test('Velocity Vector Toggle Switch', async ({ page }) => {
    // 1. Assert: The "velocity" toggle switch is visible.
    await expect(page.locator('#toggle-velocity')).toBeVisible();

    // 2. Assert: The toggle is in the "off" state by default and no velocity vector is drawn on the canvas.
    await expect(page.locator('#radio-velocity-off')).toBeChecked();
    await expect(page.locator('#canvas-container')).toHaveScreenshot('velocity-vector-off.png');

    // 3. Action: Click the "on" option for the "velocity" toggle.
    await page.locator('label[for="radio-velocity-on"]').click();

    // 4. Assert: A dark red velocity vector appears on the canvas, originating from the point on the curve.
    await expect(page.locator('#radio-velocity-on')).toBeChecked();
    await expect(page.locator('#canvas-container')).toHaveScreenshot('velocity-vector-on.png');

    // 5. Action: Click the "off" option for the "velocity" toggle.
    await page.locator('label[for="radio-velocity-off"]').click();
    
    // 6. Assert: The velocity vector disappears from the canvas.
    await expect(page.locator('#radio-velocity-off')).toBeChecked();
    await expect(page.locator('#canvas-container')).toHaveScreenshot('velocity-vector-off.png');
  });

  test('Acceleration Vector Toggle Switch', async ({ page }) => {
    // 1. Assert: The "acceleration" toggle switch is visible.
    await expect(page.locator('#toggle-acceleration')).toBeVisible();

    // 2. Assert: The toggle is in the "on" state by default and a magenta acceleration vector is visible on the canvas.
    await expect(page.locator('#radio-acceleration-on')).toBeChecked();
    await expect(page.locator('#canvas-container')).toHaveScreenshot('acceleration-vector-on.png');

    // 3. Action: Click the "off" option for the "acceleration" toggle.
    await page.locator('label[for="radio-acceleration-off"]').click();

    // 4. Assert: The acceleration vector disappears from the canvas.
    await expect(page.locator('#radio-acceleration-off')).toBeChecked();
    await expect(page.locator('#canvas-container')).toHaveScreenshot('acceleration-vector-off.png');

    // 5. Action: Click the "on" option for the "acceleration" toggle.
    await page.locator('label[for="radio-acceleration-on"]').click();
    
    // 6. Assert: The acceleration vector reappears on the canvas.
    await expect(page.locator('#radio-acceleration-on')).toBeChecked();
    await expect(page.locator('#canvas-container')).toHaveScreenshot('acceleration-vector-on.png');
  });

  test('Coordinate System Dropdown Selector', async ({ page }) => {
    // 1. Assert: The "coordinate system" dropdown (`#select-coords`) is visible.
    await expect(page.locator('#select-coords')).toBeVisible();

    // 2. Assert: The dropdown's value is "rectangular" and the basis vectors `î` and `ĵ` are displayed on the canvas.
    await expect(page.locator('#select-coords')).toHaveValue('rectangular');
    await expect(page.locator('#canvas-container')).toHaveScreenshot('coords-rectangular.png');

    // 3. Action: Select "normal-tangential" from the dropdown.
    await page.locator('#select-coords').selectOption('normal-tangential');
    
    // 4. Assert: The basis vectors on the canvas change to `ê_T` and `ê_N`.
    await expect(page.locator('#select-coords')).toHaveValue('normal-tangential');
    await expect(page.locator('#canvas-container')).toHaveScreenshot('coords-normal-tangential.png');

    // 5. Action: Select "polar" from the dropdown.
    await page.locator('#select-coords').selectOption('polar');

    // 6. Assert: The basis vectors on the canvas change to `ê_r` and `ê_θ`.
    await expect(page.locator('#select-coords')).toHaveValue('polar');
    await expect(page.locator('#canvas-container')).toHaveScreenshot('coords-polar.png');
  });

  test('Instantaneous Circle Toggle Switch', async ({ page }) => {
    // 1. Assert: The "instantaneous circle" toggle switch is visible.
    await expect(page.locator('#toggle-circle')).toBeVisible();
    
    // 2. Assert: The toggle is in the "off" state by default and no dashed circle is visible on the canvas.
    await expect(page.locator('#radio-circle-off')).toBeChecked();
    await expect(page.locator('#canvas-container')).toHaveScreenshot('instantaneous-circle-off.png');

    // 3. Action: Click the "on" option for the "instantaneous circle" toggle.
    await page.locator('label[for="radio-circle-on"]').click();

    // 4. Assert: A dashed grey circle appears on the canvas.
    await expect(page.locator('#radio-circle-on')).toBeChecked();
    await expect(page.locator('#canvas-container')).toHaveScreenshot('instantaneous-circle-on.png');

    // 5. Action: Click the "off" option for the "instantaneous circle" toggle.
    await page.locator('label[for="radio-circle-off"]').click();

    // 6. Assert: The dashed grey circle disappears from the canvas.
    await expect(page.locator('#radio-circle-off')).toBeChecked();
    await expect(page.locator('#canvas-container')).toHaveScreenshot('instantaneous-circle-off.png');
  });
});