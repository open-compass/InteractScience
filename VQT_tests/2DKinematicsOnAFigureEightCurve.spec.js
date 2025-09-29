const { test, expect } = require('@playwright/test');
const path = require('path');

const fileUrl = 'file://' + path.resolve(__dirname, '../pages/2DKinematicsOnAFigureEightCurve.html');

test.describe('2DKinematicsOnAFigureEightCurve', () => {

  test('Default view with acceleration vector in rectangular coordinates', async ({ page }) => {
    await page.goto(fileUrl);
    // 1. Action: Load the demo. The UI is in its default state (time=0.4, acceleration on, rectangular coordinates).
    // The page is already loaded in its default state.

    // 2. Assert: Take a screenshot of the current UI state.
    await page.screenshot({ path: './snapshots/2DKinematicsOnAFigureEightCurve-1.png', fullPage: true });
  });

  test('Acceleration vector with instantaneous circle in rectangular coordinates', async ({ page }) => {
    await page.goto(fileUrl);
    
    // 1. Action: Click the "on" radio button for "instantaneous circle" (`#radio-circle-on`).
    await page.locator('#radio-circle-on').click();

    // 2. Assert: Take a screenshot of the current UI state.
    await page.screenshot({ path: './snapshots/2DKinematicsOnAFigureEightCurve-2.png', fullPage: true });
  });

  test('Acceleration vector with instantaneous circle in normal-tangential coordinates', async ({ page }) => {
    await page.goto(fileUrl);

    // 1. Action: Click the "on" radio button for "instantaneous circle" (`#radio-circle-on`).
    await page.locator('#radio-circle-on').click();

    // 2. Action: Click the "coordinate system" dropdown (`#select-coords`) and select the "normal-tangential" option.
    await page.locator('#select-coords').selectOption('normal-tangential');

    // 3. Assert: Take a screenshot of the current UI state.
    await page.screenshot({ path: './snapshots/2DKinematicsOnAFigureEightCurve-3.png', fullPage: true });
  });

  test('All vectors visible with instantaneous circle in polar coordinates at a different time', async ({ page }) => {
    await page.goto(fileUrl);

    // 1. Action: Drag the "time" slider (`#slider-time`) to the far left (approximately 5% of its range).
    const slider = await page.locator('#slider-time');
    const sliderBoundingBox = await slider.boundingBox();
    await page.mouse.click(sliderBoundingBox.x + sliderBoundingBox.width * 0.05, sliderBoundingBox.y + sliderBoundingBox.height / 2);

    // 2. Action: Click the "on" radio button for "position" (`#radio-position-on`).
    await page.locator('#radio-position-on').click();

    // 3. Action: Click the "on" radio button for "velocity" (`#radio-velocity-on`).
    await page.locator('#radio-velocity-on').click();

    // 4. Action: Click the "coordinate system" dropdown (`#select-coords`) and select the "polar" option.
    await page.locator('#select-coords').selectOption('polar');

    // 5. Action: Click the "on" radio button for "instantaneous circle" (`#radio-circle-on`).
    await page.locator('#radio-circle-on').click();

    // 6. Assert: Take a screenshot of the current UI state.
    await page.screenshot({ path: './snapshots/2DKinematicsOnAFigureEightCurve-4.png', fullPage: true });
  });

});