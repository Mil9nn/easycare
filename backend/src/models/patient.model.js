import mongoose from 'mongoose'

const patientSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
  fullName: String,
  email: String,
  phone: String,
  birthDate: Date,
  gender: String,
  address: String,
  occupation: String,
  emergencyContactName: String,
  emergencyContactNumber: String,
  primaryPhysician: String,
  insuranceProvider: String,
  insurancePolicyNumber: String,
  allergies: String,
  currentMedication: String,
  familyMedicalHistory: String,
  pastMedicalHistory: String,
  identificationType: String,
  identificationNumber: String,
  identificationDocument: {
    fileName: String,
    fileUrl: String,
  },
  consents: {
    treatmentConsent: Boolean,
    disclosureConsent: Boolean,
    privacyConsent: Boolean,
  },
}, { timestamps: true });

export const Patient = mongoose.model("Patient", patientSchema);
