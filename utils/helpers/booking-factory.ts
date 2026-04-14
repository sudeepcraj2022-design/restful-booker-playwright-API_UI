import { DateTime } from 'luxon';
import { faker } from '@faker-js/faker';

interface BookingDates {
  checkin?: string;
  checkout?: string;
}

interface BookingPayload {
  roomid?: number;
  firstname?: string;
  lastname?: string;
  depositpaid?: boolean;
  bookingdates?: BookingDates;
}
const generateCheckin = (): string =>
  DateTime.now()
    .plus({ days: faker.number.int({ min: 60, max: 300 }) })
    .toFormat('yyyy-MM-dd');

const generateCheckout = (checkin: string): string =>
  DateTime.fromISO(checkin)
    .plus({ days: faker.number.int({ min: 2, max: 7 }) })
    .toFormat('yyyy-MM-dd');

export const createBookingPayload = (overrides?: Partial<BookingPayload>): BookingPayload => {
  const checkin = generateCheckin();
  const checkout = generateCheckout(checkin);

  return {
    roomid: faker.number.int({ min: 1000, max: 99999 }),
    firstname: 'John',
    lastname: 'Doe',
    depositpaid: true,
    bookingdates: {
      checkin,
      checkout,
    },
    ...overrides,
  };
};