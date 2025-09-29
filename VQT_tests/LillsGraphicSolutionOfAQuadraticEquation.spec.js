const { test, expect } = require('@playwright/test');

const fileUrl = 'file://' + require('path').resolve(__dirname, '../pages/LillsGraphicSolutionOfAQuadraticEquation.html');

test.describe("Lill's Graphic Solution of A Quadratic Equation", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(fileUrl);
  });

  test('Initial "golden ratio" example with minimum plot range', async ({ page }) => {
    await page.locator('#slider-plot-range').fill('1');
    await page.screenshot({ path: './snapshots/LillsGraphicSolutionOfAQuadraticEquation-1.png', fullPage: true });
  });

  test('A "new example" polynomial with labels, circle, and grid visible', async ({ page }) => {
    await page.locator('#btn-new-example').click();
    await page.locator('#slider-z').fill('-1.05');
    await page.locator('#slider-plot-range').fill('3');
    await page.locator('#check-show-labels').check();
    await page.locator('#check-show-circle').check();
    await page.locator('#check-show-grid-lines').check();
    await page.screenshot({ path: './snapshots/LillsGraphicSolutionOfAQuadraticEquation-2.png', fullPage: true });
  });

  test('A different "new example" polynomial with all visual aids turned on', async ({ page }) => {
    await page.locator('#btn-new-example').click();
    await page.locator('#slider-z').fill('-1.05');
    await page.locator('#slider-plot-range').fill('1');
    await page.locator('#check-show-labels').check();
    await page.locator('#check-show-circle').check();
    await page.locator('#check-show-axes').check();
    await page.locator('#check-show-grid-lines').check();
    await page.screenshot({ path: './snapshots/LillsGraphicSolutionOfAQuadraticEquation-3.png', fullPage: true });
  });

  test("The same polynomial as the previous state but with a new 'z' value and labels hidden", async ({ page }) => {
    await page.locator('#btn-new-example').click();
    await page.locator('#slider-z').fill('-2.3');
    await page.locator('#slider-plot-range').fill('2');
    await page.locator('#check-show-circle').check();
    await page.locator('#check-show-axes').check();
    await page.locator('#check-show-grid-lines').check();
    await page.screenshot({ path: './snapshots/LillsGraphicSolutionOfAQuadraticEquation-4.png', fullPage: true });
  });
});