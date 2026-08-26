import React, { useState, useEffect } from "react";
import { JAVA_REVISION_SECTIONS, JAVA_REVISION_CATEGORIES } from "./javaRevisionNotesData";
import JavaRevisionDiagrams from "./JavaRevisionDiagrams";
import {
  Brain,
  Search,
  BookOpen,
  CheckCircle2,
  Table as TableIcon,
  Sparkles,
  ArrowRight,
  Zap,
  Layers,
  ChevronRight,
  ChevronDown,
  HelpCircle,
  MessageSquare,
  Terminal,
  AlertTriangle,
  Lightbulb,
  FileCode,
  BookMarked,
  ListFilter
} from "lucide-react";

export const JavaRevision = ({ onBackToInterview }) => {
  const [selectedCategory, setSelectedCategory] = useState("All Topics");
  const [activeSectionId, setActiveSectionId] = useState(JAVA_REVISION_SECTIONS[0].id);
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedQuestions, setExpandedQuestions] = useState({});
  const [isMobileTopicMenuOpen, setIsMobileTopicMenuOpen] = useState(false);

  // Toggle interview question answer expansion
  const toggleQuestion = (secId, qIdx) => {
    const key = `${secId}-${qIdx}`;
    setExpandedQuestions((prev) => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  // Smooth scroll to section when clicked from right navbar or mobile topic dropdown
  const scrollToSection = (id) => {
    setActiveSectionId(id);
    setIsMobileTopicMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -90; // Adjust for top fixed header space
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  // Intersection Observer / Scroll Spy to highlight active right nav link
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 220;

      for (const section of JAVA_REVISION_SECTIONS) {
        const element = document.getElementById(section.id);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSectionId(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Filter sections by category and search query
  const filteredSections = JAVA_REVISION_SECTIONS.filter((s) => {
    const matchesCategory = selectedCategory === "All Topics" || s.category === selectedCategory;
    if (!matchesCategory) return false;

    if (!searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase();
    const subMatch = s.detailedContent?.subsections?.some(
      (sub) => sub.heading.toLowerCase().includes(query) || sub.content.toLowerCase().includes(query)
    );

    return (
      s.title.toLowerCase().includes(query) ||
      s.subtitle.toLowerCase().includes(query) ||
      s.summary.toLowerCase().includes(query) ||
      subMatch
    );
  });

  const activeSectionObj = JAVA_REVISION_SECTIONS.find((s) => s.id === activeSectionId) || JAVA_REVISION_SECTIONS[0];

  return (
    <div className="space-y-6 sm:space-y-8 font-sans max-w-7xl mx-auto pb-24 px-1 sm:px-0 overflow-x-hidden w-full">

      {/* Compact Header Banner */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 dark:bg-zinc-950 dark:border-zinc-800 space-y-3">
        <div className="space-y-1">
          <h1 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <BookMarked className="w-4 h-4 text-sky-500" />
            Java Architecture & Concept Textbook
          </h1>
          <p className="text-xs text-slate-500 dark:text-zinc-400">
            In-depth conceptual notes, code breakdowns, memory mechanics & interview trees.
          </p>
        </div>

        {/* Category Pills & Search */}
        <div className="pt-2 space-y-3">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
            {JAVA_REVISION_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold whitespace-nowrap transition cursor-pointer border ${selectedCategory === cat
                  ? "bg-slate-900 text-white border-slate-900   dark:bg-white dark:text-black dark:border-white"
                  : "bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 border-slate-300 dark:bg-zinc-900 dark:hover:bg-zinc-800 dark:text-zinc-400 dark:hover:text-white dark:border-zinc-800"
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="max-w-md relative">
            <input
              type="text"
              placeholder="Search concepts, topics or mechanics (e.g. HashMap, Virtual Threads)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-2xl bg-white border border-slate-300 text-xs text-slate-900 placeholder-slate-400 dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-200 dark:placeholder-zinc-500 focus:outline-none focus:border-slate-500 dark:focus:border-zinc-500 transition font-sans"
            />
            <Search className="w-4 h-4 text-slate-400 dark:text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Mobile Sticky Quick Topic Navigation Dropdown (< xl screens) */}
      <div className="xl:hidden sticky top-16 z-30 bg-white/95 border border-slate-200 dark:bg-zinc-950/95 dark:border-zinc-800 backdrop-blur-md rounded-2xl p-3  ">
        <button
          onClick={() => setIsMobileTopicMenuOpen(!isMobileTopicMenuOpen)}
          className="w-full flex items-center justify-between gap-2 text-xs font-mono font-bold text-slate-900 dark:text-white cursor-pointer"
        >
          <div className="flex items-center gap-2 truncate">
            <span className="px-2 py-0.5 rounded bg-slate-900 text-white dark:bg-white dark:text-black font-extrabold text-[10px]">
              #{activeSectionObj.number}
            </span>
            <span className="truncate text-slate-800 dark:text-zinc-200">
              {activeSectionObj.title.replace(/^\d+\.\s*/, "")}
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-slate-500 dark:text-zinc-400 shrink-0">
            <span className="text-[10px]">Jump Topic</span>
            <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isMobileTopicMenuOpen ? "rotate-180 text-slate-900 dark:text-white" : ""}`} />
          </div>
        </button>

        {/* Mobile Dropdown List */}
        {isMobileTopicMenuOpen && (
          <div className="mt-3 pt-3 border-t border-slate-200 dark:border-zinc-800 max-h-64 overflow-y-auto space-y-1 no-scrollbar animate-in slide-in-from-top-1">
            {JAVA_REVISION_SECTIONS.map((sec) => {
              const isActive = activeSectionId === sec.id;
              return (
                <button
                  key={sec.id}
                  onClick={() => scrollToSection(sec.id)}
                  className={`w-full text-left p-2 rounded-xl transition flex items-center justify-between text-xs cursor-pointer ${isActive
                    ? "bg-slate-900 text-white font-extrabold   dark:bg-white dark:text-black"
                    : "text-slate-700 hover:text-slate-900 hover:bg-slate-100 dark:text-zinc-400 dark:hover:text-white dark:hover:bg-zinc-900"
                    }`}
                >
                  <div className="flex items-center gap-2 truncate">
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${isActive ? "bg-slate-800 text-white dark:bg-black dark:text-white" : "bg-slate-100 text-slate-600 dark:bg-zinc-900 dark:text-zinc-400"}`}>
                      {sec.number}
                    </span>
                    <span className="truncate">{sec.title.replace(/^\d+\.\s*/, "")}</span>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 opacity-60 shrink-0" />
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Two Column Layout: Main Content + Sticky Fixed Right Side Topic Navigation */}
      <div className="flex gap-8 items-start">

        {/* Main Content Area */}
        <div className="flex-1 space-y-8 sm:space-y-12 min-w-0">
          {filteredSections.length > 0 ? (
            filteredSections.map((section) => {
              const dc = section.detailedContent || {};
              return (
                <section
                  key={section.id}
                  id={section.id}
                  className="p-5 sm:p-8 rounded-3xl bg-white border border-slate-200 dark:bg-zinc-950 dark:border-zinc-800/90   space-y-6 sm:space-y-8 scroll-mt-24 transition-all"
                >
                  {/* Section Title Header */}
                  <div className="border-b border-slate-200 dark:border-zinc-900 pb-5 space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs font-mono px-2.5 py-0.5 rounded-md bg-slate-100 border border-slate-200 text-slate-900 dark:bg-zinc-900 dark:border-zinc-800 dark:text-white font-extrabold">
                        TOPIC {section.number}
                      </span>
                      <span className="text-xs font-mono text-slate-500 dark:text-zinc-500">{section.category}</span>
                    </div>
                    <h2 className="text-lg sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                      {section.title}
                    </h2>
                    <p className="text-xs text-slate-600 dark:text-zinc-400 font-sans font-medium leading-relaxed">
                      {section.subtitle}
                    </p>
                  </div>

                  {/* Introduction Lead-in */}
                  {dc.introduction && (
                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-800 dark:bg-zinc-900/40 dark:border-zinc-800/60 dark:text-zinc-300 leading-relaxed font-sans">
                      <p>{dc.introduction}</p>
                    </div>
                  )}

                  {/* Animated Diagram (if available) */}
                  {section.diagramType && (
                    <div className="overflow-x-auto no-scrollbar">
                      <JavaRevisionDiagrams type={section.diagramType} />
                    </div>
                  )}

                  {/* Detailed Subsections */}
                  {dc.subsections && dc.subsections.length > 0 && (
                    <div className="space-y-4 sm:space-y-6">
                      {dc.subsections.map((sub, sIdx) => (
                        <div key={sIdx} className="space-y-3 p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200 dark:bg-zinc-900/30 dark:border-zinc-800/70">
                          <h3 className="text-xs sm:text-base font-bold text-slate-900 dark:text-white flex items-start gap-2 font-mono leading-tight">
                            <ChevronRight className="w-4 h-4 text-sky-600 dark:text-sky-400 shrink-0 mt-0.5" />
                            <span>{sub.heading}</span>
                          </h3>

                          <div className="text-xs sm:text-sm text-slate-700 dark:text-zinc-300 leading-relaxed font-sans whitespace-pre-line">
                            {sub.content}
                          </div>

                          {/* Subsection Code Block */}
                          {sub.code && (
                            <div className="space-y-2 pt-2">
                              <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-500 dark:text-zinc-400">
                                <Terminal className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                                <span>Code Example & Runnable Logic:</span>
                              </div>
                              <pre className="p-3.5 sm:p-4 rounded-xl bg-slate-900 border border-slate-800 dark:bg-black dark:border-zinc-800 text-[11px] sm:text-xs font-mono text-emerald-400 dark:text-emerald-300 overflow-x-auto leading-relaxed max-w-full">
                                <code>{sub.code}</code>
                              </pre>
                            </div>
                          )}

                          {/* Code Explanation */}
                          {sub.codeExplanation && (
                            <div className="p-3 rounded-xl bg-slate-100 border border-slate-200 dark:bg-zinc-950 dark:border-zinc-800 text-[11px] sm:text-xs text-slate-700 dark:text-zinc-400 space-y-1 font-mono whitespace-pre-line">
                              <span className="text-slate-900 dark:text-zinc-200 font-bold">Line-by-Line Breakdown:</span>
                              <p>{sub.codeExplanation}</p>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Standalone Code Snippet (if present outside subsections) */}
                  {section.content?.codeSnippet && (
                    <div className="space-y-2">
                      <span className="text-[11px] font-mono uppercase text-slate-500 dark:text-zinc-400 font-bold tracking-wider flex items-center gap-1.5">
                        <Terminal className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                        Code Demonstration:
                      </span>
                      <pre className="p-4 rounded-2xl bg-slate-900 border border-slate-800 dark:bg-black dark:border-zinc-800 text-[11px] sm:text-xs font-mono text-emerald-400 dark:text-emerald-300 overflow-x-auto leading-relaxed max-w-full">
                        <code>{section.content.codeSnippet}</code>
                      </pre>
                    </div>
                  )}

                  {/* Comparative Tables */}
                  {dc.tables && dc.tables.map((table, tIdx) => (
                    <div key={tIdx} className="space-y-3 pt-2">
                      <span className="text-[11px] font-mono uppercase text-slate-500 dark:text-zinc-400 font-bold tracking-wider flex items-center gap-1.5">
                        <TableIcon className="w-3.5 h-3.5 text-slate-900 dark:text-white" />
                        {table.title || "Comparative Summary Table:"}
                      </span>

                      <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-slate-50 dark:border-zinc-800 dark:bg-zinc-900/40 no-scrollbar">
                        <table className="w-full text-left text-xs font-sans">
                          <thead className="bg-slate-100 text-slate-800 dark:bg-zinc-900/90 dark:text-zinc-300 font-mono text-[10px] sm:text-[11px] uppercase border-b border-slate-200 dark:border-zinc-800">
                            <tr>
                              {table.headers.map((h, hIdx) => (
                                <th key={hIdx} className="p-3 font-bold whitespace-nowrap">
                                  {h}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-200 dark:divide-zinc-800/60 text-slate-700 dark:text-zinc-200">
                            {table.rows.map((row, rIdx) => (
                              <tr key={rIdx} className="hover:bg-slate-100 dark:hover:bg-zinc-900/60 transition">
                                {row.map((cell, cIdx) => (
                                  <td
                                    key={cIdx}
                                    className={`p-3 text-[11px] sm:text-xs ${cIdx === 0 ? "font-bold text-slate-900 dark:text-white font-mono whitespace-nowrap" : "text-slate-700 dark:text-zinc-300 min-w-[140px]"
                                      }`}
                                  >
                                    {cell}
                                  </td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  ))}

                  {/* Common Pitfalls Box */}
                  {dc.pitfalls && dc.pitfalls.length > 0 && (
                    <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 dark:bg-rose-950/20 dark:border-rose-900/50 space-y-2">
                      <span className="text-[11px] font-mono uppercase text-rose-700 dark:text-rose-400 font-bold tracking-widest flex items-center gap-1.5">
                        <AlertTriangle className="w-4 h-4 text-rose-600 dark:text-rose-400" />
                        Common Beginner Pitfalls & Mistakes:
                      </span>
                      <ul className="space-y-1.5">
                        {dc.pitfalls.map((pitfall, pIdx) => (
                          <li key={pIdx} className="text-xs text-rose-900 dark:text-rose-200/90 font-medium flex items-start gap-2 leading-relaxed">
                            <span className="text-rose-500 font-mono">•</span>
                            <span>{pitfall}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Key Takeaways Box */}
                  {dc.keyTakeaways && dc.keyTakeaways.length > 0 && (
                    <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 dark:bg-amber-950/20 dark:border-amber-900/50 space-y-2">
                      <span className="text-[11px] font-mono uppercase text-amber-700 dark:text-amber-400 font-bold tracking-widest flex items-center gap-1.5">
                        <Lightbulb className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                        Key Engineering Takeaways:
                      </span>
                      <ul className="space-y-1.5">
                        {dc.keyTakeaways.map((takeaway, tkIdx) => (
                          <li key={tkIdx} className="text-xs text-amber-900 dark:text-amber-100/90 font-medium flex items-start gap-2 leading-relaxed">
                            <span className="text-amber-500 font-mono">•</span>
                            <span>{takeaway}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Interview Questions Accordion */}
                  {dc.interviewQuestions && dc.interviewQuestions.length > 0 && (
                    <div className="space-y-3 pt-2">
                      <span className="text-[11px] font-mono uppercase text-slate-500 dark:text-zinc-400 font-bold tracking-wider flex items-center gap-1.5">
                        <HelpCircle className="w-3.5 h-3.5 text-slate-900 dark:text-white" />
                        Interview Follow-Up Q&As:
                      </span>

                      <div className="space-y-2">
                        {dc.interviewQuestions.map((iq, qIdx) => {
                          const isExpanded = expandedQuestions[`${section.id}-${qIdx}`];
                          return (
                            <div
                              key={qIdx}
                              className="rounded-2xl border border-slate-200 bg-slate-50 dark:border-zinc-800/90 dark:bg-zinc-900/40 overflow-hidden transition"
                            >
                              <button
                                onClick={() => toggleQuestion(section.id, qIdx)}
                                className="w-full p-3.5 text-left flex items-center justify-between gap-3 text-xs font-semibold text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-zinc-900/80 transition cursor-pointer"
                              >
                                <div className="flex items-center gap-2">
                                  <MessageSquare className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400 flex-shrink-0" />
                                  <span>{iq.q}</span>
                                </div>
                                <span className="text-[10px] font-mono text-slate-600 dark:text-zinc-400 px-2 py-0.5 rounded bg-white dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 flex-shrink-0">
                                  {isExpanded ? "Hide Answer" : "Show Answer"}
                                </span>
                              </button>

                              {isExpanded && (
                                <div className="p-4 border-t border-slate-200 bg-white dark:border-zinc-900 dark:bg-zinc-950/70 text-xs text-slate-800 dark:text-zinc-300 font-sans leading-relaxed animate-in fade-in duration-150 whitespace-pre-line">
                                  <p className="text-slate-800 dark:text-zinc-200">{iq.a}</p>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </section>
              );
            })
          ) : (
            <div className="p-12 rounded-3xl bg-white border border-slate-200 dark:bg-zinc-950 dark:border-zinc-800 text-center space-y-4  ">
              <p className="text-slate-600 dark:text-zinc-400 text-sm">No topics found matching "{searchQuery}".</p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All Topics");
                }}
                className="px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold border border-slate-900 dark:bg-zinc-900 dark:border-zinc-700 dark:hover:bg-zinc-800 transition cursor-pointer"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>

        {/* Right Sticky Fixed Topic Navigation Sidebar (xl+ screens) */}
        <aside className="w-72 hidden xl:block sticky top-24 space-y-4 flex-shrink-0 select-none">
          <div className="p-5 rounded-3xl bg-white border border-slate-200 dark:bg-zinc-950 dark:border-zinc-800   space-y-4 max-h-[80vh] flex flex-col">

            <div className="flex items-center justify-between border-b border-slate-200 dark:border-zinc-900 pb-3 flex-shrink-0">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-zinc-400 font-bold flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-slate-900 dark:text-white" />
                Java Notes Index
              </span>
              <span className="text-[10px] font-mono text-slate-500 dark:text-zinc-500">
                {JAVA_REVISION_SECTIONS.length} Topics
              </span>
            </div>

            {/* Scrollable Nav Items */}
            <nav className="space-y-1 font-mono text-xs overflow-y-auto pr-1 flex-1 no-scrollbar">
              {JAVA_REVISION_SECTIONS.map((sec) => {
                const isActive = activeSectionId === sec.id;
                return (
                  <button
                    key={sec.id}
                    onClick={() => scrollToSection(sec.id)}
                    className={`w-full text-left p-2 rounded-xl transition flex items-center justify-between cursor-pointer group ${isActive
                      ? "bg-slate-900 text-white font-extrabold   dark:bg-white dark:text-black"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-zinc-400 dark:hover:text-white dark:hover:bg-zinc-900 border border-transparent"
                      }`}
                  >
                    <div className="flex items-center gap-2 truncate">
                      <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${isActive ? "bg-slate-800 text-white dark:bg-black dark:text-white" : "bg-slate-100 text-slate-600 dark:bg-zinc-900 dark:text-zinc-400 group-hover:text-slate-900 dark:group-hover:text-white"
                        }`}>
                        {sec.number}
                      </span>
                      <span className="truncate text-[11px]">{sec.title.replace(/^\d+\.\s*/, "")}</span>
                    </div>

                    <ChevronRight className={`w-3 h-3 flex-shrink-0 transition-transform ${isActive ? "text-white dark:text-black translate-x-0.5" : "text-slate-400 dark:text-zinc-600 group-hover:text-slate-900 dark:group-hover:text-white"
                      }`} />
                  </button>
                );
              })}
            </nav>

            {/* Quick Top Button */}
            <div className="pt-2 border-t border-slate-200 dark:border-zinc-900 flex-shrink-0">
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="w-full py-2 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-[11px] font-mono text-slate-700 dark:bg-zinc-900 dark:hover:bg-zinc-800 dark:border-zinc-800 dark:text-zinc-300 dark:hover:text-white transition cursor-pointer flex items-center justify-center gap-1.5"
              >
                <span>↑ Back to Top</span>
              </button>
            </div>

          </div>
        </aside>

      </div>

    </div>
  );
};

export default JavaRevision;
