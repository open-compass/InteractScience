const { test, expect } = require('@playwright/test');

test.describe('Regioselectivity and Stereospecificity in Diels-Alder Reactions', () => {
  let fileUrl;

  test.beforeEach(async ({ page }) => {
    fileUrl = 'file://' + require('path').resolve(__dirname, '../pages/RegioselectivityAndStereospecificityInDielsAlderReactions.html');
    await page.goto(fileUrl);
  });

  test('Reactants moving towards each other in Diels-Alder reaction mode', async ({ page }) => {
    // Action: Click the mode button with id btn-mode-da.
    await page.locator('#btn-mode-da').click();

    // Action: Drag the slider with id slider-reaction to approximately 25% of its full range.
    const sliderReaction = page.locator('#slider-reaction');
    const sliderBoundingBox = await sliderReaction.boundingBox();
    await page.mouse.move(sliderBoundingBox.x + sliderBoundingBox.width * 0.25, sliderBoundingBox.y + sliderBoundingBox.height / 2);
    await page.mouse.down();
    await page.mouse.up();
    
    // Assert: Take a screenshot of the current UI state.
    await page.screenshot({ path: './snapshots/RegioselectivityAndStereospecificityInDielsAlderReactions-1.png', fullPage: true });
  });

  test('Cyclohexene product shown with newly formed bonds highlighted', async ({ page }) => {
    // Action: Click the mode button with id btn-mode-da.
    await page.locator('#btn-mode-da').click();
    
    // Action: Click the checkbox with id check-focus.
    await page.locator('#check-focus').click();
    
    // Action: Drag the slider with id slider-reaction to its maximum value (100%).
    const sliderReaction = page.locator('#slider-reaction');
    const sliderBoundingBox = await sliderReaction.boundingBox();
    await page.mouse.move(sliderBoundingBox.x + sliderBoundingBox.width, sliderBoundingBox.y + sliderBoundingBox.height / 2);
    await page.mouse.down();
    await page.mouse.up();
    
    // Assert: Take a screenshot of the current UI state.
    await page.screenshot({ path: './snapshots/RegioselectivityAndStereospecificityInDielsAlderReactions-2.png', fullPage: true });
  });

  test('Stereospecificity of dienophile products with newly formed bonds highlighted', async ({ page }) => {
    // Action: Click the mode button with id btn-mode-stereo-phile.
    await page.locator('#btn-mode-stereo-phile').click();
    
    // Action: Click the checkbox with id check-focus.
    await page.locator('#check-focus').click();
    
    // Assert: Take a screenshot of the current UI state.
    await page.screenshot({ path: './snapshots/RegioselectivityAndStereospecificityInDielsAlderReactions-3.png', fullPage: true });
  });

  test('HOMO/LUMO diagram with inverse electronic effects applied', async ({ page }) => {
    // Action: Click the mode button with id btn-mode-homo.
    await page.locator('#btn-mode-homo').click();
    
    // Action: Click the checkbox with id check-inverse.
    await page.locator('#check-inverse').click();
    
    // Action: Drag the slider with id slider-erg-ewg to the middle of its range (50%).
    const sliderErgEwg = page.locator('#slider-erg-ewg');
    const sliderBoundingBox = await sliderErgEwg.boundingBox();
    await page.mouse.move(sliderBoundingBox.x + sliderBoundingBox.width * 0.5, sliderBoundingBox.y + sliderBoundingBox.height / 2);
    await page.mouse.down();
    await page.mouse.up();

    // Assert: Take a screenshot of the current UI state.
    await page.screenshot({ path: './snapshots/RegioselectivityAndStereospecificityInDielsAlderReactions-4.png', fullPage: true });
  });
});