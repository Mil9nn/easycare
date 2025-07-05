import { axiosInstance } from "@/lib/axios";
import { create } from "zustand";

interface AdminStore {
  adminStatus: boolean;
  dashboardData: any; // Adjust type as needed
  weeklyAppointments: any;
  checkAdmin: () => Promise<void>;
  verifyAdminOtp: (otp: string, navigate: any) => Promise<void>;
  logoutAdmin: (navigate: any) => Promise<void>;
  getAdminDashboardData: () => Promise<void>;
  getWeeklyAppointments: () => Promise<void>;
  patientStats: any;
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
      console.log(response.data.success);
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
