import _ from 'lodash';
import { DateTime } from 'luxon';
import { faker } from '@faker-js/faker';
import { RandomDataUtil } from '@utils/random-data-generator';

export const createBookingPayload = (overrides?: any) => {
  // 1. Generate the dynamic values first
  const dynamicCheckin = DateTime.now()
    .plus({ days: faker.number.int({ min: 60, max: 300 }) })
    .toFormat('yyyy-MM-dd');

  const dynamicCheckout = DateTime.fromISO(dynamicCheckin)
    .plus({ days: faker.number.int({ min: 2, max: 7 }) })
    .toFormat('yyyy-MM-dd');

  // 2. Define defaults using those dynamic values
  const defaults = {
    roomid: faker.number.int({ min: 1, max: 999 }),
    firstname: RandomDataUtil.getFirstName(),
    lastname: RandomDataUtil.getLastName(),
    depositpaid: true,
    bookingdates: {
      checkin: dynamicCheckin,
      checkout: dynamicCheckout
    }
  };

  // 3. Lodash merges your overrides on top of the dynamic defaults
  return _.merge({}, defaults, overrides);
};


export const createSameDatePayload = () => {
  const payload = createBookingPayload();
  const date = payload.bookingdates.checkout; 
  
  return createBookingPayload({
    bookingdates: {
      checkin: date,
      checkout: date
    }
  });
};

/**
 * Helper: Generates a payload where checkout is 10 days BEFORE checkin.
 */
export const createInvalidDateOrderPayload = () => {
  return createBookingPayload({
    bookingdates: {
      checkin: '2026-12-20',
      checkout: '2026-12-10'
    }
  });
};


export const createInvalidDateFormat = () => {
  return createBookingPayload({
    bookingdates: {
      checkin: '20-12-2026',
      checkout: '24-12-2027'
    }
  });
};