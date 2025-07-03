import Appointment from '../models/appointment.model.js';

export const createAppointment = async (req, res) => {
  try {
    const appointment = new Appointment(req.body);
    const saved = await appointment.save();
    res.status(201).json(saved);
  } catch (error) {
    console.error("Error creating appointment:", error);
    res.status(500).json({ message: "Failed to create appointment" });
  }
};

export const updateAppointment = async (req, res) => {
  const { appointmentId, appointment, type } = req.body;
  try {
    const updated = await Appointment.findByIdAndUpdate(
      appointmentId,
      {
        ...appointment,
        status:
          type === "cancel" ? "cancelled" :
          type === "schedule" ? "scheduled" :
          undefined
      },
      { new: true }
    );
    res.status(200).json(updated);
  } catch (error) {
    console.error("Error updating appointment:", error);
    res.status(500).json({ message: "Failed to update appointment" });
  }
};

export const getAppointmentById = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id).populate('patient');
    if (!appointment) return res.status(404).json({ message: "Not found" });
    res.status(200).json(appointment);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch appointment" });
  }
};
