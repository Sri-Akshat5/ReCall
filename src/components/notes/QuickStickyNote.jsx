import React, { useState, useEffect } from "react";
import {
  Edit3,
  X,
  Save,
  Maximize2,
  Trash2,
  CheckCircle2,
  List,
  Plus,
  Sparkles,
  ShieldCheck,
  Tag
} from "lucide-react";
import {
  getAllNotes,
  saveNote,
  deleteNote,
  getNotesDisclaimerAccepted
} from "../../utils/secureStorage";
import NotesDisclaimerModal from "./NotesDisclaimerModal";

export const QuickStickyNote = ({ activeTab, onNavigateToNotes }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showDisclaimer, setShowDisclaimer] = useState(false);
  const [viewMode, setViewMode] = useState("create"); // "create" or "recent"
  const [notesList, setNotesList] = useState([]);
  const [activeNoteId, setActiveNoteId] = useState(null);
  const [toastMessage, setToastMessage] = useState("");

  // Form State
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("General");
  const [color, setColor] = useState("amber");
  const [isSaving, setIsSaving] = useState(false);

  // Categories & Colors
  const CATEGORIES = ["General", "Java", "Collections", "System Design", "Interview", "Revision"];
  const COLOR_MAP = {
    amber: "bg-amber-50 dark:bg-amber-950/40 border-amber-300 dark:border-amber-700/60 text-amber-900 dark:text-amber-200",
    emerald: "bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-700/60 text-emerald-900 dark:text-emerald-200",
    sky: "bg-sky-50 dark:bg-sky-950/40 border-sky-300 dark:border-sky-700/60 text-sky-900 dark:text-sky-200",
    purple: "bg-purple-50 dark:bg-purple-950/40 border-purple-300 dark:border-purple-700/60 text-purple-900 dark:text-purple-200",
    rose: "bg-rose-50 dark:bg-rose-950/40 border-rose-300 dark:border-rose-700/60 text-rose-900 dark:text-rose-200",
    zinc: "bg-zinc-50 dark:bg-zinc-900 border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-zinc-200"
  };

  // Load existing notes when sticky window opens
  useEffect(() => {
    if (isOpen) {
      loadRecentNotes();
    }
  }, [isOpen]);

  // Do NOT render floating button on Landingpage or Notes page
  if (activeTab === "landing" || activeTab === "notes") {
    return null;
  }

  const loadRecentNotes = async () => {
    const all = await getAllNotes();
    setNotesList(all);
  };

  const handleFloatingClick = () => {
    // Check disclaimer acceptance
    if (!getNotesDisclaimerAccepted()) {
      setShowDisclaimer(true);
    } else {
      setIsOpen(!isOpen);
    }
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3000);
  };

  const handleSave = async (e) => {
    if (e) e.preventDefault();
    if (!content.trim() && !title.trim()) {
      showToast("Please write a title or note content!");
      return;
    }

    setIsSaving(true);
    try {
      const saved = await saveNote({
        id: activeNoteId || undefined,
        title: title.trim() || "Quick Sticky Note",
        content: content.trim(),
        category,
        color,
        tags: [category]
      });

      showToast("Note saved locally!");
      await loadRecentNotes();

      // Reset form if creating new note
      if (!activeNoteId) {
        setTitle("");
        setContent("");
      }
    } catch (err) {
      showToast("Failed to save note!");
    } finally {
      setIsSaving(false);
    }
  };

  const handleSelectNoteToEdit = (note) => {
    setActiveNoteId(note.id);
    setTitle(note.title);
    setContent(note.content);
    setCategory(note.category || "General");
    setColor(note.color || "amber");
    setViewMode("create");
  };

  const handleNewNote = () => {
    setActiveNoteId(null);
    setTitle("");
    setContent("");
    setCategory("General");
    setColor("amber");
    setViewMode("create");
  };

  const handleDelete = async (id, e) => {
    if (e) e.stopPropagation();
    await deleteNote(id);
    showToast("Note deleted");
    if (activeNoteId === id) {
      handleNewNote();
    }
    await loadRecentNotes();
  };

  return (
    <>
      {/* Terms & Conditions Disclaimer Modal */}
      <NotesDisclaimerModal
        isOpen={showDisclaimer}
        onClose={() => setShowDisclaimer(false)}
        onAccept={() => {
          setShowDisclaimer(false);
          setIsOpen(true);
        }}
      />

      {/* Floating Sticky Note Trigger Button */}
      <div className="fixed bottom-20 right-6 z-40 select-none">
        <button
          type="button"
          onClick={handleFloatingClick}
          aria-label="Open Quick Sticky Note"
          className="group relative p-3 sm:p-3.5 rounded-2xl bg-amber-500 text-black font-bold border border-amber-400 hover:bg-amber-400 hover:scale-105 transition-all duration-200 flex items-center justify-center cursor-pointer active:scale-95"
          title="Quick Sticky Notes (Save thoughts instantly)"
        >
          <Edit3 className="w-5 h-5 group-hover:rotate-12 transition-transform duration-200" />

          {/* Badge count indicator if notes exist */}
          {notesList.length > 0 && !isOpen && (
            <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-slate-900 text-amber-400 border border-amber-400 text-[10px] font-mono font-extrabold flex items-center justify-center">
              {notesList.length}
            </span>
          )}
        </button>
      </div>

      {/* Floating Sticky Note Window Drawer */}
      {isOpen && (
        <div className="fixed bottom-36 right-4 sm:right-6 z-50 w-full max-w-sm sm:max-w-md bg-white dark:bg-zinc-950 border-2 border-amber-400/80 rounded-3xl p-4 sm:p-5 space-y-4 select-none animate-in slide-in-from-bottom-5 duration-200">

          {/* Header Bar */}
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-zinc-900 pb-3">
            <div className="flex items-center gap-2">

              <div>
                <h3 className="text-sm font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-1.5">
                  Quick Sticky Note

                </h3>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              {/* Navigate to Full Notes Page */}
              <button
                type="button"
                onClick={() => {
                  setIsOpen(false);
                  if (onNavigateToNotes) onNavigateToNotes();
                }}
                className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 dark:text-zinc-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-zinc-900 transition text-xs flex items-center gap-1 cursor-pointer"
                title="Open Full Notes Workspace Page"
              >
                <Maximize2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline text-[11px] font-medium">All Notes</span>
              </button>

              {/* Close Button */}
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-900 dark:text-zinc-500 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-zinc-900 transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Toast Notification Banner */}
          {toastMessage && (
            <div className="p-2.5 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-black border border-slate-700 dark:border-zinc-300 text-xs font-semibold flex items-center justify-between animate-in fade-in duration-150">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 dark:text-emerald-600" />
                {toastMessage}
              </span>
            </div>
          )}

          {/* Mode Switcher Pills */}
          <div className="flex items-center justify-between gap-2 p-1 rounded-2xl bg-slate-100 border border-slate-200 dark:bg-zinc-900 dark:border-zinc-800 text-xs">
            <button
              type="button"
              onClick={handleNewNote}
              className={`flex-1 py-1.5 px-3 rounded-xl font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${viewMode === "create" && !activeNoteId
                ? "bg-white text-slate-900 dark:bg-black dark:text-white border border-slate-200 dark:border-zinc-700"
                : "text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white"
                }`}
            >
              <Plus className="w-3.5 h-3.5 text-amber-500" />
              <span>New Note</span>
            </button>

            <button
              type="button"
              onClick={() => setViewMode("recent")}
              className={`flex-1 py-1.5 px-3 rounded-xl font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${viewMode === "recent"
                ? "bg-white text-slate-900 dark:bg-black dark:text-white border border-slate-200 dark:border-zinc-700"
                : "text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white"
                }`}
            >
              <List className="w-3.5 h-3.5 text-amber-500" />
              <span>Recent Notes ({notesList.length})</span>
            </button>
          </div>

          {/* Mode 1: Editor Form */}
          {viewMode === "create" && (
            <form onSubmit={handleSave} className="space-y-3">
              {/* Title */}
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Note Title (e.g., HashMap Load Factor)"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-300 dark:bg-zinc-900 dark:border-zinc-800 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-zinc-500 focus:outline-none focus:border-amber-400 dark:focus:border-amber-400 font-semibold"
                />
              </div>

              {/* Category & Color Picker row */}
              <div className="flex items-center justify-between gap-2">
                {/* Category selector */}
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="px-2.5 py-1.5 text-xs rounded-xl bg-slate-50 border border-slate-300 dark:bg-zinc-900 dark:border-zinc-800 text-slate-800 dark:text-zinc-300 font-medium focus:outline-none cursor-pointer"
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>

                {/* Color swatches */}
                <div className="flex items-center gap-1.5">
                  {Object.keys(COLOR_MAP).map((cKey) => (
                    <button
                      key={cKey}
                      type="button"
                      onClick={() => setColor(cKey)}
                      className={`w-5 h-5 rounded-full border transition cursor-pointer ${cKey === "amber" ? "bg-amber-400 border-amber-500" :
                        cKey === "emerald" ? "bg-emerald-400 border-emerald-500" :
                          cKey === "sky" ? "bg-sky-400 border-sky-500" :
                            cKey === "purple" ? "bg-purple-400 border-purple-500" :
                              cKey === "rose" ? "bg-rose-400 border-rose-500" :
                                "bg-zinc-400 border-zinc-500"
                        } ${color === cKey ? "scale-125 ring-2 ring-amber-400" : "opacity-70 hover:opacity-100"}`}
                      title={`${cKey} theme`}
                    />
                  ))}
                </div>
              </div>

              {/* Textarea Content */}
              <div className="relative">
                <textarea
                  rows={5}
                  placeholder="Type your quick study note here..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className={`w-full p-3 text-xs rounded-2xl border transition focus:outline-none focus:ring-1 focus:ring-amber-400 resize-none font-mono ${COLOR_MAP[color]}`}
                />
                <span className="absolute bottom-2.5 right-3 text-[10px] font-mono text-slate-400 dark:text-zinc-500">
                  {content.length} chars
                </span>
              </div>

              {/* Actions: Save & Clear */}
              <div className="flex items-center justify-between gap-2 pt-1">


                <div className="flex items-center gap-2">
                  {activeNoteId && (
                    <button
                      type="button"
                      onClick={() => handleDelete(activeNoteId)}
                      className="p-2 rounded-xl border border-rose-300/40 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition cursor-pointer text-xs"
                      title="Delete Note"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}

                  <button
                    type="submit"
                    disabled={isSaving}
                    className="px-4 py-2 rounded-xl bg-amber-500 text-black hover:bg-amber-400 text-xs font-bold transition flex items-center gap-2 cursor-pointer active:scale-95 border border-amber-400"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>{activeNoteId ? "Update Note" : "Save Note"}</span>
                  </button>
                </div>
              </div>
            </form>
          )}

          {/* Mode 2: Recent Notes List */}
          {viewMode === "recent" && (
            <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
              {notesList.length === 0 ? (
                <div className="p-8 text-center border border-dashed border-slate-200 dark:border-zinc-800 rounded-2xl space-y-2">
                  <Edit3 className="w-8 h-8 mx-auto text-slate-400 dark:text-zinc-600" />
                  <p className="text-xs text-slate-500 dark:text-zinc-400">
                    No notes saved yet.
                  </p>
                  <button
                    type="button"
                    onClick={handleNewNote}
                    className="px-3 py-1.5 rounded-xl bg-amber-500 text-black text-xs font-bold border border-amber-400 hover:bg-amber-400 transition cursor-pointer"
                  >
                    Create First Sticky Note
                  </button>
                </div>
              ) : (
                notesList.map((n) => (
                  <div
                    key={n.id}
                    onClick={() => handleSelectNoteToEdit(n)}
                    className={`p-3 rounded-2xl border transition cursor-pointer hover:scale-[1.01] space-y-1.5 ${COLOR_MAP[n.color || "amber"]}`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5 font-bold text-xs">
                        <span className="truncate">{n.title}</span>
                      </div>

                      <div className="flex items-center gap-1 shrink-0">
                        <span className="text-[9px] px-1.5 py-0.2 rounded font-mono bg-white/60 dark:bg-black/40 border border-black/10 dark:border-white/10 uppercase font-bold">
                          {n.category}
                        </span>

                        <button
                          type="button"
                          onClick={(e) => handleDelete(n.id, e)}
                          className="p-1 rounded text-rose-500 hover:bg-rose-500/10 transition cursor-pointer"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    </div>

                    <p className="text-[11px] line-clamp-2 opacity-80 font-mono">
                      {n.content || "Empty note content..."}
                    </p>

                    <div className="text-[9px] text-right font-mono opacity-60">
                      {new Date(n.updatedAt).toLocaleDateString()} • {new Date(n.updatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

        </div>
      )}
    </>
  );
};

export default QuickStickyNote;
