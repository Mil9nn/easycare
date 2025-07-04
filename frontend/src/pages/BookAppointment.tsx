import { AppointmentForm } from "@/components/form/AppointmentForm";
import { useAuthStore } from "@/hooks/useAuthStore";
import { useFormStore } from "@/hooks/useFormStore";
import { Loader } from "lucide-react";

const BookAppointment = () => {
  const { user } = useAuthStore();
  const { patient, isLoadingPatient } = useFormStore();


  if (isLoadingPatient) {
    return (
      <div className="bg-primary flex flex-col items-center justify-center h-screen w-screen text-center px-4">
        <Loader className="w-6 h-6 text-accent animate-spin mb-3" />
        <h2 className="text-lg font-medium text-muted-foreground">
          Fetching your medical profile...
        </h2>
        <p className="text-sm text-gray-500 max-w-md mt-2">
          We’re securely retrieving your health records and preferences. This
          helps speed up appointment bookings and ensures personalized care.
        </p>
      </div>
    );
  }

  if (!patient) {
    return (
      <div className="bg-primary flex flex-col items-center justify-center h-screen w-screen text-center px-4">
        <h2 className="text-lg font-medium text-muted-foreground">
          Patient not found
        </h2>
        <p className="text-sm text-gray-500 max-w-md mt-2">
          Unable to load patient data. Please check the URL or try again.
        </p>
      </div>
    );
  }


  return (
    <div className="signup-page">
      <AppointmentForm
        userId={user?._id || ""}
        patientId={patient?._id}
        type="create"
      />
    </div>
  );
};

export default BookAppointment;
