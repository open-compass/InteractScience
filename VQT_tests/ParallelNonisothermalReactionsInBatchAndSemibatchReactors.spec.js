const { test, expect } = require('@playwright/test');
const path = require('path');

const fileUrl = 'file://' + path.resolve(__dirname, '../pages/ParallelNonisothermalReactionsInBatchAndSemibatchReactors.html');

test.describe('Parallel Nonisothermal Reactions in Batch and Semibatch Reactors', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(fileUrl);
    // Wait for the canvas to be available, which indicates p5.js has likely initialized.
    // await page.waitForSelector('#plot-canvas');
  });

  test('Initial state showing semibatch plot with \'feed A to B\'', async ({ page }) => {
    // Assert: Take a screenshot of the initial UI state.
    await page.screenshot({ path: './snapshots/ParallelNonisothermalReactionsInBatchAndSemibatchReactors-1.png', fullPage: true });
  });

  test('Semibatch plot showing \'feed B to A\' configuration', async ({ page }) => {
    // Action: Click the up arrow button (▲) next to the feed configuration display.
    await page.locator('#btn-feed-up').click();
    
    // Assert: Take a screenshot of the current UI state.
    await page.screenshot({ path: './snapshots/ParallelNonisothermalReactionsInBatchAndSemibatchReactors-2.png', fullPage: true });
  });

  test('Selectivity ratio plot for \'feed A to B\' configuration', async ({ page }) => {
    // Action: Click the plot type dropdown with the current value "semibatch".
    // Action: Select the "selectivity" option from the dropdown.
    await page.locator('#select-plot').selectOption('selectivity');
    
    // Assert: Take a screenshot of the current UI state.
    await page.screenshot({ path: './snapshots/ParallelNonisothermalReactionsInBatchAndSemibatchReactors-3.png', fullPage: true });
  });

});