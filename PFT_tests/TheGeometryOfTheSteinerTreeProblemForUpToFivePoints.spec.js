const { test, expect } = require('@playwright/test');
const path = require('path');

const fileUrl = 'file://' + path.resolve(__dirname, '../pages/TheGeometryOfTheSteinerTreeProblemForUpToFivePoints.html');

test.describe('Interactive Steiner Tree Visualization', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(fileUrl);
    // Wait for the canvas to be rendered, which indicates p5.js has likely initialized.
    // await page.waitForSelector('#main-canvas');
    await page.waitForTimeout(500);
  });

  test('Regular Points Count Selector', async ({ page }) => {
    // 1. Assert: The buttons with text "3", "4", and "5" are visible.
    await expect(page.locator('#btn-regular-3')).toBeVisible();
    await expect(page.locator('#btn-regular-4')).toBeVisible();
    await expect(page.locator('#btn-regular-5')).toBeVisible();

    // 2. Assert: The "4" button has a visual "active" state, and there are 4 blue regular points on the canvas.
    // We assume the active state is represented by an 'active' class.
    await expect(page.locator('#btn-regular-4')).toHaveClass(/active/);
    const initialLength = await page.locator('#text-total-length').textContent();
    // We verify the point count visually via a snapshot.
    const initialCanvas = await page.locator('#main-canvas').screenshot();
    expect(initialCanvas).toMatchSnapshot('canvas-4-regular-points.png');

    // 3. Action: Click the "3" button.
    await page.locator('#btn-regular-3').click();

    // 4. Assert: The number of blue regular points on the canvas changes to 3, the total length value updates, and the "3" button gains the "active" state.
    await expect(page.locator('#text-total-length')).not.toHaveText(initialLength);
    await expect(page.locator('#btn-regular-3')).toHaveClass(/active/);
    await expect(page.locator('#btn-regular-4')).not.toHaveClass(/active/);
    const canvasAfter3Points = await page.locator('#main-canvas').screenshot();
    expect(canvasAfter3Points).toMatchSnapshot('canvas-3-regular-points.png');

    // 5. Action: Click the "5" button.
    const lengthAt3Points = await page.locator('#text-total-length').textContent();
    await page.locator('#btn-regular-5').click();

    // 6. Assert: The number of blue regular points on the canvas changes to 5, the total length value updates, and the "5" button gains the "active" state.
    await expect(page.locator('#text-total-length')).not.toHaveText(lengthAt3Points);
    await expect(page.locator('#btn-regular-5')).toHaveClass(/active/);
    await expect(page.locator('#btn-regular-3')).not.toHaveClass(/active/);
    const canvasAfter5Points = await page.locator('#main-canvas').screenshot();
    expect(canvasAfter5Points).toMatchSnapshot('canvas-5-regular-points.png');
  });

  test('Point Manipulation Mode Radio Buttons', async ({ page }) => {
    // 1. Assert: The "regular points" and "Steiner points" radio buttons are visible.
    await expect(page.locator('#radio-regular')).toBeVisible();
    await expect(page.locator('#radio-steiner')).toBeVisible();

    // 2. Assert: The "Steiner points" radio button is checked by default.
    await expect(page.locator('#radio-steiner')).toBeChecked();
    await expect(page.locator('#radio-regular')).not.toBeChecked();

    // 3. Action: Click the "regular points" radio button.
    await page.locator('label[for="radio-regular"]').click();

    // 4. Assert: The "regular points" radio button becomes checked, and the "Steiner points" radio button becomes unchecked.
    await expect(page.locator('#radio-regular')).toBeChecked();
    await expect(page.locator('#radio-steiner')).not.toBeChecked();

    // 5. Action: Click the "Steiner points" radio button again.
    await page.locator('label[for="radio-steiner"]').click();

    // 6. Assert: The "Steiner points" radio button becomes checked again.
    await expect(page.locator('#radio-steiner')).toBeChecked();
  });

  test('Steiner Points Count Selector', async ({ page }) => {
    // 1. Assert: The buttons with text "0", "1", "2", and "3" are visible.
    await expect(page.locator('#btn-steiner-0')).toBeVisible();
    await expect(page.locator('#btn-steiner-1')).toBeVisible();
    await expect(page.locator('#btn-steiner-2')).toBeVisible();
    await expect(page.locator('#btn-steiner-3')).toBeVisible();

    // 2. Assert: The "2" button has a visual "active" state, and there are 2 red Steiner points on the canvas.
    await expect(page.locator('#btn-steiner-2')).toHaveClass(/active/);
    const initialLength = await page.locator('#text-total-length').textContent();
    const initialCanvas = await page.locator('#main-canvas').screenshot();
    expect(initialCanvas).toMatchSnapshot('canvas-2-steiner-points.png');

    // 3. Action: Click the "1" button.
    await page.locator('#btn-steiner-1').click();

    // 4. Assert: The number of red Steiner points changes to 1, the total length value updates, and the "1" button becomes active.
    await expect(page.locator('#text-total-length')).not.toHaveText(initialLength);
    await expect(page.locator('#btn-steiner-1')).toHaveClass(/active/);
    await expect(page.locator('#btn-steiner-2')).not.toHaveClass(/active/);
    const canvasAfter1Point = await page.locator('#main-canvas').screenshot();
    expect(canvasAfter1Point).toMatchSnapshot('canvas-1-steiner-point.png');
    
    // 5. Action: Click the "0" button.
    const lengthAt1Point = await page.locator('#text-total-length').textContent();
    await page.locator('#btn-steiner-0').click();

    // 6. Assert: All red Steiner points are removed from the canvas, the total length value updates, and the "0" button becomes active.
    await expect(page.locator('#text-total-length')).not.toHaveText(lengthAt1Point);
    await expect(page.locator('#btn-steiner-0')).toHaveClass(/active/);
    await expect(page.locator('#btn-steiner-1')).not.toHaveClass(/active/);
    const canvasAfter0Points = await page.locator('#main-canvas').screenshot();
    expect(canvasAfter0Points).toMatchSnapshot('canvas-0-steiner-points.png');
  });

  test('"Show the Angles" Checkbox', async ({ page }) => {
    // 1. Assert: The "show the angles" checkbox is visible.
    await expect(page.locator('#checkbox-show-angles')).toBeVisible();

    // 2. Assert: The checkbox is checked by default, and angle labels are visible on the canvas.
    await expect(page.locator('#checkbox-show-angles')).toBeChecked();
    const canvasWithAngles = await page.locator('#main-canvas').screenshot();
    expect(canvasWithAngles).toMatchSnapshot('canvas-with-angles.png');

    // 3. Action: Click the checkbox to uncheck it.
    await page.locator('#checkbox-show-angles').uncheck();

    // 4. Assert: The angle labels disappear from the canvas.
    const canvasWithoutAngles = await page.locator('#main-canvas').screenshot();
    expect(canvasWithoutAngles).toMatchSnapshot('canvas-without-angles.png');
    expect(canvasWithoutAngles).not.toEqual(canvasWithAngles);

    // 5. Action: Click the checkbox again to re-check it.
    await page.locator('#checkbox-show-angles').check();

    // 6. Assert: The angle labels reappear on the canvas.
    const canvasRechecked = await page.locator('#main-canvas').screenshot();
    expect(canvasRechecked).toEqual(canvasWithAngles);
  });

  test('Draggable Points on Canvas', async ({ page }) => {
    // 1. Assert: The main canvas and at least one draggable point are visible.
    await expect(page.locator('#main-canvas')).toBeVisible();

    // 2. Assert: The "The total length..." text displays an initial numerical value.
    const initialLengthText = await page.locator('#text-total-length').textContent();
    await expect(page.locator('#text-total-length')).not.toBeEmpty();
    expect(parseFloat(initialLengthText)).toBeGreaterThan(0);

    // Get canvas dimensions for dragging
    const canvasBox = await page.locator('#main-canvas').boundingBox();
    expect(canvasBox).not.toBeNull();
    
    // Steiner points are initially at the center
    const startX = canvasBox.x + canvasBox.width / 2;
    const startY = canvasBox.y + canvasBox.height / 2;
    const endX = startX + 50;
    const endY = startY - 50;

    // 3. Action: Click and drag a red Steiner point to a new position on the canvas.
    await page.mouse.move(startX, startY);
    await page.mouse.down();
    await page.mouse.move(endX, endY, { steps: 5 }); // Use steps for smoother drag
    await page.mouse.up();

    // 4. Assert: The network lines update, and the total length value changes.
    const finalLengthText = await page.locator('#text-total-length').textContent();
    expect(finalLengthText).not.toEqual(initialLengthText);

    // 5. Action: Release the mouse button to drop the point. (covered by page.mouse.up())
    
    // 6. Assert: The point remains in its new position, and the total length text settles on a new final value.
    const settledLengthText = await page.locator('#text-total-length').textContent();
    expect(settledLengthText).toEqual(finalLengthText);
    
    // Verify the visual change with a snapshot
    const canvasAfterDrag = await page.locator('#main-canvas').screenshot();
    expect(canvasAfterDrag).toMatchSnapshot('canvas-after-drag.png');
  });
});