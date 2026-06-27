import api from "../../../lib/api";

export const streamChatMessage = async (
    message,
    conversationId,
    onConversationCreated,
    onChunk,
    onStatus,
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
            } else if (data.type === "content" || data.content) {
                onChunk(data.content);
            }
        }
    }
};