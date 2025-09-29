const { test, expect } = require('@playwright/test');

const fileUrl = 'file://' + require('path').resolve(__dirname, '../pages/ThomsonProblemSolutions.html');

test.beforeEach(async ({ page }) => {
  await page.goto(fileUrl);
  await page.waitForTimeout(500);
});

test.describe('Thomson Problem Solutions UI', () => {

  test('"Number of points" slider (`slider-points`)', async ({ page }) => {
    // 1. Assert: The slider with id `slider-points` is visible on the page.
    await expect(page.locator('#slider-points')).toBeVisible();

    // 2. Assert: The slider's value is `20` and the corresponding label `label-points` displays "+ 20".
    await expect(page.locator('#slider-points')).toHaveValue('20');
    await expect(page.locator('#label-points')).toHaveText('+ 20');

    // 3. Action: Drag the slider to a value of `186`.
    await page.locator('#slider-points').fill('186');

    // 4. Assert: The label `label-points` updates to "+ 186" and the number of points on the `canvas-3d` visualization visibly increases.
    await expect(page.locator('#label-points')).toHaveText('+ 186');
    await expect(page.locator('#canvas-3d')).toBeVisible(); // Verifies canvas is still rendered after update

    // 5. Action: Drag the slider to its minimum value of `2`.
    await page.locator('#slider-points').fill('2');

    // 6. Assert: The label `label-points` updates to "+ 2" and the number of points on the `canvas-3d` visibly decreases to match the minimum.
    await expect(page.locator('#label-points')).toHaveText('+ 2');
    await expect(page.locator('#canvas-3d')).toBeVisible(); // Verifies canvas is still rendered after update
  });

  test('"2D" plot type button (`btn-2d`)', async ({ page }) => {
    // 1. Assert: The button with id `btn-2d` is visible.
    await expect(page.locator('#btn-2d')).toBeVisible();

    // 2. Assert: The button `btn-2d` is inactive, the `canvas-3d` is visible, and the `div-2d-plot` container is hidden.
    await expect(page.locator('#btn-2d')).not.toHaveClass(/active/);
    await expect(page.locator('#canvas-3d')).toBeVisible();
    await expect(page.locator('#div-2d-plot')).toBeHidden();

    // 3. Action: Click the `btn-2d` button.
    await page.locator('#btn-2d').click();

    // 4. Assert: The `btn-2d` button becomes active, the `canvas-3d` is hidden, and the `div-2d-plot` is now visible, containing a plot and distance information.
    await expect(page.locator('#btn-2d')).toHaveClass(/active/);
    await expect(page.locator('#canvas-3d')).toBeHidden();
    await expect(page.locator('#div-2d-plot')).toBeVisible();
    await expect(page.locator('#canvas-2d')).toBeVisible();
    await expect(page.locator('#div-2d-text')).not.toBeEmpty();
    
    // Capture the initial text to verify the update later
    const initialDistanceText = await page.locator('#div-2d-text').textContent();

    // 5. Action: Change the `slider-points` value from `20` to `182`.
    await page.locator('#slider-points').fill('182');

    // 6. Assert: The 2D plot in `canvas-2d` redraws and the text in `div-2d-text` updates with new distance values.
    await expect(page.locator('#canvas-2d')).toBeVisible();
    // Verifying that the distance text changes confirms the data was recalculated and redraw triggered.
    await expect(page.locator('#div-2d-text')).not.toHaveText(initialDistanceText);
    await expect(page.locator('#div-2d-text')).toContainText(/minimum distance between points =/);
    await expect(page.locator('#div-2d-text')).toContainText(/maximum distance between points = 2\./);
  });

  test('"3D" plot type button (`btn-3d`)', async ({ page }) => {
    // 1. Assert: The button with id `btn-3d` is visible.
    await expect(page.locator('#btn-3d')).toBeVisible();

    // 2. Assert: The button `btn-3d` is in its default active state and the `canvas-3d` is visible.
    await expect(page.locator('#btn-3d')).toHaveClass(/active/);
    await expect(page.locator('#canvas-3d')).toBeVisible();

    // 3. Action: Click the `btn-2d` button to switch to the 2D view.
    await page.locator('#btn-2d').click();

    // 4. Assert: The `btn-3d` button becomes inactive and the `canvas-3d` is hidden.
    await expect(page.locator('#btn-3d')).not.toHaveClass(/active/);
    await expect(page.locator('#canvas-3d')).toBeHidden();

    // 5. Action: Click the `btn-3d` button again.
    await page.locator('#btn-3d').click();

    // 6. Assert: The `btn-3d` button becomes active, the `div-2d-plot` container is hidden, and the `canvas-3d` is visible again.
    await expect(page.locator('#btn-3d')).toHaveClass(/active/);
    await expect(page.locator('#div-2d-plot')).toBeHidden();
    await expect(page.locator('#canvas-3d')).toBeVisible();
  });
});