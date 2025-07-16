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
  {
    userId: "user147",
    patient: new mongoose.Types.ObjectId("60c72b2f9b1d8c001c8e4f1f"),
    primaryPhysician: "Dr. Leila Cameron",
    schedule: new Date("2023-10-20T10:00:00Z"),
    reason: "Routine vaccination",
    note: "Follow-up for scheduled immunization.",
    cancellationReason: null,
    status: "scheduled"
  },
  {
    userId: "user258",
    patient: new mongoose.Types.ObjectId("60c72b2f9b1d8c001c8e4f10"),
    primaryPhysician: "Dr. David Livingston",
    schedule: new Date("2023-10-21T13:30:00Z"),
    reason: "Allergy test",
    note: "Seasonal allergies worsening.",
    cancellationReason: null,
    status: "pending"
  },
  {
    userId: "user369",
    patient: new mongoose.Types.ObjectId("60c72b2f9b1d8c001c8e4f11"),
    primaryPhysician: "Dr. Meena Sethi",
    schedule: new Date("2023-10-22T15:00:00Z"),
    reason: "Migraine consultation",
    note: "Recurring migraines for past 3 weeks.",
    cancellationReason: null,
    status: "scheduled"
  },
  {
    userId: "user101",
    patient: new mongoose.Types.ObjectId("60c72b2f9b1d8c001c8e4f12"),
    primaryPhysician: "Dr. John Green",
    schedule: new Date("2023-10-23T09:45:00Z"),
    reason: "High cholesterol",
    note: "Review recent lab reports.",
    cancellationReason: null,
    status: "scheduled"
  },
  {
    userId: "user202",
    patient: new mongoose.Types.ObjectId("60c72b2f9b1d8c001c8e4f13"),
    primaryPhysician: "Dr. Leila Cameron",
    schedule: new Date("2023-10-24T11:15:00Z"),
    reason: "Blood pressure check",
    note: "Patient monitoring blood pressure at home.",
    cancellationReason: null,
    status: "scheduled"
  },
  {
    userId: "user303",
    patient: new mongoose.Types.ObjectId("60c72b2f9b1d8c001c8e4f14"),
    primaryPhysician: "Dr. David Livingston",
    schedule: new Date("2023-10-25T10:30:00Z"),
    reason: "Cold and flu symptoms",
    note: "Mild fever, cough, sore throat.",
    cancellationReason: null,
    status: "pending"
  },
  {
    userId: "user404",
    patient: new mongoose.Types.ObjectId("60c72b2f9b1d8c001c8e4f15"),
    primaryPhysician: "Dr. Rajat Mehra",
    schedule: new Date("2023-10-26T12:00:00Z"),
    reason: "Joint pain",
    note: "Knee pain worsening with activity.",
    cancellationReason: null,
    status: "scheduled"
  },
  {
    userId: "user505",
    patient: new mongoose.Types.ObjectId("60c72b2f9b1d8c001c8e4f16"),
    primaryPhysician: "Dr. John Green",
    schedule: new Date("2023-10-27T14:00:00Z"),
    reason: "Stomach ache",
    note: "Persistent abdominal discomfort.",
    cancellationReason: "Patient unavailable",
    status: "cancelled"
  },
  {
    userId: "user606",
    patient: new mongoose.Types.ObjectId("60c72b2f9b1d8c001c8e4f17"),
    primaryPhysician: "Dr. Leila Cameron",
    schedule: new Date("2023-10-28T10:30:00Z"),
    reason: "Vision test",
    note: "Blurry vision reported.",
    cancellationReason: null,
    status: "scheduled"
  },
  {
    userId: "user707",
    patient: new mongoose.Types.ObjectId("60c72b2f9b1d8c001c8e4f18"),
    primaryPhysician: "Dr. David Livingston",
    schedule: new Date("2023-10-29T09:00:00Z"),
    reason: "Sleep issues",
    note: "Difficulty falling asleep at night.",
    cancellationReason: null,
    status: "scheduled"
  },
  {
    userId: "user808",
    patient: new mongoose.Types.ObjectId("60c72b2f9b1d8c001c8e4f19"),
    primaryPhysician: "Dr. Priya Kaur",
    schedule: new Date("2023-10-30T13:00:00Z"),
    reason: "Chest pain",
    note: "Occasional sharp chest pain with exertion.",
    cancellationReason: "Emergency visit elsewhere",
    status: "cancelled"
  },
  {
    userId: "user909",
    patient: new mongoose.Types.ObjectId("60c72b2f9b1d8c001c8e4f20"),
    primaryPhysician: "Dr. John Green",
    schedule: new Date("2023-11-01T08:45:00Z"),
    reason: "Headache",
    note: "Mild tension headaches daily.",
    cancellationReason: null,
    status: "scheduled"
  },
  {
    userId: "user112",
    patient: new mongoose.Types.ObjectId("60c72b2f9b1d8c001c8e4f21"),
    primaryPhysician: "Dr. Leila Cameron",
    schedule: new Date("2023-11-02T10:15:00Z"),
    reason: "Routine screening",
    note: "Annual preventive screening visit.",
    cancellationReason: null,
    status: "scheduled"
  },
  {
    userId: "user223",
    patient: new mongoose.Types.ObjectId("60c72b2f9b1d8c001c8e4f22"),
    primaryPhysician: "Dr. David Livingston",
    schedule: new Date("2023-11-03T11:00:00Z"),
    reason: "Throat irritation",
    note: "Sore throat, no fever.",
    cancellationReason: null,
    status: "pending"
  },
  {
    userId: "user334",
    patient: new mongoose.Types.ObjectId("60c72b2f9b1d8c001c8e4f23"),
    primaryPhysician: "Dr. Priya Kaur",
    schedule: new Date("2023-11-04T09:30:00Z"),
    reason: "Digestive issues",
    note: "Bloating and irregular bowel movement.",
    cancellationReason: null,
    status: "scheduled"
  }
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