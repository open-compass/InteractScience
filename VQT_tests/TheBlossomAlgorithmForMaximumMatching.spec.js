const { test, expect } = require('@playwright/test');

test.describe('TheBlossomAlgorithmForMaximumMatching', () => {
  const fileUrl = 'file://' + require('path').resolve(__dirname, '../pages/TheBlossomAlgorithmForMaximumMatching.html');

  test.beforeEach(async ({ page }) => {
    await page.goto(fileUrl);
  });

  test('Initial state of Example 1 with a 13-edge maximal matching', async ({ page }) => {
    // Action: Click the button with text '1' in the 'example' control group.
    await page.locator('#example-controls').getByRole('button', { name: '1', exact: true }).click();
    // Action: Click the button with text '1' in the 'algorithm step' control group.
    await page.locator('#step-controls').getByRole('button', { name: '1', exact: true }).click();
    // Assert: Take a screenshot of the current UI state.
    await page.screenshot({ path: './snapshots/TheBlossomAlgorithmForMaximumMatching-1.png', fullPage: true });
  });

  test('Initial state of Example 1, showing the 13-edge maximal matching', async ({ page }) => {
    // Action: Click the button with ID `btn-example-1`.
    await page.locator('#btn-example-1').click();
    // Action: Click the button with ID `btn-step-1`.
    await page.locator('#btn-step-1').click();
    // Assert: Take a screenshot of the current UI state.
    await page.screenshot({ path: './snapshots/TheBlossomAlgorithmForMaximumMatching-2.png', fullPage: true });
  });

  test('Blossom identified and highlighted in Example 1 at step 10', async ({ page }) => {
    // Action: Click the button with ID `btn-example-1`.
    await page.locator('#btn-example-1').click();
    // Action: Click the button with text '10' in the 'algorithm step' control group.
    await page.locator('#step-controls').getByRole('button', { name: '10', exact: true }).click();
    // Assert: Take a screenshot of the current UI state.
    await page.screenshot({ path: './snapshots/TheBlossomAlgorithmForMaximumMatching-3.png', fullPage: true });
  });

  test('Final maximum matching with 14 edges shown for Example 1 at step 11', async ({ page }) => {
    // Action: Click the button with ID `btn-example-1`.
    await page.locator('#btn-example-1').click();
    // Action: Click the button with text '11' in the 'algorithm step' control group.
    await page.locator('#step-controls').getByRole('button', { name: '11', exact: true }).click();
    // Assert: Take a screenshot of the current UI state.
    await page.screenshot({ path: './snapshots/TheBlossomAlgorithmForMaximumMatching-4.png', fullPage: true });
  });
});