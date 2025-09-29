const { test, expect } = require('@playwright/test');

const fileUrl = 'file://' + require('path').resolve(__dirname, '../pages/ElasticCollisionsInGalileanRelativity.html');

/**
 * Drags the joystick to a position corresponding to the target observer velocities.
 * @param {import('@playwright/test').Page} page The Playwright page object.
 * @param {number} targetVx The target observer velocity in the x-direction.
 * @param {number} targetVy The target observer velocity in the y-direction.
 */
async function dragJoystick(page, targetVx, targetVy) {
    const container = page.locator('#joystick-container');
    const boundingBox = await container.boundingBox();

    if (!boundingBox) {
        throw new Error('Joystick container not found or not visible');
    }

    const { x, y, width, height } = boundingBox;
    const minV = -5;
    const maxV = 5;
    const rangeV = maxV - minV;

    // Calculate target pixel coordinates from velocity values.
    // Assumes a linear mapping from velocity range to pixel dimensions.
    const targetX = x + ((targetVx - minV) / rangeV) * width;
    const targetY = y + ((targetVy - minV) / rangeV) * height;

    // Start the drag from the center of the container
    const startX = x + width / 2;
    const startY = y + height / 2;
    
    // Simulate a mouse drag operation from start to target.
    // Using steps makes the drag smoother, which might be necessary for
    // applications that rely on intermediate mousemove events.
    await page.mouse.move(startX, startY);
    await page.mouse.down();
    await page.mouse.move(targetX, targetY, { steps: 5 });
    await page.mouse.up();
}

test.describe('ElasticCollisionsInGalileanRelativity', () => {

    test('Initial state of the simulation with default parameters.', async ({ page }) => {
        await page.goto(fileUrl);
        await page.screenshot({ path: './snapshots/ElasticCollisionsInGalileanRelativity-1.png', fullPage: true });
    });

    test('Post-collision state with equal masses and high observer velocity.', async ({ page }) => {
        await page.goto(fileUrl);
        
        await page.locator('#slider-m2').fill('5');
        await page.locator('#slider-v2').fill('10');
        await dragJoystick(page, 3, 3);
        await page.locator('#slider-time').fill('25');
        
        await page.screenshot({ path: './snapshots/ElasticCollisionsInGalileanRelativity-2.png', fullPage: true });
    });

    test('Pre-collision state with different particle properties and low observer velocity.', async ({ page }) => {
        await page.goto(fileUrl);

        await page.locator('#slider-m1').fill('1.68');
        await page.locator('#slider-v1').fill('6');
        await page.locator('#slider-m2').fill('5');
        await page.locator('#slider-v2').fill('10');
        await dragJoystick(page, 0.3, 0.05);
        await page.locator('#slider-time').fill('-8.5');

        await page.screenshot({ path: './snapshots/ElasticCollisionsInGalileanRelativity-3.png', fullPage: true });
    });

    test('Post-collision state with negative observer velocity in x-direction.', async ({ page }) => {
        await page.goto(fileUrl);

        await page.locator('#slider-m2').fill('5');
        await page.locator('#slider-v2').fill('2.7');
        await dragJoystick(page, -2.34, 2.25);
        await page.locator('#slider-time').fill('21.8');

        await page.screenshot({ path: './snapshots/ElasticCollisionsInGalileanRelativity-4.png', fullPage: true });
    });

});