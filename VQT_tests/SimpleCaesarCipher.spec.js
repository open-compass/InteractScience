const { test, expect } = require('@playwright/test');

const fileUrl = 'file://' + require('path').resolve(__dirname, '../pages/SimpleCaesarCipher.html');

test.describe('Simple Caesar Cipher Demo', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(fileUrl);
  });

  test('Initial state of the application on the encoding panel', async ({ page }) => {
    // Action: Load the page is handled by beforeEach
    // Assert: Take a screenshot of the current UI state.
    await page.screenshot({ path: './snapshots/SimpleCaesarCipher-1.png', fullPage: true });
  });

  test('Encoding the message "THE IDES OF MARCH ARE COME" with an offset of 7', async ({ page }) => {
    // Action: Click the "Choose a message" dropdown (#select-message).
    // Action: Select the option "THE IDES OF MARCH ARE COME".
    await page.selectOption('#select-message', 'THE IDES OF MARCH ARE COME');
    
    // Action: Drag the "encoding offset" slider (#slider-encoding-offset) to the right until its value is 7.
    await page.locator('#slider-encoding-offset').fill('7');
    
    // Assert: Take a screenshot of the current UI state.
    await page.screenshot({ path: './snapshots/SimpleCaesarCipher-2.png', fullPage: true });
  });

  test('Decoding the intercepted ciphertext with an offset of -2', async ({ page }) => {
    // Action: In the "encoding" panel, select the message "THE IDES OF MARCH ARE COME" from the dropdown (#select-message).
    await page.selectOption('#select-message', 'THE IDES OF MARCH ARE COME');

    // Action: Set the "encoding offset" slider (#slider-encoding-offset) to 7.
    await page.locator('#slider-encoding-offset').fill('7');

    // Action: Click the "decoding" tab button (#btn-toggle-decoding).
    await page.click('#btn-toggle-decoding');

    // Action: Click the "intercept an encrypted message" button (#btn-intercept).
    await page.click('#btn-intercept');

    // Action: Drag the "decoding offset" slider (#slider-decoding-offset) to the left until its value is -2.
    await page.locator('#slider-decoding-offset').fill('-2');

    // Assert: Take a screenshot of the current UI state.
    await page.screenshot({ path: './snapshots/SimpleCaesarCipher-3.png', fullPage: true });
  });

  test('Encoding the message "EVEN YOU BRUTUS" with an offset of 12', async ({ page }) => {
    // Action: Click the "encoding" tab button (#btn-toggle-encoding).
    await page.click('#btn-toggle-encoding');

    // Action: Click the "Choose a message" dropdown (#select-message).
    // Action: Select the option "EVEN YOU BRUTUS".
    await page.selectOption('#select-message', 'EVEN YOU BRUTUS');

    // Action: Drag the "encoding offset" slider (#slider-encoding-offset) to the right until its value is 12.
    await page.locator('#slider-encoding-offset').fill('12');

    // Assert: Take a screenshot of the current UI state.
    await page.screenshot({ path: './snapshots/SimpleCaesarCipher-4.png', fullPage: true });
  });

});