const { test, expect } = require('@playwright/test');
const fileUrl = 'file://' + require('path').resolve(__dirname, '../pages/EllipticParaboloid.html');

test.describe('Elliptic Paraboloid Visualization', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(fileUrl);
    // Wait for canvas to be potentially populated by the script
    // await page.waitForSelector('#canvas-container canvas', { state: 'attached' });
    await page.waitForTimeout(500);
  });

  test('"a" Semi-Axis Slider Control', async ({ page }) => {
    // 1. Assert: The slider with id `slider-a` is visible.
    const sliderA = page.locator('#slider-a');
    await expect(sliderA).toBeVisible();

    // 2. Assert: The value of `slider-a` is 1.5, and the corresponding number input `input-a` displays "1.5".
    const inputA = page.locator('#input-a');
    await expect(sliderA).toHaveValue('1.5');
    await expect(inputA).toHaveValue('1.5');

    const canvas = page.locator('#canvas-container canvas');
    const initialCanvasScreenshot = await canvas.screenshot();

    // 3. Action: Drag the `slider-a` to a new value of 3.0.
    await sliderA.fill('3');

    // 4. Assert: The `input-a` value updates to "3.0", and the 3D visualization of the paraboloid changes shape.
    await expect(inputA).toHaveValue('3.0');
    await expect(canvas).not.toHaveScreenshot(initialCanvasScreenshot);

    const midCanvasScreenshot = await canvas.screenshot();

    // 5. Action: Drag the `slider-a` to its maximum value of 5.0.
    await sliderA.fill('5');

    // 6. Assert: The `input-a` value updates to "5.0", and the 3D visualization changes again.
    await expect(inputA).toHaveValue('5.0');
    await expect(canvas).not.toHaveScreenshot(midCanvasScreenshot);
  });

  test('"b" Semi-Axis Slider Control', async ({ page }) => {
    // 1. Assert: The slider with id `slider-b` is visible.
    const sliderB = page.locator('#slider-b');
    await expect(sliderB).toBeVisible();

    // 2. Assert: The value of `slider-b` is 1.5, and the corresponding number input `input-b` displays "1.5".
    const inputB = page.locator('#input-b');
    await expect(sliderB).toHaveValue('1.5');
    await expect(inputB).toHaveValue('1.5');

    const canvas = page.locator('#canvas-container canvas');
    const initialCanvasScreenshot = await canvas.screenshot();

    // 3. Action: Drag the `slider-b` to a new value of 3.0.
    await sliderB.fill('3');

    // 4. Assert: The `input-b` value updates to "3.0", and the 3D visualization of the paraboloid changes shape.
    await expect(inputB).toHaveValue('3.0');
    await expect(canvas).not.toHaveScreenshot(initialCanvasScreenshot);

    const midCanvasScreenshot = await canvas.screenshot();

    // 5. Action: Drag the `slider-b` to its minimum value of 0.1.
    await sliderB.fill('0.1');

    // 6. Assert: The `input-b` value updates to "0.1", and the 3D visualization changes again.
    await expect(inputB).toHaveValue('0.1');
    await expect(canvas).not.toHaveScreenshot(midCanvasScreenshot);
  });

  test('"c" Paraboloid Height Slider Control', async ({ page }) => {
    // 1. Assert: The slider with id `slider-c` is visible.
    const sliderC = page.locator('#slider-c');
    await expect(sliderC).toBeVisible();

    // 2. Assert: The value of `slider-c` is 1.0, and the corresponding number input `input-c` displays "1.0".
    const inputC = page.locator('#input-c');
    await expect(sliderC).toHaveValue('1.0');
    await expect(inputC).toHaveValue('1.0');

    const canvas = page.locator('#canvas-container canvas');
    const initialCanvasScreenshot = await canvas.screenshot();

    // 3. Action: Drag the `slider-c` to a new value of 3.0.
    await sliderC.fill('3');

    // 4. Assert: The `input-c` value updates to "3.0", and the 3D visualization of the paraboloid changes shape.
    await expect(inputC).toHaveValue('3.0');
    await expect(canvas).not.toHaveScreenshot(initialCanvasScreenshot);

    const midCanvasScreenshot = await canvas.screenshot();

    // 5. Action: Drag the `slider-c` to its maximum value of 5.0.
    await sliderC.fill('5');

    // 6. Assert: The `input-c` value updates to "5.0", and the 3D visualization changes again.
    await expect(inputC).toHaveValue('5.0');
    await expect(canvas).not.toHaveScreenshot(midCanvasScreenshot);
  });
});