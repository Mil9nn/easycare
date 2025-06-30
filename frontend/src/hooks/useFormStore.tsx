import { axiosInstance } from '@/lib/axios';
import toast from 'react-hot-toast';
import { create } from 'zustand';

import { PatientFormValidation } from '@/lib/validation';

interface FormStore {
    patientData?: typeof PatientFormValidation | null;
    isBooking: boolean;
    createPatient: (patientData: typeof PatientFormValidation) => Promise<void>;
}

export const useFormStore = create<FormStore>((set) => ({
    patiendData: null,
    isBooking: false,

    createPatient: async (patientData: typeof PatientFormValidation) => {
        set({ isBooking: true })
        try {
            const response = await axiosInstance.post('/patient', patientData);
            if (response.status === 201) {
                toast.success("Your appointment has been submitted successfully! We will contact you soon.");
                set({ patientData: response.data });
            }
        } catch (error) {
            console.error("Error creating patient:", error);
            toast.error(error.response?.data?.message || "An error occurred while submitting your appointment.");
        } finally {
            set({ isBooking: false });
        }
    }
}))