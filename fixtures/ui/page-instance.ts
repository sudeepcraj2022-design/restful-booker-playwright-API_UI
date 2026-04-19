import { test as base } from '@playwright/test';
import { HomePage } from '@pages/home-page';
import { LoginPage } from '@pages/adimin-login';
import { RoomsPage } from '@pages/rooms-page';

//1. Fixture Type declaration
type MyFixtures = {
    homePage: HomePage;
    loginPage: LoginPage;
    roomsPage: RoomsPage;
}

//2. Extend the base test object
export const test = base.extend<MyFixtures>({
    homePage: async ({ page }, use) => {
        const homePage = new HomePage(page);
        await use(homePage);
    },

    loginPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        await use(loginPage);
    },

    roomsPage: async ({ page }, use) => {
        const roomsPage = new RoomsPage(page);
        await use(roomsPage);
    },

});

//3. Export expect so you don't have to import it everywhere
export { expect } from '@playwright/test';