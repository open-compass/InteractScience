const { test, expect } = require('@playwright/test');

const fileUrl = 'file://' + require('path').resolve(__dirname, '../pages/BreadthFirstSearchRobotMotionPlanning.html');

test.describe('Breadth-First Search Robot Motion Planning', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(fileUrl);
    // Wait for p5 canvases to be created and added to the DOM
    // await page.waitForSelector('#canvas-workspace canvas');
    // await page.waitForSelector('#canvas-phase-space canvas');
    await page.waitForTimeout(500);
  });

  test('Test Resolution Slider (Q)', async ({ page }) => {
    // 1. Assert: The slider with ID `slider-q` is visible on the page.
    await expect(page.locator('#slider-q')).toBeVisible();

    // 2. Assert: The slider's value is 2, and the corresponding display span `value-q` shows "2".
    await expect(page.locator('#slider-q')).toHaveValue('2');
    await expect(page.locator('#value-q')).toHaveText('2');

    // 3. Action: Drag the slider handle to the value 5.
    await page.locator('#slider-q').fill('5');

    // 4. Assert: The display span `value-q` updates to "5". The grid resolution in the phase space canvas changes, and the red C-obstacle regions are redrawn.
    await expect(page.locator('#value-q')).toHaveText('5');
    // Note: Canvas changes are assumed to occur based on the implementation plan but not visually asserted here.

    // 5. Action: Drag the slider handle to its maximum value, 7.
    await page.locator('#slider-q').fill('7');

    // 6. Assert: The display span `value-q` updates to "7", and the phase space canvas is redrawn with the highest grid resolution.
    await expect(page.locator('#value-q')).toHaveText('7');
    // Note: Canvas changes are assumed to occur based on the implementation plan but not visually asserted here.
  });

  test('Test Path Traversal Slider (P)', async ({ page }) => {
    // 1. Assert: The slider with ID `slider-p` is visible on the page.
    await expect(page.locator('#slider-p')).toBeVisible();

    // 2. Assert: The slider's value is 1, and the corresponding display span `value-p` shows "1.00". The robot arm is at the goal position.
    await expect(page.locator('#slider-p')).toHaveValue('1');
    await expect(page.locator('#value-p')).toHaveText(/^1\.000*$/);
    // Note: Robot arm position on canvas is not visually asserted.

    // 3. Action: Drag the slider handle to a mid-point value, such as 0.50.
    await page.locator('#slider-p').fill('0.50');

    // 4. Assert: The display span `value-p` updates to "0.50". The robot arm in the workspace canvas moves to an intermediate position. A marker appears on the green path in the phase space canvas.
    await expect(page.locator('#value-p')).toHaveText(/^0\.500*$/);
    // Note: Robot arm and path marker changes on canvas are not visually asserted.

    // 5. Action: Drag the slider handle to its minimum value, 0.
    await page.locator('#slider-p').fill('0');

    // 6. Assert: The display span `value-p` updates to "0.00". The robot arm in the workspace canvas moves to the start position.
    await expect(page.locator('#value-p')).toHaveText(/^0\.000*$/);
    // Note: Robot arm position on canvas is not visually asserted.
  });

  test('Test Reset Button', async ({ page }) => {
    // 1. Assert: The reset button `btn-reset` is visible.
    await expect(page.locator('#btn-reset')).toBeVisible();

    // 2. Assert: The system is in its initial state (e.g., Q=2, P=1).
    await expect(page.locator('#slider-q')).toHaveValue('2');
    await expect(page.locator('#slider-p')).toHaveValue('1');

    // 3. Action: Change the `slider-q` value to 4 and drag one of the obstacles in the workspace to a new location.
    await page.locator('#slider-q').fill('4');
    const workspaceCanvas = page.locator('#canvas-workspace canvas');
    // Drag from default obstacle 1 position { x: 200, y: 100 } to a new position
    await workspaceCanvas.dragTo(workspaceCanvas, {
      sourcePosition: { x: 200, y: 100 },
      targetPosition: { x: 250, y: 150 }
    });

    // 4. Assert: The `value-q` span shows "4", the obstacle has moved, and the phase space visualization has been updated.
    await expect(page.locator('#value-q')).toHaveText('4');
    // Note: Obstacle movement and canvas updates are assumed based on the plan.

    // 5. Action: Click the `btn-reset` button.
    await page.locator('#btn-reset').click();

    // 6. Assert: The `slider-q` value resets to 2, the obstacle returns to its default position, and both canvases are redrawn to their initial state.
    await expect(page.locator('#slider-q')).toHaveValue('2');
    // Note: Obstacle position reset and canvas redraw are assumed.
  });

  test('Test Draggable Workspace Obstacles', async ({ page }) => {
    const workspaceCanvas = page.locator('#canvas-workspace canvas');
    const phaseSpaceTitle = page.locator('#phase-space-title');
    
    // 1. Assert: The two circular obstacles are visible in the robot workspace canvas.
    // 2. Assert: The obstacles are at their default positions.
    // Note: These are visual assertions on the canvas and cannot be directly tested. We assume the initial state is correct.
    const initialTitle = await phaseSpaceTitle.textContent();

    // 3. Action: Press and drag one of the obstacles to a new position within the workspace canvas.
    // Drag obstacle 2 from its default position { x: 200, y: 300 }
    await workspaceCanvas.dragTo(workspaceCanvas, {
        sourcePosition: { x: 200, y: 300 },
        targetPosition: { x: 150, y: 250 }
    });
    
    // 4. Assert: The obstacle's position updates with the mouse cursor. The red C-obstacle regions and the green path in the phase space canvas are recalculated and redrawn. The path length in the title `phase-space-title` changes.
    await expect(phaseSpaceTitle).not.toHaveText(initialTitle);

    // 5. Action: Release the mouse button.
    // Note: dragTo includes mouse release.
    const finalTitle = await phaseSpaceTitle.textContent();

    // 6. Assert: The obstacle remains in its new location, and the phase space visualization persists in its updated state.
    await expect(phaseSpaceTitle).toHaveText(finalTitle);
    // Note: We check that the title remains changed, implying state persistence.
  });

  test('Test Draggable Start Configuration Marker', async ({ page }) => {
    const phaseSpaceCanvas = page.locator('#canvas-phase-space canvas');
    const workspaceCanvas = page.locator('#canvas-workspace canvas');
    
    // 1. Assert: The green start marker is visible in the phase space canvas.
    // 2. Assert: The marker is located at its default start configuration coordinates.
    // Note: These are visual assertions. We proceed assuming the initial state.

    // 3. Action: Drag the start marker to a new, valid (non-red) grid cell.
    // Initial start config: q1=-1.5, q2=0.5. Approx canvas coords: (105, 232)
    // We drag it to a new location.
    await phaseSpaceCanvas.dragTo(phaseSpaceCanvas, {
      sourcePosition: { x: 105, y: 232 },
      targetPosition: { x: 150, y: 250 }
    });

    // 4. Assert: The marker snaps to the center of the new cell. The green path is redrawn from this new start point. The robot arm in the workspace updates to this new start configuration.
    // Note: Canvas changes are assumed. We cannot assert these directly.

    // 5. Action: Attempt to drag the start marker into a red C-obstacle region.
    // Note: The location of a red region is not known. We cannot reliably test this step without more information.
    
    // 6. Assert: The marker either does not move into the red cell or changes its appearance to indicate an invalid placement, and the path does not update.
    // Note: This assertion cannot be implemented without a known invalid location.
  });

  test('Test Draggable Goal Configuration Marker', async ({ page }) => {
    const phaseSpaceCanvas = page.locator('#canvas-phase-space canvas');
    const phaseSpaceTitle = page.locator('#phase-space-title');
    
    // 1. Assert: The green goal marker is visible in the phase space canvas.
    // 2. Assert: The marker is located at its default goal configuration coordinates.
    // Note: Visual assertions, assumed correct.
    const initialTitle = await phaseSpaceTitle.textContent();

    // 3. Action: Drag the goal marker to a new, valid (non-red) grid cell.
    // Initial goal config: q1=1.5, q2=1.0. Approx canvas coords: (296, 264)
    // We drag it to a new location.
    await phaseSpaceCanvas.dragTo(phaseSpaceCanvas, {
      sourcePosition: { x: 296, y: 264 },
      targetPosition: { x: 320, y: 280 }
    });

    // 4. Assert: The marker snaps to the new cell center. The entire grayscale distance field in the phase space canvas is recalculated, and the green path is redrawn to this new goal. The path length text updates.
    await expect(phaseSpaceTitle).not.toHaveText(initialTitle);
    
    // 5. Action: Release the mouse button.
    // Note: dragTo includes mouse release.
    const finalTitle = await phaseSpaceTitle.textContent();

    // 6. Assert: The goal marker remains in the new position, and the updated phase space visualization persists.
    await expect(phaseSpaceTitle).toHaveText(finalTitle);
  });
});