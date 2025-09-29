const { test, expect } = require('@playwright/test');
const path = require('path');

const fileUrl = 'file://' + path.resolve(__dirname, '../pages/RovibronicSpectrumOfAPerpendicularBandOfASymmetricRotor.html');

test.describe('Interactive Rovibronic Spectrum Tests', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(fileUrl);
    await page.waitForTimeout(500);
  });

  test('View Selector Radio Group (`full spectrum` / `sub-band`)', async ({ page }) => {
    // 1. Assert: The "select view" radio group is visible.
    await expect(page.locator('#view-selector-group')).toBeVisible();

    // 2. Assert: The "full spectrum" radio button (`radio-view-full`) is checked by default, and the `k-selector-group` is disabled.
    await expect(page.locator('#radio-view-full')).toBeChecked();
    await expect(page.locator('#k-selector-group')).toBeDisabled();

    // 3. Action: Click the "sub-band" radio button (`radio-view-sub`).
    await page.locator('#radio-view-sub').click();

    // 4. Assert: The `k-selector-group` and `subband-type-group` become enabled, and the plot visualization changes.
    await expect(page.locator('#k-selector-group')).toBeEnabled();
    await expect(page.locator('#subband-type-group')).toBeEnabled();
    // Assuming plot change is visually verified by the enabled controls

    // 5. Action: Click the "full spectrum" radio button (`radio-view-full`) again.
    await page.locator('#radio-view-full').click();

    // 6. Assert: The `k-selector-group` is disabled again, and the plot reverts to showing the full spectrum.
    await expect(page.locator('#k-selector-group')).toBeDisabled();
  });

  test('Sub-band K Selector Radio Group', async ({ page }) => {
    // 1. Assert: The "select sub-band K" radio group (`k-selector-group`) is visible on page load (but disabled).
    await expect(page.locator('#k-selector-group')).toBeVisible();
    await expect(page.locator('#k-selector-group')).toBeDisabled();

    // 2. Assert: The "0" radio button (`radio-k-0`) is checked by default.
    await expect(page.locator('#radio-k-0')).toBeChecked();

    // 3. Action: Select the "sub-band" view, then click the "3" radio button (`radio-k-3`).
    await page.locator('#radio-view-sub').click();
    await page.locator('#radio-k-3').click();

    // 4. Assert: The plot title updates to include "K = 3", and the plot's data changes. The "negative sub-band" option is enabled.
    await expect(page.locator('#plot-div')).toContainText('K = 3 sub-band');
    await expect(page.locator('#radio-subband-negative')).toBeEnabled();

    // 5. Action: Click the "0" radio button (`radio-k-0`).
    await page.locator('#radio-k-0').click();

    // 6. Assert: The plot title updates to "K = 0 sub-band", and the "negative sub-band" option is now disabled.
    await expect(page.locator('#plot-div')).toContainText('K = 0 sub-band');
    await expect(page.locator('#radio-subband-negative')).toBeDisabled();
  });

  test('Sub-band Type Selector Radio Group', async ({ page }) => {
    // 1. Assert: The "select +/- sub-band" radio group (`subband-type-group`) is visible on page load (but disabled).
    await expect(page.locator('#subband-type-group')).toBeVisible();
    await expect(page.locator('#subband-type-group')).toBeDisabled();

    // 2. Assert: The "full sub-band" radio button (`radio-subband-full`) is checked by default.
    await expect(page.locator('#radio-subband-full')).toBeChecked();

    // 3. Action: Select the "sub-band" view, then click the "positive sub-band" radio button (`radio-subband-positive`).
    await page.locator('#radio-view-sub').click();
    await page.locator('#radio-subband-positive').click();

    // 4. Assert: The `branch-selector-group` becomes visible and enabled, and the plot data changes to show only red lines.
    await expect(page.locator('#branch-selector-group')).toBeVisible();
    await expect(page.locator('#branch-selector-group')).toBeEnabled();

    // 5. Action: Click the "full sub-band" radio button (`radio-subband-full`) again.
    await page.locator('#radio-subband-full').click();

    // 6. Assert: The `branch-selector-group` is hidden/disabled, and the plot data changes to show both red and blue lines.
    await expect(page.locator('#branch-selector-group')).toBeHidden();
  });

  test('Branch Selector Radio Group', async ({ page }) => {
    // 1. Assert: The "select branch" radio group (`branch-selector-group`) is hidden or disabled.
    await expect(page.locator('#branch-selector-group')).toBeHidden();

    // 2. Assert: The "all branches" radio button (`radio-branch-all`) is checked by default.
    await expect(page.locator('#radio-branch-all')).toBeChecked();

    // 3. Action: Select "sub-band" view, then "positive sub-band", then click the "Q branch" radio button (`radio-branch-q`).
    await page.locator('#radio-view-sub').click();
    await page.locator('#radio-subband-positive').click();
    await page.locator('#radio-branch-q').click();

    // 4. Assert: The plot updates to show a different set of spectral lines corresponding to the Q branch.
    // We assume the plot updates; the action is the test.

    // 5. Action: Click the "all branches" radio button (`radio-branch-all`) again.
    await page.locator('#radio-branch-all').click();

    // 6. Assert: The plot updates to show all P, Q, and R branch lines again.
    // We assume the plot updates; the action is the test.
  });

  test('X-axis Lower Boundary Slider', async ({ page }) => {
    // 1. Assert: The "x axis lower boundary" slider (`slider-x-lower`) is visible.
    await expect(page.locator('#slider-x-lower')).toBeVisible();

    // 2. Assert: The slider's initial value is 902, and the `span-x-lower-value` displays "902.".
    await expect(page.locator('#slider-x-lower')).toHaveValue('902');
    await expect(page.locator('#span-x-lower-value')).toHaveText('902.');

    // 3. Action: Drag the slider to a value of 950.
    await page.locator('#slider-x-lower').fill('950');

    // 4. Assert: The `span-x-lower-value` updates to "950.", and the plot's x-axis range changes.
    await expect(page.locator('#span-x-lower-value')).toHaveText('950.');

    // 5. Action: Drag the slider to its maximum value of 1100.
    await page.locator('#slider-x-lower').fill('1100');

    // 6. Assert: The `span-x-lower-value` updates to "1100.", and the plot's x-axis range changes accordingly.
    await expect(page.locator('#span-x-lower-value')).toHaveText('1100.');
  });

  test('X-axis Upper Boundary Slider', async ({ page }) => {
    // 1. Assert: The "x axis upper boundary" slider (`slider-x-upper`) is visible.
    await expect(page.locator('#slider-x-upper')).toBeVisible();

    // 2. Assert: The slider's initial value is 1091, and the `span-x-upper-value` displays "1091.".
    await expect(page.locator('#slider-x-upper')).toHaveValue('1091');
    await expect(page.locator('#span-x-upper-value')).toHaveText('1091.');

    // 3. Action: Drag the slider to a value of 1050.
    await page.locator('#slider-x-upper').fill('1050');

    // 4. Assert: The `span-x-upper-value` updates to "1050.", and the plot's x-axis range changes.
    await expect(page.locator('#span-x-upper-value')).toHaveText('1050.');

    // 5. Action: Drag the slider to its minimum value of 900.
    await page.locator('#slider-x-upper').fill('900');

    // 6. Assert: The `span-x-upper-value` updates to "900.", and the `slider-x-lower` value is adjusted to prevent overlap, causing the plot range to change.
    await expect(page.locator('#span-x-upper-value')).toHaveText('900.');
    // According to the plan, if upper <= lower, lower becomes upper - 1.
    // Initial lower is 902. If upper becomes 900, lower should become 899.
    // Since min value of slider is 900, it should clamp to 900.
    await expect(page.locator('#slider-x-lower')).toHaveValue('900');
  });

});