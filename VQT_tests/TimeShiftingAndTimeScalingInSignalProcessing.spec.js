const { test, expect } = require('@playwright/test');

test.describe('Time Shifting and Time Scaling in Signal Processing', () => {
  const fileUrl = 'file://' + require('path').resolve(__dirname, '../pages/TimeShiftingAndTimeScalingInSignalProcessing.html');

  test.beforeEach(async ({ page }) => {
    await page.goto(fileUrl);
    // Wait for Plotly to render the graphs
    // await page.waitForSelector('#plot-top .plot-container');
    // await page.waitForSelector('#plot-bottom .plot-container');
  });

  test('Default view with Triangle signal', async ({ page }) => {
    // Assert: Take a screenshot of the current UI state
    await page.screenshot({ path: './snapshots/TimeShiftingAndTimeScalingInSignalProcessing-1.png', fullPage: true });
  });

  test('View with StairStep signal selected', async ({ page }) => {
    // Action: Click the "StairStep" button.
    await page.locator('#btn-stairstep').click();
    // Assert: Take a screenshot of the current UI state
    await page.screenshot({ path: './snapshots/TimeShiftingAndTimeScalingInSignalProcessing-2.png', fullPage: true });
  });

  test('View with StairStep signal selected again', async ({ page }) => {
    // Action: Click the "StairStep" button.
    await page.locator('#btn-stairstep').click();
    // Assert: Take a screenshot of the current UI state
    await page.screenshot({ path: './snapshots/TimeShiftingAndTimeScalingInSignalProcessing-3.png', fullPage: true });
  });

  test('View with UH signal and only y(t) displayed', async ({ page }) => {
    // Action: Click the "UH" button.
    await page.locator('#btn-uh').click();
    // Action: Uncheck the checkbox with the label `\(x(t)\)`.
    await page.locator('#check-x').uncheck();
    // Action: Uncheck the checkbox with the label `\(z(t) = x(t - b)\)`.
    await page.locator('#check-z').uncheck();
    // Assert: Take a screenshot of the current UI state
    await page.screenshot({ path: './snapshots/TimeShiftingAndTimeScalingInSignalProcessing-4.png', fullPage: true });
  });
});