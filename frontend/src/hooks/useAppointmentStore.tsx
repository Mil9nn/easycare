import { axiosInstance } from "@/lib/axios";
import type { Appointment } from "@/types/types";
import { isAxiosError } from "axios";
import toast from "react-hot-toast";
import { create } from "zustand";

interface AppointmentStore {
  appointment: Appointment | null;
  appointments: Appointment[] | [];
  patientAppointments: Appointment[] | [];
  createAppointment: (
    appointmentData: CreateAppointmentParams,
    navigate: (path: string) => void
  ) => Promise<Appointment | undefined>;
  getAppointment: (appointmentId: string) => Promise<void>;
  updateAppointment: (
    appointmentData: UpdateAppointmentParams
  ) => Promise<Appointment | undefined>;
  getAllAppointments: () => Promise<void>;
  getAllAppointmentsByPatient: (
    patientId: string
  ) => Promise<void>;
  isLoading: boolean;
}

export const useAppointmentStore = create<AppointmentStore>((set) => ({
  appointment: null,
  appointments: [],
  patientAppointments: [],
  isLoading: false,

  createAppointment: async (appointmentData, navigate) => {
    try {
      const response = await axiosInstance.post(
        "/appointment",
        appointmentData
      );
      if (response.status === 201) {
        set({ appointment: response.data });
        navigate(`/success/${response.data?._id}`);
        return response.data;
      }
    } catch (error: unknown) {
      console.error("Error creating appointment:", error);
      if (isAxiosError(error)) {
        toast.error(
          error.response?.data?.message || "Failed to create appointment"
        );
        throw error;
      }
    }
  },

  getAppointment: async (appointmentId) => {
    set({ isLoading: true });
    try {
      const response = await axiosInstance.get(`/appointment/${appointmentId}`);
      if (response.status === 200) {
        const appointment = response.data;
        set({ appointment });
      }
    } catch (error) {
      console.error("Error fetching appointment:", error);
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  updateAppointment: async (appointmentData) => {
    try {
      const response = await axiosInstance.put(
        "/admin/appointment/schedule",
        appointmentData
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
        set({ appointments: response.data });
      }
    } catch (error) {
      console.error("Error fetching appointments:", error);
      throw error;
    }
  },

  getAllAppointmentsByPatient: async (patientId) => {
    try {
      const response = await axiosInstance.get(`/appointment/patient/${patientId}`);
      if (response.status === 200) {
        set({ patientAppointments: response.data });
      }
    } catch (error) {
      console.error("Error fetching patient appointments:", error);
    }
  }
}));
