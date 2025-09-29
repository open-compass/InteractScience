const { test, expect } = require('@playwright/test');

const fileUrl = 'file://' + require('path').resolve(__dirname, '../pages/SimulatedQuantumComputerAlgorithmForDatabaseSearching.html');

test.describe('Quantum Computer Algorithm Visualization', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(fileUrl);
    // await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(500);
  });

  test('Database Size Slider Control', async ({ page }) => {
    // 1. Assert: The "database size" slider (`#slider-db-size`) is visible on the page.
    await expect(page.locator('#slider-db-size')).toBeVisible();

    // 2. Assert: The slider's value is 10 and its corresponding display (`#display-db-size`) shows "10".
    await expect(page.locator('#slider-db-size')).toHaveValue('10');
    await expect(page.locator('#display-db-size')).toHaveText('10');
    const initialProbabilityText = await page.locator('#probability-display').innerText();

    // 3. Action: Set the slider value to 50.
    await page.locator('#slider-db-size').fill('50');

    // 4. Assert: The `#display-db-size` text updates to "50", the number of bars on the canvas visualization increases, and the `#probability-display` text changes.
    await expect(page.locator('#display-db-size')).toHaveText('50');
    const probabilityTextAfter50 = await page.locator('#probability-display').innerText();
    expect(probabilityTextAfter50).not.toBe(initialProbabilityText);

    // 5. Action: Drag the slider to its maximum value of 100.
    await page.locator('#slider-db-size').fill('100');

    // 6. Assert: The `#display-db-size` text updates to "100", the number of bars on the canvas increases further, and the `#probability-display` text updates.
    await expect(page.locator('#display-db-size')).toHaveText('100');
    await expect(page.locator('#probability-display')).not.toHaveText(probabilityTextAfter50);
  });

  test('Iterations Slider Control', async ({ page }) => {
    // 1. Assert: The "number of iterations" slider (`#slider-iterations`) is visible on the page.
    await expect(page.locator('#slider-iterations')).toBeVisible();

    // 2. Assert: The slider's value is 2 and its corresponding display (`#display-iterations`) shows "2".
    await expect(page.locator('#slider-iterations')).toHaveValue('2');
    await expect(page.locator('#display-iterations')).toHaveText('2');
    const initialProbabilityText = await page.locator('#probability-display').innerText();

    // 3. Action: Set the slider value to 5.
    await page.locator('#slider-iterations').fill('5');

    // 4. Assert: The `#display-iterations` text updates to "5", the bar height in the "after k iterations" plot changes, and the `#probability-display` text changes.
    await expect(page.locator('#display-iterations')).toHaveText('5');
    const probabilityTextAfter5 = await page.locator('#probability-display').innerText();
    expect(probabilityTextAfter5).not.toBe(initialProbabilityText);

    // 5. Action: Drag the slider to its minimum value of 0.
    await page.locator('#slider-iterations').fill('0');

    // 6. Assert: The `#display-iterations` text updates to "0", the "after k iterations" plot is redrawn, and the `#probability-display` text updates.
    await expect(page.locator('#display-iterations')).toHaveText('0');
    await expect(page.locator('#probability-display')).not.toHaveText(probabilityTextAfter5);
  });

});