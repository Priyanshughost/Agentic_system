import { create } from "zustand";

export const useChatStore = create((set) => ({
    messages: [],
    conversations: [],
    activeConversationId: null,

    // NEW: Track the active network stream
    activeStreamController: null,

    setActiveStreamController: (controller) =>
        set({ activeStreamController: controller }),

    abortActiveStream: () =>
        set((state) => {
            if (state.activeStreamController) {
                state.activeStreamController.abort();
            }
            return { activeStreamController: null };
        }),

    setActiveConversation: (conversationId) =>
        set({
            activeConversationId: conversationId,
        }),

    setConversations: (conversations) =>
        set({
            conversations,
        }),

    setMessages: (messages) =>
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

    // Update 1: Add a default status when creating the message
    createAssistantMessage: () =>
        set((state) => ({
            messages: [
                ...state.messages,
                {
                    id: crypto.randomUUID(),
                    role: "assistant",
                    content: "",
                    status: "Thinking...", // NEW
                },
            ],
        })),

    // Update 2: Add this brand new function to update the status text
    updateAssistantStatus: (statusText) =>
        set((state) => {
            const messages = [...state.messages];
            const last = messages[messages.length - 1];

            if (!last || last.role !== "assistant") return state;

            last.status = statusText;
            return { messages };
        }),

    // Update 3: Modify append to clear the status once text arrives
    appendToLastAssistantMessage: (chunk) =>
        set((state) => {
            const messages = [...state.messages];
            const last = messages[messages.length - 1];

            if (!last || last.role !== "assistant") {
                return state;
            }

            last.content += chunk;

            // NEW: The moment actual text arrives, kill the status
            if (last.status) {
                last.status = null;
            }

            return { messages };
        }),

    loadConversation: (messages, conversationId) =>
        set({
            messages,
            activeConversationId: conversationId,
        }),

    addConversation: (conversation) =>
        set((state) => ({
            conversations: [
                conversation,
                ...state.conversations,
            ],
        })),

    renameConversation: (conversationId, title) =>
        set((state) => ({
            conversations: state.conversations.map((conversation) =>
                conversation._id === conversationId
                    ? { ...conversation, title }
                    : conversation
            ),
        })),

    deleteConversation: (conversationId) =>
        set((state) => ({
            conversations: state.conversations.filter(
                (conversation) => conversation._id !== conversationId
            ),
            activeConversationId:
                state.activeConversationId === conversationId
                    ? null
                    : state.activeConversationId,
            messages:
                state.activeConversationId === conversationId
                    ? []
                    : state.messages,
        })),
    resetChat: () =>
        set((state) => {
            if (state.activeStreamController) {
                state.activeStreamController.abort();
            }
            return {
                messages: [],
                conversations: [],
                activeConversationId: null,
                activeStreamController: null,
            };
        }),
}));