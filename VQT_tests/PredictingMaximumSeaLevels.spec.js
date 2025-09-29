const { test, expect } = require('@playwright/test');

test.describe('Predicting Maximum Sea Levels', () => {
  const fileUrl = 'file://' + require('path').resolve(__dirname, '../pages/PredictingMaximumSeaLevels.html');

  test('Initial state with default parameters', async ({ page }) => {
    await page.goto(fileUrl);
    // Assert: Take a screenshot of the current UI state to verify all parameters are set to their default values upon page load.
    await page.screenshot({ path: './snapshots/PredictingMaximumSeaLevels-1.png', fullPage: true });
  });

  test('Distributions separated with a high return period', async ({ page }) => {
    await page.goto(fileUrl);
    // Action: Set the "location μ₁" slider (id="slider-mu1") to the value 4.81.
    await page.locator('#slider-mu1').fill('4.81');
    // Action: Set the "scale σ₁" slider (id="slider-sigma1") to the value 0.31.
    await page.locator('#slider-sigma1').fill('0.31');
    // Action: Set the "shape ξ₁" slider (id="slider-xi1") to the value -0.25.
    await page.locator('#slider-xi1').fill('-0.25');
    // Action: Set the "location μ₂" slider (id="slider-mu2") to the value 3.6.
    await page.locator('#slider-mu2').fill('3.6');
    // Action: Set the "shape ξ₂" slider (id="slider-xi2") to the value 0.18.
    await page.locator('#slider-xi2').fill('0.18');
    // Action: Set the "P_max" slider (id="slider-pmax") to the value 325.
    await page.locator('#slider-pmax').fill('325');
    // Assert: Take a screenshot of the current UI state.
    await page.screenshot({ path: './snapshots/PredictingMaximumSeaLevels-2.png', fullPage: true });
  });

  test('Maximum return period with narrow distribution 2', async ({ page }) => {
    await page.goto(fileUrl);
    // Action: Set the "location μ₁" slider (id="slider-mu1") to the value 4.81.
    await page.locator('#slider-mu1').fill('4.81');
    // Action: Set the "scale σ₁" slider (id="slider-sigma1") to the value 0.31.
    await page.locator('#slider-sigma1').fill('0.31');
    // Action: Set the "shape ξ₁" slider (id="slider-xi1") to the value -0.13.
    await page.locator('#slider-xi1').fill('-0.13');
    // Action: Set the "location μ₂" slider (id="slider-mu2") to the value 3.85.
    await page.locator('#slider-mu2').fill('3.85');
    // Action: Set the "scale σ₂" slider (id="slider-sigma2") to the value 0.18.
    await page.locator('#slider-sigma2').fill('0.18');
    // Action: Set the "shape ξ₂" slider (id="slider-xi2") to the value 0.17.
    await page.locator('#slider-xi2').fill('0.17');
    // Action: Set the "P_max" slider (id="slider-pmax") to the value 1000.
    await page.locator('#slider-pmax').fill('1000');
    // Assert: Take a screenshot of the current UI state.
    await page.screenshot({ path: './snapshots/PredictingMaximumSeaLevels-3.png', fullPage: true });
  });

  test('Swapped distribution locations with intersecting return curves', async ({ page }) => {
    await page.goto(fileUrl);
    // Action: Set the "location μ₁" slider (id="slider-mu1") to the value 3.0.
    await page.locator('#slider-mu1').fill('3');
    // Action: Set the "scale σ₁" slider (id="slider-sigma1") to the value 0.39.
    await page.locator('#slider-sigma1').fill('0.39');
    // Action: Set the "shape ξ₁" slider (id="slider-xi1") to the value 0.18.
    await page.locator('#slider-xi1').fill('0.18');
    // Action: Set the "location μ₂" slider (id="slider-mu2") to the value 4.45.
    await page.locator('#slider-mu2').fill('4.45');
    // Action: Set the "scale σ₂" slider (id="slider-sigma2") to the value 0.26.
    await page.locator('#slider-sigma2').fill('0.26');
    // Action: Set the "shape ξ₂" slider (id="slider-xi2") to the value -0.06.
    await page.locator('#slider-xi2').fill('-0.06');
    // Action: Set the "P_max" slider (id="slider-pmax") to the value 100.
    await page.locator('#slider-pmax').fill('100');
    // Assert: Take a screenshot of the current UI state.
    await page.screenshot({ path: './snapshots/PredictingMaximumSeaLevels-4.png', fullPage: true });
  });
});