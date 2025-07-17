import { useAppointmentStore } from "@/hooks/useAppointmentStore";
import { Loader, X } from "lucide-react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAdminStore } from "@/hooks/useAdminStore";



const Patient = () => {
  const { patientId } = useParams<{ patientId: string }>();

  const appointment = useAppointmentStore((state) => state.appointment);
  const getAppointment = useAppointmentStore((state) => state.getAppointment);

  useEffect(() => {
    if (patientId) {
      getAppointment(patientId);
    }
  }, [getAppointment, patientId]);

  type CustomFieldProps = {
    title: string;
    content: string | number | undefined;
  };

  const CustomField = ({ title, content }: CustomFieldProps) => (
    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
      <h3 className="font-medium text-sm sm:text-base text-gray-700">
        {title}
      </h3>
      <p className="text-sm text-gray-600">{content || "Not Provided"}</p>
    </div>
  );

  const patient = appointment?.patient;
  const isLoading = useAppointmentStore((state) => state.isLoading);

  const menuOpen = useAdminStore((state) => state.menuOpen);
  const setMenuOpen = useAdminStore((state) => state.setMenuOpen);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader className="animate-spin text-gray-500" size={24} />
        <span className="ml-2 text-gray-500">please hold on...</span>
      </div>
    )
  }

  return (
    <div
      className={`patient-details fixed top-0 right-0 z-50 remove-scrollbar ${
        menuOpen ? "translate-x-0" : "translate-x-full"
      } transition-transform duration-300`}
    >
      <div className="space-y-6 py-5 sm:px-5 max-w-4xl mx-auto">
        <div className="toggleBar">
          <X
            onClick={() => setMenuOpen(false)}
            className="hover:scale-105 active:scale-95 cursor-pointer text-rose-500 transition-transform ease-in-out duration:400"
          />
        </div>
        <header className="space-y-2">
          <h1 className="text-xl font-bold text-primary-text tracking-wide">Patient Details</h1>
          <p className="text-sm text-gray-500">
            Patient details, including personal information and medical history
          </p>
        </header>

        <section className="space-y-4">
          <CustomField title="Full Name:" content={patient?.fullName} />
          <CustomField title="Email:" content={patient?.email} />
          <CustomField title="Phone:" content={patient?.phone} />
          {/* <CustomField title="Birth Date:" content={patient?.birthDate} /> */}
          <CustomField title="Address:" content={patient?.address} />
        </section>

        <div className="h-0.5 w-full bg-gray-200 rounded-full" />

        <section className="space-y-4">
          <CustomField title="Allergies:" content={patient?.allergies} />
          <CustomField
            title="Current Medication:"
            content={patient?.currentMedication}
          />
          <CustomField
            title="Past Medical History:"
            content={patient?.pastMedicalHistory}
          />
          <CustomField
            title="Family Medical History:"
            content={
              patient?.familyMedicalHistory || "No medical history available."
            }
          />
          <CustomField title="Gender:" content={patient?.gender} />
        </section>

        <div className="h-0.5 w-full bg-gray-200 rounded-full" />

        <section className="space-y-4">
          <CustomField
            title="Emergency Contact Name:"
            content={patient?.emergencyContactName}
          />
          <CustomField
            title="Emergency Contact Number:"
            content={patient?.emergencyContactNumber}
          />
          <CustomField
            title="Insurance Provider:"
            content={patient?.insuranceProvider}
          />
          <CustomField
            title="Insurance Policy Number:"
            content={patient?.insurancePolicyNumber}
          />
          <CustomField
            title="Identification Type:"
            content={patient?.identificationType}
          />
          {/* <CustomField title="Identification Document:" content={patient?.identificationDocument} /> */}
        </section>
      </div>
    </div>
  );
};

export default Patient;
