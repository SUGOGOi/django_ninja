"use client";

export default function Navbar({ user, onLoginClick, onLogout }) {
    return (
        <nav className="w-full border-b border-foreground/10 bg-background/80 backdrop-blur-sm sticky top-0 z-50">
            <div className="max-w-2xl mx-auto px-4 h-14 flex items-center justify-between">
                <h1 className="text-lg font-semibold text-foreground tracking-tight">Tasks</h1>

                <div className="flex items-center gap-3">
                    {user ? (
                        <div className="flex items-center gap-3">
                            <span className="text-sm text-foreground/60 hidden sm:block">{user.email}</span>
                            <button
                                onClick={onLogout}
                                className="text-sm text-foreground/60 hover:text-foreground transition-colors px-3 py-1.5 rounded-lg hover:bg-foreground/5"
                            >
                                Log out
                            </button>
                        </div>
                    ) : (
                        <button
                            onClick={onLoginClick}
                            className="text-sm bg-foreground text-background px-4 py-2 rounded-lg hover:bg-foreground/90 transition-colors"
                        >
                            Sign in
                        </button>
                    )}
                </div>
            </div>
        </nav>
    );
}