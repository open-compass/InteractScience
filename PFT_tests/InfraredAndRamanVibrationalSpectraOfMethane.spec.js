const { test, expect } = require('@playwright/test');

const fileUrl = 'file://' + require('path').resolve(__dirname, '../pages/InfraredAndRamanVibrationalSpectraOfMethane.html');

test.describe('Interactive Methane Vibrational Spectra', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto(fileUrl);
        // Wait for any initial rendering to complete, especially for 3D canvas
        // await page.locator('#demo-container').waitFor();
        await page.waitForTimeout(500);
    });

    test('Vibration Mode Dropdown Selection', async ({ page }) => {
        // 1. Assert: The dropdown `select-vibration-mode` is visible on the page.
        await expect(page.locator('#select-vibration-mode')).toBeVisible();

        // 2. Assert: The dropdown's selected value is "symmetric-stretch", and the description labels `label-left` and `label-right` show blue text.
        await expect(page.locator('#select-vibration-mode')).toHaveValue('symmetric-stretch');
        const labelLeft = page.locator('#label-left');
        const labelRight = page.locator('#label-right');
        await expect(labelLeft).toHaveCSS('color', 'rgb(0, 0, 255)');
        await expect(labelRight).toHaveCSS('color', 'rgb(0, 0, 255)');

        // 3. Action: Select the "stretch (triply degenerate)" option from the dropdown.
        await page.locator('#select-vibration-mode').selectOption({ value: 'asymmetric-stretch' });

        // 4. Assert: The text and color of `label-left` and `label-right` update to red.
        await expect(labelLeft).toHaveText('stretching F₂ IR active 3019 cm⁻¹');
        await expect(labelRight).toHaveText('change in the molecular dipole moment');
        await expect(labelLeft).toHaveCSS('color', 'rgb(255, 0, 0)');
        await expect(labelRight).toHaveCSS('color', 'rgb(255, 0, 0)');

        // 5. Action: Select the "IR spectrum" option from the dropdown.
        await page.locator('#select-vibration-mode').selectOption({ value: 'ir-spectrum' });

        // 6. Assert: The `three-js-canvas-container` is hidden, the `plotly-chart-container` is visible, and the animation buttons (`btn-play`, `btn-pause`, `btn-reset`) are disabled.
        await expect(page.locator('#three-js-canvas-container')).toBeHidden();
        await expect(page.locator('#plotly-chart-container')).toBeVisible();
        await expect(page.locator('#btn-play')).toBeDisabled();
        await expect(page.locator('#btn-pause')).toBeDisabled();
        await expect(page.locator('#btn-reset')).toBeDisabled();
    });

    test('Animation Play Button', async ({ page }) => {
        // 1. Assert: The play button `btn-play` is visible and enabled.
        await expect(page.locator('#btn-play')).toBeVisible();
        await expect(page.locator('#btn-play')).toBeEnabled();

        // 2. Assert: The 3D molecule in the `three-js-canvas-container` is in its static, initial state.
        const canvasContainer = page.locator('#three-js-canvas-container');
        const initialScreenshot = await canvasContainer.screenshot();

        // 3. Action: Click the `btn-play` button.
        await page.locator('#btn-play').click();
        
        // 4. Assert: The molecule visualization begins to animate, showing movement different from its initial state. The button's visual state changes (e.g., appears pressed or disabled).
        await page.waitForTimeout(100); // Wait for animation frame
        await expect(canvasContainer).not.toHaveScreenshot(initialScreenshot);
        // Assuming "pressed or disabled" means the button becomes disabled during play
        // This is a common pattern to prevent multiple clicks.
        await expect(page.locator('#btn-play')).toBeDisabled();

        // 5. Action: After the animation has started, click the `btn-pause` button.
        await page.locator('#btn-pause').click();
        
        // 6. Assert: The animation stops, and the play button `btn-play` becomes interactive again.
        await expect(page.locator('#btn-play')).toBeEnabled();
    });

    test('Animation Pause Button', async ({ page }) => {
        // 1. Assert: The pause button `btn-pause` is visible and enabled.
        await expect(page.locator('#btn-pause')).toBeVisible();
        await expect(page.locator('#btn-pause')).toBeEnabled();
        
        // 2. Assert: The molecule is initially static.
        const canvasContainer = page.locator('#three-js-canvas-container');
        const initialScreenshot = await canvasContainer.screenshot();

        // 3. Action: Click `btn-play` to start the animation, wait a moment, then click `btn-pause`.
        await page.locator('#btn-play').click();
        await page.waitForTimeout(100); // Let animation run
        await page.locator('#btn-pause').click();

        // 4. Assert: The animation stops, and the molecule is frozen in a non-initial position.
        const pausedScreenshot = await canvasContainer.screenshot();
        await expect(canvasContainer).not.toHaveScreenshot(initialScreenshot);
        await page.waitForTimeout(100); // Wait to ensure it's not still moving
        await expect(canvasContainer).toHaveScreenshot(pausedScreenshot);

        // 5. Action: Click `btn-play` again.
        await page.locator('#btn-play').click();

        // 6. Assert: The animation resumes from the paused position, and the molecule's visual state changes again.
        await page.waitForTimeout(100); // Let animation run again
        await expect(canvasContainer).not.toHaveScreenshot(pausedScreenshot);
    });

    test('Animation Reset Button', async ({ page }) => {
        // 1. Assert: The reset button `btn-reset` is visible and enabled.
        await expect(page.locator('#btn-reset')).toBeVisible();
        await expect(page.locator('#btn-reset')).toBeEnabled();

        // 2. Assert: The molecule is in its initial, resting state.
        const canvasContainer = page.locator('#three-js-canvas-container');
        const initialScreenshot = await canvasContainer.screenshot();

        // 3. Action: Click `btn-play`, let the animation run, and then click `btn-pause` to stop it in a visibly different state.
        await page.locator('#btn-play').click();
        await page.waitForTimeout(100); // Let animation run
        await page.locator('#btn-pause').click();

        // 4. Assert: The molecule is frozen in a non-resting state (e.g., bonds are stretched).
        await expect(canvasContainer).not.toHaveScreenshot(initialScreenshot);

        // 5. Action: Click the `btn-reset` button.
        await page.locator('#btn-reset').click();

        // 6. Assert: The molecule visualization returns to its initial, resting state.
        await expect(canvasContainer).toHaveScreenshot(initialScreenshot);
    });

});