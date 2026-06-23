import { useEffect } from "react";

import {
    useAuthStore,
} from "../store/authStore";

import {
    getCurrentUser,
    refreshToken,
} from "../services/authApi";

export const useAuthInit = () => {

    const finishLoading =
        useAuthStore(
            (state) =>
                state.finishLoading
        );

    const token =
        useAuthStore(
            (state) => state.token
        );

    const setAuth =
        useAuthStore(
            (state) => state.setAuth
        );

    const setToken =
        useAuthStore(
            (state) => state.setToken
        );

    const logout =
        useAuthStore(
            (state) => state.logout
        );

    useEffect(() => {
        const initialize =
            async () => {
                try {
                    let accessToken =
                        token;

                    if (!accessToken) {

                        const refreshData =
                            await refreshToken();

                        accessToken =
                            refreshData.accessToken;
                        setToken(
                            accessToken
                        );
                    }

                    const user =
                        await getCurrentUser(
                            accessToken
                        );
                    setAuth({
                        user,
                        accessToken,
                    });

                }
                catch (error) {

                    console.error(
                        "Auth initialization failed"
                    );

                    logout();

                }
                finally {

                    finishLoading();

                }
            };

        initialize();

    }, []);
};