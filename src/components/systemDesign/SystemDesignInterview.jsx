import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  CheckCircle2,
  Cpu,
  Terminal,
  Table as TableIcon,
  HelpCircle,
  Database,
  Layers,
  Sparkles,
  ChevronRight,
  Filter,
  Network,
  Zap,
  ShieldCheck,
  Server,
  BookOpen,
  ArrowRight,
  Building2,
  ExternalLink
} from "lucide-react";
import { SYSTEM_DESIGN_QUESTIONS } from "./systemDesignInterviewData";
import { CustomDropdown } from "../common/CustomDropdown";
import { renderFormattedText } from "../../utils/formatText";

export const SystemDesignInterview = ({ onSelectRecallCard, searchTerm = "" }) => {
  const navigate = useNavigate();
  const [localSearch, setLocalSearch] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("All");
  const [selectedLevel, setSelectedLevel] = useState("All");
  const [expandedQuestionId, setExpandedQuestionId] = useState(null);

  // Combine global search from Navbar with local search input
  const query = (searchTerm || localSearch).toLowerCase().trim();

  // Extract distinct topics dynamically
  const topics = ["All", ...Array.from(new Set(SYSTEM_DESIGN_QUESTIONS.map((q) => q.topic)))];
  const levels = ["All", "Basic", "Intermediate", "Experienced"];

  // Filter Questions
  const filteredQuestions = SYSTEM_DESIGN_QUESTIONS.filter((q) => {
    const matchesTopic = selectedTopic === "All" || q.topic === selectedTopic;
    const matchesLevel = selectedLevel === "All" || q.level === selectedLevel;

    const matchesQuery =
      !query ||
      q.question.toLowerCase().includes(query) ||
      q.summary.toLowerCase().includes(query) ||
      q.properAnswer.toLowerCase().includes(query) ||
      (q.realWorldExample && q.realWorldExample.toLowerCase().includes(query)) ||
      q.keywords.some((k) => k.word.toLowerCase().includes(query));

    return matchesTopic && matchesLevel && matchesQuery;
  });

  const toggleExpand = (id) => {
    setExpandedQuestionId((prev) => (prev === id ? null : id));
  };

  return (
    <section className="space-y-6 font-sans pb-12" id="sd-interview-qa-section">
      {/* Compact Header Banner */}
      <header className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 dark:bg-zinc-950 dark:border-zinc-800 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3" id="sd-interview-qa-header">
        <div className="space-y-1">
          <h1 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Cpu className="w-4 h-4 text-amber-500" />
            System Design & Architecture Q&A
          </h1>
          <p className="text-xs text-slate-500 dark:text-zinc-400">
            Distributed systems Q&As, production examples & HLD/LLD blueprints.
          </p>
        </div>

        <div className="px-3 py-1 rounded-xl bg-slate-100 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 text-xs font-mono text-slate-700 dark:text-zinc-300 font-bold shrink-0 self-start sm:self-auto">
          {SYSTEM_DESIGN_QUESTIONS.length} Questions
        </div>
      </header>

      {/* Filters & Search Controls */}
      <div className="p-4 rounded-2xl bg-white border border-slate-200 dark:bg-zinc-950 dark:border-zinc-800 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Local Search Input */}
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              id="sd-qa-search-input"
              type="text"
              placeholder="Search topics, keywords, algorithms..."
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500/20 dark:bg-zinc-900 dark:border-zinc-800 dark:text-white"
            />
          </div>

          {/* Topic Filter Dropdown */}
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-slate-400 shrink-0" />
            <div className="w-full">
              <CustomDropdown
                options={topics.map((t) => ({ label: `Topic: ${t}`, value: t }))}
                value={selectedTopic}
                onChange={setSelectedTopic}
              />
            </div>
          </div>

          {/* Level Filter Dropdown */}
          <div className="flex items-center gap-2">
            <div className="w-full">
              <CustomDropdown
                options={levels.map((l) => ({ label: `Level: ${l}`, value: l }))}
                value={selectedLevel}
                onChange={setSelectedLevel}
              />
            </div>
          </div>
        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-zinc-400 pt-1 font-mono">
          <span>Showing {filteredQuestions.length} of {SYSTEM_DESIGN_QUESTIONS.length} Questions</span>
          {query && <span>Filter applied: "{query}"</span>}
        </div>
      </div>

      {/* Questions Feed Grid */}
      <div className="space-y-4" id="sd-qa-questions-list">
        {filteredQuestions.length === 0 ? (
          <div className="p-12 text-center rounded-3xl bg-white border border-slate-200 dark:bg-zinc-950 dark:border-zinc-800 space-y-3">
            <HelpCircle className="w-10 h-10 text-slate-400 mx-auto" />
            <p className="text-sm font-bold text-slate-700 dark:text-zinc-300">No System Design Q&A matching your filters</p>
            <button
              onClick={() => {
                setLocalSearch("");
                setSelectedTopic("All");
                setSelectedLevel("All");
              }}
              className="text-xs text-amber-600 dark:text-amber-400 hover:underline font-medium cursor-pointer"
            >
              Reset all filters
            </button>
          </div>
        ) : (
          filteredQuestions.map((q) => {
            const isExpanded = expandedQuestionId === q.id;

            return (
              <article
                key={q.id}
                id={`sd-qa-card-${q.id}`}
                className="rounded-3xl bg-white border border-slate-200 dark:bg-zinc-950 dark:border-zinc-800 overflow-hidden transition hover:border-slate-300 dark:hover:border-zinc-700"
              >
                {/* Question Summary Bar (Collapsible Header) */}
                <div
                  onClick={() => toggleExpand(q.id)}
                  className="p-5 cursor-pointer flex items-start justify-between gap-4 select-none hover:bg-slate-50/50 dark:hover:bg-zinc-900/40 transition"
                >
                  <div className="space-y-2 flex-1">
                    {/* Metadata Badges & HLD Blueprint Link Chip */}
                    <div className="flex items-center gap-2 flex-wrap text-[11px] font-mono">
                      <span className="px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 font-bold text-slate-700 dark:text-zinc-300">
                        {q.topic}
                      </span>
                      <span
                        className={`px-2.5 py-0.5 rounded-full border font-bold ${
                          q.level === "Basic"
                            ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-400"
                            : q.level === "Intermediate"
                            ? "bg-blue-500/10 border-blue-500/20 text-blue-600 dark:text-blue-400"
                            : "bg-purple-500/10 border-purple-500/20 text-purple-600 dark:text-purple-400"
                        }`}
                      >
                        {q.level}
                      </span>

                      {/* Optional HLD Linked Badge */}
                      {q.relatedBlueprint && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 font-bold">
                          <ExternalLink className="w-3 h-3" />
                          <span>{q.relatedBlueprint.badge}</span>
                        </span>
                      )}
                    </div>

                    {/* Question Title */}
                    <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-snug">
                      {q.question}
                    </h2>

                    {/* One-Line Summary */}
                    <p className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed font-sans">
                      {q.summary}
                    </p>
                  </div>

                  <div className="mt-1 p-2 rounded-xl bg-slate-100 dark:bg-zinc-900 text-slate-600 dark:text-zinc-400 shrink-0">
                    <ChevronRight
                      className={`w-4 h-4 transition-transform duration-200 ${isExpanded ? "rotate-90 text-amber-500" : ""}`}
                    />
                  </div>
                </div>

                {/* Expanded Question Deep Dive */}
                {isExpanded && (
                  <div className="px-5 pb-6 pt-2 border-t border-slate-100 dark:border-zinc-900 space-y-6 font-sans">
                    {/* Golden Answer / Proper Explanation */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-xs font-mono uppercase font-bold text-slate-900 dark:text-white">
                        <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                        <span>Comprehensive Architectural Answer</span>
                      </div>
                      <div className="p-4 rounded-2xl bg-slate-50 dark:bg-zinc-900/60 border border-slate-200 dark:border-zinc-800 text-xs sm:text-sm text-slate-700 dark:text-zinc-300 leading-relaxed">
                        {renderFormattedText(q.properAnswer)}
                      </div>
                    </div>

                    {/* Production Real-World Example Box */}
                    {q.realWorldExample && (
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-xs font-mono uppercase font-bold text-blue-600 dark:text-blue-400">
                          <Building2 className="w-3.5 h-3.5" />
                          <span>Production Real-World Example</span>
                        </div>
                        <div className="p-4 rounded-2xl bg-blue-50/60 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900/40 text-xs sm:text-sm text-slate-800 dark:text-blue-200 leading-relaxed font-medium">
                          {renderFormattedText(q.realWorldExample)}
                        </div>
                      </div>
                    )}

                    {/* Direct HLD / LLD Blueprint Link Banner */}
                    {q.relatedBlueprint && (
                      <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent border border-amber-500/30 flex items-center justify-between gap-4 flex-wrap">
                        <div className="space-y-1">
                          <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 flex items-center gap-1.5">
                            <BookOpen className="w-3.5 h-3.5" />
                            <span>Linked Architectural Blueprint</span>
                          </div>
                          <p className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                            {q.relatedBlueprint.title}
                          </p>
                        </div>

                        <button
                          onClick={() => navigate(q.relatedBlueprint.path)}
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-black text-xs font-bold transition shadow-sm cursor-pointer"
                        >
                          <span>Open Full Blueprint</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    )}

                    {/* Spoken Response / Golden Interview Lines */}
                    {q.interviewLines && q.interviewLines.length > 0 && (
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-xs font-mono uppercase font-bold text-emerald-600 dark:text-emerald-400">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Senior Interview Spoken Response (Golden Lines)</span>
                        </div>
                        <div className="p-4 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/40 space-y-2">
                          {q.interviewLines.map((line, idx) => (
                            <p key={idx} className="text-xs text-slate-800 dark:text-emerald-200 font-medium leading-relaxed flex items-start gap-2">
                              <span className="text-emerald-500 font-bold">•</span>
                              <span>"{line}"</span>
                            </p>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Detailed Breakdown Points */}
                    {q.explanation && q.explanation.length > 0 && (
                      <div className="space-y-2">
                        <h3 className="text-xs font-mono uppercase font-bold text-slate-500 dark:text-zinc-400">
                          Key Architectural Points
                        </h3>
                        <ul className="space-y-2 text-xs text-slate-700 dark:text-zinc-300">
                          {q.explanation.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-2 leading-relaxed">
                              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0 mt-1.5" />
                              <span>{renderFormattedText(item)}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Comparison Table Data */}
                    {q.tableData && (
                      <div className="space-y-2 overflow-x-auto">
                        <div className="flex items-center gap-2 text-xs font-mono uppercase font-bold text-purple-600 dark:text-purple-400">
                          <TableIcon className="w-3.5 h-3.5" />
                          <span>Comparison Matrix</span>
                        </div>
                        <table className="w-full text-left border-collapse text-xs rounded-xl overflow-hidden border border-slate-200 dark:border-zinc-800">
                          <thead>
                            <tr className="bg-slate-100 dark:bg-zinc-900 text-slate-900 dark:text-white font-bold font-mono">
                              {q.tableData.headers.map((h, idx) => (
                                <th key={idx} className="p-3 border-b border-slate-200 dark:border-zinc-800">
                                  {h}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100 dark:divide-zinc-900 text-slate-700 dark:text-zinc-300">
                            {q.tableData.rows.map((row, rIdx) => (
                              <tr key={rIdx} className="hover:bg-slate-50 dark:hover:bg-zinc-900/50">
                                {row.map((cell, cIdx) => (
                                  <td key={cIdx} className="p-3 leading-relaxed">
                                    {cell}
                                  </td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}

                    {/* Code Snippet / Lua Script */}
                    {q.codeSnippet && (
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-xs font-mono uppercase font-bold text-blue-600 dark:text-blue-400">
                          <Terminal className="w-3.5 h-3.5" />
                          <span>Code / Script Implementation</span>
                        </div>
                        <pre className="p-4 rounded-2xl bg-slate-900 text-slate-100 font-mono text-xs overflow-x-auto leading-relaxed border border-slate-800">
                          <code>{q.codeSnippet}</code>
                        </pre>
                      </div>
                    )}

                    {/* Keyword Tags */}
                    {q.keywords && q.keywords.length > 0 && (
                      <div className="pt-2 flex flex-wrap gap-1.5">
                        {q.keywords.map((kw, kIdx) => (
                          <span
                            key={kIdx}
                            className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200 dark:bg-zinc-900 dark:text-zinc-400 dark:border-zinc-800"
                          >
                            #{kw.word}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </article>
            );
          })
        )}
      </div>
    </section>
  );
};

export default SystemDesignInterview;
