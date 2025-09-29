const { test, expect } = require('@playwright/test');

test.describe('AQuizForTheLongestRiversAndLargestLakes', () => {
  const fileUrl = 'file://' + require('path').resolve(__dirname, '../pages/AQuizForTheLongestRiversAndLargestLakes.html');

  test.beforeEach(async ({ page }) => {
    await page.goto(fileUrl);
  });

  test('Initial view with Rivers quiz active and mouse over the Pacific Ocean', async ({ page }) => {
    const canvas = page.locator('#canvas-container canvas');
    const boundingBox = await canvas.boundingBox();
    if (boundingBox) {
      const x = boundingBox.x + boundingBox.width * 0.02;
      const y = boundingBox.y + boundingBox.height * 0.60;
      await page.mouse.move(x, y);
    }
    await page.screenshot({ path: './snapshots/AQuizForTheLongestRiversAndLargestLakes-1.png', fullPage: true });
  });

  test('Lakes quiz selected, showing lake locations on the map', async ({ page }) => {
    await page.locator('#radio-lakes').click();
    await page.screenshot({ path: './snapshots/AQuizForTheLongestRiversAndLargestLakes-2.png', fullPage: true });
  });
});