const { test, expect } = require('@playwright/test');

const fileUrl = 'file://' + require('path').resolve(__dirname, '../pages/GasPhaseFugacityCoefficientsForPropylene.html');

test.describe('Gas Phase Fugacity Coefficients for Propylene', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(fileUrl);
    await page.waitForTimeout(500);
  });

  test('SRK Equation of State Button', async ({ page }) => {
    // 1. Assert: The "SRK" button (`btn-srk`) is visible.
    await expect(page.locator('#btn-srk')).toBeVisible();

    // 2. Assert: The "SRK" button has a "selected" style, and the plot displays a red curve.
    await expect(page.locator('#btn-srk')).toHaveCSS('border-color', 'rgb(255, 0, 0)');
    await expect(page.locator('#plot-container .trace.scatter .lines path')).toHaveAttribute('stroke', 'red');

    // 3. Action: Click the "PR" button (`btn-pr`).
    await page.locator('#btn-pr').click();

    // 4. Assert: The "SRK" button no longer has the "selected" style, and the plot curve changes color.
    await expect(page.locator('#btn-srk')).not.toHaveCSS('border-color', 'rgb(255, 0, 0)');
    await expect(page.locator('#plot-container .trace.scatter .lines path')).toHaveAttribute('stroke', 'blue');

    // 5. Action: Click the "SRK" button again.
    await page.locator('#btn-srk').click();

    // 6. Assert: The "SRK" button regains its "selected" style, and the plot curve changes back to its original color.
    await expect(page.locator('#btn-srk')).toHaveCSS('border-color', 'rgb(255, 0, 0)');
    await expect(page.locator('#plot-container .trace.scatter .lines path')).toHaveAttribute('stroke', 'red');
  });

  test('PR Equation of State Button', async ({ page }) => {
    // 1. Assert: The "PR" button (`btn-pr`) is visible.
    await expect(page.locator('#btn-pr')).toBeVisible();

    // 2. Assert: The "PR" button does not have a "selected" style.
    await expect(page.locator('#btn-pr')).not.toHaveCSS('border-color', 'rgb(255, 0, 0)');

    // 3. Action: Click the "PR" button.
    await page.locator('#btn-pr').click();

    // 4. Assert: The "PR" button now has a "selected" style, and the plot curve changes color from red to blue.
    await expect(page.locator('#btn-pr')).toHaveCSS('border-color', 'rgb(255, 0, 0)');
    await expect(page.locator('#plot-container .trace.scatter .lines path')).toHaveAttribute('stroke', 'blue');

    // 5. Action: Click the "SRK" button (`btn-srk`).
    await page.locator('#btn-srk').click();

    // 6. Assert: The "PR" button loses its "selected" style, and the plot curve changes color.
    await expect(page.locator('#btn-pr')).not.toHaveCSS('border-color', 'rgb(255, 0, 0)');
    await expect(page.locator('#plot-container .trace.scatter .lines path')).toHaveAttribute('stroke', 'red');
  });

  test('Aspen Plus Comparison Checkbox', async ({ page }) => {
    // 1. Assert: The "comparison with Aspen Plus" checkbox (`checkbox-aspen`) is visible.
    await expect(page.locator('#checkbox-aspen')).toBeVisible();

    // 2. Assert: The checkbox is checked by default, and green square markers are visible on the plot.
    await expect(page.locator('#checkbox-aspen')).toBeChecked();
    await expect(page.locator('#plot-container .trace.scatter .points path').first()).toBeVisible();
    await expect(page.locator('#plot-container .trace.scatter .points path')).toHaveCount(11);


    // 3. Action: Uncheck the checkbox.
    await page.locator('#checkbox-aspen').uncheck();

    // 4. Assert: The green square markers are no longer visible on the plot.
    await expect(page.locator('#plot-container .trace.scatter .points')).toBeHidden();

    // 5. Action: Check the checkbox again.
    await page.locator('#checkbox-aspen').check();

    // 6. Assert: The green square markers reappear on the plot.
    await expect(page.locator('#plot-container .trace.scatter .points path').first()).toBeVisible();
    await expect(page.locator('#plot-container .trace.scatter .points path')).toHaveCount(11);
  });

  test('Pressure Slider Control', async ({ page }) => {
    // 1. Assert: The pressure slider (`slider-pressure`) is visible.
    await expect(page.locator('#slider-pressure')).toBeVisible();

    // 2. Assert: The slider's value is 10, and the corresponding value display (`display-pressure`) shows "10".
    await expect(page.locator('#slider-pressure')).toHaveValue('10');
    await expect(page.locator('#display-pressure')).toHaveText('10');

    // 3. Action: Drag the slider to a value of 5.
    await page.locator('#slider-pressure').fill('5');

    // 4. Assert: The value display shows "5", and the plot curve's shape is updated.
    await expect(page.locator('#display-pressure')).toHaveText('5');
    // The Aspen trace is hidden when pressure is not 10, confirming the plot updated.
    await expect(page.locator('#plot-container .trace.scatter .points')).toBeHidden();

    // 5. Action: Drag the slider to its maximum value, 20.
    await page.locator('#slider-pressure').fill('20');

    // 6. Assert: The value display shows "20", and the plot curve's shape is updated again.
    await expect(page.locator('#display-pressure')).toHaveText('20');
    await expect(page.locator('#plot-container .trace.scatter .points')).toBeHidden();
  });

});