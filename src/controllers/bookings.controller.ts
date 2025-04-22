import { NextFunction, Response, Request } from "express";
import BookingService from "../services/booking.service";
import Booking, { IBooking } from "../models/booking.model";

class BookingController {
  async postBooking(req: Request, res: Response, next: NextFunction) {
    try {
      const booking: IBooking = req.body;
      const newBooking = await BookingService.postBooking(booking);

      res.json(newBooking);
    } catch (e) {
      next(e);
    }
  }

  async getBookings(req: Request, res: Response, next: NextFunction) {
    try {
      const bookings_list = await BookingService.getBookings();

      res.json(bookings_list);
    } catch (e) {
      next(e);
    }
  }
}

export default new BookingController();
