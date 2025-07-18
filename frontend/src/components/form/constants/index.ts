import {
  HeartPulse,
  Droplet,
  Stethoscope,
  Brain,
  ShieldCheck,
  Baby,
  HelpCircle,
  Venus,
} from "lucide-react";


export const GenderOptions = ["male", "female", "other"];

export const PatientFormDefaultValues = {
  name: "",
  email: "",
  phone: "",
  birthDate: new Date(Date.now()),

  gender: "male" as Gender,
  address: "",
  occupation: "",
  emergencyContactName: "",

  emergencyContactNumber: "",
  insuranceProvider: "",
  insurancePolicyNumber: "",

  allergies: "",
  currentMedication: "",
  familyMedicalHistory: "",
  pastMedicalHistory: "",

  identificationType: "Birth Certificate",
  identificationNumber: "",
  identificationDocument: [],

  treatmentConsent: false,
  disclosureConsent: false,
  privacyConsent: false,
};

export const IdentificationTypes = [
  "Birth Certificate",
  "Driver's License",
  "Medical Insurance Card/Policy",
  "Military ID Card",
  "National Identity Card",
  "Passport",
  "Resident Alien Card (Green Card)",
  "Social Security Card",
  "State ID Card",
  "Student ID Card",
  "Voter ID Card",
];

export const Specializations = [
  {
    name: "Gastroenterology",
    value: "gastroenterology",
    icon: HeartPulse,
    textColor: "text-red-600",
    bgColor: "bg-red-100",
  },
  {
    name: "Dermatology",
    value: "dermatology",
    icon: Droplet,
    textColor: "text-pink-600",
    bgColor: "bg-pink-100",
  },
  {
    name: "General Physician",
    value: "general_physician",
    icon: Stethoscope,
    textColor: "text-slate-700",
    bgColor: "bg-slate-100",
  },
  {
    name: "Gynecology",
    value: "gynecology",
    icon: Venus,
    textColor: "text-rose-600",
    bgColor: "bg-rose-100",
  },
  {
    name: "Neurology",
    value: "neurology",
    icon: Brain,
    textColor: "text-indigo-600",
    bgColor: "bg-indigo-100",
  },
  {
    name: "Pediatrics",
    value: "pediatrics",
    icon: Baby,
    textColor: "text-cyan-600",
    bgColor: "bg-cyan-100",
  },
  {
    name: "Other",
    value: "other",
    icon: HelpCircle,
    textColor: "text-gray-500",
    bgColor: "bg-gray-100",
  },
  {
    name: "All",
    value: "all",
    icon: ShieldCheck,
    textColor: "text-orange-600",
    bgColor: "bg-orange-100",
  },
];

export const availableDays = [ "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun" ];

export const StatusIcon = {
  scheduled: "/assets/icons/check.svg",
  pending: "/assets/icons/pending.svg",
  cancelled: "/assets/icons/cancelled.svg",
};