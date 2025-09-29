const { test, expect } = require('@playwright/test');
const path = require('path');

const fileUrl = 'file://' + path.resolve(__dirname, '../pages/SetOfNashEquilibriaIn2x2MixedExtendedGames.html');

// Helper function to capture the state of the visualization components
async function getVisualizationState(page) {
  const payoffTableHTML = await page.locator('#payoff-table').innerHTML();
  const equilibriaDisplayHTML = await page.locator('#equilibria-display').innerHTML();
  // The canvas is created by p5.js inside this container
  const canvasScreenshot = await page.locator('#canvas-container canvas').screenshot();
  return { payoffTableHTML, equilibriaDisplayHTML, canvasScreenshot };
}

test.describe('Set of Nash Equilibria in 2x2 Mixed Extended Games', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(fileUrl);
    // Wait for the canvas to be created by p5.js
    // await page.waitForSelector('#canvas-container canvas');
    await page.waitForTimeout(500);
  });

  test('Payoff a₁₁ Slider Control', async ({ page }) => {
    const slider = page.locator('#slider-a11');
    const valueSpan = page.locator('#value-a11');

    await expect(slider).toBeVisible();
    await expect(valueSpan).toBeVisible();

    await expect(slider).toHaveValue('-5');
    await expect(valueSpan).toHaveText('-5');

    const initialState = await getVisualizationState(page);

    await slider.fill('0');

    await expect(valueSpan).toHaveText('0');
    const stateAfterDrag = await getVisualizationState(page);
    expect(stateAfterDrag.payoffTableHTML).not.toEqual(initialState.payoffTableHTML);
    expect(stateAfterDrag.equilibriaDisplayHTML).not.toEqual(initialState.equilibriaDisplayHTML);
    expect(stateAfterDrag.canvasScreenshot).not.toEqual(initialState.canvasScreenshot);

    const plusButton = page.locator('#btn-plus-a11');
    for (let i = 0; i < 10; i++) {
      await plusButton.click();
    }

    await expect(valueSpan).toHaveText('10');
    const stateAfterPlus = await getVisualizationState(page);
    expect(stateAfterPlus.payoffTableHTML).not.toEqual(stateAfterDrag.payoffTableHTML);
    expect(stateAfterPlus.equilibriaDisplayHTML).not.toEqual(stateAfterDrag.equilibriaDisplayHTML);
    expect(stateAfterPlus.canvasScreenshot).not.toEqual(stateAfterDrag.canvasScreenshot);
  });

  test('Payoff a₁₂ Slider Control', async ({ page }) => {
    const slider = page.locator('#slider-a12');
    const valueSpan = page.locator('#value-a12');

    await expect(slider).toBeVisible();
    await expect(valueSpan).toBeVisible();

    await expect(slider).toHaveValue('-3');
    await expect(valueSpan).toHaveText('-3');

    const initialState = await getVisualizationState(page);
    const plusButton = page.locator('#btn-plus-a12');
    for (let i = 0; i < 5; i++) {
      await plusButton.click();
    }

    await expect(valueSpan).toHaveText('2');
    const stateAfterClick = await getVisualizationState(page);
    expect(stateAfterClick.payoffTableHTML).not.toEqual(initialState.payoffTableHTML);
    expect(stateAfterClick.equilibriaDisplayHTML).not.toEqual(initialState.equilibriaDisplayHTML);
    expect(stateAfterClick.canvasScreenshot).not.toEqual(initialState.canvasScreenshot);

    await slider.fill('-10');

    await expect(valueSpan).toHaveText('-10');
    const stateAfterSet = await getVisualizationState(page);
    expect(stateAfterSet.payoffTableHTML).not.toEqual(stateAfterClick.payoffTableHTML);
    expect(stateAfterSet.equilibriaDisplayHTML).not.toEqual(stateAfterClick.equilibriaDisplayHTML);
    expect(stateAfterSet.canvasScreenshot).not.toEqual(stateAfterClick.canvasScreenshot);
  });

  test('Payoff a₂₁ Slider Control', async ({ page }) => {
    const slider = page.locator('#slider-a21');
    const valueSpan = page.locator('#value-a21');

    await expect(slider).toBeVisible();
    await expect(valueSpan).toBeVisible();

    await expect(slider).toHaveValue('-1');
    await expect(valueSpan).toHaveText('-1');

    const initialState = await getVisualizationState(page);
    const minusButton = page.locator('#btn-minus-a21');
    for (let i = 0; i < 4; i++) {
      await minusButton.click();
    }

    await expect(valueSpan).toHaveText('-5');
    const stateAfterClick = await getVisualizationState(page);
    expect(stateAfterClick.payoffTableHTML).not.toEqual(initialState.payoffTableHTML);
    expect(stateAfterClick.equilibriaDisplayHTML).not.toEqual(initialState.equilibriaDisplayHTML);
    expect(stateAfterClick.canvasScreenshot).not.toEqual(initialState.canvasScreenshot);

    await slider.fill('10');

    await expect(valueSpan).toHaveText('10');
    const stateAfterDrag = await getVisualizationState(page);
    expect(stateAfterDrag.payoffTableHTML).not.toEqual(stateAfterClick.payoffTableHTML);
    expect(stateAfterDrag.equilibriaDisplayHTML).not.toEqual(stateAfterClick.equilibriaDisplayHTML);
    expect(stateAfterDrag.canvasScreenshot).not.toEqual(stateAfterClick.canvasScreenshot);
  });

  test('Payoff a₂₂ Slider Control', async ({ page }) => {
    const slider = page.locator('#slider-a22');
    const valueSpan = page.locator('#value-a22');

    await expect(slider).toBeVisible();
    await expect(valueSpan).toBeVisible();

    await expect(slider).toHaveValue('-4');
    await expect(valueSpan).toHaveText('-4');

    const initialState = await getVisualizationState(page);

    await slider.fill('5');

    await expect(valueSpan).toHaveText('5');
    const stateAfterDrag = await getVisualizationState(page);
    expect(stateAfterDrag.payoffTableHTML).not.toEqual(initialState.payoffTableHTML);
    expect(stateAfterDrag.equilibriaDisplayHTML).not.toEqual(initialState.equilibriaDisplayHTML);
    expect(stateAfterDrag.canvasScreenshot).not.toEqual(initialState.canvasScreenshot);

    const minusButton = page.locator('#btn-minus-a22');
    for (let i = 0; i < 15; i++) {
      await minusButton.click();
    }

    await expect(valueSpan).toHaveText('-10');
    const stateAfterMinus = await getVisualizationState(page);
    expect(stateAfterMinus.payoffTableHTML).not.toEqual(stateAfterDrag.payoffTableHTML);
    expect(stateAfterMinus.equilibriaDisplayHTML).not.toEqual(stateAfterDrag.equilibriaDisplayHTML);
    expect(stateAfterMinus.canvasScreenshot).not.toEqual(stateAfterDrag.canvasScreenshot);
  });

  test('Payoff b₁₁ Slider Control', async ({ page }) => {
    const slider = page.locator('#slider-b11');
    const valueSpan = page.locator('#value-b11');

    await expect(slider).toBeVisible();
    await expect(valueSpan).toBeVisible();

    await expect(slider).toHaveValue('-5');
    await expect(valueSpan).toHaveText('-5');

    const initialState = await getVisualizationState(page);

    await slider.fill('1');

    await expect(valueSpan).toHaveText('1');
    const stateAfterSet = await getVisualizationState(page);
    expect(stateAfterSet.payoffTableHTML).not.toEqual(initialState.payoffTableHTML);
    expect(stateAfterSet.equilibriaDisplayHTML).not.toEqual(initialState.equilibriaDisplayHTML);
    expect(stateAfterSet.canvasScreenshot).not.toEqual(initialState.canvasScreenshot);

    const plusButton = page.locator('#btn-plus-b11');
    for (let i = 0; i < 9; i++) {
      await plusButton.click();
    }

    await expect(valueSpan).toHaveText('10');
    const stateAfterPlus = await getVisualizationState(page);
    expect(stateAfterPlus.payoffTableHTML).not.toEqual(stateAfterSet.payoffTableHTML);
    expect(stateAfterPlus.equilibriaDisplayHTML).not.toEqual(stateAfterSet.equilibriaDisplayHTML);
    expect(stateAfterPlus.canvasScreenshot).not.toEqual(stateAfterSet.canvasScreenshot);
  });

  test('Payoff b₁₂ Slider Control', async ({ page }) => {
    const slider = page.locator('#slider-b12');
    const valueSpan = page.locator('#value-b12');

    await expect(slider).toBeVisible();
    await expect(valueSpan).toBeVisible();

    await expect(slider).toHaveValue('-3');
    await expect(valueSpan).toHaveText('-3');

    const initialState = await getVisualizationState(page);
    const plusButton = page.locator('#btn-plus-b12');
    for (let i = 0; i < 3; i++) {
      await plusButton.click();
    }

    await expect(valueSpan).toHaveText('0');
    const stateAfterClick = await getVisualizationState(page);
    expect(stateAfterClick.payoffTableHTML).not.toEqual(initialState.payoffTableHTML);
    expect(stateAfterClick.equilibriaDisplayHTML).not.toEqual(initialState.equilibriaDisplayHTML);
    expect(stateAfterClick.canvasScreenshot).not.toEqual(initialState.canvasScreenshot);

    await slider.fill('-10');

    await expect(valueSpan).toHaveText('-10');
    const stateAfterSet = await getVisualizationState(page);
    expect(stateAfterSet.payoffTableHTML).not.toEqual(stateAfterClick.payoffTableHTML);
    expect(stateAfterSet.equilibriaDisplayHTML).not.toEqual(stateAfterClick.equilibriaDisplayHTML);
    expect(stateAfterSet.canvasScreenshot).not.toEqual(stateAfterClick.canvasScreenshot);
  });

  test('Payoff b₂₁ Slider Control', async ({ page }) => {
    const slider = page.locator('#slider-b21');
    const valueSpan = page.locator('#value-b21');

    await expect(slider).toBeVisible();
    await expect(valueSpan).toBeVisible();

    await expect(slider).toHaveValue('-1');
    await expect(valueSpan).toHaveText('-1');

    const initialState = await getVisualizationState(page);
    const minusButton = page.locator('#btn-minus-b21');
    for (let i = 0; i < 2; i++) {
      await minusButton.click();
    }

    await expect(valueSpan).toHaveText('-3');
    const stateAfterClick = await getVisualizationState(page);
    expect(stateAfterClick.payoffTableHTML).not.toEqual(initialState.payoffTableHTML);
    expect(stateAfterClick.equilibriaDisplayHTML).not.toEqual(initialState.equilibriaDisplayHTML);
    expect(stateAfterClick.canvasScreenshot).not.toEqual(initialState.canvasScreenshot);

    await slider.fill('10');

    await expect(valueSpan).toHaveText('10');
    const stateAfterDrag = await getVisualizationState(page);
    expect(stateAfterDrag.payoffTableHTML).not.toEqual(stateAfterClick.payoffTableHTML);
    expect(stateAfterDrag.equilibriaDisplayHTML).not.toEqual(stateAfterClick.equilibriaDisplayHTML);
    expect(stateAfterDrag.canvasScreenshot).not.toEqual(stateAfterClick.canvasScreenshot);
  });

  test('Payoff b₂₂ Slider Control', async ({ page }) => {
    const slider = page.locator('#slider-b22');
    const valueSpan = page.locator('#value-b22');

    await expect(slider).toBeVisible();
    await expect(valueSpan).toBeVisible();

    await expect(slider).toHaveValue('-4');
    await expect(valueSpan).toHaveText('-4');

    const initialState = await getVisualizationState(page);

    await slider.fill('6');

    await expect(valueSpan).toHaveText('6');
    const stateAfterDrag = await getVisualizationState(page);
    expect(stateAfterDrag.payoffTableHTML).not.toEqual(initialState.payoffTableHTML);
    expect(stateAfterDrag.equilibriaDisplayHTML).not.toEqual(initialState.equilibriaDisplayHTML);
    expect(stateAfterDrag.canvasScreenshot).not.toEqual(initialState.canvasScreenshot);

    const minusButton = page.locator('#btn-minus-b22');
    for (let i = 0; i < 16; i++) {
      await minusButton.click();
    }

    await expect(valueSpan).toHaveText('-10');
    const stateAfterMinus = await getVisualizationState(page);
    expect(stateAfterMinus.payoffTableHTML).not.toEqual(stateAfterDrag.payoffTableHTML);
    expect(stateAfterMinus.equilibriaDisplayHTML).not.toEqual(stateAfterDrag.equilibriaDisplayHTML);
    expect(stateAfterMinus.canvasScreenshot).not.toEqual(stateAfterDrag.canvasScreenshot);
  });
});