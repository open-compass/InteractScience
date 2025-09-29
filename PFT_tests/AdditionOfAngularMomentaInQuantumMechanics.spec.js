const { test, expect } = require('@playwright/test');

const fileUrl = 'file://' + require('path').resolve(__dirname, '../pages/AdditionOfAngularMomentaInQuantumMechanics.html');

test.beforeEach(async ({ page }) => {
    await page.goto(fileUrl);
    // Wait for canvas to be potentially ready, though not strictly required by prompt
    // await page.waitForSelector('#main-canvas');
    await page.waitForTimeout(500);
});

test('j₁ Selector Button Group', async ({ page }) => {
    const j1Selector = page.locator('#j1-selector');
    const m1Selector = page.locator('#m1-selector');
    const canvas = page.locator('#main-canvas');

    await expect(j1Selector).toBeVisible();
    await expect(j1Selector.getByRole('button', { name: '3/2' })).toHaveClass(/selected/);

    const canvasBeforeClick1 = await canvas.screenshot();
    await j1Selector.getByRole('button', { name: '1' }).click();

    await expect(m1Selector.getByRole('button', { name: '-1' })).toBeVisible();
    await expect(m1Selector.getByRole('button', { name: '0' })).toBeVisible();
    await expect(m1Selector.getByRole('button', { name: '1' })).toBeVisible();
    await expect(m1Selector.locator('button')).toHaveCount(3);
    await expect(canvas).not.toHaveScreenshot(canvasBeforeClick1);

    const canvasBeforeClick2 = await canvas.screenshot();
    await j1Selector.getByRole('button', { name: '2' }).click();

    await expect(m1Selector.getByRole('button', { name: '-2' })).toBeVisible();
    await expect(m1Selector.getByRole('button', { name: '-1' })).toBeVisible();
    await expect(m1Selector.getByRole('button', { name: '0' })).toBeVisible();
    await expect(m1Selector.getByRole('button', { name: '1' })).toBeVisible();
    await expect(m1Selector.getByRole('button', { name: '2' })).toBeVisible();
    await expect(m1Selector.locator('button')).toHaveCount(5);
    await expect(canvas).not.toHaveScreenshot(canvasBeforeClick2);
});

test('m₁ Selector Button Group', async ({ page }) => {
    const m1Selector = page.locator('#m1-selector');
    const canvas = page.locator('#main-canvas');

    await expect(m1Selector).toBeVisible();
    await expect(m1Selector.getByRole('button', { name: '1/2' })).toHaveClass(/selected/);

    const canvasBeforeClick1 = await canvas.screenshot();
    await m1Selector.getByRole('button', { name: '-1/2' }).click();
    await expect(m1Selector.getByRole('button', { name: '-1/2' })).toHaveClass(/selected/);
    await expect(canvas).not.toHaveScreenshot(canvasBeforeClick1);

    const canvasBeforeClick2 = await canvas.screenshot();
    await m1Selector.getByRole('button', { name: '3/2' }).click();
    await expect(m1Selector.getByRole('button', { name: '3/2' })).toHaveClass(/selected/);
    await expect(canvas).not.toHaveScreenshot(canvasBeforeClick2);
});

test('j₂ Selector Button Group', async ({ page }) => {
    const j2Selector = page.locator('#j2-selector');
    const m2Selector = page.locator('#m2-selector');
    const canvas = page.locator('#main-canvas');

    await expect(j2Selector).toBeVisible();
    await expect(j2Selector.getByRole('button', { name: '1' })).toHaveClass(/selected/);

    const canvasBeforeClick1 = await canvas.screenshot();
    await j2Selector.getByRole('button', { name: '1/2' }).click();

    await expect(m2Selector.getByRole('button', { name: '-1/2' })).toBeVisible();
    await expect(m2Selector.getByRole('button', { name: '1/2' })).toBeVisible();
    await expect(m2Selector.locator('button')).toHaveCount(2);
    await expect(canvas).not.toHaveScreenshot(canvasBeforeClick1);

    const canvasBeforeClick2 = await canvas.screenshot();
    await j2Selector.getByRole('button', { name: '2' }).click();

    await expect(m2Selector.getByRole('button', { name: '-2' })).toBeVisible();
    await expect(m2Selector.getByRole('button', { name: '-1' })).toBeVisible();
    await expect(m2Selector.getByRole('button', { name: '0' })).toBeVisible();
    await expect(m2Selector.getByRole('button', { name: '1' })).toBeVisible();
    await expect(m2Selector.getByRole('button', { name: '2' })).toBeVisible();
    await expect(m2Selector.locator('button')).toHaveCount(5);
    await expect(canvas).not.toHaveScreenshot(canvasBeforeClick2);
});

