import api from "../../../lib/api";

export const streamChatMessage = async (
    message,
    conversationId,
    onConversationCreated,
    onChunk,
    onStatus,
    onAgents,
    onAgentAction,
    onAgentThought,
    onAgentThinking,
    onAgentRetry,
    signal
) => {
    const response = await api.post(
        "/chat/message",
        {
            message,
            conversationId,
        },
        {
            responseType: "stream",
            adapter: "fetch",
            signal, // NEW: Pass the signal to Axios
        }
    );

    const reader = response.data.getReader();
    const decoder = new TextDecoder();

    while (true) {
        const { value, done } = await reader.read();

        if (done) break;

        const chunk = decoder.decode(value);

        const lines = chunk
            .split("\n")
            .filter((line) => line.startsWith("data:"));

        for (const line of lines) {
            const data = JSON.parse(line.replace("data: ", ""));

            if (data.conversation) {
                onConversationCreated(data.conversation);
                continue;
            }

            if (data.done) {
                return;
            }

            if (data.type === "status") {
                onStatus(data.status);
            } else if (data.type === "agents") {
                onAgents(data.agents);
            } else if (data.type === "agent_action") {
                onAgentAction(data.agentId, data.action);
            } else if (data.type === "agent_thought") {
                onAgentThought(data.agentId, data.content);
            } else if (data.type === "agent_thinking") {
                onAgentThinking(data.agentId, data.isThinking);
            } else if (data.type === "agent_retry") {
                onAgentRetry(data.agentId, data.message);
            } else if (data.type === "content" || data.content) {
                onChunk(data.content);
            }
        }
    }
};