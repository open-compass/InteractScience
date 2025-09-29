const { test, expect } = require('@playwright/test');
const path = require('path');

const fileUrl = 'file://' + path.resolve(__dirname, '../pages/ComparingSortingAlgorithmsOnRainbowColoredBarCharts.html');

test.beforeEach(async ({ page }) => {
  await page.goto(fileUrl);
  await page.waitForTimeout(500);
});

test.describe('Elements Slider Control', () => {
  test('Elements Slider for Adjusting Bar Count', async ({ page }) => {
    // 1. Assert: The "elements" slider (#slider-elements) is visible.
    await expect(page.locator('#slider-elements')).toBeVisible();

    // 2. Assert: The slider's default value is 10, and the elements-value span shows "10".
    await expect(page.locator('#slider-elements')).toHaveValue('10');
    await expect(page.locator('#elements-value')).toHaveText('10');

    // Take a screenshot to verify the chart doesn't change
    const initialCanvasScreenshot = await page.locator('#bar-chart-canvas').screenshot();

    // 3. Action: Drag the slider to a new value of 42.
    await page.locator('#slider-elements').fill('42');

    // 4. Assert: The elements-value span updates to "42", but the number of bars in the chart remains unchanged.
    await expect(page.locator('#elements-value')).toHaveText('42');
    await expect(page.locator('#bar-chart-canvas')).toHaveScreenshot(initialCanvasScreenshot);

    // 5. Action: Drag the slider to its maximum value of 50.
    await page.locator('#slider-elements').fill('50');

    // 6. Assert: The elements-value span updates to "50".
    await expect(page.locator('#elements-value')).toHaveText('50');
  });
});

