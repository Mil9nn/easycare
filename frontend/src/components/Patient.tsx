import { useAppointmentStore } from "@/hooks/useAppointmentStore";
import type { PatientFormData } from "@/lib/validation";
import { Loader, FileDown } from "lucide-react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

type FullPatient = PatientFormData & {
  identificationDocument?: {
    fileUrl: string;
    fileName: string;
  };
};

const Patient = () => {
  const { patientId } = useParams<{ patientId: string }>();
  const appointment = useAppointmentStore((state) => state.appointment);
  const getAppointment = useAppointmentStore((state) => state.getAppointment);
  const isLoading = useAppointmentStore((state) => state.isLoading);

  useEffect(() => {
    if (patientId) getAppointment(patientId);
  }, [getAppointment, patientId]);

  const patient = appointment?.patient as unknown as FullPatient;

  const Field = ({ label, value }: { label: string; value?: string | null }) => (
    <div className="flex flex-col gap-1">
      <span className="text-sm text-gray-500 font-medium">{label}</span>
      <span className="text-base text-gray-800 font-light">
        {value || <span className="text-gray-400">Not provided</span>}
      </span>
    </div>
  );

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen space-y-3">
        <Loader className="animate-spin h-6 w-6 text-teal-500" />
        <p className="text-gray-500 text-sm">Loading patient details...</p>
      </div>
    );
  }

  if (!patient)
    return (
      <div className="text-center text-gray-500 py-40 text-sm">
        No patient data found.
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 p-2">
      <div className="max-w-6xl mx-auto bg-white rounded-xl border border-gray-200 shadow-sm p-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-gray-100 pb-6 mb-8">
          <div>
            <h1 className="text-3xl font-semibold text-gray-800">
              {patient.fullName}
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Patient ID:{" "}
              <span className="font-mono text-gray-700">{patientId}</span>
            </p>
          </div>
          <span className="inline-flex items-center gap-2 mt-4 sm:mt-0 text-sm font-medium bg-teal-50 text-teal-700 border border-teal-100 px-3 py-1 rounded-full">
            Patient Profile
          </span>
        </div>

        {/* Information Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {/* Personal Info */}
          <section>
            <h2 className="text-lg font-semibold text-gray-700 mb-4">
              Personal Information
            </h2>
            <div className="space-y-4">
              <Field label="Full Name" value={patient.fullName} />
              <Field label="Email" value={patient.email} />
              <Field label="Phone" value={patient.phone} />
              <Field label="Birth Date" value={patient.birthDate?.toLocaleString()} />
              <Field label="Address" value={patient.address} />
              <Field label="Gender" value={patient.gender} />
            </div>
          </section>

          {/* Medical Info */}
          <section>
            <h2 className="text-lg font-semibold text-gray-700 mb-4">
              Medical Information
            </h2>
            <div className="space-y-4">
              <Field label="Allergies" value={patient.allergies} />
              <Field label="Current Medication" value={patient.currentMedication} />
              <Field label="Past Medical History" value={patient.pastMedicalHistory} />
              <Field
                label="Family Medical History"
                value={patient.familyMedicalHistory}
              />
            </div>
          </section>

          {/* Insurance Info */}
          <section>
            <h2 className="text-lg font-semibold text-gray-700 mb-4">
              Insurance & Emergency
            </h2>
            <div className="space-y-4">
              <Field
                label="Emergency Contact"
                value={
                  patient.emergencyContactName
                    ? `${patient.emergencyContactName} (${patient.emergencyContactNumber})`
                    : ""
                }
              />
              <Field label="Insurance Provider" value={patient.insuranceProvider} />
              <Field label="Policy Number" value={patient.insurancePolicyNumber} />
            </div>
          </section>

          {/* ID Document */}
          <section className="col-span-full">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">
              Identification Document
            </h2>
            <div className="space-y-4">
              <Field label="ID Type" value={patient.identificationType} />
              {patient.identificationDocument ? (
                <div className="flex flex-col items-start gap-3 mt-4 overflow-x-auto">
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 w-full sm:w-auto">
                    <img
                      src={patient.identificationDocument.fileUrl}
                      alt="Patient ID"
                      className="max-w-xs rounded-md shadow-sm border border-gray-100"
                    />
                  </div>
                  <a
                    href={patient.identificationDocument.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-teal-600 hover:text-teal-700 font-medium transition"
                  >
                    <FileDown size={16} /> Download {patient.identificationDocument.fileName}
                  </a>
                </div>
              ) : (
                <p className="text-gray-400 text-sm">
                  No identification document provided.
                </p>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Patient;
