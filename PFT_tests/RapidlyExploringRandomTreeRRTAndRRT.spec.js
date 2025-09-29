const { test, expect } = require('@playwright/test');

const fileUrl = 'file://' + require('path').resolve(__dirname, '../pages/RapidlyExploringRandomTreeRRTAndRRT.html');

test.describe('Interactive RRT Visualization Tests', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(fileUrl);
    // Wait for the canvas to be present, indicating p5.js has likely initialized
    // await page.waitForSelector('#canvas-container canvas');
    await page.waitForTimeout(500);
  });

  test('Tree Type Button Group', async ({ page }) => {
    // 1. Assert: The tree type buttons "Random Tree", "RRT", and "RRT*" are visible.
    await expect(page.locator('#btn-rt')).toBeVisible();
    await expect(page.locator('#btn-rrt')).toBeVisible();
    await expect(page.locator('#btn-rrt-star')).toBeVisible();

    // 2. Assert: The "Random Tree" button has an active state by default, and the "exploration bias" slider is disabled.
    await expect(page.locator('#btn-rt')).toHaveClass(/active/);
    await expect(page.locator('#slider-bias')).toBeDisabled();

    // 3. Action: Click the "RRT" button.
    await page.locator('#btn-rrt').click();

    // 4. Assert: The "RRT" button becomes active, the "Random Tree" button becomes inactive, the "exploration bias" slider is enabled, and the canvas visualization resets to 1 node.
    await expect(page.locator('#btn-rrt')).toHaveClass(/active/);
    await expect(page.locator('#btn-rt')).not.toHaveClass(/active/);
    await expect(page.locator('#slider-bias')).toBeEnabled();
    await expect(page.locator('#status-text')).toContainText('1 node, goal not yet reached');

    // 5. Action: Click the "Random Tree" button again.
    await page.locator('#btn-rt').click();

    // 6. Assert: The "Random Tree" button is active again, the "exploration bias" slider is disabled, and the canvas resets.
    await expect(page.locator('#btn-rt')).toHaveClass(/active/);
    await expect(page.locator('#slider-bias')).toBeDisabled();
    await expect(page.locator('#status-text')).toContainText('1 node, goal not yet reached');
  });

  test('Obstacle Type Dropdown', async ({ page }) => {
    // 1. Assert: The "obstacle type" dropdown is visible.
    await expect(page.locator('#select-obstacle')).toBeVisible();

    // 2. Assert: The dropdown's selected value is "narrow passage". The canvas shows the narrow passage obstacle.
    await expect(page.locator('#select-obstacle')).toHaveValue('narrow-passage');

    // 3. Action: Select "empty" from the dropdown.
    await page.locator('#select-obstacle').selectOption('empty');

    // 4. Assert: The obstacles on the canvas disappear, and the status text resets to "1 node, goal not yet reached".
    await expect(page.locator('#status-text')).toContainText('1 node, goal not yet reached');

    // 5. Action: Select "random rects" from the dropdown.
    await page.locator('#select-obstacle').selectOption('random-rects');

    // 6. Assert: The canvas displays a new set of rectangular obstacles, and the simulation is reset.
    await expect(page.locator('#status-text')).toContainText('1 node, goal not yet reached');
  });

  test('"Add 100 Nodes" Button', async ({ page }) => {
    // 1. Assert: The "100" button under "number of nodes to add" is visible.
    await expect(page.locator('#btn-add-100')).toBeVisible();

    // 2. Assert: The status text initially shows "1 node...".
    await expect(page.locator('#status-text')).toContainText('1 node');

    // 3. Action: Click the "100" button.
    await page.locator('#btn-add-100').click();

    // 4. Assert: The node count in the status text increases (e.g., to "101 nodes..."), and numerous red dots appear on the canvas.
    await expect(page.locator('#status-text')).toContainText('101 nodes');

    // 5. Action: Click the "100" button again.
    await page.locator('#btn-add-100').click();

    // 6. Assert: The node count in the status text increases further (e.g., to "201 nodes..."), and more red dots appear on the canvas.
    await expect(page.locator('#status-text')).toContainText('201 nodes');
  });

  test('Exploration Bias Slider', async ({ page }) => {
    // 1. Assert: The "exploration bias" slider and its value label are visible.
    await expect(page.locator('#slider-bias')).toBeVisible();
    await expect(page.locator('#bias-value-label')).toBeVisible();

    // 2. Assert: The slider's value is 0 and its label displays "0".
    await expect(page.locator('#slider-bias')).toHaveValue('0');
    await expect(page.locator('#bias-value-label')).toHaveText('0');

    // 3. Action: Select "RRT" tree type to enable the slider, then drag the slider to the right (e.g., to 0.5).
    await page.locator('#btn-rrt').click();
    await page.locator('#slider-bias').fill('0.5');

    // 4. Assert: The value label updates in real-time to match the slider's new position (e.g., "0.5").
    await expect(page.locator('#bias-value-label')).toHaveText(/^0\.50*$/);

    // 5. Action: Drag the slider to its maximum value (1).
    await page.locator('#slider-bias').fill('1');

    // 6. Assert: The value label updates to "1". The simulation state is not reset.
    await expect(page.locator('#bias-value-label')).toHaveText('1');
    await expect(page.locator('#status-text')).toContainText('1 node');
  });

  test('Goal Radius Slider', async ({ page }) => {
    // 1. Assert: The "goal radius" slider and its value label are visible.
    await expect(page.locator('#slider-radius')).toBeVisible();
    await expect(page.locator('#radius-value-label')).toBeVisible();

    // 2. Assert: The slider's value is 1, its label displays "1", and the yellow goal circle on the canvas is small.
    await expect(page.locator('#slider-radius')).toHaveValue('1');
    await expect(page.locator('#radius-value-label')).toHaveText('1');

    // 3. Action: Drag the slider to the right (e.g., to 5).
    await page.locator('#slider-radius').fill('5');

    // 4. Assert: The value label updates to "5", and the yellow goal circle on the canvas becomes visibly larger.
    await expect(page.locator('#radius-value-label')).toHaveText('5');

    // 5. Action: Drag the slider to its minimum value (1).
    await page.locator('#slider-radius').fill('1');

    // 6. Assert: The value label updates back to "1", and the yellow goal circle shrinks to its original size.
    await expect(page.locator('#radius-value-label')).toHaveText('1');
  });

  test('Reset Button', async ({ page }) => {
    // 1. Assert: The reset button with a "+" icon is visible in the top-right corner of the canvas.
    await expect(page.locator('#btn-reset')).toBeVisible();

    // 2. Assert: The simulation is in its initial state with 1 node.
    await expect(page.locator('#status-text')).toContainText('1 node');

    // 3. Action: Click the "add 100" nodes button.
    await page.locator('#btn-add-100').click();

    // 4. Assert: The canvas is populated with new nodes and the status text shows "101 nodes...".
    await expect(page.locator('#status-text')).toContainText('101 nodes');

    // 5. Action: Click the reset button.
    await page.locator('#btn-reset').click();

    // 6. Assert: The canvas returns to its initial state, with only the start and goal locators visible, and the status text resets to "1 node...".
    await expect(page.locator('#status-text')).toContainText('1 node');
  });

  test('Draggable Goal Locator', async ({ page }) => {
    // 1. Assert: The goal locator (yellow circle with crosshair) is visible at its default position.
    const canvas = page.locator('#canvas-container canvas');
    await expect(canvas).toBeVisible();

    // 2. Assert: The status text indicates the simulation is in its initial state.
    await expect(page.locator('#status-text')).toContainText('1 node, goal not yet reached');

    // 3. Action: Click and drag the goal locator to a different position on the canvas.
    const canvasBox = await canvas.boundingBox();
    const startX = canvasBox.x + (450 / 500) * canvasBox.width;
    const startY = canvasBox.y + (450 / 500) * canvasBox.height;
    const endX = canvasBox.x + (250 / 500) * canvasBox.width;
    const endY = canvasBox.y + (250 / 500) * canvasBox.height;

    await page.mouse.move(startX, startY);
    await page.mouse.down();
    await page.mouse.move(endX, endY, { steps: 5 });
    await page.mouse.up();

    // 4. Assert: The yellow circle moves to the new cursor position, and the simulation resets (status text shows "1 node...").
    await expect(page.locator('#status-text')).toContainText('1 node, goal not yet reached');

    // 5. Action: Click the "add 100" nodes button.
    await page.locator('#btn-add-100').click();

    // 6. Assert: New nodes are generated on the canvas, demonstrating the simulation now runs with the new goal position.
    await expect(page.locator('#status-text')).toContainText('101 nodes');
  });

});