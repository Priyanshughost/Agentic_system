import { useState, useRef } from "react";
import { Check, Copy } from "lucide-react";

export default function CodeBlock({ language, children }) {
    const [copied, setCopied] = useState(false);
    const contentRef = useRef(null);

    const handleCopy = async () => {
        if (!contentRef.current) return;

        // Extract text directly from the DOM to avoid copying '[object Object]'
        const code = contentRef.current.innerText.replace(/\n$/, "");

        try {
            await navigator.clipboard.writeText(code);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (error) {
            console.error("Failed to copy code: ", error);
        }
    };

    return (
        <div className="my-4 overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950">

            {/* Header / Top Bar */}
            <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 px-4 py-2 bg-zinc-100/50 dark:bg-zinc-900/50">
                <span className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                    {language || "TEXT"}
                </span>

                <button
                    onClick={handleCopy}
                    className="flex items-center gap-1.5 rounded-md p-1.5 sm:px-2 sm:py-1 text-xs font-medium text-zinc-500 dark:text-zinc-400 transition-colors hover:bg-zinc-200 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-white"
                    aria-label="Copy code"
                >
                    {copied ? (
                        <>
                            <Check className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-emerald-600 dark:text-emerald-500" />
                            <span>Copied</span>
                        </>
                    ) : (
                        <>
                            <Copy className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                            <span>Copy</span>
                        </>
                    )}
                </button>
            </div>

            {/* Content Wrapper for DOM text extraction */}
            <div ref={contentRef}>
                {children}
            </div>

        </div>
    );
}