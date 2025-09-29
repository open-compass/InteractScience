const { test, expect } = require('@playwright/test');

test.describe('SimulatedQuantumComputerAlgorithmForDatabaseSearching', () => {
  const fileUrl = 'file://' + require('path').resolve(__dirname, '../pages/SimulatedQuantumComputerAlgorithmForDatabaseSearching.html');

  test.beforeEach(async ({ page }) => {
    await page.goto(fileUrl);
  });

  test('Initial state with database size 10 and 2 iterations', async ({ page }) => {
    await page.screenshot({ path: './snapshots/SimulatedQuantumComputerAlgorithmForDatabaseSearching-1.png', fullPage: true });
  });

  test('State with database size 50 and 4 iterations', async ({ page }) => {
    await page.locator('#slider-db-size').fill('50');
    await page.locator('#slider-iterations').fill('4');
    await page.screenshot({ path: './snapshots/SimulatedQuantumComputerAlgorithmForDatabaseSearching-2.png', fullPage: true });
  });

  test('State with database size 50 and 5 iterations', async ({ page }) => {
    await page.locator('#slider-db-size').fill('50');
    await page.locator('#slider-iterations').fill('5');
    await page.screenshot({ path: './snapshots/SimulatedQuantumComputerAlgorithmForDatabaseSearching-3.png', fullPage: true });
  });

  test('State with database size 50 and 6 iterations', async ({ page }) => {
    await page.locator('#slider-db-size').fill('50');
    await page.locator('#slider-iterations').fill('6');
    await page.screenshot({ path: './snapshots/SimulatedQuantumComputerAlgorithmForDatabaseSearching-4.png', fullPage: true });
  });
});