import { axiosInstance } from '@/lib/axios';
import { create } from 'zustand';

interface ChatStore {
    messages: { text: string; isUser: boolean }[];
    sendMessage: (message: string) => Promise<void>;
    isSending?: boolean;    
}

export const useChatStore = create<ChatStore>((set) => ({
    messages: [],

    sendMessage: async (message) => {
        set({ isSending: true });
        try {
            const response = await axiosInstance.post('/chatbot/chat', { message })
            console.log(response.data.data);
            const botMessage = response.data.data;
            
            set({ messages: [botMessage] });
        } catch (error) {
            console.error('Error sending message:', error);
            throw error;
        } finally {
            set({ isSending: false });
        }
    }
}))