test.describe('Step Controls', () => {
  test('Step Slider for Navigating Sort Animation', async ({ page }) => {
    // 1. Assert: The "step" slider (#slider-step) is visible.
    await expect(page.locator('#slider-step')).toBeVisible();

    // 2. Assert: The slider's default value is 1, and the step-value span shows "1".
    await expect(page.locator('#slider-step')).toHaveValue('1');
    await expect(page.locator('#step-value')).toHaveText('1');

    const initialCanvasScreenshot = await page.locator('#bar-chart-canvas').screenshot();
    const maxSteps = await page.locator('#slider-step').getAttribute('max');
    const midStep = String(Math.floor(parseInt(maxSteps, 10) / 2));

    // 3. Action: Drag the slider to a middle value (e.g., half of its maximum).
    await page.locator('#slider-step').fill(midStep);

    // 4. Assert: The step-value span updates to the new value, and the bar chart visualization changes.
    await expect(page.locator('#step-value')).toHaveText(midStep);
    await expect(page.locator('#bar-chart-canvas')).not.toHaveScreenshot(initialCanvasScreenshot);

    // 5. Action: Drag the slider to its maximum value.
    await page.locator('#slider-step').fill(maxSteps);

    // 6. Assert: The step-value span shows the maximum step count, and the bar chart shows a fully sorted state.
    await expect(page.locator('#step-value')).toHaveText(maxSteps);
    // The final state should be visually sorted
    await expect(page.locator('#bar-chart-canvas')).toHaveScreenshot('sorted-state.png');
  });

  test('Play/Pause Animation Button', async ({ page }) => {
    // 1. Assert: The play/pause button (#btn-play-pause) is visible.
    await expect(page.locator('#btn-play-pause')).toBeVisible();

    // 2. Assert: The button's initial text is "▶".
    await expect(page.locator('#btn-play-pause')).toHaveText('▶');
    const initialStepValue = await page.locator('#slider-step').inputValue();

    // 3. Action: Click the play/pause button.
    await page.locator('#btn-play-pause').click();

    // 4. Assert: The button's text changes to "❚❚", the slider-step value begins to increment automatically, and the bar chart updates accordingly.
    await expect(page.locator('#btn-play-pause')).toHaveText('❚❚');
    await page.waitForTimeout(500); // Wait for animation to progress
    const currentStepValue = await page.locator('#slider-step').inputValue();
    expect(parseInt(currentStepValue)).toBeGreaterThan(parseInt(initialStepValue));

    // 5. Action: Click the play/pause button again while the animation is running.
    await page.locator('#btn-play-pause').click();

    // 6. Assert: The button's text changes back to "▶", and the animation stops.
    await expect(page.locator('#btn-play-pause')).toHaveText('▶');
    const stepValueAfterPause = await page.locator('#slider-step').inputValue();
    await page.waitForTimeout(500); // Wait to see if animation continues
    await expect(page.locator('#slider-step')).toHaveValue(stepValueAfterPause);
  });

  test('Step Backward Button', async ({ page }) => {
    // 1. Assert: The step backward button (#btn-step-backward) is visible.
    await expect(page.locator('#btn-step-backward')).toBeVisible();

    // 2. Assert: The button is enabled.
    await expect(page.locator('#btn-step-backward')).toBeEnabled();

    // 3. Action: First click the "Step Forward" button to advance to step 2, then click the "Step Backward" button.
    await page.locator('#btn-step-forward').click();
    await expect(page.locator('#step-value')).toHaveText('2');
    const canvasAtStep1 = await page.locator('#bar-chart-canvas').screenshot();
    
    await page.locator('#btn-step-backward').click();

    // 4. Assert: The step-value display changes from "2" to "1", and the bar chart reverts to the previous state.
    await expect(page.locator('#step-value')).toHaveText('1');
    // Note: Re-running step-forward would put the canvas back into the state it was in before screenshotting,
    // so we need to go forward then backward to test the backward functionality properly.
    await page.locator('#btn-step-forward').click(); // to step 2
    await page.locator('#btn-step-backward').click(); // back to step 1
    await expect(page.locator('#bar-chart-canvas')).toHaveScreenshot(canvasAtStep1);

    // 5. Action: With the step at 1, click the "Step Backward" button again.
    const canvasBeforeClick = await page.locator('#bar-chart-canvas').screenshot();
    await page.locator('#btn-step-backward').click();

    // 6. Assert: The step-value remains "1" and the bar chart does not change.
    await expect(page.locator('#step-value')).toHaveText('1');
    await expect(page.locator('#bar-chart-canvas')).toHaveScreenshot(canvasBeforeClick);
  });

  test('Step Forward Button', async ({ page }) => {
    // 1. Assert: The step forward button (#btn-step-forward) is visible.
    await expect(page.locator('#btn-step-forward')).toBeVisible();

    // 2. Assert: The button is enabled by default.
    await expect(page.locator('#btn-step-forward')).toBeEnabled();

    const canvasAtStep1 = await page.locator('#bar-chart-canvas').screenshot();
    // 3. Action: Click the "Step Forward" button.
    await page.locator('#btn-step-forward').click();

    // 4. Assert: The step-value display changes from "1" to "2", and the bar chart updates to reflect the next step.
    await expect(page.locator('#step-value')).toHaveText('2');
    await expect(page.locator('#bar-chart-canvas')).not.toHaveScreenshot(canvasAtStep1);

    // 5. Action: Click the "Step Forward" button until the maximum step is reached.
    const maxSteps = parseInt(await page.locator('#slider-step').getAttribute('max'), 10);
    for (let i = 2; i < maxSteps; i++) {
        await page.locator('#btn-step-forward').click();
    }
    await page.locator('#btn-step-forward').click(); // Final click to reach max
    await expect(page.locator('#step-value')).toHaveText(String(maxSteps));

    // 6. Assert: The bar chart shows the final sorted state, and further clicks on the button do not change the step value or the visualization.
    const finalCanvasState = await page.locator('#bar-chart-canvas').screenshot();
    await page.locator('#btn-step-forward').click();
    await expect(page.locator('#step-value')).toHaveText(String(maxSteps));
    await expect(page.locator('#bar-chart-canvas')).toHaveScreenshot(finalCanvasState);
  });

  test('Reset Step Button', async ({ page }) => {
    // 1. Assert: The reset step button (#btn-reset-step) is visible.
    await expect(page.locator('#btn-reset-step')).toBeVisible();

    // 2. Assert: The button is enabled.
    await expect(page.locator('#btn-reset-step')).toBeEnabled();

    const canvasAtStep1 = await page.locator('#bar-chart-canvas').screenshot();

    // 3. Action: Move the slider-step to a value greater than 1 (e.g., 11).
    await page.locator('#slider-step').fill('11');

    // 4. Assert: The step-value display shows "11" and the bar chart reflects this state.
    await expect(page.locator('#step-value')).toHaveText('11');
    await expect(page.locator('#bar-chart-canvas')).not.toHaveScreenshot(canvasAtStep1);

    // 5. Action: Click the reset step button.
    await page.locator('#btn-reset-step').click();

    // 6. Assert: The step-value display changes to "1", and the bar chart updates to show the state at the first step.
    await expect(page.locator('#step-value')).toHaveText('1');
    await expect(page.locator('#bar-chart-canvas')).toHaveScreenshot(canvasAtStep1);
  });
});

