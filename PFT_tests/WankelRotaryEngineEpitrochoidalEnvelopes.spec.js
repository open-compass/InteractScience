const { test, expect } = require('@playwright/test');
const path = require('path');

const fileUrl = 'file://' + path.resolve(__dirname, '../pages/WankelRotaryEngineEpitrochoidalEnvelopes.html');

test.describe('Wankel Rotary Engine: Epitrochoidal Envelopes', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(fileUrl);
    // Wait for the canvas to be potentially rendered by p5.js
    // await page.waitForSelector('#canvas-container canvas');
    await page.waitForTimeout(500);
  });

  test('Eccentricity Ratio Slider', async ({ page }) => {
    // 1. Assert: The "eccentricity ratio" slider (slider-eccentricity) is visible.
    await expect(page.locator('#slider-eccentricity')).toBeVisible();

    // 2. Assert: The slider's value is 0.14 and its corresponding label (label-eccentricity) displays "0.14".
    await expect(page.locator('#slider-eccentricity')).toHaveValue('0.14');
    await expect(page.locator('#label-eccentricity')).toHaveText(/^0\.140*$/);
    const initialCanvasScreenshot = await page.locator('#canvas-container canvas').screenshot();

    // 3. Action: Drag the slider to the right to a value of approximately 0.22.
    await page.locator('#slider-eccentricity').fill('0.22');

    // 4. Assert: The label label-eccentricity updates to "0.22" and the shape of the blue and orange curves on the canvas changes.
    await expect(page.locator('#label-eccentricity')).toHaveText(/^0\.220*$/);
    const midCanvasScreenshot = await page.locator('#canvas-container canvas').screenshot();
    expect(midCanvasScreenshot).not.toEqual(initialCanvasScreenshot);

    // 5. Action: Drag the slider to its maximum value (0.3).
    await page.locator('#slider-eccentricity').fill('0.3');

    // 6. Assert: The label label-eccentricity updates to "0.3" and the curves on the canvas are redrawn with a new shape.
    await expect(page.locator('#label-eccentricity')).toHaveText(/^0\.30*$/);
    const maxCanvasScreenshot = await page.locator('#canvas-container canvas').screenshot();
    expect(maxCanvasScreenshot).not.toEqual(midCanvasScreenshot);
  });

  test('Reference Frame Radio Buttons', async ({ page }) => {
    // 1. Assert: The "reference frame" radio button group is visible.
    await expect(page.locator('input[name="ref-frame"]').first()).toBeVisible();

    // 2. Assert: The "epitrochoid" option (radio-epitrochoid) is selected by default.
    await expect(page.locator('#radio-epitrochoid')).toBeChecked();
    const initialCanvasScreenshot = await page.locator('#canvas-container canvas').screenshot();

    // 3. Action: Click the "envelope" radio button (radio-envelope).
    await page.locator('label[for="radio-envelope"]').click();

    // 4. Assert: The "envelope" option is now selected, and the relative positions of the blue and orange curves on the canvas have changed.
    await expect(page.locator('#radio-envelope')).toBeChecked();
    const envelopeCanvasScreenshot = await page.locator('#canvas-container canvas').screenshot();
    expect(envelopeCanvasScreenshot).not.toEqual(initialCanvasScreenshot);

    // 5. Action: Click the "fixed centers" radio button (radio-fixed-centers).
    await page.locator('label[for="radio-fixed-centers"]').click();

    // 6. Assert: The "fixed centers" option is now selected, and the canvas is redrawn to reflect the new reference frame.
    await expect(page.locator('#radio-fixed-centers')).toBeChecked();
    const fixedCentersCanvasScreenshot = await page.locator('#canvas-container canvas').screenshot();
    expect(fixedCentersCanvasScreenshot).not.toEqual(envelopeCanvasScreenshot);
  });

  test('Envelope to Show Radio Buttons', async ({ page }) => {
    // 1. Assert: The "envelope to show" radio button group is visible.
    await expect(page.locator('input[name="envelope-type"]').first()).toBeVisible();

    // 2. Assert: The "inner" option (radio-inner) is selected by default.
    await expect(page.locator('#radio-inner')).toBeChecked();
    const initialCanvasScreenshot = await page.locator('#canvas-container canvas').screenshot();

    // 3. Action: Click the "outer" radio button (radio-outer).
    await page.locator('label[for="radio-outer"]').click();

    // 4. Assert: The "outer" option is now selected, and the orange curve on the canvas changes to the outer envelope shape.
    await expect(page.locator('#radio-outer')).toBeChecked();
    const outerCanvasScreenshot = await page.locator('#canvas-container canvas').screenshot();
    expect(outerCanvasScreenshot).not.toEqual(initialCanvasScreenshot);

    // 5. Action: Click the "both" radio button (radio-both).
    await page.locator('label[for="radio-both"]').click();

    // 6. Assert: The "both" option is now selected, and two orange curves (inner and outer envelopes) are visible on the canvas.
    await expect(page.locator('#radio-both')).toBeChecked();
    const bothCanvasScreenshot = await page.locator('#canvas-container canvas').screenshot();
    expect(bothCanvasScreenshot).not.toEqual(outerCanvasScreenshot);
  });

  test('Rotation Angle Slider', async ({ page }) => {
    // 1. Assert: The "rotation angle" slider (slider-rotation) is visible.
    await expect(page.locator('#slider-rotation')).toBeVisible();

    // 2. Assert: The slider's value is 0 and its corresponding label (label-rotation) displays "0".
    await expect(page.locator('#slider-rotation')).toHaveValue('0');
    await expect(page.locator('#label-rotation')).toHaveText('0');
    const initialCanvasScreenshot = await page.locator('#canvas-container canvas').screenshot();

    // 3. Action: Drag the slider to a new value, such as 4.6.
    await page.locator('#slider-rotation').fill('4.6');

    // 4. Assert: The label label-rotation updates to "4.6" and the orientation of the curves on the canvas changes.
    await expect(page.locator('#label-rotation')).toHaveText(/^4\.60*$/);
    const midCanvasScreenshot = await page.locator('#canvas-container canvas').screenshot();
    expect(midCanvasScreenshot).not.toEqual(initialCanvasScreenshot);

    // 5. Action: Drag the slider to its maximum value (6.28318).
    await page.locator('#slider-rotation').fill('6.28318');

    // 6. Assert: The label label-rotation updates to "6.28318" and the canvas is redrawn showing the final rotation position.
    await expect(page.locator('#label-rotation')).toHaveText(/^6\.283180*$/);
    const maxCanvasScreenshot = await page.locator('#canvas-container canvas').screenshot();
    expect(maxCanvasScreenshot).not.toEqual(midCanvasScreenshot);
  });

});