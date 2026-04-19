import { test, expect } from '@fixtures/ui/page-instance'
import { AVAILABLE_ROOMS } from '@constants/available-rooms';
import { ROOM_PRICES } from '@constants/room-prices';
import { AMENITIES } from '@constants/amenities';

test.describe('Home Page functionality', () => {
    test.beforeEach(async ({ homePage }) => {
        await homePage.navigate()
    });

    test('UI001 Homepage loads successfully', async ({ homePage }) => {

        await expect(homePage.getHomeButton()).toBeVisible();
    })

    test('UI002 Hotel name is displayed on homepage', async ({ homePage }) => {

        await expect(homePage.getHotelName()).toBeVisible();
    })

    test('UI003 Hero banner image is visible', async ({ homePage }) => {

        await expect(homePage.getBannerImage()).toHaveAttribute('style', /images\/rbp-logo.jpg/);
    })

    test('UI004 Footer is visible on homepage', async ({ homePage }) => {

        await expect(homePage.getFooterContainer()).toBeVisible();
    })

    test('UI005 Room card displays room image', async ({ homePage }) => {

        const allVisible = await homePage.areAllRoomImagesVisible();
        expect(allVisible).toBeTruthy();

    })

    test('UI006 Room card displays room type', async ({ homePage }) => {

        const roomDetails = homePage.getRoomCardElements(AVAILABLE_ROOMS.SINGLE);
        await expect(roomDetails.title).toContainText(AVAILABLE_ROOMS.SINGLE);

    })

    test('UI006 Room card displays price per night', async ({ homePage }) => {

        const roomDetails = homePage.getRoomCardElements(AVAILABLE_ROOMS.SINGLE);
        await expect(roomDetails.priceByValue).toBeVisible();
        await expect(roomDetails.priceByValue).toContainText(ROOM_PRICES.SINGLE);

    })

    test('UI007 Room card displays price per night', async ({ homePage }) => {

        const roomDetails = homePage.getRoomCardElements(AVAILABLE_ROOMS.SINGLE);
        await expect(roomDetails.priceByValue).toBeVisible();
        await expect(roomDetails.priceByValue).toContainText(ROOM_PRICES.SINGLE);

    })

    test('UI008 Room card displays accessibility features', async ({ homePage }) => {

        const roomDetails = homePage.getRoomCardElements(AVAILABLE_ROOMS.SINGLE);
        await expect(roomDetails.amenities.first()).toBeVisible();

        const amenitiesText = await roomDetails.amenities.allInnerTexts();
        const trimmedActual = amenitiesText.map(text => text.trim());
        expect(trimmedActual).toEqual(AMENITIES.SINGLE);

    })

    test('UI009 Page title is correct', async ({ page }) => {

        expect(page).toHaveTitle(/Restful-booker-platform demo/);
    })

});