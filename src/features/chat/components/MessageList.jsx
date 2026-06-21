import { useEffect, useRef } from "react";
import ChatBubble from "./ChatBubble";
import { BotMessageSquare } from "lucide-react"; // Assuming lucide-react for consistency

export default function MessageList({ messages = [] }) {
    // Reference to the bottom of the list for auto-scrolling
    const messagesEndRef = useRef(null);

    // Auto-scroll logic: triggers whenever the 'messages' array changes
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    return (
        // Adjusted classes: The parent (ChatWindow) handles the overflow scroll now.
        // We just need horizontal padding and vertical spacing here.
        <div className="w-full px-4 sm:px-6 py-6">
            <div className="max-w-4xl mx-auto flex flex-col gap-6">

                {/* 1. Elegant Empty State */}
                {messages.length === 0 ? (
                    <div className="flex flex-col items-center justify-center min-h-[50vh] text-center animate-in fade-in duration-700">
                        <div className="w-16 h-16 mb-5 bg-indigo-50 dark:bg-indigo-500/10 rounded-2xl flex items-center justify-center border border-indigo-100 dark:border-indigo-500/20 shadow-sm">
                            <BotMessageSquare className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
                        </div>
                        <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
                            How can I help you today?
                        </h3>
                        <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400 max-w-sm">
                            Send a message to start the conversation. I'm equipped to help with coding, writing, analysis, or general questions.
                        </p>
                    </div>
                ) : (
                    /* 2. Message Mapping with proper keys */
                    messages.map((message) => (
                        <ChatBubble
                            // CRITICAL: Always use a unique ID, never the map index!
                            // Fallback to crypto.randomUUID() only if ID is missing (though your data should always have an ID)
                            key={message.id || crypto.randomUUID()}
                            message={message}
                        />
                    ))
                )}

                {/* 3. Invisible anchor div for smooth scrolling */}
                <div ref={messagesEndRef} className="h-px w-full" aria-hidden="true" />
            </div>
        </div>
    );
}