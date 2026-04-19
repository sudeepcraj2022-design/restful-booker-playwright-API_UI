import { ENV } from '@config/env';
import {test, expect} from '@fixtures/ui/page-instance'
import { URL } from '@constants/urls';


test.describe('Admin login functionality', () => {
    test.beforeEach(async ({ loginPage }) => {
        await loginPage.navigateToAdminLogin()
    });

    test('UI023 Admin login page loads at /admin', async ({ loginPage }) => {

        await expect(loginPage.getLoginHeading()).toBeVisible();
    });

    test('UI024 Login with valid admin credentials', async ({ loginPage, roomsPage}) => {

        await loginPage.login(ENV.USERNAME, ENV.PASSWORD);
        await expect(roomsPage.getRoomsHeader()).toBeVisible();

    });

    test('UI025 Logout from admin panel', async ({ loginPage, roomsPage, homePage, page}) => {

        await loginPage.login(ENV.USERNAME, ENV.PASSWORD);
        await expect(roomsPage.getRoomsHeader()).toBeVisible()
        await roomsPage.logout();
        await expect(page).toHaveURL(URL.HOME);
        await expect(homePage.getHomeButton()).toBeVisible();

        
    });
});