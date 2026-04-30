import { ENV } from '@config/env';
import {test, expect} from '@fixtures/ui/page-instance'
import { URL } from '@constants/urls';


test.describe('Admin login functionality', () => {
    test.beforeEach(async ({ loginPage, page }) => {
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

    test('UI026 Verify password field is masked', async ({ loginPage, page }) => {
        const password = 'secret123'
        await loginPage.getPasswordField().fill(password);
        await expect(loginPage.getPasswordField()).toHaveAttribute('type', 'password')
        await expect(page.getByText(password)).not.toBeVisible();

    });

    test('UI027 Login with invalid password', async ({ loginPage }) => {
        await loginPage.login(ENV.USERNAME, 'Invalid');
        await expect(loginPage.getErrorMessage()).toHaveText('Invalid credentials')
    });

    test('UI028 Admin panel not accessible without login', async ({ loginPage, page }) => {
        await page.goto(URL.ROOMS);
        expect(page).toHaveURL(URL.ADMIN_LOGIN);
        
    });
});