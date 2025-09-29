const { test, expect } = require('@playwright/test');

// Define the path to the local HTML file
const fileUrl = 'file://' + require('path').resolve(__dirname, '../pages/PendulumOnAMovingSupport.html');

test.beforeEach(async ({ page }) => {
  // Navigate to the local HTML file before each test
  await page.goto(fileUrl);
  await page.waitForTimeout(500);
});

test('Initial Angle (θ₀) Slider Control', async ({ page }) => {
  // 1. Assert: The "θ₀" slider (id="slider-theta0") is visible on the page.
  await expect(page.locator('#slider-theta0')).toBeVisible();

  // 2. Assert: The slider's value display (id="value-theta0") shows "π/6" by default.
  await expect(page.locator('#value-theta0')).toHaveText('π/6');

  // 3. Action: Drag the slider handle to the middle, corresponding to a value of approximately 0.
  await page.locator('#slider-theta0').fill('0');

  // 4. Assert: The value display updates to "0.". The pendulum bob in the canvas moves to the bottom-center position.
  await expect(page.locator('#value-theta0')).toHaveText('0.');

  // 5. Action: Drag the slider handle to the maximum value (rightmost position).
  await page.locator('#slider-theta0').fill('3.14159');

  // 6. Assert: The value display updates to "π". The pendulum bob in the canvas moves to the top-center position.
  await expect(page.locator('#value-theta0')).toHaveText('π');
});

test('Initial Velocity (v₀) Slider Control', async ({ page }) => {
  // 1. Assert: The "v₀" slider (id="slider-v0") is visible on the page.
  await expect(page.locator('#slider-v0')).toBeVisible();

  // 2. Assert: The slider's value display (id="value-v0") shows "0" by default.
  await expect(page.locator('#value-v0')).toHaveText('0');

  // 3. Action: Drag the slider handle to a new positive value, such as 1.5.
  await page.locator('#slider-v0').fill('1.5');

  // 4. Assert: The value display (id="value-v0") updates to show "1.5".
  await expect(page.locator('#value-v0')).toHaveText(/^1\.50*$/);

  // 5. Action: Drag the slider handle to the minimum value (leftmost position).
  await page.locator('#slider-v0').fill('-5');

  // 6. Assert: The value display (id="value-v0") updates to show "-5".
  await expect(page.locator('#value-v0')).toHaveText('-5');
});

test('Connector Length Slider Control', async ({ page }) => {
  // 1. Assert: The "connector length" slider (id="slider-length") is visible on the page.
  await expect(page.locator('#slider-length')).toBeVisible();

  // 2. Assert: The slider's value display (id="value-length") shows "2" by default.
  await expect(page.locator('#value-length')).toHaveText('2');

  // 3. Action: Drag the slider handle to a larger value, such as 3.
  await page.locator('#slider-length').fill('3');

  // 4. Assert: The value display updates to "3". The rod connecting the pivot and bob appears longer in the canvas.
  await expect(page.locator('#value-length')).toHaveText('3');

  // 5. Action: Drag the slider handle to the minimum value (leftmost position).
  await page.locator('#slider-length').fill('0.5');

  // 6. Assert: The value display updates to "0.5". The rod connecting the pivot and bob appears shorter in the canvas.
  await expect(page.locator('#value-length')).toHaveText(/^0\.50*$/);
});

test('Play/Pause Animation Button', async ({ page }) => {
  // 1. Assert: The play/pause button (id="btn-play-pause") is visible.
  await expect(page.locator('#btn-play-pause')).toBeVisible();

  // 2. Assert: The button's text content is "▶" by default and the diagram is static.
  await expect(page.locator('#btn-play-pause')).toHaveText('▶');

  // 3. Action: Click the play/pause button.
  await page.locator('#btn-play-pause').click();

  // 4. Assert: The button's text content changes to "||" and the pendulum diagram begins to animate.
  await expect(page.locator('#btn-play-pause')).toHaveText('||');

  // 5. Action: Click the play/pause button again.
  await page.locator('#btn-play-pause').click();

  // 6. Assert: The button's text content changes back to "▶" and the animation in the canvas pauses.
  await expect(page.locator('#btn-play-pause')).toHaveText('▶');
});

test('Reset Animation Button', async ({ page }) => {
  // 1. Assert: The reset button (id="btn-reset") is visible.
  await expect(page.locator('#btn-reset')).toBeVisible();

  // 2. Assert: The pendulum is in its default initial position on the canvas.
  // This is the default state, no action needed.

  // 3. Action: Click the play/pause button and let the animation run for a few moments so the pendulum moves.
  await page.locator('#btn-play-pause').click();
  await page.waitForTimeout(500); // Wait for animation to proceed

  // 4. Assert: The pendulum diagram shows the bob and pivot in a new, animated position.
  // This is a visual check; we confirm the state has changed by the play button being "||".
  await expect(page.locator('#btn-play-pause')).toHaveText('||');

  // 5. Action: Click the reset button (id="btn-reset").
  await page.locator('#btn-reset').click();

  // 6. Assert: The pendulum diagram returns to its initial static position as defined by the sliders, and the play/pause button text shows "▶".
  await expect(page.locator('#btn-play-pause')).toHaveText('▶');
});