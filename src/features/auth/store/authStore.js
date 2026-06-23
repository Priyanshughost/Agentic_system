import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuthStore = create((set) => ({
    user: null,
    token: null,
    isAuthenticated: false,
    isLoading: true,

    setAuth: ({
        user,
        accessToken,
    }) =>
        set({
            user,
            token: accessToken,
            isAuthenticated: true,
            isLoading: false,
        }),

    setToken: (token) =>
        set({
            token,
        }),

    finishLoading: () =>
        set({
            isLoading: false,
        }),

    logout: () =>
        set({
            user: null,
            token: null,
            isAuthenticated: false,
            isLoading: false,
        }),
}));