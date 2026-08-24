import React, { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { SiRedis, SiApachecassandra } from "react-icons/si";
import { FaMobileAlt, FaTaxi, FaServer, FaMapMarkedAlt, FaCogs } from "react-icons/fa";

export const AnimatedUberDiagram = () => {
  const [uberState, setUberState] = useState("ping"); // "ping" or "match"

  return (
    <div className="my-6 p-6 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-4 select-none font-sans">
      {/* Header Bar */}
      <div className="flex items-center justify-between border-b border-zinc-900 pb-3 flex-wrap gap-3">
        <span className="text-xs font-mono font-bold text-white uppercase tracking-wider flex items-center gap-2">
          <span className={`w-2.5 h-2.5 rounded-full animate-ping ${uberState === "ping" ? "bg-amber-400" : "bg-emerald-400"}`}></span>
          Geospatial Ride Dispatch & Location Engine Architecture
        </span>

        {/* Interactive Mode Switches */}
        <div className="flex items-center gap-1.5 bg-zinc-900 p-1 rounded-xl border border-zinc-800 flex-wrap">
          <button
            onClick={() => setUberState("ping")}
            className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition cursor-pointer ${
              uberState === "ping"
                ? "bg-amber-600 text-white"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            1. Driver Location Ping (Redis GEOADD)
          </button>
          <button
            onClick={() => setUberState("match")}
            className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition cursor-pointer ${
              uberState === "match"
                ? "bg-emerald-600 text-white"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            2. Rider Match & Hexagon Dispatch
          </button>
        </div>
      </div>

      {/* SVG Canvas (900 x 480) */}
      <svg viewBox="0 0 900 480" className="w-full h-auto text-zinc-100 font-mono">
        <defs>
          <linearGradient id="amberDottedGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#fbbf24" />
            <stop offset="100%" stopColor="#f59e0b" />
          </linearGradient>

          <linearGradient id="emeraldDottedGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#34d399" />
            <stop offset="100%" stopColor="#10b981" />
          </linearGradient>

          <linearGradient id="blueDottedGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="100%" stopColor="#60a5fa" />
          </linearGradient>
        </defs>

        {/* 1. CLIENT NODE */}
        <rect x="30" y="195" width="130" height="90" rx="14" fill="#09090b" stroke="#38bdf8" strokeWidth="1.5" />
        <foreignObject x="40" y="205" width="110" height="30">
          <div className="flex items-center justify-center text-sky-400">
            {uberState === "ping" ? <FaTaxi className="w-5 h-5 text-amber-400" /> : <FaMobileAlt className="w-5 h-5 text-emerald-400" />}
          </div>
        </foreignObject>
        <text x="95" y="245" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="bold">
          {uberState === "ping" ? "Driver Phone" : "Rider Phone"}
        </text>
        <rect x="45" y="252" width="100" height="22" rx="4" fill="#18181b" stroke="#27272a" />
        <text x="95" y="267" textAnchor="middle" fill="#38bdf8" fontSize="9" fontWeight="bold">
          {uberState === "ping" ? "GPS Ping (4s)" : "Request Ride"}
        </text>

        {/* PATH: APP -> WEBSOCKET GATEWAY */}
        <path d="M 160 240 L 270 240" stroke="url(#blueDottedGrad)" strokeWidth="2.5" strokeDasharray="4 4">
          <animate attributeName="stroke-dashoffset" from="8" to="0" dur="0.8s" repeatCount="indefinite" />
        </path>

        {/* 2. LOCATION GATEWAY */}
        <polygon 
          points="320,185 390,185 435,240 390,295 320,295 275,240" 
          fill="#09090b" 
          stroke="#fbbf24" 
          strokeWidth="2" 
        />
        <foreignObject x="335" y="200" width="40" height="30">
          <div className="flex items-center justify-center text-amber-400">
            <FaServer className="w-5 h-5" />
          </div>
        </foreignObject>
        <text x="355" y="242" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">Location</text>
        <text x="355" y="258" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold">Gateway</text>

        {/* TOP BRANCH: REDIS GEOSPATIAL CLUSTER */}
        <path 
          d="M 400 200 L 520 100" 
          stroke={uberState === "ping" ? "url(#amberDottedGrad)" : "#3f3f46"} 
          strokeWidth={uberState === "ping" ? "2.5" : "1.5"} 
          strokeDasharray="4 4"
        >
          {uberState === "ping" && (
            <animate attributeName="stroke-dashoffset" from="8" to="0" dur="0.8s" repeatCount="indefinite" />
          )}
        </path>

        <path d="M 640 100 L 700 100" stroke="url(#amberDottedGrad)" strokeWidth="2" strokeDasharray="4 4">
          <animate attributeName="stroke-dashoffset" from="8" to="0" dur="0.8s" repeatCount="indefinite" />
        </path>

        {/* GEOSPATIAL HEX GRID CACHE NODE */}
        <rect x="700" y="75" width="120" height="50" rx="10" fill="#18181b" stroke="#f59e0b" strokeWidth="1.5" />
        <foreignObject x="710" y="82" width="20" height="20">
          <div className="text-amber-400">
            <FaMapMarkedAlt className="w-4 h-4" />
          </div>
        </foreignObject>
        <text x="760" y="98" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">Hex Grid Cache</text>
        <text x="760" y="114" textAnchor="middle" fill="#fcd34d" fontSize="8">Hex Cell Indexing</text>

        {/* REDIS GEO INDEX NODE WITH REACT-ICON */}
        <rect x="520" y="75" width="120" height="50" rx="10" fill="#451a03" stroke="#f59e0b" strokeWidth="1.5" />
        <foreignObject x="530" y="82" width="20" height="20">
          <div className="text-red-500">
            <SiRedis className="w-5 h-5" />
          </div>
        </foreignObject>
        <text x="580" y="98" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="bold">Redis Geo Index</text>
        <text x="580" y="142" textAnchor="middle" fill="#f59e0b" fontSize="9 font-mono">1.25M Ingestion WPS</text>

        {/* MIDDLE BRANCH: DRIVER MATCH ENGINE */}
        <path 
          d="M 435 240 L 520 240" 
          stroke={uberState === "match" ? "url(#emeraldDottedGrad)" : "#3f3f46"} 
          strokeWidth={uberState === "match" ? "3" : "1.5"} 
          strokeDasharray="4 4"
        >
          {uberState === "match" && (
            <animate attributeName="stroke-dashoffset" from="8" to="0" dur="0.8s" repeatCount="indefinite" />
          )}
        </path>

        {/* MATCH ENGINE NODE */}
        <rect 
          x="520" y="210" width="140" height="60" rx="10" 
          fill="#09090b" 
          stroke={uberState === "match" ? "#22c55e" : "#34d399"} 
          strokeWidth={uberState === "match" ? "2" : "1"} 
        />
        <foreignObject x="532" y="222" width="24" height="24">
          <div className="text-emerald-400">
            <FaCogs className="w-5 h-5" />
          </div>
        </foreignObject>
        <text x="600" y="238" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">Match Engine</text>
        <text x="600" y="254" textAnchor="middle" fill="#22c55e" fontSize="8">k-Ring Hexagon Radius</text>

        {/* LOWER BRANCH: CASSANDRA DB */}
        <path 
          d="M 410 270 L 520 330" 
          stroke={uberState === "match" ? "url(#emeraldDottedGrad)" : "#3f3f46"} 
          strokeWidth={uberState === "match" ? "2.5" : "1.5"} 
          strokeDasharray="4 4"
        >
          {uberState === "match" && (
            <animate attributeName="stroke-dashoffset" from="8" to="0" dur="0.8s" repeatCount="indefinite" />
          )}
        </path>

        {/* CASSANDRA TRIP DB NODE WITH REACT-ICON */}
        <rect x="520" y="305" width="140" height="55" rx="10" fill="#3b0764" stroke="#c084fc" strokeWidth="1.5" />
        <foreignObject x="532" y="315" width="24" height="24">
          <div className="text-sky-400">
            <SiApachecassandra className="w-6 h-6" />
          </div>
        </foreignObject>
        <text x="600" y="332" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="bold">Cassandra DB</text>
        <text x="600" y="348" textAnchor="middle" fill="#e9d5ff" fontSize="8">Trip State & Fare Surge</text>

        {/* BOTTOM BRANCH: DRIVER DISPATCH */}
        {uberState === "match" && (
          <path d="M 355 295 L 355 420 L 700 420" stroke="#22c55e" strokeWidth="2" strokeDasharray="4 4">
            <animate attributeName="stroke-dashoffset" from="8" to="0" dur="0.8s" repeatCount="indefinite" />
          </path>
        )}
        <g transform="translate(700, 395)">
          <rect x="0" y="0" width="140" height="50" rx="10" fill="#09090b" stroke={uberState === "match" ? "#22c55e" : "#27272a"} strokeWidth={uberState === "match" ? "2" : "1"} />
          <foreignObject x="15" y="13" width="24" height="24">
            <div className="text-amber-400">
              <FaTaxi className="w-5 h-5" />
            </div>
          </foreignObject>
          <text x="78" y="24" textAnchor="middle" fill="#22c55e" fontSize="10" fontWeight="bold">Driver App</text>
          <text x="78" y="38" textAnchor="middle" fill="#71717a" fontSize="8">Accepts Offer</text>
        </g>
      </svg>

      {/* Footer Details */}
      <div className="pt-3 border-t border-zinc-900 flex items-center justify-between text-xs font-mono text-zinc-400 flex-wrap gap-2">
        <span className="flex items-center gap-1.5 text-zinc-300">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>Active Pipeline: <strong className={uberState === "ping" ? "text-amber-400" : "text-emerald-400"}>
            {uberState === "ping" ? "Driver Location Ping -> Ingested into Redis Geo Index (1.25M updates/sec)" : "Rider Request -> Hexagon Search -> Nearest Driver Offer Dispatched"}
          </strong></span>
        </span>
      </div>
    </div>
  );
};

export default AnimatedUberDiagram;
