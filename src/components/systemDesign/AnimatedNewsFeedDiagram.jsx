import React, { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { SiRedis, SiApachecassandra, SiNeo4J } from "react-icons/si";
import { FaUser, FaStar, FaServer, FaProjectDiagram, FaDatabase } from "react-icons/fa";

export const AnimatedNewsFeedDiagram = () => {
  const [feedState, setFeedState] = useState("push"); // "push" or "pull"

  return (
    <div className="my-6 p-6 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-4 select-none font-sans">
      {/* Header Bar */}
      <div className="flex items-center justify-between border-b border-zinc-900 pb-3 flex-wrap gap-3">
        <span className="text-xs font-mono font-bold text-white uppercase tracking-wider flex items-center gap-2">
          <span className={`w-2.5 h-2.5 rounded-full animate-ping ${feedState === "push" ? "bg-indigo-400" : "bg-amber-400"}`}></span>
          Social News Feed Architecture (Hybrid Fan-Out)
        </span>

        {/* Interactive Mode Switches */}
        <div className="flex items-center gap-1.5 bg-zinc-900 p-1 rounded-xl border border-zinc-800 flex-wrap">
          <button
            onClick={() => setFeedState("push")}
            className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition cursor-pointer ${
              feedState === "push"
                ? "bg-indigo-600 text-white"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            1. Fan-out on Write (Push for Normal Users)
          </button>
          <button
            onClick={() => setFeedState("pull")}
            className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition cursor-pointer ${
              feedState === "pull"
                ? "bg-amber-600 text-white"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            2. Fan-out on Read (Pull for Celebrities &gt;1M)
          </button>
        </div>
      </div>

      {/* SVG Canvas (900 x 480) */}
      <svg viewBox="0 0 900 480" className="w-full h-auto text-zinc-100 font-mono">
        <defs>
          <linearGradient id="feedIndigo" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#818cf8" />
            <stop offset="100%" stopColor="#6366f1" />
          </linearGradient>

          <linearGradient id="feedAmber" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#fbbf24" />
            <stop offset="100%" stopColor="#f59e0b" />
          </linearGradient>

          <linearGradient id="blueDottedGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="100%" stopColor="#60a5fa" />
          </linearGradient>
        </defs>

        {/* 1. AUTHOR CLIENT NODE */}
        <rect x="30" y="195" width="130" height="90" rx="14" fill="#09090b" stroke="#38bdf8" strokeWidth="1.5" />
        <foreignObject x="40" y="205" width="110" height="30">
          <div className="flex items-center justify-center text-sky-400">
            {feedState === "push" ? <FaUser className="w-4 h-4 text-indigo-400" /> : <FaStar className="w-4 h-4 text-amber-400" />}
          </div>
        </foreignObject>
        <text x="95" y="245" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="bold">Author App</text>
        <rect x="45" y="252" width="100" height="22" rx="4" fill="#18181b" stroke="#27272a" />
        <text x="95" y="267" textAnchor="middle" fill="#38bdf8" fontSize="9" fontWeight="bold">
          {feedState === "push" ? "Normal (<1k)" : "Celebrity (>1M)"}
        </text>

        {/* PATH: AUTHOR -> POST GATEWAY */}
        <path d="M 160 240 L 270 240" stroke="url(#blueDottedGrad)" strokeWidth="2.5" strokeDasharray="4 4">
          <animate attributeName="stroke-dashoffset" from="8" to="0" dur="0.8s" repeatCount="indefinite" />
        </path>

        {/* 2. POST INGESTION GATEWAY */}
        <polygon 
          points="320,185 390,185 435,240 390,295 320,295 275,240" 
          fill="#09090b" 
          stroke="#6366f1" 
          strokeWidth="2" 
        />
        <foreignObject x="335" y="200" width="40" height="30">
          <div className="flex items-center justify-center text-indigo-400">
            <FaServer className="w-5 h-5" />
          </div>
        </foreignObject>
        <text x="355" y="242" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">Post Ingest</text>
        <text x="355" y="258" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold">Service</text>

        {/* TOP BRANCH: GRAPH DB */}
        <path d="M 400 200 L 520 100" stroke="url(#blueDottedGrad)" strokeWidth="2" strokeDasharray="4 4">
          <animate attributeName="stroke-dashoffset" from="8" to="0" dur="0.8s" repeatCount="indefinite" />
        </path>

        <path d="M 640 100 L 700 100" stroke="url(#blueDottedGrad)" strokeWidth="2" strokeDasharray="4 4">
          <animate attributeName="stroke-dashoffset" from="8" to="0" dur="0.8s" repeatCount="indefinite" />
        </path>

        {/* FOLLOWER CACHE NODE */}
        <rect x="700" y="75" width="120" height="50" rx="10" fill="#18181b" stroke="#38bdf8" strokeWidth="1.5" />
        <foreignObject x="710" y="82" width="20" height="20">
          <div className="text-sky-400">
            <FaDatabase className="w-4 h-4" />
          </div>
        </foreignObject>
        <text x="760" y="98" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">Follower Cache</text>

        {/* GRAPH DB NODE WITH REACT-ICON */}
        <rect x="520" y="75" width="120" height="50" rx="10" fill="#09090b" stroke="#38bdf8" strokeWidth="1.5" />
        <foreignObject x="530" y="82" width="20" height="20">
          <div className="text-emerald-400">
            <SiNeo4J className="w-5 h-5" />
          </div>
        </foreignObject>
        <text x="580" y="98" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="bold">Graph DB</text>

        {/* MIDDLE BRANCH: REDIS TIMELINES */}
        <path 
          d="M 435 240 L 520 240" 
          stroke={feedState === "push" ? "url(#feedIndigo)" : "#3f3f46"} 
          strokeWidth={feedState === "push" ? "3" : "1.5"} 
          strokeDasharray="4 4"
        >
          {feedState === "push" && (
            <animate attributeName="stroke-dashoffset" from="8" to="0" dur="0.8s" repeatCount="indefinite" />
          )}
        </path>

        {/* REDIS TIMELINES NODE WITH REACT-ICON */}
        <rect 
          x="520" y="210" width="140" height="60" rx="10" 
          fill="#1e1b4b" 
          stroke={feedState === "push" ? "#818cf8" : "#6366f1"} 
          strokeWidth={feedState === "push" ? "2" : "1"} 
        />
        <foreignObject x="532" y="222" width="24" height="24">
          <div className="text-red-500">
            <SiRedis className="w-6 h-6" />
          </div>
        </foreignObject>
        <text x="600" y="238" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">Redis Timelines</text>
        <text x="600" y="254" textAnchor="middle" fill="#c7d2fe" fontSize="8">ZADD user_feed post_id</text>

        {/* LOWER BRANCH: CELEBRITY STORE */}
        <path 
          d="M 410 270 L 520 330" 
          stroke={feedState === "pull" ? "url(#feedAmber)" : "#3f3f46"} 
          strokeWidth={feedState === "pull" ? "2.5" : "1.5"} 
          strokeDasharray="4 4"
        >
          {feedState === "pull" && (
            <animate attributeName="stroke-dashoffset" from="8" to="0" dur="0.8s" repeatCount="indefinite" />
          )}
        </path>

        <rect x="520" y="305" width="140" height="55" rx="10" fill="#451a03" stroke="#f59e0b" strokeWidth="1.5" />
        <foreignObject x="532" y="315" width="24" height="24">
          <div className="text-amber-400">
            <FaStar className="w-5 h-5" />
          </div>
        </foreignObject>
        <text x="600" y="332" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="bold">Celebrity Store</text>
        <text x="600" y="348" textAnchor="middle" fill="#fde68a" fontSize="8">Bypasses Write Explosion</text>

        {/* BOTTOM BRANCH: CASSANDRA DB WITH REACT-ICON */}
        <path d="M 355 295 L 355 420 L 700 420" stroke="#38bdf8" strokeWidth="2" strokeDasharray="4 4">
          <animate attributeName="stroke-dashoffset" from="8" to="0" dur="0.8s" repeatCount="indefinite" />
        </path>
        <g transform="translate(700, 395)">
          <rect x="0" y="0" width="140" height="50" rx="10" fill="#09090b" stroke="#38bdf8" strokeWidth="1.5" />
          <foreignObject x="15" y="13" width="24" height="24">
            <div className="text-sky-400">
              <SiApachecassandra className="w-6 h-6" />
            </div>
          </foreignObject>
          <text x="78" y="24" textAnchor="middle" fill="#38bdf8" fontSize="10" fontWeight="bold">Cassandra DB</text>
          <text x="78" y="38" textAnchor="middle" fill="#71717a" fontSize="8">Post Store</text>
        </g>
      </svg>

      {/* Footer Details */}
      <div className="pt-3 border-t border-zinc-900 flex items-center justify-between text-xs font-mono text-zinc-400 flex-wrap gap-2">
        <span className="flex items-center gap-1.5 text-zinc-300">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>Active Strategy: <strong className={feedState === "push" ? "text-indigo-400" : "text-amber-400"}>
            {feedState === "push" ? "Fan-out on Write (Pushes to followers' Redis Sorted Sets in-memory)" : "Fan-out on Read (On-demand merging to prevent 100M Redis writes per tweet)"}
          </strong></span>
        </span>
      </div>
    </div>
  );
};

export default AnimatedNewsFeedDiagram;
