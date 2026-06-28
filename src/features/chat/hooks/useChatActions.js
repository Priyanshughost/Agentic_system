import { useChatStore } from "../store/chatStore";
import { streamChatMessage } from "../services/chatApi";

export const useChatActions = () => {
    const addConversation = useChatStore((state) => state.addConversation);
    const activeConversationId = useChatStore((state) => state.activeConversationId);
    const setActiveConversation = useChatStore((state) => state.setActiveConversation);
    const messages = useChatStore((state) => state.messages);
    const addMessage = useChatStore((state) => state.addMessage);
    const createAssistantMessage = useChatStore((state) => state.createAssistantMessage);
    const appendToLastAssistantMessage = useChatStore((state) => state.appendToLastAssistantMessage);

    // NEW: Grab the status updater
    const updateAssistantStatus = useChatStore((state) => state.updateAssistantStatus);

    const setActiveStreamController = useChatStore((state) => state.setActiveStreamController);
    const abortActiveStream = useChatStore((state) => state.abortActiveStream);

    const setIsGenerating =
        useChatStore(
            (state) => state.setIsGenerating
        );

    const sendMessage = async (text) => {
        if (!text.trim()) return;
        setIsGenerating(true);
        abortActiveStream();

        const controller = new AbortController();
        setActiveStreamController(controller);

        addMessage({
            id: Date.now(),
            role: "user",
            content: text,
        });

        createAssistantMessage();

        let thisStreamConversationId = activeConversationId;

        try {
            await streamChatMessage(
                text,
                activeConversationId,
                (conversation) => {
                    thisStreamConversationId = conversation._id;
                    setActiveConversation(conversation._id);
                    addConversation(conversation);
                },
                (chunk) => {
                    const currentlyActiveId = useChatStore.getState().activeConversationId;
                    if (thisStreamConversationId === currentlyActiveId) {
                        appendToLastAssistantMessage(chunk);
                    } else {
                        controller.abort();
                    }
                },
                // NEW: Status callback with the same firewall protection
                (statusText) => {
                    const currentlyActiveId = useChatStore.getState().activeConversationId;
                    if (thisStreamConversationId === currentlyActiveId) {
                        updateAssistantStatus(statusText);
                    }
                },
                controller.signal
            );
        } catch (error) {
            if (
                error.name === "AbortError" ||
                error.name === "CanceledError"
            ) {
                updateAssistantStatus("Generation stopped");
                return;
            } else {
                console.error("Stream error:", error);
            }
        } finally {
            setIsGenerating(false);
            if (useChatStore.getState().activeStreamController === controller) {
                setActiveStreamController(null);
            }
        }
    };

    return { messages, sendMessage };
};