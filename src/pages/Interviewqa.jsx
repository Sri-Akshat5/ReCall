import React, { useState } from "react";
import JavaInterview from "../components/java/JavaInterview";
import CollectionInterview from "../components/java/CollectionInterview";
import {
  Code2,
  Layers,
  Cpu,
  Database,
  ShieldCheck,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  BookOpen,
  CheckCircle2,
  FileText
} from "lucide-react";

export const Interviewqa = ({ onSelectRecallCard, searchTerm }) => {
  const [selectedSubject, setSelectedSubject] = useState(null);

  // If a global search query is entered in the Navbar while on QA bank Hub, automatically select Java subject to show matching search results immediately
  const activeSubject = selectedSubject || (searchTerm ? "java" : null);

  const subjects = [
    {
      id: "java",
      name: "Core Java & JVM Internals",
      desc: "Platform Independence, JVM/JRE/JDK, Memory Pools, Access Modifiers, Collections & Final keyword.",
      icon: Code2,
      questionCount: 375,
      active: true,
      badge: "Active Module",
      tags: ["Java 21", "JVM Memory", "OOP", "Collections"]
    },
    {
      id: "collection",
      name: "Java Collections Framework Q&A",
      desc: "ArrayList, LinkedList, HashMap, ConcurrentHashMap, PriorityQueue, Red-Black Trees, Fail-Fast Iterators & LRU Cache.",
      icon: Database,
      questionCount: 65,
      active: true,
      badge: "65 Questions",
      tags: ["JCF", "HashMap", "ConcurrentHashMap", "LRU Cache", "Fail-Fast"]
    },
    {
      id: "react",
      name: "React 19 & Modern Web",
      desc: "Server Components, Server Actions, useOptimistic, Fiber Reconciler, Hooks & State Management.",
      icon: Layers,
      questionCount: 25,
      active: false,
      badge: "Coming Soon",
      tags: ["React 19", "RSC", "Actions", "Fiber"]
    },
    {
      id: "systemdesign",
      name: "Distributed System Design",
      desc: "Consistent Hashing, CAP Theorem, Database Sharding, Caching Topologies, API Gateways.",
      icon: Cpu,
      questionCount: 30,
      active: false,
      badge: "Coming Soon",
      tags: ["Scalability", "Redis", "Kafka", "Sharding"]
    },
    {
      id: "security",
      name: "Web Security & Protocols",
      desc: "OAuth 2.0 / OIDC, JWT Revocation, CORS, XSS, CSRF Prevention, TLS Handshake mechanics.",
      icon: ShieldCheck,
      questionCount: 15,
      active: false,
      badge: "Coming Soon",
      tags: ["OAuth2", "JWT", "HTTPS", "CORS"]
    }
  ];

  // If Java is selected, show JavaInterview component
  if (activeSubject === "java") {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setSelectedSubject(null)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-slate-300 text-xs font-bold text-slate-700 hover:text-slate-900 hover:bg-slate-100 dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-300 dark:hover:text-white dark:hover:bg-zinc-800 transition cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Interview Subjects</span>
          </button>

          <div className="text-xs font-mono text-slate-500 dark:text-zinc-400">
            Subject: <span className="text-slate-900 dark:text-white font-bold">Core Java & JVM</span>
          </div>
        </div>

        <JavaInterview onSelectRecallCard={onSelectRecallCard} searchTerm={searchTerm} />
      </div>
    );
  }

  // If Java Collections is selected, show CollectionInterview component
  if (activeSubject === "collection") {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setSelectedSubject(null)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-slate-300 text-xs font-bold text-slate-700 hover:text-slate-900 hover:bg-slate-100 dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-300 dark:hover:text-white dark:hover:bg-zinc-800 transition cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Interview Subjects</span>
          </button>

          <div className="text-xs font-mono text-slate-500 dark:text-zinc-400">
            Subject: <span className="text-slate-900 dark:text-white font-bold">Java Collections Framework Q&A</span>
          </div>
        </div>

        <CollectionInterview onSelectRecallCard={onSelectRecallCard} searchTerm={searchTerm} />
      </div>
    );
  }

  return (
    <div className="space-y-8 font-sans">

      {/* Portal Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 dark:bg-zinc-950 dark:border-zinc-800 space-y-4  ">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700 dark:bg-zinc-900 dark:border-zinc-800 text-xs font-mono dark:text-zinc-300">
          <Sparkles className="w-3.5 h-3.5 text-slate-900 dark:text-white" />
          <span>Multi-Domain Technical Question Bank</span>
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">Interview QA Hub</h1>
          <p className="text-slate-600 dark:text-zinc-400 text-xs sm:text-sm max-w-2xl leading-relaxed">
            Select a technical subject box below to explore curated interview questions, golden answer lines, comparison tables, and active recall keyword links.
          </p>
        </div>
      </div>

      {/* Subject Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {subjects.map((subject) => {
          const Icon = subject.icon;
          return (
            <div
              key={subject.id}
              onClick={() => subject.active && setSelectedSubject(subject.id)}
              className={`p-6 rounded-3xl border transition flex flex-col justify-between space-y-6 ${subject.active
                ? "bg-white border-slate-200 hover:border-slate-400 dark:bg-zinc-950 dark:border-zinc-800 dark:hover:border-zinc-500 cursor-pointer   group"
                : "bg-slate-50 border-slate-200 opacity-60 dark:bg-zinc-950/50 dark:border-zinc-900 cursor-not-allowed"
                }`}
            >
              <div className="space-y-4">

                {/* Top Badge & Icon */}
                <div className="flex items-center justify-between">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold ${subject.active ? "bg-slate-900 text-white dark:bg-white dark:text-black" : "bg-slate-200 text-slate-500 dark:bg-zinc-900 dark:text-zinc-500"
                    }`}>
                    <Icon className="w-6 h-6" />
                  </div>

                  <span className={`text-[10px] font-mono px-3 py-1 rounded-full border ${subject.active
                    ? "bg-slate-100 border-slate-300 text-slate-900 font-bold dark:bg-zinc-900 dark:border-zinc-700 dark:text-white"
                    : "bg-slate-100 border-slate-200 text-slate-400 dark:bg-zinc-900/40 dark:border-zinc-800 dark:text-zinc-500"
                    }`}>
                    {subject.badge}
                  </span>
                </div>

                {/* Subject Info */}
                <div className="space-y-2">
                  <h2 className={`text-xl font-bold transition-colors ${subject.active ? "text-slate-900 dark:text-white group-hover:text-slate-700 dark:group-hover:text-zinc-300" : "text-slate-400 dark:text-zinc-500"
                    }`}>
                    {subject.name}
                  </h2>

                  <p className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed">
                    {subject.desc}
                  </p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 pt-2">
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

              {/* Card Action Footer */}
              <div className="pt-4 border-t border-slate-200 dark:border-zinc-900 flex items-center justify-between text-xs font-semibold">
                <span className="text-slate-500 dark:text-zinc-500 font-mono">
                  {subject.questionCount} Questions
                </span>

                {subject.active ? (
                  <span className="text-slate-900 dark:text-white inline-flex items-center gap-1 font-bold group-hover:translate-x-1 transition-transform">
                    Open QA Bank <ArrowRight className="w-4 h-4" />
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

export default Interviewqa;
