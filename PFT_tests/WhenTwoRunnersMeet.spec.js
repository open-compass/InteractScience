const { test, expect } = require('@playwright/test');
const path = require('path');

const fileUrl = 'file://' + path.resolve(__dirname, '../pages/WhenTwoRunnersMeet.html');

test.describe('When Two Runners Meet Visualization', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(fileUrl);
    // Wait for Plotly to be ready
    // await page.waitForSelector('#plot-container .plot-container');
    await page.waitForTimeout(500);
  });

  test('Runner 1 Initial Position Slider (`x₁`)', async ({ page }) => {
    const slider = page.locator('#slider-x1');
    const valueDisplay = page.locator('#value-x1');
    const resultText = page.locator('#result-text');
    const plotTrace1 = page.locator('#plot-container .traces .trace:nth-child(1) path');

    await expect(slider).toBeVisible();
    await expect(slider).toHaveValue('500');
    await expect(valueDisplay).toHaveText('500');

    const initialResult = await resultText.textContent();
    const initialPlotPath = await plotTrace1.getAttribute('d');

    await slider.fill('840');
    await expect(valueDisplay).toHaveText('840');
    await expect(resultText).not.toHaveText(initialResult);
    await expect(plotTrace1).not.toHaveAttribute('d', initialPlotPath);

    const midResult = await resultText.textContent();
    const midPlotPath = await plotTrace1.getAttribute('d');

    await slider.fill('1000');
    await expect(valueDisplay).toHaveText('1000');
    await expect(resultText).not.toHaveText(midResult);
    await expect(plotTrace1).not.toHaveAttribute('d', midPlotPath);
  });

  test('Runner 1 Velocity Slider (`v₁`)', async ({ page }) => {
    const slider = page.locator('#slider-v1');
    const valueDisplay = page.locator('#value-v1');
    const resultText = page.locator('#result-text');
    const plotTrace1 = page.locator('#plot-container .traces .trace:nth-child(1) path');

    await expect(slider).toBeVisible();
    await expect(slider).toHaveValue('-10');
    await expect(valueDisplay).toHaveText(/^\-10\.000*$/);

    const initialResult = await resultText.textContent();
    const initialPlotPath = await plotTrace1.getAttribute('d');

    await slider.fill('5.15');
    await expect(valueDisplay).toHaveText(/^5\.150*$/);
    await expect(resultText).not.toHaveText(initialResult);
    await expect(plotTrace1).not.toHaveAttribute('d', initialPlotPath);

    const midResult = await resultText.textContent();
    const midPlotPath = await plotTrace1.getAttribute('d');

    await slider.fill('-15');
    await expect(valueDisplay).toHaveText(/^\-15\.000*$/);
    await expect(resultText).not.toHaveText(midResult);
    await expect(plotTrace1).not.toHaveAttribute('d', midPlotPath);
  });

  test('Runner 2 Initial Position Slider (`x₂`)', async ({ page }) => {
    const slider = page.locator('#slider-x2');
    const valueDisplay = page.locator('#value-x2');
    const resultText = page.locator('#result-text');
    const plotTrace2 = page.locator('#plot-container .traces .trace:nth-child(2) path');

    await expect(slider).toBeVisible();
    await expect(slider).toHaveValue('100');
    await expect(valueDisplay).toHaveText('100');

    const initialResult = await resultText.textContent();
    const initialPlotPath = await plotTrace2.getAttribute('d');

    await slider.fill('110');
    await expect(valueDisplay).toHaveText('110');
    await expect(resultText).not.toHaveText(initialResult);
    await expect(plotTrace2).not.toHaveAttribute('d', initialPlotPath);

    const midResult = await resultText.textContent();
    const midPlotPath = await plotTrace2.getAttribute('d');

    await slider.fill('-1000');
    await expect(valueDisplay).toHaveText('-1000');
    await expect(resultText).not.toHaveText(midResult);
    await expect(plotTrace2).not.toHaveAttribute('d', midPlotPath);
  });

  test('Runner 2 Velocity Slider (`v₂`)', async ({ page }) => {
    const slider = page.locator('#slider-v2');
    const valueDisplay = page.locator('#value-v2');
    const resultText = page.locator('#result-text');
    const plotTrace2 = page.locator('#plot-container .traces .trace:nth-child(2) path');

    await expect(slider).toBeVisible();
    await expect(slider).toHaveValue('5');
    await expect(valueDisplay).toHaveText(/^5\.000*$/);

    const initialResult = await resultText.textContent();
    const initialPlotPath = await plotTrace2.getAttribute('d');

    await slider.fill('12.38');
    await expect(valueDisplay).toHaveText(/^12\.380*$/);
    await expect(resultText).not.toHaveText(initialResult);
    await expect(plotTrace2).not.toHaveAttribute('d', initialPlotPath);

    const midResult = await resultText.textContent();
    const midPlotPath = await plotTrace2.getAttribute('d');

    await slider.fill('15');
    await expect(valueDisplay).toHaveText(/^15\.000*$/);
    await expect(resultText).not.toHaveText(midResult);
    await expect(plotTrace2).not.toHaveAttribute('d', midPlotPath);
  });

  test('Reset Button', async ({ page }) => {
    const resetButton = page.locator('#btn-reset');
    const sliderX1 = page.locator('#slider-x1');
    const sliderV1 = page.locator('#slider-v1');
    const sliderX2 = page.locator('#slider-x2');
    const sliderV2 = page.locator('#slider-v2');
    const valueX1 = page.locator('#value-x1');
    const valueV1 = page.locator('#value-v1');
    const valueX2 = page.locator('#value-x2');
    const valueV2 = page.locator('#value-v2');
    const resultText = page.locator('#result-text');
    
    await expect(resetButton).toBeVisible();

    const initialResultText = await resultText.textContent();
    await expect(sliderX1).toHaveValue('500');
    await expect(valueX1).toHaveText('500');
    await expect(sliderV1).toHaveValue('-10');
    await expect(valueV1).toHaveText(/^\-10\.000*$/);
    await expect(sliderX2).toHaveValue('100');
    await expect(valueX2).toHaveText('100');
    await expect(sliderV2).toHaveValue('5');
    await expect(valueV2).toHaveText(/^5\.000*$/);

    await sliderX1.fill('0');
    await sliderV2.fill('-5');

    await expect(valueX1).toHaveText('0');
    await expect(valueV2).toHaveText(/^\-5\.000*$/);
    await expect(resultText).not.toHaveText(initialResultText);

    await resetButton.click();

    await expect(valueX1).toHaveText('500');
    await expect(valueV1).toHaveText(/^\-10\.000*$/);
    await expect(valueX2).toHaveText('100');
    await expect(valueV2).toHaveText(/^5\.000*$/);
    await expect(sliderX1).toHaveValue('500');
    await expect(sliderV1).toHaveValue('-10');
    await expect(sliderX2).toHaveValue('100');
    await expect(sliderV2).toHaveValue('5');
    await expect(resultText).toHaveText(initialResultText);
  });
});