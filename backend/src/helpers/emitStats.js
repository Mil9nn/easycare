import { Appointment } from "../models/appointment.model.js";
import { Patient } from "../models/patient.model.js";
import moment from "moment";
import { io } from "../lib/socket.js";

export const emitAppointmentStats = async () => {
  const stats = await Appointment.aggregate([
    { $group: { _id: "$status", count: { $sum: 1 } } }
  ]);
  const result = { pending: 0, scheduled: 0, cancelled: 0 };
  stats.forEach((stat) => (result[stat._id] = stat.count));
  io.emit("appointment-stats", result);
};

export const emitWeeklyAppointments = async () => {
  const startOfWeek = moment().startOf("week").toDate();
  const endOfWeek = moment().endOf("week").toDate();

  const appointments = await Appointment.aggregate([
    { $match: { schedule: { $gte: startOfWeek, $lte: endOfWeek } } },
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

  const fullWeek = [];
  for (let i = 0; i < 7; i++) {
    const day = moment().startOf("week").add(i, "days").format("YYYY-MM-DD");
    const found = appointments.find((a) => a._id === day);
    fullWeek.push({ date: day, count: found ? found.count : 0 });
  }

  io.emit("weekly-appointments", fullWeek);
};

export const emitPatientsByAgeGroup = async () => {
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
              { case: { $lt: ["$age", 18] }, then: "0-17" },
              {
                case: {
                  $and: [{ $gte: ["$age", 18] }, { $lte: ["$age", 35] }]
                },
                then: "18-35"
              },
              {
                case: {
                  $and: [{ $gte: ["$age", 36] }, { $lte: ["$age", 55] }]
                },
                then: "36-55"
              },
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
    { $sort: { _id: 1 } }
  ]);

  io.emit("patients-by-age-group", patients);
};
