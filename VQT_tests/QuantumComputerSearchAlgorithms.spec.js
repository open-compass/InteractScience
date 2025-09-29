const { test, expect } = require('@playwright/test');

test.describe('QuantumComputerSearchAlgorithms', () => {
  const fileUrl = 'file://' + require('path').resolve(__dirname, '../pages/QuantumComputerSearchAlgorithms.html');

  test.beforeEach(async ({ page }) => {
    await page.goto(fileUrl);
  });

  test('Initial state with Heuristic algorithm at step 0', async ({ page }) => {
    // Assert: Take a screenshot of the current UI state
    await page.screenshot({ path: './snapshots/QuantumComputerSearchAlgorithms-1.png', fullPage: true });
  });

  test('Heuristic algorithm at step 3 with eigenvalue plot', async ({ page }) => {
    // Action: Drag the "current step" slider (id="slider-current-step") to value 3.
    await page.locator('#slider-current-step').fill('3');

    // Action: Click the "eigenvalues" button (id="btn-eigenvalues").
    await page.locator('#btn-eigenvalues').click();

    // Assert: Take a screenshot of the current UI state
    await page.screenshot({ path: './snapshots/QuantumComputerSearchAlgorithms-2.png', fullPage: true });
  });

  test('Adiabatic algorithm at step 150 with eigenvalue plot', async ({ page }) => {
    // Action: Click the "adiabatic" algorithm button (id="btn-adiabatic").
    await page.locator('#btn-adiabatic').click();

    // Action: Drag the "current step" slider (id="slider-current-step") to value 150.
    await page.locator('#slider-current-step').fill('150');

    // Action: Click the "eigenvalues" button (id="btn-eigenvalues").
    await page.locator('#btn-eigenvalues').click();

    // Assert: Take a screenshot of the current UI state
    await page.screenshot({ path: './snapshots/QuantumComputerSearchAlgorithms-3.png', fullPage: true });
  });

  test('Unstructured algorithm at step 3 with eigenvalue plot', async ({ page }) => {
    // Action: Click the "unstructured" algorithm button (id="btn-unstructured").
    await page.locator('#btn-unstructured').click();

    // Action: Drag the "current step" slider (id="slider-current-step") to value 3.
    await page.locator('#slider-current-step').fill('3');

    // Action: Click the "eigenvalues" button (id="btn-eigenvalues").
    await page.locator('#btn-eigenvalues').click();

    // Assert: Take a screenshot of the current UI state
    await page.screenshot({ path: './snapshots/QuantumComputerSearchAlgorithms-4.png', fullPage: true });
  });
});