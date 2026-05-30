"use client";

import { useState } from "react";

export default function AuthModal({ isOpen, onClose, onSuccess }) {
    const [mode, setMode] = useState("login");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        try {
            const endpoint = mode === "login" ? "/api/auth/login" : "/api/auth/register";
            const body = mode === "login"
                ? { email, password }
                : { email, password, name };

            const res = await fetch(endpoint, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });

            if (!res.ok) throw new Error(mode === "login" ? "Login failed" : "Registration failed");

            onSuccess();
        } catch (err) {
            setError(err instanceof Error ? err.message : "Something went wrong");
            setIsLoading(false);
        }
    };

    const handleOAuth = (provider) => {
        window.location.href = `/api/auth/oauth/${provider}`;
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={onClose} />

            <div className="relative bg-background rounded-2xl shadow-xl w-full max-w-md p-6 border border-foreground/10">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold text-foreground">
                        {mode === "login" ? "Welcome back" : "Create account"}
                    </h2>
                    <button onClick={onClose} className="p-1 hover:bg-foreground/5 rounded-lg text-foreground/50">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* OAuth */}
                <div className="space-y-2 mb-6">
                    <button
                        onClick={() => handleOAuth("google")}
                        className="w-full flex items-center justify-center gap-2 px-4 py-2.5 border border-foreground/10 rounded-xl hover:bg-foreground/5 transition-colors text-sm font-medium text-foreground/80"
                    >
                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                        </svg>
                        Continue with Google
                    </button>

                    <button
                        onClick={() => handleOAuth("github")}
                        className="w-full flex items-center justify-center gap-2 px-4 py-2.5 border border-foreground/10 rounded-xl hover:bg-foreground/5 transition-colors text-sm font-medium text-foreground/80"
                    >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                        </svg>
                        Continue with GitHub
                    </button>
                </div>

                <div className="relative mb-6">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-foreground/10" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-background px-2 text-foreground/40">Or continue with email</span>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {mode === "register" && (
                        <input
                            type="text"
                            placeholder="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="w-full px-4 py-2.5 border border-foreground/10 rounded-xl text-sm outline-none focus:border-foreground/30 transition-colors bg-background text-foreground placeholder:text-foreground/40"
                        />
                    )}

                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full px-4 py-2.5 border border-foreground/10 rounded-xl text-sm outline-none focus:border-foreground/30 transition-colors bg-background text-foreground placeholder:text-foreground/40"
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full px-4 py-2.5 border border-foreground/10 rounded-xl text-sm outline-none focus:border-foreground/30 transition-colors bg-background text-foreground placeholder:text-foreground/40"
                    />

                    {error && <p className="text-sm text-red-500">{error}</p>}

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-foreground text-background py-2.5 rounded-xl text-sm font-medium hover:bg-foreground/90 transition-colors disabled:opacity-50"
                    >
                        {isLoading ? "Loading..." : mode === "login" ? "Sign in" : "Create account"}
                    </button>
                </form>

                <p className="mt-4 text-center text-sm text-foreground/60">
                    {mode === "login" ? (
                        <>
                            Don&apos;t have an account?{" "}
                            <button onClick={() => setMode("register")} className="text-foreground font-medium hover:underline">
                                Sign up
                            </button>
                        </>
                    ) : (
                        <>
                            Already have an account?{" "}
                            <button onClick={() => setMode("login")} className="text-foreground font-medium hover:underline">
                                Sign in
                            </button>
                        </>
                    )}
                </p>
            </div>
        </div>
    );
}