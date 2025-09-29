const { test, expect } = require('@playwright/test');
const path = require('path');

test.describe('Jarvis March to Find the Convex Hull of a Set of Points in 2D', () => {
  const fileUrl = 'file://' + path.resolve(__dirname, '../pages/JarvisMarchToFindTheConvexHullOfASetOfPointsIn2D.html');

  test.beforeEach(async ({ page }) => {
    await page.goto(fileUrl);
  });

  test('Initial state after starting the algorithm', async ({ page }) => {
    await page.locator('#btn-start-algo').click();
    await page.screenshot({ path: './snapshots/JarvisMarchToFindTheConvexHullOfASetOfPointsIn2D-1.png', fullPage: true });
  });

  test('Leftmost point is found after completing Step 1', async ({ page }) => {
    await page.locator('#btn-start-algo').click();
    await page.locator('#btn-step1-explain').click();
    await page.locator('#btn-step1-do').click();
    await page.screenshot({ path: './snapshots/JarvisMarchToFindTheConvexHullOfASetOfPointsIn2D-2.png', fullPage: true });
  });

  test('Second hull point is found and candidate lines are shown', async ({ page }) => {
    await page.locator('#btn-start-algo').click();
    await page.locator('#btn-step1-do').click();
    await page.locator('#btn-step2-explain').click();
    await page.locator('#btn-step2-do').click();
    await page.screenshot({ path: './snapshots/JarvisMarchToFindTheConvexHullOfASetOfPointsIn2D-3.png', fullPage: true });
  });

  test('Hull construction in progress after two Step 3 iterations', async ({ page }) => {
    await page.locator('#btn-start-algo').click();
    await page.locator('#btn-step1-do').click();
    await page.locator('#btn-step2-do').click();
    await page.locator('#btn-step3-explain').click();
    await page.locator('#btn-step3-do').click();
    await page.locator('#step3-actions').getByRole('button', { name: 'repeat' }).first().click();
    await page.screenshot({ path: './snapshots/JarvisMarchToFindTheConvexHullOfASetOfPointsIn2D-4.png', fullPage: true });
  });
});