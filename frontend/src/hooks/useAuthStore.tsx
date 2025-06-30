import { axiosInstance } from "@/lib/axios";
import { create } from "zustand";
import { toast } from "react-hot-toast";
import type { formSchema, loginSchema } from "@/lib/types";
import type { z } from "zod";

interface AuthStore {
    isAuthenticating: boolean;
    signup: (userData: z.infer<typeof formSchema>, navigate: (path: string) => void) => Promise<void>;
    login: (userData: z.infer<typeof loginSchema>, navigate: (path: string) => void) => Promise<void>;
}

export const useAuthStore = create<AuthStore>((set) => ({
  isAuthenticating: false,

  signup: async (userData, navigate) => {
    set({ isAuthenticating: true });
    try {
      const response = await axiosInstance.post("/auth/signup", userData);
      if (response.status === 201) {
        toast.success("Signup successful!");
      }
      navigate("/login");
    } catch (error) {
      console.error("Signup error:", error);
      toast.error(error.response?.data?.message || "Signup failed. Please try again.");
      throw error;
    } finally {
      set({ isAuthenticating: false });
    }
  },

  login: async (userData, navigate) => {
    set({ isAuthenticating: true });
    try {
        const response = await axiosInstance.post("/auth/login", userData);
        if (response.status === 200) {
            toast.success("Login successful!");
        }
        navigate("/");
    } catch (error) {
        console.error("Login error:", error);
        toast.error(error.response?.data?.message || "Login failed. Please try again.");
        throw error;
    } finally {
        set({ isAuthenticating: false });
    }
  }
}));
