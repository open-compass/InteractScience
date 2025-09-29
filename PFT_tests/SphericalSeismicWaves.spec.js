const { test, expect } = require('@playwright/test');

const fileUrl = 'file://' + require('path').resolve(__dirname, '../pages/SphericalSeismicWaves.html');

test.describe('Spherical Seismic Waves Visualization', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(fileUrl);
    await page.waitForTimeout(500);
  });

  test('Time Slider Control', async ({ page }) => {
    // 1. Assert: The time slider (`#time-slider`) is visible.
    await expect(page.locator('#time-slider')).toBeVisible();

    // 2. Assert: The time slider's value is at its default of 0.
    await expect(page.locator('#time-slider')).toHaveValue('0');

    // 3. Action: Drag the time slider to a value of 10.
    await page.locator('#time-slider').fill('10');

    // 4. Assert: The wave pattern in the visualization area has propagated outwards from the center. The slider's value is now 10.
    // Visual change is not tested, only control state.
    await expect(page.locator('#time-slider')).toHaveValue('10');

    // 5. Action: Drag the time slider to its maximum value of 20.
    await page.locator('#time-slider').fill('20');

    // 6. Assert: The wave pattern in the visualization has propagated further, towards the edges of the grid. The slider's value is now 20.
    // Visual change is not tested, only control state.
    await expect(page.locator('#time-slider')).toHaveValue('20');
  });

  test('Animation Reset Button', async ({ page }) => {
    // 1. Assert: The reset button (`#reset-button`) is visible.
    await expect(page.locator('#reset-button')).toBeVisible();

    // 2. Assert: The time slider is at 0.
    await expect(page.locator('#time-slider')).toHaveValue('0');

    // 3. Action: Drag the time slider to 10, then click the reset button.
    await page.locator('#time-slider').fill('10');
    await page.locator('#reset-button').click();

    // 4. Assert: The time slider's value returns to 0 and the visualization resets to its initial state.
    await expect(page.locator('#time-slider')).toHaveValue('0');
    // Visual change is not tested.

    // 5. Action: Click the reset button again while the time slider is at 0.
    await page.locator('#reset-button').click();

    // 6. Assert: The time slider's value remains 0 and the visualization does not change.
    await expect(page.locator('#time-slider')).toHaveValue('0');
    // Visual change is not tested.
  });

  test('Play/Pause Button', async ({ page }) => {
    // 1. Assert: The play/pause button (`#play-pause-button`) is visible.
    await expect(page.locator('#play-pause-button')).toBeVisible();

    // 2. Assert: The button shows the "►" icon, and the animation is paused.
    await expect(page.locator('#play-pause-button')).toHaveText('►');
    const initialValue = await page.locator('#time-slider').inputValue();
    await page.waitForTimeout(200); // Give it time to move if it were playing
    await expect(page.locator('#time-slider')).toHaveValue(initialValue);

    // 3. Action: Click the play/pause button.
    await page.locator('#play-pause-button').click();

    // 4. Assert: The button's icon changes to "❚❚", and the time slider begins to move automatically, causing the visualization to animate.
    await expect(page.locator('#play-pause-button')).toHaveText('❚❚');
    const valueAfterPlay = await page.locator('#time-slider').inputValue();
    await page.waitForTimeout(200); // Wait for the slider to advance
    const valueAfterWait = await page.locator('#time-slider').inputValue();
    expect(parseFloat(valueAfterWait)).toBeGreaterThan(parseFloat(valueAfterPlay));

    // 5. Action: Click the play/pause button again.
    await page.locator('#play-pause-button').click();

    // 6. Assert: The button's icon changes back to "►", and the time slider stops moving, pausing the animation.
    await expect(page.locator('#play-pause-button')).toHaveText('►');
    const valueAfterPause = await page.locator('#time-slider').inputValue();
    await page.waitForTimeout(200); // Wait to see if it moves
    await expect(page.locator('#time-slider')).toHaveValue(valueAfterPause);
  });

  test('Animation Step Button', async ({ page }) => {
    // 1. Assert: The step button (`#step-button`) is visible.
    await expect(page.locator('#step-button')).toBeVisible();

    // 2. Assert: The time slider is at its default value of 0.
    await expect(page.locator('#time-slider')).toHaveValue('0');

    // 3. Action: Click the step button.
    await page.locator('#step-button').click();

    // 4. Assert: The time slider's value increases by a small increment (0.1), and the visualization updates to show a slightly propagated wave. The animation remains paused.
    await expect(page.locator('#time-slider')).toHaveValue('0.1');
    // Visual change is not tested.

    // 5. Action: Click the step button five consecutive times.
    for (let i = 0; i < 5; i++) {
      await page.locator('#step-button').click();
    }

    // 6. Assert: The time slider's value increases with each click, and the visualization updates incrementally.
    const finalValue = await page.locator('#time-slider').inputValue();
    expect(parseFloat(finalValue)).toBeCloseTo(0.6);
  });

  test('Plot Points Slider', async ({ page }) => {
    // 1. Assert: The plot points slider (`#plot-points-slider`) is visible.
    await expect(page.locator('#plot-points-slider')).toBeVisible();

    // 2. Assert: The slider is at its default value of 40.
    await expect(page.locator('#plot-points-slider')).toHaveValue('40');

    // 3. Action: Drag the slider to a higher value, like 60.
    await page.locator('#plot-points-slider').fill('60');

    // 4. Assert: The grid in the visualization becomes noticeably denser.
    // Visual change is not tested.
    await expect(page.locator('#plot-points-slider')).toHaveValue('60');

    // 5. Action: Drag the slider to its minimum value of 10.
    await page.locator('#plot-points-slider').fill('10');

    // 6. Assert: The grid in the visualization becomes noticeably coarser.
    // Visual change is not tested.
    await expect(page.locator('#plot-points-slider')).toHaveValue('10');
  });

  test('Pressure Wave Type Selector', async ({ page }) => {
    // 1. Assert: The P-wave sine (`#p-wave-sine-button`) and pulse (`#p-wave-pulse-button`) buttons are visible.
    await expect(page.locator('#p-wave-sine-button')).toBeVisible();
    await expect(page.locator('#p-wave-pulse-button')).toBeVisible();

    // 2. Assert: The sine button is active by default.
    await expect(page.locator('#p-wave-sine-button')).toHaveClass(/active/);
    await expect(page.locator('#p-wave-pulse-button')).not.toHaveClass(/active/);

    // 3. Action: Click the pulse button.
    await page.locator('#p-wave-pulse-button').click();

    // 4. Assert: The pulse button becomes active, the sine button becomes inactive, and the wave pattern in the visualization changes.
    await expect(page.locator('#p-wave-pulse-button')).toHaveClass(/active/);
    await expect(page.locator('#p-wave-sine-button')).not.toHaveClass(/active/);
    // Visual change is not tested.

    // 5. Action: Click the sine button again.
    await page.locator('#p-wave-sine-button').click();

    // 6. Assert: The sine button becomes active again, and the wave pattern in the visualization changes back.
    await expect(page.locator('#p-wave-sine-button')).toHaveClass(/active/);
    await expect(page.locator('#p-wave-pulse-button')).not.toHaveClass(/active/);
    // Visual change is not tested.
  });

  test('Pressure Wave Amplitude Slider', async ({ page }) => {
    // 1. Assert: The P-wave amplitude slider (`#p-wave-amplitude-slider`) is visible.
    await expect(page.locator('#p-wave-amplitude-slider')).toBeVisible();

    // 2. Assert: The slider is at its default value of 0.1.
    await expect(page.locator('#p-wave-amplitude-slider')).toHaveValue('0.1');

    // 3. Action: Drag the slider to a higher value, like 0.25.
    await page.locator('#p-wave-amplitude-slider').fill('0.25');

    // 4. Assert: The displacement of the grid points in the visualization visibly increases.
    // Visual change is not tested.
    await expect(page.locator('#p-wave-amplitude-slider')).toHaveValue('0.25');

    // 5. Action: Drag the slider to its minimum value of 0.
    await page.locator('#p-wave-amplitude-slider').fill('0');

    // 6. Assert: The P-wave component of the visualization disappears (grid shows only S-wave).
    // Visual change is not tested.
    await expect(page.locator('#p-wave-amplitude-slider')).toHaveValue('0');
  });

  test('Pressure Wave Wavelength Slider', async ({ page }) => {
    // 1. Assert: The P-wave wavelength slider (`#p-wave-wavelength-slider`) is visible.
    await expect(page.locator('#p-wave-wavelength-slider')).toBeVisible();

    // 2. Assert: The slider is at its default value of 2.0.
    await expect(page.locator('#p-wave-wavelength-slider')).toHaveValue('2');

    // 3. Action: Drag the slider to a higher value, like 4.0.
    await page.locator('#p-wave-wavelength-slider').fill('4');

    // 4. Assert: The distance between the circular wave crests in the visualization visibly increases.
    // Visual change is not tested.
    await expect(page.locator('#p-wave-wavelength-slider')).toHaveValue('4');

    // 5. Action: Drag the slider to its minimum value of 0.5.
    await page.locator('#p-wave-wavelength-slider').fill('0.5');

    // 6. Assert: The distance between the circular wave crests in the visualization visibly decreases.
    // Visual change is not tested.
    await expect(page.locator('#p-wave-wavelength-slider')).toHaveValue('0.5');
  });

  test('Shear Wave Type Selector', async ({ page }) => {
    // 1. Assert: The S-wave sine (`#s-wave-sine-button`) and pulse (`#s-wave-pulse-button`) buttons are visible.
    await expect(page.locator('#s-wave-sine-button')).toBeVisible();
    await expect(page.locator('#s-wave-pulse-button')).toBeVisible();

    // 2. Assert: The sine button is active by default.
    await expect(page.locator('#s-wave-sine-button')).toHaveClass(/active/);
    await expect(page.locator('#s-wave-pulse-button')).not.toHaveClass(/active/);

    // 3. Action: Click the pulse button.
    await page.locator('#s-wave-pulse-button').click();

    // 4. Assert: The pulse button becomes active, the sine button becomes inactive, and the wave pattern in the visualization changes.
    await expect(page.locator('#s-wave-pulse-button')).toHaveClass(/active/);
    await expect(page.locator('#s-wave-sine-button')).not.toHaveClass(/active/);
    // Visual change is not tested.

    // 5. Action: Click the sine button again.
    await page.locator('#s-wave-sine-button').click();

    // 6. Assert: The sine button becomes active again, and the wave pattern in the visualization changes back.
    await expect(page.locator('#s-wave-sine-button')).toHaveClass(/active/);
    await expect(page.locator('#s-wave-pulse-button')).not.toHaveClass(/active/);
    // Visual change is not tested.
  });

  test('Shear Wave Amplitude Slider', async ({ page }) => {
    // 1. Assert: The S-wave amplitude slider (`#s-wave-amplitude-slider`) is visible.
    await expect(page.locator('#s-wave-amplitude-slider')).toBeVisible();

    // 2. Assert: The slider is at its default value of 0.1.
    await expect(page.locator('#s-wave-amplitude-slider')).toHaveValue('0.1');

    // 3. Action: Drag the slider to a higher value, like 0.25.
    await page.locator('#s-wave-amplitude-slider').fill('0.25');

    // 4. Assert: The displacement of the grid points in the visualization visibly increases.
    // Visual change is not tested.
    await expect(page.locator('#s-wave-amplitude-slider')).toHaveValue('0.25');

    // 5. Action: Drag the slider to its maximum value of 0.3.
    await page.locator('#s-wave-amplitude-slider').fill('0.3');

    // 6. Assert: The wave amplitude in the visualization is at its maximum.
    // Visual change is not tested.
    await expect(page.locator('#s-wave-amplitude-slider')).toHaveValue('0.3');
  });

  test('Shear Wave Wavelength Slider', async ({ page }) => {
    // 1. Assert: The S-wave wavelength slider (`#s-wave-wavelength-slider`) is visible.
    await expect(page.locator('#s-wave-wavelength-slider')).toBeVisible();

    // 2. Assert: The slider is at its default value of 2.5.
    await expect(page.locator('#s-wave-wavelength-slider')).toHaveValue('2.5');

    // 3. Action: Drag the slider to a lower value, like 1.0.
    await page.locator('#s-wave-wavelength-slider').fill('1');

    // 4. Assert: The distance between the wave crests in the visualization visibly decreases.
    // Visual change is not tested.
    await expect(page.locator('#s-wave-wavelength-slider')).toHaveValue('1');

    // 5. Action: Drag the slider to its maximum value of 5.0.
    await page.locator('#s-wave-wavelength-slider').fill('5');

    // 6. Assert: The distance between the wave crests in the visualization visibly increases.
    // Visual change is not tested.
    await expect(page.locator('#s-wave-wavelength-slider')).toHaveValue('5');
  });

  test('Shear Wave Direction Selector', async ({ page }) => {
    // 1. Assert: The 'x-y' (`#s-wave-dir-xy-button`) and 'z' (`#s-wave-dir-z-button`) direction buttons are visible.
    await expect(page.locator('#s-wave-dir-xy-button')).toBeVisible();
    await expect(page.locator('#s-wave-dir-z-button')).toBeVisible();

    // 2. Assert: The 'x-y' button is active by default.
    await expect(page.locator('#s-wave-dir-xy-button')).toHaveClass(/active/);
    await expect(page.locator('#s-wave-dir-z-button')).not.toHaveClass(/active/);

    // 3. Action: Click the 'z' button.
    await page.locator('#s-wave-dir-z-button').click();

    // 4. Assert: The 'z' button becomes active, the 'x-y' button becomes inactive, and the oscillation pattern of the wave in the visualization changes.
    await expect(page.locator('#s-wave-dir-z-button')).toHaveClass(/active/);
    await expect(page.locator('#s-wave-dir-xy-button')).not.toHaveClass(/active/);
    // Visual change is not tested.

    // 5. Action: Click the 'x-y' button again.
    await page.locator('#s-wave-dir-xy-button').click();

    // 6. Assert: The 'x-y' button becomes active again, and the oscillation pattern returns to its previous state.
    await expect(page.locator('#s-wave-dir-xy-button')).toHaveClass(/active/);
    await expect(page.locator('#s-wave-dir-z-button')).not.toHaveClass(/active/);
    // Visual change is not tested.
  });

  test('Viewpoint Selector', async ({ page }) => {
    // 1. Assert: The 'Top' (`#viewpoint-top-button`) and 'Default' (`#viewpoint-default-button`) buttons are visible.
    await expect(page.locator('#viewpoint-top-button')).toBeVisible();
    await expect(page.locator('#viewpoint-default-button')).toBeVisible();

    // 2. Assert: The 'Top' button is active, and the visualization shows a top-down orthographic view.
    await expect(page.locator('#viewpoint-top-button')).toHaveClass(/active/);
    await expect(page.locator('#viewpoint-default-button')).not.toHaveClass(/active/);
    // Visual state is not tested.

    // 3. Action: Click the 'Default' button.
    await page.locator('#viewpoint-default-button').click();

    // 4. Assert: The 'Default' button becomes active, and the visualization switches to a 3D perspective camera view.
    await expect(page.locator('#viewpoint-default-button')).toHaveClass(/active/);
    await expect(page.locator('#viewpoint-top-button')).not.toHaveClass(/active/);
    // Visual state is not tested.

    // 5. Action: Click the 'Top' button again.
    await page.locator('#viewpoint-top-button').click();

    // 6. Assert: The 'Top' button becomes active, and the visualization switches back to the top-down orthographic view.
    await expect(page.locator('#viewpoint-top-button')).toHaveClass(/active/);
    await expect(page.locator('#viewpoint-default-button')).not.toHaveClass(/active/);
    // Visual state is not tested.
  });
});