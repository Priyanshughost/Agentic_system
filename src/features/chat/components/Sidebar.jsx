import React from "react";
import {
    Plus,
    MessageSquare,
    Settings,
    X,
    LogOut,
    Sparkles
} from "lucide-react";
import { useAuthStore } from "../../auth/store/authStore";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../auth/services/authApi";
import { useChatStore } from "../store/chatStore";
import { getConversationMessages } from "../services/conversationApi";

export default function Sidebar({ onClose }) {
    const navigate = useNavigate();

    const loadConversation =
        useChatStore(
            (state) =>
                state.loadConversation
        );

    const activeConversationId =
        useChatStore(
            (state) =>
                state.activeConversationId
        );
    // Zustand selectors (kept separate to prevent unnecessary re-renders)
    const conversations = useChatStore((state) => state.conversations);
    const token = useAuthStore((state) => state.token);
    const logout = useAuthStore((state) => state.logout);
    const user = useAuthStore((state) => state.user);
    const clearMessages =
        useChatStore(
            (state) =>
                state.clearMessages
        );

    const setActiveConversation =
        useChatStore(
            (state) =>
                state.setActiveConversation
        );

    const handleNewChat =
        () => {

            clearMessages();

            setActiveConversation(
                null
            );

            onClose?.();
        };

    const handleConversationClick =
        async (
            conversationId
        ) => {

            try {

                const messages =
                    await getConversationMessages(
                        conversationId
                    );

                loadConversation(
                    messages,
                    conversationId
                );

                onClose?.();

            }
            catch (error) {

                console.error(
                    error
                );

            }
        };

    const handleLogout = async () => {
        try {
            await logoutUser(token);
        } catch (error) {
            console.error("Logout failed:", error);
        } finally {
            logout();
            navigate("/login");
        }
    };

    return (
        <aside className="flex flex-col h-full w-full bg-zinc-50 dark:bg-zinc-950 border-r border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 font-sans">

            {/* Header Area */}
            <div className="flex items-center justify-between p-4 shrink-0">
                <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-indigo-600 text-white flex items-center justify-center shadow-sm">
                        <Sparkles className="w-4 h-4" />
                    </div>
                    <h1 className="font-semibold text-[15px] tracking-tight">
                        AI Assistant
                    </h1>
                </div>

                {/* Mobile Close Button */}
                <button
                    onClick={onClose}
                    className="p-1.5 rounded-md lg:hidden hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-500 transition-colors"
                    aria-label="Close sidebar"
                >
                    <X className="w-5 h-5" />
                </button>
            </div>

            {/* Primary Action */}
            <div className="px-3 pb-3 shrink-0">
                <button onClick={handleNewChat} className="flex items-center gap-2 w-full rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-2.5 text-sm font-medium hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all shadow-sm group">
                    <Plus className="w-4 h-4 text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition-transform" />
                    New Chat
                </button>
            </div>

            {/* Scrollable Chat History */}
            <div className="flex-1 overflow-y-auto px-3 py-2 scrollbar-thin">
                <div className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 mb-2 px-2 uppercase tracking-wider">
                    Recent
                </div>
                <div className="space-y-0.5 flex flex-col">
                    {conversations.map((conversation) => (
                        <button
                            key={conversation._id}
                            onClick={() =>
                                handleConversationClick(
                                    conversation._id
                                )
                            }
                            className={`flex items-center gap-3 w-full rounded-lg px-2.5 py-2 text-sm text-left transition-colors truncate

                                ${activeConversationId ===
                                    conversation._id
                                    ? "bg-zinc-200/50 dark:bg-zinc-800/50 font-medium text-zinc-900 dark:text-zinc-100"
                                    : "hover:bg-zinc-200/50 dark:hover:bg-zinc-800/50 text-zinc-600 dark:text-zinc-400"
                                }`}
                        >
                            <MessageSquare className="w-4 h-4 shrink-0 opacity-50 group-hover:opacity-100 transition-opacity" />
                            <span className="truncate pr-2">
                                {conversation.title || "New Conversation"}
                            </span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Sticky Footer - User Profile & Logout */}
            <div className="p-3 border-t border-zinc-200 dark:border-zinc-800 shrink-0">
                <div className="flex items-center justify-between w-full rounded-xl p-2 bg-transparent hover:bg-zinc-200/50 dark:hover:bg-zinc-800/50 transition-colors">

                    <div className="flex items-center gap-3 min-w-0">
                        <div className="w-8 h-8 shrink-0 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white text-sm font-semibold shadow-inner">
                            {user?.name?.charAt(0)?.toUpperCase() || "U"}
                        </div>

                        <div className="flex flex-col items-start text-sm min-w-0 pr-2">
                            <span className="font-medium text-zinc-900 dark:text-zinc-100 truncate w-full">
                                {user?.name || "User"}
                            </span>
                            <span className="text-xs text-zinc-500 dark:text-zinc-400 truncate w-full">
                                {user?.email || "No email provided"}
                            </span>
                        </div>
                    </div>

                    <button
                        onClick={handleLogout}
                        title="Logout"
                        className="p-2 shrink-0 rounded-lg text-zinc-500 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors"
                    >
                        <LogOut className="w-4 h-4" />
                    </button>

                </div>
            </div>

        </aside>
    );
}