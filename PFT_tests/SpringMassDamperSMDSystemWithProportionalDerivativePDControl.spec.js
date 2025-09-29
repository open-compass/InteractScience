const { test, expect } = require('@playwright/test');
const fileUrl = 'file://' + require('path').resolve(__dirname, '../pages/SpringMassDamperSMDSystemWithProportionalDerivativePDControl.html');

test.beforeEach(async ({ page }) => {
  await page.goto(fileUrl);
    await page.waitForTimeout(500);
});

test.describe('Initial Conditions Sliders', () => {
  test('Initial displacement slider control', async ({ page }) => {
    // 1. Assert: The slider with id="slider-displacement" is visible.
    await expect(page.locator('#slider-displacement')).toBeVisible();

    // 2. Assert: The slider's value is 0.1, and its corresponding span value-displacement displays "0.1".
    await expect(page.locator('#slider-displacement')).toHaveValue('0.1');
    await expect(page.locator('#value-displacement')).toHaveText(/^0\.10*$/);

    // 3. Action: Drag the slider to the value 2.0.
    await page.locator('#slider-displacement').fill('2');

    // 4. Assert: The value-displacement span updates to "2.0", the displacement plot curve is redrawn, and the 3D mass moves to a new initial position.
    await expect(page.locator('#value-displacement')).toHaveText(/^2\.00*$/);

    // 5. Action: Drag the slider to its minimum value (-3).
    await page.locator('#slider-displacement').fill('-3');

    // 6. Assert: The value-displacement span updates to "-3.0", and both the displacement plot and the 3D mass position update accordingly.
    await expect(page.locator('#value-displacement')).toHaveText(/^\-3\.00*$/);
  });

  test('Initial velocity slider control', async ({ page }) => {
    // 1. Assert: The slider with id="slider-velocity" is visible.
    await expect(page.locator('#slider-velocity')).toBeVisible();

    // 2. Assert: The slider's value is 1, and its corresponding span value-velocity displays "1".
    await expect(page.locator('#slider-velocity')).toHaveValue('1');
    await expect(page.locator('#value-velocity')).toHaveText('1');

    // 3. Action: Drag the slider to the value 3.5.
    await page.locator('#slider-velocity').fill('3.5');

    // 4. Assert: The value-velocity span updates to "3.5", and the initial slope of the velocity plot curve changes.
    await expect(page.locator('#value-velocity')).toHaveText(/^3\.50*$/);

    // 5. Action: Drag the slider to its maximum value (5).
    await page.locator('#slider-velocity').fill('5');

    // 6. Assert: The value-velocity span updates to "5", and the velocity plot curve is redrawn.
    await expect(page.locator('#value-velocity')).toHaveText('5');
  });
});

test.describe('System Parameters Sliders', () => {
  test('Spring stiffness slider control', async ({ page }) => {
    // 1. Assert: The slider with id="slider-stiffness" is visible.
    await expect(page.locator('#slider-stiffness')).toBeVisible();

    // 2. Assert: The slider's value is 1, and its corresponding span value-stiffness displays "1".
    await expect(page.locator('#slider-stiffness')).toHaveValue('1');
    await expect(page.locator('#value-stiffness')).toHaveText('1');

    // 3. Action: Drag the slider to the value 4.0.
    await page.locator('#slider-stiffness').fill('4');

    // 4. Assert: The value-stiffness span updates to "4.00", and the frequency of oscillation on the displacement and velocity plots increases.
    await expect(page.locator('#value-stiffness')).toHaveText(/^4\.000*$/);

    // 5. Action: Drag the slider to its minimum value (0.1).
    await page.locator('#slider-stiffness').fill('0.1');

    // 6. Assert: The value-stiffness span updates to "0.10", and the frequency of oscillation on the plots decreases.
    await expect(page.locator('#value-stiffness')).toHaveText(/^0\.100*$/);
  });

  test('Mass slider control', async ({ page }) => {
    // 1. Assert: The slider with id="slider-mass" is visible.
    await expect(page.locator('#slider-mass')).toBeVisible();

    // 2. Assert: The slider's value is 1, and its corresponding span value-mass displays "1".
    await expect(page.locator('#slider-mass')).toHaveValue('1');
    await expect(page.locator('#value-mass')).toHaveText('1');

    // 3. Action: Drag the slider to the value 0.5.
    await page.locator('#slider-mass').fill('0.5');

    // 4. Assert: The value-mass span updates to "0.50", and the frequency of oscillation on the displacement and velocity plots increases.
    await expect(page.locator('#value-mass')).toHaveText(/^0\.500*$/);

    // 5. Action: Drag the slider to its maximum value (5).
    await page.locator('#slider-mass').fill('5');

    // 6. Assert: The value-mass span updates to "5.00", and the frequency of oscillation on the plots decreases.
    await expect(page.locator('#value-mass')).toHaveText(/^5\.000*$/);
  });

  test('Dampening slider control', async ({ page }) => {
    // 1. Assert: The slider with id="slider-damping" is visible.
    await expect(page.locator('#slider-damping')).toBeVisible();

    // 2. Assert: The slider's value is 0.1, and its corresponding span value-damping displays "0.1".
    await expect(page.locator('#slider-damping')).toHaveValue('0.1');
    await expect(page.locator('#value-damping')).toHaveText(/^0\.10*$/);

    // 3. Action: Drag the slider to the value 2.5.
    await page.locator('#slider-damping').fill('2.5');

    // 4. Assert: The value-damping span updates to "2.5", and the amplitude decay rate on the displacement and velocity plots increases.
    await expect(page.locator('#value-damping')).toHaveText(/^2\.50*$/);

    // 5. Action: Drag the slider to its minimum value (0).
    await page.locator('#slider-damping').fill('0');

    // 6. Assert: The value-damping span updates to "0", and the plots show an undamped oscillation (constant amplitude).
    await expect(page.locator('#value-damping')).toHaveText('0');
  });
});

