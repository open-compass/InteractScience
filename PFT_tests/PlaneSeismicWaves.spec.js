const { test, expect } = require('@playwright/test');

const fileUrl = 'file://' + require('path').resolve(__dirname, '../pages/PlaneSeismicWaves.html');

test.describe('Plane Seismic Waves Simulation', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(fileUrl);
    // Wait for the canvas to be ready, as p5.js might take a moment to initialize
    // await page.waitForSelector('#p5-canvas');
    await page.waitForTimeout(500);
  });

  test('Time Slider Control', async ({ page }) => {
    const timeSlider = page.locator('#slider-time');
    const timeLabel = page.locator('#label-time');
    const canvas = page.locator('#p5-canvas');

    // 1. Assert: The time slider (`slider-time`) is visible.
    await expect(timeSlider).toBeVisible();

    // 2. Assert: The slider's default value is 0, and its corresponding label (`label-time`) displays "0".
    await expect(timeSlider).toHaveValue('0');
    await expect(timeLabel).toHaveText('0');
    const initialCanvas = await canvas.screenshot();

    // 3. Action: Drag the time slider to a new value, such as 2.5.
    await timeSlider.fill('2.5');

    // 4. Assert: The `label-time` updates to "2.5", and the particle positions on the canvas visualization change.
    await expect(timeLabel).toHaveText(/^2\.50*$/);
    await expect(canvas.screenshot()).not.toEqual(initialCanvas);
    const midCanvas = await canvas.screenshot();

    // 5. Action: Drag the slider to its maximum value of 5.
    await timeSlider.fill('5');

    // 6. Assert: The `label-time` updates to "5", and the canvas visualization changes.
    await expect(timeLabel).toHaveText('5');
    await expect(canvas.screenshot()).not.toEqual(midCanvas);
  });

  test('Play/Pause Button Control', async ({ page }) => {
    const playPauseButton = page.locator('#btn-play-pause');
    const timeSlider = page.locator('#slider-time');
    const timeLabel = page.locator('#label-time');

    // 1. Assert: The Play/Pause button (`btn-play-pause`) is visible.
    await expect(playPauseButton).toBeVisible();

    // 2. Assert: The button's initial text is "Play".
    await expect(playPauseButton).toHaveText('Play');

    // 3. Action: Click the "Play" button.
    await playPauseButton.click();

    // 4. Assert: The button's text changes to "Pause", and the `time` slider and its label begin to automatically increment, causing the canvas to animate.
    await expect(playPauseButton).toHaveText('Pause');
    const initialTime = await timeSlider.inputValue();
    await page.waitForTimeout(500); // Wait for time to pass
    const newTime = await timeSlider.inputValue();
    expect(newTime).not.toBe(initialTime);

    // 5. Action: Click the "Pause" button.
    await playPauseButton.click();

    // 6. Assert: The button's text changes back to "Play", and the time slider and label stop incrementing.
    await expect(playPauseButton).toHaveText('Play');
    const pausedTime = await timeSlider.inputValue();
    await page.waitForTimeout(500); // Wait to ensure time does not pass
    const finalTime = await timeSlider.inputValue();
    expect(finalTime).toBe(pausedTime);
  });

  test('Reset Button Control', async ({ page }) => {
    const resetButton = page.locator('#btn-reset');
    const pAmpSlider = page.locator('#slider-p-amp');
    const pAmpLabel = page.locator('#label-p-amp');
    const trailSlider = page.locator('#slider-trail');
    const trailLabel = page.locator('#label-trail');
    const canvas = page.locator('#p5-canvas');

    // 1. Assert: The Reset button (`btn-reset`) is visible.
    await expect(resetButton).toBeVisible();

    // 2. Assert: The `slider-p-amp` has a default value of 0.2.
    await expect(pAmpSlider).toHaveValue('0.2');
    const initialCanvas = await canvas.screenshot();

    // 3. Action: Change the `slider-p-amp` to 0.4 and the `slider-trail` to 50.
    await pAmpSlider.fill('0.4');
    await trailSlider.fill('50');

    // 4. Assert: The `label-p-amp` displays "0.4", the `label-trail` displays "50", and the canvas updates.
    await expect(pAmpLabel).toHaveText(/^0\.40*$/);
    await expect(trailLabel).toHaveText('50');
    await expect(canvas.screenshot()).not.toEqual(initialCanvas);

    // 5. Action: Click the "Reset" button.
    await resetButton.click();

    // 6. Assert: The `slider-p-amp` value resets to 0.2, the `slider-trail` resets to 5, and the canvas visualization updates to its default state.
    await expect(pAmpSlider).toHaveValue('0.2');
    await expect(pAmpLabel).toHaveText(/^0\.20*$/);
    await expect(trailSlider).toHaveValue('5');
    await expect(trailLabel).toHaveText('5');
    await expect(canvas.screenshot()).toEqual(initialCanvas);
  });

  test('Trail Length Slider Control', async ({ page }) => {
    const trailSlider = page.locator('#slider-trail');
    const trailLabel = page.locator('#label-trail');
    const canvas = page.locator('#p5-canvas');

    // 1. Assert: The trail length slider (`slider-trail`) is visible.
    await expect(trailSlider).toBeVisible();

    // 2. Assert: The slider's default value is 5, and its label (`label-trail`) displays "5".
    await expect(trailSlider).toHaveValue('5');
    await expect(trailLabel).toHaveText('5');
    const initialCanvas = await canvas.screenshot();

    // 3. Action: Drag the slider to a value of 50.
    await trailSlider.fill('50');

    // 4. Assert: The `label-trail` updates to "50", and the length of the trails behind the particles on the canvas increases.
    await expect(trailLabel).toHaveText('50');
    await expect(canvas.screenshot()).not.toEqual(initialCanvas);
    const midCanvas = await canvas.screenshot();

    // 5. Action: Drag the slider to its minimum value of 0.
    await trailSlider.fill('0');

    // 6. Assert: The `label-trail` updates to "0", and the trails on the canvas disappear.
    await expect(trailLabel).toHaveText('0');
    await expect(canvas.screenshot()).not.toEqual(midCanvas);
  });

  test('Number of Points Slider Control', async ({ page }) => {
    const pointsSlider = page.locator('#slider-points');
    const pointsLabel = page.locator('#label-points');
    const canvas = page.locator('#p5-canvas');

    // 1. Assert: The number of points slider (`slider-points`) is visible.
    await expect(pointsSlider).toBeVisible();

    // 2. Assert: The slider's default value is 50, and its label (`label-points`) displays "50".
    await expect(pointsSlider).toHaveValue('50');
    await expect(pointsLabel).toHaveText('50');
    const initialCanvas = await canvas.screenshot();

    // 3. Action: Drag the slider to a value of 100.
    await pointsSlider.fill('100');

    // 4. Assert: The `label-points` updates to "100", and the number of particles and vertical lines on the canvas increases.
    await expect(pointsLabel).toHaveText('100');
    await expect(canvas.screenshot()).not.toEqual(initialCanvas);
    const midCanvas = await canvas.screenshot();

    // 5. Action: Drag the slider to its minimum value of 10.
    await pointsSlider.fill('10');

    // 6. Assert: The `label-points` updates to "10", and the number of particles and vertical lines on the canvas decreases.
    await expect(pointsLabel).toHaveText('10');
    await expect(canvas.screenshot()).not.toEqual(midCanvas);
  });

  test('Pressure Wave Amplitude Slider Control', async ({ page }) => {
    const pAmpSlider = page.locator('#slider-p-amp');
    const pAmpLabel = page.locator('#label-p-amp');
    const canvas = page.locator('#p5-canvas');

    // 1. Assert: The pressure wave amplitude slider (`slider-p-amp`) is visible.
    await expect(pAmpSlider).toBeVisible();

    // 2. Assert: The slider's default value is 0.2, and its label (`label-p-amp`) displays "0.2".
    await expect(pAmpSlider).toHaveValue('0.2');
    await expect(pAmpLabel).toHaveText(/^0\.20*$/);
    const initialCanvas = await canvas.screenshot();

    // 3. Action: Drag the slider to a new value, such as 0.35.
    await pAmpSlider.fill('0.35');

    // 4. Assert: The `label-p-amp` updates to "0.35", and the horizontal displacement of particles on the canvas changes.
    await expect(pAmpLabel).toHaveText(/^0\.350*$/);
    await expect(canvas.screenshot()).not.toEqual(initialCanvas);
    const midCanvas = await canvas.screenshot();

    // 5. Action: Drag the slider to its minimum value of 0.
    await pAmpSlider.fill('0');

    // 6. Assert: The `label-p-amp` updates to "0", and the horizontal displacement of particles ceases.
    await expect(pAmpLabel).toHaveText('0');
    await expect(canvas.screenshot()).not.toEqual(midCanvas);
  });

  test('Pressure Wave Wavelength Slider Control', async ({ page }) => {
    const pWlSlider = page.locator('#slider-p-wl');
    const pWlLabel = page.locator('#label-p-wl');
    const canvas = page.locator('#p5-canvas');

    // 1. Assert: The pressure wave wavelength slider (`slider-p-wl`) is visible.
    await expect(pWlSlider).toBeVisible();

    // 2. Assert: The slider's default value is 3, and its label (`label-p-wl`) displays "3".
    await expect(pWlSlider).toHaveValue('3');
    await expect(pWlLabel).toHaveText('3');
    const initialCanvas = await canvas.screenshot();

    // 3. Action: Drag the slider to a new value, such as 1.5.
    await pWlSlider.fill('1.5');

    // 4. Assert: The `label-p-wl` updates to "1.5", and the spatial pattern of horizontal particle displacement on the canvas changes.
    await expect(pWlLabel).toHaveText(/^1\.50*$/);
    await expect(canvas.screenshot()).not.toEqual(initialCanvas);
    const midCanvas = await canvas.screenshot();

    // 5. Action: Drag the slider to its maximum value of 5.
    await pWlSlider.fill('5');

    // 6. Assert: The `label-p-wl` updates to "5", and the spatial pattern of horizontal displacement on the canvas changes again.
    await expect(pWlLabel).toHaveText('5');
    await expect(canvas.screenshot()).not.toEqual(midCanvas);
  });

  test('Shear Wave Amplitude Slider Control', async ({ page }) => {
    const sAmpSlider = page.locator('#slider-s-amp');
    const sAmpLabel = page.locator('#label-s-amp');
    const canvas = page.locator('#p5-canvas');

    // 1. Assert: The shear wave amplitude slider (`slider-s-amp`) is visible.
    await expect(sAmpSlider).toBeVisible();

    // 2. Assert: The slider's default value is 0.1, and its label (`label-s-amp`) displays "0.1".
    await expect(sAmpSlider).toHaveValue('0.1');
    await expect(sAmpLabel).toHaveText(/^0\.10*$/);
    const initialCanvas = await canvas.screenshot();

    // 3. Action: Drag the slider to a new value, such as 0.35.
    await sAmpSlider.fill('0.35');

    // 4. Assert: The `label-s-amp` updates to "0.35", and the vertical displacement of particles on the canvas changes.
    await expect(sAmpLabel).toHaveText(/^0\.350*$/);
    await expect(canvas.screenshot()).not.toEqual(initialCanvas);
    const midCanvas = await canvas.screenshot();

    // 5. Action: Drag the slider to its minimum value of 0.
    await sAmpSlider.fill('0');

    // 6. Assert: The `label-s-amp` updates to "0", and the vertical displacement of particles ceases.
    await expect(sAmpLabel).toHaveText('0');
    await expect(canvas.screenshot()).not.toEqual(midCanvas);
  });

  test('Shear Wave Wavelength Slider Control', async ({ page }) => {
    const sWlSlider = page.locator('#slider-s-wl');
    const sWlLabel = page.locator('#label-s-wl');
    const canvas = page.locator('#p5-canvas');

    // 1. Assert: The shear wave wavelength slider (`slider-s-wl`) is visible.
    await expect(sWlSlider).toBeVisible();

    // 2. Assert: The slider's default value is 1, and its label (`label-s-wl`) displays "1".
    await expect(sWlSlider).toHaveValue('1');
    await expect(sWlLabel).toHaveText('1');
    const initialCanvas = await canvas.screenshot();

    // 3. Action: Drag the slider to a new value, such as 2.5.
    await sWlSlider.fill('2.5');

    // 4. Assert: The `label-s-wl` updates to "2.5", and the spatial pattern of vertical particle displacement on the canvas changes.
    await expect(sWlLabel).toHaveText(/^2\.50*$/);
    await expect(canvas.screenshot()).not.toEqual(initialCanvas);
    const midCanvas = await canvas.screenshot();

    // 5. Action: Drag the slider to its maximum value of 5.
    await sWlSlider.fill('5');

    // 6. Assert: The `label-s-wl` updates to "5", and the spatial pattern of vertical displacement on the canvas changes again.
    await expect(sWlLabel).toHaveText('5');
    await expect(canvas.screenshot()).not.toEqual(midCanvas);
  });

});