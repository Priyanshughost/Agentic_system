import axios from "axios";
import { useAuthStore } from "../features/auth/store/authStore";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
});

// --- Refresh State ---
let isRefreshing = false;
let failedQueue = [];

// --- Queue Processor ---
const processQueue = (error, token = null) => {
    // Fix 6: Better naming (request instead of promise)
    failedQueue.forEach((request) => {
        if (error) {
            request.reject(error);
        } else {
            request.resolve(token);
        }
    });
    // Fix 5: Queue cleared automatically here
    failedQueue = [];
};

api.interceptors.request.use((config) => {
    const token = useAuthStore.getState().token;

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // Fix 7: If network fails, error.response is undefined, safely skipping this
        // Fix 3 & 4: Skip auth endpoints to prevent infinite refresh loops
        if (
            originalRequest.url?.includes("/auth/refresh") ||
            originalRequest.url?.includes("/auth/login") ||
            originalRequest.url?.includes("/auth/register")
        ) {
            return Promise.reject(error);
        }

        // --- Replace this line: ---
        // const isTokenExpired = error.response?.data?.code === "TOKEN_EXPIRED";

        // --- With this block: ---
        let errorCode = error.response?.data?.code;

        // If the response is a stream (e.g., our chat streaming endpoint), we have to decode it
        if (!errorCode && error.response?.data instanceof ReadableStream) {
            try {
                const reader = error.response.data.getReader();
                const { value } = await reader.read();
                if (value) {
                    const text = new TextDecoder().decode(value);
                    errorCode = JSON.parse(text).code;
                }
            } catch (e) {
                console.error("Failed to parse stream error response:", e);
            }
        }

        const isTokenExpired = errorCode === "TOKEN_EXPIRED";

        if (!isTokenExpired || originalRequest._retry) {
            return Promise.reject(error);
        }

        if (isRefreshing) {
            return new Promise((resolve, reject) => {
                failedQueue.push({ resolve, reject });
            })
                .then((token) => {
                    // Fix 2: Safely spread headers
                    originalRequest.headers = {
                        ...originalRequest.headers,
                        Authorization: `Bearer ${token}`,
                    };
                    return api(originalRequest);
                })
                .catch((err) => {
                    return Promise.reject(err);
                });
        }

        originalRequest._retry = true;
        isRefreshing = true;

        try {
            // Fix 8: Raw axios to avoid interceptor loop
            const { data } = await axios.post(
                `${import.meta.env.VITE_API_URL}/auth/refresh`,
                {},
                { withCredentials: true }
            );

            // Assuming your backend wraps the response in a data object
            const accessToken = data.data?.accessToken || data.accessToken;
            useAuthStore.getState().setToken(accessToken);

            processQueue(null, accessToken);

            originalRequest.headers = {
                ...originalRequest.headers,
                Authorization: `Bearer ${accessToken}`,
            };
            return api(originalRequest);

        } catch (refreshError) {
            processQueue(refreshError);
            useAuthStore.getState().logout();
            return Promise.reject(refreshError);

        } finally {
            isRefreshing = false;
        }
    }
);

export default api;