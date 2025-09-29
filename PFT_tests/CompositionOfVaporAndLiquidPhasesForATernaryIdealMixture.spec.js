const { test, expect } = require('@playwright/test');

const fileUrl = 'file://' + require('path').resolve(__dirname, '../pages/CompositionOfVaporAndLiquidPhasesForATernaryIdealMixture.html');

test.describe('Composition of Vapor and Liquid Phases for a Ternary Ideal Mixture', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(fileUrl);
    await page.waitForTimeout(500);
  });

  test('Relative Volatility Slider for A and C', async ({ page }) => {
    // 1. Assert: The "between A and C" slider (`#slider-ac`) is visible on the page.
    const sliderAC = page.locator('#slider-ac');
    await expect(sliderAC).toBeVisible();

    // 2. Assert: The slider's value is `0.6` and its corresponding value display (`#value-ac`) shows "0.60".
    await expect(sliderAC).toHaveValue('0.6');
    const valueAC = page.locator('#value-ac');
    await expect(valueAC).toHaveText(/^0\.600*$/);
    const initialCanvas = await page.locator('#ternary-plot-canvas').screenshot();

    // 3. Action: Drag the slider to a value of approximately `1.5`.
    await sliderAC.fill('1.5');

    // 4. Assert: The `#value-ac` display updates to "1.50" and the `ternary-plot-canvas` content changes.
    await expect(valueAC).toHaveText(/^1\.500*$/);
    const canvasAfterFirstChange = await page.locator('#ternary-plot-canvas').screenshot();
    expect(canvasAfterFirstChange).not.toEqual(initialCanvas);

    // 5. Action: Drag the slider to its maximum value, `5.0`.
    await sliderAC.fill('5');

    // 6. Assert: The `#value-ac` display updates to "5.00" and the `ternary-plot-canvas` content changes again.
    await expect(valueAC).toHaveText(/^5\.000*$/);
    const canvasAfterSecondChange = await page.locator('#ternary-plot-canvas').screenshot();
    expect(canvasAfterSecondChange).not.toEqual(canvasAfterFirstChange);
  });

  test('Relative Volatility Slider for B and C', async ({ page }) => {
    // 1. Assert: The "between B and C" slider (`#slider-bc`) is visible on the page.
    const sliderBC = page.locator('#slider-bc');
    await expect(sliderBC).toBeVisible();

    // 2. Assert: The slider's value is `3.93` and its corresponding value display (`#value-bc`) shows "3.93".
    await expect(sliderBC).toHaveValue('3.93');
    const valueBC = page.locator('#value-bc');
    await expect(valueBC).toHaveText(/^3\.930*$/);
    const initialCanvas = await page.locator('#ternary-plot-canvas').screenshot();

    // 3. Action: Drag the slider to a value of approximately `1.0`.
    await sliderBC.fill('1');

    // 4. Assert: The `#value-bc` display updates to "1.00" and the `ternary-plot-canvas` content changes.
    await expect(valueBC).toHaveText(/^1\.000*$/);
    const canvasAfterFirstChange = await page.locator('#ternary-plot-canvas').screenshot();
    expect(canvasAfterFirstChange).not.toEqual(initialCanvas);

    // 5. Action: Drag the slider to its minimum value, `0.1`.
    await sliderBC.fill('0.1');

    // 6. Assert: The `#value-bc` display updates to "0.10" and the `ternary-plot-canvas` content changes again.
    await expect(valueBC).toHaveText(/^0\.100*$/);
    const canvasAfterSecondChange = await page.locator('#ternary-plot-canvas').screenshot();
    expect(canvasAfterSecondChange).not.toEqual(canvasAfterFirstChange);
  });

  test('Reset Button', async ({ page }) => {
    // 1. Assert: The reset button (`#btn-reset`) is visible.
    const resetButton = page.locator('#btn-reset');
    await expect(resetButton).toBeVisible();

    // 2. Assert: The sliders `#slider-ac` and `#slider-bc` are at their default values of `0.6` and `3.93`, respectively.
    const sliderAC = page.locator('#slider-ac');
    const sliderBC = page.locator('#slider-bc');
    await expect(sliderAC).toHaveValue('0.6');
    await expect(sliderBC).toHaveValue('3.93');
    const initialCanvas = await page.locator('#ternary-plot-canvas').screenshot();

    // 3. Action: Change the values of `#slider-ac` to `2.0` and `#slider-bc` to `1.5`.
    await sliderAC.fill('2');
    await sliderBC.fill('1.5');

    // 4. Assert: The value displays `#value-ac` and `#value-bc` show "2.00" and "1.50", and the `ternary-plot-canvas` updates.
    const valueAC = page.locator('#value-ac');
    const valueBC = page.locator('#value-bc');
    await expect(valueAC).toHaveText(/^2\.000*$/);
    await expect(valueBC).toHaveText(/^1\.500*$/);
    const modifiedCanvas = await page.locator('#ternary-plot-canvas').screenshot();
    expect(modifiedCanvas).not.toEqual(initialCanvas);

    // 5. Action: Click the reset button (`#btn-reset`).
    await resetButton.click();

    // 6. Assert: The sliders and value displays are restored to their default values (`0.60` and `3.93`), and the `ternary-plot-canvas` content reverts to its initial state.
    await expect(sliderAC).toHaveValue('0.6');
    await expect(sliderBC).toHaveValue('3.93');
    await expect(valueAC).toHaveText(/^0\.600*$/);
    await expect(valueBC).toHaveText(/^3\.930*$/);
    const resetCanvas = await page.locator('#ternary-plot-canvas').screenshot();
    expect(resetCanvas).toEqual(initialCanvas);
  });

});