const { test, expect } = require('@playwright/test');
const path = require('path');

// Define the path to the local HTML file
const fileUrl = 'file://' + path.resolve(__dirname, '../pages/PinchCompositionVersusRefluxRatioForABenzeneEthylenediamineM.html');

test.describe('Distillate Composition Slider (`slider-xD`)', () => {

  test.beforeEach(async ({ page }) => {
    // Navigate to the local HTML file before each test
    await page.goto(fileUrl);
    await page.waitForTimeout(500);
  });

  test('Distillate Composition Slider (`slider-xD`)', async ({ page }) => {
    // 1. Assert: The "distillate composition" slider (`#slider-xD`) is visible.
    const slider = page.locator('#slider-xD');
    await expect(slider).toBeVisible();

    // 2. Assert: The slider's default value is 0.84, and the corresponding numeric display (`#label-xD`) shows "0.84".
    const label = page.locator('#label-xD');
    await expect(slider).toHaveValue('0.84');
    await expect(label).toHaveText(/^0\.840*$/);

    // 3. Action: Drag the slider to a value of 0.99.
    await slider.fill('0.99');

    // 4. Assert: The slider's value is now 0.99, the numeric display shows "0.99", and the plot has updated to show both the red curve and the blue tangent pinch point marker.
    await expect(slider).toHaveValue('0.99');
    await expect(label).toHaveText(/^0\.990*$/);
    // The plan specifies two traces when the pinch point exists. We verify their presence.
    await expect(page.locator('#plot .scatter')).toHaveCount(2);

    // 5. Action: Drag the slider to its minimum value, 0.80.
    await slider.fill('0.80');

    // 6. Assert: The slider's value is now 0.80, the numeric display shows "0.80", and the plot has updated, with the blue marker no longer being visible.
    await expect(slider).toHaveValue('0.80');
    await expect(label).toHaveText(/^0\.800*$/);
    // The plan specifies the marker trace is empty/not visible, so only one trace should exist.
    await expect(page.locator('#plot .scatter')).toHaveCount(1);
  });
});