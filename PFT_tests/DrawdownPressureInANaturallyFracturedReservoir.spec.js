const { test, expect } = require('@playwright/test');
const path = require('path');

const fileUrl = 'file://' + path.resolve(__dirname, '../pages/DrawdownPressureInANaturallyFracturedReservoir.html');

/**
 * Helper function to retrieve the y-axis data from the Plotly chart.
 * @param {import('@playwright/test').Page} page The Playwright page object.
 * @returns {Promise<number[]|null>} A promise that resolves to an array of numbers representing the y-data, or null if not found.
 */
const getPlotYData = async (page) => {
  return await page.evaluate(() => {
    const plotDiv = document.getElementById('plot-container');
    if (plotDiv && plotDiv.data) {
      return plotDiv.data[0].y;
    }
    return null;
  });
};

test.describe('Drawdown Pressure in a Naturally Fractured Reservoir', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(fileUrl);
    // Wait for the plot to be rendered initially
    // await page.waitForSelector('#plot-container .plot-container');
    await page.waitForTimeout(500);
  });

  test('Permeability Ratio (λ) Slider Control', async ({ page }) => {
    // 1. Assert: The slider with id `#slider-lambda` and its value display `#value-lambda` are visible.
    const slider = page.locator('#slider-lambda');
    const valueDisplay = page.locator('#value-lambda');
    await expect(slider).toBeVisible();
    await expect(valueDisplay).toBeVisible();

    // 2. Assert: The `#slider-lambda` value is `-5`, and the text of `#value-lambda` is "0.00001".
    await expect(slider).toHaveValue('-5');
    await expect(valueDisplay).toHaveText(/^0\.000010*$/);
    const initialYData = await getPlotYData(page);

    // 3. Action: Drag the `#slider-lambda` to a new value, such as `-6`.
    await slider.fill('-6');

    // 4. Assert: The text of `#value-lambda` updates (e.g., to "1e-6"), and the plot's data trace has changed.
    await expect(valueDisplay).toHaveText('1e-6');
    const newYData = await getPlotYData(page);
    expect(newYData).not.toEqual(initialYData);

    // 5. Action: Drag the `#slider-lambda` to its maximum value, `-4`.
    await slider.fill('-4');

    // 6. Assert: The slider value is `-4`, the text of `#value-lambda` is "0.0001", and the plot's data trace has changed again.
    await expect(slider).toHaveValue('-4');
    await expect(valueDisplay).toHaveText(/^0\.00010*$/);
    const finalYData = await getPlotYData(page);
    expect(finalYData).not.toEqual(newYData);
  });

  test('Storativity Ratio (ω) Slider Control', async ({ page }) => {
    // 1. Assert: The slider with id `#slider-omega` and its value display `#value-omega` are visible.
    const slider = page.locator('#slider-omega');
    const valueDisplay = page.locator('#value-omega');
    await expect(slider).toBeVisible();
    await expect(valueDisplay).toBeVisible();

    // 2. Assert: The `#slider-omega` value is `-2`, and the text of `#value-omega` is "0.01".
    await expect(slider).toHaveValue('-2');
    await expect(valueDisplay).toHaveText(/^0\.010*$/);
    const initialYData = await getPlotYData(page);

    // 3. Action: Drag the `#slider-omega` to a new value, such as `-1.5`.
    await slider.fill('-1.5');

    // 4. Assert: The text of `#value-omega` updates, and the plot's data trace has changed.
    await expect(valueDisplay).not.toHaveText(/^0\.010*$/);
    const newYData = await getPlotYData(page);
    expect(newYData).not.toEqual(initialYData);

    // 5. Action: Drag the `#slider-omega` to its minimum value, `-3`.
    await slider.fill('-3');

    // 6. Assert: The slider value is `-3`, the text of `#value-omega` is "0.001", and the plot's data trace has changed again.
    await expect(slider).toHaveValue('-3');
    await expect(valueDisplay).toHaveText(/^0\.0010*$/);
    const finalYData = await getPlotYData(page);
    expect(finalYData).not.toEqual(newYData);
  });

  test('Plot Type Option Toggle', async ({ page }) => {
    // 1. Assert: The "pressure drop" (`#btn-pressure-drop`) and "difference" (`#btn-difference`) buttons are visible.
    const btnPressureDrop = page.locator('#btn-pressure-drop');
    const btnDifference = page.locator('#btn-difference');
    const plotTitle = page.locator('#plot-container .gtitle');

    await expect(btnPressureDrop).toBeVisible();
    await expect(btnDifference).toBeVisible();

    // 2. Assert: The "pressure drop" button has the `active` class, and the plot title is "pressure drawdown at the wellbore".
    await expect(btnPressureDrop).toHaveClass('active');
    await expect(plotTitle).toHaveText('pressure drawdown at the wellbore');

    // 3. Action: Click the "difference" button.
    await btnDifference.click();

    // 4. Assert: The "difference" button now has the `active` class, the "pressure drop" button does not, and the plot title has changed to "deviation from the asymptote".
    await expect(btnDifference).toHaveClass('active');
    await expect(btnPressureDrop).not.toHaveClass('active');
    await expect(plotTitle).toHaveText('deviation from the asymptote');

    // 5. Action: Click the "pressure drop" button again.
    await btnPressureDrop.click();

    // 6. Assert: The "pressure drop" button regains the `active` class, and the plot title reverts to "pressure drawdown at the wellbore".
    await expect(btnPressureDrop).toHaveClass('active');
    await expect(plotTitle).toHaveText('pressure drawdown at the wellbore');
  });

});