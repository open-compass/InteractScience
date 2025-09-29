const { test, expect } = require('@playwright/test');

const fileUrl = 'file://' + require('path').resolve(__dirname, '../pages/RichardsGrowthCurve.html');

test.describe('Richards Growth Curve Interactions', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(fileUrl);
    // Wait for Plotly to render
    // await page.waitForSelector('#plot-container .plot');
    await page.waitForTimeout(500);
  });

  test('Maximum Biomass Slider Interaction', async ({ page }) => {
    // 1. Assert: The "maximum biomass \\(b_{max}\\)" slider (`#slider-bmax`) is visible.
    await expect(page.locator('#slider-bmax')).toBeVisible();

    // 2. Assert: The slider's value is 1566 and its corresponding display (`#value-bmax`) shows "1566".
    await expect(page.locator('#slider-bmax')).toHaveValue('1566');
    await expect(page.locator('#value-bmax')).toHaveText('1566');

    // Capture initial state for comparison
    const initialOrangeCurvePath = await page.locator('#plot-container .plot .traces .trace:nth-child(2) path').getAttribute('d');
    const initialResultsText = await page.locator('#results-display').textContent();

    // 3. Action: Drag the slider to a value of 1244.
    await page.locator('#slider-bmax').fill('1244');

    // 4. Assert: The display (`#value-bmax`) updates to "1244", the orange curve on the plot changes shape, and the "rejuvenation bias (u)" value in the results display is updated.
    await expect(page.locator('#value-bmax')).toHaveText('1244');
    const newOrangeCurvePath1 = await page.locator('#plot-container .plot .traces .trace:nth-child(2) path').getAttribute('d');
    expect(newOrangeCurvePath1).not.toEqual(initialOrangeCurvePath);
    const newResultsText1 = await page.locator('#results-display').textContent();
    expect(newResultsText1).not.toEqual(initialResultsText);

    // Capture state before next action
    const currentOrangeCurvePath = await page.locator('#plot-container .plot .traces .trace:nth-child(2) path').getAttribute('d');
    const currentResultsText = await page.locator('#results-display').textContent();

    // 5. Action: Drag the slider to its maximum value of 2500.
    await page.locator('#slider-bmax').fill('2500');

    // 6. Assert: The display (`#value-bmax`) updates to "2500", the orange curve on the plot changes, and the "site productivity (p)" value in the results display is updated.
    await expect(page.locator('#value-bmax')).toHaveText('2500');
    const newOrangeCurvePath2 = await page.locator('#plot-container .plot .traces .trace:nth-child(2) path').getAttribute('d');
    expect(newOrangeCurvePath2).not.toEqual(currentOrangeCurvePath);
    const newResultsText2 = await page.locator('#results-display').textContent();
    expect(newResultsText2).not.toEqual(currentResultsText);
  });

  test('Initial Biomass Slider Interaction', async ({ page }) => {
    // 1. Assert: The "initial biomass \\(b_0\\)" slider (`#slider-b0`) is visible.
    await expect(page.locator('#slider-b0')).toBeVisible();

    // 2. Assert: The slider's value is 30 and its corresponding display (`#value-b0`) shows "30".
    await expect(page.locator('#slider-b0')).toHaveValue('30');
    await expect(page.locator('#value-b0')).toHaveText('30');

    // Capture initial state
    const initialOrangeCurvePath = await page.locator('#plot-container .plot .traces .trace:nth-child(2) path').getAttribute('d');
    const initialResultsText = await page.locator('#results-display').textContent();

    // 3. Action: Drag the slider to a value of 26.6.
    await page.locator('#slider-b0').fill('26.6');

    // 4. Assert: The display (`#value-b0`) updates to "26.6", the orange curve on the plot changes shape, and the "rejuvenation bias (u)" value in the results display is updated.
    await expect(page.locator('#value-b0')).toHaveText(/^26\.60*$/);
    const newOrangeCurvePath1 = await page.locator('#plot-container .plot .traces .trace:nth-child(2) path').getAttribute('d');
    expect(newOrangeCurvePath1).not.toEqual(initialOrangeCurvePath);
    const newResultsText1 = await page.locator('#results-display').textContent();
    expect(newResultsText1).not.toEqual(initialResultsText);

    // Capture state before next action
    const currentOrangeCurvePath = await page.locator('#plot-container .plot .traces .trace:nth-child(2) path').getAttribute('d');
    const currentResultsText = await page.locator('#results-display').textContent();

    // 5. Action: Drag the slider to its minimum value of 1.
    await page.locator('#slider-b0').fill('1');

    // 6. Assert: The display (`#value-b0`) updates to "1", the orange curve on the plot changes, and the "site productivity (p)" value in the results display is updated.
    await expect(page.locator('#value-b0')).toHaveText('1');
    const newOrangeCurvePath2 = await page.locator('#plot-container .plot .traces .trace:nth-child(2) path').getAttribute('d');
    expect(newOrangeCurvePath2).not.toEqual(currentOrangeCurvePath);
    const newResultsText2 = await page.locator('#results-display').textContent();
    expect(newResultsText2).not.toEqual(currentResultsText);
  });

  test('Intrinsic Growth Rate Slider Interaction', async ({ page }) => {
    // 1. Assert: The "intrinsic growth rate \\(r\\)" slider (`#slider-r`) is visible.
    await expect(page.locator('#slider-r')).toBeVisible();

    // 2. Assert: The slider's value is 0.113 and its corresponding display (`#value-r`) shows "0.113".
    await expect(page.locator('#slider-r')).toHaveValue('0.113');
    await expect(page.locator('#value-r')).toHaveText(/^0\.1130*$/);

    // Capture initial state. Test case specifies checking the blue curve.
    const initialBlueCurvePath = await page.locator('#plot-container .plot .traces .trace:nth-child(3) path').getAttribute('d');
    const initialResultsText = await page.locator('#results-display').textContent();

    // 3. Action: Drag the slider to a value of 0.092.
    await page.locator('#slider-r').fill('0.092');

    // 4. Assert: The display (`#value-r`) updates to "0.092", the blue curve on the plot changes shape, and the "rejuvenation bias (u)" value in the results display is updated.
    await expect(page.locator('#value-r')).toHaveText(/^0\.0920*$/);
    const newBlueCurvePath1 = await page.locator('#plot-container .plot .traces .trace:nth-child(3) path').getAttribute('d');
    expect(newBlueCurvePath1).not.toEqual(initialBlueCurvePath);
    const newResultsText1 = await page.locator('#results-display').textContent();
    expect(newResultsText1).not.toEqual(initialResultsText);

    // Capture state before next action
    const currentBlueCurvePath = await page.locator('#plot-container .plot .traces .trace:nth-child(3) path').getAttribute('d');
    const currentResultsText = await page.locator('#results-display').textContent();

    // 5. Action: Drag the slider to its maximum value of 0.2.
    await page.locator('#slider-r').fill('0.2');

    // 6. Assert: The display (`#value-r`) updates to "0.2", the blue curve on the plot changes, and the "site productivity (p)" value in the results display is updated.
    await expect(page.locator('#value-r')).toHaveText(/^0\.20*$/);
    const newBlueCurvePath2 = await page.locator('#plot-container .plot .traces .trace:nth-child(3) path').getAttribute('d');
    expect(newBlueCurvePath2).not.toEqual(currentBlueCurvePath);
    const newResultsText2 = await page.locator('#results-display').textContent();
    expect(newResultsText2).not.toEqual(currentResultsText);
  });

  test('Shape Exponent Slider Interaction', async ({ page }) => {
    // 1. Assert: The "shape exponent \\(\\beta\\)" slider (`#slider-beta`) is visible.
    await expect(page.locator('#slider-beta')).toBeVisible();

    // 2. Assert: The slider's value is 0.477 and its corresponding display (`#value-beta`) shows "0.477".
    await expect(page.locator('#slider-beta')).toHaveValue('0.477');
    await expect(page.locator('#value-beta')).toHaveText(/^0\.4770*$/);

    // Capture initial state. Test case specifies checking the orange curve.
    const initialOrangeCurvePath = await page.locator('#plot-container .plot .traces .trace:nth-child(2) path').getAttribute('d');
    const initialResultsText = await page.locator('#results-display').textContent();

    // 3. Action: Drag the slider to a value of 0.95.
    await page.locator('#slider-beta').fill('0.95');

    // 4. Assert: The display (`#value-beta`) updates to "0.95", the orange curve on the plot changes shape, and the "rejuvenation bias (u)" value in the results display is updated.
    await expect(page.locator('#value-beta')).toHaveText(/^0\.950*$/);
    const newOrangeCurvePath1 = await page.locator('#plot-container .plot .traces .trace:nth-child(2) path').getAttribute('d');
    expect(newOrangeCurvePath1).not.toEqual(initialOrangeCurvePath);
    const newResultsText1 = await page.locator('#results-display').textContent();
    expect(newResultsText1).not.toEqual(initialResultsText);

    // Capture state before next action
    const currentOrangeCurvePath = await page.locator('#plot-container .plot .traces .trace:nth-child(2) path').getAttribute('d');
    const currentResultsText = await page.locator('#results-display').textContent();

    // 5. Action: Drag the slider to its maximum value of 1.5.
    await page.locator('#slider-beta').fill('1.5');

    // 6. Assert: The display (`#value-beta`) updates to "1.5", the orange curve on the plot changes, and the "site productivity (p)" value in the results display is updated.
    await expect(page.locator('#value-beta')).toHaveText(/^1\.50*$/);
    const newOrangeCurvePath2 = await page.locator('#plot-container .plot .traces .trace:nth-child(2) path').getAttribute('d');
    expect(newOrangeCurvePath2).not.toEqual(currentOrangeCurvePath);
    const newResultsText2 = await page.locator('#results-display').textContent();
    expect(newResultsText2).not.toEqual(currentResultsText);
  });
});