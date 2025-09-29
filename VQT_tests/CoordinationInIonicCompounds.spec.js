const { test, expect } = require('@playwright/test');

test.describe('CoordinationInIonicCompounds', () => {
  const fileUrl = 'file://' + require('path').resolve(__dirname, '../pages/CoordinationInIonicCompounds.html');

  test.beforeEach(async ({ page }) => {
    await page.goto(fileUrl);
  });

  test('Initial state with threefold coordination and default radii', async ({ page }) => {
    // Action: Load the application page is handled by beforeEach.
    // Assert: Take a screenshot of the current UI state
    await page.screenshot({ path: './snapshots/CoordinationInIonicCompounds-1.png', fullPage: true });
  });

  test('Threefold coordination with large anions and small cation', async ({ page }) => {
    // Action: Set the "relative anion radius" slider (#slider-anion-radius) to 0.697.
    await page.locator('#slider-anion-radius').fill('0.697');
    // Action: Set the "relative cation radius" slider (#slider-cation-radius) to 0.107.
    await page.locator('#slider-cation-radius').fill('0.107');
    // Assert: Take a screenshot of the current UI state
    await page.screenshot({ path: './snapshots/CoordinationInIonicCompounds-2.png', fullPage: true });
  });

  test('Fourfold coordination with a cation-anion ratio of 0.22', async ({ page }) => {
    // Action: Click the "fourfold" button (#btn-fourfold).
    await page.locator('#btn-fourfold').click();
    // Action: Set the "relative anion radius" slider (#slider-anion-radius) to 0.44.
    await page.locator('#slider-anion-radius').fill('0.44');
    // Action: Set the "relative cation radius" slider (#slider-cation-radius) to 0.096.
    await page.locator('#slider-cation-radius').fill('0.096');
    // Assert: Take a screenshot of the current UI state
    await page.screenshot({ path: './snapshots/CoordinationInIonicCompounds-3.png', fullPage: true });
  });

  test('Sixfold coordination with a cation-anion ratio of 0.41', async ({ page }) => {
    // Action: Click the "sixfold" button (#btn-sixfold).
    await page.locator('#btn-sixfold').click();
    // Action: Set the "relative anion radius" slider (#slider-anion-radius) to 0.488.
    await page.locator('#slider-anion-radius').fill('0.488');
    // Action: Set the "relative cation radius" slider (#slider-cation-radius) to 0.201.
    await page.locator('#slider-cation-radius').fill('0.201');
    // Assert: Take a screenshot of the current UI state
    await page.screenshot({ path: './snapshots/CoordinationInIonicCompounds-4.png', fullPage: true });
  });
});