const { test, expect } = require('@playwright/test');
const path = require('path');

const fileUrl = 'file://' + path.resolve(__dirname, '../pages/SimpleCaesarCipher.html');

test.describe('SimpleCaesarCipher', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(fileUrl);
    await page.waitForTimeout(500);
  });

  test('Panel Toggle Buttons', async ({ page }) => {
    // 1. Assert: The "encoding" and "decoding" buttons are visible. The "encoding" button is active and the encoding panel is visible.
    await expect(page.locator('#btn-toggle-encoding')).toBeVisible();
    await expect(page.locator('#btn-toggle-decoding')).toBeVisible();
    await expect(page.locator('#btn-toggle-encoding')).toHaveClass(/active/);
    await expect(page.locator('#panel-encoding')).toBeVisible();

    // 2. Assert: The decoding panel (`#panel-decoding`) has its `display` style set to `none`.
    await expect(page.locator('#panel-decoding')).toBeHidden();

    // 3. Action: Click the "decoding" button (`#btn-toggle-decoding`).
    await page.locator('#btn-toggle-decoding').click();

    // 4. Assert: The decoding panel is now visible, the encoding panel is hidden, and the "decoding" button has the 'active' class.
    await expect(page.locator('#panel-decoding')).toBeVisible();
    await expect(page.locator('#panel-encoding')).toBeHidden();
    await expect(page.locator('#btn-toggle-decoding')).toHaveClass(/active/);

    // 5. Action: Click the "encoding" button (`#btn-toggle-encoding`).
    await page.locator('#btn-toggle-encoding').click();

    // 6. Assert: The encoding panel is visible again, the decoding panel is hidden, and the "encoding" button has the 'active' class.
    await expect(page.locator('#panel-encoding')).toBeVisible();
    await expect(page.locator('#panel-decoding')).toBeHidden();
    await expect(page.locator('#btn-toggle-encoding')).toHaveClass(/active/);
  });

  test('Predefined Message Dropdown', async ({ page }) => {
    // 1. Assert: The message dropdown (`#select-message`) is visible.
    await expect(page.locator('#select-message')).toBeVisible();

    // 2. Assert: The default selected option is "Choose a message" and the `display-message` span is empty.
    await expect(page.locator('#select-message')).toHaveValue('');
    await expect(page.locator('#display-message')).toBeEmpty();

    // 3. Action: Select the "THE IDES OF MARCH ARE COME" option from the dropdown.
    await page.locator('#select-message').selectOption({ label: 'THE IDES OF MARCH ARE COME' });

    // 4. Assert: The `display-message` span now contains "THE IDES OF MARCH ARE COME", and the `display-plaintext` span is populated.
    await expect(page.locator('#display-message')).toHaveText('THE IDES OF MARCH ARE COME');
    await expect(page.locator('#display-plaintext')).not.toBeEmpty();

    // 5. Action: Select the "Choose a message" option again.
    await page.locator('#select-message').selectOption({ label: 'Choose a message' });

    // 6. Assert: The `display-message` and `display-plaintext` spans are cleared.
    await expect(page.locator('#display-message')).toBeEmpty();
    await expect(page.locator('#display-plaintext')).toBeEmpty();
  });

  test('Clear Encoding Area Button', async ({ page }) => {
    // 1. Assert: The "clear encoding area" button (`#btn-clear-encoding`) is visible.
    await expect(page.locator('#btn-clear-encoding')).toBeVisible();

    // 2. Assert: The `display-message`, `display-plaintext`, and `display-ciphertext` spans are initially empty.
    await expect(page.locator('#display-message')).toBeEmpty();
    await expect(page.locator('#display-plaintext')).toBeEmpty();
    await expect(page.locator('#display-ciphertext')).toBeEmpty();

    // 3. Action: Select a predefined message from the dropdown, so that the message, plaintext, and ciphertext displays are populated.
    await page.locator('#select-message').selectOption({ label: 'THE IDES OF MARCH ARE COME' });

    // 4. Assert: The `display-message`, `display-plaintext`, and `display-ciphertext` spans now contain text.
    await expect(page.locator('#display-message')).not.toBeEmpty();
    await expect(page.locator('#display-plaintext')).not.toBeEmpty();
    await expect(page.locator('#display-ciphertext')).not.toBeEmpty();

    // 5. Action: Click the "clear encoding area" button.
    await page.locator('#btn-clear-encoding').click();

    // 6. Assert: The `display-message`, `display-plaintext`, and `display-ciphertext` spans are now empty, and the encoding offset slider is reset to 0.
    await expect(page.locator('#display-message')).toBeEmpty();
    await expect(page.locator('#display-plaintext')).toBeEmpty();
    await expect(page.locator('#display-ciphertext')).toBeEmpty();
    await expect(page.locator('#slider-encoding-offset')).toHaveValue('0');
  });

  test('Encoding Offset Slider', async ({ page }) => {
    // 1. Assert: The encoding offset slider (`#slider-encoding-offset`) is visible.
    await expect(page.locator('#slider-encoding-offset')).toBeVisible();

    // 2. Assert: The slider's default value is 0, and the associated value display (`#span-encoding-offset-value`) shows "0".
    await expect(page.locator('#slider-encoding-offset')).toHaveValue('0');
    await expect(page.locator('#span-encoding-offset-value')).toHaveText('0');

    // 3. Action: Select a message and drag the slider to the right, to a value of 7.
    await page.locator('#select-message').selectOption({ label: 'EVEN YOU BRUTUS' });
    const initialCiphertext = await page.locator('#display-ciphertext').innerText();
    const initialAlphabetTo = await page.locator('#display-encoding-alphabet-to').innerText();
    await page.locator('#slider-encoding-offset').fill('7');

    // 4. Assert: The value display shows "7", and the text in `display-ciphertext` and `display-encoding-alphabet-to` has changed.
    await expect(page.locator('#span-encoding-offset-value')).toHaveText('7');
    await expect(page.locator('#display-ciphertext')).not.toHaveText(initialCiphertext);
    await expect(page.locator('#display-encoding-alphabet-to')).not.toHaveText(initialAlphabetTo);

    // 5. Action: Drag the slider to its maximum value (25).
    const newCiphertext = await page.locator('#display-ciphertext').innerText();
    const newAlphabetTo = await page.locator('#display-encoding-alphabet-to').innerText();
    await page.locator('#slider-encoding-offset').fill('25');

    // 6. Assert: The value display shows "25", and the text in `display-ciphertext` and `display-encoding-alphabet-to` has changed again.
    await expect(page.locator('#span-encoding-offset-value')).toHaveText('25');
    await expect(page.locator('#display-ciphertext')).not.toHaveText(newCiphertext);
    await expect(page.locator('#display-encoding-alphabet-to')).not.toHaveText(newAlphabetTo);
  });

  test('Encoding Virtual Keyboard', async ({ page }) => {
    // 1. Assert: The encoding virtual keyboard (`#keyboard-encoding`) and its keys are visible.
    await expect(page.locator('#keyboard-encoding')).toBeVisible();
    await expect(page.locator('#keyboard-encoding button').first()).toBeVisible();

    // 2. Assert: The `display-message` span is initially empty.
    await expect(page.locator('#display-message')).toBeEmpty();

    // 3. Action: Click the virtual keys 'H', 'E', 'L', 'L', 'O', ' ', 'W', 'O', 'R', 'L', 'D'.
    const keyboard = page.locator('#keyboard-encoding');
    for (const char of ['H', 'E', 'L', 'L', 'O', 'SPACE', 'W', 'O', 'R', 'L', 'D']) {
      await keyboard.getByText(char, { exact: true }).click();
    }

    // 4. Assert: The `display-message` span shows "HELLO WORLD" and the `display-plaintext` span shows "HELLOWORLD".
    await expect(page.locator('#display-message')).toHaveText('HELLO WORLD');
    await expect(page.locator('#display-plaintext')).toHaveText('HELLOWXORLD'); // As per logic: space -> X

    // 5. Action: Click the 'BACKSPACE' key twice.
    await keyboard.getByText('BACKSPACE').click();
    await keyboard.getByText('BACKSPACE').click();

    // 6. Assert: The `display-message` span is updated to "HELLO WOR" and the `display-plaintext` is updated accordingly.
    await expect(page.locator('#display-message')).toHaveText('HELLO WOR');
    await expect(page.locator('#display-plaintext')).toHaveText('HELLOWXOR');
  });

  test('Intercept Encrypted Message Button', async ({ page }) => {
    // 1. Assert: The "intercept an encrypted message" button (`#btn-intercept`) is visible on the decoding panel.
    await page.locator('#btn-toggle-decoding').click();
    await expect(page.locator('#btn-intercept')).toBeVisible();

    // 2. Assert: The `display-intercept` span on the decoding panel is initially empty.
    await expect(page.locator('#display-intercept')).toBeEmpty();

    // 3. Action: On the encoding panel, generate a ciphertext. Switch to the decoding panel and click the "intercept an encrypted message" button.
    await page.locator('#btn-toggle-encoding').click();
    await page.locator('#select-message').selectOption({ label: 'THE IDES OF MARCH ARE COME' });
    await page.locator('#slider-encoding-offset').fill('3');
    const ciphertext1 = await page.locator('#display-ciphertext').innerText();

    await page.locator('#btn-toggle-decoding').click();
    await page.locator('#btn-intercept').click();

    // 4. Assert: The `display-intercept` span is populated with the ciphertext from the encoding panel and the decoding table is populated.
    await expect(page.locator('#display-intercept')).toHaveText(ciphertext1);
    await expect(page.locator('#table-decoding-output tbody tr')).not.toHaveCount(0);

    // 5. Action: Return to the encoding panel, clear the message, enter a new message, generate a new ciphertext, then switch and click the intercept button again.
    await page.locator('#btn-toggle-encoding').click();
    await page.locator('#btn-clear-encoding').click();
    const keyboard = page.locator('#keyboard-encoding');
    for (const char of ['H', 'E', 'L', 'L', 'O']) {
        await keyboard.getByText(char).click();
    }
    const ciphertext2 = await page.locator('#display-ciphertext').innerText();
    
    await page.locator('#btn-toggle-decoding').click();
    await page.locator('#btn-intercept').click();

    // 6. Assert: The `display-intercept` span is updated with the new ciphertext.
    await expect(page.locator('#display-intercept')).toHaveText(ciphertext2);
  });

  test('Clear Decoding Area Button', async ({ page }) => {
    // 1. Assert: The "clear decoding area" button (`#btn-clear-decoding`) is visible on the decoding panel.
    await page.locator('#btn-toggle-decoding').click();
    await expect(page.locator('#btn-clear-decoding')).toBeVisible();

    // 2. Assert: The `display-intercept` span and the decoding table body are initially empty.
    await expect(page.locator('#display-intercept')).toBeEmpty();
    await expect(page.locator('#table-decoding-output tbody')).toBeEmpty();

    // 3. Action: Intercept a message, populating the `display-intercept` span and the decoding table.
    await page.locator('#btn-toggle-encoding').click();
    await page.locator('#select-message').selectOption({ label: 'THE IDES OF MARCH ARE COME' });
    await page.locator('#btn-toggle-decoding').click();
    await page.locator('#btn-intercept').click();

    // 4. Assert: The `display-intercept` span contains text and the decoding table has rows.
    await expect(page.locator('#display-intercept')).not.toBeEmpty();
    await expect(page.locator('#table-decoding-output tbody tr')).toHaveCount(5);

    // 5. Action: Click the "clear decoding area" button.
    await page.locator('#btn-clear-decoding').click();

    // 6. Assert: The `display-intercept` span is cleared, the decoding table body is empty, and the decoding offset slider is reset to 0.
    await expect(page.locator('#display-intercept')).toBeEmpty();
    await expect(page.locator('#table-decoding-output tbody')).toBeEmpty();
    await expect(page.locator('#slider-decoding-offset')).toHaveValue('0');
  });

  test('Decoding Offset Slider', async ({ page }) => {
    // Setup: Intercept a message first
    await page.locator('#select-message').selectOption({ label: 'THE IDES OF MARCH ARE COME' });
    await page.locator('#slider-encoding-offset').fill('5');
    await page.locator('#btn-toggle-decoding').click();
    await page.locator('#btn-intercept').click();

    // 1. Assert: The decoding offset slider (`#slider-decoding-offset`) is visible on the decoding panel.
    await expect(page.locator('#slider-decoding-offset')).toBeVisible();

    // 2. Assert: The slider's default value is 0, and the associated value display (`#span-decoding-offset-value`) shows "0".
    await expect(page.locator('#slider-decoding-offset')).toHaveValue('0');
    await expect(page.locator('#span-decoding-offset-value')).toHaveText('0');

    // 3. Action: Intercept a message and drag the slider to a value of -3.
    const initialTableContent = await page.locator('#table-decoding-output').innerHTML();
    const initialAlphabetMap = await page.locator('#display-decoding-alphabet-from').innerText();
    await page.locator('#slider-decoding-offset').fill('-3');

    // 4. Assert: The value display shows "-3", and the content of the decoding table (`#table-decoding-output`) and the decoding alphabet map have changed.
    await expect(page.locator('#span-decoding-offset-value')).toHaveText('-3');
    await expect(page.locator('#table-decoding-output')).not.innerHTML(initialTableContent);
    await expect(page.locator('#display-decoding-alphabet-from')).not.toHaveText(initialAlphabetMap);

    // 5. Action: Drag the slider to its minimum value (-25).
    const newTableContent = await page.locator('#table-decoding-output').innerHTML();
    const newAlphabetMap = await page.locator('#display-decoding-alphabet-from').innerText();
    await page.locator('#slider-decoding-offset').fill('-25');

    // 6. Assert: The value display shows "-25", and the content of the decoding table and the alphabet map have changed again.
    await expect(page.locator('#span-decoding-offset-value')).toHaveText('-25');
    await expect(page.locator('#table-decoding-output')).not.innerHTML(newTableContent);
    await expect(page.locator('#display-decoding-alphabet-from')).not.toHaveText(newAlphabetMap);
  });

  test('Decoding Virtual Keyboard', async ({ page }) => {
    // 1. Assert: The decoding virtual keyboard (`#keyboard-decoding`) and its keys are visible on the decoding panel.
    await page.locator('#btn-toggle-decoding').click();
    await expect(page.locator('#keyboard-decoding')).toBeVisible();
    await expect(page.locator('#keyboard-decoding button').first()).toBeVisible();

    // 2. Assert: The `display-intercept` span is initially empty.
    await expect(page.locator('#display-intercept')).toBeEmpty();

    // 3. Action: Click the virtual keys 'Q', 'H', 'Q', 'Z', 'J'.
    const keyboard = page.locator('#keyboard-decoding');
    for (const char of ['Q', 'H', 'Q', 'Z', 'J']) {
      await keyboard.getByText(char, { exact: true }).click();
    }

    // 4. Assert: The `display-intercept` span shows "QHQZJ" and the decoding table is populated with decryption attempts.
    await expect(page.locator('#display-intercept')).toHaveText('QHQZJ');
    await expect(page.locator('#table-decoding-output tbody tr')).toHaveCount(5);

    // 5. Action: Click the 'BACKSPACE' key.
    await keyboard.getByText('BACKSPACE').click();

    // 6. Assert: The `display-intercept` span is updated to "QHQZ" and the decoding table content is updated.
    await expect(page.locator('#display-intercept')).toHaveText('QHQZ');
    await expect(page.locator('#table-decoding-output tbody tr')).toHaveCount(5); // Table should still be populated but with different content
  });
});