import { create } from 'zustand';
import axiosInstance from '../lib/axios.js';
import toast from 'react-hot-toast';
import { io } from "socket.io-client";

const BASE_URL = import.meta.env.MODE === "devlopment" ? "http://localhost:8080" : "/";

export const userAuthStore = create((set, get) => ({
    authUser: null,
    isSigningUp: false,
    isLogginIn: false,
    isUpdatingProfile: false,
    isCheckingAuth: true,
    onlineUsers: [],
    socket: null,

    checkAuth: async () => {
        try {
            const res = await axiosInstance.get("/auth/check");
            set({ authuser: res.data });

            get().connectSocket();

        } catch (error) {
            console.log("error in checkAuth", error);
            set({ authUser: null });
        } finally {
            set({ isCheckingAuth: false });
        }
    },

    signup: async (data) => {
        set({ isSigningUp: true });
        try {
            const res = await axiosInstance.post("/auth/register", data);
            set({ authUser: res.data });
            toast.success("Account created successfully");

            get().connectSocket();

        } catch (error) {
            toast.error(error.response.data.message);
            console.log("error in signup", error);
        } finally {
            set({ isSigningUp: false });
        }
    },

    login: async (data) => {
        set({ isLogginIn: true });
        try {
            const res = await axiosInstance.post("/auth/login", data);
            set({ authUser: res.data });
            toast.success("Logged in successfully");

            get().connectSocket();

        } catch (error) {
            toast.error(error.response.data.message);
            console.log("error in login", error);
        }
    },

    logout: async () => {
        try {
            const res = await axiosInstance.get("/auth/logout");
            set({ authUser: null });
            toast.success(res.data.message);

            get().disConnectSocket();

        } catch (error) {
            toast.error(error.response.data.message);
        }
    },

    profile: async (data) => {
        set({ isUpdatingProfile: true });
        try {
            const res = await axiosInstance.put("/auth/update", data);
            set({ authUser: res.data });
            toast.success("Profile updated successfully");

        } catch (error) {
            toast.error(error.response.data.message);
            console.log("error in profile", error);
        } finally {
            set({ isUpdatingProfile: false });
        }
    },

    connectSocket: () => {
        const { authUser } = get();
        if (!authUser || get().socket?.conncted) return;

        const socket = io(BASE_URL, {
            query: {
                userId: authUser._id,
            }
        });
        socket.connect();
        set({ socket: socket });

        socket.on("getOnlineUsers", (userIds) => {
            set({ onlineUsers: userIds });
        })
    },


    disConnectSocket: () => {
        if (get().socket?.connected) {
            get().socket.disconnect();
        }
    }
}));