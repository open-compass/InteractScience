const { test, expect } = require('@playwright/test');

const fileUrl = 'file://' + require('path').resolve(__dirname, '../pages/HuffmanTreeEncoding.html');

test.describe('Huffman Tree Encoding Interactive Demo', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(fileUrl);
    await page.waitForTimeout(500);
  });

  test('Tiers Buttons Control', async ({ page }) => {
    // 1. Assert: The tier buttons container #tiers-container and buttons btn-tier-1 through btn-tier-5 are visible.
    await expect(page.locator('#tiers-container')).toBeVisible();
    await expect(page.locator('#btn-tier-1')).toBeVisible();
    await expect(page.locator('#btn-tier-2')).toBeVisible();
    await expect(page.locator('#btn-tier-3')).toBeVisible();
    await expect(page.locator('#btn-tier-4')).toBeVisible();
    await expect(page.locator('#btn-tier-5')).toBeVisible();

    // 2. Assert: Button btn-tier-5 is visually highlighted as active, the full tree is drawn on the canvas, and the encoded text p#encoded-text is visible.
    // Note: We check for an 'active' class as a proxy for visual highlighting. Canvas content is not directly tested.
    await expect(page.locator('#btn-tier-5')).toHaveClass(/active/);
    await expect(page.locator('#encoded-text')).toBeVisible();
    await expect(page.locator('#encoding-table')).toBeVisible();


    // 3. Action: Click the btn-tier-3 button.
    await page.locator('#btn-tier-3').click();

    // 4. Assert: Button btn-tier-3 is now highlighted, the tree on the canvas is partially drawn (up to tier 3), and the encoded text p#encoded-text is hidden.
    await expect(page.locator('#btn-tier-3')).toHaveClass(/active/);
    await expect(page.locator('#btn-tier-5')).not.toHaveClass(/active/);
    await expect(page.locator('#encoded-text')).toBeHidden();
    await expect(page.locator('#encoding-table')).toBeVisible(); // Should still be visible at tier 3

    // 5. Action: Click the btn-tier-1 button.
    await page.locator('#btn-tier-1').click();

    // 6. Assert: Button btn-tier-1 is now highlighted, the canvas shows only leaf nodes (tier 1), and the encoding table #encoding-table is hidden.
    await expect(page.locator('#btn-tier-1')).toHaveClass(/active/);
    await expect(page.locator('#btn-tier-3')).not.toHaveClass(/active/);
    await expect(page.locator('#encoding-table')).toBeHidden();
  });

  test('Show Binary Checkbox Control', async ({ page }) => {
    // 1. Assert: The "show binary" checkbox #checkbox-binary is visible.
    await expect(page.locator('#checkbox-binary')).toBeVisible();

    // 2. Assert: The checkbox is unchecked by default, and the canvas does not show '0' or '1' labels on tree branches.
    await expect(page.locator('#checkbox-binary')).not.toBeChecked();

    // 3. Action: Click the "show binary" checkbox to check it.
    await page.locator('#checkbox-binary').check();

    // 4. Assert: The checkbox is now checked, and the canvas redraws to show '0' and '1' labels on the tree branches.
    await expect(page.locator('#checkbox-binary')).toBeChecked();

    // 5. Action: Click the "show binary" checkbox again to uncheck it.
    await page.locator('#checkbox-binary').uncheck();

    // 6. Assert: The checkbox is now unchecked, and the canvas redraws to hide the '0' and '1' labels on the tree branches.
    await expect(page.locator('#checkbox-binary')).not.toBeChecked();
  });

  test('Characters Radio Button Control', async ({ page }) => {
    // 1. Assert: The "characters" radio buttons #radio-chars-no and #radio-chars-yes are visible.
    await expect(page.locator('#radio-chars-no')).toBeVisible();
    await expect(page.locator('#radio-chars-yes')).toBeVisible();

    // 2. Assert: The radio-chars-yes button is selected by default, and internal tree nodes on the canvas are labeled with characters and frequency (e.g., "IS(9)").
    await expect(page.locator('#radio-chars-yes')).toBeChecked();

    // 3. Action: Click the radio-chars-no radio button.
    await page.locator('#radio-chars-no').check();

    // 4. Assert: The radio-chars-no button is now selected, and the canvas redraws to show only frequency on internal nodes (e.g., "(9)").
    await expect(page.locator('#radio-chars-no')).toBeChecked();
    await expect(page.locator('#radio-chars-yes')).not.toBeChecked();

    // 5. Action: Click the radio-chars-yes radio button.
    await page.locator('#radio-chars-yes').check();

    // 6. Assert: The radio-chars-yes button is now selected, and the canvas redraws to show characters and frequency on internal nodes again.
    await expect(page.locator('#radio-chars-yes')).toBeChecked();
    await expect(page.locator('#radio-chars-no')).not.toBeChecked();
  });
});