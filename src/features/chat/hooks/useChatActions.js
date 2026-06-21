import { useChatStore }
from "../store/chatStore";

import {
    streamChatMessage,
}
from "../services/chatApi";

export const useChatActions =
    () => {

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