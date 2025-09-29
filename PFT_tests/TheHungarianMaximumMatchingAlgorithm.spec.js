const { test, expect } = require('@playwright/test');
const fileUrl = 'file://' + require('path').resolve(__dirname, '../pages/TheHungarianMaximumMatchingAlgorithm.html');

test.beforeEach(async ({ page }) => {
  await page.goto(fileUrl);
  await page.waitForTimeout(500);
});

test.describe('Graph Size Button Group', () => {
  test('Graph Size Button Group', async ({ page }) => {
    // 1. Assert: The `size of bipartite graph` control with buttons `6` through `30` is visible.
    await expect(page.getByText('size of bipartite graph')).toBeVisible();
    await expect(page.locator('#size-controls')).toBeVisible();
    for (const size of ['6', '10', '14', '18', '22', '26', '30']) {
      await expect(page.locator(`#size-${size}`)).toBeVisible();
    }

    // 2. Assert: The button `18` has an "active" state, and the graph in the canvas has 18 vertices.
    await expect(page.locator('#size-18')).toHaveClass('active');
    // We verify the graph state by checking a side effect: the number of algorithm steps generated.
    const initialStepButtonCount = await page.locator('#step-controls button').count();
    const initialCanvasScreenshot = await page.locator('#main-canvas').screenshot();

    // 3. Action: Click the `26` button in the graph size control.
    await page.locator('#size-26').click();

    // 4. Assert: The `26` button now has an "active" state, the canvas is redrawn with a 26-vertex graph, and the number of algorithm step buttons is updated.
    await expect(page.locator('#size-26')).toHaveClass('active');
    await expect(page.locator('#size-18')).not.toHaveClass('active');
    const newCanvasScreenshot = await page.locator('#main-canvas').screenshot();
    expect(newCanvasScreenshot).not.toEqual(initialCanvasScreenshot);
    const newStepButtonCount = await page.locator('#step-controls button').count();
    expect(newStepButtonCount).not.toEqual(initialStepButtonCount);

    // 5. Action: Click the `10` button in the graph size control.
    await page.locator('#size-10').click();

    // 6. Assert: The `10` button is now active, and the canvas and algorithm step buttons have been updated again.
    await expect(page.locator('#size-10')).toHaveClass('active');
    await expect(page.locator('#size-26')).not.toHaveClass('active');
    const finalCanvasScreenshot = await page.locator('#main-canvas').screenshot();
    expect(finalCanvasScreenshot).not.toEqual(newCanvasScreenshot);
    const finalStepButtonCount = await page.locator('#step-controls button').count();
    expect(finalStepButtonCount).not.toEqual(newStepButtonCount);
  });
});

test.describe('Maximum Degree Button Group', () => {
  test('Maximum Degree Button Group', async ({ page }) => {
    // 1. Assert: The `maximum degree of lower part` control with buttons `2` through `6` is visible.
    await expect(page.getByText('maximum degree of lower part')).toBeVisible();
    await expect(page.locator('#degree-controls')).toBeVisible();
    for (const degree of ['2', '3', '4', '5', '6']) {
      await expect(page.locator(`#degree-${degree}`)).toBeVisible();
    }

    // 2. Assert: The button `3` has an "active" state by default.
    await expect(page.locator('#degree-3')).toHaveClass('active');
    const initialCanvasScreenshot = await page.locator('#main-canvas').screenshot();
    const initialStepCount = await page.locator('#step-controls button').count();

    // 3. Action: Click the `5` button in the maximum degree control.
    await page.locator('#degree-5').click();

    // 4. Assert: The `5` button now has an "active" state, the canvas is redrawn with a new graph, and the set of algorithm step buttons is regenerated.
    await expect(page.locator('#degree-5')).toHaveClass('active');
    await expect(page.locator('#degree-3')).not.toHaveClass('active');
    const newCanvasScreenshot = await page.locator('#main-canvas').screenshot();
    expect(newCanvasScreenshot).not.toEqual(initialCanvasScreenshot);
    const newStepCount = await page.locator('#step-controls button').count();
    expect(newStepCount).not.toEqual(initialStepCount);

    // 5. Action: Click the `2` button in the maximum degree control.
    await page.locator('#degree-2').click();

    // 6. Assert: The `2` button is now active, and the canvas and algorithm step buttons have been updated again.
    await expect(page.locator('#degree-2')).toHaveClass('active');
    await expect(page.locator('#degree-5')).not.toHaveClass('active');
    const finalCanvasScreenshot = await page.locator('#main-canvas').screenshot();
    expect(finalCanvasScreenshot).not.toEqual(newCanvasScreenshot);
    const finalStepCount = await page.locator('#step-controls button').count();
    expect(finalStepCount).not.toEqual(newStepCount);
  });
});

