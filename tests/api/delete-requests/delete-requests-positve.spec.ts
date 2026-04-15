import { test, expect } from '@fixtures/api/request-context';
import { createBookingPayload, createInvalidDateFormat } from '@utils/helpers/payload-factory'
import { ENDPOINTS } from '@constants/endpoints';
import { STATUS } from '@constants/status-codes';
import _ from 'lodash';
import { BookingResponseSchema } from '@utils/schemas/booking-schemas'
import { RandomDataUtil } from '@utils/random-data-generator';

test.describe('Booking Update Suite - PUT Requests', () => {
    let currentBookingId: number;
    let authHeader: { Cookie: string };
    let initialBookingdata: any;

    test.beforeAll(async ({ apiContext, authToken }) => {
        // 1. Create a fresh booking for every single test case
        authHeader = { Cookie: `token=${authToken}` };
        const payload = createBookingPayload();
        const response = await apiContext.post(ENDPOINTS.BOOKING, {
            headers: authHeader,
            data: payload,
        });

        expect(response.status(), 'Setup: Failed to create booking').toBe(STATUS.CREATED);

        const body = await response.json();
        currentBookingId = body.bookingid;
        initialBookingdata = payload;
    });

    test('TC034 Delete booking with valid token', async ({ apiContext }) => {

        const deleteResponse = await apiContext.delete(`${ENDPOINTS.BOOKING}/${currentBookingId}`, {
            headers: authHeader,
        });
        // This website returns 202 accepted status code for delete request
        expect(deleteResponse.status()).toBe(STATUS.ACCEPTED);

        // Verify actual deletion
        const getResponse = await apiContext.get(`${ENDPOINTS.BOOKING}/${currentBookingId}`, {
            headers: authHeader,
        });

        expect(getResponse.status()).toBe(STATUS.NOT_FOUND);
    })

    test('TC035 Delete booking with no auth token', async ({ apiContext }) => {

        const deleteResponse = await apiContext.delete(`${ENDPOINTS.BOOKING}/${currentBookingId}`);

        expect(deleteResponse.status()).toBe(STATUS.FORBIDDEN);
    })

    test('TC036 Delete booking with invalid token', async ({ apiContext }) => {

        const deleteResponse = await apiContext.delete(`${ENDPOINTS.BOOKING}/${currentBookingId}`, {
            headers: { Cookie: 'Invalid' },
        });

        expect(deleteResponse.status()).toBe(STATUS.FORBIDDEN);
    })

    test('TC037 Delete non-existent booking ID', async ({ apiContext }) => {
        const invalidBookingID = 99999999;
        const deleteResponse = await apiContext.delete(`${ENDPOINTS.BOOKING}/${invalidBookingID}`, {
            headers: authHeader,
        });

        expect(deleteResponse.status()).toBe(STATUS.NOT_FOUND);
    })

    test('TC038 Delete non-existent booking ID', async ({ apiContext }) => {
        const deleteResponse = await apiContext.delete(`${ENDPOINTS.BOOKING}/${currentBookingId}`, {
            headers: authHeader,
        });
        // This website returns 202 accepted status code for delete request
        expect(deleteResponse.status()).toBe(STATUS.ACCEPTED);

        // Try to delete the same booking again
        const deleteSameIDResponse = await apiContext.delete(`${ENDPOINTS.BOOKING}/${currentBookingId}`, {
            headers: authHeader,
        });

        expect(deleteSameIDResponse.status()).toBe(STATUS.NOT_FOUND);
    })

});