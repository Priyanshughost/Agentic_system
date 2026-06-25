import { useState } from "react";
import { useChatStore } from "../store/chatStore";
import { useChatActions } from "../hooks/useChatActions";
import MessageList from "./MessageList";
import ChatInput from "./ChatInput";
import Sidebar from "./Sidebar";
import { Menu, Bot, MoreVertical } from "lucide-react"; // Assuming you use lucide for icons
import { useConversations } from "../hooks/useConversations";

export default function ChatWindow() {
    const messages = useChatStore((state) => state.messages);
    const { sendMessage } = useChatActions();

    // Pro touch: Handle mobile sidebar state
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    useConversations();

    return (
        <div className="flex h-screen w-full bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 overflow-hidden font-sans">

            {/* Mobile Sidebar Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/40 lg:hidden backdrop-blur-sm transition-opacity"
                    onClick={() => setIsSidebarOpen(false)}
                    aria-hidden="true"
                />
            )}

            {/* Sidebar - Responsive off-canvas menu for mobile, fixed for desktop */}
            <div className={`
                fixed inset-y-0 left-0 z-50 w-72 transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 lg:flex
                ${isSidebarOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full"}
            `}>
                {/* Passing onClose allows the Sidebar to close itself on mobile navigations */}
                <Sidebar onClose={() => setIsSidebarOpen(false)} />
            </div>

            {/* Main Content Area */}
            <main className="flex flex-col flex-1 h-full min-w-0 relative">

                {/* Header */}
                <header className="flex items-center justify-between px-4 py-3 border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md sticky top-0 z-10">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setIsSidebarOpen(true)}
                            className="p-2 -ml-2 rounded-md lg:hidden hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors text-zinc-500 dark:text-zinc-400"
                            aria-label="Open Menu"
                        >
                            <Menu className="w-5 h-5" />
                        </button>

                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 rounded-xl border border-indigo-100 dark:border-indigo-500/20 shadow-sm">
                                <Bot className="w-5 h-5" />
                            </div>
                            <div>
                                <h2 className="text-sm font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
                                    Agentic Assistant
                                </h2>
                            </div>
                        </div>
                    </div>

                    <button className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors text-zinc-500 dark:text-zinc-400">
                        <MoreVertical className="w-5 h-5" />
                    </button>
                </header>

                {/* Message List Container - Restricted overflow to prevent whole-page scrolling */}
                <div className="flex-1 overflow-y-auto overflow-x-hidden relative scroll-smooth">
                    <MessageList messages={messages} />
                </div>

                {/* Input Area - Centered max-width for better reading experience on ultra-wide screens */}
                <div className="p-4 bg-linear-to-t from-white via-white dark:from-zinc-950 dark:via-zinc-950 to-transparent shrink-0">
                    <div className="max-w-4xl mx-auto">
                        <ChatInput onSend={sendMessage} />
                    </div>
                </div>
            </main>
        </div>
    );
}