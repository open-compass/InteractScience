const { test, expect } = require('@playwright/test');
const path = require('path');

const fileUrl = 'file://' + path.resolve(__dirname, '../pages/EulerTransformation.html');

test.describe('Euler Transformation Visualization', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(fileUrl);
    // Wait for the canvas to be potentially rendered by p5.js
    // await page.waitForSelector('#canvas-plot');
    await page.waitForTimeout(500);
  });

  test('Number of Terms Slider Interaction', async ({ page }) => {
    // 1. Assert: The slider with id `slider-terms` and its value display `span-terms-value` are visible.
    const slider = page.locator('#slider-terms');
    const sliderValueDisplay = page.locator('#span-terms-value');
    await expect(slider).toBeVisible();
    await expect(sliderValueDisplay).toBeVisible();

    // 2. Assert: The `slider-terms` value is 10, and the text content of `span-terms-value` is "10".
    await expect(slider).toHaveValue('10');
    await expect(sliderValueDisplay).toHaveText('10');
    const initialCanvas = await page.locator('#canvas-plot').screenshot();

    // 3. Action: Drag the `slider-terms` to a new value of 25.
    await slider.fill('25');

    // 4. Assert: The text content of `span-terms-value` updates to "25", and the canvas plot is redrawn with a different x-axis scale.
    await expect(sliderValueDisplay).toHaveText('25');
    await expect(slider).toHaveValue('25');
    const canvasAfter25Terms = await page.locator('#canvas-plot').screenshot();
    expect(canvasAfter25Terms).not.toEqual(initialCanvas);

    // 5. Action: Drag the `slider-terms` to its maximum value, 50.
    await slider.fill('50');

    // 6. Assert: The text content of `span-terms-value` updates to "50", and the canvas plot is redrawn to show 50 terms.
    await expect(sliderValueDisplay).toHaveText('50');
    await expect(slider).toHaveValue('50');
    const canvasAfter50Terms = await page.locator('#canvas-plot').screenshot();
    expect(canvasAfter50Terms).not.toEqual(canvasAfter25Terms);
  });

  test('Repeated Euler Transformations Radio Group Selection', async ({ page }) => {
    // 1. Assert: The radio button group with name `euler-transformations` is visible.
    await expect(page.locator('#radio-euler-0')).toBeVisible();
    await expect(page.locator('#radio-euler-1')).toBeVisible();
    await expect(page.locator('#radio-euler-2')).toBeVisible();
    await expect(page.locator('#radio-euler-3')).toBeVisible();

    // 2. Assert: The radio button with id `radio-euler-0` is checked, and the canvas shows only one grey line.
    await expect(page.locator('#radio-euler-0')).toBeChecked();
    const initialCanvas = await page.locator('#canvas-plot').screenshot();

    // 3. Action: Click the radio button with id `radio-euler-1`.
    await page.locator('#radio-euler-1').click();

    // 4. Assert: The `radio-euler-1` button is now checked, and the canvas plot is redrawn to include a second, blue line.
    await expect(page.locator('#radio-euler-1')).toBeChecked();
    const canvasAfterOneTransform = await page.locator('#canvas-plot').screenshot();
    expect(canvasAfterOneTransform).not.toEqual(initialCanvas);

    // 5. Action: Click the radio button with id `radio-euler-3`.
    await page.locator('#radio-euler-3').click();

    // 6. Assert: The `radio-euler-3` button is now checked, and the canvas plot is redrawn to show additional red and green lines.
    await expect(page.locator('#radio-euler-3')).toBeChecked();
    const canvasAfterThreeTransforms = await page.locator('#canvas-plot').screenshot();
    expect(canvasAfterThreeTransforms).not.toEqual(canvasAfterOneTransform);
  });

  test('Limit of Infinite Sequence Radio Group Selection', async ({ page }) => {
    // 1. Assert: The radio button group with name `series-select` is visible.
    await expect(page.locator('#radio-series-pi')).toBeVisible();
    await expect(page.locator('#radio-series-ln2')).toBeVisible();
    await expect(page.locator('#radio-series-sqrt2')).toBeVisible();
    
    // 2. Assert: The `radio-series-pi` button is checked, and the formula display `div-formula` shows the series for π.
    await expect(page.locator('#radio-series-pi')).toBeChecked();
    const formulaDisplay = page.locator('#div-formula');
    await expect(formulaDisplay).toContainText('π');
    const initialCanvas = await page.locator('#canvas-plot').screenshot();

    // 3. Action: Click the radio button with id `radio-series-ln2`.
    await page.locator('#radio-series-ln2').click();

    // 4. Assert: The `radio-series-ln2` button is checked, the formula in `div-formula` updates to the ln(2) series, and the canvas plot is redrawn with a different y-axis scale.
    await expect(page.locator('#radio-series-ln2')).toBeChecked();
    await expect(formulaDisplay).toContainText('log[2]');
    await expect(formulaDisplay).not.toContainText('π');
    const canvasAfterLn2 = await page.locator('#canvas-plot').screenshot();
    expect(canvasAfterLn2).not.toEqual(initialCanvas);

    // 5. Action: Click the radio button with id `radio-series-sqrt2`.
    await page.locator('#radio-series-sqrt2').click();

    // 6. Assert: The `radio-series-sqrt2` button is checked, the formula in `div-formula` updates to the √2 series, and the canvas plot is redrawn with a new y-axis scale.
    await expect(page.locator('#radio-series-sqrt2')).toBeChecked();
    await expect(formulaDisplay).toContainText('√2');
    await expect(formulaDisplay).not.toContainText('log[2]');
    const canvasAfterSqrt2 = await page.locator('#canvas-plot').screenshot();
    expect(canvasAfterSqrt2).not.toEqual(canvasAfterLn2);
  });
});