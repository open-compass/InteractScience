const { test, expect } = require('@playwright/test');

const fileUrl = 'file://' + require('path').resolve(__dirname, '../pages/CalculationsForReducedCarbonEmissions.html');

test.describe('CalculationsForReducedCarbonEmissions', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(fileUrl);
    await page.waitForTimeout(500);
  });

  test('Scale Switch Functionality', async ({ page }) => {
    // 1. Assert: The `scale-switch` control with "population" and "individual" radio buttons is visible.
    await expect(page.locator('#scale-switch')).toBeVisible();

    // 2. Assert: The "individual" option is selected by default, and the "average city population (k)" slider is disabled.
    await expect(page.locator('#scale-individual')).toBeChecked();
    await expect(page.locator('#slider-population')).toBeDisabled();

    // 3. Action: Click the "population" radio button.
    await page.locator('label[for="scale-population"]').click();

    // 4. Assert: The "average city population (k)" slider is enabled, and the main plot's Y-axis label changes to include "mil tons".
    await expect(page.locator('#slider-population')).toBeEnabled();
    // Note: Asserting text on a canvas element requires visual regression testing, which is beyond the scope of this test.

    // 5. Action: Click the "individual" radio button again.
    await page.locator('label[for="scale-individual"]').click();

    // 6. Assert: The "average city population (k)" slider is disabled, and the main plot's Y-axis label changes back to "tons".
    await expect(page.locator('#slider-population')).toBeDisabled();
    // Note: Asserting text on a canvas element requires visual regression testing.
  });

  test('Average City Population Slider', async ({ page }) => {
    // 1. Assert: The "average city population (k)" slider (`slider-population`) is visible and disabled.
    await expect(page.locator('#slider-population')).toBeVisible();
    await expect(page.locator('#slider-population')).toBeDisabled();

    // 2. Assert: The slider's value display (`#value-population`) shows the default value "250".
    await expect(page.locator('#value-population')).toHaveText('250');

    // 3. Action: Select the "population" scale, then drag the population slider to a new value (e.g., 500).
    await page.locator('label[for="scale-population"]').click();
    await page.locator('#slider-population').fill('500');

    // 4. Assert: The slider's value display updates to "500", and the main plot and budget circles are redrawn.
    await expect(page.locator('#value-population')).toHaveText('500');

    // 5. Action: Drag the slider to its maximum value (1000).
    await page.locator('#slider-population').fill('1000');

    // 6. Assert: The slider's value display shows "1000", and the main plot and budget circles are redrawn.
    await expect(page.locator('#value-population')).toHaveText('1000');
  });

  test('Type Switch Functionality (Emissions/Costs)', async ({ page }) => {
    // 1. Assert: The `type-switch` control with "emissions" and "costs" radio buttons is visible.
    await expect(page.locator('#type-switch')).toBeVisible();

    // 2. Assert: The "emissions" option is selected by default, and the main plot shows emission-related graphs.
    await expect(page.locator('#type-emissions')).toBeChecked();

    // 3. Action: Click the "costs" radio button.
    await page.locator('label[for="type-costs"]').click();

    // 4. Assert: The main plot updates to display a cost-related graph, and its y-axis label changes to "annual personal compensation costs ($)".
    await expect(page.locator('#type-costs')).toBeChecked();
    // Note: Asserting plot content and labels on a canvas requires visual regression testing.

    // 5. Action: Click the "emissions" radio button again.
    await page.locator('label[for="type-emissions"]').click();

    // 6. Assert: The main plot reverts to showing the emissions graph.
    await expect(page.locator('#type-emissions')).toBeChecked();
  });

  test('Annual CO2 Emissions Per Person Slider', async ({ page }) => {
    // 1. Assert: The "annual CO2 emissions per person (tons/year)" slider (`slider-annual-emissions`) is visible.
    await expect(page.locator('#slider-annual-emissions')).toBeVisible();

    // 2. Assert: The slider's value display (`#value-annual-emissions`) shows the default value "14".
    await expect(page.locator('#value-annual-emissions')).toHaveText('14');

    // 3. Action: Drag the slider to a different value (e.g., 10).
    await page.locator('#slider-annual-emissions').fill('10');

    // 4. Assert: The value display updates to "10", and the starting point of the "real CO₂ emissions" line on the main plot is lowered.
    await expect(page.locator('#value-annual-emissions')).toHaveText('10');

    // 5. Action: Drag the slider to its maximum value (25).
    await page.locator('#slider-annual-emissions').fill('25');

    // 6. Assert: The value display shows "25", and the "real CO₂ emissions" line on the main plot starts at a higher point.
    await expect(page.locator('#value-annual-emissions')).toHaveText('25');
  });

  test('Reduction Time Slider', async ({ page }) => {
    // 1. Assert: The "reduction time until 50% emissions (years)" slider (`slider-reduction-time`) is visible.
    await expect(page.locator('#slider-reduction-time')).toBeVisible();

    // 2. Assert: The slider's value display (`#value-reduction-time`) shows the default value "20".
    await expect(page.locator('#value-reduction-time')).toHaveText('20');

    // 3. Action: Drag the slider to a higher value (e.g., 40).
    await page.locator('#slider-reduction-time').fill('40');

    // 4. Assert: The value display updates to "40", and the slope of the "real CO₂ emissions" curve on the main plot becomes less steep.
    await expect(page.locator('#value-reduction-time')).toHaveText('40');

    // 5. Action: Drag the slider to its minimum value (5).
    await page.locator('#slider-reduction-time').fill('5');

    // 6. Assert: The value display shows "5", and the slope of the "real CO₂ emissions" curve becomes steeper.
    await expect(page.locator('#value-reduction-time')).toHaveText('5');
  });

  test('Annual CO2 Budget Per Person Slider', async ({ page }) => {
    // 1. Assert: The "annual CO2 budget per person (tons/year)" slider (`slider-annual-budget`) is visible.
    await expect(page.locator('#slider-annual-budget')).toBeVisible();

    // 2. Assert: The slider's value display (`#value-annual-budget`) shows the default value "1.5".
    await expect(page.locator('#value-annual-budget')).toHaveText(/^1\.50*$/);

    // 3. Action: Drag the slider to a higher value (e.g., 3.0).
    await page.locator('#slider-annual-budget').fill('3');

    // 4. Assert: The value display updates to "3.0", and the numerical values inside the budget circles change.
    await expect(page.locator('#value-annual-budget')).toHaveText(/^3\.00*$/);

    // 5. Action: Drag the slider to its minimum value (0).
    await page.locator('#slider-annual-budget').fill('0');

    // 6. Assert: The value display shows "0", and the values inside the budget circles change again.
    await expect(page.locator('#value-annual-budget')).toHaveText('0');
  });

  test('Start of Action Year Slider', async ({ page }) => {
    // 1. Assert: The "start of action" slider (`slider-start-year`) is visible.
    await expect(page.locator('#slider-start-year')).toBeVisible();

    // 2. Assert: The slider's value display (`#value-start-year`) shows the default value "2020".
    await expect(page.locator('#value-start-year')).toHaveText('2020');

    // 3. Action: Drag the slider to a future year (e.g., 2030).
    await page.locator('#slider-start-year').fill('2030');

    // 4. Assert: The value display updates to "2030", and the point on the main plot where the red "real CO₂ emissions" line begins to curve downwards shifts to the right.
    await expect(page.locator('#value-start-year')).toHaveText('2030');

    // 5. Action: Drag the slider back to its minimum value (2020).
    await page.locator('#slider-start-year').fill('2020');

    // 6. Assert: The value display shows "2020", and the red line begins curving down from the start of the plot.
    await expect(page.locator('#value-start-year')).toHaveText('2020');
  });

  test('Compensation Costs Per Ton Slider', async ({ page }) => {
    // 1. Assert: The "compensation costs per ton of CO2 ($/ton)" slider (`slider-compensation-cost`) is visible.
    await expect(page.locator('#slider-compensation-cost')).toBeVisible();

    // 2. Assert: The slider's value display (`#value-compensation-cost`) shows the default value "15".
    await expect(page.locator('#value-compensation-cost')).toHaveText('15');

    // 3. Action: Switch to the "costs" view, then drag the slider to a higher value (e.g., 50).
    await page.locator('label[for="type-costs"]').click();
    await page.locator('#slider-compensation-cost').fill('50');

    // 4. Assert: The value display updates to "50", and the cost plot's y-axis scale and line values increase.
    await expect(page.locator('#value-compensation-cost')).toHaveText('50');

    // 5. Action: Drag the slider to its minimum value (5).
    await page.locator('#slider-compensation-cost').fill('5');

    // 6. Assert: The value display shows "5", and the cost plot's y-axis scale and line values decrease.
    await expect(page.locator('#value-compensation-cost')).toHaveText('5');
  });

  test('Fractional Compensation Slider', async ({ page }) => {
    // 1. Assert: The "fractional compensation (%)" slider (`slider-fractional-compensation`) is visible.
    await expect(page.locator('#slider-fractional-compensation')).toBeVisible();

    // 2. Assert: The slider's value display (`#value-fractional-compensation`) shows the default value "50".
    await expect(page.locator('#value-fractional-compensation')).toHaveText('50');

    // 3. Action: Drag the slider to a lower value (e.g., 20).
    await page.locator('#slider-fractional-compensation').fill('20');

    // 4. Assert: The value display updates to "20", and the gap between the red and black lines on the main plot narrows.
    await expect(page.locator('#value-fractional-compensation')).toHaveText('20');

    // 5. Action: Drag the slider to its maximum value (100).
    await page.locator('#slider-fractional-compensation').fill('100');

    // 6. Assert: The value display shows "100", and the gap between the red and black lines on the main plot widens.
    await expect(page.locator('#value-fractional-compensation')).toHaveText('100');
  });

  test('Constant Compensation Slider', async ({ page }) => {
    // 1. Assert: The "constant compensation (%)" slider (`slider-constant-compensation`) is visible.
    await expect(page.locator('#slider-constant-compensation')).toBeVisible();

    // 2. Assert: The slider's value display (`#value-constant-compensation`) shows the default value "25".
    await expect(page.locator('#value-constant-compensation')).toHaveText('25');

    // 3. Action: Drag the slider to a higher value (e.g., 60).
    await page.locator('#slider-constant-compensation').fill('60');

    // 4. Assert: The value display updates to "60", and the gap between the red and black lines on the main plot widens.
    await expect(page.locator('#value-constant-compensation')).toHaveText('60');

    // 5. Action: Drag the slider to its minimum value (0).
    await page.locator('#slider-constant-compensation').fill('0');

    // 6. Assert: The value display shows "0", and the gap between the red and black lines narrows.
    await expect(page.locator('#value-constant-compensation')).toHaveText('0');
  });

  test('Climate Neutral Year Buttons', async ({ page }) => {
    // 1. Assert: The "climate neutral" button group (`climate-neutral-buttons`) is visible.
    await expect(page.locator('#climate-neutral-buttons')).toBeVisible();

    // 2. Assert: The "2040" button is active by default, and a vertical marker is shown at the year 2040 on the main plot.
    await expect(page.locator('#btn-neutral-2040')).toHaveClass(/active/);
    // Note: Asserting canvas content (vertical marker) requires visual regression testing.

    // 3. Action: Click the "2030" button.
    await page.locator('#btn-neutral-2030').click();

    // 4. Assert: The "2030" button becomes active, and the vertical marker moves to the year 2030. The label for the "CO₂ emissions until..." line also updates to 2030.
    await expect(page.locator('#btn-neutral-2030')).toHaveClass(/active/);
    await expect(page.locator('#btn-neutral-2040')).not.toHaveClass(/active/);

    // 5. Action: Click the "never" button.
    await page.locator('#btn-neutral-never').click();

    // 6. Assert: The "never" button becomes active, and the vertical marker and its corresponding dashed line are hidden from the plot.
    await expect(page.locator('#btn-neutral-never')).toHaveClass(/active/);
    await expect(page.locator('#btn-neutral-2030')).not.toHaveClass(/active/);
  });
});