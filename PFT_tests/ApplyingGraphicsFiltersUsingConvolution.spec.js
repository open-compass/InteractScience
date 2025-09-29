const { test, expect } = require('@playwright/test');
const fileUrl = 'file://' + require('path').resolve(__dirname, '../pages/ApplyingGraphicsFiltersUsingConvolution.html');

test.describe('Applying Graphics Filters Using Convolution', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(fileUrl);
        await page.waitForTimeout(500);
    });

    test('Convolver Slider Interaction', async ({ page }) => {
        const slider = page.locator('#slider-convolver');
        const afterCanvas = page.locator('#canvas-after-container canvas');

        await expect(slider).toBeVisible();
        await expect(slider).toHaveValue('2');

        const initialCanvasScreenshot = await afterCanvas.screenshot();

        await slider.fill('4');
        const updatedCanvasScreenshot1 = await afterCanvas.screenshot();
        expect(updatedCanvasScreenshot1).not.toEqual(initialCanvasScreenshot);

        await slider.fill('1');
        const updatedCanvasScreenshot2 = await afterCanvas.screenshot();
        expect(updatedCanvasScreenshot2).not.toEqual(updatedCanvasScreenshot1);
    });

    test('Image Size Slider Interaction', async ({ page }) => {
        const slider = page.locator('#slider-image-size');
        const beforeCanvas = page.locator('#canvas-before-container canvas');
        const afterCanvas = page.locator('#canvas-after-container canvas');

        await expect(slider).toBeVisible();
        await expect(slider).toHaveValue('24');

        const initialBeforeScreenshot = await beforeCanvas.screenshot();
        const initialAfterScreenshot = await afterCanvas.screenshot();

        await slider.fill('35');
        const updatedBeforeScreenshot1 = await beforeCanvas.screenshot();
        const updatedAfterScreenshot1 = await afterCanvas.screenshot();
        expect(updatedBeforeScreenshot1).not.toEqual(initialBeforeScreenshot);
        expect(updatedAfterScreenshot1).not.toEqual(initialAfterScreenshot);

        await slider.fill('40');
        const updatedBeforeScreenshot2 = await beforeCanvas.screenshot();
        const updatedAfterScreenshot2 = await afterCanvas.screenshot();
        expect(updatedBeforeScreenshot2).not.toEqual(updatedBeforeScreenshot1);
        expect(updatedAfterScreenshot2).not.toEqual(updatedAfterScreenshot1);
    });

    test('Letter Input Field Interaction', async ({ page }) => {
        const input = page.locator('#input-letter');
        const beforeCanvas = page.locator('#canvas-before-container canvas');
        const afterCanvas = page.locator('#canvas-after-container canvas');

        await expect(input).toBeVisible();
        await expect(input).toHaveValue('a');

        const initialBeforeScreenshot = await beforeCanvas.screenshot();
        const initialAfterScreenshot = await afterCanvas.screenshot();

        await input.fill('m');
        const updatedBeforeScreenshot1 = await beforeCanvas.screenshot();
        const updatedAfterScreenshot1 = await afterCanvas.screenshot();
        await expect(input).toHaveValue('m');
        expect(updatedBeforeScreenshot1).not.toEqual(initialBeforeScreenshot);
        expect(updatedAfterScreenshot1).not.toEqual(initialAfterScreenshot);

        await input.press('ArrowUp');
        const updatedBeforeScreenshot2 = await beforeCanvas.screenshot();
        const updatedAfterScreenshot2 = await afterCanvas.screenshot();
        await expect(input).not.toHaveValue('m');
        expect(updatedBeforeScreenshot2).not.toEqual(updatedBeforeScreenshot1);
        expect(updatedAfterScreenshot2).not.toEqual(updatedAfterScreenshot1);
    });

    test('Filter Selection Radio Buttons', async ({ page }) => {
        const radioShadow = page.locator('#radio-shadow');
        const radioBlur = page.locator('#radio-blur');
        const afterCanvas = page.locator('#canvas-after-container canvas');

        await expect(radioShadow).toBeVisible();
        await expect(radioBlur).toBeVisible();
        await expect(radioShadow).toBeChecked();

        const initialScreenshot = await afterCanvas.screenshot();

        await page.locator('label[for="radio-blur"]').click();
        await expect(radioBlur).toBeChecked();
        const blurScreenshot = await afterCanvas.screenshot();
        expect(blurScreenshot).not.toEqual(initialScreenshot);

        await page.locator('label[for="radio-shadow"]').click();
        await expect(radioShadow).toBeChecked();
        const shadowScreenshot = await afterCanvas.screenshot();
        expect(shadowScreenshot).not.toEqual(blurScreenshot);
        expect(shadowScreenshot).toEqual(initialScreenshot);
    });

    test('Convolver Plus Button', async ({ page }) => {
        const plusButton = page.locator('#convolver-plus-btn');
        const slider = page.locator('#slider-convolver');
        const afterCanvas = page.locator('#canvas-after-container canvas');

        await expect(plusButton).toBeVisible();
        await expect(slider).toHaveValue('2');
        const initialScreenshot = await afterCanvas.screenshot();

        await plusButton.click();
        await expect(slider).toHaveValue('3');
        const screenshotAfterClick1 = await afterCanvas.screenshot();
        expect(screenshotAfterClick1).not.toEqual(initialScreenshot);

        await slider.fill('4');
        await plusButton.click();
        await expect(slider).toHaveValue('5');

        await plusButton.click();
        await expect(slider).toHaveValue('5');
    });

    test('Image Size Plus Button', async ({ page }) => {
        const plusButton = page.locator('#image-size-plus-btn');
        const slider = page.locator('#slider-image-size');
        const beforeCanvas = page.locator('#canvas-before-container canvas');
        const afterCanvas = page.locator('#canvas-after-container canvas');

        await expect(plusButton).toBeVisible();
        await expect(slider).toHaveValue('24');
        const initialBeforeScreenshot = await beforeCanvas.screenshot();
        const initialAfterScreenshot = await afterCanvas.screenshot();

        await plusButton.click();
        await expect(slider).toHaveValue('25');
        const screenshotBeforeAfterClick1 = await beforeCanvas.screenshot();
        const screenshotAfterAfterClick1 = await afterCanvas.screenshot();
        expect(screenshotBeforeAfterClick1).not.toEqual(initialBeforeScreenshot);
        expect(screenshotAfterAfterClick1).not.toEqual(initialAfterScreenshot);

        await slider.fill('39');
        await plusButton.click();
        await expect(slider).toHaveValue('40');

        await plusButton.click();
        await expect(slider).toHaveValue('40');
    });
});