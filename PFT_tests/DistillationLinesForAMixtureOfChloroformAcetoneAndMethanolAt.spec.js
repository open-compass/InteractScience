const { test, expect } = require('@playwright/test');

const fileUrl = 'file://' + require('path').resolve(__dirname, '../pages/DistillationLinesForAMixtureOfChloroformAcetoneAndMethanolAt.html');

test.describe('Draggable Locator on Ternary Plot', () => {

  test('Draggable Locator on Ternary Plot', async ({ page }) => {
    await page.goto(fileUrl);
    // Allow a brief moment for p5.js to initialize and render the canvas
    await page.waitForTimeout(500);

    const canvas = page.locator('#visualization-canvas');

    // Helper function to convert data coordinates to pixel coordinates on the canvas
    const toPixel = (data, canvasSize = 650, margin = 60) => {
      const plotArea = canvasSize - 2 * margin;
      const x = margin + data.x * plotArea;
      const y = (canvasSize - margin) - data.y * plotArea;
      return { x: Math.round(x), y: Math.round(y) };
    };

    // 1. Assert: The white circular locator is visible on the canvas.
    // 2. Assert: The locator is at its default position corresponding to data coordinates { x: 0.2, y: 0.22 } and the initial blue distillation line is displayed.
    await expect(canvas).toHaveScreenshot('locator-initial-position.png');

    // Define coordinates for dragging
    const initialPosPx = toPixel({ x: 0.2, y: 0.22 }); // Start of drag
    // A point on the constrained path towards azeotrope A2
    const targetNearA2Px = toPixel({ x: 0.13, y: 0.565 });

    // 3. Action: Click and drag the locator along its constrained path towards azeotrope A2.
    await page.mouse.move(initialPosPx.x, initialPosPx.y);
    await page.mouse.down();
    await page.mouse.move(targetNearA2Px.x, targetNearA2Px.y, { steps: 10 });
    await page.mouse.up();

    // 4. Assert: The locator's position on the canvas updates, and the shape of the blue distillation line changes in response.
    await expect(canvas).toHaveScreenshot('locator-dragged-towards-a2.png');

    // Define coordinates for the second drag
    // A point on the constrained path near azeotrope A1
    const targetNearA1Px = toPixel({ x: 0.61, y: 0.04 });

    // 5. Action: Drag the locator to the opposite end of its constrained path, near azeotrope A1.
    // The drag starts from the locator's current position
    await page.mouse.move(targetNearA2Px.x, targetNearA2Px.y);
    await page.mouse.down();
    await page.mouse.move(targetNearA1Px.x, targetNearA1Px.y, { steps: 15 });
    await page.mouse.up();

    // 6. Assert: The locator moves to the boundary position near A1, and the blue distillation line is redrawn based on this new boundary position.
    await expect(canvas).toHaveScreenshot('locator-dragged-towards-a1.png');
  });
});