const { test, expect } = require('@playwright/test');

test.describe('TheHungarianMaximumMatchingAlgorithm', () => {
  const fileUrl = 'file://' + require('path').resolve(__dirname, '../pages/TheHungarianMaximumMatchingAlgorithm.html');

  test('Test Case 1: View of a newly generated graph with 22 vertices at the initial algorithm step.', async ({ page }) => {
    await page.goto(fileUrl);
    await page.locator('#size-22').click();
    await page.screenshot({ path: './snapshots/TheHungarianMaximumMatchingAlgorithm-1.png', fullPage: true });
  });

  test('Test Case 2: Initial state of a new graph with 18 vertices after a reset.', async ({ page }) => {
    await page.goto(fileUrl);
    await page.locator('#size-18').click();
    await page.locator('#degree-3').click();
    await page.locator('#reset-button').click();
    await page.screenshot({ path: './snapshots/TheHungarianMaximumMatchingAlgorithm-2.png', fullPage: true });
  });

  test('Test Case 3: Algorithm progressed to step 7, showing an augmenting path search.', async ({ page }) => {
    await page.goto(fileUrl);
    await page.locator('#size-18').click();
    await page.locator('#degree-3').click();
    await page.locator('#reset-button').click();
    await page.locator('#step-controls button', { hasText: '7' }).click();
    await page.screenshot({ path: './snapshots/TheHungarianMaximumMatchingAlgorithm-3.png', fullPage: true });
  });

  test('Test Case 4: Final state of the algorithm at step 8, showing the maximum matching found.', async ({ page }) => {
    await page.goto(fileUrl);
    await page.locator('#size-18').click();
    await page.locator('#degree-3').click();
    await page.locator('#reset-button').click();
    await page.locator('#step-controls button', { hasText: '8' }).click();
    await page.screenshot({ path: './snapshots/TheHungarianMaximumMatchingAlgorithm-4.png', fullPage: true });
  });
});