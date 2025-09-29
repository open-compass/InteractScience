const { test, expect } = require('@playwright/test');

test.describe('GreedyAlgorithmsForAMinimumSpanningTree', () => {
  const fileUrl = 'file://' + require('path').resolve(__dirname, '../pages/GreedyAlgorithmsForAMinimumSpanningTree.html');

  test.beforeEach(async ({ page }) => {
    await page.goto(fileUrl);
  });

  test('Initial 2D view with Kruskal\'s algorithm selected', async ({ page }) => {
    await page.locator('#btn-kruskal').click();
    await page.screenshot({ path: './snapshots/GreedyAlgorithmsForAMinimumSpanningTree-1.png', fullPage: true });
  });

  test('Completed 2D Minimum Spanning Tree using Prim\'s algorithm', async ({ page }) => {
    await page.locator('#btn-play').click();
    await expect(page.locator('#btn-play')).toBeDisabled();
    await expect(page.locator('#btn-pause')).toBeDisabled();
    await page.screenshot({ path: './snapshots/GreedyAlgorithmsForAMinimumSpanningTree-2.png', fullPage: true });
  });

  test('Completed 2D Minimum Spanning Tree using Kruskal\'s algorithm', async ({ page }) => {
    await page.locator('#btn-kruskal').click();
    await page.locator('#btn-play').click();
    await expect(page.locator('#btn-play')).toBeDisabled();
    await expect(page.locator('#btn-pause')).toBeDisabled();
    await page.screenshot({ path: './snapshots/GreedyAlgorithmsForAMinimumSpanningTree-3.png', fullPage: true });
  });

  test('Completed 3D Minimum Spanning Tree with a custom seed', async ({ page }) => {
    await page.locator('#btn-3d').click();
    await page.locator('#slider-seed').fill('215');
    await page.locator('#btn-play').click();
    await expect(page.locator('#btn-play')).toBeDisabled();
    await expect(page.locator('#btn-pause')).toBeDisabled();
    
    const canvas = await page.locator('#canvas-container');
    const bb = await canvas.boundingBox();
    if (bb) {
      const startX = bb.x + bb.width / 2;
      const startY = bb.y + bb.height / 2;
      const endX = startX + 150;
      
      await page.mouse.move(startX, startY);
      await page.mouse.down();
      await page.mouse.move(endX, startY);
      await page.mouse.up();
    }
    
    await page.screenshot({ path: './snapshots/GreedyAlgorithmsForAMinimumSpanningTree-4.png', fullPage: true });
  });
});