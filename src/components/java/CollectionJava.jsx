import React, { useState } from "react";
import {
  Brain,
  Search,
  BookOpen,
  CheckCircle2,
  Table as TableIcon,
  Sparkles,
  ArrowRight,
  Zap,
  Layers,
  ChevronRight,
  ChevronDown,
  HelpCircle,
  MessageSquare,
  Terminal,
  AlertTriangle,
  Lightbulb,
  FileCode,
  BookMarked,
  ListFilter,
  Code2,
  Cpu,
  ShieldCheck,
  Workflow,
  Scale,
  Database,
  RefreshCw,
  GitBranch,
  ArrowLeftRight
} from "lucide-react";

// ============================================================================
// ANIMATED SVG DIAGRAM ENGINE FOR INDIVIDUAL JAVA COLLECTION TOPICS
// ============================================================================
const CollectionDiagram = ({ type }) => {
  // 1. Array vs Collection Comparison
  if (type === "array-vs-collection") {
    return (
      <div className="my-6 p-5 sm:p-6 rounded-3xl bg-zinc-950 border border-zinc-800    space-y-3 select-none">
        <div className="flex items-center justify-between border-b border-zinc-900 pb-3">
          <span className="text-xs font-mono font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
            Arrays (Fixed Memory Buffer) vs Collections (Dynamic Growth Engine)
          </span>
          <span className="text-[10px] font-mono text-zinc-500">Memory &amp; Type Safety Architecture</span>
        </div>

        <svg viewBox="0 0 800 230" className="w-full h-auto font-mono">
          <g>
            <rect x="20" y="30" width="350" height="175" rx="14" fill="#09090b" stroke="#f43f5e" strokeWidth="1.5" strokeDasharray="4 2" />
            <text x="195" y="55" textAnchor="middle" fill="#f43f5e" fontSize="12" fontWeight="bold">Limitations of Arrays: Student[3]</text>

            <rect x="40" y="75" width="90" height="45" rx="8" fill="#18181b" stroke="#3f3f46" />
            <text x="85" y="98" textAnchor="middle" fill="#ffffff" fontSize="10">s[0]: Student</text>

            <rect x="150" y="75" width="90" height="45" rx="8" fill="#18181b" stroke="#3f3f46" />
            <text x="195" y="98" textAnchor="middle" fill="#ffffff" fontSize="10">s[1]: Student</text>

            <rect x="260" y="75" width="90" height="45" rx="8" fill="#18181b" stroke="#f43f5e" strokeWidth="2" />
            <text x="305" y="95" textAnchor="middle" fill="#f43f5e" fontSize="9" fontWeight="bold">Customer()</text>
            <text x="305" y="110" textAnchor="middle" fill="#f43f5e" fontSize="8">Type Error!</text>

            <text x="195" y="145" textAnchor="middle" fill="#71717a" fontSize="9">• Fixed Size: Cannot resize after creation</text>
            <text x="195" y="162" textAnchor="middle" fill="#71717a" fontSize="9">• Homogeneous: Requires Object[] for mixing</text>
            <text x="195" y="179" textAnchor="middle" fill="#71717a" fontSize="9">• No built-in sorting/searching algorithms</text>
          </g>

          <g>
            <rect x="430" y="30" width="350" height="175" rx="14" fill="#09090b" stroke="#22c55e" strokeWidth="1.5" />
            <text x="605" y="55" textAnchor="middle" fill="#22c55e" fontSize="12" fontWeight="bold">Solution: JCF Collections Framework</text>

            <rect x="450" y="75" width="70" height="45" rx="8" fill="#18181b" stroke="#22c55e" />
            <text x="485" y="98" textAnchor="middle" fill="#ffffff" fontSize="10">Item 1</text>

            <rect x="530" y="75" width="70" height="45" rx="8" fill="#18181b" stroke="#22c55e" />
            <text x="565" y="98" textAnchor="middle" fill="#ffffff" fontSize="10">Item 2</text>

            <rect x="610" y="75" width="70" height="45" rx="8" fill="#18181b" stroke="#38bdf8" />
            <text x="645" y="98" textAnchor="middle" fill="#38bdf8" fontSize="10">Item 3</text>

            <rect x="690" y="75" width="70" height="45" rx="8" fill="#09090b" stroke="#a855f7" strokeDasharray="3 3">
              <animate attributeName="stroke-dashoffset" from="6" to="0" dur="0.8s" repeatCount="indefinite" />
            </rect>
            <text x="725" y="95" textAnchor="middle" fill="#c084fc" fontSize="9" fontWeight="bold">+50%</text>
            <text x="725" y="110" textAnchor="middle" fill="#c084fc" fontSize="8">Auto Grow</text>

            <text x="605" y="145" textAnchor="middle" fill="#e4e4e7" fontSize="9">• Dynamic Size: Auto expands &amp; shrinks</text>
            <text x="605" y="162" textAnchor="middle" fill="#e4e4e7" fontSize="9">• Heterogeneous &amp; Generic Type Safety</text>
            <text x="605" y="179" textAnchor="middle" fill="#e4e4e7" fontSize="9">• Ready-made sorting, search &amp; tree algorithms</text>
          </g>
        </svg>
      </div>
    );
  }

  // 2. Collection Hierarchy Tree Diagram
  if (type === "collection-hierarchy-svg") {
    return (
      <div className="my-6 p-5 sm:p-6 rounded-3xl bg-zinc-950 border border-zinc-800    space-y-3 select-none">
        <div className="flex items-center justify-between border-b border-zinc-900 pb-3">
          <span className="text-xs font-mono font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-sky-400 animate-ping"></span>
            Hierarchy of Java Collection Framework (java.util)
          </span>
          <span className="text-[10px] font-mono text-zinc-500">Interface &amp; Implementation Tree</span>
        </div>

        <svg viewBox="0 0 800 270" className="w-full h-auto font-mono">
          <rect x="310" y="15" width="180" height="35" rx="10" fill="#09090b" stroke="#38bdf8" strokeWidth="2" />
          <text x="400" y="37" textAnchor="middle" fill="#38bdf8" fontSize="11" fontWeight="bold">«interface» Iterable&lt;T&gt;</text>

          <path d="M 400 50 L 400 70" stroke="#38bdf8" strokeWidth="1.5" />

          <rect x="300" y="70" width="200" height="35" rx="10" fill="#18181b" stroke="#a855f7" strokeWidth="2" />
          <text x="400" y="92" textAnchor="middle" fill="#c084fc" fontSize="11" fontWeight="bold">«interface» Collection&lt;E&gt;</text>

          <path d="M 400 105 L 140 135" stroke="#a855f7" strokeWidth="1.5" />
          <path d="M 400 105 L 400 135" stroke="#a855f7" strokeWidth="1.5" />
          <path d="M 400 105 L 660 135" stroke="#a855f7" strokeWidth="1.5" />

          {/* List */}
          <g>
            <rect x="60" y="135" width="160" height="35" rx="8" fill="#09090b" stroke="#22c55e" strokeWidth="1.5" />
            <text x="140" y="157" textAnchor="middle" fill="#22c55e" fontSize="10" fontWeight="bold">«interface» List&lt;E&gt;</text>

            <rect x="20" y="190" width="100" height="28" rx="6" fill="#18181b" stroke="#27272a" />
            <text x="70" y="208" textAnchor="middle" fill="#ffffff" fontSize="9">ArrayList</text>

            <rect x="130" y="190" width="100" height="28" rx="6" fill="#18181b" stroke="#27272a" />
            <text x="180" y="208" textAnchor="middle" fill="#ffffff" fontSize="9">LinkedList</text>
          </g>

          {/* Set */}
          <g>
            <rect x="320" y="135" width="160" height="35" rx="8" fill="#eab308" stroke="#eab308" strokeWidth="1.5" />
            <text x="400" y="157" textAnchor="middle" fill="#09090b" fontSize="10" fontWeight="bold">«interface» Set&lt;E&gt;</text>

            <rect x="280" y="190" width="100" height="28" rx="6" fill="#18181b" stroke="#27272a" />
            <text x="330" y="208" textAnchor="middle" fill="#ffffff" fontSize="9">HashSet</text>

            <rect x="390" y="190" width="100" height="28" rx="6" fill="#18181b" stroke="#27272a" />
            <text x="440" y="208" textAnchor="middle" fill="#ffffff" fontSize="9">TreeSet</text>
          </g>

          {/* Queue */}
          <g>
            <rect x="580" y="135" width="160" height="35" rx="8" fill="#f43f5e" stroke="#f43f5e" strokeWidth="1.5" />
            <text x="660" y="157" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold">«interface» Queue&lt;E&gt;</text>

            <rect x="540" y="190" width="110" height="28" rx="6" fill="#18181b" stroke="#27272a" />
            <text x="595" y="208" textAnchor="middle" fill="#ffffff" fontSize="9">PriorityQueue</text>

            <rect x="660" y="190" width="110" height="28" rx="6" fill="#18181b" stroke="#27272a" />
            <text x="715" y="208" textAnchor="middle" fill="#ffffff" fontSize="9">ArrayDeque</text>
          </g>

          <text x="400" y="250" textAnchor="middle" fill="#71717a" fontSize="9">Map&lt;K,V&gt; is an independent interface hierarchy (HashMap, LinkedHashMap, TreeMap, ConcurrentHashMap)</text>
        </svg>
      </div>
    );
  }

  // 3. Iterable & Iterator Diagram
  if (type === "iterable-iterator-svg") {
    return (
      <div className="my-6 p-5 sm:p-6 rounded-3xl bg-zinc-950 border border-zinc-800    space-y-3 select-none">
        <div className="flex items-center justify-between border-b border-zinc-900 pb-3">
          <span className="text-xs font-mono font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
            Iterator Cursor Traversal Mechanics &amp; modCount Validation
          </span>
          <span className="text-[10px] font-mono text-zinc-500">hasNext(), next(), remove()</span>
        </div>

        <svg viewBox="0 0 800 180" className="w-full h-auto font-mono">
          <g>
            <rect x="50" y="40" width="140" height="60" rx="10" fill="#18181b" stroke="#3f3f46" />
            <text x="120" y="65" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">"Ravi"</text>
            <text x="120" y="85" textAnchor="middle" fill="#71717a" fontSize="8">Index 0</text>

            <rect x="230" y="40" width="140" height="60" rx="10" fill="#18181b" stroke="#38bdf8" strokeWidth="2" />
            <text x="300" y="65" textAnchor="middle" fill="#38bdf8" fontSize="11" fontWeight="bold">"Vijay"</text>
            <text x="300" y="85" textAnchor="middle" fill="#71717a" fontSize="8">Index 1</text>

            <rect x="410" y="40" width="140" height="60" rx="10" fill="#18181b" stroke="#3f3f46" />
            <text x="480" y="65" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">"Ajay"</text>
            <text x="480" y="85" textAnchor="middle" fill="#71717a" fontSize="8">Index 2</text>

            <rect x="590" y="40" width="140" height="60" rx="10" fill="#18181b" stroke="#3f3f46" />
            <text x="660" y="65" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">"Sonoo"</text>
            <text x="660" y="85" textAnchor="middle" fill="#71717a" fontSize="8">Index 3</text>
          </g>

          <path d="M 210 130 L 210 108" stroke="#38bdf8" strokeWidth="3" markerEnd="url(#arrow)">
            <animate attributeName="transform" type="translate" values="0 0; 180 0; 0 0" dur="4s" repeatCount="indefinite" />
          </path>
          <text x="210" y="150" textAnchor="middle" fill="#38bdf8" fontSize="10" fontWeight="bold">
            Cursor Pointer (next())
            <animate attributeName="transform" type="translate" values="0 0; 180 0; 0 0" dur="4s" repeatCount="indefinite" />
          </text>

          <text x="400" y="172" textAnchor="middle" fill="#71717a" fontSize="9">Fail-Fast Iterator checks modCount == expectedModCount on every next() invocation.</text>
        </svg>
      </div>
    );
  }

  // 4. ArrayList Resizing Diagram
  if (type === "arraylist-resizing-svg") {
    return (
      <div className="my-6 p-5 sm:p-6 rounded-3xl bg-zinc-950 border border-zinc-800    space-y-3 select-none">
        <div className="flex items-center justify-between border-b border-zinc-900 pb-3">
          <span className="text-xs font-mono font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            ArrayList Resizing Mechanics: oldCapacity + (oldCapacity &gt;&gt; 1)
          </span>
          <span className="text-[10px] font-mono text-zinc-500">1.5x Growth Factor</span>
        </div>

        <svg viewBox="0 0 800 200" className="w-full h-auto font-mono">
          <g>
            <text x="30" y="35" fill="#f43f5e" fontSize="11" fontWeight="bold">1. Old Capacity = 10 (Buffer Full)</text>
            <rect x="30" y="45" width="320" height="40" rx="8" fill="#09090b" stroke="#f43f5e" strokeWidth="1.5" />
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((idx) => (
              <rect key={idx} x={35 + idx * 31} y="50" width="27" height="30" rx="4" fill="#f43f5e" opacity="0.3" />
            ))}
          </g>

          <path d="M 190 90 L 190 120" stroke="#38bdf8" strokeWidth="2.5" strokeDasharray="4 4">
            <animate attributeName="stroke-dashoffset" from="8" to="0" dur="0.8s" repeatCount="indefinite" />
          </path>
          <text x="280" y="110" fill="#38bdf8" fontSize="10" fontWeight="bold">System.arraycopy() ➔ Allocates 15 Slots</text>

          <g>
            <text x="30" y="140" fill="#22c55e" fontSize="11" fontWeight="bold">2. New Capacity = 15 (1.5x Expansion: 10 + 5)</text>
            <rect x="30" y="150" width="480" height="40" rx="8" fill="#09090b" stroke="#22c55e" strokeWidth="1.5" />
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((idx) => (
              <rect key={idx} x={35 + idx * 31} y="155" width="27" height="30" rx="4" fill="#22c55e" opacity="0.4" />
            ))}
            {[10, 11, 12, 13, 14].map((idx) => (
              <rect key={idx} x={35 + idx * 31} y="155" width="27" height="30" rx="4" fill="#18181b" stroke="#3f3f46" strokeDasharray="2 2" />
            ))}
          </g>
        </svg>
      </div>
    );
  }

  // 5. LinkedList Doubly Linked Diagram
  if (type === "linkedlist-doubly-svg") {
    return (
      <div className="my-6 p-5 sm:p-6 rounded-3xl bg-zinc-950 border border-zinc-800    space-y-3 select-none">
        <div className="flex items-center justify-between border-b border-zinc-900 pb-3">
          <span className="text-xs font-mono font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-purple-400 animate-ping"></span>
            LinkedList Doubly Linked Node Pointer Architecture
          </span>
          <span className="text-[10px] font-mono text-zinc-500">Node&lt;E&gt; {`{ Node<E> prev; E item; Node<E> next; }`}</span>
        </div>

        <svg viewBox="0 0 800 200" className="w-full h-auto font-mono">
          {/* Head Pointer */}
          <rect x="20" y="25" width="70" height="25" rx="5" fill="#38bdf8" />
          <text x="55" y="42" textAnchor="middle" fill="#000000" fontSize="10" fontWeight="bold">head</text>
          <path d="M 90 37 L 130 37" stroke="#38bdf8" strokeWidth="2" markerEnd="url(#arrow)" />

          {/* Node 1 */}
          <g>
            <rect x="130" y="15" width="170" height="70" rx="10" fill="#09090b" stroke="#38bdf8" strokeWidth="1.5" />
            <text x="215" y="32" textAnchor="middle" fill="#38bdf8" fontSize="10" fontWeight="bold">Node 1 [Head]</text>
            <line x1="130" y1="40" x2="300" y2="40" stroke="#27272a" />
            <text x="155" y="60" textAnchor="middle" fill="#71717a" fontSize="8">prev: null</text>
            <text x="215" y="60" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold">"Book_A"</text>
            <text x="275" y="60" textAnchor="middle" fill="#a855f7" fontSize="8">next ➔</text>
          </g>

          {/* Bi-directional arrows 1 -> 2 */}
          <path d="M 300 40 L 370 40" stroke="#a855f7" strokeWidth="2" />
          <path d="M 370 55 L 300 55" stroke="#a855f7" strokeWidth="2" />

          {/* Node 2 */}
          <g>
            <rect x="370" y="15" width="170" height="70" rx="10" fill="#09090b" stroke="#a855f7" strokeWidth="1.5" />
            <text x="455" y="32" textAnchor="middle" fill="#c084fc" fontSize="10" fontWeight="bold">Node 2</text>
            <line x1="370" y1="40" x2="540" y2="40" stroke="#27272a" />
            <text x="395" y="60" textAnchor="middle" fill="#a855f7" fontSize="8">← prev</text>
            <text x="455" y="60" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold">"Book_B"</text>
            <text x="515" y="60" textAnchor="middle" fill="#a855f7" fontSize="8">next ➔</text>
          </g>

          {/* Bi-directional arrows 2 -> 3 */}
          <path d="M 540 40 L 610 40" stroke="#a855f7" strokeWidth="2" />
          <path d="M 610 55 L 540 55" stroke="#a855f7" strokeWidth="2" />

          {/* Node 3 */}
          <g>
            <rect x="610" y="15" width="170" height="70" rx="10" fill="#09090b" stroke="#22c55e" strokeWidth="1.5" />
            <text x="695" y="32" textAnchor="middle" fill="#22c55e" fontSize="10" fontWeight="bold">Node 3 [Tail]</text>
            <line x1="610" y1="40" x2="780" y2="40" stroke="#27272a" />
            <text x="635" y="60" textAnchor="middle" fill="#a855f7" fontSize="8">← prev</text>
            <text x="695" y="60" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold">"Book_C"</text>
            <text x="755" y="60" textAnchor="middle" fill="#71717a" fontSize="8">next: null</text>
          </g>

          {/* Tail Pointer */}
          <rect x="710" y="100" width="70" height="25" rx="5" fill="#22c55e" />
          <text x="745" y="117" textAnchor="middle" fill="#000000" fontSize="10" fontWeight="bold">tail</text>
          <path d="M 745 100 L 745 85" stroke="#22c55e" strokeWidth="2" />

          {/* Insertion / Deletion relinking callout */}
          <rect x="130" y="110" width="410" height="65" rx="10" fill="#18181b" stroke="#3f3f46" />
          <text x="145" y="130" fill="#38bdf8" fontSize="10" fontWeight="bold">Fast Pointer Relinking on Insertion/Deletion:</text>
          <text x="145" y="148" fill="#e4e4e7" fontSize="9">• node.prev.next = newEntry; newEntry.next = node;</text>
          <text x="145" y="163" fill="#71717a" fontSize="8">• Zero contiguous memory array shifting required! (O(1) at head/tail)</text>
        </svg>
      </div>
    );
  }

  // 6. HashSet Backing Store HashMap Diagram
  if (type === "hashset-hashmap-svg") {
    return (
      <div className="my-6 p-5 sm:p-6 rounded-3xl bg-zinc-950 border border-zinc-800    space-y-3 select-none">
        <div className="flex items-center justify-between border-b border-zinc-900 pb-3">
          <span className="text-xs font-mono font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-yellow-400 animate-ping"></span>
            HashSet Backing Store Mechanics: HashMap&lt;E, Object&gt;
          </span>
          <span className="text-[10px] font-mono text-zinc-500">Dummy Object PRESENT Constant</span>
        </div>

        <svg viewBox="0 0 800 180" className="w-full h-auto font-mono">
          <rect x="40" y="40" width="220" height="100" rx="12" fill="#09090b" stroke="#eab308" strokeWidth="1.5" />
          <text x="150" y="65" textAnchor="middle" fill="#eab308" fontSize="11" fontWeight="bold">HashSet.add("Ravi")</text>
          <text x="150" y="90" textAnchor="middle" fill="#ffffff" fontSize="10">Delegates to map.put()</text>
          <text x="150" y="115" textAnchor="middle" fill="#71717a" fontSize="9">Returns true if key was new</text>

          <path d="M 265 90 L 335 90" stroke="#eab308" strokeWidth="2.5" strokeDasharray="3 3">
            <animate attributeName="stroke-dashoffset" from="6" to="0" dur="0.8s" repeatCount="indefinite" />
          </path>

          <rect x="340" y="30" width="420" height="120" rx="12" fill="#09090b" stroke="#38bdf8" strokeWidth="1.5" />
          <text x="550" y="55" textAnchor="middle" fill="#38bdf8" fontSize="11" fontWeight="bold">Backing HashMap Engine</text>

          <rect x="360" y="75" width="170" height="50" rx="8" fill="#18181b" stroke="#22c55e" />
          <text x="445" y="95" textAnchor="middle" fill="#22c55e" fontSize="10" fontWeight="bold">KEY: "Ravi"</text>
          <text x="445" y="112" textAnchor="middle" fill="#71717a" fontSize="8">Elements stored as Keys</text>

          <path d="M 535 100 L 575 100" stroke="#22c55e" strokeWidth="2" />

          <rect x="580" y="75" width="160" height="50" rx="8" fill="#18181b" stroke="#a855f7" />
          <text x="660" y="95" textAnchor="middle" fill="#c084fc" fontSize="10" fontWeight="bold">VAL: PRESENT</text>
          <text x="660" y="112" textAnchor="middle" fill="#71717a" fontSize="8">Dummy Object Constant</text>
        </svg>
      </div>
    );
  }

  // 7. LinkedHashSet Insertion Order Doubly-Linked Diagram
  if (type === "linkedhashset-order-svg") {
    return (
      <div className="my-6 p-5 sm:p-6 rounded-3xl bg-zinc-950 border border-zinc-800    space-y-3 select-none">
        <div className="flex items-center justify-between border-b border-zinc-900 pb-3">
          <span className="text-xs font-mono font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            LinkedHashSet: Hash Table Buckets + Doubly Linked List Traversal
          </span>
          <span className="text-[10px] font-mono text-zinc-500">Preserves Insertion Order</span>
        </div>

        <svg viewBox="0 0 800 230" className="w-full h-auto font-mono">
          {/* Hash Table Array */}
          <g>
            <rect x="30" y="30" width="80" height="170" rx="10" fill="#18181b" stroke="#3f3f46" />
            <text x="70" y="50" textAnchor="middle" fill="#71717a" fontSize="9">Bucket [0]</text>
            <rect x="35" y="60" width="70" height="25" rx="4" fill="#09090b" stroke="#22c55e" />
            <text x="70" y="76" textAnchor="middle" fill="#22c55e" fontSize="9" fontWeight="bold">[0] "Ravi"</text>

            <text x="70" y="105" textAnchor="middle" fill="#71717a" fontSize="9">Bucket [1]</text>
            <rect x="35" y="115" width="70" height="25" rx="4" fill="#09090b" stroke="#38bdf8" />
            <text x="70" y="131" textAnchor="middle" fill="#38bdf8" fontSize="9" fontWeight="bold">[1] "Ajay"</text>

            <text x="70" y="160" textAnchor="middle" fill="#71717a" fontSize="9">Bucket [2]</text>
            <rect x="35" y="170" width="70" height="25" rx="4" fill="#09090b" stroke="#a855f7" />
            <text x="70" y="186" textAnchor="middle" fill="#c084fc" fontSize="9" fontWeight="bold">[2] "Vijay"</text>
          </g>

          {/* Doubly Linked List running across entries */}
          <g>
            <rect x="200" y="45" width="160" height="55" rx="8" fill="#09090b" stroke="#22c55e" strokeWidth="1.5" />
            <text x="280" y="68" textAnchor="middle" fill="#22c55e" fontSize="10" fontWeight="bold">1st Added: "Ravi"</text>
            <text x="280" y="85" textAnchor="middle" fill="#71717a" fontSize="8">before=null | after=Vijay</text>

            <path d="M 360 72 L 440 72" stroke="#eab308" strokeWidth="2.5" markerEnd="url(#arrow)" />

            <rect x="440" y="45" width="160" height="55" rx="8" fill="#09090b" stroke="#a855f7" strokeWidth="1.5" />
            <text x="520" y="68" textAnchor="middle" fill="#c084fc" fontSize="10" fontWeight="bold">2nd Added: "Vijay"</text>
            <text x="520" y="85" textAnchor="middle" fill="#71717a" fontSize="8">before=Ravi | after=Ajay</text>

            <path d="M 600 72 L 680 72" stroke="#eab308" strokeWidth="2.5" markerEnd="url(#arrow)" />

            <rect x="680" y="45" width="100" height="55" rx="8" fill="#09090b" stroke="#38bdf8" strokeWidth="1.5" />
            <text x="730" y="68" textAnchor="middle" fill="#38bdf8" fontSize="10" fontWeight="bold">3rd: "Ajay"</text>
            <text x="730" y="85" textAnchor="middle" fill="#71717a" fontSize="8">after=null</text>
          </g>

          <text x="400" y="150" textAnchor="middle" fill="#eab308" fontSize="10" fontWeight="bold">
            Yellow Arrow = Doubly Linked List pointers (before / after) determining exact iteration sequence!
          </text>
          <text x="400" y="175" textAnchor="middle" fill="#71717a" fontSize="9">
            Provides O(1) hash lookup + predictable O(N) iteration in insertion order.
          </text>
        </svg>
      </div>
    );
  }

  // 8. Queue FIFO & Method Contract Diagram
  if (type === "queue-fifo-svg") {
    return (
      <div className="my-6 p-5 sm:p-6 rounded-3xl bg-zinc-950 border border-zinc-800    space-y-3 select-none">
        <div className="flex items-center justify-between border-b border-zinc-900 pb-3">
          <span className="text-xs font-mono font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-rose-400 animate-ping"></span>
            Queue FIFO Architecture &amp; Method Contract
          </span>
          <span className="text-[10px] font-mono text-zinc-500">First In First Out (FIFO) Pipeline</span>
        </div>

        <svg viewBox="0 0 800 230" className="w-full h-auto font-mono">
          {/* Pipeline Body */}
          <rect x="180" y="40" width="440" height="65" rx="12" fill="#09090b" stroke="#f43f5e" strokeWidth="2" />

          {/* Elements inside queue */}
          <rect x="200" y="48" width="80" height="48" rx="8" fill="#18181b" stroke="#38bdf8" />
          <text x="240" y="77" textAnchor="middle" fill="#38bdf8" fontSize="11" fontWeight="bold">Item 1</text>

          <rect x="300" y="48" width="80" height="48" rx="8" fill="#18181b" stroke="#38bdf8" />
          <text x="340" y="77" textAnchor="middle" fill="#38bdf8" fontSize="11" fontWeight="bold">Item 2</text>

          <rect x="400" y="48" width="80" height="48" rx="8" fill="#18181b" stroke="#38bdf8" />
          <text x="440" y="77" textAnchor="middle" fill="#38bdf8" fontSize="11" fontWeight="bold">Item 3</text>

          <rect x="500" y="48" width="80" height="48" rx="8" fill="#18181b" stroke="#a855f7" />
          <text x="540" y="77" textAnchor="middle" fill="#c084fc" fontSize="11" fontWeight="bold">Item 4</text>

          {/* Enqueue Arrow (Offer / Add) */}
          <path d="M 690 72 L 600 72" stroke="#22c55e" strokeWidth="3" markerEnd="url(#arrow)" />
          <text x="710" y="65" fill="#22c55e" fontSize="10" fontWeight="bold">ENQUEUE</text>
          <text x="710" y="80" fill="#71717a" fontSize="8">offer(e) / add(e)</text>

          {/* Dequeue Arrow (Poll / Remove) */}
          <path d="M 180 72 L 90 72" stroke="#f43f5e" strokeWidth="3" markerEnd="url(#arrow)" />
          <text x="40" y="65" fill="#f43f5e" fontSize="10" fontWeight="bold">DEQUEUE</text>
          <text x="40" y="80" fill="#71717a" fontSize="8">poll() / remove()</text>

          {/* Method Contract Table Callout */}
          <rect x="180" y="125" width="440" height="85" rx="10" fill="#18181b" stroke="#3f3f46" />
          <text x="400" y="145" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold">Queue Method Contract Comparison</text>
          <line x1="190" y1="152" x2="610" y2="152" stroke="#3f3f46" />
          <text x="220" y="170" fill="#f43f5e" fontSize="9" fontWeight="bold">Throws Exception:</text>
          <text x="340" y="170" fill="#e4e4e7" fontSize="9">add(e) | remove() | element()</text>
          <text x="220" y="190" fill="#22c55e" fontSize="9" fontWeight="bold">Returns Null / False:</text>
          <text x="340" y="190" fill="#e4e4e7" fontSize="9">offer(e) | poll() | peek()</text>
        </svg>
      </div>
    );
  }

  // 9. Map Key-Value Pairing Diagram
  if (type === "map-keyvalue-svg") {
    return (
      <div className="my-6 p-5 sm:p-6 rounded-3xl bg-zinc-950 border border-zinc-800    space-y-3 select-none">
        <div className="flex items-center justify-between border-b border-zinc-900 pb-3">
          <span className="text-xs font-mono font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-violet-400 animate-ping"></span>
            Map Interface Architecture: Key-Value Pairing &amp; Entry Set
          </span>
          <span className="text-[10px] font-mono text-zinc-500">Map.Entry&lt;K,V&gt; Contract</span>
        </div>

        <svg viewBox="0 0 800 230" className="w-full h-auto font-mono">
          {/* Key Set Box */}
          <g>
            <rect x="50" y="30" width="220" height="170" rx="12" fill="#09090b" stroke="#38bdf8" strokeWidth="1.5" />
            <text x="160" y="55" textAnchor="middle" fill="#38bdf8" fontSize="11" fontWeight="bold">keySet(): Unique Keys</text>

            <rect x="70" y="70" width="180" height="30" rx="6" fill="#18181b" stroke="#38bdf8" />
            <text x="160" y="90" textAnchor="middle" fill="#ffffff" fontSize="10">Key 101: "User_A"</text>

            <rect x="70" y="110" width="180" height="30" rx="6" fill="#18181b" stroke="#38bdf8" />
            <text x="160" y="130" textAnchor="middle" fill="#ffffff" fontSize="10">Key 102: "User_B"</text>

            <rect x="70" y="150" width="180" height="30" rx="6" fill="#18181b" stroke="#38bdf8" />
            <text x="160" y="170" textAnchor="middle" fill="#ffffff" fontSize="10">Key 103: "User_C"</text>
          </g>

          {/* Directional Mapping Arrows */}
          <path d="M 270 85 L 530 85" stroke="#a855f7" strokeWidth="2" markerEnd="url(#arrow)" />
          <path d="M 270 125 L 530 125" stroke="#a855f7" strokeWidth="2" markerEnd="url(#arrow)" />
          <path d="M 270 165 L 530 165" stroke="#a855f7" strokeWidth="2" markerEnd="url(#arrow)" />

          <text x="400" y="75" textAnchor="middle" fill="#a855f7" fontSize="9" fontWeight="bold">put(K, V)</text>

          {/* Values Collection Box */}
          <g>
            <rect x="530" y="30" width="220" height="170" rx="12" fill="#09090b" stroke="#22c55e" strokeWidth="1.5" />
            <text x="640" y="55" textAnchor="middle" fill="#22c55e" fontSize="11" fontWeight="bold">values(): Duplicate Allowed</text>

            <rect x="550" y="70" width="180" height="30" rx="6" fill="#18181b" stroke="#22c55e" />
            <text x="640" y="90" textAnchor="middle" fill="#ffffff" fontSize="10">Val: "$95,000 Salary"</text>

            <rect x="550" y="110" width="180" height="30" rx="6" fill="#18181b" stroke="#22c55e" />
            <text x="640" y="130" textAnchor="middle" fill="#ffffff" fontSize="10">Val: "$120,000 Salary"</text>

            <rect x="550" y="150" width="180" height="30" rx="6" fill="#18181b" stroke="#22c55e" />
            <text x="640" y="170" textAnchor="middle" fill="#ffffff" fontSize="10">Val: "$95,000 Salary"</text>
          </g>

          <text x="400" y="215" textAnchor="middle" fill="#71717a" fontSize="9">entrySet() returns Set&lt;Map.Entry&lt;K,V&gt;&gt; containing both Key and Value pairs.</text>
        </svg>
      </div>
    );
  }

  // 10. TreeSet Red-Black Tree Diagram
  if (type === "treeset-redblack-svg") {
    return (
      <div className="my-6 p-5 sm:p-6 rounded-3xl bg-zinc-950 border border-zinc-800    space-y-3 select-none">
        <div className="flex items-center justify-between border-b border-zinc-900 pb-3">
          <span className="text-xs font-mono font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-rose-400 animate-ping"></span>
            TreeSet / TreeMap Self-Balancing Red-Black Binary Search Tree
          </span>
          <span className="text-[10px] font-mono text-zinc-500">O(log N) Search &amp; Natural Sorting</span>
        </div>

        <svg viewBox="0 0 800 220" className="w-full h-auto font-mono">
          <circle cx="400" cy="40" r="22" fill="#18181b" stroke="#ffffff" strokeWidth="2" />
          <text x="400" y="44" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">20</text>

          <line x1="382" y1="52" x2="260" y2="100" stroke="#3f3f46" strokeWidth="2" />
          <line x1="418" y1="52" x2="540" y2="100" stroke="#3f3f46" strokeWidth="2" />

          <circle cx="250" cy="110" r="22" fill="#9f1239" stroke="#f43f5e" strokeWidth="2" />
          <text x="250" y="114" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">10</text>

          <circle cx="550" cy="110" r="22" fill="#18181b" stroke="#ffffff" strokeWidth="2" />
          <text x="550" y="114" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">30</text>

          <line x1="235" y1="124" x2="160" y2="170" stroke="#3f3f46" strokeWidth="2" />
          <line x1="565" y1="124" x2="640" y2="170" stroke="#3f3f46" strokeWidth="2" />

          <circle cx="150" cy="180" r="20" fill="#18181b" stroke="#ffffff" strokeWidth="2" />
          <text x="150" y="184" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold">5</text>

          <circle cx="650" cy="180" r="20" fill="#9f1239" stroke="#f43f5e" strokeWidth="2" />
          <text x="650" y="184" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold">40</text>

          <text x="400" y="210" textAnchor="middle" fill="#71717a" fontSize="9">Guarantees O(log N) lookup time via automatic rotations &amp; color rebalancing.</text>
        </svg>
      </div>
    );
  }

  // 11. PriorityQueue Binary Min Heap Diagram
  if (type === "priorityqueue-heap-svg") {
    return (
      <div className="my-6 p-5 sm:p-6 rounded-3xl bg-zinc-950 border border-zinc-800    space-y-3 select-none">
        <div className="flex items-center justify-between border-b border-zinc-900 pb-3">
          <span className="text-xs font-mono font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-indigo-400 animate-ping"></span>
            PriorityQueue Binary Min-Heap Array Architecture
          </span>
          <span className="text-[10px] font-mono text-zinc-500">Parent = (i-1)/2, Left = 2i+1, Right = 2i+2</span>
        </div>

        <svg viewBox="0 0 800 220" className="w-full h-auto font-mono">
          <g>
            <circle cx="200" cy="35" r="20" fill="#09090b" stroke="#38bdf8" strokeWidth="2" />
            <text x="200" y="39" textAnchor="middle" fill="#38bdf8" fontSize="11" fontWeight="bold">10</text>

            <line x1="185" y1="48" x2="130" y2="85" stroke="#3f3f46" />
            <line x1="215" y1="48" x2="270" y2="85" stroke="#3f3f46" />

            <circle cx="120" cy="95" r="18" fill="#18181b" stroke="#a855f7" />
            <text x="120" y="99" textAnchor="middle" fill="#c084fc" fontSize="10">20</text>

            <circle cx="280" cy="95" r="18" fill="#18181b" stroke="#a855f7" />
            <text x="280" y="99" textAnchor="middle" fill="#c084fc" fontSize="10">15</text>

            <line x1="108" y1="107" x2="70" y2="140" stroke="#3f3f46" />
            <line x1="132" y1="107" x2="170" y2="140" stroke="#3f3f46" />

            <circle cx="60" cy="150" r="16" fill="#18181b" stroke="#3f3f46" />
            <text x="60" y="154" textAnchor="middle" fill="#ffffff" fontSize="9">30</text>

            <circle cx="180" cy="150" r="16" fill="#18181b" stroke="#3f3f46" />
            <text x="180" y="154" textAnchor="middle" fill="#ffffff" fontSize="9">40</text>
          </g>

          <g>
            <text x="560" y="35" textAnchor="middle" fill="#22c55e" fontSize="11" fontWeight="bold">Underlying Object[] queue Array</text>
            <rect x="360" y="55" width="400" height="50" rx="8" fill="#09090b" stroke="#22c55e" strokeWidth="1.5" />

            <rect x="370" y="65" width="60" height="30" rx="4" fill="#38bdf8" />
            <text x="400" y="84" textAnchor="middle" fill="#000000" fontSize="11" fontWeight="bold">10</text>
            <text x="400" y="120" textAnchor="middle" fill="#71717a" fontSize="8">idx 0 (Root)</text>

            <rect x="445" y="65" width="60" height="30" rx="4" fill="#18181b" stroke="#a855f7" />
            <text x="475" y="84" textAnchor="middle" fill="#c084fc" fontSize="11">20</text>
            <text x="475" y="120" textAnchor="middle" fill="#71717a" fontSize="8">idx 1</text>

            <rect x="520" y="65" width="60" height="30" rx="4" fill="#18181b" stroke="#a855f7" />
            <text x="550" y="84" textAnchor="middle" fill="#c084fc" fontSize="11">15</text>
            <text x="550" y="120" textAnchor="middle" fill="#71717a" fontSize="8">idx 2</text>

            <rect x="595" y="65" width="60" height="30" rx="4" fill="#18181b" stroke="#3f3f46" />
            <text x="625" y="84" textAnchor="middle" fill="#ffffff" fontSize="11">30</text>
            <text x="625" y="120" textAnchor="middle" fill="#71717a" fontSize="8">idx 3</text>

            <rect x="670" y="65" width="60" height="30" rx="4" fill="#18181b" stroke="#3f3f46" />
            <text x="700" y="84" textAnchor="middle" fill="#ffffff" fontSize="11">40</text>
            <text x="700" y="120" textAnchor="middle" fill="#71717a" fontSize="8">idx 4</text>
          </g>

          <text x="400" y="195" textAnchor="middle" fill="#71717a" fontSize="9">peek() is O(1) at index 0. offer() &amp; poll() rebalance in O(log N) via siftUp / siftDown.</text>
        </svg>
      </div>
    );
  }

  // 12. ArrayDeque Circular Array Diagram
  if (type === "arraydeque-circular-svg") {
    return (
      <div className="my-6 p-5 sm:p-6 rounded-3xl bg-zinc-950 border border-zinc-800    space-y-3 select-none">
        <div className="flex items-center justify-between border-b border-zinc-900 pb-3">
          <span className="text-xs font-mono font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
            ArrayDeque Circular Resizable Array Buffer
          </span>
          <span className="text-[10px] font-mono text-zinc-500">Head &amp; Tail Pointer Wrapping</span>
        </div>

        <svg viewBox="0 0 800 180" className="w-full h-auto font-mono">
          <rect x="50" y="50" width="700" height="55" rx="12" fill="#09090b" stroke="#38bdf8" strokeWidth="1.5" />

          {[0, 1, 2, 3, 4, 5, 6, 7].map((idx) => {
            const isHead = idx === 6;
            const isTail = idx === 2;
            const isFilled = idx === 6 || idx === 7 || idx === 0 || idx === 1;
            return (
              <g key={idx}>
                <rect
                  x={65 + idx * 85}
                  y="58"
                  width="72"
                  height="38"
                  rx="6"
                  fill={isHead ? "#38bdf8" : isTail ? "#f43f5e" : isFilled ? "#18181b" : "#09090b"}
                  stroke={isFilled ? "#22c55e" : "#27272a"}
                />
                <text x={101 + idx * 85} y="81" textAnchor="middle" fill={isHead || isTail ? "#000000" : "#ffffff"} fontSize="10" fontWeight="bold">
                  {isHead ? "HEAD" : isTail ? "TAIL" : isFilled ? `Item ${idx}` : "empty"}
                </text>
                <text x={101 + idx * 85} y="125" textAnchor="middle" fill="#71717a" fontSize="8">
                  [{idx}]
                </text>
              </g>
            );
          })}

          <path d="M 660 40 Q 750 15 750 75 Q 750 135 660 135" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="3 3" fill="none" />
          <text x="400" y="160" textAnchor="middle" fill="#71717a" fontSize="9">Circular wrap-around indexing via (head - 1) &amp; (elements.length - 1). Zero node pointer allocations!</text>
        </svg>
      </div>
    );
  }

  // 13. HashMap Internal Buckets Diagram
  if (type === "hashmap-internal") {
    return (
      <div className="my-6 p-5 sm:p-6 rounded-3xl bg-zinc-950 border border-zinc-800    space-y-3 select-none">
        <div className="flex items-center justify-between border-b border-zinc-900 pb-3">
          <span className="text-xs font-mono font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-rose-400 animate-ping"></span>
            HashMap Internal Buckets, Hash Indexing &amp; Red-Black Treeification
          </span>
          <span className="text-[10px] font-mono text-zinc-500">Node&lt;K,V&gt;[] Table</span>
        </div>

        <svg viewBox="0 0 800 250" className="w-full h-auto font-mono">
          <rect x="20" y="30" width="140" height="45" rx="8" fill="#18181b" stroke="#38bdf8" />
          <text x="90" y="50" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold">Key: "User_101"</text>
          <text x="90" y="64" textAnchor="middle" fill="#71717a" fontSize="8">hashCode() = 7823411</text>

          <path d="M 160 52 L 210 52" stroke="#38bdf8" strokeWidth="2" strokeDasharray="3 3">
            <animate attributeName="stroke-dashoffset" from="6" to="0" dur="0.8s" repeatCount="indefinite" />
          </path>

          <rect x="210" y="30" width="170" height="45" rx="8" fill="#09090b" stroke="#a855f7" />
          <text x="295" y="48" textAnchor="middle" fill="#c084fc" fontSize="9" fontWeight="bold">h ^ (h &gt;&gt;&gt; 16)</text>
          <text x="295" y="64" textAnchor="middle" fill="#22c55e" fontSize="9" fontWeight="bold">Index = (n-1) &amp; hash = 3</text>

          <path d="M 380 52 L 430 52" stroke="#22c55e" strokeWidth="2" />

          <g>
            <rect x="430" y="20" width="70" height="210" rx="8" fill="#18181b" stroke="#3f3f46" />
            <text x="465" y="38" textAnchor="middle" fill="#71717a" fontSize="8">Bucket [0]</text>
            <text x="465" y="70" textAnchor="middle" fill="#71717a" fontSize="8">Bucket [1]</text>
            <text x="465" y="102" textAnchor="middle" fill="#71717a" fontSize="8">Bucket [2]</text>
            <rect x="435" y="115" width="60" height="26" rx="4" fill="#22c55e" />
            <text x="465" y="132" textAnchor="middle" fill="#000000" fontSize="9" fontWeight="bold">Bucket [3]</text>
            <text x="465" y="164" textAnchor="middle" fill="#71717a" fontSize="8">Bucket [4]</text>
            <text x="465" y="196" textAnchor="middle" fill="#71717a" fontSize="8">Bucket [5..15]</text>
          </g>

          <path d="M 495 128 L 540 128" stroke="#22c55e" strokeWidth="2" />

          <g>
            <rect x="540" y="108" width="100" height="40" rx="6" fill="#09090b" stroke="#22c55e" />
            <text x="590" y="125" textAnchor="middle" fill="#ffffff" fontSize="9">Node 1</text>
            <text x="590" y="138" textAnchor="middle" fill="#71717a" fontSize="8">Val: "Amit"</text>

            <path d="M 640 128 L 670 128" stroke="#22c55e" strokeWidth="1.5" />

            <rect x="670" y="98" width="110" height="60" rx="10" fill="#09090b" stroke="#f43f5e" strokeWidth="1.5" />
            <text x="725" y="118" textAnchor="middle" fill="#f43f5e" fontSize="9" fontWeight="bold">Red-Black Tree</text>
            <text x="725" y="132" textAnchor="middle" fill="#ffffff" fontSize="8">TreeNode&lt;K,V&gt;</text>
            <text x="725" y="146" textAnchor="middle" fill="#e4e4e7" fontSize="7">Treeified (Length ≥ 8)</text>
          </g>
        </svg>
      </div>
    );
  }

  return null;
};

