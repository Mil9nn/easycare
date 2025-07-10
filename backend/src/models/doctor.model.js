import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    specialization: { type: String, required: true },
    experience: { type: Number, required: true },
    availableDays: [{ type: String }],
    availableFrom: { type: String },
    availableTo: { type: String },
    profileImage: { type: String },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const Doctor = mongoose.model("Doctor", doctorSchema);
