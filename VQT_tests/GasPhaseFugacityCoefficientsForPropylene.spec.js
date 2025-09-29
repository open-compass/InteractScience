const { test, expect } = require('@playwright/test');

const fileUrl = 'file://' + require('path').resolve(__dirname, '../pages/GasPhaseFugacityCoefficientsForPropylene.html');

test.describe('Gas Phase Fugacity Coefficients for Propylene', () => {

  test('SRK plot at P=10 without Aspen comparison data', async ({ page }) => {
    await page.goto(fileUrl);
    
    // Action: Uncheck the checkbox with id `checkbox-aspen`.
    await page.locator('#checkbox-aspen').uncheck();
    
    // Assert: Take a screenshot of the current UI state.
    await page.screenshot({ path: './snapshots/GasPhaseFugacityCoefficientsForPropylene-1.png', fullPage: true });
  });

  test('SRK plot at a low pressure of 2 bar', async ({ page }) => {
    await page.goto(fileUrl);
    
    // Action: Set the value of the slider with id `slider-pressure` to 2.
    await page.locator('#slider-pressure').fill('2');
    
    // Assert: Take a screenshot of the current UI state.
    await page.screenshot({ path: './snapshots/GasPhaseFugacityCoefficientsForPropylene-2.png', fullPage: true });
  });

  test('PR plot at a pressure of 12 bar', async ({ page }) => {
    await page.goto(fileUrl);
    
    // Action: Click the button with id `btn-pr`.
    await page.locator('#btn-pr').click();
    
    // Action: Set the value of the slider with id `slider-pressure` to 12.
    await page.locator('#slider-pressure').fill('12');
    
    // Assert: Take a screenshot of the current UI state.
    await page.screenshot({ path: './snapshots/GasPhaseFugacityCoefficientsForPropylene-3.png', fullPage: true });
  });

  test('Default view with SRK plot and Aspen comparison data at P=10', async ({ page }) => {
    await page.goto(fileUrl);
    
    // Action: Set the value of the slider with id `slider-pressure` to 1.
    await page.locator('#slider-pressure').fill('1');
    
    // Action: Set the value of the slider with id `slider-pressure` to 10.
    await page.locator('#slider-pressure').fill('10');
    
    // Assert: Take a screenshot of the current UI state.
    await page.screenshot({ path: './snapshots/GasPhaseFugacityCoefficientsForPropylene-4.png', fullPage: true });
  });
});