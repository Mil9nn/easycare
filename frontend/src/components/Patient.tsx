import { useAppointmentStore } from "@/hooks/useAppointmentStore";
import type { PatientFormData } from "@/lib/validation";
import { Loader } from "lucide-react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

type FullPatient = PatientFormData & {
    identificationDocument?: {
      fileUrl: string;
      fileName: string;
    };
  }

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
    className?: string;
    content?: string | null;
  };

  const CustomField = ({ title, content, className = "" }: CustomFieldProps) => (
    <div className={`mb-5 last:mb-0 ${className}`}>
      <h3 className="text-md font-medium text-gray-500 mb-1">{title}</h3>
      <p className="text-lg font-light text-gray-800">
        {content || <span className="text-gray-400">Not Provided</span>}
      </p>
    </div>
  );

  const patient = appointment?.patient as unknown as FullPatient;
  const isLoading = useAppointmentStore((state) => state.isLoading);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen space-y-4">
        <Loader className="animate-spin h-8 w-8 text-blue-500" />
        <span className="text-gray-600 font-light">Loading patient details...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-4 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded shadow-sm overflow-hidden">
          {/* Header */}
          <div className="bg-emerald-50 px-6 py-8 border-b border-emerald-200">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-3xl font-light text-gray-900 mb-1">{patient?.fullName}</h1>
                <p className="text-blue-600 font-medium">Patient ID: {patientId}</p>
              </div>
              <div className="mt-4 sm:mt-0">
                <span className="inline-block bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full uppercase font-semibold tracking-wide">
                  Patient
                </span>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-6">
            {/* Personal Information */}
            <section className="bg-gray-50 p-6 rounded-xl">
              <h2 className="text-xl font-semibold text-gray-700 mb-6 pb-2 border-b border-gray-200">
                Personal Information
              </h2>
              <CustomField title="Full Name" content={patient?.fullName} />
              <CustomField title="Email" content={patient?.email} />
              <CustomField title="Phone" content={patient?.phone} />
              <CustomField title="Birth Date" content={patient?.birthDate.toLocaleString()} />
              <CustomField title="Address" content={patient?.address} />
              <CustomField title="Gender" content={patient?.gender} />
            </section>

            {/* Medical Information */}
            <section className="bg-gray-50 p-6 rounded-xl">
              <h2 className="text-xl font-semibold text-gray-700 mb-6 pb-2 border-b border-gray-200">
                Medical Information
              </h2>
              <CustomField title="Allergies" content={patient?.allergies} />
              <CustomField 
                title="Current Medication" 
                content={patient?.currentMedication} 
                className={!patient?.currentMedication ? "text-gray-400" : ""}
              />
              <CustomField 
                title="Past Medical History" 
                content={patient?.pastMedicalHistory} 
              />
              <CustomField
                title="Family Medical History"
                content={patient?.familyMedicalHistory || "No medical history available"}
              />
            </section>

            {/* Insurance & Emergency */}
            <section className="bg-gray-50 p-6 rounded-xl">
              <h2 className="text-xl font-semibold text-gray-700 mb-6 pb-2 border-b border-gray-200">
                Insurance & Emergency
              </h2>
              <CustomField 
                title="Emergency Contact" 
                content={`${patient?.emergencyContactName} (${patient?.emergencyContactNumber})`} 
              />
              <CustomField title="Insurance Provider" content={patient?.insuranceProvider} />
              <CustomField title="Policy Number" content={patient?.insurancePolicyNumber} />
            </section>

            {/* Showing the identify document patient shared with the clinic */}
            <section className="bg-gray-50 p-6 rounded-xl col-span-full">
              <h2 className="text-xl font-semibold text-gray-700 mb-6 pb-2 border-b border-gray-200">
                Identification Document
              </h2>
              {/* identification type */}
              <CustomField title="ID Type" content={patient?.identificationType} />
              {patient?.identificationDocument ? (
                <div className="flex items-center justify-center">
                  <img
                    src={patient.identificationDocument.fileUrl}
                    alt="Patient Identification Document"
                    className="max-w-full h-auto rounded-lg shadow-md"
                  />
                </div>
              ) : (
                <p className="text-gray-400">No identification document provided.</p>
              )}
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Patient;