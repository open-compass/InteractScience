const { test, expect } = require('@playwright/test');

const fileUrl = 'file://' + require('path').resolve(__dirname, '../pages/VibrationsOfAHangingString.html');

test.beforeEach(async ({ page }) => {
  await page.goto(fileUrl);
  // Wait for the canvas to be rendered by p5.js
  // await page.waitForSelector('#canvas-container canvas');
  await page.waitForTimeout(500);
});

test.describe('Vibrations of a Hanging String', () => {

  test('Time Slider (`t`) Control', async ({ page }) => {
    const tSlider = page.locator('#slider-t');
    const tValueDisplay = page.locator('#t-value-display');
    const canvas = page.locator('#canvas-container canvas');

    // 1. Assert: The slider with id="slider-t" is visible.
    await expect(tSlider).toBeVisible();

    // 2. Assert: The slider's value is `0.1` and the `t-value-display` span shows "0.10".
    await expect(tSlider).toHaveValue('0.1');
    await expect(tValueDisplay).toHaveText(/^0\.100*$/);

    const canvasBeforeInteraction = await canvas.screenshot();

    // 3. Action: Drag the `slider-t` to a value of `2.5`.
    await tSlider.fill('2.5');

    // 4. Assert: The `t-value-display` span updates to "2.50" and the string visualization on the canvas changes.
    await expect(tValueDisplay).toHaveText(/^2\.500*$/);
    const canvasAfterFirstInteraction = await canvas.screenshot();
    expect(canvasAfterFirstInteraction).not.toEqual(canvasBeforeInteraction);

    // 5. Action: Drag the `slider-t` to its maximum value, `4`.
    await tSlider.fill('4');

    // 6. Assert: The `t-value-display` span updates to "4.00" and the string visualization on the canvas changes again.
    await expect(tValueDisplay).toHaveText(/^4\.000*$/);
    const canvasAfterSecondInteraction = await canvas.screenshot();
    expect(canvasAfterSecondInteraction).not.toEqual(canvasAfterFirstInteraction);
  });

  test('Mode Slider (`k`) Control', async ({ page }) => {
    const kSlider = page.locator('#slider-k');
    const kValueDisplay = page.locator('#k-value-display');
    const formulaDisplay = page.locator('#formula-display');
    const canvas = page.locator('#canvas-container canvas');

    // 1. Assert: The slider with id="slider-k" is visible.
    await expect(kSlider).toBeVisible();

    // 2. Assert: The slider's value is `2`, the `k-value-display` span shows "2", and the `formula-display` contains the subscript `₂`.
    await expect(kSlider).toHaveValue('2');
    await expect(kValueDisplay).toHaveText('2');
    await expect(formulaDisplay).toContainText('ω₂'); // MathJax renders subscript 2 as ₂

    const canvasBeforeInteraction = await canvas.screenshot();

    // 3. Action: Drag the `slider-k` to a value of `3`.
    await kSlider.fill('3');

    // 4. Assert: The `k-value-display` span updates to "3", the `formula-display` updates to contain the subscript `₃`, and the shape of the string on the canvas changes.
    await expect(kValueDisplay).toHaveText('3');
    await expect(formulaDisplay).toContainText('ω₃');
    const canvasAfterFirstInteraction = await canvas.screenshot();
    expect(canvasAfterFirstInteraction).not.toEqual(canvasBeforeInteraction);

    // 5. Action: Drag the `slider-k` to its minimum value, `1`.
    await kSlider.fill('1');

    // 6. Assert: The `k-value-display` span updates to "1", the `formula-display` updates to contain the subscript `₁`, and the shape of the string on the canvas changes.
    await expect(kValueDisplay).toHaveText('1');
    await expect(formulaDisplay).toContainText('ω₁');
    const canvasAfterSecondInteraction = await canvas.screenshot();
    expect(canvasAfterSecondInteraction).not.toEqual(canvasAfterFirstInteraction);
  });

  test('Axes Visibility Checkbox', async ({ page }) => {
    const axesCheckbox = page.locator('#checkbox-axes');
    const canvas = page.locator('#canvas-container canvas');

    // 1. Assert: The checkbox with id="checkbox-axes" is visible.
    await expect(axesCheckbox).toBeVisible();

    // 2. Assert: The checkbox is in a 'checked' state and the plot axes are visible on the canvas.
    await expect(axesCheckbox).toBeChecked();
    const canvasWithAxes = await canvas.screenshot();

    // 3. Action: Click the `checkbox-axes` to uncheck it.
    await axesCheckbox.click();

    // 4. Assert: The checkbox is in an 'unchecked' state and the plot axes are no longer visible on the canvas.
    await expect(axesCheckbox).not.toBeChecked();
    const canvasWithoutAxes = await canvas.screenshot();
    expect(canvasWithoutAxes).not.toEqual(canvasWithAxes);

    // 5. Action: Click the `checkbox-axes` again to re-check it.
    await axesCheckbox.click();

    // 6. Assert: The checkbox is in a 'checked' state and the plot axes reappear on the canvas.
    await expect(axesCheckbox).toBeChecked();
    const canvasWithAxesAgain = await canvas.screenshot();
    expect(canvasWithAxesAgain).toEqual(canvasWithAxes);
  });
});