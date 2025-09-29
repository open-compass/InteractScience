const { test, expect } = require('@playwright/test');

const fileUrl = 'file://' + require('path').resolve(__dirname, '../pages/PineCone.html');

test.describe('Pine Cone Visualization Tests', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(fileUrl);
    // Wait for the canvas to be potentially rendered.
    // await page.waitForSelector('#main-canvas');
    await page.waitForTimeout(500);
  });

  test('Base Polygon Radio Group Interaction', async ({ page }) => {
    // 1. Assert: The "base polygon" radio button group is visible.
    await expect(page.locator('#radio-poly-3').locator('..')).toBeVisible();

    // 2. Assert: The radio button with the label "7" (`#radio-poly-7`) is checked by default.
    await expect(page.locator('#radio-poly-7')).toBeChecked();
    const initialCanvas = await page.locator('#main-canvas').screenshot();

    // 3. Action: Click the radio button with the label "4" (`#radio-poly-4`).
    await page.locator('#radio-poly-4').click();

    // 4. Assert: The radio button for "4" is now checked and the canvas rendering has changed.
    await expect(page.locator('#radio-poly-4')).toBeChecked();
    const canvasAfterClick4 = await page.locator('#main-canvas').screenshot();
    expect(canvasAfterClick4).not.toEqual(initialCanvas);

    // 5. Action: Click the radio button with the label "9" (`#radio-poly-9`).
    await page.locator('#radio-poly-9').click();

    // 6. Assert: The radio button for "9" is now checked and the canvas rendering has changed.
    await expect(page.locator('#radio-poly-9')).toBeChecked();
    const canvasAfterClick9 = await page.locator('#main-canvas').screenshot();
    expect(canvasAfterClick9).not.toEqual(canvasAfterClick4);
  });

  test('Number of Units Slider Interaction', async ({ page }) => {
    // 1. Assert: The "number of units" slider (`#slider-units`) is visible.
    await expect(page.locator('#slider-units')).toBeVisible();

    // 2. Assert: The slider's value is 200 by default.
    await expect(page.locator('#slider-units')).toHaveValue('200');
    const initialCanvas = await page.locator('#main-canvas').screenshot();

    // 3. Action: Drag the slider handle to a value of approximately 400.
    await page.locator('#slider-units').fill('400');

    // 4. Assert: The slider's value has changed and the number of segments on the canvas has increased.
    await expect(page.locator('#slider-units')).toHaveValue('400');
    const canvasAfter400 = await page.locator('#main-canvas').screenshot();
    expect(canvasAfter400).not.toEqual(initialCanvas);

    // 5. Action: Drag the slider handle to its minimum value (10).
    await page.locator('#slider-units').fill('10');

    // 6. Assert: The slider's value is 10 and the number of segments on the canvas has decreased.
    await expect(page.locator('#slider-units')).toHaveValue('10');
    const canvasAfter10 = await page.locator('#main-canvas').screenshot();
    expect(canvasAfter10).not.toEqual(canvasAfter400);
  });

  test('Number of Units Plus Button Interaction', async ({ page }) => {
    // 1. Assert: The plus button (`#btn-units-plus`) next to the "number of units" slider is visible.
    await expect(page.locator('#btn-units-plus')).toBeVisible();

    // 2. Assert: The associated slider (`#slider-units`) has a default value of 200.
    await expect(page.locator('#slider-units')).toHaveValue('200');
    const initialCanvas = await page.locator('#main-canvas').screenshot();

    // 3. Action: Click the plus button once.
    await page.locator('#btn-units-plus').click();

    // 4. Assert: The slider's value is now 201 and the canvas has been redrawn.
    await expect(page.locator('#slider-units')).toHaveValue('201');
    const canvasAfterClick1 = await page.locator('#main-canvas').screenshot();
    expect(canvasAfterClick1).not.toEqual(initialCanvas);

    // 5. Action: Click the plus button again.
    await page.locator('#btn-units-plus').click();

    // 6. Assert: The slider's value is now 202 and the canvas has been redrawn.
    await expect(page.locator('#slider-units')).toHaveValue('202');
    const canvasAfterClick2 = await page.locator('#main-canvas').screenshot();
    expect(canvasAfterClick2).not.toEqual(canvasAfterClick1);
  });

  test('Angular Advance Slider Interaction', async ({ page }) => {
    // 1. Assert: The "angular advance" slider (`#slider-angle`) is visible.
    await expect(page.locator('#slider-angle')).toBeVisible();

    // 2. Assert: The slider's value is 137.5 by default.
    await expect(page.locator('#slider-angle')).toHaveValue('137.5');
    const initialCanvas = await page.locator('#main-canvas').screenshot();

    // 3. Action: Drag the slider handle to a value of approximately 130.
    await page.locator('#slider-angle').fill('130');

    // 4. Assert: The slider's value has changed and the arrangement of segments on the canvas has changed.
    await expect(page.locator('#slider-angle')).toHaveValue('130');
    const canvasAfter130 = await page.locator('#main-canvas').screenshot();
    expect(canvasAfter130).not.toEqual(initialCanvas);

    // 5. Action: Drag the slider handle to its maximum value (150).
    await page.locator('#slider-angle').fill('150');

    // 6. Assert: The slider's value is 150 and the arrangement of segments on the canvas has changed.
    await expect(page.locator('#slider-angle')).toHaveValue('150');
    const canvasAfter150 = await page.locator('#main-canvas').screenshot();
    expect(canvasAfter150).not.toEqual(canvasAfter130);
  });

  test('Angular Advance Plus Button Interaction', async ({ page }) => {
    // 1. Assert: The plus button (`#btn-angle-plus`) next to the "angular advance" slider is visible.
    await expect(page.locator('#btn-angle-plus')).toBeVisible();

    // 2. Assert: The associated slider (`#slider-angle`) has a default value of 137.5.
    await expect(page.locator('#slider-angle')).toHaveValue('137.5');
    const initialCanvas = await page.locator('#main-canvas').screenshot();

    // 3. Action: Click the plus button once.
    await page.locator('#btn-angle-plus').click();

    // 4. Assert: The slider's value is now 137.6 and the canvas has been redrawn.
    await expect(page.locator('#slider-angle')).toHaveValue('137.6');
    const canvasAfterClick1 = await page.locator('#main-canvas').screenshot();
    expect(canvasAfterClick1).not.toEqual(initialCanvas);

    // 5. Action: Click the plus button again.
    await page.locator('#btn-angle-plus').click();

    // 6. Assert: The slider's value is now 137.7 and the canvas has been redrawn.
    await expect(page.locator('#slider-angle')).toHaveValue('137.7');
    const canvasAfterClick2 = await page.locator('#main-canvas').screenshot();
    expect(canvasAfterClick2).not.toEqual(canvasAfterClick1);
  });

  test('Make Conical Slider Interaction', async ({ page }) => {
    // 1. Assert: The "make conical" slider (`#slider-conical`) is visible.
    await expect(page.locator('#slider-conical')).toBeVisible();

    // 2. Assert: The slider's value is 0 by default.
    await expect(page.locator('#slider-conical')).toHaveValue('0');
    const initialCanvas = await page.locator('#main-canvas').screenshot();

    // 3. Action: Drag the slider handle to a value of approximately 1.
    await page.locator('#slider-conical').fill('1');

    // 4. Assert: The slider's value has changed and the visualization has become three-dimensional (conical).
    await expect(page.locator('#slider-conical')).toHaveValue('1');
    const canvasAfter1 = await page.locator('#main-canvas').screenshot();
    expect(canvasAfter1).not.toEqual(initialCanvas);

    // 5. Action: Drag the slider handle back to its minimum value (0).
    await page.locator('#slider-conical').fill('0');

    // 6. Assert: The slider's value is 0 and the visualization has flattened back to a 2D spiral.
    await expect(page.locator('#slider-conical')).toHaveValue('0');
    const canvasAfter0 = await page.locator('#main-canvas').screenshot();
    expect(canvasAfter0).not.toEqual(canvasAfter1);
  });

  test('Make Conical Plus Button Interaction', async ({ page }) => {
    // 1. Assert: The plus button (`#btn-conical-plus`) next to the "make conical" slider is visible.
    await expect(page.locator('#btn-conical-plus')).toBeVisible();

    // 2. Assert: The associated slider (`#slider-conical`) has a default value of 0.
    await expect(page.locator('#slider-conical')).toHaveValue('0');
    const initialCanvas = await page.locator('#main-canvas').screenshot();

    // 3. Action: Click the plus button once.
    await page.locator('#btn-conical-plus').click();

    // 4. Assert: The slider's value is now 0.01 and the canvas visualization shows a slight conical shape.
    await expect(page.locator('#slider-conical')).toHaveValue('0.01');
    const canvasAfterClick1 = await page.locator('#main-canvas').screenshot();
    expect(canvasAfterClick1).not.toEqual(initialCanvas);

    // 5. Action: Click the plus button again.
    await page.locator('#btn-conical-plus').click();

    // 6. Assert: The slider's value is now 0.02 and the canvas visualization's conical shape is more pronounced.
    await expect(page.locator('#slider-conical')).toHaveValue('0.02');
    const canvasAfterClick2 = await page.locator('#main-canvas').screenshot();
    expect(canvasAfterClick2).not.toEqual(canvasAfterClick1);
  });

  test('Rotate X Slider Interaction', async ({ page }) => {
    // 1. Assert: The "rotate x" slider (`#slider-rotate-x`) is visible.
    await expect(page.locator('#slider-rotate-x')).toBeVisible();

    // 2. Assert: The slider's value is 30 by default.
    await expect(page.locator('#slider-rotate-x')).toHaveValue('30');
    const initialCanvas = await page.locator('#main-canvas').screenshot();

    // 3. Action: Drag the slider handle to a value of approximately -20.
    await page.locator('#slider-rotate-x').fill('-20');

    // 4. Assert: The slider's value has changed and the object on the canvas has rotated around the X-axis.
    await expect(page.locator('#slider-rotate-x')).toHaveValue('-20');
    const canvasAfterNeg20 = await page.locator('#main-canvas').screenshot();
    expect(canvasAfterNeg20).not.toEqual(initialCanvas);

    // 5. Action: Drag the slider handle to its maximum value (90).
    await page.locator('#slider-rotate-x').fill('90');

    // 6. Assert: The slider's value is 90 and the object on the canvas has rotated to a new position.
    await expect(page.locator('#slider-rotate-x')).toHaveValue('90');
    const canvasAfter90 = await page.locator('#main-canvas').screenshot();
    expect(canvasAfter90).not.toEqual(canvasAfterNeg20);
  });

  test('Rotate X Plus Button Interaction', async ({ page }) => {
    // 1. Assert: The plus button (`#btn-rotate-x-plus`) next to the "rotate x" slider is visible.
    await expect(page.locator('#btn-rotate-x-plus')).toBeVisible();

    // 2. Assert: The associated slider (`#slider-rotate-x`) has a default value of 30.
    await expect(page.locator('#slider-rotate-x')).toHaveValue('30');
    const initialCanvas = await page.locator('#main-canvas').screenshot();

    // 3. Action: Click the plus button once.
    await page.locator('#btn-rotate-x-plus').click();

    // 4. Assert: The slider's value is now 31 and the canvas object has rotated.
    await expect(page.locator('#slider-rotate-x')).toHaveValue('31');
    const canvasAfterClick1 = await page.locator('#main-canvas').screenshot();
    expect(canvasAfterClick1).not.toEqual(initialCanvas);

    // 5. Action: Click the plus button again.
    await page.locator('#btn-rotate-x-plus').click();

    // 6. Assert: The slider's value is now 32 and the canvas object has rotated again.
    await expect(page.locator('#slider-rotate-x')).toHaveValue('32');
    const canvasAfterClick2 = await page.locator('#main-canvas').screenshot();
    expect(canvasAfterClick2).not.toEqual(canvasAfterClick1);
  });

  test('Rotate Z Slider Interaction', async ({ page }) => {
    // 1. Assert: The "rotate z" slider (`#slider-rotate-z`) is visible.
    await expect(page.locator('#slider-rotate-z')).toBeVisible();

    // 2. Assert: The slider's value is 0 by default.
    await expect(page.locator('#slider-rotate-z')).toHaveValue('0');
    const initialCanvas = await page.locator('#main-canvas').screenshot();

    // 3. Action: Drag the slider handle to a value of approximately 90.
    await page.locator('#slider-rotate-z').fill('90');

    // 4. Assert: The slider's value has changed and the object on the canvas has rotated around the Z-axis.
    await expect(page.locator('#slider-rotate-z')).toHaveValue('90');
    const canvasAfter90 = await page.locator('#main-canvas').screenshot();
    expect(canvasAfter90).not.toEqual(initialCanvas);

    // 5. Action: Drag the slider handle to its minimum value (-180).
    await page.locator('#slider-rotate-z').fill('-180');

    // 6. Assert: The slider's value is -180 and the object on the canvas has rotated to a new position.
    await expect(page.locator('#slider-rotate-z')).toHaveValue('-180');
    const canvasAfterNeg180 = await page.locator('#main-canvas').screenshot();
    expect(canvasAfterNeg180).not.toEqual(canvasAfter90);
  });

  test('Rotate Z Plus Button Interaction', async ({ page }) => {
    // 1. Assert: The plus button (`#btn-rotate-z-plus`) next to the "rotate z" slider is visible.
    await expect(page.locator('#btn-rotate-z-plus')).toBeVisible();

    // 2. Assert: The associated slider (`#slider-rotate-z`) has a default value of 0.
    await expect(page.locator('#slider-rotate-z')).toHaveValue('0');
    const initialCanvas = await page.locator('#main-canvas').screenshot();

    // 3. Action: Click the plus button once.
    await page.locator('#btn-rotate-z-plus').click();

    // 4. Assert: The slider's value is now 1 and the canvas object has rotated.
    await expect(page.locator('#slider-rotate-z')).toHaveValue('1');
    const canvasAfterClick1 = await page.locator('#main-canvas').screenshot();
    expect(canvasAfterClick1).not.toEqual(initialCanvas);

    // 5. Action: Click the plus button again.
    await page.locator('#btn-rotate-z-plus').click();

    // 6. Assert: The slider's value is now 2 and the canvas object has rotated again.
    await expect(page.locator('#slider-rotate-z')).toHaveValue('2');
    const canvasAfterClick2 = await page.locator('#main-canvas').screenshot();
    expect(canvasAfterClick2).not.toEqual(canvasAfterClick1);
  });

});