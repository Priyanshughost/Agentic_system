import { useState } from "react";
import { Eye, EyeOff, Loader2, AlertCircle } from "lucide-react";

// PRO FIX: Defined OUTSIDE the main component so it doesn't get destroyed on every keystroke
const InputField = ({
    label,
    name,
    type,
    value,
    onChange,
    disabled,
    error,
    rightElement,
    showPassword,
    onTogglePassword,
    ...props
}) => (
    <div className="space-y-1.5">
        <div className="flex items-center justify-between">
            <label htmlFor={name} className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                {label}
            </label>
            {rightElement && rightElement}
        </div>
        <div className="relative">
            <input
                id={name}
                name={name}
                type={type}
                value={value}
                onChange={onChange}
                disabled={disabled}
                className={`w-full rounded-xl border bg-white dark:bg-zinc-900/50 px-4 py-2.5 text-zinc-900 dark:text-zinc-100 outline-none transition-shadow duration-200
                    ${error
                        ? "border-red-500 focus:ring-2 focus:ring-red-500/20"
                        : "border-zinc-300 dark:border-zinc-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                    } disabled:opacity-50 disabled:cursor-not-allowed`}
                {...props}
            />
            {/* Password Toggle Logic passed via props */}
            {onTogglePassword && (
                <button
                    type="button"
                    onClick={onTogglePassword}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors"
                    tabIndex={-1}
                >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
            )}
        </div>
        {error && (
            <p className="flex items-center gap-1.5 text-sm text-red-500">
                <AlertCircle className="w-4 h-4" />
                {error}
            </p>
        )}
    </div>
);

export default function LoginForm() {
    const [form, setForm] = useState({ email: "", password: "" });
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));

        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: "" }));
        }
    };

    const validateForm = () => {
        const newErrors = {};
        if (!form.email.includes("@")) newErrors.email = "Please enter a valid email";
        if (!form.password) newErrors.password = "Password is required";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setIsLoading(true);
        try {
            await new Promise((resolve) => setTimeout(resolve, 1500));
            console.log("Login successful:", form);
        } catch (error) {
            setErrors({ submit: "Invalid email or password." });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-5" noValidate>

            {errors.submit && (
                <div className="p-3 rounded-lg bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 text-red-600 dark:text-red-400 text-sm flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    {errors.submit}
                </div>
            )}

            <InputField
                label="Email Address"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                error={errors.email}
                disabled={isLoading}
                placeholder="john@example.com"
            />

            <InputField
                label="Password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={form.password}
                onChange={handleChange}
                error={errors.password}
                disabled={isLoading}
                placeholder="••••••••"
                showPassword={showPassword}
                onTogglePassword={() => setShowPassword(!showPassword)}
                rightElement={
                    <a href="/forgot-password" className="text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:underline underline-offset-4" tabIndex={-1}>
                        Forgot password?
                    </a>
                }
            />

            <button
                type="submit"
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] py-3 font-medium text-white transition-all duration-200 shadow-sm disabled:opacity-70 disabled:cursor-not-allowed disabled:active:scale-100"
            >
                {isLoading ? (
                    <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Signing in...
                    </>
                ) : (
                    "Sign In"
                )}
            </button>
        </form>
    );
}