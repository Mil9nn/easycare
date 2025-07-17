import mongoose from "mongoose";
import { Appointment } from "../models/appointment.model.js";

import dotenv from 'dotenv'

dotenv.config();

const appointments = [
  {
    userId: "user123",
    patient: new mongoose.Types.ObjectId("60c72b2f9b1d8c001c8e4f1a"),
    primaryPhysician: "Dr. John Green",
    schedule: new Date("2023-10-15T10:00:00Z"),
    reason: "Annual check-up",
    note: "Patient has a history of hypertension.",
    cancellationReason: null,
    status: "scheduled"
  },
  {
    userId: "user456",
    patient: new mongoose.Types.ObjectId("60c72b2f9b1d8c001c8e4f1b"),
    primaryPhysician: "Dr. Leila Cameron",
    schedule: new Date("2023-10-16T11:30:00Z"),
    reason: "Skin rash consultation",
    note: "Patient reports a persistent rash on the left arm.",
    cancellationReason: null,
    status: "pending"
  },
  {
    userId: "user789",
    patient: new mongoose.Types.ObjectId("60c72b2f9b1d8c001c8e4f1c"),
    primaryPhysician: "Dr. David Livingston",
    schedule: new Date("2023-10-17T09:00:00Z"),
    reason: "Follow-up on diabetes management",
    note: "Patient needs to review blood sugar levels.",
    cancellationReason: "Patient requested to reschedule",
    status: "cancelled"
  },
  {
    userId: "user321",
    patient: new mongoose.Types.ObjectId("60c72b2f9b1d8c001c8e4f1d"),
    primaryPhysician: "Dr. Meena Sethi",
    schedule: new Date("2023-10-18T14:45:00Z"),
    reason: "Back pain assessment",
    note: "Chronic back pain worsening over 2 months.",
    cancellationReason: null,
    status: "scheduled"
  },
  {
    userId: "user654",
    patient: new mongoose.Types.ObjectId("60c72b2f9b1d8c001c8e4f1e"),
    primaryPhysician: "Dr. John Green",
    schedule: new Date("2023-10-19T08:15:00Z"),
    reason: "General fatigue",
    note: "Patient reports constant tiredness.",
    cancellationReason: null,
    status: "scheduled"
  },
];

const seedAppointments = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        await Appointment.deleteMany({});
        await Appointment.insertMany(appointments);
        console.log("✅ Appointments seeded successfully.");
        process.exit();
    } catch (error) {
        console.error("❌ Error seeding appointments:", error);
        process.exit(1);
    }
}

seedAppointments();