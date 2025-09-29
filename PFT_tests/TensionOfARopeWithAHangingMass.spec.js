const { test, expect } = require('@playwright/test');

const fileUrl = 'file://' + require('path').resolve(__dirname, '../pages/TensionOfARopeWithAHangingMass.html');

test.beforeEach(async ({ page }) => {
  await page.goto(fileUrl);
  // Wait for the canvas to be rendered by p5.js
  // await page.waitForSelector('canvas');
  await page.waitForTimeout(500);
});

test('Test Mass Slider Interaction', async ({ page }) => {
  const massSlider = page.locator('#slider-m');
  const massLabel = page.locator('#label-m');
  const canvas = page.locator('canvas');

  // 1. Assert: The mass slider with id `slider-m` is visible.
  await expect(massSlider).toBeVisible();

  // 2. Assert: The slider's value is `2.845` and its corresponding value display `label-m` shows "2.845".
  await expect(massSlider).toHaveValue('2.845');
  await expect(massLabel).toHaveText(/^2\.8450*$/);
  const initialCanvasScreenshot = await canvas.screenshot();

  // 3. Action: Drag the slider to a value of `5.0`.
  await massSlider.fill('5');

  // 4. Assert: The `label-m` display updates to "5.0" and the `T₁` and `T₂` tension values on the canvas change.
  await expect(massLabel).toHaveText(/^5\.00*$/);
  const updatedCanvasScreenshot = await canvas.screenshot();
  expect(updatedCanvasScreenshot).not.toEqual(initialCanvasScreenshot);

  // 5. Action: Drag the slider to its maximum value, `10`.
  await massSlider.fill('10');

  // 6. Assert: The `label-m` display updates to "10" and the tension values on the canvas update again.
  await expect(massLabel).toHaveText('10');
  const maxValCanvasScreenshot = await canvas.screenshot();
  expect(maxValCanvasScreenshot).not.toEqual(updatedCanvasScreenshot);
});

test('Test Horizontal Position Slider Interaction', async ({ page }) => {
  const xSlider = page.locator('#slider-x');
  const xLabel = page.locator('#label-x');
  const canvas = page.locator('canvas');

  // 1. Assert: The horizontal position slider with id `slider-x` is visible.
  await expect(xSlider).toBeVisible();

  // 2. Assert: The slider's value is `4.1` and its corresponding value display `label-x` shows "4.1".
  await expect(xSlider).toHaveValue('4.1');
  await expect(xLabel).toHaveText(/^4\.10*$/);
  const initialCanvasScreenshot = await canvas.screenshot();

  // 3. Action: Drag the slider to a value of `7.0`.
  await xSlider.fill('7');

  // 4. Assert: The `label-x` display updates to "7.0" and the horizontal position of the hanging mass in the canvas diagram changes.
  await expect(xLabel).toHaveText(/^7\.00*$/);
  const updatedCanvasScreenshot = await canvas.screenshot();
  expect(updatedCanvasScreenshot).not.toEqual(initialCanvasScreenshot);

  // 5. Action: Drag the slider to its minimum value, `0`.
  await xSlider.fill('0');

  // 6. Assert: The `label-x` display updates to "0" and the hanging mass moves to the far left of the diagram.
  await expect(xLabel).toHaveText('0');
  const minValCanvasScreenshot = await canvas.screenshot();
  expect(minValCanvasScreenshot).not.toEqual(updatedCanvasScreenshot);
});

test('Test Vertical Position Slider Interaction', async ({ page }) => {
  const ySlider = page.locator('#slider-y');
  const yLabel = page.locator('#label-y');
  const canvas = page.locator('canvas');

  // 1. Assert: The vertical position slider with id `slider-y` is visible.
  await expect(ySlider).toBeVisible();

  // 2. Assert: The slider's value is `1.498` and its corresponding value display `label-y` shows "1.498".
  await expect(ySlider).toHaveValue('1.498');
  await expect(yLabel).toHaveText(/^1\.4980*$/);
  const initialCanvasScreenshot = await canvas.screenshot();

  // 3. Action: Drag the slider to a value of `3.0`.
  await ySlider.fill('3');

  // 4. Assert: The `label-y` display updates to "3.0" and the vertical position of the hanging mass in the canvas diagram changes.
  await expect(yLabel).toHaveText(/^3\.00*$/);
  const updatedCanvasScreenshot = await canvas.screenshot();
  expect(updatedCanvasScreenshot).not.toEqual(initialCanvasScreenshot);

  // 5. Action: Drag the slider to its minimum value, `0.1`.
  await ySlider.fill('0.1');

  // 6. Assert: The `label-y` display updates to "0.1" and the hanging mass moves to its highest possible position in the diagram.
  await expect(yLabel).toHaveText(/^0\.10*$/);
  const minValCanvasScreenshot = await canvas.screenshot();
  expect(minValCanvasScreenshot).not.toEqual(updatedCanvasScreenshot);
});