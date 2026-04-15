import { test, expect } from '@fixtures/api/request-context';
import { createBookingPayload } from '@utils/helpers/payload-factory'
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

    test('TC025 Fully update the existing booking', async ({ apiContext }) => {
        const updatedPayload = createBookingPayload();
        const response = await apiContext.put(`${ENDPOINTS.BOOKING}/${currentBookingId}`, {
            headers: authHeader,
            data: updatedPayload,
        });

        // 1. Verify status of the update
        expect(response.status()).toBe(STATUS.OK);

    });

    test('TC026 Verify updated fields are persisted', async ({ apiContext }) => {
        const updatedPayload = createBookingPayload();
        const response = await apiContext.put(`${ENDPOINTS.BOOKING}/${currentBookingId}`, {
            headers: authHeader,
            data: updatedPayload,
        });

        // 1. Verify status of the update
        expect(response.status()).toBe(STATUS.OK);
        const body = await response.json();
        //console.log('Updated body:', body);

        const updatedData = body.booking;

        // 2. Schema Validation
        const schemaResult = BookingResponseSchema.safeParse(body.booking);

        if (!schemaResult.success) {
            // Logging the formatted error
            const errorDetails = schemaResult.error.flatten();
            console.error('Schema Validation Errors:', JSON.stringify(errorDetails.fieldErrors, null, 2));
        }

        expect(schemaResult.success).toBe(true);

        // 3. Functional Validation: Ensure the data actually changed to our new payload
        expect(updatedData.firstname).toBe(updatedPayload.firstname);
        expect(updatedData.lastname).toBe(updatedPayload.lastname);
        expect(updatedData.totalprice).toBe(updatedPayload.totalprice);
    });

    test('TC027 Simulated Partial Update (GET -> Modify -> PUT)', async ({ apiContext }) => {
        const response = await apiContext.get(`${ENDPOINTS.BOOKING}/${currentBookingId}`, {
            headers: authHeader,
        });

        // 1. Verify status of the update
        expect(response.status()).toBe(STATUS.OK);
        const currentData = await response.json();

        //2. Modify only the specific field
        const newName = RandomDataUtil.getFirstName();
        const partialChange = { firstname: newName};
        const updatedPayload = { ...currentData, ...partialChange };

        //3. Put the full data back into the server
        const putResponse = await apiContext.put(`${ENDPOINTS.BOOKING}/${currentBookingId}`, {
            headers: authHeader,
            data: updatedPayload,
        });
        expect(putResponse.status()).toBe(STATUS.OK);

        //4. Verify the changes
        const body = await putResponse.json();
        const finalData = body.booking || body; // Handle the API's nesting 

        expect(finalData.firstname).toBe(newName);
        expect(finalData.lastname).toBe(currentData.lastname);

    });

})