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
        <div className="flex h-screen w-full bg-white dark:bg-[#0a0a0a] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-50 via-white to-white dark:from-zinc-900/20 dark:via-[#0a0a0a] dark:to-[#0a0a0a] text-zinc-900 dark:text-[#e5e5e5] overflow-hidden font-sans">

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
                <header className="flex items-center justify-between px-5 py-3.5 border-b border-zinc-200 dark:border-white/5 bg-white/70 dark:bg-[#0a0a0a]/70 backdrop-blur-xl sticky top-0 z-10 transition-colors">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setIsSidebarOpen(true)}
                            className="p-2 -ml-2 rounded-lg lg:hidden hover:bg-zinc-100 dark:hover:bg-white/5 transition-colors text-zinc-500 dark:text-zinc-400"
                            aria-label="Open Menu"
                        >
                            <Menu className="w-5 h-5" />
                        </button>

                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 rounded-xl border border-indigo-100 dark:border-indigo-500/20 shadow-sm">
                                <Bot className="w-5 h-5" />
                            </div>
                            <div>
                                <h2 className="text-base font-heading font-semibold tracking-wide text-zinc-900 dark:text-zinc-100">
                                    Nexus AI
                                </h2>
                            </div>
                        </div>
                    </div>

                    <button className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-white/5 transition-colors text-zinc-500 dark:text-zinc-400">
                        <MoreVertical className="w-5 h-5" />
                    </button>
                </header>

                {/* Message List Container - Restricted overflow to prevent whole-page scrolling */}
                <div className="flex-1 overflow-y-auto scrollbar-hide overflow-x-hidden relative scroll-smooth">
                    <MessageList messages={messages} />
                </div>

                {/* Input Area - Centered max-width for better reading experience on ultra-wide screens */}
                <div className="p-4 bg-linear-to-t from-white via-white dark:from-[#0a0a0a] dark:via-[#0a0a0a] to-transparent shrink-0">
                    <div className="max-w-4xl mx-auto">
                        <ChatInput onSend={sendMessage} />
                    </div>
                </div>
            </main>
        </div>
    );
}