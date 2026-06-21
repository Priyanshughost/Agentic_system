import LoginForm from "../components/LoginForm";
import { Sparkles } from "lucide-react";

export default function LoginPage() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-zinc-950 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-100/40 via-zinc-50 to-zinc-50 dark:from-indigo-900/20 dark:via-zinc-950 dark:to-zinc-950 px-4 py-12 font-sans text-zinc-900 dark:text-zinc-100">

            <div className="w-full max-w-md">
                {/* Branding/Logo Area */}
                <div className="flex flex-col items-center mb-8">
                    <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20 mb-4">
                        <Sparkles className="w-6 h-6 text-white" />
                    </div>
                    <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-center">
                        Welcome back
                    </h1>
                    <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400 text-center">
                        Sign in to continue to your Agentic Assistant.
                    </p>
                </div>

                {/* Card Container */}
                <div className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-xl shadow-zinc-200/50 dark:shadow-none p-6 sm:p-8">
                    <LoginForm />

                    {/* Routing link back to Register */}
                    <div className="mt-6 text-center text-sm text-zinc-500 dark:text-zinc-400">
                        Don't have an account?{" "}
                        <a href="/register" className="font-semibold text-indigo-600 dark:text-indigo-400 hover:underline underline-offset-4 transition-all">
                            Sign up
                        </a>
                    </div>
                </div>

            </div>
        </div>
    );
}