import { Navigate } from "react-router-dom";
import { useAuthStore } from "../features/auth/store/authStore";

export default function ProtectedRoute({
    children,
}) {

    const token =
        useAuthStore(
            (state) =>
                state.token
        );

    const isLoading =
        useAuthStore(
            (state) =>
                state.isLoading
        );

    if (isLoading) {
        return (
            <div className="w-full h-screen absolute z-999 bg-zinc text-white">
                Loading...
            </div>
        );
    }

    if (!token) {
        return (
            <Navigate
                to="/login"
                replace
            />
        );
    }

    return children;
}