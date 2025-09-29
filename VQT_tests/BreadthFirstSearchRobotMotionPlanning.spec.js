const { test, expect } = require('@playwright/test');
const path = require('path');

const fileUrl = 'file://' + path.resolve(__dirname, '../pages/BreadthFirstSearchRobotMotionPlanning.html');

test.describe('Breadth-First Search Robot Motion Planning', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(fileUrl);
  });

  test('Default resolution with a straight horizontal path in phase space', async ({ page }) => {
    // Action: Drag the start configuration marker
    const phaseSpaceCanvas = await page.locator('#canvas-phase-space');
    let bb = await phaseSpaceCanvas.boundingBox();
    // Initial position from plan: q1=-1.5, q2=0.5 => x≈105, y≈232
    await page.mouse.move(bb.x + 105, bb.y + 232);
    await page.mouse.down();
    // Target position: vertical center (y=200), 25% width (x=100)
    await page.mouse.move(bb.x + 100, bb.y + 200, { steps: 10 });
    await page.mouse.up();

    // Action: Drag the goal configuration marker
    bb = await phaseSpaceCanvas.boundingBox(); // re-fetch bounding box just in case
    // Initial position from plan: q1=1.5, q2=1.0 => x≈296, y≈264
    await page.mouse.move(bb.x + 296, bb.y + 264);
    await page.mouse.down();
    // Target position: vertical center (y=200), 75% width (x=300)
    await page.mouse.move(bb.x + 300, bb.y + 200, { steps: 10 });
    await page.mouse.up();

    await page.screenshot({ path: './snapshots/BreadthFirstSearchRobotMotionPlanning-1.png', fullPage: true });
  });

  test('Pathfinding around a C-space obstacle by moving the goal configuration', async ({ page }) => {
    const phaseSpaceCanvas = await page.locator('#canvas-phase-space');
    let bb = await phaseSpaceCanvas.boundingBox();
    // Action: Drag the start configuration marker
    // Initial position: x≈105, y≈232
    await page.mouse.move(bb.x + 105, bb.y + 232);
    await page.mouse.down();
    // Target position: vertical center (y=200), 25% width (x=100)
    await page.mouse.move(bb.x + 100, bb.y + 200, { steps: 10 });
    await page.mouse.up();

    // Action: Drag the goal configuration marker
    bb = await phaseSpaceCanvas.boundingBox();
    // Initial position: x≈296, y≈264
    await page.mouse.move(bb.x + 296, bb.y + 264);
    await page.mouse.down();
    // Target position: 80% from left (x=320), 35% from top (y=140)
    await page.mouse.move(bb.x + 320, bb.y + 140, { steps: 10 });
    await page.mouse.up();

    await page.screenshot({ path: './snapshots/BreadthFirstSearchRobotMotionPlanning-2.png', fullPage: true });
  });

  test('High-resolution path with relocated obstacles and an intermediate robot position', async ({ page }) => {
    const workspaceCanvas = await page.locator('#canvas-workspace');
    let workspaceBB = await workspaceCanvas.boundingBox();
    // Action: Drag the top obstacle
    // Initial position from plan: x=200, y=100
    await page.mouse.move(workspaceBB.x + 200, workspaceBB.y + 100);
    await page.mouse.down();
    // Target position: 25% width (x=100), same height
    await page.mouse.move(workspaceBB.x + 100, workspaceBB.y + 100, { steps: 10 });
    await page.mouse.up();

    // Action: Drag the bottom obstacle
    workspaceBB = await workspaceCanvas.boundingBox();
    // Initial position from plan: x=200, y=300
    await page.mouse.move(workspaceBB.x + 200, workspaceBB.y + 300);
    await page.mouse.down();
    // Target position: 75% width (x=300), same height
    await page.mouse.move(workspaceBB.x + 300, workspaceBB.y + 300, { steps: 10 });
    await page.mouse.up();

    const phaseSpaceCanvas = await page.locator('#canvas-phase-space');
    let phaseBB = await phaseSpaceCanvas.boundingBox();
    // Action: Drag the start configuration marker to the lower-left quadrant
    // Initial position: x≈105, y≈232
    await page.mouse.move(phaseBB.x + 105, phaseBB.y + 232);
    await page.mouse.down();
    // Target position: lower-left, e.g., (x=50, y=350)
    await page.mouse.move(phaseBB.x + 50, phaseBB.y + 350, { steps: 10 });
    await page.mouse.up();

    // Action: Drag the goal configuration marker to the upper-right quadrant
    phaseBB = await phaseSpaceCanvas.boundingBox();
    // Initial position: x≈296, y≈264
    await page.mouse.move(phaseBB.x + 296, phaseBB.y + 264);
    await page.mouse.down();
    // Target position: upper-right, e.g., (x=350, y=50)
    await page.mouse.move(phaseBB.x + 350, phaseBB.y + 50, { steps: 10 });
    await page.mouse.up();

    // Action: Set the "Q" slider to max
    await page.locator('#slider-q').fill('7');

    // Action: Set the "P" slider
    await page.locator('#slider-p').fill('0.52');

    await page.screenshot({ path: './snapshots/BreadthFirstSearchRobotMotionPlanning-3.png', fullPage: true });
  });

  test('Relocated start/goal configurations with a coarse grid and completed path', async ({ page }) => {
    const workspaceCanvas = await page.locator('#canvas-workspace');
    let workspaceBB = await workspaceCanvas.boundingBox();
    // Action: Drag the top obstacle
    // Initial position: x=200, y=100
    await page.mouse.move(workspaceBB.x + 200, workspaceBB.y + 100);
    await page.mouse.down();
    // Target position: 25% width (x=100), same height
    await page.mouse.move(workspaceBB.x + 100, workspaceBB.y + 100, { steps: 10 });
    await page.mouse.up();

    // Action: Drag the bottom obstacle
    workspaceBB = await workspaceCanvas.boundingBox();
    // Initial position: x=200, y=300
    await page.mouse.move(workspaceBB.x + 200, workspaceBB.y + 300);
    await page.mouse.down();
    // Target position: 75% width (x=300), same height
    await page.mouse.move(workspaceBB.x + 300, workspaceBB.y + 300, { steps: 10 });
    await page.mouse.up();
    
    // Action: Set the "Q" slider
    await page.locator('#slider-q').fill('6');

    const phaseSpaceCanvas = await page.locator('#canvas-phase-space');
    let phaseBB = await phaseSpaceCanvas.boundingBox();
    // Action: Drag the start configuration marker
    // Initial position: x≈105, y≈232
    await page.mouse.move(phaseBB.x + 105, phaseBB.y + 232);
    await page.mouse.down();
    // Target position: lower-left, e.g., (x=80, y=320)
    await page.mouse.move(phaseBB.x + 80, phaseBB.y + 320, { steps: 10 });
    await page.mouse.up();

    // Action: Drag the goal configuration marker
    phaseBB = await phaseSpaceCanvas.boundingBox();
    // Initial position: x≈296, y≈264
    await page.mouse.move(phaseBB.x + 296, phaseBB.y + 264);
    await page.mouse.down();
    // Target position: 65% width (x=260), upper part (y=80)
    await page.mouse.move(phaseBB.x + 260, phaseBB.y + 80, { steps: 10 });
    await page.mouse.up();

    // Action: Set the "P" slider to max
    await page.locator('#slider-p').fill('1');

    await page.screenshot({ path: './snapshots/BreadthFirstSearchRobotMotionPlanning-4.png', fullPage: true });
  });
});