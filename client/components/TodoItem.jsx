"use client";

import { useState } from "react";

export default function TodoItem({ todo, onToggle, onDelete, onEdit }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editTitle, setEditTitle] = useState(todo.title);
    const [editDesc, setEditDesc] = useState(todo.description);
    const [expanded, setExpanded] = useState(false);

    const handleSave = () => {
        if (editTitle.trim()) {
            onEdit(todo.id, { title: editTitle.trim(), description: editDesc.trim() });
            setIsEditing(false);
        }
    };

    return (
        <div className="group">
            <div className="flex items-start gap-3 p-3 hover:bg-foreground/5 rounded-xl transition-colors">
                {/* Checkbox */}
                <button
                    onClick={() => onToggle(todo.id)}
                    className={`flex-shrink-0 w-5 h-5 mt-0.5 rounded-full border-2 flex items-center justify-center transition-all ${todo.completed
                        ? "bg-foreground border-foreground"
                        : "border-foreground/20 hover:border-foreground/40"
                        }`}
                >
                    {todo.completed && (
                        <svg className="w-3 h-3 text-background" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                    )}
                </button>

                {/* Content */}
                <div className="flex-1 min-w-0">
                    {isEditing ? (
                        <div className="space-y-2">
                            <input
                                type="text"
                                value={editTitle}
                                onChange={(e) => setEditTitle(e.target.value)}
                                onBlur={handleSave}
                                onKeyDown={(e) => e.key === "Enter" && handleSave()}
                                autoFocus
                                className="w-full text-sm bg-background border border-foreground/10 rounded-lg px-2 py-1 outline-none focus:border-foreground/30 text-foreground font-medium"
                            />
                            <textarea
                                value={editDesc}
                                onChange={(e) => setEditDesc(e.target.value)}
                                onBlur={handleSave}
                                rows={2}
                                className="w-full text-sm bg-background border border-foreground/10 rounded-lg px-2 py-1 outline-none focus:border-foreground/30 text-foreground/70 resize-none"
                                placeholder="Add description..."
                            />
                        </div>
                    ) : (
                        <div onClick={() => setExpanded(!expanded)} className="cursor-pointer">
                            <h3 className={`text-sm font-medium ${todo.completed ? "text-foreground/40 line-through" : "text-foreground"}`}>
                                {todo.title}
                            </h3>
                            {todo.description && (
                                <p className={`text-xs mt-0.5 ${todo.completed ? "text-foreground/25" : "text-foreground/50"} ${expanded ? "" : "line-clamp-1"}`}>
                                    {todo.description}
                                </p>
                            )}
                        </div>
                    )}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                        onClick={() => setIsEditing(!isEditing)}
                        className="p-1.5 text-foreground/40 hover:text-foreground/70 hover:bg-foreground/5 rounded-lg transition-all"
                    >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                        </svg>
                    </button>
                    <button
                        onClick={() => onDelete(todo.id)}
                        className="p-1.5 text-foreground/40 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all"
                    >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
}