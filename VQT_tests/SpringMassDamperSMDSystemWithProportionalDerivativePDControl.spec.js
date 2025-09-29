const { test, expect } = require('@playwright/test');

test.describe('Spring-Mass-Damper (SMD) System with Proportional-Derivative (PD) Control', () => {
  const fileUrl = 'file://' + require('path').resolve(__dirname, '../pages/SpringMassDamperSMDSystemWithProportionalDerivativePDControl.html');

  test.beforeEach(async ({ page }) => {
    await page.goto(fileUrl);
  });

  test('Initial state with default parameters', async ({ page }) => {
    // Action: Load the application. The controls should initialize to their default values: displacement=0.1, velocity=1, spring stiffness=1, mass=1, dampening=0.1, proportional gain=0.1, derivative gain=0.1.
    // Assert: Take a screenshot of the current UI state.
    await page.screenshot({ path: './snapshots/SpringMassDamperSMDSystemWithProportionalDerivativePDControl-1.png', fullPage: true });
  });

  test('System state with custom parameters, paused early in the animation', async ({ page }) => {
    // Action: Set the "displacement" slider to a value of 2.
    await page.locator('#slider-displacement').fill('2');
    // Action: Set the "velocity" slider to a value of 3.
    await page.locator('#slider-velocity').fill('3');
    // Action: Set the "spring stiffness" slider to a value of 3.88.
    await page.locator('#slider-stiffness').fill('3.88');
    // Action: Set the "mass" slider to a value of 1.64.
    await page.locator('#slider-mass').fill('1.64');
    // Action: Set the "dampening" slider to a value of 0.
    await page.locator('#slider-damping').fill('0');
    // Action: Set the "proportional displacement gain" slider to a value of 0.7.
    await page.locator('#slider-proportional-gain').fill('0.7');
    // Action: Set the "derivative velocity gain" slider to a value of 2.7.
    await page.locator('#slider-derivative-gain').fill('2.7');
    // Action: Click the play button (▶).
    await page.locator('#btn-play').click();
    // Action: Wait until the marker on the displacement plot reaches its first minimum (at approximately t=1.5s).
    await page.waitForTimeout(1500);
    // Action: Click the pause button (||).
    await page.locator('#btn-pause').click();
    // Assert: Take a screenshot of the current UI state.
    await page.screenshot({ path: './snapshots/SpringMassDamperSMDSystemWithProportionalDerivativePDControl-2.png', fullPage: true });
  });

  test('System state paused at the first positive displacement peak', async ({ page }) => {
    // Action: Set the "displacement" slider to a value of 2.
    await page.locator('#slider-displacement').fill('2');
    // Action: Set the "velocity" slider to a value of 3.
    await page.locator('#slider-velocity').fill('3');
    // Action: Set the "spring stiffness" slider to a value of 3.88.
    await page.locator('#slider-stiffness').fill('3.88');
    // Action: Set the "mass" slider to a value of 1.64.
    await page.locator('#slider-mass').fill('1.64');
    // Action: Set the "dampening" slider to a value of 0.
    await page.locator('#slider-damping').fill('0');
    // Action: Set the "proportional displacement gain" slider to a value of 0.7.
    await page.locator('#slider-proportional-gain').fill('0.7');
    // Action: Set the "derivative velocity gain" slider to a value of 2.7.
    await page.locator('#slider-derivative-gain').fill('2.7');
    // Action: Click the play button (▶).
    await page.locator('#btn-play').click();
    // Action: Wait until the marker on the displacement plot reaches its first positive peak (at approximately t=3.5s).
    await page.waitForTimeout(3500);
    // Action: Click the pause button (||).
    await page.locator('#btn-pause').click();
    // Assert: Take a screenshot of the current UI state.
    await page.screenshot({ path: './snapshots/SpringMassDamperSMDSystemWithProportionalDerivativePDControl-3.png', fullPage: true });
  });

  test('System state paused late in the simulation time', async ({ page }) => {
    // Action: Set the "displacement" slider to a value of 2.
    await page.locator('#slider-displacement').fill('2');
    // Action: Set the "velocity" slider to a value of 3.
    await page.locator('#slider-velocity').fill('3');
    // Action: Set the "spring stiffness" slider to a value of 3.88.
    await page.locator('#slider-stiffness').fill('3.88');
    // Action: Set the "mass" slider to a value of 1.64.
    await page.locator('#slider-mass').fill('1.64');
    // Action: Set the "dampening" slider to a value of 0.
    await page.locator('#slider-damping').fill('0');
    // Action: Set the "proportional displacement gain" slider to a value of 0.7.
    await page.locator('#slider-proportional-gain').fill('0.7');
    // Action: Set the "derivative velocity gain" slider to a value of 2.7.
    await page.locator('#slider-derivative-gain').fill('2.7');
    // Action: Click the play button (▶).
    await page.locator('#btn-play').click();
    // Action: Wait until the time marker on the plots reaches approximately 8 seconds on the x-axis.
    await page.waitForTimeout(8000);
    // Action: Click the pause button (||).
    await page.locator('#btn-pause').click();
    // Assert: Take a screenshot of the current UI state.
    await page.screenshot({ path: './snapshots/SpringMassDamperSMDSystemWithProportionalDerivativePDControl-4.png', fullPage: true });
  });
});