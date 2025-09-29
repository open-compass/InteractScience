const { test, expect } = require('@playwright/test');
const path = require('path');

const fileUrl = 'file://' + path.resolve(__dirname, '../pages/ApproximatePHCalculationOfAcids.html');

test.beforeEach(async ({ page }) => {
  await page.goto(fileUrl);
  // Wait for a MathJax-rendered element to be visible to ensure the page is fully initialized.
  // await page.locator('#formula-strong').waitFor({ state: 'visible' });
  await page.waitForTimeout(500);
});

test.describe('Acid Concentration (C_a) Slider Interaction', () => {
  test('should update plot lines when C_a slider is moved', async ({ page }) => {
    // 1. Assert: The slider-logCa component is visible on the page.
    const caSlider = page.locator('#slider-logCa');
    await expect(caSlider).toBeVisible();

    // 2. Assert: The slider's value is initialized to its default of -1.
    await expect(caSlider).toHaveValue('-1');
    const canvas = page.locator('canvas');
    const initialScreenshot = await canvas.screenshot();

    // 3. Action: Drag the slider handle to a new value, for example, -2.
    await caSlider.fill('-2');

    // 4. Assert: The canvas plot is redrawn; the positions of the red, green, and blue lines have changed.
    const screenshotAfterFirstChange = await canvas.screenshot();
    expect(screenshotAfterFirstChange).not.toEqual(initialScreenshot);

    // 5. Action: Drag the slider handle to its maximum value of 0.
    await caSlider.fill('0');

    // 6. Assert: The canvas plot is redrawn again to reflect the new slider value.
    const screenshotAfterSecondChange = await canvas.screenshot();
    expect(screenshotAfterSecondChange).not.toEqual(screenshotAfterFirstChange);
  });
});

test.describe('Acid Dissociation Constant (pK_a) Slider Interaction', () => {
  test('should update indicator point when pK_a slider is moved', async ({ page }) => {
    // 1. Assert: The slider-pka component is visible on the page.
    const pkaSlider = page.locator('#slider-pka');
    await expect(pkaSlider).toBeVisible();

    // 2. Assert: The slider's value is initialized to its default of 1.2.
    await expect(pkaSlider).toHaveValue('1.2');
    const canvas = page.locator('canvas');
    const initialScreenshot = await canvas.screenshot();

    // 3. Action: Drag the slider handle to a new value, for example, 4.
    await pkaSlider.fill('4');

    // 4. Assert: The position of the orange indicator point on the blue curve has changed.
    const screenshotAfterFirstChange = await canvas.screenshot();
    expect(screenshotAfterFirstChange).not.toEqual(initialScreenshot);

    // 5. Action: Drag the slider handle to its minimum value of -4.
    await pkaSlider.fill('-4');

    // 6. Assert: The orange indicator point moves to the far left of the plot area, corresponding to the new pKa value.
    const screenshotAfterSecondChange = await canvas.screenshot();
    expect(screenshotAfterSecondChange).not.toEqual(screenshotAfterFirstChange);
  });
});