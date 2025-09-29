const { test, expect } = require('@playwright/test');

const fileUrl = 'file://' + require('path').resolve(__dirname, '../pages/StroboscopicPhotographOfABouncingBall.html');

test.describe('Stroboscopic Photograph of a Bouncing Ball', () => {

  test('Initial state of the bouncing ball simulation', async ({ page }) => {
    await page.goto(fileUrl);
    // Wait for the canvas to be potentially rendered by p5.js
    // await page.waitForSelector('#canvas-container canvas');
    await page.screenshot({ path: './snapshots/StroboscopicPhotographOfABouncingBall-1.png', fullPage: true });
  });

  test('Bouncing ball simulation with maximum time', async ({ page }) => {
    await page.goto(fileUrl);
    // await page.waitForSelector('#canvas-container canvas');

    // Action: Drag the "time" slider handle to the far right to set its value to 25.
    await page.locator('#slider-time').fill('25');

    // Assert: Take a screenshot of the current UI state
    await page.screenshot({ path: './snapshots/StroboscopicPhotographOfABouncingBall-2.png', fullPage: true });
  });

  test('Bouncing ball with low energy conservation and high initial horizontal velocity', async ({ page }) => {
    await page.goto(fileUrl);
    // await page.waitForSelector('#canvas-container canvas');

    // Action: Drag the "k" slider handle to the far left to set its value to 0.6.
    await page.locator('#slider-k').fill('0.6');

    // Action: Drag the "initial velocity in x" slider handle to the far right to set its value to 8.
    await page.locator('#slider-vx').fill('8');

    // Assert: Take a screenshot of the current UI state
    await page.screenshot({ path: './snapshots/StroboscopicPhotographOfABouncingBall-3.png', fullPage: true });
  });

  test('Bouncing ball simulation with a small time interval (Δt)', async ({ page }) => {
    await page.goto(fileUrl);
    // await page.waitForSelector('#canvas-container canvas');

    // Action: Drag the "Δt" slider handle to the far left to set its value to 0.05.
    await page.locator('#slider-dt').fill('0.05');

    // Assert: Take a screenshot of the current UI state
    await page.screenshot({ path: './snapshots/StroboscopicPhotographOfABouncingBall-4.png', fullPage: true });
  });

});