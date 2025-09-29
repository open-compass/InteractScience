const { test, expect } = require('@playwright/test');

test.describe('RichardsGrowthCurve', () => {
  const fileUrl = 'file://' + require('path').resolve(__dirname, '../pages/RichardsGrowthCurve.html');

  test.beforeEach(async ({ page }) => {
    await page.goto(fileUrl);
  });

  test('Initial state with default parameters', async ({ page }) => {
    // 1. Action: Navigate to the application's URL. (Handled by beforeEach)
    // 2. Assert: Take a screenshot of the current UI state.
    await page.screenshot({ path: './snapshots/RichardsGrowthCurve-1.png', fullPage: true });
  });

  test('Curves adjusted for lower maximum biomass and higher shape exponent', async ({ page }) => {
    // 1. Action: Set the "maximum biomass b_max" slider with ID `slider-bmax` to 1244.
    await page.locator('#slider-bmax').fill('1244');
    // 2. Action: Set the "initial biomass b₀" slider with ID `slider-b0` to 26.6.
    await page.locator('#slider-b0').fill('26.6');
    // 3. Action: Set the "intrinsic growth rate r" slider with ID `slider-r` to 0.092.
    await page.locator('#slider-r').fill('0.092');
    // 4. Action: Set the "shape exponent β" slider with ID `slider-beta` to 0.95.
    await page.locator('#slider-beta').fill('0.95');
    // 5. Assert: Take a screenshot of the current UI state.
    await page.screenshot({ path: './snapshots/RichardsGrowthCurve-2.png', fullPage: true });
  });

  test('Curves adjusted for lower initial biomass and further increased shape exponent', async ({ page }) => {
    // 1. Action: Set the "maximum biomass b_max" slider with ID `slider-bmax` to 1200.
    await page.locator('#slider-bmax').fill('1200');
    // 2. Action: Set the "initial biomass b₀" slider with ID `slider-b0` to 19.8.
    await page.locator('#slider-b0').fill('19.8');
    // 3. Action: Set the "shape exponent β" slider with ID `slider-beta` to 1.21.
    await page.locator('#slider-beta').fill('1.21');
    // 4. Assert: Take a screenshot of the current UI state.
    await page.screenshot({ path: './snapshots/RichardsGrowthCurve-3.png', fullPage: true });
  });

  test('Curves adjusted for very low initial biomass and higher growth rate', async ({ page }) => {
    // 1. Action: Set the "initial biomass b₀" slider with ID `slider-b0` to 10.
    await page.locator('#slider-b0').fill('10');
    // 2. Action: Set the "intrinsic growth rate r" slider with ID `slider-r` to 0.108.
    await page.locator('#slider-r').fill('0.108');
    // 3. Action: Set the "shape exponent β" slider with ID `slider-beta` to 1.3.
    await page.locator('#slider-beta').fill('1.3');
    // 4. Assert: Take a screenshot of the current UI state.
    await page.screenshot({ path: './snapshots/RichardsGrowthCurve-4.png', fullPage: true });
  });
});