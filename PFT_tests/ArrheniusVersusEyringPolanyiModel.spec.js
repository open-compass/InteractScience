const { test, expect } = require('@playwright/test');
const path = require('path');

const fileUrl = 'file://' + path.resolve(__dirname, '../pages/ArrheniusVersusEyringPolanyiModel.html');

test.describe('Interactive Arrhenius vs. Eyring-Polanyi Model', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(fileUrl);
    // Wait for Plotly and MathJax to render
    // await page.waitForSelector('#plot-container .plot-container');
    // await page.waitForFunction(() => MathJax.typesetPromise);
    await page.waitForTimeout(500);
  });

  test('Data Generation Model Button', async ({ page }) => {
    await expect(page.locator('#btn-model-ar')).toBeVisible();
    await expect(page.locator('#btn-model-ep')).toHaveClass(/active/);
    await expect(page.locator('#plot-container .gtitle')).toContainText('fit to Eyring-Polanyi data');
    await expect(page.locator('#label-param-name')).toHaveText('\\(a_{EP}\\)');
    const initialFitResults = await page.locator('#fit-results').textContent();

    await page.locator('#btn-model-ar').click();
    await expect(page.locator('#btn-model-ar')).toHaveClass(/active/);
    await expect(page.locator('#plot-container .gtitle')).toContainText('fit to Arrhenius data');
    await expect(page.locator('#label-param-name')).toHaveText('\\(a_{Ar}\\)');
    await expect(page.locator('#fit-results')).not.toHaveText(initialFitResults);

    await page.locator('#btn-model-ep').click();
    await expect(page.locator('#btn-model-ep')).toHaveClass(/active/);
    await expect(page.locator('#plot-container .gtitle')).toContainText('fit to Eyring-Polanyi data');
    const finalFitResults = await page.locator('#fit-results').textContent();
    expect(finalFitResults).toEqual(initialFitResults);
  });

  test('T_max Upper Limit Button', async ({ page }) => {
    await expect(page.locator('#btn-tmax-high')).toBeVisible();
    await expect(page.locator('#btn-tmax-low')).toHaveClass(/active/);
    await expect(page.locator('#slider-tmax')).toHaveAttribute('max', '1200');

    await page.locator('#btn-tmax-high').click();
    await expect(page.locator('#btn-tmax-high')).toHaveClass(/active/);
    await expect(page.locator('#slider-tmax')).toHaveAttribute('max', '6000');

    await page.locator('#btn-tmax-low').click();
    await expect(page.locator('#btn-tmax-low')).toHaveClass(/active/);
    await expect(page.locator('#slider-tmax')).toHaveAttribute('max', '1200');
  });

  test('Number of Data Points Slider (n)', async ({ page }) => {
    await expect(page.locator('#slider-n')).toBeVisible();
    await expect(page.locator('#slider-n')).toHaveValue('6');
    await expect(page.locator('#label-n')).toHaveText('6');
    await expect(page.locator('#plot-container .scatterlayer .point')).toHaveCount(6);
    const initialFitResults = await page.locator('#fit-results').textContent();

    await page.locator('#slider-n').fill('15');
    await expect(page.locator('#label-n')).toHaveText('15');
    await expect(page.locator('#plot-container .scatterlayer .point')).toHaveCount(15);
    await expect(page.locator('#fit-results')).not.toHaveText(initialFitResults);

    await page.locator('#slider-n').fill('20');
    await expect(page.locator('#label-n')).toHaveText('20');
    await expect(page.locator('#plot-container .scatterlayer .point')).toHaveCount(20);
    await expect(page.locator('#fit-results')).not.toHaveText(initialFitResults);
  });

  test('Minimum Temperature Slider ($T_{min}$)', async ({ page }) => {
    await expect(page.locator('#slider-tmin')).toBeVisible();
    await expect(page.locator('#slider-tmin')).toHaveValue('25');
    await expect(page.locator('#label-tmin')).toHaveText('25.');
    const initialFitResults = await page.locator('#fit-results').textContent();

    await page.locator('#slider-tmin').fill('40');
    await expect(page.locator('#label-tmin')).toHaveText('40.');
    await expect(page.locator('#fit-results')).not.toHaveText(initialFitResults);

    await page.locator('#slider-tmin').fill('0');
    await expect(page.locator('#label-tmin')).toHaveText('0.');
    await expect(page.locator('#fit-results')).not.toHaveText(initialFitResults);
  });

  test('Maximum Temperature Slider ($T_{max}$)', async ({ page }) => {
    await expect(page.locator('#slider-tmax')).toBeVisible();
    await expect(page.locator('#slider-tmax')).toHaveValue('100');
    await expect(page.locator('#label-tmax')).toHaveText('100.');
    const initialFitResults = await page.locator('#fit-results').textContent();

    await page.locator('#slider-tmax').fill('500');
    await expect(page.locator('#label-tmax')).toHaveText('500.');
    await expect(page.locator('#fit-results')).not.toHaveText(initialFitResults);

    await page.locator('#slider-tmax').fill('1200');
    await expect(page.locator('#label-tmax')).toHaveText('1200.');
    await expect(page.locator('#fit-results')).not.toHaveText(initialFitResults);
  });

  test('Reference Temperature Slider ($T_{ref}$)', async ({ page }) => {
    await expect(page.locator('#slider-tref')).toBeVisible();
    await expect(page.locator('#slider-tref')).toHaveValue('50');
    await expect(page.locator('#label-tref')).toHaveText('50.');
    const initialFitResults = await page.locator('#fit-results').textContent();

    await page.locator('#slider-tref').fill('70');
    await expect(page.locator('#label-tref')).toHaveText('70.');
    await expect(page.locator('#fit-results')).not.toHaveText(initialFitResults);

    await page.locator('#slider-tref').fill('100');
    await expect(page.locator('#label-tref')).toHaveText('100.');
    await expect(page.locator('#fit-results')).not.toHaveText(initialFitResults);
  });

  test('Model Parameter Slider ($a_{EP}$ / $a_{Ar}$)', async ({ page }) => {
    await expect(page.locator('#slider-param')).toBeVisible();
    await expect(page.locator('#slider-param')).toHaveValue('4000');
    await expect(page.locator('#label-param-value')).toHaveText('4000.');
    const initialFitResults = await page.locator('#fit-results').textContent();

    await page.locator('#slider-param').fill('3000');
    await expect(page.locator('#label-param-value')).toHaveText('3000.');
    await expect(page.locator('#fit-results')).not.toHaveText(initialFitResults);

    await page.locator('#slider-param').fill('1');
    await expect(page.locator('#label-param-value')).toHaveText('1.');
    await expect(page.locator('#fit-results')).not.toHaveText(initialFitResults);
  });
});