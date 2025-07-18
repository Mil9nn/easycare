import { useAppointmentStore } from "@/hooks/useAppointmentStore";
import { Loader, X } from "lucide-react";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useAdminStore } from "@/hooks/useAdminStore";

const PatientDialogue = () => {
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
    <div className="grid grid-cols-3 gap-4 py-2">
      <h3 className="col-span-1 text-sm font-medium text-gray-500">
        {title}
      </h3>
      <p className="col-span-2 text-sm text-gray-800">
        {content || <span className="text-gray-400">Not provided</span>}
      </p>
    </div>
  );

  const patient = appointment?.patient;
  const isLoading = useAppointmentStore((state) => state.isLoading);
  const { menuOpen, setMenuOpen } = useAdminStore();

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl p-6 w-full max-w-md text-center">
          <Loader className="animate-spin h-8 w-8 text-blue-500 mx-auto mb-4" />
          <p className="text-gray-600 font-medium">Loading patient details...</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`fixed inset-0 bg-opacity-50 flex items-center justify-center z-50 transition-opacity ${
        menuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">{patient?.fullName}</h2>
            <p className="text-xs text-gray-500">Patient ID: {patientId}</p>
          </div>
          <button
            onClick={() => setMenuOpen(false)}
            className="text-gray-400 hover:text-gray-500 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Medical Section */}
          <section>
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
              Medical Information
            </h3>
            <div className="space-y-3">
              <CustomField title="Allergies" content={patient?.allergies} />
              <CustomField 
                title="Current Medication" 
                content={patient?.currentMedication} 
              />
              <CustomField 
                title="Past Medical History" 
                content={patient?.pastMedicalHistory} 
              />
              <CustomField
                title="Family History"
                content={patient?.familyMedicalHistory || "None recorded"}
              />
              <CustomField title="Gender" content={patient?.gender} />
            </div>
          </section>

          {/* Divider */}
          <div className="border-t border-gray-100"></div>

          {/* Quick Actions */}
          <div className="flex justify-center">
            <Link 
              to={`/admin/dashboard/patient/${patientId}/page`}
              className="text-sm font-medium text-blue-600 hover:text-blue-500 transition-colors"
            >
              View full patient profile →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDialogue;