import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  JAVA_QUESTIONS,
  JAVA_TOPICS,
  JAVA_LEVELS,
  JAVA_TYPES,
  JAVA_RECALL_CARDS
} from "./javaData";
import { getKeywordDefinition } from "./javaKeywordsData";
import { CustomDropdown } from "../common/CustomDropdown";
import { renderFormattedText } from "../../utils/formatText";
import {
  Search,
  Filter,
  Brain,
  CheckCircle2,
  Code2,
  Terminal,
  Table as TableIcon,
  Sparkles,
  HelpCircle,
  ExternalLink,
  BadgeAlert,
  X,
  Layers,
  BookOpen
} from "lucide-react";

// Slug mappings for SEO clean URLs
const TOPIC_SLUG_MAP = {
  "Collections Framework": "collections",
  "Concurrency & Multithreading": "concurrency",
  "JVM Memory & GC": "jvm",
  "Spring Boot & Architecture": "spring-boot",
  "Core Java & OOP": "core-java",
  "Garbage Collection": "gc",
  "Design Patterns": "design-patterns",
  "REST & Microservices": "microservices"
};

const SLUG_TOPIC_MAP = Object.entries(TOPIC_SLUG_MAP).reduce((acc, [topic, slug]) => {
  acc[slug] = topic;
  return acc;
}, {});

