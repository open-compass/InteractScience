const { test, expect } = require('@playwright/test');
const fileUrl = 'file://' + require('path').resolve(__dirname, '../pages/CircularHoleDrilledInACylinder.html');

test.describe('Circular Hole Drilled In A Cylinder Visualization', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(fileUrl);
    await page.waitForTimeout(500);
  });

  test('Cylinder Radius Slider Functionality', async ({ page }) => {
    // 1. Assert: The "cylinder radius" slider (`slider-cylinder-radius`) is visible.
    await expect(page.locator('#slider-cylinder-radius')).toBeVisible();

    // 2. Assert: The slider's value is 2.1, and its corresponding label (`label-cylinder-radius`) displays "2.10".
    await expect(page.locator('#slider-cylinder-radius')).toHaveValue('2.1');
    await expect(page.locator('#label-cylinder-radius')).toHaveText(/^2\.100*$/);

    // 3. Action: Drag the slider to the left, setting its value to 1.5.
    await page.locator('#slider-cylinder-radius').fill('1.5');

    // 4. Assert: The label updates to "1.50", and the radius of the 3D cylinder model decreases.
    await expect(page.locator('#label-cylinder-radius')).toHaveText(/^1\.500*$/);

    // 5. Action: Drag the slider to its maximum value of 3.0.
    await page.locator('#slider-cylinder-radius').fill('3');

    // 6. Assert: The label updates to "3.00", and the radius of the 3D cylinder model increases.
    await expect(page.locator('#label-cylinder-radius')).toHaveText(/^3\.000*$/);
  });

  test('Opacity Slider Functionality', async ({ page }) => {
    // 1. Assert: The "opacity" slider (`slider-opacity`) is visible.
    await expect(page.locator('#slider-opacity')).toBeVisible();

    // 2. Assert: The slider's value is 0.95, and its corresponding label (`label-opacity`) displays "0.95".
    await expect(page.locator('#slider-opacity')).toHaveValue('0.95');
    await expect(page.locator('#label-opacity')).toHaveText(/^0\.950*$/);

    // 3. Action: Drag the slider to the left, setting its value to 0.4.
    await page.locator('#slider-opacity').fill('0.4');

    // 4. Assert: The label updates to "0.40", and the 3D cylinder model becomes more transparent.
    await expect(page.locator('#label-opacity')).toHaveText(/^0\.400*$/);

    // 5. Action: Drag the slider to its minimum value of 0.0.
    await page.locator('#slider-opacity').fill('0');

    // 6. Assert: The label updates to "0.00", and the 3D cylinder model becomes fully transparent.
    await expect(page.locator('#label-opacity')).toHaveText(/^0\.000*$/);
  });

  test('Drill Radius Slider Functionality', async ({ page }) => {
    // 1. Assert: The "drill radius" slider (`slider-drill-radius`) is visible.
    await expect(page.locator('#slider-drill-radius')).toBeVisible();

    // 2. Assert: The slider's value is 1.35, and its corresponding label (`label-drill-radius`) displays "1.35".
    await expect(page.locator('#slider-drill-radius')).toHaveValue('1.35');
    await expect(page.locator('#label-drill-radius')).toHaveText(/^1\.350*$/);

    // 3. Action: Drag the slider to the right, setting its value to 2.0.
    await page.locator('#slider-drill-radius').fill('2');

    // 4. Assert: The label updates to "2.00", and the hole in the 3D cylinder model becomes larger.
    await expect(page.locator('#label-drill-radius')).toHaveText(/^2\.000*$/);

    // 5. Action: Drag the slider to its minimum value of 0.1.
    await page.locator('#slider-drill-radius').fill('0.1');

    // 6. Assert: The label updates to "0.10", and the hole in the 3D cylinder model becomes very small.
    await expect(page.locator('#label-drill-radius')).toHaveText(/^0\.100*$/);
  });

  test('Inclination Slider Functionality', async ({ page }) => {
    // 1. Assert: The "inclination" slider (`slider-inclination`) is visible.
    await expect(page.locator('#slider-inclination')).toBeVisible();

    // 2. Assert: The slider's value is 0.76, and its corresponding label (`label-inclination`) displays "0.76".
    await expect(page.locator('#slider-inclination')).toHaveValue('0.76');
    await expect(page.locator('#label-inclination')).toHaveText(/^0\.760*$/);

    // 3. Action: Drag the slider to the right, setting its value to 1.2.
    await page.locator('#slider-inclination').fill('1.2');

    // 4. Assert: The label updates to "1.20", and the angle of the hole in the 3D cylinder model changes.
    await expect(page.locator('#label-inclination')).toHaveText(/^1\.200*$/);

    // 5. Action: Drag the slider to its minimum value of 0.
    await page.locator('#slider-inclination').fill('0');

    // 6. Assert: The label updates to "0.00", and the hole is drilled perfectly horizontally through the cylinder.
    await expect(page.locator('#label-inclination')).toHaveText(/^0\.000*$/);
  });

  test('Rotation Around Vertical Slider Functionality', async ({ page }) => {
    // 1. Assert: The "rotation around vertical" slider (`slider-rotation`) is visible.
    await expect(page.locator('#slider-rotation')).toBeVisible();

    // 2. Assert: The slider's value is 0.9, and its corresponding label (`label-rotation`) displays "0.90".
    await expect(page.locator('#slider-rotation')).toHaveValue('0.9');
    await expect(page.locator('#label-rotation')).toHaveText(/^0\.900*$/);

    // 3. Action: Drag the slider to the left, setting its value to -0.5.
    await page.locator('#slider-rotation').fill('-0.5');

    // 4. Assert: The label updates to "-0.50", and the hole in the 3D model rotates around the cylinder's central axis.
    await expect(page.locator('#label-rotation')).toHaveText(/^\-0\.500*$/);

    // 5. Action: Drag the slider to its maximum value of 3.14.
    await page.locator('#slider-rotation').fill('3.14');

    // 6. Assert: The label updates to "3.14", and the hole rotates to a new position on the cylinder.
    await expect(page.locator('#label-rotation')).toHaveText(/^3\.140*$/);
  });

  test('Offset Slider Functionality', async ({ page }) => {
    // 1. Assert: The "offset" slider (`slider-offset`) is visible.
    await expect(page.locator('#slider-offset')).toBeVisible();

    // 2. Assert: The slider's value is -0.92, and its corresponding label (`label-offset`) displays "-0.92".
    await expect(page.locator('#slider-offset')).toHaveValue('-0.92');
    await expect(page.locator('#label-offset')).toHaveText(/^\-0\.920*$/);

    // 3. Action: Drag the slider to the right, setting its value to 0.0.
    await page.locator('#slider-offset').fill('0');

    // 4. Assert: The label updates to "0.00", and the hole in the 3D model moves vertically toward the center.
    await expect(page.locator('#label-offset')).toHaveText(/^0\.000*$/);

    // 5. Action: Drag the slider to its maximum value of 2.0.
    await page.locator('#slider-offset').fill('2');

    // 6. Assert: The label updates to "2.00", and the hole moves to a higher vertical position on the cylinder.
    await expect(page.locator('#label-offset')).toHaveText(/^2\.000*$/);
  });

  test('Boundary Curve Only Checkbox Functionality', async ({ page }) => {
    // 1. Assert: The "boundary curve only" checkbox (`checkbox-boundary-only`) is visible.
    await expect(page.locator('#checkbox-boundary-only')).toBeVisible();

    // 2. Assert: The checkbox is unchecked by default, and the drilled cylinder is rendered as a solid, opaque object.
    await expect(page.locator('#checkbox-boundary-only')).not.toBeChecked();

    // 3. Action: Click the checkbox to check it.
    await page.locator('#checkbox-boundary-only').check();

    // 4. Assert: The checkbox becomes checked, the main cylinder becomes highly transparent, and the boundary curve remains prominently visible.
    await expect(page.locator('#checkbox-boundary-only')).toBeChecked();

    // 5. Action: Click the checkbox again to uncheck it.
    await page.locator('#checkbox-boundary-only').uncheck();

    // 6. Assert: The checkbox becomes unchecked, and the cylinder rendering returns to its solid, opaque state.
    await expect(page.locator('#checkbox-boundary-only')).not.toBeChecked();
  });
});