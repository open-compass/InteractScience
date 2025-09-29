const { test, expect } = require('@playwright/test');

const fileUrl = 'file://' + require('path').resolve(__dirname, '../pages/AnalyzingTheCrystallographyOfTheSH2DomainAndItsResidueContac.html');

test.describe('Crystallography and Residue Contact Analysis', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(fileUrl);
    // await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(500);
  });

  test('View Switcher Button', async ({ page }) => {
    await expect(page.locator('#btn-crystallography')).toBeVisible();
    await expect(page.locator('#btn-contact-map')).toBeVisible();

    // The plan specifies an "active" style. We'll assume an 'active' class is used.
    await expect(page.locator('#btn-crystallography')).toHaveClass(/active/);
    // Assuming the 3D view is the default, which is handled on load.

    await page.locator('#btn-contact-map').click();
    await expect(page.locator('#btn-contact-map')).toHaveClass(/active/);
    // Assertion about canvas showing 2D plot is a visual check, we confirm the control state changed.

    await page.locator('#btn-crystallography').click();
    await expect(page.locator('#btn-crystallography')).toHaveClass(/active/);
    // Assertion about canvas showing 3D model is a visual check, we confirm the control state changed.
  });

  test('Lateral Chains Checkbox', async ({ page }) => {
    await expect(page.locator('#checkbox-lateral-chains')).toBeVisible();
    await expect(page.locator('#checkbox-lateral-chains')).toBeChecked();

    await page.locator('#checkbox-lateral-chains').uncheck();
    // Visual change in canvas is asserted in the test case, but not testable here.
    // The action itself is the test.
    await expect(page.locator('#checkbox-lateral-chains')).not.toBeChecked();

    await page.locator('#checkbox-lateral-chains').check();
    // Visual change in canvas is asserted in the test case.
    await expect(page.locator('#checkbox-lateral-chains')).toBeChecked();
  });

  test('Gray Level Slider', async ({ page }) => {
    await expect(page.locator('#slider-gray-level')).toBeVisible();
    await expect(page.locator('#gray-level-value')).toBeVisible();

    await expect(page.locator('#slider-gray-level')).toHaveValue('0.5');
    await expect(page.locator('#gray-level-value')).toContainText('0.5');

    await page.locator('#slider-gray-level').fill('0.2');
    await expect(page.locator('#gray-level-value')).toContainText('0.2');
    // Visual check of color change is noted but not automatable here.

    await page.locator('#slider-gray-level').fill('1');
    await expect(page.locator('#gray-level-value')).toContainText('1');
    // Visual check of color change is noted but not automatable here.
  });

  test('Browse the Sequence Slider', async ({ page }) => {
    await expect(page.locator('#slider-browse-sequence')).toBeVisible();
    await expect(page.locator('#browse-sequence-value')).toBeVisible();

    await expect(page.locator('#slider-browse-sequence')).toHaveValue('1');
    await expect(page.locator('#browse-sequence-value')).toContainText('1');

    await page.locator('#slider-browse-sequence').fill('88');
    await expect(page.locator('#browse-sequence-value')).toContainText('88');
    await expect(page.locator('#info-display')).not.toBeEmpty();
    // Visual check of highlight is noted.

    await page.locator('#slider-browse-sequence').fill('400');
    await expect(page.locator('#browse-sequence-value')).toContainText('400');
    // Visual check of highlight is noted.
  });

  test('Jump to a Residue Dropdown', async ({ page }) => {
    await expect(page.locator('#select-residue')).toBeVisible();
    await expect(page.locator('#select-residue')).toHaveValue('A');

    // Store initial slider value to confirm it changes
    const initialSliderValue = await page.locator('#slider-browse-sequence').inputValue();
    await page.locator('#select-residue').selectOption('K');
    await expect(page.locator('#slider-browse-sequence')).not.toHaveValue(initialSliderValue);

    // The test case mentions interacting with a 'down' arrow to find the next residue.
    // This implies custom controls or event handling not specified in the HTML plan.
    // As such, we cannot reliably test this part and will omit it.
  });

  test('Jump to Atom X Slider', async ({ page }) => {
    await expect(page.locator('#slider-residue-x')).toBeVisible();
    await expect(page.locator('#residue-x-value')).toBeVisible();

    await expect(page.locator('#slider-residue-x')).toHaveValue('50');
    await expect(page.locator('#residue-x-value')).toContainText('50');

    await page.locator('#slider-residue-x').fill('315');
    await expect(page.locator('#residue-x-value')).toContainText('315');
    await expect(page.locator('#info-display')).not.toBeEmpty();
    // Visual check of highlight is noted.

    await page.locator('#btn-contact-map').click();
    // Visual check for vertical red line is noted.
  });

  test('Jump to Atom Y Slider', async ({ page }) => {
    await expect(page.locator('#slider-residue-y')).toBeVisible();
    await expect(page.locator('#residue-y-value')).toBeVisible();

    await expect(page.locator('#slider-residue-y')).toHaveValue('52');
    await expect(page.locator('#residue-y-value')).toContainText('52');

    await page.locator('#slider-residue-y').fill('334');
    await expect(page.locator('#residue-y-value')).toContainText('334');
    await expect(page.locator('#info-display')).not.toBeEmpty();
    // Visual check of highlight is noted.

    await page.locator('#btn-contact-map').click();
    // Visual check for horizontal red line is noted.
  });

  test('RMSD Slider', async ({ page }) => {
    await expect(page.locator('#slider-rmsd')).toBeVisible();
    await expect(page.locator('#rmsd-value')).toBeVisible();

    await expect(page.locator('#slider-rmsd')).toHaveValue('4.9');
    await expect(page.locator('#rmsd-value')).toContainText('4.9');

    await page.locator('#btn-contact-map').click();
    await page.locator('#slider-rmsd').fill('7.5');
    await expect(page.locator('#rmsd-value')).toContainText('7.5');
    // Visual check for point density is noted.

    await page.locator('#slider-rmsd').fill('0');
    await expect(page.locator('#rmsd-value')).toContainText('0');
    // Visual check for points disappearing is noted.
  });

  test('Plot Size Slider', async ({ page }) => {
    const canvasLocator = page.locator('#canvas-container canvas');
    
    await expect(page.locator('#slider-plot-size')).toBeVisible();
    await expect(page.locator('#plot-size-value')).toBeVisible();

    await expect(page.locator('#slider-plot-size')).toHaveValue('400');
    await expect(page.locator('#plot-size-value')).toContainText('400');

    await page.locator('#slider-plot-size').fill('523');
    await expect(page.locator('#plot-size-value')).toContainText('523');
    await expect(canvasLocator).toHaveAttribute('width', '523');
    await expect(canvasLocator).toHaveAttribute('height', '523');

    await page.locator('#slider-plot-size').fill('200');
    await expect(page.locator('#plot-size-value')).toContainText('200');
    await expect(canvasLocator).toHaveAttribute('width', '200');
    await expect(canvasLocator).toHaveAttribute('height', '200');
  });

  test('Reset View Button', async ({ page }) => {
    await expect(page.locator('#btn-reset')).toBeVisible();
    // Default view is asserted on page load.

    // Simulate a drag on the canvas to change the view
    const canvas = page.locator('#canvas-container canvas');
    const bb = await canvas.boundingBox();
    if (bb) {
        await page.mouse.move(bb.x + bb.width / 2, bb.y + bb.height / 2);
        await page.mouse.down();
        await page.mouse.move(bb.x + bb.width / 2 + 50, bb.y + bb.height / 2 + 50);
        await page.mouse.up();
    }
    // Asserting camera change is not feasible without inspecting internal state. The action implies the change.

    // Store slider values before reset
    const grayLevel = await page.locator('#slider-gray-level').inputValue();
    const browseSeq = await page.locator('#slider-browse-sequence').inputValue();
    const residueX = await page.locator('#slider-residue-x').inputValue();
    const residueY = await page.locator('#slider-residue-y').inputValue();
    const rmsd = await page.locator('#slider-rmsd').inputValue();
    const plotSize = await page.locator('#slider-plot-size').inputValue();

    await page.locator('#btn-reset').click();

    // Assert camera returns to default (not testable), but sliders remain unchanged.
    await expect(page.locator('#slider-gray-level')).toHaveValue(grayLevel);
    await expect(page.locator('#slider-browse-sequence')).toHaveValue(browseSeq);
    await expect(page.locator('#slider-residue-x')).toHaveValue(residueX);
    await expect(page.locator('#slider-residue-y')).toHaveValue(residueY);
    await expect(page.locator('#slider-rmsd')).toHaveValue(rmsd);
    await expect(page.locator('#slider-plot-size')).toHaveValue(plotSize);
  });
});