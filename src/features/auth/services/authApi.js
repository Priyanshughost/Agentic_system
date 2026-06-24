import axios from "axios";

const api = axios.create({
    baseURL:
        import.meta.env.VITE_API_URL,

    withCredentials: true,
});

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
            await api.get(
                "/auth/me",
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`,
                    },
                }
            );

        return response.data.data;
    };

export const logoutUser =
    async (token) => {

        await api.post(
            "/auth/logout",
            {},
            {
                headers: {
                    Authorization:
                        `Bearer ${token}`,
                },
            }
        );
    };

export const refreshToken =
    async () => {

        const response =
            await api.post(
                "/auth/refresh"
            );

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