test.describe('Controller Gains Sliders', () => {
  test('Proportional displacement gain slider control', async ({ page }) => {
    // 1. Assert: The slider with id="slider-proportional-gain" is visible.
    await expect(page.locator('#slider-proportional-gain')).toBeVisible();

    // 2. Assert: The slider's value is 0.1, and its corresponding span value-proportional-gain displays "0.1".
    await expect(page.locator('#slider-proportional-gain')).toHaveValue('0.1');
    await expect(page.locator('#value-proportional-gain')).toHaveText(/^0\.10*$/);

    // 3. Action: Drag the slider to the value 3.0.
    await page.locator('#slider-proportional-gain').fill('3');

    // 4. Assert: The value-proportional-gain span updates to "3.0", and the frequency of oscillation on the plots changes.
    await expect(page.locator('#value-proportional-gain')).toHaveText(/^3\.00*$/);

    // 5. Action: Drag the slider to its maximum value (5).
    await page.locator('#slider-proportional-gain').fill('5');

    // 6. Assert: The value-proportional-gain span updates to "5", and the plot curves are redrawn.
    await expect(page.locator('#value-proportional-gain')).toHaveText('5');
  });

  test('Derivative velocity gain slider control', async ({ page }) => {
    // 1. Assert: The slider with id="slider-derivative-gain" is visible.
    await expect(page.locator('#slider-derivative-gain')).toBeVisible();

    // 2. Assert: The slider's value is 0.1, and its corresponding span value-derivative-gain displays "0.1".
    await expect(page.locator('#slider-derivative-gain')).toHaveValue('0.1');
    await expect(page.locator('#value-derivative-gain')).toHaveText(/^0\.10*$/);

    // 3. Action: Drag the slider to the value 2.0.
    await page.locator('#slider-derivative-gain').fill('2');

    // 4. Assert: The value-derivative-gain span updates to "2.0", and the amplitude decay rate on the plots changes.
    await expect(page.locator('#value-derivative-gain')).toHaveText(/^2\.00*$/);

    // 5. Action: Drag the slider to its maximum value (5).
    await page.locator('#slider-derivative-gain').fill('5');

    // 6. Assert: The value-derivative-gain span updates to "5", and the plot curves are redrawn.
    await expect(page.locator('#value-derivative-gain')).toHaveText('5');
  });
});

test.describe('Animation Controls', () => {
  test('Play animation button control', async ({ page }) => {
    // 1. Assert: The button with id="btn-play" is visible.
    await expect(page.locator('#btn-play')).toBeVisible();

    // 2. Assert: The animation is initially paused, and the plot markers are at t=0.
    // (Implicit state)

    // 3. Action: Click the btn-play button.
    await page.locator('#btn-play').click();

    // 4. Assert: The 3D mass begins to move, and the markers on the displacement and velocity plots start moving along their respective curves.
    // (Visual assertion)

    // 5. Action: Click btn-pause, then click btn-play again.
    await page.locator('#btn-pause').click();
    await page.locator('#btn-play').click();

    // 6. Assert: The animation resumes from its paused position, and the plot markers continue to move.
    // (Visual assertion)
  });

  test('Pause animation button control', async ({ page }) => {
    // 1. Assert: The button with id="btn-pause" is visible.
    await expect(page.locator('#btn-pause')).toBeVisible();

    // 2. Assert: The animation is not running by default.
    // (Implicit state)

    // 3. Action: Click the btn-play button to start the animation and let it run for 2 seconds.
    await page.locator('#btn-play').click();
    await page.waitForTimeout(2000);

    // 4. Assert: The 3D mass and plot markers are not in their initial t=0 positions.
    // (Visual assertion)

    // 5. Action: Click the btn-pause button.
    await page.locator('#btn-pause').click();

    // 6. Assert: The motion of the 3D mass and the plot markers stops.
    // (Visual assertion)
  });

  test('Reset animation button control', async ({ page }) => {
    // 1. Assert: The button with id="btn-reset" is visible.
    await expect(page.locator('#btn-reset')).toBeVisible();

    // 2. Assert: The animation time is initially 0, and the plot markers are at the start of the curves.
    // (Implicit state)

    // 3. Action: Click btn-play and let the animation run for 3 seconds.
    await page.locator('#btn-play').click();
    await page.waitForTimeout(3000);

    // 4. Assert: The plot markers have moved away from the t=0 axis.
    // (Visual assertion)

    // 5. Action: Click the btn-reset button.
    await page.locator('#btn-reset').click();

    // 6. Assert: The animation stops, the 3D mass returns to its initial position, and the markers on both plots move back to t=0.
    // (Visual assertion of state reset)
  });
});