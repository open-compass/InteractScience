const { test } = require('@playwright/test');
const path = require('path');

// Helper function to convert math coordinates (origin at 0,0) to canvas-relative pixel coordinates.
// This is based on the plan's description of a p5.js canvas with its origin at the bottom-center.
// Assumes canvas dimensions are 400x400 as per the "e.g., 400x400" example in the plan.
function mathToCanvasCoords(mathPos) {
    const canvasWidth = 400;
    const canvasHeight = 400;
    const originX = canvasWidth / 2;
    const originY = canvasHeight;

    return {
        x: originX + mathPos.x,
        y: originY - mathPos.y,
    };
}

// Helper function to perform a drag action on the p5.js canvas.
async function performDrag(page, startMathCoords, endMathCoords) {
    const canvas = await page.locator('#canvas-bloch');
    const canvasBox = await canvas.boundingBox();
    if (!canvasBox) {
        throw new Error("Could not find canvas bounding box.");
    }

    const start = mathToCanvasCoords(startMathCoords);
    const end = mathToCanvasCoords(endMathCoords);

    const startX = canvasBox.x + start.x;
    const startY = canvasBox.y + start.y;
    const endX = canvasBox.x + end.x;
    const endY = canvasBox.y + end.y;

    await page.mouse.move(startX, startY);
    await page.mouse.down();
    await page.mouse.move(endX, endY, { steps: 5 });
    await page.mouse.up();
}

test.describe('OptimalJointMeasurementsOfQubitObservables', () => {
    const fileUrl = 'file://' + path.resolve(__dirname, '../pages/OptimalJointMeasurementsOfQubitObservables.html');

    test.beforeEach(async ({ page }) => {
        await page.goto(fileUrl);
        // Wait for plotly to render to avoid flaky screenshots
        // await page.waitForSelector('#plot-error .plotly');
    });

    test('Initial display with default parameters', async ({ page }) => {
        await page.screenshot({ path: './snapshots/OptimalJointMeasurementsOfQubitObservables-1.png', fullPage: true });
    });

    test('Display metric error visualizations with increased incompatibility', async ({ page }) => {
        await page.locator('#slider-theta').fill('0.568628');

        // Based on plan: default c is at (R*0.3, R*0.7) and R=150. Drag to a position "just above" vector a.
        // theta = 0.568628
        // a_tip_x = 150 * sin(0.568628) = 80.82
        // a_tip_y = 150 * cos(0.568628) = 126.36
        const startPos = { x: 150 * 0.3, y: 150 * 0.7 }; // {x: 45, y: 105}
        const endPos = { x: 80.82, y: 135 }; // "just above" a
        await performDrag(page, startPos, endPos);

        await page.locator('#checkbox-metric-circle').check();
        await page.locator('#checkbox-metric-region').check();
        
        await page.screenshot({ path: './snapshots/OptimalJointMeasurementsOfQubitObservables-2.png', fullPage: true });
    });

    test('Display first-order optimization vectors and regions', async ({ page }) => {
        await page.locator('#slider-theta').fill('0.606327');

        // Drag to "midway between a and b" (x=0) at "80% of radius" (y=0.8*150=120).
        const startPos = { x: 150 * 0.3, y: 150 * 0.7 }; // {x: 45, y: 105}
        const endPos = { x: 0, y: 120 };
        await performDrag(page, startPos, endPos);

        await page.locator('#checkbox-first-order-vec').check();
        await page.locator('#checkbox-first-order-region').check();
        
        await page.screenshot({ path: './snapshots/OptimalJointMeasurementsOfQubitObservables-3.png', fullPage: true });
    });

    test('Display only the first-order optimizing d vector', async ({ page }) => {
        await page.locator('#slider-theta').fill('0.626748');
        
        // Drag to "midway between a and b" (x=0) at "80% of radius" (y=0.8*150=120).
        const startPos = { x: 150 * 0.3, y: 150 * 0.7 }; // {x: 45, y: 105}
        const endPos = { x: 0, y: 120 };
        await performDrag(page, startPos, endPos);

        await page.locator('#checkbox-first-order-vec').check();
        
        await page.screenshot({ path: './snapshots/OptimalJointMeasurementsOfQubitObservables-4.png', fullPage: true });
    });
});