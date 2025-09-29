const { test, expect } = require('@playwright/test');

const fileUrl = 'file://' + require('path').resolve(__dirname, '../pages/FourierTransformOfRadiallySymmetricPotentialFunctions.html');

test.beforeEach(async ({ page }) => {
  await page.goto(fileUrl);
  // Wait for Plotly to be ready by checking for the plot containers' content
  // await page.waitForSelector('#plot-left .plot-container');
  // await page.waitForSelector('#plot-right .plot-container');
  await page.waitForTimeout(500);
});

test.describe('Fourier Transform of Radially Symmetric Potential Functions', () => {

  test('Hertz Function Checkbox', async ({ page }) => {
    // Selectors for Hertz curves (red)
    const hertzCurveLeft = page.locator('#plot-left path[style*="stroke: rgb(255, 0, 0)"]');
    const hertzCurveRight = page.locator('#plot-right path[style*="stroke: rgb(255, 0, 0)"]');
    const hertzCheckbox = page.locator('#checkbox-hertz');

    await expect(hertzCheckbox).toBeVisible();
    await expect(hertzCheckbox).toBeChecked();
    await expect(hertzCurveLeft).toBeVisible();
    await expect(hertzCurveRight).toBeVisible();

    await hertzCheckbox.uncheck();
    await expect(hertzCurveLeft).not.toBeVisible();
    await expect(hertzCurveRight).not.toBeVisible();

    await hertzCheckbox.check();
    await expect(hertzCurveLeft).toBeVisible();
    await expect(hertzCurveRight).toBeVisible();
  });

  test('Overlap Function Checkbox', async ({ page }) => {
    // Selectors for Overlap curves (black)
    const overlapCurveLeft = page.locator('#plot-left path[style*="stroke: rgb(0, 0, 0)"]');
    const overlapCurveRight = page.locator('#plot-right path[style*="stroke: rgb(0, 0, 0)"]');
    const overlapCheckbox = page.locator('#checkbox-overlap');

    await expect(overlapCheckbox).toBeVisible();
    await expect(overlapCheckbox).toBeChecked();
    await expect(overlapCurveLeft).toBeVisible();
    await expect(overlapCurveRight).toBeVisible();

    await overlapCheckbox.uncheck();
    await expect(overlapCurveLeft).not.toBeVisible();
    await expect(overlapCurveRight).not.toBeVisible();

    await overlapCheckbox.check();
    await expect(overlapCurveLeft).toBeVisible();
    await expect(overlapCurveRight).toBeVisible();
  });

  test('Gaussian Function Checkbox', async ({ page }) => {
    // Selectors for Gaussian curves (blue)
    const gaussianCurveLeft = page.locator('#plot-left path[style*="stroke: rgb(0, 0, 255)"]');
    const gaussianCurveRight = page.locator('#plot-right path[style*="stroke: rgb(0, 0, 255)"]');
    const gaussianCheckbox = page.locator('#checkbox-gaussian');

    await expect(gaussianCheckbox).toBeVisible();
    await expect(gaussianCheckbox).toBeChecked();
    await expect(gaussianCurveLeft).toBeVisible();
    await expect(gaussianCurveRight).toBeVisible();

    await gaussianCheckbox.uncheck();
    await expect(gaussianCurveLeft).not.toBeVisible();
    await expect(gaussianCurveRight).not.toBeVisible();

    await gaussianCheckbox.check();
    await expect(gaussianCurveLeft).toBeVisible();
    await expect(gaussianCurveRight).toBeVisible();
  });

  test('Linear-Linear Axes Scale Button', async ({ page }) => {
    const btnLinearLinear = page.locator('#btn-linear-linear');
    const btnLogLinear = page.locator('#btn-log-linear');

    const getRightPlotYAxisType = () => page.evaluate(() => document.querySelector('#plot-right').layout.yaxis.type);

    await expect(btnLinearLinear).toBeVisible();
    await expect(btnLinearLinear).toHaveClass(/active/);
    await expect(await getRightPlotYAxisType()).toBe('linear');

    await btnLogLinear.click();
    await expect(btnLinearLinear).not.toHaveClass(/active/);
    await expect(await getRightPlotYAxisType()).toBe('log');

    await btnLinearLinear.click();
    await expect(btnLinearLinear).toHaveClass(/active/);
    await expect(await getRightPlotYAxisType()).toBe('linear');
  });

  test('Log-Linear Axes Scale Button', async ({ page }) => {
    const btnLogLinear = page.locator('#btn-log-linear');
    const btnLogLog = page.locator('#btn-log-log');

    const getRightPlotYAxisType = () => page.evaluate(() => document.querySelector('#plot-right').layout.yaxis.type);

    await expect(btnLogLinear).toBeVisible();
    await expect(btnLogLinear).not.toHaveClass(/active/);

    await btnLogLinear.click();
    await expect(btnLogLinear).toHaveClass(/active/);
    await expect(await getRightPlotYAxisType()).toBe('log');

    await btnLogLog.click();
    await expect(btnLogLinear).not.toHaveClass(/active/);
    await expect(btnLogLog).toHaveClass(/active/);
  });

  test('Log-Log Axes Scale Button', async ({ page }) => {
    const btnLogLog = page.locator('#btn-log-log');
    const btnLinearLinear = page.locator('#btn-linear-linear');

    const getRightPlotYAxisType = () => page.evaluate(() => document.querySelector('#plot-right').layout.yaxis.type);

    await expect(btnLogLog).toBeVisible();
    await expect(btnLogLog).not.toHaveClass(/active/);

    await btnLogLog.click();
    await expect(btnLogLog).toHaveClass(/active/);
    await expect(await getRightPlotYAxisType()).toBe('log');

    await btnLinearLinear.click();
    await expect(btnLogLog).not.toHaveClass(/active/);
    await expect(await getRightPlotYAxisType()).toBe('linear');
  });

  test('Radius r Slider', async ({ page }) => {
    const sliderR = page.locator('#slider-r');
    const spanRValue = page.locator('#span-r-value');
    
    const getLeftPlotXRange = () => page.evaluate(() => document.querySelector('#plot-left').layout.xaxis.range);

    await expect(sliderR).toBeVisible();
    await expect(sliderR).toHaveValue('2.5');
    await expect(spanRValue).toHaveText(/^2\.50*$/);

    await sliderR.fill('1');
    await expect(spanRValue).toHaveText(/^1\.00*$/);
    await expect(await getLeftPlotXRange()).toEqual([0, 1]);

    await sliderR.fill('5');
    await expect(spanRValue).toHaveText('5');
    await expect(await getLeftPlotXRange()).toEqual([0, 5]);
  });

  test('Wave Number k Slider', async ({ page }) => {
    const sliderK = page.locator('#slider-k');
    const spanKValue = page.locator('#span-k-value');
    
    const getRightPlotXRange = () => page.evaluate(() => document.querySelector('#plot-right').layout.xaxis.range);

    await expect(sliderK).toBeVisible();
    await expect(sliderK).toHaveValue('50');
    await expect(spanKValue).toHaveText('50');

    await sliderK.fill('25');
    await expect(spanKValue).toHaveText('25');
    await expect(await getRightPlotXRange()).toEqual([0, 25]);

    await sliderK.fill('1');
    await expect(spanKValue).toHaveText('1');
    await expect(await getRightPlotXRange()).toEqual([0, 1]);
  });
});