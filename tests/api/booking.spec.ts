import { test, expect } from '@fixtures/api/request-context';
import { createBookingPayload } from '@utils/helpers/booking-factory'
import { ENDPOINTS } from '@constants/endpoints';
import { STATUS } from '@constants/status-codes';
import { BookingResponseSchema } from '@utils/schemas/booking-schemas'


test.describe('@smomke - Booking validation', () => {

    test('TC009 - Create booking with all valid fields', async ({ apiContext, authToken }) => {
        const payload = createBookingPayload();

        const response = await apiContext.post(ENDPOINTS.BOOKING, {
            headers: { Cookie: `token=${authToken}` },
            data: payload,
        });

        const body = await response.json();

        //Status
        expect(response.status()).toBe(STATUS.CREATED);

        //Booking ID
        expect(body.bookingid).toBeDefined();
        expect(typeof body.bookingid).toBe('number');
        expect(body.bookingid).toBeGreaterThan(0);

        //Fields match what was sent
        expect(body.roomid).toBe(payload.roomid);
        expect(body.firstname).toBe(payload.firstname);
        expect(body.lastname).toBe(payload.lastname);
        expect(body.depositpaid).toBe(payload.depositpaid);
        expect(body.bookingdates.checkin).toBe(payload.bookingdates?.checkin);
        expect(body.bookingdates.checkout).toBe(payload.bookingdates?.checkout);

        //Schema validation
        const result = BookingResponseSchema.safeParse(body);
        expect(result.success).toBe(true);

    });


});
