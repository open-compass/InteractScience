const { test, expect } = require('@playwright/test');

test.describe('Visibility Region of a Polygon', () => {
  const fileUrl = 'file://' + require('path').resolve(__dirname, '../pages/VisibilityRegionOfAPolygon.html');

  test.beforeEach(async ({ page }) => {
    await page.goto(fileUrl);
  });

  test('Initial state with default source point and slider at 3', async ({ page }) => {
    // Assert: Take a screenshot of the initial UI state.
    await page.screenshot({ path: './snapshots/VisibilityRegionOfAPolygon-1.png', fullPage: true });
  });

  test('Source point dragged down and left from the center', async ({ page }) => {
    // Action: Drag the blue source point from its default central position to the approximate canvas coordinates (260, 325).
    const canvas = page.locator('#canvas-container canvas');
    const canvasBoundingBox = await canvas.boundingBox();
    const startX = canvasBoundingBox.x + 275;
    const startY = canvasBoundingBox.y + 275;
    const endX = canvasBoundingBox.x + 260;
    const endY = canvasBoundingBox.y + 325;

    await page.mouse.move(startX, startY);
    await page.mouse.down();
    await page.mouse.move(endX, endY);
    await page.mouse.up();

    // Assert: Take a screenshot of the current UI state.
    await page.screenshot({ path: './snapshots/VisibilityRegionOfAPolygon-2.png', fullPage: true });
  });

  test('Slider increased to 10 with the source point at the custom position', async ({ page }) => {
    // Action: Drag the blue source point to the approximate canvas coordinates (260, 325).
    const canvas = page.locator('#canvas-container canvas');
    const canvasBoundingBox = await canvas.boundingBox();
    const startX = canvasBoundingBox.x + 275;
    const startY = canvasBoundingBox.y + 275;
    const endX = canvasBoundingBox.x + 260;
    const endY = canvasBoundingBox.y + 325;

    await page.mouse.move(startX, startY);
    await page.mouse.down();
    await page.mouse.move(endX, endY);
    await page.mouse.up();

    // Action: Set the "vertices sorted by angle" slider to value 10.
    await page.locator('#angle-slider').fill('10');

    // Assert: Take a screenshot of the current UI state.
    await page.screenshot({ path: './snapshots/VisibilityRegionOfAPolygon-3.png', fullPage: true });
  });

  test('Slider set to the maximum value of 38', async ({ page }) => {
    // Action: Drag the blue source point to the approximate canvas coordinates (260, 325).
    const canvas = page.locator('#canvas-container canvas');
    const canvasBoundingBox = await canvas.boundingBox();
    const startX = canvasBoundingBox.x + 275;
    const startY = canvasBoundingBox.y + 275;
    const endX = canvasBoundingBox.x + 260;
    const endY = canvasBoundingBox.y + 325;

    await page.mouse.move(startX, startY);
    await page.mouse.down();
    await page.mouse.move(endX, endY);
    await page.mouse.up();
    
    // Action: Set the "vertices sorted by angle" slider to its maximum value, 38.
    await page.locator('#angle-slider').fill('38');

    // Assert: Take a screenshot of the current UI state.
    await page.screenshot({ path: './snapshots/VisibilityRegionOfAPolygon-4.png', fullPage: true });
  });
});