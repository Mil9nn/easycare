import { axiosInstance } from "@/lib/axios";
import { create } from "zustand";

export const useAppointmentStore = create((set) => ({
  appointment: null,
  appointments: [],

  createAppointment: async (appointmentData, navigate) => {
    try {
      const response = await axiosInstance.post(
        "/appointment",
        appointmentData
      );
      if (response.status === 201) {
        const appointment = response.data;
        set({ appointment });
        navigate(`/success/${appointment?._id}`);
      }
    } catch (error) {
      console.error("Error creating appointment:", error);
      throw error;
    }
  },

  getAppointment: async (appointmentId) => {
    try {
      const response = await axiosInstance.get(`/appointment/${appointmentId}`);
        if (response.status === 200) {
        const appointment = response.data;
        set({ appointment });
        }
    } catch (error) {
      console.error("Error fetching appointment:", error);
      throw error;
    }
  },

  updateAppointment: async (appointmentData) => {
    try {
      const response = await axiosInstance.put(
        `/appointment/${appointmentData.appointmentId}`,
        appointmentData.appointment
      );
      if (response.status === 200) {
        return response.data.appointment;
      }
    } catch (error) {
      console.error("Error updating appointment:", error);
      throw error;
    }
  },

  getAllAppointments: async () => {
    try {
      const response = await axiosInstance.get("/appointment");
      if (response.status === 200) {
        set ({ appointments: response.data });
      }
    } catch (error) {
      console.error("Error fetching appointments:", error);
      throw error;
    }
  }
}));
