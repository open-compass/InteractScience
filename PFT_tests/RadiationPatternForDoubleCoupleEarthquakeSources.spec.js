const { test, expect } = require('@playwright/test');
const path = require('path');

const fileUrl = 'file://' + path.resolve(__dirname, '../pages/RadiationPatternForDoubleCoupleEarthquakeSources.html');

test.beforeEach(async ({ page }) => {
    await page.goto(fileUrl);
    // Wait for the canvas to be potentially rendered by the script
    // await page.waitForSelector('#canvas-container canvas');
    await page.waitForTimeout(500);
});

test.describe('Interactive Components for Double-Couple Earthquake Sources', () => {

    test('Strike Angle Slider Interaction', async ({ page }) => {
        const slider = page.locator('#slider-strike');
        const valueDisplay = page.locator('#strike-value');
        const canvas = page.locator('#canvas-container canvas');

        await test.step('Assert initial state', async () => {
            await expect(slider).toBeVisible();
            await expect(slider).toHaveValue('180');
            await expect(valueDisplay).toHaveText('180');
        });

        const initialScreenshot = await canvas.screenshot();

        await test.step('Set strike to 270', async () => {
            await slider.fill('270');
            await expect(valueDisplay).toHaveText('270');
            const newScreenshot = await canvas.screenshot();
            expect(newScreenshot).not.toEqual(initialScreenshot);
        });

        const secondScreenshot = await canvas.screenshot();

        await test.step('Set strike to max 360', async () => {
            await slider.fill('360');
            await expect(valueDisplay).toHaveText('360');
            const finalScreenshot = await canvas.screenshot();
            expect(finalScreenshot).not.toEqual(secondScreenshot);
        });
    });

    test('Dip Angle Slider Interaction', async ({ page }) => {
        const slider = page.locator('#slider-dip');
        const valueDisplay = page.locator('#dip-value');
        const canvas = page.locator('#canvas-container canvas');

        await test.step('Assert initial state', async () => {
            await expect(slider).toBeVisible();
            await expect(slider).toHaveValue('60');
            await expect(valueDisplay).toHaveText('60');
        });

        const initialScreenshot = await canvas.screenshot();

        await test.step('Set dip to 30', async () => {
            await slider.fill('30');
            await expect(valueDisplay).toHaveText('30');
            const newScreenshot = await canvas.screenshot();
            expect(newScreenshot).not.toEqual(initialScreenshot);
        });

        const secondScreenshot = await canvas.screenshot();

        await test.step('Set dip to min 0', async () => {
            await slider.fill('0');
            await expect(valueDisplay).toHaveText('0');
            const finalScreenshot = await canvas.screenshot();
            expect(finalScreenshot).not.toEqual(secondScreenshot);
        });
    });

    test('Rake Angle Slider Interaction', async ({ page }) => {
        const slider = page.locator('#slider-rake');
        const valueDisplay = page.locator('#rake-value');
        const canvas = page.locator('#canvas-container canvas');

        await test.step('Assert initial state', async () => {
            await expect(slider).toBeVisible();
            await expect(slider).toHaveValue('90');
            await expect(valueDisplay).toHaveText('90');
        });

        const initialScreenshot = await canvas.screenshot();

        await test.step('Set rake to 0', async () => {
            await slider.fill('0');
            await expect(valueDisplay).toHaveText('0');
            const newScreenshot = await canvas.screenshot();
            expect(newScreenshot).not.toEqual(initialScreenshot);
        });

        const secondScreenshot = await canvas.screenshot();

        await test.step('Set rake to min -180', async () => {
            await slider.fill('-180');
            await expect(valueDisplay).toHaveText('-180');
            const finalScreenshot = await canvas.screenshot();
            expect(finalScreenshot).not.toEqual(secondScreenshot);
        });
    });

    test('Wave Type Button Group Selection', async ({ page }) => {
        const btnP = page.locator('#btn-p');
        const btnSV = page.locator('#btn-sv');
        const btnSH = page.locator('#btn-sh');
        const canvas = page.locator('#canvas-container canvas');

        await test.step('Assert initial state', async () => {
            await expect(btnP).toBeVisible();
            await expect(btnSV).toBeVisible();
            await expect(btnSH).toBeVisible();
            await expect(btnP).toHaveClass(/active/);
            await expect(btnSV).not.toHaveClass(/active/);
            await expect(btnSH).not.toHaveClass(/active/);
        });

        const initialScreenshot = await canvas.screenshot();

        await test.step('Click SV button', async () => {
            await btnSV.click();
            await expect(btnSV).toHaveClass(/active/);
            await expect(btnP).not.toHaveClass(/active/);
            const svScreenshot = await canvas.screenshot();
            expect(svScreenshot).not.toEqual(initialScreenshot);
        });

        const svScreenshot = await canvas.screenshot();

        await test.step('Click SH button', async () => {
            await btnSH.click();
            await expect(btnSH).toHaveClass(/active/);
            await expect(btnSV).not.toHaveClass(/active/);
            const shScreenshot = await canvas.screenshot();
            expect(shScreenshot).not.toEqual(svScreenshot);
        });
    });

    test('Bounding Box Checkbox Toggle', async ({ page }) => {
        const checkbox = page.locator('#checkbox-box');
        const canvas = page.locator('#canvas-container canvas');

        await test.step('Assert initial state', async () => {
            await expect(checkbox).toBeVisible();
            await expect(checkbox).not.toBeChecked();
        });

        const screenshotNoBox = await canvas.screenshot();

        await test.step('Check the box', async () => {
            await checkbox.check();
            await expect(checkbox).toBeChecked();
            const screenshotWithBox = await canvas.screenshot();
            expect(screenshotWithBox).not.toEqual(screenshotNoBox);
        });

        await test.step('Uncheck the box', async () => {
            await checkbox.uncheck();
            await expect(checkbox).not.toBeChecked();
            const screenshotUnchecked = await canvas.screenshot();
            expect(screenshotUnchecked).toEqual(screenshotNoBox);
        });
    });
});