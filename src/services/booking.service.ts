import { TIME_SLOTS } from "../constants/slots";
import ApiError from "../exceptions/api-error";
import { Errors } from "../exceptions/errors";
import Booking, { IBooking } from "../models/booking.model";

class BookingService {
  async postBooking(booking: IBooking) {
    const existing = await Booking.findOne({
      service_id: booking.service_id,
      date: booking.date,
      tim: booking.time,
    });
    if (existing) {
      throw new ApiError(Errors.TimeSlotAlreadyBooked);
    }

    const newBooking = await Booking.create(booking);

    return newBooking;
  }

  async getBookings() {
    const bookings_list = await Booking.find();

    return bookings_list;
  }
}

export default new BookingService();
