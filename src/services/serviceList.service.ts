import { TIME_SLOTS } from "../constants/slots";
import Booking from "../models/booking.model";

class ServicesListService {
  async getSlots(id: string, date: string) {
    const bookings = await Booking.find({ service_id: id, date });
    const bookedTimes = bookings.map((b) => b.time);
    const availableSlots = TIME_SLOTS.filter(
      (slot) => !bookedTimes.includes(slot)
    );

    return availableSlots;
  }
}

export default new ServicesListService();
