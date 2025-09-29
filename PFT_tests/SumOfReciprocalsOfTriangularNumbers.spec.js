const { test, expect } = require('@playwright/test');

const fileUrl = 'file://' + require('path').resolve(__dirname, '../pages/SumOfReciprocalsOfTriangularNumbers.html');

test.beforeEach(async ({ page }) => {
  await page.goto(fileUrl);
  // Wait for MathJax to render the formula, which can be a sign of page readiness.
  // await page.waitForSelector('#formula-label .mjx-chtml', { state: 'visible' });
  await page.waitForTimeout(500);
});

test.describe('"n" Slider Control', () => {
  test('Title: "n" Slider Control', async ({ page }) => {
    // 1. Assert: The slider with id `slider-n` is visible.
    await expect(page.locator('#slider-n')).toBeVisible();

    // 2. Assert: The slider's value is `1` by default.
    await expect(page.locator('#slider-n')).toHaveValue('1');

    // 3. Action: Drag the slider handle to the middle, setting its value to `10`.
    await page.locator('#slider-n').fill('10');

    // 4. Assert: The number input `input-n` now displays `10` and both the function plot canvas and the sum plot canvas have been redrawn.
    await expect(page.locator('#input-n')).toHaveValue('10');
    await expect(page.locator('#canvas-function')).toHaveScreenshot('slider-n-10-function-plot.png');
    await expect(page.locator('#canvas-sum')).toHaveScreenshot('slider-n-10-sum-plot.png');

    // 5. Action: Drag the slider handle to its maximum value, `20`.
    await page.locator('#slider-n').fill('20');

    // 6. Assert: The number input `input-n` now displays `20` and both canvases have updated again.
    await expect(page.locator('#input-n')).toHaveValue('20');
    await expect(page.locator('#canvas-function')).toHaveScreenshot('slider-n-20-function-plot.png');
    await expect(page.locator('#canvas-sum')).toHaveScreenshot('slider-n-20-sum-plot.png');
  });
});

test.describe('"n" Number Input Control', () => {
  test('Title: "n" Number Input Control', async ({ page }) => {
    // 1. Assert: The number input with id `input-n` is visible.
    await expect(page.locator('#input-n')).toBeVisible();

    // 2. Assert: The input's value is `1` by default.
    await expect(page.locator('#input-n')).toHaveValue('1');

    // 3. Action: Change the value of the number input to `5`.
    await page.locator('#input-n').fill('5');
    // Blurring to ensure the change event fires if it's not an 'input' event handler
    await page.locator('#input-n').blur(); 

    // 4. Assert: The `slider-n` position updates to correspond to the value `5`, and both canvases show more rectangles than before.
    await expect(page.locator('#slider-n')).toHaveValue('5');
    await expect(page.locator('#canvas-function')).toHaveScreenshot('input-n-5-function-plot.png');
    await expect(page.locator('#canvas-sum')).toHaveScreenshot('input-n-5-sum-plot.png');

    // 5. Action: Change the value of the number input back to the minimum value, `1`.
    await page.locator('#input-n').fill('1');
    await page.locator('#input-n').blur();

    // 6. Assert: The `slider-n` position updates to its minimum, and both canvases are redrawn to their initial state with one rectangle.
    await expect(page.locator('#slider-n')).toHaveValue('1');
    await expect(page.locator('#canvas-function')).toHaveScreenshot('input-n-1-function-plot.png');
    await expect(page.locator('#canvas-sum')).toHaveScreenshot('input-n-1-sum-plot.png');
  });
});