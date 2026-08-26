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
  FolderTree,
  CheckSquare,
  Square,
  CheckCircle2,
  Table as TableIcon,
  LayoutList,
  BookOpen,
  ArrowRight
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
  const [displayFormat, setDisplayFormat] = useState("table"); // 'table' | 'cards'
  const [showOnlySolved, setShowOnlySolved] = useState(false);
  const [localSearch, setLocalSearch] = useState(globalSearchTerm || "");

  // Local storage for marked solved / completed question IDs
  const [solvedQuestionIds, setSolvedQuestionIds] = useState(() => {
    try {
      const saved = localStorage.getItem("recall_solved_dsa_questions");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const toggleSolvedQuestion = (leetcodeId) => {
    setSolvedQuestionIds((prev) => {
      const isSolved = prev.includes(leetcodeId);
      const updated = isSolved
        ? prev.filter((id) => id !== leetcodeId)
        : [...prev, leetcodeId];

      try {
        localStorage.setItem("recall_solved_dsa_questions", JSON.stringify(updated));
      } catch (err) {
        console.error("Failed to save to localStorage", err);
      }

      return updated;
    });
  };

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
      // Solved Only Filter
      if (showOnlySolved && !solvedQuestionIds.includes(q.leetcode_id)) {
        return false;
      }

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
    globalSearchTerm,
    showOnlySolved,
    solvedQuestionIds
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
      {/* Compact Header Banner */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 dark:bg-zinc-950 dark:border-zinc-800 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="space-y-0.5">
            <h1 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Code2 className="w-4 h-4 text-slate-700 dark:text-zinc-300" />
              Data Structures & Algorithms Interview Bank
            </h1>
            <p className="text-xs text-slate-500 dark:text-zinc-400">
              Curated high-frequency LeetCode questions categorized by topic.
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => navigate("/revise?subject=dsa")}
              className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-mono text-xs font-bold transition inline-flex items-center gap-1.5 cursor-pointer active:scale-95"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>DSA Theory & 20 Patterns</span>
              <ArrowRight className="w-3 h-3" />
            </button>

            <div className="px-3 py-1 rounded-xl bg-emerald-50 border border-emerald-200 dark:bg-emerald-950/40 dark:border-emerald-900/60 text-xs font-mono text-emerald-700 dark:text-emerald-300 flex items-center gap-1.5 font-bold">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>{solvedQuestionIds.length} Solved</span>
            </div>

            <div className="px-3 py-1 rounded-xl bg-slate-100 border border-slate-200 dark:bg-zinc-900 dark:border-zinc-800 text-xs font-mono text-slate-700 dark:text-zinc-300 font-bold">
              {processedQuestions.length} Matched
            </div>
          </div>
        </div>

        {/* Tab Switcher, View Mode Toggle & Filter Bar */}
        <div className="pt-4 border-t border-slate-200 dark:border-zinc-900 space-y-4">
          {/* Top Row: Sheet Switcher, Solved Filter & View Mode Toggle */}
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

            {/* Display & Filter Toggles */}
            <div className="flex items-center gap-2 flex-wrap">
              {/* Solved Only Filter Button */}
              <button
                onClick={() => setShowOnlySolved((prev) => !prev)}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono font-semibold transition flex items-center gap-1.5 border cursor-pointer ${
                  showOnlySolved
                    ? "bg-emerald-600 text-white border-emerald-600 dark:bg-emerald-500 dark:text-black"
                    : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50 dark:bg-zinc-900 dark:text-zinc-300 dark:border-zinc-800"
                }`}
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Solved ({solvedQuestionIds.length})</span>
              </button>

              {/* Layout Switcher (Table vs Card List) */}
              <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-zinc-900 rounded-xl border border-slate-200 dark:border-zinc-800 shrink-0">
                <button
                  onClick={() => setDisplayFormat("table")}
                  title="Table Format"
                  className={`px-2.5 py-1 rounded-lg text-xs font-mono font-semibold transition flex items-center gap-1 cursor-pointer ${
                    displayFormat === "table"
                      ? "bg-white text-slate-900 dark:bg-black dark:text-white"
                      : "text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  <TableIcon className="w-3.5 h-3.5" />
                  <span>Table</span>
                </button>
                <button
                  onClick={() => setDisplayFormat("cards")}
                  title="Card List Format"
                  className={`px-2.5 py-1 rounded-lg text-xs font-mono font-semibold transition flex items-center gap-1 cursor-pointer ${
                    displayFormat === "cards"
                      ? "bg-white text-slate-900 dark:bg-black dark:text-white"
                      : "text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  <LayoutList className="w-3.5 h-3.5" />
                  <span>Cards</span>
                </button>
              </div>

              {/* View Mode Toggle (Only for Top 75, Top 150, Top 250) */}
              {activeSheet !== "a2z" && (
                <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-zinc-900 rounded-xl border border-slate-200 dark:border-zinc-800 shrink-0">
                  <button
                    onClick={() => setViewMode("byTopic")}
                    className={`px-2.5 py-1 rounded-lg text-xs font-mono font-semibold transition flex items-center gap-1 cursor-pointer ${
                      viewMode === "byTopic"
                        ? "bg-white text-slate-900 dark:bg-black dark:text-white"
                        : "text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white"
                    }`}
                  >
                    <FolderTree className="w-3.5 h-3.5" />
                    <span>Split Topic</span>
                  </button>
                  <button
                    onClick={() => setViewMode("all")}
                    className={`px-2.5 py-1 rounded-lg text-xs font-mono font-semibold transition flex items-center gap-1 cursor-pointer ${
                      viewMode === "all"
                        ? "bg-white text-slate-900 dark:bg-black dark:text-white"
                        : "text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white"
                    }`}
                  >
                    <ListFilter className="w-3.5 h-3.5" />
                    <span>All List</span>
                  </button>
                </div>
              )}
            </div>
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
                  <div>
                    {stepQuestions.length === 0 ? (
                      <div className="p-6 text-center text-xs text-slate-400 dark:text-zinc-500">
                        No problems match the selected filters in this step.
                      </div>
                    ) : displayFormat === "table" ? (
                      <QuestionTable
                        questions={stepQuestions}
                        getDifficultyBadge={getDifficultyBadge}
                        solvedQuestionIds={solvedQuestionIds}
                        toggleSolvedQuestion={toggleSolvedQuestion}
                      />
                    ) : (
                      <div className="divide-y divide-slate-100 dark:divide-zinc-900">
                        {stepQuestions.map((q) => (
                          <QuestionRowCard
                            key={`${q.leetcode_id}-${q.rank}`}
                            q={q}
                            getDifficultyBadge={getDifficultyBadge}
                            solvedQuestionIds={solvedQuestionIds}
                            toggleSolvedQuestion={toggleSolvedQuestion}
                          />
                        ))}
                      </div>
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
              const isExpanded = expandedTopics[topicName] !== false;

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
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-slate-900 text-white dark:bg-white dark:text-black">
                        {topicName}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate("/revise?subject=dsa");
                        }}
                        title={`Study ${topicName} theoretical notes & 20 patterns`}
                        className="px-3 py-1 rounded-full text-[11px] font-mono font-bold bg-blue-100 text-blue-800 hover:bg-blue-200 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-800 border border-blue-200 transition inline-flex items-center gap-1.5 cursor-pointer active:scale-95"
                      >
                        <BookOpen className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                        <span>Revise {topicName} Theory</span>
                      </button>
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
                    <div>
                      {displayFormat === "table" ? (
                        <QuestionTable
                          questions={topicQuestions}
                          getDifficultyBadge={getDifficultyBadge}
                          solvedQuestionIds={solvedQuestionIds}
                          toggleSolvedQuestion={toggleSolvedQuestion}
                        />
                      ) : (
                        <div className="divide-y divide-slate-100 dark:divide-zinc-900">
                          {topicQuestions.map((q) => (
                            <QuestionRowCard
                              key={`${q.leetcode_id}-${q.rank}`}
                              q={q}
                              getDifficultyBadge={getDifficultyBadge}
                              solvedQuestionIds={solvedQuestionIds}
                              toggleSolvedQuestion={toggleSolvedQuestion}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      ) : (
        /* Flat Questions Bank List */
        <div className="rounded-3xl border border-slate-200 bg-white dark:bg-zinc-950 dark:border-zinc-800 overflow-hidden">
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
          ) : displayFormat === "table" ? (
            <QuestionTable
              questions={processedQuestions}
              getDifficultyBadge={getDifficultyBadge}
              solvedQuestionIds={solvedQuestionIds}
              toggleSolvedQuestion={toggleSolvedQuestion}
            />
          ) : (
            <div className="divide-y divide-slate-100 dark:divide-zinc-900">
              <div className="p-4 px-6 bg-slate-50 dark:bg-zinc-900/60 flex items-center justify-between text-[11px] font-mono uppercase font-bold text-slate-500 dark:text-zinc-400 border-b border-slate-200 dark:border-zinc-800">
                <span>Problem Title &amp; Category</span>
                <span>Difficulty &amp; Target Companies</span>
              </div>
              {processedQuestions.map((q) => (
                <QuestionRowCard
                  key={q.leetcode_id}
                  q={q}
                  getDifficultyBadge={getDifficultyBadge}
                  solvedQuestionIds={solvedQuestionIds}
                  toggleSolvedQuestion={toggleSolvedQuestion}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// Sub-component for rendering company tags with hover tooltip for extra companies (+N)
const CompanyTags = ({ companies }) => {
  const visible = companies.slice(0, 3);
  const extra = companies.slice(3);

  return (
    <div className="flex items-center gap-1 flex-wrap">
      {visible.map((comp) => (
        <span
          key={comp}
          className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 border border-slate-200 dark:bg-zinc-900 dark:text-zinc-300 dark:border-zinc-800 shrink-0"
        >
          {comp}
        </span>
      ))}

      {extra.length > 0 && (
        <div className="relative group/comp inline-block">
          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-md bg-slate-200 text-slate-700 dark:bg-zinc-800 dark:text-zinc-300 font-bold cursor-pointer hover:bg-slate-300 dark:hover:bg-zinc-700 transition">
            +{extra.length}
          </span>

          {/* Hover Tooltip Popup showing all tagged companies */}
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover/comp:flex flex-col gap-1.5 p-2.5 rounded-2xl bg-slate-900 text-white dark:bg-zinc-950 dark:text-zinc-200 text-[10px] font-mono shadow-2xl border border-slate-700 dark:border-zinc-800 z-50 w-52 pointer-events-none transition-all">
            <div className="text-[9px] uppercase font-bold text-slate-400 dark:text-zinc-500 pb-1 border-b border-slate-800 dark:border-zinc-900 flex items-center justify-between">
              <span>Target Companies</span>
              <span className="text-white dark:text-zinc-300 font-extrabold">{companies.length} Total</span>
            </div>
            <div className="flex flex-wrap gap-1 max-h-32 overflow-y-auto">
              {companies.map((c) => (
                <span
                  key={c}
                  className="px-1.5 py-0.5 rounded bg-slate-800 dark:bg-zinc-800 text-slate-200 dark:text-zinc-300 text-[10px]"
                >
                  {c}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// HTML Table Format Component with uniform fixed column layout
const QuestionTable = ({ questions, getDifficultyBadge, solvedQuestionIds, toggleSolvedQuestion }) => {
  const navigate = useNavigate();

  return (
    <div className="overflow-x-auto w-full">
      <table className="w-full text-left border-collapse font-sans min-w-[760px]">
        <thead>
          <tr className="bg-slate-50/90 dark:bg-zinc-900/80 border-b border-slate-200 dark:border-zinc-800 text-[11px] font-mono uppercase font-bold text-slate-500 dark:text-zinc-400">
            <th className="py-3 px-4 w-16 text-center">Status</th>
            <th className="py-3 px-3 w-16">ID</th>
            <th className="py-3 px-4 min-w-[200px]">Problem Title</th>
            <th className="py-3 px-4 w-40">Category</th>
            <th className="py-3 px-4 w-28">Difficulty</th>
            <th className="py-3 px-4 w-52">Top Companies</th>
            <th className="py-3 px-4 w-24 text-right">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 dark:divide-zinc-900 text-xs">
          {questions.map((q) => {
            const isSolved = solvedQuestionIds.includes(q.leetcode_id);
            return (
              <tr
                key={`${q.leetcode_id}-${q.rank}`}
                className={`transition items-center hover:bg-slate-50/90 dark:hover:bg-zinc-900/50 ${
                  isSolved ? "bg-emerald-50/30 dark:bg-emerald-950/15" : ""
                }`}
              >
                {/* Status Checkbox Column */}
                <td className="py-3.5 px-4 text-center align-middle">
                  <button
                    onClick={() => toggleSolvedQuestion(q.leetcode_id)}
                    title={isSolved ? "Mark as Unsolved" : "Mark as Solved"}
                    className="p-1 rounded-lg text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition cursor-pointer"
                  >
                    {isSolved ? (
                      <CheckSquare className="w-4 h-4 text-emerald-600 dark:text-emerald-400 fill-emerald-100 dark:fill-emerald-950" />
                    ) : (
                      <Square className="w-4 h-4 text-slate-300 dark:text-zinc-600" />
                    )}
                  </button>
                </td>

                {/* ID Column */}
                <td className="py-3.5 px-3 align-middle">
                  <span className="font-mono font-bold text-[11px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200 dark:bg-zinc-900 dark:text-zinc-300 dark:border-zinc-800">
                    #{q.leetcode_id}
                  </span>
                </td>

                {/* Title Column */}
                <td className="py-3.5 px-4 align-middle font-extrabold text-slate-900 dark:text-white">
                  <a
                    href={q.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline inline-flex items-center gap-1.5"
                  >
                    <span className={isSolved ? "line-through text-slate-500 dark:text-zinc-500" : ""}>
                      {q.title}
                    </span>
                  </a>
                </td>

                {/* Category Column */}
                <td className="py-3.5 px-4 align-middle font-mono text-slate-600 dark:text-zinc-300 text-xs">
                  {q.category ? (
                    <button
                      onClick={() => navigate("/revise?subject=dsa")}
                      title={`Revise ${q.category} theory & 20 patterns`}
                      className="text-blue-600 dark:text-blue-400 font-bold hover:underline inline-flex items-center gap-1 cursor-pointer"
                    >
                      <BookOpen className="w-3 h-3 shrink-0" />
                      <span>{q.category}</span>
                    </button>
                  ) : (
                    "General"
                  )}
                </td>

                {/* Difficulty Column */}
                <td className="py-3.5 px-4 align-middle">
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold border ${getDifficultyBadge(
                      q.difficulty
                    )}`}
                  >
                    {q.difficulty}
                  </span>
                </td>

                {/* Companies Column with +N hover tooltip */}
                <td className="py-3.5 px-4 align-middle">
                  <CompanyTags companies={q.companies} />
                </td>

                {/* Action Column */}
                <td className="py-3.5 px-4 align-middle text-right">
                  <a
                    href={q.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-3 py-1 rounded-xl text-[11px] font-mono font-bold bg-slate-900 text-white dark:bg-white dark:text-black hover:bg-slate-800 dark:hover:bg-zinc-200 transition cursor-pointer"
                  >
                    <span>Solve</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

// Card Row format component for alternative view mode
const QuestionRowCard = ({ q, getDifficultyBadge, solvedQuestionIds, toggleSolvedQuestion }) => {
  const navigate = useNavigate();
  const isSolved = solvedQuestionIds.includes(q.leetcode_id);

  return (
    <div
      className={`p-4 sm:px-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition hover:bg-slate-50/80 dark:hover:bg-zinc-900/40 ${
        isSolved ? "bg-emerald-50/30 dark:bg-emerald-950/15" : ""
      }`}
    >
      {/* Left side: Solved Checkbox, ID, Title & Category */}
      <div className="flex items-start sm:items-center gap-3.5 min-w-0">
        <button
          onClick={() => toggleSolvedQuestion(q.leetcode_id)}
          title={isSolved ? "Mark as Unsolved" : "Mark as Solved"}
          className="p-1 rounded-lg text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition cursor-pointer shrink-0 mt-0.5 sm:mt-0"
        >
          {isSolved ? (
            <CheckSquare className="w-4 h-4 text-emerald-600 dark:text-emerald-400 fill-emerald-100 dark:fill-emerald-950" />
          ) : (
            <Square className="w-4 h-4 text-slate-300 dark:text-zinc-600" />
          )}
        </button>

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
              <span className={isSolved ? "line-through text-slate-500 dark:text-zinc-500" : ""}>
                {q.title}
              </span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400 hover:text-slate-900 dark:hover:text-white transition" />
            </a>
          </div>

          {q.category && (
            <span className="text-[11px] font-mono text-slate-500 dark:text-zinc-400 flex items-center gap-1 mt-0.5">
              <span>Category:</span>
              <button
                onClick={() => navigate("/revise?subject=dsa")}
                title={`Revise ${q.category} core theory & 20 patterns`}
                className="text-blue-600 dark:text-blue-400 font-bold hover:underline inline-flex items-center gap-1 cursor-pointer"
              >
                <BookOpen className="w-3 h-3 shrink-0" />
                <span>{q.category}</span>
              </button>
            </span>
          )}
        </div>
      </div>

      {/* Right side: Companies & Difficulty Badge */}
      <div className="flex items-center gap-3 flex-wrap sm:flex-nowrap justify-between sm:justify-end shrink-0">
        <CompanyTags companies={q.companies} />

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
