const { test, expect } = require('@playwright/test');

const fileUrl = 'file://' + require('path').resolve(__dirname, '../pages/ThreePolyhedraWithRectangularNets.html');

test.describe('Three Polyhedra with Rectangular Nets Tests', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(fileUrl);
    await page.waitForTimeout(500);
  });

  test('Test Solid Selector Buttons', async ({ page }) => {
    const btnSolid1 = page.locator('#btn-solid-1');
    const btnSolid2 = page.locator('#btn-solid-2');
    const btnSolid3 = page.locator('#btn-solid-3');
    const canvasContainer = page.locator('#canvas-container');

    // 1. Assert: The "solid" selector with buttons "1", "2", and "3" is visible.
    await expect(page.locator('#solid-selector')).toBeVisible();
    await expect(btnSolid1).toBeVisible();
    await expect(btnSolid2).toBeVisible();
    await expect(btnSolid3).toBeVisible();

    // 2. Assert: Button "1" has the "active" class and the initial diagram for Solid 1 is displayed.
    await expect(btnSolid1).toHaveClass(/active/);
    const initialCanvasImage = await canvasContainer.screenshot();

    // 3. Action: Click on button "2".
    await btnSolid2.click();

    // 4. Assert: Button "2" now has the "active" class, button "1" does not, and the diagram in the canvas has changed.
    await expect(btnSolid2).toHaveClass(/active/);
    await expect(btnSolid1).not.toHaveClass(/active/);
    const canvasImageAfterSolid2 = await canvasContainer.screenshot();
    expect(canvasImageAfterSolid2).not.toEqual(initialCanvasImage);

    // 5. Action: Click back on button "1".
    await btnSolid1.click();

    // 6. Assert: Button "1" regains the "active" class and the diagram in the canvas changes again.
    await expect(btnSolid1).toHaveClass(/active/);
    const canvasImageAfterSolid1Return = await canvasContainer.screenshot();
    expect(canvasImageAfterSolid1Return).toEqual(initialCanvasImage);
  });

  test('Test Fold-Unfold Slider', async ({ page }) => {
    const slider = page.locator('#slider-fold');
    const canvasContainer = page.locator('#canvas-container');

    // 1. Assert: The "fold-unfold" slider is visible.
    await expect(slider).toBeVisible();

    // 2. Assert: The slider's value is at its minimum (0) and the diagram shows a fully unfolded net.
    await expect(slider).toHaveValue('0');
    const unfoldedImage = await canvasContainer.screenshot();

    // 3. Action: Drag the slider to a mid-point value (e.g., 0.5).
    await slider.fill('0.5');

    // 4. Assert: The diagram shows a partially folded shape, and the colors of the faces have changed from their initial state.
    const partiallyFoldedImage = await canvasContainer.screenshot();
    expect(partiallyFoldedImage).not.toEqual(unfoldedImage);

    // 5. Action: Drag the slider to its maximum value (1).
    await slider.fill('1');

    // 6. Assert: The diagram shows a fully folded polyhedron with distinct final colors on its faces.
    const foldedImage = await canvasContainer.screenshot();
    expect(foldedImage).not.toEqual(partiallyFoldedImage);
  });

  test('Test Reset View Button', async ({ page }) => {
    const resetButton = page.locator('#btn-reset-view');
    const canvasContainer = page.locator('#canvas-container');

    // 1. Assert: The reset view button ("+") is visible.
    await expect(resetButton).toBeVisible();

    // 2. Assert: The 3D view is in its default orientation and zoom level.
    const defaultViewImage = await canvasContainer.screenshot();

    // 3. Action: Simulate a user rotating and zooming the 3D view via mouse interaction on the canvas.
    const canvasBox = await canvasContainer.boundingBox();
    if (canvasBox) {
        const centerX = canvasBox.x + canvasBox.width / 2;
        const centerY = canvasBox.y + canvasBox.height / 2;
        await page.mouse.move(centerX, centerY);
        await page.mouse.down();
        await page.mouse.move(centerX + 100, centerY);
        await page.mouse.up();
        await page.mouse.wheel(0, 150); // Zoom
    }
    
    // 4. Assert: The polyhedron in the canvas appears at a different angle and scale than the default.
    const modifiedViewImage = await canvasContainer.screenshot();
    expect(modifiedViewImage).not.toEqual(defaultViewImage);

    // 5. Action: Click the reset view button.
    await resetButton.click();

    // 6. Assert: The 3D view of the polyhedron returns to its original default orientation and zoom level.
    const resetViewImage = await canvasContainer.screenshot();
    expect(resetViewImage).toEqual(defaultViewImage);
  });
});