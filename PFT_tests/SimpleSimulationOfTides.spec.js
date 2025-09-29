const { test, expect } = require('@playwright/test');

const fileUrl = 'file://' + require('path').resolve(__dirname, '../pages/SimpleSimulationOfTides.html');

test.describe('Tidal Simulation Controls', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(fileUrl);
    await page.waitForTimeout(500);
  });

  test('Position of Moon Slider Interaction', async ({ page }) => {
    // 1. Assert: The slider with id `slider-moon-pos` is visible on the page.
    await expect(page.locator('#slider-moon-pos')).toBeVisible();

    // 2. Assert: The slider `slider-moon-pos` has a default value of 144.
    await expect(page.locator('#slider-moon-pos')).toHaveValue('144');

    const canvasBeforeChange = await page.locator('#viz-container canvas').screenshot();

    // 3. Action: Drag the `slider-moon-pos` to a value of 270.
    await page.locator('#slider-moon-pos').fill('270');

    // 4. Assert: The visualization of the water layer in the canvas has changed.
    const canvasAfterFirstChange = await page.locator('#viz-container canvas').screenshot();
    expect(canvasAfterFirstChange).not.toEqual(canvasBeforeChange);

    // 5. Action: Drag the `slider-moon-pos` to its maximum value of 360.
    await page.locator('#slider-moon-pos').fill('360');

    // 6. Assert: The visualization of the water layer in the canvas has changed again.
    const canvasAfterSecondChange = await page.locator('#viz-container canvas').screenshot();
    expect(canvasAfterSecondChange).not.toEqual(canvasAfterFirstChange);
  });

  test('Pull from Moon Slider Interaction', async ({ page }) => {
    // 1. Assert: The slider with id `slider-moon-pull` is visible on the page.
    await expect(page.locator('#slider-moon-pull')).toBeVisible();

    // 2. Assert: The slider `slider-moon-pull` has a default value of 40.
    await expect(page.locator('#slider-moon-pull')).toHaveValue('40');

    const canvasBeforeChange = await page.locator('#viz-container canvas').screenshot();

    // 3. Action: Drag the `slider-moon-pull` to a value of 80.
    await page.locator('#slider-moon-pull').fill('80');

    // 4. Assert: The shape of the water layer in the canvas has changed to show a larger bulge.
    const canvasAfterFirstChange = await page.locator('#viz-container canvas').screenshot();
    expect(canvasAfterFirstChange).not.toEqual(canvasBeforeChange);

    // 5. Action: Drag the `slider-moon-pull` to its minimum value of 0.
    await page.locator('#slider-moon-pull').fill('0');

    // 6. Assert: The shape of the water layer in the canvas has changed again.
    const canvasAfterSecondChange = await page.locator('#viz-container canvas').screenshot();
    expect(canvasAfterSecondChange).not.toEqual(canvasAfterFirstChange);
  });

  test('Position of Sun Slider Interaction', async ({ page }) => {
    // 1. Assert: The slider with id `slider-sun-pos` is visible on the page.
    await expect(page.locator('#slider-sun-pos')).toBeVisible();

    // 2. Assert: The slider `slider-sun-pos` has a default value of 144.
    await expect(page.locator('#slider-sun-pos')).toHaveValue('144');

    const canvasBeforeChange = await page.locator('#viz-container canvas').screenshot();

    // 3. Action: Drag the `slider-sun-pos` to a value of 0.
    await page.locator('#slider-sun-pos').fill('0');

    // 4. Assert: The visualization of the water layer in the canvas has changed.
    const canvasAfterFirstChange = await page.locator('#viz-container canvas').screenshot();
    expect(canvasAfterFirstChange).not.toEqual(canvasBeforeChange);

    // 5. Action: Drag the `slider-sun-pos` to its maximum value of 360.
    await page.locator('#slider-sun-pos').fill('360');

    // 6. Assert: The visualization of the water layer in the canvas has changed again.
    const canvasAfterSecondChange = await page.locator('#viz-container canvas').screenshot();
    expect(canvasAfterSecondChange).not.toEqual(canvasAfterFirstChange);
  });

  test('Pull from Sun Slider Interaction', async ({ page }) => {
    // 1. Assert: The slider with id `slider-sun-pull` is visible on the page.
    await expect(page.locator('#slider-sun-pull')).toBeVisible();

    // 2. Assert: The slider `slider-sun-pull` has a default value of 20.
    await expect(page.locator('#slider-sun-pull')).toHaveValue('20');

    const canvasBeforeChange = await page.locator('#viz-container canvas').screenshot();

    // 3. Action: Drag the `slider-sun-pull` to a value of 75.
    await page.locator('#slider-sun-pull').fill('75');

    // 4. Assert: The shape of the water layer in the canvas has changed to show a larger bulge.
    const canvasAfterFirstChange = await page.locator('#viz-container canvas').screenshot();
    expect(canvasAfterFirstChange).not.toEqual(canvasBeforeChange);

    // 5. Action: Drag the `slider-sun-pull` to its maximum value of 100.
    await page.locator('#slider-sun-pull').fill('100');

    // 6. Assert: The shape of the water layer in the canvas has changed again.
    const canvasAfterSecondChange = await page.locator('#viz-container canvas').screenshot();
    expect(canvasAfterSecondChange).not.toEqual(canvasAfterFirstChange);
  });

  test('Reset Button Interaction', async ({ page }) => {
    // 1. Assert: The button with id `btn-reset` is visible on the page.
    await expect(page.locator('#btn-reset')).toBeVisible();

    // 2. Assert: The slider `slider-moon-pos` has its default value of 144.
    await expect(page.locator('#slider-moon-pos')).toHaveValue('144');
    const initialCanvas = await page.locator('#viz-container canvas').screenshot();

    // 3. Action: Change the value of `slider-moon-pos` to 0 and `slider-sun-pull` to 100.
    await page.locator('#slider-moon-pos').fill('0');
    await page.locator('#slider-sun-pull').fill('100');

    // 4. Assert: The slider values are updated and the canvas visualization has changed.
    await expect(page.locator('#slider-moon-pos')).toHaveValue('0');
    await expect(page.locator('#slider-sun-pull')).toHaveValue('100');
    const changedCanvas = await page.locator('#viz-container canvas').screenshot();
    expect(changedCanvas).not.toEqual(initialCanvas);

    // 5. Action: Click the `btn-reset` button.
    await page.locator('#btn-reset').click();

    // 6. Assert: The values of all sliders have returned to their defaults and the canvas visualization has been updated.
    await expect(page.locator('#slider-moon-pos')).toHaveValue('144');
    await expect(page.locator('#slider-moon-pull')).toHaveValue('40');
    await expect(page.locator('#slider-sun-pos')).toHaveValue('144');
    await expect(page.locator('#slider-sun-pull')).toHaveValue('20');

    const resetCanvas = await page.locator('#viz-container canvas').screenshot();
    expect(resetCanvas).toEqual(initialCanvas);
  });

});