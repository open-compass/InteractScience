const { test, expect } = require('@playwright/test');
const path = require('path');

const fileUrl = 'file://' + path.resolve(__dirname, '../pages/SimpleHarmonicMotionOfASpring.html');

test.describe('Simple Harmonic Motion Simulation', () => {

  test('Default initial state of the application on page load', async ({ page }) => {
    await page.goto(fileUrl);
    await page.screenshot({ path: './snapshots/SimpleHarmonicMotionOfASpring-1.png', fullPage: true });
  });

  test('Waveform generated with high mass and default amplitude/stiffness', async ({ page }) => {
    await page.goto(fileUrl);
    
    // Action: Drag the "mass" slider handle to the right until its value is `9.39`.
    await page.locator('#slider-mass').fill('9.39');
    
    // Action: Click the play button ('▶') in the "time" controls.
    await page.locator('#btn-play-pause').click();
    
    // Action: Allow the simulation to run until the plot shows approximately one full wave cycle, ending around time t=23.
    // We use a fixed timeout to allow the animation to progress.
    await page.waitForTimeout(2500);
    
    // Action: Click the pause button ('||') in the "time" controls.
    await page.locator('#btn-play-pause').click();
    
    // Assert: Take a screenshot of the current UI state.
    await page.screenshot({ path: './snapshots/SimpleHarmonicMotionOfASpring-2.png', fullPage: true });
  });

  test('Waveform generated with high amplitude, high stiffness, and low mass', async ({ page }) => {
    await page.goto(fileUrl);

    // Action: Drag the "amplitude" slider handle to the right until its value is `0.778`.
    await page.locator('#slider-amplitude').fill('0.778');

    // Action: Drag the "stiffness" slider handle to the right until its value is `9.66`.
    await page.locator('#slider-stiffness').fill('9.66');

    // Action: Drag the "mass" slider handle to the left until its value is `0.38`.
    await page.locator('#slider-mass').fill('0.38');

    // Action: Click the play button ('▶') in the "time" controls.
    await page.locator('#btn-play-pause').click();
    
    // Action: Allow the simulation to run until the plot is filled with multiple oscillations, as shown in the screenshot.
    // We use a fixed timeout to allow the animation to progress.
    await page.waitForTimeout(3500);

    // Action: Click the pause button ('||') in the "time" controls.
    await page.locator('#btn-play-pause').click();

    // Assert: Take a screenshot of the current UI state.
    await page.screenshot({ path: './snapshots/SimpleHarmonicMotionOfASpring-3.png', fullPage: true });
  });

  test('Application state after clicking the reset button', async ({ page }) => {
    await page.goto(fileUrl);

    // Action: Click the reset button ('x') located in the top-right corner of the control panel.
    await page.locator('#btn-reset').click();
    
    // Assert: Take a screenshot of the current UI state.
    await page.screenshot({ path: './snapshots/SimpleHarmonicMotionOfASpring-4.png', fullPage: true });
  });

});