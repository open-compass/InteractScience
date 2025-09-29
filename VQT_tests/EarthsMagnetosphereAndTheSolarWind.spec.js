const { test, expect } = require('@playwright/test');
const path = require('path');

test.describe("Earth's Magnetosphere and The Solar Wind", () => {
    const fileUrl = 'file://' + path.resolve(__dirname, '../pages/EarthsMagnetosphereAndTheSolarWind.html');

    test('2D view with month slider set to mid-year', async ({ page }) => {
        await page.goto(fileUrl);

        // Action: Drag the "month" slider to the 7th position from the left (value 6, representing July).
        await page.locator('#slider-month').fill('6');

        // Assert: Take a screenshot of the current UI state.
        await page.screenshot({ path: './snapshots/EarthsMagnetosphereAndTheSolarWind-1.png', fullPage: true });
    });

    test('3D perspective with month slider at mid-year', async ({ page }) => {
        await page.goto(fileUrl);

        // Action: Drag the "month" slider to the 7th position from the left (value 6, representing July).
        await page.locator('#slider-month').fill('6');

        // Action: Click the "3D" button in the perspective control group.
        await page.locator('#btn-3d').click();
        
        // Wait for potential rendering/transition
        await page.waitForTimeout(500);

        // Assert: Take a screenshot of the current UI state.
        await page.screenshot({ path: './snapshots/EarthsMagnetosphereAndTheSolarWind-2.png', fullPage: true });
    });

    test('Return to 2D view with month slider at mid-year', async ({ page }) => {
        await page.goto(fileUrl);

        // Action: Drag the "month" slider to the 7th position from the left (value 6, representing July).
        await page.locator('#slider-month').fill('6');

        // Action: Click the "3D" button.
        await page.locator('#btn-3d').click();
        
        // Wait for potential rendering/transition
        await page.waitForTimeout(500);

        // Action: Click the "2D" button.
        await page.locator('#btn-2d').click();
        
        // Wait for potential rendering/transition
        await page.waitForTimeout(500);

        // Assert: Take a screenshot of the current UI state.
        await page.screenshot({ path: './snapshots/EarthsMagnetosphereAndTheSolarWind-3.png', fullPage: true });
    });

    test('3D perspective for January, zoomed and rotated', async ({ page }) => {
        await page.goto(fileUrl);

        // Action: Drag the "month" slider to the far left (value 0, representing January).
        await page.locator('#slider-month').fill('0');

        // Action: Click the "3D" button.
        await page.locator('#btn-3d').click();
        
        // Wait for potential rendering/transition
        await page.waitForTimeout(500);

        const canvas = page.locator('#main-canvas');
        const canvasBox = await canvas.boundingBox();

        // Action: Using the orbit controls, zoom into the scene until the Earth model is prominent.
        await page.mouse.move(canvasBox.x + canvasBox.width / 2, canvasBox.y + canvasBox.height / 2);
        await page.mouse.wheel(0, -800);
        await page.waitForTimeout(200);

        // Action: Using the orbit controls, rotate the camera view horizontally until the Earth is positioned on the left side of the viewport.
        const startX = canvasBox.x + canvasBox.width / 2;
        const startY = canvasBox.y + canvasBox.height / 2;
        const endX = startX + canvasBox.width / 3;
        
        await page.mouse.move(startX, startY);
        await page.mouse.down();
        await page.mouse.move(endX, startY);
        await page.mouse.up();
        await page.waitForTimeout(200);

        // Assert: Take a screenshot of the current UI state.
        await page.screenshot({ path: './snapshots/EarthsMagnetosphereAndTheSolarWind-4.png', fullPage: true });
    });
});