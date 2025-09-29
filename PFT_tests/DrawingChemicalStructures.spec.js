const { test, expect } = require('@playwright/test');
const path = require('path');

const fileUrl = 'file://' + path.resolve(__dirname, '../pages/DrawingChemicalStructures.html');

// Helper function to get the current state of the canvas from the global sceneObjects array
async function getSceneObjects(page) {
    await page.waitForFunction(() => window.sceneObjects !== undefined);
    return page.evaluate(() => window.sceneObjects);
}

test.beforeEach(async ({ page }) => {
    await page.goto(fileUrl);
    await page.waitForTimeout(500);
});

test.describe('Drawing Chemical Structures', () => {

    test('Test Toolbar Element Selection and Placement', async ({ page }) => {
        const hButton = page.locator('#btn-element-H');
        const cButton = page.locator('#btn-element-C');
        const nButton = page.locator('#btn-element-N');
        const canvas = page.locator('#drawing-canvas');

        await test.step('Assert H button is visible and not selected', async () => {
            await expect(hButton).toBeVisible();
            await expect(hButton).not.toHaveClass(/selected/);
        });

        await test.step('Click H button and place it on canvas', async () => {
            await hButton.click();
            await expect(hButton).toHaveClass(/selected/);
            await canvas.click({ position: { x: 100, y: 100 } });
        });

        await test.step('Assert H symbol appears and button is deselected', async () => {
            const scene = await getSceneObjects(page);
            expect(scene).toHaveLength(1);
            expect(scene[0]).toMatchObject({ type: 'atom', value: 'H' });
            await expect(hButton).not.toHaveClass(/selected/);
        });

        await test.step('Click C then N button', async () => {
            await cButton.click();
            await nButton.click();
        });

        await test.step('Assert C is deselected and N is selected', async () => {
            await expect(cButton).not.toHaveClass(/selected/);
            await expect(nButton).toHaveClass(/selected/);
        });
    });

    test('Test Structure Selection Control', async ({ page }) => {
        const structureSelect = page.locator('#select-structure');

        await test.step('Assert structure selector is visible with default selection', async () => {
            await expect(structureSelect).toBeVisible();
            await expect(structureSelect).toHaveValue('bond');
        });

        await test.step('Select Water', async () => {
            await structureSelect.selectOption({ label: 'Water' });
            await expect(structureSelect).toHaveValue('water');
        });

        await test.step('Select Isopropylamine', async () => {
            await structureSelect.selectOption({ label: 'Isopropylamine' });
            await expect(structureSelect).toHaveValue('isopropylamine');
        });
    });

    test('Test Add Predefined Structure Button', async ({ page }) => {
        const addButton = page.locator('#btn-add');
        const structureSelect = page.locator('#select-structure');

        await test.step('Assert add button is visible and canvas is empty', async () => {
            await expect(addButton).toBeVisible();
            const scene = await getSceneObjects(page);
            expect(scene).toHaveLength(0);
        });

        await test.step('Select Water and click add', async () => {
            await structureSelect.selectOption({ label: 'Water' });
            await addButton.click();
        });

        await test.step('Assert a new structure appears on the canvas', async () => {
            const scene = await getSceneObjects(page);
            expect(scene).toHaveLength(1);
            expect(scene[0]).toMatchObject({ type: 'structure', value: 'water' });
        });

        await test.step('Click add button again', async () => {
            await addButton.click();
        });

        await test.step('Assert a second, distinct structure appears', async () => {
            const scene = await getSceneObjects(page);
            expect(scene).toHaveLength(2);
        });
    });

    test('Test Undo Button Functionality', async ({ page }) => {
        const undoButton = page.locator('#btn-undo');
        const addButton = page.locator('#btn-add');
        const structureSelect = page.locator('#select-structure');
        const hButton = page.locator('#btn-element-H');
        const canvas = page.locator('#drawing-canvas');

        await test.step('Assert undo button is visible and canvas is empty', async () => {
            await expect(undoButton).toBeVisible();
            const scene = await getSceneObjects(page);
            expect(scene).toHaveLength(0);
        });

        await test.step('Add a Water structure and an H element', async () => {
            await structureSelect.selectOption({ label: 'Water' });
            await addButton.click();
            await hButton.click();
            await canvas.click({ position: { x: 200, y: 200 } });
        });

        await test.step('Assert both items are on the canvas', async () => {
            const scene = await getSceneObjects(page);
            expect(scene).toHaveLength(2);
            expect(scene[0].value).toBe('water');
            expect(scene[1].value).toBe('H');
        });

        await test.step('Click the undo button', async () => {
            await undoButton.click();
        });

        await test.step('Assert the H element is removed', async () => {
            const scene = await getSceneObjects(page);
            expect(scene).toHaveLength(1);
            expect(scene[0].value).toBe('water');
        });
    });

    test('Test Canvas Object Translation and Rotation', async ({ page }) => {
        const canvas = page.locator('#drawing-canvas');
        const structureSelect = page.locator('#select-structure');
        const addButton = page.locator('#btn-add');

        await test.step('Assert canvas is visible', async () => {
            await expect(canvas).toBeVisible();
        });

        await test.step('Add a Water structure to the canvas', async () => {
            await structureSelect.selectOption({ label: 'Water' });
            await addButton.click();
            const scene = await getSceneObjects(page);
            expect(scene).toHaveLength(1);
        });
        
        const initialScene = await getSceneObjects(page);
        const initialPosition = { x: initialScene[0].x, y: initialScene[0].y };
        const initialRotation = initialScene[0].rotation;

        await test.step('Translate the object', async () => {
            // Drag from a point far from the object's center to trigger translation
            await page.mouse.move(initialPosition.x + 50, initialPosition.y + 50);
            await page.mouse.down();
            await page.mouse.move(initialPosition.x + 150, initialPosition.y + 100);
            await page.mouse.up();
        });
        
        await test.step('Assert position is updated', async () => {
            const translatedScene = await getSceneObjects(page);
            const newPosition = { x: translatedScene[0].x, y: translatedScene[0].y };
            expect(newPosition.x).not.toBe(initialPosition.x);
            expect(newPosition.y).not.toBe(initialPosition.y);
            expect(translatedScene[0].rotation).toBe(initialRotation);
        });

        const translatedPosition = { x: (await getSceneObjects(page))[0].x, y: (await getSceneObjects(page))[0].y };

        await test.step('Rotate the object', async () => {
            // Drag from a point near the object's center to trigger rotation
            await page.mouse.move(translatedPosition.x + 10, translatedPosition.y);
            await page.mouse.down();
            await page.mouse.move(translatedPosition.x, translatedPosition.y + 10, { steps: 5 });
            await page.mouse.up();
        });
        
        await test.step('Assert rotation is updated', async () => {
            const rotatedScene = await getSceneObjects(page);
            const finalPosition = { x: rotatedScene[0].x, y: rotatedScene[0].y };
            const finalRotation = rotatedScene[0].rotation;
            // Position should not change during rotation
            expect(finalPosition.x).toBe(translatedPosition.x);
            expect(finalPosition.y).toBe(translatedPosition.y);
            // Rotation should change
            expect(finalRotation).not.toBe(initialRotation);
        });
    });
});