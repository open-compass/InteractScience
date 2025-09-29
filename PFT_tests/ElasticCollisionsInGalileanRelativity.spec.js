const { test, expect } = require('@playwright/test');

const fileUrl = 'file://' + require('path').resolve(__dirname, '../pages/ElasticCollisionsInGalileanRelativity.html');

test.beforeEach(async ({ page }) => {
  await page.goto(fileUrl);
  // Wait for the p5.js canvas to be present, as it's created dynamically
  // await page.waitForSelector('#canvas-container canvas');
  await page.waitForTimeout(500);
});

test.describe('Interactive Collision Simulation Tests', () => {

  test('Time Slider Interaction', async ({ page }) => {
    const timeSlider = page.locator('#slider-time');
    const timeLabel = page.locator('#label-time');
    const canvasContainer = page.locator('#canvas-container');

    // 1. Assert: The "time relative to collision" slider (`#slider-time`) is visible.
    await expect(timeSlider).toBeVisible();

    // 2. Assert: The slider's value is -10 and its corresponding label (`#label-time`) displays "-10 s".
    await expect(timeSlider).toHaveValue('-10');
    await expect(timeLabel).toHaveText('-10 s');

    const initialCanvas = await canvasContainer.screenshot();

    // 3. Action: Drag the time slider to a positive value (e.g., 20).
    await timeSlider.fill('20');

    // 4. Assert: The positions of the two particles on the canvas change, and the label (`#label-time`) updates to "20 s".
    // The displayed energy and velocity metrics on the canvas remain unchanged. (Visual change is asserted)
    await expect(timeLabel).toHaveText('20 s');
    await expect(canvasContainer).not.toHaveScreenshot(initialCanvas);

    const canvasAfterFirstChange = await canvasContainer.screenshot();

    // 5. Action: Drag the slider to its maximum value (30).
    await timeSlider.fill('30');

    // 6. Assert: The particles move to new positions along their trajectories, and the label updates to "30 s".
    await expect(timeLabel).toHaveText('30 s');
    await expect(canvasContainer).not.toHaveScreenshot(canvasAfterFirstChange);
  });

  test('Object 1 Mass Slider Interaction', async ({ page }) => {
    const massSlider = page.locator('#slider-m1');
    const massLabel = page.locator('#label-m1');
    const canvasContainer = page.locator('#canvas-container');

    // 1. Assert: The "object 1 mass" slider (`#slider-m1`) is visible.
    await expect(massSlider).toBeVisible();

    // 2. Assert: The slider's value is 5 and its label (`#label-m1`) displays "5. kg".
    await expect(massSlider).toHaveValue('5');
    await expect(massLabel).toHaveText('5. kg');

    const initialCanvas = await canvasContainer.screenshot();

    // 3. Action: Drag the mass slider to a lower value (e.g., 2).
    await massSlider.fill('2');

    // 4. Assert: The size of the red particle on the canvas decreases, and the displayed values for `v₁`, `v₂`, and energy change.
    await expect(massLabel).toHaveText('2. kg');
    await expect(canvasContainer).not.toHaveScreenshot(initialCanvas);

    const canvasAfterFirstChange = await canvasContainer.screenshot();

    // 5. Action: Drag the slider to its maximum value (10).
    await massSlider.fill('10');

    // 6. Assert: The size of the red particle increases, and the displayed `v₁`, `v₂`, and energy values change again.
    await expect(massLabel).toHaveText('10. kg');
    await expect(canvasContainer).not.toHaveScreenshot(canvasAfterFirstChange);
  });

  test('Object 1 Speed Slider Interaction', async ({ page }) => {
    const speedSlider = page.locator('#slider-v1');
    const speedLabel = page.locator('#label-v1');
    const canvasContainer = page.locator('#canvas-container');

    // 1. Assert: The "object 1 speed" slider (`#slider-v1`) is visible.
    await expect(speedSlider).toBeVisible();

    // 2. Assert: The slider's value is 10 and its label (`#label-v1`) displays "10. m/s".
    await expect(speedSlider).toHaveValue('10');
    await expect(speedLabel).toHaveText('10. m/s');

    const initialCanvas = await canvasContainer.screenshot();

    // 3. Action: Drag the speed slider to a higher value (e.g., 15).
    await speedSlider.fill('15');

    // 4. Assert: The trajectory lines on the canvas change their angle, and the displayed values for `v₁`, `v₂`, and energy are updated.
    await expect(speedLabel).toHaveText('15. m/s');
    await expect(canvasContainer).not.toHaveScreenshot(initialCanvas);

    const canvasAfterFirstChange = await canvasContainer.screenshot();

    // 5. Action: Drag the slider to its minimum value (1).
    await speedSlider.fill('1');

    // 6. Assert: The trajectory lines and the displayed `v₁`, `v₂`, and energy values change again.
    await expect(speedLabel).toHaveText('1. m/s');
    await expect(canvasContainer).not.toHaveScreenshot(canvasAfterFirstChange);
  });

  test('Object 2 Mass Slider Interaction', async ({ page }) => {
    const massSlider = page.locator('#slider-m2');
    const massLabel = page.locator('#label-m2');
    const canvasContainer = page.locator('#canvas-container');

    // 1. Assert: The "object 2 mass" slider (`#slider-m2`) is visible.
    await expect(massSlider).toBeVisible();

    // 2. Assert: The slider's value is 3 and its label (`#label-m2`) displays "3. kg".
    await expect(massSlider).toHaveValue('3');
    await expect(massLabel).toHaveText('3. kg');

    const initialCanvas = await canvasContainer.screenshot();

    // 3. Action: Drag the mass slider to a higher value (e.g., 7).
    await massSlider.fill('7');

    // 4. Assert: The size of the blue particle on the canvas increases, and the displayed values for `v₁`, `v₂`, and energy change.
    await expect(massLabel).toHaveText('7. kg');
    await expect(canvasContainer).not.toHaveScreenshot(initialCanvas);

    const canvasAfterFirstChange = await canvasContainer.screenshot();

    // 5. Action: Drag the slider to its minimum value (1).
    await massSlider.fill('1');

    // 6. Assert: The size of the blue particle decreases, and the displayed `v₁`, `v₂`, and energy values change again.
    await expect(massLabel).toHaveText('1. kg');
    await expect(canvasContainer).not.toHaveScreenshot(canvasAfterFirstChange);
  });

  test('Object 2 Speed Slider Interaction', async ({ page }) => {
    const speedSlider = page.locator('#slider-v2');
    const speedLabel = page.locator('#label-v2');
    const canvasContainer = page.locator('#canvas-container');

    // 1. Assert: The "object 2 speed" slider (`#slider-v2`) is visible.
    await expect(speedSlider).toBeVisible();

    // 2. Assert: The slider's value is 5 and its label (`#label-v2`) displays "5. m/s".
    await expect(speedSlider).toHaveValue('5');
    await expect(speedLabel).toHaveText('5. m/s');

    const initialCanvas = await canvasContainer.screenshot();

    // 3. Action: Drag the speed slider to a higher value (e.g., 15).
    await speedSlider.fill('15');

    // 4. Assert: The trajectory lines on the canvas change their angle, and the displayed values for `v₁`, `v₂`, and energy are updated.
    await expect(speedLabel).toHaveText('15. m/s');
    await expect(canvasContainer).not.toHaveScreenshot(initialCanvas);

    const canvasAfterFirstChange = await canvasContainer.screenshot();

    // 5. Action: Drag the slider to its minimum value (1).
    await speedSlider.fill('1');

    // 6. Assert: The trajectory lines and the displayed `v₁`, `v₂`, and energy values change again.
    await expect(speedLabel).toHaveText('1. m/s');
    await expect(canvasContainer).not.toHaveScreenshot(canvasAfterFirstChange);
  });

  test('Observer Velocity Joystick Interaction', async ({ page }) => {
    const joystickContainer = page.locator('#joystick-container');
    const joystickKnob = page.locator('#joystick-knob');
    const labelV0x = page.locator('#label-v0x');
    const labelV0y = page.locator('#label-v0y');
    const canvasContainer = page.locator('#canvas-container');

    // 1. Assert: The observer velocity joystick (`#joystick-container` and `#joystick-knob`) is visible.
    await expect(joystickContainer).toBeVisible();
    await expect(joystickKnob).toBeVisible();

    // 2. Assert: The labels #label-v0x and #label-v0y both display "1.1".
    await expect(labelV0x).toHaveText(/^1\.10*$/);
    await expect(labelV0y).toHaveText(/^1\.10*$/);

    const initialCanvas = await canvasContainer.screenshot();

    // 3. Action: Drag the joystick knob to a different position (e.g., the upper-left quadrant).
    await joystickKnob.dragTo(joystickContainer, { targetPosition: { x: 10, y: 10 } });

    // 4. Assert: The observer velocity vector on the canvas changes direction and length, the displayed metrics (`v₀`, `v₁`, `v₂`, energy) update, and the `v0x`/`v0y` labels change.
    await expect(labelV0x).not.toHaveText(/^1\.10*$/);
    await expect(labelV0y).not.toHaveText(/^1\.10*$/);
    await expect(canvasContainer).not.toHaveScreenshot(initialCanvas);

    const canvasAfterFirstDrag = await canvasContainer.screenshot();
    const labelV0xAfterFirstDrag = await labelV0x.textContent();
    const labelV0yAfterFirstDrag = await labelV0y.textContent();

    // 5. Action: Drag the joystick knob to the extreme bottom-right corner of its container.
    const joystickBox = await joystickContainer.boundingBox();
    await joystickKnob.dragTo(joystickContainer, { targetPosition: { x: joystickBox.width - 1, y: joystickBox.height - 1 } });
    
    // 6. Assert: The observer velocity vector, displayed metrics, and `v0x`/`v0y` labels all update to reflect the new boundary state.
    await expect(labelV0x).not.toHaveText(labelV0xAfterFirstDrag);
    await expect(labelV0y).not.toHaveText(labelV0yAfterFirstDrag);
    await expect(canvasContainer).not.toHaveScreenshot(canvasAfterFirstDrag);
  });

});