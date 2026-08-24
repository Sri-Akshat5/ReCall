import React, { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { SiCloudflare, SiRedis, SiApachekafka } from "react-icons/si";
import { FaTv, FaLaptop, FaServer, FaCogs, FaAws } from "react-icons/fa";

export const AnimatedVideoStreamingDiagram = () => {
  const [streamState, setStreamState] = useState("playback"); // "playback" or "upload"

  return (
    <div className="my-6 p-6 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-4 select-none font-sans">
      {/* Header Bar */}
      <div className="flex items-center justify-between border-b border-zinc-900 pb-3 flex-wrap gap-3">
        <span className="text-xs font-mono font-bold text-white uppercase tracking-wider flex items-center gap-2">
          <span className={`w-2.5 h-2.5 rounded-full animate-ping ${streamState === "playback" ? "bg-cyan-400" : "bg-purple-400"}`}></span>
          Distributed Video Streaming Platform Architecture (HLS / DASH)
        </span>

        {/* Interactive Mode Switches */}
        <div className="flex items-center gap-1.5 bg-zinc-900 p-1 rounded-xl border border-zinc-800 flex-wrap">
          <button
            onClick={() => setStreamState("playback")}
            className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition cursor-pointer ${
              streamState === "playback"
                ? "bg-cyan-600 text-white"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            1. Video Playback (HLS CDN Edge Cache)
          </button>
          <button
            onClick={() => setStreamState("upload")}
            className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition cursor-pointer ${
              streamState === "upload"
                ? "bg-purple-600 text-white"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            2. Video Upload (Kafka + FFmpeg Workers)
          </button>
        </div>
      </div>

      {/* SVG Canvas (900 x 480) */}
      <svg viewBox="0 0 900 480" className="w-full h-auto text-zinc-100 font-mono">
        <defs>
          <linearGradient id="cyanDottedGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="100%" stopColor="#06b6d4" />
          </linearGradient>

          <linearGradient id="purpleDottedGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#c084fc" />
            <stop offset="100%" stopColor="#a855f7" />
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
            <FaTv className="w-4 h-4" />
            <FaLaptop className="w-4 h-4" />
          </div>
        </foreignObject>
        <text x="95" y="245" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="bold">Video Client</text>
        <rect x="45" y="252" width="100" height="22" rx="4" fill="#18181b" stroke="#27272a" />
        <text x="95" y="267" textAnchor="middle" fill="#38bdf8" fontSize="9" fontWeight="bold">
          {streamState === "playback" ? "GET /master.m3u8" : "POST /upload"}
        </text>

        {/* PATH: CLIENT -> STREAMING GATEWAY */}
        <path d="M 160 240 L 270 240" stroke="url(#blueDottedGrad)" strokeWidth="2.5" strokeDasharray="4 4">
          <animate attributeName="stroke-dashoffset" from="8" to="0" dur="0.8s" repeatCount="indefinite" />
        </path>

        {/* 2. STREAMING GATEWAY */}
        <polygon 
          points="320,185 390,185 435,240 390,295 320,295 275,240" 
          fill="#09090b" 
          stroke="#06b6d4" 
          strokeWidth="2" 
        />
        <foreignObject x="335" y="200" width="40" height="30">
          <div className="flex items-center justify-center text-cyan-400">
            <FaServer className="w-5 h-5" />
          </div>
        </foreignObject>
        <text x="355" y="242" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">Streaming</text>
        <text x="355" y="258" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold">Gateway</text>

        {/* TOP BRANCH: CDN EDGE CACHING & S3 STORAGE */}
        <path 
          d="M 400 200 L 520 100" 
          stroke={streamState === "playback" ? "url(#cyanDottedGrad)" : "#3f3f46"} 
          strokeWidth={streamState === "playback" ? "2.5" : "1.5"} 
          strokeDasharray="4 4"
        >
          {streamState === "playback" && (
            <animate attributeName="stroke-dashoffset" from="8" to="0" dur="0.8s" repeatCount="indefinite" />
          )}
        </path>

        <path d="M 640 100 L 700 100" stroke="url(#cyanDottedGrad)" strokeWidth="2" strokeDasharray="4 4">
          <animate attributeName="stroke-dashoffset" from="8" to="0" dur="0.8s" repeatCount="indefinite" />
        </path>

        {/* AWS S3 ORIGIN NODE WITH REACT-ICON */}
        <rect x="700" y="75" width="120" height="50" rx="10" fill="#09090b" stroke="#38bdf8" strokeWidth="1.5" />
        <foreignObject x="710" y="82" width="20" height="20">
          <div className="text-amber-500">
            <FaAws className="w-5 h-5 text-amber-500" />
          </div>
        </foreignObject>
        <text x="760" y="98" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">Blob Storage</text>
        <text x="760" y="114" textAnchor="middle" fill="#38bdf8" fontSize="8">S3 Raw Chunks</text>

        {/* CDN EDGE NODE WITH REACT-ICON */}
        <rect x="520" y="75" width="120" height="50" rx="10" fill="#082f49" stroke="#06b6d4" strokeWidth="1.5" />
        <foreignObject x="530" y="82" width="20" height="20">
          <div className="text-orange-400">
            <SiCloudflare className="w-5 h-5" />
          </div>
        </foreignObject>
        <text x="580" y="98" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="bold">CDN Edge</text>

        {/* MIDDLE BRANCH: REDIS MANIFEST CACHE */}
        <path 
          d="M 435 240 L 520 240" 
          stroke={streamState === "playback" ? "url(#cyanDottedGrad)" : "#3f3f46"} 
          strokeWidth={streamState === "playback" ? "3" : "1.5"} 
          strokeDasharray="4 4"
        >
          {streamState === "playback" && (
            <animate attributeName="stroke-dashoffset" from="8" to="0" dur="0.8s" repeatCount="indefinite" />
          )}
        </path>

        {/* REDIS MANIFEST NODE WITH REACT-ICON */}
        <rect 
          x="520" y="210" width="140" height="60" rx="10" 
          fill="#09090b" 
          stroke={streamState === "playback" ? "#06b6d4" : "#38bdf8"} 
          strokeWidth={streamState === "playback" ? "2" : "1"} 
        />
        <foreignObject x="532" y="222" width="24" height="24">
          <div className="text-red-500">
            <SiRedis className="w-6 h-6" />
          </div>
        </foreignObject>
        <text x="600" y="238" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">Redis Manifests</text>
        <text x="600" y="254" textAnchor="middle" fill="#06b6d4" fontSize="8">.m3u8 1080p/720p/480p</text>

        {/* LOWER BRANCH: TRANSCODING WORKERS */}
        <path 
          d="M 410 270 L 520 330" 
          stroke={streamState === "upload" ? "url(#purpleDottedGrad)" : "#3f3f46"} 
          strokeWidth={streamState === "upload" ? "2.5" : "1.5"} 
          strokeDasharray="4 4"
        >
          {streamState === "upload" && (
            <animate attributeName="stroke-dashoffset" from="8" to="0" dur="0.8s" repeatCount="indefinite" />
          )}
        </path>

        <rect x="520" y="305" width="140" height="55" rx="10" fill="#3b0764" stroke="#a855f7" strokeWidth="1.5" />
        <foreignObject x="532" y="315" width="24" height="24">
          <div className="text-purple-400">
            <FaCogs className="w-5 h-5" />
          </div>
        </foreignObject>
        <text x="600" y="332" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="bold">Encoders</text>
        <text x="600" y="348" textAnchor="middle" fill="#e9d5ff" fontSize="8">FFmpeg H.264 Workers</text>

        {/* BOTTOM BRANCH: KAFKA QUEUE WITH REACT-ICON */}
        {streamState === "upload" && (
          <path d="M 355 295 L 355 420 L 700 420" stroke="#a855f7" strokeWidth="2" strokeDasharray="4 4">
            <animate attributeName="stroke-dashoffset" from="8" to="0" dur="0.8s" repeatCount="indefinite" />
          </path>
        )}
        <g transform="translate(700, 395)">
          <rect x="0" y="0" width="140" height="50" rx="10" fill="#09090b" stroke={streamState === "upload" ? "#a855f7" : "#27272a"} strokeWidth={streamState === "upload" ? "2" : "1"} />
          <foreignObject x="15" y="13" width="24" height="24">
            <div className="text-amber-400">
              <SiApachekafka className="w-5 h-5" />
            </div>
          </foreignObject>
          <text x="78" y="24" textAnchor="middle" fill="#c084fc" fontSize="10" fontWeight="bold">Message Queue</text>
          <text x="78" y="38" textAnchor="middle" fill="#71717a" fontSize="8">Kafka Transcode</text>
        </g>
      </svg>

      {/* Footer Details */}
      <div className="pt-3 border-t border-zinc-900 flex items-center justify-between text-xs font-mono text-zinc-400 flex-wrap gap-2">
        <span className="flex items-center gap-1.5 text-zinc-300">
          <CheckCircle2 className="w-4 h-4 text-cyan-400" />
          <span>Active Pipeline: <strong className={streamState === "playback" ? "text-cyan-400" : "text-purple-400"}>
            {streamState === "playback" ? "Video Playback -> HLS Adaptive Bitrate Stream (.m3u8)" : "Video Upload -> Kafka Transcoding Queue + FFmpeg Workers"}
          </strong></span>
        </span>
      </div>
    </div>
  );
};

export default AnimatedVideoStreamingDiagram;
