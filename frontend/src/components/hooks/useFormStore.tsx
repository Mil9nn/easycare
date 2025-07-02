import { axiosInstance } from '@/lib/axios';
import toast from 'react-hot-toast';
import { create } from 'zustand';

import { PatientFormValidation } from '@/lib/validation';

interface FormStore {
    patientData?: typeof PatientFormValidation | null;
    isBooking: boolean;
    createPatient: (patientData: typeof PatientFormValidation) => Promise<void>;
    getPatientData: () => Promise<void>;
    isLoadingPatientData: boolean;
    updatePatientData: (patientData: typeof PatientFormValidation) => Promise<void>;
}

export const useFormStore = create<FormStore>((set) => ({
    patiendData: null,
    setPatientData: (data) => set({ patientData: data }),
    isBooking: false,
    isLoadingPatientData: false,

    createPatient: async (patientData: typeof PatientFormValidation, navigate) => {
        set({ isBooking: true })
        try {
            const response = await axiosInstance.post('/patient', patientData);
            if (response.status === 201) {
                toast.success("Your appointment has been submitted successfully! We will contact you soon.");
            }
            navigate('/');
        } catch (error) {
            console.error("Error creating patient:", error);
            toast.error(error.response?.data?.message || "An error occurred while submitting your appointment.");
        } finally {
            set({ isBooking: false });
        }
    },

    getPatientData: async () => {
        set({ isLoadingPatientData: true });
        try {
            const response = await axiosInstance.get(`/patient`);
            if (response.status === 200) {
                set({ patientData: response.data.patients[0] });
            }
        } catch (error) {
            console.error("Error fetching patient data:", error);
            toast.error(error.response?.data?.message || "An error occurred while fetching patient data.");
        } finally {
            set({ isLoadingPatientData: false });
        }
    },

    updatePatientData: async (id: string, patientData: typeof PatientFormValidation) => {
        set({ isLoadingPatientData: true });
        try {
           const response = await axiosInstance.put(`/patient/update/${id}`, patientData);
            if (response.status === 200) {
                set({ patientData: response.data.patient });
            } 
            toast.success("Patient data updated successfully!");
        } catch (error) {
            console.error("Error updating patient data:", error);
            toast.error(error.response?.data?.message || "An error occurred while updating patient data.");
        } finally {
            set({ isLoadingPatientData: false });
        }
    }
}))