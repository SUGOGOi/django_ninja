"use client";

import { useState } from "react";
import TodoItem from "./TodoItem";

export default function TodoList({ user }) {
    const [todos, setTodos] = useState([
        {
            id: "1",
            title: "Design new landing page",
            description: "Create a modern, responsive landing page with hero section, features grid, and CTA. Use the new brand colors.",
            completed: false,
            createdAt: new Date(),
        },
        {
            id: "2",
            title: "Review pull requests",
            description: "Check the auth refactor and the API rate limiting PRs. Leave comments by EOD.",
            completed: true,
            createdAt: new Date(),
        },
        {
            id: "3",
            title: "Update documentation",
            description: "Add the new OAuth flow docs and update the API reference for the todo endpoints.",
            completed: false,
            createdAt: new Date(),
        },
    ]);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [completed, setCompleted] = useState(false);
    const [filter, setFilter] = useState("all");

    const addTodo = (e) => {
        e.preventDefault();
        if (!title.trim()) return;

        setTodos([
            {
                id: Date.now().toString(),
                title: title.trim(),
                description: description.trim(),
                completed,
                createdAt: new Date(),
            },
            ...todos,
        ]);

        setTitle("");
        setDescription("");
        setCompleted(false);
    };

    const toggleTodo = (id) => {
        setTodos(todos.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
    };

    const deleteTodo = (id) => {
        setTodos(todos.filter((t) => t.id !== id));
    };

    const editTodo = (id, updates) => {
        setTodos(todos.map((t) => (t.id === id ? { ...t, ...updates } : t)));
    };

    const filtered = todos.filter((t) => {
        if (filter === "active") return !t.completed;
        if (filter === "completed") return t.completed;
        return true;
    });

    const activeCount = todos.filter((t) => !t.completed).length;

    return (
        <div className="max-w-2xl mx-auto px-4 py-8">
            {/* Add Task Form */}
            <form onSubmit={addTodo} className="mb-8 space-y-3">
                <div className="flex items-center gap-2">
                    <input
                        type="text"
                        placeholder="Task title..."
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="flex-1 px-4 py-3 bg-background border border-foreground/10 rounded-xl text-sm outline-none focus:border-foreground/30 transition-colors text-foreground placeholder:text-foreground/40"
                    />
                    <button
                        type="submit"
                        disabled={!title.trim()}
                        className="px-4 py-3 bg-foreground text-background rounded-xl text-sm font-medium hover:bg-foreground/90 transition-colors disabled:opacity-30"
                    >
                        Add
                    </button>
                </div>

                <textarea
                    placeholder="Description (optional)..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={2}
                    className="w-full px-4 py-2.5 bg-background border border-foreground/10 rounded-xl text-sm outline-none focus:border-foreground/30 transition-colors text-foreground placeholder:text-foreground/40 resize-none"
                />

                <label className="flex items-center gap-2 text-sm text-foreground/60 cursor-pointer select-none">
                    <button
                        type="button"
                        onClick={() => setCompleted(!completed)}
                        className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-all ${completed
                            ? "bg-foreground border-foreground"
                            : "border-foreground/20 hover:border-foreground/40"
                            }`}
                    >
                        {completed && (
                            <svg className="w-2.5 h-2.5 text-background" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                        )}
                    </button>
                    Mark as completed
                </label>
            </form>

            {/* Filters */}
            <div className="flex items-center gap-1 mb-4 p-1 bg-foreground/5 rounded-xl w-fit">
                {["all", "active", "completed"].map((f) => (
                    <button
                        key={f}
                        onClick={() => setFilter(f)}
                        className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${filter === f
                            ? "bg-background text-foreground shadow-sm"
                            : "text-foreground/50 hover:text-foreground/70"
                            }`}
                    >
                        {f.charAt(0).toUpperCase() + f.slice(1)}
                    </button>
                ))}
            </div>

            {/* List */}
            <div className="space-y-1">
                {filtered.length === 0 ? (
                    <div className="text-center py-12 text-foreground/40 text-sm">
                        {filter === "completed"
                            ? "No completed tasks yet"
                            : filter === "active"
                                ? "No active tasks"
                                : "Start by adding a task above"}
                    </div>
                ) : (
                    filtered.map((todo) => (
                        <TodoItem
                            key={todo.id}
                            todo={todo}
                            onToggle={toggleTodo}
                            onDelete={deleteTodo}
                            onEdit={editTodo}
                        />
                    ))
                )}
            </div>

            {/* Footer */}
            {todos.length > 0 && (
                <div className="mt-6 pt-4 border-t border-foreground/10 flex items-center justify-between text-xs text-foreground/50">
                    <span>{activeCount} remaining</span>
                    {todos.filter((t) => t.completed).length > 0 && (
                        <button
                            onClick={() => setTodos(todos.filter((t) => !t.completed))}
                            className="hover:text-foreground transition-colors"
                        >
                            Clear completed
                        </button>
                    )}
                </div>
            )}
        </div>
    );
}