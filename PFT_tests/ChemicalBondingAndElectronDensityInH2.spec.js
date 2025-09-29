const { test, expect } = require('@playwright/test');
const path = require('path');

const fileUrl = 'file://' + path.resolve(__dirname, '../pages/ChemicalBondingAndElectronDensityInH2.html');

test.describe('Chemical Bonding and Electron Density in H2', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(fileUrl);
    await page.waitForTimeout(500);
  });

  test('Internuclear Distance (R) Slider Control', async ({ page }) => {
    // Locators
    const rSlider = page.locator('#slider-r');
    const rSliderValue = page.locator('#slider-r-value');
    const bondingPlot = page.locator('#bonding-plot-container');
    const antibondingPlot = page.locator('#antibonding-plot-container');

    // 1. Assert: The slider labeled "R (Å)" (`#slider-r`) is visible.
    await expect(page.locator('label', { hasText: 'R (Å)' })).toBeVisible();
    await expect(rSlider).toBeVisible();

    // 2. Assert: The slider's default value is 0.001, and the corresponding output element `#slider-r-value` displays "0.001".
    await expect(rSlider).toHaveValue('0.001');
    await expect(rSliderValue).toHaveText(/^0\.0010*$/);

    // Capture initial state of plots to verify changes later
    const initialBondingPlotHTML = await bondingPlot.innerHTML();
    const initialAntibondingPlotHTML = await antibondingPlot.innerHTML();

    // 3. Action: Drag the slider to a mid-range value (e.g., 1.922).
    await rSlider.fill('1.922');

    // 4. Assert: The output element `#slider-r-value` updates to show the new value (e.g., "1.922"). The surface data of the bonding and antibonding 3D plots has changed.
    await expect(rSliderValue).toHaveText(/^1\.9220*$/);
    const midRangeBondingPlotHTML = await bondingPlot.innerHTML();
    const midRangeAntibondingPlotHTML = await antibondingPlot.innerHTML();
    expect(midRangeBondingPlotHTML).not.toEqual(initialBondingPlotHTML);
    expect(midRangeAntibondingPlotHTML).not.toEqual(initialAntibondingPlotHTML);

    // 5. Action: Drag the slider to its maximum value of 4.0.
    await rSlider.fill('4');

    // 6. Assert: The output element `#slider-r-value` updates to "4.000". The surface data of the 3D plots has changed again to reflect the maximum internuclear distance.
    await expect(rSliderValue).toHaveText(/^4\.0000*$/);
    const maxRangeBondingPlotHTML = await bondingPlot.innerHTML();
    const maxRangeAntibondingPlotHTML = await antibondingPlot.innerHTML();
    expect(maxRangeBondingPlotHTML).not.toEqual(midRangeBondingPlotHTML);
    expect(maxRangeAntibondingPlotHTML).not.toEqual(midRangeAntibondingPlotHTML);
  });
});