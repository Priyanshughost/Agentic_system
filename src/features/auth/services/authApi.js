import axios from "axios";
import api from "../../../lib/api";

export const registerUser = async (
    payload
) => {

    const response =
        await api.post(
            "/auth/register",
            payload
        );

    return response.data.data;
};

export const loginUser = async (
    payload
) => {

    const response =
        await api.post(
            "/auth/login",
            payload
        );

    return response.data.data;
};

export const getCurrentUser =
    async (token) => {

        const response =
            await api.get("/auth/me");

        return response.data.data;
    };

export const logoutUser =
    async (token) => {

        await api.post("/auth/logout", {});
    };

export const refreshToken =
    async () => {

        const response =
            await api.post("/auth/refresh");

        return response.data.data;
    };

export const sendOtp = async (
    payload
) => {

    const response =
        await api.post(
            "/auth/send-otp",
            payload
        );

    return response.data.data;
};

export const resendOtp = async (
    payload
) => {

    const response =
        await api.post(
            "/auth/resend-otp",
            payload
        );

    return response.data.data;
};