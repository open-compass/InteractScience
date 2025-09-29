const { test, expect } = require('@playwright/test');

test.describe('Rapidly Exploring Random Tree (RRT) and RRT* demo', () => {
    const fileUrl = 'file://' + require('path').resolve(__dirname, '../pages/RapidlyExploringRandomTreeRRTAndRRT.html');

    test.beforeEach(async ({ page }) => {
        await page.goto(fileUrl);
    });

    test('Initial state on page load', async ({ page }) => {
        await page.screenshot({ path: './snapshots/RapidlyExploringRandomTreeRRTAndRRT-1.png', fullPage: true });
    });

    test('RRT with 1001 nodes, a relocated goal, and an increased goal radius', async ({ page }) => {
        await page.locator('#btn-rrt').click();

        const canvas = page.locator('#canvas-container > canvas');
        const canvasBoundingBox = await canvas.boundingBox();
        await page.mouse.move(canvasBoundingBox.x + 450, canvasBoundingBox.y + 450);
        await page.mouse.down();
        await page.mouse.move(canvasBoundingBox.x + 150, canvasBoundingBox.y + 100);
        await page.mouse.up();

        await page.locator('#slider-radius').fill('2.5');

        await page.locator('#btn-add-500').click();
        await page.locator('#btn-add-500').click();

        await page.screenshot({ path: './snapshots/RapidlyExploringRandomTreeRRTAndRRT-2.png', fullPage: true });
    });

    test('RRT algorithm finds a path to the goal', async ({ page }) => {
        await page.locator('#btn-rrt').click();

        const canvas = page.locator('#canvas-container > canvas');
        const canvasBoundingBox = await canvas.boundingBox();
        await page.mouse.move(canvasBoundingBox.x + 450, canvasBoundingBox.y + 450);
        await page.mouse.down();
        await page.mouse.move(canvasBoundingBox.x + 150, canvasBoundingBox.y + 100);
        await page.mouse.up();
        
        await page.locator('#slider-radius').fill('2.5');

        await page.locator('#btn-add-500').click();
        await page.locator('#btn-add-500').click();
        await page.locator('#btn-add-500').click();

        await page.screenshot({ path: './snapshots/RapidlyExploringRandomTreeRRTAndRRT-3.png', fullPage: true });
    });

    test('RRT* algorithm showing a rewired, shorter path and full tree edges', async ({ page }) => {
        await page.locator('#btn-rrt-star').click();

        const canvas = page.locator('#canvas-container > canvas');
        const canvasBoundingBox = await canvas.boundingBox();
        await page.mouse.move(canvasBoundingBox.x + 450, canvasBoundingBox.y + 450);
        await page.mouse.down();
        await page.mouse.move(canvasBoundingBox.x + 150, canvasBoundingBox.y + 100);
        await page.mouse.up();

        await page.locator('#slider-radius').fill('2.5');

        await page.locator('#btn-add-500').click();
        await page.locator('#btn-add-500').click();

        await page.screenshot({ path: './snapshots/RapidlyExploringRandomTreeRRTAndRRT-4.png', fullPage: true });
    });
});