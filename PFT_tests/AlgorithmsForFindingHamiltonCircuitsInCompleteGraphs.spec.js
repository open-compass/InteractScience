const { test, expect } = require('@playwright/test');

const fileUrl = 'file://' + require('path').resolve(__dirname, '../pages/AlgorithmsForFindingHamiltonCircuitsInCompleteGraphs.html');

test.beforeEach(async ({ page }) => {
  await page.goto(fileUrl);
  await page.waitForTimeout(500);
});

test.describe('Hamilton Circuits Demo', () => {

  test('Algorithm Selection Radio Buttons', async ({ page }) => {
    // 1. Assert: The "cheapest link" and "nearest neighbor" radio buttons are visible.
    await expect(page.locator('#algo-cheapest-link')).toBeVisible();
    await expect(page.locator('#algo-nearest-neighbor')).toBeVisible();

    // 2. Assert: The "nearest neighbor" radio button (`#algo-nearest-neighbor`) is checked by default, and the "starting vertex for nearest neighbor" selector is visible.
    await expect(page.locator('#algo-nearest-neighbor')).toBeChecked();
    await expect(page.locator('#starting-vertex-selector')).toBeVisible();

    // 3. Action: Click the "cheapest link" radio button (`#algo-cheapest-link`).
    await page.locator('#algo-cheapest-link').click();

    // 4. Assert: The "cheapest link" radio button is now checked, the UI resets, and the "starting vertex for nearest neighbor" selector (`#starting-vertex-selector`) is hidden.
    await expect(page.locator('#algo-cheapest-link')).toBeChecked();
    await expect(page.locator('#starting-vertex-selector')).toBeHidden();

    // 5. Action: Click the "nearest neighbor" radio button (`#algo-nearest-neighbor`).
    await page.locator('#algo-nearest-neighbor').click();

    // 6. Assert: The "nearest neighbor" radio button is checked again, the UI resets, and the "starting vertex for nearest neighbor" selector is visible.
    await expect(page.locator('#algo-nearest-neighbor')).toBeChecked();
    await expect(page.locator('#starting-vertex-selector')).toBeVisible();
  });

  test('"start over" Button', async ({ page }) => {
    // 1. Assert: The "start over" button (`#btn-start-over`) is visible.
    await expect(page.locator('#btn-start-over')).toBeVisible();

    // 2. Assert: The "next step" button is disabled and the edge list table is empty.
    await expect(page.locator('#btn-next-step')).toBeDisabled();
    await expect(page.locator('#table-edge-list')).toBeEmpty();

    // 3. Action: Select a starting vertex (e.g., `#btn-vertex-A`), then click the "next step" button (`#btn-next-step`).
    await page.locator('#btn-vertex-A').click();
    await page.locator('#btn-next-step').click();

    // 4. Assert: An edge is highlighted on the canvas, the edge list table is populated with at least one row, and a total weight is displayed.
    await expect(page.locator('#table-edge-list').locator('tr')).toHaveCount(1);
    await expect(page.locator('#text-total-weight')).not.toBeEmpty();

    // 5. Action: Click the "start over" button.
    await page.locator('#btn-start-over').click();

    // 6. Assert: All highlighted edges on the canvas are removed, the edge list table is cleared, the total weight text is cleared, and the "next step" button is disabled.
    await expect(page.locator('#table-edge-list')).toBeEmpty();
    await expect(page.locator('#text-total-weight')).toBeEmpty();
    await expect(page.locator('#btn-next-step')).toBeDisabled();
  });

  test('"fixed example" Button', async ({ page }) => {
    // 1. Assert: The "fixed example" button (`#btn-fixed-example`) is visible.
    await expect(page.locator('#btn-fixed-example')).toBeVisible();

    // 2. Assert: The graph visualization shows the default fixed graph, and the text `#text-example-type-algo` reads "fixed example".
    await expect(page.locator('#text-example-type-algo')).toHaveText('fixed example');

    // 3. Action: Click the "random example" button (`#btn-random-example`).
    await page.locator('#btn-random-example').click();

    // 4. Assert: The graph visualization updates with different edge weights, and the text `#text-example-type-algo` reads "random example".
    await expect(page.locator('#text-example-type-algo')).toHaveText('random example');

    // 5. Action: Click the "fixed example" button (`#btn-fixed-example`).
    await page.locator('#btn-fixed-example').click();

    // 6. Assert: The graph visualization reverts to the original fixed graph weights, and the text `#text-example-type-algo` reads "fixed example" again.
    await expect(page.locator('#text-example-type-algo')).toHaveText('fixed example');
  });

  test('"random example" Button', async ({ page }) => {
    // 1. Assert: The "random example" button (`#btn-random-example`) is visible.
    await expect(page.locator('#btn-random-example')).toBeVisible();

    // 2. Assert: The canvas shows the initial "fixed example" graph with its specific edge weights.
    await expect(page.locator('#text-example-type-algo')).toHaveText('fixed example');
    const initialCanvas = await page.locator('#canvas-algo-wrapper canvas').screenshot();

    // 3. Action: Click the "random example" button.
    await page.locator('#btn-random-example').click();

    // 4. Assert: The edge weights on the canvas change, and the text `#text-example-type-algo` updates to "random example".
    await expect(page.locator('#text-example-type-algo')).toHaveText('random example');
    const randomCanvas1 = await page.locator('#canvas-algo-wrapper canvas').screenshot();
    expect(initialCanvas).not.toEqual(randomCanvas1);
    
    // 5. Action: Click the "random example" button again.
    await page.locator('#btn-random-example').click();

    // 6. Assert: The edge weights on the canvas change to a new set of random values.
    const randomCanvas2 = await page.locator('#canvas-algo-wrapper canvas').screenshot();
    expect(randomCanvas1).not.toEqual(randomCanvas2);
  });

  test('Starting Vertex Selection Buttons', async ({ page }) => {
    // 1. Assert: The starting vertex buttons (A-G) are visible.
    await expect(page.locator('#btn-vertex-A')).toBeVisible();
    await expect(page.locator('#btn-vertex-G')).toBeVisible();

    // 2. Assert: The "next step" button (`#btn-next-step`) is disabled.
    await expect(page.locator('#btn-next-step')).toBeDisabled();

    // 3. Action: Click the 'A' vertex button (`#btn-vertex-A`).
    await page.locator('#btn-vertex-A').click();

    // 4. Assert: The "next step" button is enabled, the title `#title-algo` updates to mention "vertex A", and all vertex selection buttons are disabled.
    await expect(page.locator('#btn-next-step')).toBeEnabled();
    await expect(page.locator('#title-algo')).toContainText('vertex A');
    await expect(page.locator('#btn-vertex-A')).toBeDisabled();
    await expect(page.locator('#btn-vertex-B')).toBeDisabled();
    await expect(page.locator('#btn-vertex-G')).toBeDisabled();

    // 5. Action: Click the "start over" button (`#btn-start-over`).
    await page.locator('#btn-start-over').click();

    // 6. Assert: The "next step" button is disabled again, and the vertex selection buttons are re-enabled.
    await expect(page.locator('#btn-next-step')).toBeDisabled();
    await expect(page.locator('#btn-vertex-A')).toBeEnabled();
  });

  test('"next step" Button', async ({ page }) => {
    // 1. Assert: The "next step" button (`#btn-next-step`) is visible.
    await expect(page.locator('#btn-next-step')).toBeVisible();

    // 2. Assert: The "next step" button is disabled by default.
    await expect(page.locator('#btn-next-step')).toBeDisabled();

    // 3. Action: Select a starting vertex (e.g., `#btn-vertex-A`) and then click the "next step" button.
    await page.locator('#btn-vertex-A').click();
    await page.locator('#btn-next-step').click();

    // 4. Assert: An edge on the algorithm canvas is highlighted, the edge list table gets one row, and the total weight text is updated.
    await expect(page.locator('#table-edge-list').locator('tr')).toHaveCount(1);
    await expect(page.locator('#text-total-weight')).not.toBeEmpty();

    // 5. Action: Click the "next step" button until the algorithm completes.
    // The graph has 7 vertices, so the circuit has 7 edges. The first step adds one edge. We need 6 more clicks.
    for (let i = 0; i < 6; i++) {
        await page.locator('#btn-next-step').click();
    }

    // 6. Assert: The "next step" button becomes disabled once the Hamilton circuit is complete.
    await expect(page.locator('#btn-next-step')).toBeDisabled();
  });

  test('"show optimal solution" Checkbox', async ({ page }) => {
    // 1. Assert: The "show optimal solution" checkbox (`#checkbox-optimal`) is visible.
    await expect(page.locator('#checkbox-optimal')).toBeVisible();

    // 2. Assert: The checkbox is unchecked by default, and the optimal solution container (`#optimal-result-container`) is not visible.
    await expect(page.locator('#checkbox-optimal')).not.toBeChecked();
    await expect(page.locator('#optimal-result-container')).toBeHidden();

    // 3. Action: Click the checkbox to check it.
    await page.locator('#checkbox-optimal').check();

    // 4. Assert: The optimal solution container becomes visible, displaying a second canvas with the optimal path highlighted.
    await expect(page.locator('#optimal-result-container')).toBeVisible();
    await expect(page.locator('#canvas-optimal-wrapper canvas')).toBeVisible();

    // 5. Action: Click the checkbox again to uncheck it.
    await page.locator('#checkbox-optimal').uncheck();

    // 6. Assert: The optimal solution container is hidden again.
    await expect(page.locator('#optimal-result-container')).toBeHidden();
  });

});