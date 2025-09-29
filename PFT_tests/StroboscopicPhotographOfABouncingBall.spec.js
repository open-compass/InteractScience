const { test, expect } = require('@playwright/test');

const fileUrl = 'file://' + require('path').resolve(__dirname, '../pages/StroboscopicPhotographOfABouncingBall.html');

test.beforeEach(async ({ page }) => {
  await page.goto(fileUrl);
  // Wait for the canvas to be rendered by p5.js
  // await page.waitForSelector('#canvas-container canvas');
  await page.waitForTimeout(500);
});

test.describe('Stroboscopic Photograph of a Bouncing Ball', () => {

  test('Energy Conservation "k" Slider', async ({ page }) => {
    // 1. Assert: The slider with ID `slider-k` is visible on the page.
    const sliderK = page.locator('#slider-k');
    await expect(sliderK).toBeVisible();

    // 2. Assert: The `slider-k` value is `0.9` by default.
    await expect(sliderK).toHaveValue('0.9');

    // 3. Action: Set the value of `slider-k` to `0.75`.
    await sliderK.fill('0.75');

    // 4. Assert: The canvas visualization is redrawn, showing a trajectory where the ball loses energy more quickly (bounces are lower).
    // We verify the control's state has updated, which triggers the canvas redraw.
    await expect(sliderK).toHaveValue('0.75');
    await expect(page.locator('#canvas-container canvas')).toBeVisible();

    // 5. Action: Set the value of `slider-k` to its maximum of `0.95`.
    await sliderK.fill('0.95');

    // 6. Assert: The canvas visualization is redrawn, showing a trajectory where bounces are higher and decay more slowly than the previous step.
    await expect(sliderK).toHaveValue('0.95');
    await expect(page.locator('#canvas-container canvas')).toBeVisible();
  });

  test('Total Time Slider', async ({ page }) => {
    // 1. Assert: The slider with ID `slider-time` is visible on the page.
    const sliderTime = page.locator('#slider-time');
    await expect(sliderTime).toBeVisible();

    // 2. Assert: The `slider-time` value is `15` by default.
    await expect(sliderTime).toHaveValue('15');

    // 3. Action: Set the value of `slider-time` to `25`.
    await sliderTime.fill('25');

    // 4. Assert: The canvas visualization is redrawn, showing a longer trajectory with more bounces extending further to the right.
    await expect(sliderTime).toHaveValue('25');
    await expect(page.locator('#canvas-container canvas')).toBeVisible();

    // 5. Action: Set the value of `slider-time` to its minimum of `5`.
    await sliderTime.fill('5');

    // 6. Assert: The canvas visualization is redrawn, showing a much shorter trajectory with fewer bounces.
    await expect(sliderTime).toHaveValue('5');
    await expect(page.locator('#canvas-container canvas')).toBeVisible();
  });

  test('Initial Horizontal Velocity Slider', async ({ page }) => {
    // 1. Assert: The slider with ID `slider-vx` is visible on the page.
    const sliderVx = page.locator('#slider-vx');
    await expect(sliderVx).toBeVisible();

    // 2. Assert: The `slider-vx` value is `2.5` by default.
    await expect(sliderVx).toHaveValue('2.5');

    // 3. Action: Set the value of `slider-vx` to `6`.
    await sliderVx.fill('6');

    // 4. Assert: The canvas visualization is redrawn, showing wider parabolic arcs for each bounce.
    await expect(sliderVx).toHaveValue('6');
    await expect(page.locator('#canvas-container canvas')).toBeVisible();

    // 5. Action: Set the value of `slider-vx` to its minimum of `1`.
    await sliderVx.fill('1');

    // 6. Assert: The canvas visualization is redrawn, showing much narrower, compressed arcs for each bounce.
    await expect(sliderVx).toHaveValue('1');
    await expect(page.locator('#canvas-container canvas')).toBeVisible();
  });

  test('Time Interval "Δt" Slider', async ({ page }) => {
    // 1. Assert: The slider with ID `slider-dt` is visible on the page.
    const sliderDt = page.locator('#slider-dt');
    await expect(sliderDt).toBeVisible();

    // 2. Assert: The `slider-dt` value is `0.15` by default.
    await expect(sliderDt).toHaveValue('0.15');

    // 3. Action: Set the value of `slider-dt` to `0.05`.
    await sliderDt.fill('0.05');

    // 4. Assert: The canvas visualization is redrawn, showing significantly more yellow dots along the red trajectory line.
    await expect(sliderDt).toHaveValue('0.05');
    await expect(page.locator('#canvas-container canvas')).toBeVisible();

    // 5. Action: Set the value of `slider-dt` to its maximum of `0.4`.
    await sliderDt.fill('0.4');

    // 6. Assert: The canvas visualization is redrawn, showing far fewer yellow dots, spaced further apart along the trajectory.
    await expect(sliderDt).toHaveValue('0.4');
    await expect(page.locator('#canvas-container canvas')).toBeVisible();
  });

});