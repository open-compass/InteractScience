const { test, expect } = require('@playwright/test');
const path = require('path');

const fileUrl = 'file://' + path.resolve(__dirname, '../pages/QuadraticsTangentToACubic.html');

test.describe('Quadratics Tangent To A Cubic', () => {

  test('Initial state with a cubic curve and a tangent quadratic at t=0.5', async ({ page }) => {
    await page.goto(fileUrl);
    await page.screenshot({ path: './snapshots/QuadraticsTangentToACubic-1.png', fullPage: true });
  });

  test('Family of tangent quadratics with the selected tangent at t=0', async ({ page }) => {
    await page.goto(fileUrl);
    await page.locator('#slider-t').fill('0');
    await page.locator('#checkbox-family').check();
    await page.screenshot({ path: './snapshots/QuadraticsTangentToACubic-2.png', fullPage: true });
  });

  test('Modified cubic curve with tangent at t=0 after moving two locators', async ({ page }) => {
    await page.goto(fileUrl);

    const canvas = page.locator('#canvas-container canvas');
    const canvasBox = await canvas.boundingBox();

    // Assumptions from implementation plan for coordinate mapping:
    // Canvas size: 600x500 pixels
    // Origin (0,0): Center of canvas (300, 250)
    // Scale: 50 pixels per unit
    const canvasWidth = 600;
    const canvasHeight = 500;
    const scale = 50;
    const originX = canvasWidth / 2;
    const originY = canvasHeight / 2;

    // Action: Drag the locator at initial coordinates (-2, 1.8) to the new coordinates (-2, -1.5).
    const start1 = { x: -2, y: 1.8 };
    const end1 = { x: -2, y: -1.5 };
    const startPx1 = { x: originX + start1.x * scale, y: originY - start1.y * scale };
    const endPx1 = { x: originX + end1.x * scale, y: originY - end1.y * scale };
    await page.mouse.move(canvasBox.x + startPx1.x, canvasBox.y + startPx1.y);
    await page.mouse.down();
    await page.mouse.move(canvasBox.x + endPx1.x, canvasBox.y + endPx1.y);
    await page.mouse.up();

    // Action: Drag the locator at initial coordinates (4, -1) to the new coordinates (3.5, 0).
    const start2 = { x: 4, y: -1 };
    const end2 = { x: 3.5, y: 0 };
    const startPx2 = { x: originX + start2.x * scale, y: originY - start2.y * scale };
    const endPx2 = { x: originX + end2.x * scale, y: originY - end2.y * scale };
    await page.mouse.move(canvasBox.x + startPx2.x, canvasBox.y + startPx2.y);
    await page.mouse.down();
    await page.mouse.move(canvasBox.x + endPx2.x, canvasBox.y + endPx2.y);
    await page.mouse.up();

    // Action: Set the value of the 'choose quadratic' slider (`slider-t`) to 0.
    await page.locator('#slider-t').fill('0');

    await page.screenshot({ path: './snapshots/QuadraticsTangentToACubic-3.png', fullPage: true });
  });

  test('A different modified cubic curve with tangent at t=0', async ({ page }) => {
    await page.goto(fileUrl);

    const canvas = page.locator('#canvas-container canvas');
    const canvasBox = await canvas.boundingBox();

    // Assumptions from implementation plan for coordinate mapping:
    // Canvas size: 600x500 pixels
    // Origin (0,0): Center of canvas (300, 250)
    // Scale: 50 pixels per unit
    const canvasWidth = 600;
    const canvasHeight = 500;
    const scale = 50;
    const originX = canvasWidth / 2;
    const originY = canvasHeight / 2;

    // Action: Drag the locator at initial coordinates (-2, 1.8) to the new coordinates (-2, -1.5).
    const start1 = { x: -2, y: 1.8 };
    const end1 = { x: -2, y: -1.5 };
    const startPx1 = { x: originX + start1.x * scale, y: originY - start1.y * scale };
    const endPx1 = { x: originX + end1.x * scale, y: originY - end1.y * scale };
    await page.mouse.move(canvasBox.x + startPx1.x, canvasBox.y + startPx1.y);
    await page.mouse.down();
    await page.mouse.move(canvasBox.x + endPx1.x, canvasBox.y + endPx1.y);
    await page.mouse.up();

    // Action: Drag the locator at initial coordinates (1, -1) to the new coordinates (1, -0.5).
    const start2 = { x: 1, y: -1 };
    const end2 = { x: 1, y: -0.5 };
    const startPx2 = { x: originX + start2.x * scale, y: originY - start2.y * scale };
    const endPx2 = { x: originX + end2.x * scale, y: originY - end2.y * scale };
    await page.mouse.move(canvasBox.x + startPx2.x, canvasBox.y + startPx2.y);
    await page.mouse.down();
    await page.mouse.move(canvasBox.x + endPx2.x, canvasBox.y + endPx2.y);
    await page.mouse.up();

    // Action: Set the value of the 'choose quadratic' slider (`slider-t`) to 0.
    await page.locator('#slider-t').fill('0');

    await page.screenshot({ path: './snapshots/QuadraticsTangentToACubic-4.png', fullPage: true });
  });

});