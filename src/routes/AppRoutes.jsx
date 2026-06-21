import {
    Routes,
    Route,
    Navigate,
} from "react-router-dom";

import LoginPage
    from "../features/auth/pages/LoginPage";

import RegisterPage
    from "../features/auth/pages/RegisterPage";

import ChatWindow
    from "../features/chat/components/ChatWindow";

import ProtectedRoute
    from "./ProtectedRoute";

export default function AppRoutes() {
    return (
        <Routes>
            <Route
                path="/login"
                element={<LoginPage />}
            />

            <Route
                path="/register"
                element={<RegisterPage />}
            />

            <Route
                path="/chat"
                element={
                    <ProtectedRoute>
                        <ChatWindow />
                    </ProtectedRoute>
                }
            />

            <Route
                path="*"
                element={
                    <Navigate
                        to="/login"
                        replace
                    />
                }
            />
        </Routes>
    );
}