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
    birthDate: new Date("2010-01-01"),
    gender: "Female",
    address: "123 Main St, Springfield, IL 62701",
    occupation: "Student",
    emergencyContactName: "Sarah Johnson",
    emergencyContactNumber: "+1234567950",
    primaryPhysician: "Dr. Michael Brown",
    insuranceProvider: "Blue Cross Blue Shield",
    insurancePolicyNumber: "BC123456789",
    allergies: "Peanuts, Shellfish",
    currentMedication: "Children's Tylenol as needed",
    familyMedicalHistory: "Grandmother had diabetes",
    pastMedicalHistory: "Appendectomy at age 8",
    identificationType: "Birth Certificate",
    identificationNumber: "BC2010001",
    identificationDocument: {
      fileName: "alice_birth_certificate.pdf",
      fileUrl: "https://storage.example.com/documents/alice_birth_certificate.pdf",
    },
    consents: {
      treatmentConsent: true,
      disclosureConsent: true,
      privacyConsent: true,
    },
  },
  {
    _id: new mongoose.Types.ObjectId("60c72b2f9b1d8c001c8e4f1b"),
    user: new mongoose.Types.ObjectId(),
    fullName: "Michael Smith",
    email: "michael.smith@example.com",
    phone: "+1234567891",
    birthDate: new Date("1988-05-10"),
    gender: "Male",
    address: "456 Oak Ave, Chicago, IL 60601",
    occupation: "Software Engineer",
    emergencyContactName: "Jennifer Smith",
    emergencyContactNumber: "+1234567951",
    primaryPhysician: "Dr. Lisa Davis",
    insuranceProvider: "Aetna",
    insurancePolicyNumber: "AE987654321",
    allergies: "None known",
    currentMedication: "Multivitamin daily",
    familyMedicalHistory: "Father had heart disease",
    pastMedicalHistory: "Broken arm at age 12",
    identificationType: "Driver's License",
    identificationNumber: "DL88051012",
    identificationDocument: {
      fileName: "michael_drivers_license.pdf",
      fileUrl: "https://storage.example.com/documents/michael_drivers_license.pdf",
    },
    consents: {
      treatmentConsent: true,
      disclosureConsent: false,
      privacyConsent: true,
    },
  },
  {
    _id: new mongoose.Types.ObjectId("60c72b2f9b1d8c001c8e4f1c"),
    user: new mongoose.Types.ObjectId(),
    fullName: "Emily Davis",
    email: "emily.davis@example.com",
    phone: "+1234567892",
    birthDate: new Date("2005-03-15"),
    gender: "Female",
    address: "789 Pine Rd, Dallas, TX 75201",
    occupation: "High School Student",
    emergencyContactName: "Robert Davis",
    emergencyContactNumber: "+1234567952",
    primaryPhysician: "Dr. Amanda Wilson",
    insuranceProvider: "Cigna",
    insurancePolicyNumber: "CI456789123",
    allergies: "Penicillin",
    currentMedication: "Albuterol inhaler",
    familyMedicalHistory: "Mother has asthma",
    pastMedicalHistory: "Asthma diagnosis at age 6",
    identificationType: "School ID",
    identificationNumber: "SCH2005315",
    identificationDocument: {
      fileName: "emily_school_id.pdf",
      fileUrl: "https://storage.example.com/documents/emily_school_id.pdf",
    },
    consents: {
      treatmentConsent: true,
      disclosureConsent: true,
      privacyConsent: true,
    },
  },
  {
    _id: new mongoose.Types.ObjectId("60c72b2f9b1d8c001c8e4f1d"),
    user: new mongoose.Types.ObjectId(),
    fullName: "James Wilson",
    email: "james.wilson@example.com",
    phone: "+1234567893",
    birthDate: new Date("1985-07-22"),
    gender: "Male",
    address: "321 Elm St, Phoenix, AZ 85001",
    occupation: "Marketing Manager",
    emergencyContactName: "Patricia Wilson",
    emergencyContactNumber: "+1234567953",
    primaryPhysician: "Dr. Kevin Anderson",
    insuranceProvider: "United Healthcare",
    insurancePolicyNumber: "UH789123456",
    allergies: "Cats, Dust mites",
    currentMedication: "Claritin daily",
    familyMedicalHistory: "Uncle had cancer",
    pastMedicalHistory: "Knee surgery in 2015",
    identificationType: "Passport",
    identificationNumber: "PP85072201",
    identificationDocument: {
      fileName: "james_passport.pdf",
      fileUrl: "https://storage.example.com/documents/james_passport.pdf",
    },
    consents: {
      treatmentConsent: true,
      disclosureConsent: true,
      privacyConsent: false,
    },
  },
  {
    _id: new mongoose.Types.ObjectId("60c72b2f9b1d8c001c8e4f1e"),
    user: new mongoose.Types.ObjectId(),
    fullName: "Olivia Brown",
    email: "olivia.brown@example.com",
    phone: "+1234567894",
    birthDate: new Date("1993-09-12"),
    gender: "Female",
    address: "654 Maple Dr, Miami, FL 33101",
    occupation: "Nurse",
    emergencyContactName: "David Brown",
    emergencyContactNumber: "+1234567954",
    primaryPhysician: "Dr. Sarah Martinez",
    insuranceProvider: "Humana",
    insurancePolicyNumber: "HU321654987",
    allergies: "Latex",
    currentMedication: "Birth control pills",
    familyMedicalHistory: "Sister has thyroid issues",
    pastMedicalHistory: "Wisdom teeth removal",
    identificationType: "Driver's License",
    identificationNumber: "DL93091201",
    identificationDocument: {
      fileName: "olivia_drivers_license.pdf",
      fileUrl: "https://storage.example.com/documents/olivia_drivers_license.pdf",
    },
  },
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