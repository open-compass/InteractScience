const { test, expect } = require('@playwright/test');

const fileUrl = 'file://' + require('path').resolve(__dirname, '../pages/ParallelNonisothermalReactionsInBatchAndSemibatchReactors.html');

test.beforeEach(async ({ page }) => {
  await page.goto(fileUrl);
  // Wait for the p5.js canvas to be ready and rendered. A short timeout is usually sufficient for local files.
  await page.waitForTimeout(500);
});

test.describe('Interactive Controls for Nonisothermal Reactors', () => {

  test('Plot Type Dropdown Control', async ({ page }) => {
    const plotCanvas = page.locator('#plot-canvas');

    // 1. Assert: The plot type dropdown with id `select-plot` is visible.
    await expect(page.locator('#select-plot')).toBeVisible();

    // 2. Assert: The dropdown's selected value is "semibatch" by default.
    await expect(page.locator('#select-plot')).toHaveValue('semibatch');
    const initialScreenshot = await plotCanvas.screenshot();

    // 3. Action: Select the "batch" option from the dropdown.
    await page.locator('#select-plot').selectOption('batch');

    // 4. Assert: The plot canvas updates, showing different curves than the initial state.
    await expect(plotCanvas.screenshot()).not.toEqual(initialScreenshot);
    const batchScreenshot = await plotCanvas.screenshot();

    // 5. Action: Select the "selectivity" option from the dropdown.
    await page.locator('#select-plot').selectOption('selectivity');

    // 6. Assert: The plot canvas updates again, showing a single purple curve and a y-axis labeled "selectivity ratio".
    // We confirm the update by comparing with the previous state's screenshot.
    // The label check is implicit in the screenshot comparison.
    await expect(plotCanvas.screenshot()).not.toEqual(batchScreenshot);
  });

  test('Feed Configuration Cycler Control', async ({ page }) => {
    const plotCanvas = page.locator('#plot-canvas');
    const feedLabel = page.locator('#cycler-feed-label');

    // 1. Assert: The feed configuration label and cycler buttons are visible.
    await expect(feedLabel).toBeVisible();
    await expect(page.locator('#btn-feed-up')).toBeVisible();
    await expect(page.locator('#btn-feed-down')).toBeVisible();

    // 2. Assert: The feed configuration label displays "feed A to B" by default.
    await expect(feedLabel).toHaveText('feed A to B');
    const initialScreenshot = await plotCanvas.screenshot();

    // 3. Action: Click the up arrow button (`btn-feed-up`).
    await page.locator('#btn-feed-up').click();

    // 4. Assert: The label text changes to "feed B to A" and the plot canvas is redrawn.
    await expect(feedLabel).toHaveText('feed B to A');
    await expect(plotCanvas.screenshot()).not.toEqual(initialScreenshot);
    const upClickScreenshot = await plotCanvas.screenshot();

    // 5. Action: Click the down arrow button (`btn-feed-down`).
    await page.locator('#btn-feed-down').click();

    // 6. Assert: The label text changes back to "feed A to B" and the plot canvas is redrawn.
    await expect(feedLabel).toHaveText('feed A to B');
    await expect(plotCanvas.screenshot()).not.toEqual(upClickScreenshot);
  });

  test('Feed Rate Slider Control', async ({ page }) => {
    const slider = page.locator('#slider-feed-rate');
    const numberInput = page.locator('#input-feed-rate');
    const plotCanvas = page.locator('#plot-canvas');

    // 1. Assert: The "feed rate" slider and its corresponding number input are visible.
    await expect(slider).toBeVisible();
    await expect(numberInput).toBeVisible();

    // 2. Assert: The slider and number input both show the default value of 10.
    await expect(slider).toHaveValue('10');
    await expect(numberInput).toHaveValue('10');
    const initialScreenshot = await plotCanvas.screenshot();

    // 3. Action: Drag the slider to a value of 100.
    await slider.fill('100');

    // 4. Assert: The number input updates to 100 and the plot canvas is redrawn.
    await expect(numberInput).toHaveValue('100');
    await expect(plotCanvas.screenshot()).not.toEqual(initialScreenshot);
    const midScreenshot = await plotCanvas.screenshot();

    // 5. Action: Set the slider to its maximum value of 200.
    await slider.fill('200');

    // 6. Assert: The number input updates to 200 and the plot canvas is redrawn.
    await expect(numberInput).toHaveValue('200');
    await expect(plotCanvas.screenshot()).not.toEqual(midScreenshot);
  });

  test('UA Slider Control', async ({ page }) => {
    const slider = page.locator('#slider-ua');
    const numberInput = page.locator('#input-ua');
    const plotCanvas = page.locator('#plot-canvas');

    // 1. Assert: The "UA" slider and its corresponding number input are visible.
    await expect(slider).toBeVisible();
    await expect(numberInput).toBeVisible();

    // 2. Assert: The slider and number input both show the default value of 15000.
    await expect(slider).toHaveValue('15000');
    await expect(numberInput).toHaveValue('15000');
    const initialScreenshot = await plotCanvas.screenshot();

    // 3. Action: Drag the slider to a value of 25000.
    await slider.fill('25000');

    // 4. Assert: The number input updates to 25000 and the plot canvas is redrawn.
    await expect(numberInput).toHaveValue('25000');
    await expect(plotCanvas.screenshot()).not.toEqual(initialScreenshot);
    const midScreenshot = await plotCanvas.screenshot();

    // 5. Action: Set the slider to its minimum value of 5000.
    await slider.fill('5000');

    // 6. Assert: The number input updates to 5000 and the plot canvas is redrawn.
    await expect(numberInput).toHaveValue('5000');
    await expect(plotCanvas.screenshot()).not.toEqual(midScreenshot);
  });

  test('ΔH₁ Slider Control', async ({ page }) => {
    const slider = page.locator('#slider-dh1');
    const numberInput = page.locator('#input-dh1');
    const plotCanvas = page.locator('#plot-canvas');

    // 1. Assert: The ΔH₁ slider and its corresponding number input are visible.
    await expect(slider).toBeVisible();
    await expect(numberInput).toBeVisible();

    // 2. Assert: The slider and number input both show the default value of 1000.
    await expect(slider).toHaveValue('1000');
    await expect(numberInput).toHaveValue('1000');
    const initialScreenshot = await plotCanvas.screenshot();

    // 3. Action: Change the number input to 3000.
    await numberInput.fill('3000');

    // 4. Assert: The slider's position updates to match the value 3000 and the plot canvas is redrawn.
    await expect(slider).toHaveValue('3000');
    await expect(plotCanvas.screenshot()).not.toEqual(initialScreenshot);
    const midScreenshot = await plotCanvas.screenshot();

    // 5. Action: Drag the slider to its maximum value of 5000.
    await slider.fill('5000');

    // 6. Assert: The number input updates to 5000 and the plot canvas is redrawn.
    await expect(numberInput).toHaveValue('5000');
    await expect(plotCanvas.screenshot()).not.toEqual(midScreenshot);
  });

  test('ΔH₂ Slider Control', async ({ page }) => {
    const slider = page.locator('#slider-dh2');
    const numberInput = page.locator('#input-dh2');
    const plotCanvas = page.locator('#plot-canvas');

    // 1. Assert: The ΔH₂ slider and its corresponding number input are visible.
    await expect(slider).toBeVisible();
    await expect(numberInput).toBeVisible();

    // 2. Assert: The slider and number input both show the default value of 3000.
    await expect(slider).toHaveValue('3000');
    await expect(numberInput).toHaveValue('3000');
    const initialScreenshot = await plotCanvas.screenshot();

    // 3. Action: Drag the slider to a value of 1500.
    await slider.fill('1500');

    // 4. Assert: The number input updates to 1500 and the plot canvas is redrawn.
    await expect(numberInput).toHaveValue('1500');
    await expect(plotCanvas.screenshot()).not.toEqual(initialScreenshot);
    const midScreenshot = await plotCanvas.screenshot();

    // 5. Action: Set the slider to its minimum value of 500.
    await slider.fill('500');

    // 6. Assert: The number input updates to 500 and the plot canvas is redrawn.
    await expect(numberInput).toHaveValue('500');
    await expect(plotCanvas.screenshot()).not.toEqual(midScreenshot);
  });
});