const { test, expect } = require('@playwright/test');

const fileUrl = 'file://' + require('path').resolve(__dirname, '../pages/ThePlemeljConstructionOfATriangle15.html');

test.describe('The Plemelj Construction of a Triangle', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(fileUrl);
    await page.waitForTimeout(500);
  });

  test('Slider for parameter "c"', async ({ page }) => {
    // 1. Assert: The slider with id `slider-c` is visible.
    await expect(page.locator('#slider-c')).toBeVisible();

    // 2. Assert: The slider's value is `4` and its corresponding value display `c-value` shows "4".
    await expect(page.locator('#slider-c')).toHaveValue('4');
    await expect(page.locator('#c-value')).toHaveText('4');
    const initialCanvas = await page.locator('canvas').screenshot();

    // 3. Action: Drag the slider to a new value, e.g., `7.0`.
    await page.locator('#slider-c').fill('7');

    // 4. Assert: The `c-value` display updates to "7.0", and the visualization on the canvas changes (e.g., points A, B, D, K move).
    await expect(page.locator('#c-value')).toHaveText('7');
    await expect(page.locator('canvas')).not.toHaveScreenshot(initialCanvas);
    const intermediateCanvas = await page.locator('canvas').screenshot();

    // 5. Action: Drag the slider to its maximum value, `10`.
    await page.locator('#slider-c').fill('10');

    // 6. Assert: The `c-value` display updates to "10", and the canvas redraws.
    await expect(page.locator('#c-value')).toHaveText('10');
    await expect(page.locator('canvas')).not.toHaveScreenshot(intermediateCanvas);
  });

  test('Slider for parameter "h_C"', async ({ page }) => {
    // 1. Assert: The slider with id `slider-h_C` is visible.
    await expect(page.locator('#slider-h_C')).toBeVisible();

    // 2. Assert: The slider's value is `1.9` and its corresponding value display `h_C-value` shows "1.9".
    await expect(page.locator('#slider-h_C')).toHaveValue('1.9');
    await expect(page.locator('#h_C-value')).toHaveText(/^1\.90*$/);
    const initialCanvas = await page.locator('canvas').screenshot();

    // 3. Action: Drag the slider to a new value, e.g., `3.5`.
    await page.locator('#slider-h_C').fill('3.5');

    // 4. Assert: The `h_C-value` display updates to "3.5", and the visualization on the canvas changes (e.g., point C's height changes).
    await expect(page.locator('#h_C-value')).toHaveText(/^3\.50*$/);
    await expect(page.locator('canvas')).not.toHaveScreenshot(initialCanvas);
    const intermediateCanvas = await page.locator('canvas').screenshot();

    // 5. Action: Drag the slider to its minimum value, `0.1`.
    await page.locator('#slider-h_C').fill('0.1');

    // 6. Assert: The `h_C-value` display updates to "0.1", and the canvas redraws.
    await expect(page.locator('#h_C-value')).toHaveText(/^0\.10*$/);
    await expect(page.locator('canvas')).not.toHaveScreenshot(intermediateCanvas);
  });

  test('Slider for parameter "δ = α - β"', async ({ page }) => {
    // 1. Assert: The slider with id `slider-delta` is visible.
    await expect(page.locator('#slider-delta')).toBeVisible();

    // 2. Assert: The slider's value is `0.5` and its corresponding value display `delta-value` shows "0.5".
    await expect(page.locator('#slider-delta')).toHaveValue('0.5');
    await expect(page.locator('#delta-value')).toHaveText(/^0\.50*$/);
    const initialCanvas = await page.locator('canvas').screenshot();

    // 3. Action: Drag the slider to a new value, e.g., `1.2`.
    await page.locator('#slider-delta').fill('1.2');

    // 4. Assert: The `delta-value` display updates to "1.2", and the visualization on the canvas changes (e.g., point M and arc κ change).
    await expect(page.locator('#delta-value')).toHaveText(/^1\.20*$/);
    await expect(page.locator('canvas')).not.toHaveScreenshot(initialCanvas);
    const intermediateCanvas = await page.locator('canvas').screenshot();

    // 5. Action: Drag the slider to its minimum value, `-1.5`.
    await page.locator('#slider-delta').fill('-1.5');

    // 6. Assert: The `delta-value` display updates to "-1.5", and the canvas redraws.
    await expect(page.locator('#delta-value')).toHaveText(/^\-1\.50*$/);
    await expect(page.locator('canvas')).not.toHaveScreenshot(intermediateCanvas);
  });

  test('Radio buttons for "steps"', async ({ page }) => {
    // 1. Assert: The radio button group for "steps" is visible.
    await expect(page.locator('#step1')).toBeVisible();
    await expect(page.locator('#step2')).toBeVisible();
    await expect(page.locator('#step3')).toBeVisible();
    await expect(page.locator('#step4')).toBeVisible();
    await expect(page.locator('#step5')).toBeVisible();

    // 2. Assert: The radio button for "5" is selected by default, and the complete triangle ABC is visible.
    await expect(page.locator('#step5')).toBeChecked();
    const step5Canvas = await page.locator('canvas').screenshot();

    // 3. Action: Click the radio button for "2".
    await page.locator('label[for="step2"]').click();

    // 4. Assert: The radio button for "2" becomes selected, and the visualization updates to hide elements from later steps (e.g., triangle ABC is hidden, but arc κ is visible).
    await expect(page.locator('#step2')).toBeChecked();
    await expect(page.locator('canvas')).not.toHaveScreenshot(step5Canvas);
    const step2Canvas = await page.locator('canvas').screenshot();

    // 5. Action: Click the radio button for "1".
    await page.locator('label[for="step1"]').click();

    // 6. Assert: The radio button for "1" becomes selected, and the visualization updates to show only elements from step 1 (e.g., points F, C, D are visible).
    await expect(page.locator('#step1')).toBeChecked();
    await expect(page.locator('canvas')).not.toHaveScreenshot(step2Canvas);
  });

  test('Checkbox for "verification"', async ({ page }) => {
    // 1. Assert: The checkbox with id `check-verification` is visible.
    await expect(page.locator('#check-verification')).toBeVisible();

    // 2. Assert: The checkbox is checked by default, and verification geometry (point E, dashed lines CE, KB) is visible on the canvas.
    await expect(page.locator('#check-verification')).toBeChecked();
    const verificationOnCanvas = await page.locator('canvas').screenshot();

    // 3. Action: Uncheck the "verification" checkbox.
    await page.locator('#check-verification').uncheck();

    // 4. Assert: The checkbox is now unchecked, and the verification geometry is no longer visible on the canvas.
    await expect(page.locator('#check-verification')).not.toBeChecked();
    await expect(page.locator('canvas')).not.toHaveScreenshot(verificationOnCanvas);

    // 5. Action: Check the "verification" checkbox again.
    await page.locator('#check-verification').check();

    // 6. Assert: The checkbox is checked, and the verification geometry reappears on the canvas.
    await expect(page.locator('#check-verification')).toBeChecked();
    await expect(page.locator('canvas')).toHaveScreenshot(verificationOnCanvas);
  });

  test('Slider for "plot range"', async ({ page }) => {
    // 1. Assert: The slider with id `slider-plot-range` is visible.
    await expect(page.locator('#slider-plot-range')).toBeVisible();

    // 2. Assert: The slider's value is `1` and its corresponding value display `plot-range-value` shows "1".
    await expect(page.locator('#slider-plot-range')).toHaveValue('1');
    await expect(page.locator('#plot-range-value')).toHaveText('1');
    const initialCanvas = await page.locator('canvas').screenshot();

    // 3. Action: Drag the slider to a new value, e.g., `1.5`.
    await page.locator('#slider-plot-range').fill('1.5');

    // 4. Assert: The `plot-range-value` display updates to "1.5", and the visualization on the canvas appears larger (zoomed in).
    await expect(page.locator('#plot-range-value')).toHaveText(/^1\.50*$/);
    await expect(page.locator('canvas')).not.toHaveScreenshot(initialCanvas);
    const intermediateCanvas = await page.locator('canvas').screenshot();

    // 5. Action: Drag the slider to its minimum value, `0.5`.
    await page.locator('#slider-plot-range').fill('0.5');

    // 6. Assert: The `plot-range-value` display updates to "0.5", and the visualization on the canvas appears smaller (zoomed out).
    await expect(page.locator('#plot-range-value')).toHaveText(/^0\.50*$/);
    await expect(page.locator('canvas')).not.toHaveScreenshot(intermediateCanvas);
  });

});