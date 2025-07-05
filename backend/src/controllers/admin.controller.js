import { generateAdminTokenAndSetCookie } from "../lib/jwt.js";
import { Appointment } from "../models/appointment.model.js";
import moment from "moment";
import { Patient } from "../models/patient.model.js";

export const verifyAdminOtp = async (req, res) => {
  try {
    const { otp } = req.body;
    const ADMIN_OTP = process.env.ADMIN_SECRET_OTP;

    if (otp === ADMIN_OTP) {
      generateAdminTokenAndSetCookie(res);
      return res.status(200).json({ message: "Admin OTP verified successfully", success: true });
    } else {
      return res.status(401).json({ message: "Invalid OTP" });
    }
  } catch (error) {
    console.error("Error verifying admin OTP:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export const logoutAdmin = (req, res) => {
  console.log("Admin logout request received");
  try {
    res.cookie("admin_jwt", "", {
      maxAge: 0,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Strict'
    })
    return res.status(200).json({ message: "Admin logged out successfully" });
  } catch (error) {
    console.error("Error logging out admin:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export const checkAdmin = (req, res) => {
  try {
    const adminToken = req.cookies.admin_jwt;
    if (!adminToken) {
      return res.status(401).json({ message: "Admin not authenticated" });
    }
    return res.status(200).json({ message: "Admin is authenticated", success: true });
  } catch (error) {
    console.error("Error checking admin authentication:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export const scheduleAppointment = async (req, res) => {
  try {
    const { appointmentId, type, appointment } = req.body;

    const existingAppointment = await Appointment.findById(appointmentId);
    if (!existingAppointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }
    if (type === 'schedule') {
      existingAppointment.status = "scheduled";
      existingAppointment.schedule = appointment.schedule;
      existingAppointment.primaryPhysician = appointment.primaryPhysician;
    } else if (type === "cancel") {
      existingAppointment.status = "cancelled";
      existingAppointment.cancellationReason = appointment.cancellationReason;
    } else {
      return res.status(400).json({ message: "Invalid appointment update type" });
    }

    await existingAppointment.save();
    return res.status(200).json({ message: "Appointment scheduled successfully", appointment: existingAppointment });
  } catch (error) {
    console.error("Error scheduling appointment:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export const getAppointmentStats = async (req, res) => {
  try {
    const stats = await Appointment.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 }
        }
      }
    ]);

    // Convert aggregation to a clean object
    const result = {
      pending: 0,
      scheduled: 0,
      cancelled: 0,
    };

    stats.forEach(stat => {
      result[stat._id] = stat.count;
    });

    res.status(200).json(result);
  } catch (error) {
    console.error("Error fetching appointment stats:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getWeeklyAppointments = async (req, res) => {
  try {
    const startOfWeek = moment().startOf("week").toDate(); // Sunday
    const endOfWeek = moment().endOf("week").toDate();     // Saturday

    const appointments = await Appointment.aggregate([
      {
        $match: {
          schedule: { $gte: startOfWeek, $lte: endOfWeek }
        }
      },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$schedule" }
          },
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    // Fill missing days with 0
    const fullWeek = [];
    for (let i = 0; i < 7; i++) {
      const day = moment().startOf("week").add(i, "days").format("YYYY-MM-DD");
      const found = appointments.find(a => a._id === day);
      fullWeek.push({ date: day, count: found ? found.count : 0 });
    }

    res.status(200).json(fullWeek);
  } catch (error) {
    console.error("Error fetching weekly appointments:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getPatientsByAgeGroup = async (req, res) => {
  try {
    const patients = await Patient.aggregate([
      {
        $addFields: {
          age: {
            $dateDiff: {
              startDate: "$birthDate",
              endDate: "$$NOW",
              unit: "year"
            }
          }
        }
      },
      {
        $addFields: {
          ageGroup: {
            $switch: {
              branches: [
                { case: { $lt: ["$age", 18]}, then: "0-17"},
                { case: { $and: [{ $gte: ["$age", 18] }, { $lte: ["$age", 35] }] }, then: "18-35" },
                { case: { $and: [{ $gte: ["$age", 36] }, { $lte: ["$age", 55] }] }, then: "36-55" },
                { case: { $gte: ["$age", 56] }, then: "56+" }
              ],
              default: "Unknown"
            }
          }
        }
      },
      {
        $group: {
          _id: "$ageGroup",
          count: { $sum: 1 },
          patients: { $push: "$fullName" }
        }
      },
      {
        $sort: {_id: 1}
      }

    ])
    return res.status(200).json(patients);
  } catch (error) {
    console.log("Error fetching patients by age group:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
