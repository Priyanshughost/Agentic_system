import { useChatStore }
    from "../store/chatStore";

import {
    streamChatMessage,
}
    from "../services/chatApi";

export const useChatActions =
    () => {

        const addConversation =
            useChatStore(
                (state) =>
                    state.addConversation
            );

        const activeConversationId =
            useChatStore(
                (state) =>
                    state.activeConversationId
            );

        const setActiveConversation =
            useChatStore(
                (state) =>
                    state.setActiveConversation
            );

        const messages =
            useChatStore(
                (state) =>
                    state.messages
            );

        const addMessage =
            useChatStore(
                (state) =>
                    state.addMessage
            );

        const createAssistantMessage =
            useChatStore(
                (state) =>
                    state.createAssistantMessage
            );

        const appendToLastAssistantMessage =
            useChatStore(
                (state) =>
                    state
                        .appendToLastAssistantMessage
            );

        const sendMessage =
            async (text) => {

                if (!text.trim())
                    return;

                addMessage({
                    id: Date.now(),
                    role: "user",
                    content: text,
                });

                createAssistantMessage();

                await streamChatMessage(
                    text,
                    activeConversationId,

                    (conversation) => {

                        setActiveConversation(
                            conversation._id
                        );

                        addConversation(
                            conversation
                        );

                    },

                    (chunk) => {

                        appendToLastAssistantMessage(
                            chunk
                        );

                    }
                );
            };

        return {
            messages,
            sendMessage,
        };
    };