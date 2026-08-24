import React from "react";

export const JavaRevisionDiagrams = ({ type }) => {
  if (type === "jvm-compilation-flow") {
    return (
      <div className="my-6 p-6 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-3 select-none">
        <div className="flex items-center justify-between border-b border-zinc-900 pb-3">
          <span className="text-xs font-mono font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            Java Source to Native CPU Execution Pipeline (.java ➔ .class ➔ JVM)
          </span>
          <span className="text-[10px] font-mono text-zinc-500">Platform Independence</span>
        </div>

        <svg viewBox="0 0 800 200" className="w-full h-auto text-zinc-100 font-mono">
          <defs>
            <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#a855f7" />
            </linearGradient>
          </defs>

          {/* Java Source */}
          <rect x="30" y="50" width="140" height="90" rx="14" fill="#09090b" stroke="#38bdf8" strokeWidth="1.5" />
          <text x="100" y="85" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="bold">Main.java</text>
          <text x="100" y="105" textAnchor="middle" fill="#71717a" fontSize="10">Source Code</text>

          {/* Arrow 1 */}
          <path d="M 170 95 L 220 95" stroke="url(#grad1)" strokeWidth="2.5" strokeDasharray="4 4">
            <animate attributeName="stroke-dashoffset" from="8" to="0" dur="0.8s" repeatCount="indefinite" />
          </path>
          <text x="195" y="85" textAnchor="middle" fill="#38bdf8" fontSize="9" fontWeight="bold">javac</text>

          {/* Bytecode .class */}
          <rect x="220" y="50" width="150" height="90" rx="14" fill="#09090b" stroke="#a855f7" strokeWidth="1.5" />
          <text x="295" y="85" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="bold">Main.class</text>
          <text x="295" y="105" textAnchor="middle" fill="#71717a" fontSize="10">JVM Bytecode</text>

          {/* Arrow 2 */}
          <path d="M 370 95 L 420 95" stroke="url(#grad1)" strokeWidth="2.5" strokeDasharray="4 4">
            <animate attributeName="stroke-dashoffset" from="8" to="0" dur="0.8s" repeatCount="indefinite" />
          </path>
          <text x="395" y="85" textAnchor="middle" fill="#a855f7" fontSize="9" fontWeight="bold">ClassLoader</text>

          {/* JVM Execution Engine */}
          <rect x="420" y="35" width="170" height="120" rx="16" fill="#09090b" stroke="#27272a" strokeWidth="1.5" />
          <text x="505" y="65" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="bold">HotSpot JVM</text>
          <rect x="435" y="78" width="140" height="30" rx="8" fill="#18181b" stroke="#3f3f46" />
          <text x="505" y="97" textAnchor="middle" fill="#fbbf24" fontSize="10">Interpreter (Tier 0)</text>
          <rect x="435" y="114" width="140" height="30" rx="8" fill="#18181b" stroke="#38bdf8" />
          <text x="505" y="133" textAnchor="middle" fill="#38bdf8" fontSize="10" fontWeight="bold">C1 / C2 JIT Compiler</text>

          {/* Arrow 3 */}
          <path d="M 590 95 L 640 95" stroke="url(#grad1)" strokeWidth="2.5" strokeDasharray="4 4">
            <animate attributeName="stroke-dashoffset" from="8" to="0" dur="0.8s" repeatCount="indefinite" />
          </path>

          {/* Native Hardware */}
          <rect x="640" y="50" width="130" height="90" rx="14" fill="#18181b" stroke="#22c55e" strokeWidth="1.5" />
          <text x="705" y="85" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="bold">Native CPU</text>
          <text x="705" y="105" textAnchor="middle" fill="#22c55e" fontSize="10">Machine Code</text>
        </svg>
      </div>
    );
  }

  if (type === "oop-hierarchy") {
    return (
      <div className="my-6 p-6 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-3 select-none">
        <div className="flex items-center justify-between border-b border-zinc-900 pb-3">
          <span className="text-xs font-mono font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-indigo-400 animate-ping"></span>
            OOP Class Inheritance & Interface Contract Hierarchy
          </span>
          <span className="text-[10px] font-mono text-zinc-500">IS-A vs HAS-A Architecture</span>
        </div>

        <svg viewBox="0 0 800 220" className="w-full h-auto text-zinc-100 font-mono">
          {/* Top Interface */}
          <rect x="310" y="20" width="180" height="40" rx="10" fill="#09090b" stroke="#a855f7" strokeWidth="2" strokeDasharray="4 2" />
          <text x="400" y="45" textAnchor="middle" fill="#c084fc" fontSize="11" fontWeight="bold">«interface» Payable</text>

          {/* Abstract Base Class */}
          <rect x="310" y="90" width="180" height="45" rx="10" fill="#18181b" stroke="#38bdf8" strokeWidth="1.5" />
          <text x="400" y="117" textAnchor="middle" fill="#38bdf8" fontSize="11" fontWeight="bold">abstract Employee</text>

          {/* Connecting Line Interface -> Abstract */}
          <path d="M 400 60 L 400 90" stroke="#a855f7" strokeWidth="1.5" strokeDasharray="3 3">
            <animate attributeName="stroke-dashoffset" from="6" to="0" dur="0.8s" repeatCount="indefinite" />
          </path>

          {/* Concrete Subclasses */}
          <rect x="140" y="160" width="170" height="45" rx="10" fill="#09090b" stroke="#22c55e" strokeWidth="1.5" />
          <text x="225" y="187" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">FullTimeEmployee</text>

          <rect x="490" y="160" width="170" height="45" rx="10" fill="#09090b" stroke="#22c55e" strokeWidth="1.5" />
          <text x="575" y="187" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">ContractorEmployee</text>

          {/* Branch Lines Abstract -> Subclasses */}
          <path d="M 370 135 L 225 160" stroke="#38bdf8" strokeWidth="1.5" />
          <path d="M 430 135 L 575 160" stroke="#38bdf8" strokeWidth="1.5" />

          {/* Composition Box */}
          <rect x="30" y="90" width="160" height="45" rx="10" fill="#09090b" stroke="#fbbf24" strokeWidth="1.5" />
          <text x="110" y="117" textAnchor="middle" fill="#fbbf24" fontSize="10" fontWeight="bold">Address (HAS-A)</text>
          <path d="M 190 112 L 310 112" stroke="#fbbf24" strokeWidth="1.5" strokeDasharray="3 3" />
        </svg>
      </div>
    );
  }

  if (type === "string-pool-memory") {
    return (
      <div className="my-6 p-6 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-3 select-none">
        <div className="flex items-center justify-between border-b border-zinc-900 pb-3">
          <span className="text-xs font-mono font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
            String Constant Pool (SCP) vs Heap Memory Allocation
          </span>
          <span className="text-[10px] font-mono text-zinc-500">Literal vs New String()</span>
        </div>

        <svg viewBox="0 0 800 240" className="w-full h-auto text-zinc-100 font-mono">
          {/* Stack Region */}
          <rect x="30" y="30" width="220" height="180" rx="14" fill="#09090b" stroke="#3f3f46" strokeWidth="1.5" />
          <text x="140" y="55" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="bold">Thread Stack</text>

          <rect x="45" y="70" width="190" height="35" rx="8" fill="#18181b" stroke="#38bdf8" />
          <text x="140" y="92" textAnchor="middle" fill="#38bdf8" fontSize="10">s1 = "Java"</text>

          <rect x="45" y="115" width="190" height="35" rx="8" fill="#18181b" stroke="#38bdf8" />
          <text x="140" y="137" textAnchor="middle" fill="#38bdf8" fontSize="10">s2 = "Java"</text>

          <rect x="45" y="160" width="190" height="35" rx="8" fill="#18181b" stroke="#a855f7" />
          <text x="140" y="182" textAnchor="middle" fill="#a855f7" fontSize="10">s3 = new String("Java")</text>

          {/* Heap Outer Container */}
          <rect x="320" y="30" width="450" height="180" rx="14" fill="#09090b" stroke="#27272a" strokeWidth="1.5" />
          <text x="545" y="55" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="bold">JVM Heap Space</text>

          {/* String Constant Pool (Inside Heap) */}
          <rect x="340" y="75" width="210" height="115" rx="12" fill="#18181b" stroke="#38bdf8" strokeWidth="1.5" />
          <text x="445" y="98" textAnchor="middle" fill="#38bdf8" fontSize="10" fontWeight="bold">String Constant Pool (SCP)</text>
          
          <rect x="365" y="115" width="160" height="40" rx="8" fill="#09090b" stroke="#38bdf8" />
          <text x="445" y="139" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">"Java" [0x7A2F]</text>

          {/* Separate Heap Object */}
          <rect x="580" y="115" width="170" height="75" rx="12" fill="#18181b" stroke="#a855f7" strokeWidth="1.5" />
          <text x="665" y="138" textAnchor="middle" fill="#a855f7" fontSize="10" fontWeight="bold">String Heap Object</text>
          <text x="665" y="160" textAnchor="middle" fill="#a1a1aa" fontSize="9">Points to [0x7A2F] in SCP</text>

          {/* Pointers s1 and s2 -> SCP */}
          <path d="M 235 87 L 365 135" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="4 4">
            <animate attributeName="stroke-dashoffset" from="8" to="0" dur="1s" repeatCount="indefinite" />
          </path>
          <path d="M 235 132 L 365 135" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="4 4">
            <animate attributeName="stroke-dashoffset" from="8" to="0" dur="1s" repeatCount="indefinite" />
          </path>

          {/* Pointer s3 -> Heap Object */}
          <path d="M 235 177 L 580 152" stroke="#a855f7" strokeWidth="1.5" strokeDasharray="4 4">
            <animate attributeName="stroke-dashoffset" from="8" to="0" dur="1s" repeatCount="indefinite" />
          </path>
        </svg>
      </div>
    );
  }

  if (type === "equals-hashcode-flow") {
    return (
      <div className="my-6 p-6 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-3 select-none">
        <div className="flex items-center justify-between border-b border-zinc-900 pb-3">
          <span className="text-xs font-mono font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
            equals() & hashCode() Bucket Lookup Pipeline
          </span>
          <span className="text-[10px] font-mono text-zinc-500">Hash Code Contract</span>
        </div>

        <svg viewBox="0 0 800 220" className="w-full h-auto text-zinc-100 font-mono">
          {/* Key Input */}
          <rect x="30" y="70" width="140" height="60" rx="12" fill="#09090b" stroke="#38bdf8" strokeWidth="1.5" />
          <text x="100" y="98" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">Key Object</text>
          <text x="100" y="115" textAnchor="middle" fill="#71717a" fontSize="9">"User123"</text>

          {/* Arrow 1 */}
          <path d="M 170 100 L 220 100" stroke="#38bdf8" strokeWidth="2" strokeDasharray="4 4">
            <animate attributeName="stroke-dashoffset" from="8" to="0" dur="0.8s" repeatCount="indefinite" />
          </path>

          {/* Step 1: hashCode() */}
          <rect x="220" y="60" width="160" height="80" rx="14" fill="#18181b" stroke="#fbbf24" strokeWidth="1.5" />
          <text x="300" y="90" textAnchor="middle" fill="#fbbf24" fontSize="11" fontWeight="bold">1. key.hashCode()</text>
          <text x="300" y="115" textAnchor="middle" fill="#a1a1aa" fontSize="9">Computes int hash</text>

          {/* Arrow 2 */}
          <path d="M 380 100 L 430 100" stroke="#fbbf24" strokeWidth="2" strokeDasharray="4 4">
            <animate attributeName="stroke-dashoffset" from="8" to="0" dur="0.8s" repeatCount="indefinite" />
          </path>

          {/* Step 2: Bucket Index Calculation */}
          <rect x="430" y="60" width="160" height="80" rx="14" fill="#18181b" stroke="#a855f7" strokeWidth="1.5" />
          <text x="510" y="90" textAnchor="middle" fill="#a855f7" fontSize="11" fontWeight="bold">2. hash & (n - 1)</text>
          <text x="510" y="115" textAnchor="middle" fill="#a1a1aa" fontSize="9">Finds Bucket Index</text>

          {/* Arrow 3 */}
          <path d="M 590 100 L 640 100" stroke="#a855f7" strokeWidth="2" strokeDasharray="4 4">
            <animate attributeName="stroke-dashoffset" from="8" to="0" dur="0.8s" repeatCount="indefinite" />
          </path>

          {/* Step 3: equals() Comparison */}
          <rect x="640" y="60" width="140" height="80" rx="14" fill="#09090b" stroke="#22c55e" strokeWidth="1.5" />
          <text x="710" y="90" textAnchor="middle" fill="#22c55e" fontSize="11" fontWeight="bold">3. key.equals()</text>
          <text x="710" y="115" textAnchor="middle" fill="#a1a1aa" fontSize="9">Resolves Collision</text>
        </svg>
      </div>
    );
  }

  if (type === "exception-hierarchy") {
    return (
      <div className="my-6 p-6 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-3 select-none">
        <div className="flex items-center justify-between border-b border-zinc-900 pb-3">
          <span className="text-xs font-mono font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-rose-400 animate-ping"></span>
            Java Throwable Class Hierarchy & Exception Handling
          </span>
          <span className="text-[10px] font-mono text-zinc-500">Checked vs Unchecked</span>
        </div>

        <svg viewBox="0 0 800 240" className="w-full h-auto text-zinc-100 font-mono">
          {/* Throwable Root */}
          <rect x="330" y="20" width="140" height="40" rx="10" fill="#09090b" stroke="#ffffff" strokeWidth="2" />
          <text x="400" y="45" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="bold">java.lang.Throwable</text>

          {/* Paths */}
          <path d="M 360 60 L 200 100" stroke="#3f3f46" strokeWidth="1.5" />
          <path d="M 440 60 L 600 100" stroke="#3f3f46" strokeWidth="1.5" />

          {/* Error Branch */}
          <rect x="130" y="100" width="140" height="45" rx="10" fill="#18181b" stroke="#f43f5e" strokeWidth="1.5" />
          <text x="200" y="127" textAnchor="middle" fill="#f43f5e" fontSize="11" fontWeight="bold">java.lang.Error</text>

          {/* Exception Branch */}
          <rect x="530" y="100" width="140" height="45" rx="10" fill="#18181b" stroke="#38bdf8" strokeWidth="1.5" />
          <text x="600" y="127" textAnchor="middle" fill="#38bdf8" fontSize="11" fontWeight="bold">java.lang.Exception</text>

          {/* Sub-paths */}
          <path d="M 200 145 L 200 175" stroke="#f43f5e" strokeWidth="1" strokeDasharray="3 3" />
          <path d="M 560 145 L 480 175" stroke="#38bdf8" strokeWidth="1" />
          <path d="M 640 145 L 700 175" stroke="#fbbf24" strokeWidth="1" />

          {/* Error Types */}
          <rect x="120" y="175" width="160" height="35" rx="8" fill="#09090b" stroke="#3f3f46" />
          <text x="200" y="197" textAnchor="middle" fill="#a1a1aa" fontSize="9">OutOfMemoryError / StackOverflow</text>

          {/* Checked Exception */}
          <rect x="390" y="175" width="180" height="35" rx="8" fill="#09090b" stroke="#38bdf8" />
          <text x="480" y="197" textAnchor="middle" fill="#38bdf8" fontSize="9" fontWeight="bold">Checked Exception (IOException)</text>

          {/* Runtime Exception (Unchecked) */}
          <rect x="610" y="175" width="180" height="35" rx="8" fill="#09090b" stroke="#fbbf24" />
          <text x="700" y="197" textAnchor="middle" fill="#fbbf24" fontSize="9" fontWeight="bold">RuntimeException (Unchecked)</text>
        </svg>
      </div>
    );
  }

  if (type === "stream-pipeline-flow") {
    return (
      <div className="my-6 p-6 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-3 select-none">
        <div className="flex items-center justify-between border-b border-zinc-900 pb-3">
          <span className="text-xs font-mono font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-teal-400 animate-ping"></span>
            Java 8+ Stream Processing Pipeline (Lazy Evaluation)
          </span>
          <span className="text-[10px] font-mono text-zinc-500">Source ➔ Intermediate ➔ Terminal</span>
        </div>

        <svg viewBox="0 0 800 200" className="w-full h-auto text-zinc-100 font-mono">
          {/* Data Source */}
          <rect x="30" y="50" width="150" height="90" rx="14" fill="#09090b" stroke="#38bdf8" strokeWidth="1.5" />
          <text x="105" y="85" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="bold">Data Source</text>
          <text x="105" y="105" textAnchor="middle" fill="#71717a" fontSize="10">List&lt;Employee&gt;</text>

          {/* Arrow 1 */}
          <path d="M 180 95 L 230 95" stroke="#38bdf8" strokeWidth="2" strokeDasharray="4 4">
            <animate attributeName="stroke-dashoffset" from="8" to="0" dur="0.8s" repeatCount="indefinite" />
          </path>
          <text x="205" y="85" textAnchor="middle" fill="#38bdf8" fontSize="9">stream()</text>

          {/* Intermediate Ops Box */}
          <rect x="230" y="35" width="310" height="120" rx="16" fill="#18181b" stroke="#fbbf24" strokeWidth="1.5" />
          <text x="385" y="60" textAnchor="middle" fill="#fbbf24" fontSize="11" fontWeight="bold">Intermediate Operations (Lazy)</text>
          
          <rect x="250" y="75" width="120" height="30" rx="6" fill="#09090b" stroke="#3f3f46" />
          <text x="310" y="94" textAnchor="middle" fill="#38bdf8" fontSize="10">.filter(active)</text>

          <rect x="390" y="75" width="130" height="30" rx="6" fill="#09090b" stroke="#3f3f46" />
          <text x="455" y="94" textAnchor="middle" fill="#a855f7" fontSize="10">.map(Salary)</text>

          <rect x="320" y="115" width="130" height="30" rx="6" fill="#09090b" stroke="#3f3f46" />
          <text x="385" y="134" textAnchor="middle" fill="#22c55e" fontSize="10">.sorted()</text>

          {/* Arrow 2 */}
          <path d="M 540 95 L 590 95" stroke="#22c55e" strokeWidth="2" strokeDasharray="4 4">
            <animate attributeName="stroke-dashoffset" from="8" to="0" dur="0.8s" repeatCount="indefinite" />
          </path>

          {/* Terminal Op */}
          <rect x="590" y="50" width="180" height="90" rx="14" fill="#09090b" stroke="#22c55e" strokeWidth="1.5" />
          <text x="680" y="85" textAnchor="middle" fill="#22c55e" fontSize="12" fontWeight="bold">Terminal Operation</text>
          <text x="680" y="105" textAnchor="middle" fill="#ffffff" fontSize="10">.collect(toList())</text>
        </svg>
      </div>
    );
  }

  if (type === "jmm-cache-coherence") {
    return (
      <div className="my-6 p-6 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-3 select-none">
        <div className="flex items-center justify-between border-b border-zinc-900 pb-3">
          <span className="text-xs font-mono font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-400 animate-ping"></span>
            Java Memory Model (JMM): Volatile & Cache Coherence
          </span>
          <span className="text-[10px] font-mono text-zinc-500">Happens-Before Guarantee</span>
        </div>

        <svg viewBox="0 0 800 240" className="w-full h-auto text-zinc-100 font-mono">
          {/* Thread 1 Cache */}
          <rect x="40" y="30" width="220" height="90" rx="12" fill="#09090b" stroke="#38bdf8" strokeWidth="1.5" />
          <text x="150" y="55" textAnchor="middle" fill="#38bdf8" fontSize="11" fontWeight="bold">Thread 1 (CPU Core 1)</text>
          <rect x="60" y="70" width="180" height="35" rx="6" fill="#18181b" stroke="#3f3f46" />
          <text x="150" y="92" textAnchor="middle" fill="#ffffff" fontSize="10">Local Cache: flag = true</text>

          {/* Thread 2 Cache */}
          <rect x="540" y="30" width="220" height="90" rx="12" fill="#09090b" stroke="#a855f7" strokeWidth="1.5" />
          <text x="650" y="55" textAnchor="middle" fill="#a855f7" fontSize="11" fontWeight="bold">Thread 2 (CPU Core 2)</text>
          <rect x="560" y="70" width="180" height="35" rx="6" fill="#18181b" stroke="#3f3f46" />
          <text x="650" y="92" textAnchor="middle" fill="#ffffff" fontSize="10">Local Cache: flag = false</text>

          {/* Main Memory (Bottom) */}
          <rect x="180" y="160" width="440" height="60" rx="14" fill="#18181b" stroke="#22c55e" strokeWidth="2" />
          <text x="400" y="185" textAnchor="middle" fill="#22c55e" fontSize="12" fontWeight="bold">Main RAM Memory (Shared State)</text>
          <text x="400" y="205" textAnchor="middle" fill="#ffffff" fontSize="10">volatile boolean flag = true (Memory Barrier Sync)</text>

          {/* Flushes */}
          <path d="M 150 120 L 250 160" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="3 3">
            <animate attributeName="stroke-dashoffset" from="6" to="0" dur="0.8s" repeatCount="indefinite" />
          </path>
          <path d="M 650 120 L 550 160" stroke="#a855f7" strokeWidth="1.5" strokeDasharray="3 3">
            <animate attributeName="stroke-dashoffset" from="6" to="0" dur="0.8s" repeatCount="indefinite" />
          </path>
        </svg>
      </div>
    );
  }

  if (type === "multithreading-lifecycle") {
    return (
      <div className="my-6 p-6 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-3 select-none">
        <div className="flex items-center justify-between border-b border-zinc-900 pb-3">
          <span className="text-xs font-mono font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
            Java Thread Lifecycle State Machine Transition Diagram
          </span>
          <span className="text-[10px] font-mono text-zinc-500">Thread.State Enum</span>
        </div>

        <svg viewBox="0 0 800 220" className="w-full h-auto text-zinc-100 font-mono">
          {/* NEW */}
          <circle cx="80" cy="110" r="35" fill="#09090b" stroke="#38bdf8" strokeWidth="1.5" />
          <text x="80" y="114" textAnchor="middle" fill="#38bdf8" fontSize="11" fontWeight="bold">NEW</text>

          {/* Arrow NEW -> RUNNABLE */}
          <path d="M 115 110 L 195 110" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="4 4" />
          <text x="155" y="100" textAnchor="middle" fill="#a1a1aa" fontSize="9">start()</text>

          {/* RUNNABLE */}
          <circle cx="240" cy="110" r="40" fill="#18181b" stroke="#22c55e" strokeWidth="2" />
          <text x="240" y="114" textAnchor="middle" fill="#22c55e" fontSize="11" fontWeight="bold">RUNNABLE</text>

          {/* Arrow RUNNABLE -> BLOCKED/WAITING */}
          <path d="M 280 100 L 440 50" stroke="#fbbf24" strokeWidth="1.5" />
          <text x="350" y="65" textAnchor="middle" fill="#fbbf24" fontSize="9">sleep() / wait() / lock</text>

          {/* BLOCKED / WAITING */}
          <rect x="440" y="25" width="150" height="50" rx="10" fill="#09090b" stroke="#fbbf24" strokeWidth="1.5" />
          <text x="515" y="55" textAnchor="middle" fill="#fbbf24" fontSize="10" fontWeight="bold">TIMED_WAITING / BLOCKED</text>

          {/* Arrow BLOCKED -> RUNNABLE */}
          <path d="M 440 65 L 280 115" stroke="#22c55e" strokeWidth="1.5" strokeDasharray="3 3" />

          {/* Arrow RUNNABLE -> TERMINATED */}
          <path d="M 280 110 L 660 110" stroke="#f43f5e" strokeWidth="2" strokeDasharray="4 4">
            <animate attributeName="stroke-dashoffset" from="8" to="0" dur="0.8s" repeatCount="indefinite" />
          </path>
          <text x="470" y="100" textAnchor="middle" fill="#a1a1aa" fontSize="9">run() finishes</text>

          {/* TERMINATED */}
          <circle cx="700" cy="110" r="35" fill="#09090b" stroke="#f43f5e" strokeWidth="1.5" />
          <text x="700" y="114" textAnchor="middle" fill="#f43f5e" fontSize="10" fontWeight="bold">TERMINATED</text>
        </svg>
      </div>
    );
  }

  if (type === "jvm-memory-flow") {
    return (
      <div className="my-6 p-6 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-3 select-none">
        <div className="flex items-center justify-between border-b border-zinc-900 pb-3">
          <span className="text-xs font-mono font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            JVM Architecture & Memory Data Flow (Animated)
          </span>
          <span className="text-[10px] font-mono text-zinc-500">Tiered Execution Engine</span>
        </div>

        <svg viewBox="0 0 800 320" className="w-full h-auto text-zinc-100 font-mono">
          <defs>
            <linearGradient id="gradPath" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#a855f7" stopOpacity="0.8" />
            </linearGradient>
          </defs>

          {/* ClassLoader Block */}
          <rect x="20" y="30" width="160" height="80" rx="14" fill="#09090b" stroke="#3f3f46" strokeWidth="1.5" />
          <text x="100" y="65" textAnchor="middle" fill="#ffffff" fontSize="13" fontWeight="bold">ClassLoader</text>
          <text x="100" y="85" textAnchor="middle" fill="#a1a1aa" fontSize="10">Loading • Linking • Init</text>

          {/* Bytecode Verifier Block */}
          <rect x="220" y="30" width="160" height="80" rx="14" fill="#09090b" stroke="#3f3f46" strokeWidth="1.5" />
          <text x="300" y="65" textAnchor="middle" fill="#ffffff" fontSize="13" fontWeight="bold">Bytecode Verifier</text>
          <text x="300" y="85" textAnchor="middle" fill="#a1a1aa" fontSize="10">Security Inspection</text>

          {/* Connecting Animated Line 1 */}
          <path d="M 180 70 L 220 70" stroke="url(#gradPath)" strokeWidth="2.5" strokeDasharray="4 4">
            <animate attributeName="stroke-dashoffset" from="8" to="0" dur="1s" repeatCount="indefinite" />
          </path>

          {/* Memory Pools Container */}
          <rect x="20" y="150" width="460" height="140" rx="16" fill="#09090b" stroke="#27272a" strokeWidth="1.5" />
          <text x="35" y="175" fill="#e4e4e7" fontSize="12" fontWeight="bold">JVM Memory Pools (Heap & Off-Heap)</text>

          {/* Eden / Survivor */}
          <rect x="35" y="190" width="130" height="85" rx="10" fill="#18181b" stroke="#3f3f46" strokeWidth="1" />
          <text x="100" y="215" textAnchor="middle" fill="#38bdf8" fontSize="11" fontWeight="bold">Young Gen</text>
          <text x="100" y="235" textAnchor="middle" fill="#71717a" fontSize="9">Eden / S0 / S1</text>
          <text x="100" y="255" textAnchor="middle" fill="#38bdf8" fontSize="9">Minor GC</text>

          {/* Old Gen */}
          <rect x="180" y="190" width="130" height="85" rx="10" fill="#18181b" stroke="#3f3f46" strokeWidth="1" />
          <text x="245" y="215" textAnchor="middle" fill="#a855f7" fontSize="11" fontWeight="bold">Tenured (Old)</text>
          <text x="245" y="235" textAnchor="middle" fill="#71717a" fontSize="9">Long-lived Objects</text>
          <text x="245" y="255" textAnchor="middle" fill="#a855f7" fontSize="9">Major / Full GC</text>

          {/* Metaspace */}
          <rect x="325" y="190" width="140" height="85" rx="10" fill="#18181b" stroke="#3f3f46" strokeWidth="1" />
          <text x="395" y="215" textAnchor="middle" fill="#f43f5e" fontSize="11" fontWeight="bold">Metaspace</text>
          <text x="395" y="235" textAnchor="middle" fill="#71717a" fontSize="9">Native Memory</text>
          <text x="395" y="255" textAnchor="middle" fill="#f43f5e" fontSize="9">Class Metadata</text>

          {/* JIT Execution Engine Container */}
          <rect x="520" y="30" width="260" height="260" rx="18" fill="#09090b" stroke="#27272a" strokeWidth="1.5" />
          <text x="650" y="60" textAnchor="middle" fill="#ffffff" fontSize="13" fontWeight="bold">Execution Engine</text>

          <rect x="540" y="80" width="220" height="45" rx="10" fill="#18181b" stroke="#3f3f46" strokeWidth="1" />
          <text x="650" y="107" textAnchor="middle" fill="#fbbf24" fontSize="11" fontWeight="bold">Tier 0: Interpreter</text>

          <rect x="540" y="140" width="220" height="45" rx="10" fill="#18181b" stroke="#3f3f46" strokeWidth="1" />
          <text x="650" y="167" textAnchor="middle" fill="#38bdf8" fontSize="11" fontWeight="bold">Tier 1-3: C1 JIT Compiler</text>

          <rect x="540" y="200" width="220" height="65" rx="10" fill="#18181b" stroke="#38bdf8" strokeWidth="1.5" />
          <text x="650" y="230" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="bold">Tier 4: C2 Server JIT</text>
          <text x="650" y="250" textAnchor="middle" fill="#38bdf8" fontSize="9">Native Machine Code</text>
        </svg>
      </div>
    );
  }

  if (type === "gc-regions") {
    return (
      <div className="my-6 p-6 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-3 select-none">
        <div className="flex items-center justify-between border-b border-zinc-900 pb-3">
          <span className="text-xs font-mono font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-purple-400 animate-ping"></span>
            G1GC / ZGC Heap Region Allocation Matrix
          </span>
          <span className="text-[10px] font-mono text-zinc-500">Region Compaction</span>
        </div>

        <svg viewBox="0 0 800 240" className="w-full h-auto text-zinc-100 font-mono">
          <g>
            <rect x="40" y="30" width="80" height="40" rx="6" fill="#0284c7" fillOpacity="0.3" stroke="#0284c7" strokeWidth="1.5" />
            <text x="80" y="55" textAnchor="middle" fill="#38bdf8" fontSize="11" fontWeight="bold">Eden</text>

            <rect x="130" y="30" width="80" height="40" rx="6" fill="#0284c7" fillOpacity="0.3" stroke="#0284c7" strokeWidth="1.5" />
            <text x="170" y="55" textAnchor="middle" fill="#38bdf8" fontSize="11" fontWeight="bold">Eden</text>

            <rect x="220" y="30" width="80" height="40" rx="6" fill="#7c3aed" fillOpacity="0.3" stroke="#7c3aed" strokeWidth="1.5" />
            <text x="260" y="55" textAnchor="middle" fill="#c084fc" fontSize="11" fontWeight="bold">Old</text>

            <rect x="310" y="30" width="80" height="40" rx="6" fill="#0284c7" fillOpacity="0.3" stroke="#0284c7" strokeWidth="1.5" />
            <text x="350" y="55" textAnchor="middle" fill="#38bdf8" fontSize="11" fontWeight="bold">Eden</text>

            <rect x="400" y="30" width="80" height="40" rx="6" fill="#059669" fillOpacity="0.3" stroke="#059669" strokeWidth="1.5" />
            <text x="440" y="55" textAnchor="middle" fill="#34d399" fontSize="11" fontWeight="bold">Survivor</text>

            <rect x="490" y="30" width="80" height="40" rx="6" fill="#7c3aed" fillOpacity="0.3" stroke="#7c3aed" strokeWidth="1.5" />
            <text x="530" y="55" textAnchor="middle" fill="#c084fc" fontSize="11" fontWeight="bold">Old</text>

            <rect x="580" y="30" width="80" height="40" rx="6" fill="#e11d48" fillOpacity="0.3" stroke="#e11d48" strokeWidth="1.5" />
            <text x="620" y="55" textAnchor="middle" fill="#fb7185" fontSize="10" fontWeight="bold">Humongous</text>

            <rect x="670" y="30" width="80" height="40" rx="6" fill="#18181b" stroke="#3f3f46" strokeWidth="1" />
            <text x="710" y="55" textAnchor="middle" fill="#71717a" fontSize="10">Free</text>

            <rect x="40" y="80" width="80" height="40" rx="6" fill="#7c3aed" fillOpacity="0.3" stroke="#7c3aed" strokeWidth="1.5" />
            <text x="80" y="105" textAnchor="middle" fill="#c084fc" fontSize="11" fontWeight="bold">Old</text>

            <rect x="130" y="80" width="80" height="40" rx="6" fill="#059669" fillOpacity="0.3" stroke="#059669" strokeWidth="1.5" />
            <text x="170" y="105" textAnchor="middle" fill="#34d399" fontSize="11" fontWeight="bold">Survivor</text>

            <rect x="220" y="80" width="80" height="40" rx="6" fill="#0284c7" fillOpacity="0.3" stroke="#0284c7" strokeWidth="1.5" />
            <text x="260" y="105" textAnchor="middle" fill="#38bdf8" fontSize="11" fontWeight="bold">Eden</text>

            <rect x="310" y="80" width="80" height="40" rx="6" fill="#18181b" stroke="#3f3f46" strokeWidth="1" />
            <text x="350" y="105" textAnchor="middle" fill="#71717a" fontSize="10">Free</text>

            <rect x="400" y="80" width="80" height="40" rx="6" fill="#7c3aed" fillOpacity="0.3" stroke="#7c3aed" strokeWidth="1.5" />
            <text x="440" y="105" textAnchor="middle" fill="#c084fc" fontSize="11" fontWeight="bold">Old</text>

            <rect x="490" y="80" width="80" height="40" rx="6" fill="#e11d48" fillOpacity="0.3" stroke="#e11d48" strokeWidth="1.5" />
            <text x="530" y="105" textAnchor="middle" fill="#fb7185" fontSize="10" fontWeight="bold">Humongous</text>

            <rect x="580" y="80" width="80" height="40" rx="6" fill="#18181b" stroke="#3f3f46" strokeWidth="1" />
            <text x="620" y="105" textAnchor="middle" fill="#71717a" fontSize="10">Free</text>

            <rect x="670" y="80" width="80" height="40" rx="6" fill="#0284c7" fillOpacity="0.3" stroke="#0284c7" strokeWidth="1.5" />
            <text x="710" y="105" textAnchor="middle" fill="#38bdf8" fontSize="11" fontWeight="bold">Eden</text>
          </g>

          <g transform="translate(40, 150)">
            <rect x="0" y="30" width="710" height="40" rx="10" fill="#09090b" stroke="#27272a" strokeWidth="1" />
            <circle cx="30" cy="50" r="6" fill="#38bdf8" />
            <text x="45" y="54" fill="#a1a1aa" fontSize="11">Eden Region</text>

            <circle cx="160" cy="50" r="6" fill="#34d399" />
            <text x="175" y="54" fill="#a1a1aa" fontSize="11">Survivor Region</text>

            <circle cx="310" cy="50" r="6" fill="#c084fc" />
            <text x="325" y="54" fill="#a1a1aa" fontSize="11">Tenured Old Region</text>

            <circle cx="470" cy="50" r="6" fill="#fb7185" />
            <text x="485" y="54" fill="#a1a1aa" fontSize="11">Humongous (&gt;50% Region)</text>
          </g>
        </svg>
      </div>
    );
  }

  if (type === "hashmap-treeify") {
    return (
      <div className="my-6 p-6 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-3 select-none">
        <div className="flex items-center justify-between border-b border-zinc-900 pb-3">
          <span className="text-xs font-mono font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
            HashMap Treeification Internal Mechanics (Threshold = 8)
          </span>
          <span className="text-[10px] font-mono text-zinc-500">LinkedList ➔ Red-Black Tree</span>
        </div>

        <svg viewBox="0 0 800 240" className="w-full h-auto text-zinc-100 font-mono">
          <rect x="30" y="30" width="70" height="180" rx="10" fill="#09090b" stroke="#3f3f46" strokeWidth="1.5" />
          <text x="65" y="50" textAnchor="middle" fill="#a1a1aa" fontSize="10" fontWeight="bold">Bucket Array</text>
          
          <rect x="40" y="65" width="50" height="30" rx="6" fill="#18181b" stroke="#3f3f46" />
          <text x="65" y="84" textAnchor="middle" fill="#ffffff" fontSize="10">idx [0]</text>

          <rect x="40" y="105" width="50" height="30" rx="6" fill="#38bdf8" fillOpacity="0.2" stroke="#38bdf8" strokeWidth="1.5" />
          <text x="65" y="124" textAnchor="middle" fill="#38bdf8" fontSize="10" fontWeight="bold">idx [4]</text>

          <rect x="40" y="145" width="50" height="30" rx="6" fill="#18181b" stroke="#3f3f46" />
          <text x="65" y="164" textAnchor="middle" fill="#ffffff" fontSize="10">idx [7]</text>

          <g transform="translate(130, 70)">
            <text x="0" y="-10" fill="#a1a1aa" fontSize="10">Chain &lt; 8 Nodes: O(N) LinkedList</text>
            <rect x="0" y="0" width="80" height="35" rx="6" fill="#18181b" stroke="#3f3f46" />
            <text x="40" y="21" textAnchor="middle" fill="#ffffff" fontSize="10">Node A</text>

            <path d="M 80 18 L 105 18" stroke="#3f3f46" strokeWidth="1.5" />

            <rect x="105" y="0" width="80" height="35" rx="6" fill="#18181b" stroke="#3f3f46" />
            <text x="145" y="21" textAnchor="middle" fill="#ffffff" fontSize="10">Node B</text>

            <path d="M 185 18 L 210 18" stroke="#3f3f46" strokeWidth="1.5" />

            <rect x="210" y="0" width="80" height="35" rx="6" fill="#18181b" stroke="#3f3f46" />
            <text x="250" y="21" textAnchor="middle" fill="#ffffff" fontSize="10">Node C...</text>
          </g>

          <g transform="translate(480, 50)">
            <text x="100" y="-10" textAnchor="middle" fill="#fbbf24" fontSize="11" fontWeight="bold">Chain &gt; 8 Nodes: O(log N) Red-Black Tree</text>

            <circle cx="120" cy="30" r="20" fill="#b91c1c" stroke="#f87171" strokeWidth="1.5" />
            <text x="120" y="34" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold">Root</text>

            <path d="M 105 45 L 75 80" stroke="#3f3f46" strokeWidth="1.5" />
            <circle cx="70" cy="95" r="18" fill="#18181b" stroke="#3f3f46" strokeWidth="1.5" />
            <text x="70" y="99" textAnchor="middle" fill="#ffffff" fontSize="9">L-Node</text>

            <path d="M 135 45 L 165 80" stroke="#3f3f46" strokeWidth="1.5" />
            <circle cx="170" cy="95" r="18" fill="#b91c1c" stroke="#f87171" strokeWidth="1.5" />
            <text x="170" y="99" textAnchor="middle" fill="#ffffff" fontSize="9">R-Node</text>
          </g>

          <path d="M 400 120 L 460 120" stroke="#fbbf24" strokeWidth="2" strokeDasharray="4 4">
            <animate attributeName="stroke-dashoffset" from="8" to="0" dur="0.8s" repeatCount="indefinite" />
          </path>
        </svg>
      </div>
    );
  }

  if (type === "nio-channel-buffer") {
    return (
      <div className="my-6 p-6 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-3 select-none">
        <div className="flex items-center justify-between border-b border-zinc-900 pb-3">
          <span className="text-xs font-mono font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
            Java NIO Selector, Non-Blocking SocketChannel & ByteBuffer Flow
          </span>
          <span className="text-[10px] font-mono text-zinc-500">Event-Driven Reactor</span>
        </div>

        <svg viewBox="0 0 800 220" className="w-full h-auto text-zinc-100 font-mono">
          {/* Socket Channels */}
          <rect x="30" y="40" width="150" height="50" rx="10" fill="#09090b" stroke="#38bdf8" strokeWidth="1.5" />
          <text x="105" y="70" textAnchor="middle" fill="#38bdf8" fontSize="11" fontWeight="bold">SocketChannel 1</text>

          <rect x="30" y="120" width="150" height="50" rx="10" fill="#09090b" stroke="#38bdf8" strokeWidth="1.5" />
          <text x="105" y="150" textAnchor="middle" fill="#38bdf8" fontSize="11" fontWeight="bold">SocketChannel 2</text>

          {/* Selector */}
          <rect x="250" y="30" width="170" height="150" rx="16" fill="#18181b" stroke="#a855f7" strokeWidth="2" />
          <text x="335" y="60" textAnchor="middle" fill="#a855f7" fontSize="12" fontWeight="bold">NIO Selector</text>
          <text x="335" y="80" textAnchor="middle" fill="#a1a1aa" fontSize="9">Single Thread Multiplexing</text>

          {/* Direct ByteBuffer */}
          <rect x="490" y="40" width="270" height="130" rx="14" fill="#09090b" stroke="#22c55e" strokeWidth="1.5" />
          <text x="625" y="65" textAnchor="middle" fill="#22c55e" fontSize="12" fontWeight="bold">Off-Heap Direct ByteBuffer</text>
          
          <rect x="510" y="85" width="230" height="35" rx="6" fill="#18181b" stroke="#3f3f46" />
          <text x="625" y="107" textAnchor="middle" fill="#ffffff" fontSize="10">Capacity • Limit • Position</text>
          <text x="625" y="150" textAnchor="middle" fill="#a1a1aa" fontSize="9">Zero-Copy Native Kernel Transfer</text>

          {/* Animated Connectors */}
          <path d="M 180 65 L 250 85" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="3 3">
            <animate attributeName="stroke-dashoffset" from="6" to="0" dur="0.8s" repeatCount="indefinite" />
          </path>
          <path d="M 180 145 L 250 125" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="3 3">
            <animate attributeName="stroke-dashoffset" from="6" to="0" dur="0.8s" repeatCount="indefinite" />
          </path>
          <path d="M 420 105 L 490 105" stroke="#22c55e" strokeWidth="2" strokeDasharray="4 4">
            <animate attributeName="stroke-dashoffset" from="8" to="0" dur="0.8s" repeatCount="indefinite" />
          </path>
        </svg>
      </div>
    );
  }

  if (type === "jdbc-hikari-pool") {
    return (
      <div className="my-6 p-6 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-3 select-none">
        <div className="flex items-center justify-between border-b border-zinc-900 pb-3">
          <span className="text-xs font-mono font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            HikariCP High-Performance Database Connection Pool Architecture
          </span>
          <span className="text-[10px] font-mono text-zinc-500">FastList & ConcurrentBag</span>
        </div>

        <svg viewBox="0 0 800 220" className="w-full h-auto text-zinc-100 font-mono">
          {/* Threads Borrowing */}
          <rect x="30" y="40" width="140" height="50" rx="10" fill="#09090b" stroke="#38bdf8" strokeWidth="1.5" />
          <text x="100" y="70" textAnchor="middle" fill="#38bdf8" fontSize="11" fontWeight="bold">App Thread 1</text>

          <rect x="30" y="120" width="140" height="50" rx="10" fill="#09090b" stroke="#38bdf8" strokeWidth="1.5" />
          <text x="100" y="150" textAnchor="middle" fill="#38bdf8" fontSize="11" fontWeight="bold">App Thread 2</text>

          {/* Hikari Pool */}
          <rect x="230" y="25" width="340" height="160" rx="16" fill="#18181b" stroke="#22c55e" strokeWidth="2" />
          <text x="400" y="50" textAnchor="middle" fill="#22c55e" fontSize="12" fontWeight="bold">HikariCP Pool (ConcurrentBag)</text>

          <rect x="250" y="65" width="140" height="40" rx="8" fill="#09090b" stroke="#38bdf8" />
          <text x="320" y="90" textAnchor="middle" fill="#ffffff" fontSize="10">Conn 1 [Active]</text>

          <rect x="410" y="65" width="140" height="40" rx="8" fill="#09090b" stroke="#22c55e" />
          <text x="480" y="90" textAnchor="middle" fill="#ffffff" fontSize="10">Conn 2 [Idle]</text>

          <rect x="250" y="120" width="140" height="40" rx="8" fill="#09090b" stroke="#22c55e" />
          <text x="320" y="145" textAnchor="middle" fill="#ffffff" fontSize="10">Conn 3 [Idle]</text>

          <rect x="410" y="120" width="140" height="40" rx="8" fill="#09090b" stroke="#3f3f46" />
          <text x="480" y="145" textAnchor="middle" fill="#71717a" fontSize="10">Conn 4 [Spare]</text>

          {/* Database Engine */}
          <rect x="630" y="50" width="140" height="110" rx="14" fill="#09090b" stroke="#fbbf24" strokeWidth="1.5" />
          <text x="700" y="95" textAnchor="middle" fill="#fbbf24" fontSize="12" fontWeight="bold">RDBMS Engine</text>
          <text x="700" y="115" textAnchor="middle" fill="#a1a1aa" fontSize="9">PostgreSQL / MySQL</text>

          {/* Borrow / Return arrows */}
          <path d="M 170 65 L 230 85" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="3 3">
            <animate attributeName="stroke-dashoffset" from="6" to="0" dur="0.8s" repeatCount="indefinite" />
          </path>
          <path d="M 570 105 L 630 105" stroke="#fbbf24" strokeWidth="2" strokeDasharray="4 4">
            <animate attributeName="stroke-dashoffset" from="8" to="0" dur="0.8s" repeatCount="indefinite" />
          </path>
        </svg>
      </div>
    );
  }

  if (type === "virtual-threads-flow") {
    return (
      <div className="my-6 p-6 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-3 select-none">
        <div className="flex items-center justify-between border-b border-zinc-900 pb-3">
          <span className="text-xs font-mono font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-sky-400 animate-ping"></span>
            Java 21 Virtual Threads vs OS Carrier Threads (Project Loom)
          </span>
          <span className="text-[10px] font-mono text-zinc-500">M:N User-Mode Scheduling</span>
        </div>

        <svg viewBox="0 0 800 280" className="w-full h-auto text-zinc-100 font-mono">
          <rect x="20" y="20" width="760" height="90" rx="14" fill="#09090b" stroke="#27272a" strokeWidth="1.5" />
          <text x="40" y="45" fill="#38bdf8" fontSize="12" fontWeight="bold">1,000,000+ Virtual Threads (Managed by JVM Continuation Stack)</text>

          <g>
            <rect x="40" y="58" width="130" height="36" rx="8" fill="#18181b" stroke="#38bdf8" strokeWidth="1" />
            <circle cx="58" cy="76" r="4" fill="#38bdf8">
              <animate attributeName="opacity" values="0.2;1;0.2" dur="1.5s" repeatCount="indefinite" />
            </circle>
            <text x="70" y="80" fill="#ffffff" fontSize="10">vThread-1 [IO Wait]</text>

            <rect x="185" y="58" width="130" height="36" rx="8" fill="#18181b" stroke="#a855f7" strokeWidth="1" />
            <circle cx="203" cy="76" r="4" fill="#a855f7">
              <animate attributeName="opacity" values="1;0.2;1" dur="1.2s" repeatCount="indefinite" />
            </circle>
            <text x="215" y="80" fill="#ffffff" fontSize="10">vThread-2 [Active]</text>

            <rect x="330" y="58" width="130" height="36" rx="8" fill="#18181b" stroke="#38bdf8" strokeWidth="1" />
            <circle cx="348" cy="76" r="4" fill="#38bdf8">
              <animate attributeName="opacity" values="0.4;1;0.4" dur="1.8s" repeatCount="indefinite" />
            </circle>
            <text x="360" y="80" fill="#ffffff" fontSize="10">vThread-3 [Mounted]</text>

            <rect x="475" y="58" width="130" height="36" rx="8" fill="#18181b" stroke="#38bdf8" strokeWidth="1" />
            <circle cx="493" cy="76" r="4" fill="#38bdf8">
              <animate attributeName="opacity" values="1;0.3;1" dur="1.4s" repeatCount="indefinite" />
            </circle>
            <text x="505" y="80" fill="#ffffff" fontSize="10">vThread-4 [DB Call]</text>

            <rect x="620" y="140" width="140" height="36" rx="8" fill="#18181b" stroke="#71717a" strokeWidth="1" />
            <text x="690" y="162" textAnchor="middle" fill="#a1a1aa" fontSize="10">+999,996 More...</text>
          </g>

          <path d="M 105 94 L 105 140 L 400 140 L 400 165" fill="none" stroke="#f43f5e" strokeWidth="1.5" strokeDasharray="4 4">
            <animate attributeName="stroke-dashoffset" from="8" to="0" dur="0.8s" repeatCount="indefinite" />
          </path>
          <text x="250" y="132" fill="#f43f5e" fontSize="9" textAnchor="middle">On I/O Block: Unmount Stack to Heap Memory</text>

          <rect x="20" y="170" width="760" height="90" rx="14" fill="#09090b" stroke="#27272a" strokeWidth="1.5" />
          <text x="40" y="195" fill="#a855f7" fontSize="12" fontWeight="bold">OS Carrier Threads (ForkJoinPool Worker Pool - Capped at CPU Cores)</text>

          <g>
            <rect x="40" y="208" width="160" height="38" rx="8" fill="#18181b" stroke="#a855f7" strokeWidth="1.5" />
            <text x="120" y="232" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">Carrier Thread 1 (Core 0)</text>

            <rect x="230" y="208" width="160" height="38" rx="8" fill="#18181b" stroke="#a855f7" strokeWidth="1.5" />
            <text x="310" y="232" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">Carrier Thread 2 (Core 1)</text>

            <rect x="420" y="208" width="160" height="38" rx="8" fill="#18181b" stroke="#a855f7" strokeWidth="1.5" />
            <text x="500" y="232" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">Carrier Thread 3 (Core 2)</text>

            <rect x="610" y="208" width="150" height="38" rx="8" fill="#18181b" stroke="#a855f7" strokeWidth="1.5" />
            <text x="685" y="232" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">Carrier Thread 4 (Core 3)</text>
          </g>
        </svg>
      </div>
    );
  }

  if (type === "spring-bean-lifecycle") {
    return (
      <div className="my-6 p-6 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-3 select-none">
        <div className="flex items-center justify-between border-b border-zinc-900 pb-3">
          <span className="text-xs font-mono font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            Spring IoC Container & Bean Lifecycle Pipeline
          </span>
          <span className="text-[10px] font-mono text-zinc-500">Instantiation ➔ DI ➔ PostProcess ➔ Ready</span>
        </div>

        <svg viewBox="0 0 800 200" className="w-full h-auto text-zinc-100 font-mono">
          {/* Step 1 */}
          <rect x="20" y="50" width="130" height="80" rx="12" fill="#09090b" stroke="#38bdf8" strokeWidth="1.5" />
          <text x="85" y="80" textAnchor="middle" fill="#38bdf8" fontSize="10" fontWeight="bold">1. Instantiate</text>
          <text x="85" y="100" textAnchor="middle" fill="#a1a1aa" fontSize="9">Constructor Call</text>

          {/* Arrow */}
          <path d="M 150 90 L 180 90" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="3 3" />

          {/* Step 2 */}
          <rect x="180" y="50" width="140" height="80" rx="12" fill="#09090b" stroke="#a855f7" strokeWidth="1.5" />
          <text x="250" y="80" textAnchor="middle" fill="#a855f7" fontSize="10" fontWeight="bold">2. Populate Props</text>
          <text x="250" y="100" textAnchor="middle" fill="#a1a1aa" fontSize="9">@Autowired DI</text>

          {/* Arrow */}
          <path d="M 320 90 L 350 90" stroke="#a855f7" strokeWidth="1.5" strokeDasharray="3 3" />

          {/* Step 3 */}
          <rect x="350" y="50" width="140" height="80" rx="12" fill="#09090b" stroke="#fbbf24" strokeWidth="1.5" />
          <text x="420" y="80" textAnchor="middle" fill="#fbbf24" fontSize="10" fontWeight="bold">3. BeanPostProcessor</text>
          <text x="420" y="100" textAnchor="middle" fill="#a1a1aa" fontSize="9">postProcessBefore</text>

          {/* Arrow */}
          <path d="M 490 90 L 520 90" stroke="#fbbf24" strokeWidth="1.5" strokeDasharray="3 3" />

          {/* Step 4 */}
          <rect x="520" y="50" width="130" height="80" rx="12" fill="#09090b" stroke="#22c55e" strokeWidth="1.5" />
          <text x="585" y="80" textAnchor="middle" fill="#22c55e" fontSize="10" fontWeight="bold">4. @PostConstruct</text>
          <text x="585" y="100" textAnchor="middle" fill="#a1a1aa" fontSize="9">Init Method</text>

          {/* Arrow */}
          <path d="M 650 90 L 680 90" stroke="#22c55e" strokeWidth="2" strokeDasharray="4 4">
            <animate attributeName="stroke-dashoffset" from="8" to="0" dur="0.8s" repeatCount="indefinite" />
          </path>

          {/* Step 5 */}
          <rect x="680" y="50" width="100" height="80" rx="12" fill="#18181b" stroke="#22c55e" strokeWidth="2" />
          <text x="730" y="90" textAnchor="middle" fill="#22c55e" fontSize="11" fontWeight="bold">READY</text>
        </svg>
      </div>
    );
  }

  return null;
};

export default JavaRevisionDiagrams;
