const { test, expect } = require('@playwright/test');

const fileUrl = 'file://' + require('path').resolve(__dirname, '../pages/KeplerOrbits.html');

test.describe('Eccentricity Slider (`slider-eccentricity`)', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(fileUrl);
    // Wait for initial content, especially MathJax rendering, to be complete.
    // await page.locator('#energy-value mjx-container').waitFor();
    await page.waitForTimeout(500);
  });

  test('Eccentricity Slider (`slider-eccentricity`)', async ({ page }) => {
    // 1. Assert: The slider with id="slider-eccentricity" is visible.
    await expect(page.locator('#slider-eccentricity')).toBeVisible();

    // 2. Assert: The slider's value is 0, the text display #value-eccentricity shows "0",
    //    and the energy display shows the fraction −1/4.
    await expect(page.locator('#slider-eccentricity')).toHaveValue('0');
    await expect(page.locator('#value-eccentricity')).toHaveText('0');
    // Check for the MathJax-rendered fraction by inspecting its container and ARIA label
    const initialEnergyContainer = page.locator('#energy-value mjx-container');
    await expect(initialEnergyContainer).toBeVisible();
    await expect(initialEnergyContainer).toHaveAttribute('aria-label', '\\(-\\frac{1}{4}\\)');

    // 3. Action: Set the slider's value to 0.8.
    await page.locator('#slider-eccentricity').fill('0.8');

    // 4. Assert: The text display #value-eccentricity updates to "0.8", the orbit path on the canvas changes to an ellipse,
    //    and the energy display updates to a numerical value.
    await expect(page.locator('#value-eccentricity')).toHaveText(/^0\.80*$/);
    // For ε=0.8, E = -0.25 * (1 - 0.8²) = -0.09
    await expect(page.locator('#energy-value')).toHaveText(/^\-0\.090*$/);
    // Note: Verifying the canvas drawing (ellipse) requires visual snapshot testing.

    // 5. Action: Drag the slider to its maximum value of 1.5.
    await page.locator('#slider-eccentricity').fill('1.5');

    // 6. Assert: The text display #value-eccentricity updates to "1.5", the orbit path changes to a hyperbola,
    //    and the energy display shows a positive numerical value.
    await expect(page.locator('#value-eccentricity')).toHaveText(/^1\.50*$/);
    // For ε=1.5, E = -0.25 * (1 - 1.5²) = 0.3125, formatted to 0.31
    await expect(page.locator('#energy-value')).toHaveText(/^0\.310*$/);
    // Note: Verifying the canvas drawing (hyperbola) requires visual snapshot testing.
  });
});