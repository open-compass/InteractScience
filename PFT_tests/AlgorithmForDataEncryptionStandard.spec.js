const { test, expect } = require('@playwright/test');

const fileUrl = 'file://' + require('path').resolve(__dirname, '../pages/AlgorithmForDataEncryptionStandard.html');

test.beforeEach(async ({ page }) => {
  await page.goto(fileUrl);
  await page.waitForTimeout(500);
});

test.describe('Algorithm for Data Encryption Standard', () => {

  test('Message Text Input', async ({ page }) => {
    // 1. Assert: The text input with id="input-message" is visible.
    const messageInput = page.locator('#input-message');
    await expect(messageInput).toBeVisible();

    // 2. Assert: The value of the input is "hello".
    await expect(messageInput).toHaveValue('hello');
    const initialOutput = await page.locator('#output-results').textContent();

    // 3. Action: Change the text in the #input-message field to "this is a secret message".
    await messageInput.fill('this is a secret message');

    // 4. Assert: The content of the #output-results element changes.
    await expect(page.locator('#output-results')).not.toHaveText(initialOutput);
    const updatedOutput = await page.locator('#output-results').textContent();

    // 5. Action: Clear the text in the #input-message field.
    await messageInput.fill('');

    // 6. Assert: The content of the #output-results element updates.
    await expect(page.locator('#output-results')).not.toHaveText(updatedOutput);
  });

  test('Key Text Input', async ({ page }) => {
    // 1. Assert: The text input with id="input-key" is visible.
    const keyInput = page.locator('#input-key');
    await expect(keyInput).toBeVisible();

    // 2. Assert: The value of the input is "test".
    await expect(keyInput).toHaveValue('test');
    const initialOutput = await page.locator('#output-results').textContent();

    // 3. Action: Change the text in the #input-key field to "quiz".
    await keyInput.fill('quiz');

    // 4. Assert: The content of the #output-results element changes.
    await expect(page.locator('#output-results')).not.toHaveText(initialOutput);

    // 5. Action: Change the text in the #input-key field back to "test".
    await keyInput.fill('test');

    // 6. Assert: The content of the #output-results element reverts to its initial state.
    await expect(page.locator('#output-results')).toHaveText(initialOutput);
  });

  test('Steps Segmented Control', async ({ page }) => {
    // 1. Assert: The labels for the steps radio buttons (2, 4, 8, 16) are visible.
    await expect(page.locator('label[for="radio-steps-2"]')).toBeVisible();
    await expect(page.locator('label[for="radio-steps-4"]')).toBeVisible();
    await expect(page.locator('label[for="radio-steps-8"]')).toBeVisible();
    await expect(page.locator('label[for="radio-steps-16"]')).toBeVisible();

    // 2. Assert: The radio button with id="radio-steps-16" is checked, and its corresponding label has a "selected" style.
    await expect(page.locator('#radio-steps-16')).toBeChecked();
    // Note: Testing for a specific "selected" style is omitted as the exact CSS implementation is not provided.
    // The primary behavioral check is the radio button's checked state.

    // 3. Action: Click the label for the "8" steps radio button.
    await page.locator('label[for="radio-steps-8"]').click();

    // 4. Assert: The radio button with id="radio-steps-8" is now checked, and the output in #output-results updates to show a maximum of 8 steps.
    await expect(page.locator('#radio-steps-8')).toBeChecked();
    const outputFor8Steps = await page.locator('#output-results').textContent();
    expect(outputFor8Steps).toContain(' 8 ');
    expect(outputFor8Steps).not.toContain(' 10 ');

    // 5. Action: Click the label for the "2" steps radio button.
    await page.locator('label[for="radio-steps-2"]').click();

    // 6. Assert: The radio button with id="radio-steps-2" is now checked, and the output in #output-results updates to show only the results for 2 permutations.
    await expect(page.locator('#radio-steps-2')).toBeChecked();
    const outputFor2Steps = await page.locator('#output-results').textContent();
    expect(outputFor2Steps).toContain(' 2 ');
    expect(outputFor2Steps).not.toContain(' 4 ');
  });

});