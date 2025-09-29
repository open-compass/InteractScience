const { test, expect } = require('@playwright/test');

test.describe('Kinetics of CFC Catalyzed Ozone Destruction', () => {
  const fileUrl = 'file://' + require('path').resolve(__dirname, '../pages/KineticsOfCFCCatalyzedOzoneDestruction.html');

  test('Initial view with CFC-12 at year 1950', async ({ page }) => {
    await page.goto(fileUrl);
    // 1. Action: Load the application. The controls should be at their default values (CFC-12, show all unchecked, year 1950, time 1s).
    // No action needed after page load for the default state.

    // 2. Assert: Take a screenshot of the current UI state.
    await page.screenshot({ path: './snapshots/KineticsOfCFCCatalyzedOzoneDestruction-1.png', fullPage: true });
  });

  test('CFC-11 selected for the year 2015', async ({ page }) => {
    await page.goto(fileUrl);

    // 1. Action: Select "CFC-11" from the `cfc plot` dropdown menu.
    await page.selectOption('#select-cfc', 'CFC-11');

    // 2. Action: Drag the `year` slider to the value 2015.
    await page.locator('#slider-year').fill('2015');

    // 3. Action: Drag the `time (s)` slider to the value 7.
    await page.locator('#slider-time').fill('7');

    // 4. Assert: Take a screenshot of the current UI state.
    await page.screenshot({ path: './snapshots/KineticsOfCFCCatalyzedOzoneDestruction-2.png', fullPage: true });
  });

  test('CFC-113 selected for the year 1995 with time at 30s', async ({ page }) => {
    await page.goto(fileUrl);

    // 1. Action: Select "CFC-113" from the `cfc plot` dropdown menu.
    await page.selectOption('#select-cfc', 'CFC-113');

    // 2. Action: Drag the `year` slider to the value 1995.
    await page.locator('#slider-year').fill('1995');

    // 3. Action: Drag the `time (s)` slider to its maximum value, 30.
    await page.locator('#slider-time').fill('30');

    // 4. Assert: Take a screenshot of the current UI state.
    await page.screenshot({ path: './snapshots/KineticsOfCFCCatalyzedOzoneDestruction-3.png', fullPage: true });
  });

  test('All CFCs plotted, with CCl4 selected for the year 1995', async ({ page }) => {
    await page.goto(fileUrl);

    // 1. Action: Select "CCl4" from the `cfc plot` dropdown menu.
    await page.selectOption('#select-cfc', 'CCl4');

    // 2. Action: Click the `show all` checkbox to enable it.
    await page.locator('#checkbox-show-all').check();

    // 3. Action: Drag the `year` slider to the value 1995.
    await page.locator('#slider-year').fill('1995');

    // 4. Action: Drag the `time (s)` slider to the value 10.
    await page.locator('#slider-time').fill('10');

    // 5. Assert: Take a screenshot of the current UI state.
    await page.screenshot({ path: './snapshots/KineticsOfCFCCatalyzedOzoneDestruction-4.png', fullPage: true });
  });
});