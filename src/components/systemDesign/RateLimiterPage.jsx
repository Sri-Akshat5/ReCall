import React from "react";
import { useNavigate } from "react-router-dom";
import { 
  ArrowLeft, 
  ShieldCheck, 
  Zap, 
  Database, 
  Server, 
  Cpu, 
  Building2, 
  Sparkles, 
  Layers, 
  CheckCircle2, 
  Lock, 
  BookOpen,
  HelpCircle,
  AlertTriangle,
  Check
} from "lucide-react";
import AnimatedRateLimiterDiagram from "./AnimatedRateLimiterDiagram";
import AdBanner from "../common/AdBanner";

export const RateLimiterPage = () => {
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
          onClick={() => navigate("/system-design/lld-2")}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-600 dark:text-purple-400 hover:bg-purple-500/20 text-xs font-bold transition cursor-pointer"
        >
          <Cpu className="w-4 h-4" />
          <span>View Low-Level Design (LLD & OOD)</span>
        </button>
      </div>

      {/* Title Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 dark:bg-zinc-950 dark:border-zinc-800 space-y-4">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-600 dark:text-purple-400 text-xs font-mono font-bold uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>High-Level Design (HLD)</span>
          </div>

          <div className="flex items-center gap-1.5 flex-wrap">
            {["Stripe", "Twitter", "Google", "AWS", "Cloudflare"].map((c, i) => (
              <span key={i} className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-md bg-slate-100 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 text-slate-700 dark:text-zinc-300 font-medium">
                <Building2 className="w-2.5 h-2.5 text-slate-400" />
                {c}
              </span>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Design an API Rate Limiter
          </h1>
          <p className="text-slate-600 dark:text-zinc-400 text-xs sm:text-sm max-w-3xl leading-relaxed">
            Architecting a high-throughput distributed rate limiter to process millions of requests per second, prevent API abuse, safeguard backend infrastructure from DDoS spikes, and return HTTP 429 Too Many Requests.
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
            <h3 className="text-xs font-mono uppercase font-bold text-purple-600 dark:text-purple-400">
              Functional Requirements
            </h3>
            <ul className="space-y-2 text-xs text-slate-700 dark:text-zinc-300">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>Limit requests based on client IP address, User ID, or API Key token.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>Return HTTP 429 status code with standard response header (<code className="bg-slate-200 dark:bg-zinc-800 px-1 rounded">X-Ratelimit-Retry-After: 30</code>).</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>Support configurable rules (e.g. 100 requests / minute for free tier vs 5,000 requests / minute for enterprise tier).</span>
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
                <span><strong>Ultra-Low Latency (&lt;2ms)</strong>: Rate limiter middleware must add negligible overhead to API response times.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                <span><strong>Atomic Concurrency</strong>: Prevent race conditions across multi-threaded and distributed application clusters.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                <span><strong>High Fault Tolerance</strong>: If rate limiter cache fails, degrade gracefully (fail open or default allow).</span>
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
              <span className="text-slate-400 block text-[10px]">Active Users / Day</span>
              <span className="text-base font-bold text-purple-400">10 Million</span>
              <span className="text-[10px] text-slate-400 block">~100 Million daily API calls</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-800 dark:bg-zinc-950 border border-slate-700 dark:border-zinc-800">
              <span className="text-slate-400 block text-[10px]">Peak Throughput</span>
              <span className="text-base font-bold text-emerald-400">~25,000 req/sec</span>
              <span className="text-[10px] text-slate-400 block">Requires distributed Redis cluster</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-800 dark:bg-zinc-950 border border-slate-700 dark:border-zinc-800">
              <span className="text-slate-400 block text-[10px]">Redis Memory Footprint</span>
              <span className="text-base font-bold text-blue-400">~1.2 Gigabytes</span>
              <span className="text-[10px] text-slate-400 block">64 bytes per user key (TTL 60s)</span>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 2: ANIMATED SVG DIAGRAM */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-slate-900 dark:text-white px-2">
          <Layers className="w-5 h-5 text-purple-500" />
          <h2 className="text-lg font-bold">2. System Architecture Flow Diagram</h2>
        </div>
        <AnimatedRateLimiterDiagram />
      </div>

      {/* SECTION 3: KEY ALGORITHMS COMPARISON */}
      <div className="p-6 rounded-3xl bg-white border border-slate-200 dark:bg-zinc-950 dark:border-zinc-800 space-y-6">
        <div className="flex items-center gap-2 text-slate-900 dark:text-white border-b border-slate-100 dark:border-zinc-900 pb-3">
          <Zap className="w-5 h-5 text-amber-500" />
          <h2 className="text-lg font-bold">3. Core Rate Limiting Algorithms Trade-offs</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 space-y-2">
            <h3 className="text-xs font-mono font-bold text-purple-600 dark:text-purple-400 uppercase">
              1. Token Bucket Algorithm
            </h3>
            <p className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed">
              <strong>Pros</strong>: Allows brief bursty traffic up to bucket capacity while maintaining steady refill rate.<br />
              <strong>Cons</strong>: Requires tracking refill timestamp and token count per user in memory. Used by AWS and Stripe.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 space-y-2">
            <h3 className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400 uppercase">
              2. Sliding Window Log Algorithm
            </h3>
            <p className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed">
              <strong>Pros</strong>: Highly accurate; eliminates boundary edge spikes.<br />
              <strong>Cons</strong>: High memory footprint because every request timestamp is saved into a Redis Sorted Set (<code className="text-blue-500 font-mono">ZADD</code>).
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 space-y-2">
            <h3 className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 uppercase">
              3. Fixed Window Counter Algorithm
            </h3>
            <p className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed">
              <strong>Pros</strong>: Memory efficient; requires simple Redis <code className="text-emerald-500 font-mono">INCR</code> and <code className="text-emerald-500 font-mono">EXPIRE</code>.<br />
              <strong>Cons</strong>: Traffic spikes at window boundaries can allow 2x requests within a short timeframe.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 space-y-2">
            <h3 className="text-xs font-mono font-bold text-rose-600 dark:text-rose-400 uppercase">
              4. Sliding Window Counter (Hybrid)
            </h3>
            <p className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed">
              Combines Fixed Window counter efficiency with Sliding Log accuracy by computing weighted average of current and previous window counts. Used by Cloudflare.
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
              <li>• <strong>Sub-millisecond Latency (&lt;1ms)</strong>: Redis in-memory atomic Lua scripts evaluate tokens without hitting disk database storage.</li>
              <li>• <strong>Zero Race Conditions</strong>: Single-threaded Redis event loop executes Lua scripts atomically across distributed application servers.</li>
              <li>• <strong>Flexible Hybrid Handling</strong>: Choice between Option 1 (Hard Drop + HTTP 429) or Option 2 (Soft Kafka Queueing).</li>
            </ul>
          </div>

          {/* Disadvantages */}
          <div className="p-5 rounded-2xl bg-rose-50/50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/40 space-y-3">
            <div className="flex items-center gap-2 text-rose-700 dark:text-rose-400 font-bold text-xs">
              <AlertTriangle className="w-4 h-4" />
              <span>Disadvantages & Bottlenecks</span>
            </div>
            <ul className="space-y-2 text-xs text-slate-700 dark:text-zinc-300">
              <li>• <strong>Redis Memory Overhead</strong>: Storing high-cardinality IP/User sliding window logs (<code className="font-mono text-purple-400">ZADD</code>) can consume hundreds of GBs of RAM.</li>
              <li>• <strong>Centralized Redis Bottleneck</strong>: Extreme global traffic bursts (&gt;500k req/sec) can cause Redis CPU contention unless sharded via Consistent Hashing.</li>
              <li>• <strong>Synchronization Lag in Multi-Region Setups</strong>: Cross-region Redis replication latencies (e.g. US East to EU West) can allow brief quota overspills.</li>
            </ul>
          </div>
        </div>
      </div>

      <AdBanner adSlot="9876543211" />

      {/* SECTION 5: DEEP TECH INTERVIEW Q&A */}
      <div className="p-6 rounded-3xl bg-white border border-slate-200 dark:bg-zinc-950 dark:border-zinc-800 space-y-6">
        <div className="flex items-center gap-2 text-slate-900 dark:text-white border-b border-slate-100 dark:border-zinc-900 pb-3">
          <HelpCircle className="w-5 h-5 text-purple-500" />
          <h2 className="text-lg font-bold">5. Deep Tech Interview Q&A: Tech Stack Selection & Justifications</h2>
        </div>

        <div className="space-y-6 text-xs sm:text-sm text-slate-700 dark:text-zinc-300 leading-relaxed">
          {/* Question 1: Why Redis Lua Scripts instead of application code lock? */}
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 space-y-3">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-purple-500/10 text-purple-500 font-mono text-xs">Q1</span>
              Why use Redis Lua scripts instead of performing read-increment logic in application code?
            </h3>
            <div className="space-y-2 text-xs leading-relaxed text-slate-600 dark:text-zinc-400">
              <p>
                <strong>Race Condition Elimination</strong>: If 10 concurrent requests reach 10 different API servers at the exact same millisecond, a standard application code approach would execute:
                <code className="block bg-zinc-800 text-amber-400 p-2 rounded my-1 font-mono">1. count = redis.get(user_id)<br/>2. if count &lt; limit then redis.set(user_id, count + 1)</code>
                All 10 servers would read <code className="font-mono text-zinc-200">count = 99</code>, allow the request, and set <code className="font-mono text-zinc-200">count = 100</code>, allowing 10 excess requests through!
              </p>
              <p>
                <strong>Redis Lua Atomicity</strong>: Redis executes Lua scripts on a single thread. The read, sliding window calculation, increment, and expiration happen in a single, uninterrupted atomic step inside Redis memory without network round-trips.
              </p>
            </div>
          </div>

          {/* Question 2: Why Redis over Relational DB (MySQL) for Rate Limiting? */}
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 space-y-3">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-500 font-mono text-xs">Q2</span>
              Why use Redis for Rate Limiting instead of MySQL or PostgreSQL?
            </h3>
            <div className="space-y-2 text-xs leading-relaxed text-slate-600 dark:text-zinc-400">
              <p>
                <strong>1. In-Memory Sub-Millisecond Speed</strong>: Rate limiting happens on <i>every single incoming API request</i> before business logic runs. MySQL disk I/O introduces 10-50ms latency per request, whereas Redis in-memory lookups finish in &lt;1ms.
              </p>
              <p>
                <strong>2. Auto-Expiring TTL Keys</strong>: Redis natively supports time-to-live expiration (<code className="font-mono text-blue-400">EXPIRE key 60</code>). In MySQL, deleting millions of expired window counter rows requires heavy background cleanup jobs that lock database tables.
              </p>
            </div>
          </div>

          {/* Question 3: What happens if Redis fails? Fail-Open vs Fail-Closed */}
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 space-y-3">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-rose-500/10 text-rose-500 font-mono text-xs">Q3</span>
              If the central Redis cluster crashes, should the rate limiter Fail-Open or Fail-Closed?
            </h3>
            <div className="space-y-2 text-xs leading-relaxed text-slate-600 dark:text-zinc-400">
              <p>
                <strong>Fail-Open (Default Allow)</strong>: Most consumer services (Twitter, Netflix) choose Fail-Open so user requests continue working even if rate limiting metrics are temporarily lost.
              </p>
              <p>
                <strong>Fail-Closed (Default Block)</strong>: Critical financial or security endpoints (Stripe payments, authentication/login password attempts) choose Fail-Closed to prevent fraud or brute-force attacks during cache outages.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RateLimiterPage;
