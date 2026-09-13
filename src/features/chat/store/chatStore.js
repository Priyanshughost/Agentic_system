import { create } from "zustand";

export const useChatStore = create((set) => ({
    messages: [],
    conversations: [],
    activeConversationId: null,

    // NEW: Track the active network stream
    activeStreamController: null,

    isGenerating: false,

    setIsGenerating: (value) =>
        set({
            isGenerating: value,
        }),

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
                    statusPath: ["Initializing Request..."], // NEW: track sequence of statuses
                    agents: null, // NEW: hold agent specifications
                },
            ],
        })),

    // Update 2: Add this brand new function to update the status text
    updateAssistantStatus: (statusText) =>
        set((state) => {
            const messages = [...state.messages];
            const last = messages[messages.length - 1];

            if (!last || last.role !== "assistant") return state;

            if (!last.statusPath.includes(statusText)) {
                last.statusPath = [...last.statusPath, statusText];
            }
            
            return { messages };
        }),

    // NEW: set the generated agents
    setAssistantAgents: (agentsData) =>
        set((state) => {
            const messages = [...state.messages];
            const last = messages[messages.length - 1];

            if (!last || last.role !== "assistant") return state;

            // Ensure agents have activeAction and thought initialized
            last.agents = agentsData.map(agent => ({
                ...agent,
                activeAction: null,
                thought: "",
                isThinking: false,
                isRetrying: false,
                retryMessage: null
            }));
            
            return { messages };
        }),

    // NEW: Update agent action
    updateAgentAction: (agentId, actionText) =>
        set((state) => {
            const messages = [...state.messages];
            const last = { ...messages[messages.length - 1] };

            if (!last || last.role !== "assistant" || !last.agents) return state;

            last.agents = last.agents.map(a =>
                a.taskId === agentId
                    ? { ...a, activeAction: actionText }
                    : a
            );
            messages[messages.length - 1] = last;

            return { messages };
        }),

    // NEW: Append to agent thought
    updateAgentThought: (agentId, thoughtChunk) =>
        set((state) => {
            const messages = [...state.messages];
            const last = { ...messages[messages.length - 1] };

            if (!last || last.role !== "assistant" || !last.agents) return state;

            last.agents = last.agents.map(a =>
                a.taskId === agentId
                    ? { ...a, thought: a.thought + thoughtChunk, isRetrying: false }
                    : a
            );
            messages[messages.length - 1] = last;

            return { messages };
        }),

    // NEW: Set agent thinking state
    setAgentThinking: (agentId, isThinking) =>
        set((state) => {
            const messages = [...state.messages];
            const last = { ...messages[messages.length - 1] };

            if (!last || last.role !== "assistant" || !last.agents) return state;

            last.agents = last.agents.map(a =>
                a.taskId === agentId
                    ? { ...a, isThinking, isRetrying: false }
                    : a
            );
            messages[messages.length - 1] = last;

            return { messages };
        }),

    // NEW: Set agent retry state
    setAgentRetry: (agentId, retryMessage) =>
        set((state) => {
            const messages = [...state.messages];
            const last = { ...messages[messages.length - 1] };

            if (!last || last.role !== "assistant" || !last.agents) return state;

            last.agents = last.agents.map(a =>
                a.taskId === agentId
                    ? { ...a, isRetrying: true, retryMessage, isThinking: false }
                    : a
            );
            messages[messages.length - 1] = last;

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
                isGenerating: false,
            };
        }),
}));