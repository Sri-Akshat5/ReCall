import React, { useState, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { 
  Network, 
  Cpu, 
  Database, 
  Server, 
  Search, 
  CheckSquare, 
  Square, 
  BookOpen, 
  X, 
  Sparkles, 
  Building2,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  Zap,
  ChevronRight,
  LayoutList,
  Grid
} from "lucide-react";
import { SYSTEM_DESIGN_DOMAINS, SYSTEM_DESIGN_TOPICS } from "./systemDesignData";
import UrlShortenerPage from "./UrlShortenerPage";
import RateLimiterPage from "./RateLimiterPage";
import ChatAppPage from "./ChatAppPage";
import VideoStreamingPage from "./VideoStreamingPage";
import UberPage from "./UberPage";
import WebCrawlerPage from "./WebCrawlerPage";
import NewsFeedPage from "./NewsFeedPage";
import GenericBlueprintPage from "./GenericBlueprintPage";
import LldPage from "./LldPage";
import AdBanner from "../common/AdBanner";

// Company Tags Component with Hover Tooltip
const CompanyTags = ({ companies = [] }) => {
  const [isHovered, setIsHovered] = useState(false);
  if (!companies || companies.length === 0) return <span className="text-slate-400 text-xs">-</span>;

  const visibleTags = companies.slice(0, 3);
  const hiddenCount = companies.length - 3;

  return (
    <div className="relative inline-flex items-center gap-1 flex-wrap">
      {visibleTags.map((company, idx) => (
        <span
          key={idx}
          className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-md bg-slate-100 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 text-slate-700 dark:text-zinc-300 font-medium"
        >
          <Building2 className="w-2.5 h-2.5 text-slate-400 dark:text-zinc-500" />
          {company}
        </span>
      ))}

      {hiddenCount > 0 && (
        <div
          className="relative inline-block"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <span className="cursor-pointer text-[10px] px-1.5 py-0.5 rounded-md bg-slate-200 dark:bg-zinc-800 border border-slate-300 dark:border-zinc-700 text-slate-800 dark:text-zinc-200 font-bold">
            +{hiddenCount}
          </span>

          {isHovered && (
            <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-1.5 z-50 w-max max-w-xs p-2.5 rounded-xl bg-slate-900 text-white dark:bg-zinc-900 dark:text-zinc-100 text-xs border border-slate-700 dark:border-zinc-700 space-y-1">
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-zinc-400 border-b border-slate-800 dark:border-zinc-800 pb-1">
                All Tagged Companies
              </p>
              <div className="flex flex-wrap gap-1 pt-1">
                {companies.map((c, i) => (
                  <span key={i} className="px-2 py-0.5 rounded bg-slate-800 dark:bg-zinc-800 text-[10px]">
                    {c}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export const SystemDesign = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [selectedDomain, setSelectedDomain] = useState(null); // Selected Domain ID or null for Domain Cards View
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [viewMode, setViewMode] = useState("table"); // "table" or "grid"

  // Solved state persisted via localStorage
  const [solvedTopics, setSolvedTopics] = useState(() => {
    try {
      const saved = localStorage.getItem("recall_solved_system_design");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const toggleSolved = (id) => {
    setSolvedTopics((prev) => {
      const updated = prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id];
      localStorage.setItem("recall_solved_system_design", JSON.stringify(updated));
      return updated;
    });
  };

  // Helper map for Domain Icons
  const domainIconMap = {
    Network,
    Cpu,
    BookOpen,
    Database,
    Server,
    ShieldCheck,
    Zap
  };

  const filteredTopics = useMemo(() => {
    return SYSTEM_DESIGN_TOPICS.filter((topic) => {
      const matchesDomain = !selectedDomain || (
        (selectedDomain === "hld" && topic.category.includes("HLD")) ||
        (selectedDomain === "lld" && topic.category.includes("LLD")) ||
        (selectedDomain === "patterns" && topic.category.includes("Patterns")) ||
        (selectedDomain === "interview-qa" && topic.category.includes("Q&A")) ||
        (selectedDomain === "distributed-storage" && topic.category.includes("Storage")) ||
        (selectedDomain === "microservices" && topic.category.includes("Microservices")) ||
        (selectedDomain === "security-api" && topic.category.includes("Security"))
      );

      const matchesSearch = 
        topic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        topic.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (topic.keyConcepts && topic.keyConcepts.some((c) => c.toLowerCase().includes(searchQuery.toLowerCase())));

      return matchesDomain && matchesSearch;
    });
  }, [selectedDomain, searchQuery]);

  // If on specific Blueprint page route, render dedicated page component (After ALL hooks!)
  if (location.pathname.startsWith("/system-design/")) {
    const pathParts = location.pathname.split("/");
    const activeTopicId = pathParts[pathParts.length - 1];

    if (activeTopicId === "hld-1") return <UrlShortenerPage />;
    if (activeTopicId === "hld-2") return <RateLimiterPage />;
    if (activeTopicId === "hld-3") return <ChatAppPage />;
    if (activeTopicId === "hld-4") return <VideoStreamingPage />;
    if (activeTopicId === "hld-5") return <UberPage />;
    if (activeTopicId === "hld-6") return <WebCrawlerPage />;
    if (activeTopicId === "hld-7") return <NewsFeedPage />;

    if (activeTopicId && activeTopicId.startsWith("lld-")) {
      return <LldPage />;
    }

    if (activeTopicId && activeTopicId !== "system-design") {
      return <GenericBlueprintPage topicId={activeTopicId} />;
    }
  }

  // If a domain is selected OR search query exists, show Topic Cards Grid
  const isViewingTopics = selectedDomain || searchQuery.trim().length > 0;

  return (
    <div className="space-y-6 font-sans">
      {/* Back Button when inside a specific Domain */}
      {isViewingTopics && (
        <div className="flex items-center justify-between">
          <button
            onClick={() => {
              setSelectedDomain(null);
              setSearchQuery("");
            }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-slate-300 text-xs font-bold text-slate-700 hover:text-slate-900 hover:bg-slate-100 dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-300 dark:hover:text-white dark:hover:bg-zinc-800 transition cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All System Design Domains</span>
          </button>

          <div className="flex items-center gap-3">
            <div className="text-xs font-mono text-slate-500 dark:text-zinc-400 hidden sm:block">
              Domain: <span className="text-slate-900 dark:text-white font-bold">{selectedDomain ? SYSTEM_DESIGN_DOMAINS.find(d => d.id === selectedDomain)?.name : "Search Results"}</span>
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center p-1 rounded-xl bg-slate-100 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800">
              <button
                onClick={() => setViewMode("table")}
                className={`p-1.5 rounded-lg text-xs font-bold transition cursor-pointer flex items-center gap-1 ${
                  viewMode === "table"
                    ? "bg-white text-slate-900 shadow-sm dark:bg-zinc-800 dark:text-white"
                    : "text-slate-500 hover:text-slate-900 dark:text-zinc-400 dark:hover:text-white"
                }`}
                title="Table View"
              >
                <LayoutList className="w-4 h-4" />
                <span className="hidden md:inline">Table</span>
              </button>
              <button
                onClick={() => setViewMode("grid")}
                className={`p-1.5 rounded-lg text-xs font-bold transition cursor-pointer flex items-center gap-1 ${
                  viewMode === "grid"
                    ? "bg-white text-slate-900 shadow-sm dark:bg-zinc-800 dark:text-white"
                    : "text-slate-500 hover:text-slate-900 dark:text-zinc-400 dark:hover:text-white"
                }`}
                title="Cards Grid View"
              >
                <Grid className="w-4 h-4" />
                <span className="hidden md:inline">Cards</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Compact Header Banner */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 dark:bg-zinc-950 dark:border-zinc-800 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="space-y-1">
          <h1 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Sparkles className="w-4.5 h-4.5 text-slate-700 dark:text-zinc-300" />
            System Design & Architecture Hub
          </h1>
          <p className="text-xs text-slate-500 dark:text-zinc-400">
            Distributed Systems, High-Level (HLD) & Low-Level (LLD) Design patterns.
          </p>
        </div>

        <div className="px-3 py-1 rounded-xl bg-slate-100 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 text-xs font-mono text-slate-700 dark:text-zinc-300 shrink-0 self-start sm:self-auto">
          Solved: <span className="text-slate-900 dark:text-white font-bold">{solvedTopics.length}/{SYSTEM_DESIGN_TOPICS.length}</span>
        </div>
      </div>

      {/* Global Search Bar (NO SHADOW) */}
      <div className="p-3 rounded-2xl bg-white dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-zinc-500" />
          <input
            type="text"
            placeholder="Search HLD, LLD, Rate Limiter, TinyURL, CAP Theorem, Saga Pattern..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 text-xs text-slate-900 dark:text-zinc-100 placeholder-slate-400 dark:placeholder-zinc-500 focus:outline-none focus:border-slate-400 dark:focus:border-zinc-600 transition"
          />
        </div>
      </div>

      {/* VIEW 1: DOMAIN CARDS GRID (When not inside a specific domain) */}
      {!isViewingTopics && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SYSTEM_DESIGN_DOMAINS.map((domain) => {
            const Icon = domainIconMap[domain.icon] || Network;
            return (
              <div
                key={domain.id}
                onClick={() => {
                  if (domain.id === "interview-qa") {
                    navigate("/interview?subject=systemdesign");
                  } else {
                    setSelectedDomain(domain.id);
                  }
                }}
                className="p-6 rounded-3xl bg-white border border-slate-200 dark:bg-zinc-950 dark:border-zinc-800 space-y-6 flex flex-col justify-between transition hover:border-slate-400 dark:hover:border-zinc-500 cursor-pointer group"
              >
                <div className="space-y-4">
                  {/* Icon & Badge */}
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-slate-900 text-white dark:bg-white dark:text-black flex items-center justify-center font-bold">
                      <Icon className="w-6 h-6" />
                    </div>

                    <span className="text-[10px] font-mono px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-900 font-bold dark:bg-zinc-900 dark:border-zinc-700 dark:text-white">
                      {domain.badge}
                    </span>
                  </div>

                  {/* Title & Desc */}
                  <div className="space-y-2">
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-slate-700 dark:group-hover:text-zinc-300 transition-colors">
                      {domain.name}
                    </h2>
                    <p className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed">
                      {domain.desc}
                    </p>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {domain.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200 dark:bg-zinc-900 dark:text-zinc-400 dark:border-zinc-800"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer Action */}
                <div className="pt-4 border-t border-slate-200 dark:border-zinc-900 flex items-center justify-between text-xs font-semibold">
                  <span className="text-slate-500 dark:text-zinc-500 font-mono">
                    {domain.questionCount} Modules
                  </span>

                  <span className="text-slate-900 dark:text-white inline-flex items-center gap-1 font-bold group-hover:translate-x-1 transition-transform">
                    Explore Cards <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* VIEW 2: TOPICS TABLE OR GRID VIEW */}
      {isViewingTopics && (
        <>
          {filteredTopics.length === 0 ? (
            <div className="p-12 text-center rounded-3xl bg-white dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 space-y-3">
              <BookOpen className="w-8 h-8 mx-auto text-slate-400" />
              <p className="text-sm font-bold text-slate-700 dark:text-zinc-300">
                No matching System Design topics found
              </p>
              <p className="text-xs text-slate-500 dark:text-zinc-500">
                Try adjusting your search terms or filter criteria.
              </p>
            </div>
          ) : viewMode === "table" ? (
            /* TABLE VIEW */
            <div className="overflow-x-auto rounded-3xl bg-white dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-50 dark:bg-zinc-900/80 border-b border-slate-200 dark:border-zinc-800 font-mono text-[11px] uppercase tracking-wider text-slate-600 dark:text-zinc-400">
                    <th className="py-3.5 px-4 w-12 text-center">Status</th>
                    <th className="py-3.5 px-4 min-w-[280px]">System Design Architecture Blueprint</th>
                    <th className="py-3.5 px-4">Category</th>
                    <th className="py-3.5 px-4">Difficulty</th>
                    <th className="py-3.5 px-4 min-w-[180px]">Target Companies</th>
                    <th className="py-3.5 px-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-zinc-900">
                  {filteredTopics.map((topic) => {
                    const isSolved = solvedTopics.includes(topic.id);
                    return (
                      <tr 
                        key={topic.id}
                        className={`hover:bg-slate-50/80 dark:hover:bg-zinc-900/50 transition-colors ${
                          isSolved ? "bg-emerald-50/20 dark:bg-emerald-950/10" : ""
                        }`}
                      >
                        <td className="py-4 px-4 text-center">
                          <button onClick={() => toggleSolved(topic.id)} title="Mark as Solved" className="cursor-pointer">
                            {isSolved ? (
                              <CheckSquare className="w-4 h-4 text-emerald-500 mx-auto" />
                            ) : (
                              <Square className="w-4 h-4 text-slate-400 hover:text-emerald-500 transition mx-auto" />
                            )}
                          </button>
                        </td>

                        <td className="py-4 px-4 space-y-1">
                          <div
                            onClick={() => navigate(`/system-design/${topic.id}`)}
                            className={`font-bold text-slate-900 dark:text-white hover:text-blue-500 dark:hover:text-blue-400 cursor-pointer text-sm ${
                              isSolved ? "line-through text-slate-400 dark:text-zinc-500" : ""
                            }`}
                          >
                            {topic.title}
                          </div>
                          <p className="text-[11px] text-slate-500 dark:text-zinc-400 line-clamp-1 leading-relaxed">
                            {topic.summary}
                          </p>
                        </td>

                        <td className="py-4 px-4">
                          <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-slate-100 dark:bg-zinc-900 text-slate-700 dark:text-zinc-300 border border-slate-200 dark:border-zinc-800 whitespace-nowrap">
                            {topic.category}
                          </span>
                        </td>

                        <td className="py-4 px-4 whitespace-nowrap">
                          <span className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-md ${
                            topic.difficulty === "Easy" ? "text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-900/40" :
                            topic.difficulty === "Medium" ? "text-amber-600 bg-amber-50 dark:bg-amber-950/40 dark:text-amber-400 border border-amber-200 dark:border-amber-900/40" :
                            "text-rose-600 bg-rose-50 dark:bg-rose-950/40 dark:text-rose-400 border border-rose-200 dark:border-rose-900/40"
                          }`}>
                            {topic.difficulty || "Medium"}
                          </span>
                        </td>

                        <td className="py-4 px-4">
                          <CompanyTags companies={topic.companies} />
                        </td>

                        <td className="py-4 px-4 text-right whitespace-nowrap">
                          <button
                            onClick={() => navigate(`/system-design/${topic.id}`)}
                            className="px-3.5 py-1.5 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-black text-xs font-bold inline-flex items-center gap-1.5 cursor-pointer hover:opacity-90 transition"
                          >
                            <span>Study Blueprint</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            /* GRID VIEW */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTopics.map((topic) => {
                const isSolved = solvedTopics.includes(topic.id);
                return (
                  <div
                    key={topic.id}
                    className={`p-6 rounded-3xl bg-white border border-slate-200 dark:bg-zinc-950 dark:border-zinc-800 space-y-5 flex flex-col justify-between transition hover:border-slate-400 dark:hover:border-zinc-500 ${
                      isSolved ? "bg-emerald-50/30 dark:bg-emerald-950/10 border-emerald-200 dark:border-emerald-900/40" : ""
                    }`}
                  >
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-zinc-900 text-slate-700 dark:text-zinc-300 border border-slate-200 dark:border-zinc-800">
                          {topic.category}
                        </span>
                        <button onClick={() => toggleSolved(topic.id)} title="Mark as Solved">
                          {isSolved ? (
                            <CheckSquare className="w-4.5 h-4.5 text-emerald-500" />
                          ) : (
                            <Square className="w-4.5 h-4.5 text-slate-400 hover:text-emerald-500 transition" />
                          )}
                        </button>
                      </div>

                      <div className="space-y-2">
                        <h2
                          onClick={() => navigate(`/system-design/${topic.id}`)}
                          className={`text-lg font-bold text-slate-900 dark:text-white hover:underline cursor-pointer ${
                            isSolved ? "line-through text-slate-400 dark:text-zinc-500" : ""
                          }`}
                        >
                          {topic.title}
                        </h2>

                        <p className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed">
                          {topic.summary}
                        </p>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-slate-200 dark:border-zinc-900 flex items-center justify-between">
                      <CompanyTags companies={topic.companies} />
                      <button
                        onClick={() => navigate(`/system-design/${topic.id}`)}
                        className="px-3.5 py-1.5 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-black text-xs font-bold inline-flex items-center gap-1 cursor-pointer hover:opacity-90 transition"
                      >
                        <span>Study Blueprint</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}

      {/* AdSense Banner */}
      <AdBanner adSlot="1234567890" />

      {/* Detail Blueprint Modal (NO SHADOW) */}
      {selectedTopic && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="w-full max-w-3xl max-h-[88vh] overflow-y-auto rounded-3xl bg-white dark:bg-zinc-950 border border-slate-300 dark:border-zinc-800 p-6 sm:p-8 space-y-6 text-slate-900 dark:text-zinc-100">
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 border-b border-slate-200 dark:border-zinc-800 pb-4">
              <div className="space-y-1">
                <span className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400 uppercase">
                  {selectedTopic.category}
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                  {selectedTopic.title}
                </h2>
              </div>
              <button
                onClick={() => setSelectedTopic(null)}
                className="p-1.5 rounded-full bg-slate-100 dark:bg-zinc-900 text-slate-500 hover:text-slate-900 dark:hover:text-white transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Architecture Overview */}
            {selectedTopic.architecture && (
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 space-y-2 font-mono text-xs">
                <p className="font-bold text-slate-700 dark:text-zinc-300 uppercase tracking-wider text-[10px]">
                  System Component Blueprint
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-600 dark:text-zinc-400">
                  {Object.entries(selectedTopic.architecture).map(([key, val]) => (
                    <div key={key} className="p-2.5 rounded-xl bg-white dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800">
                      <span className="text-blue-600 dark:text-blue-400 font-semibold capitalize">{key}: </span>
                      <span>{Array.isArray(val) ? val.join(", ") : val}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Key Concepts */}
            {selectedTopic.keyConcepts && (
              <div className="space-y-2">
                <p className="text-xs font-mono font-bold text-slate-500 dark:text-zinc-400 uppercase">
                  Key Concepts & Trade-offs
                </p>
                <ul className="list-disc list-inside text-xs text-slate-700 dark:text-zinc-300 space-y-1">
                  {selectedTopic.keyConcepts.map((concept, idx) => (
                    <li key={idx}>{concept}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Detailed Guide */}
            <div className="space-y-3 font-sans text-xs sm:text-sm text-slate-700 dark:text-zinc-300 leading-relaxed whitespace-pre-line border-t border-slate-100 dark:border-zinc-900 pt-4">
              {selectedTopic.detailedGuide}
            </div>

            {/* Modal Footer */}
            <div className="pt-4 border-t border-slate-200 dark:border-zinc-800 flex justify-end">
              <button
                onClick={() => setSelectedTopic(null)}
                className="px-5 py-2 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-black font-semibold text-xs cursor-pointer"
              >
                Close Blueprint
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SystemDesign;