// ============================================================================
// MAIN JAVA COLLECTIONS FRAMEWORK MASTER COMPONENT (33 INDIVIDUAL TOPICS)
// ============================================================================
export const CollectionJava = ({ onBackToRevision }) => {
  const [selectedCategory, setSelectedCategory] = useState("All Topics");
  const [activeSectionId, setActiveSectionId] = useState("need-of-collections");
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileTopicMenuOpen, setIsMobileTopicMenuOpen] = useState(false);

  const categories = [
    "All Topics",
    "Fundamentals & Hierarchy",
    "List & Iterators",
    "Set Implementations",
    "Queue & Deque",
    "Map Implementations",
    "Specialized Enums",
    "Utilities & Sorting"
  ];

  const sections = [
    // 1. Need of Collection Framework
    {
      id: "need-of-collections",
      number: "1.0",
      title: "1. Need of Collection Framework & Array Limitations",
      category: "Fundamentals & Hierarchy",
      subtitle: "Why 10,000 variables fail, Array indexing vs Collection dynamic memory engine.",
      introduction: "If we need to store 3 integer values, declaring int x = 10, y = 20, z = 30 works fine. But if we need 10,000 integer values, declaring 10,000 variables is the worst programming practice—code readability suffers and tracking variables becomes impossible. Arrays solve readability via index mapping (Student[] s = new Student[10000]), but introduce 3 major limitations.",
      diagramType: "array-vs-collection",
      subsections: [
        {
          heading: "The 3 Major Limitations of Arrays",
          content: `1. Fixed in Size: Once created with a specified size, arrays cannot grow or shrink based on runtime requirement. Size must be known in advance.\n2. Homogeneous Elements: Student[] s = new Student[10000] can only store Student objects. Storing Customer() causes a compile-time error. (Using Object[] solves this but risks runtime ClassCastExceptions).\n3. Zero Ready-Made Method Support: Arrays lack built-in data structure methods. Sorting, searching, or inserting elements requires writing custom logic from scratch.`
        },
        {
          heading: "Solutions Provided by Java Collections",
          content: `• Collections are growable in nature (dynamic expanding/shrinking buffers).\n• Collections can hold both homogeneous and heterogeneous objects safely with Generics.\n• Every collection class is implemented on standard data structures with ready-made optimized methods.`
        }
      ],
      keyTakeaways: [
        "Arrays are fixed in size and lack ready-made algorithms.",
        "Collections provide dynamic growth and ready-made optimized methods."
      ]
    },

    // 2. Collections in Java Definition
    {
      id: "collections-in-java",
      number: "2.0",
      title: "2. Collections in Java & Definition",
      category: "Fundamentals & Hierarchy",
      subtitle: "Definition of Java Collections and core architecture for object manipulation.",
      introduction: "Collections in Java is a framework that provides an architecture to store and manipulate a group of objects. All data operations like searching, sorting, insertion, manipulation, and deletion can be performed effortlessly using Java Collections.",
      subsections: [
        {
          heading: "Single Unit of Objects",
          content: `A Java Collection represents a single unit of objects (group of individual objects as a single entity). The Java Collection framework provides core interfaces (Set, List, Queue, Deque) and implementation classes (ArrayList, Vector, LinkedList, PriorityQueue, HashSet, LinkedHashSet, TreeSet).`
        }
      ],
      keyTakeaways: [
        "Java Collection represents a group of individual objects as a single unit."
      ]
    },

    // 3. What is Collection Framework
    {
      id: "collection-framework-def",
      number: "3.0",
      title: "3. What is Collection Framework",
      category: "Fundamentals & Hierarchy",
      subtitle: "Unified architecture components: Interfaces, Implementations, and Algorithms.",
      introduction: "Collection framework represents a unified architecture for storing and manipulating a group of objects.",
      subsections: [
        {
          heading: "The 3 Pillars of Collection Framework",
          content: `1. Interfaces: Abstract data types representing collections (List, Set, Queue, Map).\n2. Implementations (Classes): Reusable data structure implementations (ArrayList, LinkedList, HashMap, TreeSet).\n3. Algorithms: Static polymorphic methods for sorting, searching, and shuffling (Collections.sort(), binarySearch()).`
        }
      ],
      keyTakeaways: [
        "The 3 pillars of JCF are Interfaces, Classes (Implementations), and Algorithms."
      ]
    },

    // 4. Hierarchy of Collection Framework
    {
      id: "collection-hierarchy",
      number: "4.0",
      title: "4. Hierarchy of Collection Framework (java.util)",
      category: "Fundamentals & Hierarchy",
      subtitle: "Complete java.util package class and interface relationship tree.",
      introduction: "The java.util package contains all the classes and interfaces forming the Collection framework.",
      diagramType: "collection-hierarchy-svg",
      subsections: [
        {
          heading: "Interface Hierarchy Relationships",
          content: `Iterable<T> (Root Interface)\n  └── Collection<E>\n       ├── List<E> (ArrayList, LinkedList, Vector, Stack)\n       ├── Set<E> (HashSet, LinkedHashSet, TreeSet)\n       └── Queue<E> (PriorityQueue, Deque -> ArrayDeque)\n\nMap<K,V> (Separate Interface Tree: HashMap, LinkedHashMap, TreeMap, Hashtable)`
        }
      ],
      keyTakeaways: [
        "Iterable is the root of the Collection hierarchy.",
        "Map is an independent interface hierarchy."
      ]
    },

    // 5. Methods of Collection Interface
    {
      id: "collection-interface-methods",
      number: "5.0",
      title: "5. Methods of Collection Interface",
      category: "Fundamentals & Hierarchy",
      subtitle: "All declared methods in java.util.Collection interface.",
      introduction: "The Collection interface declares foundational methods supported by all implementing collections.",
      tables: [
        {
          title: "Complete Collection Interface Methods Table",
          headers: ["Method Signature", "Return Type", "Description"],
          rows: [
            ["add(E e)", "boolean", "Inserts an element into the collection."],
            ["addAll(Collection<? extends E> c)", "boolean", "Inserts all elements from the specified collection."],
            ["remove(Object o)", "boolean", "Removes a single instance of the element."],
            ["removeAll(Collection<?> c)", "boolean", "Removes all elements contained in the specified collection."],
            ["retainAll(Collection<?> c)", "boolean", "Retains ONLY elements present in the specified collection (Intersection)."],
            ["clear()", "void", "Removes all elements from the collection."],
            ["contains(Object o)", "boolean", "Returns true if collection contains specified element."],
            ["containsAll(Collection<?> c)", "boolean", "Returns true if collection contains all elements of specified collection."],
            ["isEmpty()", "boolean", "Returns true if collection contains zero elements."],
            ["size()", "int", "Returns total number of elements."],
            ["iterator()", "Iterator<E>", "Returns an iterator over elements."],
            ["toArray()", "Object[]", "Converts collection into an array of Objects."]
          ]
        }
      ],
      codeSnippet: `// Example of addAll(), removeAll(), and retainAll()
ArrayList<String> al = new ArrayList<>(List.of("Ravi", "Vijay", "Ajay"));
ArrayList<String> al2 = new ArrayList<>(List.of("Ravi", "Hanumat"));

al.addAll(al2);  // ["Ravi", "Vijay", "Ajay", "Ravi", "Hanumat"]
al.removeAll(al2); // ["Vijay", "Ajay"]

ArrayList<String> a = new ArrayList<>(List.of("Ravi", "Vijay", "Ajay"));
a.retainAll(al2); // ["Ravi"] (Intersection)`,
      keyTakeaways: [
        "retainAll() performs set intersection.",
        "removeAll() performs set difference."
      ]
    },

    // 6. Iterator Interface
    {
      id: "iterator-interface",
      number: "6.0",
      title: "6. Iterator Interface & Methods",
      category: "Fundamentals & Hierarchy",
      subtitle: "Forward element iteration, cursor movement, and safe element removal.",
      introduction: "The Iterator interface provides the facility of iterating collection elements in forward direction only.",
      diagramType: "iterable-iterator-svg",
      tables: [
        {
          title: "Methods of Iterator Interface",
          headers: ["Method Signature", "Return Type", "Description"],
          rows: [
            ["hasNext()", "boolean", "Returns true if iterator has more elements."],
            ["next()", "E", "Returns the next element and advances the cursor."],
            ["remove()", "void", "Removes the last element returned by next(). Safe removal during loop."]
          ]
        }
      ],
      codeSnippet: `// Iterator Traversal Example
ArrayList<String> list = new ArrayList<>(List.of("Ravi", "Vijay", "Ajay"));
Iterator<String> itr = list.iterator();
while(itr.hasNext()){
    System.out.println(itr.next());
}`,
      keyTakeaways: [
        "Always use iterator.remove() when modifying a collection during iteration."
      ]
    },

    // 7. ArrayList Deep Dive
    {
      id: "arraylist-class",
      number: "7.0",
      title: "7. ArrayList: Deep Dive, Hierarchy & Declaration",
      category: "List & Iterators",
      subtitle: "Dynamic array storage, AbstractList inheritance, List implementation.",
      introduction: "Java ArrayList class uses a dynamic array for storing elements. It inherits AbstractList class and implements List interface.",
      diagramType: "arraylist-resizing-svg",
      subsections: [
        {
          heading: "Important Points about ArrayList",
          content: `• Can contain duplicate elements.\n• Maintains insertion order.\n• Non-synchronized (not thread-safe).\n• Allows random access O(1) because array operates on index basis.\n• Element manipulation (deletion/insertion in middle) is slow because of element shifting.`
        },
        {
          heading: "ArrayList Class Declaration",
          content: `public class ArrayList<E> extends AbstractList<E> implements List<E>, RandomAccess, Cloneable, Serializable`
        }
      ],
      keyTakeaways: [
        "ArrayList provides fast O(1) random access but slow element deletion in middle."
      ]
    },

    // 8. ArrayList Constructors & Methods
    {
      id: "arraylist-constructors-methods",
      number: "8.0",
      title: "8. ArrayList Constructors & Methods",
      category: "List & Iterators",
      subtitle: "Constructors table and complete method list of ArrayList.",
      introduction: "ArrayList provides three constructors for initialization.",
      tables: [
        {
          title: "Constructors of ArrayList",
          headers: ["Constructor Signature", "Description"],
          rows: [
            ["ArrayList()", "Builds an empty array list with default initial capacity of 10."],
            ["ArrayList(int initialCapacity)", "Builds an empty array list with specified initial capacity."],
            ["ArrayList(Collection<? extends E> c)", "Builds an array list containing elements of the specified collection."]
          ]
        }
      ],
      keyTakeaways: [
        "Specifying initialCapacity prevents unnecessary array allocation resizes."
      ]
    },

    // 9. Java Generic vs Non-Generic Collections
    {
      id: "arraylist-generic-examples",
      number: "9.0",
      title: "9. Java Generic Vs Non-Generic Collection & Examples",
      category: "List & Iterators",
      subtitle: "JDK 1.5 Generics transition, type safety, and User-Defined objects.",
      introduction: "Collection framework was non-generic before JDK 1.5. Since 1.5, generic collections enforce type safety at compile time.",
      codeSnippet: `// Non-Generic vs Generic ArrayList Examples
ArrayList al = new ArrayList(); // Old Non-Generic
al.add("Ravi"); al.add(10); // Allowed, but unsafe!

ArrayList<String> list = new ArrayList<String>(); // Generic
list.add("Ravi");
// list.add(10); // Compile time error! Type safe.

// User-defined Class Object Example
class Student {
    int rollno; String name; int age;
    Student(int rollno, String name, int age) {
        this.rollno = rollno; this.name = name; this.age = age;
    }
}

ArrayList<Student> studentList = new ArrayList<>();
studentList.add(new Student(101, "Sonoo", 23));
for(Student s : studentList) {
    System.out.println(s.rollno + " " + s.name + " " + s.age);
}`,
      keyTakeaways: [
        "Generics catch type mismatch errors at compile time instead of runtime."
      ]
    },

    // 10. LinkedList Class
    {
      id: "linkedlist-class",
      number: "10.0",
      title: "10. LinkedList: Deep Dive, Doubly Linked List & Hierarchy",
      category: "List & Iterators",
      subtitle: "Doubly linked list storage, AbstractSequentialList, List & Deque interfaces.",
      introduction: "LinkedList class uses a doubly linked list to store elements. It inherits AbstractSequentialList and implements List and Deque interfaces.",
      diagramType: "linkedlist-doubly-svg",
      subsections: [
        {
          heading: "Important Points about LinkedList",
          content: `• Can contain duplicate elements.\n• Maintains insertion order.\n• Non-synchronized.\n• Element manipulation is fast because no shifting needs to occur.\n• Can be used as List, Stack, or Queue.`
        },
        {
          heading: "LinkedList Declaration & Node Anatomy",
          content: `public class LinkedList<E> extends AbstractSequentialList<E> implements List<E>, Deque<E>, Cloneable, Serializable\n\nInternal Node anatomy:\nprivate static class Node<E> {\n    E item;\n    Node<E> next;\n    Node<E> prev;\n}`
        }
      ],
      keyTakeaways: [
        "LinkedList implements Deque and supports operations at both ends."
      ]
    },

    // 11. LinkedList Constructors & Methods
    {
      id: "linkedlist-constructors-methods",
      number: "11.0",
      title: "11. LinkedList Constructors & Methods (Book Example)",
      category: "List & Iterators",
      subtitle: "LinkedList constructors, methods, and Book object example.",
      introduction: "LinkedList contains specialized methods for deque operations (addFirst, addLast, removeFirst, removeLast).",
      codeSnippet: `// LinkedList Book Object Example
class Book {
    int id; String name, author, publisher; int quantity;
    public Book(int id, String name, String author, String publisher, int quantity) {
        this.id = id; this.name = name; this.author = author;
        this.publisher = publisher; this.quantity = quantity;
    }
}

public class LinkedListExample {
    public static void main(String[] args) {
        List<Book> list = new LinkedList<Book>();
        list.add(new Book(101, "Let us C", "Yashwant Kanetkar", "BPB", 8));
        list.add(new Book(102, "Operating System", "Galvin", "Wiley", 6));

        for(Book b : list) {
            System.out.println(b.id + " " + b.name + " " + b.author);
        }
    }
}`,
      keyTakeaways: [
        "LinkedList is ideal for frequent insertion/deletion at head/tail."
      ]
    },

    // 12. Difference between ArrayList and LinkedList
    {
      id: "arraylist-vs-linkedlist",
      number: "12.0",
      title: "12. Difference between ArrayList and LinkedList",
      category: "List & Iterators",
      subtitle: "Comprehensive architectural comparison matrix.",
      introduction: "ArrayList and LinkedList both implement List interface and maintain insertion order, but differ drastically in internal structure.",
      tables: [
        {
          title: "ArrayList vs LinkedList Comparison Matrix",
          headers: ["Comparison Point", "ArrayList", "LinkedList"],
          rows: [
            ["Data Structure", "Uses dynamic resizable array.", "Uses doubly linked list."],
            ["Manipulation", "Slow due to array element shifting.", "Fast due to pointer relinking."],
            ["Interface", "Implements List interface.", "Implements List and Deque interfaces."],
            ["Access", "Fast O(1) random access.", "Slow O(N) sequential search."],
            ["Memory Overhead", "Less memory (contiguous array buffer).", "More memory (24-byte Node pointer overhead per element)."]
          ]
        }
      ],
      keyTakeaways: [
        "Default to ArrayList unless frequent middle insertions are required."
      ]
    },

    // 13. List Interface & Methods
    {
      id: "list-interface-methods",
      number: "13.0",
      title: "13. List Interface & Methods",
      category: "List & Iterators",
      subtitle: "Indexed access methods declared in java.util.List.",
      introduction: "List interface is a subinterface of Collection. It contains methods to insert, inspect, and delete elements based on zero-based indices.",
      tables: [
        {
          title: "List Interface Methods Table",
          headers: ["Method Signature", "Return Type", "Description"],
          rows: [
            ["get(int index)", "E", "Returns element at specified index."],
            ["set(int index, E element)", "E", "Replaces element at index with specified element."],
            ["add(int index, E element)", "void", "Inserts element at specified index."],
            ["remove(int index)", "E", "Removes element at specified index."],
            ["indexOf(Object o)", "int", "Returns index of first occurrence of element."],
            ["lastIndexOf(Object o)", "int", "Returns index of last occurrence of element."],
            ["listIterator()", "ListIterator<E>", "Returns list iterator over elements."]
          ]
        }
      ],
      keyTakeaways: [
        "List allows duplicate elements and index-based access."
      ]
    },

    // 14. ListIterator Interface
    {
      id: "listiterator-interface",
      number: "14.0",
      title: "14. ListIterator Interface & Methods",
      category: "List & Iterators",
      subtitle: "Bidirectional traversal, index inspection, and in-place element modification.",
      introduction: "ListIterator Interface is used to traverse elements in backward and forward directions.",
      codeSnippet: `// ListIterator Bidirectional Traversal
ArrayList<String> al = new ArrayList<>(List.of("Amit", "Sachin", "Vijay", "Kumar"));
ListIterator<String> itr = al.listIterator();

System.out.println("Forward Direction:");
while(itr.hasNext()) System.out.println(itr.next());

System.out.println("Backward Direction:");
while(itr.hasPrevious()) System.out.println(itr.previous());`,
      keyTakeaways: [
        "ListIterator extends Iterator and provides previous() and hasPrevious()."
      ]
    },

    // 15. HashSet Class
    {
      id: "hashset-class",
      number: "15.0",
      title: "15. HashSet Class: Deep Dive, Hierarchy, Constructors & Methods",
      category: "Set Implementations",
      subtitle: "HashTable storage, uniqueness enforcement, HashMap backing store, hashCode & equals contract.",
      introduction: "Java HashSet class uses a hash table for storage. It inherits AbstractSet class and implements Set interface. Stored elements are unique.",
      diagramType: "hashset-hashmap-svg",
      subsections: [
        {
          heading: "Deep Architectural Mechanics & Backing Store",
          content: `1. HashMap Backing Store: HashSet creates an internal HashMap instance: private transient HashMap<E,Object> map;\n2. Dummy Constant PRESENT: When you call set.add(e), HashSet delegates to map.put(e, PRESENT). If map.put() returns null, add() returns true (element was new).\n3. hashCode() & equals() Contract: For custom objects, if two objects are equal according to equals(), their hashCode() MUST be identical. If hashCode() differs, HashSet places them in different buckets, breaking uniqueness!\n4. Initial Capacity & Load Factor: Default capacity is 16; default load factor is 0.75 (rehashes table when 75% full).\n5. Null Element Handling: HashSet permits exactly 1 null element, stored at bucket index 0 of the backing HashMap.`
        },
        {
          heading: "HashSet Class Declaration & Constructors",
          content: `public class HashSet<E> extends AbstractSet<E> implements Set<E>, Cloneable, Serializable\n\nConstructors:\n• HashSet(): Default capacity 16, load factor 0.75.\n• HashSet(int initialCapacity): Custom initial bucket capacity.\n• HashSet(int initialCapacity, float loadFactor): Custom capacity and threshold ratio.\n• HashSet(Collection<? extends E> c): Initializes set with elements from collection.`
        }
      ],
      keyTakeaways: [
        "HashSet relies on equals() and hashCode() to enforce element uniqueness.",
        "Always override both equals() and hashCode() together in custom classes stored in HashSet."
      ]
    },

    // 16. LinkedHashSet Class
    {
      id: "linkedhashset-class",
      number: "16.0",
      title: "16. LinkedHashSet Class: Hierarchy, Constructors & Methods",
      category: "Set Implementations",
      subtitle: "Hash table and Linked list implementation maintaining insertion order.",
      introduction: "LinkedHashSet class is a Hash table and Linked list implementation of the Set interface. It inherits HashSet and maintains insertion order.",
      diagramType: "linkedhashset-order-svg",
      subsections: [
        {
          heading: "Deep Architectural Breakdown: LinkedHashMap Backing Store",
          content: `1. Backing Store: LinkedHashSet extends HashSet, but calls a dummy package-private HashSet constructor that initializes a LinkedHashMap: map = new LinkedHashMap<>(capacity, loadFactor);\n2. Doubly-Linked Nodes: Entries maintain before and after pointers. This creates a doubly-linked list running through all items in the exact sequence they were inserted.\n3. Predictable Iteration Order: Unlike HashSet (where iteration order depends on hash buckets and is unpredictable), LinkedHashSet iterates elements in exact insertion order.\n4. Iteration Performance Advantage: Iterating LinkedHashSet takes time proportional to O(N) (number of elements), whereas HashSet iteration takes O(Capacity + N) time.\n5. Memory Overhead: Requires extra 16 bytes per entry for before/after pointers.`
        }
      ],
      codeSnippet: `// LinkedHashSet Insertion Order Example
LinkedHashSet<String> set = new LinkedHashSet<>();
set.add("Ravi"); set.add("Vijay"); set.add("Ravi"); set.add("Ajay");

for(String s : set) {
    System.out.println(s); // Output: Ravi, Vijay, Ajay (Insertion Order Preserved, Duplicates Ignored!)
}`,
      keyTakeaways: [
        "LinkedHashSet maintains insertion order while guaranteeing unique elements.",
        "Iterates in O(N) time proportional to element count, avoiding empty hash bucket scans."
      ]
    },

    // 17. TreeSet Class
    {
      id: "treeset-class",
      number: "17.0",
      title: "17. TreeSet Class: Hierarchy, Constructors & Methods",
      category: "Set Implementations",
      subtitle: "NavigableSet, Red-Black tree storage, ascending sorted order, and Range Queries.",
      introduction: "TreeSet class implements NavigableSet interface using a Red-Black tree for storage. Elements are stored in ascending order.",
      diagramType: "treeset-redblack-svg",
      subsections: [
        {
          heading: "NavigableSet Range Query Methods & Null Disallowance",
          content: `1. NavigableSet Operations:\n   • first() / last(): Returns lowest and highest elements.\n   • headSet(toElement, inclusive): Returns view of elements less than (or equal to) toElement.\n   • tailSet(fromElement, inclusive): Returns view of elements greater than (or equal to) fromElement.\n   • subSet(fromElement, fromInc, toElement, toInc): Returns range view.\n   • ceiling(e): Returns smallest element >= e, or null if none.\n   • floor(e): Returns largest element <= e, or null if none.\n   • higher(e): Returns smallest element > e.\n   • lower(e): Returns largest element < e.\n   • pollFirst() / pollLast(): Retrieves and removes lowest or highest element.\n\n2. Null Disallowance: TreeSet DISALLOWS null elements! Inserting null throws NullPointerException because TreeSet calls compareTo() or comparator.compare(a, b) to position nodes, which fails on null.`
        }
      ],
      codeSnippet: `// TreeSet NavigableSet Range Queries Example
TreeSet<Integer> set = new TreeSet<>(List.of(10, 25, 40, 55, 70, 85));

System.out.println("First: " + set.first()); // 10
System.out.println("Last: " + set.last());   // 85
System.out.println("Ceiling(30): " + set.ceiling(30)); // 40 (Smallest element >= 30)
System.out.println("Floor(30): " + set.floor(30));     // 25 (Largest element <= 30)
System.out.println("SubSet(25, 70): " + set.subSet(25, true, 70, false)); // [25, 40, 55]`,
      keyTakeaways: [
        "TreeSet disallows null elements and maintains O(log N) sorted order.",
        "NavigableSet methods (ceiling, floor, higher, lower) enable instant range search."
      ]
    },

    // 18. Difference between List and Set & Set Comparison Matrix
    {
      id: "list-vs-set-comparison",
      number: "18.0",
      title: "18. Difference between List vs Set & Set Comparison Matrix",
      category: "Set Implementations",
      subtitle: "Comparison of HashSet, LinkedHashSet, and TreeSet.",
      introduction: "List permits duplicate elements, whereas Set enforces uniqueness.",
      tables: [
        {
          title: "HashSet vs LinkedHashSet vs TreeSet Comparison",
          headers: ["Feature", "HashSet", "LinkedHashSet", "TreeSet"],
          rows: [
            ["Underlying Structure", "HashMap", "LinkedHashMap", "Red-Black Tree (TreeMap)"],
            ["Ordering", "Unordered", "Insertion Order", "Sorted Ascending Order"],
            ["Performance", "O(1) average", "O(1) average", "O(log N)"],
            ["Null Elements", "Allows 1 null", "Allows 1 null", "Disallows null (throws NPE)"]
          ]
        }
      ],
      keyTakeaways: [
        "Choose HashSet for speed, LinkedHashSet for insertion order, TreeSet for sorting."
      ]
    },

    // 19. Queue Interface
    {
      id: "queue-interface",
      number: "19.0",
      title: "19. Queue Interface & Methods",
      category: "Queue & Deque",
      subtitle: "FIFO ordering method contract.",
      introduction: "Queue interface orders elements in FIFO (First In First Out) manner.",
      diagramType: "queue-fifo-svg",
      tables: [
        {
          title: "Queue Methods Contract Table",
          headers: ["Operation", "Throws Exception", "Returns Special Value (null/false)"],
          rows: [
            ["Insert", "add(e)", "offer(e)"],
            ["Remove", "remove()", "poll()"],
            ["Examine", "element()", "peek()"]
          ]
        }
      ],
      keyTakeaways: [
        "Prefer offer(), poll(), and peek() for safe null/false return values."
      ]
    },

    // 20. PriorityQueue Class
    {
      id: "priorityqueue-class",
      number: "20.0",
      title: "20. PriorityQueue Class: Min-Heap Architecture & Methods",
      category: "Queue & Deque",
      subtitle: "Binary Min-Heap array storage and priority sorting.",
      introduction: "PriorityQueue provides queue operations ordered by element priority (natural or Comparator). It inherits AbstractQueue.",
      diagramType: "priorityqueue-heap-svg",
      codeSnippet: `// PriorityQueue Example
PriorityQueue<String> queue = new PriorityQueue<>();
queue.add("Amit"); queue.add("Vijay"); queue.add("Karan"); queue.add("Jai");

System.out.println("Head element: " + queue.peek()); // "Amit" (Min element)
queue.poll(); // Removes head "Amit"`,
      keyTakeaways: [
        "PriorityQueue peek() is O(1), offer() and poll() are O(log N)."
      ]
    },

    // 21. Deque Interface
    {
      id: "deque-interface",
      number: "21.0",
      title: "21. Deque Interface & Methods",
      category: "Queue & Deque",
      subtitle: "Double-ended queue method contract.",
      introduction: "Deque is a linear collection supporting element insertion and removal at both ends.",
      keyTakeaways: [
        "Deque acronym stands for Double Ended Queue."
      ]
    },

    // 22. ArrayDeque Class
    {
      id: "arraydeque-class",
      number: "22.0",
      title: "22. ArrayDeque Class: Circular Array & Methods",
      category: "Queue & Deque",
      subtitle: "Resizable circular array buffer, bitwise index wrapping, faster than Stack & LinkedList.",
      introduction: "ArrayDeque provides a resizable circular array implementation of Deque. It disallows null elements.",
      diagramType: "arraydeque-circular-svg",
      subsections: [
        {
          heading: "Deep Internal Mechanics: Bitwise Wrapping & Zero Allocation",
          content: `1. Bitwise Circular Index Wrapping: Uses head and tail pointers on an Object[] elements array. Array capacity is always forced to a power of 2 (e.g. 16, 32, 64). Head decrement wraps around via bitwise operation: head = (head - 1) & (elements.length - 1).\n2. Zero Node Allocation: Unlike LinkedList (which allocates a new 24-byte Node object for every item inserted), ArrayDeque operates on a single pre-allocated array. This yields superior CPU cache locality and zero GC pointer garbage overhead!\n3. Performance over java.util.Stack & LinkedList: ArrayDeque is faster than Stack (because Stack has heavy synchronized locking overhead) and faster than LinkedList (for LIFO stack or FIFO queue operations).\n4. Null Prohibition Rationale: ArrayDeque DISALLOWS null elements! Null is used as a special sentinel return value by poll(), peek(), pollFirst(), and pollLast(). Storing null would make poll() ambiguous (unable to distinguish between an empty deque and an entry holding null).`
        }
      ],
      codeSnippet: `// ArrayDeque offerFirst() & pollLast() Example
Deque<String> deque = new ArrayDeque<>();
deque.offer("arvind"); deque.offer("vimal");
deque.offerFirst("jai"); // Insert at head: ["jai", "arvind", "vimal"]
deque.pollLast();       // Removes "vimal" from tail`,
      keyTakeaways: [
        "ArrayDeque is faster than Stack and LinkedList due to zero node pointer allocations.",
        "Disallows null elements to prevent sentinel ambiguity in poll()/peek()."
      ]
    },

    // 23. Map Interface
    {
      id: "map-interface",
      number: "23.0",
      title: "23. Map Interface & Useful Methods",
      category: "Map Implementations",
      subtitle: "Key-Value entry mappings, views, and Java 8 functional default methods.",
      introduction: "A map contains values based on keys. Each key and value pair is known as an entry. Map contains unique keys only.",
      diagramType: "map-keyvalue-svg",
      subsections: [
        {
          heading: "Java 8 Functional Default Methods in Map",
          content: `Java 8 introduced powerful default functional methods on the Map interface:\n• getOrDefault(Object key, V defaultValue): Returns mapped value or defaultValue if key is missing.\n• putIfAbsent(K key, V value): Inserts entry ONLY if key is absent or mapped to null.\n• computeIfAbsent(K key, Function<? super K, ? extends V> mappingFunction): Computes value if key is absent.\n• merge(K key, V value, BiFunction<? super V, ? super V, ? extends V> remappingFunction): Merges new value with existing value.\n• forEach(BiConsumer<? super K, ? super V> action): Iterates key-value pairs cleanly.`
        }
      ],
      codeSnippet: `// Java 8 Functional Map Methods Example
Map<String, Integer> map = new HashMap<>();
map.put("Apple", 10); map.put("Banana", 20);

// getOrDefault
System.out.println("Mango count: " + map.getOrDefault("Mango", 0)); // Output: 0

// putIfAbsent
map.putIfAbsent("Apple", 50); // Will NOT overwrite (Apple remains 10)
map.putIfAbsent("Cherry", 30); // Inserts Cherry=30

// computeIfAbsent
map.computeIfAbsent("Dragonfruit", k -> k.length() * 5); // Inserts Dragonfruit=55

// forEach
map.forEach((key, val) -> System.out.println(key + " -> " + val));`,
      keyTakeaways: [
        "Map keys must be unique. Values can contain duplicates.",
        "Java 8 default methods (putIfAbsent, computeIfAbsent, merge) eliminate verbose boilerplate."
      ]
    },

    // 24. Map.Entry Interface
    {
      id: "map-entry-interface",
      number: "24.0",
      title: "24. Map.Entry Interface & Methods",
      category: "Map Implementations",
      subtitle: "Sub-interface for key-value pair extraction during iteration.",
      introduction: "Entry is a nested sub-interface of Map accessed via Map.Entry.",
      codeSnippet: `// Traversing Map via Map.Entry
Map<Integer, String> map = new HashMap<>();
map.put(100, "Amit"); map.put(101, "Vijay");

for(Map.Entry<Integer, String> m : map.entrySet()) {
    System.out.println(m.getKey() + " " + m.getValue());
}`,
      keyTakeaways: [
        "Map.Entry provides getKey() and getValue() for clean iteration."
      ]
    },

    // 25. HashMap Class
    {
      id: "hashmap-class",
      number: "25.0",
      title: "25. HashMap Class: Hierarchy, Parameters, Constructors & Methods",
      category: "Map Implementations",
      subtitle: "Buckets table, hash indexing, collision chaining, and treeification.",
      introduction: "HashMap class implements Map interface using a Hashtable. It inherits AbstractMap.",
      diagramType: "hashmap-internal",
      subsections: [
        {
          heading: "HashMap Declaration & Parameters",
          content: `public class HashMap<K,V> extends AbstractMap<K,V> implements Map<K,V>, Cloneable, Serializable\n• K: Type of keys maintained by map.\n• V: Type of mapped values.`
        }
      ],
      keyTakeaways: [
        "HashMap permits 1 null key and multiple null values."
      ]
    },

    // 26. LinkedHashMap Class
    {
      id: "linkedhashmap-class",
      number: "26.0",
      title: "26. LinkedHashMap Class: Hierarchy, Constructors, Methods & LRU Cache",
      category: "Map Implementations",
      subtitle: "Hash table and Linked list implementation maintaining insertion/access order, LRU Cache.",
      introduction: "LinkedHashMap inherits HashMap and maintains insertion or access order.",
      subsections: [
        {
          heading: "Deep Architecture: Node Extension & Access-Order LRU Cache",
          content: `1. Entry Node Extension: LinkedHashMap overrides HashMap's Node class with its own Entry subclass:\n   static class Entry<K,V> extends HashMap.Node<K,V> {\n       Entry<K,V> before, after;\n   }\n\n2. Access-Order Mode (LRU Ordering): By default, LinkedHashMap maintains insertion-order. However, passing accessOrder = true in constructor enables ACCESS-ORDER mode:\n   public LinkedHashMap(int initialCapacity, float loadFactor, boolean accessOrder)\n   When accessOrder is true, invoking get(key) or put(key, val) moves the accessed entry to the TAIL of the linked list!\n\n3. Building an LRU Cache: Overriding protected boolean removeEldestEntry(Map.Entry<K,V> eldest) allows automatic eviction of the least recently used entry when capacity is exceeded!`
        }
      ],
      codeSnippet: `// LRU (Least Recently Used) Cache using LinkedHashMap
import java.util.LinkedHashMap;
import java.util.Map;

class LRUCache<K, V> extends LinkedHashMap<K, V> {
    private final int capacity;

    public LRUCache(int capacity) {
        // initialCapacity, loadFactor, accessOrder=true
        super(capacity, 0.75f, true);
        this.capacity = capacity;
    }

    @Override
    protected boolean removeEldestEntry(Map.Entry<K, V> eldest) {
        return size() > capacity; // Automatically evicts oldest accessed item!
    }

    public static void main(String[] args) {
        LRUCache<Integer, String> cache = new LRUCache<>(3);
        cache.put(1, "A"); cache.put(2, "B"); cache.put(3, "C");
        cache.get(1); // Accesses 1 ➔ Moves 1 to tail (2 is now eldest!)
        cache.put(4, "D"); // Capacity exceeded ➔ Evicts 2 ("B")!

        System.out.println(cache); // Output: {3=C, 1=A, 4=D}
    }
}`,
      keyTakeaways: [
        "Setting accessOrder=true turns LinkedHashMap into a production LRU cache.",
        "Overriding removeEldestEntry() enables automatic cache eviction."
      ]
    },

    // 27. TreeMap Class
    {
      id: "treemap-class",
      number: "27.0",
      title: "27. TreeMap Class: Hierarchy, Constructors, Methods & Red-Black Tree",
      category: "Map Implementations",
      subtitle: "NavigableMap, Red-Black tree sorting, HashMap vs TreeMap, Range Views.",
      introduction: "TreeMap implements NavigableMap using Red-Black tree to store key-value pairs in sorted order.",
      diagramType: "treeset-redblack-svg",
      subsections: [
        {
          heading: "Deep Architecture: Red-Black Tree Properties & NavigableMap Methods",
          content: `1. Red-Black Tree Balance Invariants: TreeMap stores entries in an internal self-balancing Binary Search Tree (Entry<K,V> root). Red-Black tree invariants guarantee O(log N) worst-case time for get(), put(), remove(), and containsKey().\n2. Key Comparator vs Comparable: Keys must implement Comparable<K> or a custom Comparator<K> must be provided in constructor: new TreeMap<>(Comparator.reverseOrder()).\n3. NavigableMap API Operations:\n   • firstEntry() / lastEntry(): Returns lowest/highest key-value entries.\n   • pollFirstEntry() / pollLastEntry(): Removes lowest/highest entries.\n   • headMap(toKey, inclusive) / tailMap(fromKey, inclusive): Range views.\n   • subMap(fromKey, fromInc, toKey, toInc): Returns sub-range key-value view.\n   • descendingMap(): Returns reverse order view of map.`
        }
      ],
      tables: [
        {
          title: "HashMap vs TreeMap Comparison",
          headers: ["Feature", "HashMap", "TreeMap"],
          rows: [
            ["Ordering", "Unordered", "Ascending Sorted Key Order"],
            ["Null Keys", "Allows 1 null key", "Disallows null key (throws NPE)"],
            ["Performance", "O(1) average", "O(log N)"],
            ["Data Structure", "Hash Table", "Red-Black Tree"]
          ]
        }
      ],
      keyTakeaways: [
        "TreeMap sorts entries by keys in ascending order via Red-Black Tree.",
        "NavigableMap API enables $O(\log N)$ range extraction and subMap views."
      ]
    },

    // 28. Hashtable Class
    {
      id: "hashtable-class",
      number: "28.0",
      title: "28. Hashtable Class: Hierarchy, Constructors, Methods & Concurrency",
      category: "Map Implementations",
      subtitle: "Legacy synchronized container, global locking, disallowing null keys/values.",
      introduction: "Hashtable is an array of bucket lists. It is synchronized and disallows null keys or values.",
      subsections: [
        {
          heading: "Deep Architectural Mechanics & ConcurrentHashMap Replacement",
          content: `1. Legacy Container: Hashtable is a JDK 1.0 legacy class that extends Dictionary<K,V> (deprecated abstract class).\n2. Method-Level Synchronization Overhead: Every single public method in Hashtable is marked with the synchronized keyword: public synchronized V get(Object key). This creates a single global lock (monitor lock on the Hashtable instance). Under multithreaded contention, all threads block each other, degrading throughput!\n3. Strict Null Prohibition: Hashtable DISALLOWS null keys AND null values! Calling hashtable.put(null, val) or hashtable.put(key, null) immediately throws NullPointerException (hashtable calls key.hashCode() and value.equals()).\n4. Enumeration vs Iterator: Hashtable elements can be traversed via legacy Enumeration (elements(), keys()) or Iterator.\n5. Modern Replacement: Modern Java applications use ConcurrentHashMap! ConcurrentHashMap (Java 8) replaces global locking with CAS (Compare-And-Swap) operations and synchronized locking only on the HEAD node of individual hash buckets.`
        }
      ],
      tables: [
        {
          title: "HashMap vs Hashtable Comparison",
          headers: ["Feature", "HashMap", "Hashtable"],
          rows: [
            ["Synchronization", "Unsynchronized (Fast)", "Synchronized (Slow due to monitor lock)"],
            ["Null Keys/Values", "Allows 1 null key & multiple null values", "Disallows any null key or value"],
            ["Hierarchy", "Extends AbstractMap", "Extends Dictionary"]
          ]
        }
      ],
      keyTakeaways: [
        "Hashtable uses heavy method-level synchronization.",
        "Replace Hashtable with ConcurrentHashMap for thread-safe high performance."
      ]
    },

    // 29. EnumSet Class
    {
      id: "enumset-class",
      number: "29.0",
      title: "29. EnumSet Class: Hierarchy, Methods & Examples",
      category: "Specialized Enums",
      subtitle: "Specialized Set implementation for Java Enum types.",
      introduction: "EnumSet is a specialized Set implementation for use with enum types.",
      codeSnippet: `// EnumSet Example
enum Days { SUNDAY, MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY, SATURDAY }

public class EnumSetExample {
    public static void main(String[] args) {
        Set<Days> set1 = EnumSet.allOf(Days.class); // All elements
        System.out.println("Week Days: " + set1);

        Set<Days> set2 = EnumSet.noneOf(Days.class); // Empty set
        System.out.println("Empty: " + set2);
    }
}`,
      keyTakeaways: [
        "EnumSet is represented internally as a 64-bit long bit-vector array."
      ]
    },

    // 30. EnumMap Class
    {
      id: "enummap-class",
      number: "30.0",
      title: "30. EnumMap Class: Hierarchy, Parameters, Constructors & Methods",
      category: "Specialized Enums",
      subtitle: "Specialized Map implementation for enum keys.",
      introduction: "EnumMap is a specialized Map implementation for enum keys. Extremely compact and fast.",
      codeSnippet: `// EnumMap Example
public enum Days { Monday, Tuesday, Wednesday, Thursday }

EnumMap<Days, String> map = new EnumMap<>(Days.class);
map.put(Days.Monday, "1"); map.put(Days.Tuesday, "2");

for(Map.Entry m : map.entrySet()) {
    System.out.println(m.getKey() + " " + m.getValue());
}`,
      keyTakeaways: [
        "EnumMap uses a simple array indexed by enum.ordinal()."
      ]
    },

    // 31. Collections Utility Class
    {
      id: "collections-class",
      number: "31.0",
      title: "31. Collections Class: Static Algorithmic Methods & Sorting",
      category: "Utilities & Sorting",
      subtitle: "Polymorphic algorithms: sort, max, min, addAll, binarySearch.",
      introduction: "Collections class consists exclusively of static methods operating on collections.",
      codeSnippet: `// Collections Utility Class Example
List<String> list = new ArrayList<>();
list.add("C"); list.add("Core Java"); list.add("Advance Java");

Collections.addAll(list, "Servlet", "JSP");
Collections.sort(list); // Sorts alphabetically

List<Integer> intList = List.of(46, 67, 24, 16, 8, 12);
System.out.println("Max: " + Collections.max(intList)); // 67
System.out.println("Min: " + Collections.min(intList)); // 8`,
      keyTakeaways: [
        "Collections class methods operate polymorphically on List implementations."
      ]
    },

    // 32. Comparable vs Comparator Interfaces
    {
      id: "comparable-vs-comparator",
      number: "32.0",
      title: "32. Comparable vs Comparator Interfaces",
      category: "Utilities & Sorting",
      subtitle: "Single natural sorting vs multiple custom sort strategies.",
      introduction: "Comparable interface (java.lang) provides single natural sorting sequence via compareTo(Object). Comparator interface (java.util) provides multiple custom sort strategies via compare(Object o1, Object o2).",
      codeSnippet: `// User-Defined Comparable & Comparator Example
class Student implements Comparable<Student> {
    int rollno; String name; int age;
    Student(int rollno, String name, int age) {
        this.rollno = rollno; this.name = name; this.age = age;
    }
    public int compareTo(Student st) {
        return Integer.compare(this.age, st.age); // Natural sort by age
    }
}

class NameComparator implements Comparator<Student> {
    public int compare(Student s1, Student s2) {
        return s1.name.compareTo(s2.name); // Custom sort by name
    }
}

public class TestSort {
    public static void main(String[] args) {
        ArrayList<Student> al = new ArrayList<>();
        al.add(new Student(101, "Vijay", 23));
        al.add(new Student(106, "Ajay", 27));

        Collections.sort(al); // Sorts by Age (Comparable)
        Collections.sort(al, new NameComparator()); // Sorts by Name (Comparator)
    }
}`,
      keyTakeaways: [
        "Comparable modifies target class. Comparator is an external strategy."
      ]
    },

    // 33. Difference between ArrayList and Vector
    {
      id: "arraylist-vs-vector",
      number: "33.0",
      title: "33. Difference between ArrayList and Vector",
      category: "Utilities & Sorting",
      subtitle: "Legacy synchronized Vector vs modern fast ArrayList.",
      introduction: "ArrayList and Vector both implement List interface, but Vector is a synchronized legacy class.",
      tables: [
        {
          title: "ArrayList vs Vector Comparison Table",
          headers: ["Point of Difference", "ArrayList", "Vector"],
          rows: [
            ["Synchronization", "Unsynchronized (Fast).", "Synchronized (Slow)."],
            ["Growth Factor", "Expands by 50% (1.5x growth).", "Expands by 100% (Doubles size)."],
            ["Traversal", "Iterator and ListIterator.", "Enumeration, Iterator, and ListIterator."],
            ["Performance", "High performance for single thread.", "Low performance due to monitor locks."]
          ]
        }
      ],
      keyTakeaways: [
        "Avoid legacy Vector class in modern Java codebases."
      ]
    }
  ];

  const scrollToSection = (id) => {
    setActiveSectionId(id);
    setIsMobileTopicMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -90;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  const filteredSections = sections.filter((s) => {
    const matchesCategory = selectedCategory === "All Topics" || s.category === selectedCategory;
    if (!matchesCategory) return false;

    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      s.title.toLowerCase().includes(q) ||
      s.subtitle.toLowerCase().includes(q) ||
      s.subsections?.some((sub) => sub.heading.toLowerCase().includes(q) || sub.content.toLowerCase().includes(q))
    );
  });

  const activeSectionObj = sections.find((s) => s.id === activeSectionId) || sections[0];

  return (
    <div className="space-y-6 sm:space-y-8 font-sans max-w-7xl mx-auto pb-24 px-1 sm:px-0 overflow-x-hidden w-full">

      {/* Ultra-Compact Header Banner */}
      <div className="p-3 sm:p-4 rounded-2xl bg-white border border-slate-200 dark:bg-zinc-950 dark:border-zinc-800 space-y-2.5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Database className="w-4 h-4 text-slate-700 dark:text-zinc-300 shrink-0" />
            <h1 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white truncate">
              Java Collections Framework (JCF) Master Modules
            </h1>
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 text-slate-600 dark:text-zinc-400 shrink-0 hidden sm:inline-block">
              33 Modules
            </span>
          </div>

          <div className="w-full md:w-72 relative shrink-0">
            <input
              type="text"
              placeholder="Search 33 modules..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 text-xs text-slate-900 dark:text-zinc-200 placeholder-slate-400 dark:placeholder-zinc-500 focus:outline-none focus:border-slate-400 transition font-sans"
            />
            <Search className="w-3.5 h-3.5 text-slate-400 dark:text-zinc-500 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5 no-scrollbar border-t border-slate-100 dark:border-zinc-900 pt-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-mono font-bold whitespace-nowrap transition cursor-pointer border ${selectedCategory === cat
                ? "bg-slate-900 text-white border-slate-900 dark:bg-white dark:text-black dark:border-white"
                : "bg-slate-50 hover:bg-slate-100 text-slate-600 hover:text-slate-900 border-slate-200 dark:bg-zinc-900 dark:hover:bg-zinc-800 dark:text-zinc-400 dark:hover:text-white dark:border-zinc-800"
                }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Mobile Topic Navigation Dropdown (< xl screens) */}
      <div className="xl:hidden sticky top-16 z-30 bg-white/95 border border-slate-200 dark:bg-zinc-950/95 dark:border-zinc-800 backdrop-blur-md rounded-2xl p-3   ">
        <button
          onClick={() => setIsMobileTopicMenuOpen(!isMobileTopicMenuOpen)}
          className="w-full flex items-center justify-between gap-2 text-xs font-mono font-bold text-slate-900 dark:text-white cursor-pointer"
        >
          <div className="flex items-center gap-2 truncate">
            <span className="px-2 py-0.5 rounded bg-slate-900 text-white dark:bg-white dark:text-black font-extrabold text-[10px]">
              #{activeSectionObj.number}
            </span>
            <span className="truncate text-slate-800 dark:text-zinc-200">
              {activeSectionObj.title.replace(/^\d+\.\s*/, "")}
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-slate-500 dark:text-zinc-400 shrink-0">
            <span className="text-[10px]">Jump Section</span>
            <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isMobileTopicMenuOpen ? "rotate-180 text-slate-900 dark:text-white" : ""}`} />
          </div>
        </button>

        {isMobileTopicMenuOpen && (
          <div className="mt-3 pt-3 border-t border-slate-200 dark:border-zinc-800 max-h-64 overflow-y-auto space-y-1 no-scrollbar animate-in slide-in-from-top-1">
            {sections.map((sec) => {
              const isActive = activeSectionId === sec.id;
              return (
                <button
                  key={sec.id}
                  onClick={() => scrollToSection(sec.id)}
                  className={`w-full text-left p-2 rounded-xl transition flex items-center justify-between text-xs cursor-pointer ${isActive
                    ? "bg-slate-900 text-white font-extrabold dark:bg-white dark:text-black"
                    : "text-slate-700 hover:text-slate-900 hover:bg-slate-100 dark:text-zinc-400 dark:hover:text-white dark:hover:bg-zinc-900"
                    }`}
                >
                  <div className="flex items-center gap-2 truncate">
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${isActive ? "bg-slate-800 text-white dark:bg-black dark:text-white" : "bg-slate-100 text-slate-600 dark:bg-zinc-900 dark:text-zinc-400"}`}>
                      {sec.number}
                    </span>
                    <span className="truncate">{sec.title.replace(/^\d+\.\s*/, "")}</span>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 opacity-60 shrink-0" />
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Main Content Layout + Sticky Right Navigation Index */}
      <div className="flex gap-8 items-start">

        {/* Left Side Content Area */}
        <div className="flex-1 space-y-8 sm:space-y-12 min-w-0">
          {filteredSections.length > 0 ? (
            filteredSections.map((section) => (
              <section
                key={section.id}
                id={section.id}
                className="p-5 sm:p-8 rounded-3xl bg-white border border-slate-200 dark:bg-zinc-950 dark:border-zinc-800/90 space-y-6 sm:space-y-8 scroll-mt-24 transition-all   "
              >
                {/* Section Header */}
                <div className="border-b border-slate-200 dark:border-zinc-900 pb-5 space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-mono px-2.5 py-0.5 rounded-md bg-slate-100 border border-slate-200 text-slate-900 dark:bg-zinc-900 dark:border-zinc-800 dark:text-white font-extrabold">
                      MODULE {section.number}
                    </span>
                    <span className="text-xs font-mono text-slate-500 dark:text-zinc-500">{section.category}</span>
                  </div>
                  <h2 className="text-lg sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                    {section.title}
                  </h2>
                  <p className="text-xs text-slate-600 dark:text-zinc-400 font-sans font-medium leading-relaxed">
                    {section.subtitle}
                  </p>
                </div>

                {/* Lead-in introduction */}
                {section.introduction && (
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-800 dark:bg-zinc-900/40 dark:border-zinc-800/60 dark:text-zinc-300 leading-relaxed font-sans">
                    <p>{section.introduction}</p>
                  </div>
                )}

                {/* Animated SVG Examiner Diagram */}
                {section.diagramType && (
                  <CollectionDiagram type={section.diagramType} />
                )}

                {/* Subsections */}
                {section.subsections && section.subsections.length > 0 && (
                  <div className="space-y-4 sm:space-y-6">
                    {section.subsections.map((sub, sIdx) => (
                      <div key={sIdx} className="space-y-3 p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200 dark:bg-zinc-900/30 dark:border-zinc-800/70">
                        <h3 className="text-xs sm:text-base font-bold text-slate-900 dark:text-white flex items-start gap-2 font-mono leading-tight">
                          <ChevronRight className="w-4 h-4 text-sky-600 dark:text-sky-400 shrink-0 mt-0.5" />
                          <span>{sub.heading}</span>
                        </h3>

                        <div className="text-xs sm:text-sm text-slate-700 dark:text-zinc-300 leading-relaxed font-sans whitespace-pre-line">
                          {sub.content}
                        </div>

                        {sub.code && (
                          <div className="space-y-2 pt-2">
                            <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-500 dark:text-zinc-400">
                              <Terminal className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                              <span>Runnable Code Example:</span>
                            </div>
                            <pre className="p-3.5 sm:p-4 rounded-xl bg-slate-900 border border-slate-800 dark:bg-black dark:border-zinc-800 text-[11px] sm:text-xs font-mono text-emerald-400 dark:text-emerald-300 overflow-x-auto leading-relaxed max-w-full">
                              <code>{sub.code}</code>
                            </pre>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* Standalone Code Snippet */}
                {section.codeSnippet && (
                  <div className="space-y-2">
                    <span className="text-[11px] font-mono uppercase text-slate-500 dark:text-zinc-400 font-bold tracking-wider flex items-center gap-1.5">
                      <Terminal className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                      Code Implementation Example:
                    </span>
                    <pre className="p-4 rounded-2xl bg-slate-900 border border-slate-800 dark:bg-black dark:border-zinc-800 text-[11px] sm:text-xs font-mono text-emerald-400 dark:text-emerald-300 overflow-x-auto leading-relaxed max-w-full">
                      <code>{section.codeSnippet}</code>
                    </pre>
                  </div>
                )}

                {/* Comparison & Methods Tables */}
                {section.tables && section.tables.map((table, tIdx) => (
                  <div key={tIdx} className="space-y-3 pt-2">
                    <span className="text-[11px] font-mono uppercase text-slate-500 dark:text-zinc-400 font-bold tracking-wider flex items-center gap-1.5">
                      <TableIcon className="w-3.5 h-3.5 text-slate-900 dark:text-white" />
                      {table.title}
                    </span>

                    <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-slate-50 dark:border-zinc-800 dark:bg-zinc-900/40 no-scrollbar">
                      <table className="w-full text-left text-xs font-sans">
                        <thead className="bg-slate-100 text-slate-800 dark:bg-zinc-900/90 dark:text-zinc-300 font-mono text-[10px] sm:text-[11px] uppercase border-b border-slate-200 dark:border-zinc-800">
                          <tr>
                            {table.headers.map((h, hIdx) => (
                              <th key={hIdx} className="p-3 font-bold whitespace-nowrap">
                                {h}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200 dark:divide-zinc-800/60 text-slate-700 dark:text-zinc-200">
                          {table.rows.map((row, rIdx) => (
                            <tr key={rIdx} className="hover:bg-slate-100 dark:hover:bg-zinc-900/60 transition">
                              {row.map((cell, cIdx) => (
                                <td
                                  key={cIdx}
                                  className={`p-3 text-[11px] sm:text-xs ${cIdx === 0 ? "font-bold text-slate-900 dark:text-white font-mono whitespace-nowrap" : "text-slate-700 dark:text-zinc-300 min-w-[130px]"
                                    }`}
                                >
                                  {cell}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ))}

                {/* Key Takeaways Box */}
                {section.keyTakeaways && section.keyTakeaways.length > 0 && (
                  <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 dark:bg-amber-950/20 dark:border-amber-900/50 space-y-2">
                    <span className="text-[11px] font-mono uppercase text-amber-700 dark:text-amber-400 font-bold tracking-widest flex items-center gap-1.5">
                      <Lightbulb className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                      Key Architect Takeaways:
                    </span>
                    <ul className="space-y-1.5">
                      {section.keyTakeaways.map((takeaway, tkIdx) => (
                        <li key={tkIdx} className="text-xs text-amber-900 dark:text-amber-100/90 font-medium flex items-start gap-2 leading-relaxed">
                          <span className="text-amber-500 font-mono">•</span>
                          <span>{takeaway}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </section>
            ))
          ) : (
            <div className="p-12 rounded-3xl bg-white border border-slate-200 dark:bg-zinc-950 dark:border-zinc-800 text-center space-y-4">
              <p className="text-slate-600 dark:text-zinc-400 text-sm">No Collections topics found matching "{searchQuery}".</p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All Topics");
                }}
                className="px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold border border-slate-900 dark:bg-zinc-900 dark:border-zinc-700 dark:hover:bg-zinc-800 transition cursor-pointer"
              >
                Reset Search
              </button>
            </div>
          )}
        </div>

        {/* Right Sticky Fixed Topic Index Navigation Sidebar (xl+ screens) */}
        <aside className="w-72 hidden xl:block sticky top-24 space-y-4 flex-shrink-0 select-none">
          <div className="p-5 rounded-3xl bg-white border border-slate-200 dark:bg-zinc-950 dark:border-zinc-800    space-y-4 max-h-[80vh] flex flex-col">

            <div className="flex items-center justify-between border-b border-slate-200 dark:border-zinc-900 pb-3 flex-shrink-0">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-zinc-400 font-bold flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-slate-900 dark:text-white" />
                JCF Topics Index
              </span>
              <span className="text-[10px] font-mono text-slate-500 dark:text-zinc-500">
                {sections.length} Topics
              </span>
            </div>

            {/* Scrollable Nav Links */}
            <nav className="space-y-1 font-mono text-xs overflow-y-auto pr-1 flex-1 no-scrollbar">
              {sections.map((sec) => {
                const isActive = activeSectionId === sec.id;
                return (
                  <button
                    key={sec.id}
                    onClick={() => scrollToSection(sec.id)}
                    className={`w-full text-left p-2 rounded-xl transition flex items-center justify-between cursor-pointer group ${isActive
                      ? "bg-slate-900 text-white font-extrabold dark:bg-white dark:text-black"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-zinc-400 dark:hover:text-white dark:hover:bg-zinc-900 border border-transparent"
                      }`}
                  >
                    <div className="flex items-center gap-2 truncate">
                      <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${isActive ? "bg-slate-800 text-white dark:bg-black dark:text-white" : "bg-slate-100 text-slate-600 dark:bg-zinc-900 dark:text-zinc-400 group-hover:text-slate-900 dark:group-hover:text-white"
                        }`}>
                        {sec.number}
                      </span>
                      <span className="truncate text-[11px]">{sec.title.replace(/^\d+\.\s*/, "")}</span>
                    </div>

                    <ChevronRight className={`w-3 h-3 flex-shrink-0 transition-transform ${isActive ? "text-white dark:text-black translate-x-0.5" : "text-slate-400 dark:text-zinc-600 group-hover:text-slate-900 dark:group-hover:text-white"
                      }`} />
                  </button>
                );
              })}
            </nav>

            {/* Back to top */}
            <div className="pt-2 border-t border-slate-200 dark:border-zinc-900 flex-shrink-0">
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="w-full py-2 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-[11px] font-mono text-slate-700 dark:bg-zinc-900 dark:hover:bg-zinc-800 dark:border-zinc-800 dark:text-zinc-300 dark:hover:text-white transition cursor-pointer flex items-center justify-center gap-1.5"
              >
                <span>↑ Back to Top</span>
              </button>
            </div>

          </div>
        </aside>

      </div>

    </div>
  );
};

export default CollectionJava;