test('m₂ Selector Button Group', async ({ page }) => {
    const m2Selector = page.locator('#m2-selector');
    const canvas = page.locator('#main-canvas');

    await expect(m2Selector).toBeVisible();
    await expect(m2Selector.getByRole('button', { name: '0' })).toHaveClass(/selected/);

    const canvasBeforeClick1 = await canvas.screenshot();
    await m2Selector.getByRole('button', { name: '1' }).click();
    await expect(m2Selector.getByRole('button', { name: '1' })).toHaveClass(/selected/);
    await expect(canvas).not.toHaveScreenshot(canvasBeforeClick1);

    const canvasBeforeClick2 = await canvas.screenshot();
    await m2Selector.getByRole('button', { name: '-1' }).click();
    await expect(m2Selector.getByRole('button', { name: '-1' })).toHaveClass(/selected/);
    await expect(canvas).not.toHaveScreenshot(canvasBeforeClick2);
});

test('j Selector Button Group', async ({ page }) => {
    const jSelector = page.locator('#j-selector');
    const canvas = page.locator('#main-canvas');

    await expect(jSelector).toBeVisible();
    await expect(jSelector.getByRole('button', { name: '5/2' })).toHaveClass(/selected/);

    const canvasBeforeClick1 = await canvas.screenshot();
    await jSelector.getByRole('button', { name: '3/2' }).click();
    await expect(jSelector.getByRole('button', { name: '3/2' })).toHaveClass(/selected/);
    await expect(canvas).not.toHaveScreenshot(canvasBeforeClick1);

    const canvasBeforeClick2 = await canvas.screenshot();
    await jSelector.getByRole('button', { name: '1/2' }).click();
    await expect(jSelector.getByRole('button', { name: '1/2' })).toHaveClass(/selected/);
    await expect(canvas).not.toHaveScreenshot(canvasBeforeClick2);
});

test('Play/Pause Animation Button', async ({ page }) => {
    const playPauseButton = page.locator('#btn-play-pause');
    const canvas = page.locator('#main-canvas');

    await expect(playPauseButton).toBeVisible();
    await expect(playPauseButton).toHaveText('▶');
    
    const staticCanvas = await canvas.screenshot();
    await page.waitForTimeout(200); // Check for movement while paused
    await expect(canvas).toHaveScreenshot(staticCanvas);

    await playPauseButton.click();
    await expect(playPauseButton).toHaveText('❚❚');
    
    const animatingCanvas = await canvas.screenshot();
    await page.waitForTimeout(200); // Allow time for animation frame
    await expect(canvas).not.toHaveScreenshot(animatingCanvas);

    await playPauseButton.click();
    await expect(playPauseButton).toHaveText('▶');

    const pausedCanvas = await canvas.screenshot();
    await page.waitForTimeout(200); // Check for movement while paused again
    await expect(canvas).toHaveScreenshot(pausedCanvas);
});

test('Reset Animation Button', async ({ page }) => {
    const resetButton = page.locator('#btn-reset');
    const playPauseButton = page.locator('#btn-play-pause');
    const canvas = page.locator('#main-canvas');

    await expect(resetButton).toBeVisible();
    await expect(resetButton).toHaveText('|◀');

    const initialCanvasState = await canvas.screenshot();
    await playPauseButton.click();
    await page.waitForTimeout(200); // Let animation run
    await resetButton.click();

    await expect(playPauseButton).toHaveText('▶');
    await expect(canvas).toHaveScreenshot(initialCanvasState);
    
    await page.locator('#j1-selector').getByRole('button', { name: '1' }).click();
    const newInitialCanvasState = await canvas.screenshot();
    
    await playPauseButton.click();
    await page.waitForTimeout(200); // Let animation run
    await resetButton.click();

    await expect(canvas).toHaveScreenshot(newInitialCanvasState);
});