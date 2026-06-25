import axios from "axios";
import { useAuthStore } from "../../auth/store/authStore";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
});

export const getConversations = async () => {

    const token =
        useAuthStore
            .getState()
            .token;

    const response =
        await api.get(
            "/conversations",
            {
                headers: {
                    Authorization:
                        `Bearer ${token}`,
                },
            }
        );

    return response.data.data;
};

export const getConversationMessages =
    async (conversationId) => {

        const token =
            useAuthStore
                .getState()
                .token;

        const response =
            await api.get(
                `/conversations/${conversationId}`,
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`,
                    },
                }
            );

        return response.data.data;
    };
export const renameConversation = async (
    conversationId,
    title
) => {

    const token =
        useAuthStore.getState().token;

    const response =
        await api.patch(
            `/conversations/${conversationId}`,
            { title },
            {
                headers: {
                    Authorization:
                        `Bearer ${token}`,
                },
            }
        );

    return response.data.data;
};
export const deleteConversation =
    async (conversationId) => {

        const token =
            useAuthStore.getState().token;

        await api.delete(
            `/conversations/${conversationId}`,
            {
                headers: {
                    Authorization:
                        `Bearer ${token}`,
                },
            }
        );

    };