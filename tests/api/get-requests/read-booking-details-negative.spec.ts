import { test, expect } from '@fixtures/api/request-context';
import { createBookingPayload } from '@utils/helpers/payload-factory'
import { ENDPOINTS } from '@constants/endpoints';
import { STATUS } from '@constants/status-codes';
import _ from 'lodash';
import { BookingResponseSchema } from '@utils/schemas/booking-schemas'

test.describe('Booking Read Suite - GET Requests', () => {
    let currentBookingId: number;
    let authHeader: { Cookie: string };

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
    });

    test('TC021 Get booking by non-existent ID', async ({ apiContext }) => {
        const nonExistentId = _.random(900000, 999999);
        const response = await apiContext.get(`${ENDPOINTS.BOOKING}/${nonExistentId}`, {
            headers: authHeader,
        });

        expect(response.status()).toBe(STATUS.NOT_FOUND);
    });

    test('TC022 Get booking by invalid ID format', async ({ apiContext }) => {
        const stringID = 'abc'
        const response = await apiContext.get(`${ENDPOINTS.BOOKING}/${stringID}`, {
            headers: authHeader,
        });
        expect(response.status()).toBe(STATUS.NOT_FOUND);
    });

    test('TC023 Get booking by negative ID', async ({ apiContext }) => {
        const negativeID = -1;
        const response = await apiContext.get(`${ENDPOINTS.BOOKING}/${negativeID}`, {
            headers: authHeader,
        });
        expect(response.status()).toBe(STATUS.NOT_FOUND);
    });

    test('TC024 Get booking by zero ID', async ({ apiContext }) => {
        const zeroID = 0;
        const response = await apiContext.get(`${ENDPOINTS.BOOKING}/${zeroID}`, {
            headers: authHeader,
        });
        expect(response.status()).toBe(STATUS.NOT_FOUND);
    });

})