const { test, expect } = require('@playwright/test');
const path = require('path');

const fileUrl = 'file://' + path.resolve(__dirname, '../pages/DijkstrasAndASearchAlgorithmsForPathfindingWithObstacles.html');

test.beforeEach(async ({ page }) => {
  await page.goto(fileUrl);
  await page.waitForTimeout(500);
});

test.describe('Search Algorithm Radio Button Group', () => {
  test('Test Search Algorithm Radio Button Group', async ({ page }) => {
    // 1. Assert: The "search algorithm" radio button group is visible.
    await expect(page.locator('#radio-dijkstra')).toBeVisible();
    await expect(page.locator('#radio-a-star')).toBeVisible();

    // 2. Assert: The "Dijkstra" radio button (`radio-dijkstra`) is checked by default.
    await expect(page.locator('#radio-dijkstra')).toBeChecked();

    const slider = page.locator('#slider-step');
    const initialMax = await slider.getAttribute('max');

    // 3. Action: Click the "A*" radio button (`radio-a-star`).
    await page.locator('label[for="radio-a-star"]').click();

    // 4. Assert: The "A*" radio button is now checked and the canvas visualization has updated.
    await expect(page.locator('#radio-a-star')).toBeChecked();
    // The canvas update is confirmed by checking if the algorithm re-ran, which changes the slider's max steps.
    const newMaxAStar = await slider.getAttribute('max');
    expect(newMaxAStar).not.toBe(initialMax);

    // 5. Action: Click the "Dijkstra" radio button to switch back.
    await page.locator('label[for="radio-dijkstra"]').click();

    // 6. Assert: The "Dijkstra" radio button is checked again and the canvas visualization has updated.
    await expect(page.locator('#radio-dijkstra')).toBeChecked();
    const newMaxDijkstra = await slider.getAttribute('max');
    expect(newMaxDijkstra).toBe(initialMax); // Should return to the original step count
  });
});

test.describe('Algorithm Step Slider', () => {
  test('Test Algorithm Step Slider', async ({ page }) => {
    // 1. Assert: The algorithm step slider (`slider-step`) is visible.
    const slider = page.locator('#slider-step');
    await expect(slider).toBeVisible();

    // 2. Assert: The slider's default value is 1, and the step label (`label-step`) displays "+ 1".
    await expect(slider).toHaveAttribute('value', '1');
    await expect(page.locator('#label-step')).toHaveText('+ 1');

    // 3. Action: Drag the slider to a value approximately halfway to the maximum.
    const max = await slider.getAttribute('max');
    const midValue = String(Math.floor(parseInt(max, 10) / 2));
    await slider.fill(midValue);
    
    // 4. Assert: The step label's text updates to the new value, and the canvas shows more explored (blue) cells than the initial state.
    await expect(page.locator('#label-step')).toHaveText(`+ ${midValue}`);
    // Note: Direct canvas cell state assertion is not performed as per requirements.

    // 5. Action: Drag the slider to its maximum value.
    await slider.fill(max);
    
    // 6. Assert: The final path (a red line) is now visible on the canvas.
    await expect(page.locator('#label-step')).toHaveText(`+ ${max}`);
    // Note: Direct assertion of the red line is not performed. The test confirms the slider reaches the max value, which triggers the path rendering logic.
  });
});

