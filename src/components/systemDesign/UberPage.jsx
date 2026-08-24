import React from "react";
import { useNavigate } from "react-router-dom";
import { 
  ArrowLeft, 
  Car, 
  Zap, 
  Database, 
  Server, 
  Cpu, 
  Building2, 
  Sparkles, 
  Layers, 
  CheckCircle2, 
  Globe, 
  ShieldCheck, 
  BookOpen, 
  Navigation,
  HelpCircle,
  AlertTriangle,
  Check
} from "lucide-react";
import AnimatedUberDiagram from "./AnimatedUberDiagram";
import AdBanner from "../common/AdBanner";

export const UberPage = () => {
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
          onClick={() => navigate("/system-design/lld-5")}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-600 dark:text-purple-400 hover:bg-purple-500/20 text-xs font-bold transition cursor-pointer"
        >
          <Cpu className="w-4 h-4" />
          <span>View Low-Level Design (LLD & OOD)</span>
        </button>
      </div>

      {/* Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 dark:bg-zinc-950 dark:border-zinc-800 space-y-4">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-mono font-bold uppercase tracking-wider">
            <Car className="w-3.5 h-3.5" />
            <span>High-Level Design (HLD)</span>
          </div>

          <div className="flex items-center gap-1.5 flex-wrap">
            {["Uber", "Lyft", "Grab", "DoorDash"].map((c, i) => (
              <span key={i} className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-md bg-slate-100 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 text-slate-700 dark:text-zinc-300 font-medium">
                <Building2 className="w-2.5 h-2.5 text-slate-400" />
                {c}
              </span>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Design Uber / Lyft (Ride Sharing & Location Tracking)
          </h1>
          <p className="text-slate-600 dark:text-zinc-400 text-xs sm:text-sm max-w-3xl leading-relaxed">
            Architecting a real-time ride-matching platform processing 5 Million active driver GPS location updates every 4 seconds using Uber H3 Hexagonal indexing, WebSocket connections, and Ring Buffer dispatchers.
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
            <h3 className="text-xs font-mono uppercase font-bold text-emerald-600 dark:text-emerald-400">
              Functional Requirements
            </h3>
            <ul className="space-y-2 text-xs text-slate-700 dark:text-zinc-300">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>Drivers continuously stream GPS coordinates (latitude, longitude) every 4 seconds.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>Riders request a ride and get matched with nearest available driver within radius.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>Real-time ETA calculation and trip status tracking.</span>
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
                <span><strong>High Throughput Ingestion</strong>: Process 1,250,000 location pings per second.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                <span><strong>Ultra-Low Latency Matching</strong>: Match driver & rider in under 3 seconds.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                <span><strong>High Availability (99.99%)</strong>: Zero downtime during surge pricing events.</span>
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
              <span className="text-slate-400 block text-[10px]">Active Drivers</span>
              <span className="text-base font-bold text-emerald-400">5 Million</span>
              <span className="text-[10px] text-slate-400 block">Ping every 4 seconds</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-800 dark:bg-zinc-950 border border-slate-700 dark:border-zinc-800">
              <span className="text-slate-400 block text-[10px]">Location Writes / Sec</span>
              <span className="text-base font-bold text-blue-400">1.25 Million / sec</span>
              <span className="text-[10px] text-slate-400 block">Requires in-memory Geo index</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-800 dark:bg-zinc-950 border border-slate-700 dark:border-zinc-800">
              <span className="text-slate-400 block text-[10px]">Daily Trip Volume</span>
              <span className="text-base font-bold text-purple-400">20 Million rides</span>
              <span className="text-[10px] text-slate-400 block">~10TB GPS trajectory logs</span>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 2: ANIMATED SVG DIAGRAM */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-slate-900 dark:text-white px-2">
          <Layers className="w-5 h-5 text-emerald-500" />
          <h2 className="text-lg font-bold">2. Architecture Flow Diagram</h2>
        </div>
        <AnimatedUberDiagram />
      </div>

      {/* SECTION 3: COMPONENT BREAKDOWN */}
      <div className="p-6 rounded-3xl bg-white border border-slate-200 dark:bg-zinc-950 dark:border-zinc-800 space-y-6">
        <div className="flex items-center gap-2 text-slate-900 dark:text-white border-b border-slate-100 dark:border-zinc-900 pb-3">
          <Cpu className="w-5 h-5 text-indigo-500" />
          <h2 className="text-lg font-bold">3. System Component Blueprint & "Why Every Component is Required"</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-zinc-900/80 border border-slate-200 dark:border-zinc-800 space-y-2">
            <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-bold text-xs">
              <Navigation className="w-4 h-4" />
              <span>Uber H3 Hexagonal Grid Index</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed">
              <strong>Why Required?</strong> Standard QuadTrees require lock contention when updating nodes. Uber H3 partitions earth into fixed hexagonal cells, enabling O(1) lookup of neighboring cells within k-ring distance.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-zinc-900/80 border border-slate-200 dark:border-zinc-800 space-y-2">
            <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-xs">
              <Zap className="w-4 h-4" />
              <span>Redis Cluster (Geospatial)</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed">
              <strong>Why Required?</strong> Stores ephemeral driver locations using <code className="text-emerald-500 font-mono">GEOADD</code> / <code className="text-emerald-500 font-mono">GEORADIUS</code>. Handles 1.25M wps in-memory without hitting disk databases.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-zinc-900/80 border border-slate-200 dark:border-zinc-800 space-y-2">
            <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400 font-bold text-xs">
              <Server className="w-4 h-4" />
              <span>Matching & Dispatch Engine</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed">
              <strong>Why Required?</strong> Executes matching algorithms (Hungarian Algorithm / Ring Buffer) to pair rider requests with optimal nearby drivers based on ETA and rating.
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
              <li>• <strong>O(1) Hexagonal Neighbor Search</strong>: Uber H3 allows instant calculation of adjacent hexagons without rebuilding spatial trees.</li>
              <li>• <strong>In-Memory Spatial Indexing</strong>: Redis GEOADD handles 1.25M GPS pings/sec with sub-millisecond write latencies.</li>
              <li>• <strong>Dynamic Surge Pricing</strong>: Real-time supply/demand count per H3 cell enables instant fare adjustment.</li>
            </ul>
          </div>

          {/* Disadvantages */}
          <div className="p-5 rounded-2xl bg-rose-50/50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/40 space-y-3">
            <div className="flex items-center gap-2 text-rose-700 dark:text-rose-400 font-bold text-xs">
              <AlertTriangle className="w-4 h-4" />
              <span>Disadvantages & Failure Risks</span>
            </div>
            <ul className="space-y-2 text-xs text-slate-700 dark:text-zinc-300">
              <li>• <strong>GPS Drift & Tunnel Disconnection</strong>: Tunnel dead zones require Kalman Filtering to estimate driver position.</li>
              <li>• <strong>Thundering Herd on Match Acceptance</strong>: Sending a ride offer to multiple drivers simultaneously causes race conditions if lock timeouts expire.</li>
            </ul>
          </div>
        </div>
      </div>

      <AdBanner adSlot="9876543214" />

      {/* SECTION 5: DEEP TECH INTERVIEW Q&A */}
      <div className="p-6 rounded-3xl bg-white border border-slate-200 dark:bg-zinc-950 dark:border-zinc-800 space-y-6">
        <div className="flex items-center gap-2 text-slate-900 dark:text-white border-b border-slate-100 dark:border-zinc-900 pb-3">
          <HelpCircle className="w-5 h-5 text-emerald-500" />
          <h2 className="text-lg font-bold">5. Deep Tech Interview Q&A: Geospatial & Datastore Choices</h2>
        </div>

        <div className="space-y-6 text-xs sm:text-sm text-slate-700 dark:text-zinc-300 leading-relaxed">
          {/* Question 1: Why Uber H3 Hexagons over QuadTree or Geohash? */}
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 space-y-3">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-500 font-mono text-xs">Q1</span>
              Why use Uber H3 Hexagons instead of traditional QuadTrees or Geohash string prefixes?
            </h3>
            <div className="space-y-2 text-xs leading-relaxed text-slate-600 dark:text-zinc-400">
              <p>
                <strong>1. Equal Neighbor Distance</strong>: In a square grid (Geohash/QuadTree), a cell has 8 neighbors, but diagonal neighbors are <code className="font-mono text-amber-400">√2 (1.414x)</code> further away than cardinal neighbors. Hexagons have 6 neighbors that are all at the exact same distance from the center point, making radius expansion calculations mathematically accurate.
              </p>
              <p>
                <strong>2. Lock-free Updates</strong>: QuadTrees require locking parent/child tree nodes when drivers move across boundaries. H3 cells convert Lat/Long to a 64-bit integer index instantly in memory without tree locking.
              </p>
            </div>
          </div>

          {/* Question 2: Why Redis GEOADD over PostgreSQL PostGIS? */}
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 space-y-3">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-500 font-mono text-xs">Q2</span>
              Why use Redis GEOADD for live driver tracking instead of PostgreSQL PostGIS?
            </h3>
            <div className="space-y-2 text-xs leading-relaxed text-slate-600 dark:text-zinc-400">
              <p>
                PostGIS is powerful for static GIS queries (e.g. city boundaries). However, executing 1,250,000 <code className="font-mono text-blue-400">UPDATE</code> queries/sec on PostgreSQL disk tables creates catastrophic WAL log disk I/O. Redis handles ephemeral GPS updates in RAM at 1M+ writes/sec with &lt;1ms latency.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UberPage;
