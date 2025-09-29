const { test, expect } = require('@playwright/test');

test.describe('AlgorithmsForFindingHamiltonCircuitsInCompleteGraphs', () => {
  const fileUrl = 'file://' + require('path').resolve(__dirname, '../pages/AlgorithmsForFindingHamiltonCircuitsInCompleteGraphs.html');

  test.beforeEach(async ({ page }) => {
    await page.goto(fileUrl);
  });

  test('Initial state after selecting starting vertex A', async ({ page }) => {
    await page.locator('#btn-vertex-A').click();
    await page.screenshot({ path: './snapshots/AlgorithmsForFindingHamiltonCircuitsInCompleteGraphs-1.png', fullPage: true });
  });

  test('Completed nearest neighbor algorithm starting from vertex A', async ({ page }) => {
    await page.locator('#btn-vertex-A').click();
    for (let i = 0; i < 7; i++) {
      await page.locator('#btn-next-step').click();
    }
    await page.screenshot({ path: './snapshots/AlgorithmsForFindingHamiltonCircuitsInCompleteGraphs-2.png', fullPage: true });
  });

  test('Completed nearest neighbor algorithm starting from vertex B', async ({ page }) => {
    await page.locator('#btn-start-over').click();
    await page.locator('#btn-vertex-B').click();
    for (let i = 0; i < 7; i++) {
      await page.locator('#btn-next-step').click();
    }
    await page.screenshot({ path: './snapshots/AlgorithmsForFindingHamiltonCircuitsInCompleteGraphs-3.png', fullPage: true });
  });

  test('Completed algorithm from vertex B with optimal solution displayed', async ({ page }) => {
    await page.locator('#btn-start-over').click();
    await page.locator('#btn-vertex-B').click();
    for (let i = 0; i < 7; i++) {
      await page.locator('#btn-next-step').click();
    }
    await page.locator('#checkbox-optimal').click();
    await page.screenshot({ path: './snapshots/AlgorithmsForFindingHamiltonCircuitsInCompleteGraphs-4.png', fullPage: true });
  });
});