import mongoose from 'mongoose';
import { Patient } from '../models/patient.model.js';
import dotenv from 'dotenv';

dotenv.config();

const patients = [
  {
    _id: new mongoose.Types.ObjectId("60c72b2f9b1d8c001c8e4f1a"),
    user: new mongoose.Types.ObjectId(),
    fullName: "Alice Johnson",
    email: "alice.johnson@example.com",
    phone: "+1234567890",
    birthDate: new Date("2010-01-01")
  },
  {
    _id: new mongoose.Types.ObjectId("60c72b2f9b1d8c001c8e4f1b"),
    user: new mongoose.Types.ObjectId(),
    fullName: "Michael Smith",
    email: "michael.smith@example.com",
    phone: "+1234567891",
    birthDate: new Date("1988-05-10")
  },
  {
    _id: new mongoose.Types.ObjectId("60c72b2f9b1d8c001c8e4f1c"),
    user: new mongoose.Types.ObjectId(),
    fullName: "Emily Davis",
    email: "emily.davis@example.com",
    phone: "+1234567892",
    birthDate: new Date("2005-03-15")
  },
  {
    _id: new mongoose.Types.ObjectId("60c72b2f9b1d8c001c8e4f1d"),
    user: new mongoose.Types.ObjectId(),
    fullName: "James Wilson",
    email: "james.wilson@example.com",
    phone: "+1234567893",
    birthDate: new Date("1985-07-22")
  },
  {
    _id: new mongoose.Types.ObjectId("60c72b2f9b1d8c001c8e4f1e"),
    user: new mongoose.Types.ObjectId(),
    fullName: "Olivia Brown",
    email: "olivia.brown@example.com",
    phone: "+1234567894",
    birthDate: new Date("1993-09-12")
  },
  {
    _id: new mongoose.Types.ObjectId("60c72b2f9b1d8c001c8e4f1f"),
    user: new mongoose.Types.ObjectId(),
    fullName: "William Taylor",
    email: "william.taylor@example.com",
    phone: "+1234567895",
    birthDate: new Date("1991-11-30")
  },
  {
    _id: new mongoose.Types.ObjectId("60c72b2f9b1d8c001c8e4f10"),
    user: new mongoose.Types.ObjectId(),
    fullName: "Sophia Anderson",
    email: "sophia.anderson@example.com",
    phone: "+1234567896",
    birthDate: new Date("1995-04-25")
  },
  {
    _id: new mongoose.Types.ObjectId("60c72b2f9b1d8c001c8e4f11"),
    user: new mongoose.Types.ObjectId(),
    fullName: "Daniel Martinez",
    email: "daniel.martinez@example.com",
    phone: "+1234567897",
    birthDate: new Date("1989-02-20")
  },
  {
    _id: new mongoose.Types.ObjectId("60c72b2f9b1d8c001c8e4f12"),
    user: new mongoose.Types.ObjectId(),
    fullName: "Charlotte Lee",
    email: "charlotte.lee@example.com",
    phone: "+1234567898",
    birthDate: new Date("1996-06-05")
  },
  {
    _id: new mongoose.Types.ObjectId("60c72b2f9b1d8c001c8e4f13"),
    user: new mongoose.Types.ObjectId(),
    fullName: "Benjamin Harris",
    email: "benjamin.harris@example.com",
    phone: "+1234567899",
    birthDate: new Date("1987-08-08")
  },
  {
    _id: new mongoose.Types.ObjectId("60c72b2f9b1d8c001c8e4f14"),
    user: new mongoose.Types.ObjectId(),
    fullName: "Amelia Walker",
    email: "amelia.walker@example.com",
    phone: "+1234567800",
    birthDate: new Date("1994-12-18")
  },
  {
    _id: new mongoose.Types.ObjectId("60c72b2f9b1d8c001c8e4f15"),
    user: new mongoose.Types.ObjectId(),
    fullName: "Henry Lewis",
    email: "henry.lewis@example.com",
    phone: "+1234567801",
    birthDate: new Date("1986-10-03")
  },
  {
    _id: new mongoose.Types.ObjectId("60c72b2f9b1d8c001c8e4f16"),
    user: new mongoose.Types.ObjectId(),
    fullName: "Grace Young",
    email: "grace.young@example.com",
    phone: "+1234567802",
    birthDate: new Date("1997-01-27")
  },
  {
    _id: new mongoose.Types.ObjectId("60c72b2f9b1d8c001c8e4f17"),
    user: new mongoose.Types.ObjectId(),
    fullName: "Logan Scott",
    email: "logan.scott@example.com",
    phone: "+1234567803",
    birthDate: new Date("1990-09-14")
  },
  {
    _id: new mongoose.Types.ObjectId("60c72b2f9b1d8c001c8e4f18"),
    user: new mongoose.Types.ObjectId(),
    fullName: "Zoe King",
    email: "zoe.king@example.com",
    phone: "+1234567804",
    birthDate: new Date("1998-03-09")
  },
  {
    _id: new mongoose.Types.ObjectId("60c72b2f9b1d8c001c8e4f19"),
    user: new mongoose.Types.ObjectId(),
    fullName: "Ethan Wright",
    email: "ethan.wright@example.com",
    phone: "+1234567805",
    birthDate: new Date("1984-07-29")
  },
  {
    _id: new mongoose.Types.ObjectId("60c72b2f9b1d8c001c8e4f20"),
    user: new mongoose.Types.ObjectId(),
    fullName: "Lily Adams",
    email: "lily.adams@example.com",
    phone: "+1234567806",
    birthDate: new Date("1991-05-13")
  },
  {
    _id: new mongoose.Types.ObjectId("60c72b2f9b1d8c001c8e4f21"),
    user: new mongoose.Types.ObjectId(),
    fullName: "Matthew Carter",
    email: "matthew.carter@example.com",
    phone: "+1234567807",
    birthDate: new Date("1982-11-11")
  },
  {
    _id: new mongoose.Types.ObjectId("60c72b2f9b1d8c001c8e4f22"),
    user: new mongoose.Types.ObjectId(),
    fullName: "Ava Perez",
    email: "ava.perez@example.com",
    phone: "+1234567808",
    birthDate: new Date("1993-04-02")
  },
  {
    _id: new mongoose.Types.ObjectId("60c72b2f9b1d8c001c8e4f23"),
    user: new mongoose.Types.ObjectId(),
    fullName: "Noah Ramirez",
    email: "noah.ramirez@example.com",
    phone: "+1234567809",
    birthDate: new Date("1960-12-25")
  }
];

const seedPatients = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await Patient.deleteMany({});
    await Patient.insertMany(patients);
    console.log("✅ Patients seeded successfully.");
    process.exit();
  } catch (error) {
    console.error("❌ Error seeding patients:", error);
    process.exit(1);
  }
};

seedPatients();