import { axiosInstance } from "@/lib/axios";
import type {
  DashboardData,
  PatientStatsArray,
  WeeklyAppointments,
} from "@/types/types";
import { isAxiosError } from "axios";
import toast from "react-hot-toast";
import type { NavigateFunction } from "react-router-dom";
import { create } from "zustand";

type Admin = {
  _id: string;
  fullName: string;
  email: string;
};

interface AdminStore {
  admin: Admin | null;
  dashboardData: DashboardData | null;
  weeklyAppointments: WeeklyAppointments | null;
  checkAdmin: () => Promise<void>;
  verifyAdminOtp: (otp: string, navigate: NavigateFunction) => Promise<void>;
  logoutAdmin: (navigate: NavigateFunction) => Promise<void>;
  getAdminDashboardData: () => Promise<void>;
  getWeeklyAppointments: () => Promise<void>;
  patientStats: PatientStatsArray | null;
  getPatientsByAgeGroup: () => Promise<void>;
  addDoctor: (doctorData: FormData) => Promise<CreateDoctorParams | undefined>;
  isAddingDoctor: boolean;
  doctors: CreateDoctorParams[] | null;
  getAllDoctors: () => Promise<CreateDoctorParams[] | undefined>;
  isVerifying: boolean;
  gettingDoctors: boolean;
  getDoctorById: (doctorId: string) => Promise<CreateDoctorParams | undefined>;
  doctor: CreateDoctorParams | null;
  updateDoctor: (
    doctorId: string,
    doctorData: CreateDoctorParams
  ) => Promise<CreateDoctorParams | undefined>;
  deleteDoctor: (doctorId: string) => Promise<void>;
  isLoading: boolean;
  isUpdatingDoctor: boolean;
  isCheckingAdmin: boolean;
  updateDoctorStatus: (doctor: CreateDoctorParams) => Promise<void>;

  menuOpen: boolean;
  setMenuOpen: (menuOpen: boolean) => void;
}

export const useAdminStore = create<AdminStore>((set) => ({
  admin: null,
  dashboardData: null,
  weeklyAppointments: null,
  patientStats: null,
  isAddingDoctor: false,
  doctors: null,
  isVerifying: false,
  gettingDoctors: false,
  doctor: null,
  isLoading: false,
  isUpdatingDoctor: false,
  isCheckingAdmin: false,

  menuOpen: false,
  setMenuOpen: (menuOpen: boolean) => set({ menuOpen }),

  checkAdmin: async () => {
    set({ isCheckingAdmin: true });
    try {
      const response = await axiosInstance.get("/admin/check");
      set({ admin: response.data.success });
    } catch (error) {
      console.error("Error checking admin status:", error);
      set({ admin: null });
    } finally {
      set({ isCheckingAdmin: false });
    }
  },

  verifyAdminOtp: async (otp, navigate) => {
    set({ isVerifying: true });
    try {
      const response = await axiosInstance.post("/admin/verify-otp", { otp });
      set({ admin: response.data.success });
      navigate("/admin/dashboard");
    } catch (error) {
      console.error("Error verifying admin OTP:", error);
      set({ admin: null });
    } finally {
      set({ isVerifying: false });
    }
  },

  logoutAdmin: async (navigate) => {
    try {
      await axiosInstance.post("/admin/logout");
      set({ admin: null });
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

  addDoctor: async (doctorData) => {
    set({ isAddingDoctor: true });
    try {
      const response = await axiosInstance.post("/doctor/add", doctorData);
      if (response.status === 201) {
        toast.success("Doctor added successfully!");
        return response.data;
      }
    } catch (error) {
      console.error("Error adding doctor:", error);
      throw error;
    } finally {
      set({ isAddingDoctor: false });
    }
  },

  getAllDoctors: async () => {
    set({ gettingDoctors: true });
    try {
      const response = await axiosInstance.get("/doctor/all");
      if (response.status === 200) {
        set({ doctors: response.data });
        return response.data;
      }
    } catch (error) {
      console.error("Error fetching all doctors:", error);
      throw error;
    } finally {
      set({ gettingDoctors: false });
    }
  },

  getDoctorById: async (doctorId) => {
    set({ isLoading: true });
    try {
      const response = await axiosInstance.get(`/doctor/${doctorId}`, {
        withCredentials: false,
      });
      if (response.status === 200) {
        set({ doctor: response.data });
        return response.data;
      }
    } catch (error) {
      console.error("Error fetching doctor by ID:", error);
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  updateDoctor: async (doctorId, doctorData) => {
    set({ isUpdatingDoctor: true });
    try {
      const response = await axiosInstance.put(
        `/doctor/${doctorId}`,
        doctorData
      );
      if (response.status === 200) {
        toast.success("Doctor updated successfully!");
        return response.data;
      }
    } catch (error: unknown) {
      if (isAxiosError(error)) {
        console.error("Error updating doctor:", error);
        toast.error(error.response?.data?.message || "Failed to update doctor");
        throw error;
      }
    } finally {
      set({ isUpdatingDoctor: false });
    }
  },

  updateDoctorStatus: async (doctor) => {
    set({ isUpdatingDoctor: true });
    try {
      await axiosInstance.put(`/doctor/status/${doctor?._id}`, {
        isActive: doctor?.isActive,
      });

      toast.success("Doctor status updated successfully");
    } catch (error) {
      console.error("Error toggling doctor status:", error);
    } finally {
      set({ isUpdatingDoctor: false });
    }
  },

  deleteDoctor: async (doctorId) => {
    set({ isUpdatingDoctor: true });
    try {
      const response = await axiosInstance.delete(`/doctor/${doctorId}`);
      if (response.status === 200) {
        toast.success("Doctor deleted successfully!");
      }
    } catch (error) {
      if (isAxiosError(error)) {
        console.error("Error deleting doctor:", error);
        toast.error(error.response?.data?.message || "Failed to delete doctor");
        throw error;
      }
    } finally {
      set({ isUpdatingDoctor: false });
    }
  },
}));