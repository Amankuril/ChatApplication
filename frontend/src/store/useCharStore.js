import { create } from "zustand";
import toast from "react-hot-toast";
import axiosInstance from '../lib/axios.js';
import { userAuthStore } from './useAuthStore.js'


export const useChatStore = create((set, get) => ({
    messages: [],
    users: [],
    selectUser: null,
    isUserLoading: false,
    isMessagesLoading: false,

    getUsers: async () => {
        set({ isUserLoading: true });
        try {
            const res = await axiosInstance.get("/messages/users");
            set({ users: res.data.filteredUsers });
            // console.log(res.data.filteredUsers);
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            set({ isUserLoading: false });
        }
    },

    getMessages: async (userId) => {
        set({ isMessagesLoading: true });
        try {
            const res = await axiosInstance.get(`/messages/${userId}`);
            set({ messages: res.data.messages });
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            set({ isMessagesLoading: false });
        }
    },

    sendMessage: async (messageData) => {

        const { messages, selectUser } = get();

        try {
            // set({ isMessagesLoading: true });
            const res = await axiosInstance.post(`/messages/send/${selectUser._id}`, messageData);
            set({ messages: [...messages, res.data] })
        } catch (error) {
            toast.error(error.response.data.message);
        }
    },

    subscribeToMessages: () => {
        const { selectUser } = get();
        if (!selectUser) return;

        const socket = userAuthStore.getState().socket;

        socket.on("newMessage", (newMessage) => {
            const isMessageSentFromSelectedUser = newMessage.senderId === selectUser._id
            if (!isMessageSentFromSelectedUser) return;

            set({
                messages: [...get().messages, newMessage]
            });
        });
    },

    unsubscribeFromMessages: () => {
        const socket = userAuthStore.getState().socket;
        socket.off("newMessage");
    },

    setSelectedUser: (selectUser) => { set({ selectUser }) }
}));
