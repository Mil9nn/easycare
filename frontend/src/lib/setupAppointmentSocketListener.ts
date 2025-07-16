import { socket } from "@/lib/socket";
import { useAppointmentStore } from "@/hooks/useAppointmentStore";
import type { Appointment } from "@/types/types";
import { useAdminStore } from "@/hooks/useAdminStore";

export const setupAppointmentSocketListeners = () => {
  console.log("Setting up appointment socket listeners");

  socket.on("new-appointment", (appointment: Appointment) => {
    console.log("✅ Received new-appointment in listener", appointment);
    const current = useAppointmentStore.getState().appointments;

    // Prevent duplicate by checking ID
    const exists = current.some((a) => a._id === appointment._id);
    if (exists) return; // ✅ skip if already present

    const updated = [appointment, ...current];

    useAppointmentStore.setState({ appointments: updated });
  });

  socket.on("appointment-updated", (updated: Appointment) => {
    const state = useAppointmentStore.getState();
    useAppointmentStore.setState({
      appointments: state.appointments.map((a) =>
        a._id === updated._id ? updated : a
      ),
      appointment:
        state.appointment?._id === updated._id ? updated : state.appointment,
    });
  });

  socket.on("appointment-stats", (stats) => {
    useAdminStore.setState({ dashboardData: stats });
  });

  socket.on("weekly-appointments", (weekly) => {
    useAdminStore.setState({ weeklyAppointments: weekly });
  });

  socket.on("patients-by-age-group", (groups) => {
    useAdminStore.setState({ patientStats: groups });
  });

  (socket as any).hasListeners = true;
};
