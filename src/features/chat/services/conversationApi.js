import axios from "axios";
import { useAuthStore } from "../../auth/store/authStore";
import api from "../../../lib/api";

export const getConversations = async () => {

    const token =
        useAuthStore
            .getState()
            .token;

    const response =
        await api.get("/conversations");

    return response.data.data;
};

export const getConversationMessages =
    async (conversationId) => {

        const token =
            useAuthStore
                .getState()
                .token;

        const response =
            await api.get(`/conversations/${conversationId}`);

        return response.data.data;
    };
export const renameConversation = async (
    conversationId,
    title
) => {

    const token =
        useAuthStore.getState().token;

    const response =
        await api.patch(`/conversations/${conversationId}`, { title });

    return response.data.data;
};
export const deleteConversation =
    async (conversationId) => {

        const token =
            useAuthStore.getState().token;

        await api.delete(`/conversations/${conversationId}`);

    };