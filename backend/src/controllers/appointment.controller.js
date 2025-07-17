import { Appointment } from "../models/appointment.model.js";
import { io } from '../lib/socket.js';
import { emitAppointmentStats, emitPatientsByAgeGroup, emitWeeklyAppointments } from "../helpers/emitStats.js";
import { sendAppointmentEmail } from "../lib/nodemailer.js";

export const createAppointment = async (req, res) => {
  try {
    const appointment = new Appointment(req.body);
    const saved = await appointment.save();

    // Populate patient after saving
    const populatedAppointment = (await saved.populate('patient'));
    io.emit("new-appointment", populatedAppointment);

    await sendAppointmentEmail({
      fullName: populatedAppointment.patient.fullName,
      email: populatedAppointment.patient.email,
      primaryPhysician: populatedAppointment.primaryPhysician,
      schedule: populatedAppointment.schedule,
      reason: populatedAppointment.reason,
      note: populatedAppointment.note,
    })

    res.status(201).json(populatedAppointment);

    await emitAppointmentStats();
    await emitWeeklyAppointments();
    await emitPatientsByAgeGroup();
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

export const getAllAppointmentsByPatient = async (req, res) => {
  try {
    // All i need is schedule, primaryPhysician, status and reason.
    const appointment = await Appointment.find({ patient: req.params.id}).select('schedule primaryPhysician status reason').sort({ createdAt: -1 });
    if (!appointment || appointment.length === 0) {
      return res.status(404).json({ message: "No appointments found for this patient" });
    }
    res.status(200).json(appointment);
  } catch (error) {
    console.error("Error fetching appointments by patient:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export const getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find().populate('patient').sort({ createdAt: -1 });
    if (!appointments || appointments.length === 0) {
      return res.status(404).json({ message: "No appointments found" });
    }
    res.status(200).json(appointments);
  } catch (error) {
    console.error("Error fetching appointments:", error);
    return res.status(500).json({ message: "Failed to fetch appointments" });
  }
}
