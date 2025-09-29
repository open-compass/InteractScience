const { test, expect } = require('@playwright/test');

test.describe('EffectOfKeywordLengthOnTheLetterFrequencyInEncryptedMessages', () => {
    const fileUrl = 'file://' + require('path').resolve(__dirname, '../pages/EffectOfKeywordLengthOnTheLetterFrequencyInEncryptedMessages.html');

    test('Controls set for De Vigenere cipher after changing offset', async ({ page }) => {
        await page.goto(fileUrl);
        await page.locator('#slider-offset').fill('13');
        await page.locator('#select-cipher').selectOption('De Vigenere');
        await page.screenshot({ path: './snapshots/EffectOfKeywordLengthOnTheLetterFrequencyInEncryptedMessages-1.png', fullPage: true });
    });

    test('Default view of Caesar cipher with offset 7', async ({ page }) => {
        await page.goto(fileUrl);
        await page.locator('#select-message').selectOption('GettysburgAddress');
        await page.locator('#select-message').selectOption('DeclarationOfIndependence');
        await page.screenshot({ path: './snapshots/EffectOfKeywordLengthOnTheLetterFrequencyInEncryptedMessages-2.png', fullPage: true });
    });

    test('View set to De Vigenere cipher with keyword "yes"', async ({ page }) => {
        await page.goto(fileUrl);
        await page.locator('#select-cipher').selectOption('De Vigenere');
        await page.locator('#input-keyword').fill('yes');
        await page.screenshot({ path: './snapshots/EffectOfKeywordLengthOnTheLetterFrequencyInEncryptedMessages-3.png', fullPage: true });
    });

    test('View set to Autokey cipher with a 26-letter keyword', async ({ page }) => {
        await page.goto(fileUrl);
        await page.locator('#select-cipher').selectOption('Autokey');
        await page.locator('#input-keyword').fill('abcdefghijklmnopqrstuvwxyz');
        await page.screenshot({ path: './snapshots/EffectOfKeywordLengthOnTheLetterFrequencyInEncryptedMessages-4.png', fullPage: true });
    });
});