import { useAdminStore } from "@/hooks/useAdminStore";
import { useAppointmentStore } from "@/hooks/useAppointmentStore";
import { formatDateTime } from "@/lib/utils";
import { useEffect } from "react";

import { useParams } from "react-router-dom";

const SuccessPage = () => {
  const { appointmentId } = useParams<{ appointmentId: string }>();

  const getAppointment = useAppointmentStore((state) => state.getAppointment);
  const appointment = useAppointmentStore((state) => state.appointment);

  const doctors = useAdminStore((state) => state.doctors);

  useEffect(() => {
    if (appointmentId) {
      getAppointment(appointmentId);
    }
  }, [appointmentId, getAppointment]);

  const doctor = doctors?.find(
    (doc) => doc.fullName === appointment?.primaryPhysician
  );

  return (
    <div className="h-full w-full flex items-center justify-center">
      <div className="success-img space-y-3">
        <section className="flex flex-col items-center">
          <img
            src="/assets/gifs/success.gif"
            height={300}
            width={300}
            alt="success"
          />
          <h2>
            Your <span className="text-green-500">appointment request</span> has
            been successfully submitted!
          </h2>
          <p>
            Admin will review and confirm your appointment soon. You'll receive
            an email notification.
          </p>
        </section>

        <section className="request-details">
          <p>Requested appointment details: </p>
          <div className="flex items-center gap-1">
            <img
              src={
                Array.isArray(doctor?.profileImage)
                  ? URL.createObjectURL(doctor.profileImage[0])
                  : doctor?.profileImage
              }
              alt={doctor?.fullName || "Doctor"}
              width={25}
              height={25}
            />
            <p className="text-sm font-semibold whitespace-nowrap">
              {doctor?.fullName}
            </p>
          </div>
          <div className="flex items-center gap-1">
            <img
              src="/assets/icons/calendar.svg"
              height={24}
              width={24}
              alt="calendar"
            />
            <p className="text-sm font-semibold">
              {" "}
              {appointment?.schedule
                ? formatDateTime(appointment?.schedule).dateTime
                : ""}
            </p>
          </div>
        </section>

        {/* <Button variant="outline" className="shad-primary-btn" asChild>
          <Link to={`/patients/${userId}/new-appointment`}>
            New Appointment
          </Link>
        </Button> */}

        <p className="copyright">© 2025 EasyCare</p>
      </div>
    </div>
  );
};

export default SuccessPage;
