const { test, expect } = require('@playwright/test');

const fileUrl = 'file://' + require('path').resolve(__dirname, '../pages/BlockOnAFrictionlessInclinedPlane.html');

test.describe('BlockOnAFrictionlessInclinedPlane', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(fileUrl);
    // Wait for p5.js and MathJax to be ready. A small delay is sufficient for local files.
    await page.waitForTimeout(500);
  });

  test('Angle Slider Control', async ({ page }) => {
    // 1. Assert: The angle slider (#slider-angle) is visible.
    await expect(page.locator('#slider-angle')).toBeVisible();

    // 2. Assert: The slider's initial value is 30, and the info display (#info-display) shows "slope = ... 30°".
    await expect(page.locator('#slider-angle')).toHaveValue('30');
    await expect(page.locator('#info-display')).toContainText(/slope = .* 30°/);
    await expect(page.locator('#info-display')).toContainText('4.905 m/s²');


    // 3. Action: Drag the slider to a new value, such as 60.
    await page.locator('#slider-angle').fill('60');

    // 4. Assert: The info display text updates to show "slope = ... 60°", and the inclined plane on the canvas becomes visibly steeper.
    await expect(page.locator('#info-display')).toContainText(/slope = .* 60°/);
    await expect(page.locator('#info-display')).toContainText('8.496 m/s²');


    // 5. Action: Drag the slider to its minimum value of 10.
    await page.locator('#slider-angle').fill('10');

    // 6. Assert: The info display text updates to show "slope = ... 10°", and the inclined plane on the canvas becomes visibly shallower.
    await expect(page.locator('#info-display')).toContainText(/slope = .* 10°/);
    await expect(page.locator('#info-display')).toContainText('1.704 m/s²');
  });

  test('Play Animation Button', async ({ page }) => {
    // 1. Assert: The play button (#btn-play) is visible.
    await expect(page.locator('#btn-play')).toBeVisible();

    // 2. Assert: The block on the canvas is at its initial starting position at the top of the slope.
    const initialCanvas = await page.locator('#p5-canvas').screenshot();

    // 3. Action: Click the play button.
    await page.locator('#btn-play').click();

    // 4. Assert: After a short delay, the block's position on the canvas has moved down the slope.
    await page.waitForTimeout(500); // Allow time for animation
    const movedCanvas = await page.locator('#p5-canvas').screenshot();
    expect(movedCanvas).not.toEqual(initialCanvas);

    // 5. Action: Click the reset button (#btn-reset), then click the play button again.
    await page.locator('#btn-reset').click();
    const resetCanvas = await page.locator('#p5-canvas').screenshot();
    expect(resetCanvas).toEqual(initialCanvas); // Verify reset worked

    await page.locator('#btn-play').click();

    // 6. Assert: The block starts moving down the slope from the initial top position again.
    await page.waitForTimeout(500); // Allow time for animation
    const movedAgainCanvas = await page.locator('#p5-canvas').screenshot();
    expect(movedAgainCanvas).not.toEqual(resetCanvas);
  });

  test('Pause Animation Button', async ({ page }) => {
    // 1. Assert: The pause button (#btn-pause) is visible.
    await expect(page.locator('#btn-pause')).toBeVisible();

    // 2. Assert: The animation is not playing by default.
    const initialCanvas = await page.locator('#p5-canvas').screenshot();
    await page.waitForTimeout(500);
    const afterDelayCanvas = await page.locator('#p5-canvas').screenshot();
    expect(afterDelayCanvas).toEqual(initialCanvas);

    // 3. Action: Click the play button (#btn-play) to start the animation and wait for the block to move partway down the slope, then click the pause button.
    await page.locator('#btn-play').click();
    await page.waitForTimeout(500); // Let it move
    await page.locator('#btn-pause').click();

    // 4. Assert: The block's position on the canvas remains fixed after clicking pause.
    const pausedCanvas = await page.locator('#p5-canvas').screenshot();
    await page.waitForTimeout(500); // Wait to see if it moves
    const stillPausedCanvas = await page.locator('#p5-canvas').screenshot();
    expect(stillPausedCanvas).toEqual(pausedCanvas);

    // 5. Action: Click the play button again.
    await page.locator('#btn-play').click();

    // 6. Assert: The block resumes moving down the slope from its paused position.
    await page.waitForTimeout(500); // Let it move again
    const resumedCanvas = await page.locator('#p5-canvas').screenshot();
    expect(resumedCanvas).not.toEqual(pausedCanvas);
  });

  test('Reset Animation Button', async ({ page }) => {
    // 1. Assert: The reset button (#btn-reset) is visible.
    await expect(page.locator('#btn-reset')).toBeVisible();

    // 2. Assert: The block is initially at the top of the slope.
    const initialCanvas = await page.locator('#p5-canvas').screenshot();

    // 3. Action: Click the play button (#btn-play) and wait for the block to move partway down the slope, then click the reset button.
    await page.locator('#btn-play').click();
    await page.waitForTimeout(500); // Let it move
    await page.locator('#btn-reset').click();

    // 4. Assert: The block on the canvas immediately returns to its starting position at the top of the slope and stops moving.
    const resetCanvas = await page.locator('#p5-canvas').screenshot();
    expect(resetCanvas).toEqual(initialCanvas);

    // Assert it stopped moving
    await page.waitForTimeout(500);
    const stillResetCanvas = await page.locator('#p5-canvas').screenshot();
    expect(stillResetCanvas).toEqual(resetCanvas);

    // 5. Action: Click the reset button again while the block is already at the top.
    await page.locator('#btn-reset').click();

    // 6. Assert: The block remains at the top of the slope.
    const finalCanvas = await page.locator('#p5-canvas').screenshot();
    expect(finalCanvas).toEqual(initialCanvas);
  });
});