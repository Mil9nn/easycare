import CustomProfileCard from "@/components/CustomProfileCard";
import { useFormStore } from "@/components/hooks/useFormStore";
import { FormFieldType } from "@/lib/validation";
import {
  Calendar,
  Mail,
  MapPin,
  Phone,
  Siren,
  User,
  UserCircle,
  VenusAndMars,
} from "lucide-react";

const ProfilePage = () => {
  const { patientData, updatePatientData } = useFormStore();

  // ✅ Reusable inline save function
  const handleInlineSave = (field: string) => (val: string) => {
    if (!patientData?._id) return;
    updatePatientData(patientData._id, { [field]: val });
  };

  return (
    <div className="profile-page">
      <h2 className="heading-secondary">Your medical profile</h2>
      <p className="text-primary-text">
        This is the personal and medical information you provided. Keep it up to
        date for faster and safer appointments.
      </p>

      <div className="grid grid-cols-1 gap-4">
        <CustomProfileCard
          title="Personal Information"
          icon={UserCircle}
          fields={[
            {
              name: "fullName",
              label: "Name:",
              value: patientData?.fullName,
              icon: User,
              fieldType: FormFieldType.INPUT,
              onSave: handleInlineSave("fullName"),
            },
            {
              name: "email",
              label: "Email:",
              value: patientData?.email,
              icon: Mail,
              fieldType: FormFieldType.INPUT,
              inputType: "email",
              onSave: handleInlineSave("email"),
            },
            {
              name: "birthDate",
              label: "Date of Birth:",
              value: patientData?.birthDate,
              icon: Calendar,
              fieldType: FormFieldType.DATE_PICKER,
              onSave: handleInlineSave("birthDate"),
            },
            {
              name: "gender",
              label: "Gender",
              value: patientData?.gender,
              icon: VenusAndMars,
              fieldType: FormFieldType.SKELETON,
              onSave: handleInlineSave("gender"),
            },
            {
              name: "phone",
              label: "Phone:",
              value: patientData?.phone,
              icon: Phone,
              fieldType: FormFieldType.INPUT,
              inputType: 'tel',
              onSave: handleInlineSave("phone"),
            },
            {
              name: "address",
              label: "Address:",
              value: patientData?.address,
              icon: MapPin,
              fieldType: FormFieldType.INPUT,
              onSave: handleInlineSave("address"),
            },
          ]}
        />

        <CustomProfileCard
          title="Medical Information"
          fields={[
            {
              name: "allergies",
              label: "Allergies:",
              value: patientData?.allergies,
              icon: User,
              colorClass: "text-green-500",
              fieldType: FormFieldType.INPUT,
              onSave: handleInlineSave("allergies"),
            },
            {
              name: "pastMedicalHistory",
              label: "Past Medical History:",
              value: patientData?.pastMedicalHistory,
              icon: User,
              colorClass: "text-purple-500",
              fieldType: FormFieldType.INPUT,
              onSave: handleInlineSave("pastMedicalHistory"),
            },
            {
              name: "currentMedication",
              label: "Medications:",
              value: patientData?.currentMedication,
              icon: User,
              colorClass: "text-pink-500",
              fieldType: FormFieldType.INPUT,
              onSave: handleInlineSave("currentMedication"),
            },
            {
              name: "familyMedicalHistory",
              label: "Family History:",
              value: patientData?.familyMedicalHistory,
              icon: User,
              colorClass: "text-teal-500",
              fieldType: FormFieldType.INPUT,
              onSave: handleInlineSave("familyMedicalHistory"),
            },
            {
              name: "insuranceProvider",
              label: "Insurance Provider:",
              value: patientData?.insuranceProvider,
              icon: User,
              colorClass: "text-teal-500",
              fieldType: FormFieldType.INPUT,
              onSave: handleInlineSave("insuranceProvider"),
            },
            {
              name: "insurancePolicyNumber",
              label: "Insurance Policy Number:",
              value: patientData?.insurancePolicyNumber,
              icon: User,
              colorClass: "text-teal-500",
              fieldType: FormFieldType.INPUT,
              onSave: handleInlineSave("insurancePolicyNumber"),
            },
          ]}
        />

        <CustomProfileCard
          title="Emergency Contact"
          icon={Siren}
          fields={[
            {
              name: "emergencyContactName",
              label: "Name:",
              value: patientData?.emergencyContactName,
              icon: User,
              colorClass: "text-blue-500",
              fieldType: FormFieldType.INPUT,
              onSave: handleInlineSave("emergencyContactName"),
            },
            {
              name: "emergencyContactNumber",
              label: "Contact:",
              value: patientData?.emergencyContactNumber,
              icon: Phone,
              colorClass: "text-green-500",
              fieldType: FormFieldType.INPUT,
              onSave: handleInlineSave("emergencyContactNumber"),
            },
          ]}
        />
      </div>
    </div>
  );
};

export default ProfilePage;
