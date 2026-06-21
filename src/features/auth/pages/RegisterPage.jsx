import RegisterForm from "../components/RegisterForm";
import { Sparkles } from "lucide-react";

export default function RegisterPage() {
    return (
        // Replaced static dark background with a responsive, theme-aware gradient
        <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-zinc-950 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-100/40 via-zinc-50 to-zinc-50 dark:from-indigo-900/20 dark:via-zinc-950 dark:to-zinc-950 px-4 py-12 font-sans text-zinc-900 dark:text-zinc-100">

            <div className="w-full max-w-md">
                {/* Branding/Logo Area */}
                <div className="flex flex-col items-center mb-8">
                    <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20 mb-4">
                        <Sparkles className="w-6 h-6 text-white" />
                    </div>
                    <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-center">
                        Join the platform
                    </h1>
                    <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400 text-center">
                        Start chatting with your Agentic Assistant today.
                    </p>
                </div>

                {/* Card Container */}
                <div className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-xl shadow-zinc-200/50 dark:shadow-none p-6 sm:p-8">
                    <RegisterForm />

                    {/* Pro touch: Routing links are expected on auth pages */}
                    <div className="mt-6 text-center text-sm text-zinc-500 dark:text-zinc-400">
                        Already have an account?{" "}
                        {/* Assuming you are using react-router-dom, this would be a <Link> */}
                        <a href="/login" className="font-semibold text-indigo-600 dark:text-indigo-400 hover:underline underline-offset-4 transition-all">
                            Sign in
                        </a>
                    </div>
                </div>

                {/* Footer disclaimer */}
                <p className="mt-8 text-center text-xs text-zinc-500 dark:text-zinc-500 px-6">
                    By registering, you agree to our Terms of Service and Privacy Policy.
                </p>
            </div>
        </div>
    );
}