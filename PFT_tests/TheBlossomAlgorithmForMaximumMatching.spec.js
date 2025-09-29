const { test, expect } = require('@playwright/test');

const fileUrl = 'file://' + require('path').resolve(__dirname, '../pages/TheBlossomAlgorithmForMaximumMatching.html');

test.describe('The Blossom Algorithm for Maximum Matching', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(fileUrl);
    // Wait for the canvas to be potentially rendered by p5.js
    // await page.waitForSelector('#canvas-container canvas');
    await page.waitForTimeout(500);
  });

  test('Example Selection Buttons', async ({ page }) => {
    // 1. Assert: The "example" buttons #btn-example-1 and #btn-example-2 are visible.
    await expect(page.locator('#btn-example-1')).toBeVisible();
    await expect(page.locator('#btn-example-2')).toBeVisible();

    // 2. Assert: Button #btn-example-1 has the 'active' class. The description text starts with "A 28-vertex graph...". The canvas displays a graph with red matched edges.
    await expect(page.locator('#btn-example-1')).toHaveClass('btn active');
    const initialDescription = await page.locator('#description-text').textContent();
    expect(initialDescription).toContain('A 28-vertex graph');

    // 3. Action: Click the #btn-example-2 button.
    await page.locator('#btn-example-2').click();

    // 4. Assert: Button #btn-example-2 has the 'active' class and #btn-example-1 does not. The description text and the graph on the canvas have changed. The #btn-step-1 button is active.
    await expect(page.locator('#btn-example-2')).toHaveClass('btn active');
    await expect(page.locator('#btn-example-1')).not.toHaveClass('active');
    await expect(page.locator('#description-text')).not.toHaveText(initialDescription);
    await expect(page.locator('#btn-step-1')).toHaveClass('btn active');

    // 5. Action: Click the #btn-example-1 button.
    await page.locator('#btn-example-1').click();

    // 6. Assert: Button #btn-example-1 has the 'active' class again. The description text and canvas have reverted to their initial state for Example 1, Step 1.
    await expect(page.locator('#btn-example-1')).toHaveClass('btn active');
    await expect(page.locator('#description-text')).toHaveText(initialDescription);
  });

  test('Algorithm Step Navigation Buttons', async ({ page }) => {
    // 1. Assert: The "algorithm step" buttons (#btn-step-1 through #btn-step-11) are visible.
    for (let i = 1; i <= 11; i++) {
        await expect(page.locator(`#btn-step-${i}`)).toBeVisible();
    }

    // 2. Assert: Button #btn-step-1 has the 'active' class. The canvas shows a graph with a 13-edge matching highlighted in red.
    await expect(page.locator('#btn-step-1')).toHaveClass('btn active');
    await expect(page.locator('#description-text')).toContainText('A 28-vertex graph with a 13-edge maximal matching.');

    // 3. Action: Click the #btn-step-10 button.
    await page.locator('#btn-step-10').click();

    // 4. Assert: Button #btn-step-10 has the 'active' class. The description text is updated. The canvas shows a blue blossom polygon and a yellow super-vertex.
    await expect(page.locator('#btn-step-10')).toHaveClass('btn active');
    await expect(page.locator('#btn-step-1')).not.toHaveClass('active');
    await expect(page.locator('#description-text')).toHaveText('Augmenting path found in original graph; augment the matching.');

    // 5. Action: Click the #btn-step-11 button.
    await page.locator('#btn-step-11').click();

    // 6. Assert: Button #btn-step-11 has the 'active' class. The description text is updated. The canvas now shows a graph with a 14-edge matching highlighted in blue.
    await expect(page.locator('#btn-step-11')).toHaveClass('btn active');
    await expect(page.locator('#btn-step-10')).not.toHaveClass('active');
    await expect(page.locator('#description-text')).toHaveText('Matching augmented by one edge; maximum matching has 14 edges.');
  });
});