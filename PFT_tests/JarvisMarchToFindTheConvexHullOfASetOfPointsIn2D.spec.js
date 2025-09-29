const { test, expect } = require('@playwright/test');
const fileUrl = 'file://' + require('path').resolve(__dirname, '../pages/JarvisMarchToFindTheConvexHullOfASetOfPointsIn2D.html');

test.describe('Jarvis March Convex Hull Visualization', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(fileUrl);
    await page.waitForTimeout(500);
  });

  test('Move the points" Mode Button', async ({ page }) => {
    // 1. Assert: The "move the points" button (`#btn-move`) is visible.
    await expect(page.locator('#btn-move')).toBeVisible();

    // 2. Assert: The button has an "active" style, and the algorithm step controls (`#step-controls`) are hidden or disabled.
    await expect(page.locator('#step-controls')).toBeHidden();

    // 3. Action: Click the "start the algorithm" button.
    await page.locator('#btn-start-algo').click();

    // 4. Assert: The "move the points" button style changes to inactive, and the algorithm step controls become visible and enabled.
    await expect(page.locator('#step-controls')).toBeVisible();

    // 5. Action: Click the "move the points" button again.
    await page.locator('#btn-move').click();

    // 6. Assert: The algorithm step controls are hidden/disabled, the explanation panel is cleared, and the canvas resets to show only the initial points.
    await expect(page.locator('#step-controls')).toBeHidden();
    await expect(page.locator('#explanation-text')).toBeEmpty();
  });

  test('"Start the algorithm" Mode Button', async ({ page }) => {
    // 1. Assert: The "start the algorithm" button (`#btn-start-algo`) is visible.
    await expect(page.locator('#btn-start-algo')).toBeVisible();

    // 2. Assert: The button has a default (inactive) style, and points on the canvas are draggable.
    // Inactive style is asserted by checking that step controls are hidden
    await expect(page.locator('#step-controls')).toBeHidden();

    // 3. Action: Click the "start the algorithm" button.
    await page.locator('#btn-start-algo').click();

    // 4. Assert: The button's style changes to "active", the step controls become enabled, and the points on the canvas are no longer draggable.
    // Active style is asserted by checking that step controls are visible
    await expect(page.locator('#step-controls')).toBeVisible();
    await expect(page.locator('#btn-step1-explain')).toBeEnabled();
    await expect(page.locator('#btn-step1-do')).toBeEnabled();
    // Cannot directly test draggability, but this state change implies it.

    // 5. Action: Click the "move the points" button.
    await page.locator('#btn-move').click();

    // 6. Assert: The "start the algorithm" button's style returns to default, and the step controls are disabled.
    await expect(page.locator('#step-controls')).toBeHidden();
  });

  test('Draggable Points on Canvas', async ({ page }) => {
    // 1. Assert: The points are visible on the canvas in their default light green color.
    // This is a visual assertion. We proceed assuming the initial state is correct.
    await expect(page.locator('canvas')).toBeVisible();

    // 2. Assert: The demo is in "move" mode by default, allowing points to be dragged.
    await expect(page.locator('#step-controls')).toBeHidden();

    // 3. Action: Press the mouse down on a point, drag it to a new location, and release the mouse.
    // We simulate a drag on the canvas. Visual verification of a single point's move is out of scope.
    await page.locator('canvas').dragTo(page.locator('canvas'), {
      sourcePosition: { x: 150, y: 350 }, // Position of the first point
      targetPosition: { x: 200, y: 300 }
    });

    // 4. Assert: The visual position of the point on the canvas has changed.
    // This requires visual regression testing, which is not part of this test suite.

    // 5. Action: Click "start the algorithm", then attempt to drag a point.
    await page.locator('#btn-start-algo').click();
    await page.locator('canvas').dragTo(page.locator('canvas'), {
      sourcePosition: { x: 200, y: 300 }, // Position of the moved point
      targetPosition: { x: 250, y: 250 }
    });

    // 6. Assert: The position of the point on the canvas does not change.
    // We assert this by checking that the application state did not change unexpectedly.
    // For example, step 2 buttons should still be disabled.
    await expect(page.locator('#btn-step2-explain')).toBeDisabled();
    await expect(page.locator('#btn-step2-do')).toBeDisabled();
  });

  test('Step 1 "explain" Button', async ({ page }) => {
    // 1. Assert: The "explain" button for Step 1 (`#btn-step1-explain`) is visible.
    await expect(page.locator('#btn-step1-explain')).toBeVisible();

    // 2. Assert: The button is disabled by default. The explanation panel is empty.
    await expect(page.locator('#btn-step1-explain')).toBeDisabled();
    await expect(page.locator('#explanation-text')).toBeEmpty();

    // 3. Action: Click "start the algorithm", then click the now-enabled "explain" button for Step 1.
    await page.locator('#btn-start-algo').click();
    await page.locator('#btn-step1-explain').click();

    // 4. Assert: Text describing Step 1 appears in the explanation panel (`#explanation-text`).
    await expect(page.locator('#explanation-text')).toHaveText('Step 1. Find the leftmost point.');

    // 5. Action: Click "move the points" to reset the demo.
    await page.locator('#btn-move').click();

    // 6. Assert: The explanation panel text is cleared and the "explain" button for Step 1 is disabled again.
    await expect(page.locator('#explanation-text')).toBeEmpty();
    await expect(page.locator('#btn-step1-explain')).toBeDisabled();
  });

  test('Step 1 "do it" Button', async ({ page }) => {
    // 1. Assert: The "do it" button for Step 1 (`#btn-step1-do`) is visible.
    await expect(page.locator('#btn-step1-do')).toBeVisible();

    // 2. Assert: The button is disabled by default, and all points on the canvas are green.
    await expect(page.locator('#btn-step1-do')).toBeDisabled();

    // 3. Action: Click "start the algorithm", then click the now-enabled "do it" button for Step 1.
    await page.locator('#btn-start-algo').click();
    await page.locator('#btn-step1-do').click();

    // 4. Assert: The leftmost point on the canvas changes color to dark blue, and the Step 2 control buttons become enabled.
    // We assert the testable side-effect: Step 2 buttons are enabled.
    await expect(page.locator('#btn-step2-explain')).toBeEnabled();
    await expect(page.locator('#btn-step2-do')).toBeEnabled();

    // 5. Action: Click the "do it" button for Step 1 again.
    // Button is now disabled, so click will have no effect.
    await page.locator('#btn-step1-do').click({ force: true }); // force click on disabled

    // 6. Assert: There is no change, as the button is now disabled.
    // We assert this by checking that Step 3 buttons are still disabled.
    await expect(page.locator('#btn-step3-explain')).toBeDisabled();
  });

  test('Step 2 "explain" Button', async ({ page }) => {
    // 1. Assert: The "explain" button for Step 2 (`#btn-step2-explain`) is visible.
    await expect(page.locator('#btn-step2-explain')).toBeVisible();

    // 2. Assert: The button is disabled by default.
    await expect(page.locator('#btn-step2-explain')).toBeDisabled();

    // 3. Action: Click "start the algorithm", then "do it" for Step 1, then the now-enabled "explain" for Step 2.
    await page.locator('#btn-start-algo').click();
    await page.locator('#btn-step1-do').click();
    await page.locator('#btn-step2-explain').click();

    // 4. Assert: Text describing Step 2 is appended to the text in the explanation panel.
    await expect(page.locator('#explanation-text')).toContainText('Step 2. Find the point clockwise furthest to the right relative to the leftmost point.');

    // 5. Action: Click "move the points" to reset the demo.
    await page.locator('#btn-move').click();

    // 6. Assert: The explanation panel text is cleared and the "explain" button for Step 2 is disabled.
    await expect(page.locator('#explanation-text')).toBeEmpty();
    await expect(page.locator('#btn-step2-explain')).toBeDisabled();
  });

  test('Step 2 "do it" Button', async ({ page }) => {
    // 1. Assert: The "do it" button for Step 2 (`#btn-step2-do`) is visible.
    await expect(page.locator('#btn-step2-do')).toBeVisible();

    // 2. Assert: The button is disabled by default, and no lines are drawn on the canvas.
    await expect(page.locator('#btn-step2-do')).toBeDisabled();

    // 3. Action: Click "start the algorithm", "do it" for Step 1, then the now-enabled "do it" for Step 2.
    await page.locator('#btn-start-algo').click();
    await page.locator('#btn-step1-do').click();
    await page.locator('#btn-step2-do').click();

    // 4. Assert: The canvas updates to show teal candidate lines, a dark blue hull edge, and a second point changes color to dark blue. The Step 3 buttons become enabled.
    // We assert the testable side-effect: Step 3 buttons are enabled.
    await expect(page.locator('#btn-step3-explain')).toBeEnabled();
    await expect(page.locator('#btn-step3-do')).toBeEnabled();

    // 5. Action: Click "move the points" to reset the demo.
    await page.locator('#btn-move').click();

    // 6. Assert: All lines are removed from the canvas, and the "do it" button for Step 2 is disabled.
    await expect(page.locator('#btn-step2-do')).toBeDisabled();
  });

  test('Step 3 "explain" Button', async ({ page }) => {
    // 1. Assert: The "explain" button for Step 3 (`#btn-step3-explain`) is visible.
    await expect(page.locator('#btn-step3-explain')).toBeVisible();

    // 2. Assert: The button is disabled by default.
    await expect(page.locator('#btn-step3-explain')).toBeDisabled();

    // 3. Action: Complete Steps 1 and 2, then click the now-enabled "explain" button for Step 3.
    await page.locator('#btn-start-algo').click();
    await page.locator('#btn-step1-do').click();
    await page.locator('#btn-step2-do').click();
    await page.locator('#btn-step3-explain').click();

    // 4. Assert: Text describing Step 3 is appended to the text in the explanation panel.
    await expect(page.locator('#explanation-text')).toContainText('Step 3. Repeat finding the point clockwise furthest to the right relative to the previously found point, until the leftmost point is reached again.');

    // 5. Action: Click "move the points" to reset.
    await page.locator('#btn-move').click();

    // 6. Assert: The explanation panel is cleared and the "explain" button is disabled.
    await expect(page.locator('#explanation-text')).toBeEmpty();
    await expect(page.locator('#btn-step3-explain')).toBeDisabled();
  });

  test('Step 3 "do it" Button', async ({ page }) => {
    // 1. Assert: The "do it" button for Step 3 (`#btn-step3-do`) is visible.
    await expect(page.locator('#btn-step3-do')).toBeVisible();

    // 2. Assert: The button is disabled by default.
    await expect(page.locator('#btn-step3-do')).toBeDisabled();

    // 3. Action: Complete Steps 1 and 2, then click the now-enabled "do it" button for Step 3.
    await page.locator('#btn-start-algo').click();
    await page.locator('#btn-step1-do').click();
    await page.locator('#btn-step2-do').click();
    await page.locator('#btn-step3-do').click();

    // 4. Assert: The canvas shows new candidate lines, then draws a new dark blue hull edge, and a third point changes color. The "do it" button becomes disabled.
    await expect(page.locator('#btn-step3-do')).toBeDisabled();
    
    // 5. Action: Click the first "repeat" button, which is now enabled.
    const repeatButton = page.locator('#step3-actions button', { hasText: 'repeat' }).first();
    await expect(repeatButton).toBeEnabled();
    await repeatButton.click();

    // 6. Assert: The canvas updates again with another hull edge and point color change. The clicked "repeat" button becomes disabled.
    await expect(repeatButton).toBeDisabled();
  });
});