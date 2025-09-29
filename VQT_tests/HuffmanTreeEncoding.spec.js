const { test, expect } = require('@playwright/test');
const path = require('path');

const fileUrl = 'file://' + path.resolve(__dirname, '../pages/HuffmanTreeEncoding.html');

test.describe('HuffmanTreeEncoding', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(fileUrl);
  });

  test('Default view showing the complete Huffman tree', async ({ page }) => {
    // Assert: Take a screenshot of the current UI state
    await page.screenshot({ path: './snapshots/HuffmanTreeEncoding-1.png', fullPage: true });
  });

  test('Partial tree view up to tier 3', async ({ page }) => {
    // Action: Click the "3" button in the "tiers" control group.
    await page.locator('#btn-tier-3').click();

    // Assert: Take a screenshot of the current UI state
    await page.screenshot({ path: './snapshots/HuffmanTreeEncoding-2.png', fullPage: true });
  });

  test('Complete Huffman tree with binary codes displayed on branches', async ({ page }) => {
    // Action: Click the "show binary" checkbox.
    await page.locator('#checkbox-binary').check();

    // Assert: Take a screenshot of the current UI state
    await page.screenshot({ path: './snapshots/HuffmanTreeEncoding-3.png', fullPage: true });
  });

  test('Initial state showing only the leaf nodes (tier 1)', async ({ page }) => {
    // Action: Click the "1" button in the "tiers" control group.
    await page.locator('#btn-tier-1').click();

    // Assert: Take a screenshot of the current UI state
    await page.screenshot({ path: './snapshots/HuffmanTreeEncoding-4.png', fullPage: true });
  });

});