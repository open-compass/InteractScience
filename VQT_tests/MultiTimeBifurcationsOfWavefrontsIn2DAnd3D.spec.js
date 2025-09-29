const { test, expect } = require('@playwright/test');

test.describe('Multi-Time Bifurcations of Wavefronts in 2D and 3D', () => {
  const fileUrl = 'file://' + require('path').resolve(__dirname, '../pages/MultiTimeBifurcationsOfWavefrontsIn2DAnd3D.html');

  test.beforeEach(async ({ page }) => {
    await page.goto(fileUrl);
  });

  test('Initial view showing the default 2D bifurcation ²A₂', async ({ page }) => {
    await page.locator('#btn-2A2').click();
    await page.screenshot({ path: './snapshots/MultiTimeBifurcationsOfWavefrontsIn2DAnd3D-1.png', fullPage: true });
  });

  test('View of the 3D Swallowtail bifurcation (²A₃)', async ({ page }) => {
    await page.locator('#btn-3A3').click();

    const canvas = page.locator('#visualization-container canvas');
    const bb = await canvas.boundingBox();
    const centerX = bb.x + bb.width / 2;
    const centerY = bb.y + bb.height / 2;
    const targetX = centerX + bb.width * 0.25;
    const targetY = centerY + bb.height * 0.25;

    await page.mouse.move(centerX, centerY);
    await page.mouse.down();
    await page.mouse.move(targetX, targetY);
    await page.mouse.up();

    await page.screenshot({ path: './snapshots/MultiTimeBifurcationsOfWavefrontsIn2DAnd3D-2.png', fullPage: true });
  });

  test('View of the 3D Hyperbolic Umbilic bifurcation (²C₃⁻) with wireframe', async ({ page }) => {
    await page.locator('#btn-3C3m').click();

    const canvas = page.locator('#visualization-container canvas');
    const bb = await canvas.boundingBox();
    const centerX = bb.x + bb.width / 2;
    const centerY = bb.y + bb.height / 2;
    const targetX = centerX - bb.width * 0.25;
    const targetY = centerY - bb.height * 0.25;

    await page.mouse.move(centerX, centerY);
    await page.mouse.down();
    await page.mouse.move(targetX, targetY);
    await page.mouse.up();

    await page.screenshot({ path: './snapshots/MultiTimeBifurcationsOfWavefrontsIn2DAnd3D-3.png', fullPage: true });
  });

  test('View of the 3D bifurcation ²B₂(-) with adjusted time parameters', async ({ page }) => {
    await page.locator('#btn-3B2m').click();

    const timePad = page.locator('#time-pad');
    const padBB = await timePad.boundingBox();
    await page.mouse.click(padBB.x + padBB.width * 0.2, padBB.y + padBB.height * 0.3);

    const canvas = page.locator('#visualization-container canvas');
    const canvasBB = await canvas.boundingBox();
    const startX = canvasBB.x + canvasBB.width * 0.25;
    const startY = canvasBB.y + canvasBB.height / 2;
    const targetX = canvasBB.x + canvasBB.width * 0.75;
    const targetY = canvasBB.y + canvasBB.height * 0.75;
    
    await page.mouse.move(startX, startY);
    await page.mouse.down();
    await page.mouse.move(targetX, targetY);
    await page.mouse.up();

    await page.screenshot({ path: './snapshots/MultiTimeBifurcationsOfWavefrontsIn2DAnd3D-4.png', fullPage: true });
  });
});