const { test, expect } = require('@playwright/test');

const fileUrl = 'file://' + require('path').resolve(__dirname, '../pages/CirclesTriangles.html');

test.describe('Circles & Triangles', () => {
  test('Initial state with Vertex C highlighted', async ({ page }) => {
    await page.goto(fileUrl);
    // Action: Load the page. The application should initialize with vertex C selected and sliders A, B, and C at their default values (306, 54, 180 respectively).
    await page.screenshot({ path: './snapshots/CirclesTriangles-1.png', fullPage: true });
  });

  test('Display all arc and vertex values with totals', async ({ page }) => {
    await page.goto(fileUrl);
    // Action: Drag the 'C' slider handle to approximately 47.5% of the bar (value 171).
    await page.locator('#slider-c').fill('171');
    // Action: Click the 'None' radio button.
    await page.locator('#radio-none').click();
    await page.screenshot({ path: './snapshots/CirclesTriangles-2.png', fullPage: true });
  });

  test('Highlight Vertex C with a larger arc', async ({ page }) => {
    await page.goto(fileUrl);
    // Action: Drag the 'B' slider handle to approximately 36.5% of the bar (value 131).
    await page.locator('#slider-b').fill('131');
    await page.screenshot({ path: './snapshots/CirclesTriangles-3.png', fullPage: true });
  });

  test('Highlight Vertex B with a large arc', async ({ page }) => {
    await page.goto(fileUrl);
    // Action: Drag the 'A' slider handle to 90% of the bar (value 324).
    await page.locator('#slider-a').fill('324');
    // Action: Drag the 'C' slider handle to approximately 17.5% of the bar (value 63).
    await page.locator('#slider-c').fill('63');
    // Action: Click the 'B' radio button.
    await page.locator('#radio-b').click();
    await page.screenshot({ path: './snapshots/CirclesTriangles-4.png', fullPage: true });
  });
});