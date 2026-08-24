import React, { useState } from "react";
import { ShieldAlert, AlertTriangle, CheckCircle2, HardDrive, Globe, X } from "lucide-react";
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-lg bg-white dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 rounded-3xl p-6 sm:p-8 space-y-6 select-none relative">

        {/* Optional Close Button */}
        {onClose && (
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:text-zinc-500 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-zinc-900 transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        )}

        {/* Header Icon & Title */}
        <div className="flex items-center gap-3 border-b border-slate-200 dark:border-zinc-900 pb-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center shrink-0">
            <ShieldAlert className="w-6 h-6 text-amber-500" />
          </div>
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-[10px] font-mono font-bold uppercase tracking-wider">
              Terms &amp; Data Disclaimer
            </div>
            <h2 className="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Local Storage &amp; Privacy Notice
            </h2>
          </div>
        </div>

        {/* Body Points */}
        <div className="space-y-3 text-xs leading-relaxed text-slate-600 dark:text-zinc-300">
          <p className="font-semibold text-slate-900 dark:text-white">
            Before accessing or creating notes on ReCall, please review and accept our storage terms:
          </p>

          <div className="p-3.5 rounded-2xl bg-amber-500/5 border border-amber-500/20 space-y-1.5">
            <div className="flex items-start gap-2.5">
              <HardDrive className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-slate-900 dark:text-white">Local Browser Storage:</span>
                <p className="text-[11px] text-slate-600 dark:text-zinc-400">
                  All notes are saved directly inside your browser storage. We do not store, back up, or transmit your notes to any cloud server.
                </p>
              </div>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-rose-500/5 border border-rose-500/20 space-y-1.5">
            <div className="flex items-start gap-2.5">
              <AlertTriangle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-slate-900 dark:text-white">No Responsibility For Data Loss:</span>
                <p className="text-[11px] text-slate-600 dark:text-zinc-400">
                  We are not responsible for any lost data. Clearing your browser history, cache, or site data will permanently remove all saved notes.
                </p>
              </div>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-sky-500/5 border border-sky-500/20 space-y-1.5">
            <div className="flex items-start gap-2.5">
              <Globe className="w-4 h-4 text-sky-500 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-slate-900 dark:text-white">Device &amp; Browser Specific:</span>
                <p className="text-[11px] text-slate-600 dark:text-zinc-400">
                  Notes created in one browser will not automatically sync or appear across different browsers, devices, or incognito sessions.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Checkbox agreement */}
        <label className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-200 dark:bg-zinc-900 dark:border-zinc-800 cursor-pointer hover:bg-slate-100 dark:hover:bg-zinc-850 transition">
          <input
            type="checkbox"
            checked={isChecked}
            onChange={(e) => setIsChecked(e.target.checked)}
            className="mt-0.5 w-4 h-4 rounded border-slate-300 text-amber-500 focus:ring-amber-500 cursor-pointer shrink-0"
          />
          <span className="text-xs text-slate-700 dark:text-zinc-300 font-medium">
            I understand and accept that my notes are saved locally in browser storage, are not saved permanently on any server, and will be deleted if browser site data is cleared.
          </span>
        </label>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 pt-2 border-t border-slate-200 dark:border-zinc-900">
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 dark:border-zinc-800 dark:text-zinc-400 hover:bg-slate-100 dark:hover:bg-zinc-900 text-xs font-semibold transition cursor-pointer"
            >
              Decline &amp; Close
            </button>
          )}
          <button
            type="button"
            disabled={!isChecked}
            onClick={handleConfirm}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition cursor-pointer inline-flex items-center gap-2 ${
              isChecked
                ? "bg-amber-500 text-black hover:bg-amber-400 border border-amber-400"
                : "bg-slate-200 text-slate-400 dark:bg-zinc-900 dark:text-zinc-600 cursor-not-allowed border border-slate-300 dark:border-zinc-800"
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Accept &amp; Continue</span>
          </button>
        </div>

      </div>
    </div>
  );
};

export default NotesDisclaimerModal;
