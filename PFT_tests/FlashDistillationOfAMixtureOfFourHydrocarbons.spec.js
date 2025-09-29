const { test, expect } = require('@playwright/test');

const fileUrl = 'file://' + require('path').resolve(__dirname, '../pages/FlashDistillationOfAMixtureOfFourHydrocarbons.html');

test.beforeEach(async ({ page }) => {
  await page.goto(fileUrl);
  // Wait for the p5.js canvas to be created and rendered.
  // await page.waitForSelector('#visualization-area canvas');
  await page.waitForTimeout(500);
});

test.describe('Interactive Components', () => {

  test('Flash Pressure Slider', async ({ page }) => {
    const pressureSlider = page.locator('#slider-pressure');
    const pressureValueDisplay = page.locator('#pressure-value');
    const visualizationArea = page.locator('#visualization-area');

    // 1. Assert: The "flash pressure" slider (`#slider-pressure`) is visible.
    await expect(pressureSlider).toBeVisible();

    // 2. Assert: The slider's value is 180, and the corresponding value display (`#pressure-value`) shows "180".
    await expect(pressureSlider).toHaveValue('180');
    await expect(pressureValueDisplay).toHaveText('180');

    const screenshotBeforeUpdate = await visualizationArea.screenshot();

    // 3. Action: Set the slider's value to 500.
    await pressureSlider.fill('500');

    // 4. Assert: The value display (`#pressure-value`) updates to "500", and the "flash pressure" text in the diagram changes.
    await expect(pressureValueDisplay).toHaveText('500');
    const screenshotAfterFirstUpdate = await visualizationArea.screenshot();
    expect(screenshotAfterFirstUpdate).not.toEqual(screenshotBeforeUpdate);
    
    // 5. Action: Set the slider's value to its maximum (1000).
    await pressureSlider.fill('1000');

    // 6. Assert: The value display (`#pressure-value`) updates to "1000", and the calculated values for mole fractions in the diagram change.
    await expect(pressureValueDisplay).toHaveText('1000');
    const screenshotAfterSecondUpdate = await visualizationArea.screenshot();
    expect(screenshotAfterSecondUpdate).not.toEqual(screenshotAfterFirstUpdate);
  });

  test('Heat Load Slider', async ({ page }) => {
    const heatSlider = page.locator('#slider-heat');
    const heatValueDisplay = page.locator('#heat-value');
    const visualizationArea = page.locator('#visualization-area');

    // 1. Assert: The "heat load" slider (`#slider-heat`) is visible.
    await expect(heatSlider).toBeVisible();

    // 2. Assert: The slider's value is 0, and the corresponding value display (`#heat-value`) shows "0".
    await expect(heatSlider).toHaveValue('0');
    await expect(heatValueDisplay).toHaveText('0');

    const screenshotBeforeUpdate = await visualizationArea.screenshot();

    // 3. Action: Set the slider's value to 3000.
    await heatSlider.fill('3000');

    // 4. Assert: The value display (`#heat-value`) updates to "3000", and the "Q = [value]" text in the diagram changes.
    await expect(heatValueDisplay).toHaveText('3000');
    const screenshotAfterFirstUpdate = await visualizationArea.screenshot();
    expect(screenshotAfterFirstUpdate).not.toEqual(screenshotBeforeUpdate);

    // 5. Action: Set the slider's value to its maximum (10000).
    await heatSlider.fill('10000');

    // 6. Assert: The value display (`#heat-value`) updates to "10000", and the calculated "flash temperature" text in the diagram changes.
    await expect(heatValueDisplay).toHaveText('10000');
    const screenshotAfterSecondUpdate = await visualizationArea.screenshot();
    expect(screenshotAfterSecondUpdate).not.toEqual(screenshotAfterFirstUpdate);
  });

});