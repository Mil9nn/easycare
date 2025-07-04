import { axiosInstance } from "@/lib/axios";
import { create } from "zustand";

export const useAdminStore = create((set) => ({
  adminStatus: false,

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
      navigate("/admin");
    } catch (error) {
      console.error("Error logging out admin:", error);
      throw error;
    }
  },
}));
