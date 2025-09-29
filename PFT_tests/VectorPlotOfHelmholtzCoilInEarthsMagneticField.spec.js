const { test, expect } = require('@playwright/test');

const fileUrl = 'file://' + require('path').resolve(__dirname, '../pages/VectorPlotOfHelmholtzCoilInEarthsMagneticField.html');

test.beforeEach(async ({ page }) => {
  await page.goto(fileUrl);
  await page.waitForTimeout(500);
});

test('Current (A) Slider', async ({ page }) => {
  // 1. Assert: The slider with ID `slider-current` is visible.
  const slider = page.locator('#slider-current');
  await expect(slider).toBeVisible();

  // 2. Assert: The slider's value is `0.431` and its corresponding value display `value-current` shows `0.431`.
  const valueDisplay = page.locator('#value-current');
  await expect(slider).toHaveValue('0.431');
  await expect(valueDisplay).toHaveText(/^0\.4310*$/);

  const canvas = page.locator('#p5-canvas');
  const initialCanvas = await canvas.screenshot();

  // 3. Action: Drag the slider to a new value, such as `0.7`.
  await slider.fill('0.7');

  // 4. Assert: The `value-current` span updates to `0.7`, and the vector plot on the canvas is redrawn.
  await expect(valueDisplay).toHaveText(/^0\.70*$/);
  await expect(slider).toHaveValue('0.7');
  const canvasAfterFirstChange = await canvas.screenshot();
  expect(canvasAfterFirstChange).not.toEqual(initialCanvas);

  // 5. Action: Drag the slider to its maximum value of `1`.
  await slider.fill('1');

  // 6. Assert: The `value-current` span updates to `1`, and the vector plot on the canvas is redrawn.
  await expect(valueDisplay).toHaveText('1');
  await expect(slider).toHaveValue('1');
  const canvasAfterSecondChange = await canvas.screenshot();
  expect(canvasAfterSecondChange).not.toEqual(canvasAfterFirstChange);
});

test('Horizontal Earth Field (T) Slider', async ({ page }) => {
  // 1. Assert: The slider with ID `slider-earth-field` is visible.
  const slider = page.locator('#slider-earth-field');
  await expect(slider).toBeVisible();

  // 2. Assert: The slider's value is `0.0000194` and its corresponding value display `value-earth-field` shows `0.0000194`.
  const valueDisplay = page.locator('#value-earth-field');
  await expect(slider).toHaveValue('0.0000194');
  await expect(valueDisplay).toHaveText(/^0\.00001940*$/);

  const canvas = page.locator('#p5-canvas');
  const initialCanvas = await canvas.screenshot();

  // 3. Action: Drag the slider to a new value, such as `0.00005`.
  await slider.fill('0.00005');

  // 4. Assert: The `value-earth-field` span updates to `0.00005`, and the vector plot on the canvas is redrawn.
  await expect(valueDisplay).toHaveText(/^0\.000050*$/);
  await expect(slider).toHaveValue('0.00005');
  const canvasAfterFirstChange = await canvas.screenshot();
  expect(canvasAfterFirstChange).not.toEqual(initialCanvas);

  // 5. Action: Drag the slider to its minimum value of `0`.
  await slider.fill('0');

  // 6. Assert: The `value-earth-field` span updates to `0`, and the vector plot on the canvas is redrawn.
  await expect(valueDisplay).toHaveText('0');
  await expect(slider).toHaveValue('0');
  const canvasAfterSecondChange = await canvas.screenshot();
  expect(canvasAfterSecondChange).not.toEqual(canvasAfterFirstChange);
});

