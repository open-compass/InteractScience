const { test, expect } = require('@playwright/test');

const fileUrl = 'file://' + require('path').resolve(__dirname, '../pages/SimpleHarmonicMotionOfASpring.html');

test.describe('Simple Harmonic Motion of a Spring', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(fileUrl);
    // await page.waitForSelector('#plot-canvas-container canvas');
    // await page.waitForSelector('#animation-canvas-container canvas');
    await page.waitForTimeout(500);
  });

  test('Amplitude Slider Control', async ({ page }) => {
    const amplitudeSlider = page.locator('#slider-amplitude');
    const amplitudeValue = page.locator('#amplitude-value');

    // 1. Assert: The amplitude slider (#slider-amplitude) is visible.
    await expect(amplitudeSlider).toBeVisible();

    // 2. Assert: The slider's value is 0.3, and the adjacent text (#amplitude-value) displays 0.3.
    await expect(amplitudeSlider).toHaveValue('0.3');
    await expect(amplitudeValue).toHaveText(/^0\.30*$/);

    // 3. Action: Drag the amplitude slider to a new value, e.g., 0.8.
    await amplitudeSlider.fill('0.8');

    // 4. Assert: The text display (#amplitude-value) updates to 0.8, and the plot is reset (cleared).
    await expect(amplitudeValue).toHaveText(/^0\.80*$/);

    // 5. Action: Drag the slider to its maximum value, 1.0.
    await amplitudeSlider.fill('1');

    // 6. Assert: The text display (#amplitude-value) updates to 1.0, and the plot is redrawn in its initial state.
    await expect(amplitudeValue).toHaveText(/^1\.00*$/);
  });

  test('Stiffness Slider Control', async ({ page }) => {
    const stiffnessSlider = page.locator('#slider-stiffness');
    const stiffnessValue = page.locator('#stiffness-value');

    // 1. Assert: The stiffness slider (#slider-stiffness) is visible.
    await expect(stiffnessSlider).toBeVisible();

    // 2. Assert: The slider's value is 1.0, and the adjacent text (#stiffness-value) displays 1.
    await expect(stiffnessSlider).toHaveValue('1');
    await expect(stiffnessValue).toHaveText('1');

    // 3. Action: Drag the stiffness slider to a new value, e.g., 5.5.
    await stiffnessSlider.fill('5.5');

    // 4. Assert: The text display (#stiffness-value) updates to 5.5, and the plot is reset.
    await expect(stiffnessValue).toHaveText(/^5\.50*$/);

    // 5. Action: Drag the slider to its minimum value, 0.1.
    await stiffnessSlider.fill('0.1');

    // 6. Assert: The text display (#stiffness-value) updates to 0.1, and the plot is redrawn in its initial state.
    await expect(stiffnessValue).toHaveText(/^0\.10*$/);
  });

  test('Mass Slider Control', async ({ page }) => {
    const massSlider = page.locator('#slider-mass');
    const massValue = page.locator('#mass-value');

    // 1. Assert: The mass slider (#slider-mass) is visible.
    await expect(massSlider).toBeVisible();

    // 2. Assert: The slider's value is 1.0, and the adjacent text (#mass-value) displays 1.
    await expect(massSlider).toHaveValue('1');
    await expect(massValue).toHaveText('1');

    // 3. Action: Drag the mass slider to a new value, e.g., 8.2.
    await massSlider.fill('8.2');

    // 4. Assert: The text display (#mass-value) updates to 8.2, and the plot is reset.
    await expect(massValue).toHaveText(/^8\.20*$/);

    // 5. Action: Drag the slider to its maximum value, 10.0.
    await massSlider.fill('10');

    // 6. Assert: The text display (#mass-value) updates to 10.0, and the plot is redrawn in its initial state.
    await expect(massValue).toHaveText(/^10\.00*$/);
  });

  test('Play/Pause Button Control', async ({ page }) => {
    const playPauseButton = page.locator('#btn-play-pause');
    const plotCanvas = page.locator('#plot-canvas-container canvas');

    // 1. Assert: The play/pause button (#btn-play-pause) is visible.
    await expect(playPauseButton).toBeVisible();

    // 2. Assert: The button's icon is the 'play' symbol ('▶').
    await expect(playPauseButton).toHaveText('▶');
    const initialCanvasState = await plotCanvas.screenshot();

    // 3. Action: Click the play/pause button.
    await playPauseButton.click();

    // 4. Assert: The button's icon changes to the 'pause' symbol ('||'), and the waveform on the plot canvas begins to draw over time.
    await expect(playPauseButton).toHaveText('||');
    await page.waitForTimeout(200); // Allow time for animation frame
    await expect(plotCanvas).not.toHaveScreenshot(initialCanvasState);

    const pausedCanvasState = await plotCanvas.screenshot();

    // 5. Action: Click the play/pause button again.
    await playPauseButton.click();

    // 6. Assert: The button's icon changes back to the 'play' symbol ('▶'), and the waveform on the plot canvas stops drawing.
    await expect(playPauseButton).toHaveText('▶');
    await page.waitForTimeout(200); // Wait to ensure no further drawing occurs
    await expect(plotCanvas).toHaveScreenshot(pausedCanvasState);
  });

  test('Step Forward Button Control', async ({ page }) => {
    const stepForwardButton = page.locator('#btn-step-forward');
    const plotCanvas = page.locator('#plot-canvas-container canvas');

    // 1. Assert: The step forward button (#btn-step-forward) is visible.
    await expect(stepForwardButton).toBeVisible();

    // 2. Assert: The plot canvas is in its initial state with no waveform drawn.
    const initialCanvasState = await plotCanvas.screenshot();

    // 3. Action: Click the step forward button.
    await stepForwardButton.click();

    // 4. Assert: A single data point or small segment is drawn on the plot canvas, and the mass in the animation moves slightly.
    await expect(plotCanvas).not.toHaveScreenshot(initialCanvasState);
    const afterOneStepState = await plotCanvas.screenshot();

    // 5. Action: Click the step forward button several more times.
    await stepForwardButton.click();
    await stepForwardButton.click();
    await stepForwardButton.click();

    // 6. Assert: The waveform on the plot canvas extends with each click, showing a visible progression.
    await expect(plotCanvas).not.toHaveScreenshot(afterOneStepState);
  });

  test('Step Back Button Control', async ({ page }) => {
    const stepBackButton = page.locator('#btn-step-back');
    const stepForwardButton = page.locator('#btn-step-forward');
    const plotCanvas = page.locator('#plot-canvas-container canvas');

    // 1. Assert: The step back button (#btn-step-back) is visible.
    await expect(stepBackButton).toBeVisible();

    // 2. Assert: The plot is in its initial state (time = 0). Clicking the button causes no change.
    const initialCanvasState = await plotCanvas.screenshot();
    await stepBackButton.click();
    await expect(plotCanvas).toHaveScreenshot(initialCanvasState);

    // 3. Action: Click the step forward button three times to advance the simulation.
    await stepForwardButton.click();
    await stepForwardButton.click();
    await stepForwardButton.click();

    // 4. Assert: The plot canvas shows a waveform with several data points.
    const afterForwardStepsState = await plotCanvas.screenshot();
    await expect(plotCanvas).not.toHaveScreenshot(initialCanvasState);

    // 5. Action: Click the step back button once.
    await stepBackButton.click();

    // 6. Assert: The waveform on the plot canvas becomes shorter, and the mass in the animation moves back to its previous position.
    await expect(plotCanvas).not.toHaveScreenshot(afterForwardStepsState);
  });

  test('Reset Button Control', async ({ page }) => {
    const resetButton = page.locator('#btn-reset');
    const amplitudeSlider = page.locator('#slider-amplitude');
    const amplitudeValue = page.locator('#amplitude-value');
    const playPauseButton = page.locator('#btn-play-pause');
    const plotCanvas = page.locator('#plot-canvas-container canvas');

    const initialCanvasState = await plotCanvas.screenshot();

    // 1. Assert: The reset button (#btn-reset) is visible.
    await expect(resetButton).toBeVisible();

    // 2. Assert: All sliders are at their default values.
    await expect(amplitudeSlider).toHaveValue('0.3');

    // 3. Action: Change the amplitude slider to 0.9 and click the play button to draw a waveform.
    await amplitudeSlider.fill('0.9');
    await playPauseButton.click();
    await page.waitForTimeout(200); // Allow time for animation

    // 4. Assert: The amplitude value display shows 0.9, and the plot canvas contains a waveform.
    await expect(amplitudeValue).toHaveText(/^0\.90*$/);
    await expect(plotCanvas).not.toHaveScreenshot(initialCanvasState);

    // 5. Action: Click the reset button.
    await resetButton.click();

    // 6. Assert: The amplitude slider and its value display reset to 0.3, the plot is cleared, and the play/pause button shows the 'play' icon ('▶').
    await expect(amplitudeSlider).toHaveValue('0.3');
    await expect(amplitudeValue).toHaveText(/^0\.30*$/);
    await expect(playPauseButton).toHaveText('▶');
    await expect(plotCanvas).toHaveScreenshot(initialCanvasState);
  });
});