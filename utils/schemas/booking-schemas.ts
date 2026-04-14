import{ z }from 'zod';

export const BookingResponseSchema = z.object({
  bookingid: z.number().positive(),
  roomid: z.number().positive(),
  firstname: z.string(),
  lastname: z.string(),
  depositpaid: z.boolean(),
  bookingdates: z.object({
    checkin: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    checkout: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  }),
});