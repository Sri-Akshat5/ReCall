import React, { useState, useMemo } from "react";
import { DEV_TOPICS } from "./devData";
import {
    Terminal,
    Layout,
    Server,
    Shield,
    Database,
    Search,
    ChevronDown,
    ChevronUp,
    Code,
    CheckCircle2,
    Sparkles,
    Copy,
    Check,
    Cpu,
    ExternalLink,
    Filter
} from "lucide-react";

export const DevelopmentHub = () => {
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [searchTerm, setSearchTerm] = useState("");
    const [expandedCards, setExpandedCards] = useState({});
    const [copiedCodeId, setCopiedCodeId] = useState(null);

    const categories = ["All", "Frontend", "Backend", "Security", "Infrastructure"];

    const toggleCard = (id) => {
        setExpandedCards((prev) => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    const handleCopy = (code, id) => {
        navigator.clipboard.writeText(code);
        setCopiedCodeId(id);
        setTimeout(() => setCopiedCodeId(null), 2000);
    };

    const filteredTopics = useMemo(() => {
        return DEV_TOPICS.map((topicGroup) => {
            const matchesCategory =
                selectedCategory === "All" || topicGroup.category === selectedCategory;

            if (!matchesCategory) return null;

            const filteredItems = topicGroup.items.filter((item) => {
                const query = searchTerm.toLowerCase().trim();
                if (!query) return true;
                return (
                    item.question.toLowerCase().includes(query) ||
                    item.summary.toLowerCase().includes(query) ||
                    item.details.toLowerCase().includes(query) ||
                    item.tags.some((t) => t.toLowerCase().includes(query))
                );
            });

            if (filteredItems.length === 0) return null;

            return {
                ...topicGroup,
                items: filteredItems
            };
        }).filter(Boolean);
    }, [selectedCategory, searchTerm]);

    const getCategoryIcon = (category) => {
        switch (category) {
            case "Frontend":
                return Layout;
            case "Backend":
                return Server;
            case "Security":
                return Shield;
            case "Infrastructure":
                return Database;
            default:
                return Terminal;
        }
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-200">
            {/* Header Banner */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-zinc-900 to-black p-6 sm:p-8 border border-slate-800 shadow-2xl text-white">
                <div className="absolute top-0 right-0 -mt-12 -mr-12 w-64 h-64 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute bottom-0 left-1/3 -mb-12 w-48 h-48 bg-emerald-600/10 rounded-full blur-2xl pointer-events-none" />

                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="space-y-2 max-w-2xl">
                        <div className="flex flex-wrap items-center gap-2">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-mono font-semibold">
                                <Terminal className="w-3.5 h-3.5" />
                                <span>Full-Stack Engineering & Development Hub</span>
                            </div>
                            <span className="px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30">
                                Coming Soon
                            </span>
                        </div>
                        <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight font-sans">
                            Development <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-sky-400 to-emerald-400">Mastery Bank</span>
                        </h1>
                        <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                            Deep-dive concepts across Modern React 19, RSC, Microservices, API Idempotency, JWT Security, Database Indexing & Docker Infrastructure.
                        </p>
                    </div>

                    {/* Stats Pill Badges */}
                    <div className="flex flex-wrap md:flex-col gap-2.5 shrink-0">
                        <div className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md flex items-center gap-3">
                            <Cpu className="w-4 h-4 text-emerald-400" />
                            <div>
                                <p className="text-[10px] text-zinc-400 uppercase font-mono">Architecture</p>
                                <p className="text-xs font-bold text-white">Production Grade</p>
                            </div>
                        </div>
                        <div className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md flex items-center gap-3">
                            <Sparkles className="w-4 h-4 text-indigo-400" />
                            <div>
                                <p className="text-[10px] text-zinc-400 uppercase font-mono">Topics</p>
                                <p className="text-xs font-bold text-white">Full-Stack Core</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Filter & Controls Toolbar */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white dark:bg-zinc-950 p-3 sm:p-4 rounded-xl border border-slate-200 dark:border-zinc-800 shadow-sm">
                {/* Category Pills */}
                <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 sm:pb-0">
                    {categories.map((cat) => {
                        const Icon = getCategoryIcon(cat);
                        const isActive = selectedCategory === cat;
                        return (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                                    isActive
                                        ? "bg-slate-900 text-white dark:bg-white dark:text-black shadow-md"
                                        : "bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800"
                                }`}
                            >
                                <Icon className="w-3.5 h-3.5" />
                                <span>{cat}</span>
                            </button>
                        );
                    })}
                </div>

                {/* Local Search Input */}
                <div className="relative w-full sm:w-64">
                    <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-zinc-500" />
                    <input
                        type="text"
                        placeholder="Search dev concepts..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-8 pr-7 py-1.5 text-xs rounded-lg bg-slate-50 border border-slate-300 text-slate-900 dark:bg-zinc-900 dark:border-zinc-800 dark:text-white placeholder-slate-400 dark:placeholder-zinc-500 focus:outline-none focus:border-slate-500 dark:focus:border-zinc-500 transition"
                    />
                    {searchTerm && (
                        <button
                            onClick={() => setSearchTerm("")}
                            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:text-zinc-500 dark:hover:text-zinc-300 text-xs font-bold"
                        >
                            ✕
                        </button>
                    )}
                </div>
            </div>

            {/* Topics Content Container */}
            <div className="space-y-6">
                {filteredTopics.length === 0 ? (
                    <div className="text-center py-12 bg-white dark:bg-zinc-950 rounded-2xl border border-slate-200 dark:border-zinc-800 p-8">
                        <Filter className="w-8 h-8 mx-auto text-slate-400 dark:text-zinc-600 mb-2" />
                        <h3 className="text-sm font-bold text-slate-800 dark:text-zinc-200">No Development Topics Found</h3>
                        <p className="text-xs text-slate-500 dark:text-zinc-400 mt-1">
                            Try adjusting your filter or search query.
                        </p>
                    </div>
                ) : (
                    filteredTopics.map((group) => {
                        const CategoryIcon = getCategoryIcon(group.category);
                        return (
                            <div
                                key={group.id}
                                className="bg-white dark:bg-zinc-950 rounded-2xl border border-slate-200 dark:border-zinc-800/90 shadow-sm overflow-hidden"
                            >
                                {/* Group Header */}
                                <div className="p-4 sm:p-5 border-b border-slate-100 dark:border-zinc-900 bg-slate-50/50 dark:bg-zinc-900/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
                                            <CategoryIcon className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h2 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white">
                                                {group.title}
                                            </h2>
                                            <p className="text-xs text-slate-500 dark:text-zinc-400 mt-0.5">
                                                {group.description}
                                            </p>
                                        </div>
                                    </div>

                                    <span className="self-start sm:self-auto text-[10px] font-mono font-bold px-2.5 py-1 rounded-full bg-slate-200 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 border border-slate-300 dark:border-zinc-700">
                                        {group.items.length} Modules
                                    </span>
                                </div>

                                {/* Items Cards List */}
                                <div className="divide-y divide-slate-100 dark:divide-zinc-900">
                                    {group.items.map((item) => {
                                        const isExpanded = !!expandedCards[item.id];
                                        return (
                                            <div
                                                key={item.id}
                                                className="p-4 sm:p-5 hover:bg-slate-50/60 dark:hover:bg-zinc-900/30 transition space-y-3"
                                            >
                                                {/* Card Header & Question */}
                                                <div className="flex items-start justify-between gap-3 cursor-pointer" onClick={() => toggleCard(item.id)}>
                                                    <div className="space-y-1.5 flex-1">
                                                        <div className="flex flex-wrap items-center gap-2">
                                                            {item.tags.map((tag, idx) => (
                                                                <span
                                                                    key={idx}
                                                                    className="text-[9px] font-mono font-semibold px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800/50"
                                                                >
                                                                    {tag}
                                                                </span>
                                                            ))}
                                                        </div>

                                                        <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-zinc-100 hover:text-indigo-600 dark:hover:text-indigo-400 transition flex items-center gap-2">
                                                            <span>{item.question}</span>
                                                        </h3>
                                                    </div>

                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            toggleCard(item.id);
                                                        }}
                                                        className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:text-zinc-500 dark:hover:text-zinc-300 hover:bg-slate-100 dark:hover:bg-zinc-800 transition"
                                                    >
                                                        {isExpanded ? (
                                                            <ChevronUp className="w-4 h-4" />
                                                        ) : (
                                                            <ChevronDown className="w-4 h-4" />
                                                        )}
                                                    </button>
                                                </div>

                                                {/* Summary Callout */}
                                                <p className="text-xs text-slate-600 dark:text-zinc-300 leading-relaxed font-medium bg-slate-50 dark:bg-zinc-900/80 p-3 rounded-xl border border-slate-200/80 dark:border-zinc-800/80">
                                                    💡 <span className="font-semibold text-slate-800 dark:text-zinc-200">Key Takeaway: </span>
                                                    {item.summary}
                                                </p>

                                                {/* Expanded Details & Code Snippet */}
                                                {isExpanded && (
                                                    <div className="pt-2 space-y-3 animate-in fade-in duration-150">
                                                        <div className="text-xs text-slate-700 dark:text-zinc-300 leading-relaxed space-y-2">
                                                            <p className="font-semibold text-slate-900 dark:text-white text-xs">
                                                                Technical Explanation:
                                                            </p>
                                                            <p className="text-xs leading-relaxed text-slate-600 dark:text-zinc-400">
                                                                {item.details}
                                                            </p>
                                                        </div>

                                                        {/* Code Block */}
                                                        {item.code && (
                                                            <div className="relative rounded-xl bg-zinc-950 border border-zinc-800 overflow-hidden font-mono text-xs text-zinc-200">
                                                                <div className="flex items-center justify-between px-3 py-2 bg-zinc-900/90 border-b border-zinc-800 text-[10px] text-zinc-400 font-sans">
                                                                    <div className="flex items-center gap-1.5 font-mono">
                                                                        <Code className="w-3.5 h-3.5 text-indigo-400" />
                                                                        <span>Implementation / Spec</span>
                                                                    </div>
                                                                    <button
                                                                        onClick={() => handleCopy(item.code, item.id)}
                                                                        className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 transition text-[10px]"
                                                                    >
                                                                        {copiedCodeId === item.id ? (
                                                                            <>
                                                                                <Check className="w-3 h-3 text-emerald-400" />
                                                                                <span className="text-emerald-400">Copied</span>
                                                                            </>
                                                                        ) : (
                                                                            <>
                                                                                <Copy className="w-3 h-3" />
                                                                                <span>Copy Code</span>
                                                                            </>
                                                                        )}
                                                                    </button>
                                                                </div>

                                                                <pre className="p-3.5 overflow-x-auto text-[11px] leading-relaxed text-zinc-300 font-mono">
                                                                    <code>{item.code}</code>
                                                                </pre>
                                                            </div>
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
};

export default DevelopmentHub;
