"use client";

import { useState } from "react";
import { useAuth } from "./AuthProvider";
import Navbar from "./Navbar";
import TodoList from "./TodoList";
import AuthModal from "./AuthModal";

export default function TodoApp() {
    const { user, logout, refreshUser } = useAuth();
    const [showAuth, setShowAuth] = useState(false);

    return (
        <>
            <Navbar
                user={user}
                onLoginClick={() => setShowAuth(true)}
                onLogout={logout}
            />

            <main>
                <TodoList user={user} />
            </main>

            <AuthModal
                isOpen={showAuth}
                onClose={() => setShowAuth(false)}
                onSuccess={() => {
                    refreshUser();
                    setShowAuth(false);
                }}
            />
        </>
    );
}