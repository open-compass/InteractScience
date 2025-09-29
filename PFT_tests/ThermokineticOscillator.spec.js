const { test, expect } = require('@playwright/test');

const fileUrl = 'file://' + require('path').resolve(__dirname, '../pages/ThermokineticOscillator.html');

/**
 * Helper function to get the 'd' attribute of the two plot traces.
 * This attribute defines the shape of the lines and changes when the plot is redrawn.
 * @param {import('@playwright/test').Page} page
 * @returns {Promise<string[]>} An array containing the 'd' attribute for each trace.
 */
const getPlotPathData = async (page) => {
    // Wait for exactly two traces to be present
    await expect(page.locator('#plot-container .js-line')).toHaveCount(2);
    // Get the 'd' attribute from both path elements
    const pathData = await page.locator('#plot-container .js-line').evaluateAll(paths =>
        paths.map(p => p.getAttribute('d'))
    );
    return pathData;
};

test.beforeEach(async ({ page }) => {
    await page.goto(fileUrl);
    // Wait for the plot container to have its content rendered by Plotly
    // await expect(page.locator('#plot-container .plot')).toBeVisible();
    await page.waitForTimeout(500);
});

test('Alpha (α) parameter slider control', async ({ page }) => {
    // 1. Assert: The slider labeled "α" (`id="slider-alpha"`) is visible on the page.
    const sliderAlpha = page.locator('#slider-alpha');
    await expect(sliderAlpha).toBeVisible();

    // 2. Assert: The `slider-alpha` value is `0.05` and its corresponding value display (`id="value-alpha"`) shows "0.05".
    const valueAlpha = page.locator('#value-alpha');
    await expect(sliderAlpha).toHaveValue('0.05');
    await expect(valueAlpha).toHaveText(/^0\.050*$/);
    const initialPlotData = await getPlotPathData(page);

    // 3. Action: Set the value of `slider-alpha` to `0.1046`.
    await sliderAlpha.fill('0.1046');

    // 4. Assert: The `value-alpha` display updates to "0.1046" and the plot lines in `plot-container` are redrawn.
    await expect(valueAlpha).toHaveText(/^0\.10460*$/);
    const updatedPlotData = await getPlotPathData(page);
    expect(updatedPlotData).not.toEqual(initialPlotData);

    // 5. Action: Set the value of `slider-alpha` to its maximum, `0.2`.
    await sliderAlpha.fill('0.2');

    // 6. Assert: The `value-alpha` display updates to "0.2000" and the plot lines in `plot-container` change from the previous step.
    await expect(valueAlpha).toHaveText(/^0\.20000*$/);
    const maxPlotData = await getPlotPathData(page);
    expect(maxPlotData).not.toEqual(updatedPlotData);
});

test('Beta (β) parameter slider control', async ({ page }) => {
    // 1. Assert: The slider labeled "β" (`id="slider-beta"`) is visible on the page.
    const sliderBeta = page.locator('#slider-beta');
    await expect(sliderBeta).toBeVisible();

    // 2. Assert: The `slider-beta` value is `5` and its corresponding value display (`id="value-beta"`) shows "5".
    const valueBeta = page.locator('#value-beta');
    await expect(sliderBeta).toHaveValue('5');
    await expect(valueBeta).toHaveText('5');
    const initialPlotData = await getPlotPathData(page);

    // 3. Action: Set the value of `slider-beta` to `10.96`.
    await sliderBeta.fill('10.96');

    // 4. Assert: The `value-beta` display updates to "10.96" and the plot lines in `plot-container` are redrawn.
    await expect(valueBeta).toHaveText(/^10\.960*$/);
    const updatedPlotData = await getPlotPathData(page);
    expect(updatedPlotData).not.toEqual(initialPlotData);

    // 5. Action: Set the value of `slider-beta` to its minimum, `1`.
    await sliderBeta.fill('1');

    // 6. Assert: The `value-beta` display updates to "1.00" and the plot lines in `plot-container` change from the previous step.
    await expect(valueBeta).toHaveText(/^1\.000*$/);
    const minPlotData = await getPlotPathData(page);
    expect(minPlotData).not.toEqual(updatedPlotData);
});

test('Gamma (γ) parameter slider control', async ({ page }) => {
    // 1. Assert: The slider labeled "γ" (`id="slider-gamma"`) is visible on the page.
    const sliderGamma = page.locator('#slider-gamma');
    await expect(sliderGamma).toBeVisible();

    // 2. Assert: The `slider-gamma` value is `500` and its corresponding value display (`id="value-gamma"`) shows "500".
    const valueGamma = page.locator('#value-gamma');
    await expect(sliderGamma).toHaveValue('500');
    await expect(valueGamma).toHaveText('500');
    const initialPlotData = await getPlotPathData(page);

    // 3. Action: Set the value of `slider-gamma` to `966`.
    await sliderGamma.fill('966');

    // 4. Assert: The `value-gamma` display updates to "966" and the plot lines in `plot-container` are redrawn.
    await expect(valueGamma).toHaveText('966');
    const updatedPlotData = await getPlotPathData(page);
    expect(updatedPlotData).not.toEqual(initialPlotData);

    // 5. Action: Set the value of `slider-gamma` to its maximum, `2000`.
    await sliderGamma.fill('2000');

    // 6. Assert: The `value-gamma` display updates to "2000" and the plot lines in `plot-container` change from the previous step.
    await expect(valueGamma).toHaveText('2000');
    const maxPlotData = await getPlotPathData(page);
    expect(maxPlotData).not.toEqual(updatedPlotData);
});