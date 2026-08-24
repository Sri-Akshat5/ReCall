import React from "react";

/**
 * Utility helper to parse and render formatted markdown text with **bold**, `code`,
 * line breaks (\n), and bullet points (- or •).
 */
export const renderFormattedText = (text) => {
  if (!text) return null;
  if (typeof text !== "string") return text;

  // Split into lines to support bullet points and paragraph breaks
  const lines = text.split("\n");

  return (
    <div className="space-y-1.5">
      {lines.map((line, lineIdx) => {
        const trimmed = line.trim();
        if (!trimmed) return <div key={lineIdx} className="h-1" />;

        const isBullet = trimmed.startsWith("- ") || trimmed.startsWith("• ");
        const contentToParse = isBullet ? trimmed.substring(2) : line;

        // Parse inline markdown: **bold** and `code`
        const parts = [];
        let keyCounter = 0;
        const regex = /(\*\*(.*?)\*\*|`(.*?)`)/g;
        let lastIndex = 0;
        let match;

        while ((match = regex.exec(contentToParse)) !== null) {
          if (match.index > lastIndex) {
            parts.push(contentToParse.substring(lastIndex, match.index));
          }

          const fullMatch = match[0];
          if (fullMatch.startsWith("**")) {
            parts.push(
              <strong key={keyCounter++} className="font-extrabold text-slate-900 dark:text-white">
                {match[2]}
              </strong>
            );
          } else if (fullMatch.startsWith("`")) {
            parts.push(
              <code
                key={keyCounter++}
                className="font-mono text-[0.85em] px-1.5 py-0.5 rounded bg-slate-200 text-slate-900 border border-slate-300 dark:bg-zinc-800 dark:text-amber-300 dark:border-zinc-700/80 font-bold"
              >
                {match[3]}
              </code>
            );
          }
          lastIndex = regex.lastIndex;
        }

        if (lastIndex < contentToParse.length) {
          parts.push(contentToParse.substring(lastIndex));
        }

        if (isBullet) {
          return (
            <div key={lineIdx} className="flex items-start gap-2 pl-2 text-xs sm:text-sm leading-relaxed">
              <span className="text-slate-400 dark:text-zinc-500 font-bold select-none">•</span>
              <div className="flex-1 text-slate-800 dark:text-zinc-200">{parts}</div>
            </div>
          );
        }

        return (
          <div key={lineIdx} className="text-xs sm:text-sm leading-relaxed text-slate-800 dark:text-zinc-200">
            {parts}
          </div>
        );
      })}
    </div>
  );
};
