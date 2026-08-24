import React, { useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import {
  Cpu,
  ArrowLeft,
  BookOpen,
  Database,
  Code2,
  Table as TableIcon,
  Terminal,
  Layers,
  Sparkles,
  CheckCircle2,
  ExternalLink,
  ShieldCheck,
  Zap,
  Network
} from "lucide-react";
import { LLD_BLUEPRINTS } from "./lldData";
import { SeoHead } from "../common/SeoHead";
import AdBanner from "../common/AdBanner";
import { renderFormattedText } from "../../utils/formatText";

export const LldPage = () => {
  const navigate = useNavigate();
  const { topicId } = useParams();

  // Find corresponding LLD Blueprint data (default to lld-1 if not found)
  const lldData = LLD_BLUEPRINTS[topicId] || LLD_BLUEPRINTS["lld-1"];
  const [activeTab, setActiveTab] = useState("ood"); // "ood", "schema", "api", "code", "patterns"
  const [codeLanguage, setCodeLanguage] = useState("java"); // "java", "python", "typescript", "javascript"

  return (
    <>
      <SeoHead
        title={`${lldData.title} | Low-Level System Design & OOD`}
        description={`Master Low-Level Design (LLD) for ${lldData.title}. Complete OOD class diagrams, database ER schemas, REST API specs, and production code snippets.`}
        canonicalUrl={`https://recall.app/system-design/${lldData.id}`}
        type="TechArticle"
      />

      <div className="space-y-8 font-sans pb-16" id={`lld-page-${lldData.id}`}>
        {/* Navigation Bar & Back Button */}
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <button
            onClick={() => navigate("/system-design")}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-slate-300 text-xs font-bold text-slate-700 hover:text-slate-900 hover:bg-slate-100 dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-300 dark:hover:text-white dark:hover:bg-zinc-800 transition cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to System Design Hub</span>
          </button>

          {/* Cross-Reference Link to HLD Blueprint */}
          {lldData.hldPath && (
            <Link
              to={lldData.hldPath}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400 hover:bg-amber-500/20 text-xs font-bold transition cursor-pointer"
            >
              <Network className="w-4 h-4" />
              <span>View Related HLD Architecture: {lldData.hldTitle}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          )}
        </div>

        {/* Top Header Banner */}
        <header className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 dark:bg-zinc-950 dark:border-zinc-800 space-y-4">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-600 dark:text-purple-400 text-xs font-mono font-bold uppercase tracking-wider">
              <Cpu className="w-3.5 h-3.5" />
              <span>{lldData.category}</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-slate-100 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 text-xs font-mono font-bold text-slate-700 dark:text-zinc-300">
                Difficulty: {lldData.difficulty}
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {lldData.title}
            </h1>
            <p className="text-slate-600 dark:text-zinc-400 text-xs sm:text-sm max-w-3xl leading-relaxed">
              {lldData.subtitle}
            </p>
          </div>

          {/* Design Pattern Badges */}
          <div className="pt-2 flex flex-wrap gap-2">
            {lldData.designPatterns.map((pattern, idx) => (
              <span
                key={idx}
                className="text-xs font-mono px-3 py-1 rounded-xl bg-purple-50 dark:bg-purple-950/30 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800/40 font-bold"
              >
                ⚡ {pattern}
              </span>
            ))}
          </div>
        </header>

        {/* Interactive Tabs Menu */}
        <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-white border border-slate-200 dark:bg-zinc-950 dark:border-zinc-800 overflow-x-auto">
          <button
            onClick={() => setActiveTab("ood")}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer shrink-0 ${
              activeTab === "ood"
                ? "bg-slate-900 text-white dark:bg-white dark:text-black shadow-sm"
                : "text-slate-600 hover:text-slate-900 dark:text-zinc-400 dark:hover:text-white"
            }`}
          >
            <Code2 className="w-4 h-4" />
            <span>OOD Class Diagram</span>
          </button>

          <button
            onClick={() => setActiveTab("schema")}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer shrink-0 ${
              activeTab === "schema"
                ? "bg-slate-900 text-white dark:bg-white dark:text-black shadow-sm"
                : "text-slate-600 hover:text-slate-900 dark:text-zinc-400 dark:hover:text-white"
            }`}
          >
            <Database className="w-4 h-4" />
            <span>Database ER Schema</span>
          </button>

          <button
            onClick={() => setActiveTab("api")}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer shrink-0 ${
              activeTab === "api"
                ? "bg-slate-900 text-white dark:bg-white dark:text-black shadow-sm"
                : "text-slate-600 hover:text-slate-900 dark:text-zinc-400 dark:hover:text-white"
            }`}
          >
            <Terminal className="w-4 h-4" />
            <span>API Specs & Payloads</span>
          </button>

          <button
            onClick={() => setActiveTab("code")}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer shrink-0 ${
              activeTab === "code"
                ? "bg-slate-900 text-white dark:bg-white dark:text-black shadow-sm"
                : "text-slate-600 hover:text-slate-900 dark:text-zinc-400 dark:hover:text-white"
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Production Code</span>
          </button>

          <button
            onClick={() => setActiveTab("analysis")}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer shrink-0 ${
              activeTab === "analysis"
                ? "bg-slate-900 text-white dark:bg-white dark:text-black shadow-sm"
                : "text-slate-600 hover:text-slate-900 dark:text-zinc-400 dark:hover:text-white"
            }`}
          >
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>Patterns & Concurrency Analysis</span>
          </button>
        </div>

        {/* TAB 1: OOD CLASS DIAGRAM & DEFINITIONS */}
        {activeTab === "ood" && (
          <section className="space-y-6">
            <div className="p-6 rounded-3xl bg-white border border-slate-200 dark:bg-zinc-950 dark:border-zinc-800 space-y-6">
              <div className="space-y-2">
                <h2 className="text-xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                  <Code2 className="w-5 h-5 text-purple-500" />
                  <span>Object-Oriented Class Specifications</span>
                </h2>
                <p className="text-xs text-slate-600 dark:text-zinc-400">
                  Detailed attributes, encapsulation visibility, methods, and design pattern roles.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {lldData.oodClasses.map((cls, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-slate-50 dark:bg-zinc-900/60 border border-slate-200 dark:border-zinc-800 space-y-4 font-mono text-xs"
                  >
                    <div className="flex items-center justify-between border-b border-slate-200 dark:border-zinc-800 pb-3">
                      <div>
                        <span className="text-[10px] text-purple-600 dark:text-purple-400 font-bold uppercase tracking-wider">
                          {cls.type}
                        </span>
                        <h3 className="text-base font-bold text-slate-900 dark:text-white">{cls.name}</h3>
                      </div>
                    </div>

                    <p className="text-xs text-slate-600 dark:text-zinc-400 font-sans leading-relaxed">
                      {cls.description}
                    </p>

                    {/* Attributes */}
                    <div className="space-y-1">
                      <span className="text-[11px] font-bold text-slate-700 dark:text-zinc-300">Attributes:</span>
                      <ul className="space-y-1 text-slate-800 dark:text-zinc-200 pl-2">
                        {cls.attributes.map((attr, aIdx) => (
                          <li key={aIdx} className="flex items-center gap-2">
                            <span className="text-purple-500">•</span>
                            <span>{attr}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Methods */}
                    <div className="space-y-1 pt-2 border-t border-slate-200 dark:border-zinc-800">
                      <span className="text-[11px] font-bold text-slate-700 dark:text-zinc-300">Methods:</span>
                      <ul className="space-y-1 text-emerald-600 dark:text-emerald-400 pl-2 font-bold">
                        {cls.methods.map((mth, mIdx) => (
                          <li key={mIdx} className="flex items-center gap-2">
                            <span>⚡ {mth}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* TAB 2: DATABASE ER SCHEMA & INDEXING */}
        {activeTab === "schema" && (
          <section className="space-y-6">
            <div className="p-6 rounded-3xl bg-white border border-slate-200 dark:bg-zinc-950 dark:border-zinc-800 space-y-6">
              <div className="flex items-center justify-between gap-4 flex-wrap">
                <div className="space-y-1">
                  <h2 className="text-xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                    <Database className="w-5 h-5 text-blue-500" />
                    <span>Database ER Schema & Indexing</span>
                  </h2>
                  <p className="text-xs text-slate-600 dark:text-zinc-400">
                    Target Engine: <span className="font-bold text-slate-900 dark:text-white font-mono">{lldData.databaseSchema.dbEngine}</span>
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                {lldData.databaseSchema.tables.map((table, tIdx) => (
                  <div key={tIdx} className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-1 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 font-mono text-xs font-bold border border-blue-500/20">
                          Table: {table.tableName}
                        </span>
                        <span className="text-xs text-slate-500 dark:text-zinc-400 font-sans">{table.description}</span>
                      </div>
                    </div>

                    {/* Columns Table */}
                    <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-zinc-800 font-mono text-xs">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="bg-slate-100 dark:bg-zinc-900 text-slate-900 dark:text-white font-bold">
                            <th className="p-3 border-b border-slate-200 dark:border-zinc-800">Column Name</th>
                            <th className="p-3 border-b border-slate-200 dark:border-zinc-800">Data Type</th>
                            <th className="p-3 border-b border-slate-200 dark:border-zinc-800">Constraints</th>
                            <th className="p-3 border-b border-slate-200 dark:border-zinc-800">Description</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-zinc-900 text-slate-700 dark:text-zinc-300">
                          {table.columns.map((col, cIdx) => (
                            <tr key={cIdx} className="hover:bg-slate-50 dark:hover:bg-zinc-900/50">
                              <td className="p-3 font-bold text-slate-900 dark:text-white">{col.name}</td>
                              <td className="p-3 text-purple-600 dark:text-purple-400">{col.type}</td>
                              <td className="p-3 font-bold text-amber-600 dark:text-amber-400">{col.constraints}</td>
                              <td className="p-3 font-sans text-slate-600 dark:text-zinc-400">{col.desc}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {/* DDL Indexing Commands */}
                    {table.indexes && (
                      <div className="p-3 rounded-xl bg-slate-900 text-slate-200 font-mono text-xs overflow-x-auto space-y-1">
                        <span className="text-slate-500 font-bold uppercase text-[10px]">Indexes & DDL Constraints:</span>
                        {table.indexes.map((idxSql, iIdx) => (
                          <div key={iIdx} className="text-emerald-400">{idxSql}</div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* TAB 3: REST & GRPC API ENDPOINT SPECS */}
        {activeTab === "api" && (
          <section className="space-y-6">
            <div className="p-6 rounded-3xl bg-white border border-slate-200 dark:bg-zinc-950 dark:border-zinc-800 space-y-6">
              <div className="space-y-2">
                <h2 className="text-xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                  <Terminal className="w-5 h-5 text-emerald-500" />
                  <span>API Endpoint Contracts & Request/Response Payloads</span>
                </h2>
                <p className="text-xs text-slate-600 dark:text-zinc-400">
                  HTTP method routes, JSON request schemas, response formats, and HTTP status codes.
                </p>
              </div>

              <div className="space-y-6">
                {lldData.apiEndpoints.map((api, aIdx) => (
                  <div
                    key={aIdx}
                    className="p-5 rounded-2xl bg-slate-50 dark:bg-zinc-900/60 border border-slate-200 dark:border-zinc-800 space-y-4"
                  >
                    <div className="flex items-center gap-3 flex-wrap">
                      <span
                        className={`px-3 py-1 rounded-xl font-mono text-xs font-extrabold ${
                          api.method === "POST"
                            ? "bg-emerald-500 text-white"
                            : api.method === "GET"
                            ? "bg-blue-500 text-white"
                            : api.method === "WS"
                            ? "bg-purple-500 text-white"
                            : "bg-slate-700 text-white"
                        }`}
                      >
                        {api.method}
                      </span>
                      <span className="font-mono text-sm font-bold text-slate-900 dark:text-white">{api.path}</span>
                    </div>

                    <p className="text-xs text-slate-600 dark:text-zinc-400">{api.description}</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Request Payload */}
                      <div className="space-y-1">
                        <span className="text-[11px] font-mono font-bold uppercase text-slate-500">Request Body:</span>
                        <pre className="p-3 rounded-xl bg-slate-900 text-slate-100 font-mono text-xs overflow-x-auto leading-relaxed border border-slate-800">
                          <code>{api.requestBody}</code>
                        </pre>
                      </div>

                      {/* Response Payload */}
                      <div className="space-y-1">
                        <span className="text-[11px] font-mono font-bold uppercase text-slate-500">Response Body:</span>
                        <pre className="p-3 rounded-xl bg-slate-900 text-emerald-400 font-mono text-xs overflow-x-auto leading-relaxed border border-slate-800">
                          <code>{api.responseBody}</code>
                        </pre>
                      </div>
                    </div>

                    <div className="pt-2 text-xs font-mono text-slate-500 dark:text-zinc-400">
                      Status Codes: <span className="font-bold text-slate-900 dark:text-white">{api.statusCodes}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* TAB 4: PRODUCTION CODE IMPLEMENTATION */}
        {activeTab === "code" && (
          <section className="space-y-6">
            <div className="p-6 rounded-3xl bg-white border border-slate-200 dark:bg-zinc-950 dark:border-zinc-800 space-y-4">
              <div className="flex items-center justify-between gap-4 flex-wrap">
                <div className="space-y-1">
                  <h2 className="text-xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                    <Layers className="w-5 h-5 text-amber-500" />
                    <span>Production Code Implementation</span>
                  </h2>
                  <p className="text-xs text-slate-600 dark:text-zinc-400">
                    Production-grade implementation featuring thread safety, error handling, and design patterns across languages.
                  </p>
                </div>

                {/* Multi-Language Selector Tabs */}
                {lldData.codeExamples && (
                  <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-100 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800">
                    {[
                      { id: "java", label: "Java 17+" },
                      { id: "python", label: "Python 3.11" },
                      { id: "typescript", label: "TypeScript" },
                      { id: "javascript", label: "JavaScript (ES6)" }
                    ].map((lang) => (
                      <button
                        key={lang.id}
                        onClick={() => setCodeLanguage(lang.id)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition cursor-pointer ${
                          codeLanguage === lang.id
                            ? "bg-purple-600 text-white shadow-sm"
                            : "text-slate-600 hover:text-slate-900 dark:text-zinc-400 dark:hover:text-white"
                        }`}
                      >
                        {lang.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Code Snippet Block */}
              <pre className="p-5 rounded-2xl bg-slate-900 text-slate-100 font-mono text-xs overflow-x-auto leading-relaxed border border-slate-800">
                <code>
                  {lldData.codeExamples
                    ? lldData.codeExamples[codeLanguage] || lldData.codeExamples["java"]
                    : lldData.codeImplementation}
                </code>
              </pre>

              {/* Detailed Technical Explanation Box */}
              {lldData.detailedExplanation && (
                <div className="p-5 rounded-2xl bg-purple-500/10 border border-purple-500/20 space-y-2">
                  <div className="text-xs font-mono font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4" />
                    <span>Implementation Deep Dive & Design Considerations</span>
                  </div>
                  <p className="text-xs leading-relaxed text-slate-700 dark:text-zinc-300 font-sans">
                    {lldData.detailedExplanation}
                  </p>
                </div>
              )}
            </div>
          </section>
        )}

        {/* TAB 5: PATTERNS & CONCURRENCY ANALYSIS */}
        {activeTab === "analysis" && (
          <section className="space-y-6">
            <div className="p-6 rounded-3xl bg-white border border-slate-200 dark:bg-zinc-950 dark:border-zinc-800 space-y-6">
              <div className="space-y-2">
                <h2 className="text-xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-amber-500" />
                  <span>Design Patterns, Concurrency & Edge Cases Analysis</span>
                </h2>
                <p className="text-xs text-slate-600 dark:text-zinc-400">
                  Comprehensive breakdown of Object-Oriented design patterns, thread-safety mechanics, and production failure recovery.
                </p>
              </div>

              {/* Design Patterns Analysis Cards */}
              {lldData.designPatternDetails && (
                <div className="space-y-3">
                  <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400">
                    1. Object-Oriented Design Patterns Applied
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {lldData.designPatternDetails.map((dp, dIdx) => (
                      <div
                        key={dIdx}
                        className="p-4 rounded-2xl bg-purple-500/5 border border-purple-500/20 space-y-2 text-xs"
                      >
                        <div className="font-bold text-purple-600 dark:text-purple-400 text-sm">
                          ⚡ {dp.pattern}
                        </div>
                        <p className="text-slate-700 dark:text-zinc-300 leading-relaxed font-sans">
                          <strong>Why Chosen:</strong> {dp.whyUsed}
                        </p>
                        <p className="text-slate-500 dark:text-zinc-400 text-[11px] font-mono">
                          Role: {dp.codeRole}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Concurrency & Lock Analysis */}
              {lldData.concurrencyAnalysis && (
                <div className="p-5 rounded-2xl bg-slate-50 dark:bg-zinc-900/80 border border-slate-200 dark:border-zinc-800 space-y-3">
                  <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4" />
                    <span>2. Concurrency, Race Condition & Memory Analysis</span>
                  </h3>
                  <div className="text-xs text-slate-700 dark:text-zinc-300 leading-relaxed space-y-2 font-sans">
                    {Array.isArray(lldData.concurrencyAnalysis) ? (
                      lldData.concurrencyAnalysis.map((item, cIdx) => (
                        <p key={cIdx} className="flex items-start gap-2">
                          <span className="text-blue-500 shrink-0 mt-0.5">•</span>
                          <span>{item}</span>
                        </p>
                      ))
                    ) : (
                      <p>{lldData.concurrencyAnalysis}</p>
                    )}
                  </div>
                </div>
              )}

              {/* Failure Modes & Edge Cases */}
              {lldData.edgeCases && (
                <div className="space-y-3">
                  <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400">
                    3. Production Edge Cases & Failure Mitigation
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {lldData.edgeCases.map((ec, eIdx) => (
                      <div
                        key={eIdx}
                        className="p-4 rounded-2xl bg-rose-500/5 border border-rose-500/20 space-y-1.5 text-xs"
                      >
                        <span className="font-bold text-rose-600 dark:text-rose-400 block text-xs">
                          ⚠️ Edge Case: {ec.issue}
                        </span>
                        <p className="text-slate-600 dark:text-zinc-400 leading-relaxed font-sans">
                          <strong>Impact:</strong> {ec.consequence}
                        </p>
                        <p className="text-emerald-600 dark:text-emerald-400 font-bold font-mono text-[11px]">
                          Fix: {ec.resolution}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </section>
        )}

        {/* Bottom Banner with Interview Q&A Link */}
        <div className="p-6 rounded-3xl bg-gradient-to-r from-purple-500/10 via-purple-500/5 to-transparent border border-purple-500/30 flex items-center justify-between gap-4 flex-wrap">
          <div className="space-y-1">
            <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Test Your Knowledge</span>
            </div>
            <p className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
              Practice 55+ System Design & Distributed Systems Interview Q&A
            </p>
          </div>

          <Link
            to="/interview?subject=systemdesign"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold transition shadow-sm cursor-pointer"
          >
            <span>Open System Design Q&A Bank</span>
            <ExternalLink className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </>
  );
};

export default LldPage;
