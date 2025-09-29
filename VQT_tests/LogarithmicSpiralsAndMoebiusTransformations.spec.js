const { test, expect } = require('@playwright/test');

const fileUrl = 'file://' + require('path').resolve(__dirname, '../pages/LogarithmicSpiralsAndMoebiusTransformations.html');

test.describe('Logarithmic Spirals and Moebius Transformations', () => {

  test('Initial state with double spiral and points', async ({ page }) => {
    await page.goto(fileUrl);
    await page.screenshot({ path: './snapshots/LogarithmicSpiralsAndMoebiusTransformations-1.png', fullPage: true });
  });

  test('Single spiral with filled fox items and increased growth', async ({ page }) => {
    await page.goto(fileUrl);
    await page.locator('#btn-type-single').click();
    await page.locator('#btn-item-filled-fox').click();
    await page.locator('#slider-growth').fill('0.3145');
    await page.screenshot({ path: './snapshots/LogarithmicSpiralsAndMoebiusTransformations-2.png', fullPage: true });
  });

  test('Double spiral with modified locator positions and growth', async ({ page }) => {
    await page.goto(fileUrl);
    await page.locator('#slider-growth').fill('0.2775');

    const canvas = page.locator('#p5-canvas');
    const canvasBox = await canvas.boundingBox();

    // Calculate initial positions of locators in page coordinates
    const zPlusInitialX = canvasBox.x + canvasBox.width / 2 - 100;
    const zPlusInitialY = canvasBox.y + canvasBox.height / 2;
    const zMinusInitialX = canvasBox.x + canvasBox.width / 2 + 100;
    const zMinusInitialY = canvasBox.y + canvasBox.height / 2;

    // Drag the yellow locator (z_plus_loc) down and to the left
    await page.mouse.move(zPlusInitialX, zPlusInitialY);
    await page.mouse.down();
    await page.mouse.move(zPlusInitialX - 50, zPlusInitialY + 50);
    await page.mouse.up();

    // Drag the green locator (z_minus_loc) upwards
    await page.mouse.move(zMinusInitialX, zMinusInitialY);
    await page.mouse.down();
    await page.mouse.move(zMinusInitialX, zMinusInitialY - 50);
    await page.mouse.up();
    
    await page.screenshot({ path: './snapshots/LogarithmicSpiralsAndMoebiusTransformations-3.png', fullPage: true });
  });

  test('Double spiral with outlined fox items and reset growth', async ({ page }) => {
    await page.goto(fileUrl);
    await page.locator('#btn-item-fox').click();
    await page.locator('#btn-reset-growth').click();
    await page.screenshot({ path: './snapshots/LogarithmicSpiralsAndMoebiusTransformations-4.png', fullPage: true });
  });

});