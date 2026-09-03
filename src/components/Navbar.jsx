import React, { useState, useEffect, useMemo, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { JAVA_TOPICS, JAVA_QUESTIONS } from "./java/javaData";
import { JAVA_KEYWORD_DEFINITIONS } from "./java/javaKeywordsData";
import { JAVA_REVISION_SECTIONS } from "./java/javaRevisionNotesData";
import { TOP_75_QUESTIONS } from "./dsa/dsaData";
import {
    Bookmark,
    Layers,
    FileText,
    Cpu,
    Code2,
    Edit3,
    CheckCircle2,
    Search,
    PlusCircle,
    ShieldCheck,
    Menu,
    X,
    Sun,
    Moon,
    Key,
    BookOpen,
    HelpCircle,
    Network,
    Terminal
} from "lucide-react";

export const Navbar = ({
    activeTab,
    setActiveTab,
    searchTerm,
    setSearchTerm,
    onOpenAddModal,
    onOpenSecurityModal,
    theme = "dark",
    toggleTheme
}) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const searchInputRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 30) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll();

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    // Listen for Alt+R to open and focus search bar
    useEffect(() => {
        const handleKeyDown = (e) => {
            if ((e.altKey && (e.key === "r" || e.key === "R")) || ((e.ctrlKey || e.metaKey) && (e.key === "k" || e.key === "K"))) {
                e.preventDefault();
                if (searchInputRef.current) {
                    searchInputRef.current.focus();
                    setIsSearchFocused(true);
                }
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    const location = useLocation();
    const navigate = useNavigate();

    const [isSearchFocused, setIsSearchFocused] = useState(false);

    const ALL_SEARCH_ITEMS = useMemo(() => {
        const items = [];
        const seen = new Set();

        // 1. Add Java Topics from javaData.js
        (JAVA_TOPICS || []).forEach((topic) => {
            if (topic && topic !== "All Topics" && !seen.has(topic.toLowerCase())) {
                seen.add(topic.toLowerCase());
                items.push({ text: topic, type: "Topic", category: "Subject Module" });
            }
        });

        // 2. Add Active Recall Keywords from javaKeywordsData.js
        Object.keys(JAVA_KEYWORD_DEFINITIONS || {}).forEach((word) => {
            if (word && !seen.has(word.toLowerCase())) {
                seen.add(word.toLowerCase());
                const info = JAVA_KEYWORD_DEFINITIONS[word];
                items.push({ text: word, type: "Keyword", category: info.topic || "Active Recall" });
            }
        });

        // 3. Add Revision Notes Sections from javaRevisionNotesData.js
        (JAVA_REVISION_SECTIONS || []).forEach((sec) => {
            if (sec && sec.title && !seen.has(sec.title.toLowerCase())) {
                seen.add(sec.title.toLowerCase());
                items.push({ text: sec.title, type: "Revision", category: sec.category });
            }
        });

        // 4. Add Core Questions from javaData.js
        (JAVA_QUESTIONS || []).forEach((q) => {
            if (q && q.question && !seen.has(q.question.toLowerCase())) {
                seen.add(q.question.toLowerCase());
                items.push({ text: q.question, type: "Question", category: q.topic || "Q&A Bank" });
            }
        });

        // 5. Add DSA LeetCode Questions from dsaData.js
        (TOP_75_QUESTIONS || []).forEach((q) => {
            if (q && q.title && !seen.has(q.title.toLowerCase())) {
                seen.add(q.title.toLowerCase());
                items.push({ text: `${q.title} (#${q.leetcode_id})`, type: "DSA", category: q.category || "Top 75 LeetCode" });
            }
        });

        return items;
    }, []);

    const filteredSearchItems = useMemo(() => {
        const query = (searchTerm || "").trim().toLowerCase();
        if (!query) {
            return ALL_SEARCH_ITEMS.slice(0, 15);
        }
        return ALL_SEARCH_ITEMS.filter(
            (item) =>
                item.text.toLowerCase().includes(query) ||
                item.category.toLowerCase().includes(query) ||
                item.type.toLowerCase().includes(query)
        );
    }, [ALL_SEARCH_ITEMS, searchTerm]);

    const navItems = [
        { id: "interview", path: "/interview", label: "Interview Q&A", shortLabel: "Q&A", icon: FileText },
        { id: "system-design", path: "/system-design", label: "System Design", shortLabel: "Design", icon: Network },
        { id: "development", path: "/development", label: "Development", shortLabel: "Dev", icon: Terminal },
        { id: "revise", path: "/revise", label: "Revise", shortLabel: "Revise", icon: Layers },
        { id: "dsa", path: "/dsa", label: "DSA Practice", shortLabel: "DSA", icon: Code2 },
        { id: "notes", path: "/notes", label: "My Notes", shortLabel: "Notes", icon: Edit3 },
    ];

    const handleTabClick = (id, path = `/${id}`) => {
        if (setActiveTab) setActiveTab(id);
        navigate(path);
        setIsMobileMenuOpen(false);
    };

    return (
        <header
            className={`transition-all duration-300 ease-in-out ${isScrolled
                ? "fixed top-3 left-1/2 -translate-x-1/2 z-[100] w-[92%] sm:w-[88%] max-w-4xl rounded-full bg-white/95 dark:bg-zinc-950/95 border border-slate-300 dark:border-zinc-800 shadow-2xl backdrop-blur-2xl px-3 sm:px-5 py-1.5"
                : "sticky top-0 z-[100] w-full bg-white/95 border-b border-slate-200 dark:bg-black/95 dark:border-zinc-800/80 backdrop-blur-md px-4 sm:px-6 lg:px-8 py-0"
                }`}
        >
            <div className="mx-auto">
                <div
                    className={`flex items-center justify-between transition-all duration-300 ${isScrolled ? "h-11 gap-2 sm:gap-4" : "h-16 gap-3"
                        }`}
                >

                    {/* Left Side: Logo */}
                    <Link
                        to="/"
                        className="flex items-center gap-2.5 cursor-pointer group shrink-0"
                        onClick={() => handleTabClick("landing", "/")}
                        title="ReCall Home"
                    >
                        <div
                            className={`flex items-center justify-center transition-all duration-300 ${isScrolled ? "w-8 h-8 sm:w-9 sm:h-9" : "w-10 h-10 sm:w-11 sm:h-11"
                                }`}
                        >
                            <img
                                src="/logo.png"
                                alt="ReCall Logo"
                                className="w-full h-full object-contain brightness-0 dark:invert group-hover:scale-110 transition-transform duration-200"
                            />
                        </div>

                        {!isScrolled ? (
                            <div className="flex flex-col">
                                <div className="flex items-center gap-1.5">
                                    <span className="text-lg font-black tracking-tight text-slate-900 dark:text-white font-sans">
                                        ReCall
                                    </span>
                                </div>
                                <p className="hidden sm:block text-[11px] text-slate-500 dark:text-zinc-400">
                                    <span className="text-slate-500 dark:text-zinc-500 font-medium">
                                        Learn once. Recall when it matters.
                                    </span>
                                </p>
                            </div>
                        ) : (
                            <span className="hidden sm:inline text-xs font-black tracking-tight text-slate-900 dark:text-white font-sans">
                                ReCall
                            </span>
                        )}
                    </Link>

                    {/* Center: Nav Items (LinkedIn style: Icon on top, Label below, No badges) */}
                    <nav className={`${isScrolled ? "flex gap-0.5" : "hidden md:flex gap-1 sm:gap-1.5"} items-center justify-center overflow-x-auto no-scrollbar`}>
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = location.pathname === item.path;
                            return (
                                <Link
                                    key={item.id}
                                    to={item.path}
                                    onClick={() => handleTabClick(item.id, item.path)}
                                    className={`relative flex flex-col items-center justify-center transition cursor-pointer font-medium whitespace-nowrap ${isScrolled
                                        ? "px-2 sm:px-2.5 py-1 text-[10px] rounded-full"
                                        : "px-2.5 sm:px-3 py-1 text-[10px] sm:text-[11px] rounded-lg"
                                        } ${isActive
                                            ? "bg-slate-900 text-white font-extrabold dark:bg-white dark:text-black shadow-sm"
                                            : "text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-zinc-400 dark:hover:text-zinc-100 dark:hover:bg-zinc-900/80"
                                        }`}
                                >
                                    <Icon className={isScrolled ? "w-3.5 h-3.5" : "w-4 h-4 mb-0.5"} />
                                    <span className="leading-tight text-[10px] sm:text-[11px]">
                                        {isScrolled ? item.shortLabel || item.label : item.label}
                                    </span>
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Right Side: Search & Action Buttons */}
                    <div className="flex items-center gap-2">
                        {/* Quick Search Bar (Available in both normal and scrolled states) */}
                        <div className={`relative transition-all duration-300 ${isScrolled ? "w-28 sm:w-44 focus-within:w-56" : "hidden sm:flex w-44 focus-within:w-60"}`}>
                            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-zinc-500" />
                            <input
                                ref={searchInputRef}
                                type="text"
                                placeholder="Search... (Alt+R)"
                                value={searchTerm || ""}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                onFocus={() => setIsSearchFocused(true)}
                                onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                                className={`w-full pl-8 pr-7 text-xs rounded-full bg-slate-100 border border-slate-300 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-slate-500 dark:bg-zinc-900/90 dark:border-zinc-800 dark:text-zinc-200 dark:placeholder-zinc-500 dark:focus:border-zinc-500 transition-all duration-200 ${isScrolled ? "py-1" : "py-1.5"}`}
                            />
                            {searchTerm && (
                                <button
                                    onClick={() => setSearchTerm("")}
                                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:text-zinc-500 dark:hover:text-zinc-300 text-xs font-bold"
                                >
                                    ✕
                                </button>
                            )}

                            {/* Search Suggestions Dropdown (Shows max ~5 options in view with full scrollable list) */}
                            {isSearchFocused && (
                                <div className="absolute right-0 top-full mt-2 w-72 sm:w-80 z-50 rounded-2xl bg-white border border-slate-300 dark:bg-zinc-950 dark:border-zinc-800 shadow-2xl p-2 space-y-1 animate-in fade-in slide-in-from-top-1 duration-150">
                                    <div className="px-2.5 py-1 text-[10px] font-mono uppercase text-slate-400 dark:text-zinc-500 font-bold flex items-center justify-between border-b border-slate-100 dark:border-zinc-900 mb-1">
                                        <span>Matches ({filteredSearchItems.length})</span>
                                        <span className="text-[9px] text-slate-400 font-normal">Scroll All ↓</span>
                                    </div>

                                    {/* Scrollable Container (max-h-56 displays ~5 items vertically at once) */}
                                    <div className="max-h-56 overflow-y-auto space-y-1 pr-1 scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-zinc-800">
                                        {filteredSearchItems.length === 0 ? (
                                            <div className="p-3 text-center text-xs text-slate-400 dark:text-zinc-500">
                                                No concepts found
                                            </div>
                                        ) : (
                                            filteredSearchItems.map((item, idx) => {
                                                const Icon =
                                                    item.type === "Keyword"
                                                        ? Key
                                                        : item.type === "Revision"
                                                            ? BookOpen
                                                            : item.type === "Topic"
                                                                ? Layers
                                                                : item.type === "DSA"
                                                                    ? Code2
                                                                    : HelpCircle;

                                                const badgeColor =
                                                    item.type === "Keyword"
                                                        ? "bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300"
                                                        : item.type === "Revision"
                                                            ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300"
                                                            : item.type === "Topic"
                                                                ? "bg-purple-100 text-purple-800 dark:bg-purple-950/60 dark:text-purple-300"
                                                                : item.type === "DSA"
                                                                    ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 font-mono font-bold"
                                                                    : "bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300";

                                                return (
                                                    <button
                                                        key={idx}
                                                        type="button"
                                                        onMouseDown={() => {
                                                            setSearchTerm(item.text);
                                                            if (item.type === "Revision") {
                                                                navigate("/revise");
                                                            } else if (item.type === "DSA") {
                                                                navigate("/dsa");
                                                            } else {
                                                                navigate("/interview");
                                                            }
                                                            setIsSearchFocused(false);
                                                        }}
                                                        className="w-full text-left p-2 rounded-xl text-xs hover:bg-slate-100 dark:hover:bg-zinc-900 transition cursor-pointer flex flex-col gap-1 border border-transparent hover:border-slate-200 dark:hover:border-zinc-800 group"
                                                    >
                                                        <div className="flex items-start justify-between gap-2">
                                                            <div className="flex items-center gap-1.5 min-w-0">
                                                                <Icon className="w-3.5 h-3.5 text-slate-400 dark:text-zinc-500 flex-shrink-0 group-hover:text-slate-900 dark:group-hover:text-white" />
                                                                <span className="font-semibold text-slate-900 dark:text-zinc-200 truncate text-xs leading-tight">
                                                                    {item.text}
                                                                </span>
                                                            </div>
                                                            <span className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded flex-shrink-0 ${badgeColor}`}>
                                                                {item.type}
                                                            </span>
                                                        </div>
                                                        <span className="text-[10px] text-slate-500 dark:text-zinc-500 pl-5 truncate">
                                                            {item.category}
                                                        </span>
                                                    </button>
                                                );
                                            })
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Light / Dark Mode Toggle Button */}
                        {toggleTheme && (
                            <button
                                onClick={toggleTheme}
                                title={`Switch to ${theme === "dark" ? "Light" : "Dark"} Mode`}
                                className={`bg-slate-100 border border-slate-200 text-slate-700 hover:bg-slate-200 dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-300 dark:hover:text-white dark:hover:bg-zinc-800 transition cursor-pointer active:scale-95 flex items-center gap-1.5 text-xs font-mono ${isScrolled ? "p-1.5 rounded-full" : "p-2 rounded-xl"
                                    }`}
                            >
                                {theme === "dark" ? (
                                    <Sun className={isScrolled ? "w-3.5 h-3.5 text-amber-400" : "w-4 h-4 text-amber-400"} />
                                ) : (
                                    <Moon className={isScrolled ? "w-3.5 h-3.5 text-indigo-600" : "w-4 h-4 text-indigo-600"} />
                                )}
                                {!isScrolled && (
                                    <span className="hidden lg:inline text-[10px] text-zinc-400">
                                        {theme === "dark" ? "Light" : "Dark"}
                                    </span>
                                )}
                            </button>
                        )}

                        {/* Social Links (GitHub & LinkedIn) - Visible on desktop always */}
                        <div className="hidden sm:flex items-center gap-1 pl-1 border-l border-slate-200 dark:border-zinc-800">
                            <a
                                href="https://github.com/Sri-Akshat5/"
                                target="_blank"
                                rel="noopener noreferrer"
                                title="GitHub Profile"
                                className={`text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-zinc-400 dark:hover:text-white dark:hover:bg-zinc-900 transition cursor-pointer flex items-center justify-center ${isScrolled ? "p-1.5 rounded-full" : "p-2 rounded-lg"
                                    }`}
                            >
                                <svg className={isScrolled ? "w-3.5 h-3.5 fill-current" : "w-4 h-4 fill-current"} viewBox="0 0 24 24">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                                </svg>
                            </a>

                            <a
                                href="https://www.linkedin.com/in/sriakshat5/"
                                target="_blank"
                                rel="noopener noreferrer"
                                title="LinkedIn Profile"
                                className={`text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-zinc-400 dark:hover:text-white dark:hover:bg-zinc-900 transition cursor-pointer flex items-center justify-center ${isScrolled ? "p-1.5 rounded-full" : "p-2 rounded-lg"
                                    }`}
                            >
                                <svg className={isScrolled ? "w-3.5 h-3.5 fill-current" : "w-4 h-4 fill-current"} viewBox="0 0 24 24">
                                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                                </svg>
                            </a>
                        </div>

                        {/* Action Buttons (When NOT scrolled) */}
                        {!isScrolled && (
                            <div className="hidden lg:flex items-center gap-2 pl-2 border-l border-slate-200 dark:border-zinc-800">
                                {onOpenAddModal && (
                                    <button
                                        onClick={onOpenAddModal}
                                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200 transition cursor-pointer whitespace-nowrap active:scale-95"
                                    >
                                        <PlusCircle className="w-3.5 h-3.5" />
                                        <span>Add Note</span>
                                    </button>
                                )}

                                {onOpenSecurityModal && (
                                    <button
                                        onClick={onOpenSecurityModal}
                                        title="AES-256 Storage Info"
                                        className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 border border-transparent dark:text-zinc-400 dark:hover:text-white dark:hover:bg-zinc-900 dark:hover:border-zinc-800 transition cursor-pointer"
                                    >
                                        <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                                    </button>
                                )}
                            </div>
                        )}

                        {/* Mobile Menu Toggle Button (When NOT scrolled) */}
                        {!isScrolled && (
                            <div className="flex md:hidden items-center gap-2">
                                <button
                                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 border border-slate-200 text-slate-800 dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-200 dark:hover:text-white transition cursor-pointer active:scale-95"
                                    aria-label="Toggle Menu"
                                >
                                    {isMobileMenuOpen ? (
                                        <>
                                            <X className="w-4 h-4" />
                                            <span className="text-xs font-semibold">Close</span>
                                        </>
                                    ) : (
                                        <>
                                            <Menu className="w-4 h-4" />
                                            <span className="text-xs font-semibold">Menu</span>
                                        </>
                                    )}
                                </button>
                            </div>
                        )}
                    </div>

                </div>
            </div>

            {/* Complete Mobile Drawer Menu (Contains ALL Options when at page top) */}
            {isMobileMenuOpen && !isScrolled && (
                <div className="md:hidden border-t border-slate-200 dark:border-zinc-800/80 bg-white/98 dark:bg-black/98 backdrop-blur-2xl px-4 py-5 space-y-5 animate-in slide-in-from-top-2 duration-200 max-h-[85vh] overflow-y-auto">

                    {/* 1. Mobile Search Input */}
                    <div className="relative w-full">
                        <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-zinc-500" />
                        <input
                            type="text"
                            placeholder="Search concepts, topics, Q&A..."
                            value={searchTerm || ""}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-9 py-2.5 text-xs rounded-xl bg-slate-50 border border-slate-300 text-slate-900 placeholder-slate-400 dark:bg-zinc-900/90 dark:border-zinc-800 dark:text-white dark:placeholder-zinc-500 focus:outline-none focus:border-slate-500 dark:focus:border-zinc-500 transition"
                        />
                        {searchTerm && (
                            <button
                                onClick={() => setSearchTerm("")}
                                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:text-zinc-400 dark:hover:text-white text-xs font-bold"
                            >
                                ✕
                            </button>
                        )}
                    </div>

                    {/* 2. Theme Toggle Switch inside Drawer */}
                    {toggleTheme && (
                        <button
                            onClick={() => {
                                toggleTheme();
                            }}
                            className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-semibold bg-slate-100 border border-slate-200 text-slate-800 dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-200 transition cursor-pointer active:scale-98"
                        >
                            <div className="flex items-center gap-3">
                                {theme === "dark" ? (
                                    <Sun className="w-4 h-4 text-amber-400" />
                                ) : (
                                    <Moon className="w-4 h-4 text-indigo-600" />
                                )}
                                <span>Switch Color Theme</span>
                            </div>
                            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-200 text-slate-800 dark:bg-zinc-950 dark:text-white border border-slate-300 dark:border-zinc-800 uppercase">
                                {theme === "dark" ? "Light Mode" : "Dark Mode"}
                            </span>
                        </button>
                    )}

                    {/* 3. Navigation Items List */}
                    <div className="space-y-1.5">
                        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-zinc-500 px-2 pb-1">
                            Navigation Options
                        </p>
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = location.pathname === item.path;
                            return (
                                <Link
                                    key={item.id}
                                    to={item.path}
                                    onClick={() => handleTabClick(item.id, item.path)}
                                    className={`w-full flex items-center px-4 py-2.5 rounded-xl text-xs transition cursor-pointer font-medium active:scale-[0.98] ${isActive
                                        ? "bg-slate-900 text-white font-extrabold dark:bg-white dark:text-black"
                                        : "text-slate-700 hover:bg-slate-100 hover:text-slate-900 dark:text-zinc-300 dark:hover:bg-zinc-900/90 dark:hover:text-white border border-transparent"
                                        }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <Icon className="w-4 h-4" />
                                        <span className="text-sm font-semibold">{item.label}</span>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>

                    {/* 4. Action Buttons & Security Info */}
                    <div className="pt-3 border-t border-slate-200 dark:border-zinc-900 space-y-2.5">
                        {onOpenAddModal && (
                            <button
                                onClick={() => {
                                    onOpenAddModal();
                                    setIsMobileMenuOpen(false);
                                }}
                                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200 transition active:scale-98"
                            >
                                <PlusCircle className="w-4 h-4" />
                                <span>Create Custom Note</span>
                            </button>
                        )}

                        {onOpenSecurityModal && (
                            <button
                                onClick={() => {
                                    onOpenSecurityModal();
                                    setIsMobileMenuOpen(false);
                                }}
                                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-slate-100 border border-slate-200 text-emerald-700 dark:bg-zinc-900 dark:border-zinc-800 dark:text-emerald-400 text-xs font-semibold hover:bg-slate-200 dark:hover:bg-zinc-800 transition"
                            >
                                <ShieldCheck className="w-4 h-4" />
                                <span>AES-256 Storage Info</span>
                            </button>
                        )}
                    </div>

                    {/* 5. Social Links Footer */}
                    <div className="pt-3 border-t border-slate-200 dark:border-zinc-900 flex items-center justify-between px-1">
                        <span className="text-[11px] text-slate-500 dark:text-zinc-500 font-medium">ReCall Platform</span>
                        <div className="flex items-center gap-2">
                            <a
                                href="https://github.com/Sri-Akshat5/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 border border-slate-200 text-slate-700 dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-300 dark:hover:text-white text-xs"
                            >
                                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                                </svg>
                                <span>GitHub</span>
                            </a>

                            <a
                                href="https://www.linkedin.com/in/sriakshat5/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 border border-slate-200 text-slate-700 dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-300 dark:hover:text-white text-xs"
                            >
                                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                                </svg>
                                <span>LinkedIn</span>
                            </a>
                        </div>
                    </div>

                </div>
            )}
        </header>
    );
};

export default Navbar;
