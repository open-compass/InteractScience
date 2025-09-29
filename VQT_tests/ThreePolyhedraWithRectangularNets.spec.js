const { test, expect } = require('@playwright/test');

test.describe('Three Polyhedra with Rectangular Nets', () => {
    const fileUrl = 'file://' + require('path').resolve(__dirname, '../pages/ThreePolyhedraWithRectangularNets.html');

    test.beforeEach(async ({ page }) => {
        await page.goto(fileUrl);
    });

    test('Initial state with Solid 1 fully unfolded', async ({ page }) => {
        // 1. Action: Load the page.
        // The beforeEach hook handles this.
        
        // 2. Assert: Take a screenshot of the current UI state.
        await page.screenshot({ path: './snapshots/ThreePolyhedraWithRectangularNets-1.png', fullPage: true });
    });

    test('View reset to default for unfolded Solid 1', async ({ page }) => {
        // 1. Action: Click and drag the mouse on the canvas to rotate the 3D view.
        const canvas = page.locator('#canvas-container');
        const boundingBox = await canvas.boundingBox();
        if (boundingBox) {
            await page.mouse.move(boundingBox.x + boundingBox.width / 2, boundingBox.y + boundingBox.height / 2);
            await page.mouse.down();
            await page.mouse.move(boundingBox.x + boundingBox.width / 2 + 100, boundingBox.y + boundingBox.height / 2);
            await page.mouse.up();
        }

        // 2. Action: Click the reset view button.
        await page.locator('#btn-reset-view').click();
        
        // 3. Assert: Take a screenshot of the current UI state.
        await page.screenshot({ path: './snapshots/ThreePolyhedraWithRectangularNets-2.png', fullPage: true });
    });

    test('Partially folded state of Solid 1', async ({ page }) => {
        // 1. Action: Drag the handle of the "fold-unfold" slider to approximately 75% of its range.
        await page.locator('#slider-fold').fill('0.75');

        // 2. Assert: Take a screenshot of the current UI state.
        await page.screenshot({ path: './snapshots/ThreePolyhedraWithRectangularNets-3.png', fullPage: true });
    });

    test('Fully folded state of Solid 1', async ({ page }) => {
        // 1. Action: Drag the handle of the "fold-unfold" slider to the maximum position.
        await page.locator('#slider-fold').fill('1');

        // 2. Assert: Take a screenshot of the current UI state.
        await page.screenshot({ path: './snapshots/ThreePolyhedraWithRectangularNets-4.png', fullPage: true });
    });
});