export const JavaInterview = ({ onSelectRecallCard, searchTerm }) => {
  const location = useLocation();
  const navigate = useNavigate();

  // Derive initial topic from URL sub-path (/interview/java/collections -> Collections Framework)
  const pathParts = location.pathname.split("/").filter(Boolean);
  const subSlug = pathParts[2]; // e.g. "collections" from /interview/java/collections
  const initialTopic = subSlug && SLUG_TOPIC_MAP[subSlug] ? SLUG_TOPIC_MAP[subSlug] : "All Topics";

  const [selectedTopic, setSelectedTopic] = useState(initialTopic);
  const [selectedLevel, setSelectedLevel] = useState("All Levels");
  const [selectedType, setSelectedType] = useState("All Types");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeKeywordByQuestion, setActiveKeywordByQuestion] = useState({});

  useEffect(() => {
    if (subSlug && SLUG_TOPIC_MAP[subSlug]) {
      setSelectedTopic(SLUG_TOPIC_MAP[subSlug]);
    }
  }, [subSlug]);

  const handleTopicChange = (topic) => {
    setSelectedTopic(topic);
    if (topic === "All Topics") {
      navigate("/interview/java");
    } else {
      const slug = TOPIC_SLUG_MAP[topic] || topic.toLowerCase().replace(/[^a-z0-9]+/g, "-");
      navigate(`/interview/java/${slug}`);
    }
  };

  const activeSearch = (searchTerm || searchQuery || "").toLowerCase();

  const toggleKeywordInQuestion = (questionId, word) => {
    setActiveKeywordByQuestion((prev) => ({
      ...prev,
      [questionId]: prev[questionId] === word ? null : word
    }));
  };

  // Filtering Logic
  const filteredQuestions = JAVA_QUESTIONS.filter((q) => {
    const matchesTopic = selectedTopic === "All Topics" || q.topic === selectedTopic;
    const matchesLevel = selectedLevel === "All Levels" || q.level === selectedLevel;
    const matchesType = selectedType === "All Types" || q.type === selectedType;
    const matchesSearch =
      !activeSearch ||
      q.question.toLowerCase().includes(activeSearch) ||
      q.summary.toLowerCase().includes(activeSearch) ||
      (q.explanation || []).some(e => typeof e === "string" && e.toLowerCase().includes(activeSearch)) ||
      (q.keywords || []).some(k => k.word && k.word.toLowerCase().includes(activeSearch));

    return matchesTopic && matchesLevel && matchesType && matchesSearch;
  });

  return (
    <div className="space-y-6 sm:space-y-8 font-sans max-w-7xl mx-auto overflow-x-hidden w-full">

      {/* Compact Header */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 dark:bg-zinc-950 dark:border-zinc-800 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="space-y-0.5">
            <h1 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Code2 className="w-4 h-4 text-slate-700 dark:text-zinc-300" />
              Java Technical Interview Q&A Bank
            </h1>
            <p className="text-xs text-slate-500 dark:text-zinc-400">
              Senior engineering responses with interactive active recall flashcards.
            </p>
          </div>

          <div className="px-3 py-1 rounded-xl bg-slate-100 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 text-xs font-mono text-slate-700 dark:text-zinc-300 font-bold shrink-0">
            {filteredQuestions.length} Matched
          </div>
        </div>

        {/* Filters and Controls */}
        <div className="pt-4 border-t border-slate-200 dark:border-zinc-900 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">

          {/* Search Input */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 dark:text-zinc-400 absolute left-3 top-3.5" />
            <input
              type="text"
              placeholder="Search Java questions or keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-slate-300 text-xs text-slate-900 dark:bg-black dark:border-zinc-800 dark:text-white pl-9 pr-4 py-3 rounded-xl focus:outline-none focus:border-slate-500 dark:focus:border-zinc-500 transition"
            />
          </div>

          {/* Topic Selector */}
          <CustomDropdown
            options={JAVA_TOPICS}
            value={selectedTopic}
            onChange={handleTopicChange}
            placeholder="Select Topic"
            icon={BookOpen}
          />

          {/* Level Selector */}
          <CustomDropdown
            options={JAVA_LEVELS}
            value={selectedLevel}
            onChange={setSelectedLevel}
            placeholder="Select Level"
            icon={Layers}
          />

          {/* Type Selector */}
          <CustomDropdown
            options={JAVA_TYPES}
            value={selectedType}
            onChange={setSelectedType}
            placeholder="Select Type"
            icon={Filter}
          />

        </div>
      </div>

      {/* Questions List */}
      <div className="space-y-6">
        {filteredQuestions.length === 0 ? (
          <div className="p-12 text-center rounded-3xl bg-white border border-slate-200 text-slate-500 dark:bg-zinc-950 dark:border-zinc-800 dark:text-zinc-400 space-y-2">
            <HelpCircle className="w-8 h-8 mx-auto text-slate-400 dark:text-zinc-600" />
            <p className="text-sm font-semibold">No questions match your current filters.</p>
            <button
              onClick={() => {
                handleTopicChange("All Topics");
                setSelectedLevel("All Levels");
                setSelectedType("All Types");
                setSearchQuery("");
              }}
              className="text-xs text-slate-900 underline cursor-pointer hover:text-slate-700 dark:text-white dark:hover:text-zinc-300"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          filteredQuestions.map((q) => (
            <div
              key={q.id}
              className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 dark:bg-zinc-950 dark:border-zinc-800 space-y-6   hover:border-slate-300 dark:hover:border-zinc-700 transition"
            >
              {/* Question Header */}
              <div className="flex flex-wrap items-start justify-between gap-3 border-b border-slate-200 dark:border-zinc-900 pb-4">
                <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white leading-snug">
                  {q.question}
                </h2>

                <div className="flex items-center gap-2 flex-wrap text-[11px] font-mono">
                  <span className="px-2.5 py-0.5 rounded-full bg-slate-100 border border-slate-200 text-slate-700 dark:bg-zinc-900 dark:border-zinc-700 dark:text-zinc-300">
                    {q.topic}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-slate-900 text-white dark:bg-white dark:text-black font-bold">
                    {q.level}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-slate-100 border border-slate-200 text-slate-600 dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-400">
                    {q.type}
                  </span>
                </div>
              </div>

              {/* High-Impact Answer Summary */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 dark:bg-zinc-900/70 dark:border-zinc-800 space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500 dark:text-zinc-400 font-bold">
                  ★ Key One-Line Answer (HR / Quick Review)
                </span>
                <div className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-white leading-relaxed">
                  {renderFormattedText(q.summary)}
                </div>
              </div>

              {/* Senior Human Spoken Answer */}
              {q.properAnswer && (
                <div className="p-4 sm:p-5 rounded-2xl bg-slate-100 border border-slate-300 dark:bg-zinc-900/90 dark:border-zinc-700/70 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-slate-900 dark:text-white font-bold">
                    <span> Technical Interview Response (What to say)</span>
                  </div>
                  <div className="text-xs sm:text-sm text-slate-800 dark:text-zinc-200 leading-relaxed font-sans font-medium">
                    {renderFormattedText(q.properAnswer)}
                  </div>
                </div>
              )}

              {/* Detailed Interviewer Explanation */}
              <div className="space-y-3">
                <span className="text-xs font-mono uppercase text-slate-500 dark:text-zinc-400 font-bold flex items-center gap-1.5">
                  <Terminal className="w-4 h-4 text-slate-900 dark:text-white" />
                  How to Explain to the Interviewer
                </span>

                <div className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-zinc-300 leading-relaxed font-sans">
                  {q.explanation.map((item, idx) => (
                    <div key={idx} className="pl-1">
                      {renderFormattedText(item)}
                    </div>
                  ))}
                </div>
              </div>

              {/* Optional Table Component */}
              {q.tableData && (
                <div className="space-y-2 pt-2">
                  <span className="text-xs font-mono text-slate-500 dark:text-zinc-400 font-bold flex items-center gap-1.5">
                    <TableIcon className="w-3.5 h-3.5 text-slate-900 dark:text-white" />
                    Quick Comparison Table
                  </span>
                  <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-zinc-800">
                    <table className="w-full text-xs text-left">
                      <thead className="bg-slate-100 text-slate-900 dark:bg-zinc-900 dark:text-white font-mono uppercase text-[10px]">
                        <tr>
                          {q.tableData.headers.map((h, i) => (
                            <th key={i} className="p-3 border-b border-slate-200 dark:border-zinc-800">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200 dark:divide-zinc-800 text-slate-700 dark:text-zinc-300">
                        {q.tableData.rows.map((row, rowIndex) => (
                          <tr key={rowIndex} className="hover:bg-slate-50 dark:hover:bg-zinc-900/40">
                            {row.map((cell, cellIndex) => (
                              <td key={cellIndex} className="p-3 font-sans">
                                {renderFormattedText(cell)}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Key Interview Golden Lines */}
              {q.interviewLines && (
                <div className="space-y-2">
                  <span className="text-[11px] font-mono text-slate-500 dark:text-zinc-400 uppercase font-bold flex items-center gap-1.5">
                    <BadgeAlert className="w-3.5 h-3.5 text-slate-900 dark:text-white" /> Powerful Interview Lines (Must Quote)
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {q.interviewLines.map((line, idx) => (
                      <div
                        key={idx}
                        className="px-3 py-1.5 rounded-xl bg-slate-900 text-white border border-slate-900 dark:bg-black dark:border-zinc-800 dark:text-zinc-200 text-xs font-medium flex items-center gap-2"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                        <span>{line}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Clickable Keywords -> In-Line Expandable Recall Card */}
              {q.keywords && q.keywords.length > 0 && (
                <div className="pt-3 border-t border-slate-200 dark:border-zinc-900 space-y-3">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[10px] font-mono text-slate-500 dark:text-zinc-400 uppercase font-bold">
                      Active Recall Keywords:
                    </span>
                    {q.keywords.map((k, idx) => {
                      const isActive = activeKeywordByQuestion[q.id] === k.word;
                      return (
                        <button
                          key={idx}
                          onClick={() => toggleKeywordInQuestion(q.id, k.word)}
                          className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold transition cursor-pointer inline-flex items-center gap-1.5 group border ${isActive
                            ? "bg-slate-900 text-white border-slate-900 dark:bg-white dark:text-black dark:border-white"
                            : "bg-slate-100 text-slate-800 border-slate-300 hover:bg-slate-200 dark:bg-zinc-900 dark:text-white dark:border-zinc-700 dark:hover:bg-zinc-800"
                            }`}
                          title={`Toggle in-line recall note for ${k.word}`}
                        >
                          <span className="font-extrabold">
                            {k.word}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Embedded In-Line Card directly inside Question Container */}
                  {activeKeywordByQuestion[q.id] && (() => {
                    const activeWord = activeKeywordByQuestion[q.id];
                    const keywordInfo = getKeywordDefinition(activeWord, q.topic, q.question);
                    return (
                      <div className="p-4 rounded-2xl bg-slate-100 border border-slate-300 dark:bg-zinc-900/90 dark:border-zinc-700/80 space-y-2 relative overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150  ">
                        <div className="flex items-center justify-between border-b border-slate-200 dark:border-zinc-800 pb-2">
                          <div className="flex items-center gap-2">

                            <span className="text-xs font-extrabold text-slate-900 dark:text-white">{keywordInfo.word}</span>
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white text-slate-700 border border-slate-300 dark:bg-zinc-950 dark:border-zinc-800 dark:text-zinc-400">
                              {keywordInfo.topic}
                            </span>
                          </div>
                          <button
                            onClick={() => toggleKeywordInQuestion(q.id, activeWord)}
                            className="text-[10px] font-mono px-2 py-0.5 rounded bg-white text-slate-600 hover:bg-slate-200 border border-slate-300 dark:bg-zinc-950 dark:hover:bg-zinc-800 dark:text-zinc-400 dark:hover:text-white dark:border-zinc-800 transition cursor-pointer"
                          >
                            ✕
                          </button>
                        </div>
                        <div className="space-y-1">
                          <span className="text-[10px] font-mono uppercase text-slate-500 dark:text-zinc-400 font-bold block">
                            💡 Quick Keyword Recall:
                          </span>
                          <div className="text-xs text-slate-800 dark:text-zinc-200 leading-relaxed font-sans font-medium">
                            {renderFormattedText(keywordInfo.definition)}
                          </div>
                        </div>
                      </div>
                    );
                  })()}
                </div>
              )}

            </div>
          ))
        )}
      </div>

    </div>
  );
};

export default JavaInterview;
