import React, { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { SiRedis, SiApachecassandra, SiApachekafka } from "react-icons/si";
import { FaLaptop, FaMobileAlt, FaKey, FaDatabase, FaServer, FaCogs } from "react-icons/fa";

export const AnimatedUrlShortenerDiagram = () => {
  const [urlState, setUrlState] = useState("read_hit"); // "read_hit", "read_miss", "write"

  return (
    <div className="my-6 p-6 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-4 select-none font-sans">
      {/* Header Bar */}
      <div className="flex items-center justify-between border-b border-zinc-900 pb-3 flex-wrap gap-3">
        <span className="text-xs font-mono font-bold text-white uppercase tracking-wider flex items-center gap-2">
          <span className={`w-2.5 h-2.5 rounded-full animate-ping ${urlState === "write" ? "bg-amber-400" : urlState === "read_hit" ? "bg-emerald-400" : "bg-purple-400"}`}></span>
          URL Shortener (TinyURL) Distributed Architecture Pipeline
        </span>

        {/* Interactive Mode Switches */}
        <div className="flex items-center gap-1.5 bg-zinc-900 p-1 rounded-xl border border-zinc-800 flex-wrap">
          <button
            onClick={() => setUrlState("read_hit")}
            className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition cursor-pointer ${
              urlState === "read_hit"
                ? "bg-emerald-600 text-white"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            1. Read Flow (Redis Cache Hit)
          </button>
          <button
            onClick={() => setUrlState("read_miss")}
            className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition cursor-pointer ${
              urlState === "read_miss"
                ? "bg-purple-600 text-white"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            2. Read Flow (Cache Miss → DB)
          </button>
          <button
            onClick={() => setUrlState("write")}
            className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition cursor-pointer ${
              urlState === "write"
                ? "bg-amber-600 text-white"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            3. Write Flow (KGS Key Allocation)
          </button>
        </div>
      </div>

      {/* SVG Canvas (900 x 480) */}
      <svg viewBox="0 0 900 480" className="w-full h-auto text-zinc-100 font-mono">
        <defs>
          <linearGradient id="emeraldDottedGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#34d399" />
            <stop offset="100%" stopColor="#10b981" />
          </linearGradient>
          <linearGradient id="purpleDottedGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#c084fc" />
            <stop offset="100%" stopColor="#a855f7" />
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

        {/* 1. CLIENT NODE */}
        <rect x="30" y="195" width="130" height="90" rx="14" fill="#09090b" stroke="#38bdf8" strokeWidth="1.5" />
        <foreignObject x="40" y="205" width="110" height="30">
          <div className="flex items-center justify-center gap-2 text-sky-400">
            <FaLaptop className="w-4 h-4" />
            <FaMobileAlt className="w-4 h-4" />
          </div>
        </foreignObject>
        <text x="95" y="245" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="bold">Client</text>
        <rect x="45" y="252" width="100" height="22" rx="4" fill="#18181b" stroke="#27272a" />
        <text x="95" y="267" textAnchor="middle" fill="#38bdf8" fontSize="9" fontWeight="bold">
          {urlState === "write" ? "POST /shorten" : "GET /aB3x9Z"}
        </text>

        {/* PATH: CLIENT -> API GATEWAY */}
        <path d="M 160 240 L 270 240" stroke="url(#blueDottedGrad)" strokeWidth="2.5" strokeDasharray="4 4">
          <animate attributeName="stroke-dashoffset" from="8" to="0" dur="0.8s" repeatCount="indefinite" />
        </path>

        {/* 2. API GATEWAY / URL SERVICE */}
        <polygon 
          points="320,185 390,185 435,240 390,295 320,295 275,240" 
          fill="#09090b" 
          stroke="#38bdf8" 
          strokeWidth="2" 
        />
        <foreignObject x="335" y="200" width="40" height="30">
          <div className="flex items-center justify-center text-sky-400">
            <FaServer className="w-5 h-5" />
          </div>
        </foreignObject>
        <text x="355" y="242" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">URL Service</text>
        <text x="355" y="258" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold">Gateway</text>

        {/* TOP BRANCH: KGS */}
        <path 
          d="M 400 200 L 520 100" 
          stroke={urlState === "write" ? "url(#amberDottedGrad)" : "#3f3f46"} 
          strokeWidth={urlState === "write" ? "2.5" : "1.5"} 
          strokeDasharray="4 4"
        >
          {urlState === "write" && (
            <animate attributeName="stroke-dashoffset" from="8" to="0" dur="0.8s" repeatCount="indefinite" />
          )}
        </path>

        <path d="M 700 100 L 640 100" stroke="url(#amberDottedGrad)" strokeWidth="2" strokeDasharray="4 4">
          <animate attributeName="stroke-dashoffset" from="8" to="0" dur="0.8s" repeatCount="indefinite" />
        </path>

        {/* KGS DB NODE */}
        <rect x="700" y="75" width="120" height="50" rx="10" fill="#451a03" stroke="#f59e0b" strokeWidth="1.5" />
        <foreignObject x="710" y="82" width="20" height="20">
          <div className="text-amber-400">
            <FaDatabase className="w-4 h-4" />
          </div>
        </foreignObject>
        <text x="760" y="98" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">KGS Key DB</text>
        <text x="760" y="114" textAnchor="middle" fill="#fcd34d" fontSize="8">Pre-gen Keys</text>

        {/* KGS SERVICE NODE */}
        <rect x="520" y="75" width="120" height="50" rx="10" fill="#18181b" stroke={urlState === "write" ? "#f59e0b" : "#3f3f46"} strokeWidth="1.5" />
        <foreignObject x="530" y="82" width="20" height="20">
          <div className="text-amber-400">
            <FaKey className="w-4 h-4" />
          </div>
        </foreignObject>
        <text x="580" y="98" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="bold">KGS Service</text>

        {/* MIDDLE BRANCH: REDIS CACHE */}
        <path 
          d="M 435 240 L 520 240" 
          stroke={urlState === "read_hit" ? "url(#emeraldDottedGrad)" : "#3f3f46"} 
          strokeWidth={urlState === "read_hit" ? "3" : "1.5"} 
          strokeDasharray="4 4"
        >
          {urlState === "read_hit" && (
            <animate attributeName="stroke-dashoffset" from="8" to="0" dur="0.8s" repeatCount="indefinite" />
          )}
        </path>

        {/* REDIS CACHE NODE */}
        <rect 
          x="520" y="210" width="140" height="60" rx="10" 
          fill="#09090b" 
          stroke={urlState === "read_hit" ? "#22c55e" : "#34d399"} 
          strokeWidth={urlState === "read_hit" ? "2" : "1"} 
        />
        <foreignObject x="532" y="222" width="24" height="24">
          <div className="text-red-500">
            <SiRedis className="w-6 h-6" />
          </div>
        </foreignObject>
        <text x="600" y="238" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">Redis Cache</text>
        <text x="600" y="254" textAnchor="middle" fill="#34d399" fontSize="8">&lt;2ms Latency (80/20 Rule)</text>

        {/* LOWER BRANCH: CASSANDRA DB */}
        <path 
          d="M 410 270 L 520 330" 
          stroke={urlState === "read_miss" ? "url(#purpleDottedGrad)" : "#3f3f46"} 
          strokeWidth={urlState === "read_miss" ? "2.5" : "1.5"} 
          strokeDasharray="4 4"
        >
          {urlState === "read_miss" && (
            <animate attributeName="stroke-dashoffset" from="8" to="0" dur="0.8s" repeatCount="indefinite" />
          )}
        </path>

        <rect x="520" y="305" width="140" height="55" rx="10" fill="#3b0764" stroke="#c084fc" strokeWidth="1.5" />
        <foreignObject x="532" y="315" width="24" height="24">
          <div className="text-sky-400">
            <SiApachecassandra className="w-6 h-6" />
          </div>
        </foreignObject>
        <text x="600" y="332" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="bold">Cassandra DB</text>
        <text x="600" y="348" textAnchor="middle" fill="#e9d5ff" fontSize="8">Persistent URL Store</text>

        {/* BOTTOM BRANCH: KAFKA ANALYTICS QUEUE */}
        <path d="M 355 295 L 355 420 L 700 420" stroke="#38bdf8" strokeWidth="2" strokeDasharray="4 4">
          <animate attributeName="stroke-dashoffset" from="8" to="0" dur="0.8s" repeatCount="indefinite" />
        </path>
        <g transform="translate(700, 395)">
          <rect x="0" y="0" width="140" height="50" rx="10" fill="#09090b" stroke="#38bdf8" strokeWidth="1.5" />
          <foreignObject x="15" y="13" width="24" height="24">
            <div className="text-amber-400">
              <SiApachekafka className="w-5 h-5" />
            </div>
          </foreignObject>
          <text x="78" y="24" textAnchor="middle" fill="#38bdf8" fontSize="10" fontWeight="bold">Message Queue</text>
          <text x="78" y="38" textAnchor="middle" fill="#71717a" fontSize="8">Kafka Analytics</text>
        </g>
      </svg>

      {/* Footer Details */}
      <div className="pt-3 border-t border-zinc-900 flex items-center justify-between text-xs font-mono text-zinc-400 flex-wrap gap-2">
        <span className="flex items-center gap-1.5 text-zinc-300">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>Active Pipeline: <strong className={urlState === "read_hit" ? "text-emerald-400" : urlState === "read_miss" ? "text-purple-400" : "text-amber-400"}>
            {urlState === "read_hit" ? "Read Flow -> Instant Redis Cache Hit (HTTP 301)" : urlState === "read_miss" ? "Read Flow -> Cache Miss -> Cassandra DB Lookup" : "Write Flow -> Pre-allocated Key from KGS Service"}
          </strong></span>
        </span>
      </div>
    </div>
  );
};

export default AnimatedUrlShortenerDiagram;
