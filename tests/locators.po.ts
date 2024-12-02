import { Locator, Page } from '@playwright/test';

export class LoginPageLocators {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator('input[id="username"]');
    this.passwordInput = page.locator('input[id="password"]');
    this.loginButton = page.locator('button[type="submit"]');
  }
}

export class UserData {
  readonly username: string;
  readonly password: string;

  constructor() {
    this.username = "admin";
    this.password = "password123";
  }
}

export class KanbanBoardLocators {
  readonly page: Page;
  readonly header: Locator;
  readonly leftColumnNav: Locator;
  readonly webAppProject: Locator;
  readonly mobileAppProject: Locator;
  readonly marketingCampaignProject: Locator;
  readonly mainTaskTable: Locator;
  readonly toDoColumn: Locator;
  readonly inProgressColumn: Locator;
  readonly reviewColumn: Locator;
  readonly doneColumn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.header = page.locator('header h1');
    this.leftColumnNav = page.locator('nav');
    this.webAppProject = this.leftColumnNav.locator('button').filter({ hasText: 'Web Application' });
    this.mobileAppProject = this.leftColumnNav.locator('button').filter({ hasText: 'Mobile Application' });
    this.marketingCampaignProject = this.leftColumnNav.locator('button').filter({ hasText: 'Marketing Campaign' });
    this.mainTaskTable = page.locator('main div div');
    this.toDoColumn = this.mainTaskTable.locator('div').filter({ hasText: 'To Do' });
    this.inProgressColumn = this.mainTaskTable.locator('div').filter({ hasText: 'In Progress' });
    this.reviewColumn = this.mainTaskTable.locator('div').filter({ hasText: 'Review' });
    this.doneColumn = this.mainTaskTable.locator('div').filter({ hasText: 'Done' });
  }

  getTaskCardTags(taskName: string) {
    return this.mainTaskTable
      .locator('div div div')
      .filter({ hasText: taskName })
      .locator('div[class="flex flex-wrap gap-2 mb-3"] span');
  }
}

export async function authenticate(page: Page) {
  const loginPage = new LoginPageLocators(page);
  const userData = new UserData();
  await page.goto('/');
  await loginPage.usernameInput.fill(userData.username);
  await loginPage.passwordInput.fill(userData.password);
  await loginPage.loginButton.click();
}
