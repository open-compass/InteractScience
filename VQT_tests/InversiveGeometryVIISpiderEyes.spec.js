const { test, expect } = require('@playwright/test');

const fileUrl = 'file://' + require('path').resolve(__dirname, '../pages/InversiveGeometryVIISpiderEyes.html');

test.describe('Inversive Geometry VII: Spider Eyes', () => {

  test('Initial view with one ring of eight circles', async ({ page }) => {
    await page.goto(fileUrl);

    await page.locator('#rings-control-group').getByLabel('1', { exact: true }).click();
    await page.locator('#circles-per-ring-control-group').getByLabel('8', { exact: true }).click();
    
    await page.screenshot({ path: './snapshots/InversiveGeometryVIISpiderEyes-1.png', fullPage: true });
  });

  test('View with six rings of eight circles', async ({ page }) => {
    await page.goto(fileUrl);
    
    await page.locator('#rings-control-group').getByLabel('6', { exact: true }).click();
    
    await page.screenshot({ path: './snapshots/InversiveGeometryVIISpiderEyes-2.png', fullPage: true });
  });

  test('Inverse mode enabled with locators moved close together', async ({ page }) => {
    await page.goto(fileUrl);
    
    await page.locator('#rings-control-group').getByLabel('6', { exact: true }).click();
    await page.getByLabel('inverse').check();
    
    const canvas = page.locator('#p5-canvas');
    const canvasBoundingBox = await canvas.boundingBox();
    
    const canvasCenterX = canvasBoundingBox.x + canvasBoundingBox.width / 2;
    const canvasCenterY = canvasBoundingBox.y + canvasBoundingBox.height / 2;
    
    // Initial locator positions (relative to canvas center): right=(50, 0), left=(-50, 0)
    const rightLocatorStartX = canvasCenterX + 50;
    const rightLocatorStartY = canvasCenterY;
    const leftLocatorStartX = canvasCenterX - 50;
    const leftLocatorStartY = canvasCenterY;

    // Target positions based on description
    // Right locator: "slightly above and left of the canvas center"
    const rightLocatorTargetX = canvasCenterX - 20;
    const rightLocatorTargetY = canvasCenterY - 30;
    // Left locator: "slightly below the other locator, near the canvas center"
    const leftLocatorTargetX = rightLocatorTargetX;
    const leftLocatorTargetY = rightLocatorTargetY + 30;

    // Drag right locator
    await page.mouse.move(rightLocatorStartX, rightLocatorStartY);
    await page.mouse.down();
    await page.mouse.move(rightLocatorTargetX, rightLocatorTargetY);
    await page.mouse.up();
    
    // Drag left locator
    await page.mouse.move(leftLocatorStartX, leftLocatorStartY);
    await page.mouse.down();
    await page.mouse.move(leftLocatorTargetX, leftLocatorTargetY);
    await page.mouse.up();

    await page.screenshot({ path: './snapshots/InversiveGeometryVIISpiderEyes-3.png', fullPage: true });
  });

  test('Inverse mode with locators moved further apart and to the left', async ({ page }) => {
    await page.goto(fileUrl);
    
    await page.locator('#rings-control-group').getByLabel('6', { exact: true }).click();
    await page.getByLabel('inverse').check();
    
    const canvas = page.locator('#p5-canvas');
    const canvasBoundingBox = await canvas.boundingBox();
    
    const canvasTopLeftX = canvasBoundingBox.x;
    const canvasTopLeftY = canvasBoundingBox.y;
    const canvasCenterX = canvasBoundingBox.x + canvasBoundingBox.width / 2;
    const canvasCenterY = canvasBoundingBox.y + canvasBoundingBox.height / 2;
    
    // Initial locator positions (relative to canvas center): right=(50, 0), left=(-50, 0)
    const rightLocatorStartX = canvasCenterX + 50;
    const rightLocatorStartY = canvasCenterY;
    const leftLocatorStartX = canvasCenterX - 50;
    const leftLocatorStartY = canvasCenterY;

    // Target positions based on description
    // Right locator: "upper left quadrant"
    const rightLocatorTargetX = canvasTopLeftX + 150;
    const rightLocatorTargetY = canvasTopLeftY + 150;
    // Left locator: "lower left quadrant ... below the other locator"
    const leftLocatorTargetX = canvasTopLeftX + 150;
    const leftLocatorTargetY = canvasTopLeftY + 400;

    // Drag right locator
    await page.mouse.move(rightLocatorStartX, rightLocatorStartY);
    await page.mouse.down();
    await page.mouse.move(rightLocatorTargetX, rightLocatorTargetY);
    await page.mouse.up();
    
    // Drag left locator
    await page.mouse.move(leftLocatorStartX, leftLocatorStartY);
    await page.mouse.down();
    await page.mouse.move(leftLocatorTargetX, leftLocatorTargetY);
    await page.mouse.up();

    await page.screenshot({ path: './snapshots/InversiveGeometryVIISpiderEyes-4.png', fullPage: true });
  });

});