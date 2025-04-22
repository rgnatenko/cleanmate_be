import mongoose, { Schema, Document } from "mongoose";

export interface ICleaningService extends Document {
  service_name: string;
  description: string;
  price: number;
  duration: string;
}

const cleaningServiceSchema = new Schema({
  service_name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  duration: { type: String, required: true },
});

const CleaningService = mongoose.model<ICleaningService>(
  "CleaningService",
  cleaningServiceSchema,
  "cleaningServiceList"
);

export default CleaningService;
