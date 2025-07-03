import { Doctors } from "@/components/form/constants";
import { Button } from "@/components/ui/button";
import { useAppointmentStore } from "@/hooks/useAppoiontmentStore";
import { formatDateTime } from "@/lib/utils";
import { useEffect } from "react";

import { useParams } from 'react-router-dom'

const SuccessPage = () => {
    const { appointmentId } = useParams<{ appointmentId: string }>();
  const { getAppointment, appointment } = useAppointmentStore();

  useEffect(() => {
    if(appointmentId) {
        getAppointment(appointmentId);
    }
  }, [appointmentId, getAppointment]);

  const doctor = Doctors.find(
    (doc) => doc.name === appointment?.primaryPhysician
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
          <h2 className="header mb-6 max-w-[600px] text-center">
            Your <span className="text-green-500">appointment request</span> has
            been successfully submitted!
          </h2>
          <p>We&apos;ll be in touch shortly to confirm.</p>
        </section>

        <section className="request-details">
          <p>Requested appointment details: </p>
          <div className="flex items-center gap-1">
            <img
              src={doctor?.image || "/assets/icons/doctor.svg"}
              alt={doctor?.name || "Doctor"}
              width={25}
              height={25}
            />
            <p className="text-sm font-semibold whitespace-nowrap">Dr. {doctor?.name}</p>
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
              {formatDateTime(appointment?.schedule).dateTime}
            </p>
          </div>
        </section>

        {/* <Button variant="outline" className="shad-primary-btn" asChild>
          <Link to={`/patients/${userId}/new-appointment`}>
            New Appointment
          </Link>
        </Button> */}

        <p className="copyright">© 2024 EasyCare</p>
      </div>
    </div>
  );
};

export default SuccessPage;
