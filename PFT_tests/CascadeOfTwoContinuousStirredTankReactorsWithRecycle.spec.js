const { test, expect } = require('@playwright/test');
const path = require('path');

const fileUrl = 'file://' + path.resolve(__dirname, '../pages/CascadeOfTwoContinuousStirredTankReactorsWithRecycle.html');

test.describe('Cascade of Two CSTRs with Recycle Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(fileUrl);
    await page.waitForTimeout(500);
  });

  test('T₂(α) View Button', async ({ page }) => {
    // 1. Assert: Button with ID `btn-plot` is visible on page load.
    await expect(page.locator('#btn-plot')).toBeVisible();

    // 2. Assert: Button has the `active` class, and the `#plot-view` container is visible.
    await expect(page.locator('#btn-plot')).toHaveClass(/active/);
    await expect(page.locator('#plot-view')).toBeVisible();

    // 3. Action: Click the `btn-table` button, then click the `btn-plot` button.
    await page.locator('#btn-table').click();
    await page.locator('#btn-plot').click();

    // 4. Assert: The `btn-plot` button has the `active` class, `#plot-view` is visible, and `#table-view` is hidden.
    await expect(page.locator('#btn-plot')).toHaveClass(/active/);
    await expect(page.locator('#plot-view')).toBeVisible();
    await expect(page.locator('#table-view')).toBeHidden();

    // 5. Action: Click the `btn-plot` button again while it is already active.
    await page.locator('#btn-plot').click();

    // 6. Assert: The view remains unchanged; the button is still active, and the `#plot-view` is still visible.
    await expect(page.locator('#btn-plot')).toHaveClass(/active/);
    await expect(page.locator('#plot-view')).toBeVisible();
  });

  test('Solution List View Button', async ({ page }) => {
    // 1. Assert: Button with ID `btn-table` is visible on page load.
    await expect(page.locator('#btn-table')).toBeVisible();

    // 2. Assert: Button does not have the `active` class. The `#table-view` container is hidden.
    await expect(page.locator('#btn-table')).not.toHaveClass(/active/);
    await expect(page.locator('#table-view')).toBeHidden();

    // 3. Action: Click the `btn-table` button.
    await page.locator('#btn-table').click();

    // 4. Assert: The button gains the `active` class, `#table-view` becomes visible, and the table body `#solutions-table-body` is populated with data rows.
    await expect(page.locator('#btn-table')).toHaveClass(/active/);
    await expect(page.locator('#table-view')).toBeVisible();
    await expect(page.locator('#solutions-table-body').locator('tr')).not.toHaveCount(0);

    // 5. Action: Click the `btn-plot` button to switch the view away.
    await page.locator('#btn-plot').click();

    // 6. Assert: The `btn-table` button loses the `active` class, and the `#table-view` container is hidden.
    await expect(page.locator('#btn-table')).not.toHaveClass(/active/);
    await expect(page.locator('#table-view')).toBeHidden();
  });

  test('Turning Points View Button', async ({ page }) => {
    // 1. Assert: Button with ID `btn-turning-points` is visible on page load.
    await expect(page.locator('#btn-turning-points')).toBeVisible();

    // 2. Assert: Button does not have the `active` class.
    await expect(page.locator('#btn-turning-points')).not.toHaveClass(/active/);

    // 3. Action: Click the `btn-turning-points` button.
    await page.locator('#btn-turning-points').click();

    // 4. Assert: The button gains the `active` class, the `#plot-view` shows green dots, and the `#parameter-controls` container is hidden.
    await expect(page.locator('#btn-turning-points')).toHaveClass(/active/);
    await expect(page.locator('#plot-view')).toBeVisible();
    await expect(page.locator('#parameter-controls')).toBeHidden();

    // 5. Action: Click the `btn-plot` button.
    await page.locator('#btn-plot').click();

    // 6. Assert: The `btn-turning-points` button loses the `active` class, and the `#parameter-controls` container becomes visible again.
    await expect(page.locator('#btn-turning-points')).not.toHaveClass(/active/);
    await expect(page.locator('#parameter-controls')).toBeVisible();
  });

  test('Alpha (α) Parameter Slider', async ({ page }) => {
    // 1. Assert: Slider with ID `slider-alpha` is visible on page load.
    await expect(page.locator('#slider-alpha')).toBeVisible();

    // 2. Assert: The slider's value is set to its default of `0.039`, and the `#alpha-value-display` span shows "0.039".
    await expect(page.locator('#slider-alpha')).toHaveValue('0.039');
    await expect(page.locator('#alpha-value-display')).toHaveText(/^0\.0390*$/);

    // 3. Action: Drag the slider to the left to a value of `0.02`.
    await page.locator('#slider-alpha').fill('0.02');

    // 4. Assert: The `#alpha-value-display` span updates to show "0.02", and the position of the vertical line and blue dots on the plot changes.
    await expect(page.locator('#alpha-value-display')).toHaveText(/^0\.020*$/);

    // 5. Action: Drag the slider to its maximum value, `0.07`.
    await page.locator('#slider-alpha').fill('0.07');

    // 6. Assert: The `#alpha-value-display` span shows "0.07", and the vertical line on the plot moves to the far right.
    await expect(page.locator('#alpha-value-display')).toHaveText(/^0\.070*$/);
  });

  test('Info Button', async ({ page }) => {
    // 1. Assert: Button with ID `btn-info` is visible on page load.
    await expect(page.locator('#btn-info')).toBeVisible();

    // 2. Assert: The button's text content is "+".
    await expect(page.locator('#btn-info')).toHaveText('+');

    // 3. Action: Click the `btn-info` button.
    await page.locator('#btn-info').click();

    // 4. Assert: The button's state or appearance changes (e.g., text changes to "-").
    await expect(page.locator('#btn-info')).toHaveText('-');

    // 5. Action: Click the `btn-info` button a second time.
    await page.locator('#btn-info').click();

    // 6. Assert: The button's state or appearance reverts to its original state (e.g., text changes back to "+").
    await expect(page.locator('#btn-info')).toHaveText('+');
  });
});