test('Radius (m) Slider', async ({ page }) => {
  // 1. Assert: The slider with ID `slider-radius` is visible.
  const slider = page.locator('#slider-radius');
  await expect(slider).toBeVisible();

  // 2. Assert: The slider's value is `0.5` and its corresponding value display `value-radius` shows `0.5`.
  const valueDisplay = page.locator('#value-radius');
  await expect(slider).toHaveValue('0.5');
  await expect(valueDisplay).toHaveText(/^0\.50*$/);

  const canvas = page.locator('#p5-canvas');
  const initialCanvas = await canvas.screenshot();

  // 3. Action: Drag the slider to a new value, such as `0.25`.
  await slider.fill('0.25');

  // 4. Assert: The `value-radius` span updates to `0.25`, and the vector plot on the canvas is redrawn.
  await expect(valueDisplay).toHaveText(/^0\.250*$/);
  await expect(slider).toHaveValue('0.25');
  const canvasAfterFirstChange = await canvas.screenshot();
  expect(canvasAfterFirstChange).not.toEqual(initialCanvas);

  // 5. Action: Drag the slider to its minimum value of `0.1`.
  await slider.fill('0.1');

  // 6. Assert: The `value-radius` span updates to `0.1`, and the vector plot on the canvas is redrawn.
  await expect(valueDisplay).toHaveText(/^0\.10*$/);
  await expect(slider).toHaveValue('0.1');
  const canvasAfterSecondChange = await canvas.screenshot();
  expect(canvasAfterSecondChange).not.toEqual(canvasAfterFirstChange);
});

test('Number of Turns Slider', async ({ page }) => {
  // 1. Assert: The slider with ID `slider-turns` is visible.
  const slider = page.locator('#slider-turns');
  await expect(slider).toBeVisible();

  // 2. Assert: The slider's value is `25` and its corresponding value display `value-turns` shows `25`.
  const valueDisplay = page.locator('#value-turns');
  await expect(slider).toHaveValue('25');
  await expect(valueDisplay).toHaveText('25');

  const canvas = page.locator('#p5-canvas');
  const initialCanvas = await canvas.screenshot();

  // 3. Action: Drag the slider to a new value, such as `75`.
  await slider.fill('75');

  // 4. Assert: The `value-turns` span updates to `75`, and the vector plot on the canvas is redrawn.
  await expect(valueDisplay).toHaveText('75');
  await expect(slider).toHaveValue('75');
  const canvasAfterFirstChange = await canvas.screenshot();
  expect(canvasAfterFirstChange).not.toEqual(initialCanvas);

  // 5. Action: Drag the slider to its minimum value of `1`.
  await slider.fill('1');

  // 6. Assert: The `value-turns` span updates to `1`, and the vector plot on the canvas is redrawn.
  await expect(valueDisplay).toHaveText('1');
  await expect(slider).toHaveValue('1');
  const canvasAfterSecondChange = await canvas.screenshot();
  expect(canvasAfterSecondChange).not.toEqual(canvasAfterFirstChange);
});

test('Reset Button', async ({ page }) => {
  // 1. Assert: The button with ID `btn-reset` is visible.
  const resetButton = page.locator('#btn-reset');
  await expect(resetButton).toBeVisible();

  // 2. Assert: All sliders are at their initial values (e.g., `slider-current` is `0.431`).
  const currentSlider = page.locator('#slider-current');
  const radiusSlider = page.locator('#slider-radius');
  await expect(currentSlider).toHaveValue('0.431');
  await expect(page.locator('#value-current')).toHaveText(/^0\.4310*$/);
  await expect(radiusSlider).toHaveValue('0.5');
  await expect(page.locator('#value-radius')).toHaveText(/^0\.50*$/);

  // 3. Action: Change the value of `slider-current` to `0.8` and `slider-radius` to `0.9`.
  await currentSlider.fill('0.8');
  await radiusSlider.fill('0.9');

  // 4. Assert: The `value-current` span shows `0.8`, `value-radius` shows `0.9`, and the canvas has updated.
  const currentValueDisplay = page.locator('#value-current');
  const radiusValueDisplay = page.locator('#value-radius');
  await expect(currentValueDisplay).toHaveText(/^0\.80*$/);
  await expect(radiusValueDisplay).toHaveText(/^0\.90*$/);
  const canvas = page.locator('#p5-canvas');
  const canvasBeforeReset = await canvas.screenshot();

  // 5. Action: Click the `btn-reset` button.
  await resetButton.click();

  // 6. Assert: `slider-current` resets to `0.431`, `slider-radius` resets to `0.5`, their value displays update, and the vector plot is redrawn to its initial state.
  await expect(currentSlider).toHaveValue('0.431');
  await expect(radiusSlider).toHaveValue('0.5');
  await expect(currentValueDisplay).toHaveText(/^0\.4310*$/);
  await expect(radiusValueDisplay).toHaveText(/^0\.50*$/);
  const canvasAfterReset = await canvas.screenshot();
  expect(canvasAfterReset).not.toEqual(canvasBeforeReset);
});