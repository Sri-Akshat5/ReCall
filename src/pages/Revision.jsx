import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import JavaRevision from "../components/java/JavaRevision";
import CollectionJava from "../components/java/CollectionJava";
import DsaRevision from "../components/dsa/DsaRevision";
import {
  Code2,
  Layers,
  Cpu,
  Database,
  ShieldCheck,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Brain,
  CheckCircle2,
  Bookmark,
  Workflow
} from "lucide-react";

export const Revision = ({ targetRecallKey, onClearTargetKey, onNavigateToInterview }) => {
  const [searchParams] = useSearchParams();
  const subjectFromUrl = searchParams.get("subject");

  const [selectedSubject, setSelectedSubject] = useState(
    targetRecallKey ? "java" : (subjectFromUrl || null)
  );

  useEffect(() => {
    if (subjectFromUrl) {
      setSelectedSubject(subjectFromUrl);
    }
  }, [subjectFromUrl]);

  // If a target recall key is provided (e.g. from keyword click in QA bank), automatically open Java deck
  useEffect(() => {
    if (targetRecallKey) {
      setSelectedSubject("java");
    }
  }, [targetRecallKey]);

  const subjects = [
    {
      id: "dsa",
      name: "DSA Study Material & Pattern Recognition Suite",
      desc: "Comprehensive theoretical concepts for all Data Structures & Algorithms (Arrays, Lists, Trees, Graphs, DP) + Pattern Recognition Guide for 20 essential coding patterns.",
      icon: Workflow,
      cardCount: 200,
      active: true,
      badge: "Active Deck",
      tags: ["Core Theory & Proofs", "20 Coding Patterns", "Pattern Recognition", "Memory Mnemonics"]
    },
    {
      id: "java",
      name: "Core Java & JVM Master Revision",
      desc: "Complete Java master concept revision from Java 1.0 to Java 2025 with JVM internals, Virtual Threads, G1GC/ZGC, and animated architecture diagrams.",
      icon: Code2,
      cardCount: 375,
      active: true,
      badge: "Active Deck",
      tags: ["Java 1.0 -> 2025", "JVM Internals", "Virtual Threads", "Animated Diagrams"]
    },
    {
      id: "collections",
      name: "Java Collections Framework (JCF)",
      desc: "Deep-dive revision for Collections: Hierarchy, List, Set, Queue/Deque, Map (HashMap internals, treeification), Hashing contract, Comparable/Comparator, Generics PECS, and Complexity matrix.",
      icon: Database,
      cardCount: 150,
      active: true,
      badge: "Active Deck",
      tags: ["HashMap Internals", "PECS Generics", "Concurrent Collections", "Complexity Matrix"]
    },
    {
      id: "react",
      name: "React 19 & Web Architecture",
      desc: "Server Components, Server Actions, useOptimistic, Fiber Reconciler & State Management study notes.",
      icon: Layers,
      cardCount: 25,
      active: false,
      badge: "Coming Soon",
      tags: ["React 19", "RSC", "Fiber", "Hooks"]
    },
    {
      id: "systemdesign",
      name: "Distributed Systems & Architecture",
      desc: "Consistent Hashing, CAP Theorem, Database Sharding, Caching Topologies & API Gateway recall notes.",
      icon: Cpu,
      cardCount: 30,
      active: false,
      badge: "Coming Soon",
      tags: ["System Design", "Kafka", "Redis", "CAP"]
    },
    {
      id: "security",
      name: "Web Security & Protocols",
      desc: "OAuth 2.0 / OIDC, JWT Revocation, CORS, XSS, CSRF Prevention & TLS Handshake mechanics.",
      icon: ShieldCheck,
      cardCount: 15,
      active: false,
      badge: "Coming Soon",
      tags: ["OAuth2", "JWT", "HTTPS", "CORS"]
    }
  ];

  // If DSA subject selected, render DsaRevision module
  if (selectedSubject === "dsa") {
    return (
      <div className="space-y-3 sm:space-y-4">
        <div className="flex items-center justify-between">
          <button
            onClick={() => {
              setSelectedSubject(null);
              if (onClearTargetKey) onClearTargetKey();
            }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-slate-300 text-slate-800 hover:bg-slate-100 dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-300 dark:hover:text-white dark:hover:bg-zinc-800 text-xs font-bold transition cursor-pointer active:scale-95"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All Decks</span>
          </button>
        </div>

        <DsaRevision
          onBackToRevision={() => {
            setSelectedSubject(null);
            if (onClearTargetKey) onClearTargetKey();
          }}
        />
      </div>
    );
  }

  // If Java subject selected, render JavaRecall module
  if (selectedSubject === "java") {
    return (
      <div className="space-y-3 sm:space-y-4">
        <div className="flex items-center justify-between">
          <button
            onClick={() => {
              setSelectedSubject(null);
              if (onClearTargetKey) onClearTargetKey();
            }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-slate-300 text-slate-800 hover:bg-slate-100 dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-300 dark:hover:text-white dark:hover:bg-zinc-800 text-xs font-bold transition cursor-pointer active:scale-95"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All Decks</span>
          </button>
        </div>

        <JavaRevision
          targetCardKey={targetRecallKey}
          onBackToInterview={onNavigateToInterview}
          onBackToRevision={() => {
            setSelectedSubject(null);
            if (onClearTargetKey) onClearTargetKey();
          }}
        />
      </div>
    );
  }

  // If Collections subject selected, render CollectionJava module
  if (selectedSubject === "collections") {
    return (
      <div className="space-y-3 sm:space-y-4">
        <div className="flex items-center justify-between">
          <button
            onClick={() => {
              setSelectedSubject(null);
              if (onClearTargetKey) onClearTargetKey();
            }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-slate-300 text-slate-800 hover:bg-slate-100 dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-300 dark:hover:text-white dark:hover:bg-zinc-800 text-xs font-bold transition cursor-pointer active:scale-95"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All Decks</span>
          </button>
        </div>

        <CollectionJava
          onBackToRevision={() => {
            setSelectedSubject(null);
            if (onClearTargetKey) onClearTargetKey();
          }}
        />
      </div>
    );
  }

  return (
    <div className="space-y-5 sm:space-y-6 font-sans max-w-7xl mx-auto px-1 sm:px-0">

      {/* Compact Header */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 dark:bg-zinc-950 dark:border-zinc-800 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="space-y-1">
          <h1 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Brain className="w-4.5 h-4.5 text-slate-700 dark:text-zinc-300" />
            Active Recall Revision Hub
          </h1>
          <p className="text-xs text-slate-500 dark:text-zinc-400">
            Subject revision decks with Leitner spaced repetition ratings & study notes.
          </p>
        </div>
        <div className="px-3 py-1 rounded-xl bg-slate-100 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 text-xs font-mono text-slate-600 dark:text-zinc-400 shrink-0 self-start sm:self-auto">
          3 Study Decks
        </div>
      </div>

      {/* Subject Deck Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {subjects.map((subject) => {
          const Icon = subject.icon;
          return (
            <div
              key={subject.id}
              onClick={() => subject.active && setSelectedSubject(subject.id)}
              className={`p-5 sm:p-6 rounded-3xl border transition flex flex-col justify-between space-y-5 ${subject.active
                ? "bg-white border-slate-200 hover:border-slate-400 dark:bg-zinc-950 dark:border-zinc-800 dark:hover:border-zinc-500 cursor-pointer group active:scale-[0.99]"
                : "bg-slate-50 border-slate-200 opacity-60 dark:bg-zinc-950/50 dark:border-zinc-900 cursor-not-allowed"
                }`}
            >
              <div className="space-y-4">

                {/* Top Icon & Status Badge */}
                <div className="flex items-center justify-between">
                  <div className={`w-11 h-11 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center font-bold ${subject.active ? "bg-slate-900 text-white dark:bg-white dark:text-black" : "bg-slate-200 text-slate-500 dark:bg-zinc-900 dark:text-zinc-500"
                    }`}>
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>

                  <span className={`text-[10px] font-mono px-3 py-1 rounded-full border ${subject.active
                    ? "bg-slate-100 border-slate-300 text-slate-900 font-bold dark:bg-zinc-900 dark:border-zinc-700 dark:text-white"
                    : "bg-slate-100 border-slate-200 text-slate-400 dark:bg-zinc-900/40 dark:border-zinc-800 dark:text-zinc-500"
                    }`}>
                    {subject.badge}
                  </span>
                </div>

                {/* Subject Description */}
                <div className="space-y-1.5">
                  <h2 className={`text-lg sm:text-xl font-bold transition-colors ${subject.active ? "text-slate-900 dark:text-white group-hover:text-slate-700 dark:group-hover:text-zinc-300" : "text-slate-400 dark:text-zinc-500"
                    }`}>
                    {subject.name}
                  </h2>

                  <p className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed">
                    {subject.desc}
                  </p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {subject.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200 dark:bg-zinc-900 dark:text-zinc-400 dark:border-zinc-800"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

              </div>

              {/* Action Footer */}
              <div className="pt-4 border-t border-slate-200 dark:border-zinc-900 flex items-center justify-between text-xs font-semibold">
                <span className="text-slate-500 dark:text-zinc-500 font-mono">
                  {subject.cardCount} Topics & Notes
                </span>

                {subject.active ? (
                  <span className="text-slate-900 dark:text-white inline-flex items-center gap-1 font-bold group-hover:translate-x-1 transition-transform">
                    Start Revision <ArrowRight className="w-4 h-4" />
                  </span>
                ) : (
                  <span className="text-slate-400 dark:text-zinc-600">In Development</span>
                )}
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};

export default Revision;
