export type User = {
  _id: string;
  fullName: string;
  email: string;
}

export interface Patient {
  _id: string;
  userId: string;
  fullName: string;
  email: string;
  phone: string;
  birthDate: Date;
  gender: Gender;
  address: string;
  occupation: string;
  emergencyContactName: string;
  emergencyContactNumber: string;
  primaryPhysician: string;
  insuranceProvider: string;
  insurancePolicyNumber: string;
  allergies: string | undefined;
  currentMedication: string | undefined;
  familyMedicalHistory: string | undefined;
  pastMedicalHistory: string | undefined;
  identificationType: string | undefined;
  identificationNumber: string | undefined;
  identificationDocument: FormData | undefined;
  privacyConsent: boolean;
}

export interface Appointment {
  _id?: string;
  patient: Patient;
  schedule: Date;
  status: Status;
  primaryPhysician: string;
  reason: string;
  note: string;
  userId: string;
  cancellationReason?: string | null;
}

export type PatientStats = {
  _id: string;
  count: number;
}
export type PatientStatsArray = PatientStats[];

export type DashboardData = {
  totalPatients: number;
  scheduled: number;
  cancelled: number;
  pending: number;
}

export type WeeklyAppointmentsData = {
  _id: string;
  count: number;
}
export type WeeklyAppointments = WeeklyAppointmentsData[];