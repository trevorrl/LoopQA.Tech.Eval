import { test, expect } from '@playwright/test';
import { KanbanBoardLocators, authenticate } from './locators.po';
import fs from 'fs';
import path from 'path';

const testData = JSON.parse(fs.readFileSync(path.join(__dirname, 'test-data.json'), 'utf8'));

// Iterate over each project and task
for (const [projectName, tasks] of Object.entries(testData) as [string, Record<string, any>][]) {
  for (const [_, task] of Object.entries(tasks) as [string, { name: string; column: string; tags: string[] }][]) {
    test(`${projectName} task validation - ${task.name}`, async ({ page }) => {
      await authenticate(page);
      const kanbanBoardPage = new KanbanBoardLocators(page);
      // Select the project
      switch (projectName) {
        case 'web-app':
          await kanbanBoardPage.webAppProject.click();
          break;
        case 'mobile-app':
          await kanbanBoardPage.mobileAppProject.click();
          break;
      }
      // Validate the task is in the correct column
      switch (task.column) {
        case 'To Do':
          await expect(kanbanBoardPage.toDoColumn.getByText(task.name)).toBeVisible();
          break;
        case 'In Progress':
          await expect(kanbanBoardPage.inProgressColumn.getByText(task.name)).toBeVisible();
          break;
        case 'Done':
          await expect(kanbanBoardPage.doneColumn.getByText(task.name)).toBeVisible();
          break;
      }
      // Validate the task tags
      const tagLocators = kanbanBoardPage.getTaskCardTags(task.name);
      await expect(tagLocators).toHaveCount(task.tags.length);
      for (const expectedTag of task.tags) {
        await expect(tagLocators.getByText(expectedTag)).toBeVisible();
      }
    });
  }
}
