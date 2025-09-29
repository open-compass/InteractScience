const { test, expect } = require('@playwright/test');

const fileUrl = 'file://' + require('path').resolve(__dirname, '../pages/AngleBisectorsOnTheCircumcircle.html');

/**
 * Helper function to calculate the pixel coordinates for a given angle on the circumcircle.
 * @param {number} angleDegrees The angle in degrees.
 * @returns {{x: number, y: number}} The x and y coordinates.
 */
const getCoordsForAngle = (angleDegrees) => {
    const centerX = 250;
    const centerY = 250;
    const radius = 200;
    const angleRadians = angleDegrees * (Math.PI / 180);
    const x = centerX + radius * Math.cos(angleRadians);
    const y = centerY + radius * Math.sin(angleRadians);
    return { x, y };
};

test.beforeEach(async ({ page }) => {
    await page.goto(fileUrl);
    // await page.locator('#p5-canvas').waitFor();
    await page.waitForTimeout(500);
});

test.describe('Draggable Point A', () => {
    test('Interaction with Draggable Point A', async ({ page }) => {
        const canvas = page.locator('#p5-canvas');
        const initialPointACoords = getCoordsForAngle(210);
        const initialPointBCoords = getCoordsForAngle(330);

        // 1. Assert: Point A is visible on the canvas.
        // 2. Assert: Point A is at its initial angular position of 210 degrees on the circumcircle.
        await expect(canvas).toHaveScreenshot('point-a-initial-state.png');

        // 3. Action: Click and drag Point A along the circumcircle to a new position.
        const newAngleForA = 180; // Move to the left edge
        const newPointACoords = getCoordsForAngle(newAngleForA);
        await page.mouse.move(initialPointACoords.x, initialPointACoords.y);
        await page.mouse.down();
        await page.mouse.move(newPointACoords.x, newPointACoords.y, { steps: 10 });
        await page.mouse.up();
        
        // 4. Assert: The lines representing triangle ABC, triangle A'B'C', and the extended bisectors change their orientation and length.
        await expect(canvas).toHaveScreenshot('point-a-dragged.png');

        // 5. Action: Drag Point A to be very close to Point B.
        await page.mouse.move(newPointACoords.x, newPointACoords.y);
        await page.mouse.down();
        await page.mouse.move(initialPointBCoords.x, initialPointBCoords.y, { steps: 10 });
        await page.mouse.up();

        // 6. Assert: The visualization updates, showing the vertices A and B nearly overlapping, and the connected lines are redrawn to reflect this degenerate state.
        await expect(canvas).toHaveScreenshot('point-a-near-b.png');
    });
});

test.describe('Draggable Point B', () => {
    test('Interaction with Draggable Point B', async ({ page }) => {
        const canvas = page.locator('#p5-canvas');
        const initialPointBCoords = getCoordsForAngle(330);

        // 1. Assert: Point B is visible on the canvas.
        // 2. Assert: Point B is at its initial angular position of 330 degrees on the circumcircle.
        await expect(canvas).toHaveScreenshot('point-b-initial-state.png');
        
        // 3. Action: Click and drag Point B along the circumcircle to a new position.
        const newAngleForB = 0; // Move to the right edge
        const newPointBCoords = getCoordsForAngle(newAngleForB);
        await page.mouse.move(initialPointBCoords.x, initialPointBCoords.y);
        await page.mouse.down();
        await page.mouse.move(newPointBCoords.x, newPointBCoords.y, { steps: 10 });
        await page.mouse.up();

        // 4. Assert: The positions of calculated points A' and C' change, and the overall diagram is redrawn.
        await expect(canvas).toHaveScreenshot('point-b-dragged.png');

        // 5. Action: Drag Point B to the opposite side of the circle from its starting position.
        const oppositeAngleForB = 150; // 330 - 180
        const oppositePointBCoords = getCoordsForAngle(oppositeAngleForB);
        await page.mouse.move(newPointBCoords.x, newPointBCoords.y);
        await page.mouse.down();
        await page.mouse.move(oppositePointBCoords.x, oppositePointBCoords.y, { steps: 10 });
        await page.mouse.up();

        // 6. Assert: The diagram updates continuously during the drag, and the geometry remains intact in the new configuration.
        await expect(canvas).toHaveScreenshot('point-b-opposite.png');
    });
});

test.describe('Draggable Point C', () => {
    test('Interaction with Draggable Point C', async ({ page }) => {
        const canvas = page.locator('#p5-canvas');
        const initialPointCCoords = getCoordsForAngle(90);
        const initialPointACoords = getCoordsForAngle(210);

        // 1. Assert: Point C is visible on the canvas.
        // 2. Assert: Point C is at its initial angular position of 90 degrees on the circumcircle.
        await expect(canvas).toHaveScreenshot('point-c-initial-state.png');

        // 3. Action: Click and drag Point C along the circumcircle to a new position.
        const newAngleForC = 45;
        const newPointCCoords = getCoordsForAngle(newAngleForC);
        await page.mouse.move(initialPointCCoords.x, initialPointCCoords.y);
        await page.mouse.down();
        await page.mouse.move(newPointCCoords.x, newPointCCoords.y, { steps: 10 });
        await page.mouse.up();

        // 4. Assert: The positions of calculated points A' and B' change, and the lines forming both triangles are redrawn.
        await expect(canvas).toHaveScreenshot('point-c-dragged.png');
        
        // 5. Action: Drag Point C to coincide with the initial position of Point A (210 degrees).
        await page.mouse.move(newPointCCoords.x, newPointCCoords.y);
        await page.mouse.down();
        await page.mouse.move(initialPointACoords.x, initialPointACoords.y, { steps: 10 });
        await page.mouse.up();

        // 6. Assert: The visualization updates, showing vertices C and A overlapping, and the geometry is redrawn to reflect the resulting line segment.
        await expect(canvas).toHaveScreenshot('point-c-on-a.png');
    });
});