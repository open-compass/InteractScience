const { test, expect } = require('@playwright/test');

const fileUrl = 'file://' + require('path').resolve(__dirname, '../pages/AForestGrowthCurve.html');

/**
 * Maps data coordinates (age, volume) to pixel coordinates on the canvas.
 * Assumes a 500x500 canvas with 50px padding on all sides for axes/labels.
 * @param {number} age - The age value (from 20 to 80).
 * @param {number} volume - The volume value (from 0 to 1500).
 * @returns {{x: number, y: number}} The pixel coordinates.
 */
function getPixelCoordinates(age, volume) {
    const canvasWidth = 500;
    const canvasHeight = 500;
    const padding = 50;

    const plotAreaXStart = padding;
    const plotAreaXEnd = canvasWidth - padding;
    const plotAreaYStart = padding;
    const plotAreaYEnd = canvasHeight - padding;

    const ageMin = 20;
    const ageMax = 80;
    const volumeMin = 0;
    const volumeMax = 1500;

    // Map age to x-coordinate
    const x = (age - ageMin) * (plotAreaXEnd - plotAreaXStart) / (ageMax - ageMin) + plotAreaXStart;
    // Map volume to y-coordinate (inverted for screen space)
    const y = (volume - volumeMin) * (plotAreaYStart - plotAreaYEnd) / (volumeMax - volumeMin) + plotAreaYEnd;

    return { x, y };
}

test.describe('AForestGrowthCurve', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto(fileUrl);
    });

    test('Initial view with default data points', async ({ page }) => {
        await page.screenshot({ path: './snapshots/AForestGrowthCurve-1.png', fullPage: true });
    });

    test('State with a completely new set of 10 data points', async ({ page }) => {
        const canvas = page.locator('#canvas-container canvas');

        // Delete initial points
        await canvas.dblclick({ position: getPixelCoordinates(30, 289) });
        await canvas.dblclick({ position: getPixelCoordinates(35, 445) });
        await canvas.dblclick({ position: getPixelCoordinates(40, 565) });
        await canvas.dblclick({ position: getPixelCoordinates(45, 704) });
        await canvas.dblclick({ position: getPixelCoordinates(50, 833) });
        await canvas.dblclick({ position: getPixelCoordinates(55, 924) });

        // Add new points
        await canvas.click({ position: getPixelCoordinates(31, 131) });
        await canvas.click({ position: getPixelCoordinates(38, 188) });
        await canvas.click({ position: getPixelCoordinates(42, 159) });
        await canvas.click({ position: getPixelCoordinates(50, 273) });
        await canvas.click({ position: getPixelCoordinates(54, 366) });
        await canvas.click({ position: getPixelCoordinates(56, 495) });
        await canvas.click({ position: getPixelCoordinates(59, 559) });
        await canvas.click({ position: getPixelCoordinates(65, 445) });
        await canvas.click({ position: getPixelCoordinates(68, 858) });
        await canvas.click({ position: getPixelCoordinates(70, 1130) });

        await page.screenshot({ path: './snapshots/AForestGrowthCurve-2.png', fullPage: true });
    });

    test('State after deleting one point and adding eight new points to the initial set', async ({ page }) => {
        const canvas = page.locator('#canvas-container canvas');

        // Delete one point
        await canvas.dblclick({ position: getPixelCoordinates(40, 565) });

        // Add new points
        await canvas.click({ position: getPixelCoordinates(22, 174) });
        await canvas.click({ position: getPixelCoordinates(23, 345) });
        await canvas.click({ position: getPixelCoordinates(30, 502) });
        await canvas.click({ position: getPixelCoordinates(39, 701) });
        await canvas.click({ position: getPixelCoordinates(42, 887) });
        await canvas.click({ position: getPixelCoordinates(50, 923) });
        await canvas.click({ position: getPixelCoordinates(60, 965) });
        await canvas.click({ position: getPixelCoordinates(63, 1044) });

        await page.screenshot({ path: './snapshots/AForestGrowthCurve-3.png', fullPage: true });
    });

    test('State after adding two points and moving all eight points to new locations', async ({ page }) => {
        const canvas = page.locator('#canvas-container canvas');

        // Add two new points
        await canvas.click({ position: getPixelCoordinates(20, 200) });
        await canvas.click({ position: getPixelCoordinates(70, 200) });

        // Drag points to new locations
        const dragAndDrop = async (from, to) => {
            const start = getPixelCoordinates(from.age, from.volume);
            const end = getPixelCoordinates(to.age, to.volume);
            await page.mouse.move(start.x, start.y);
            await page.mouse.down();
            await page.mouse.move(end.x, end.y);
            await page.mouse.up();
        };

        await dragAndDrop({ age: 30, volume: 289 }, { age: 22, volume: 445 });
        await dragAndDrop({ age: 35, volume: 445 }, { age: 24, volume: 552 });
        await dragAndDrop({ age: 40, volume: 565 }, { age: 29, volume: 644 });
        await dragAndDrop({ age: 45, volume: 704 }, { age: 32, volume: 766 });
        await dragAndDrop({ age: 50, volume: 833 }, { age: 37, volume: 830 });
        await dragAndDrop({ age: 55, volume: 924 }, { age: 43, volume: 944 });
        await dragAndDrop({ age: 20, volume: 200 }, { age: 51, volume: 1094 });
        await dragAndDrop({ age: 70, volume: 200 }, { age: 58, volume: 1208 });

        await page.screenshot({ path: './snapshots/AForestGrowthCurve-4.png', fullPage: true });
    });
});