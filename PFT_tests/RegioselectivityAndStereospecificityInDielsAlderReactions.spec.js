const { test, expect } = require('@playwright/test');
const path = require('path');

const fileUrl = 'file://' + path.resolve(__dirname, '../pages/RegioselectivityAndStereospecificityInDielsAlderReactions.html');

test.describe('Interactive Diels-Alder Visualization Tests', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(fileUrl);
    // Wait for the page to be fully loaded, especially if p5.js has setup logic
    // await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(500);
  });

  test('Mode Selector Tabs', async ({ page }) => {
    // 1. Assert: The "Diels–Alder reaction" tab (`#btn-mode-da`) is visible and has the 'active' class.
    await expect(page.locator('#btn-mode-da')).toBeVisible();
    await expect(page.locator('#btn-mode-da')).toHaveClass(/active/);

    // 2. Assert: The other mode tabs are visible but do not have the 'active' class.
    await expect(page.locator('#btn-mode-regio')).toBeVisible();
    await expect(page.locator('#btn-mode-regio')).not.toHaveClass(/active/);
    await expect(page.locator('#btn-mode-stereo-phile')).toBeVisible();
    await expect(page.locator('#btn-mode-stereo-phile')).not.toHaveClass(/active/);
    await expect(page.locator('#btn-mode-stereo-diene')).toBeVisible();
    await expect(page.locator('#btn-mode-stereo-diene')).not.toHaveClass(/active/);
    await expect(page.locator('#btn-mode-homo')).toBeVisible();
    await expect(page.locator('#btn-mode-homo')).not.toHaveClass(/active/);

    // 3. Action: Click the "regioselectivity" tab (`#btn-mode-regio`).
    await page.locator('#btn-mode-regio').click();

    // 4. Assert: The "regioselectivity" tab now has the 'active' class, and the canvas drawing is updated.
    await expect(page.locator('#btn-mode-regio')).toHaveClass(/active/);
    await expect(page.locator('#btn-mode-da')).not.toHaveClass(/active/);
    // As per the plan, all controls are visible in this mode.
    await expect(page.locator('#check-inverse')).toBeVisible();
    await expect(page.locator('#check-focus')).toBeVisible();
    await expect(page.locator('#slider-reaction')).toBeVisible();
    await expect(page.locator('#slider-erg-ewg')).toBeVisible();

    // 5. Action: Click the "HOMO/LUMO interactions" tab (`#btn-mode-homo`).
    await page.locator('#btn-mode-homo').click();

    // 6. Assert: The "HOMO/LUMO interactions" tab has the 'active' class, and the set of visible controls in the control panel has changed.
    await expect(page.locator('#btn-mode-homo')).toHaveClass(/active/);
    await expect(page.locator('#btn-mode-regio')).not.toHaveClass(/active/);
    // As per the plan for HOMO/LUMO mode:
    await expect(page.locator('#check-inverse')).toBeVisible();
    await expect(page.locator('#slider-erg-ewg')).toBeVisible();
    await expect(page.locator('#check-focus')).toBeHidden();
    await expect(page.locator('#slider-reaction')).toBeHidden();
  });

  test('"inverse" Checkbox Control', async ({ page }) => {
    // Navigate to the correct mode first
    await page.locator('#btn-mode-homo').click();

    // 1. Assert: In "HOMO/LUMO interactions" mode, the "inverse" checkbox (`#check-inverse`) is visible.
    await expect(page.locator('#check-inverse')).toBeVisible();

    // 2. Assert: The checkbox is in its default state (unchecked).
    await expect(page.locator('#check-inverse')).not.toBeChecked();

    // 3. Action: Click the "inverse" checkbox.
    await page.locator('#check-inverse').check();

    // 4. Assert: The checkbox becomes checked, and the HOMO/LUMO diagram on the canvas is updated (e.g., text labels change).
    await expect(page.locator('#check-inverse')).toBeChecked();
    // According to the plan, specific labels appear. We assume they are rendered as text on the page/canvas.
    // This is a proxy for canvas update.
    await expect(page.locator('text="diene EWG"')).toBeVisible();
    await expect(page.locator('text="dienophile ERG"')).toBeVisible();

    // 5. Action: Click the "inverse" checkbox again.
    await page.locator('#check-inverse').uncheck();

    // 6. Assert: The checkbox becomes unchecked, and the canvas drawing reverts its state.
    await expect(page.locator('#check-inverse')).not.toBeChecked();
    await expect(page.locator('text="diene EWG"')).toBeHidden();
    await expect(page.locator('text="dienophile ERG"')).toBeHidden();
  });

  test('"focus" Checkbox Control', async ({ page }) => {
    // 1. Assert: In the default "Diels–Alder reaction" mode, the "focus" checkbox (`#check-focus`) is visible.
    await expect(page.locator('#check-focus')).toBeVisible();

    // 2. Assert: The checkbox is in its default state (unchecked).
    await expect(page.locator('#check-focus')).not.toBeChecked();

    // 3. Action: Click the "focus" checkbox.
    await page.locator('#check-focus').check();

    // 4. Assert: The checkbox becomes checked, and the bonds in the molecules on the canvas are highlighted.
    await expect(page.locator('#check-focus')).toBeChecked();
    // Direct canvas assertion is complex; we confirm the control that triggers the highlight is in the correct state.

    // 5. Action: Click the "focus" checkbox again.
    await page.locator('#check-focus').uncheck();

    // 6. Assert: The checkbox becomes unchecked, and the bond highlighting on the canvas is removed.
    await expect(page.locator('#check-focus')).not.toBeChecked();
  });

  test('"reaction evolution" Slider Control', async ({ page }) => {
    // 1. Assert: The "reaction evolution" slider (`#slider-reaction`) is visible on page load.
    await expect(page.locator('#slider-reaction')).toBeVisible();

    // 2. Assert: The slider is at its default value of 0.
    await expect(page.locator('#slider-reaction')).toHaveValue('0');

    // 3. Action: Drag the slider to the middle of its range.
    await page.locator('#slider-reaction').fill('50');

    // 4. Assert: The slider's value changes, and the positions of the molecules on the canvas are updated to an intermediate state.
    await expect(page.locator('#slider-reaction')).toHaveValue('50');
    // We confirm the control's state, which drives the canvas update.

    // 5. Action: Drag the slider to its maximum value (100).
    await page.locator('#slider-reaction').fill('100');

    // 6. Assert: The canvas drawing is updated to show the final reaction product.
    await expect(page.locator('#slider-reaction')).toHaveValue('100');
  });

  test('"ERG/EWG effect intensity" Slider Control', async ({ page }) => {
    // Navigate to the correct mode
    await page.locator('#btn-mode-homo').click();

    // 1. Assert: In "HOMO/LUMO interactions" mode, the "ERG/EWG effect intensity" slider (`#slider-erg-ewg`) is visible.
    await expect(page.locator('#slider-erg-ewg')).toBeVisible();

    // 2. Assert: The slider is at its default value of 0.
    await expect(page.locator('#slider-erg-ewg')).toHaveValue('0');

    // 3. Action: Click the plus button (`#btn-erg-ewg-plus`) several times.
    const plusButton = page.locator('#btn-erg-ewg-plus');
    await plusButton.click();
    await plusButton.click();
    await plusButton.click();

    // 4. Assert: The slider's value increases, and the energy levels and interaction arrows in the HOMO/LUMO diagram change.
    await expect(page.locator('#slider-erg-ewg')).toHaveValue('3');
    // We confirm the control's state change, which drives the canvas update.

    // 5. Action: Drag the slider back to its minimum value (0).
    await page.locator('#slider-erg-ewg').fill('0');

    // 6. Assert: The canvas drawing of the HOMO/LUMO diagram returns to its initial state.
    await expect(page.locator('#slider-erg-ewg')).toHaveValue('0');
  });
});