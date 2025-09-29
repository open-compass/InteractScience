const { test, expect } = require('@playwright/test');

const fileUrl = 'file://' + require('path').resolve(__dirname, '../pages/ArrheniusVersusExponentialModelForChemicalReactions.html');

test.describe('Arrhenius vs Exponential Model UI', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(fileUrl);
    // Wait for Plotly to render the plots
    // await page.waitForSelector('#plot-top .plot-container');
    // await page.waitForSelector('#plot-bottom .plot-container');
    await page.waitForTimeout(500);
  });

  test('Data Generation Model Button Group', async ({ page }) => {
    // 1. Assert: The "Arrhenius" and "exponential" buttons are visible.
    await expect(page.locator('#btn-arrhenius')).toBeVisible();
    await expect(page.locator('#btn-exponential')).toBeVisible();

    // 2. Assert: The "Arrhenius" button has the `active-button` class by default. The top plot title contains "exponential model fit to Arrhenius data".
    await expect(page.locator('#btn-arrhenius')).toHaveClass('active-button');
    await expect(page.locator('#plot-top .g-gtitle')).toContainText('exponential model fit to Arrhenius data');

    // 3. Action: Click the "exponential" button.
    await page.locator('#btn-exponential').click();

    // 4. Assert: The "exponential" button now has the `active-button` class, and the top plot title changes to "Arrhenius model fit to exponential data".
    await expect(page.locator('#btn-exponential')).toHaveClass('active-button');
    await expect(page.locator('#btn-arrhenius')).not.toHaveClass('active-button');
    await expect(page.locator('#plot-top .g-gtitle')).toContainText('Arrhenius model fit to exponential data');

    // 5. Action: Click the "Arrhenius" button.
    await page.locator('#btn-arrhenius').click();

    // 6. Assert: The "Arrhenius" button regains the `active-button` class, and the top plot title reverts to "exponential model fit to Arrhenius data".
    await expect(page.locator('#btn-arrhenius')).toHaveClass('active-button');
    await expect(page.locator('#btn-exponential')).not.toHaveClass('active-button');
    await expect(page.locator('#plot-top .g-gtitle')).toContainText('exponential model fit to Arrhenius data');
  });

  test('Number of Points (n) Slider', async ({ page }) => {
    // 1. Assert: The slider with id `slider-n` and its value display `value-n` are visible.
    await expect(page.locator('#slider-n')).toBeVisible();
    await expect(page.locator('#value-n')).toBeVisible();

    // 2. Assert: The slider's default value is 6, and the `value-n` span displays "6".
    await expect(page.locator('#slider-n')).toHaveValue('6');
    await expect(page.locator('#value-n')).toHaveText('6');
    await expect(page.locator('#plot-top .scatter .points path')).toHaveCount(6);

    // 3. Action: Drag the slider handle to the value 12.
    await page.locator('#slider-n').fill('12');

    // 4. Assert: The `value-n` span updates to "12", and the number of data points on the top plot changes.
    await expect(page.locator('#value-n')).toHaveText('12');
    await expect(page.locator('#plot-top .scatter .points path')).toHaveCount(12);

    // 5. Action: Drag the slider handle to its maximum value, 20.
    await page.locator('#slider-n').fill('20');

    // 6. Assert: The `value-n` span updates to "20", and the number of data points on the top plot changes again.
    await expect(page.locator('#value-n')).toHaveText('20');
    await expect(page.locator('#plot-top .scatter .points path')).toHaveCount(20);
  });

  test('Minimum Temperature (T_min) Slider', async ({ page }) => {
    // 1. Assert: The slider with id `slider-tmin` and its value display `value-tmin` are visible.
    await expect(page.locator('#slider-tmin')).toBeVisible();
    await expect(page.locator('#value-tmin')).toBeVisible();

    // 2. Assert: The slider's default value is 25, and the `value-tmin` span displays "25".
    await expect(page.locator('#slider-tmin')).toHaveValue('25');
    await expect(page.locator('#value-tmin')).toHaveText('25');
    
    const getTopPlotData = () => page.evaluate(() => (window.Plotly.d3.select('#plot-top').node() || {}).data);

    const initialPlotData = await getTopPlotData();

    // 3. Action: Drag the slider handle to the value 40.
    await page.locator('#slider-tmin').fill('40');

    // 4. Assert: The `value-tmin` span updates to "40", and the x-axis range of the plots changes.
    await expect(page.locator('#value-tmin')).toHaveText('40');
    const plotDataAfter40 = await getTopPlotData();
    expect(plotDataAfter40).not.toEqual(initialPlotData);

    // 5. Action: Drag the slider handle to its minimum value, 0.
    await page.locator('#slider-tmin').fill('0');

    // 6. Assert: The `value-tmin` span updates to "0", and the plots are redrawn.
    await expect(page.locator('#value-tmin')).toHaveText('0');
    const plotDataAfter0 = await getTopPlotData();
    expect(plotDataAfter0).not.toEqual(plotDataAfter40);
  });

  test('Maximum Temperature (T_max) Slider', async ({ page }) => {
    // 1. Assert: The slider with id `slider-tmax` and its value display `value-tmax` are visible.
    await expect(page.locator('#slider-tmax')).toBeVisible();
    await expect(page.locator('#value-tmax')).toBeVisible();

    // 2. Assert: The slider's default value is 75, and the `value-tmax` span displays "75".
    await expect(page.locator('#slider-tmax')).toHaveValue('75');
    await expect(page.locator('#value-tmax')).toHaveText('75');
    
    const getTopPlotData = () => page.evaluate(() => (window.Plotly.d3.select('#plot-top').node() || {}).data);
    const initialPlotData = await getTopPlotData();

    // 3. Action: Drag the slider handle to the value 90.
    await page.locator('#slider-tmax').fill('90');

    // 4. Assert: The `value-tmax` span updates to "90", and the x-axis range of the plots changes.
    await expect(page.locator('#value-tmax')).toHaveText('90');
    const plotDataAfter90 = await getTopPlotData();
    expect(plotDataAfter90).not.toEqual(initialPlotData);

    // 5. Action: Drag the slider handle to its minimum value, 51.
    await page.locator('#slider-tmax').fill('51');

    // 6. Assert: The `value-tmax` span updates to "51", and the plots are redrawn.
    await expect(page.locator('#value-tmax')).toHaveText('51');
    const plotDataAfter51 = await getTopPlotData();
    expect(plotDataAfter51).not.toEqual(plotDataAfter90);
  });

  test('Reference Temperature (T_ref) Slider', async ({ page }) => {
    // 1. Assert: The slider with id `slider-tref` and its value display `value-tref` are visible.
    await expect(page.locator('#slider-tref')).toBeVisible();
    await expect(page.locator('#value-tref')).toBeVisible();

    // 2. Assert: The slider's default value is 35, and the `value-tref` span displays "35".
    await expect(page.locator('#slider-tref')).toHaveValue('35');
    await expect(page.locator('#value-tref')).toHaveText('35');
    
    const getPlotData = () => page.evaluate(() => (window.Plotly.d3.select('#plot-top').node() || {}).data);
    const initialPlotData = await getPlotData();

    // 3. Action: Drag the slider handle to the value 60.
    await page.locator('#slider-tref').fill('60');

    // 4. Assert: The `value-tref` span updates to "60", and the data points and fit curve on both plots are redrawn.
    await expect(page.locator('#value-tref')).toHaveText('60');
    const plotDataAfter60 = await getPlotData();
    expect(plotDataAfter60).not.toEqual(initialPlotData);

    // 5. Action: Drag the slider handle to its maximum value, 100.
    await page.locator('#slider-tref').fill('100');

    // 6. Assert: The `value-tref` span updates to "100", and the plots are redrawn.
    await expect(page.locator('#value-tref')).toHaveText('100');
    const plotDataAfter100 = await getPlotData();
    expect(plotDataAfter100).not.toEqual(plotDataAfter60);
  });

  test("'c' Parameter Slider", async ({ page }) => {
    // 1. Assert: The slider with id `slider-c` and its value display `value-c` are visible.
    await expect(page.locator('#slider-c')).toBeVisible();
    await expect(page.locator('#value-c')).toBeVisible();

    // 2. Assert: The slider's default value is 0.025, and the `value-c` span displays "0.025".
    await expect(page.locator('#slider-c')).toHaveValue('0.025');
    await expect(page.locator('#value-c')).toHaveText(/^0\.0250*$/);
    
    // 3. Action: Click the "exponential" model button, then drag the `slider-c` handle to 0.05.
    await page.locator('#btn-exponential').click();
    const getPlotData = () => page.evaluate(() => (window.Plotly.d3.select('#plot-top').node() || {}).data);
    const initialPlotData = await getPlotData();
    await page.locator('#slider-c').fill('0.05');

    // 4. Assert: The `value-c` span updates to "0.05", and the generated data points on both plots change position.
    await expect(page.locator('#value-c')).toHaveText(/^0\.050*$/);
    const plotDataAfter005 = await getPlotData();
    expect(plotDataAfter005).not.toEqual(initialPlotData);

    // 5. Action: Drag the slider handle to its minimum value, 0.01.
    await page.locator('#slider-c').fill('0.01');

    // 6. Assert: The `value-c` span updates to "0.01", and the plots are redrawn.
    await expect(page.locator('#value-c')).toHaveText(/^0\.010*$/);
    const plotDataAfter001 = await getPlotData();
    expect(plotDataAfter001).not.toEqual(plotDataAfter005);
  });

  test("'b' Parameter Slider", async ({ page }) => {
    // 1. Assert: The slider with id `slider-b` and its value display `value-b` are visible.
    await expect(page.locator('#slider-b')).toBeVisible();
    await expect(page.locator('#value-b')).toBeVisible();

    // 2. Assert: The slider's default value is 273.16, and the `value-b` span displays "273.16".
    await expect(page.locator('#slider-b')).toHaveValue('273.16');
    await expect(page.locator('#value-b')).toHaveText(/^273\.160*$/);

    const getPlotData = () => page.evaluate(() => (window.Plotly.d3.select('#plot-top').node() || {}).data);
    const initialPlotData = await getPlotData();

    // 3. Action: Drag the slider handle to the value 300.
    await page.locator('#slider-b').fill('300');

    // 4. Assert: The `value-b` span updates to "300", and the generated data points on both plots change position.
    await expect(page.locator('#value-b')).toHaveText(/^300\.000*$/); // Assuming formatting to two decimal places
    const plotDataAfter300 = await getPlotData();
    expect(plotDataAfter300).not.toEqual(initialPlotData);

    // 5. Action: Drag the slider handle to its maximum value, 350.
    await page.locator('#slider-b').fill('350');

    // 6. Assert: The `value-b` span updates to "350", and the plots are redrawn.
    await expect(page.locator('#value-b')).toHaveText(/^350\.000*$/);
    const plotDataAfter350 = await getPlotData();
    expect(plotDataAfter350).not.toEqual(plotDataAfter300);
  });

  test("'a' Parameter Slider", async ({ page }) => {
    // 1. Assert: The slider with id `slider-a` and its value display `value-a` are visible.
    await expect(page.locator('#slider-a')).toBeVisible();
    await expect(page.locator('#value-a')).toBeVisible();

    // 2. Assert: The slider's default value is 4000, and the `value-a` span displays "4000".
    await expect(page.locator('#slider-a')).toHaveValue('4000');
    await expect(page.locator('#value-a')).toHaveText('4000');

    const getPlotData = () => page.evaluate(() => (window.Plotly.d3.select('#plot-top').node() || {}).data);
    const initialPlotData = await getPlotData();

    // 3. Action: Drag the slider handle to the value 7000.
    await page.locator('#slider-a').fill('7000');

    // 4. Assert: The `value-a` span updates to "7000", and the generated data points on both plots change position.
    await expect(page.locator('#value-a')).toHaveText('7000');
    const plotDataAfter7000 = await getPlotData();
    expect(plotDataAfter7000).not.toEqual(initialPlotData);

    // 5. Action: Drag the slider handle to its minimum value, 1000.
    await page.locator('#slider-a').fill('1000');

    // 6. Assert: The `value-a` span updates to "1000", and the plots are redrawn.
    await expect(page.locator('#value-a')).toHaveText('1000');
    const plotDataAfter1000 = await getPlotData();
    expect(plotDataAfter1000).not.toEqual(plotDataAfter7000);
  });
});