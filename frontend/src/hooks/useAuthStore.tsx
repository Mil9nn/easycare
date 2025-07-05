import { axiosInstance } from "@/lib/axios";
import { create } from "zustand";
import { toast } from "react-hot-toast";

import type { z } from "zod";
import type { LoginFormValidation, UserFormValidation } from "@/lib/validation";
import { AxiosError } from "axios";
import type { User } from "@/types/types";

interface AuthStore {
  isAuthenticating: boolean;
  isCheckingAuth: boolean;

  user: User | null;

  checkAuth: () => Promise<void>;
  signup: (
    userData: z.infer<typeof UserFormValidation>,
    navigate: (path: string) => void
  ) => Promise<void>;
  login: (
    userData: z.infer<typeof LoginFormValidation>,
    navigate: (path: string) => void
  ) => Promise<void>;
  logout: (navigate: (path: string) => void) => Promise<void>;
}

export const useAuthStore = create<AuthStore>((set) => ({
  isAuthenticating: false,
  isCheckingAuth: false,
  user: null,

  checkAuth: async () => {
    set({ isCheckingAuth: true });
    try {
      const response = await axiosInstance.get("/auth/check");
      if (response.status === 200) {
        set({ user: response.data });
      }
    } catch (error) {
      console.error("Authentication check error:", error);
      throw error;
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (userData, navigate) => {
    set({ isAuthenticating: true });
    try {
      const response = await axiosInstance.post("/auth/signup", userData);
      if (response.status === 201) {
        toast.success("Signup successful! Please log in.");
      }
      navigate("/login");
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        console.error("Signup error:", error);
        toast.error(
          error.response?.data?.message || "Signup failed. Please try again."
        );
        throw error;
      }
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
        set({ user: response.data });
        navigate("/medical-form");
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        console.error("Login error:", error);
        toast.error(
          error.response?.data?.message || "Login failed. Please try again."
        );
        throw error;
      }
    } finally {
      set({ isAuthenticating: false });
    }
  },

  logout: async (navigate) => {
    try {
      const response = await axiosInstance.post("/auth/logout");
      if (response.status === 200) {
        toast.success("Logged out successfully!");
        set({ user: null });
        navigate("/login");
      }
    } catch (error) {
      console.error("Logout error:", error);
      throw error;
    }
  },
}));
