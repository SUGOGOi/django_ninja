"use client";

import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used within AuthProvider");
    return ctx;
}

export default function AuthProvider({ children, initialUser }) {
    const [user, setUser] = useState(initialUser);

    const logout = async () => {
        await fetch("/api/auth/logout", { method: "POST" });
        setUser(null);
    };

    const refreshUser = async () => {
        try {
            const res = await fetch("/api/auth/me", { cache: "no-store" });
            const data = res.ok ? await res.json() : null;
            setUser(data);
        } catch {
            setUser(null);
        }
    };

    return (
        <AuthContext.Provider value={{ user, logout, refreshUser }}>
            {children}
        </AuthContext.Provider>
    );
}