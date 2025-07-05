import { axiosInstance } from "@/lib/axios";
import type { DashboardData, PatientStatsArray, WeeklyAppointments } from "@/types/types";
import type { NavigateFunction } from "react-router-dom";
import { create } from "zustand";

interface AdminStore {
  adminStatus: boolean;
  dashboardData: DashboardData | null;
  weeklyAppointments: WeeklyAppointments | null;
  checkAdmin: () => Promise<void>;
  verifyAdminOtp: (otp: string, navigate: NavigateFunction) => Promise<void>;
  logoutAdmin: (navigate: NavigateFunction) => Promise<void>;
  getAdminDashboardData: () => Promise<void>;
  getWeeklyAppointments: () => Promise<void>;
  patientStats: PatientStatsArray | null;
  getPatientsByAgeGroup: () => Promise<void>;
}

export const useAdminStore = create<AdminStore>((set) => ({
  adminStatus: false,
  dashboardData: null,
  weeklyAppointments: null,
  patientStats: null,

  checkAdmin: async () => {
    try {
        const response = await axiosInstance.get("/admin/check");
        set({ adminStatus: response.data.success });
    } catch (error) {
        console.error("Error checking admin status:", error);
        throw error;
    }
  },
  
  verifyAdminOtp: async (otp, navigate) => {
    try {
      const response = await axiosInstance.post("/admin/verify-otp", { otp });
      set({ adminStatus: response.data.success });
      navigate("/admin/dashboard");
    } catch (error) {
      console.error("Error verifying admin OTP:", error);
      throw error;
    }
  },

  logoutAdmin: async (navigate) => {
    try {
      await axiosInstance.post("/admin/logout");
      set({ adminStatus: false });
      navigate("/");
    } catch (error) {
      console.error("Error logging out admin:", error);
      throw error;
    }
  },

  getAdminDashboardData: async () => {
    try {
      const response = await axiosInstance.get("/admin/appointment/stats");
      if (response.status === 200) {
        set({ dashboardData: response.data });
      }
    } catch (error) {
      console.error("Error fetching admin dashboard data:", error);
      throw error;
    }
  },

  getWeeklyAppointments: async () => {
    try {
      const response = await axiosInstance.get("/admin/appointment/weekly");
      if (response.status === 200) {
        set({ weeklyAppointments: response.data });
      }
    } catch (error) {
      console.error("Error fetching weekly appointments:", error);
      throw error;
    }
  },

  getPatientsByAgeGroup: async () => {
    try {
      const response = await axiosInstance.get(`/admin/patientData`);
      if (response.status === 200) {
        set({ patientStats: response.data });
      }
    } catch (error) {
      console.error("Error fetching patient data by age group:", error);
      throw error;
    }
  },
}));
