import { create } from "zustand";

export const useChatStore = create((set) => ({
    messages: [],

    conversations: [],

    activeConversationId: null,

    setActiveConversation: (
        conversationId
    ) =>
        set({
            activeConversationId:
                conversationId,
        }),

    setConversations: (
        conversations
    ) =>
        set({
            conversations,
        }),

    setMessages: (
        messages
    ) =>
        set({
            messages,
        }),

    clearMessages: () =>
        set({
            messages: [],
        }),

    addMessage: (message) =>
        set((state) => ({
            messages: [
                ...state.messages,
                message,
            ],
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

    appendToLastAssistantMessage:
        (chunk) =>
            set((state) => {

                const messages =
                    [...state.messages];

                const last =
                    messages[
                    messages.length - 1
                    ];

                if (
                    !last ||
                    last.role !==
                    "assistant"
                ) {
                    return state;
                }

                last.content += chunk;

                return {
                    messages,
                };
            }),

    loadConversation: (
        messages,
        conversationId
    ) =>
        set({
            messages,
            activeConversationId:
                conversationId,
        }),

    addConversation: (
        conversation
    ) =>
        set((state) => ({
            conversations: [
                conversation,
                ...state.conversations,
            ],
        })),
    renameConversation: (
        conversationId,
        title
    ) =>
        set((state) => ({
            conversations:
                state.conversations.map((conversation) =>
                    conversation._id === conversationId
                        ? {
                            ...conversation,
                            title,
                        }
                        : conversation
                ),
        })),
    deleteConversation: (
        conversationId
    ) =>
        set((state) => ({

            conversations:
                state.conversations.filter(
                    conversation =>
                        conversation._id !==
                        conversationId
                ),

            activeConversationId:
                state.activeConversationId ===
                    conversationId
                    ? null
                    : state.activeConversationId,

            messages:
                state.activeConversationId ===
                    conversationId
                    ? []
                    : state.messages,

        })),
}));