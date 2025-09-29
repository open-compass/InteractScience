const { test, expect } = require('@playwright/test');

const fileUrl = 'file://' + require('path').resolve(__dirname, '../pages/AdditiveCipher.html');

test.describe('Additive Cipher Demo', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(fileUrl);
    await page.waitForTimeout(500);
  });

  test('Shift Slider Control', async ({ page }) => {
    // 1. Assert: The "shift" slider (`#shift-slider`) is visible.
    const shiftSlider = page.locator('#shift-slider');
    await expect(shiftSlider).toBeVisible();

    // 2. Assert: The slider's value is 12, and the encryption key display (`#encryption-key-display`) shows "encryption key: 12".
    await expect(shiftSlider).toHaveValue('12');
    const encryptionKeyDisplay = page.locator('#encryption-key-display');
    await expect(encryptionKeyDisplay).toHaveText('encryption key: 12');

    // 3. Action: Drag the slider to a new value, such as 4.
    await shiftSlider.fill('4');

    // 4. Assert: The encryption key display (`#encryption-key-display`) updates to "encryption key: 4" and the ciphertext alphabet (`#ciphertext-alphabet`) now starts with the letter 'E'.
    await expect(encryptionKeyDisplay).toHaveText('encryption key: 4');
    const firstCipherLetter = page.locator('#ciphertext-alphabet span').first();
    await expect(firstCipherLetter).toHaveText('E');

    // 5. Action: Drag the slider to its maximum value, 25.
    await shiftSlider.fill('25');

    // 6. Assert: The encryption key display (`#encryption-key-display`) updates to "encryption key: 25" and the decryption key display (`#decryption-key-display`) updates to "decryption key: 1".
    await expect(encryptionKeyDisplay).toHaveText('encryption key: 25');
    const decryptionKeyDisplay = page.locator('#decryption-key-display');
    await expect(decryptionKeyDisplay).toHaveText('decryption key: 1');
  });

  test('Plaintext Message Input', async ({ page }) => {
    // 1. Assert: The text input field (`#text-input`) is visible.
    const textInput = page.locator('#text-input');
    await expect(textInput).toBeVisible();

    // 2. Assert: The text input field's value is "abcd" and the plaintext output (`#plaintext-output`) shows "plaintext : abcd".
    await expect(textInput).toHaveValue('abcd');
    const plaintextOutput = page.locator('#plaintext-output');
    await expect(plaintextOutput).toHaveText('plaintext : abcd');

    // Capture initial ciphertext for comparison
    const ciphertextOutput = page.locator('#ciphertext-output');
    const initialCiphertext = await ciphertextOutput.textContent();

    // 3. Action: Change the text in the input field to "test phrase".
    await textInput.fill('test phrase');

    // 4. Assert: The plaintext output (`#plaintext-output`) updates to "plaintext : test phrase" and the ciphertext output (`#ciphertext-output`) content has changed.
    await expect(plaintextOutput).toHaveText('plaintext : test phrase');
    await expect(ciphertextOutput).not.toHaveText(initialCiphertext);

    // 5. Action: Clear the text input field, setting its value to an empty string.
    await textInput.fill('');

    // 6. Assert: The plaintext output (`#plaintext-output`) updates to "plaintext : " and the ciphertext output (`#ciphertext-output`) updates to "ciphertext: ".
    await expect(plaintextOutput).toHaveText('plaintext : ');
    await expect(ciphertextOutput).toHaveText('ciphertext: ');
  });

});