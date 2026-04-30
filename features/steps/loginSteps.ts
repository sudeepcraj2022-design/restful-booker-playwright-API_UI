import { createBdd } from 'playwright-bdd'
import { test } from 'playwright-bdd';
import { expect } from '@playwright/test';
import { URL } from '@constants/urls';
import { ENV } from '@config/env';
import { LoginPage } from '@pages/adimin-login'
import { RoomsPage } from '@pages/rooms-page';

const { Given, When, Then } = createBdd(test);
let loginPage: LoginPage;
let roomsPage: RoomsPage;

Given('User navigates to login page', async ({ page }) => {
    loginPage = new LoginPage(page);
    roomsPage = new RoomsPage(page);
    await page.goto(URL.ADMIN_LOGIN);
});

When('User logs in with valid credentials', async () => {

    await loginPage.login(ENV.USERNAME, ENV.PASSWORD)
});

Then('User should see the rooms management header', async () => {
    await expect(roomsPage.getRoomsHeader()).toBeVisible();
});