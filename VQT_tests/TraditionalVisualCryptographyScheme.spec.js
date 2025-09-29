const { test, expect } = require('@playwright/test');

test.describe('TraditionalVisualCryptographyScheme', () => {
    const fileUrl = 'file://' + require('path').resolve(__dirname, '../pages/TraditionalVisualCryptographyScheme.html');

    test('Shares separated at top-left and bottom-right', async ({ page }) => {
        await page.goto(fileUrl);

        // Action 1: Drag handle 1 to left (25% horizontal)
        const handle1 = page.locator('#joystick-handle1');
        const container1 = page.locator('#joystick-share1');
        const container1Box = await container1.boundingBox();
        await handle1.hover();
        await page.mouse.down();
        // Target: top: 25% (initial), left: 25%
        await page.mouse.move(container1Box.x + container1Box.width * 0.25, container1Box.y + container1Box.height * 0.25);
        await page.mouse.up();

        // Action 2: Drag handle 2 to right (75% horizontal)
        const handle2 = page.locator('#joystick-handle2');
        const container2 = page.locator('#joystick-share2');
        const container2Box = await container2.boundingBox();
        await handle2.hover();
        await page.mouse.down();
        // Target: top: 75% (initial), left: 75%
        await page.mouse.move(container2Box.x + container2Box.width * 0.75, container2Box.y + container2Box.height * 0.75);
        await page.mouse.up();

        await page.screenshot({ path: './snapshots/TraditionalVisualCryptographyScheme-1.png', fullPage: true });
    });

    test('Shares reset to their initial positions', async ({ page }) => {
        await page.goto(fileUrl);
        
        // Action: Click the reset button
        await page.locator('#btn-reset').click();
        
        await page.screenshot({ path: './snapshots/TraditionalVisualCryptographyScheme-2.png', fullPage: true });
    });

    test('Shares superimposed to reveal smiley face', async ({ page }) => {
        await page.goto(fileUrl);

        // Action 1: Drag handle 1 to center
        const handle1 = page.locator('#joystick-handle1');
        const container1 = page.locator('#joystick-share1');
        const container1Box = await container1.boundingBox();
        await handle1.hover();
        await page.mouse.down();
        // Target: top: 50%, left: 50%
        await page.mouse.move(container1Box.x + container1Box.width * 0.5, container1Box.y + container1Box.height * 0.5);
        await page.mouse.up();

        // Action 2: Drag handle 2 to center
        const handle2 = page.locator('#joystick-handle2');
        const container2 = page.locator('#joystick-share2');
        const container2Box = await container2.boundingBox();
        await handle2.hover();
        await page.mouse.down();
        // Target: top: 50%, left: 50%
        await page.mouse.move(container2Box.x + container2Box.width * 0.5, container2Box.y + container2Box.height * 0.5);
        await page.mouse.up();
        
        await page.screenshot({ path: './snapshots/TraditionalVisualCryptographyScheme-3.png', fullPage: true });
    });

    test('Shares partially overlapped with an offset', async ({ page }) => {
        await page.goto(fileUrl);

        // Action 1: Drag handle 1 to top-center
        const handle1 = page.locator('#joystick-handle1');
        const container1 = page.locator('#joystick-share1');
        const container1Box = await container1.boundingBox();
        await handle1.hover();
        await page.mouse.down();
        // Target: top: 25%, left: 50%
        await page.mouse.move(container1Box.x + container1Box.width * 0.5, container1Box.y + container1Box.height * 0.25);
        await page.mouse.up();

        // Action 2: Drag handle 2 to middle-left
        const handle2 = page.locator('#joystick-handle2');
        const container2 = page.locator('#joystick-share2');
        const container2Box = await container2.boundingBox();
        await handle2.hover();
        await page.mouse.down();
        // Target: top: 50%, left: 25%
        await page.mouse.move(container2Box.x + container2Box.width * 0.25, container2Box.y + container2Box.height * 0.5);
        await page.mouse.up();
        
        await page.screenshot({ path: './snapshots/TraditionalVisualCryptographyScheme-4.png', fullPage: true });
    });
});