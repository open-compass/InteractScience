const { test, expect } = require('@playwright/test');
const path = require('path');

const fileUrl = 'file://' + path.resolve(__dirname, '../pages/ComparingAlgorithmsForTheTravelingSalesmanProblem.html');

test.beforeEach(async ({ page }) => {
  await page.goto(fileUrl);
  await page.waitForTimeout(500);
});

test.describe('Interactive Component Tests', () => {

  test('"new random set" button functionality', async ({ page }) => {
    // 1. Assert: The "new random set" button (#btn-random-set) is visible.
    await expect(page.locator('#btn-random-set')).toBeVisible();

    // 2. Assert: The seed input (#seed-input) has the default value `1245`.
    const initialSeed = await page.locator('#seed-input').inputValue();
    expect(initialSeed).toBe('1245');

    // 3. Action: Click the "new random set" button.
    const initialResult3Opt = await page.locator('#result-3opt').textContent();
    await page.locator('#btn-random-set').click();

    // 4. Assert: The value of #seed-input changes from its initial value. The value in the results table cell #result-3opt is updated.
    await expect(page.locator('#seed-input')).not.toHaveValue(initialSeed);
    await expect(page.locator('#result-3opt')).not.toHaveText(initialResult3Opt);

    // 5. Action: Click the "new random set" button a second time.
    const secondSeed = await page.locator('#seed-input').inputValue();
    const screenshotBefore = await page.locator('#canvas-right-wrapper').screenshot();
    await page.locator('#btn-random-set').click();

    // 6. Assert: The value of #seed-input changes again. The content of the right plot (#canvas-right-wrapper) is updated.
    await expect(page.locator('#seed-input')).not.toHaveValue(secondSeed);
    const screenshotAfter = await page.locator('#canvas-right-wrapper').screenshot();
    expect(screenshotAfter).not.toEqual(screenshotBefore);
  });

  test('"Reset seed" button functionality', async ({ page }) => {
    // 1. Assert: The "X" reset button (#btn-reset-seed) is visible.
    await expect(page.locator('#btn-reset-seed')).toBeVisible();

    // 2. Assert: The seed input (#seed-input) has the default value `1245`.
    await expect(page.locator('#seed-input')).toHaveValue('1245');

    // 3. Action: First, click the "new random set" button to change the seed, then click the reset button (#btn-reset-seed).
    const initialResult3Opt = await page.locator('#result-3opt').textContent();
    const initialWinner = await page.locator('#winner-display').textContent();

    await page.locator('#btn-random-set').click();
    await page.locator('#btn-reset-seed').click();

    // 4. Assert: The value of #seed-input is set to the fixed default (e.g., `0`). The results table values and winner display text are recalculated and updated.
    await expect(page.locator('#seed-input')).toHaveValue('0');
    await expect(page.locator('#result-3opt')).not.toHaveText(initialResult3Opt);
    await expect(page.locator('#winner-display')).not.toHaveText(initialWinner);
    
    // Store current state for next assertion
    const resultAfterReset = await page.locator('#result-3opt').textContent();

    // 5. Action: Click the reset button (#btn-reset-seed) again.
    await page.locator('#btn-reset-seed').click();

    // 6. Assert: The value of #seed-input remains at the fixed default (`0`). The results in the table do not change.
    await expect(page.locator('#seed-input')).toHaveValue('0');
    await expect(page.locator('#result-3opt')).toHaveText(resultAfterReset);
  });

  test('"number of points" slider interaction', async ({ page }) => {
    // 1. Assert: The "number of points" slider (#slider-points) is visible.
    await expect(page.locator('#slider-points')).toBeVisible();

    // 2. Assert: The slider has a default value of `10`.
    await expect(page.locator('#slider-points')).toHaveValue('10');

    // 3. Action: Drag the slider handle to the middle position, corresponding to a value of `30`.
    const initialWinnerDisplay = await page.locator('#winner-display').textContent();
    await page.locator('#slider-points').fill('30');

    // 4. Assert: The slider's value is now `30`. The number of points rendered in both canvases (#canvas-left-wrapper, #canvas-right-wrapper) increases, and the winner display (#winner-display) is updated.
    await expect(page.locator('#slider-points')).toHaveValue('30');
    await expect(page.locator('#winner-display')).not.toHaveText(initialWinnerDisplay);

    // 5. Action: Drag the slider handle to its maximum value (`50`).
    const timingBeforeMax = await page.locator('#timing-orzweig').textContent();
    const resultBeforeMax = await page.locator('#result-orzweig').textContent();
    await page.locator('#slider-points').fill('50');

    // 6. Assert: The slider's value is now `50`. The results table is updated with new timing and result values for all methods.
    await expect(page.locator('#slider-points')).toHaveValue('50');
    await expect(page.locator('#timing-orzweig')).not.toHaveText(timingBeforeMax);
    await expect(page.locator('#result-orzweig')).not.toHaveText(resultBeforeMax);
  });

  test('"Mathematica method" radio button selection', async ({ page }) => {
    // 1. Assert: The "Mathematica method" radio button group is visible.
    await expect(page.locator('#controls-method')).toBeVisible();

    // 2. Assert: The "OrZweig" radio button (#radio-orzweig) is checked by default, and the left plot title (#left-plot-title) is "OrZweig".
    await expect(page.locator('#radio-orzweig')).toBeChecked();
    await expect(page.locator('#left-plot-title')).toHaveText('OrZweig');

    // 3. Action: Click the "TwoOpt" radio button (#radio-twoopt).
    const tableResult = await page.locator('#result-orzweig').textContent();
    const screenshotBefore = await page.locator('#canvas-left-wrapper').screenshot();
    await page.locator('label[for="radio-twoopt"]').click();

    // 4. Assert: The "TwoOpt" radio button is now checked, the left plot title changes to "TwoOpt", and the left plot (#canvas-left-wrapper) is redrawn. The results table values remain unchanged.
    await expect(page.locator('#radio-twoopt')).toBeChecked();
    await expect(page.locator('#left-plot-title')).toHaveText('TwoOpt');
    const screenshotAfterTwoOpt = await page.locator('#canvas-left-wrapper').screenshot();
    expect(screenshotAfterTwoOpt).not.toEqual(screenshotBefore);
    await expect(page.locator('#result-orzweig')).toHaveText(tableResult);

    // 5. Action: Click the "CCA" radio button (#radio-cca).
    await page.locator('label[for="radio-cca"]').click();

    // 6. Assert: The "CCA" radio button is now checked, the left plot title changes to "CCA", and the left plot is redrawn again.
    await expect(page.locator('#radio-cca')).toBeChecked();
    await expect(page.locator('#left-plot-title')).toHaveText('CCA');
    const screenshotAfterCCA = await page.locator('#canvas-left-wrapper').screenshot();
    expect(screenshotAfterCCA).not.toEqual(screenshotAfterTwoOpt);
  });
});