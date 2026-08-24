import React from "react";
import { useNavigate } from "react-router-dom";
import { 
  ArrowLeft, 
  Rss, 
  Zap, 
  Database, 
  Server, 
  Cpu, 
  Building2, 
  Sparkles, 
  Layers, 
  CheckCircle2, 
  BookOpen,
  Share2,
  Users,
  HelpCircle,
  AlertTriangle,
  Check
} from "lucide-react";
import AnimatedNewsFeedDiagram from "./AnimatedNewsFeedDiagram";
import AdBanner from "../common/AdBanner";

export const NewsFeedPage = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-8 font-sans pb-12">
      {/* Back Button */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <button
          onClick={() => navigate("/system-design")}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-slate-300 text-xs font-bold text-slate-700 hover:text-slate-900 hover:bg-slate-100 dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-300 dark:hover:text-white dark:hover:bg-zinc-800 transition cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to System Design Hub</span>
        </button>

        {/* Action Link to LLD Blueprint */}
        <button
          onClick={() => navigate("/system-design/lld-7")}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-600 dark:text-purple-400 hover:bg-purple-500/20 text-xs font-bold transition cursor-pointer"
        >
          <Cpu className="w-4 h-4" />
          <span>View Low-Level Design (LLD & OOD)</span>
        </button>
      </div>

      {/* Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 dark:bg-zinc-950 dark:border-zinc-800 space-y-4">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400 text-xs font-mono font-bold uppercase tracking-wider">
            <Rss className="w-3.5 h-3.5" />
            <span>High-Level Design (HLD)</span>
          </div>

          <div className="flex items-center gap-1.5 flex-wrap">
            {["Meta", "Twitter", "LinkedIn", "TikTok"].map((c, i) => (
              <span key={i} className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-md bg-slate-100 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 text-slate-700 dark:text-zinc-300 font-medium">
                <Building2 className="w-2.5 h-2.5 text-slate-400" />
                {c}
              </span>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Design News Feed / Social Timeline (Twitter / Instagram)
          </h1>
          <p className="text-slate-600 dark:text-zinc-400 text-xs sm:text-sm max-w-3xl leading-relaxed">
            Designing a social timeline rendering engine with Hybrid Fan-out architecture, pre-computed Redis Sorted Sets, and Graph DB follower lookup.
          </p>
        </div>
      </div>

      {/* SECTION 1: REQUIREMENTS & ESTIMATIONS */}
      <div className="p-6 rounded-3xl bg-white border border-slate-200 dark:bg-zinc-950 dark:border-zinc-800 space-y-6">
        <div className="flex items-center gap-2 text-slate-900 dark:text-white border-b border-slate-100 dark:border-zinc-900 pb-3">
          <Sparkles className="w-5 h-5 text-amber-500" />
          <h2 className="text-lg font-bold">1. System Requirements & Capacity Estimations</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3 p-4 rounded-2xl bg-slate-50 dark:bg-zinc-900/60 border border-slate-200 dark:border-zinc-800">
            <h3 className="text-xs font-mono uppercase font-bold text-indigo-600 dark:text-indigo-400">
              Functional Requirements
            </h3>
            <ul className="space-y-2 text-xs text-slate-700 dark:text-zinc-300">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>Users publish posts/tweets and view a reverse-chronological timeline of followed users.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>Support celebrity users with millions of followers without causing write bottlenecks.</span>
              </li>
            </ul>
          </div>

          <div className="space-y-3 p-4 rounded-2xl bg-slate-50 dark:bg-zinc-900/60 border border-slate-200 dark:border-zinc-800">
            <h3 className="text-xs font-mono uppercase font-bold text-blue-600 dark:text-blue-400">
              Non-Functional Requirements
            </h3>
            <ul className="space-y-2 text-xs text-slate-700 dark:text-zinc-300">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                <span><strong>Fast Feed Generation (&lt;200ms)</strong>: Timelines must load immediately upon opening app.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* SECTION 2: ANIMATED SVG DIAGRAM */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-slate-900 dark:text-white px-2">
          <Layers className="w-5 h-5 text-indigo-500" />
          <h2 className="text-lg font-bold">2. Architecture Flow Diagram</h2>
        </div>
        <AnimatedNewsFeedDiagram />
      </div>

      {/* SECTION 3: COMPONENT BREAKDOWN */}
      <div className="p-6 rounded-3xl bg-white border border-slate-200 dark:bg-zinc-950 dark:border-zinc-800 space-y-6">
        <div className="flex items-center gap-2 text-slate-900 dark:text-white border-b border-slate-100 dark:border-zinc-900 pb-3">
          <Cpu className="w-5 h-5 text-indigo-500" />
          <h2 className="text-lg font-bold">3. System Component Blueprint & "Why Every Component is Required"</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-zinc-900/80 border border-slate-200 dark:border-zinc-800 space-y-2">
            <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold text-xs">
              <Share2 className="w-4 h-4" />
              <span>Fan-out Service (Push vs Pull)</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed">
              <strong>Why Required?</strong> Pushes new post IDs directly to active follower timeline caches in Redis. Decouples celebrity accounts to use Pull-on-Demand to avoid write explosion.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-zinc-900/80 border border-slate-200 dark:border-zinc-800 space-y-2">
            <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-xs">
              <Database className="w-4 h-4" />
              <span>Redis Pre-computed Timeline Cache</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed">
              <strong>Why Required?</strong> Stores user feeds as Sorted Sets (<code className="text-emerald-500 font-mono">ZADD</code>) ordered by timestamp. Enables sub-10ms reverse-chronological timeline rendering.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-zinc-900/80 border border-slate-200 dark:border-zinc-800 space-y-2">
            <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400 font-bold text-xs">
              <Users className="w-4 h-4" />
              <span>Neo4j / Graph DB Follower Store</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed">
              <strong>Why Required?</strong> Manages complex social graph relationships (<code className="text-purple-500 font-mono">User -&gt; FOLLOWS -&gt; User</code>) with fast graph traversal queries.
            </p>
          </div>
        </div>
      </div>

      {/* SECTION 4: STRENGTHS & DISADVANTAGES */}
      <div className="p-6 rounded-3xl bg-white border border-slate-200 dark:bg-zinc-950 dark:border-zinc-800 space-y-6">
        <div className="flex items-center gap-2 text-slate-900 dark:text-white border-b border-slate-100 dark:border-zinc-900 pb-3">
          <Zap className="w-5 h-5 text-amber-500" />
          <h2 className="text-lg font-bold">4. Architectural Strengths & Disadvantages</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Strengths */}
          <div className="p-5 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/40 space-y-3">
            <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-bold text-xs">
              <Check className="w-4 h-4" />
              <span>Architectural Strengths</span>
            </div>
            <ul className="space-y-2 text-xs text-slate-700 dark:text-zinc-300">
              <li>• <strong>Sub-10ms Timeline Reads</strong>: Pre-computed Redis Sorted Sets deliver instant feed loading for 99% of normal users.</li>
              <li>• <strong>Celebrity Protection</strong>: Hybrid Fan-out prevents single celebrity post from triggering 100 Million+ simultaneous cache write operations.</li>
            </ul>
          </div>

          {/* Disadvantages */}
          <div className="p-5 rounded-2xl bg-rose-50/50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/40 space-y-3">
            <div className="flex items-center gap-2 text-rose-700 dark:text-rose-400 font-bold text-xs">
              <AlertTriangle className="w-4 h-4" />
              <span>Disadvantages & Failure Risks</span>
            </div>
            <ul className="space-y-2 text-xs text-slate-700 dark:text-zinc-300">
              <li>• <strong>Redis Memory Footprint</strong>: Storing 800 post IDs per user timeline in Redis RAM is expensive without LRU eviction caps.</li>
            </ul>
          </div>
        </div>
      </div>

      <AdBanner adSlot="9876543216" />

      {/* SECTION 5: DEEP TECH INTERVIEW Q&A */}
      <div className="p-6 rounded-3xl bg-white border border-slate-200 dark:bg-zinc-950 dark:border-zinc-800 space-y-6">
        <div className="flex items-center gap-2 text-slate-900 dark:text-white border-b border-slate-100 dark:border-zinc-900 pb-3">
          <HelpCircle className="w-5 h-5 text-indigo-500" />
          <h2 className="text-lg font-bold">5. Deep Tech Interview Q&A: Fan-out & Storage Decisions</h2>
        </div>

        <div className="space-y-6 text-xs sm:text-sm text-slate-700 dark:text-zinc-300 leading-relaxed">
          {/* Question 1: Fan-out-on-Write vs Fan-out-on-Read */}
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 space-y-3">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-500 font-mono text-xs">Q1</span>
              What is the difference between Fan-out-on-Write (Push) and Fan-out-on-Read (Pull)?
            </h3>
            <div className="space-y-2 text-xs leading-relaxed text-slate-600 dark:text-zinc-400">
              <p>
                <strong>Push Model (Fan-out-on-Write)</strong>: When a user posts, a worker pushes the post ID into the Redis timeline cache of all their followers. Reads are fast O(1), but writes are slow if the poster has millions of followers.
              </p>
              <p>
                <strong>Pull Model (Fan-out-on-Read)</strong>: Timelines are compiled on demand when a user opens the app by fetching posts from followed accounts. Writes are instant O(1), but reads are slow.
              </p>
              <p>
                <strong>Hybrid Solution (Meta / Twitter)</strong>: Use Push model for regular users (&lt;10k followers) and Pull model for celebrity accounts (&gt;10k followers).
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsFeedPage;
