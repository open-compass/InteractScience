const { test, expect } = require('@playwright/test');

const fileUrl = 'file://' + require('path').resolve(__dirname, '../pages/MultiTimeBifurcationsOfWavefrontsIn2DAnd3D.html');

test.describe('Multi-Time Bifurcations of Wavefronts', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(fileUrl);
    // await page.waitForSelector('#visualization-container canvas');
    await page.waitForTimeout(500);
  });

  test('2D Bifurcation Type Selection Button', async ({ page }) => {
    // Step 1: Assert: The button with id `btn-2A1` is visible on the page.
    await expect(page.locator('#btn-2A1')).toBeVisible();

    // Step 2: Assert: The `btn-2A2` button has an 'active' style, while `btn-2A1` does not. The initial visualization is a 2D line.
    await expect(page.locator('#btn-2A2')).toHaveClass(/active/);
    await expect(page.locator('#btn-2A1')).not.toHaveClass(/active/);
    const vizContainer = page.locator('#visualization-container');
    const initialScreenshot = await vizContainer.screenshot();

    // Step 3: Action: Click the `btn-2A1` button.
    await page.locator('#btn-2A1').click();
    await page.waitForTimeout(100); // Allow time for canvas re-render

    // Step 4: Assert: The `btn-2A1` button now has the 'active' style, `btn-2A2` does not, and the visualization in the canvas has changed.
    await expect(page.locator('#btn-2A1')).toHaveClass(/active/);
    await expect(page.locator('#btn-2A2')).not.toHaveClass(/active/);
    await expect(vizContainer).not.toHaveScreenshot(initialScreenshot);
    const screenshotAfterA1 = await vizContainer.screenshot();

    // Step 5: Action: Click the `btn-2B2` button.
    await page.locator('#btn-2B2').click();
    await page.waitForTimeout(100); // Allow time for canvas re-render

    // Step 6: Assert: The `btn-2A1` button is no longer active, and the visualization has changed again.
    await expect(page.locator('#btn-2A1')).not.toHaveClass(/active/);
    await expect(vizContainer).not.toHaveScreenshot(screenshotAfterA1);
  });

  test('3D Bifurcation Type Selection Button', async ({ page }) => {
    // Step 1: Assert: The button with id `btn-3A3` is visible on the page.
    await expect(page.locator('#btn-3A3')).toBeVisible();

    // Step 2: Assert: The `btn-3A3` button is not active by default. The visualization is a 2D line graph.
    await expect(page.locator('#btn-3A3')).not.toHaveClass(/active/);
    const vizContainer = page.locator('#visualization-container');
    const initial2DScreenshot = await vizContainer.screenshot();

    // Step 3: Action: Click the `btn-3A3` button.
    await page.locator('#btn-3A3').click();
    await page.waitForTimeout(100); // Allow time for canvas re-render

    // Step 4: Assert: The `btn-3A3` button now has an 'active' style, and the visualization has changed from a 2D line to a 3D surface. OrbitControls for the camera are now active.
    await expect(page.locator('#btn-3A3')).toHaveClass(/active/);
    await expect(vizContainer).not.toHaveScreenshot(initial2DScreenshot);

    // Step 5: Action: Click the `btn-2A2` button to switch back to 2D.
    await page.locator('#btn-2A2').click();
    await page.waitForTimeout(100); // Allow time for canvas re-render

    // Step 6: Assert: The `btn-3A3` button is no longer active, and the visualization has changed back to a 2D line graph.
    await expect(page.locator('#btn-3A3')).not.toHaveClass(/active/);
    await expect(vizContainer).toHaveScreenshot(initial2DScreenshot);
  });

  test('Time Pad Control', async ({ page }) => {
    // Step 1: Assert: The time pad control (`#time-pad`) and its handle (`#time-handle`) are visible.
    const timePad = page.locator('#time-pad');
    const timeHandle = page.locator('#time-handle');
    await expect(timePad).toBeVisible();
    await expect(timeHandle).toBeVisible();

    // Step 2: Assert: The handle is positioned in the exact center of the time pad, corresponding to `t1=0` and `t2=0`.
    const padBox = await timePad.boundingBox();
    let handleBox = await timeHandle.boundingBox();
    expect(padBox).not.toBeNull();
    expect(handleBox).not.toBeNull();
    const padCenterX = padBox.x + padBox.width / 2;
    const padCenterY = padBox.y + padBox.height / 2;
    let handleCenterX = handleBox.x + handleBox.width / 2;
    let handleCenterY = handleBox.y + handleBox.height / 2;
    expect(handleCenterX).toBeCloseTo(padCenterX, 2);
    expect(handleCenterY).toBeCloseTo(padCenterY, 2);
    const vizContainer = page.locator('#visualization-container');
    const initialVizScreenshot = await vizContainer.screenshot();

    // Step 3: Action: Click and drag the handle from the center to the top-right quadrant of the pad.
    const dragTargetX = padCenterX + padBox.width * 0.4;
    const dragTargetY = padCenterY - padBox.height * 0.4;
    await timeHandle.hover();
    await page.mouse.down();
    await page.mouse.move(dragTargetX, dragTargetY, { steps: 5 });
    await page.mouse.up();
    await page.waitForTimeout(100); // Allow time for canvas re-render

    // Step 4: Assert: The handle's position has moved to the top-right, and the visualization has been updated in real-time during the drag.
    handleBox = await timeHandle.boundingBox();
    expect(handleBox).not.toBeNull();
    handleCenterX = handleBox.x + handleBox.width / 2;
    handleCenterY = handleBox.y + handleBox.height / 2;
    expect(handleCenterX).toBeCloseTo(dragTargetX, 2);
    expect(handleCenterY).toBeCloseTo(dragTargetY, 2);
    await expect(vizContainer).not.toHaveScreenshot(initialVizScreenshot);
    const topRightVizScreenshot = await vizContainer.screenshot();

    // Step 5: Action: Click on the bottom-left corner of the time pad area.
    const clickX = 10;
    const clickY = padBox.height - 10;
    await timePad.click({ position: { x: clickX, y: clickY } });
    await page.waitForTimeout(100); // Allow time for canvas re-render

    // Step 6: Assert: The handle jumps to the bottom-left corner, and the visualization updates to reflect the new boundary time values.
    handleBox = await timeHandle.boundingBox();
    expect(handleBox).not.toBeNull();
    handleCenterX = handleBox.x + handleBox.width / 2;
    handleCenterY = handleBox.y + handleBox.height / 2;
    expect(handleCenterX).toBeCloseTo(padBox.x + clickX, 2);
    expect(handleCenterY).toBeCloseTo(padBox.y + clickY, 2);
    await expect(vizContainer).not.toHaveScreenshot(initialVizScreenshot);
    await expect(vizContainer).not.toHaveScreenshot(topRightVizScreenshot);
  });
});