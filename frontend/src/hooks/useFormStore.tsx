import { create } from 'zustand';

type FormStore = {
    hideForm: boolean;
    toggleForm: () => void;
    setHideForm: (hide: boolean) => void;
}

export const useFormStore = create<FormStore>((set) => ({
    hideForm: false,
    setHideForm: (hide) => set({ hideForm: hide}),
    toggleForm: () => set((state) => ({ hideForm: !state.hideForm}))
}));