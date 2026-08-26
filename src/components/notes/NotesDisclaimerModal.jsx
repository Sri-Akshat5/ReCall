import React, { useState } from "react";
import { ShieldCheck, HardDrive, AlertCircle, Laptop, CheckCircle2, X } from "lucide-react";
import { setNotesDisclaimerAccepted } from "../../utils/secureStorage";

export const NotesDisclaimerModal = ({ isOpen, onClose, onAccept }) => {
  const [isChecked, setIsChecked] = useState(false);

  if (!isOpen) return null;

  const handleConfirm = () => {
    if (!isChecked) return;
    setNotesDisclaimerAccepted(true);
    if (onAccept) onAccept();
    if (onClose) onClose();
  };

  return (
    <div className="fixed inset-0 h-full w-full z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto">
      <div className="w-full max-w-md bg-white dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 rounded-2xl p-4 sm:p-5 space-y-4 select-none relative shadow-2xl shadow-black/80">

        {/* Close Button */}
        {onClose && (
          <button
            onClick={onClose}
            className="absolute top-3.5 right-3.5 p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:text-zinc-500 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-zinc-900 transition cursor-pointer"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        )}

        {/* Centered Compact Header */}
        <div className="text-center space-y-1.5 pt-0.5">
          <div className="mx-auto w-10 h-10 rounded-full bg-slate-100 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 flex items-center justify-center">
            <ShieldCheck className="w-5 h-5 text-slate-900 dark:text-white" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white tracking-tight">
              Notes Storage &amp; Privacy Notice
            </h2>
            <p className="text-[11px] text-slate-500 dark:text-zinc-400">
              Please accept our local storage terms before creating notes.
            </p>
          </div>
        </div>

        {/* Compact Terms List */}
        <div className="space-y-2 text-xs">
          <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-zinc-900/80 border border-slate-200 dark:border-zinc-800 flex items-start gap-2.5">
            <HardDrive className="w-3.5 h-3.5 text-slate-700 dark:text-zinc-300 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-slate-900 dark:text-white text-[11px] block">
                Local Browser Storage Only
              </span>
              <p className="text-[11px] text-slate-600 dark:text-zinc-400 leading-snug">
                Notes are saved only in your browser (<code className="font-mono text-[10px] text-slate-800 dark:text-zinc-300">localStorage</code>). No cloud backup or sync.
              </p>
            </div>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-zinc-900/80 border border-slate-200 dark:border-zinc-800 flex items-start gap-2.5">
            <AlertCircle className="w-3.5 h-3.5 text-slate-700 dark:text-zinc-300 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-slate-900 dark:text-white text-[11px] block">
                Data Loss Disclaimer
              </span>
              <p className="text-[11px] text-slate-600 dark:text-zinc-400 leading-snug">
                Clearing browser cache or site data will delete your notes permanently.
              </p>
            </div>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-zinc-900/80 border border-slate-200 dark:border-zinc-800 flex items-start gap-2.5">
            <Laptop className="w-3.5 h-3.5 text-slate-700 dark:text-zinc-300 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-slate-900 dark:text-white text-[11px] block">
                Device &amp; Browser Isolated
              </span>
              <p className="text-[11px] text-slate-600 dark:text-zinc-400 leading-snug">
                Notes won’t sync across different browsers, devices, or incognito sessions.
              </p>
            </div>
          </div>
        </div>

        {/* Acceptance Checkbox & Actions */}
        <div className="space-y-3 pt-2 border-t border-slate-200 dark:border-zinc-900">
          <label className="flex items-start gap-2.5 cursor-pointer group">
            <input
              type="checkbox"
              checked={isChecked}
              onChange={(e) => setIsChecked(e.target.checked)}
              className="mt-0.5 w-3.5 h-3.5 rounded border-slate-300 dark:border-zinc-700 text-slate-900 dark:text-white focus:ring-slate-900 dark:focus:ring-white cursor-pointer shrink-0"
            />
            <span className="text-[11px] text-slate-700 dark:text-zinc-300 font-medium group-hover:text-slate-900 dark:group-hover:text-white transition leading-tight">
              I accept that my notes are saved locally and will be removed if browser data is cleared.
            </span>
          </label>

          <div className="flex items-center justify-end gap-2 pt-1">
            {onClose && (
              <button
                type="button"
                onClick={onClose}
                className="px-3.5 py-1.5 rounded-lg border border-slate-200 dark:border-zinc-800 text-slate-700 dark:text-zinc-400 hover:bg-slate-100 dark:hover:bg-zinc-900 text-xs font-semibold transition cursor-pointer"
              >
                Decline
              </button>
            )}
            <button
              type="button"
              disabled={!isChecked}
              onClick={handleConfirm}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer inline-flex items-center gap-1.5 ${isChecked
                ? "bg-slate-900 text-white dark:bg-white dark:text-black hover:opacity-90 shadow-md shadow-slate-900/20 dark:shadow-none"
                : "bg-slate-100 text-slate-400 dark:bg-zinc-900 dark:text-zinc-600 cursor-not-allowed border border-slate-200 dark:border-zinc-800"
                }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Accept &amp; Continue</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default NotesDisclaimerModal;
