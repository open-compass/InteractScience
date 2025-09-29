const { test, expect } = require('@playwright/test');

const fileUrl = 'file://' + require('path').resolve(__dirname, '../pages/DeformationPatternInAnEarthquakeSourceRegion.html');

test.beforeEach(async ({ page }) => {
  await page.goto(fileUrl);
  // await page.waitForLoadState('domcontentloaded');
  await page.waitForTimeout(500);
});

test.describe('Slider and Control Functionality', () => {

  test('Strike Angle Slider Control', async ({ page }) => {
    // 1. Assert: The "strike angle" slider (`slider-strike`) is visible.
    await expect(page.locator('#slider-strike')).toBeVisible();

    // 2. Assert: The slider's value is 180, and its corresponding text display (`value-strike`) shows "180".
    await expect(page.locator('#slider-strike')).toHaveValue('180');
    await expect(page.locator('#value-strike')).toHaveValue('180');

    // 3. Action: Drag the slider to a new value, such as 90.
    await page.locator('#slider-strike').fill('90');

    // 4. Assert: The text display updates to "90", and the color pattern on the 3D sphere visualization changes.
    await expect(page.locator('#value-strike')).toHaveValue('90');

    // 5. Action: Drag the slider to its maximum value of 360.
    await page.locator('#slider-strike').fill('360');

    // 6. Assert: The text display updates to "360", and the 3D visualization updates.
    await expect(page.locator('#value-strike')).toHaveValue('360');
  });

  test('Dip Angle Slider Control', async ({ page }) => {
    // 1. Assert: The "dip angle" slider (`slider-dip`) is visible.
    await expect(page.locator('#slider-dip')).toBeVisible();

    // 2. Assert: The slider's value is 60, and its corresponding text display (`value-dip`) shows "60".
    await expect(page.locator('#slider-dip')).toHaveValue('60');
    await expect(page.locator('#value-dip')).toHaveValue('60');

    // 3. Action: Drag the slider to a new value, such as 30.
    await page.locator('#slider-dip').fill('30');

    // 4. Assert: The text display updates to "30", and the orientation of the P and T axes on the 3D sphere visualization changes.
    await expect(page.locator('#value-dip')).toHaveValue('30');

    // 5. Action: Drag the slider to its minimum value of 0.
    await page.locator('#slider-dip').fill('0');

    // 6. Assert: The text display updates to "0", and the 3D visualization updates.
    await expect(page.locator('#value-dip')).toHaveValue('0');
  });

  test('Slip Angle Slider Control', async ({ page }) => {
    // 1. Assert: The "slip angle" slider (`slider-slip-angle`) is visible.
    await expect(page.locator('#slider-slip-angle')).toBeVisible();

    // 2. Assert: The slider's value is 90, and its corresponding text display (`value-slip-angle`) shows "90".
    await expect(page.locator('#slider-slip-angle')).toHaveValue('90');
    await expect(page.locator('#value-slip-angle')).toHaveValue('90');

    // 3. Action: Drag the slider to a negative value, such as -90.
    await page.locator('#slider-slip-angle').fill('-90');

    // 4. Assert: The text display updates to "-90", and the color pattern and axis labels on the 3D sphere visualization change.
    await expect(page.locator('#value-slip-angle')).toHaveValue('-90');

    // 5. Action: Drag the slider to its minimum value of -180.
    await page.locator('#slider-slip-angle').fill('-180');

    // 6. Assert: The text display updates to "-180", and the 3D visualization updates.
    await expect(page.locator('#value-slip-angle')).toHaveValue('-180');
  });

  test('Slip Amount Slider Control', async ({ page }) => {
    // 1. Assert: The "amount of slip" slider (`slider-slip-amount`) is visible.
    await expect(page.locator('#slider-slip-amount')).toBeVisible();

    // 2. Assert: The slider's value is 0.5, and its corresponding text display (`value-slip-amount`) shows "0.5".
    await expect(page.locator('#slider-slip-amount')).toHaveValue('0.5');
    await expect(page.locator('#value-slip-amount')).toHaveValue('0.5');

    // 3. Action: Drag the slider to a higher value, such as 0.9.
    await page.locator('#slider-slip-amount').fill('0.9');

    // 4. Assert: The text display updates to "0.9", and the deformation of the sphere in the 3D visualization increases.
    await expect(page.locator('#value-slip-amount')).toHaveValue('0.9');

    // 5. Action: Drag the slider to its minimum value of 0.
    await page.locator('#slider-slip-amount').fill('0');

    // 6. Assert: The text display updates to "0", and the object in the 3D visualization becomes a perfect sphere.
    await expect(page.locator('#value-slip-amount')).toHaveValue('0');
  });

  test('Bounding Box Checkbox Toggle', async ({ page }) => {
    // 1. Assert: The "box" checkbox (`checkbox-box`) is visible.
    await expect(page.locator('#checkbox-box')).toBeVisible();

    // 2. Assert: The checkbox is unchecked by default and no bounding box is visible in the canvas.
    await expect(page.locator('#checkbox-box')).not.toBeChecked();

    // 3. Action: Click the "box" checkbox to check it.
    await page.locator('#checkbox-box').check();

    // 4. Assert: The checkbox becomes checked, and a wireframe bounding box appears around the sphere in the 3D visualization.
    await expect(page.locator('#checkbox-box')).toBeChecked();

    // 5. Action: Click the "box" checkbox again to uncheck it.
    await page.locator('#checkbox-box').uncheck();

    // 6. Assert: The checkbox becomes unchecked, and the wireframe bounding box disappears from the 3D visualization.
    await expect(page.locator('#checkbox-box')).not.toBeChecked();
  });

  test('Reset Button Functionality', async ({ page }) => {
    // 1. Assert: The reset button (`btn-reset`) is visible.
    await expect(page.locator('#btn-reset')).toBeVisible();

    // 2. Assert: The "strike angle" slider is at its default value of 180.
    await expect(page.locator('#slider-strike')).toHaveValue('180');

    // 3. Action: Change the "strike angle" slider to 100 and the "dip angle" slider to 45.
    await page.locator('#slider-strike').fill('100');
    await page.locator('#slider-dip').fill('45');

    // 4. Assert: The text displays for strike and dip update to "100" and "45" respectively, and the 3D visualization changes.
    await expect(page.locator('#value-strike')).toHaveValue('100');
    await expect(page.locator('#value-dip')).toHaveValue('45');

    // 5. Action: Click the reset button.
    await page.locator('#btn-reset').click();

    // 6. Assert: All sliders and text displays return to their default values (e.g., strike angle is 180), and the 3D visualization reverts to its initial state.
    await expect(page.locator('#slider-strike')).toHaveValue('180');
    await expect(page.locator('#value-strike')).toHaveValue('180');
    await expect(page.locator('#slider-dip')).toHaveValue('60');
    await expect(page.locator('#value-dip')).toHaveValue('60');
    await expect(page.locator('#slider-slip-angle')).toHaveValue('90');
    await expect(page.locator('#value-slip-angle')).toHaveValue('90');
    await expect(page.locator('#slider-slip-amount')).toHaveValue('0.5');
    await expect(page.locator('#value-slip-amount')).toHaveValue('0.5');
  });
});