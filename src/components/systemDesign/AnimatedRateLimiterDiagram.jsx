import React, { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { SiRedis, SiApachekafka } from "react-icons/si";
import { FaLaptop, FaMobileAlt, FaServer, FaCogs, FaDatabase, FaFilter } from "react-icons/fa";

export const AnimatedRateLimiterDiagram = () => {
  const [limiterState, setLimiterState] = useState("success"); // "success", "option1", "option2"

  return (
    <div className="my-6 p-6 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-4 select-none font-sans">
      {/* Header Bar */}
      <div className="flex items-center justify-between border-b border-zinc-900 pb-3 flex-wrap gap-3">
        <span className="text-xs font-mono font-bold text-white uppercase tracking-wider flex items-center gap-2">
          <span className={`w-2.5 h-2.5 rounded-full animate-ping ${limiterState === "success" ? "bg-emerald-400" : limiterState === "option1" ? "bg-rose-500" : "bg-amber-400"}`}></span>
          API Rate Limiter Architecture: Rate Limiting Handling Strategies
        </span>

        {/* Interactive Mode Switches */}
        <div className="flex items-center gap-1.5 bg-zinc-900 p-1 rounded-xl border border-zinc-800 flex-wrap">
          <button
            onClick={() => setLimiterState("success")}
            className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition cursor-pointer ${
              limiterState === "success"
                ? "bg-emerald-600 text-white"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            1. Allowed (Forward to API)
          </button>
          <button
            onClick={() => setLimiterState("option1")}
            className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition cursor-pointer ${
              limiterState === "option1"
                ? "bg-rose-600 text-white"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            2. Option 1: Drop Request + HTTP 429
          </button>
          <button
            onClick={() => setLimiterState("option2")}
            className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition cursor-pointer ${
              limiterState === "option2"
                ? "bg-amber-600 text-white"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            3. Option 2: Enqueue in Kafka + HTTP 429
          </button>
        </div>
      </div>

      {/* SVG CANVAS (900 x 480) */}
      <svg viewBox="0 0 900 480" className="w-full h-auto text-zinc-100 font-mono">
        <defs>
          <linearGradient id="emeraldDottedGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#34d399" />
            <stop offset="100%" stopColor="#10b981" />
          </linearGradient>

          <linearGradient id="roseDottedGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#f43f5e" />
            <stop offset="100%" stopColor="#e11d48" />
          </linearGradient>

          <linearGradient id="amberDottedGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#fbbf24" />
            <stop offset="100%" stopColor="#f59e0b" />
          </linearGradient>

          <linearGradient id="blueDottedGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="100%" stopColor="#60a5fa" />
          </linearGradient>
        </defs>

        {/* 1. CLIENT NODE (Left) */}
        <rect x="30" y="195" width="130" height="90" rx="14" fill="#09090b" stroke="#38bdf8" strokeWidth="1.5" />
        <foreignObject x="40" y="205" width="110" height="30">
          <div className="flex items-center justify-center gap-2 text-sky-400">
            <FaLaptop className="w-4 h-4" />
            <FaMobileAlt className="w-4 h-4" />
          </div>
        </foreignObject>
        <text x="95" y="245" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="bold">Client</text>
        <rect x="45" y="252" width="100" height="22" rx="4" fill="#18181b" stroke="#27272a" />
        <text x="95" y="267" textAnchor="middle" fill="#38bdf8" fontSize="9" fontWeight="bold">Web / Mobile</text>

        {/* PATH: CLIENT -> RATE LIMITER MIDDLEWARE */}
        <path d="M 160 240 L 270 240" stroke="url(#blueDottedGrad)" strokeWidth="2.5" strokeDasharray="4 4">
          <animate attributeName="stroke-dashoffset" from="8" to="0" dur="0.8s" repeatCount="indefinite" />
        </path>

        {/* 2. RATE LIMITER MIDDLEWARE (HEXAGON IN CENTER) */}
        <polygon 
          points="320,185 390,185 435,240 390,295 320,295 275,240" 
          fill="#09090b" 
          stroke="#38bdf8" 
          strokeWidth="2" 
        />
        <foreignObject x="335" y="200" width="40" height="30">
          <div className="flex items-center justify-center text-sky-400">
            <FaFilter className="w-5 h-5" />
          </div>
        </foreignObject>
        <text x="355" y="242" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">Rate Limiter</text>
        <text x="355" y="258" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold">Middleware</text>

        {/* TOP BRANCH: RULES ENGINE & CACHED RULES */}
        <path d="M 400 200 L 520 100" stroke="url(#blueDottedGrad)" strokeWidth="2" strokeDasharray="4 4">
          <animate attributeName="stroke-dashoffset" from="8" to="0" dur="0.8s" repeatCount="indefinite" />
        </path>

        <path d="M 700 100 L 640 100" stroke="url(#blueDottedGrad)" strokeWidth="2" strokeDasharray="4 4">
          <animate attributeName="stroke-dashoffset" from="8" to="0" dur="0.8s" repeatCount="indefinite" />
        </path>

        <path d="M 755 70 L 755 45" stroke="url(#blueDottedGrad)" strokeWidth="2" strokeDasharray="4 4">
          <animate attributeName="stroke-dashoffset" from="8" to="0" dur="0.8s" repeatCount="indefinite" />
        </path>

        {/* RULES ENGINE NODE */}
        <rect x="700" y="10" width="110" height="35" rx="8" fill="#09090b" stroke="#38bdf8" strokeWidth="1.5" />
        <text x="755" y="32" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">Rules Engine</text>

        {/* WORKERS NODE */}
        <rect x="700" y="70" width="110" height="55" rx="10" fill="#18181b" stroke="#34d399" strokeWidth="1.5" strokeDasharray="4 2" />
        <foreignObject x="745" y="78" width="20" height="20">
          <div className="text-emerald-400">
            <FaCogs className="w-4 h-4" />
          </div>
        </foreignObject>
        <text x="755" y="108" textAnchor="middle" fill="#34d399" fontSize="10" fontWeight="bold">Workers</text>

        {/* CACHED RULES NODE */}
        <rect x="520" y="75" width="120" height="50" rx="10" fill="#1e3a8a" stroke="#3b82f6" strokeWidth="1.5" />
        <foreignObject x="570" y="80" width="20" height="20">
          <div className="text-blue-300">
            <FaDatabase className="w-4 h-4" />
          </div>
        </foreignObject>
        <text x="580" y="108" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">Cached Rules</text>

        {/* MIDDLE BRANCH: SUCCESS -> API SERVERS */}
        <path 
          d="M 435 240 L 520 240" 
          stroke={limiterState === "success" ? "url(#emeraldDottedGrad)" : "#3f3f46"} 
          strokeWidth={limiterState === "success" ? "3" : "1.5"} 
          strokeDasharray="4 4"
        >
          {limiterState === "success" && (
            <animate attributeName="stroke-dashoffset" from="8" to="0" dur="0.8s" repeatCount="indefinite" />
          )}
        </path>
        <text x="475" y="232" textAnchor="middle" fill={limiterState === "success" ? "#22c55e" : "#71717a"} fontSize="10" fontWeight="bold">
          success
        </text>

        {/* API SERVERS NODE */}
        <rect 
          x="520" y="210" width="140" height="60" rx="10" 
          fill="#09090b" 
          stroke={limiterState === "success" ? "#22c55e" : "#34d399"} 
          strokeWidth={limiterState === "success" ? "2" : "1"} 
          strokeDasharray="4 2"
        />
        <foreignObject x="580" y="218" width="20" height="20">
          <div className="text-emerald-400">
            <FaServer className="w-4 h-4" />
          </div>
        </foreignObject>
        <text x="590" y="248" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">API Servers</text>
        <text x="590" y="262" textAnchor="middle" fill="#a1a1aa" fontSize="8">Backend Microservices</text>

        {/* MIDDLE-LOWER BRANCH: REDIS COUNTER CHECK */}
        <path d="M 410 270 L 520 330" stroke="url(#blueDottedGrad)" strokeWidth="2" strokeDasharray="4 4">
          <animate attributeName="stroke-dashoffset" from="8" to="0" dur="0.8s" repeatCount="indefinite" />
        </path>

        {/* REDIS CACHE NODE */}
        <rect x="520" y="305" width="140" height="55" rx="10" fill="#450a0a" stroke="#ef4444" strokeWidth="1.5" />
        <foreignObject x="535" y="315" width="24" height="24">
          <div className="text-red-500">
            <SiRedis className="w-6 h-6" />
          </div>
        </foreignObject>
        <text x="600" y="328" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="bold">Redis Cache</text>
        <text x="600" y="344" textAnchor="middle" fill="#fca5a5" fontSize="8">Counters & Lua Scripts</text>

        {/* RATE LIMITED BRANCH (RED DOWNWARDS ARROW) */}
        {(limiterState === "option1" || limiterState === "option2") && (
          <>
            <path d="M 355 295 L 355 380 L 95 380 L 95 285" stroke="#f43f5e" strokeWidth="2.5" fill="none" strokeDasharray="4 4">
              <animate attributeName="stroke-dashoffset" from="8" to="0" dur="0.8s" repeatCount="indefinite" />
            </path>
            <polygon points="95,285 90,295 100,295" fill="#f43f5e" />
            <text x="225" y="400" textAnchor="middle" fill="#f43f5e" fontSize="11" fontWeight="bold">
              429: Too Many Requests
            </text>
            <text x="365" y="335" fill="#f43f5e" fontSize="10" fontWeight="bold">
              rate limited
            </text>
          </>
        )}

        {/* OPTION 1: REQUEST DROPPED (HARD RATE LIMITING) */}
        {limiterState === "option1" && (
          <path d="M 355 380 L 520 405" stroke="#f43f5e" strokeWidth="2" strokeDasharray="4 4">
            <animate attributeName="stroke-dashoffset" from="8" to="0" dur="0.8s" repeatCount="indefinite" />
          </path>
        )}
        <g transform="translate(520, 385)">
          <rect x="0" y="0" width="130" height="45" rx="22" fill="#09090b" stroke={limiterState === "option1" ? "#f43f5e" : "#27272a"} strokeWidth={limiterState === "option1" ? "2" : "1"} />
          <text x="65" y="20" textAnchor="middle" fill={limiterState === "option1" ? "#f43f5e" : "#a1a1aa"} fontSize="10" fontWeight="bold">💧 Drop Request</text>
          <text x="65" y="34" textAnchor="middle" fill="#71717a" fontSize="8">Hard Rate Limit (Discard)</text>
        </g>
        <text x="430" y="390" textAnchor="middle" fill={limiterState === "option1" ? "#f43f5e" : "#71717a"} fontSize="9" fontWeight="bold">option 1</text>

        {/* OPTION 2: KAFKA MESSAGE QUEUE (SOFT RATE LIMITING / BUFFER) */}
        {limiterState === "option2" && (
          <path d="M 355 380 L 700 440" stroke="#fbbf24" strokeWidth="2" strokeDasharray="4 4">
            <animate attributeName="stroke-dashoffset" from="8" to="0" dur="0.8s" repeatCount="indefinite" />
          </path>
        )}
        <g transform="translate(700, 420)">
          <rect x="0" y="0" width="140" height="50" rx="10" fill="#09090b" stroke={limiterState === "option2" ? "#fbbf24" : "#27272a"} strokeWidth={limiterState === "option2" ? "2" : "1"} />
          <foreignObject x="15" y="13" width="24" height="24">
            <div className="text-amber-400">
              <SiApachekafka className="w-5 h-5" />
            </div>
          </foreignObject>
          <text x="78" y="24" textAnchor="middle" fill={limiterState === "option2" ? "#fbbf24" : "#a1a1aa"} fontSize="10" fontWeight="bold">Message Queue</text>
          <text x="78" y="38" textAnchor="middle" fill="#71717a" fontSize="8">Soft Limit (Kafka Buffer)</text>
        </g>
        <text x="520" y="445" textAnchor="middle" fill={limiterState === "option2" ? "#fbbf24" : "#71717a"} fontSize="9" fontWeight="bold">option 2</text>
      </svg>

      {/* Footer Details */}
      <div className="pt-3 border-t border-zinc-900 flex items-center justify-between text-xs font-mono text-zinc-400 flex-wrap gap-2">
        <span className="flex items-center gap-1.5 text-zinc-300">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>Active Pipeline: <strong className={limiterState === "success" ? "text-emerald-400" : limiterState === "option1" ? "text-rose-400" : "text-amber-400"}>
            {limiterState === "success" ? "Allowed -> Forwarded directly to backend API Servers" : limiterState === "option1" ? "Option 1 (Hard Limit) -> Discarded + Return HTTP 429 Too Many Requests" : "Option 2 (Soft Limit) -> HTTP 429 + Enqueued in Kafka for deferred processing"}
          </strong></span>
        </span>
      </div>
    </div>
  );
};

export default AnimatedRateLimiterDiagram;
