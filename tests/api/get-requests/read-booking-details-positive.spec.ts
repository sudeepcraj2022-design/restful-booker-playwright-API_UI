import { test, expect } from '@fixtures/api/request-context';
import { createBookingPayload } from '@utils/helpers/payload-factory'
import { ENDPOINTS } from '@constants/endpoints';
import { STATUS } from '@constants/status-codes';
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

    test('TC019 Get booking by valid ID', async ({ apiContext }) => {
        const response = await apiContext.get(`${ENDPOINTS.BOOKING}/${currentBookingId}`, {
            headers: authHeader,
        });

        //const body = await response.json();
        //console.log('Get Response Body: ', body);
        expect(response.status()).toBe(STATUS.OK);

    });

    test('TC020 Get booking response schema validation', async ({ apiContext }) => {
        const response = await apiContext.get(`${ENDPOINTS.BOOKING}/${currentBookingId}`, {
            headers: authHeader,
        });

        const body = await response.json();
        expect(BookingResponseSchema.safeParse(body).success).toBe(true);
        
    });

})