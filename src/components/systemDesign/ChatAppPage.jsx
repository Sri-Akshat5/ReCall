import React from "react";
import { useNavigate } from "react-router-dom";
import { 
  ArrowLeft, 
  MessageSquare, 
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
  Wifi,
  HelpCircle,
  AlertTriangle,
  Check
} from "lucide-react";
import AnimatedChatAppDiagram from "./AnimatedChatAppDiagram";
import AdBanner from "../common/AdBanner";

export const ChatAppPage = () => {
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
          onClick={() => navigate("/system-design/lld-3")}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-600 dark:text-purple-400 hover:bg-purple-500/20 text-xs font-bold transition cursor-pointer"
        >
          <Cpu className="w-4 h-4" />
          <span>View Low-Level Design (LLD & OOD)</span>
        </button>
      </div>

      {/* Title Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 dark:bg-zinc-950 dark:border-zinc-800 space-y-4">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-xs font-mono font-bold uppercase tracking-wider">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>High-Level Design (HLD)</span>
          </div>

          <div className="flex items-center gap-1.5 flex-wrap">
            {["Meta", "Telegram", "Discord", "Slack", "WeChat"].map((c, i) => (
              <span key={i} className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-md bg-slate-100 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 text-slate-700 dark:text-zinc-300 font-medium">
                <Building2 className="w-2.5 h-2.5 text-slate-400" />
                {c}
              </span>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Design a Chat Application (WhatsApp / Telegram)
          </h1>
          <p className="text-slate-600 dark:text-zinc-400 text-xs sm:text-sm max-w-3xl leading-relaxed">
            Designing a real-time, end-to-end encrypted messaging platform capable of delivering 50 Billion messages daily with sub-100ms latency, persistent WebSocket connections, and 99.999% availability.
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
            <h3 className="text-xs font-mono uppercase font-bold text-blue-600 dark:text-blue-400">
              Functional Requirements
            </h3>
            <ul className="space-y-2 text-xs text-slate-700 dark:text-zinc-300">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>Supports 1-on-1 real-time text messaging and group chats (up to 500 members).</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>Delivered status indicators: Single Check ✓ (Sent), Double Check ✓✓ (Delivered), Blue Double Check ✓✓ (Read).</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>Online/Offline User Presence status with last seen timestamps.</span>
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
                <span><strong>Real-time Low Latency (&lt;100ms)</strong>: Instant message delivery across global connections.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-purple-500 shrink-0 mt-0.5" />
                <span><strong>End-to-End Encryption (E2EE)</strong>: Zero plain-text message storage on server disks.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-purple-500 shrink-0 mt-0.5" />
                <span><strong>High Throughput Writes</strong>: Handling 500,000+ incoming message writes per second.</span>
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
              <span className="text-slate-400 block text-[10px]">Daily Active Users</span>
              <span className="text-base font-bold text-blue-400">500 Million</span>
              <span className="text-[10px] text-slate-400 block">~50 Billion msgs/day</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-800 dark:bg-zinc-950 border border-slate-700 dark:border-zinc-800">
              <span className="text-slate-400 block text-[10px]">Write Throughput</span>
              <span className="text-base font-bold text-emerald-400">~580,000 wps</span>
              <span className="text-[10px] text-slate-400 block">Peak 1.2M wps</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-800 dark:bg-zinc-950 border border-slate-700 dark:border-zinc-800">
              <span className="text-slate-400 block text-[10px]">Daily Storage Needed</span>
              <span className="text-base font-bold text-purple-400">~25 Terabytes/day</span>
              <span className="text-[10px] text-slate-400 block">500 bytes per encrypted payload</span>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 2: ANIMATED SVG DIAGRAM */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-slate-900 dark:text-white px-2">
          <Layers className="w-5 h-5 text-blue-500" />
          <h2 className="text-lg font-bold">2. System Architecture Flow Diagram</h2>
        </div>
        <AnimatedChatAppDiagram />
      </div>

      {/* SECTION 3: SYSTEM BLUEPRINT & COMPONENTS */}
      <div className="p-6 rounded-3xl bg-white border border-slate-200 dark:bg-zinc-950 dark:border-zinc-800 space-y-6">
        <div className="flex items-center gap-2 text-slate-900 dark:text-white border-b border-slate-100 dark:border-zinc-900 pb-3">
          <Cpu className="w-5 h-5 text-indigo-500" />
          <h2 className="text-lg font-bold">3. Component Architecture Blueprint</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-zinc-900/80 border border-slate-200 dark:border-zinc-800 space-y-2">
            <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold text-xs">
              <Wifi className="w-4 h-4" />
              <span>WebSocket Gateway Cluster</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed">
              Maintains persistent, full-duplex TCP connections with active mobile/desktop clients. Distributes messages instantly to connected receivers.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-zinc-900/80 border border-slate-200 dark:border-zinc-800 space-y-2">
            <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400 font-bold text-xs">
              <Database className="w-4 h-4" />
              <span>Cassandra NoSQL Storage</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed">
              Stores encrypted chat history partitioned by <code className="text-purple-500 font-mono">chat_id</code> with clustering key <code className="text-purple-500 font-mono">message_id</code> for sequential retrieval.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-zinc-900/80 border border-slate-200 dark:border-zinc-800 space-y-2">
            <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-bold text-xs">
              <Zap className="w-4 h-4" />
              <span>User Presence Service</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed">
              Tracks online/offline status using periodic client heartbeat pings (e.g. every 5 seconds) stored in Redis with 10-second key expiration.
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
              <li>• <strong>Bi-Directional Instant Push</strong>: WebSockets eliminate polling overhead, reducing latency to &lt;50ms.</li>
              <li>• <strong>Massive Write Scale</strong>: Cassandra LSM Trees handle 1 Million+ writes/sec cleanly without table lock contention.</li>
              <li>• <strong>Decoupled Presence Service</strong>: Redis TTL heartbeats ensure presence tracking never slows down message delivery.</li>
            </ul>
          </div>

          {/* Disadvantages */}
          <div className="p-5 rounded-2xl bg-rose-50/50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/40 space-y-3">
            <div className="flex items-center gap-2 text-rose-700 dark:text-rose-400 font-bold text-xs">
              <AlertTriangle className="w-4 h-4" />
              <span>Disadvantages & Failure Risks</span>
            </div>
            <ul className="space-y-2 text-xs text-slate-700 dark:text-zinc-300">
              <li>• <strong>Stateful Gateway Overhead</strong>: WebSockets are stateful, requiring sticky sessions or a central session lookup (Redis) when Gateway nodes restart.</li>
              <li>• <strong>Group Chat Fan-out Storms</strong>: Sending a message to a 500-user group requires 500 separate WebSocket pushes (Message Amplification).</li>
              <li>• <strong>APNs/FCM Push Latency for Offline Users</strong>: Push notifications rely on third-party Apple/Google servers, introducing occasional delays.</li>
            </ul>
          </div>
        </div>
      </div>

      <AdBanner adSlot="9876543212" />

      {/* SECTION 5: DEEP TECH INTERVIEW Q&A */}
      <div className="p-6 rounded-3xl bg-white border border-slate-200 dark:bg-zinc-950 dark:border-zinc-800 space-y-6">
        <div className="flex items-center gap-2 text-slate-900 dark:text-white border-b border-slate-100 dark:border-zinc-900 pb-3">
          <HelpCircle className="w-5 h-5 text-blue-500" />
          <h2 className="text-lg font-bold">5. Deep Tech Interview Q&A: Datastore & Protocol Selection</h2>
        </div>

        <div className="space-y-6 text-xs sm:text-sm text-slate-700 dark:text-zinc-300 leading-relaxed">
          {/* Question 1: Why Cassandra over MySQL for Chat App? */}
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 space-y-3">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-purple-500/10 text-purple-500 font-mono text-xs">Q1</span>
              Why use Apache Cassandra instead of MySQL or PostgreSQL for Chat Message Storage?
            </h3>
            <div className="space-y-2 text-xs leading-relaxed text-slate-600 dark:text-zinc-400">
              <p>
                <strong>1. Write-to-Read Ratio</strong>: Chat applications are overwhelmingly write-heavy (1:1 write:read ratio). Cassandra uses an <strong>LSM-Tree</strong> engine where writes are append-only into memory (Memtable) and sequential logs, making writes extremely fast.
              </p>
              <p>
                <strong>2. Partition Key Design</strong>: Chat messages are fetched by <code className="font-mono text-purple-400">chat_id</code> sorted by timestamp. Partitioning Cassandra by <code className="font-mono text-purple-400">PARTITION KEY (chat_id) CLUSTERING KEY (message_id DESC)</code> guarantees contiguous disk reads for chat history without expensive relational joins.
              </p>
              <p>
                <strong>3. Linear Horizontal Scaling</strong>: WhatsApp scaled to 2 Billion users using Cassandra-like distributed NoSQL engines because scaling relational DBs past 10TB requires complex manual database sharding.
              </p>
            </div>
          </div>

          {/* Question 2: Why WebSockets over HTTP Long Polling? */}
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 space-y-3">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-500 font-mono text-xs">Q2</span>
              Why choose WebSockets over HTTP Long Polling or Server-Sent Events (SSE)?
            </h3>
            <div className="space-y-2 text-xs leading-relaxed text-slate-600 dark:text-zinc-400">
              <p>
                <strong>WebSockets (Bi-directional)</strong>: WebSockets maintain a persistent TCP socket allowing both client and server to push messages instantly with zero HTTP header overhead (&lt;2 bytes framing vs 500+ bytes HTTP header).
              </p>
              <p>
                <strong>HTTP Long Polling (Inefficient)</strong>: Holds HTTP connection open until a message arrives. Re-establishing TCP/TLS handshakes repeatedly consumes massive CPU and battery on mobile devices.
              </p>
            </div>
          </div>

          {/* Question 3: How does User Presence work cleanly at 500M scale? */}
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 space-y-3">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-500 font-mono text-xs">Q3</span>
              How do you prevent Presence Service (Online Status) from crashing your database?
            </h3>
            <div className="space-y-2 text-xs leading-relaxed text-slate-600 dark:text-zinc-400">
              <p>
                Clients send a lightweight heartbeat ping every 5 seconds to Redis: <code className="font-mono text-amber-400">SET presence:user_123 "online" EX 10</code>.
              </p>
              <p>
                If the user loses internet connection, the Redis key automatically expires in 10 seconds, marking them "offline" with zero database cleanup queries required!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatAppPage;
