const { test, expect } = require('@playwright/test');

const fileUrl = 'file://' + require('path').resolve(__dirname, '../pages/TimeShiftingAndTimeScalingInSignalProcessing.html');

test.describe('Time Shifting and Scaling Tests', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(fileUrl);
    // Wait for Plotly to render the graphs
    // await page.waitForSelector('#plot-top .plot-container.plotly');
    // await page.waitForSelector('#plot-bottom .plot-container.plotly');
    await page.waitForTimeout(500);
  });

  test('Test "TopHat" Signal Button', async ({ page }) => {
    await expect(page.locator('#btn-tophat')).toBeVisible();
    await expect(page.locator('#btn-tophat')).toHaveText('TopHat');
    
    await expect(page.locator('#btn-triangle')).toHaveClass(/active/);
    await expect(page.locator('#btn-tophat')).not.toHaveClass(/active/);
    
    const initialTopPath = await page.locator('#plot-top .traces .trace:first-of-type path').getAttribute('d');
    
    await page.locator('#btn-tophat').click();
    
    await expect(page.locator('#btn-tophat')).toHaveClass(/active/);
    const newTopPath = await page.locator('#plot-top .traces .trace:first-of-type path').getAttribute('d');
    expect(newTopPath).not.toEqual(initialTopPath);
    
    // Check if bottom plot also updated
    const bottomPlotTraceY = await page.locator('#plot-bottom .traces .trace:nth-of-type(2) path').getAttribute('d');
    expect(bottomPlotTraceY).toBeDefined();

    await page.locator('#btn-triangle').click();
    
    await expect(page.locator('#btn-triangle')).toHaveClass(/active/);
    const finalTopPath = await page.locator('#plot-top .traces .trace:first-of-type path').getAttribute('d');
    expect(finalTopPath).toEqual(initialTopPath);
  });

  test('Test Time Scaling \'a\' Slider', async ({ page }) => {
    await expect(page.locator('#slider-a')).toBeVisible();
    
    await expect(page.locator('#slider-a')).toHaveValue('2');
    await expect(page.locator('#slider-a-value')).toHaveText(/^2\.00*$/);
    
    const initialYTrace = await page.locator('#plot-bottom .traces .trace:nth-of-type(2) path').getAttribute('d');
    const initialTValue = await page.locator('#slider-t-value').textContent();

    await page.locator('#slider-a').fill('3');
    
    await expect(page.locator('#slider-a-value')).toHaveText(/^3\.00*$/);
    await expect(page.locator('#slider-t-value')).not.toHaveText(initialTValue);
    const updatedYTrace = await page.locator('#plot-bottom .traces .trace:nth-of-type(2) path').getAttribute('d');
    expect(updatedYTrace).not.toEqual(initialYTrace);
    
    await page.locator('#slider-a').fill('4');
    
    await expect(page.locator('#slider-a-value')).toHaveText(/^4\.00*$/);
    const finalYTrace = await page.locator('#plot-bottom .traces .trace:nth-of-type(2) path').getAttribute('d');
    expect(finalYTrace).not.toEqual(updatedYTrace);
  });

  test('Test Time Shift \'b\' Slider', async ({ page }) => {
    await expect(page.locator('#slider-b')).toBeVisible();
    
    await expect(page.locator('#slider-b')).toHaveValue('4');
    await expect(page.locator('#slider-b-value')).toHaveText(/^4\.00*$/);
    
    const initialYTrace = await page.locator('#plot-bottom .traces .trace:nth-of-type(2) path').getAttribute('d');
    const initialZTrace = await page.locator('#plot-bottom .traces .trace:nth-of-type(3) path').getAttribute('d');
    const initialBMarkerX = await page.locator('#plot-bottom .annotation-text[data-unformatted="b"]').getAttribute('x');

    await page.locator('#slider-b').fill('-5.0');
    
    await expect(page.locator('#slider-b-value')).toHaveText(/^\-5\.00*$/);
    const newBMarkerX = await page.locator('#plot-bottom .annotation-text[data-unformatted="b"]').getAttribute('x');
    expect(newBMarkerX).not.toEqual(initialBMarkerX);
    const updatedYTrace = await page.locator('#plot-bottom .traces .trace:nth-of-type(2) path').getAttribute('d');
    const updatedZTrace = await page.locator('#plot-bottom .traces .trace:nth-of-type(3) path').getAttribute('d');
    expect(updatedYTrace).not.toEqual(initialYTrace);
    expect(updatedZTrace).not.toEqual(initialZTrace);
    
    await page.locator('#slider-b').fill('-10');
    
    await expect(page.locator('#slider-b-value')).toHaveText(/^\-10\.00*$/);
    const finalBMarkerX = await page.locator('#plot-bottom .annotation-text[data-unformatted="b"]').getAttribute('x');
    expect(finalBMarkerX).not.toEqual(newBMarkerX);
    const finalYTrace = await page.locator('#plot-bottom .traces .trace:nth-of-type(2) path').getAttribute('d');
    const finalZTrace = await page.locator('#plot-bottom .traces .trace:nth-of-type(3) path').getAttribute('d');
    expect(finalYTrace).not.toEqual(updatedYTrace);
    expect(finalZTrace).not.toEqual(updatedZTrace);
  });

  test('Test Derived Time Shift \'T\' Slider', async ({ page }) => {
    await expect(page.locator('#slider-t')).toBeVisible();

    await expect(page.locator('#slider-t')).toHaveValue('2');
    await expect(page.locator('#slider-t-value')).toHaveText(/^2\.00*$/);
    
    const initialTMarkerX = await page.locator('#plot-bottom .annotation-text[data-unformatted="T"]').getAttribute('x');
    const initialBValue = await page.locator('#slider-b-value').textContent();

    await page.locator('#slider-t').fill('5');
    
    await expect(page.locator('#slider-t-value')).toHaveText(/^5\.00*$/);
    const newTMarkerX = await page.locator('#plot-bottom .annotation-text[data-unformatted="T"]').getAttribute('x');
    expect(newTMarkerX).not.toEqual(initialTMarkerX);
    await expect(page.locator('#slider-b-value')).not.toHaveText(initialBValue);
    
    await page.locator('#slider-t').fill('25');
    
    await expect(page.locator('#slider-t-value')).toHaveText(/^25\.00*$/);
    const finalTMarkerX = await page.locator('#plot-bottom .annotation-text[data-unformatted="T"]').getAttribute('x');
    expect(finalTMarkerX).not.toEqual(newTMarkerX);
    await expect(page.locator('#plot-bottom .traces .trace:nth-of-type(2) path')).not.toHaveAttribute('d', await page.locator('#plot-bottom .traces .trace:nth-of-type(2) path').getAttribute('d'));
  });

  test('Test Display Checkbox for x(t)', async ({ page }) => {
    await expect(page.locator('#check-x')).toBeVisible();
    
    await expect(page.locator('#check-x')).toBeChecked();
    await expect(page.locator('#plot-bottom .traces .trace:nth-of-type(1)')).toBeVisible();
    
    await page.locator('#check-x').uncheck();
    
    await expect(page.locator('#plot-bottom .traces .trace:nth-of-type(1)')).toBeHidden();
    
    await page.locator('#check-x').check();
    
    await expect(page.locator('#plot-bottom .traces .trace:nth-of-type(1)')).toBeVisible();
  });

  test('Test Display Checkbox for y(t)', async ({ page }) => {
    await expect(page.locator('#check-y')).toBeVisible();
    
    await expect(page.locator('#check-y')).toBeChecked();
    await expect(page.locator('#plot-bottom .traces .trace:nth-of-type(2)')).toBeVisible();
    
    await page.locator('#check-y').uncheck();
    
    await expect(page.locator('#plot-bottom .traces .trace:nth-of-type(2)')).toBeHidden();
    
    await page.locator('#check-y').check();
    
    await expect(page.locator('#plot-bottom .traces .trace:nth-of-type(2)')).toBeVisible();
  });

  test('Test Display Checkbox for z(t)', async ({ page }) => {
    await expect(page.locator('#check-z')).toBeVisible();
    
    await expect(page.locator('#check-z')).toBeChecked();
    await expect(page.locator('#plot-bottom .traces .trace:nth-of-type(3)')).toBeVisible();
    
    await page.locator('#check-z').uncheck();
    
    await expect(page.locator('#plot-bottom .traces .trace:nth-of-type(3)')).toBeHidden();
    
    await page.locator('#check-z').check();
    
    await expect(page.locator('#plot-bottom .traces .trace:nth-of-type(3)')).toBeVisible();
  });

  test('Test Display Checkbox for w(t)', async ({ page }) => {
    await expect(page.locator('#check-w')).toBeVisible();
    
    await expect(page.locator('#check-w')).not.toBeChecked();
    await expect(page.locator('#plot-bottom .traces .trace:nth-of-type(4)')).toBeHidden();
    
    await page.locator('#check-w').check();
    
    await expect(page.locator('#plot-bottom .traces .trace:nth-of-type(4)')).toBeVisible();
    
    await page.locator('#check-w').uncheck();
    
    await expect(page.locator('#plot-bottom .traces .trace:nth-of-type(4)')).toBeHidden();
  });
});