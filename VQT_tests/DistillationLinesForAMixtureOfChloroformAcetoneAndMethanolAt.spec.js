const { test, expect } = require('@playwright/test');

const fileUrl = 'file://' + require('path').resolve(__dirname, '../pages/DistillationLinesForAMixtureOfChloroformAcetoneAndMethanolAt.html');

/**
 * Converts data coordinates (mole fractions) to pixel coordinates on the canvas.
 * @param {number} dataX - The x-coordinate in the data space (0 to 1).
 * @param {number} dataY - The y-coordinate in the data space (0 to 1).
 * @returns {{x: number, y: number}} - The corresponding pixel coordinates.
 */
function dataToPixel(dataX, dataY) {
  const canvasWidth = 650;
  const canvasHeight = 650;
  const margin = 60;
  const plotSize = canvasWidth - 2 * margin; // 530

  const pixelX = margin + dataX * plotSize;
  const pixelY = canvasHeight - margin - dataY * plotSize; // Y-axis is inverted for canvas rendering

  return { x: pixelX, y: pixelY };
}


test.describe('Distillation Lines For A Mixture Of Chloroform Acetone And Methanol At', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(fileUrl);
  });

  test('Initial view of the distillation plot', async ({ page }) => {
    await page.screenshot({ path: './snapshots/DistillationLinesForAMixtureOfChloroformAcetoneAndMethanolAt-1.png', fullPage: true });
  });

  test('Initial view of the distillation plot (duplicate state)', async ({ page }) => {
    await page.screenshot({ path: './snapshots/DistillationLinesForAMixtureOfChloroformAcetoneAndMethanolAt-2.png', fullPage: true });
  });

  test('Distillation line with locator moved up and left along the distillation boundary', async ({ page }) => {
    const canvas = page.locator('#visualization-canvas');
    const boundingBox = await canvas.boundingBox();

    const startData = { x: 0.2, y: 0.22 };
    const endData = { x: 0.1, y: 0.45 };

    const startPixel = dataToPixel(startData.x, startData.y);
    const endPixel = dataToPixel(endData.x, endData.y);

    await page.mouse.move(boundingBox.x + startPixel.x, boundingBox.y + startPixel.y);
    await page.mouse.down();
    await page.mouse.move(boundingBox.x + endPixel.x, boundingBox.y + endPixel.y, { steps: 10 });
    await page.mouse.up();

    await page.screenshot({ path: './snapshots/DistillationLinesForAMixtureOfChloroformAcetoneAndMethanolAt-3.png', fullPage: true });
  });

  test('Distillation line with locator moved to the right along the distillation boundary', async ({ page }) => {
    const canvas = page.locator('#visualization-canvas');
    const boundingBox = await canvas.boundingBox();

    const startData = { x: 0.2, y: 0.22 };
    const endData = { x: 0.5, y: 0.2 };

    const startPixel = dataToPixel(startData.x, startData.y);
    const endPixel = dataToPixel(endData.x, endData.y);

    await page.mouse.move(boundingBox.x + startPixel.x, boundingBox.y + startPixel.y);
    await page.mouse.down();
    await page.mouse.move(boundingBox.x + endPixel.x, boundingBox.y + endPixel.y, { steps: 10 });
    await page.mouse.up();
    
    await page.screenshot({ path: './snapshots/DistillationLinesForAMixtureOfChloroformAcetoneAndMethanolAt-4.png', fullPage: true });
  });
});