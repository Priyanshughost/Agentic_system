import { useState, useRef, useEffect } from "react";
import { ArrowUp } from "lucide-react"; // ArrowUp is commonly used for modern chat sends

export default function ChatInput({ onSend }) {
    const [value, setValue] = useState("");
    const textareaRef = useRef(null);

    // 1. Auto-resize logic: Adjusts height based on content
    useEffect(() => {
        const textarea = textareaRef.current;
        if (!textarea) return;

        // Reset height briefly to recalculate the actual scrollHeight
        textarea.style.height = "auto";
        // Set new height, capped at 200px (approx 8-9 lines) before scrolling internally
        textarea.style.height = `${Math.min(textarea.scrollHeight, 200)}px`;
    }, [value]);

    const handleSubmit = (e) => {
        if (e) e.preventDefault();

        const trimmedValue = value.trim();
        if (!trimmedValue) return;

        onSend(trimmedValue);
        setValue("");

        // Reset height explicitly after sending
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto";
        }
    };

    const handleKeyDown = (e) => {
        // Submit on Enter, allow new line on Shift + Enter
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSubmit();
        }
    };

    // Calculate disabled state once
    const isButtonDisabled = value.trim() === "";

    return (
        <div className="w-full pb-4">
            <form
                onSubmit={handleSubmit}
                // The wrapper acts as the visual "input" box, allowing the button to sit inside it
                className="relative flex items-end w-full max-w-4xl mx-auto p-1.5 bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded-3xl shadow-sm focus-within:ring-2 focus-within:ring-indigo-500/50 transition-shadow duration-200"
            >
                <textarea
                    ref={textareaRef}
                    rows={1}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Message AI..."
                    aria-label="Chat input"
                    // Tailwind classes: pr-14 prevents text from typing "underneath" the absolute positioned button
                    className="w-full max-h-[200px] py-3 pl-4 pr-14 bg-transparent border-none outline-none resize-none text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-500 dark:placeholder:text-zinc-500 overflow-y-auto scrollbar-thin"
                />

                <button
                    type="submit"
                    disabled={isButtonDisabled}
                    aria-label="Send message"
                    // Absolute positioning keeps the button anchored to the bottom right as the textarea grows
                    className={`absolute right-2.5 bottom-2.5 p-2 rounded-full flex items-center justify-center transition-all duration-200 ${isButtonDisabled
                            ? "bg-zinc-100 dark:bg-zinc-800 text-zinc-400 dark:text-zinc-600 cursor-not-allowed"
                            : "bg-indigo-600 hover:bg-indigo-700 text-white shadow-md hover:scale-105"
                        }`}
                >
                    <ArrowUp className="w-5 h-5 stroke-[2.5]" />
                </button>
            </form>

            {/* Pro touch: A subtle footer disclaimer */}
            <div className="text-center mt-3">
                <p className="text-xs text-zinc-500 dark:text-zinc-500">
                    AI can make mistakes. Consider verifying important information.
                </p>
            </div>
        </div>
    );
}