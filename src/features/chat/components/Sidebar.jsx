import React from "react";
import {
    Plus,
    MessageSquare,
    Settings,
    User,
    X,
    MoreHorizontal,
    Sparkles
} from "lucide-react";
import { useAuthStore } from "../../auth/store/authStore";
import { useNavigate } from "react-router-dom";
import { logoutUser, } from "../../auth/services/authApi";

// Mock data for demonstration - in reality, this comes from your store/DB
const RECENT_CHATS = [
    { id: 1, title: "React Performance Tips", active: true },
    { id: 2, title: "Write a Python Script", active: false },
    { id: 3, title: "Explain Quantum Physics", active: false },
    { id: 4, title: "Debug Next.js Error", active: false },
];

export default function Sidebar({ onClose }) {
    const navigate =
        useNavigate();

    const token =
        useAuthStore(
            (state) =>
                state.token
        );

    const logout =
        useAuthStore(
            (state) =>
                state.logout
        );

    const user =
        useAuthStore(
            (state) =>
                state.user
        );

    const handleLogout =
        async () => {

            try {

                await logoutUser(
                    token
                );

            }
            catch (error) {

                console.error(
                    "Logout failed:",
                    error
                );

            }
            finally {

                logout();

                navigate(
                    "/login"
                );

            }
        };

    return (
        // Removed the hardcoded width and hidden classes. The parent ChatWindow handles dimensions and breakpoints.
        <aside className="flex flex-col h-full w-full bg-zinc-50 dark:bg-zinc-950 border-r border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 font-sans">

            {/* Header Area */}
            <div className="flex items-center justify-between p-4 border-b border-zinc-200 dark:border-zinc-800 shrink-0">
                <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-indigo-600 text-white flex items-center justify-center shadow-sm">
                        <Sparkles className="w-4 h-4" />
                    </div>
                    <h1 className="font-semibold text-[15px] tracking-tight">
                        AI Assistant
                    </h1>
                </div>

                {/* Mobile Close Button - Only visible on smaller screens */}
                <button
                    onClick={onClose}
                    className="p-1.5 rounded-md lg:hidden hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-500 transition-colors"
                    aria-label="Close sidebar"
                >
                    <X className="w-5 h-5" />
                </button>
            </div>

            {/* Primary Action */}
            <div className="p-3 shrink-0">
                <button className="flex items-center gap-2 w-full rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-2.5 text-sm font-medium hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all shadow-sm group">
                    <Plus className="w-4 h-4 text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition-transform" />
                    New Chat
                </button>
            </div>

            {/* Scrollable Chat History */}
            <div className="flex-1 overflow-y-auto px-3 py-2 scrollbar-thin">
                <div className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 mb-3 px-2 uppercase tracking-wider">
                    Recent
                </div>
                <div className="space-y-1">
                    {RECENT_CHATS.map((chat) => (
                        <button
                            key={chat.id}
                            className={`flex items-center gap-3 w-full rounded-lg px-2.5 py-2 text-sm text-left transition-colors truncate
                                ${chat.active
                                    ? "bg-zinc-200/50 dark:bg-zinc-800/50 font-medium text-zinc-900 dark:text-zinc-100"
                                    : "hover:bg-zinc-200/50 dark:hover:bg-zinc-800/50 text-zinc-600 dark:text-zinc-400"
                                }
                            `}
                        >
                            <MessageSquare className="w-4 h-4 shrink-0 opacity-70" />
                            <span className="truncate">{chat.title}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Sticky Footer - User Profile / Settings */}
            <div className="p-3 border-t border-zinc-200 dark:border-zinc-800 shrink-0">
                <div className="space-y-2">

                    <button
                        className="flex items-center justify-between w-full rounded-xl p-2 hover:bg-zinc-200/50 dark:hover:bg-zinc-800/50 transition-colors"
                    >
                        <div className="flex items-center gap-3">

                            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white text-sm font-semibold">
                                {user?.name?.charAt(0)?.toUpperCase() || "U"}
                            </div>

                            <div className="flex flex-col items-start text-sm">
                                <span className="font-medium text-zinc-900 dark:text-zinc-100">
                                    {user?.name}
                                </span>

                                <span className="text-xs text-zinc-500 dark:text-zinc-400 truncate max-w-[180px]">
                                    {user?.email}
                                </span>
                            </div>

                        </div>

                        <MoreHorizontal className="w-4 h-4 text-zinc-400 hidden" />
                    </button>

                    <button
                        onClick={handleLogout}
                        className="w-full rounded-xl border border-red-500/20 bg-red-500/5 px-3 py-2 text-sm text-red-500 hover:bg-red-500/10 transition-colors"
                    >
                        Logout
                    </button>

                </div>
            </div>
        </aside>
    );
}