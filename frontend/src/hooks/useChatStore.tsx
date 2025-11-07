import type { ChatMessage } from '@/components/chat/ChatContainer';
import { axiosInstance } from '@/lib/axios';
import { create } from 'zustand';

interface ChatStore {
    messages: ChatMessage[];
    sendMessage: (message: string) => Promise<void>;
    isSending?: boolean;    
}

export const useChatStore = create<ChatStore>((set) => ({
    messages: [],

    sendMessage: async (message) => {
        set({ isSending: true });
        try {
            const response = await axiosInstance.post('/chatbot/chat', { message })
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