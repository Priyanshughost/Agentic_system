import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import CodeBlock from "./CodeBlock";

export default function MarkdownRenderer({ content }) {
    return (
        <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeHighlight]}
            components={{
                h1: ({ children }) => (
                    <h1 className="text-2xl sm:text-3xl font-bold mt-6 mb-4">
                        {children}
                    </h1>
                ),

                h2: ({ children }) => (
                    <h2 className="text-xl sm:text-2xl font-semibold mt-5 mb-3">
                        {children}
                    </h2>
                ),

                h3: ({ children }) => (
                    <h3 className="text-lg sm:text-xl font-semibold mt-4 mb-2">
                        {children}
                    </h3>
                ),

                p: ({ children }) => (
                    <p className="leading-7 mb-3 whitespace-pre-wrap break-words">
                        {children}
                    </p>
                ),

                ul: ({ children }) => (
                    <ul className="list-disc pl-4 sm:pl-6 mb-3 space-y-1 break-words">
                        {children}
                    </ul>
                ),

                ol: ({ children }) => (
                    <ol className="list-decimal pl-4 sm:pl-6 mb-3 space-y-1 break-words">
                        {children}
                    </ol>
                ),

                li: ({ children }) => (
                    <li>{children}</li>
                ),

                blockquote: ({ children }) => (
                    <blockquote className="border-l-4 border-indigo-500 pl-4 italic text-zinc-600 dark:text-zinc-400 my-4 break-words">
                        {children}
                    </blockquote>
                ),

                hr: () => (
                    <hr className="my-6 border-zinc-300 dark:border-zinc-700" />
                ),

                a: ({ href, children }) => (
                    <a
                        href={href}
                        target="_blank"
                        rel="noreferrer"
                        className="text-indigo-600 dark:text-indigo-400 underline break-all"
                    >
                        {children}
                    </a>
                ),

                table: ({ children }) => (
                    <div className="overflow-x-auto my-4">
                        <table className="w-full border-collapse border border-zinc-300 dark:border-zinc-700 text-sm sm:text-base">
                            {children}
                        </table>
                    </div>
                ),

                th: ({ children }) => (
                    <th className="border border-zinc-300 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800/50 px-3 py-2 text-left font-semibold">
                        {children}
                    </th>
                ),

                td: ({ children }) => (
                    <td className="border border-zinc-300 dark:border-zinc-700 px-3 py-2">
                        {children}
                    </td>
                ),

                code({ className, children, ...props }) {
                    const match = /language-(\w+)/.exec(className || "");
                    const language = match?.[1];

                    if (!language) {
                        return (
                            <code
                                className="rounded bg-zinc-200 dark:bg-zinc-800 px-1.5 py-0.5 text-pink-600 dark:text-pink-400 text-sm break-words"
                                {...props}
                            >
                                {children}
                            </code>
                        );
                    }

                    return (
                        <CodeBlock language={language}>
                            <pre className="p-4 text-sm">
                                <code className={className} {...props} style={{ backgroundColor: 'transparent' }}>
                                    {children}
                                </code>
                            </pre>
                        </CodeBlock>
                    );
                },
            }}
        >
            {content}
        </ReactMarkdown>
    );
}