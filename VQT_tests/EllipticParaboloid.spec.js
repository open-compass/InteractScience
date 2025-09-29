const { test, expect } = require('@playwright/test');

const fileUrl = 'file://' + require('path').resolve(__dirname, '../pages/EllipticParaboloid.html');

test.describe('Elliptic Paraboloid Visualization', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(fileUrl);
    // Wait for a small amount of time to ensure the 3D scene is rendered
    await page.waitForTimeout(500);
  });

  test('Initial state with default parameters', async ({ page }) => {
    // 1. Action: Load the demo page. (Handled by beforeEach)
    // 2. Assert: Take a screenshot of the current UI state.
    await page.screenshot({ path: './snapshots/EllipticParaboloid-1.png', fullPage: true });
  });

  test('Paraboloid stretched along the x-axis', async ({ page }) => {
    // 1. Action: Change the value of the number input with id `input-a` to `3.0`.
    await page.locator('#input-a').fill('3');
    // 2. Assert: Take a screenshot of the current UI state.
    await page.screenshot({ path: './snapshots/EllipticParaboloid-2.png', fullPage: true });
  });

  test('Paraboloid stretched along the y-axis and rotated', async ({ page }) => {
    // 1. Action: Change the value of the number input with id `input-b` to `3.0`.
    await page.locator('#input-b').fill('3');

    // 2. Action: Click and drag on the canvas from the center horizontally to the left by approximately 30% of the canvas width to rotate the camera.
    const canvas = page.locator('#canvas-container canvas');
    const boundingBox = await canvas.boundingBox();
    const startPoint = {
      x: boundingBox.x + boundingBox.width / 2,
      y: boundingBox.y + boundingBox.height / 2,
    };
    const endPoint = {
      x: startPoint.x - boundingBox.width * 0.3,
      y: startPoint.y,
    };

    await page.mouse.move(startPoint.x, startPoint.y);
    await page.mouse.down();
    await page.mouse.move(endPoint.x, endPoint.y);
    await page.mouse.up();
    
    // Wait for rotation animation to settle
    await page.waitForTimeout(200);

    // 3. Assert: Take a screenshot of the current UI state.
    await page.screenshot({ path: './snapshots/EllipticParaboloid-3.png', fullPage: true });
  });

  test('Paraboloid with increased curvature', async ({ page }) => {
    // 1. Action: Change the value of the number input with id `input-c` to `3.0`.
    await page.locator('#input-c').fill('3');
    // 2. Assert: Take a screenshot of the current UI state.
    await page.screenshot({ path: './snapshots/EllipticParaboloid-4.png', fullPage: true });
  });

});