test.describe('Algorithm Step Navigation Buttons', () => {
  test('Algorithm Step Navigation Buttons', async ({ page }) => {
    // 1. Assert: The `algorithm step` control with one or more numbered buttons is visible.
    await expect(page.getByText('algorithm step')).toBeVisible();
    await expect(page.locator('#step-controls')).toBeVisible();
    expect(await page.locator('#step-controls button').count()).toBeGreaterThan(0);

    // 2. Assert: The button `1` has an "active" state by default, and the status text shows the initial state.
    await expect(page.locator('#step-controls button').first()).toHaveText('1');
    await expect(page.locator('#step-controls button').first()).toHaveClass('active');
    const initialStatusText = await page.locator('#status-text').textContent();
    expect(initialStatusText).not.toBe('');
    const initialCanvasScreenshot = await page.locator('#main-canvas').screenshot();

    // 3. Action: Click a middle step button (e.g., `5`, if available).
    const stepButtons = page.locator('#step-controls button');
    const count = await stepButtons.count();
    let middleButton;
    if (await page.locator('#step-controls button', { hasText: '5' }).isVisible()) {
        middleButton = page.locator('#step-controls button', { hasText: '5' });
    } else if (count > 2) {
        middleButton = stepButtons.nth(Math.floor(count / 2));
    } else {
        // If there's no middle button, we can't perform the action, so we skip to the next part.
        // For this test, let's assume there are enough steps.
        middleButton = stepButtons.nth(1);
    }
    await middleButton.click();
    const middleButtonText = await middleButton.textContent();

    // 4. Assert: The clicked button (`5`) becomes active, and the visualization on the canvas (tree, graph colors, matching edges) and the status text both update.
    await expect(middleButton).toHaveClass('active');
    const middleStatusText = await page.locator('#status-text').textContent();
    expect(middleStatusText).not.toEqual(initialStatusText);
    const middleCanvasScreenshot = await page.locator('#main-canvas').screenshot();
    expect(middleCanvasScreenshot).not.toEqual(initialCanvasScreenshot);

    // 5. Action: Click the last available step button.
    const lastStepButton = page.locator('#step-controls button').last();
    await lastStepButton.click();

    // 6. Assert: The last step button becomes active, and the canvas and status text update to show the final result of the algorithm.
    await expect(lastStepButton).toHaveClass('active');
    const finalStatusText = await page.locator('#status-text').textContent();
    expect(finalStatusText).not.toEqual(middleStatusText);
    const finalCanvasScreenshot = await page.locator('#main-canvas').screenshot();
    expect(finalCanvasScreenshot).not.toEqual(middleCanvasScreenshot);
  });
});

test.describe('Reset Button', () => {
  test('Reset Button', async ({ page }) => {
    // 1. Assert: The reset button `(+)` is visible.
    await expect(page.locator('#reset-button')).toBeVisible();
    await expect(page.locator('#reset-button')).toHaveAttribute('title', 'Generate new graph');

    // 2. Assert: The canvas displays an initial graph and the algorithm step is set to `1`. Note the number of available step buttons.
    await expect(page.locator('#step-controls button').first()).toHaveClass('active');
    const initialStepCount = await page.locator('#step-controls button').count();
    const initialCanvasScreenshot = await page.locator('#main-canvas').screenshot();

    // 3. Action: Click the reset button `(+)`.
    await page.locator('#reset-button').click();

    // 4. Assert: A new graph is drawn on the canvas, the step is reset to `1`, and the number of step buttons has potentially changed.
    await expect(page.locator('#step-controls button').first()).toHaveClass('active');
    const newCanvasScreenshot = await page.locator('#main-canvas').screenshot();
    expect(newCanvasScreenshot).not.toEqual(initialCanvasScreenshot);
    // The step count could be the same, so we don't assert it changed, but we check the canvas did.

    // 5. Action: Click the reset button `(+)` again.
    await page.locator('#reset-button').click();

    // 6. Assert: The canvas is redrawn with another new graph, and the algorithm step controls are updated accordingly.
    await expect(page.locator('#step-controls button').first()).toHaveClass('active');
    const finalCanvasScreenshot = await page.locator('#main-canvas').screenshot();
    expect(finalCanvasScreenshot).not.toEqual(newCanvasScreenshot);
  });
});