const { test, expect } = require('@playwright/test');

const fileUrl = 'file://' + require('path').resolve(__dirname, '../pages/MethylationIndexAndAnalysisOfSRBMediatedMercuryMethylation.html');

test.beforeEach(async ({ page }) => {
  await page.goto(fileUrl);
  // Wait for the plots to be rendered
  // await page.waitForSelector('#plot1 .plot-container');
  // await page.waitForSelector('#plot2 .plot-container');
  // await page.waitForSelector('#plot3 .plot-container');
  await page.waitForTimeout(500);
});

test.describe('Methylation Index and Analysis Controls', () => {

  test('Particulate Organic Carbon Slider', async ({ page }) => {
    await expect(page.locator('#slider-poc')).toBeVisible();
    await expect(page.locator('#slider-poc')).toHaveValue('1');
    await expect(page.locator('#value-poc')).toHaveText('1');

    const plot1 = page.locator('#plot1');
    const getPlot1PathData = async () => await plot1.locator('.js-line').getAttribute('d');

    const initialPlot1Path = await getPlot1PathData();

    await page.locator('#slider-poc').fill('100');
    await expect(page.locator('#value-poc')).toHaveText(/^100\.00*$/);
    const updatedPlot1Path = await getPlot1PathData();
    expect(updatedPlot1Path).not.toEqual(initialPlot1Path);

    await page.locator('#slider-poc').fill('200');
    await expect(page.locator('#value-poc')).toHaveText(/^200\.00*$/);
    const finalPlot1Path = await getPlot1PathData();
    expect(finalPlot1Path).not.toEqual(updatedPlot1Path);
  });

  test('Sediment Ox-Red Potential Slider', async ({ page }) => {
    await expect(page.locator('#slider-eh')).toBeVisible();
    await expect(page.locator('#slider-eh')).toHaveValue('1');
    await expect(page.locator('#value-eh')).toHaveText('1');

    const plot1 = page.locator('#plot1');
    const plot2 = page.locator('#plot2');
    const getPlot1PathData = async () => await plot1.locator('.js-line').getAttribute('d');
    const getPlot2PathData = async () => await plot2.locator('path.js-line').evaluateAll(paths => paths.map(p => p.getAttribute('d')));

    const initialPlot1Path = await getPlot1PathData();
    const initialPlot2Paths = await getPlot2PathData();

    await page.locator('#slider-eh').fill('-100');
    await expect(page.locator('#value-eh')).toHaveText('-100');
    const updatedPlot1Path = await getPlot1PathData();
    const updatedPlot2Paths = await getPlot2PathData();
    expect(updatedPlot1Path).not.toEqual(initialPlot1Path);
    expect(updatedPlot2Paths).not.toEqual(initialPlot2Paths);

    await page.locator('#slider-eh').fill('-150');
    await expect(page.locator('#value-eh')).toHaveText('-150');
    const finalPlot1Path = await getPlot1PathData();
    const finalPlot2Paths = await getPlot2PathData();
    expect(finalPlot1Path).not.toEqual(updatedPlot1Path);
    expect(finalPlot2Paths).not.toEqual(updatedPlot2Paths);
  });

  test('Mobile Mercury Concentration Slider', async ({ page }) => {
    await expect(page.locator('#slider-hg_m')).toBeVisible();
    await expect(page.locator('#slider-hg_m')).toHaveValue('1');
    await expect(page.locator('#value-hg_m')).toHaveText(/^1\.00*$/);

    const plot1 = page.locator('#plot1');
    const plot2 = page.locator('#plot2');
    const getPlot1PathData = async () => await plot1.locator('.js-line').getAttribute('d');
    const getPlot2PathData = async () => await plot2.locator('path.js-line').evaluateAll(paths => paths.map(p => p.getAttribute('d')));

    const initialPlot1Path = await getPlot1PathData();
    const initialPlot2Paths = await getPlot2PathData();

    await page.locator('#slider-hg_m').fill('5');
    await expect(page.locator('#value-hg_m')).toHaveText(/^5\.00*$/);
    const updatedPlot1Path = await getPlot1PathData();
    const updatedPlot2Paths = await getPlot2PathData();
    expect(updatedPlot1Path).not.toEqual(initialPlot1Path);
    expect(updatedPlot2Paths).not.toEqual(initialPlot2Paths);

    await page.locator('#slider-hg_m').fill('10');
    await expect(page.locator('#value-hg_m')).toHaveText(/^10\.00*$/);
    const finalPlot1Path = await getPlot1PathData();
    const finalPlot2Paths = await getPlot2PathData();
    expect(finalPlot1Path).not.toEqual(updatedPlot1Path);
    expect(finalPlot2Paths).not.toEqual(updatedPlot2Paths);
  });

  test('Methylation Rate Constant k Slider', async ({ page }) => {
    await expect(page.locator('#slider-k')).toBeVisible();
    await expect(page.locator('#slider-k')).toHaveValue('0.06');
    await expect(page.locator('#value-k')).toHaveText(/^0\.0600*$/);

    const plot3 = page.locator('#plot3');
    const getPlot3PathData = async () => await plot3.locator('.js-line').getAttribute('d');

    const initialPlot3Path = await getPlot3PathData();

    await page.locator('#slider-k').fill('0.085');
    await expect(page.locator('#value-k')).toHaveText(/^0\.0850*$/);
    const updatedPlot3Path = await getPlot3PathData();
    expect(updatedPlot3Path).not.toEqual(initialPlot3Path);

    await page.locator('#slider-k').fill('0.01');
    await expect(page.locator('#value-k')).toHaveText(/^0\.0100*$/);
    const finalPlot3Path = await getPlot3PathData();
    expect(finalPlot3Path).not.toEqual(updatedPlot3Path);
  });

  test('Saturation Constant a Slider', async ({ page }) => {
    await expect(page.locator('#slider-a')).toBeVisible();
    await expect(page.locator('#slider-a')).toHaveValue('0.25');
    await expect(page.locator('#value-a')).toHaveText(/^0\.2500*$/);

    const plot3 = page.locator('#plot3');
    const getPlot3PathData = async () => await plot3.locator('.js-line').getAttribute('d');
    const getAnnotationText = async () => await plot3.locator('.annotation-text').textContent();

    const initialPlot3Path = await getPlot3PathData();
    const initialAnnotationText = await getAnnotationText();

    await page.locator('#slider-a').fill('0.150');
    await expect(page.locator('#value-a')).toHaveText(/^0\.1500*$/);
    const updatedPlot3Path = await getPlot3PathData();
    const updatedAnnotationText = await getAnnotationText();
    expect(updatedPlot3Path).not.toEqual(initialPlot3Path);
    expect(updatedAnnotationText).not.toEqual(initialAnnotationText);
    expect(updatedAnnotationText).toContain('0.15');

    await page.locator('#slider-a').fill('0.05');
    await expect(page.locator('#value-a')).toHaveText(/^0\.0500*$/);
    const finalPlot3Path = await getPlot3PathData();
    const finalAnnotationText = await getAnnotationText();
    expect(finalPlot3Path).not.toEqual(updatedPlot3Path);
    expect(finalAnnotationText).not.toEqual(updatedAnnotationText);
    expect(finalAnnotationText).toContain('0.05');
  });

});