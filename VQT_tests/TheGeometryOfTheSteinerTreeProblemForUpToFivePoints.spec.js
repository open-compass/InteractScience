const { test, expect } = require('@playwright/test');

test.describe('TheGeometryOfTheSteinerTreeProblemForUpToFivePoints', () => {
  const fileUrl = 'file://' + require('path').resolve(__dirname, '../pages/TheGeometryOfTheSteinerTreeProblemForUpToFivePoints.html');

  test('Default state with 4 regular and 2 Steiner points, optimized for minimal length.', async ({ page }) => {
    await page.goto(fileUrl);
    await page.waitForLoadState('domcontentloaded');

    const canvas = await page.locator('#main-canvas');
    const bbox = await canvas.boundingBox();
    const centerX = bbox.x + bbox.width / 2;
    const centerY = bbox.y + bbox.height / 2;

    // Drag one of the Steiner points from the center vertically upwards
    await page.mouse.move(centerX, centerY);
    await page.mouse.down();
    await page.mouse.move(centerX, bbox.y + bbox.height * 0.33);
    await page.mouse.up();

    // Drag the second Steiner point from the center vertically downwards
    await page.mouse.move(centerX, centerY);
    await page.mouse.down();
    await page.mouse.move(centerX, bbox.y + bbox.height * 0.67);
    await page.mouse.up();

    await page.screenshot({ path: './snapshots/TheGeometryOfTheSteinerTreeProblemForUpToFivePoints-1.png', fullPage: true });
  });

  test('Configuration with 3 regular points, 1 Steiner point, with angles hidden and points rearranged.', async ({ page }) => {
    await page.goto(fileUrl);
    await page.waitForLoadState('domcontentloaded');

    await page.locator('#btn-regular-3').click();
    await page.locator('#btn-steiner-1').click();
    await page.locator('#checkbox-show-angles').uncheck();
    await page.locator('#radio-regular').click();

    const canvas = await page.locator('#main-canvas');
    const bbox = await canvas.boundingBox();
    const centerX = bbox.x + bbox.width / 2;
    const centerY = bbox.y + bbox.height / 2;
    const radius = bbox.width * 0.375;

    // Initial positions for 3 regular points (equilateral triangle)
    const p0_from = { x: centerX, y: centerY - radius }; // Top-most
    const p1_from = { x: centerX - radius * Math.cos(Math.PI / 6), y: centerY + radius * Math.sin(Math.PI / 6) }; // Bottom-left
    const p2_from = { x: centerX + radius * Math.cos(Math.PI / 6), y: centerY + radius * Math.sin(Math.PI / 6) }; // Bottom-right

    // Drag the top-most regular point
    await page.mouse.move(p0_from.x, p0_from.y);
    await page.mouse.down();
    await page.mouse.move(bbox.x + bbox.width * 0.25, bbox.y + bbox.height * 0.15);
    await page.mouse.up();

    // Drag the bottom-left regular point
    await page.mouse.move(p1_from.x, p1_from.y);
    await page.mouse.down();
    await page.mouse.move(bbox.x + bbox.width * 0.20, bbox.y + bbox.height * 0.85);
    await page.mouse.up();

    // Drag the bottom-right regular point
    await page.mouse.move(p2_from.x, p2_from.y);
    await page.mouse.down();
    await page.mouse.move(bbox.x + bbox.width * 0.80, bbox.y + bbox.height * 0.60);
    await page.mouse.up();

    await page.locator('#radio-steiner').click();

    // Drag the single Steiner point from the center
    const steiner_to_x = bbox.x + (0.25 + 0.20 + 0.80) / 3 * bbox.width;
    const steiner_to_y = bbox.y + (0.15 + 0.85 + 0.60) / 3 * bbox.height;
    await page.mouse.move(centerX, centerY);
    await page.mouse.down();
    await page.mouse.move(steiner_to_x, steiner_to_y);
    await page.mouse.up();

    await page.screenshot({ path: './snapshots/TheGeometryOfTheSteinerTreeProblemForUpToFivePoints-2.png', fullPage: true });
  });

  test('Configuration with 4 regular points and 2 Steiner points, arranged in an irregular quadrilateral.', async ({ page }) => {
    await page.goto(fileUrl);
    await page.waitForLoadState('domcontentloaded');

    await page.locator('#btn-regular-4').click();
    await page.locator('#btn-steiner-2').click();
    await page.locator('#checkbox-show-angles').uncheck();
    await page.locator('#radio-regular').click();

    const canvas = await page.locator('#main-canvas');
    const bbox = await canvas.boundingBox();
    const centerX = bbox.x + bbox.width / 2;
    const centerY = bbox.y + bbox.height / 2;
    const radius = bbox.width * 0.375;
    const r_sqrt2 = radius * Math.SQRT1_2;

    // Initial positions for 4 regular points (square rotated 45 degrees)
    const p_tl_from = { x: centerX - r_sqrt2, y: centerY - r_sqrt2 }; // Top-left
    const p_tr_from = { x: centerX + r_sqrt2, y: centerY - r_sqrt2 }; // Top-right
    const p_bl_from = { x: centerX - r_sqrt2, y: centerY + r_sqrt2 }; // Bottom-left
    const p_br_from = { x: centerX + r_sqrt2, y: centerY + r_sqrt2 }; // Bottom-right

    // Drag the top-left regular point
    await page.mouse.move(p_tl_from.x, p_tl_from.y);
    await page.mouse.down();
    await page.mouse.move(bbox.x + bbox.width * 0.25, bbox.y + bbox.height * 0.25);
    await page.mouse.up();

    // Drag the top-right regular point
    await page.mouse.move(p_tr_from.x, p_tr_from.y);
    await page.mouse.down();
    await page.mouse.move(bbox.x + bbox.width * 0.80, bbox.y + bbox.height * 0.15);
    await page.mouse.up();

    // Drag the bottom-left regular point
    await page.mouse.move(p_bl_from.x, p_bl_from.y);
    await page.mouse.down();
    await page.mouse.move(bbox.x + bbox.width * 0.20, bbox.y + bbox.height * 0.80);
    await page.mouse.up();

    // Drag the bottom-right regular point
    await page.mouse.move(p_br_from.x, p_br_from.y);
    await page.mouse.down();
    await page.mouse.move(bbox.x + bbox.width * 0.75, bbox.y + bbox.height * 0.75);
    await page.mouse.up();

    await page.locator('#radio-steiner').click();

    // Drag the top Steiner point
    await page.mouse.move(centerX, centerY);
    await page.mouse.down();
    await page.mouse.move(bbox.x + bbox.width * 0.45, bbox.y + bbox.height * 0.40);
    await page.mouse.up();

    // Drag the bottom Steiner point
    await page.mouse.move(centerX, centerY);
    await page.mouse.down();
    await page.mouse.move(bbox.x + bbox.width * 0.55, bbox.y + bbox.height * 0.65);
    await page.mouse.up();

    await page.screenshot({ path: './snapshots/TheGeometryOfTheSteinerTreeProblemForUpToFivePoints-3.png', fullPage: true });
  });

  test('Configuration with 5 regular points in a pentagon and 3 optimized Steiner points.', async ({ page }) => {
    await page.goto(fileUrl);
    await page.waitForLoadState('domcontentloaded');

    await page.locator('#btn-regular-5').click();
    await page.locator('#btn-steiner-3').click();
    await page.locator('#checkbox-show-angles').uncheck();

    const canvas = await page.locator('#main-canvas');
    const bbox = await canvas.boundingBox();
    const centerX = bbox.x + bbox.width / 2;
    const centerY = bbox.y + bbox.height / 2;

    // Drag the first Steiner point
    await page.mouse.move(centerX, centerY);
    await page.mouse.down();
    await page.mouse.move(bbox.x + bbox.width * 0.55, bbox.y + bbox.height * 0.35);
    await page.mouse.up();

    // Drag the second Steiner point
    await page.mouse.move(centerX, centerY);
    await page.mouse.down();
    await page.mouse.move(bbox.x + bbox.width * 0.40, bbox.y + bbox.height * 0.60);
    await page.mouse.up();

    // Drag the third Steiner point
    await page.mouse.move(centerX, centerY);
    await page.mouse.down();
    await page.mouse.move(bbox.x + bbox.width * 0.65, bbox.y + bbox.height * 0.65);
    await page.mouse.up();

    await page.screenshot({ path: './snapshots/TheGeometryOfTheSteinerTreeProblemForUpToFivePoints-4.png', fullPage: true });
  });
});