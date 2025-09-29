const { test, expect } = require('@playwright/test');
const path = require('path');

const fileUrl = 'file://' + path.resolve(__dirname, '../pages/TernaryPhaseDiagramWithPhaseEnvelope.html');

test.describe('Ternary Phase Diagram with Phase Envelope', () => {

  test('Default view showing one-phase composition', async ({ page }) => {
    await page.goto(fileUrl);
    // Action: Load the demo in a browser. The application starts in the "diagram" view with the default composition point selected.
    // Assert: Take a screenshot of the current UI state.
    await page.screenshot({ path: './snapshots/TernaryPhaseDiagramWithPhaseEnvelope-1.png', fullPage: true });
  });

  test('Diagram view with a point in the two-phase region', async ({ page }) => {
    await page.goto(fileUrl);
    // Action: Click on the canvas at the location corresponding to the approximate mass fractions xA = 0.24, xB = 0.49, xC = 0.27.
    // To convert barycentric coordinates {xA, xB, xC} to cartesian {x, y} for the click, we use the formula:
    // P = xA*P_A + xB*P_B + xC*P_C
    // Assuming vertices P_A={x:300, y:30}, P_B={x:50, y:460}, P_C={x:550, y:460} based on typical p5.js canvas setup.
    // x = 0.24*300 + 0.49*50 + 0.27*550 = 72 + 24.5 + 148.5 = 245
    // y = 0.24*30 + 0.49*460 + 0.27*460 = 7.2 + 225.4 + 124.2 = 356.8
    await page.locator('#canvas-container').click({ position: { x: 245, y: 357 } });
    // Assert: Take a screenshot of the current UI state.
    await page.screenshot({ path: './snapshots/TernaryPhaseDiagramWithPhaseEnvelope-2.png', fullPage: true });
  });

  test('Alternate "phases" view showing one-phase and two-phase regions', async ({ page }) => {
    await page.goto(fileUrl);
    // Action: Click the "phases" button in the top control panel.
    await page.locator('#btn-phases').click();
    // Assert: Take a screenshot of the current UI state.
    await page.screenshot({ path: './snapshots/TernaryPhaseDiagramWithPhaseEnvelope-3.png', fullPage: true });
  });

  test('Diagram view showing a two-phase point with grid lines enabled', async ({ page }) => {
    await page.goto(fileUrl);
    // Action: Click the "diagram" button in the top control panel to return to the diagram view.
    await page.locator('#btn-diagram').click();
    // Action: Uncheck the "tie lines" checkbox.
    await page.locator('#check-tie-lines').click();
    // Action: Check the "grid lines" checkbox.
    await page.locator('#check-grid-lines').click();
    // Action: Click on the canvas at the location corresponding to the approximate mass fractions xA = 0.22, xB = 0.44, xC = 0.34.
    // x = 0.22*300 + 0.44*50 + 0.34*550 = 66 + 22 + 187 = 275
    // y = 0.22*30 + 0.44*460 + 0.34*460 = 6.6 + 202.4 + 156.4 = 365.4
    await page.locator('#canvas-container').click({ position: { x: 275, y: 365 } });
    // Assert: Take a screenshot of the current UI state.
    await page.screenshot({ path: './snapshots/TernaryPhaseDiagramWithPhaseEnvelope-4.png', fullPage: true });
  });

});