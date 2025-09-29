const { test, expect } = require('@playwright/test');

test.describe('WankelRotaryEngineEpitrochoidalEnvelopes', () => {
  const fileUrl = 'file://' + require('path').resolve(__dirname, '../pages/WankelRotaryEngineEpitrochoidalEnvelopes.html');

  test.beforeEach(async ({ page }) => {
    await page.goto(fileUrl);
  });

  test('Initial state with default parameters', async ({ page }) => {
    // 1. Action: Load the page. All controls are at their default initial values (eccentricity ratio: 0.14, reference frame: epitrochoid, envelope to show: inner, rotation angle: 0).
    // This is handled by beforeEach

    // 2. Assert: Take a screenshot of the current UI state.
    await page.screenshot({ path: './snapshots/WankelRotaryEngineEpitrochoidalEnvelopes-1.png', fullPage: true });
  });

  test('Rotated view with slightly increased eccentricity', async ({ page }) => {
    // 1. Action: Drag the "eccentricity ratio" slider until its value is approximately 0.142857.
    await page.locator('#slider-eccentricity').fill('0.142857');

    // 2. Action: Drag the "rotation angle" slider until its value is approximately 5.2818.
    await page.locator('#slider-rotation').fill('5.2818');

    // 3. Assert: Take a screenshot of the current UI state.
    await page.screenshot({ path: './snapshots/WankelRotaryEngineEpitrochoidalEnvelopes-2.png', fullPage: true });
  });

  test("High eccentricity with 'envelope' reference frame and both envelopes shown", async ({ page }) => {
    // 1. Action: Drag the "eccentricity ratio" slider until its value is 0.22.
    await page.locator('#slider-eccentricity').fill('0.22');

    // 2. Action: In the "reference frame" control, click the "envelope" radio button.
    await page.locator('#radio-envelope').click();

    // 3. Action: In the "envelope to show" control, click the "both" radio button.
    await page.locator('#radio-both').click();

    // 4. Action: Drag the "rotation angle" slider until its value is approximately 4.63385.
    await page.locator('#slider-rotation').fill('4.63385');

    // 5. Assert: Take a screenshot of the current UI state.
    await page.screenshot({ path: './snapshots/WankelRotaryEngineEpitrochoidalEnvelopes-3.png', fullPage: true });
  });

  test("Low eccentricity with 'fixed centers' reference frame", async ({ page }) => {
    // 1. Action: Drag the "eccentricity ratio" slider until its value is 0.086.
    await page.locator('#slider-eccentricity').fill('0.086');

    // 2. Action: In the "reference frame" control, click the "fixed centers" radio button.
    await page.locator('#radio-fixed-centers').click();

    // 3. Action: In the "envelope to show" control, click the "both" radio button.
    await page.locator('#radio-both').click();

    // 4. Action: Drag the "rotation angle" slider until its value is approximately 4.69275.
    await page.locator('#slider-rotation').fill('4.69275');

    // 5. Assert: Take a screenshot of the current UI state.
    await page.screenshot({ path: './snapshots/WankelRotaryEngineEpitrochoidalEnvelopes-4.png', fullPage: true });
  });
});