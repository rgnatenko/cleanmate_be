import mongoose, { Document, ObjectId } from "mongoose";

export interface IBooking extends Document {
  service_id: ObjectId;
  customer_name: string;
  customer_id: ObjectId;
  phone_number: string;
  date: string;
  time: string;
}

const bookingSchema = new mongoose.Schema({
  service_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "CleaningService",
    required: true,
  },
  customer_name: { type: String, required: true },
  customer_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  phone_number: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
});

const Booking = mongoose.model<IBooking>("Booking", bookingSchema);
export default Booking;
