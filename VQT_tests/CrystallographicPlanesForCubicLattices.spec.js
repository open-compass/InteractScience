const { test, expect } = require('@playwright/test');

test.describe.serial('CrystallographicPlanesForCubicLattices', () => {
    const fileUrl = 'file://' + require('path').resolve(__dirname, '../pages/CrystallographicPlanesForCubicLattices.html');

    test('Default SC lattice with (1,1,1) plane', async ({ page }) => {
        await page.goto(fileUrl);

        // Drag the mouse on the canvas to rotate the cube
        const canvas = page.locator('#canvas-container canvas');
        const boundingBox = await canvas.boundingBox();
        if (boundingBox) {
            const startX = boundingBox.x + boundingBox.width / 2;
            const startY = boundingBox.y + boundingBox.height / 2;
            const endX = startX - 50; // move left
            const endY = startY + 50; // move down

            await page.mouse.move(startX, startY);
            await page.mouse.down();
            await page.mouse.move(endX, endY, { steps: 5 });
            await page.mouse.up();
        }

        await page.screenshot({ path: './snapshots/CrystallographicPlanesForCubicLattices-1.png', fullPage: true });
    });

    test('SC lattice with (1,2,1) planes', async ({ page }) => {
        // Change k from 1 to 2
        await page.locator('#input-k').press('ArrowUp');

        await page.screenshot({ path: './snapshots/CrystallographicPlanesForCubicLattices-2.png', fullPage: true });
    });

    test('SC lattice with (0,3,1) planes', async ({ page }) => {
        // Change h from 1 to 0
        await page.locator('#input-h').press('ArrowDown');
        // Change k from 2 to 3
        await page.locator('#input-k').press('ArrowUp');

        await page.screenshot({ path: './snapshots/CrystallographicPlanesForCubicLattices-3.png', fullPage: true });
    });

    test('BCC lattice with (2,6,4) planes', async ({ page }) => {
        // Click the "BCC" button
        await page.locator('#btn-bcc').click();

        // Change h to 2
        await page.locator('#input-h').press('ArrowUp'); // h becomes 1
        await page.locator('#input-h').press('ArrowUp'); // h becomes 2

        // Change k to 6
        await page.locator('#input-k').press('ArrowUp'); // k becomes 4
        await page.locator('#input-k').press('ArrowUp'); // k becomes 5
        await page.locator('#input-k').press('ArrowUp'); // k becomes 6

        // Change l to 4
        await page.locator('#input-l').press('ArrowUp'); // l becomes 2
        await page.locator('#input-l').press('ArrowUp'); // l becomes 3
        await page.locator('#input-l').press('ArrowUp'); // l becomes 4

        await page.screenshot({ path: './snapshots/CrystallographicPlanesForCubicLattices-4.png', fullPage: true });
    });
});