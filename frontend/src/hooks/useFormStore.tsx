import { axiosInstance } from "@/lib/axios";
import toast from "react-hot-toast";
import { create } from "zustand";

import { PatientFormValidation } from "@/lib/validation";
import type { NavigateFunction } from "react-router-dom";
import { AxiosError } from "axios";
import type { Patient } from "@/types/types";
import { z } from "zod";

export type PatientFormValues = z.infer<typeof PatientFormValidation>;

interface FormStore {
  patient?: Patient | null;
  setPatient: (data: Patient | null) => void;
  createPatient: (
    patient: FormData,
    navigate: NavigateFunction
  ) => Promise<void>;
  getPatient: () => Promise<void>;
  isLoadingPatient: boolean;
  updatePatient: (
    id: string,
    patient: Partial<PatientFormValues>
  ) => Promise<void>;
}

export const useFormStore = create<FormStore>((set) => ({
  patient: null,
  setPatient: (data) => set({ patient: data }),
  isLoadingPatient: false,

  createPatient: async (patient: FormData, navigate) => {
    set({ isLoadingPatient: true });
    try {
      const response = await axiosInstance.post("/patient/", patient);
      if (response.status === 201) {
        set({ patient: response.data.patient });
        navigate(`/book-appointment`);
        toast.success(
          "Patient data saved successfully! Please proceed to book an appointment."
        );
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        console.error("Error creating patient:", error);
        toast.error(
          error.response?.data?.message ||
            "An error occurred while submitting your appointment."
        );
      }
    } finally {
      set({ isLoadingPatient: false });
    }
  },

  getPatient: async () => {
    set({ isLoadingPatient: true });
    try {
      const response = await axiosInstance.get(`/patient/me`);
      if (response.status === 200) {
        set({ patient: response.data.patient });
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        console.error("Error fetching patient data:", error);
        throw error;
      }
    } finally {
      set({ isLoadingPatient: false });
    }
  },

  updatePatient: async (id: string, patient: Partial<PatientFormValues>) => {
    set({ isLoadingPatient: true });
    try {
      const response = await axiosInstance.put(
        `/patient/update/${id}`,
        patient
      );
      if (response.status === 200) {
        set({ patient: response.data.patient });
      }
      toast.success("Patient data updated successfully!");
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        console.error("Error updating patient data:", error);
        toast.error(
          error.response?.data?.message ||
            "An error occurred while updating patient data."
        );
      }
    } finally {
      set({ isLoadingPatient: false });
    }
  },
}));
