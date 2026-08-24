import React, { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { SiRedis, SiApachecassandra, SiApple, SiGoogle } from "react-icons/si";
import { FaMobileAlt, FaServer, FaUserCheck, FaUserSlash } from "react-icons/fa";

export const AnimatedChatAppDiagram = () => {
  const [chatState, setChatState] = useState("online"); // "online" or "offline"

  return (
    <div className="my-6 p-6 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-4 select-none font-sans">
      {/* Header Bar */}
      <div className="flex items-center justify-between border-b border-zinc-900 pb-3 flex-wrap gap-3">
        <span className="text-xs font-mono font-bold text-white uppercase tracking-wider flex items-center gap-2">
          <span className={`w-2.5 h-2.5 rounded-full animate-ping ${chatState === "online" ? "bg-emerald-400" : "bg-amber-400"}`}></span>
          Distributed Chat Application Engine Architecture
        </span>

        {/* Interactive Mode Switches */}
        <div className="flex items-center gap-1.5 bg-zinc-900 p-1 rounded-xl border border-zinc-800 flex-wrap">
          <button
            onClick={() => setChatState("online")}
            className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition cursor-pointer ${
              chatState === "online"
                ? "bg-emerald-600 text-white"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            1. Receiver Online (Direct WebSocket Push)
          </button>
          <button
            onClick={() => setChatState("offline")}
            className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition cursor-pointer ${
              chatState === "offline"
                ? "bg-amber-600 text-white"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            2. Receiver Offline (Cassandra DB + APNs Push)
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

          <linearGradient id="amberDottedGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#fbbf24" />
            <stop offset="100%" stopColor="#f59e0b" />
          </linearGradient>

          <linearGradient id="blueDottedGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="100%" stopColor="#60a5fa" />
          </linearGradient>

          <linearGradient id="purpleDottedGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#c084fc" />
            <stop offset="100%" stopColor="#a855f7" />
          </linearGradient>
        </defs>

        {/* 1. SENDER CLIENT NODE (User A) */}
        <rect x="30" y="195" width="130" height="90" rx="14" fill="#09090b" stroke="#38bdf8" strokeWidth="1.5" />
        <foreignObject x="40" y="205" width="110" height="30">
          <div className="flex items-center justify-center text-sky-400">
            <FaMobileAlt className="w-5 h-5" />
          </div>
        </foreignObject>
        <text x="95" y="245" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="bold">User A (Sender)</text>
        <rect x="45" y="252" width="100" height="22" rx="4" fill="#18181b" stroke="#27272a" />
        <text x="95" y="267" textAnchor="middle" fill="#38bdf8" fontSize="9" fontWeight="bold">Signal Payload</text>

        {/* PATH: SENDER -> WEBSOCKET GATEWAY */}
        <path d="M 160 240 L 270 240" stroke="url(#purpleDottedGrad)" strokeWidth="2.5" strokeDasharray="4 4">
          <animate attributeName="stroke-dashoffset" from="8" to="0" dur="0.8s" repeatCount="indefinite" />
        </path>

        {/* 2. WEBSOCKET GATEWAY */}
        <polygon 
          points="320,185 390,185 435,240 390,295 320,295 275,240" 
          fill="#09090b" 
          stroke="#a855f7" 
          strokeWidth="2" 
        />
        <foreignObject x="335" y="200" width="40" height="30">
          <div className="flex items-center justify-center text-purple-400">
            <FaServer className="w-5 h-5" />
          </div>
        </foreignObject>
        <text x="355" y="242" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">WebSocket</text>
        <text x="355" y="258" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold">Gateway</text>

        {/* TOP BRANCH: PRESENCE SERVICE & REDIS */}
        <path d="M 400 200 L 520 100" stroke="url(#blueDottedGrad)" strokeWidth="2" strokeDasharray="4 4">
          <animate attributeName="stroke-dashoffset" from="8" to="0" dur="0.8s" repeatCount="indefinite" />
        </path>

        <path d="M 640 100 L 700 100" stroke="url(#blueDottedGrad)" strokeWidth="2" strokeDasharray="4 4">
          <animate attributeName="stroke-dashoffset" from="8" to="0" dur="0.8s" repeatCount="indefinite" />
        </path>

        {/* REDIS SESSION STORE NODE WITH REACT-ICON */}
        <rect x="700" y="75" width="120" height="50" rx="10" fill="#18181b" stroke="#3b82f6" strokeWidth="1.5" />
        <foreignObject x="710" y="82" width="20" height="20">
          <div className="text-red-500">
            <SiRedis className="w-5 h-5" />
          </div>
        </foreignObject>
        <text x="760" y="98" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">Redis Sessions</text>
        <text x="760" y="114" textAnchor="middle" fill="#93c5fd" fontSize="8">User B → Server ID</text>

        {/* PRESENCE SERVICE NODE */}
        <rect x="520" y="75" width="120" height="50" rx="10" fill="#09090b" stroke="#38bdf8" strokeWidth="1.5" />
        <foreignObject x="530" y="82" width="20" height="20">
          <div className="text-sky-400">
            {chatState === "online" ? <FaUserCheck className="w-4 h-4 text-emerald-400" /> : <FaUserSlash className="w-4 h-4 text-amber-400" />}
          </div>
        </foreignObject>
        <text x="580" y="98" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">Presence Svc</text>

        {/* MIDDLE BRANCH: RECEIVER B ONLINE */}
        <path 
          d="M 435 240 L 520 240" 
          stroke={chatState === "online" ? "url(#emeraldDottedGrad)" : "#3f3f46"} 
          strokeWidth={chatState === "online" ? "3" : "1.5"} 
          strokeDasharray="4 4"
        >
          {chatState === "online" && (
            <animate attributeName="stroke-dashoffset" from="8" to="0" dur="0.8s" repeatCount="indefinite" />
          )}
        </path>
        <text x="475" y="232" textAnchor="middle" fill={chatState === "online" ? "#22c55e" : "#71717a"} fontSize="10" fontWeight="bold">
          Online
        </text>

        {/* RECEIVER B NODE */}
        <rect 
          x="520" y="210" width="140" height="60" rx="10" 
          fill="#09090b" 
          stroke={chatState === "online" ? "#22c55e" : "#34d399"} 
          strokeWidth={chatState === "online" ? "2" : "1"} 
        />
        <foreignObject x="532" y="222" width="24" height="24">
          <div className="text-emerald-400">
            <FaMobileAlt className="w-5 h-5" />
          </div>
        </foreignObject>
        <text x="600" y="238" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">User B (Receiver)</text>
        <text x="600" y="254" textAnchor="middle" fill="#22c55e" fontSize="8">✓✓ Double Blue Check</text>

        {/* LOWER BRANCH: CASSANDRA DB */}
        <path 
          d="M 410 270 L 520 330" 
          stroke={chatState === "offline" ? "url(#amberDottedGrad)" : "#3f3f46"} 
          strokeWidth={chatState === "offline" ? "2.5" : "1.5"} 
          strokeDasharray="4 4"
        >
          {chatState === "offline" && (
            <animate attributeName="stroke-dashoffset" from="8" to="0" dur="0.8s" repeatCount="indefinite" />
          )}
        </path>

        {/* CASSANDRA NODE WITH REACT-ICON */}
        <rect x="520" y="305" width="140" height="55" rx="10" fill="#451a03" stroke="#f59e0b" strokeWidth="1.5" />
        <foreignObject x="532" y="315" width="24" height="24">
          <div className="text-sky-400">
            <SiApachecassandra className="w-6 h-6" />
          </div>
        </foreignObject>
        <text x="600" y="332" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="bold">Cassandra DB</text>
        <text x="600" y="348" textAnchor="middle" fill="#fde68a" fontSize="8">Unread Store</text>

        {/* BOTTOM BRANCH: PUSH NOTIFICATION SERVICE */}
        {chatState === "offline" && (
          <path d="M 355 295 L 355 420 L 700 420" stroke="#38bdf8" strokeWidth="2" strokeDasharray="4 4">
            <animate attributeName="stroke-dashoffset" from="8" to="0" dur="0.8s" repeatCount="indefinite" />
          </path>
        )}
        <g transform="translate(700, 395)">
          <rect x="0" y="0" width="140" height="50" rx="10" fill="#09090b" stroke={chatState === "offline" ? "#38bdf8" : "#27272a"} strokeWidth={chatState === "offline" ? "2" : "1"} />
          <foreignObject x="12" y="13" width="30" height="24">
            <div className="flex items-center gap-1 text-slate-300">
              <SiApple className="w-4 h-4" />
              <SiGoogle className="w-4 h-4 text-sky-400" />
            </div>
          </foreignObject>
          <text x="88" y="24" textAnchor="middle" fill="#38bdf8" fontSize="10" fontWeight="bold">Push Service</text>
          <text x="88" y="38" textAnchor="middle" fill="#71717a" fontSize="8">APNs / FCM Banner</text>
        </g>
      </svg>

      {/* Footer Details */}
      <div className="pt-3 border-t border-zinc-900 flex items-center justify-between text-xs font-mono text-zinc-400 flex-wrap gap-2">
        <span className="flex items-center gap-1.5 text-zinc-300">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>Active Pipeline: <strong className={chatState === "online" ? "text-emerald-400" : "text-amber-400"}>
            {chatState === "online" ? "Receiver Online -> Real-time WebSocket Push (Double Blue Check)" : "Receiver Offline -> Saved to Cassandra Unread Store + APNs/FCM Banner"}
          </strong></span>
        </span>
      </div>
    </div>
  );
};

export default AnimatedChatAppDiagram;
