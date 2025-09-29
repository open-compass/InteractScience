const { test, expect } = require('@playwright/test');
const path = require('path');

const fileUrl = 'file://' + path.resolve(__dirname, '../pages/ElectricFieldOfAPointCharge.html');

test.describe('Electric Field of a Point Charge', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto(fileUrl);
        // Wait for the canvas to be potentially rendered by p5.js
        // await page.waitForSelector('#canvas-container canvas');
    });

    test('Initial state of the demo', async ({ page }) => {
        // Assert: Take a screenshot of the current UI state
        await page.screenshot({ path: './snapshots/ElectricFieldOfAPointCharge-1.png', fullPage: true });
    });

    test('Source charge set to 2.5, test charge to 0, and locator moved near the x-axis', async ({ page }) => {
        // Action: Set the "source charge" slider to 2.5
        await page.locator('#slider-source-charge').fill('2.5');

        // Action: Set the "charge" slider to 0
        await page.locator('#slider-test-charge').fill('0');

        // Action: Drag the black locator dot on the canvas to the grid coordinates (3.98, 0.04)
        const canvas = page.locator('#canvas-container canvas');
        const bb = await canvas.boundingBox();
        const scale = 40; // pixels per meter
        const originX = bb.x + bb.width / 2;
        const originY = bb.y + bb.height / 2;

        // Initial logical position from plan: (2, 3)
        const initialGrid = { x: 2, y: 3 };
        const startX = originX + initialGrid.x * scale;
        const startY = originY - initialGrid.y * scale; // Y is inverted

        // Target logical position
        const targetGrid = { x: 3.98, y: 0.04 };
        const endX = originX + targetGrid.x * scale;
        const endY = originY - targetGrid.y * scale;

        await page.mouse.move(startX, startY);
        await page.mouse.down();
        await page.mouse.move(endX, endY, { steps: 10 });
        await page.mouse.up();

        // Assert: Take a screenshot of the current UI state
        await page.screenshot({ path: './snapshots/ElectricFieldOfAPointCharge-2.png', fullPage: true });
    });

    test('Test charge increased to a positive value while locator remains in place', async ({ page }) => {
        // Action: Set the "source charge" slider to 2.5
        await page.locator('#slider-source-charge').fill('2.5');

        // Action: Drag the black locator dot on the canvas to the grid coordinates (3.98, 0.04)
        const canvas = page.locator('#canvas-container canvas');
        const bb = await canvas.boundingBox();
        const scale = 40;
        const originX = bb.x + bb.width / 2;
        const originY = bb.y + bb.height / 2;

        const initialGrid = { x: 2, y: 3 };
        const startX = originX + initialGrid.x * scale;
        const startY = originY - initialGrid.y * scale;

        const targetGrid = { x: 3.98, y: 0.04 };
        const endX = originX + targetGrid.x * scale;
        const endY = originY - targetGrid.y * scale;

        await page.mouse.move(startX, startY);
        await page.mouse.down();
        await page.mouse.move(endX, endY, { steps: 10 });
        await page.mouse.up();
        
        // Action: Set the "charge" slider to 0.115
        await page.locator('#slider-test-charge').fill('0.115');

        // Assert: Take a screenshot of the current UI state
        await page.screenshot({ path: './snapshots/ElectricFieldOfAPointCharge-3.png', fullPage: true });
    });

    test('Locator moved to a new position in the first quadrant with a negative test charge', async ({ page }) => {
        // Action: Set the "source charge" slider to 2.5
        await page.locator('#slider-source-charge').fill('2.5');

        // Action: Set the "charge" slider to -0.107
        await page.locator('#slider-test-charge').fill('-0.107');

        // Action: Drag the black locator dot on the canvas to the grid coordinates (3.98, 2.04)
        const canvas = page.locator('#canvas-container canvas');
        const bb = await canvas.boundingBox();
        const scale = 40;
        const originX = bb.x + bb.width / 2;
        const originY = bb.y + bb.height / 2;

        const initialGrid = { x: 2, y: 3 };
        const startX = originX + initialGrid.x * scale;
        const startY = originY - initialGrid.y * scale;

        const targetGrid = { x: 3.98, y: 2.04 };
        const endX = originX + targetGrid.x * scale;
        const endY = originY - targetGrid.y * scale;

        await page.mouse.move(startX, startY);
        await page.mouse.down();
        await page.mouse.move(endX, endY, { steps: 10 });
        await page.mouse.up();

        // Assert: Take a screenshot of the current UI state
        await page.screenshot({ path: './snapshots/ElectricFieldOfAPointCharge-4.png', fullPage: true });
    });
});