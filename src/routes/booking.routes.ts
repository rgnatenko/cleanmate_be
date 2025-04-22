import { Router } from "express";
import bookingsController from "../controllers/bookings.controller";
import authMiddleware from "../middlewares/auth.middleware";
import validateInput from "../middlewares/validation-middleware";
import { bookingSchema } from "../validation/bookingSchema";

const BookingRouter = Router();

BookingRouter.get("", bookingsController.getBookings);
BookingRouter.get("/:customerId", bookingsController.getClientBookings);
BookingRouter.post(
  "",
  authMiddleware,
  validateInput(bookingSchema),
  bookingsController.postBooking
);

export default BookingRouter;
