const { test, expect } = require('@playwright/test');

const fileUrl = 'file://' + require('path').resolve(__dirname, '../pages/EnigmaticCometHolmes.html');

test.describe('Enigmatic Comet Holmes Interactive Visualization', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(fileUrl);
    // Wait for canvas elements to be potentially initialized by a script
    // await page.waitForSelector('#telescopic-canvas');
    // await page.waitForSelector('#orbit-canvas');
    await page.waitForTimeout(500);
  });

  test('Earth Position Slider Control', async ({ page }) => {
    const earthSlider = page.locator('#slider-earth-position');
    const visualizationPanel = page.locator('#visualization-panel');

    // 1. Assert: The "Earth position" slider is visible.
    await expect(earthSlider).toBeVisible();

    // 2. Assert: The slider's value is 180.
    await expect(earthSlider).toHaveValue('180');

    // 3. Action: Drag the slider to a new value, such as 90.
    await earthSlider.fill('90');

    // 4. Assert: The position of the Earth model on its orbit in the "orbit diagram" changes, and the "telescopic view" perspective updates.
    await expect(visualizationPanel).toMatchSnapshot('earth-pos-90.png');

    // 5. Action: Drag the slider to its maximum value, 360.
    await earthSlider.fill('360');

    // 6. Assert: The Earth model moves to a new position on its orbit, and the "telescopic view" updates again.
    await expect(visualizationPanel).toMatchSnapshot('earth-pos-360.png');
  });

  test('Comet Position Slider Control', async ({ page }) => {
    const cometSlider = page.locator('#slider-comet-position');
    const visualizationPanel = page.locator('#visualization-panel');

    // 1. Assert: The "comet position" slider is visible.
    await expect(cometSlider).toBeVisible();

    // 2. Assert: The slider's value is 180.
    await expect(cometSlider).toHaveValue('180');

    // 3. Action: Drag the slider to a new value, such as 270.
    await cometSlider.fill('270');

    // 4. Assert: The comet model moves along its orbit in the "orbit diagram", and its position and tail orientation change in the "telescopic view".
    await expect(visualizationPanel).toMatchSnapshot('comet-pos-270.png');

    // 5. Action: Drag the slider to its minimum value, 0.
    await cometSlider.fill('0');

    // 6. Assert: The comet model moves to the starting point of its orbit in the "orbit diagram", and both views update.
    await expect(visualizationPanel).toMatchSnapshot('comet-pos-0.png');
  });

  test('Coma Size Slider Control', async ({ page }) => {
    const comaSlider = page.locator('#slider-coma');
    const visualizationPanel = page.locator('#visualization-panel');

    // 1. Assert: The "coma" slider is visible.
    await expect(comaSlider).toBeVisible();

    // 2. Assert: The slider's value is 20.
    await expect(comaSlider).toHaveValue('20');

    // 3. Action: Drag the slider to a higher value, such as 80.
    await comaSlider.fill('80');

    // 4. Assert: The glowing coma surrounding the comet nucleus increases in size in both the "telescopic view" and "orbit diagram".
    await expect(visualizationPanel).toMatchSnapshot('coma-size-80.png');

    // 5. Action: Drag the slider to its minimum value, 0.
    await comaSlider.fill('0');

    // 6. Assert: The comet's coma becomes nearly invisible in both views.
    await expect(visualizationPanel).toMatchSnapshot('coma-size-0.png');
  });

  test('Tail Length Slider Control', async ({ page }) => {
    const tailSlider = page.locator('#slider-tail');
    const visualizationPanel = page.locator('#visualization-panel');

    // 1. Assert: The "tail" slider is visible.
    await expect(tailSlider).toBeVisible();

    // 2. Assert: The slider's value is 50.
    await expect(tailSlider).toHaveValue('50');

    // 3. Action: Drag the slider to its maximum value, 100.
    await tailSlider.fill('100');

    // 4. Assert: The length of the comet's tail increases in both the "telescopic view" and "orbit diagram".
    await expect(visualizationPanel).toMatchSnapshot('tail-length-100.png');

    // 5. Action: Drag the slider to its minimum value, 0.
    await tailSlider.fill('0');

    // 6. Assert: The comet's tail disappears in both views.
    await expect(visualizationPanel).toMatchSnapshot('tail-length-0.png');
  });

  test('Tail Spread Slider Control', async ({ page }) => {
    const tailSpreadSlider = page.locator('#slider-tail-spread');
    const visualizationPanel = page.locator('#visualization-panel');

    // 1. Assert: The "tail spread" slider is visible.
    await expect(tailSpreadSlider).toBeVisible();

    // 2. Assert: The slider's value is 20.
    await expect(tailSpreadSlider).toHaveValue('20');

    // 3. Action: Drag the slider to a higher value, such as 75.
    await tailSpreadSlider.fill('75');

    // 4. Assert: The width of the comet's tail cone increases in both the "telescopic view" and "orbit diagram".
    await expect(visualizationPanel).toMatchSnapshot('tail-spread-75.png');

    // 5. Action: Drag the slider to its maximum value, 100.
    await tailSpreadSlider.fill('100');

    // 6. Assert: The comet tail's width increases to its maximum extent in both views.
    await expect(visualizationPanel).toMatchSnapshot('tail-spread-100.png');
  });

});