const { test, expect } = require('@playwright/test');
const path = require('path');

const fileUrl = 'file://' + path.resolve(__dirname, '../pages/TernaryPhaseDiagramWithPhaseEnvelope.html');

test.describe('Ternary Phase Diagram Tests', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(fileUrl);
    // Wait for the page and canvas to be ready
    // await page.waitForSelector('#canvas-container');
    await page.waitForTimeout(500);
  });

  test('"Diagram" View Button', async ({ page }) => {
    await expect(page.locator('#btn-diagram')).toBeVisible();
    await expect(page.locator('#btn-diagram')).toHaveClass(/active/);
    await expect(page.locator('#check-grid-lines')).toBeVisible();
    await expect(page.locator('#check-tie-lines')).toBeVisible();
    await expect(page.locator('#check-alpha-phase')).toBeVisible();
    await expect(page.locator('#check-beta-phase')).toBeVisible();

    await page.locator('#btn-phases').click();

    await expect(page.locator('#btn-diagram')).not.toHaveClass(/active/);
    await expect(page.locator('#check-grid-lines')).toBeHidden();
    // The canvas update is a visual change; asserting the control visibility change as a proxy.

    await page.locator('#btn-diagram').click();

    await expect(page.locator('#btn-diagram')).toHaveClass(/active/);
    await expect(page.locator('#check-grid-lines')).toBeVisible();
    // The canvas reverts to the detailed diagram view.
  });

  test('"Phases" View Button', async ({ page }) => {
    await expect(page.locator('#btn-phases')).toBeVisible();
    await expect(page.locator('#btn-phases')).not.toHaveClass(/active/);

    await page.locator('#btn-phases').click();

    await expect(page.locator('#btn-phases')).toHaveClass(/active/);
    await expect(page.locator('#check-grid-lines')).toBeHidden();
    await expect(page.locator('#check-tie-lines')).toBeHidden();
    await expect(page.locator('#check-alpha-phase')).toBeHidden();
    await expect(page.locator('#check-beta-phase')).toBeHidden();
    // Canvas now displays "one phase" and "two phases" regions.

    await page.locator('#btn-diagram').click();

    await expect(page.locator('#btn-phases')).not.toHaveClass(/active/);
    await expect(page.locator('#check-grid-lines')).toBeVisible();
    // Canvas returns to the default diagram view.
  });

  test('"Grid Lines" Checkbox Toggle', async ({ page }) => {
    await expect(page.locator('#check-grid-lines')).toBeVisible();
    await expect(page.locator('#check-grid-lines')).not.toBeChecked();

    await page.locator('#check-grid-lines').click();
    await expect(page.locator('#check-grid-lines')).toBeChecked();
    // Visual assertion: grid lines appear on the canvas.

    await page.locator('#check-grid-lines').click();
    await expect(page.locator('#check-grid-lines')).not.toBeChecked();
    // Visual assertion: grid lines disappear from the canvas.
  });

  test('"Tie Lines" Checkbox Toggle', async ({ page }) => {
    await expect(page.locator('#check-tie-lines')).toBeVisible();
    await expect(page.locator('#check-tie-lines')).toBeChecked();
    // Visual assertion: gray tie lines are visible on the canvas.

    await page.locator('#check-tie-lines').click();
    await expect(page.locator('#check-tie-lines')).not.toBeChecked();
    // Visual assertion: gray tie lines disappear from the canvas.

    await page.locator('#check-tie-lines').click();
    await expect(page.locator('#check-tie-lines')).toBeChecked();
    // Visual assertion: gray tie lines reappear on the canvas.
  });

  test('"Alpha Phase" Checkbox Toggle', async ({ page }) => {
    await expect(page.locator('#check-alpha-phase')).toBeVisible();
    await expect(page.locator('#check-alpha-phase')).toBeChecked();
    await expect(page.locator('#info-box-alpha')).toBeHidden();

    // Click inside the two-phase region (approximating center of a typical canvas)
    await page.locator('#canvas-container').click({ position: { x: 300, y: 350 } });

    await expect(page.locator('#info-box-alpha')).toBeVisible();
    // Visual assertion: an orange dot appears on the phase envelope.

    await page.locator('#check-alpha-phase').click();
    await expect(page.locator('#info-box-alpha')).toBeHidden();
    // Visual assertion: the orange dot disappears.
  });

  test('"Beta Phase" Checkbox Toggle', async ({ page }) => {
    await expect(page.locator('#check-beta-phase')).toBeVisible();
    await expect(page.locator('#check-beta-phase')).toBeChecked();
    await expect(page.locator('#info-box-beta')).toBeHidden();

    // Click inside the two-phase region (approximating center of a typical canvas)
    await page.locator('#canvas-container').click({ position: { x: 300, y: 350 } });

    await expect(page.locator('#info-box-beta')).toBeVisible();
    // Visual assertion: a magenta dot appears on the phase envelope.

    await page.locator('#check-beta-phase').click();
    await expect(page.locator('#info-box-beta')).toBeHidden();
    // Visual assertion: the magenta dot disappears.
  });

  test('Canvas Composition Point Selection', async ({ page }) => {
    await expect(page.locator('#canvas-container canvas')).toBeVisible();

    await expect(page.locator('#info-box-main')).toContainText('xA = 0.42');
    await expect(page.locator('#info-box-main')).toContainText('xB = 0.47');
    await expect(page.locator('#info-box-main')).toContainText('xC = 0.11');

    // Click inside the two-phase region
    await page.locator('#canvas-container').click({ position: { x: 300, y: 350 } });

    await expect(page.locator('#info-box-main')).not.toContainText('xA = 0.42');
    await expect(page.locator('#info-box-alpha')).toBeVisible();
    await expect(page.locator('#info-box-beta')).toBeVisible();

    // Click outside the two-phase region (near vertex A - top)
    await page.locator('#canvas-container').click({ position: { x: 300, y: 150 } });

    await expect(page.locator('#info-box-alpha')).toBeHidden();
    await expect(page.locator('#info-box-beta')).toBeHidden();
  });

});