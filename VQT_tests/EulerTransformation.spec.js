const { test, expect } = require('@playwright/test');

const fileUrl = 'file://' + require('path').resolve(__dirname, '../pages/EulerTransformation.html');

test.describe('Euler Transformation Interactive Demo', () => {

  test('Initial view of the demo with default settings', async ({ page }) => {
    // Action: Load the page.
    await page.goto(fileUrl);
    // Assert: Take a screenshot of the current UI state.
    await page.screenshot({ path: './snapshots/EulerTransformation-1.png', fullPage: true });
  });

  test('Display of the ln(2) series with 50 terms and 3 Euler transformations', async ({ page }) => {
    await page.goto(fileUrl);
    // Action: Drag the "number of terms" slider (`#slider-terms`) to the maximum position (value 50).
    await page.locator('#slider-terms').fill('50');
    // Action: Click the radio button with the label "3" in the "repeated Euler transformations" group (`#radio-euler-3`).
    await page.locator('#radio-euler-3').click();
    // Action: Click the radio button with the label "ln(2)" in the "limit of infinite sequence" group (`#radio-series-ln2`).
    await page.locator('#radio-series-ln2').click();
    // Assert: Take a screenshot of the current UI state.
    await page.screenshot({ path: './snapshots/EulerTransformation-2.png', fullPage: true });
  });

  test('Display of the π series with 4 terms and 2 Euler transformations', async ({ page }) => {
    await page.goto(fileUrl);
    // Action: Drag the "number of terms" slider (`#slider-terms`) to the value 4.
    await page.locator('#slider-terms').fill('4');
    // Action: Click the radio button with the label "2" in the "repeated Euler transformations" group (`#radio-euler-2`).
    await page.locator('#radio-euler-2').click();
    // Assert: Take a screenshot of the current UI state.
    await page.screenshot({ path: './snapshots/EulerTransformation-3.png', fullPage: true });
  });

  test('Display of the √2 series with 9 terms and 1 Euler transformation', async ({ page }) => {
    await page.goto(fileUrl);
    // Action: Drag the "number of terms" slider (`#slider-terms`) to the value 9.
    await page.locator('#slider-terms').fill('9');
    // Action: Click the radio button with the label "1" in the "repeated Euler transformations" group (`#radio-euler-1`).
    await page.locator('#radio-euler-1').click();
    // Action: Click the radio button with the label "√2" in the "limit of infinite sequence" group (`#radio-series-sqrt2`).
    await page.locator('#radio-series-sqrt2').click();
    // Assert: Take a screenshot of the current UI state.
    await page.screenshot({ path: './snapshots/EulerTransformation-4.png', fullPage: true });
  });

});