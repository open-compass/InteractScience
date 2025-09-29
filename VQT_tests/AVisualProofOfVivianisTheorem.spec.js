const { test, expect } = require('@playwright/test');
const path = require('path');

test.describe('AVisualProofOfVivianisTheorem', () => {
  const fileUrl = 'file://' + path.resolve(__dirname, '../pages/AVisualProofOfVivianisTheorem.html');

  test.beforeEach(async ({ page }) => {
    await page.goto(fileUrl);
  });

  test('Visualization for Step 2 with the point P in a central position', async ({ page }) => {
    await page.locator('#step2').click();

    const canvas = page.locator('#canvas-container canvas');
    const canvasBox = await canvas.boundingBox();
    
    const startX = canvasBox.x + canvasBox.width * 0.4;
    const startY = canvasBox.y + canvasBox.height * 0.6;
    const endX = canvasBox.x + canvasBox.width * 0.45;
    const endY = canvasBox.y + canvasBox.height * 0.6;

    await page.mouse.move(startX, startY);
    await page.mouse.down();
    await page.mouse.move(endX, endY);
    await page.mouse.up();
    
    await page.screenshot({ path: './snapshots/AVisualProofOfVivianisTheorem-1.png', fullPage: true });
  });

  test('Visualization for Step 1 with perpendiculars from a centrally located point P', async ({ page }) => {
    const canvas = page.locator('#canvas-container canvas');
    const canvasBox = await canvas.boundingBox();

    const startX = canvasBox.x + canvasBox.width * 0.4;
    const startY = canvasBox.y + canvasBox.height * 0.6;
    const endX = canvasBox.x + canvasBox.width * 0.45;
    const endY = canvasBox.y + canvasBox.height * 0.6;

    await page.mouse.move(startX, startY);
    await page.mouse.down();
    await page.mouse.move(endX, endY);
    await page.mouse.up();

    await page.screenshot({ path: './snapshots/AVisualProofOfVivianisTheorem-2.png', fullPage: true });
  });

  test('Visualization for Step 2 with the point P moved to the left side', async ({ page }) => {
    await page.locator('#step2').click();

    const canvas = page.locator('#canvas-container canvas');
    const canvasBox = await canvas.boundingBox();

    const startX = canvasBox.x + canvasBox.width * 0.4;
    const startY = canvasBox.y + canvasBox.height * 0.6;
    const endX = canvasBox.x + canvasBox.width * 0.35;
    const endY = canvasBox.y + canvasBox.height * 0.6;

    await page.mouse.move(startX, startY);
    await page.mouse.down();
    await page.mouse.move(endX, endY);
    await page.mouse.up();

    await page.screenshot({ path: './snapshots/AVisualProofOfVivianisTheorem-3.png', fullPage: true });
  });

  test('Visualization for Step 3 showing the translated and stacked triangles', async ({ page }) => {
    const canvas = page.locator('#canvas-container canvas');
    const canvasBox = await canvas.boundingBox();

    const startX = canvasBox.x + canvasBox.width * 0.4;
    const startY = canvasBox.y + canvasBox.height * 0.6;
    const endX = canvasBox.x + canvasBox.width * 0.35;
    const endY = canvasBox.y + canvasBox.height * 0.6;
    
    await page.mouse.move(startX, startY);
    await page.mouse.down();
    await page.mouse.move(endX, endY);
    await page.mouse.up();

    await page.locator('#step3').click();

    await page.screenshot({ path: './snapshots/AVisualProofOfVivianisTheorem-4.png', fullPage: true });
  });
});