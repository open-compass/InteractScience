const { test, expect } = require('@playwright/test');

const fileUrl = 'file://' + require('path').resolve(__dirname, '../pages/AForestGrowthCurve.html');

test.describe('Forest Growth Curve Visualization', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(fileUrl);
    await page.waitForTimeout(500);
  });

  test('Canvas Click to Add Data Point', async ({ page }) => {
    // 1. Assert: The plot canvas area (`#canvas-container`) is visible.
    await expect(page.locator('#canvas-container')).toBeVisible();

    // 2. Assert: The plot initially displays 6 data points, the data table has 6 rows, and the `results-u` value is "22.7319".
    await expect(page.locator('#data-table-body tr')).toHaveCount(6);
    await expect(page.locator('#results-u')).toHaveText(/^22\.73190*$/);
    const initialP = await page.locator('#results-p').textContent();
    const initialU = await page.locator('#results-u').textContent();

    // 3. Action: Click on an empty location within the plot's coordinate system.
    await page.locator('#canvas-container canvas').click({ position: { x: 300, y: 300 } });

    // 4. Assert: A 7th data point appears on the plot, the data table updates to 7 rows, and the values for `results-u` and `results-p` change.
    await expect(page.locator('#data-table-body tr')).toHaveCount(7);
    await expect(page.locator('#results-u')).not.toHaveText(initialU);
    await expect(page.locator('#results-p')).not.toHaveText(initialP);

    const secondP = await page.locator('#results-p').textContent();
    const secondU = await page.locator('#results-u').textContent();

    // 5. Action: Click on another empty location in the plot.
    await page.locator('#canvas-container canvas').click({ position: { x: 400, y: 200 } });

    // 6. Assert: An 8th data point appears on the plot, the data table updates to 8 rows, and the values for `results-u` and `results-p` change again.
    await expect(page.locator('#data-table-body tr')).toHaveCount(8);
    await expect(page.locator('#results-u')).not.toHaveText(secondU);
    await expect(page.locator('#results-p')).not.toHaveText(secondP);
  });

  test('Drag-and-Drop to Move Data Point', async ({ page }) => {
    // 1. Assert: The plot canvas area (`#canvas-container`) is visible.
    await expect(page.locator('#canvas-container')).toBeVisible();

    // 2. Assert: The plot initially displays 6 data points at their default positions, and the fitted curve matches them. The `results-u` value is "22.7319".
    await expect(page.locator('#data-table-body tr')).toHaveCount(6);
    await expect(page.locator('#results-u')).toHaveText(/^22\.73190*$/);

    const initialU = await page.locator('#results-u').textContent();
    const initialP = await page.locator('#results-p').textContent();
    // Assuming the first point {age: 30, volume: 289} corresponds to the first table row.
    const initialTableRow = await page.locator('#data-table-body tr').first().textContent();
    const point1Coords = { x: 117, y: 373 }; // Approx. pixel coords for point {age: 30, volume: 289}

    // 3. Action: Press the mouse down on an existing data point, drag it to a new location on the plot, and release the mouse.
    await page.locator('#canvas-container canvas').hover({ position: point1Coords });
    await page.mouse.down();
    await page.mouse.move(300, 300);
    await page.mouse.up();

    // 4. Assert: The data point has moved, the fitted curve is redrawn, the corresponding data row in the table is updated, and the `results-u` and `results-p` values change.
    await expect(page.locator('#results-u')).not.toHaveText(initialU);
    await expect(page.locator('#results-p')).not.toHaveText(initialP);
    await expect(page.locator('#data-table-body tr').first()).not.toHaveText(initialTableRow);
    await expect(page.locator('#data-table-body tr')).toHaveCount(6); // Row count should remain the same

    const secondU = await page.locator('#results-u').textContent();
    const secondP = await page.locator('#results-p').textContent();
    const secondTableRow = await page.locator('#data-table-body tr').first().textContent();

    // 5. Action: Drag the same data point to a location near the edge of the plot area (e.g., minimum age and maximum volume).
    await page.locator('#canvas-container canvas').hover({ position: { x: 300, y: 300 } });
    await page.mouse.down();
    await page.mouse.move(50, 50); // Top-left edge (min age, max volume)
    await page.mouse.up();

    // 6. Assert: The data point moves to the new edge location, the fitted curve is redrawn, the table is updated, and the `results-u` and `results-p` values change again.
    await expect(page.locator('#results-u')).not.toHaveText(secondU);
    await expect(page.locator('#results-p')).not.toHaveText(secondP);
    await expect(page.locator('#data-table-body tr').first()).not.toHaveText(secondTableRow);
    await expect(page.locator('#data-table-body tr')).toHaveCount(6);
  });

  test('Double-Click to Delete Data Point', async ({ page }) => {
    // 1. Assert: The plot canvas area (`#canvas-container`) is visible.
    await expect(page.locator('#canvas-container')).toBeVisible();

    // 2. Assert: The plot initially displays 6 data points, the data table has 6 rows, and the `results-u` value is "22.7319".
    await expect(page.locator('#data-table-body tr')).toHaveCount(6);
    await expect(page.locator('#results-u')).toHaveText(/^22\.73190*$/);

    const initialU = await page.locator('#results-u').textContent();
    const initialP = await page.locator('#results-p').textContent();
    const point1Coords = { x: 117, y: 373 }; // Approx. pixel coords for point {age: 30, volume: 289}

    // 3. Action: Double-click on one of the existing data points.
    await page.locator('#canvas-container canvas').dblclick({ position: point1Coords });

    // 4. Assert: The selected data point is removed from the plot, the data table updates to 5 rows, and the `results-u` and `results-p` values change.
    await expect(page.locator('#data-table-body tr')).toHaveCount(5);
    await expect(page.locator('#results-u')).not.toHaveText(initialU);
    await expect(page.locator('#results-p')).not.toHaveText(initialP);

    const secondU = await page.locator('#results-u').textContent();
    const secondP = await page.locator('#results-p').textContent();
    // After deleting the first point, the second original point {age: 35, volume: 445} is now the first.
    const point2Coords = { x: 150, y: 332 }; // Approx. pixel coords for point {age: 35, volume: 445}

    // 5. Action: Double-click on another existing data point.
    await page.locator('#canvas-container canvas').dblclick({ position: point2Coords });

    // 6. Assert: The data point is removed from the plot, the data table updates to 4 rows, and the `results-u` and `results-p` values change again.
    await expect(page.locator('#data-table-body tr')).toHaveCount(4);
    await expect(page.locator('#results-u')).not.toHaveText(secondU);
    await expect(page.locator('#results-p')).not.toHaveText(secondP);
  });
});