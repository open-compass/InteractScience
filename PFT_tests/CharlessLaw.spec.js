const { test, expect } = require('@playwright/test');

const fileUrl = 'file://' + require('path').resolve(__dirname, '../pages/CharlessLaw.html');

test.describe("Charles's Law Interactive Demo", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(fileUrl);
    // Wait for Plotly and p5.js to potentially render
    // await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(500);
  });

  test('Initial Volume (v₀) Slider Interaction', async ({ page }) => {
    const v0Slider = page.locator('#slider-v0');
    const visualizationArea = page.locator('#visualization-area');

    // 1. Assert: The "initial volume v₀" slider (id="slider-v0") is visible.
    await expect(v0Slider).toBeVisible();

    // 2. Assert: The slider's value is 211 by default.
    await expect(v0Slider).toHaveValue('211');
    const initialState = await visualizationArea.screenshot();

    // 3. Action: Drag the slider to a value of 400.
    await v0Slider.fill('400');

    // 4. Assert: The slope of the line in the plot changes and the height of the gas in the piston visualization changes.
    const stateAt400 = await visualizationArea.screenshot();
    expect(stateAt400).not.toEqual(initialState);

    // 5. Action: Drag the slider to its maximum value of 500.
    await v0Slider.fill('500');

    // 6. Assert: The plot's line and the piston's gas height update again compared to the previous state.
    const stateAt500 = await visualizationArea.screenshot();
    expect(stateAt500).not.toEqual(stateAt400);
  });

  test('Temperature (T) Slider Interaction', async ({ page }) => {
    const tempSlider = page.locator('#slider-T');
    const visualizationArea = page.locator('#visualization-area');

    // 1. Assert: The "temperature T" slider (id="slider-T") is visible.
    await expect(tempSlider).toBeVisible();

    // 2. Assert: The slider's value is 270 by default (in Celsius mode).
    await expect(tempSlider).toHaveValue('270');
    const initialState = await visualizationArea.screenshot();

    // 3. Action: Drag the slider to a value of 500.
    await tempSlider.fill('500');

    // 4. Assert: The position of the marker on the plot's line changes, and the color of the gas in the piston visualization changes.
    const stateAt500 = await visualizationArea.screenshot();
    expect(stateAt500).not.toEqual(initialState);

    // 5. Action: Drag the slider to its minimum value of -273.
    await tempSlider.fill('-273');

    // 6. Assert: The marker on the plot moves to the far left of the line and the gas color updates to reflect the minimum temperature.
    const stateAtMin = await visualizationArea.screenshot();
    expect(stateAtMin).not.toEqual(stateAt500);
  });

  test('Temperature Units Radio Button Group', async ({ page }) => {
    const radioKelvin = page.locator('#radio-kelvin');
    const radioCelsius = page.locator('#radio-celsius');
    const tempSlider = page.locator('#slider-T');
    const plotXAxisLabel = page.locator('#plot-container .xtitle');

    // 1. Assert: The "Kelvin" and "Celsius" radio buttons are visible.
    await expect(radioKelvin).toBeVisible();
    await expect(radioCelsius).toBeVisible();

    // 2. Assert: The "Celsius" radio button (id="radio-celsius") is checked by default.
    await expect(radioCelsius).toBeChecked();

    // 3. Action: Click the "Kelvin" radio button (id="radio-kelvin").
    await radioKelvin.click();

    // 4. Assert: The plot's x-axis label changes to "temperature K" and the `max` attribute of the temperature slider (id="slider-T") is updated to 1000.
    await expect(plotXAxisLabel).toHaveText('temperature K');
    await expect(tempSlider).toHaveAttribute('max', '1000');

    // 5. Action: Click the "Celsius" radio button (id="radio-celsius") to switch back.
    await radioCelsius.click();

    // 6. Assert: The plot's x-axis label changes back to "temperature °C" and the `max` attribute of the temperature slider is updated to 727.
    await expect(plotXAxisLabel).toHaveText('temperature °C');
    await expect(tempSlider).toHaveAttribute('max', '727');
  });
});