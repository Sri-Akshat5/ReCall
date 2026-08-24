import React from "react";
import { useNavigate } from "react-router-dom";
import { 
  ArrowLeft, 
  BookOpen, 
  Building2, 
  CheckCircle2, 
  Cpu, 
  Database, 
  Globe, 
  Layers, 
  Server, 
  ShieldCheck, 
  Sparkles, 
  Zap 
} from "lucide-react";
import { SYSTEM_DESIGN_TOPICS } from "./systemDesignData";
import AdBanner from "../common/AdBanner";

export const GenericBlueprintPage = ({ topicId }) => {
  const navigate = useNavigate();

  // Find matching topic or fallback to first
  const topic = SYSTEM_DESIGN_TOPICS.find((t) => t.id === topicId) || SYSTEM_DESIGN_TOPICS[0];

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
          onClick={() => {
            const lldTargetId = topic.id.startsWith("hld-")
              ? `lld-${topic.id.split("-")[1]}`
              : "lld-1";
            navigate(`/system-design/${lldTargetId}`);
          }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-600 dark:text-purple-400 hover:bg-purple-500/20 text-xs font-bold transition cursor-pointer"
        >
          <Cpu className="w-4 h-4" />
          <span>View Low-Level Design (LLD & OOD)</span>
        </button>
      </div>

      {/* Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 dark:bg-zinc-950 dark:border-zinc-800 space-y-4">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-xs font-mono font-bold uppercase tracking-wider">
            <BookOpen className="w-3.5 h-3.5" />
            <span>{topic.category}</span>
          </div>

          <div className="flex items-center gap-1.5 flex-wrap">
            {topic.companies && topic.companies.map((c, i) => (
              <span key={i} className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-md bg-slate-100 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 text-slate-700 dark:text-zinc-300 font-medium">
                <Building2 className="w-2.5 h-2.5 text-slate-400" />
                {c}
              </span>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {topic.title}
          </h1>
          <p className="text-slate-600 dark:text-zinc-400 text-xs sm:text-sm max-w-3xl leading-relaxed">
            {topic.summary}
          </p>
        </div>
      </div>

      {/* SECTION 1: KEY CONCEPTS */}
      <div className="p-6 rounded-3xl bg-white border border-slate-200 dark:bg-zinc-950 dark:border-zinc-800 space-y-6">
        <div className="flex items-center gap-2 text-slate-900 dark:text-white border-b border-slate-100 dark:border-zinc-900 pb-3">
          <Sparkles className="w-5 h-5 text-amber-500" />
          <h2 className="text-lg font-bold">1. Core Architectural Concepts</h2>
        </div>

        <div className="space-y-3">
          {topic.keyConcepts && topic.keyConcepts.map((concept, idx) => (
            <div key={idx} className="flex items-start gap-2.5 p-3 rounded-2xl bg-slate-50 dark:bg-zinc-900/60 border border-slate-200 dark:border-zinc-800 text-xs text-slate-700 dark:text-zinc-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <span>{concept}</span>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 2: HIGH LEVEL ARCHITECTURE BREAKDOWN */}
      <div className="p-6 rounded-3xl bg-white border border-slate-200 dark:bg-zinc-950 dark:border-zinc-800 space-y-6">
        <div className="flex items-center gap-2 text-slate-900 dark:text-white border-b border-slate-100 dark:border-zinc-900 pb-3">
          <Cpu className="w-5 h-5 text-indigo-500" />
          <h2 className="text-lg font-bold">2. System Blueprint & "Why Every Component is Required"</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-zinc-900/80 border border-slate-200 dark:border-zinc-800 space-y-2">
            <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold text-xs">
              <Globe className="w-4 h-4" />
              <span>Global CDN & Route53 DNS</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed">
              <strong>Why Required?</strong> Routes incoming traffic to nearest data center based on geo-latency and caches static edge assets to reduce origin server load.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-zinc-900/80 border border-slate-200 dark:border-zinc-800 space-y-2">
            <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400 font-bold text-xs">
              <ShieldCheck className="w-4 h-4" />
              <span>L7 Load Balancer & API Gateway</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed">
              <strong>Why Required?</strong> Manages TLS termination, authentication tokens, rate-limiting, and distributes HTTP traffic across backend microservice clusters.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-zinc-900/80 border border-slate-200 dark:border-zinc-800 space-y-2">
            <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-xs">
              <Database className="w-4 h-4" />
              <span>Distributed Cache & Datastores</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed">
              <strong>Why Required?</strong> Redis caches hot keys in memory with sub-5ms latency. Cassandra/PostgreSQL handle sharded persistent transactional storage.
            </p>
          </div>
        </div>
      </div>

      <AdBanner adSlot="9876543214" />
    </div>
  );
};

export default GenericBlueprintPage;
