const { test, expect } = require('@playwright/test');

const fileUrl = 'file://' + require('path').resolve(__dirname, '../pages/CommonMethodsOfEstimatingTheAreaUnderACurve.html');

test.beforeEach(async ({ page }) => {
  await page.goto(fileUrl);
  // await page.locator('canvas').waitFor();
  await page.waitForTimeout(500);
});

test.describe('Function Selector Button Group', () => {
  test('Function Selector Button Group', async ({ page }) => {
    // 1. Assert: The group of function buttons is visible.
    await expect(page.locator('#function-controls')).toBeVisible();

    // 2. Assert: The button labeled "x" is active by default, and the canvas displays a straight line plot.
    const buttonX = page.getByRole('button', { name: 'x', exact: true });
    await expect(buttonX).toHaveClass(/active/);
    const initialCanvasData = await page.locator('canvas').evaluate(canvas => canvas.toDataURL());

    // 3. Action: Click the button labeled "sin(x)+1".
    await page.getByRole('button', { name: 'sin(x)+1' }).click();

    // 4. Assert: The "sin(x)+1" button becomes active, the plot on the canvas changes to a curve, and the "estimated area" text value updates.
    await expect(page.getByRole('button', { name: 'sin(x)+1' })).toHaveClass(/active/);
    const sinCanvasData = await page.locator('canvas').evaluate(canvas => canvas.toDataURL());
    expect(sinCanvasData).not.toBe(initialCanvasData);

    // 5. Action: Click the button labeled "(x-3)²".
    await page.getByRole('button', { name: '(x-3)²' }).click();

    // 6. Assert: The "(x-3)²" button becomes active, the plot on the canvas changes to a parabola, and the "integral" text value updates.
    await expect(page.getByRole('button', { name: '(x-3)²' })).toHaveClass(/active/);
    const parabolaCanvasData = await page.locator('canvas').evaluate(canvas => canvas.toDataURL());
    expect(parabolaCanvasData).not.toBe(sinCanvasData);
  });
});

test.describe('Estimation Type Selector Button Group', () => {
  test('Estimation Type Selector Button Group', async ({ page }) => {
    // 1. Assert: The group of estimation type buttons is visible.
    await expect(page.locator('#type-controls')).toBeVisible();

    // 2. Assert: The button labeled "right" is active by default, and the canvas displays right-hand rectangles.
    await expect(page.getByRole('button', { name: 'right' })).toHaveClass(/active/);
    const initialCanvasData = await page.locator('canvas').evaluate(canvas => canvas.toDataURL());

    // 3. Action: Click the button labeled "trapezoidal".
    await page.getByRole('button', { name: 'trapezoidal' }).click();

    // 4. Assert: The "trapezoidal" button becomes active, the shapes on the canvas change to trapezoids, and the "estimated area" text value updates.
    await expect(page.getByRole('button', { name: 'trapezoidal' })).toHaveClass(/active/);
    const trapezoidalCanvasData = await page.locator('canvas').evaluate(canvas => canvas.toDataURL());
    expect(trapezoidalCanvasData).not.toBe(initialCanvasData);

    // 5. Action: Click the button labeled "midpoint".
    await page.getByRole('button', { name: 'midpoint' }).click();

    // 6. Assert: The "midpoint" button becomes active, the shapes on the canvas change to midpoint-height rectangles, and the "estimated area" text value updates.
    await expect(page.getByRole('button', { name: 'midpoint' })).toHaveClass(/active/);
    const midpointCanvasData = await page.locator('canvas').evaluate(canvas => canvas.toDataURL());
    expect(midpointCanvasData).not.toBe(trapezoidalCanvasData);
  });
});

test.describe('Upper Limit \'a\' Slider Control', () => {
  test('Upper Limit \'a\' Slider Control', async ({ page }) => {
    // 1. Assert: The "upper limit a" slider (`#slider-a`) is visible.
    const sliderA = page.locator('#slider-a');
    await expect(sliderA).toBeVisible();

    // 2. Assert: The slider's value is 5, and its corresponding text display (`#value-a`) shows "5".
    await expect(sliderA).toHaveValue('5');
    await expect(page.locator('#value-a')).toHaveText('5');
    const initialCanvasData = await page.locator('canvas').evaluate(canvas => canvas.toDataURL());

    // 3. Action: Drag the slider to a value of approximately 2.5.
    await sliderA.fill('2.5');

    // 4. Assert: The text display updates to "2.50", the red vertical line on the plot moves left, and the "integral" text value decreases.
    await expect(page.locator('#value-a')).toHaveText(/^2\.500*$/);
    const canvasData2_5 = await page.locator('canvas').evaluate(canvas => canvas.toDataURL());
    expect(canvasData2_5).not.toBe(initialCanvasData);

    // 5. Action: Drag the slider to its maximum value (8).
    await sliderA.fill('8');

    // 6. Assert: The text display updates to "8.00", the red vertical line moves to the right edge of the plot, and the calculation text values update.
    await expect(page.locator('#value-a')).toHaveText(/^8\.000*$/);
    const canvasData8 = await page.locator('canvas').evaluate(canvas => canvas.toDataURL());
    expect(canvasData8).not.toBe(canvasData2_5);
  });
});

test.describe('Number of Quadrilaterals Slider Control', () => {
  test('Number of Quadrilaterals Slider Control', async ({ page }) => {
    // 1. Assert: The "number of quadrilaterals" slider (`#slider-n`) is visible.
    const sliderN = page.locator('#slider-n');
    await expect(sliderN).toBeVisible();

    // 2. Assert: The slider's value is 3, and its corresponding text display (`#value-n`) shows "3". The canvas shows 3 estimation shapes.
    await expect(sliderN).toHaveValue('3');
    await expect(page.locator('#value-n')).toHaveText('3');
    const initialCanvasData = await page.locator('canvas').evaluate(canvas => canvas.toDataURL());

    // 3. Action: Drag the slider to a value of 20.
    await sliderN.fill('20');

    // 4. Assert: The text display updates to "20", the number of estimation shapes on the canvas increases, and the "estimated area" text value changes.
    await expect(page.locator('#value-n')).toHaveText('20');
    const canvasData20 = await page.locator('canvas').evaluate(canvas => canvas.toDataURL());
    expect(canvasData20).not.toBe(initialCanvasData);

    // 5. Action: Drag the slider to its minimum value (1).
    await sliderN.fill('1');

    // 6. Assert: The text display updates to "1", the canvas shows only one estimation shape, and the "estimated area" text value updates.
    await expect(page.locator('#value-n')).toHaveText('1');
    const canvasData1 = await page.locator('canvas').evaluate(canvas => canvas.toDataURL());
    expect(canvasData1).not.toBe(canvasData20);
  });
});