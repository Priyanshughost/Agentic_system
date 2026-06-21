import { useState } from "react";
import { Bot, User, Copy, Check } from "lucide-react";

export default function ChatBubble({ message }) {
    const isUser = message.role === "user";
    const [isCopied, setIsCopied] = useState(false);

    // UX Win: Simple copy to clipboard handler
    const handleCopy = () => {
        navigator.clipboard.writeText(message.content);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
    };

    return (
        // Flex-row-reverse flips the layout seamlessly for the user
        <div className={`flex w-full gap-4 ${isUser ? "flex-row-reverse" : "flex-row"} group`}>

            {/* 1. Avatar Column */}
            <div className="flex-shrink-0 mt-auto sm:mt-0">
                {isUser ? (
                    <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 flex items-center justify-center border border-indigo-200 dark:border-indigo-500/30">
                        <User className="w-5 h-5" />
                    </div>
                ) : (
                    <div className="w-8 h-8 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 flex items-center justify-center border border-zinc-200 dark:border-zinc-700">
                        <Bot className="w-5 h-5" />
                    </div>
                )}
            </div>

            {/* 2. Message Column */}
            <div className={`flex flex-col max-w-[85%] sm:max-w-[75%] ${isUser ? "items-end" : "items-start"}`}>

                {/* Meta-data (Optional: Name / Timestamp can go here) */}
                <div className="flex items-center gap-2 mb-1.5 px-1">
                    <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                        {isUser ? "You" : "Agentic Assistant"}
                    </span>
                </div>

                {/* 3. The actual bubble with directional border-radii */}
                <div
                    className={`relative px-5 py-3.5 text-sm md:text-base leading-relaxed shadow-sm transition-colors
                        ${isUser
                            ? "bg-indigo-600 text-white rounded-3xl rounded-tr-sm"
                            : "bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 rounded-3xl rounded-tl-sm"
                        }
                    `}
                >
                    {/* Pro Tip: If your AI sends Markdown, you'd wrap this content in <ReactMarkdown> here */}
                    <p className="whitespace-pre-wrap break-words">
                        {message.content}
                    </p>
                </div>

                {/* 4. Action Bar (Copy Button) - Only shows for AI, fades in on group hover */}
                {!isUser && (
                    <div className="flex items-center gap-2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <button
                            onClick={handleCopy}
                            className="flex items-center gap-1.5 p-1.5 text-xs font-medium text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                            aria-label="Copy message"
                        >
                            {isCopied ? (
                                <>
                                    <Check className="w-3.5 h-3.5 text-emerald-500" />
                                    <span className="text-emerald-600 dark:text-emerald-500">Copied!</span>
                                </>
                            ) : (
                                <>
                                    <Copy className="w-3.5 h-3.5" />
                                    <span>Copy</span>
                                </>
                            )}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}