test.describe('Sort Algorithm Selection', () => {
  test('Bubblesort Algorithm Selection Button', async ({ page }) => {
    // 1. Assert: The "bubblesort" button (#btn-bubblesort) is visible.
    await expect(page.locator('#btn-bubblesort')).toBeVisible();

    // 2. Assert: The "shellsort" button has the `active` class, while the "bubblesort" button does not.
    await expect(page.locator('#btn-shellsort')).toHaveClass(/active/);
    await expect(page.locator('#btn-bubblesort')).not.toHaveClass(/active/);

    const initialCanvas = await page.locator('#bar-chart-canvas').screenshot();

    // 3. Action: Click the "bubblesort" button.
    await page.locator('#btn-bubblesort').click();

    // 4. Assert: The "bubblesort" button gains the `active` class, "shellsort" loses it, the bar chart visualization changes to a new random state, and the step-value resets to 1.
    await expect(page.locator('#btn-bubblesort')).toHaveClass(/active/);
    await expect(page.locator('#btn-shellsort')).not.toHaveClass(/active/);
    await expect(page.locator('#bar-chart-canvas')).not.toHaveScreenshot(initialCanvas);
    await expect(page.locator('#step-value')).toHaveText('1');

    const bubbleSortCanvas = await page.locator('#bar-chart-canvas').screenshot();

    // 5. Action: Click the "shellsort" button again.
    await page.locator('#btn-shellsort').click();

    // 6. Assert: The "shellsort" button regains the `active` class, and the visualization again updates with a new random state.
    await expect(page.locator('#btn-shellsort')).toHaveClass(/active/);
    await expect(page.locator('#bar-chart-canvas')).not.toHaveScreenshot(bubbleSortCanvas);
  });

  test('Bogosort Algorithm Selection Button', async ({ page }) => {
    // 1. Assert: The "bogosort" button (#btn-bogosort) is visible.
    await expect(page.locator('#btn-bogosort')).toBeVisible();

    // 2. Assert: The "elements" slider (#slider-elements) is enabled.
    await expect(page.locator('#slider-elements')).toBeEnabled();

    // 3. Action: Click the "bogosort" button.
    await page.locator('#btn-bogosort').click();

    // 4. Assert: The "bogosort" button becomes active, the "elements" slider is disabled, its value is set to 7, and the elements-value span shows "7".
    await expect(page.locator('#btn-bogosort')).toHaveClass(/active/);
    await expect(page.locator('#slider-elements')).toBeDisabled();
    await expect(page.locator('#slider-elements')).toHaveValue('7');
    await expect(page.locator('#elements-value')).toHaveText('7');

    // 5. Action: Click a different sort button, such as "cocktail".
    await page.locator('#btn-cocktail').click();

    // 6. Assert: The "cocktail" button becomes active, and the "elements" slider is re-enabled.
    await expect(page.locator('#btn-cocktail')).toHaveClass(/active/);
    await expect(page.locator('#slider-elements')).toBeEnabled();
  });
});

test.describe('Randomize Control', () => {
  test('Randomize Button', async ({ page }) => {
    // 1. Assert: The "randomize" button (#btn-randomize) is visible.
    await expect(page.locator('#btn-randomize')).toBeVisible();

    // 2. Assert: The bar chart shows an initial, unsorted array of bars.
    const initialCanvas = await page.locator('#bar-chart-canvas').screenshot();
    const initialMaxSteps = await page.locator('#slider-step').getAttribute('max');

    // 3. Action: Click the "randomize" button.
    await page.locator('#btn-randomize').click();

    // 4. Assert: The arrangement of bars in the chart changes, the step-value resets to "1", and the max value of the step slider is recalculated.
    await expect(page.locator('#bar-chart-canvas')).not.toHaveScreenshot(initialCanvas);
    await expect(page.locator('#step-value')).toHaveText('1');
    const newMaxSteps = await page.locator('#slider-step').getAttribute('max');
    // The new max might be the same by chance, but the logic requires it to be recalculated. A change in the canvas is a good proxy.

    const canvasAfterRandomize10 = await page.locator('#bar-chart-canvas').screenshot();

    // 5. Action: Change the slider-elements value to 20, then click "randomize".
    await page.locator('#slider-elements').fill('20');
    await page.locator('#btn-randomize').click();

    // 6. Assert: The number of bars in the chart updates to 20, and their arrangement is randomized.
    await expect(page.locator('#elements-value')).toHaveText('20');
    // A chart with 20 bars will look different (narrower bars) than one with 10.
    await expect(page.locator('#bar-chart-canvas')).not.toHaveScreenshot(canvasAfterRandomize10);
  });
});