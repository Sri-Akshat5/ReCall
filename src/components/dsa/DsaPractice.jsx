import React, { useState, useMemo, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Code2,
  ExternalLink,
  Search,
  ChevronDown,
  ChevronUp,
  Brain,
  Layers,
  Sparkles,
  Trophy,
  Zap,
  ListFilter,
  FolderTree
} from "lucide-react";
import {
  TOP_75_QUESTIONS,
  TOP_150_QUESTIONS,
  TOP_250_QUESTIONS,
  A2Z_DSA_SHEET,
  ALL_COMPANIES,
  DIFFICULTY_OPTIONS,
  ALL_TOPICS
} from "./dsaData";

const SORT_OPTIONS = [
  "Default Rank",
  "Difficulty: Easy to Hard",
  "Difficulty: Hard to Easy"
];

const DIFFICULTY_WEIGHT = {
  Easy: 1,
  Medium: 2,
  Hard: 3
};

export const DsaPractice = ({ globalSearchTerm = "", setGlobalSearchTerm }) => {
  const location = useLocation();
  const navigate = useNavigate();

  // Derive active sheet from URL subpath (/dsa/top150 -> top150)
  const pathSegment = location.pathname.split("/")[2];
  const initialSheet = ["top75", "top150", "top250", "a2z"].includes(pathSegment)
    ? pathSegment
    : "top75";

  const [activeSheet, setActiveSheet] = useState(initialSheet);
  const [selectedTopic, setSelectedTopic] = useState("All Topics");
  const [selectedDifficulty, setSelectedDifficulty] = useState("All Difficulties");
  const [selectedCompany, setSelectedCompany] = useState("All Companies");
  const [selectedSort, setSelectedSort] = useState("Default Rank");
  const [viewMode, setViewMode] = useState("byTopic"); // 'byTopic' | 'all'
  const [localSearch, setLocalSearch] = useState(globalSearchTerm || "");

  // Keep state synced with URL changes
  useEffect(() => {
    if (pathSegment && ["top75", "top150", "top250", "a2z"].includes(pathSegment)) {
      setActiveSheet(pathSegment);
    }
  }, [pathSegment]);

  const handleSheetChange = (sheetKey) => {
    setActiveSheet(sheetKey);
    navigate(`/dsa/${sheetKey}`);
  };
  
  // Track open accordion states
  const [expandedTopics, setExpandedTopics] = useState({});
  const [expandedSteps, setExpandedSteps] = useState({ "Step 1": true, "Step 2": true, "Step 3": true });

  // Get active raw question pool
  const rawQuestionsList = useMemo(() => {
    if (activeSheet === "top75") return TOP_75_QUESTIONS;
    if (activeSheet === "top150") return TOP_150_QUESTIONS;
    if (activeSheet === "top250") return TOP_250_QUESTIONS;
    if (activeSheet === "a2z") {
      return A2Z_DSA_SHEET.flatMap((step) => step.questions);
    }
    return TOP_75_QUESTIONS;
  }, [activeSheet]);

  // Filter and sort questions function
  const processQuestions = (questions) => {
    const query = (localSearch || globalSearchTerm || "").toLowerCase().trim();

    const filtered = questions.filter((q) => {
      // Topic match
      if (
        selectedTopic !== "All Topics" &&
        !(q.category || "").toLowerCase().includes(selectedTopic.toLowerCase())
      ) {
        return false;
      }

      // Difficulty match
      if (
        selectedDifficulty !== "All Difficulties" &&
        (q.difficulty || "").toLowerCase().trim() !== selectedDifficulty.toLowerCase().trim()
      ) {
        return false;
      }

      // Company match
      if (
        selectedCompany !== "All Companies" &&
        !q.companies.some((c) => c.toLowerCase() === selectedCompany.toLowerCase())
      ) {
        return false;
      }

      // Text query match (title, leetcode_id, category, companies)
      if (query) {
        const titleMatch = q.title.toLowerCase().includes(query);
        const idMatch = String(q.leetcode_id).includes(query);
        const catMatch = (q.category || "").toLowerCase().includes(query);
        const compMatch = q.companies.some((c) => c.toLowerCase().includes(query));
        if (!titleMatch && !idMatch && !catMatch && !compMatch) return false;
      }

      return true;
    });

    // Sorting logic
    if (selectedSort === "Difficulty: Easy to Hard") {
      filtered.sort(
        (a, b) => (DIFFICULTY_WEIGHT[a.difficulty] || 0) - (DIFFICULTY_WEIGHT[b.difficulty] || 0)
      );
    } else if (selectedSort === "Difficulty: Hard to Easy") {
      filtered.sort(
        (a, b) => (DIFFICULTY_WEIGHT[b.difficulty] || 0) - (DIFFICULTY_WEIGHT[a.difficulty] || 0)
      );
    }

    return filtered;
  };

  const processedQuestions = useMemo(() => {
    return processQuestions(rawQuestionsList);
  }, [
    rawQuestionsList,
    selectedTopic,
    selectedDifficulty,
    selectedCompany,
    selectedSort,
    localSearch,
    globalSearchTerm
  ]);

  // Group questions by Topic / Category
  const questionsByTopic = useMemo(() => {
    const map = {};
    processedQuestions.forEach((q) => {
      const cat = q.category || "General DSA";
      if (!map[cat]) map[cat] = [];
      map[cat].push(q);
    });
    return map;
  }, [processedQuestions]);

  const toggleTopic = (topicName) => {
    setExpandedTopics((prev) => ({
      ...prev,
      [topicName]: prev[topicName] === undefined ? false : !prev[topicName]
    }));
  };

  const toggleStep = (stepName) => {
    setExpandedSteps((prev) => ({ ...prev, [stepName]: !prev[stepName] }));
  };

  const getDifficultyBadge = (diff) => {
    if (diff === "Easy")
      return "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border-emerald-200 dark:border-emerald-900";
    if (diff === "Medium")
      return "bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 border-amber-200 dark:border-amber-900";
    return "bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300 border-rose-200 dark:border-rose-900";
  };

  return (
    <div className="space-y-6 sm:space-y-8 font-sans max-w-7xl mx-auto overflow-x-hidden w-full">
      {/* Header Banner (Matches JavaInterview.jsx design) */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 dark:bg-zinc-950 dark:border-zinc-800 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700 dark:bg-zinc-900 dark:border-zinc-800 text-xs font-mono dark:text-zinc-300">
              <Code2 className="w-3.5 h-3.5 text-slate-900 dark:text-white" />
              <span>DSA Practice &amp; Problem Bank</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              Data Structures &amp; Algorithms Interview Bank
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-400 max-w-2xl">
              Curated high-frequency LeetCode questions categorized by topic for targeted interview prep.
            </p>
          </div>

          <div className="px-4 py-2 rounded-2xl bg-slate-100 border border-slate-200 text-center font-mono dark:bg-zinc-900 dark:border-zinc-800">
            <span className="text-2xl font-extrabold text-slate-900 dark:text-white">
              {processedQuestions.length}
            </span>
            <p className="text-[10px] text-slate-500 dark:text-zinc-400">
              Problems Matched
            </p>
          </div>
        </div>

        {/* Tab Switcher, View Mode Toggle & Filter Bar */}
        <div className="pt-4 border-t border-slate-200 dark:border-zinc-900 space-y-4">
          {/* Top Row: Sheet Switcher & View Mode Toggle */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            {/* Sheet Selector Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
              <button
                onClick={() => handleSheetChange("top75")}
                className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition flex items-center gap-2 border cursor-pointer shrink-0 ${
                  activeSheet === "top75"
                    ? "bg-slate-900 text-white border-slate-900 dark:bg-white dark:text-black dark:border-white"
                    : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50 dark:bg-zinc-900 dark:text-zinc-300 dark:border-zinc-800 dark:hover:bg-zinc-800"
                }`}
              >
                <span>Top 75 LeetCode</span>
                <span className="px-1.5 py-0.5 text-[10px] rounded bg-slate-100 text-slate-700 dark:bg-zinc-800 dark:text-zinc-300 font-mono">
                  75
                </span>
              </button>

              <button
                onClick={() => handleSheetChange("top150")}
                className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition flex items-center gap-2 border cursor-pointer shrink-0 ${
                  activeSheet === "top150"
                    ? "bg-slate-900 text-white border-slate-900 dark:bg-white dark:text-black dark:border-white"
                    : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50 dark:bg-zinc-900 dark:text-zinc-300 dark:border-zinc-800 dark:hover:bg-zinc-800"
                }`}
              >
                <span>Top 150 LeetCode</span>
                <span className="px-1.5 py-0.5 text-[10px] rounded bg-slate-100 text-slate-700 dark:bg-zinc-800 dark:text-zinc-300 font-mono">
                  150
                </span>
              </button>

              <button
                onClick={() => handleSheetChange("top250")}
                className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition flex items-center gap-2 border cursor-pointer shrink-0 ${
                  activeSheet === "top250"
                    ? "bg-slate-900 text-white border-slate-900 dark:bg-white dark:text-black dark:border-white"
                    : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50 dark:bg-zinc-900 dark:text-zinc-300 dark:border-zinc-800 dark:hover:bg-zinc-800"
                }`}
              >
                <span>Top 250 SDE Bank</span>
                <span className="px-1.5 py-0.5 text-[10px] rounded bg-slate-100 text-slate-700 dark:bg-zinc-800 dark:text-zinc-300 font-mono">
                  250
                </span>
              </button>

              <button
                onClick={() => handleSheetChange("a2z")}
                className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition flex items-center gap-2 border cursor-pointer shrink-0 ${
                  activeSheet === "a2z"
                    ? "bg-slate-900 text-white border-slate-900 dark:bg-white dark:text-black dark:border-white"
                    : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50 dark:bg-zinc-900 dark:text-zinc-300 dark:border-zinc-800 dark:hover:bg-zinc-800"
                }`}
              >
                <span>Striver's A2Z Sheet</span>
                <span className="px-1.5 py-0.5 text-[10px] rounded bg-slate-100 text-slate-700 dark:bg-zinc-800 dark:text-zinc-300 font-mono">
                  16 Steps
                </span>
              </button>
            </div>

            {/* View Mode Toggle (Only for Top 75, Top 150, Top 250) */}
            {activeSheet !== "a2z" && (
              <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-zinc-900 rounded-xl border border-slate-200 dark:border-zinc-800 shrink-0">
                <button
                  onClick={() => setViewMode("byTopic")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition flex items-center gap-1.5 cursor-pointer ${
                    viewMode === "byTopic"
                      ? "bg-white text-slate-900 dark:bg-black dark:text-white"
                      : "text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  <FolderTree className="w-3.5 h-3.5" />
                  <span>Split by Topic</span>
                </button>
                <button
                  onClick={() => setViewMode("all")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition flex items-center gap-1.5 cursor-pointer ${
                    viewMode === "all"
                      ? "bg-white text-slate-900 dark:bg-black dark:text-white"
                      : "text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  <ListFilter className="w-3.5 h-3.5" />
                  <span>All Problems</span>
                </button>
              </div>
            )}
          </div>

          {/* Search & Filter Controls (5 Columns) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {/* Search Input */}
            <div className="relative lg:col-span-1">
              <Search className="w-4 h-4 text-slate-400 dark:text-zinc-400 absolute left-3 top-3.5" />
              <input
                type="text"
                placeholder="Search problem, ID, company..."
                value={localSearch}
                onChange={(e) => {
                  setLocalSearch(e.target.value);
                  if (setGlobalSearchTerm) setGlobalSearchTerm(e.target.value);
                }}
                className="w-full bg-white border border-slate-300 text-xs text-slate-900 dark:bg-black dark:border-zinc-800 dark:text-white pl-9 pr-4 py-3 rounded-xl focus:outline-none focus:border-slate-500 dark:focus:border-zinc-500 transition"
              />
            </div>

            {/* Topic Filter */}
            <select
              value={selectedTopic}
              onChange={(e) => setSelectedTopic(e.target.value)}
              className="w-full bg-white border border-slate-300 text-xs font-mono text-slate-900 dark:bg-black dark:border-zinc-800 dark:text-white px-3 py-3 rounded-xl focus:outline-none focus:border-slate-500 dark:focus:border-zinc-500 transition cursor-pointer"
            >
              {ALL_TOPICS.map((topic) => (
                <option key={topic} value={topic}>
                  {topic}
                </option>
              ))}
            </select>

            {/* Company Filter */}
            <select
              value={selectedCompany}
              onChange={(e) => setSelectedCompany(e.target.value)}
              className="w-full bg-white border border-slate-300 text-xs font-mono text-slate-900 dark:bg-black dark:border-zinc-800 dark:text-white px-3 py-3 rounded-xl focus:outline-none focus:border-slate-500 dark:focus:border-zinc-500 transition cursor-pointer"
            >
              {ALL_COMPANIES.map((comp) => (
                <option key={comp} value={comp}>
                  {comp}
                </option>
              ))}
            </select>

            {/* Difficulty Filter */}
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="w-full bg-white border border-slate-300 text-xs font-mono text-slate-900 dark:bg-black dark:border-zinc-800 dark:text-white px-3 py-3 rounded-xl focus:outline-none focus:border-slate-500 dark:focus:border-zinc-500 transition cursor-pointer"
            >
              {DIFFICULTY_OPTIONS.map((diff) => (
                <option key={diff} value={diff}>
                  {diff}
                </option>
              ))}
            </select>

            {/* Difficulty Sort Filter */}
            <select
              value={selectedSort}
              onChange={(e) => setSelectedSort(e.target.value)}
              className="w-full bg-white border border-slate-300 text-xs font-mono text-slate-900 dark:bg-black dark:border-zinc-800 dark:text-white px-3 py-3 rounded-xl focus:outline-none focus:border-slate-500 dark:focus:border-zinc-500 transition cursor-pointer"
            >
              {SORT_OPTIONS.map((sortOpt) => (
                <option key={sortOpt} value={sortOpt}>
                  Sort: {sortOpt}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      {activeSheet === "a2z" ? (
        /* Categorized Step Accordions for Striver's A2Z Sheet */
        <div className="space-y-4">
          {A2Z_DSA_SHEET.map((stepModule) => {
            const isExpanded = expandedSteps[stepModule.step] ?? false;
            const stepQuestions = processQuestions(stepModule.questions);

            return (
              <div
                key={stepModule.step}
                className="rounded-3xl border border-slate-200 bg-white dark:bg-zinc-950 dark:border-zinc-800 overflow-hidden"
              >
                <div
                  onClick={() => toggleStep(stepModule.step)}
                  className="p-5 flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50 dark:hover:bg-zinc-900/50 transition border-b border-slate-100 dark:border-zinc-900"
                >
                  <div className="flex items-center gap-3">
                    <span className="px-2.5 py-1 rounded-full text-xs font-mono font-bold bg-slate-100 text-slate-700 dark:bg-zinc-900 dark:text-zinc-300 border border-slate-200 dark:border-zinc-800">
                      {stepModule.step}
                    </span>
                    <div>
                      <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">
                        {stepModule.title}
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-zinc-400 font-sans">
                        {stepModule.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono text-slate-500 dark:text-zinc-400">
                      {stepQuestions.length} Problems
                    </span>
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4 text-slate-400" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-400" />
                    )}
                  </div>
                </div>

                {isExpanded && (
                  <div className="divide-y divide-slate-100 dark:divide-zinc-900">
                    {stepQuestions.length === 0 ? (
                      <div className="p-6 text-center text-xs text-slate-400 dark:text-zinc-500">
                        No problems match the selected filters in this step.
                      </div>
                    ) : (
                      stepQuestions.map((q) => (
                        <QuestionRow
                          key={`${q.leetcode_id}-${q.rank}`}
                          q={q}
                          getDifficultyBadge={getDifficultyBadge}
                        />
                      ))
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ) : viewMode === "byTopic" ? (
        /* Split Questions by Topic Accordions */
        <div className="space-y-4">
          {Object.keys(questionsByTopic).length === 0 ? (
            <div className="p-12 text-center space-y-3 rounded-3xl border border-slate-200 bg-white dark:bg-zinc-950 dark:border-zinc-800">
              <Brain className="w-10 h-10 text-slate-400 mx-auto" />
              <p className="text-sm font-semibold text-slate-700 dark:text-zinc-300">
                No matching DSA problems found.
              </p>
              <p className="text-xs text-slate-500 dark:text-zinc-500">
                Try adjusting your search query, topic, company, or difficulty filter.
              </p>
            </div>
          ) : (
            Object.entries(questionsByTopic).map(([topicName, topicQuestions]) => {
              const isExpanded = expandedTopics[topicName] !== false; // expanded by default

              return (
                <div
                  key={topicName}
                  className="rounded-3xl border border-slate-200 bg-white dark:bg-zinc-950 dark:border-zinc-800 overflow-hidden"
                >
                  {/* Topic Header */}
                  <div
                    onClick={() => toggleTopic(topicName)}
                    className="p-5 flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50 dark:hover:bg-zinc-900/50 transition border-b border-slate-100 dark:border-zinc-900"
                  >
                    <div className="flex items-center gap-3">
                      <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-slate-900 text-white dark:bg-white dark:text-black">
                        {topicName}
                      </span>
                      <span className="text-xs text-slate-500 dark:text-zinc-400 font-mono">
                        {topicQuestions.length} {topicQuestions.length === 1 ? "Problem" : "Problems"}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4 text-slate-400" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-slate-400" />
                      )}
                    </div>
                  </div>

                  {/* Topic Questions List */}
                  {isExpanded && (
                    <div className="divide-y divide-slate-100 dark:divide-zinc-900">
                      {topicQuestions.map((q) => (
                        <QuestionRow
                          key={`${q.leetcode_id}-${q.rank}`}
                          q={q}
                          getDifficultyBadge={getDifficultyBadge}
                        />
                      ))}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      ) : (
        /* Flat Questions Bank Card List */
        <div className="rounded-3xl border border-slate-200 bg-white dark:bg-zinc-950 dark:border-zinc-800 overflow-hidden divide-y divide-slate-100 dark:divide-zinc-900">
          <div className="p-4 px-6 bg-slate-50 dark:bg-zinc-900/60 flex items-center justify-between text-[11px] font-mono uppercase font-bold text-slate-500 dark:text-zinc-400 border-b border-slate-200 dark:border-zinc-800">
            <span>Problem Title &amp; Category</span>
            <span>Difficulty &amp; Target Companies</span>
          </div>

          {processedQuestions.length === 0 ? (
            <div className="p-12 text-center space-y-3">
              <Brain className="w-10 h-10 text-slate-400 mx-auto" />
              <p className="text-sm font-semibold text-slate-700 dark:text-zinc-300">
                No matching DSA problems found.
              </p>
              <p className="text-xs text-slate-500 dark:text-zinc-500">
                Try adjusting your search query, topic, company, or difficulty filter.
              </p>
            </div>
          ) : (
            processedQuestions.map((q) => (
              <QuestionRow
                key={q.leetcode_id}
                q={q}
                getDifficultyBadge={getDifficultyBadge}
              />
            ))
          )}
        </div>
      )}
    </div>
  );
};

// Clean sub-component for rendering a single question row matching ReCall design
const QuestionRow = ({ q, getDifficultyBadge }) => {
  return (
    <div className="p-4 sm:px-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition hover:bg-slate-50/80 dark:hover:bg-zinc-900/40">
      {/* Left side: ID, Title & Category */}
      <div className="flex items-start sm:items-center gap-3.5 min-w-0">
        <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200 dark:bg-zinc-900 dark:text-zinc-300 dark:border-zinc-800 shrink-0">
          #{q.leetcode_id}
        </span>

        <div className="min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <a
              href={q.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-extrabold text-slate-900 dark:text-white hover:underline flex items-center gap-1.5"
            >
              <span>{q.title}</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400 hover:text-slate-900 dark:hover:text-white transition" />
            </a>
          </div>

          {q.category && (
            <span className="text-[11px] font-mono text-slate-500 dark:text-zinc-400">
              Category: <strong className="text-slate-700 dark:text-zinc-300 font-semibold">{q.category}</strong>
            </span>
          )}
        </div>
      </div>

      {/* Right side: Companies & Difficulty Badge */}
      <div className="flex items-center gap-3 flex-wrap sm:flex-nowrap justify-between sm:justify-end shrink-0">
        {/* Companies tags */}
        <div className="flex items-center gap-1.5 flex-wrap max-w-[260px] sm:max-w-xs">
          {q.companies.slice(0, 4).map((comp) => (
            <span
              key={comp}
              className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 border border-slate-200 dark:bg-zinc-900 dark:text-zinc-300 dark:border-zinc-800"
            >
              {comp}
            </span>
          ))}
          {q.companies.length > 4 && (
            <span className="text-[10px] font-mono text-slate-400 dark:text-zinc-500">
              +{q.companies.length - 4}
            </span>
          )}
        </div>

        {/* Difficulty Badge */}
        <span
          className={`px-2.5 py-0.5 rounded-full text-xs font-mono font-bold border ${getDifficultyBadge(
            q.difficulty
          )}`}
        >
          {q.difficulty}
        </span>
      </div>
    </div>
  );
};

export default DsaPractice;
