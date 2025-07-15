import { axiosInstance } from "@/lib/axios";
import type { Appointment } from "@/types/types";
import { create } from "zustand";

interface AppointmentStore {
  appointment: Appointment | null;
  appointments: Appointment[] | [];
  createAppointment: (appointmentData: CreateAppointmentParams, navigate: (path: string) => void) => Promise<Appointment | undefined>;
  getAppointment: (appointmentId: string) => Promise<void>;
  updateAppointment: (appointmentData: UpdateAppointmentParams) => Promise<Appointment | undefined>;
  getAllAppointments: () => Promise<void>;
}

export const useAppointmentStore = create<AppointmentStore>((set) => ({
  appointment: null,
  appointments: [],

  createAppointment: async (appointmentData, navigate) => {
    try {
      const response = await axiosInstance.post("/appointment", appointmentData);
      if (response.status === 201) {
        set({ appointment: response.data });
        navigate(`/success/${response.data?._id}`);
        return response.data;
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
      const response = await axiosInstance.put('/admin/appointment/schedule', appointmentData);
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
  },
}));
