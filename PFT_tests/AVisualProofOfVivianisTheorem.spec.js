const { test, expect } = require('@playwright/test');

const fileUrl = 'file://' + require('path').resolve(__dirname, '../pages/AVisualProofOfVivianisTheorem.html');

test.beforeEach(async ({ page }) => {
  await page.goto(fileUrl);
  // Wait for the canvas to be potentially rendered by p5.js
  // await page.waitForSelector('#canvas-container canvas');
  await page.waitForTimeout(500);
});

test.describe('Step Selector Radio Buttons', () => {
  test('Step Selector Radio Buttons', async ({ page }) => {
    // 1. Assert: The radio button group with the label "step" is visible.
    await expect(page.locator('label', { hasText: 'step' })).toBeVisible();

    // 2. Assert: The radio button with id="step1" is checked by default, and the canvas shows three perpendicular lines from point P.
    await expect(page.locator('#step1')).toBeChecked();
    const canvasContainer = page.locator('#canvas-container');
    await expect(canvasContainer).toHaveScreenshot('step1-default-view.png');

    // 3. Action: Click the radio button with id="step2".
    await page.locator('label[for="step2"]').click();

    // 4. Assert: The step2 radio button is now checked, and the canvas updates to show three small colored triangles originating from point P.
    await expect(page.locator('#step2')).toBeChecked();
    await expect(canvasContainer).toHaveScreenshot('step2-selected-view.png');

    // 5. Action: Click the radio button with id="step3".
    await page.locator('label[for="step3"]').click();

    // 6. Assert: The step3 radio button is now checked, and the canvas updates to show three colored triangles stacked along the main altitude.
    await expect(page.locator('#step3')).toBeChecked();
    await expect(canvasContainer).toHaveScreenshot('step3-selected-view.png');
  });
});

test.describe('Draggable Point P on Canvas', () => {
  test('Draggable Point P on Canvas', async ({ page }) => {
    const canvasContainer = page.locator('#canvas-container');
    const canvasElement = page.locator('#canvas-container canvas');
    const canvasBox = await canvasElement.boundingBox();

    // 1. Assert: The draggable point marker P is visible inside the main equilateral triangle.
    // 2. Assert: Point P is at its default initial position, and the three perpendicular lines are drawn from this point.
    await expect(canvasContainer).toHaveScreenshot('drag-p-initial-state.png');

    // Define coordinates for drag actions relative to the canvas position
    const initialP = { x: canvasBox.x + canvasBox.width * 0.4, y: canvasBox.y + canvasBox.height * 0.6 };
    const centerPos = { x: canvasBox.x + canvasBox.width * 0.5, y: canvasBox.y + canvasBox.height * 0.55 }; // Slightly below true center
    const vertexAPos = { x: canvasBox.x + 60, y: canvasBox.y + 470 }; // Estimated from typical rendering

    // 3. Action: Drag point P to a new location near the center of the triangle.
    await page.mouse.move(initialP.x, initialP.y);
    await page.mouse.down();
    await page.mouse.move(centerPos.x, centerPos.y, { steps: 5 });
    await page.mouse.up();
    
    // 4. Assert: Point P has moved, and the lengths and orientations of the three perpendicular lines have changed.
    await expect(canvasContainer).toHaveScreenshot('drag-p-moved-to-center.png');

    // 5. Action: Drag point P to one of the main triangle's vertices (e.g., vertex A).
    await page.mouse.move(centerPos.x, centerPos.y);
    await page.mouse.down();
    await page.mouse.move(vertexAPos.x, vertexAPos.y, { steps: 10 });
    await page.mouse.up();

    // 6. Assert: Point P is now at the vertex, and the visualization has updated, showing that two perpendiculars have vanished and one remains.
    await expect(canvasContainer).toHaveScreenshot('drag-p-moved-to-vertex-a.png');
  });
});