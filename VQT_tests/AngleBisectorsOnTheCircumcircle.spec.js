const { test, expect } = require('@playwright/test');
const path = require('path');

const fileUrl = 'file://' + path.resolve(__dirname, '../pages/AngleBisectorsOnTheCircumcircle.html');

// Constants based on the implementation plan
const CANVAS_CENTER = { x: 250, y: 250 };
const CIRCLE_RADIUS = 200;

/**
 * Converts an angle in degrees to Cartesian coordinates on the canvas.
 * Assumes a standard mathematical angle system (0 degrees at the right, increasing counter-clockwise).
 * @param {number} angleDegrees - The angle in degrees.
 * @returns {{x: number, y: number}} The coordinates.
 */
function getCoordinates(angleDegrees) {
    const angleRadians = angleDegrees * (Math.PI / 180);
    const x = CANVAS_CENTER.x + CIRCLE_RADIUS * Math.cos(angleRadians);
    const y = CANVAS_CENTER.y + CIRCLE_RADIUS * Math.sin(angleRadians);
    return { x, y };
}

test.describe('Angle Bisectors on the Circumcircle', () => {
    
    // Initial positions based on the implementation plan
    const initialA = getCoordinates(210); // 7π/6
    const initialB = getCoordinates(330); // 11π/6
    const initialC = getCoordinates(90);  // π/2

    test('Test Case 1: Triangle vertices positioned in the top-left, bottom-left, and right quadrants.', async ({ page }) => {
        await page.goto(fileUrl);

        // Action: Drag point B from its initial position to ~132 degrees.
        const targetB = getCoordinates(132);
        await page.mouse.move(initialB.x, initialB.y);
        await page.mouse.down();
        await page.mouse.move(targetB.x, targetB.y);
        await page.mouse.up();

        // Action: Drag point C from its initial position to ~347 degrees.
        const targetC = getCoordinates(347);
        await page.mouse.move(initialC.x, initialC.y);
        await page.mouse.down();
        await page.mouse.move(targetC.x, targetC.y);
        await page.mouse.up();

        // Action: Drag point A from its initial position to ~236 degrees.
        const targetA = getCoordinates(236);
        await page.mouse.move(initialA.x, initialA.y);
        await page.mouse.down();
        await page.mouse.move(targetA.x, targetA.y);
        await page.mouse.up();
        
        // Assert: Take a screenshot
        await page.screenshot({ path: './snapshots/AngleBisectorsOnTheCircumcircle-1.png', fullPage: true });
    });

    test('Test Case 2: Point B is at the top of the circle, with A in the bottom-left and C in the right quadrant.', async ({ page }) => {
        await page.goto(fileUrl);
        
        // Action: Drag point B from its initial position to the top of the circle (90 degrees).
        const targetB = getCoordinates(90);
        await page.mouse.move(initialB.x, initialB.y);
        await page.mouse.down();
        await page.mouse.move(targetB.x, targetB.y);
        await page.mouse.up();

        // Action: Drag point C from its initial position to ~347 degrees.
        const targetC = getCoordinates(347);
        await page.mouse.move(initialC.x, initialC.y);
        await page.mouse.down();
        await page.mouse.move(targetC.x, targetC.y);
        await page.mouse.up();

        // Action: Drag point A from its initial position to ~236 degrees.
        const targetA = getCoordinates(236);
        await page.mouse.move(initialA.x, initialA.y);
        await page.mouse.down();
        await page.mouse.move(targetA.x, targetA.y);
        await page.mouse.up();

        // Assert: Take a screenshot
        await page.screenshot({ path: './snapshots/AngleBisectorsOnTheCircumcircle-2.png', fullPage: true });
    });

    test('Test Case 3: Triangle vertices positioned at the right, top-left, and bottom of the circumcircle.', async ({ page }) => {
        await page.goto(fileUrl);
        
        // Action: Drag point C from its initial position to the rightmost point (0 degrees).
        const targetC = getCoordinates(0);
        await page.mouse.move(initialC.x, initialC.y);
        await page.mouse.down();
        await page.mouse.move(targetC.x, targetC.y);
        await page.mouse.up();

        // Action: Drag point B from its initial position to ~139 degrees.
        const targetB = getCoordinates(139);
        await page.mouse.move(initialB.x, initialB.y);
        await page.mouse.down();
        await page.mouse.move(targetB.x, targetB.y);
        await page.mouse.up();
        
        // Action: Drag point A from its initial position to the bottommost point (270 degrees).
        const targetA = getCoordinates(270);
        await page.mouse.move(initialA.x, initialA.y);
        await page.mouse.down();
        await page.mouse.move(targetA.x, targetA.y);
        await page.mouse.up();

        // Assert: Take a screenshot
        await page.screenshot({ path: './snapshots/AngleBisectorsOnTheCircumcircle-3.png', fullPage: true });
    });

    test('Test Case 4: Triangle vertices are spread out, creating a large orange inner triangle.', async ({ page }) => {
        await page.goto(fileUrl);

        // Action: Drag point B from its initial position to ~128 degrees.
        const targetB = getCoordinates(128);
        await page.mouse.move(initialB.x, initialB.y);
        await page.mouse.down();
        await page.mouse.move(targetB.x, targetB.y);
        await page.mouse.up();

        // Action: Drag point C from its initial position to ~315 degrees.
        const targetC = getCoordinates(315);
        await page.mouse.move(initialC.x, initialC.y);
        await page.mouse.down();
        await page.mouse.move(targetC.x, targetC.y);
        await page.mouse.up();

        // Action: Drag point A from its initial position to ~224 degrees.
        const targetA = getCoordinates(224);
        await page.mouse.move(initialA.x, initialA.y);
        await page.mouse.down();
        await page.mouse.move(targetA.x, targetA.y);
        await page.mouse.up();

        // Assert: Take a screenshot
        await page.screenshot({ path: './snapshots/AngleBisectorsOnTheCircumcircle-4.png', fullPage: true });
    });
});