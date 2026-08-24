import React from "react";
import { useNavigate } from "react-router-dom";
import { 
  ArrowLeft, 
  Network, 
  Database, 
  Server, 
  ShieldCheck, 
  Zap, 
  Globe, 
  Key, 
  CheckCircle2, 
  Cpu, 
  Building2,
  Layers,
  Sparkles,
  BookOpen,
  HelpCircle,
  AlertTriangle,
  Check
} from "lucide-react";
import AnimatedUrlShortenerDiagram from "./AnimatedUrlShortenerDiagram";
import AdBanner from "../common/AdBanner";

export const UrlShortenerPage = () => {
  const navigate = useNavigate();

  return (
    <article className="space-y-8 font-sans pb-12" id="hld-url-shortener-article">
      {/* Back Navigation Header */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <button
          id="btn-back-to-sd-hub"
          onClick={() => navigate("/system-design")}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-slate-300 text-xs font-bold text-slate-700 hover:text-slate-900 hover:bg-slate-100 dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-300 dark:hover:text-white dark:hover:bg-zinc-800 transition cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to System Design Hub</span>
        </button>

        {/* Action Link to LLD Blueprint */}
        <button
          onClick={() => navigate("/system-design/lld-1")}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-600 dark:text-purple-400 hover:bg-purple-500/20 text-xs font-bold transition cursor-pointer"
        >
          <Cpu className="w-4 h-4" />
          <span>View Low-Level Design (LLD & OOD)</span>
        </button>
      </div>

      {/* Page Title & Context Header */}
      <header className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 dark:bg-zinc-950 dark:border-zinc-800 space-y-4" id="hld-url-shortener-header">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-xs font-mono font-bold uppercase tracking-wider">
            <Network className="w-3.5 h-3.5" />
            <span>High-Level Design (HLD)</span>
          </div>

          <div className="flex items-center gap-1.5 flex-wrap">
            {["Google", "Amazon", "Microsoft", "Uber", "Meta"].map((c, i) => (
              <span key={i} className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-md bg-slate-100 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 text-slate-700 dark:text-zinc-300 font-medium">
                <Building2 className="w-2.5 h-2.5 text-slate-400" />
                {c}
              </span>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Design a URL Shortener (TinyURL)
          </h1>
          <p className="text-slate-600 dark:text-zinc-400 text-xs sm:text-sm max-w-3xl leading-relaxed">
            A comprehensive high-level architecture blueprint for scaling a URL shortener service to process 50 Billion redirects per day with low latency (&lt;50ms) and 99.99% availability.
          </p>
        </div>
      </header>

      {/* SECTION 1: SYSTEM REQUIREMENTS & CAPACITY ESTIMATION */}
      <section className="p-6 rounded-3xl bg-white border border-slate-200 dark:bg-zinc-950 dark:border-zinc-800 space-y-6" id="hld-url-shortener-requirements">
        <div className="flex items-center gap-2 text-slate-900 dark:text-white border-b border-slate-100 dark:border-zinc-900 pb-3">
          <Sparkles className="w-5 h-5 text-amber-500" />
          <h2 className="text-lg font-bold">1. System Requirements & Estimations</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Functional Requirements */}
          <div className="space-y-3 p-4 rounded-2xl bg-slate-50 dark:bg-zinc-900/60 border border-slate-200 dark:border-zinc-800">
            <h3 className="text-xs font-mono uppercase font-bold text-blue-600 dark:text-blue-400">
              Functional Requirements
            </h3>
            <ul className="space-y-2 text-xs text-slate-700 dark:text-zinc-300">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>Convert a given long URL into a unique short alias (e.g. <code className="bg-slate-200 dark:bg-zinc-800 px-1 rounded">https://tinyurl.com/aB3x9Z</code>).</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>Redirect short URL requests to the original long URL with HTTP 301/302 status code.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>Support optional custom aliases and link TTL (expiration times).</span>
              </li>
            </ul>
          </div>

          {/* Non-Functional Requirements */}
          <div className="space-y-3 p-4 rounded-2xl bg-slate-50 dark:bg-zinc-900/60 border border-slate-200 dark:border-zinc-800">
            <h3 className="text-xs font-mono uppercase font-bold text-purple-600 dark:text-purple-400">
              Non-Functional Requirements
            </h3>
            <ul className="space-y-2 text-xs text-slate-700 dark:text-zinc-300">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-purple-500 shrink-0 mt-0.5" />
                <span><strong>High Availability (99.99%)</strong>: System must not fail even if database nodes collapse.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-purple-500 shrink-0 mt-0.5" />
                <span><strong>Ultra-Low Latency</strong>: Redirection reads must complete in under 50ms.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-purple-500 shrink-0 mt-0.5" />
                <span><strong>Read-Heavy Workload</strong>: 100:1 Read to Write ratio (100 redirects per 1 short URL created).</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Capacity Estimations */}
        <div className="p-4 rounded-2xl bg-slate-900 text-white dark:bg-zinc-900 border border-slate-800 space-y-3 font-mono text-xs">
          <p className="font-bold text-amber-400 uppercase tracking-wider text-[11px]">
            Back-of-the-Envelope Capacity Estimations:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-3 rounded-xl bg-slate-800 dark:bg-zinc-950 border border-slate-700 dark:border-zinc-800">
              <span className="text-slate-400 block text-[10px]">Writes / Traffic</span>
              <span className="text-base font-bold text-blue-400">500M / day</span>
              <span className="text-[10px] text-slate-400 block">~5,800 writes/sec</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-800 dark:bg-zinc-950 border border-slate-700 dark:border-zinc-800">
              <span className="text-slate-400 block text-[10px]">Reads / Redirection</span>
              <span className="text-base font-bold text-emerald-400">50B / day</span>
              <span className="text-[10px] text-slate-400 block">~580,000 reads/sec</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-800 dark:bg-zinc-950 border border-slate-700 dark:border-zinc-800">
              <span className="text-slate-400 block text-[10px]">5-Year Storage Needed</span>
              <span className="text-base font-bold text-purple-400">~45 Terabytes</span>
              <span className="text-[10px] text-slate-400 block">500B per URL record</span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: ANIMATED SVG FLOW DIAGRAM */}
      <section className="space-y-3" id="hld-url-shortener-flow-diagram">
        <div className="flex items-center gap-2 text-slate-900 dark:text-white px-2">
          <Layers className="w-5 h-5 text-blue-500" />
          <h2 className="text-lg font-bold">2. System Architecture Flow Diagram</h2>
        </div>
        <AnimatedUrlShortenerDiagram />
      </section>

      {/* SECTION 3: SYSTEM COMPONENT BLUEPRINT */}
      <section className="p-6 rounded-3xl bg-white border border-slate-200 dark:bg-zinc-950 dark:border-zinc-800 space-y-6" id="hld-url-shortener-components">
        <div className="flex items-center gap-2 text-slate-900 dark:text-white border-b border-slate-100 dark:border-zinc-900 pb-3">
          <Cpu className="w-5 h-5 text-indigo-500" />
          <h2 className="text-lg font-bold">3. System Component Blueprint</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-zinc-900/80 border border-slate-200 dark:border-zinc-800 space-y-2">
            <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold text-xs">
              <ShieldCheck className="w-4 h-4" />
              <span>API Gateway & Rate Limiter</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed">
              Handles SSL termination, rate-limiting (Token Bucket in Redis) to block malicious bots, and routes HTTP requests.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-zinc-900/80 border border-slate-200 dark:border-zinc-800 space-y-2">
            <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-bold text-xs">
              <Key className="w-4 h-4" />
              <span>Key Generation Service (KGS)</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed">
              Pre-generates 6-character unique Base62 keys asynchronously and keeps two tables in memory (used & unused keys) to eliminate runtime hashing collisions.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-zinc-900/80 border border-slate-200 dark:border-zinc-800 space-y-2">
            <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-xs">
              <Zap className="w-4 h-4" />
              <span>Redis Distributed Cache</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed">
              Stores hot short-to-long URL mappings in memory using LRU (Least Recently Used) eviction. Handles 80-90% of all read redirection traffic.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-zinc-900/80 border border-slate-200 dark:border-zinc-800 space-y-2">
            <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400 font-bold text-xs">
              <Database className="w-4 h-4" />
              <span>Cassandra NoSQL Database</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed">
              Columnar NoSQL store partitioned by <code className="text-purple-500 font-mono">short_key</code>. Handles high write throughput with LSM trees and zero single point of failure.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-zinc-900/80 border border-slate-200 dark:border-zinc-800 space-y-2">
            <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400 font-bold text-xs">
              <Server className="w-4 h-4" />
              <span>URL Shortener Service</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed">
              Stateless application servers horizontally scaled behind a Layer 7 Load Balancer to execute short-code lookups and redirection logic.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-zinc-900/80 border border-slate-200 dark:border-zinc-800 space-y-2">
            <div className="flex items-center gap-2 text-teal-600 dark:text-teal-400 font-bold text-xs">
              <Globe className="w-4 h-4" />
              <span>CDN Edge Cache</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed">
              Geographically distributed edge nodes caching popular redirection URLs closest to end users.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 4: KEY CONCEPTS & TRADE-OFFS */}
      <section className="p-6 rounded-3xl bg-white border border-slate-200 dark:bg-zinc-950 dark:border-zinc-800 space-y-6" id="hld-url-shortener-strengths-disadvantages">
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
              <li>• <strong>Zero Collision Latency</strong>: Pre-generated Key Generation Service (KGS) removes runtime MD5 hash collision loops completely.</li>
              <li>• <strong>O(1) Memory Lookups</strong>: Redis LRU cache handles &gt;85% of reads in &lt;2ms without touching disk.</li>
              <li>• <strong>Linear Scalability</strong>: Masterless Cassandra NoSQL cluster allows seamless write scaling simply by adding nodes.</li>
            </ul>
          </div>

          {/* Disadvantages & Bottlenecks */}
          <div className="p-5 rounded-2xl bg-rose-50/50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/40 space-y-3">
            <div className="flex items-center gap-2 text-rose-700 dark:text-rose-400 font-bold text-xs">
              <AlertTriangle className="w-4 h-4" />
              <span>Disadvantages & Failure Risks</span>
            </div>
            <ul className="space-y-2 text-xs text-slate-700 dark:text-zinc-300">
              <li>• <strong>KGS Single Point of Failure (SPOF)</strong>: If KGS crashes while server buffers run empty, link creation halts unless standby KGS nodes take over.</li>
              <li>• <strong>Key Waste on Crash</strong>: When a URL service instance crashes, its loaded in-memory buffer of 5,000 keys is lost forever.</li>
              <li>• <strong>Cache Stampede</strong>: High viral link requests during cache eviction can overwhelm Cassandra if not protected by Mutex/SingleFlight locks.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* AdSense Banner */}
      <AdBanner adSlot="9876543210" />

      {/* SECTION 5: DEEP TECH INTERVIEW Q&A */}
      <section className="p-6 rounded-3xl bg-white border border-slate-200 dark:bg-zinc-950 dark:border-zinc-800 space-y-6" id="hld-url-shortener-qa">
        <div className="flex items-center gap-2 text-slate-900 dark:text-white border-b border-slate-100 dark:border-zinc-900 pb-3">
          <HelpCircle className="w-5 h-5 text-indigo-500" />
          <h2 className="text-lg font-bold">5. Deep Tech Interview Q&A: Datastore Selection & Trade-offs</h2>
        </div>

        <div className="space-y-6 text-xs sm:text-sm text-slate-700 dark:text-zinc-300 leading-relaxed">
          {/* Question 1: Why Cassandra over Relational DB (MySQL/PostgreSQL)? */}
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 space-y-3">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-500 font-mono text-xs">Q1</span>
              Why use Apache Cassandra instead of MySQL or PostgreSQL for storage?
            </h3>
            <div className="space-y-2 text-xs leading-relaxed text-slate-600 dark:text-zinc-400">
              <p>
                <strong>1. Write Pattern & Throughput</strong>: URL shorteners are write-heavy during key creation, requiring low-latency inserts. Cassandra uses an <strong>LSM-Tree (Log-Structured Merge Tree)</strong> architecture that writes sequentially to Memtable and CommitLog in memory, resulting in ultra-fast O(1) writes. MySQL relies on B+ Trees, which require random disk I/O and page re-balancing.
              </p>
              <p>
                <strong>2. No Joins Required</strong>: A URL shortener database schema is a simple Key-Value pair mapping (<code className="font-mono text-purple-400">short_key → long_url, user_id, created_at</code>). Relational ACID guarantees and foreign key joins are unnecessary overhead.
              </p>
              <p>
                <strong>3. Masterless Ring Architecture</strong>: Cassandra has no single master node. Any node can accept read/write requests, preventing single point of failure outages during peak viral traffic.
              </p>
            </div>
          </div>

          {/* Question 2: Why MySQL over MongoDB (or vice versa)? */}
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 space-y-3">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-500 font-mono text-xs">Q2</span>
              If forced to choose between MySQL vs MongoDB for a URL Shortener, which is better and why?
            </h3>
            <div className="space-y-2 text-xs leading-relaxed text-slate-600 dark:text-zinc-400">
              <p>
                <strong>MongoDB Win (NoSQL Document Store)</strong>: MongoDB is preferable over MySQL for TinyURL because:
              </p>
              <ul className="list-disc pl-4 space-y-1">
                <li>MongoDB auto-shards data easily using a hash-based shard key on <code className="font-mono text-amber-400">short_key</code>.</li>
                <li>MongoDB documents allow flexible metadata fields (e.g., custom tracking tags, expiration dates) without schema migration locks.</li>
              </ul>
              <p>
                <strong>MySQL Limitations</strong>: Scaling MySQL requires complex manual application-level sharding (Vitess/ProxySQL) and replication lag issues between primary and secondary nodes.
              </p>
            </div>
          </div>

          {/* Question 3: Why Redis vs Memcached? */}
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 space-y-3">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-500 font-mono text-xs">Q3</span>
              Why use Redis over Memcached for the caching layer?
            </h3>
            <div className="space-y-2 text-xs leading-relaxed text-slate-600 dark:text-zinc-400">
              <p>
                <strong>1. Data Structures & LRU Eviction</strong>: Redis supports Hashes and Sorted Sets with native LRU/LFU memory eviction.
              </p>
              <p>
                <strong>2. Redis Lua Scripting for Rate Limiting</strong>: Redis can execute atomic Lua scripts to handle API Rate Limiting alongside URL caching in the same cluster.
              </p>
              <p>
                <strong>3. Persistence (AOF/RDB)</strong>: Unlike Memcached (which loses all cached links on server reboot), Redis can persist hot data snapshots to disk so cache warming after a reboot is instant.
              </p>
            </div>
          </div>
        </div>
      </section>
    </article>
  );
};

export default UrlShortenerPage;
