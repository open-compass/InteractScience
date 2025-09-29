const { test, expect } = require('@playwright/test');
const path = require('path');

const fileUrl = 'file://' + path.resolve(__dirname, '../pages/TraditionalVisualCryptographyScheme.html');

test.describe('Traditional Visual Cryptography Scheme', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(fileUrl);
    // await page.waitForSelector('#visualization-area canvas');
    await page.waitForTimeout(500);
  });

  test('Share 1 Position Control', async ({ page }) => {
    // 1. Assert: The joystick handle for "share 1" (#joystick-handle1) is visible.
    const handle1 = page.locator('#joystick-handle1');
    await expect(handle1).toBeVisible();

    // 2. Assert: The handle is at its default position (top: 25%, left: 75%) and the corresponding share image is in the top-right quadrant of the canvas.
    const container1 = page.locator('#joystick-share1');
    const container1Box = await container1.boundingBox();
    const initialTop = parseFloat(await handle1.evaluate(el => getComputedStyle(el).top));
    const initialLeft = parseFloat(await handle1.evaluate(el => getComputedStyle(el).left));
    expect(initialTop).toBeCloseTo(container1Box.height * 0.25, 1);
    expect(initialLeft).toBeCloseTo(container1Box.width * 0.75, 1);

    // 3. Action: Drag the handle towards the center of its container (top: 50%, left: 50%).
    await handle1.dragTo(container1);

    // 4. Assert: The handle's CSS top and left properties have changed, and the position of the first share image on the canvas has changed.
    const handle1Box = await handle1.boundingBox();
    const newTop = parseFloat(await handle1.evaluate(el => getComputedStyle(el).top));
    const newLeft = parseFloat(await handle1.evaluate(el => getComputedStyle(el).left));
    expect(newTop).not.toBeCloseTo(initialTop, 0);
    expect(newLeft).not.toBeCloseTo(initialLeft, 0);
    expect(newTop).toBeCloseTo(container1Box.height * 0.5 - handle1Box.height * 0.5, 1);
    expect(newLeft).toBeCloseTo(container1Box.width * 0.5 - handle1Box.width * 0.5, 1);

    // 5. Action: Drag the handle to its bottom-left corner boundary.
    await handle1.hover();
    await page.mouse.down();
    await page.mouse.move(container1Box.x, container1Box.y + container1Box.height);
    await page.mouse.up();

    // 6. Assert: The handle is positioned at the bottom-left of its container, and the corresponding share image has moved to a new position on the canvas.
    const bottomLeftTop = parseFloat(await handle1.evaluate(el => getComputedStyle(el).top));
    const bottomLeftLeft = parseFloat(await handle1.evaluate(el => getComputedStyle(el).left));
    expect(bottomLeftTop).toBeCloseTo(container1Box.height - handle1Box.height, 1);
    expect(bottomLeftLeft).toBeCloseTo(0, 1);
  });

  test('Share 2 Position Control', async ({ page }) => {
    // 1. Assert: The joystick handle for "share 2" (#joystick-handle2) is visible.
    const handle2 = page.locator('#joystick-handle2');
    await expect(handle2).toBeVisible();

    // 2. Assert: The handle is at its default position (top: 75%, left: 25%) and the corresponding share image is in the bottom-left quadrant of the canvas.
    const container2 = page.locator('#joystick-share2');
    const container2Box = await container2.boundingBox();
    const initialTop = parseFloat(await handle2.evaluate(el => getComputedStyle(el).top));
    const initialLeft = parseFloat(await handle2.evaluate(el => getComputedStyle(el).left));
    expect(initialTop).toBeCloseTo(container2Box.height * 0.75, 1);
    expect(initialLeft).toBeCloseTo(container2Box.width * 0.25, 1);

    // 3. Action: Drag the handle towards the center of its container (top: 50%, left: 50%).
    await handle2.dragTo(container2);

    // 4. Assert: The handle's CSS top and left properties have changed, and the position of the second share image on the canvas has changed.
    const handle2Box = await handle2.boundingBox();
    const newTop = parseFloat(await handle2.evaluate(el => getComputedStyle(el).top));
    const newLeft = parseFloat(await handle2.evaluate(el => getComputedStyle(el).left));
    expect(newTop).not.toBeCloseTo(initialTop, 0);
    expect(newLeft).not.toBeCloseTo(initialLeft, 0);
    expect(newTop).toBeCloseTo(container2Box.height * 0.5 - handle2Box.height * 0.5, 1);
    expect(newLeft).toBeCloseTo(container2Box.width * 0.5 - handle2Box.width * 0.5, 1);

    // 5. Action: Drag the handle to its top-right corner boundary.
    await handle2.hover();
    await page.mouse.down();
    await page.mouse.move(container2Box.x + container2Box.width, container2Box.y);
    await page.mouse.up();

    // 6. Assert: The handle is positioned at the top-right of its container, and the corresponding share image has moved to a new position on the canvas.
    const topRightTop = parseFloat(await handle2.evaluate(el => getComputedStyle(el).top));
    const topRightLeft = parseFloat(await handle2.evaluate(el => getComputedStyle(el).left));
    expect(topRightTop).toBeCloseTo(0, 1);
    expect(topRightLeft).toBeCloseTo(container2Box.width - handle2Box.width, 1);
  });

  test('Reset Button Functionality', async ({ page }) => {
    // 1. Assert: The reset button (#btn-reset) is visible.
    const resetButton = page.locator('#btn-reset');
    await expect(resetButton).toBeVisible();

    // 2. Assert: The "share 1" and "share 2" joystick handles are in their default, separated positions.
    const handle1 = page.locator('#joystick-handle1');
    const container1 = page.locator('#joystick-share1');
    const container1Box = await container1.boundingBox();
    const handle1InitialTop = parseFloat(await handle1.evaluate(el => getComputedStyle(el).top));
    const handle1InitialLeft = parseFloat(await handle1.evaluate(el => getComputedStyle(el).left));
    expect(handle1InitialTop).toBeCloseTo(container1Box.height * 0.25, 1);
    expect(handle1InitialLeft).toBeCloseTo(container1Box.width * 0.75, 1);

    const handle2 = page.locator('#joystick-handle2');
    const container2 = page.locator('#joystick-share2');
    const container2Box = await container2.boundingBox();
    const handle2InitialTop = parseFloat(await handle2.evaluate(el => getComputedStyle(el).top));
    const handle2InitialLeft = parseFloat(await handle2.evaluate(el => getComputedStyle(el).left));
    expect(handle2InitialTop).toBeCloseTo(container2Box.height * 0.75, 1);
    expect(handle2InitialLeft).toBeCloseTo(container2Box.width * 0.25, 1);

    // 3. Action: Drag both joystick handles to the center of their containers, superimposing the shares on the canvas.
    await handle1.dragTo(container1);
    await handle2.dragTo(container2);

    // 4. Assert: The two share images on the canvas are now overlapping, and the joystick handles are centered.
    const handle1Box = await handle1.boundingBox();
    const handle1CenterTop = parseFloat(await handle1.evaluate(el => getComputedStyle(el).top));
    const handle1CenterLeft = parseFloat(await handle1.evaluate(el => getComputedStyle(el).left));
    expect(handle1CenterTop).toBeCloseTo(container1Box.height * 0.5 - handle1Box.height * 0.5, 1);
    expect(handle1CenterLeft).toBeCloseTo(container1Box.width * 0.5 - handle1Box.width * 0.5, 1);

    const handle2Box = await handle2.boundingBox();
    const handle2CenterTop = parseFloat(await handle2.evaluate(el => getComputedStyle(el).top));
    const handle2CenterLeft = parseFloat(await handle2.evaluate(el => getComputedStyle(el).left));
    expect(handle2CenterTop).toBeCloseTo(container2Box.height * 0.5 - handle2Box.height * 0.5, 1);
    expect(handle2CenterLeft).toBeCloseTo(container2Box.width * 0.5 - handle2Box.width * 0.5, 1);

    // 5. Action: Click the reset button.
    await resetButton.click();

    // 6. Assert: The joystick handles have returned to their initial positions (handle 1 at top-right, handle 2 at bottom-left), and the share images on the canvas are no longer superimposed.
    const handle1FinalTop = parseFloat(await handle1.evaluate(el => getComputedStyle(el).top));
    const handle1FinalLeft = parseFloat(await handle1.evaluate(el => getComputedStyle(el).left));
    expect(handle1FinalTop).toBeCloseTo(handle1InitialTop, 1);
    expect(handle1FinalLeft).toBeCloseTo(handle1InitialLeft, 1);

    const handle2FinalTop = parseFloat(await handle2.evaluate(el => getComputedStyle(el).top));
    const handle2FinalLeft = parseFloat(await handle2.evaluate(el => getComputedStyle(el).left));
    expect(handle2FinalTop).toBeCloseTo(handle2InitialTop, 1);
    expect(handle2FinalLeft).toBeCloseTo(handle2InitialLeft, 1);
  });
});