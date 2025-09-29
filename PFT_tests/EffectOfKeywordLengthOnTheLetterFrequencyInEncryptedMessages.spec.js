const { test, expect } = require('@playwright/test');

// Define the path to the local HTML file
const fileUrl = 'file://' + require('path').resolve(__dirname, '../pages/EffectOfKeywordLengthOnTheLetterFrequencyInEncryptedMessages.html');

// Main test suite for the encryption visualization page
test.describe('Interactive Encryption Visualization', () => {

  // Navigate to the page before each test to ensure a clean state
  test.beforeEach(async ({ page }) => {
    await page.goto(fileUrl);
    // Wait for the Plotly charts to be rendered initially
    // await page.waitForSelector('#original-chart .plotly');
    // await page.waitForSelector('#encrypted-chart .plotly');
    await page.waitForTimeout(500);
  });

  test('Message Selector Control', async ({ page }) => {
    // 1. Assert: The message dropdown #select-message is visible.
    await expect(page.locator('#select-message')).toBeVisible();

    // 2. Assert: The selected option is "Declaration of Independence" by default.
    await expect(page.locator('#select-message')).toHaveValue('DeclarationOfIndependence');
    const initialOriginalText = await page.locator('#original-text').innerText();
    const initialOriginalChart = await page.locator('#original-chart .plotly').innerHTML();

    // 3. Action: Select "Gettysburg Address" from the dropdown.
    await page.locator('#select-message').selectOption('GettysburgAddress');

    // 4. Assert: The text in #original-text and the data in the #original-chart are updated.
    await expect(page.locator('#original-text')).not.toHaveText(initialOriginalText);
    const updatedOriginalChart = await page.locator('#original-chart .plotly').innerHTML();
    expect(updatedOriginalChart).not.toBe(initialOriginalChart);

    // 5. Action: Select "Declaration of Independence" again.
    await page.locator('#select-message').selectOption('DeclarationOfIndependence');

    // 6. Assert: The text in #original-text and the data in the #original-chart revert to their initial state.
    await expect(page.locator('#original-text')).toHaveText(initialOriginalText);
    const revertedOriginalChart = await page.locator('#original-chart .plotly').innerHTML();
    expect(revertedOriginalChart).toBe(initialOriginalChart);
  });

  test('Cipher Selector Control', async ({ page }) => {
    // 1. Assert: The cipher dropdown #select-cipher is visible.
    await expect(page.locator('#select-cipher')).toBeVisible();

    // 2. Assert: The selected option is "Caesar" by default, and the #slider-offset is enabled while #input-keyword is disabled.
    await expect(page.locator('#select-cipher')).toHaveValue('Caesar');
    await expect(page.locator('#slider-offset')).toBeEnabled();
    await expect(page.locator('#input-keyword')).toBeDisabled();
    const initialEncryptedChart = await page.locator('#encrypted-chart .plotly').innerHTML();

    // 3. Action: Select "De Vigenere" from the dropdown.
    await page.locator('#select-cipher').selectOption('De Vigenere');

    // 4. Assert: The #input-keyword becomes enabled, #slider-offset becomes disabled, and the #encrypted-chart is updated.
    await expect(page.locator('#input-keyword')).toBeEnabled();
    await expect(page.locator('#slider-offset')).toBeDisabled();
    const deVigenereChart = await page.locator('#encrypted-chart .plotly').innerHTML();
    expect(deVigenereChart).not.toBe(initialEncryptedChart);

    // 5. Action: Select "Caesar" again.
    await page.locator('#select-cipher').selectOption('Caesar');

    // 6. Assert: The #slider-offset becomes enabled, #input-keyword becomes disabled, and the #encrypted-chart is updated.
    await expect(page.locator('#slider-offset')).toBeEnabled();
    await expect(page.locator('#input-keyword')).toBeDisabled();
    const revertedEncryptedChart = await page.locator('#encrypted-chart .plotly').innerHTML();
    expect(revertedEncryptedChart).toBe(initialEncryptedChart);
  });

  test('Keyword Input Field Control', async ({ page }) => {
    // 1. Assert: The keyword input field #input-keyword is visible.
    await expect(page.locator('#input-keyword')).toBeVisible();

    // 2. Assert: The input field's value is "united" and it is disabled by default.
    await expect(page.locator('#input-keyword')).toHaveValue('united');
    await expect(page.locator('#input-keyword')).toBeDisabled();

    // 3. Action: Change the cipher to "De Vigenere" and then change the keyword to "crypto".
    await page.locator('#select-cipher').selectOption('De Vigenere');
    const encryptedTextBeforeChange = await page.locator('#encrypted-text').innerText();
    const encryptedChartBeforeChange = await page.locator('#encrypted-chart .plotly').innerHTML();

    await page.locator('#input-keyword').fill('crypto');

    // 4. Assert: The text in #encrypted-text and the data in #encrypted-chart are updated.
    await expect(page.locator('#encrypted-text')).not.toHaveText(encryptedTextBeforeChange);
    const encryptedChartAfterCrypto = await page.locator('#encrypted-chart .plotly').innerHTML();
    expect(encryptedChartAfterCrypto).not.toBe(encryptedChartBeforeChange);

    const encryptedTextWithCrypto = await page.locator('#encrypted-text').innerText();

    // 5. Action: Delete all characters from the keyword input.
    await page.locator('#input-keyword').fill('');

    // 6. Assert: The text in #encrypted-text and the data in #encrypted-chart are updated again (reflecting the default "a" key).
    await expect(page.locator('#encrypted-text')).not.toHaveText(encryptedTextWithCrypto);
    const encryptedChartAfterEmpty = await page.locator('#encrypted-chart .plotly').innerHTML();
    expect(encryptedChartAfterEmpty).not.toBe(encryptedChartAfterCrypto);
  });

  test('Offset Slider Control', async ({ page }) => {
    // 1. Assert: The offset slider #slider-offset is visible.
    await expect(page.locator('#slider-offset')).toBeVisible();

    // 2. Assert: The slider's value is 7 and the #offset-value span displays "7".
    await expect(page.locator('#slider-offset')).toHaveValue('7');
    await expect(page.locator('#offset-value')).toHaveText('7');
    const initialEncryptedChart = await page.locator('#encrypted-chart .plotly').innerHTML();

    // 3. Action: Drag the slider to value 20.
    await page.locator('#slider-offset').fill('20');

    // 4. Assert: The #offset-value span updates to "20", and the #encrypted-chart is updated.
    await expect(page.locator('#offset-value')).toHaveText('20');
    const chartAtOffset20 = await page.locator('#encrypted-chart .plotly').innerHTML();
    expect(chartAtOffset20).not.toBe(initialEncryptedChart);

    // 5. Action: Drag the slider to its minimum value, 0.
    await page.locator('#slider-offset').fill('0');

    // 6. Assert: The #offset-value span updates to "0", and the #encrypted-chart is updated.
    await expect(page.locator('#offset-value')).toHaveText('0');
    const chartAtOffset0 = await page.locator('#encrypted-chart .plotly').innerHTML();
    expect(chartAtOffset0).not.toBe(chartAtOffset20);
  });

});