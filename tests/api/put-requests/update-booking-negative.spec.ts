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

    test('TC029 Full update booking with invalid token', async ({ apiContext }) => {
        const updatedPayload = createBookingPayload();
        const response = await apiContext.put(`${ENDPOINTS.BOOKING}/${currentBookingId}`, {
            data: updatedPayload,
        });

        expect(response.status()).toBe(STATUS.FORBIDDEN);
    })

    test('TC030 Full update booking with missing required fields', async ({ apiContext }) => {
        const incompletePayload = _.omit(createBookingPayload(), ['firstname']);
        const response = await apiContext.put(`${ENDPOINTS.BOOKING}/${currentBookingId}`, {
            headers: authHeader,
            data: incompletePayload,
        });

        expect(response.status()).toBe(STATUS.BAD_REQUEST);
    })

    test('TC031 Full update with invalid booking ID', async ({ apiContext }) => {
        const invalidBookingID = 99999999;
        const updatedPayload = createBookingPayload();
        const response = await apiContext.put(`${ENDPOINTS.BOOKING}/${invalidBookingID}`, {
            headers: authHeader,
            data: updatedPayload,
        });

        expect(response.status()).toBe(STATUS.NOT_FOUND);
    })

    test('TC032 Partial update with empty body', async ({ apiContext }) => {
        const updatedPayload = {}
        const response = await apiContext.put(`${ENDPOINTS.BOOKING}/${currentBookingId}`, {
            headers: authHeader,
            data: updatedPayload,
        });

        expect(response.status()).toBe(STATUS.BAD_REQUEST);
    })

    test('TC033 Update booking dates to invalid range ', async ({ apiContext }) => {
        const updatedPayload = createInvalidDateFormat();
        const response = await apiContext.put(`${ENDPOINTS.BOOKING}/${currentBookingId}`, {
            headers: authHeader,
            data: updatedPayload,
        });

        expect(response.status()).toBe(STATUS.BAD_REQUEST);
    })

});