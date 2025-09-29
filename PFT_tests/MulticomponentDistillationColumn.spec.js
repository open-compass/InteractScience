const { test, expect } = require('@playwright/test');

const fileUrl = 'file://' + require('path').resolve(__dirname, '../pages/MulticomponentDistillationColumn.html');

test.beforeEach(async ({ page }) => {
  await page.goto(fileUrl);
  await page.waitForTimeout(500);
});

test.describe('Multicomponent Distillation Column Interactions', () => {

  test('Step Variable Radio Group Interaction', async ({ page }) => {
    await expect(page.locator('input[name="step-type"]')).toHaveCount(2);
    await expect(page.locator('label[for="step-reflux"]')).toBeVisible();
    await expect(page.locator('label[for="step-reboil"]')).toBeVisible();

    await expect(page.locator('#step-reflux')).toBeChecked();

    const initialPlotPath = await page.locator('#plot-container .js-line path').getAttribute('d');

    await page.locator('#step-reboil').click();
    await expect(page.locator('#step-reboil')).toBeChecked();

    const plotPathAfterReboil = await page.locator('#plot-container .js-line path').getAttribute('d');
    expect(plotPathAfterReboil).not.toEqual(initialPlotPath);

    await page.locator('#step-reflux').click();
    await expect(page.locator('#step-reflux')).toBeChecked();

    const plotPathAfterReflux = await page.locator('#plot-container .js-line path').getAttribute('d');
    expect(plotPathAfterReflux).not.toEqual(plotPathAfterReboil);
  });

  test('% step Number Input Interaction', async ({ page }) => {
    await expect(page.locator('#step-percent')).toBeVisible();
    await expect(page.locator('label[for="step-percent"]')).toBeVisible();
    
    await expect(page.locator('#step-percent')).toHaveValue('-0.3');
    
    const initialPlotPath = await page.locator('#plot-container .js-line path').getAttribute('d');

    await page.locator('#step-percent').fill('0.5');
    await expect(page.locator('#step-percent')).toHaveValue('0.5');

    const plotPathAfterChange1 = await page.locator('#plot-container .js-line path').getAttribute('d');
    expect(plotPathAfterChange1).not.toEqual(initialPlotPath);

    await page.locator('#step-percent').fill('1');
    await expect(page.locator('#step-percent')).toHaveValue('1');

    const plotPathAfterChange2 = await page.locator('#plot-container .js-line path').getAttribute('d');
    expect(plotPathAfterChange2).not.toEqual(plotPathAfterChange1);
  });

  test('Stage Selection Radio Group Interaction', async ({ page }) => {
    await expect(page.locator('input[name="stage"]').first()).toBeVisible();

    await expect(page.locator('#stage-5')).toBeChecked();
    
    const initialPlotPath = await page.locator('#plot-container .js-line path').getAttribute('d');

    await page.locator('#stage-cond').click();
    await expect(page.locator('#stage-cond')).toBeChecked();

    const plotPathAfterCond = await page.locator('#plot-container .js-line path').getAttribute('d');
    expect(plotPathAfterCond).not.toEqual(initialPlotPath);
    
    await page.locator('#stage-reb').click();
    await expect(page.locator('#stage-reb')).toBeChecked();

    const plotPathAfterReb = await page.locator('#plot-container .js-line path').getAttribute('d');
    expect(plotPathAfterReb).not.toEqual(plotPathAfterCond);
  });

  test('Plot Type Button Group Interaction', async ({ page }) => {
    await expect(page.locator('#btn-composition')).toBeVisible();
    await expect(page.locator('#btn-temperature')).toBeVisible();
    await expect(page.locator('#btn-molar-hold-up')).toBeVisible();

    await expect(page.locator('#btn-composition')).toHaveClass(/active/);
    await expect(page.locator('#component-selector-container')).toBeVisible();

    await page.locator('#btn-temperature').click();

    await expect(page.locator('#btn-temperature')).toHaveClass(/active/);
    await expect(page.locator('#btn-composition')).not.toHaveClass(/active/);
    await expect(page.locator('#component-selector-container')).toBeHidden();
    await expect(page.locator('#plot-container .yaxislayer-above .ytitle')).toHaveText('temperature (C)');

    await page.locator('#btn-molar-hold-up').click();

    await expect(page.locator('#btn-molar-hold-up')).toHaveClass(/active/);
    await expect(page.locator('#btn-temperature')).not.toHaveClass(/active/);
    await expect(page.locator('#plot-container .yaxislayer-above .ytitle')).toHaveText('molar hold-up (kmol)');
  });

  test('Chemical Component Radio Group Interaction', async ({ page }) => {
    await expect(page.locator('#component-selector-container')).toBeVisible();
    
    await expect(page.locator('#comp-benzene')).toBeChecked();
    const plotLine = page.locator('#plot-container .js-line path');
    await expect(plotLine).toHaveAttribute('style', expect.stringContaining('stroke: rgb(255, 0, 0)'));
    await expect(page.locator('#plot-container .yaxislayer-above .ytitle')).toHaveText('benzene mole fraction');

    await page.locator('#comp-toluene').click();

    await expect(page.locator('#comp-toluene')).toBeChecked();
    await expect(page.locator('#plot-container .yaxislayer-above .ytitle')).toHaveText('toluene mole fraction');
    await expect(plotLine).toHaveAttribute('style', expect.stringContaining('stroke: rgb(0, 0, 255)'));

    await page.locator('#comp-pxylene').click();

    await expect(page.locator('#comp-pxylene')).toBeChecked();
    await expect(page.locator('#plot-container .yaxislayer-above .ytitle')).toHaveText('p-xylene mole fraction');
    await expect(plotLine).toHaveAttribute('style', expect.stringContaining('stroke: rgb(0, 139, 139)'));
  });

});