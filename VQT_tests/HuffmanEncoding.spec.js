const { test, expect } = require('@playwright/test');

const fileUrl = 'file://' + require('path').resolve(__dirname, '../pages/HuffmanEncoding.html');

test.describe('Huffman Encoding Visualization', () => {

  test('Displaying Huffman encoding example 1', async ({ page }) => {
    await page.goto(fileUrl);
    await page.locator('#btn-ex1').click();
    await page.screenshot({ path: './snapshots/HuffmanEncoding-1.png', fullPage: true });
  });

  test('Displaying the default Huffman encoding example 2', async ({ page }) => {
    await page.goto(fileUrl);
    await page.screenshot({ path: './snapshots/HuffmanEncoding-2.png', fullPage: true });
  });

  test('Displaying Huffman encoding example 3', async ({ page }) => {
    await page.goto(fileUrl);
    await page.locator('#btn-ex3').click();
    await page.screenshot({ path: './snapshots/HuffmanEncoding-3.png', fullPage: true });
  });

  test('Displaying Huffman encoding example 4', async ({ page }) => {
    await page.goto(fileUrl);
    await page.locator('#btn-ex4').click();
    await page.screenshot({ path: './snapshots/HuffmanEncoding-4.png', fullPage: true });
  });

});