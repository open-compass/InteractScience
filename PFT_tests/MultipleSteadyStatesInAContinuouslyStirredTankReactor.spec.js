const { test, expect } = require('@playwright/test');
const fileUrl = 'file://' + require('path').resolve(__dirname, '../pages/MultipleSteadyStatesInAContinuouslyStirredTankReactor.html');

test.describe('Multiple Steady States in a CSTR', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(fileUrl);
    await page.waitForTimeout(500);
  });

  test('Heat Transfer Coefficient Slider (`ua`) Interaction', async ({ page }) => {
    const slider = page.locator('#slider-ua');
    const valueDisplay = page.locator('#ua-value');
    const plotContainer = page.locator('#plot-container');

    // 1. Assert: The "heat transfer coefficient" slider (slider-ua) is visible.
    await expect(slider).toBeVisible();

    // 2. Assert: The slider's value is 0, and its corresponding value display (ua-value) shows "0".
    await expect(slider).toHaveValue('0');
    await expect(valueDisplay).toHaveText('0');

    const initialPlot = await plotContainer.screenshot();

    // 3. Action: Drag the slider to the middle of its range, setting the value to 10.
    await slider.fill('10');

    // 4. Assert: The value display updates to "10". The blue "energy balance" line on the plot changes its slope.
    await expect(valueDisplay).toHaveText('10');
    await expect(plotContainer).not.toHaveScreenshot(initialPlot);

    const midPlot = await plotContainer.screenshot();

    // 5. Action: Drag the slider to its maximum value, 20.
    await slider.fill('20');

    // 6. Assert: The value display updates to "20", and the blue line on the plot updates again.
    await expect(valueDisplay).toHaveText('20');
    await expect(plotContainer).not.toHaveScreenshot(midPlot);
  });

  test('Reverse Reaction Pre-exponential Factor Slider (`kr0`) Interaction', async ({ page }) => {
    const slider = page.locator('#slider-kr0');
    const valueDisplay = page.locator('#kr0-value');
    const plotContainer = page.locator('#plot-container');

    // 1. Assert: The "reverse reaction pre-exponential factor" slider (slider-kr0) is visible.
    await expect(slider).toBeVisible();

    // 2. Assert: The slider's value is 0, and its value display (kr0-value) shows "0".
    await expect(slider).toHaveValue('0');
    await expect(valueDisplay).toHaveText('0');

    const initialPlot = await plotContainer.screenshot();

    // 3. Action: Drag the slider to a new value, such as 9.
    await slider.fill('9');

    // 4. Assert: The value display updates to "9.0 x 10¹²". The green "mass balance" curve on the plot changes shape.
    await expect(valueDisplay).toHaveText('9.0 x 10¹²');
    await expect(plotContainer).not.toHaveScreenshot(initialPlot);

    const midPlot = await plotContainer.screenshot();

    // 5. Action: Drag the slider to its maximum value, 10.
    await slider.fill('10');

    // 6. Assert: The value display updates to "1.0 x 10¹³", and the green curve on the plot updates again.
    await expect(valueDisplay).toHaveText('1.0 x 10¹³');
    await expect(plotContainer).not.toHaveScreenshot(midPlot);
  });

  test('Feed Temperature Slider (`tf`) Interaction', async ({ page }) => {
    const slider = page.locator('#slider-tf');
    const valueDisplay = page.locator('#tf-value');
    const plotContainer = page.locator('#plot-container');

    // 1. Assert: The "feed temperature" slider (slider-tf) is visible.
    await expect(slider).toBeVisible();

    // 2. Assert: The slider's value is 265, and its value display (tf-value) shows "265".
    await expect(slider).toHaveValue('265');
    await expect(valueDisplay).toHaveText('265');

    const initialPlot = await plotContainer.screenshot();

    // 3. Action: Drag the slider to a new value, such as 310.
    await slider.fill('310');

    // 4. Assert: The value display updates to "310". The blue "energy balance" line shifts its position on the plot.
    await expect(valueDisplay).toHaveText('310');
    await expect(plotContainer).not.toHaveScreenshot(initialPlot);

    const midPlot = await plotContainer.screenshot();

    // 5. Action: Drag the slider to its minimum value, 250.
    await slider.fill('250');

    // 6. Assert: The value display updates to "250", and the blue line on the plot updates its position again.
    await expect(valueDisplay).toHaveText('250');
    await expect(plotContainer).not.toHaveScreenshot(midPlot);
  });

  test('Residence Time Slider (`tau`) Interaction', async ({ page }) => {
    const slider = page.locator('#slider-tau');
    const valueDisplay = page.locator('#tau-value');
    const plotContainer = page.locator('#plot-container');

    // 1. Assert: The "residence time" slider (slider-tau) is visible.
    await expect(slider).toBeVisible();

    // 2. Assert: The slider's value is 400, and its value display (tau-value) shows "400".
    await expect(slider).toHaveValue('400');
    await expect(valueDisplay).toHaveText('400');

    const initialPlot = await plotContainer.screenshot();

    // 3. Action: Drag the slider to a new value, such as 750.
    await slider.fill('750');

    // 4. Assert: The value display updates to "750". Both the green "mass balance" curve and the blue "energy balance" line change on the plot.
    await expect(valueDisplay).toHaveText('750');
    await expect(plotContainer).not.toHaveScreenshot(initialPlot);

    const midPlot = await plotContainer.screenshot();

    // 5. Action: Drag the slider to its maximum value, 1000.
    await slider.fill('1000');

    // 6. Assert: The value display updates to "1000", and both curves on the plot update their shapes/positions again.
    await expect(valueDisplay).toHaveText('1000');
    await expect(plotContainer).not.toHaveScreenshot(midPlot);
  });

});