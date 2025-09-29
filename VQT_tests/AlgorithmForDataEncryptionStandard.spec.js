const { test, expect } = require('@playwright/test');

test.describe('AlgorithmForDataEncryptionStandard', () => {
  const fileUrl = 'file://' + require('path').resolve(__dirname, '../pages/AlgorithmForDataEncryptionStandard.html');

  test('View with 2 encryption steps for default message and key', async ({ page }) => {
    await page.goto(fileUrl);
    await page.getByLabel('2', { exact: true }).click();
    await page.screenshot({ path: './snapshots/AlgorithmForDataEncryptionStandard-1.png', fullPage: true });
  });

  test('View with long message, new key, and 16 encryption steps', async ({ page }) => {
    await page.goto(fileUrl);
    await page.getByLabel('message').fill('this is a secret message');
    await page.getByLabel('key').fill('decrypt');
    await page.getByLabel('16', { exact: true }).click();
    await page.screenshot({ path: './snapshots/AlgorithmForDataEncryptionStandard-2.png', fullPage: true });
  });

  test('View with a new key and 8 encryption steps', async ({ page }) => {
    await page.goto(fileUrl);
    await page.getByLabel('key').fill('quiz');
    await page.getByLabel('8', { exact: true }).click();
    await page.screenshot({ path: './snapshots/AlgorithmForDataEncryptionStandard-3.png', fullPage: true });
  });

  test('View with a new message and 16 encryption steps', async ({ page }) => {
    await page.goto(fileUrl);
    await page.getByLabel('message').fill('all is fine');
    await page.getByLabel('16', { exact: true }).click();
    await page.screenshot({ path: './snapshots/AlgorithmForDataEncryptionStandard-4.png', fullPage: true });
  });
});