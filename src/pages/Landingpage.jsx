import React from "react";
import { useNavigate } from "react-router-dom";
import {
    Bookmark,
    ArrowRight,
    Brain,
    Zap,
    ShieldCheck,
    Cpu,
    Layers,
    FileText,
    CheckCircle2,
    Code2,
    Terminal,
    Lock,
    Flame,
    Sparkles
} from "lucide-react";

export const Landingpage = ({ onNavigate }) => {
    const navigate = useNavigate();

    const handleNavigate = (target) => {
        if (onNavigate) {
            onNavigate(target);
        } else {
            navigate(target === "landing" ? "/" : `/${target}`);
        }
    };
    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-black dark:text-zinc-100 flex flex-col font-sans selection:bg-zinc-300 dark:selection:bg-zinc-800">

            {/* Hero Section */}
            <section className="relative pt-16 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center space-y-8 overflow-hidden">

                {/* Hero Title */}
                <div className="space-y-4 max-w-4xl mx-auto relative z-10">
                    <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
                        Stop Blanking In Technical Interviews. <br className="hidden sm:inline" />
                        <span className="text-slate-600 dark:text-zinc-400 font-mono text-3xl sm:text-5xl">
                            Learn once. Recall when it matters.
                        </span>
                    </h1>

                    {/* Strikethrough Tagline */}
                    <p className="text-lg sm:text-xl text-slate-600 dark:text-zinc-400 max-w-2xl mx-auto font-medium">
                        <span className="line-through decoration-slate-400 dark:decoration-zinc-500 decoration-2 text-slate-900 dark:text-white italic mr-2 font-bold">
                            "Sorry, I'm not able to recall right now..."
                        </span>
                        <br className="sm:hidden" />
                        ReCall turns passive reading into active mastery for Java, React 19, and System Design.
                    </p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center justify-center gap-4 pt-4 relative z-10">
                    <button
                        onClick={() => handleNavigate("interview")}
                        className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-slate-900 text-white font-extrabold text-sm   hover:bg-slate-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200 transition cursor-pointer active:scale-95"
                    >
                        <span>Explore Interview QA</span>
                        <ArrowRight className="w-4 h-4" />
                    </button>

                    <button
                        onClick={() => handleNavigate("revise")}
                        className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white text-slate-900 border border-slate-300 font-semibold text-sm hover:bg-slate-100 dark:bg-zinc-900 dark:text-zinc-200 dark:border-zinc-700 dark:hover:bg-zinc-800 dark:hover:text-white transition cursor-pointer active:scale-95  "
                    >
                        <Layers className="w-4 h-4" />
                        <span>Start Active Recall Deck</span>
                    </button>
                </div>

                {/* Metric Badges */}
                <div className="grid grid-cols-2 md:grid-cols-2 gap-4 pt-12 max-w-4xl mx-auto relative z-10">
                    <div className="p-4 rounded-2xl bg-white border border-slate-200 dark:bg-zinc-950 dark:border-zinc-800 text-center space-y-1  ">
                        <span className="text-2xl font-extrabold text-slate-900 dark:text-white font-mono">100%</span>
                        <p className="text-xs text-slate-500 dark:text-zinc-400">Offline & Privacy First</p>
                    </div>
                    <div className="p-4 rounded-2xl bg-white border border-slate-200 dark:bg-zinc-950 dark:border-zinc-800 text-center space-y-1  ">
                        <span className="text-2xl font-extrabold text-slate-900 dark:text-white font-mono">AES-256</span>
                        <p className="text-xs text-slate-500 dark:text-zinc-400">Encrypted Storage</p>
                    </div>
                </div>
            </section>

            {/* Why We Started ReCall - Our Motive Section */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-100 text-slate-900 dark:bg-zinc-950 dark:text-zinc-100 border-y border-slate-200 dark:border-zinc-900 w-full transition-colors">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">

                    {/* Left Text Explanation */}
                    <div className="lg:col-span-6 space-y-6">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white text-slate-900 border border-slate-300 dark:bg-zinc-900 dark:text-white dark:border-zinc-700 text-xs font-mono font-bold">
                            <Brain className="w-4 h-4 text-slate-900 dark:text-white" />
                            <span>Why We Started ReCall</span>
                        </div>

                        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-snug">
                            The Pain of Forgetting What You've Already Learned.
                        </h2>

                        <div className="space-y-4 text-sm text-slate-700 dark:text-zinc-300 leading-relaxed font-sans font-medium">
                            <p>
                                As software engineers, we spend hundreds of hours studying complex concepts: JVM Memory Models, React 19 Hooks, Distributed Caching, and Database Sharding. Yet, under the high pressure of an interview or architecture presentation, our brain freezes.
                            </p>
                            <p>
                                Generic interview prep sites focus purely on algorithmic LeetCode puzzles. Official documentation is too verbose for rapid review. <strong className="text-slate-900 dark:text-white font-extrabold">ReCall was built to solve the recall gap</strong>—providing structured active recall prompts, visual system blueprints, and production-grade code traps.
                            </p>
                        </div>

                        <div className="pt-2 flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-black flex items-center justify-center font-bold">
                                RC
                            </div>
                            <div>
                                <p className="text-xs font-bold text-slate-900 dark:text-white">Built by Engineers, for Engineers</p>
                                <p className="text-[11px] text-slate-500 dark:text-zinc-400 font-medium">Designed to maximize long-term retention</p>
                            </div>
                        </div>
                    </div>

                    {/* Right Visual Code Box */}
                    <div className="lg:col-span-6 bg-slate-900 text-slate-100 dark:bg-black dark:text-zinc-100 rounded-3xl p-6 sm:p-8 border border-slate-800 dark:border-zinc-800   space-y-4 font-mono text-xs">
                        <div className="flex items-center justify-between border-b border-slate-800 dark:border-zinc-800 pb-3 text-slate-400 dark:text-zinc-400">
                            <span className="flex items-center gap-2 text-white font-bold">
                                <Terminal className="w-4 h-4 text-slate-400 dark:text-zinc-400" /> recall_problem_statement.ts
                            </span>
                            <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-200 border border-slate-700 dark:bg-zinc-900 dark:text-zinc-300 dark:border-zinc-800 font-semibold">
                                ACTIVE RECALL vs PASSIVE READING
                            </span>
                        </div>

                        <div className="space-y-3 text-slate-300 dark:text-zinc-300 leading-relaxed overflow-x-auto">
                            <p className="text-slate-500 dark:text-zinc-500">// Passive Reading (What most devs do):</p>
                            <p className="text-red-400 line-through">
                                - Read documentation ➔ Forget 70% in 48 hours ➔ Freeze in interviews.
                            </p>
                            <br />
                            <p className="text-slate-500 dark:text-zinc-500">// Active Recall with ReCall (Science-Backed):</p>
                            <p className="text-white font-bold">
                                + Prompt Question ➔ Forced Mental Retrieval ➔ Check Solution ➔ Rate Confidence.
                            </p>
                            <p className="text-slate-400 dark:text-zinc-400 pl-4 border-l border-slate-700 dark:border-zinc-700">
                                Result: Retain 90%+ long-term memory for JVM internals, React state, and CAP Theorem trade-offs.
                            </p>
                        </div>
                    </div>

                </div>
            </section>

            {/* How It Helps / How It Works */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full space-y-12">

                <div className="text-center space-y-3 max-w-2xl mx-auto">
                    <span className="text-xs font-mono text-slate-500 dark:text-zinc-400 uppercase tracking-widest">Core Capabilities</span>
                    <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">How ReCall Helps You Master Tech Interviews</h2>
                    <p className="text-slate-600 dark:text-zinc-400 text-xs sm:text-sm">
                        Four specialized modules designed for seamless technical revision.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

                    {/* Card 1: Interview QA */}
                    <div
                        onClick={() => handleNavigate("interview")}
                        className="group bg-white p-6 rounded-2xl border border-slate-200 hover:border-slate-400 dark:bg-zinc-950 dark:border-zinc-800 dark:hover:border-zinc-500 transition cursor-pointer space-y-4 flex flex-col justify-between  "
                    >
                        <div className="space-y-3">
                            <div className="w-10 h-10 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-black flex items-center justify-center font-bold">
                                <FileText className="w-5 h-5" />
                            </div>
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-slate-700 dark:group-hover:text-zinc-300 transition-colors">
                                Interview QA Bank
                            </h3>
                            <p className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed">
                                Curated technical questions for Core Java, React 19, Spring Boot, SQL, and Web Security with copyable code snippets.
                            </p>
                        </div>
                        <span className="text-xs text-slate-900 dark:text-white font-semibold inline-flex items-center gap-1 pt-2">
                            Explore QA Bank <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                        </span>
                    </div>

                    {/* Card 2: Active Recall Flashcards */}
                    <div
                        onClick={() => handleNavigate("revise")}
                        className="group bg-white p-6 rounded-2xl border border-slate-200 hover:border-slate-400 dark:bg-zinc-950 dark:border-zinc-800 dark:hover:border-zinc-500 transition cursor-pointer space-y-4 flex flex-col justify-between  "
                    >
                        <div className="space-y-3">
                            <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-900 border border-slate-300 dark:bg-zinc-900 dark:text-white dark:border-zinc-700 flex items-center justify-center font-bold">
                                <Layers className="w-5 h-5" />
                            </div>
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-slate-700 dark:group-hover:text-zinc-300 transition-colors">
                                Active Recall Deck
                            </h3>
                            <p className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed">
                                3D flip cards using Leitner Spaced Repetition algorithms (*Again*, *Hard*, *Good*, *Mastered*) to lock in memory.
                            </p>
                        </div>
                        <span className="text-xs text-slate-900 dark:text-white font-semibold inline-flex items-center gap-1 pt-2">
                            Start Flashcards <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                        </span>
                    </div>

                    {/* Card 3: System Design Blueprints */}
                    <div
                        onClick={() => handleNavigate("systemdesign")}
                        className="group bg-white p-6 rounded-2xl border border-slate-200 hover:border-slate-400 dark:bg-zinc-950 dark:border-zinc-800 dark:hover:border-zinc-500 transition cursor-pointer space-y-4 flex flex-col justify-between  "
                    >
                        <div className="space-y-3">
                            <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-900 border border-slate-300 dark:bg-zinc-900 dark:text-white dark:border-zinc-700 flex items-center justify-center font-bold">
                                <Cpu className="w-5 h-5" />
                            </div>
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-slate-700 dark:group-hover:text-zinc-300 transition-colors">
                                System Design Blueprints
                            </h3>
                            <p className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed">
                                Visual topologies for Load Balancers, Distributed Caching, Consistent Hashing Sharding, and CAP Theorem trade-offs.
                            </p>
                        </div>
                        <span className="text-xs text-slate-900 dark:text-white font-semibold inline-flex items-center gap-1 pt-2">
                            View Blueprints <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                        </span>
                    </div>

                    {/* Card 4: Encrypted Personal Notes */}
                    <div
                        onClick={() => handleNavigate("notes")}
                        className="group bg-white p-6 rounded-2xl border border-slate-200 hover:border-slate-400 dark:bg-zinc-950 dark:border-zinc-800 dark:hover:border-zinc-500 transition cursor-pointer space-y-4 flex flex-col justify-between  "
                    >
                        <div className="space-y-3">
                            <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-900 border border-slate-300 dark:bg-zinc-900 dark:text-white dark:border-zinc-700 flex items-center justify-center font-bold">
                                <Lock className="w-5 h-5 text-slate-900 dark:text-white" />
                            </div>
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-slate-700 dark:group-hover:text-zinc-300 transition-colors">
                                Encrypted Personal Notes
                            </h3>
                            <p className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed">
                                Add your own custom notes securely using AES-256 local storage encryption. Zero server storage, total privacy.
                            </p>
                        </div>
                        <span className="text-xs text-slate-900 dark:text-white font-semibold inline-flex items-center gap-1 pt-2">
                            Add Personal Note <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                        </span>
                    </div>

                </div>

            </section>

            {/* Footer Banner CTA */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full border-t border-slate-200 dark:border-zinc-900">
                <div className="bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 dark:bg-zinc-950 dark:border-zinc-800 text-center space-y-6  ">
                    <div className="w-12 h-12 rounded-2xl bg-slate-900 text-white dark:bg-white dark:text-black mx-auto flex items-center justify-center  ">
                        <Bookmark className="w-6 h-6" />
                    </div>

                    <div className="space-y-2 max-w-2xl mx-auto">
                        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                            Ready to Ace Your Next Tech Interview?
                        </h2>
                        <p className="text-slate-600 dark:text-zinc-400 text-xs sm:text-sm">
                            No account required. Your revision progress stays 100% encrypted in your local browser.
                        </p>
                    </div>

                    <button
                        onClick={() => handleNavigate("interview")}
                        className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-slate-900 text-white font-extrabold text-sm   hover:bg-slate-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200 transition cursor-pointer active:scale-95"
                    >
                        <span>Start Revision Now</span>
                        <ArrowRight className="w-4 h-4" />
                    </button>
                </div>
            </section>

        </div>
    );
};

export default Landingpage;
