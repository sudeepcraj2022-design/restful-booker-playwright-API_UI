import { test, expect } from '@fixtures/api/request-context';
import { RandomDataUtil } from '@utils/random-data-generator';

test.describe('@smoke - Auth - Generate Token', () => {

    test('TC009 - Create booking with all valid fields', async ({ apiContext, authToken }) => {
        const response = await apiContext.post('/api/booking', {
            headers: {
                'Cookie': `token=${authToken}`
            },
            data: ({
                "roomid": RandomDataUtil.getRandomNumber(),
                "firstname": "John",
                "lastname": "Lalabu",
                "depositpaid": true,
                "bookingdates": {
                    "checkin": "2026-06-01",
                    "checkout": "2026-06-03"
                }
            }),
        });

        const body = await response.json();
        console.log('Booking body:', body);

        expect(response.status()).toBe(201);


    });


});