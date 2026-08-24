import React from "react";
import { useNavigate } from "react-router-dom";
import { 
  ArrowLeft, 
  Tv, 
  Zap, 
  Database, 
  Server, 
  Cpu, 
  Building2, 
  Sparkles, 
  Layers, 
  CheckCircle2, 
  Globe, 
  ShieldCheck, 
  BookOpen, 
  HardDrive,
  HelpCircle,
  AlertTriangle,
  Check
} from "lucide-react";
import AnimatedVideoStreamingDiagram from "./AnimatedVideoStreamingDiagram";
import AdBanner from "../common/AdBanner";

export const VideoStreamingPage = () => {
  const navigate = useNavigate();

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
          onClick={() => navigate("/system-design/lld-4")}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-600 dark:text-purple-400 hover:bg-purple-500/20 text-xs font-bold transition cursor-pointer"
        >
          <Cpu className="w-4 h-4" />
          <span>View Low-Level Design (LLD & OOD)</span>
        </button>
      </div>

      {/* Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 dark:bg-zinc-950 dark:border-zinc-800 space-y-4">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 text-xs font-mono font-bold uppercase tracking-wider">
            <Tv className="w-3.5 h-3.5" />
            <span>High-Level Design (HLD)</span>
          </div>

          <div className="flex items-center gap-1.5 flex-wrap">
            {["Google", "Netflix", "Amazon", "Disney+", "YouTube"].map((c, i) => (
              <span key={i} className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-md bg-slate-100 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 text-slate-700 dark:text-zinc-300 font-medium">
                <Building2 className="w-2.5 h-2.5 text-slate-400" />
                {c}
              </span>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Design a Video Streaming Platform (YouTube / Netflix)
          </h1>
          <p className="text-slate-600 dark:text-zinc-400 text-xs sm:text-sm max-w-3xl leading-relaxed">
            Architecting a global video streaming platform capable of storing petabytes of video data, encoding into adaptive bitrates (HLS / MPEG-DASH), and serving 1 Billion daily active users with CDN edge caching.
          </p>
        </div>
      </div>

      {/* SECTION 1: REQUIREMENTS & ESTIMATIONS */}
      <div className="p-6 rounded-3xl bg-white border border-slate-200 dark:bg-zinc-950 dark:border-zinc-800 space-y-6">
        <div className="flex items-center gap-2 text-slate-900 dark:text-white border-b border-slate-100 dark:border-zinc-900 pb-3">
          <Sparkles className="w-5 h-5 text-amber-500" />
          <h2 className="text-lg font-bold">1. System Requirements & Capacity Estimations</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3 p-4 rounded-2xl bg-slate-50 dark:bg-zinc-900/60 border border-slate-200 dark:border-zinc-800">
            <h3 className="text-xs font-mono uppercase font-bold text-rose-600 dark:text-rose-400">
              Functional Requirements
            </h3>
            <ul className="space-y-2 text-xs text-slate-700 dark:text-zinc-300">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>Upload raw video files and transcode into multiple resolutions (1080p, 720p, 480p, 360p).</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>Smooth video playback with Adaptive Bitrate Streaming (ABR) based on user internet speed.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>Search videos by title/tags and track view count / user interaction analytics.</span>
              </li>
            </ul>
          </div>

          <div className="space-y-3 p-4 rounded-2xl bg-slate-50 dark:bg-zinc-900/60 border border-slate-200 dark:border-zinc-800">
            <h3 className="text-xs font-mono uppercase font-bold text-blue-600 dark:text-blue-400">
              Non-Functional Requirements
            </h3>
            <ul className="space-y-2 text-xs text-slate-700 dark:text-zinc-300">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                <span><strong>High Availability (99.99%)</strong>: Instant video playback without buffering stalls.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                <span><strong>Low Latency Playback</strong>: Video playback starts in &lt;1 second globally via CDN edge caching.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                <span><strong>Scalable Storage</strong>: Handle multi-petabyte video storage and asynchronous transcoding workloads.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Capacity Estimations */}
        <div className="p-4 rounded-2xl bg-slate-900 text-white dark:bg-zinc-900 border border-slate-800 space-y-3 font-mono text-xs">
          <p className="font-bold text-amber-400 uppercase tracking-wider text-[11px]">
            Back-of-the-Envelope Capacity Estimations:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-3 rounded-xl bg-slate-800 dark:bg-zinc-950 border border-slate-700 dark:border-zinc-800">
              <span className="text-slate-400 block text-[10px]">Daily Active Viewers</span>
              <span className="text-base font-bold text-blue-400">1 Billion</span>
              <span className="text-[10px] text-slate-400 block">5 Billion videos watched/day</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-800 dark:bg-zinc-950 border border-slate-700 dark:border-zinc-800">
              <span className="text-slate-400 block text-[10px]">Video Upload Volume</span>
              <span className="text-base font-bold text-emerald-400">500,000 / day</span>
              <span className="text-[10px] text-slate-400 block">500 hours uploaded/minute</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-800 dark:bg-zinc-950 border border-slate-700 dark:border-zinc-800">
              <span className="text-slate-400 block text-[10px]">Storage Needed / Day</span>
              <span className="text-base font-bold text-rose-400">~150 Terabytes/day</span>
              <span className="text-[10px] text-slate-400 block">After multi-resolution encoding</span>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 2: ANIMATED SVG DIAGRAM */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-slate-900 dark:text-white px-2">
          <Layers className="w-5 h-5 text-rose-500" />
          <h2 className="text-lg font-bold">2. Architecture Flow Diagram</h2>
        </div>
        <AnimatedVideoStreamingDiagram />
      </div>

      {/* SECTION 3: COMPONENT BREAKDOWN */}
      <div className="p-6 rounded-3xl bg-white border border-slate-200 dark:bg-zinc-950 dark:border-zinc-800 space-y-6">
        <div className="flex items-center gap-2 text-slate-900 dark:text-white border-b border-slate-100 dark:border-zinc-900 pb-3">
          <Cpu className="w-5 h-5 text-indigo-500" />
          <h2 className="text-lg font-bold">3. System Component Blueprint & "Why Every Component is Required"</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-zinc-900/80 border border-slate-200 dark:border-zinc-800 space-y-2">
            <div className="flex items-center gap-2 text-teal-600 dark:text-teal-400 font-bold text-xs">
              <Globe className="w-4 h-4" />
              <span>CDN (Cloudflare / Akamai)</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed">
              <strong>Why Required?</strong> Caches video chunks (.ts files) physically close to end-users globally. Eliminates 95%+ of bandwidth load on origin servers and prevents buffering.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-zinc-900/80 border border-slate-200 dark:border-zinc-800 space-y-2">
            <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold text-xs">
              <ShieldCheck className="w-4 h-4" />
              <span>L7 Load Balancer & Gateway</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed">
              <strong>Why Required?</strong> Distributes API requests evenly across stateless worker pools, handles SSL termination, and rate-limits abusive scrapers.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-zinc-900/80 border border-slate-200 dark:border-zinc-800 space-y-2">
            <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-bold text-xs">
              <Zap className="w-4 h-4" />
              <span>Kafka Message Queue</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed">
              <strong>Why Required?</strong> Transcoding 1080p raw video takes several minutes. Kafka decouples video upload from background FFmpeg encoding workers.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-zinc-900/80 border border-slate-200 dark:border-zinc-800 space-y-2">
            <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400 font-bold text-xs">
              <HardDrive className="w-4 h-4" />
              <span>Amazon S3 Storage</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed">
              <strong>Why Required?</strong> Provides 99.999999999% durability for storing massive raw video blobs and encoded HLS resolution chunks.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-zinc-900/80 border border-slate-200 dark:border-zinc-800 space-y-2">
            <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-xs">
              <Database className="w-4 h-4" />
              <span>Redis & NoSQL Metadata DB</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed">
              <strong>Why Required?</strong> DynamoDB stores video metadata, user likes, and comments. Redis caches hot video metadata for sub-5ms lookup.
            </p>
          </div>
        </div>
      </div>

      {/* SECTION 4: STRENGTHS & DISADVANTAGES */}
      <div className="p-6 rounded-3xl bg-white border border-slate-200 dark:bg-zinc-950 dark:border-zinc-800 space-y-6">
        <div className="flex items-center gap-2 text-slate-900 dark:text-white border-b border-slate-100 dark:border-zinc-900 pb-3">
          <Zap className="w-5 h-5 text-amber-500" />
          <h2 className="text-lg font-bold">4. Architectural Strengths & Disadvantages</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Strengths */}
          <div className="p-5 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/40 space-y-3">
            <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-bold text-xs">
              <Check className="w-4 h-4" />
              <span>Architectural Strengths</span>
            </div>
            <ul className="space-y-2 text-xs text-slate-700 dark:text-zinc-300">
              <li>• <strong>Smooth Adaptive Playback (ABR)</strong>: HLS automatically degrades resolution on weak mobile signals without video freezing.</li>
              <li>• <strong>Massive Cost Savings via CDN</strong>: 98% of video playback requests are served from edge servers, shielding expensive S3 egress costs.</li>
              <li>• <strong>Asynchronous Worker Pipeline</strong>: Kafka allows scaling FFmpeg transcoding nodes independently of web API traffic.</li>
            </ul>
          </div>

          {/* Disadvantages */}
          <div className="p-5 rounded-2xl bg-rose-50/50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/40 space-y-3">
            <div className="flex items-center gap-2 text-rose-700 dark:text-rose-400 font-bold text-xs">
              <AlertTriangle className="w-4 h-4" />
              <span>Disadvantages & Failure Risks</span>
            </div>
            <ul className="space-y-2 text-xs text-slate-700 dark:text-zinc-300">
              <li>• <strong>High Transcoding Compute Costs</strong>: Encoding 4K videos into 8 different resolutions/bitrates consumes significant CPU/GPU resources.</li>
              <li>• <strong>Cold Content Cache Misses</strong>: Long-tail niche videos (bottom 80%) miss CDN cache, incurring S3 storage read latencies.</li>
              <li>• <strong>Bandwidth Egress Costs</strong>: Transmitting petabytes of daily video content requires negotiated ISP peering agreements (e.g. Netflix Open Connect).</li>
            </ul>
          </div>
        </div>
      </div>

      <AdBanner adSlot="9876543213" />

      {/* SECTION 5: DEEP TECH INTERVIEW Q&A */}
      <div className="p-6 rounded-3xl bg-white border border-slate-200 dark:bg-zinc-950 dark:border-zinc-800 space-y-6">
        <div className="flex items-center gap-2 text-slate-900 dark:text-white border-b border-slate-100 dark:border-zinc-900 pb-3">
          <HelpCircle className="w-5 h-5 text-rose-500" />
          <h2 className="text-lg font-bold">5. Deep Tech Interview Q&A: Storage & Streaming Protocol Choices</h2>
        </div>

        <div className="space-y-6 text-xs sm:text-sm text-slate-700 dark:text-zinc-300 leading-relaxed">
          {/* Question 1: Why Object Storage (S3) instead of Relational DB (MySQL)? */}
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 space-y-3">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-rose-500/10 text-rose-500 font-mono text-xs">Q1</span>
              Why store video files in Amazon S3 Object Storage instead of MySQL or PostgreSQL BLOB fields?
            </h3>
            <div className="space-y-2 text-xs leading-relaxed text-slate-600 dark:text-zinc-400">
              <p>
                <strong>1. Cost & Unlimited Scale</strong>: Storing gigabytes of binary video data inside MySQL database tables bloats database indexes, destroys backup times, and costs 10x more per GB than S3. S3 offers near-infinite elasticity at low storage costs.
              </p>
              <p>
                <strong>2. Direct CDN Integration</strong>: CDN edge servers can directly fetch range requests (<code className="font-mono text-rose-400">HTTP 206 Partial Content</code>) from S3 buckets, bypassing backend microservice CPU memory entirely.
              </p>
            </div>
          </div>

          {/* Question 2: Why HLS / DASH over raw MP4 file progressive download? */}
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 space-y-3">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-500 font-mono text-xs">Q2</span>
              Why use HLS / MPEG-DASH streaming protocols instead of serving raw MP4 files?
            </h3>
            <div className="space-y-2 text-xs leading-relaxed text-slate-600 dark:text-zinc-400">
              <p>
                <strong>Adaptive Resolution Switching</strong>: Raw MP4 files have a fixed bitrate. If a user enters a tunnel with weak 3G coverage, an MP4 file will freeze. HLS chunks allow the video player to switch down to 360p mid-stream smoothly.
              </p>
              <p>
                <strong>Bandwidth Efficiency</strong>: A user who clicks a 2-hour 4K movie MP4 and leaves after 30 seconds downloads hundreds of megabytes unnecessarily. HLS only fetches 10 seconds ahead of current playback.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoStreamingPage;
