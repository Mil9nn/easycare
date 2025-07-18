import { useAppointmentStore } from "@/hooks/useAppointmentStore";
import { formatDateTime } from "@/lib/utils";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import StatusBadge from "./StatusBadge";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";

const AppointmentHistory = () => {
  const { patientId } = useParams();

  const getAllAppointmentsByPatient = useAppointmentStore(
    (state) => state.getAllAppointmentsByPatient
  );
  const patientAppointments = useAppointmentStore(
    (state) => state.patientAppointments
  );

  useEffect(() => {
    getAllAppointmentsByPatient(patientId || "");
  }, [getAllAppointmentsByPatient, patientId]);

  return (
    <div className="p-5 w-full">
      <header className="space-y-2 max-w-5xl mx-auto">
        <h2 className="text-2xl font-semibold">Appointment History</h2>
        <p className="text-sm text-gray-500">
          Here you can view all your past and upcoming appointments.
        </p>
      </header>
      <ScrollArea className="w-full overflow-x-auto">
      <div className="space-y-2 p-2 min-w-[800px]">
        {patientAppointments.length > 0 ? (
          patientAppointments.map((appointment, index) => (
            <div key={appointment._id} className="appointment-item">
              <p className="text-xs w-2">{index + 1}</p>
              <p className="text-xs">
                {formatDateTime(appointment.schedule).dateTime}
              </p>
              <p className="text-xs">{appointment.primaryPhysician}</p>
              <StatusBadge
                status={appointment.status}
                className="w-fit shadow-md"
              />
              <p className="text-xs">{appointment.reason}</p>
            </div>
          ))
        ) : (
          <p>No appointments found for this patient.</p>
        )}
      </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
};

export default AppointmentHistory;
