const { test, expect } = require('@playwright/test');

const fileUrl = 'file://' + require('path').resolve(__dirname, '../pages/ModelForTheFormulationOfMultilayeredEmulsions.html');

test.describe('Model for the Formulation of Multilayered Emulsions', () => {

  test('Initial state of the emulsion stability model', async ({ page }) => {
    await page.goto(fileUrl);
    // Allow time for Plotly and MathJax to render
    await page.waitForTimeout(1000); 
    await page.screenshot({ path: './snapshots/ModelForTheFormulationOfMultilayeredEmulsions-1.png', fullPage: true });
  });

  test('Plot updated with new biopolymer properties', async ({ page }) => {
    await page.goto(fileUrl);
    await page.locator('#slider-r').fill('250');
    await page.locator('#slider-mw').fill('200');
    // Allow time for Plotly and MathJax to render
    await page.waitForTimeout(500);
    await page.screenshot({ path: './snapshots/ModelForTheFormulationOfMultilayeredEmulsions-2.png', fullPage: true });
  });

  test('Plot displaying a narrow stability region with adjusted axes', async ({ page }) => {
    await page.goto(fileUrl);
    await page.locator('#slider-gamma-sat').fill('6');
    await page.locator('#slider-rpe').fill('40');
    await page.locator('#slider-mw').fill('400');
    await page.locator('#slider-phi-axis').fill('0.01');
    await page.locator('#slider-c-axis').fill('3');
    // Allow time for Plotly and MathJax to render
    await page.waitForTimeout(500);
    await page.screenshot({ path: './snapshots/ModelForTheFormulationOfMultilayeredEmulsions-3.png', fullPage: true });
  });

  test('Plot showing a wide stability region with expanded x-axis', async ({ page }) => {
    await page.goto(fileUrl);
    await page.locator('#slider-gamma-sat').fill('0.5');
    await page.locator('#slider-r').fill('500');
    await page.locator('#slider-rpe').fill('15');
    await page.locator('#slider-mw').fill('150');
    await page.locator('#slider-phi-axis').fill('0.25');
    await page.locator('#slider-c-axis').fill('1.7');
    // Allow time for Plotly and MathJax to render
    await page.waitForTimeout(500);
    await page.screenshot({ path: './snapshots/ModelForTheFormulationOfMultilayeredEmulsions-4.png', fullPage: true });
  });

});