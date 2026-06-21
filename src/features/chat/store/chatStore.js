import { create } from "zustand";

export const useChatStore = create((set) => ({
    messages: [],

    addMessage: (message) =>
        set((state) => ({
            messages: [...state.messages, message],
        })),

    createAssistantMessage: () =>
        set((state) => ({
            messages: [
                ...state.messages,
                {
                    id: Date.now(),
                    role: "assistant",
                    content: "",
                },
            ],
        })),

    appendToLastAssistantMessage: (chunk) =>
        set((state) => {
            const messages = [...state.messages];

            const lastMessage =
                messages[messages.length - 1];

            if (
                !lastMessage ||
                lastMessage.role !== "assistant"
            ) {
                return state;
            }

            lastMessage.content += chunk;

            return { messages };
        }),
}));