test.describe('Joystick Controls', () => {
  test('Test Starting Point Joystick Control', async ({ page }) => {
    // 1. Assert: The starting point joystick (`joystick-start`) and its handle are visible.
    const joystick = page.locator('#joystick-start');
    const handle = page.locator('#handle-start');
    await expect(joystick).toBeVisible();
    await expect(handle).toBeVisible();

    // 2. Assert: The handle is at its default position (bottom-left area), and a corresponding green square is visible on the canvas.
    const initialStyle = await handle.getAttribute('style');
    expect(initialStyle).toContain('left:');
    expect(initialStyle).toContain('top:');
    // Note: Canvas assertion is not performed.

    // 3. Action: Drag the handle to a new position (e.g., center of the joystick area).
    await handle.dragTo(joystick);

    // 4. Assert: The handle's position updates, the green start square on the canvas moves, and the pathfinding visualization resets.
    const newStyle = await handle.getAttribute('style');
    expect(newStyle).not.toBe(initialStyle);
    await expect(page.locator('#slider-step')).toHaveAttribute('value', '1'); // Check for reset
    
    // 5. Action: Drag the handle to a boundary position (e.g., top-right corner of the joystick area).
    const joystickBox = await joystick.boundingBox();
    await handle.hover();
    await page.mouse.down();
    await page.mouse.move(joystickBox.x + joystickBox.width, joystickBox.y);
    await page.mouse.up();

    // 6. Assert: The handle is at the corner, and the green start square on the canvas has moved to the corresponding corner.
    const cornerStyle = await handle.getAttribute('style');
    expect(cornerStyle).toContain('left: 100%');
    expect(cornerStyle).toContain('top: 0%');
  });

  test('Test End Point Joystick Control', async ({ page }) => {
    // 1. Assert: The end point joystick (`joystick-end`) and its handle are visible.
    const joystick = page.locator('#joystick-end');
    const handle = page.locator('#handle-end');
    await expect(joystick).toBeVisible();
    await expect(handle).toBeVisible();
    
    // 2. Assert: The handle is at its default position (top-right area), and a corresponding green square is visible on the canvas.
    const initialStyle = await handle.getAttribute('style');
    expect(initialStyle).toContain('left:');
    expect(initialStyle).toContain('top:');
    // Note: Canvas assertion is not performed.

    // 3. Action: Drag the handle to a new position (e.g., center of the joystick area).
    await handle.dragTo(joystick);

    // 4. Assert: The handle's position updates, the green end square on the canvas moves, and the pathfinding visualization resets.
    const newStyle = await handle.getAttribute('style');
    expect(newStyle).not.toBe(initialStyle);
    await expect(page.locator('#slider-step')).toHaveAttribute('value', '1'); // Check for reset

    // 5. Action: Drag the handle to a boundary position (e.g., bottom-left corner of the joystick area).
    const joystickBox = await joystick.boundingBox();
    await handle.hover();
    await page.mouse.down();
    await page.mouse.move(joystickBox.x, joystickBox.y + joystickBox.height);
    await page.mouse.up();

    // 6. Assert: The handle is at the corner, and the green end square on the canvas has moved to the corresponding corner.
    const cornerStyle = await handle.getAttribute('style');
    expect(cornerStyle).toContain('left: 0%');
    expect(cornerStyle).toContain('top: 100%');
  });
});

test.describe('Obstacles Dropdown Selector', () => {
  test('Test Obstacles Dropdown Selector', async ({ page }) => {
    // 1. Assert: The obstacles dropdown (`select-obstacles`) is visible.
    const selector = page.locator('#select-obstacles');
    await expect(selector).toBeVisible();

    // 2. Assert: The default selected option is "1 square". The canvas displays a single black square obstacle.
    await expect(selector).toHaveValue('1-square');
    // Note: Canvas assertion is not performed directly.
    const initialMax = await page.locator('#slider-step').getAttribute('max');

    // 3. Action: Select the "2 squares" option from the dropdown.
    await selector.selectOption('2-squares');

    // 4. Assert: The dropdown now shows "2 squares" as selected, and the canvas updates to show two black square obstacles.
    await expect(selector).toHaveValue('2-squares');
    const maxAfter2Squares = await page.locator('#slider-step').getAttribute('max');
    expect(maxAfter2Squares).not.toBe(initialMax); // Assert algorithm re-ran

    // 5. Action: Select the "L-shaped wall" option from the dropdown.
    await selector.selectOption('l-shaped-wall');

    // 6. Assert: The dropdown now shows "L-shaped wall" as selected, and the canvas updates to show a large L-shaped obstacle.
    await expect(selector).toHaveValue('l-shaped-wall');
    const maxAfterLWall = await page.locator('#slider-step').getAttribute('max');
    expect(maxAfterLWall).not.toBe(maxAfter2Squares); // Assert algorithm re-ran
  });
});