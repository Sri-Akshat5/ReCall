import React from "react";
import { Link } from "react-router-dom";
import { Brain, FileText, Code2, Home, ArrowLeft } from "lucide-react";

export const NotFound = () => {
  return (
    <div className="max-w-4xl mx-auto w-full px-4 sm:px-6 py-16 sm:py-24 text-center font-sans space-y-8">
      {/* 404 Hero Card */}
      <div className="p-8 sm:p-12 rounded-3xl bg-white border border-slate-200 dark:bg-zinc-950 dark:border-zinc-800 space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 flex items-center justify-center mx-auto text-slate-900 dark:text-white">
          <Brain className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300 border border-rose-200 dark:border-rose-900">
            404 • Page Not Found
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
            Looking for technical interview material?
          </h1>
          <p className="text-sm text-slate-600 dark:text-zinc-400 max-w-lg mx-auto">
            The page or route you requested does not exist or has been moved. Explore our core technical interview Q&A banks and DSA problem sets below.
          </p>
        </div>

        {/* Quick Action Links */}
        <div className="pt-4 border-t border-slate-100 dark:border-zinc-900 flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/"
            className="px-5 py-2.5 rounded-xl text-xs font-mono font-bold bg-slate-900 text-white dark:bg-white dark:text-black transition flex items-center gap-2 hover:opacity-90 cursor-pointer"
          >
            <Home className="w-4 h-4" />
            <span>Go to Home</span>
          </Link>

          <Link
            to="/interview/java"
            className="px-5 py-2.5 rounded-xl text-xs font-mono font-bold bg-white text-slate-800 border border-slate-200 hover:bg-slate-50 dark:bg-zinc-900 dark:text-zinc-200 dark:border-zinc-800 dark:hover:bg-zinc-800 transition flex items-center gap-2 cursor-pointer"
          >
            <FileText className="w-4 h-4 text-emerald-500" />
            <span>Java Interview Q&amp;A</span>
          </Link>

          <Link
            to="/dsa/top75"
            className="px-5 py-2.5 rounded-xl text-xs font-mono font-bold bg-white text-slate-800 border border-slate-200 hover:bg-slate-50 dark:bg-zinc-900 dark:text-zinc-200 dark:border-zinc-800 dark:hover:bg-zinc-800 transition flex items-center gap-2 cursor-pointer"
          >
            <Code2 className="w-4 h-4 text-blue-500" />
            <span>DSA Top 75 Bank</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
