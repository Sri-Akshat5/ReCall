import React, { useState, useEffect } from "react";
import {
    Edit3,
    Search,
    Plus,
    Trash2,
    Copy,
    Check,
    Grid,
    List as ListIcon,
    Tag,
    Calendar,
    Clock,
    Sparkles,
    HardDrive,
    AlertTriangle,
    X,
    Save,
    ShieldCheck,
    RotateCcw
} from "lucide-react";
import {
    getAllNotes,
    saveNote,
    deleteNote,
    clearAllNotes,
    getNotesDisclaimerAccepted,
    setNotesDisclaimerAccepted
} from "../utils/secureStorage";
import NotesDisclaimerModal from "../components/notes/NotesDisclaimerModal";

export const Notes = ({ onNavigateToTab }) => {
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [sortBy, setSortBy] = useState("updatedAt"); // "updatedAt", "createdAt", "title", "pinned"
    const [viewMode, setViewMode] = useState("grid"); // "grid" or "list"

    // Modals & Drawers
    const [isEditorOpen, setIsEditorOpen] = useState(false);
    const [editingNote, setEditingNote] = useState(null);
    const [showClearConfirm, setShowClearConfirm] = useState(false);
    const [showDisclaimerModal, setShowDisclaimerModal] = useState(false);
    const [copiedNoteId, setCopiedNoteId] = useState(null);
    const [toastMsg, setToastMsg] = useState("");

    // Editor Form fields
    const [formTitle, setFormTitle] = useState("");
    const [formContent, setFormContent] = useState("");
    const [formCategory, setFormCategory] = useState("General");
    const [formColor, setFormColor] = useState("amber");
    const [formTags, setFormTags] = useState("");

    const CATEGORIES = ["All", "Java", "Collections", "System Design", "Interview", "Revision", "General"];

    const COLOR_MAP = {
        amber: "bg-amber-50 dark:bg-amber-950/30 border-amber-300 dark:border-amber-700/60 text-amber-900 dark:text-amber-200",
        emerald: "bg-emerald-50 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-700/60 text-emerald-900 dark:text-emerald-200",
        sky: "bg-sky-50 dark:bg-sky-950/30 border-sky-300 dark:border-sky-700/60 text-sky-900 dark:text-sky-200",
        purple: "bg-purple-50 dark:bg-purple-950/30 border-purple-300 dark:border-purple-700/60 text-purple-900 dark:text-purple-200",
        rose: "bg-rose-50 dark:bg-rose-950/30 border-rose-300 dark:border-rose-700/60 text-rose-900 dark:text-rose-200",
        zinc: "bg-zinc-50 dark:bg-zinc-900/80 border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-zinc-200"
    };

    useEffect(() => {
        if (!getNotesDisclaimerAccepted()) {
            setShowDisclaimerModal(true);
        }
        loadNotes();
    }, []);

    const loadNotes = async () => {
        setLoading(true);
        const data = await getAllNotes();
        setNotes(data);
        setLoading(false);
    };

    const showNotification = (msg) => {
        setToastMsg(msg);
        setTimeout(() => setToastMsg(""), 3500);
    };

    // Open editor for creating or editing note
    const handleOpenEditor = (note = null) => {
        if (!getNotesDisclaimerAccepted()) {
            setShowDisclaimerModal(true);
            return;
        }

        if (note) {
            setEditingNote(note);
            setFormTitle(note.title);
            setFormContent(note.content);
            setFormCategory(note.category || "General");
            setFormColor(note.color || "amber");
            setFormTags(Array.isArray(note.tags) ? note.tags.join(", ") : "");
        } else {
            setEditingNote(null);
            setFormTitle("");
            setFormContent("");
            setFormCategory(selectedCategory !== "All" ? selectedCategory : "General");
            setFormColor("amber");
            setFormTags("");
        }
        setIsEditorOpen(true);
    };

    const handleSaveNote = async (e) => {
        if (e) e.preventDefault();
        if (!formTitle.trim() && !formContent.trim()) {
            showNotification("Please fill in a title or content for your note!");
            return;
        }

        const tagList = formTags
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean);

        await saveNote({
            id: editingNote?.id,
            title: formTitle.trim() || "Untitled Note",
            content: formContent,
            category: formCategory,
            color: formColor,
            tags: tagList,
            createdAt: editingNote?.createdAt
        });

        showNotification(editingNote ? "Note updated successfully!" : "New note saved locally!");
        setIsEditorOpen(false);
        await loadNotes();
    };

    const handleDeleteSingleNote = async (id) => {
        await deleteNote(id);
        showNotification("Note deleted!");
        await loadNotes();
    };

    const handleCopyContent = (note) => {
        const text = `${note.title}\n\n${note.content}`;
        navigator.clipboard.writeText(text);
        setCopiedNoteId(note.id);
        showNotification("Copied note to clipboard!");
        setTimeout(() => setCopiedNoteId(null), 2000);
    };

    const handleClearAll = async () => {
        await clearAllNotes();
        setShowClearConfirm(false);
        showNotification("All notes cleared");
        await loadNotes();
    };

    // Filtering & Sorting
    const filteredNotes = notes.filter((n) => {
        const matchesCategory = selectedCategory === "All" || n.category === selectedCategory;
        const q = searchQuery.toLowerCase().trim();
        const matchesSearch =
            !q ||
            n.title.toLowerCase().includes(q) ||
            n.content.toLowerCase().includes(q) ||
            (n.tags || []).some((t) => t.toLowerCase().includes(q));

        return matchesCategory && matchesSearch;
    });

    // Apply sorting
    filteredNotes.sort((a, b) => {
        if (sortBy === "title") {
            return a.title.localeCompare(b.title);
        }
        if (sortBy === "createdAt") {
            return new Date(b.createdAt) - new Date(a.createdAt);
        }
        // default: updatedAt descending
        return new Date(b.updatedAt) - new Date(a.updatedAt);
    });

    return (
        <div className="space-y-6 sm:space-y-8 font-sans max-w-7xl mx-auto overflow-x-hidden w-full pb-24 min-h-[85vh] select-none">

            {/* Terms Disclaimer Modal */}
            <NotesDisclaimerModal
                isOpen={showDisclaimerModal}
                onClose={() => setShowDisclaimerModal(false)}
                onAccept={() => {
                    setShowDisclaimerModal(false);
                    setIsEditorOpen(true);
                }}
            />

            {/* Toast Banner */}
            {toastMsg && (
                <div className="fixed top-20 right-6 z-50 p-4 rounded-2xl bg-slate-900 text-white dark:bg-white dark:text-black border border-slate-700 dark:border-zinc-300 text-xs font-semibold flex items-center gap-2 animate-in fade-in duration-150">
                    <Check className="w-4 h-4 text-emerald-400 dark:text-emerald-600 shrink-0" />
                    <span>{toastMsg}</span>
                </div>
            )}

            {/* Compact Header Banner */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 dark:bg-zinc-950 dark:border-zinc-800 space-y-3 relative overflow-hidden">
                <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="space-y-0.5">
                        <h1 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                            <Edit3 className="w-4 h-4 text-slate-700 dark:text-zinc-300" />
                            My Notes Workspace &amp; History
                        </h1>
                        <p className="text-xs text-slate-500 dark:text-zinc-400">
                            Create, organize, and revise personal technical study notes saved locally in browser.
                        </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => handleOpenEditor()}
                            className="px-3.5 py-1.5 rounded-xl bg-amber-500 text-black hover:bg-amber-400 font-bold text-xs transition border border-amber-400 flex items-center gap-1.5 cursor-pointer active:scale-95 shadow-sm"
                        >
                            <Plus className="w-4 h-4" />
                            <span>Create New Note</span>
                        </button>
                    </div>
                </div>

                {/* Compact Disclaimer Warning Box */}
                <div className="p-2.5 rounded-xl bg-amber-500/5 border border-amber-500/20 flex flex-wrap items-center justify-between gap-2 text-xs">
                    <div className="flex items-center gap-2 text-slate-700 dark:text-zinc-300 text-[11px] font-medium">
                        <AlertTriangle className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                        <span>
                            Notes are saved directly in local browser storage. Clearing browser data will remove notes.
                        </span>
                    </div>

                    <button
                        onClick={() => setShowDisclaimerModal(true)}
                        className="text-[11px] font-mono font-bold text-amber-600 dark:text-amber-400 hover:underline cursor-pointer"
                    >
                        Read Full Terms ➔
                    </button>
                </div>
            </div>

            {/* Filter & Search Toolbar */}
            <div className="p-4 rounded-3xl bg-white border border-slate-200 dark:bg-zinc-950 dark:border-zinc-800 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3">

                    {/* Search Bar */}
                    <div className="relative flex-1 min-w-[240px]">
                        <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-zinc-500" />
                        <input
                            type="text"
                            placeholder="Search notes by title, content, or tags..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 text-xs rounded-2xl bg-slate-50 border border-slate-300 dark:bg-zinc-900 dark:border-zinc-800 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-zinc-500 focus:outline-none focus:border-amber-400"
                        />
                        {searchQuery && (
                            <button
                                onClick={() => setSearchQuery("")}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 hover:text-slate-600 dark:text-zinc-500 dark:hover:text-white"
                            >
                                ✕
                            </button>
                        )}
                    </div>

                    {/* Controls: Sort By & View Mode */}
                    <div className="flex items-center gap-2">
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="px-3 py-2 text-xs rounded-2xl bg-slate-50 border border-slate-300 dark:bg-zinc-900 dark:border-zinc-800 text-slate-800 dark:text-zinc-200 font-medium focus:outline-none cursor-pointer"
                        >
                            <option value="updatedAt">Sort: Last Updated</option>
                            <option value="createdAt">Sort: Date Created</option>
                            <option value="title">Sort: Title (A-Z)</option>
                        </select>

                        {/* View Mode Toggle */}
                        <div className="flex items-center p-1 rounded-2xl bg-slate-100 border border-slate-200 dark:bg-zinc-900 dark:border-zinc-800">
                            <button
                                onClick={() => setViewMode("grid")}
                                className={`p-1.5 rounded-xl transition cursor-pointer ${viewMode === "grid"
                                    ? "bg-white text-slate-900 dark:bg-black dark:text-white border border-slate-200 dark:border-zinc-700"
                                    : "text-slate-500 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white"
                                    }`}
                                title="Grid View"
                            >
                                <Grid className="w-4 h-4" />
                            </button>

                            <button
                                onClick={() => setViewMode("list")}
                                className={`p-1.5 rounded-xl transition cursor-pointer ${viewMode === "list"
                                    ? "bg-white text-slate-900 dark:bg-black dark:text-white border border-slate-200 dark:border-zinc-700"
                                    : "text-slate-500 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white"
                                    }`}
                                title="List View"
                            >
                                <ListIcon className="w-4 h-4" />
                            </button>
                        </div>

                        {/* Clear All Notes */}
                        {notes.length > 0 && (
                            <button
                                onClick={() => setShowClearConfirm(true)}
                                className="p-2 rounded-2xl border border-rose-300/40 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition cursor-pointer text-xs"
                                title="Clear All Notes"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                        )}
                    </div>

                </div>

                {/* Category Pills */}
                <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
                    {CATEGORIES.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`px-3 py-1.5 rounded-2xl text-xs font-semibold whitespace-nowrap transition cursor-pointer ${selectedCategory === cat
                                ? "bg-slate-900 text-white dark:bg-white dark:text-black font-extrabold border border-slate-900 dark:border-white"
                                : "bg-slate-50 text-slate-600 border border-slate-200 dark:bg-zinc-900 dark:text-zinc-400 dark:border-zinc-800 hover:bg-slate-100 dark:hover:bg-zinc-800"
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* Loading Skeleton */}
            {loading ? (
                <div className="p-12 text-center border border-slate-200 dark:border-zinc-800 rounded-3xl">
                    <Sparkles className="w-8 h-8 mx-auto text-amber-500 animate-spin" />
                    <p className="text-xs text-slate-500 dark:text-zinc-400 mt-2 font-mono">
                        Loading notes from local storage...
                    </p>
                </div>
            ) : filteredNotes.length === 0 ? (
                /* Empty State */
                <div className="p-12 text-center bg-white border border-slate-200 dark:bg-zinc-950 dark:border-zinc-800 rounded-3xl space-y-4">
                    <div className="w-16 h-16 rounded-3xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mx-auto text-amber-500">
                        <Edit3 className="w-8 h-8" />
                    </div>
                    <div className="space-y-1">
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                            No notes found
                        </h3>
                        <p className="text-xs text-slate-500 dark:text-zinc-400 max-w-sm mx-auto">
                            {searchQuery || selectedCategory !== "All"
                                ? "No saved notes match your current search query or category filter."
                                : "Your personal notes workspace is empty. Create your first study note to start building your knowledge base."}
                        </p>
                    </div>
                    <button
                        onClick={() => handleOpenEditor()}
                        className="px-5 py-2.5 rounded-2xl bg-amber-500 text-black hover:bg-amber-400 text-xs font-bold transition border border-amber-400 inline-flex items-center gap-2 cursor-pointer"
                    >
                        <Plus className="w-4 h-4" />
                        <span>Create First Note</span>
                    </button>
                </div>
            ) : viewMode === "grid" ? (
                /* Notes Grid View */
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    {filteredNotes.map((n) => (
                        <div
                            key={n.id}
                            className={`p-6 rounded-3xl border transition space-y-4 flex flex-col justify-between hover:scale-[1.01] ${COLOR_MAP[n.color || "amber"]}`}
                        >
                            {/* Card Header */}
                            <div className="space-y-2">
                                <div className="flex items-center justify-between gap-2">
                                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-white/70 dark:bg-black/50 border border-black/10 dark:border-white/10 text-slate-900 dark:text-white">
                                        {n.category || "General"}
                                    </span>

                                    <div className="flex items-center gap-1">
                                        <button
                                            onClick={() => handleCopyContent(n)}
                                            className="p-1.5 rounded-xl bg-white/50 dark:bg-black/30 border border-black/10 dark:border-white/10 text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white transition cursor-pointer"
                                            title="Copy Note Text"
                                        >
                                            {copiedNoteId === n.id ? (
                                                <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                                            ) : (
                                                <Copy className="w-3.5 h-3.5" />
                                            )}
                                        </button>

                                        <button
                                            onClick={() => handleDeleteSingleNote(n.id)}
                                            className="p-1.5 rounded-xl bg-white/50 dark:bg-black/30 border border-black/10 dark:border-white/10 text-rose-500 hover:bg-rose-500/20 transition cursor-pointer"
                                            title="Delete Note"
                                        >
                                            <Trash2 className="w-3.5 h-3.5" />
                                        </button>
                                    </div>
                                </div>

                                <h3
                                    onClick={() => handleOpenEditor(n)}
                                    className="text-base font-extrabold text-slate-900 dark:text-white tracking-tight cursor-pointer hover:underline"
                                >
                                    {n.title}
                                </h3>
                            </div>

                            {/* Note Content Snippet */}
                            <p
                                onClick={() => handleOpenEditor(n)}
                                className="text-xs font-mono opacity-90 line-clamp-6 leading-relaxed whitespace-pre-wrap cursor-pointer"
                            >
                                {n.content || "No content..."}
                            </p>

                            {/* Card Footer */}
                            <div className="pt-3 border-t border-black/10 dark:border-white/10 flex items-center justify-between text-[10px] font-mono opacity-70">
                                <span className="flex items-center gap-1">
                                    <Clock className="w-3 h-3" />
                                    {new Date(n.updatedAt).toLocaleDateString()}
                                </span>

                                {Array.isArray(n.tags) && n.tags.length > 0 && (
                                    <span className="flex items-center gap-1 truncate max-w-[150px]">
                                        <Tag className="w-3 h-3" />
                                        {n.tags.join(", ")}
                                    </span>
                                )}
                            </div>

                        </div>
                    ))}
                </div>
            ) : (
                /* Notes List View */
                <div className="space-y-3">
                    {filteredNotes.map((n) => (
                        <div
                            key={n.id}
                            onClick={() => handleOpenEditor(n)}
                            className={`p-4 sm:p-5 rounded-2xl border transition cursor-pointer flex flex-wrap items-center justify-between gap-4 hover:scale-[1.005] ${COLOR_MAP[n.color || "amber"]}`}
                        >
                            <div className="space-y-1 flex-1 min-w-[200px]">
                                <div className="flex items-center gap-2">
                                    <span className="text-xs font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-white/60 dark:bg-black/40 border border-black/10 dark:border-white/10">
                                        {n.category}
                                    </span>
                                    <h4 className="text-sm font-bold text-slate-900 dark:text-white truncate">
                                        {n.title}
                                    </h4>
                                </div>
                                <p className="text-xs font-mono opacity-80 line-clamp-1">
                                    {n.content}
                                </p>
                            </div>

                            <div className="flex items-center gap-3 shrink-0">
                                <span className="text-[10px] font-mono opacity-60">
                                    {new Date(n.updatedAt).toLocaleDateString()}
                                </span>

                                <button
                                    type="button"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleDeleteSingleNote(n.id);
                                    }}
                                    className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-500/20 transition cursor-pointer"
                                >
                                    <Trash2 className="w-3.5 h-3.5" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Editor Modal Drawer */}
            {isEditorOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200 select-none">
                    <div className="w-full max-w-2xl bg-white dark:bg-zinc-950 border-2 border-amber-400 rounded-3xl p-6 sm:p-8 space-y-6 relative">

                        {/* Modal Header */}
                        <div className="flex items-center justify-between border-b border-slate-200 dark:border-zinc-900 pb-4">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-500">
                                    <Edit3 className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">
                                        {editingNote ? "Edit Note" : "Create New Note"}
                                    </h3>
                                    <p className="text-xs text-slate-500 dark:text-zinc-400">
                                        Saved directly in your local browser storage
                                    </p>
                                </div>
                            </div>

                            <button
                                onClick={() => setIsEditorOpen(false)}
                                className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:text-zinc-500 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-zinc-900 transition cursor-pointer"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Form inputs */}
                        <form onSubmit={handleSaveNote} className="space-y-4">
                            {/* Title */}
                            <div className="flex items-center gap-3">
                                <input
                                    type="text"
                                    placeholder="Note Title (e.g. Red-Black Tree Rebalancing Rule)"
                                    value={formTitle}
                                    onChange={(e) => setFormTitle(e.target.value)}
                                    className="w-full px-4 py-2.5 text-xs rounded-2xl bg-slate-50 border border-slate-300 dark:bg-zinc-900 dark:border-zinc-800 text-slate-900 dark:text-white font-bold focus:outline-none focus:border-amber-400"
                                />
                            </div>

                            {/* Category & Color selector */}
                            <div className="flex flex-wrap items-center justify-between gap-3">
                                <div className="flex items-center gap-2">
                                    <label className="text-xs font-mono font-bold text-slate-500 dark:text-zinc-400">Category:</label>
                                    <select
                                        value={formCategory}
                                        onChange={(e) => setFormCategory(e.target.value)}
                                        className="px-3 py-1.5 text-xs rounded-xl bg-slate-50 border border-slate-300 dark:bg-zinc-900 dark:border-zinc-800 text-slate-800 dark:text-zinc-200 font-semibold focus:outline-none cursor-pointer"
                                    >
                                        {CATEGORIES.filter((c) => c !== "All").map((cat) => (
                                            <option key={cat} value={cat}>
                                                {cat}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* Color choices */}
                                <div className="flex items-center gap-2">
                                    <label className="text-xs font-mono font-bold text-slate-500 dark:text-zinc-400">Color:</label>
                                    <div className="flex items-center gap-1.5">
                                        {Object.keys(COLOR_MAP).map((cKey) => (
                                            <button
                                                key={cKey}
                                                type="button"
                                                onClick={() => setFormColor(cKey)}
                                                className={`w-6 h-6 rounded-full border transition cursor-pointer ${cKey === "amber" ? "bg-amber-400 border-amber-500" :
                                                    cKey === "emerald" ? "bg-emerald-400 border-emerald-500" :
                                                        cKey === "sky" ? "bg-sky-400 border-sky-500" :
                                                            cKey === "purple" ? "bg-purple-400 border-purple-500" :
                                                                cKey === "rose" ? "bg-rose-400 border-rose-500" :
                                                                    "bg-zinc-400 border-zinc-500"
                                                    } ${formColor === cKey ? "scale-125 ring-2 ring-amber-400" : "opacity-70 hover:opacity-100"}`}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Tags input */}
                            <div>
                                <input
                                    type="text"
                                    placeholder="Comma separated tags (e.g. Tree, HashMap, Performance)"
                                    value={formTags}
                                    onChange={(e) => setFormTags(e.target.value)}
                                    className="w-full px-4 py-2 text-xs rounded-2xl bg-slate-50 border border-slate-300 dark:bg-zinc-900 dark:border-zinc-800 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-zinc-500 focus:outline-none focus:border-amber-400 font-mono"
                                />
                            </div>

                            {/* Textarea */}
                            <div className="relative">
                                <textarea
                                    rows={10}
                                    placeholder="Write your detailed note here..."
                                    value={formContent}
                                    onChange={(e) => setFormContent(e.target.value)}
                                    className={`w-full p-4 text-xs rounded-2xl border transition focus:outline-none focus:ring-1 focus:ring-amber-400 font-mono resize-y ${COLOR_MAP[formColor]}`}
                                />
                                <span className="absolute bottom-3 right-4 text-[10px] font-mono opacity-60">
                                    {formContent.length} characters
                                </span>
                            </div>

                            {/* Modal Actions */}
                            <div className="flex items-center justify-end gap-3 pt-2 border-t border-slate-200 dark:border-zinc-900">
                                <button
                                    type="button"
                                    onClick={() => setIsEditorOpen(false)}
                                    className="px-4 py-2.5 rounded-xl border border-slate-300 dark:border-zinc-800 text-slate-700 dark:text-zinc-300 hover:bg-slate-100 dark:hover:bg-zinc-900 text-xs font-semibold transition cursor-pointer"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-6 py-2.5 rounded-xl bg-amber-500 text-black hover:bg-amber-400 text-xs font-bold transition flex items-center gap-2 cursor-pointer border border-amber-400 active:scale-95"
                                >
                                    <Save className="w-4 h-4" />
                                    <span>{editingNote ? "Update Note" : "Save Note"}</span>
                                </button>
                            </div>
                        </form>

                    </div>
                </div>
            )}

            {/* Confirmation Modal for Clear All */}
            {showClearConfirm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200 select-none">
                    <div className="w-full max-w-md bg-white dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 rounded-3xl p-6 space-y-4">
                        <div className="flex items-center gap-3 text-rose-500">
                            <AlertTriangle className="w-6 h-6" />
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                                Clear All Notes?
                            </h3>
                        </div>
                        <p className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed">
                            This action will permanently delete all {notes.length} notes stored in local browser storage. This cannot be undone unless you exported a JSON backup file.
                        </p>
                        <div className="flex items-center justify-end gap-3 pt-2">
                            <button
                                onClick={() => setShowClearConfirm(false)}
                                className="px-4 py-2 rounded-xl border border-slate-300 dark:border-zinc-800 text-xs font-semibold text-slate-700 dark:text-zinc-300 hover:bg-slate-100 dark:hover:bg-zinc-900 cursor-pointer"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleClearAll}
                                className="px-4 py-2 rounded-xl bg-rose-600 text-white hover:bg-rose-700 text-xs font-bold transition cursor-pointer border border-rose-500"
                            >
                                Yes, Clear All
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default Notes;
