const { test, expect } = require('@playwright/test');

const fileUrl = 'file://' + require('path').resolve(__dirname, '../pages/QuantumComputerSearchAlgorithms.html');

test.describe('Algorithm Selector Buttons', () => {
  test('Algorithm Selector Buttons', async ({ page }) => {
    await page.goto(fileUrl);
    await page.waitForTimeout(500);

    // 1. Assert: The four algorithm buttons ("unstructured", "adiabatic", "discrete adiabatic", "heuristic") are visible.
    await expect(page.locator('#btn-unstructured')).toBeVisible();
    await expect(page.locator('#btn-adiabatic')).toBeVisible();
    await expect(page.locator('#btn-discrete-adiabatic')).toBeVisible();
    await expect(page.locator('#btn-heuristic')).toBeVisible();

    // 2. Assert: The "heuristic" button is active by default.
    await expect(page.locator('#btn-heuristic')).toHaveClass(/active/);
    await expect(page.locator('#slider-total-steps')).toHaveValue('10');

    // Capture initial plot states
    const initialAmplitudesHTML = await page.locator('#plot-amplitudes').innerHTML();
    const initialProbabilityHTML = await page.locator('#plot-probability').innerHTML();

    // 3. Action: Click the "adiabatic" button.
    await page.locator('#btn-adiabatic').click();

    // 4. Assert: The "adiabatic" button becomes active, the "number of steps" slider value changes to 200, and both plots update.
    await expect(page.locator('#btn-adiabatic')).toHaveClass(/active/);
    await expect(page.locator('#btn-heuristic')).not.toHaveClass(/active/);
    await expect(page.locator('#slider-total-steps')).toHaveValue('200');
    await expect(page.locator('#display-total-steps')).toHaveText('200');

    // Assert plots updated by checking that their content has changed
    await expect(page.locator('#plot-amplitudes')).not.toHaveInnerHTML(initialAmplitudesHTML);
    await expect(page.locator('#plot-probability')).not.toHaveInnerHTML(initialProbabilityHTML);

    const adiabaticAmplitudesHTML = await page.locator('#plot-amplitudes').innerHTML();
    const adiabaticProbabilityHTML = await page.locator('#plot-probability').innerHTML();

    // 5. Action: Click the "heuristic" button again.
    await page.locator('#btn-heuristic').click();

    // 6. Assert: The "heuristic" button becomes active, the "number of steps" slider value changes to 10, and both plots update.
    await expect(page.locator('#btn-heuristic')).toHaveClass(/active/);
    await expect(page.locator('#btn-adiabatic')).not.toHaveClass(/active/);
    await expect(page.locator('#slider-total-steps')).toHaveValue('10');
    await expect(page.locator('#display-total-steps')).toHaveText('10');
    await expect(page.locator('#plot-amplitudes')).not.toHaveInnerHTML(adiabaticAmplitudesHTML);
    await expect(page.locator('#plot-probability')).not.toHaveInnerHTML(adiabaticProbabilityHTML);
  });
});

test.describe('Total Steps Slider', () => {
  test('Total Steps Slider', async ({ page }) => {
    await page.goto(fileUrl);

    // 1. Assert: The "number of steps to complete the search" slider is visible.
    await expect(page.locator('#slider-total-steps')).toBeVisible();

    // 2. Assert: The slider's value is 10, and its associated display span shows "10".
    await expect(page.locator('#slider-total-steps')).toHaveValue('10');
    await expect(page.locator('#display-total-steps')).toHaveText('10');

    const initialAmplitudesHTML = await page.locator('#plot-amplitudes').innerHTML();
    const initialProbabilityHTML = await page.locator('#plot-probability').innerHTML();

    // 3. Action: Drag the slider handle to a value of 100.
    await page.locator('#slider-total-steps').fill('100');

    // 4. Assert: The display span updates to "100", the "current step" slider's max value becomes 100, and both plots update.
    await expect(page.locator('#display-total-steps')).toHaveText('100');
    await expect(page.locator('#slider-current-step')).toHaveAttribute('max', '100');
    await expect(page.locator('#plot-amplitudes')).not.toHaveInnerHTML(initialAmplitudesHTML);
    await expect(page.locator('#plot-probability')).not.toHaveInnerHTML(initialProbabilityHTML);

    const midAmplitudesHTML = await page.locator('#plot-amplitudes').innerHTML();
    const midProbabilityHTML = await page.locator('#plot-probability').innerHTML();

    // 5. Action: Drag the slider handle to its minimum value of 1.
    await page.locator('#slider-total-steps').fill('1');

    // 6. Assert: The display span updates to "1", the "current step" slider's max value becomes 1, and both plots update.
    await expect(page.locator('#display-total-steps')).toHaveText('1');
    await expect(page.locator('#slider-current-step')).toHaveAttribute('max', '1');
    await expect(page.locator('#plot-amplitudes')).not.toHaveInnerHTML(midAmplitudesHTML);
    await expect(page.locator('#plot-probability')).not.toHaveInnerHTML(midProbabilityHTML);
  });
});

