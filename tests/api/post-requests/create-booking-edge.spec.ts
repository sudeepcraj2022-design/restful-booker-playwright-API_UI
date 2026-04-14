import { test, expect } from '@fixtures/api/request-context';
import { createInvalidDateOrderPayload, createSameDatePayload} from '@utils/helpers/payload-factory'
import { ENDPOINTS } from '@constants/endpoints';
import { STATUS } from '@constants/status-codes';
import { BOOKING_ERRORS } from '@constants/error-messages';


test('TC015 Create booking with checkin after checkout', async ({ apiContext, authToken }) => {
    const payload = createInvalidDateOrderPayload();

    const response = await apiContext.post(ENDPOINTS.BOOKING, {
        headers: { Cookie: `token=${authToken}` },
        data: payload,
    });

    const body = await response.json();
    
    console.log('Body:', body);
    expect(response.status()).toBe(STATUS.CONFLICT);
    expect(body.error).toBe(BOOKING_ERRORS.FAILED_TO_CREATE);

})

test('TC016 Create booking with same checkin and checkout date', async ({ apiContext, authToken }) => {
    const payload = createSameDatePayload();

    const response = await apiContext.post(ENDPOINTS.BOOKING, {
        headers: { Cookie: `token=${authToken}` },
        data: payload,
    });

    const body = await response.json();
    expect(response.status()).toBe(STATUS.CONFLICT);
    expect(body.error).toBe(BOOKING_ERRORS.FAILED_TO_CREATE);

})