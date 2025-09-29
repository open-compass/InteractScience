const { test, expect } = require('@playwright/test');

const fileUrl = 'file://' + require('path').resolve(__dirname, '../pages/ConvolutionMethodInHydrologicComputations.html');

test.describe('Convolution Method in Hydrologic Computations', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(fileUrl);
    await page.waitForTimeout(500);
  });

  test('Toggle Controls Visibility Button', async ({ page }) => {
    // 1. Assert: The toggle button with id="toggle-controls" is visible.
    await expect(page.locator('#toggle-controls')).toBeVisible();

    // 2. Assert: The sliders-area container is visible on page load.
    await expect(page.locator('#sliders-area')).toBeVisible();

    // 3. Action: Click the toggle-controls button.
    await page.locator('#toggle-controls').click();

    // 4. Assert: The sliders-area container is no longer visible.
    await expect(page.locator('#sliders-area')).not.toBeVisible();

    // 5. Action: Click the toggle-controls button again.
    await page.locator('#toggle-controls').click();

    // 6. Assert: The sliders-area container becomes visible again.
    await expect(page.locator('#sliders-area')).toBeVisible();
  });

  test('Precipitation Hour 1 Slider', async ({ page }) => {
    // 1. Assert: The slider with id="slider-precip-1" is visible.
    await expect(page.locator('#slider-precip-1')).toBeVisible();

    // 2. Assert: The slider's default value is 1, and its corresponding display value-precip-1 shows "1".
    await expect(page.locator('#slider-precip-1')).toHaveValue('1');
    await expect(page.locator('#value-precip-1')).toHaveText('1');

    // 3. Action: Drag the slider to a value of 5.
    const plot1Before = await page.locator('#plot-canvas-1').screenshot();
    await page.locator('#slider-precip-1').fill('5');

    // 4. Assert: The display value-precip-1 updates to "5" and the precipitation hyetograph plot (plot-canvas-1) changes.
    await expect(page.locator('#value-precip-1')).toHaveText('5');
    await expect(page.locator('#plot-canvas-1')).not.toHaveScreenshot(plot1Before);

    // 5. Action: Drag the slider to its maximum value (10).
    const plot6Before = await page.locator('#plot-canvas-6').screenshot();
    await page.locator('#slider-precip-1').fill('10');

    // 6. Assert: The display value-precip-1 updates to "10" and the composite hydrograph plot (plot-canvas-6) changes.
    await expect(page.locator('#value-precip-1')).toHaveText('10');
    await expect(page.locator('#plot-canvas-6')).not.toHaveScreenshot(plot6Before);
  });

  test('Precipitation Hour 2 Slider', async ({ page }) => {
    // 1. Assert: The slider with id="slider-precip-2" is visible.
    await expect(page.locator('#slider-precip-2')).toBeVisible();

    // 2. Assert: The slider's default value is 0, and its corresponding display value-precip-2 shows "0".
    await expect(page.locator('#slider-precip-2')).toHaveValue('0');
    await expect(page.locator('#value-precip-2')).toHaveText('0');

    // 3. Action: Drag the slider to a value of 8.
    const plot4Before = await page.locator('#plot-canvas-4').screenshot();
    await page.locator('#slider-precip-2').fill('8');

    // 4. Assert: The display value-precip-2 updates to "8" and the component hydrograph plot (plot-canvas-4) changes.
    await expect(page.locator('#value-precip-2')).toHaveText('8');
    await expect(page.locator('#plot-canvas-4')).not.toHaveScreenshot(plot4Before);

    // 5. Action: Drag the slider to its minimum value (0).
    const plot6Before = await page.locator('#plot-canvas-6').screenshot();
    await page.locator('#slider-precip-2').fill('0');

    // 6. Assert: The display value-precip-2 updates to "0" and the composite hydrograph plot (plot-canvas-6) changes.
    await expect(page.locator('#value-precip-2')).toHaveText('0');
    await expect(page.locator('#plot-canvas-6')).not.toHaveScreenshot(plot6Before);
  });

  test('Precipitation Hour 3 Slider', async ({ page }) => {
    // 1. Assert: The slider with id="slider-precip-3" is visible.
    await expect(page.locator('#slider-precip-3')).toBeVisible();

    // 2. Assert: The slider's default value is 0, and its corresponding display value-precip-3 shows "0".
    await expect(page.locator('#slider-precip-3')).toHaveValue('0');
    await expect(page.locator('#value-precip-3')).toHaveText('0');

    // 3. Action: Drag the slider to a value of 3.
    const plot5Before = await page.locator('#plot-canvas-5').screenshot();
    await page.locator('#slider-precip-3').fill('3');

    // 4. Assert: The display value-precip-3 updates to "3" and the component hydrograph plot (plot-canvas-5) changes.
    await expect(page.locator('#value-precip-3')).toHaveText('3');
    await expect(page.locator('#plot-canvas-5')).not.toHaveScreenshot(plot5Before);

    // 5. Action: Drag the slider to its maximum value (10).
    const plot1Before = await page.locator('#plot-canvas-1').screenshot();
    await page.locator('#slider-precip-3').fill('10');

    // 6. Assert: The display value-precip-3 updates to "10" and the precipitation hyetograph plot (plot-canvas-1) changes.
    await expect(page.locator('#value-precip-3')).toHaveText('10');
    await expect(page.locator('#plot-canvas-1')).not.toHaveScreenshot(plot1Before);
  });

  test('UH Streamflow Hour 1 Slider', async ({ page }) => {
    // 1. Assert: The slider with id="slider-uh-1" is visible.
    await expect(page.locator('#slider-uh-1')).toBeVisible();

    // 2. Assert: The slider's default value is 1, and its corresponding display value-uh-1 shows "1".
    await expect(page.locator('#slider-uh-1')).toHaveValue('1');
    await expect(page.locator('#value-uh-1')).toHaveText('1');

    // 3. Action: Drag the slider to a value of 7.
    const plot2Before = await page.locator('#plot-canvas-2').screenshot();
    await page.locator('#slider-uh-1').fill('7');

    // 4. Assert: The display value-uh-1 updates to "7" and the Unit Hydrograph plot (plot-canvas-2) changes.
    await expect(page.locator('#value-uh-1')).toHaveText('7');
    await expect(page.locator('#plot-canvas-2')).not.toHaveScreenshot(plot2Before);

    // 5. Action: Drag the slider to its minimum value (0).
    const plot6Before = await page.locator('#plot-canvas-6').screenshot();
    await page.locator('#slider-uh-1').fill('0');

    // 6. Assert: The display value-uh-1 updates to "0" and the composite hydrograph plot (plot-canvas-6) changes.
    await expect(page.locator('#value-uh-1')).toHaveText('0');
    await expect(page.locator('#plot-canvas-6')).not.toHaveScreenshot(plot6Before);
  });

  test('UH Streamflow Hour 2 Slider', async ({ page }) => {
    // 1. Assert: The slider with id="slider-uh-2" is visible.
    await expect(page.locator('#slider-uh-2')).toBeVisible();

    // 2. Assert: The slider's default value is 5, and its corresponding display value-uh-2 shows "5".
    await expect(page.locator('#slider-uh-2')).toHaveValue('5');
    await expect(page.locator('#value-uh-2')).toHaveText('5');

    // 3. Action: Drag the slider to a value of 2.
    const plot2Before = await page.locator('#plot-canvas-2').screenshot();
    await page.locator('#slider-uh-2').fill('2');

    // 4. Assert: The display value-uh-2 updates to "2" and the Unit Hydrograph plot (plot-canvas-2) changes.
    await expect(page.locator('#value-uh-2')).toHaveText('2');
    await expect(page.locator('#plot-canvas-2')).not.toHaveScreenshot(plot2Before);

    // 5. Action: Drag the slider to its maximum value (10).
    const plot6Before = await page.locator('#plot-canvas-6').screenshot();
    await page.locator('#slider-uh-2').fill('10');

    // 6. Assert: The display value-uh-2 updates to "10" and the composite hydrograph plot (plot-canvas-6) changes.
    await expect(page.locator('#value-uh-2')).toHaveText('10');
    await expect(page.locator('#plot-canvas-6')).not.toHaveScreenshot(plot6Before);
  });

  test('UH Streamflow Hour 3 Slider', async ({ page }) => {
    // 1. Assert: The slider with id="slider-uh-3" is visible.
    await expect(page.locator('#slider-uh-3')).toBeVisible();

    // 2. Assert: The slider's default value is 3, and its corresponding display value-uh-3 shows "3".
    await expect(page.locator('#slider-uh-3')).toHaveValue('3');
    await expect(page.locator('#value-uh-3')).toHaveText('3');

    // 3. Action: Drag the slider to a value of 9.
    const plot2Before = await page.locator('#plot-canvas-2').screenshot();
    await page.locator('#slider-uh-3').fill('9');

    // 4. Assert: The display value-uh-3 updates to "9" and the Unit Hydrograph plot (plot-canvas-2) changes.
    await expect(page.locator('#value-uh-3')).toHaveText('9');
    await expect(page.locator('#plot-canvas-2')).not.toHaveScreenshot(plot2Before);

    // 5. Action: Drag the slider to its minimum value (0).
    const plot3Before = await page.locator('#plot-canvas-3').screenshot();
    await page.locator('#slider-uh-3').fill('0');

    // 6. Assert: The display value-uh-3 updates to "0" and at least one of the component hydrograph plots (plot-canvas-3 to plot-canvas-5) changes.
    await expect(page.locator('#value-uh-3')).toHaveText('0');
    await expect(page.locator('#plot-canvas-3')).not.toHaveScreenshot(plot3Before);
  });

  test('UH Streamflow Hour 4 Slider', async ({ page }) => {
    // 1. Assert: The slider with id="slider-uh-4" is visible.
    await expect(page.locator('#slider-uh-4')).toBeVisible();

    // 2. Assert: The slider's default value is 1, and its corresponding display value-uh-4 shows "1".
    await expect(page.locator('#slider-uh-4')).toHaveValue('1');
    await expect(page.locator('#value-uh-4')).toHaveText('1');

    // 3. Action: Drag the slider to a value of 6.
    const plot2Before = await page.locator('#plot-canvas-2').screenshot();
    await page.locator('#slider-uh-4').fill('6');

    // 4. Assert: The display value-uh-4 updates to "6" and the Unit Hydrograph plot (plot-canvas-2) changes.
    await expect(page.locator('#value-uh-4')).toHaveText('6');
    await expect(page.locator('#plot-canvas-2')).not.toHaveScreenshot(plot2Before);

    // 5. Action: Drag the slider to its maximum value (10).
    const plot6Before = await page.locator('#plot-canvas-6').screenshot();
    await page.locator('#slider-uh-4').fill('10');

    // 6. Assert: The display value-uh-4 updates to "10" and the composite hydrograph plot (plot-canvas-6) changes.
    await expect(page.locator('#value-uh-4')).toHaveText('10');
    await expect(page.locator('#plot-canvas-6')).not.toHaveScreenshot(plot6Before);
  });
});