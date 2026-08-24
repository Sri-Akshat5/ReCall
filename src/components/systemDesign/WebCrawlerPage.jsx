import React from "react";
import { useNavigate } from "react-router-dom";
import { 
  ArrowLeft, 
  Globe, 
  Zap, 
  Database, 
  Server, 
  Cpu, 
  Building2, 
  Sparkles, 
  Layers, 
  CheckCircle2, 
  ShieldCheck, 
  BookOpen, 
  Search,
  Filter,
  HardDrive,
  HelpCircle,
  AlertTriangle,
  Check
} from "lucide-react";
import AnimatedWebCrawlerDiagram from "./AnimatedWebCrawlerDiagram";
import AdBanner from "../common/AdBanner";

export const WebCrawlerPage = () => {
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
          onClick={() => navigate("/system-design/lld-6")}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-600 dark:text-purple-400 hover:bg-purple-500/20 text-xs font-bold transition cursor-pointer"
        >
          <Cpu className="w-4 h-4" />
          <span>View Low-Level Design (LLD & OOD)</span>
        </button>
      </div>

      {/* Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 dark:bg-zinc-950 dark:border-zinc-800 space-y-4">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-600 dark:text-cyan-400 text-xs font-mono font-bold uppercase tracking-wider">
            <Globe className="w-3.5 h-3.5" />
            <span>High-Level Design (HLD)</span>
          </div>

          <div className="flex items-center gap-1.5 flex-wrap">
            {["Google", "Bing", "DuckDuckGo", "Baidu"].map((c, i) => (
              <span key={i} className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-md bg-slate-100 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 text-slate-700 dark:text-zinc-300 font-medium">
                <Building2 className="w-2.5 h-2.5 text-slate-400" />
                {c}
              </span>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Design a Distributed Web Crawler
          </h1>
          <p className="text-slate-600 dark:text-zinc-400 text-xs sm:text-sm max-w-3xl leading-relaxed">
            Architecting a web crawler fetching 1 Billion pages monthly with host politeness policies, Bloom filter link deduplication, and DNS local caching.
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
            <h3 className="text-xs font-mono uppercase font-bold text-cyan-600 dark:text-cyan-400">
              Functional Requirements
            </h3>
            <ul className="space-y-2 text-xs text-slate-700 dark:text-zinc-300">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>Crawl web pages starting from seed URLs, parse links, and append new URLs to queue.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>Store raw HTML document content in distributed file system (HDFS / S3).</span>
              </li>
            </ul>
          </div>

          <div className="space-y-3 p-4 rounded-2xl bg-slate-50 dark:bg-zinc-900/60 border border-slate-200 dark:border-zinc-800">
            <h3 className="text-xs font-mono uppercase font-bold text-purple-600 dark:text-purple-400">
              Non-Functional Requirements
            </h3>
            <ul className="space-y-2 text-xs text-slate-700 dark:text-zinc-300">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-purple-500 shrink-0 mt-0.5" />
                <span><strong>Politeness Policy</strong>: Limit requests to same domain (e.g. max 1 req/500ms per website).</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-purple-500 shrink-0 mt-0.5" />
                <span><strong>Deduplication</strong>: Avoid duplicate crawls using Bloom Filters.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* SECTION 2: ANIMATED SVG DIAGRAM */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-slate-900 dark:text-white px-2">
          <Layers className="w-5 h-5 text-cyan-500" />
          <h2 className="text-lg font-bold">2. Architecture Flow Diagram</h2>
        </div>
        <AnimatedWebCrawlerDiagram />
      </div>

      {/* SECTION 3: COMPONENT BREAKDOWN */}
      <div className="p-6 rounded-3xl bg-white border border-slate-200 dark:bg-zinc-950 dark:border-zinc-800 space-y-6">
        <div className="flex items-center gap-2 text-slate-900 dark:text-white border-b border-slate-100 dark:border-zinc-900 pb-3">
          <Cpu className="w-5 h-5 text-indigo-500" />
          <h2 className="text-lg font-bold">3. System Component Blueprint & "Why Every Component is Required"</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-zinc-900/80 border border-slate-200 dark:border-zinc-800 space-y-2">
            <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400 font-bold text-xs">
              <Filter className="w-4 h-4" />
              <span>Bloom Filter (Link Deduplication)</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed">
              <strong>Why Required?</strong> Checks if a URL has already been crawled in O(1) time using minimal RAM, avoiding infinite crawl loops.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-zinc-900/80 border border-slate-200 dark:border-zinc-800 space-y-2">
            <div className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400 font-bold text-xs">
              <Server className="w-4 h-4" />
              <span>DNS Local Cache Pool</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed">
              <strong>Why Required?</strong> Resolving domain names to IP addresses over standard DNS is a major bottleneck. Local caching speeds up HTTP GET requests by 10x.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-zinc-900/80 border border-slate-200 dark:border-zinc-800 space-y-2">
            <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-bold text-xs">
              <HardDrive className="w-4 h-4" />
              <span>Distributed HDFS Repository</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed">
              <strong>Why Required?</strong> Stores raw HTML web pages across thousands of commodity disk nodes for indexing by Google PageRank algorithms.
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
              <li>• <strong>O(1) Memory Deduplication</strong>: Bloom filters eliminate duplicate link fetches while using 99% less memory than HashSets.</li>
              <li>• <strong>Strict Politeness Protection</strong>: Host mapping queues ensure target servers are never crashed by crawler DDoS.</li>
            </ul>
          </div>

          {/* Disadvantages */}
          <div className="p-5 rounded-2xl bg-rose-50/50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/40 space-y-3">
            <div className="flex items-center gap-2 text-rose-700 dark:text-rose-400 font-bold text-xs">
              <AlertTriangle className="w-4 h-4" />
              <span>Disadvantages & Failure Risks</span>
            </div>
            <ul className="space-y-2 text-xs text-slate-700 dark:text-zinc-300">
              <li>• <strong>Spider Traps & Infinite Loops</strong>: Malicious websites generating infinite URL paths require depth-limit heuristics.</li>
              <li>• <strong>Dynamic JavaScript (SPA) Rendering Overhead</strong>: Crawling React/Vue apps requires expensive headless Chrome (Puppeteer/Playwright) instances.</li>
            </ul>
          </div>
        </div>
      </div>

      <AdBanner adSlot="9876543215" />

      {/* SECTION 5: DEEP TECH INTERVIEW Q&A */}
      <div className="p-6 rounded-3xl bg-white border border-slate-200 dark:bg-zinc-950 dark:border-zinc-800 space-y-6">
        <div className="flex items-center gap-2 text-slate-900 dark:text-white border-b border-slate-100 dark:border-zinc-900 pb-3">
          <HelpCircle className="w-5 h-5 text-cyan-500" />
          <h2 className="text-lg font-bold">5. Deep Tech Interview Q&A: Crawler Design Decisions</h2>
        </div>

        <div className="space-y-6 text-xs sm:text-sm text-slate-700 dark:text-zinc-300 leading-relaxed">
          {/* Question 1: Why Bloom Filter over Hash Table? */}
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 space-y-3">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-500 font-mono text-xs">Q1</span>
              Why use a Bloom Filter instead of a standard HashSet for URL deduplication?
            </h3>
            <div className="space-y-2 text-xs leading-relaxed text-slate-600 dark:text-zinc-400">
              <p>
                Storing 1 Billion URLs (average length 100 bytes) in a HashSet requires 100 GB of RAM. A <strong>Bloom Filter</strong> uses a compact bit array with k-hash functions, requiring only 1.2 GB of RAM to store 1 Billion URLs with a 1% false positive rate!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WebCrawlerPage;
