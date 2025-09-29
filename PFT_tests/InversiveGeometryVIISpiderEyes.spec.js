const { test, expect } = require('@playwright/test');
const path = require('path');

const fileUrl = 'file://' + path.resolve(__dirname, '../pages/InversiveGeometryVIISpiderEyes.html');

test.beforeEach(async ({ page }) => {
  await page.goto(fileUrl);
  // Wait for p5.js to potentially initialize and draw the first frame
  await page.waitForTimeout(500);
});

test.describe('Inversive Geometry VII - Spider Eyes', () => {

  test('Rings Radio Button Control', async ({ page }) => {
    // 1. Assert: The "rings" radio button group is visible.
    await expect(page.locator('#rings-control-group')).toBeVisible();

    // 2. Assert: The radio button with value "1" is checked by default, and the canvas shows a single ring of circles.
    await expect(page.locator('#rings-1')).toBeChecked();
    const initialCanvas = await page.locator('#p5-canvas').screenshot();
    expect(initialCanvas).not.toBeNull();

    // 3. Action: Click the radio button with value "4".
    await page.locator('label[for="rings-4"]').click();

    // 4. Assert: The canvas visualization updates to show a new pattern of circles.
    const canvasAfterRings4 = await page.locator('#p5-canvas').screenshot();
    expect(canvasAfterRings4).not.toEqual(initialCanvas);

    // 5. Action: Click the radio button with value "7".
    await page.locator('label[for="rings-7"]').click();

    // 6. Assert: The canvas visualization updates again to show a different pattern of circles.
    const canvasAfterRings7 = await page.locator('#p5-canvas').screenshot();
    expect(canvasAfterRings7).not.toEqual(canvasAfterRings4);
  });

  test('Circles per Ring Radio Button Control', async ({ page }) => {
    // 1. Assert: The "circles per ring" radio button group is visible.
    await expect(page.locator('#circles-per-ring-control-group')).toBeVisible();

    // 2. Assert: The radio button with value "8" is checked by default, and the canvas shows circles arranged in groups of 8.
    await expect(page.locator('#cpr-8')).toBeChecked();
    const initialCanvas = await page.locator('#p5-canvas').screenshot();
    expect(initialCanvas).not.toBeNull();

    // 3. Action: Click the radio button with value "12".
    await page.locator('label[for="cpr-12"]').click();

    // 4. Assert: The canvas visualization updates to show a new pattern of circles.
    const canvasAfterCpr12 = await page.locator('#p5-canvas').screenshot();
    expect(canvasAfterCpr12).not.toEqual(initialCanvas);

    // 5. Action: Click the radio button with value "4".
    await page.locator('label[for="cpr-4"]').click();

    // 6. Assert: The canvas visualization updates again to show a different pattern of circles.
    const canvasAfterCpr4 = await page.locator('#p5-canvas').screenshot();
    expect(canvasAfterCpr4).not.toEqual(canvasAfterCpr12);
  });

  test('Inverse Mode Checkbox Control', async ({ page }) => {
    // 1. Assert: The "inverse" checkbox is visible.
    await expect(page.locator('#checkbox-inverse')).toBeVisible();

    // 2. Assert: The checkbox is unchecked by default, and the canvas shows the normal view with grey circles.
    await expect(page.locator('#checkbox-inverse')).not.toBeChecked();
    const normalViewCanvas = await page.locator('#p5-canvas').screenshot();
    expect(normalViewCanvas).not.toBeNull();

    // 3. Action: Click the "inverse" checkbox to check it.
    await page.locator('#checkbox-inverse').check();

    // 4. Assert: The canvas view changes to inverse mode, showing red locators, a red inversion circle, and purple inverted shapes.
    const inverseViewCanvas = await page.locator('#p5-canvas').screenshot();
    expect(inverseViewCanvas).not.toEqual(normalViewCanvas);

    // 5. Action: Click the "inverse" checkbox again to uncheck it.
    await page.locator('#checkbox-inverse').uncheck();

    // 6. Assert: The canvas reverts to the normal view, and the red locators and purple shapes are no longer visible.
    const revertedViewCanvas = await page.locator('#p5-canvas').screenshot();
    expect(revertedViewCanvas).toEqual(normalViewCanvas);
  });

  test('Draggable Locators on Canvas', async ({ page }) => {
    // Prerequisite action from test case: check the "inverse" checkbox
    await page.locator('#checkbox-inverse').check();
    await page.waitForTimeout(200); // Allow canvas to redraw

    // 1. Assert: After checking the "inverse" checkbox, two red locator points are visible on the canvas.
    // 2. Assert: The locators are at their default positions, and an initial inverted pattern is displayed.
    const initialInverseCanvas = await page.locator('#p5-canvas').screenshot();
    expect(initialInverseCanvas).not.toBeNull();

    // 3. Action: Click and drag one of the red locators to a different position on the canvas.
    // Based on the plan: canvas is 550x550, center is (275, 275).
    // Initial locators are at (+/-50, 0) relative to center.
    // So, pixel coords are (225, 275) and (325, 275).
    const canvas = page.locator('#p5-canvas');
    const startPos = { x: 225, y: 275 };
    const dragEndPos = { x: 150, y: 200 };
    await canvas.hover({ position: startPos });
    await page.mouse.down();
    await page.mouse.move(dragEndPos.x, dragEndPos.y);
    await page.mouse.up();

    // 4. Assert: The red inversion circle and the purple inverted shapes update in real-time as the locator is dragged.
    const draggedCanvas = await page.locator('#p5-canvas').screenshot();
    expect(draggedCanvas).not.toEqual(initialInverseCanvas);

    // 5. Action: Drag the locator very close to the other, stationary locator.
    // The other locator is at (325, 275). We'll drag the moved locator to (320, 275).
    const closePos = { x: 320, y: 275 };
    await canvas.hover({ position: dragEndPos });
    await page.mouse.down();
    await page.mouse.move(closePos.x, closePos.y);
    await page.mouse.up();

    // 6. Assert: The inversion circle shrinks significantly, and the inverted pattern on the canvas updates accordingly.
    const closeLocatorsCanvas = await page.locator('#p5-canvas').screenshot();
    expect(closeLocatorsCanvas).not.toEqual(draggedCanvas);
  });
});