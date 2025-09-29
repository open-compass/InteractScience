const { test, expect } = require('@playwright/test');
const path = require('path');

const fileUrl = 'file://' + path.resolve(__dirname, '../pages/TimeComplexityOfCommonSortingAlgorithms.html');

test.describe('Time Complexity of Common Sorting Algorithms', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(fileUrl);
    // Wait for Plotly to render the initial plot
    // await page.waitForSelector('#plot-container .plot');
    await page.waitForTimeout(500);
  });

  test('Scale Radio Buttons (`linear`/`logarithmic`)', async ({ page }) => {
    // 1. Assert: The "scale" radio buttons for "linear" and "logarithmic" are visible.
    await expect(page.locator('#radio-scale-linear')).toBeVisible();
    await expect(page.locator('#radio-scale-logarithmic')).toBeVisible();

    // 2. Assert: The "linear" radio button (`id="radio-scale-linear"`) is checked by default.
    await expect(page.locator('#radio-scale-linear')).toBeChecked();

    // 3. Action: Click the "logarithmic" radio button.
    await page.locator('#radio-scale-logarithmic').click();

    // 4. Assert: The plot's y-axis scale changes, showing logarithmic interval labels (e.g., 10, 100, 1000).
    await expect(page.locator('.ytick', { hasText: '100' })).toBeVisible();
    await expect(page.locator('.ytick', { hasText: '1k' })).toBeVisible();

    // 5. Action: Click the "linear" radio button.
    await page.locator('#radio-scale-linear').click();

    // 6. Assert: The plot's y-axis scale reverts to linear, showing linear interval labels (e.g., 100, 200, 300).
    await expect(page.locator('.ytick', { hasText: '100' })).toBeVisible();
    await expect(page.locator('.ytick', { hasText: '200' })).toBeVisible();
    await expect(page.locator('.ytick', { hasText: '300' })).toBeVisible();
  });

  test('Plot Range Radio Buttons (`fixed`/`automatic`)', async ({ page }) => {
    // 1. Assert: The "plot range" radio buttons for "fixed" and "automatic" are visible.
    await expect(page.locator('#radio-range-fixed')).toBeVisible();
    await expect(page.locator('#radio-range-automatic')).toBeVisible();

    // 2. Assert: The "fixed" radio button (`id="radio-range-fixed"`) is checked by default.
    await expect(page.locator('#radio-range-fixed')).toBeChecked();

    // 3. Action: Click the "automatic" radio button.
    await page.locator('#radio-range-automatic').click();

    // 4. Assert: The plot's axes automatically rescale to fit the current data.
    // With default data, the x-axis should not show '20' anymore as it rescales to max 10.
    await expect(page.locator('.xtick', { hasText: '10' })).toBeVisible();
    await expect(page.locator('.xtick', { hasText: '20' })).not.toBeVisible();

    // 5. Action: Click the "fixed" radio button.
    await page.locator('#radio-range-fixed').click();

    // 6. Assert: The plot's axes revert to their fixed initial ranges (x-axis from 0 to 20).
    await expect(page.locator('.xtick', { hasText: '20' })).toBeVisible();
  });

  test('Number of Elements Slider', async ({ page }) => {
    // 1. Assert: The "number of elements" slider (`id="slider-elements"`) is visible.
    await expect(page.locator('#slider-elements')).toBeVisible();

    // 2. Assert: The slider's default value is 10 and the value display (`id="display-elements"`) shows "+ 10".
    await expect(page.locator('#slider-elements')).toHaveValue('10');
    await expect(page.locator('#display-elements')).toHaveText('+ 10');

    // 3. Action: Drag the slider handle to the value 15.
    await page.locator('#slider-elements').fill('15');

    // 4. Assert: The value display updates to "+ 15" and the curves on the plot extend further along the x-axis.
    await expect(page.locator('#display-elements')).toHaveText('+ 15');
    // Check that the x-axis now has a tick for 15
    await expect(page.locator('.xtick', { hasText: '15' })).toBeVisible();


    // 5. Action: Drag the slider handle to its maximum value of 20.
    await page.locator('#slider-elements').fill('20');

    // 6. Assert: The value display updates to "+ 20" and the curves on the plot update accordingly.
    await expect(page.locator('#display-elements')).toHaveText('+ 20');
    await expect(page.locator('.xtick', { hasText: '20' })).toBeVisible();
  });

  test('Bubble Sort Checkbox', async ({ page }) => {
    const bubbleCheckbox = page.locator('#check-bubble');
    const bubbleLegend = page.locator('.legendtext', { hasText: /^bubble$/ });

    // 1. Assert: The "bubble" checkbox (`id="check-bubble"`) is visible.
    await expect(bubbleCheckbox).toBeVisible();

    // 2. Assert: The checkbox is checked by default and a green line representing "bubble" sort is visible on the plot.
    await expect(bubbleCheckbox).toBeChecked();
    await expect(bubbleLegend).toBeVisible();

    // 3. Action: Uncheck the "bubble" checkbox.
    await bubbleCheckbox.uncheck();

    // 4. Assert: The green line disappears from the plot and its entry is removed from the legend.
    await expect(bubbleLegend).toBeHidden();

    // 5. Action: Check the "bubble" checkbox again.
    await bubbleCheckbox.check();

    // 6. Assert: The green line reappears on the plot and in the legend.
    await expect(bubbleLegend).toBeVisible();
  });

  test('Selection Sort Checkbox', async ({ page }) => {
    const selectionCheckbox = page.locator('#check-selection');
    const selectionLegend = page.locator('.legendtext', { hasText: /^selection$/ });

    // 1. Assert: The "selection" checkbox (`id="check-selection"`) is visible.
    await expect(selectionCheckbox).toBeVisible();

    // 2. Assert: The checkbox is checked by default and a dotted orange line representing "selection" sort is visible on the plot.
    await expect(selectionCheckbox).toBeChecked();
    await expect(selectionLegend).toBeVisible();

    // 3. Action: Uncheck the "selection" checkbox.
    await selectionCheckbox.uncheck();

    // 4. Assert: The dotted orange line disappears from the plot and its entry is removed from the legend.
    await expect(selectionLegend).toBeHidden();

    // 5. Action: Check the "selection" checkbox again.
    await selectionCheckbox.check();

    // 6. Assert: The dotted orange line reappears on the plot and in the legend.
    await expect(selectionLegend).toBeVisible();
  });

  test('Insertion Sort Checkbox', async ({ page }) => {
    const insertionCheckbox = page.locator('#check-insertion');
    const insertionLegend = page.locator('.legendtext', { hasText: /^insertion$/ });

    // 1. Assert: The "insertion" checkbox (`id="check-insertion"`) is visible.
    await expect(insertionCheckbox).toBeVisible();

    // 2. Assert: The checkbox is checked by default and a red line representing "insertion" sort is visible on the plot.
    await expect(insertionCheckbox).toBeChecked();
    await expect(insertionLegend).toBeVisible();

    // 3. Action: Uncheck the "insertion" checkbox.
    await insertionCheckbox.uncheck();

    // 4. Assert: The red line disappears from the plot and its entry is removed from the legend.
    await expect(insertionLegend).toBeHidden();

    // 5. Action: Check the "insertion" checkbox again.
    await insertionCheckbox.check();

    // 6. Assert: The red line reappears on the plot and in the legend.
    await expect(insertionLegend).toBeVisible();
  });

  test('Merge Sort Checkbox', async ({ page }) => {
    const mergeCheckbox = page.locator('#check-merge');
    const mergeLegend = page.locator('.legendtext', { hasText: /^merge$/ });

    // 1. Assert: The "merge" checkbox (`id="check-merge"`) is visible.
    await expect(mergeCheckbox).toBeVisible();

    // 2. Assert: The checkbox is unchecked by default.
    await expect(mergeCheckbox).not.toBeChecked();
    await expect(mergeLegend).toBeHidden();

    // 3. Action: Check the "merge" checkbox.
    await mergeCheckbox.check();

    // 4. Assert: A new blue line appears on the plot and a "merge" entry is added to the legend.
    await expect(mergeLegend).toBeVisible();

    // 5. Action: Uncheck the "merge" checkbox.
    await mergeCheckbox.uncheck();

    // 6. Assert: The blue line disappears from the plot and its entry is removed from the legend.
    await expect(mergeLegend).toBeHidden();
  });

  test('Quick Sort Checkbox', async ({ page }) => {
    const quickCheckbox = page.locator('#check-quick');
    const quickLegend = page.locator('.legendtext', { hasText: /^quick$/ });

    // 1. Assert: The "quick" checkbox (`id="check-quick"`) is visible.
    await expect(quickCheckbox).toBeVisible();

    // 2. Assert: The checkbox is unchecked by default.
    await expect(quickCheckbox).not.toBeChecked();
    await expect(quickLegend).toBeHidden();

    // 3. Action: Check the "quick" checkbox.
    await quickCheckbox.check();

    // 4. Assert: A new purple line appears on the plot and a "quick" entry is added to the legend.
    await expect(quickLegend).toBeVisible();

    // 5. Action: Uncheck the "quick" checkbox.
    await quickCheckbox.uncheck();

    // 6. Assert: The purple line disappears from the plot and its entry is removed from the legend.
    await expect(quickLegend).toBeHidden();
  });

  test('Heap Sort Checkbox', async ({ page }) => {
    const heapCheckbox = page.locator('#check-heap');
    const heapLegend = page.locator('.legendtext', { hasText: /^heap$/ });

    // 1. Assert: The "heap" checkbox (`id="check-heap"`) is visible.
    await expect(heapCheckbox).toBeVisible();

    // 2. Assert: The checkbox is unchecked by default.
    await expect(heapCheckbox).not.toBeChecked();
    await expect(heapLegend).toBeHidden();

    // 3. Action: Check the "heap" checkbox.
    await heapCheckbox.check();

    // 4. Assert: A new cyan line appears on the plot and a "heap" entry is added to the legend.
    await expect(heapLegend).toBeVisible();

    // 5. Action: Uncheck the "heap" checkbox.
    await heapCheckbox.uncheck();

    // 6. Assert: The cyan line disappears from the plot and its entry is removed from the legend.
    await expect(heapLegend).toBeHidden();
  });

  test('Bogo Sort Checkbox', async ({ page }) => {
    const bogoCheckbox = page.locator('#check-bogo');
    const insertionCheckbox = page.locator('#check-insertion');
    const insertionLegend = page.locator('.legendtext', { hasText: /^insertion$/ });

    // 1. Assert: The "bogo" checkbox (`id="check-bogo"`) is visible.
    await expect(bogoCheckbox).toBeVisible();

    // 2. Assert: The checkbox is unchecked by default.
    await expect(bogoCheckbox).not.toBeChecked();
    // At this point insertion is checked by default, so the legend is visible
    await expect(insertionLegend).toBeVisible();

    // 3. Action: Uncheck "insertion", then check the "bogo" checkbox.
    await insertionCheckbox.uncheck();
    await expect(insertionLegend).toBeHidden(); // Verify it disappears first
    await bogoCheckbox.check();

    // 4. Assert: The red line appears on the plot with an "insertion" label in the legend.
    await expect(insertionLegend).toBeVisible();

    // 5. Action: Uncheck the "bogo" checkbox.
    await bogoCheckbox.uncheck();

    // 6. Assert: The red line disappears from the plot and legend.
    await expect(insertionLegend).toBeHidden();
  });
});