test.describe('Current Step Slider', () => {
  test('Current Step Slider', async ({ page }) => {
    await page.goto(fileUrl);

    // 1. Assert: The "current step" slider is visible.
    await expect(page.locator('#slider-current-step')).toBeVisible();

    // 2. Assert: The slider's value is 0, its display span shows "0", and its max value is 10.
    await expect(page.locator('#slider-current-step')).toHaveValue('0');
    await expect(page.locator('#display-current-step')).toHaveText('0');
    await expect(page.locator('#slider-current-step')).toHaveAttribute('max', '10');

    const initialAmplitudesHTML = await page.locator('#plot-amplitudes').innerHTML();
    const initialProbabilityHTML = await page.locator('#plot-probability').innerHTML();

    // 3. Action: Drag the slider handle to a value of 5.
    await page.locator('#slider-current-step').fill('5');

    // 4. Assert: The display span updates to "5", and the data points in both plots change.
    await expect(page.locator('#display-current-step')).toHaveText('5');
    await expect(page.locator('#plot-amplitudes')).not.toHaveInnerHTML(initialAmplitudesHTML);
    await expect(page.locator('#plot-probability')).not.toHaveInnerHTML(initialProbabilityHTML);

    const midAmplitudesHTML = await page.locator('#plot-amplitudes').innerHTML();
    const midProbabilityHTML = await page.locator('#plot-probability').innerHTML();

    // 5. Action: Drag the slider handle to its maximum value of 10.
    await page.locator('#slider-current-step').fill('10');

    // 6. Assert: The display span updates to "10", and the data points in both plots change again.
    await expect(page.locator('#display-current-step')).toHaveText('10');
    await expect(page.locator('#plot-amplitudes')).not.toHaveInnerHTML(midAmplitudesHTML);
    await expect(page.locator('#plot-probability')).not.toHaveInnerHTML(midProbabilityHTML);
  });
});

test.describe('Probability Plot Mode Buttons', () => {
  test('Probability Plot Mode Buttons', async ({ page }) => {
    await page.goto(fileUrl);

    // 1. Assert: The "conflicts" and "eigenvalues" buttons are visible inside the right plot area.
    await expect(page.locator('#btn-conflicts')).toBeVisible();
    await expect(page.locator('#btn-eigenvalues')).toBeVisible();

    // 2. Assert: The "conflicts" button is active by default, and the right plot's x-axis is labeled "number of conflicts".
    await expect(page.locator('#btn-conflicts')).toHaveClass(/active/);
    await expect(page.locator('#plot-probability .xaxislayer-above .xtitle')).toHaveText('number of conflicts');

    // 3. Action: Click the "eigenvalues" button.
    await page.locator('#btn-eigenvalues').click();

    // 4. Assert: The "eigenvalues" button becomes active, and the right plot's x-axis label changes to "eigenvalue".
    await expect(page.locator('#btn-eigenvalues')).toHaveClass(/active/);
    await expect(page.locator('#btn-conflicts')).not.toHaveClass(/active/);
    await expect(page.locator('#plot-probability .xaxislayer-above .xtitle')).toHaveText('eigenvalue');

    // 5. Action: Click the "conflicts" button again.
    await page.locator('#btn-conflicts').click();

    // 6. Assert: The "conflicts" button becomes active, and the right plot's x-axis label changes back to "number of conflicts".
    await expect(page.locator('#btn-conflicts')).toHaveClass(/active/);
    await expect(page.locator('#btn-eigenvalues')).not.toHaveClass(/active/);
    await expect(page.locator('#plot-probability .xaxislayer-above .xtitle')).toHaveText('number of conflicts');
  });
});