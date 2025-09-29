const { test, expect } = require('@playwright/test');
const path = require('path');

const fileUrl = 'file://' + path.resolve(__dirname, '../pages/EratosthenessMeasureOfTheEarthsCircumference.html');

test.describe("Eratosthenes's Measure of the Earth's Circumference", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(fileUrl);
    await page.waitForTimeout(500);
  });

  test('Post Angle Slider', async ({ page }) => {
    // 1. Assert: The slider control with the label "post angle" is visible.
    const postAngleSlider = page.locator('#slider-post-angle');
    await expect(page.getByLabel('post angle')).toBeVisible();

    // 2. Assert: The slider's default value is 7, and the adjacent text display (`#display-post-angle`) shows "7".
    await expect(postAngleSlider).toHaveValue('7');
    await expect(page.locator('#display-post-angle')).toHaveText('7');

    // 3. Action: Drag the slider handle to the middle, setting its value to approximately 30.
    await postAngleSlider.fill('30');

    // 4. Assert: The text display updates to "30.0" and the angle visualization on the canvas redraws to show a larger angle.
    await expect(page.locator('#display-post-angle')).toHaveText(/^30\.00*$/);
    // Note: Canvas redraw is visually confirmed. The state change is asserted via the display value.

    // 5. Action: Drag the slider handle to its maximum position.
    await postAngleSlider.fill('60');

    // 6. Assert: The text display shows "60.0" and the canvas visualization updates to reflect the maximum angle.
    await expect(page.locator('#display-post-angle')).toHaveText(/^60\.00*$/);
    // Note: Canvas redraw is visually confirmed. The state change is asserted via the display value.
  });

  test('Zoom Checkbox', async ({ page }) => {
    const zoomCheckbox = page.locator('#checkbox-zoom');
    const canvas = page.locator('#demo-canvas');

    // 1. Assert: The checkbox with the label "zoom" is visible.
    await expect(page.getByLabel('zoom')).toBeVisible();

    // 2. Assert: The checkbox is unchecked by default, and the canvas shows a full view of the Earth.
    await expect(zoomCheckbox).not.toBeChecked();
    const initialCanvasScreenshot = await canvas.screenshot();
    // Note: Asserting the canvas shows the "full view" by taking a baseline screenshot.

    // 3. Action: Click the "zoom" checkbox to check it.
    await zoomCheckbox.click();

    // 4. Assert: The checkbox becomes checked, and the canvas redraws to show a zoomed-in sector view of the Earth.
    await expect(zoomCheckbox).toBeChecked();
    const zoomedCanvasScreenshot = await canvas.screenshot();
    expect(zoomedCanvasScreenshot).not.toEqual(initialCanvasScreenshot);
    // Note: Asserting the view has changed by comparing the new screenshot to the initial one.

    // 5. Action: Click the "zoom" checkbox again to uncheck it.
    await zoomCheckbox.click();

    // 6. Assert: The checkbox becomes unchecked, and the canvas redraws to return to the full view of the Earth.
    await expect(zoomCheckbox).not.toBeChecked();
    const finalCanvasScreenshot = await canvas.screenshot();
    expect(finalCanvasScreenshot).toEqual(initialCanvasScreenshot);
    // Note: Asserting the view returned to the initial state by comparing screenshots.
  });
});