export const streamChatMessage =
    async (
        message,
        onChunk
    ) => {

        const response =
            await fetch(
                `${import.meta.env.VITE_API_URL}/chat/message`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type":
                            "application/json",
                    },
                    body: JSON.stringify({
                        message,
                    }),
                }
            );

        const reader =
            response.body.getReader();

        const decoder =
            new TextDecoder();

        while (true) {
            const {
                value,
                done,
            } = await reader.read();

            if (done) break;

            const chunk =
                decoder.decode(value);

            const lines =
                chunk
                    .split("\n")
                    .filter(
                        (line) =>
                            line.startsWith(
                                "data:"
                            )
                    );

            for (const line of lines) {
                const data =
                    JSON.parse(
                        line.replace(
                            "data: ",
                            ""
                        )
                    );

                if (data.done) {
                    return;
                }

                onChunk(data.content);
            }
        }
    };