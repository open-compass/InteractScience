const { test, expect } = require('@playwright/test');

test.describe("Dijkstra's and A* Search Algorithms For Pathfinding With Obstacles", () => {
  const fileUrl = 'file://' + require('path').resolve(__dirname, '../pages/DijkstrasAndASearchAlgorithmsForPathfindingWithObstacles.html');

  test.beforeEach(async ({ page }) => {
    await page.goto(fileUrl);
    // Wait for the canvas to be potentially ready, as p5.js might take a moment to initialize.
    // await page.waitForSelector('#canvas-container canvas');
  });

  test('Initial view with default settings', async ({ page }) => {
    await page.screenshot({ path: './snapshots/DijkstrasAndASearchAlgorithmsForPathfindingWithObstacles-1.png', fullPage: true });
  });

  test("Dijkstra's algorithm completed with a single obstacle", async ({ page }) => {
    await page.locator('#slider-step').fill('176');
    await page.screenshot({ path: './snapshots/DijkstrasAndASearchAlgorithmsForPathfindingWithObstacles-2.png', fullPage: true });
  });

  test('A* algorithm completed with two square obstacles', async ({ page }) => {
    await page.locator('#select-obstacles').selectOption('2-squares');
    await page.locator('#radio-a-star').click();
    await page.locator('#slider-step').fill('101');
    await page.screenshot({ path: './snapshots/DijkstrasAndASearchAlgorithmsForPathfindingWithObstacles-3.png', fullPage: true });
  });

  test('A* algorithm completed with an L-shaped wall', async ({ page }) => {
    await page.locator('#select-obstacles').selectOption('l-shaped-wall');
    await page.locator('#radio-a-star').click();
    await page.locator('#slider-step').fill('143');
    await page.screenshot({ path: './snapshots/DijkstrasAndASearchAlgorithmsForPathfindingWithObstacles-4.png', fullPage: true });
  });
});