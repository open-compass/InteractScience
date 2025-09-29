const { test, expect } = require('@playwright/test');

const fileUrl = 'file://' + require('path').resolve(__dirname, '../pages/McCabeThieleGraphicalMethod.html');

test.describe('McCabe-Thiele Graphical Method', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(fileUrl);
    // Wait for the initial rendering if necessary, although for local files it's usually instant.
    // await page.locator('#stages-count-display').waitFor();
    await page.waitForTimeout(500);
  });

  test('Relative Volatility Slider', async ({ page }) => {
    const volatilitySlider = page.locator('#slider-volatility');
    const stagesDisplay = page.locator('#stages-count-display');

    await expect(volatilitySlider).toBeVisible();
    await expect(volatilitySlider).toHaveValue('2.5');

    const initialStagesText = await stagesDisplay.textContent();
    await volatilitySlider.fill('5');
    await expect(stagesDisplay).not.toHaveText(initialStagesText);
    await expect(volatilitySlider).toHaveValue('5');

    const secondStagesText = await stagesDisplay.textContent();
    await volatilitySlider.fill('1.1');
    await expect(volatilitySlider).toHaveValue('1.1');
    await expect(stagesDisplay).not.toHaveText(secondStagesText);
  });

  test('Relative Volatility Plus Button', async ({ page }) => {
    const plusButton = page.locator('#btn-volatility-plus');
    const volatilitySlider = page.locator('#slider-volatility');
    const stagesDisplay = page.locator('#stages-count-display');

    await expect(plusButton).toBeVisible();
    await expect(volatilitySlider).toHaveValue('2.5');

    const initialStagesText = await stagesDisplay.textContent();
    await plusButton.click();
    await expect(volatilitySlider).toHaveValue('2.6');
    await expect(stagesDisplay).not.toHaveText(initialStagesText);

    // From 2.6 to 10.0 with step 0.1 is 74 clicks.
    for (let i = 0; i < 74; i++) {
      await plusButton.click();
    }
    await expect(volatilitySlider).toHaveValue('10');

    const maxStagesText = await stagesDisplay.textContent();
    await plusButton.click();
    await expect(volatilitySlider).toHaveValue('10');
    await expect(stagesDisplay).toHaveText(maxStagesText);
  });

  test('Distillate Specification Slider', async ({ page }) => {
    const distillateSlider = page.locator('#slider-distillate');
    const stagesDisplay = page.locator('#stages-count-display');

    await expect(distillateSlider).toBeVisible();
    await expect(distillateSlider).toHaveValue('0.95');

    const initialStagesText = await stagesDisplay.textContent();
    await distillateSlider.fill('0.85');
    await expect(stagesDisplay).not.toHaveText(initialStagesText);
    await expect(distillateSlider).toHaveValue('0.85');

    const secondStagesText = await stagesDisplay.textContent();
    await distillateSlider.fill('0.99');
    await expect(distillateSlider).toHaveValue('0.99');
    await expect(stagesDisplay).not.toHaveText(secondStagesText);
  });

  test('Distillate Specification Plus Button', async ({ page }) => {
    const plusButton = page.locator('#btn-distillate-plus');
    const distillateSlider = page.locator('#slider-distillate');
    const stagesDisplay = page.locator('#stages-count-display');

    await expect(plusButton).toBeVisible();
    await expect(distillateSlider).toHaveValue('0.95');

    const initialStagesText = await stagesDisplay.textContent();
    await plusButton.click();
    await expect(distillateSlider).toHaveValue('0.96');
    await expect(stagesDisplay).not.toHaveText(initialStagesText);

    // From 0.96 to 0.99 with step 0.01 is 3 clicks.
    for (let i = 0; i < 3; i++) {
      await plusButton.click();
    }
    await expect(distillateSlider).toHaveValue('0.99');

    const maxStagesText = await stagesDisplay.textContent();
    await plusButton.click();
    await expect(distillateSlider).toHaveValue('0.99');
    await expect(stagesDisplay).toHaveText(maxStagesText);
  });

  test('Bottom Specification Slider', async ({ page }) => {
    const bottomSlider = page.locator('#slider-bottom');
    const stagesDisplay = page.locator('#stages-count-display');

    await expect(bottomSlider).toBeVisible();
    await expect(bottomSlider).toHaveValue('0.05');

    const initialStagesText = await stagesDisplay.textContent();
    await bottomSlider.fill('0.25');
    await expect(stagesDisplay).not.toHaveText(initialStagesText);
    await expect(bottomSlider).toHaveValue('0.25');

    const secondStagesText = await stagesDisplay.textContent();
    await bottomSlider.fill('0.01');
    await expect(bottomSlider).toHaveValue('0.01');
    await expect(stagesDisplay).not.toHaveText(secondStagesText);
  });

  test('Bottom Specification Plus Button', async ({ page }) => {
    const plusButton = page.locator('#btn-bottom-plus');
    const bottomSlider = page.locator('#slider-bottom');
    const stagesDisplay = page.locator('#stages-count-display');

    await expect(plusButton).toBeVisible();
    await expect(bottomSlider).toHaveValue('0.05');

    const initialStagesText = await stagesDisplay.textContent();
    await plusButton.click();
    await expect(bottomSlider).toHaveValue('0.06');
    await expect(stagesDisplay).not.toHaveText(initialStagesText);

    // From 0.06 to 0.49 with step 0.01 is 43 clicks.
    for (let i = 0; i < 43; i++) {
      await plusButton.click();
    }
    await expect(bottomSlider).toHaveValue('0.49');

    const maxStagesText = await stagesDisplay.textContent();
    await plusButton.click();
    await expect(bottomSlider).toHaveValue('0.49');
    await expect(stagesDisplay).toHaveText(maxStagesText);
  });

  test('Feed Composition Slider', async ({ page }) => {
    const feedCompSlider = page.locator('#slider-feed-comp');
    const stagesDisplay = page.locator('#stages-count-display');

    await expect(feedCompSlider).toBeVisible();
    await expect(feedCompSlider).toHaveValue('0.5');

    const initialStagesText = await stagesDisplay.textContent();
    await feedCompSlider.fill('0.75');
    await expect(stagesDisplay).not.toHaveText(initialStagesText);
    await expect(feedCompSlider).toHaveValue('0.75');

    const secondStagesText = await stagesDisplay.textContent();
    // Attempt to drag beyond distillate spec (0.95). Should be capped at 0.94 (0.95 - step 0.01)
    await feedCompSlider.fill('0.98');
    await expect(feedCompSlider).toHaveValue('0.94');
    await expect(stagesDisplay).not.toHaveText(secondStagesText);
  });

  test('Feed Composition Plus Button', async ({ page }) => {
    const plusButton = page.locator('#btn-feed-comp-plus');
    const feedCompSlider = page.locator('#slider-feed-comp');
    const stagesDisplay = page.locator('#stages-count-display');

    await expect(plusButton).toBeVisible();
    await expect(feedCompSlider).toHaveValue('0.5');

    const initialStagesText = await stagesDisplay.textContent();
    await plusButton.click();
    await expect(feedCompSlider).toHaveValue('0.51');
    await expect(stagesDisplay).not.toHaveText(initialStagesText);

    // From 0.51 to max allowed value of 0.94 (distillate 0.95 - step 0.01) is 43 clicks.
    for (let i = 0; i < 43; i++) {
      await plusButton.click();
    }
    await expect(feedCompSlider).toHaveValue('0.94');

    const maxStagesText = await stagesDisplay.textContent();
    await plusButton.click();
    await expect(feedCompSlider).toHaveValue('0.94');
    await expect(stagesDisplay).toHaveText(maxStagesText);
  });

  test('Feed Quality Slider', async ({ page }) => {
    const feedQualitySlider = page.locator('#slider-feed-quality');
    const stagesDisplay = page.locator('#stages-count-display');

    await expect(feedQualitySlider).toBeVisible();
    await expect(feedQualitySlider).toHaveValue('1');

    const initialStagesText = await stagesDisplay.textContent();
    await feedQualitySlider.fill('0.5');
    await expect(stagesDisplay).not.toHaveText(initialStagesText);
    await expect(feedQualitySlider).toHaveValue('0.5');

    const secondStagesText = await stagesDisplay.textContent();
    await feedQualitySlider.fill('0');
    await expect(feedQualitySlider).toHaveValue('0');
    await expect(stagesDisplay).not.toHaveText(secondStagesText);
  });

  test('Feed Quality Plus Button', async ({ page }) => {
    const plusButton = page.locator('#btn-feed-quality-plus');
    const feedQualitySlider = page.locator('#slider-feed-quality');
    const stagesDisplay = page.locator('#stages-count-display');

    await expect(plusButton).toBeVisible();
    await expect(feedQualitySlider).toHaveValue('1');

    const initialStagesText = await stagesDisplay.textContent();
    await plusButton.click();
    await expect(feedQualitySlider).toHaveValue('1.05');
    await expect(stagesDisplay).not.toHaveText(initialStagesText);

    // From 1.05 to 2.0 with step 0.05 is 19 clicks.
    for (let i = 0; i < 19; i++) {
      await plusButton.click();
    }
    await expect(feedQualitySlider).toHaveValue('2');

    const maxStagesText = await stagesDisplay.textContent();
    await plusButton.click();
    await expect(feedQualitySlider).toHaveValue('2');
    await expect(stagesDisplay).toHaveText(maxStagesText);
  });
});