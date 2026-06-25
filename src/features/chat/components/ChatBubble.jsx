import { useState } from "react";
import { Bot, User, Copy, Check } from "lucide-react";
import MarkdownRenderer from "./MarkdownRenderer";

export default function ChatBubble({ message }) {
    const isUser = message.role === "user";
    const [isCopied, setIsCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(message.content);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
    };

    return (
        <div 
            className={`flex flex-col min-w-0 max-w-[85%] sm:max-w-[75%] group 
                ${isUser ? "self-end items-end" : "self-start items-start"}
            `}
        >
            {/* The Bubble */}
            <div
                className={`relative max-w-full overflow-x-auto scrollbar-hide px-5 py-3.5 text-sm md:text-base leading-relaxed shadow-sm transition-colors
                    ${isUser
                        ? "bg-indigo-600 text-white rounded-3xl rounded-tr-sm"
                        : "text-zinc-900 dark:text-zinc-100" 
                    }
                `}
            >
                {isUser ? (
                    <p className="whitespace-pre-wrap break-words">
                        {message.content}
                    </p>
                ) : (
                    <MarkdownRenderer content={message.content} />
                )}
            </div>

            {/* Action Bar */}
            {!isUser && (
                <div className="flex items-center gap-2 mt-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-200">
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
    );
}