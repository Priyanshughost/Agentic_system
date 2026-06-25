import { useState, useRef, useEffect } from "react";
import {
    Check,
    MoreHorizontal,
    Pencil,
    Trash2,
    X,
    MessageSquare,
    Loader2
} from "lucide-react";

import { useChatStore } from "../store/chatStore";
import {
    deleteConversation,
    getConversationMessages,
    renameConversation as renameConversationApi,
} from "../services/conversationApi";

export default function ConversationItem({
    conversation,
    onClose,
}) {
    const activeConversationId = useChatStore(
        state => state.activeConversationId
    );

    const loadConversation = useChatStore(
        state => state.loadConversation
    );

    const renameConversation = useChatStore(
        state => state.renameConversation
    );

    const deleteConversationStore = useChatStore(
        state => state.deleteConversation
    );

    const [menuOpen, setMenuOpen] = useState(false);
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [title, setTitle] = useState(conversation.title);

    const menuRef = useRef(null);

    // Close menu & reset confirm state on outside click
    useEffect(() => {
        function handleClickOutside(event) {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setMenuOpen(false);
                setConfirmDelete(false);
            }
        }

        if (menuOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [menuOpen]);

    const handleDelete = async () => {
        if (isDeleting) return;
        setIsDeleting(true);

        try {
            await deleteConversation(conversation._id);
            deleteConversationStore(conversation._id);

            setMenuOpen(false);
            setConfirmDelete(false);
            onClose?.();
        } catch (error) {
            console.error(error);
            setIsDeleting(false); // Only reset on error so the component can unmount smoothly on success
        }
    };

    const handleConversationClick = async () => {
        if (isEditing) return;

        try {
            const messages = await getConversationMessages(
                conversation._id
            );
            loadConversation(
                messages,
                conversation._id
            );
            onClose?.();
        } catch (error) {
            console.error(error);
        }
    };

    const handleRename = () => {
        setMenuOpen(false);
        setConfirmDelete(false);
        setIsEditing(true);
    };

    const handleSave = async () => {
        const trimmed = title.trim();

        setMenuOpen(false); // Ensure menu closes
        setConfirmDelete(false);

        if (
            !trimmed ||
            trimmed === conversation.title
        ) {
            setTitle(conversation.title);
            setIsEditing(false);
            return;
        }

        try {
            await renameConversationApi(
                conversation._id,
                trimmed
            );
            renameConversation(
                conversation._id,
                trimmed
            );
        } catch (error) {
            console.error(error);
            setTitle(conversation.title);
        }

        setIsEditing(false);
    };

    const handleCancel = () => {
        setTitle(conversation.title);
        setIsEditing(false);
    };

    return (
        <div
            className={`
                group
                flex
                items-center
                justify-between
                rounded-lg
                px-2.5
                py-2
                text-sm
                transition-colors
                ${activeConversationId === conversation._id
                    ? "bg-zinc-200/50 dark:bg-zinc-800/50"
                    : "hover:bg-zinc-200/50 dark:hover:bg-zinc-800/50"
                }
            `}
        >
            <div
                onClick={handleConversationClick}
                className="flex flex-1 items-center gap-3 cursor-pointer min-w-0"
            >
                <MessageSquare className="w-4 h-4 shrink-0 opacity-60" />

                {isEditing ? (
                    <input
                        autoFocus
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        onBlur={handleSave}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") handleSave();
                            if (e.key === "Escape") handleCancel();
                        }}
                        className="bg-transparent border-none outline-none flex-1"
                    />
                ) : (
                    <span className="truncate">
                        {conversation.title}
                    </span>
                )}
            </div>

            {isEditing ? (
                <div className="flex items-center">
                    <button
                        onMouseDown={(e) => {
                            // Use onMouseDown instead of onClick to prevent onBlur from firing first
                            e.preventDefault();
                            handleSave();
                        }}
                        className="p-1"
                    >
                        <Check className="w-4 h-4 text-green-500" />
                    </button>
                    <button
                        onMouseDown={(e) => {
                            e.preventDefault();
                            handleCancel();
                        }}
                        className="p-1"
                    >
                        <X className="w-4 h-4 text-red-500" />
                    </button>
                </div>
            ) : (
                <div className="relative" ref={menuRef}>
                    <button
                        onClick={() => {
                            setConfirmDelete(false);
                            setMenuOpen(!menuOpen);
                        }}
                        className="opacity-0 group-hover:opacity-100 transition-opacity p-1"
                    >
                        <MoreHorizontal className="w-4 h-4" />
                    </button>

                    {/* Using visibility, opacity, and scale alongside transition-all 
                        allows standard Tailwind to animate the entrance/exit without unmounting immediately. 
                    */}
                    <div
                        className={`
                            absolute right-0 top-full mt-1 rounded-lg border border-zinc-200 
                            dark:border-zinc-700 bg-white dark:bg-zinc-900 shadow-lg z-20 
                            overflow-hidden origin-top-right transition-all duration-150 ease-out
                            ${menuOpen
                                ? "scale-100 opacity-100 visible translate-y-0"
                                : "scale-95 opacity-0 invisible -translate-y-1"
                            }
                        `}
                    >
                        {confirmDelete ? (
                            <div className="p-3 w-56">
                                <p className="text-sm font-medium">
                                    Delete conversation?
                                </p>
                                <p className="text-xs text-zinc-500 mt-1">
                                    This action cannot be undone.
                                </p>
                                <div className="flex justify-end gap-2 mt-4">
                                    <button
                                        onClick={() => setConfirmDelete(false)}
                                        disabled={isDeleting}
                                        className="px-2 py-1 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800 disabled:opacity-50"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleDelete}
                                        disabled={isDeleting}
                                        className="flex items-center gap-1 px-2 py-1 rounded bg-red-500 text-white hover:bg-red-600 disabled:opacity-75"
                                    >
                                        {isDeleting && <Loader2 className="w-3 h-3 animate-spin" />}
                                        {isDeleting ? "Deleting" : "Delete"}
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="w-36">
                                <button
                                    onClick={handleRename}
                                    className="flex items-center gap-2 w-full px-3 py-2 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800"
                                >
                                    <Pencil className="w-4 h-4" />
                                    Rename
                                </button>
                                <button
                                    onClick={() => setConfirmDelete(true)}
                                    className="flex items-center gap-2 w-full px-3 py-2 text-sm text-red-500 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                                >
                                    <Trash2 className="w-4 h-4" />
                                    Delete
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}