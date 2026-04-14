import { test, expect } from '@fixtures/api/request-context';
import { createBookingPayload, createInvalidDateFormat} from '@utils/helpers/payload-factory'
import { ENDPOINTS } from '@constants/endpoints';
import { STATUS } from '@constants/status-codes';
import { BOOKING_ERRORS } from '@constants/error-messages';



test('TC011 Create booking with missing firstname', async ({ apiContext, authToken }) => {
    const payload = createBookingPayload();
    delete payload.firstname;

    const response = await apiContext.post(ENDPOINTS.BOOKING, {
        headers: { Cookie: `token=${authToken}` },
        data: payload,
    });

    const body = await response.json();
    expect(response.status()).toBe(STATUS.BAD_REQUEST);
    expect(body.errors).toContain(BOOKING_ERRORS.FIRSTNAME_BLANK);

})

test('TC012 Create booking with missing lastname', async ({ apiContext, authToken }) => {
    const payload = createBookingPayload();
    delete payload.lastname;

    const response = await apiContext.post(ENDPOINTS.BOOKING, {
        headers: { Cookie: `token=${authToken}` },
        data: payload,
    });

    const body = await response.json();
    expect(response.status()).toBe(STATUS.BAD_REQUEST);
    expect(body.errors).toContain(BOOKING_ERRORS.LASTNAME_BLANK);

})

test('TC013 Create booking with missing checkin date', async ({ apiContext, authToken }) => {
    const payload = createBookingPayload();
    delete payload.bookingdates.checkin;

    const response = await apiContext.post(ENDPOINTS.BOOKING, {
        headers: { Cookie: `token=${authToken}` },
        data: payload,
    });

    const body = await response.json();
    expect(response.status()).toBe(STATUS.BAD_REQUEST);
    expect(body.errors).toContain(BOOKING_ERRORS.FIELD_NULL);

})

test('TC014 Create booking with missing checkout date', async ({ apiContext, authToken }) => {
    const payload = createBookingPayload();
    delete payload.bookingdates.checkout;

    const response = await apiContext.post(ENDPOINTS.BOOKING, {
        headers: { Cookie: `token=${authToken}` },
        data: payload,
    });

    const body = await response.json();
    expect(response.status()).toBe(STATUS.BAD_REQUEST);
    expect(body.errors).toContain(BOOKING_ERRORS.FIELD_NULL);

})

test('TC015 Create booking with invalid date format', async ({ apiContext, authToken }) => {
    const payload = createInvalidDateFormat();

    const response = await apiContext.post(ENDPOINTS.BOOKING, {
        headers: { Cookie: `token=${authToken}` },
        data: payload,
    });

    const body = await response.json();
    expect(response.status()).toBe(STATUS.BAD_REQUEST);
    expect(body.errors).toContain(BOOKING_ERRORS.FAILED_TO_CREATE);

})

test('TC016 Create booking with empty body', async ({ apiContext, authToken }) => {
    const payload = {};

    const response = await apiContext.post(ENDPOINTS.BOOKING, {
        headers: { Cookie: `token=${authToken}` },
        data: payload,
    });

    const body = await response.json();
    expect(response.status()).toBe(STATUS.BAD_REQUEST);
    expect(body.errors).toContain(BOOKING_ERRORS.FIRSTNAME_BLANK);
    expect(body.errors).toContain(BOOKING_ERRORS.LASTNAME_BLANK);
})