import React, { useState } from "react";
import {
  Brain,
  Code2,
  Sparkles,
  Layers,
  ArrowLeft,
  BookOpen,
  Search,
  CheckCircle2,
  ChevronRight,
  Zap,
  Eye,
  Workflow,
  Lightbulb,
  Target,
  ArrowRight,
  ShieldAlert,
  Terminal,
  Grid,
  GitBranch,
  Cpu,
  Hash,
  Database,
  Activity
} from "lucide-react";

// ============================================================================
// COMPREHENSIVE DATA STRUCTURES & ALGORITHMS THEORY DATASET
// ============================================================================
const THEORY_CATEGORIES = [
  {
    id: "arrays",
    title: "1. Arrays, Strings & Matrices",
    desc: "Contiguous RAM memory layout, cache line locality, 2D matrix transformations, string matching algorithms, and prefix analysis.",
    icon: Grid,
    concepts: [
      {
        name: "Memory Layout, Cache Locality & Dynamic Arrays",
        summary: "Arrays allocate memory contiguously in RAM. Accessing element i uses direct calculation address = base + i * element_size in O(1) time.",
        details: [
          "CPU Cache Line Locality: Accessing arr[i] pulls adjacent memory into 64-byte L1/L2 cache lines, yielding orders-of-magnitude faster iteration than linked nodes.",
          "Dynamic Resizing Amortized Proof: When array capacity doubles from N to 2N, N operations take 1 step while the N-th operation takes N steps. Total work = 2N, resulting in amortized O(1) time per insert.",
          "2D Matrix Storage: Row-major order (matrix[r][c] stored at r * cols + c) vs Column-major order. Iterating row-by-row is cache-optimal."
        ],
        complexity: { access: "O(1)", search: "O(N)", insert: "O(N)", delete: "O(N)" },
        keyTakeaway: "Use contiguously allocated arrays when index access speed and cache performance are critical."
      },
      {
        name: "Prefix Sum & Difference Array Mechanics",
        summary: "Pre-computes running sums to evaluate range queries sum(L, R) in O(1) time, or range updates using difference arrays.",
        details: [
          "Prefix Sum Array: P[i] = P[i-1] + arr[i]. Range sum sum(L, R) = P[R] - P[L-1] (with P[-1] = 0).",
          "2D Prefix Sum Matrix: P[r][c] = matrix[r][c] + P[r-1][c] + P[r][c-1] - P[r-1][c-1]. Query submatrix (r1,c1) to (r2,c2) in O(1).",
          "Difference Array Range Updates: To add val to [L, R], execute D[L] += val and D[R+1] -= val. Taking prefix sum of D yields final array in O(N)."
        ],
        complexity: { preprocess: "O(N)", rangeQuery: "O(1)", space: "O(N)" },
        keyTakeaway: "Whenever an array is immutable and subject to frequent range sum queries, build a Prefix Sum array."
      },
      {
        name: "Kadane's Algorithm & Subarray Maximization",
        summary: "Finds the maximum contiguous subarray sum in single-pass O(N) time and O(1) space.",
        details: [
          "Dynamic Programming Recurrence: current_max = max(arr[i], current_max + arr[i]). Global max tracks peak current_max seen so far.",
          "Mathematical Intuition: If current_max becomes negative, reset it to 0 because a negative prefix will strictly reduce any subsequent subarray sum.",
          "Extended Kadane's: Track start and end indices by updating start index whenever current_max resets to arr[i]."
        ],
        complexity: { time: "O(N)", space: "O(1)" },
        keyTakeaway: "Use Kadane's algorithm for maximum/minimum contiguous subarray sum problems."
      },
      {
        name: "String Matching: KMP & Rabin-Karp Algorithms",
        summary: "Advanced string matching algorithms achieving linear time O(N + M) complexity.",
        details: [
          "Knuth-Morris-Pratt (KMP): Builds Prefix Function (Pi Table) of pattern. When character mismatch occurs, uses Pi table to skip redundant comparisons without backing up text pointer.",
          "Rabin-Karp Rolling Hash: Computes polynomial rolling hash hash = (hash * base + char) % mod. Slide window by removing outgoing character hash in O(1) time.",
          "Spurious Hits: Rabin-Karp checks character equality only on hash collision to guarantee correctness."
        ],
        complexity: { kmpTime: "O(N + M)", rabinKarpAvg: "O(N + M)", space: "O(M)" },
        keyTakeaway: "Use KMP for guaranteed O(N) pattern search and Rabin-Karp for multi-pattern or 2D grid matching."
      }
    ]
  },
  {
    id: "linkedlists",
    title: "2. Linked Lists & Pointer Data Structures",
    desc: "Heap-allocated pointer structures, Doubly Linked Lists, Skip Lists, and memory management mechanics.",
    icon: Database,
    concepts: [
      {
        name: "Singly vs Doubly Linked Lists & Memory Overhead",
        summary: "Heap nodes connected via memory addresses rather than contiguous memory blocks.",
        details: [
          "Pointer Overhead: Each node requires data payload plus 8 bytes per pointer (64-bit arch). A Doubly Linked List node carries 16 bytes of pointer metadata.",
          "O(1) Deletion: Removing a node in a Doubly Linked List given node reference takes O(1) time: node.prev.next = node.next; node.next.prev = node.prev.",
          "Dummy Sentinel Nodes: Using dummyHead and dummyTail eliminates boundary edge cases when inserting/deleting at list ends."
        ],
        complexity: { access: "O(N)", insertHead: "O(1)", deleteGivenNode: "O(1)" },
        keyTakeaway: "Use Doubly Linked Lists with Sentinel Nodes when building LRU Caches or Deques requiring O(1) node deletion."
      },
      {
        name: "Floyd's Cycle Detection & Loop Start Proof",
        summary: "Detects cycles in pointer structures using Slow (1 step) and Fast (2 steps) pointers.",
        details: [
          "Cycle Detection Proof: If loop length is C and distance to loop entry is F, when Slow enters loop, Fast is k steps inside. Fast gains 1 step per turn, meeting Slow within C steps.",
          "Finding Loop Entry Proof: Distance traveled by Fast = 2 * (Distance by Slow). Substituting equations proves distance from list head to loop entry equals distance from meeting point to loop entry.",
          "Algorithm: Reset Slow to head after meeting; move both Slow and Fast 1 step at a time. The node where they meet is the cycle start."
        ],
        complexity: { time: "O(N)", space: "O(1)" },
        keyTakeaway: "Floyd's 2-pointer approach achieves O(1) extra space for cycle detection and middle node identification."
      },
      {
        name: "Skip Lists: Probabilistic O(log N) Search",
        summary: "Multi-level linked list structure providing logarithmic search, insert, and delete operations without complex tree balance rotations.",
        details: [
          "Layer Hierarchy: Express lane layers skip nodes. Base layer contains all elements sorted.",
          "Probabilistic Promotion: Nodes are promoted to higher layers with probability p (typically 0.5) using random coin flips.",
          "Redis Sorted Set Implementation: Redis uses Skip Lists to power ZSET because skip lists support fast concurrent lock-free updates compared to AVL/Red-Black trees."
        ],
        complexity: { searchAvg: "O(log N)", insertAvg: "O(log N)", space: "O(N)" },
        keyTakeaway: "Skip Lists offer lock-free concurrency advantages over balanced BSTs in high-throughput systems."
      }
    ]
  },
  {
    id: "stacksqueues",
    title: "3. Stacks, Queues & Monotonic Data Structures",
    desc: "LIFO & FIFO operational semantics, Expression Parsing, Monotonic Stacks, and Ring Buffers.",
    icon: Layers,
    concepts: [
      {
        name: "Monotonic Stack & Queue Mechanics",
        summary: "Maintains elements in strictly increasing or decreasing order by popping invalid elements prior to push.",
        details: [
          "Monotonically Decreasing Stack: Used to find Next Greater Element. Before pushing x, pop all elements < x.",
          "Monotonically Increasing Queue: Used for Sliding Window Maximum. Pops elements from back smaller than current value.",
          "Amortized O(N) Proof: Every array element is pushed onto the stack exactly once and popped at most once."
        ],
        complexity: { push: "O(1)", pop: "O(1)", totalTime: "O(N)" },
        keyTakeaway: "Use Monotonic Stack/Queue when solving Next Greater Element, Daily Temperatures, or Sliding Window Max."
      },
      {
        name: "Expression Parsing & Shunting-Yard Algorithm",
        summary: "Converts Infix mathematical expressions (A + B * C) to Postfix/RPN (A B C * +) using an Operator Stack.",
        details: [
          "Operator Precedence Rule: If operator on stack top has higher or equal precedence than current operator, pop stack top to output.",
          "Parentheses Handling: Push ( to stack; when ) is encountered, pop stack to output until ( is matched.",
          "Postfix Evaluation: Use Operand Stack. Push numbers; on operator, pop 2 operands, compute result, and push back."
        ],
        complexity: { parseTime: "O(N)", evalTime: "O(N)", space: "O(N)" },
        keyTakeaway: "Use Dijkstra's Shunting-Yard algorithm for mathematical expression evaluation and calculator design."
      }
    ]
  },
  {
    id: "trees",
    title: "4. Trees, Binary Search Trees & Advanced Trees",
    desc: "Tree Traversals, Self-Balancing Trees (AVL/Red-Black), Tries, Segment Trees, and Fenwick Trees.",
    icon: GitBranch,
    concepts: [
      {
        name: "Tree Traversals & Morris In-Order Traversal",
        summary: "Explores tree nodes systematically via Pre-order, In-order, Post-order, or Level-order traversals.",
        details: [
          "Recursive & Stack Traversals: Uses O(H) implicit recursion or explicit stack space.",
          "Morris In-Order Traversal: Achieves O(N) time and strictly O(1) space by establishing temporary threaded links between node predecessor's right pointer and current node.",
          "Thread Removal: Upon revisiting predecessor via threaded link, restore predecessor.right = null and move to curr.right."
        ],
        complexity: { morrisTime: "O(N)", morrisSpace: "O(1)" },
        keyTakeaway: "Morris Traversal provides O(1) space tree traversal by modifying right child pointers temporarily."
      },
      {
        name: "Self-Balancing BSTs: AVL & Red-Black Trees",
        summary: "Prevents tree degeneration into O(N) linked list skew via structural invariants.",
        details: [
          "AVL Trees: Strict balance factor |height(left) - height(right)| <= 1. Requires single or double rotations upon insert/delete. Ideal for read-heavy lookup.",
          "Red-Black Trees: Color invariants (Root is black, No adjacent red nodes, Equal black height along all paths). Less strict balancing requires fewer rotations on insert/delete. Used in Java TreeMap & C++ std::map."
        ],
        complexity: { search: "O(log N)", insert: "O(log N)", delete: "O(log N)" },
        keyTakeaway: "Red-Black trees balance write overhead and lookup efficiency, making them standard for system libraries."
      },
      {
        name: "Segment Tree & Fenwick Tree (Binary Indexed Tree)",
        summary: "Advanced range query data structures supporting logarithmic range updates and point/range queries.",
        details: [
          "Segment Tree: Full binary tree storing aggregate interval values (sum, min, max). Supports O(log N) point/range update and O(log N) range query.",
          "Lazy Propagation: Defers interval update operations to child nodes until requested, enabling O(log N) range update.",
          "Fenwick Tree (BIT): Compact array representation using lowest set bit i & (-i) logic. Supports O(log N) prefix sum update and query with smaller constant factor than Segment Trees."
        ],
        complexity: { bitQuery: "O(log N)", bitUpdate: "O(log N)", bitSpace: "O(N)" },
        keyTakeaway: "Use Fenwick Tree for point updates + range sum queries; use Segment Tree with Lazy Propagation for range updates."
      }
    ]
  },
  {
    id: "graphs",
    title: "5. Graph Algorithms & Network Flow",
    desc: "Graph Traversals (BFS/DFS), Shortest Path (Dijkstra, Bellman-Ford, Floyd-Warshall), Disjoint Set Union, and Tarjan's SCC.",
    icon: Cpu,
    concepts: [
      {
        name: "Disjoint Set Union (DSU) with Path Compression",
        summary: "Tracks non-overlapping sets with near-constant amortized time complexity O(α(N)).",
        details: [
          "Path Compression: During find(x), flatten tree structure by linking parent[x] directly to root: parent[x] = find(parent[x]).",
          "Union by Rank / Size: Attach shorter tree under root of taller tree to keep maximum tree depth low.",
          "Inverse Ackermann Function α(N): For all practical values of N up to 10^80, α(N) <= 4, making ops effectively O(1)."
        ],
        complexity: { find: "O(alpha(N))", union: "O(alpha(N))", space: "O(N)" },
        keyTakeaway: "Use DSU for dynamic connectivity, Kruskal's Minimum Spanning Tree, and cycle detection in undirected graphs."
      },
      {
        name: "Shortest Path Matrix: Dijkstra, Bellman-Ford & Floyd-Warshall",
        summary: "Algorithm choices based on edge weights and graph density.",
        details: [
          "Dijkstra: Single-source shortest path for non-negative weights using Min-Heap priority queue in O((V + E) log V) time.",
          "Bellman-Ford: Handles negative edge weights in O(V * E) time. Relaxes all edges V-1 times. 15th iteration distance reduction flags negative weight cycles.",
          "Floyd-Warshall: All-pairs shortest path in O(V^3) time using 3D DP recurrence dist[i][j] = min(dist[i][j], dist[i][k] + dist[k][j])."
        ],
        complexity: { dijkstra: "O((V+E) log V)", bellmanFord: "O(V*E)", floydWarshall: "O(V^3)" },
        keyTakeaway: "Choose Dijkstra for single-source non-negative edges, Bellman-Ford for negative edges, Floyd-Warshall for all-pairs."
      },
      {
        name: "Strongly Connected Components: Tarjan's Low-Link Algorithm",
        summary: "Finds maximal strongly connected subgraphs in directed graphs in single DFS pass.",
        details: [
          "Discovery Time & Low-Link Values: disc[u] tracks discovery timestamp; low[u] tracks lowest reachable discovery time.",
          "Stack Maintenance: Push nodes to stack during DFS. If low[u] == disc[u], pop stack until u to extract one SCC.",
          "Time Complexity: Single pass O(V + E) runtime."
        ],
        complexity: { time: "O(V + E)", space: "O(V)" },
        keyTakeaway: "Use Tarjan's algorithm for finding strongly connected components and condensation graphs."
      }
    ]
  },
  {
    id: "dp",
    title: "6. Dynamic Programming & Advanced Paradigms",
    desc: "Overlapping subproblems, state transitions, Knapsack variations, String DP, Bitmask DP, and Digit DP.",
    icon: Code2,
    concepts: [
      {
        name: "DP Principles: Top-Down vs Bottom-Up Space Optimization",
        summary: "Solves complex optimization problems by breaking them into overlapping subproblems.",
        details: [
          "Top-Down Memoization: Uses recursive DFS + hash/array cache table. Solves subproblems lazily.",
          "Bottom-Up Tabulation: Solves subproblems iteratively in topological order, filling DP matrix from base cases up.",
          "Space Optimization Technique: If dp[i] depends only on previous row dp[i-1], collapse 2D array dp[N][W] to 1D array dp[W], saving memory."
        ],
        complexity: { time: "O(States * Transitions)", space: "O(States)" },
        keyTakeaway: "Always check if 2D DP matrices can be optimized to 1D space by reversing inner iteration order."
      },
      {
        name: "Classic DP Patterns: Knapsack, LCS & Edit Distance",
        summary: "Fundamental recurrence models for competitive programming and technical interviews.",
        details: [
          "0/1 Knapsack: dp[i][w] = max(dp[i-1][w], val[i-1] + dp[i-1][w - wt[i-1]]). Inner loop runs backwards for 1D space optimization.",
          "Unbounded Knapsack: Inner loop runs forwards since items can be reused infinitely.",
          "Longest Common Subsequence (LCS): If s1[i] == s2[j], dp[i][j] = 1 + dp[i-1][j-1]; else max(dp[i-1][j], dp[i][j-1]).",
          "Edit Distance (Levenshtein): Matches characters or takes 1 + min(insert, delete, replace)."
        ],
        complexity: { knapsackTime: "O(N * W)", lcsTime: "O(N * M)", editDistanceTime: "O(N * M)" },
        keyTakeaway: "Master 0/1 Knapsack and LCS recurrence structures as templates for complex dynamic programming problems."
      }
    ]
  }
];

// ============================================================================
// ANIMATED SVG ILLUSTRATOR COMPONENT (INDIVIDUAL CUSTOM ANIMATIONS FOR 1 TO 20)
// ============================================================================
const PatternAnimatedSvg = ({ patternId }) => {
  // 1. Two Pointers
  if (patternId === "two-pointers") {
    return (
      <div className="w-full h-40 rounded-2xl bg-slate-900 border border-slate-800 p-4 flex flex-col justify-between relative overflow-hidden font-mono text-xs text-white">
        <div className="flex items-center justify-between text-[10px] text-blue-400 font-bold uppercase tracking-wider">
          <span>Target Sum = 11</span>
          <span className="text-emerald-400">Pointers Converging</span>
        </div>
        <div className="flex items-center justify-center gap-2 py-2">
          {[1, 3, 5, 6, 8, 10].map((val, idx) => (
            <div
              key={idx}
              className={`w-10 h-10 rounded-xl border flex flex-col items-center justify-center font-bold text-xs relative transition-all ${
                idx === 1
                  ? "bg-blue-600/40 border-blue-500 text-blue-300 ring-2 ring-blue-500 animate-pulse"
                  : idx === 4
                  ? "bg-amber-600/40 border-amber-500 text-amber-300 ring-2 ring-amber-500 animate-pulse"
                  : "bg-slate-800 border-slate-700 text-slate-400 opacity-60"
              }`}
            >
              <span>{val}</span>
              {idx === 1 && (
                <div className="absolute -bottom-5 text-[9px] text-blue-400 font-bold flex flex-col items-center">
                  <span>▲</span><span>L</span>
                </div>
              )}
              {idx === 4 && (
                <div className="absolute -bottom-5 text-[9px] text-amber-400 font-bold flex flex-col items-center">
                  <span>▲</span><span>R</span>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="text-[11px] text-center text-slate-400 font-sans">
          3 + 8 = 11 <span className="text-emerald-400 font-bold">(Target Found!)</span>
        </div>
      </div>
    );
  }

  // 2. Sliding Window
  if (patternId === "sliding-window") {
    return (
      <div className="w-full h-40 rounded-2xl bg-slate-900 border border-slate-800 p-4 flex flex-col justify-between relative overflow-hidden font-mono text-xs text-white">
        <div className="flex items-center justify-between text-[10px] text-amber-400 font-bold uppercase tracking-wider">
          <span>Window Size K = 3</span>
          <span className="text-emerald-400">Sliding Right</span>
        </div>
        <div className="flex items-center justify-center gap-2 py-2">
          {[2, 1, 5, 1, 3, 2].map((val, idx) => (
            <div
              key={idx}
              className={`w-10 h-10 rounded-xl border flex flex-col items-center justify-center font-bold text-xs relative transition-all ${
                idx >= 2 && idx <= 4
                  ? "bg-amber-500/30 border-amber-500 text-amber-300 ring-2 ring-amber-500/50 animate-pulse"
                  : "bg-slate-800 border-slate-700 text-slate-400 opacity-40"
              }`}
            >
              <span>{val}</span>
            </div>
          ))}
        </div>
        <div className="text-[11px] text-center text-slate-400 font-sans">
          Window `[5, 1, 3]` ➔ <span className="text-amber-400 font-bold">Sum = 9</span>
        </div>
      </div>
    );
  }

  // 3. Fast & Slow Pointers
  if (patternId === "fast-slow") {
    return (
      <div className="w-full h-40 rounded-2xl bg-slate-900 border border-slate-800 p-4 flex flex-col justify-between relative overflow-hidden font-mono text-xs text-white">
        <div className="flex items-center justify-between text-[10px] text-blue-400 font-bold uppercase tracking-wider">
          <span>Floyd's Cycle Detector</span>
          <span className="text-emerald-400">Slow (1x) vs Fast (2x)</span>
        </div>
        <div className="flex items-center justify-center gap-2 py-2">
          {["Node 1", "Node 2", "Node 3 (Loop)"].map((label, idx) => (
            <div
              key={idx}
              className={`px-3 py-2 rounded-xl border flex items-center gap-2 font-bold text-xs ${
                idx === 2
                  ? "bg-blue-500/30 border-blue-500 text-blue-300 ring-2 ring-blue-500 animate-pulse"
                  : "bg-slate-800 border-slate-700 text-slate-400"
              }`}
            >
              <span>{label}</span>
              {idx < 2 && <span className="text-slate-600">➔</span>}
            </div>
          ))}
        </div>
        <div className="text-[11px] text-center text-slate-400 font-sans">
          Fast overlaps Slow ➔ <span className="text-emerald-400 font-bold">Cycle Confirmed</span>
        </div>
      </div>
    );
  }

  // 4. Merge Intervals
  if (patternId === "merge-intervals") {
    return (
      <div className="w-full h-40 rounded-2xl bg-slate-900 border border-slate-800 p-4 flex flex-col justify-between relative overflow-hidden font-mono text-xs text-white">
        <div className="flex items-center justify-between text-[10px] text-rose-400 font-bold uppercase tracking-wider">
          <span>Interval Fusion</span>
          <span className="text-emerald-400">Overlapping Condition</span>
        </div>
        <div className="space-y-2 py-1">
          <div className="h-6 rounded-lg bg-rose-500/30 border border-rose-500/50 flex items-center px-3 text-[10px] text-rose-300 font-bold w-3/4">
            Interval A: [1 ------------ 6]
          </div>
          <div className="h-6 rounded-lg bg-blue-500/30 border border-blue-500/50 flex items-center px-3 text-[10px] text-blue-300 font-bold w-1/2 ml-12 animate-pulse">
            Interval B: [4 ------- 8]
          </div>
        </div>
        <div className="text-[11px] text-center text-slate-400 font-sans">
          Fused Result ➔ <span className="text-emerald-400 font-bold">[1 -------------------- 8]</span>
        </div>
      </div>
    );
  }

  // 5. Linked List Reversal
  if (patternId === "linked-list-reversal") {
    return (
      <div className="w-full h-40 rounded-2xl bg-slate-900 border border-slate-800 p-4 flex flex-col justify-between relative overflow-hidden font-mono text-xs text-white">
        <div className="flex items-center justify-between text-[10px] text-emerald-400 font-bold uppercase tracking-wider">
          <span>Pointer Direction Flip</span>
          <span className="text-blue-400">Prev  Curr ➔ Next</span>
        </div>
        <div className="flex items-center justify-center gap-3 py-2">
          <div className="px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-slate-400 text-xs">
            Node 1
          </div>
          <span className="text-emerald-400 font-bold animate-pulse"></span>
          <div className="px-3 py-2 rounded-xl bg-blue-600/40 border border-blue-500 text-blue-300 text-xs ring-2 ring-blue-500">
            Node 2 (Curr)
          </div>
          <span className="text-slate-600">➔</span>
          <div className="px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-slate-400 text-xs">
            Node 3
          </div>
        </div>
        <div className="text-[11px] text-center text-slate-400 font-sans">
          Flipping link pointer: <span className="text-emerald-400 font-bold">curr.next = prev</span>
        </div>
      </div>
    );
  }

  // 6. Monotonic Stack
  if (patternId === "monotonic-stack") {
    return (
      <div className="w-full h-40 rounded-2xl bg-slate-900 border border-slate-800 p-4 flex flex-col justify-between relative overflow-hidden font-mono text-xs text-white">
        <div className="flex items-center justify-between text-[10px] text-amber-400 font-bold uppercase tracking-wider">
          <span>Monotonic Decreasing Stack</span>
          <span className="text-rose-400">Popping Smaller Tops</span>
        </div>
        <div className="flex items-center justify-center gap-2 py-2">
          <div className="px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-slate-300 font-bold">
            9
          </div>
          <div className="px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-slate-300 font-bold">
            7
          </div>
          <div className="px-3 py-2 rounded-xl bg-rose-500/30 border border-rose-500 text-rose-300 font-bold line-through animate-pulse">
            4 (Pop!)
          </div>
          <span className="text-slate-500">← Push 6</span>
        </div>
        <div className="text-[11px] text-center text-slate-400 font-sans">
          4 &lt; 6 popped ➔ <span className="text-amber-400 font-bold">Stack Invariant Maintained</span>
        </div>
      </div>
    );
  }

  // 7. Monotonic Queue
  if (patternId === "monotonic-queue") {
    return (
      <div className="w-full h-40 rounded-2xl bg-slate-900 border border-slate-800 p-4 flex flex-col justify-between relative overflow-hidden font-mono text-xs text-white">
        <div className="flex items-center justify-between text-[10px] text-cyan-400 font-bold uppercase tracking-wider">
          <span>Sliding Window Deque Max</span>
          <span className="text-emerald-400">O(1) Front Access</span>
        </div>
        <div className="flex items-center justify-center gap-3 py-2">
          <div className="px-3.5 py-2 rounded-xl bg-cyan-500/30 border border-cyan-400 text-cyan-200 font-bold text-xs ring-2 ring-cyan-400/50 animate-pulse">
            Front: Idx 2 (Val 15)
          </div>
          <span className="text-slate-600">➔</span>
          <div className="px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-slate-400 text-xs">
            Back: Idx 3 (Val 8)
          </div>
        </div>
        <div className="text-[11px] text-center text-slate-400 font-sans">
          Front holds window peak: <span className="text-cyan-300 font-bold">Max = 15</span>
        </div>
      </div>
    );
  }

  // 8. Top-K Elements
  if (patternId === "top-k-elements") {
    return (
      <div className="w-full h-40 rounded-2xl bg-slate-900 border border-slate-800 p-4 flex flex-col justify-between relative overflow-hidden font-mono text-xs text-white">
        <div className="flex items-center justify-between text-[10px] text-indigo-400 font-bold uppercase tracking-wider">
          <span>Min-Heap of Size K=3</span>
          <span className="text-rose-400">Root Eviction</span>
        </div>
        <div className="flex flex-col items-center gap-1 py-1">
          <div className="px-3 py-1 rounded-lg bg-rose-500/30 border border-rose-500 text-rose-300 text-xs font-bold animate-pulse">
            Root: 5 (Poll!)
          </div>
          <div className="flex items-center gap-4 text-xs font-bold text-slate-300">
            <div className="px-2.5 py-1 rounded bg-slate-800 border border-slate-700">8</div>
            <div className="px-2.5 py-1 rounded bg-slate-800 border border-slate-700">12</div>
          </div>
        </div>
        <div className="text-[11px] text-center text-slate-400 font-sans">
          Offer 10 &gt; Root 5 ➔ <span className="text-emerald-400 font-bold">New Top K Threshold set</span>
        </div>
      </div>
    );
  }

  // 9. Two Heaps
  if (patternId === "two-heaps") {
    return (
      <div className="w-full h-40 rounded-2xl bg-slate-900 border border-slate-800 p-4 flex flex-col justify-between relative overflow-hidden font-mono text-xs text-white">
        <div className="flex items-center justify-between text-[10px] text-amber-400 font-bold uppercase tracking-wider">
          <span>Dual Heap Balance Scale</span>
          <span className="text-emerald-400">Median Stream</span>
        </div>
        <div className="flex items-center justify-center gap-4 py-2">
          <div className="p-2 rounded-xl bg-blue-500/20 border border-blue-500 text-blue-300 text-center w-28">
            <span className="text-[9px] uppercase font-bold block text-blue-400">Max-Heap (Left)</span>
            <span className="font-bold text-xs">[ 3 , 1 ]</span>
          </div>
          <div className="w-8 h-8 rounded-full bg-amber-500/30 border border-amber-400 flex items-center justify-center font-bold text-amber-300 animate-bounce">
            5
          </div>
          <div className="p-2 rounded-xl bg-blue-500/20 border border-blue-500 text-blue-300 text-center w-28">
            <span className="text-[9px] uppercase font-bold block text-blue-400">Min-Heap (Right)</span>
            <span className="font-bold text-xs">[ 7 , 9 ]</span>
          </div>
        </div>
        <div className="text-[11px] text-center text-slate-400 font-sans">
          Size Diff &lt;= 1 ➔ <span className="text-amber-400 font-bold">Median = (3 + 7)/2 = 5</span>
        </div>
      </div>
    );
  }

  // 10. Subsets & Backtracking
  if (patternId === "backtracking") {
    return (
      <div className="w-full h-40 rounded-2xl bg-slate-900 border border-slate-800 p-4 flex flex-col justify-between relative overflow-hidden font-mono text-xs text-white">
        <div className="flex items-center justify-between text-[10px] text-emerald-400 font-bold uppercase tracking-wider">
          <span>State Tree Traversal</span>
          <span className="text-rose-400">Backtrack Arrow</span>
        </div>
        <div className="flex items-center justify-center gap-3 py-1 font-mono text-xs">
          <span className="px-2 py-1 rounded bg-slate-800 text-slate-300 font-bold">Root []</span>
          <span className="text-emerald-400 font-bold">➔ Choose 1 ➔</span>
          <span className="px-2 py-1 rounded bg-emerald-500/30 border border-emerald-500 text-emerald-300 font-bold">[1]</span>
          <span className="text-rose-400 font-bold animate-pulse"> Unchoose 1</span>
        </div>
        <div className="text-[11px] text-center text-slate-400 font-sans">
          Path state pop: <span className="text-rose-400 font-bold">path.remove(path.size() - 1)</span>
        </div>
      </div>
    );
  }

  // 11. Modified Binary Search
  if (patternId === "binary-search") {
    return (
      <div className="w-full h-40 rounded-2xl bg-slate-900 border border-slate-800 p-4 flex flex-col justify-between relative overflow-hidden font-mono text-xs text-white">
        <div className="flex items-center justify-between text-[10px] text-teal-400 font-bold uppercase tracking-wider">
          <span>Binary Search Halving</span>
          <span className="text-emerald-400">O(log N) Space Reduction</span>
        </div>
        <div className="flex items-center justify-center gap-1 py-2">
          <div className="h-7 px-3 rounded-l-xl bg-slate-800 border border-slate-700 text-slate-500 opacity-40 flex items-center">Low</div>
          <div className="h-7 px-4 bg-slate-800 border-t border-b border-slate-700 text-slate-500 opacity-40 flex items-center">Discarded Left</div>
          <div className="h-7 px-4 rounded-xl bg-teal-500/30 border border-teal-400 text-teal-200 font-bold flex items-center animate-pulse ring-2 ring-teal-400/50">Mid (8)</div>
          <div className="h-7 px-3 rounded-r-xl bg-slate-800 border border-slate-700 text-slate-300 flex items-center">High</div>
        </div>
        <div className="text-[11px] text-center text-slate-400 font-sans">
          Target in Right Half ➔ <span className="text-teal-300 font-bold">low = mid + 1</span>
        </div>
      </div>
    );
  }

  // 12. Binary Search on Answer
  if (patternId === "search-space-reduction") {
    return (
      <div className="w-full h-40 rounded-2xl bg-slate-900 border border-slate-800 p-4 flex flex-col justify-between relative overflow-hidden font-mono text-xs text-white">
        <div className="flex items-center justify-between text-[10px] text-violet-400 font-bold uppercase tracking-wider">
          <span>Feasibility Function Space</span>
          <span className="text-emerald-400">isPossible(mid)</span>
        </div>
        <div className="w-full bg-slate-800 h-6 rounded-xl overflow-hidden flex items-center px-2 relative my-2 border border-slate-700">
          <div className="w-1/2 bg-violet-600/40 h-full rounded-lg border border-violet-400 flex items-center px-2 text-[10px] text-violet-200 font-bold animate-pulse">
            Valid Capacity Range: [1 ...... 24]
          </div>
        </div>
        <div className="text-[11px] text-center text-slate-400 font-sans">
          isPossible(12) == true ➔ <span className="text-violet-300 font-bold">Try smaller capacity (high = 11)</span>
        </div>
      </div>
    );
  }

  // 13. Topological Sort
  if (patternId === "topological-sort") {
    return (
      <div className="w-full h-40 rounded-2xl bg-slate-900 border border-slate-800 p-4 flex flex-col justify-between relative overflow-hidden font-mono text-xs text-white">
        <div className="flex items-center justify-between text-[10px] text-orange-400 font-bold uppercase tracking-wider">
          <span>Kahn's In-Degree 0 Queue</span>
          <span className="text-emerald-400">Dependency Graph</span>
        </div>
        <div className="flex items-center justify-center gap-3 py-2">
          <div className="px-3 py-2 rounded-xl bg-orange-500/30 border border-orange-400 text-orange-200 font-bold text-xs ring-2 ring-orange-400/50 animate-pulse">
            Course A (InDegree 0)
          </div>
          <span className="text-slate-600">➔ Dequeue ➔</span>
          <div className="px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-slate-400 text-xs">
            Course B (InDegree 1➔0)
          </div>
        </div>
        <div className="text-[11px] text-center text-slate-400 font-sans">
          Pop InDegree 0 node ➔ <span className="text-orange-300 font-bold">Decrement neighbor in-degree</span>
        </div>
      </div>
    );
  }

  // 14. BFS Level Order
  if (patternId === "bfs-traversal") {
    return (
      <div className="w-full h-40 rounded-2xl bg-slate-900 border border-slate-800 p-4 flex flex-col justify-between relative overflow-hidden font-mono text-xs text-white">
        <div className="flex items-center justify-between text-[10px] text-sky-400 font-bold uppercase tracking-wider">
          <span>Queue Level Processing</span>
          <span className="text-emerald-400">Level 0 ➔ Level 1 ➔ Level 2</span>
        </div>
        <div className="flex justify-center items-center gap-2 py-1">
          <span className="px-2.5 py-1 rounded-lg bg-sky-500/20 border border-sky-500 text-sky-300 font-bold text-[10px]">Level 0 (1)</span>
          <span className="text-slate-600">➔</span>
          <span className="px-2.5 py-1 rounded-lg bg-sky-500/40 border border-sky-400 text-sky-200 font-bold text-[10px] ring-2 ring-sky-400 animate-pulse">Level 1 (2, 3)</span>
        </div>
        <div className="text-[11px] text-center text-slate-400 font-sans">
          Capture queue size: <span className="text-sky-300 font-bold">int size = q.size()</span>
        </div>
      </div>
    );
  }

  // 15. DFS Path Traversal
  if (patternId === "dfs-traversal") {
    return (
      <div className="w-full h-40 rounded-2xl bg-slate-900 border border-slate-800 p-4 flex flex-col justify-between relative overflow-hidden font-mono text-xs text-white">
        <div className="flex items-center justify-between text-[10px] text-emerald-400 font-bold uppercase tracking-wider">
          <span>Deep Path Recursion</span>
          <span className="text-blue-400">Backtracking to Sibling</span>
        </div>
        <div className="flex items-center justify-center gap-2 py-2 text-xs font-bold">
          <span className="px-2.5 py-1 rounded bg-slate-800 text-slate-400">Root</span>
          <span className="text-slate-600">➔</span>
          <span className="px-2.5 py-1 rounded bg-emerald-500/30 border border-emerald-400 text-emerald-300">Left Node</span>
          <span className="text-slate-600">➔</span>
          <span className="px-2.5 py-1 rounded bg-emerald-500/40 border border-emerald-400 text-emerald-200 ring-2 ring-emerald-400 animate-pulse">Deep Leaf</span>
        </div>
        <div className="text-[11px] text-center text-slate-400 font-sans">
          Reach leaf node ➔ <span className="text-emerald-300 font-bold">Backtrack up stack</span>
        </div>
      </div>
    );
  }

  // 16. Union-Find DSU (ACCURATE BEFORE VS AFTER COMPRESSION)
  if (patternId === "dsu-pattern") {
    return (
      <div className="w-full h-40 rounded-2xl bg-slate-900 border border-slate-800 p-4 flex flex-col justify-between relative overflow-hidden font-mono text-xs text-white">
        <div className="flex items-center justify-between text-[10px] text-blue-400 font-bold uppercase tracking-wider">
          <span>DSU Path Compression</span>
          <span className="text-emerald-400">parent[x] = find(parent[x])</span>
        </div>
        <div className="flex items-center justify-center gap-3 py-1 text-xs">
          <div className="flex flex-col items-center">
            <span className="text-[9px] text-slate-500 font-bold mb-1">BEFORE (Height = 3)</span>
            <div className="flex items-center gap-1 font-bold text-[10px]">
              <span className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-400">X</span>
              <span className="text-slate-600">➔</span>
              <span className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-400">B</span>
              <span className="text-slate-600">➔</span>
              <span className="px-1.5 py-0.5 rounded bg-blue-500/20 border border-blue-500 text-blue-300">Root</span>
            </div>
          </div>
          <span className="text-emerald-400 font-bold text-sm">➔</span>
          <div className="flex flex-col items-center">
            <span className="text-[9px] text-emerald-400 font-bold mb-1">AFTER COMPRESSION</span>
            <div className="flex items-center gap-1 font-bold text-[10px]">
              <span className="px-1.5 py-0.5 rounded bg-emerald-500/30 border border-emerald-400 text-emerald-200 ring-2 ring-emerald-400/50 animate-pulse">X</span>
              <span className="text-emerald-400 font-bold">➔</span>
              <span className="px-1.5 py-0.5 rounded bg-blue-500/30 border border-blue-400 text-blue-200 font-bold">Root</span>
            </div>
          </div>
        </div>
        <div className="text-[11px] text-center text-slate-400 font-sans">
          Bypasses intermediate node B ➔ <span className="text-emerald-300 font-bold">Tree height compressed to 1 (O(α(N)))</span>
        </div>
      </div>
    );
  }

  // 17. 0/1 Knapsack DP
  if (patternId === "knapsack-dp") {
    return (
      <div className="w-full h-40 rounded-2xl bg-slate-900 border border-slate-800 p-4 flex flex-col justify-between relative overflow-hidden font-mono text-xs text-white">
        <div className="flex items-center justify-between text-[10px] text-indigo-400 font-bold uppercase tracking-wider">
          <span>2D DP Recurrence Grid</span>
          <span className="text-emerald-400">max(Exclude, Include)</span>
        </div>
        <div className="grid grid-cols-4 gap-1.5 py-1 text-center font-bold text-[10px]">
          <div className="p-1 rounded bg-slate-800 text-slate-500">dp[i-1][w]</div>
          <div className="p-1 rounded bg-indigo-500/40 border border-indigo-400 text-indigo-200 ring-2 ring-indigo-400 animate-pulse">Exclude Cell</div>
          <div className="p-1 rounded bg-slate-800 text-slate-500">val + wt</div>
          <div className="p-1 rounded bg-emerald-500/30 border border-emerald-400 text-emerald-200">Include Cell</div>
        </div>
        <div className="text-[11px] text-center text-slate-400 font-sans">
          Reverse inner loop for 1D space ➔ <span className="text-indigo-300 font-bold">dp[w] = max(dp[w], val + dp[w - wt])</span>
        </div>
      </div>
    );
  }

  // 18. String DP LCS
  if (patternId === "lcs-string-dp") {
    return (
      <div className="w-full h-40 rounded-2xl bg-slate-900 border border-slate-800 p-4 flex flex-col justify-between relative overflow-hidden font-mono text-xs text-white">
        <div className="flex items-center justify-between text-[10px] text-teal-400 font-bold uppercase tracking-wider">
          <span>String Matching Matrix</span>
          <span className="text-emerald-400">s1[i] == s2[j]</span>
        </div>
        <div className="flex items-center justify-center gap-3 py-2 text-xs font-bold">
          <div className="px-3 py-1.5 rounded bg-slate-800 border border-slate-700 text-slate-300">s1[i]: 'A'</div>
          <span className="text-teal-300 font-bold animate-pulse">==</span>
          <div className="px-3 py-1.5 rounded bg-slate-800 border border-slate-700 text-slate-300">s2[j]: 'A'</div>
          <span className="text-slate-600">➔</span>
          <div className="px-3 py-1.5 rounded bg-teal-500/30 border border-teal-400 text-teal-200">dp[i-1][j-1] + 1</div>
        </div>
        <div className="text-[11px] text-center text-slate-400 font-sans">
          Match found ➔ <span className="text-teal-300 font-bold">Diagonal increment + 1</span>
        </div>
      </div>
    );
  }

  // 19. Prefix Sum HashMap
  if (patternId === "prefix-hashmap") {
    return (
      <div className="w-full h-40 rounded-2xl bg-slate-900 border border-slate-800 p-4 flex flex-col justify-between relative overflow-hidden font-mono text-xs text-white">
        <div className="flex items-center justify-between text-[10px] text-amber-400 font-bold uppercase tracking-wider">
          <span>Prefix Lookup Map</span>
          <span className="text-emerald-400">Target K = 7</span>
        </div>
        <div className="flex items-center justify-center gap-3 py-2 text-xs font-bold">
          <div className="px-3 py-1.5 rounded bg-slate-800 border border-slate-700 text-slate-300">Prefix Sum S = 12</div>
          <span className="text-slate-600">➔</span>
          <div className="px-3 py-1.5 rounded bg-amber-500/30 border border-amber-400 text-amber-200 ring-2 ring-amber-400/50 animate-pulse">Map Check (12 - 7 = 5)</div>
        </div>
        <div className="text-[11px] text-center text-slate-400 font-sans">
          Map contains 5 ➔ <span className="text-amber-300 font-bold">Subarray summing to 7 found!</span>
        </div>
      </div>
    );
  }

  // 20. Trie Prefix Search
  if (patternId === "trie-prefix-search") {
    return (
      <div className="w-full h-40 rounded-2xl bg-slate-900 border border-slate-800 p-4 flex flex-col justify-between relative overflow-hidden font-mono text-xs text-white">
        <div className="flex items-center justify-between text-[10px] text-emerald-400 font-bold uppercase tracking-wider">
          <span>Prefix Character Tree</span>
          <span className="text-blue-400">O(L) Word Lookup</span>
        </div>
        <div className="flex items-center justify-center gap-2 py-2 text-xs font-bold">
          <span className="w-7 h-7 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400">R</span>
          <span className="text-slate-600">➔</span>
          <span className="w-7 h-7 rounded-full bg-blue-500/20 border border-blue-400 flex items-center justify-center text-blue-300 font-bold">'c'</span>
          <span className="text-slate-600">➔</span>
          <span className="w-7 h-7 rounded-full bg-blue-500/20 border border-blue-400 flex items-center justify-center text-blue-300 font-bold">'a'</span>
          <span className="text-slate-600">➔</span>
          <span className="w-7 h-7 rounded-full bg-emerald-500/40 border border-emerald-400 flex items-center justify-center text-emerald-200 font-bold ring-2 ring-emerald-400 animate-pulse">'t'</span>
        </div>
        <div className="text-[11px] text-center text-slate-400 font-sans">
          Reached terminal char 't': <span className="text-emerald-300 font-bold">isWord = true ("cat")</span>
        </div>
      </div>
    );
  }

  return null;
};

// ============================================================================
// COMPREHENSIVE PATTERN RECOGNITION DATASET (20 PATTERNS)
// ============================================================================
const PATTERN_MEMORY_CARDS = [
  {
    id: "two-pointers",
    name: "1. Two Pointers Pattern",
    trigger: "Sorted Array / Pair Sum / Palindrome Check / Subarray Comparison",
    mnemonic: "LEFT & RIGHT CONVERGE",
    explanation: "Initialize left = 0 and right = arr.length - 1. Compare arr[left] + arr[right] against target. If sum is too small, increment left++; if too large, decrement right--.",
    schematicText: `[ Array: 1 , 3 , 5 , 8 , 11 , 15 ]
  ▲                     ▲
  │                     │
Pointer Left        Pointer Right (Converging towards target sum)`,
    codeSnippet: `int left = 0, right = arr.length - 1;
while (left < right) {
    int sum = arr[left] + arr[right];
    if (sum == target) return new int[]{left, right};
    else if (sum < target) left++;
    else right--;
}`
  },
  {
    id: "sliding-window",
    name: "2. Sliding Window Pattern (Fixed & Variable)",
    trigger: "Contiguous Subarray / Substring / Min-Max Sum of K elements",
    mnemonic: "EXPAND RIGHT, SHRINK LEFT",
    explanation: "Maintain a dynamic window [L, R]. Expand right pointer R to include elements. When window condition is violated (or exceeds size K), shrink left pointer L while updating local optimal result.",
    schematicText: `Index:   0   1   2   3   4   5
Array: [ 2 , 1 , 5 , 1 , 3 , 2 ]
       └─── Window (L=2, R=4) ───┘  -> Current Sum = 9`,
    codeSnippet: `int left = 0, windowSum = 0, maxLen = 0;
for (int right = 0; right < nums.length; right++) {
    windowSum += nums[right];
    while (windowSum > K) {
        windowSum -= nums[left++];
    }
    maxLen = Math.max(maxLen, right - left + 1);
}`
  },
  {
    id: "fast-slow",
    name: "3. Fast & Slow Pointers (Floyd's Cycle)",
    trigger: "Linked List Cycle / Middle Element / Happy Number",
    mnemonic: "TORTOISE (1 Step) & HARE (2 Steps)",
    explanation: "Move slow 1 node per iteration and fast 2 nodes per iteration. If a cycle exists, fast will overlap with slow inside the loop within O(N) time.",
    schematicText: `[Node 1] ➔ [Node 2] ➔ [Node 3] ➔ [Node 4]
              ▲                      │
              └──────────────────────┘  (Fast overlaps Slow in loop)`,
    codeSnippet: `ListNode slow = head, fast = head;
while (fast != null && fast.next != null) {
    slow = slow.next;
    fast = fast.next.next;
    if (slow == fast) return true; // Cycle detected!
}
return false;`
  },
  {
    id: "merge-intervals",
    name: "4. Merge Intervals Pattern",
    trigger: "Overlapping Intervals / Meeting Rooms / Range Merging",
    mnemonic: "SORT BY START, MERGE IF OVERLAP",
    explanation: "Sort intervals by start time. Iterate through intervals: if curr.start <= prev.end, they overlap → update prev.end = max(prev.end, curr.end). Otherwise, append curr as new interval.",
    schematicText: `Interval A: [ 1 -------- 4 ]
Interval B:      [ 3 -------- 6 ]
Merged:     [ 1 ------------- 6 ]  (prev.end >= curr.start)`,
    codeSnippet: `Arrays.sort(intervals, (a, b) -> Integer.compare(a[0], b[0]));
List<int[]> merged = new ArrayList<>();
for (int[] interval : intervals) {
    if (merged.isEmpty() || merged.get(merged.size()-1)[1] < interval[0]) {
        merged.add(interval);
    } else {
        merged.get(merged.size()-1)[1] = Math.max(merged.get(merged.size()-1)[1], interval[1]);
    }
}`
  },
  {
    id: "linked-list-reversal",
    name: "5. In-Place Linked List Reversal",
    trigger: "Reverse Linked List / Reverse Sub-list / K-Group Reversal",
    mnemonic: "PREV, CURR, NEXT SWAP TRICK",
    explanation: "Use 3 pointers (prev, curr, next). Save next = curr.next, flip node link curr.next = prev, then shift prev = curr and curr = next.",
    schematicText: `Initial:  Prev(null)   Curr(1) ➔ Next(2) ➔ (3)
Flipped:  Prev(null)  Curr(1)   Next(2) ➔ (3)`,
    codeSnippet: `ListNode prev = null, curr = head;
while (curr != null) {
    ListNode nextTemp = curr.next;
    curr.next = prev;
    prev = curr;
    curr = nextTemp;
}
return prev;`
  },
  {
    id: "monotonic-stack",
    name: "6. Monotonic Stack Pattern",
    trigger: "Next Greater Element / Daily Temperatures / Histogram Area",
    mnemonic: "POP INVALID BEFORE PUSH",
    explanation: "Maintain stack elements in strictly monotonic order. To keep decreasing order, pop all elements strictly smaller than current number before pushing current element.",
    schematicText: `Stack: [ 9 , 7 , 4 ]  <-- Next Element = 6
Pop 4 (since 4 < 6) ➔ Push 6 ➔ Stack: [ 9 , 7 , 6 ]`,
    codeSnippet: `Stack<Integer> stack = new Stack<>();
for (int i = 0; i < nums.length; i++) {
    while (!stack.isEmpty() && nums[stack.peek()] < nums[i]) {
        int idx = stack.pop();
        result[idx] = nums[i]; // Next greater element found!
    }
    stack.push(i);
}`
  },
  {
    id: "monotonic-queue",
    name: "7. Monotonic Queue Pattern",
    trigger: "Sliding Window Maximum / Minimum in All Subarrays of Size K",
    mnemonic: "DEQUE FRONT IS WINDOW OPTIMAL",
    explanation: "Maintain a Deque storing candidate indices in decreasing order. Remove elements out of window from front; pop smaller elements from back before pushing current index.",
    schematicText: `Deque (Indices): [ 2 , 3 ] (Front has max element index in current window)
Pop from back if nums[back] <= nums[i], then push i`,
    codeSnippet: `Deque<Integer> deque = new ArrayDeque<>();
for (int i = 0; i < nums.length; i++) {
    if (!deque.isEmpty() && deque.peekFirst() < i - k + 1) deque.pollFirst();
    while (!deque.isEmpty() && nums[deque.peekLast()] <= nums[i]) deque.pollLast();
    deque.offerLast(i);
    if (i >= k - 1) result[i - k + 1] = nums[deque.peekFirst()];
}`
  },
  {
    id: "top-k-elements",
    name: "8. Top-K Elements Pattern",
    trigger: "K Largest Elements / K Frequent Items / Top K Frequent",
    mnemonic: "K LARGEST -> MIN-HEAP OF SIZE K",
    explanation: "To find K largest elements, maintain a Min-Heap of capacity K. Offer element; if size exceeds K, poll root. The root always holds the threshold min for top K.",
    schematicText: `Min-Heap (Size K=3): [ 5 , 8 , 12 ]
New Element 10 > Root 5 ➔ Poll 5, Offer 10 ➔ Heap: [ 8 , 10 , 12 ]`,
    codeSnippet: `PriorityQueue<Integer> minHeap = new PriorityQueue<>();
for (int num : nums) {
    minHeap.offer(num);
    if (minHeap.size() > k) {
        minHeap.poll();
    }
}`
  },
  {
    id: "two-heaps",
    name: "9. Two Heaps Pattern (Find Median)",
    trigger: "Continuous Stream Median / Balanced Partitioning",
    mnemonic: "MAX-HEAP (LOWER HALF) + MIN-HEAP (UPPER HALF)",
    explanation: "Maintain two heaps: Max-Heap stores smaller half of numbers, Min-Heap stores larger half. Keep size difference <= 1. Median is top of larger heap or average of both tops.",
    schematicText: `Lower Half (Max-Heap): [ 3 , 1 ]   |   Upper Half (Min-Heap): [ 7 , 9 ]
Median = (MaxHeap.top() + MinHeap.top()) / 2 = (3 + 7) / 2 = 5`,
    codeSnippet: `PriorityQueue<Integer> maxHeap = new PriorityQueue<>((a,b)->b-a);
PriorityQueue<Integer> minHeap = new PriorityQueue<>();
public void addNum(int num) {
    maxHeap.offer(num);
    minHeap.offer(maxHeap.poll());
    if (minHeap.size() > maxHeap.size()) maxHeap.offer(minHeap.poll());
}`
  },
  {
    id: "backtracking",
    name: "10. Subsets & Backtracking Pattern",
    trigger: "Permutations / Combinations / N-Queens / Sudoku Solver",
    mnemonic: "CHOOSE -> RECURSE -> UNCHOOSE",
    explanation: "State-space tree exploration. Add choice to path, make recursive call to explore down tree, then undo choice (path.remove(path.size()-1)) to backtrack up.",
    schematicText: `Root ()
 ├── Choose 1 ➔ Path (1) ➔ Recurse ➔ Unchoose 1
 └── Choose 2 ➔ Path (2) ➔ Recurse ➔ Unchoose 2`,
    codeSnippet: `void backtrack(List<List<Integer>> res, List<Integer> path, int[] nums, int start) {
    res.add(new ArrayList<>(path));
    for (int i = start; i < nums.length; i++) {
        path.add(nums[i]);        // 1. Choose
        backtrack(res, path, nums, i + 1); // 2. Recurse
        path.remove(path.size() - 1);      // 3. Unchoose
    }
}`
  },
  {
    id: "binary-search",
    name: "11. Modified Binary Search",
    trigger: "Rotated Sorted Array / Peak Index / Search Matrix",
    mnemonic: "SHRINK SEARCH SPACE BY HALF",
    explanation: "Calculate mid = low + (high - low) / 2. Determine which half is monotonically sorted to eliminate half the search range in O(log N) time.",
    schematicText: `Range: [ Low ......... Mid ......... High ]
Check condition ➔ Discard half search space ➔ O(log N)`,
    codeSnippet: `int low = 0, high = nums.length - 1;
while (low <= high) {
    int mid = low + (high - low) / 2;
    if (nums[mid] == target) return mid;
    if (nums[low] <= nums[mid]) { // Left half sorted
        if (nums[low] <= target && target < nums[mid]) high = mid - 1;
        else low = mid + 1;
    } else { // Right half sorted
        if (nums[mid] < target && target <= nums[high]) low = mid + 1;
        else high = mid - 1;
    }
}`
  },
  {
    id: "search-space-reduction",
    name: "12. Binary Search on Answer / Search Space",
    trigger: "Koko Eating Bananas / Split Array Largest Sum / Capacity to Ship Packages",
    mnemonic: "BINARY SEARCH OVER RANGE [MIN_POSSIBLE, MAX_POSSIBLE]",
    explanation: "When searching for optimal value X in a monotonic feasibility function isPossible(X), perform binary search on range [minVal, maxVal]. Shrink range based on boolean result.",
    schematicText: `Speed Range: [ 1 ..................... MaxSpeed ]
isPossible(Mid) == true ➔ Save Mid, try smaller speed: High = Mid - 1`,
    codeSnippet: `int low = 1, high = maxCapacity, ans = high;
while (low <= high) {
    int mid = low + (high - low) / 2;
    if (isFeasible(mid, nums, threshold)) {
        ans = mid;
        high = mid - 1; // Try finding smaller valid answer
    } else {
        low = mid + 1;  // Increase capacity
    }
}`
  },
  {
    id: "topological-sort",
    name: "13. Topological Sort Pattern (Kahn's BFS & DFS)",
    trigger: "Course Schedule / Build Dependencies / Task Ordering",
    mnemonic: "IN-DEGREE 0 QUEUE",
    explanation: "Compute in-degrees for all graph nodes. Push all nodes with In-Degree 0 into Queue. Pop queue, append node to order, decrement in-degree of neighbors.",
    schematicText: `Node A (InDegree=0) ➔ Enqueue ➔ Process A ➔ Decrement B's InDegree
If B's InDegree becomes 0 ➔ Enqueue B`,
    codeSnippet: `Queue<Integer> q = new LinkedList<>();
for (int i = 0; i < N; i++) if (inDegree[i] == 0) q.offer(i);
while (!q.isEmpty()) {
    int curr = q.poll();
    order.add(curr);
    for (int neighbor : graph.get(curr)) {
        if (--inDegree[neighbor] == 0) q.offer(neighbor);
    }
}`
  },
  {
    id: "bfs-traversal",
    name: "14. BFS / Level-Order Traversal Pattern",
    trigger: "Tree Level-by-Level / Shortest Path Grid / Minimum Depth",
    mnemonic: "QUEUE SIZE ITERATION PER LEVEL",
    explanation: "Use Queue FIFO structure. Capture int levelSize = queue.size() at start of level loop to process all nodes of current depth together before advancing to next level.",
    schematicText: `Level 0: [ Root ]
Level 1: [ LeftChild, RightChild ]
Level 2: [ Grandchildren... ]`,
    codeSnippet: `Queue<TreeNode> q = new LinkedList<>();
q.offer(root);
while (!q.isEmpty()) {
    int size = q.size();
    for (int i = 0; i < size; i++) {
        TreeNode curr = q.poll();
        if (curr.left != null) q.offer(curr.left);
        if (curr.right != null) q.offer(curr.right);
    }
}`
  },
  {
    id: "dfs-traversal",
    name: "15. DFS / Connected Components Pattern",
    trigger: "Number of Islands / Path Existence / Tree Depth / Flood Fill",
    mnemonic: "RECURSION STACK + VISITED MATRIX",
    explanation: "Explore deep along each branch before backtracking. Use a visited matrix or modify grid in-place (grid[r][c] = '0') to prevent infinite recursion loops.",
    schematicText: `Explore (r, c) ➔ Mark Visited ➔ Recurse (r+1, c), (r-1, c), (r, c+1), (r, c-1)`,
    codeSnippet: `void dfs(char[][] grid, int r, int c) {
    if (r < 0 || r >= grid.length || c < 0 || c >= grid[0].length || grid[r][c] == '0') return;
    grid[r][c] = '0'; // Mark visited
    dfs(grid, r + 1, c);
    dfs(grid, r - 1, c);
    dfs(grid, r, c + 1);
    dfs(grid, r, c - 1);
}`
  },
  {
    id: "dsu-pattern",
    name: "16. Union-Find / DSU Pattern",
    trigger: "Connected Components / Redundant Connection / Dynamic Connectivity",
    mnemonic: "FIND WITH PATH COMPRESSION, UNION BY RANK",
    explanation: "Find root parent of elements. Path compression executes `parent[i] = find(parent[i])`, pointing visited nodes directly to root. If find(u) == find(v), adding edge (u, v) creates a cycle!",
    schematicText: `Before Compression:  Node X ➔ Node B ➔ Node A ➔ Root (Height = 3)
After Compression:   Node X ➔ Root , Node B ➔ Root (Height = 1)`,
    codeSnippet: `class DSU {
    int[] parent;
    public DSU(int n) {
        parent = new int[n];
        for (int i = 0; i < n; i++) parent[i] = i;
    }
    public int find(int i) {
        if (parent[i] == i) return i;
        return parent[i] = find(parent[i]); // Path compression flattens tree to root!
    }
    public boolean union(int i, int j) {
        int rootI = find(i), rootJ = find(j);
        if (rootI != rootJ) { parent[rootI] = rootJ; return true; }
        return false; // Cycle detected!
    }
}`
  },
  {
    id: "knapsack-dp",
    name: "17. 0/1 Knapsack Dynamic Programming Pattern",
    trigger: "Subset Sum / Partition Equal Subset Sum / Target Sum",
    mnemonic: "INCLUDE VS EXCLUDE DECISION GRID",
    explanation: "At each item i and weight w, decide whether to exclude dp[i-1][w] or include val[i-1] + dp[i-1][w - wt[i-1]]. Space optimize to 1D by running inner loop backwards.",
    schematicText: `Item i, Weight w:
  Option 1: Exclude -> dp[w]
  Option 2: Include -> val + dp[w - weight]`,
    codeSnippet: `int[] dp = new int[W + 1];
for (int i = 0; i < items.length; i++) {
    for (int w = W; w >= weight[i]; w--) { // Reverse order for 0/1 knapsack
        dp[w] = Math.max(dp[w], val[i] + dp[w - weight[i]]);
    }
}`
  },
  {
    id: "lcs-string-dp",
    name: "18. String DP / LCS Pattern",
    trigger: "Longest Common Subsequence / Edit Distance / Longest Palindromic Substring",
    mnemonic: "2D GRID MATCHING CHARACTERS",
    explanation: "Compare characters s1[i-1] and s2[j-1]. If equal, dp[i][j] = 1 + dp[i-1][j-1]. If different, dp[i][j] = max(dp[i-1][j], dp[i][j-1]).",
    schematicText: `s1[i] == s2[j] ➔ Diagonal + 1  [dp[i-1][j-1] + 1]
s1[i] != s2[j] ➔ Max(Up, Left) [max(dp[i-1][j], dp[i][j-1])]`,
    codeSnippet: `int[][] dp = new int[m + 1][n + 1];
for (int i = 1; i <= m; i++) {
    for (int j = 1; j <= n; j++) {
        if (s1.charAt(i - 1) == s2.charAt(j - 1)) {
            dp[i][j] = 1 + dp[i - 1][j - 1];
        } else {
            dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
        }
    }
}`
  },
  {
    id: "prefix-hashmap",
    name: "19. Prefix Sum + HashMap Pattern",
    trigger: "Subarray Sum Equals K / Continuous Subarray Sum / Longest Subarray with Sum K",
    mnemonic: "MAP STORES (PREFIX_SUM -> FIRST_OCCURRENCE_INDEX)",
    explanation: "Compute running prefix sum. Check if map.containsKey(runningSum - K). If true, a contiguous subarray summing to K exists between map.get(runningSum - K) + 1 and current index.",
    schematicText: `Target = K
Current Prefix Sum = S
Looking for previous Prefix Sum = (S - K) in HashMap`,
    codeSnippet: `Map<Integer, Integer> map = new HashMap<>();
map.put(0, -1);
int sum = 0, count = 0;
for (int i = 0; i < nums.length; i++) {
    sum += nums[i];
    if (map.containsKey(sum - k)) {
        count += map.get(sum - k);
    }
    map.put(sum, map.getOrDefault(sum, 0) + 1);
}`
  },
  {
    id: "trie-prefix-search",
    name: "20. Trie Prefix Search Pattern",
    trigger: "Autocomplete / Word Search II / Implement Trie / Replace Words",
    mnemonic: "26-CHILD POINTER ARRAY PER CHARACTER NODE",
    explanation: "Store words character-by-character along tree path. Each TrieNode contains TrieNode[] children = new TrieNode[26] and boolean isWord flag.",
    schematicText: `Root
 └── 'c' ➔ Node
            └── 'a' ➔ Node
                       └── 't' (isWord=true) ➔ "cat"`,
    codeSnippet: `class TrieNode {
    TrieNode[] children = new TrieNode[26];
    boolean isWord = false;
}
public void insert(String word) {
    TrieNode curr = root;
    for (char c : word.toCharArray()) {
        int idx = c - 'a';
        if (curr.children[idx] == null) curr.children[idx] = new TrieNode();
        curr = curr.children[idx];
    }
    curr.isWord = true;
}`
  }
];

// ============================================================================
// MAIN COMPONENT RENDERER
// ============================================================================
export const DsaRevision = ({ onBackToRevision }) => {
  const [activeSection, setActiveSection] = useState("theory"); // "theory" | "patterns"
  const [selectedTheoryCat, setSelectedTheoryCat] = useState("arrays");
  const [patternSearch, setPatternSearch] = useState("");

  const activeCategoryObj = THEORY_CATEGORIES.find((c) => c.id === selectedTheoryCat) || THEORY_CATEGORIES[0];
  const IconComponent = activeCategoryObj.icon;

  const filteredPatterns = PATTERN_MEMORY_CARDS.filter((p) => {
    const q = patternSearch.toLowerCase().trim();
    return (
      p.name.toLowerCase().includes(q) ||
      p.trigger.toLowerCase().includes(q) ||
      p.mnemonic.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-6 sm:space-y-8 font-sans max-w-7xl mx-auto pb-16">
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 dark:bg-zinc-950 dark:border-zinc-800 space-y-4">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-800 dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-200 text-xs font-mono font-bold uppercase tracking-wider">
            <Brain className="w-3.5 h-3.5" />
            <span>DSA Master Study &amp; Pattern Memory Suite</span>
          </div>

          {onBackToRevision && (
            <button
              onClick={onBackToRevision}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-100 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 text-xs font-bold text-slate-700 dark:text-zinc-300 hover:bg-slate-200 dark:hover:bg-zinc-800 transition cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Decks</span>
            </button>
          )}
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Data Structures &amp; Algorithms Academic Reference
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-400 max-w-3xl leading-relaxed">
            In-depth technical core theory for all major data structures alongside an interactive pattern recognition guide featuring custom animated visual blueprints for all 20 essential coding patterns.
          </p>
        </div>

        {/* Section Switcher Tabs */}
        <div className="pt-2 flex items-center gap-2 overflow-x-auto">
          <button
            onClick={() => setActiveSection("theory")}
            className={`px-5 py-2.5 rounded-2xl text-xs font-bold transition flex items-center gap-2 cursor-pointer shrink-0 ${
              activeSection === "theory"
                ? "bg-slate-900 text-white dark:bg-white dark:text-black shadow-sm"
                : "bg-slate-100 text-slate-600 hover:text-slate-900 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:text-white"
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>1. Core Theoretical Concepts</span>
          </button>

          <button
            onClick={() => setActiveSection("patterns")}
            className={`px-5 py-2.5 rounded-2xl text-xs font-bold transition flex items-center gap-2 cursor-pointer shrink-0 ${
              activeSection === "patterns"
                ? "bg-slate-900 text-white dark:bg-white dark:text-black shadow-sm"
                : "bg-slate-100 text-slate-600 hover:text-slate-900 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:text-white"
            }`}
          >
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>2. Pattern Recognition Guide &amp; Memory Mnemonics (20 Patterns)</span>
          </button>
        </div>
      </div>

      {/* SECTION 1: CORE THEORETICAL CONCEPTS */}
      {activeSection === "theory" && (
        <div className="space-y-6">
          {/* Sub-Category Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
            {THEORY_CATEGORIES.map((cat) => {
              const CatIcon = cat.icon;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedTheoryCat(cat.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition flex items-center gap-2 shrink-0 cursor-pointer ${
                    selectedTheoryCat === cat.id
                      ? "bg-slate-900 text-white dark:bg-white dark:text-black shadow-sm"
                      : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 dark:bg-zinc-950 dark:border-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-900"
                  }`}
                >
                  <CatIcon className="w-3.5 h-3.5" />
                  <span>{cat.title}</span>
                </button>
              );
            })}
          </div>

          {/* Active Category Description Header */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200 dark:bg-zinc-950 dark:border-zinc-800 space-y-2">
            <div className="flex items-center gap-2">
              <IconComponent className="w-5 h-5 text-slate-900 dark:text-white" />
              <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
                {activeCategoryObj.title}
              </h2>
            </div>
            <p className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed">
              {activeCategoryObj.desc}
            </p>
          </div>

          {/* Concepts Grid */}
          <div className="grid grid-cols-1 gap-6">
            {activeCategoryObj.concepts.map((concept, idx) => (
              <div
                key={idx}
                className="p-6 rounded-3xl bg-white border border-slate-200 dark:bg-zinc-950 dark:border-zinc-800 space-y-4 shadow-sm"
              >
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-zinc-900 pb-3 flex-wrap gap-2">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <Zap className="w-4 h-4 text-blue-500" />
                    <span>{concept.name}</span>
                  </h3>

                  {concept.complexity && (
                    <div className="flex items-center gap-2 font-mono text-[11px]">
                      {Object.entries(concept.complexity).map(([key, val]) => (
                        <span
                          key={key}
                          className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 dark:bg-zinc-900 dark:text-zinc-300 font-bold border border-slate-200 dark:border-zinc-800"
                        >
                          {key}: {val}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <p className="text-xs sm:text-sm text-slate-700 dark:text-zinc-300 leading-relaxed font-sans font-medium">
                  {concept.summary}
                </p>

                <div className="space-y-2 bg-slate-50 dark:bg-zinc-900/60 p-4 rounded-2xl border border-slate-100 dark:border-zinc-800">
                  <span className="text-[11px] font-mono font-bold uppercase text-slate-500 dark:text-zinc-400">
                    Core Technical Mechanics:
                  </span>
                  <ul className="space-y-1.5 text-xs text-slate-700 dark:text-zinc-300">
                    {concept.details.map((detail, dIdx) => (
                      <li key={dIdx} className="flex items-start gap-2">
                        <span className="text-slate-400 shrink-0 mt-0.5">•</span>
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs font-mono text-amber-700 dark:text-amber-300 flex items-center gap-2">
                  <Lightbulb className="w-4 h-4 shrink-0 text-amber-500" />
                  <span><strong>Interview Rule of Thumb:</strong> {concept.keyTakeaway}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION 2: PATTERN RECOGNITION GUIDE & MEMORY MNEMONICS */}
      {activeSection === "patterns" && (
        <div className="space-y-6">
          {/* Pattern Search Bar */}
          <div className="p-4 rounded-2xl bg-white border border-slate-200 dark:bg-zinc-950 dark:border-zinc-800 flex items-center gap-3">
            <Search className="w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search pattern name, trigger phrase, or mnemonic..."
              value={patternSearch}
              onChange={(e) => setPatternSearch(e.target.value)}
              className="w-full bg-transparent text-xs text-slate-900 dark:text-white focus:outline-none"
            />
          </div>

          {/* Pattern Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredPatterns.map((pattern) => (
              <div
                key={pattern.id}
                className="p-6 rounded-3xl bg-white border border-slate-200 dark:bg-zinc-950 dark:border-zinc-800 space-y-4 flex flex-col justify-between shadow-sm hover:border-slate-400 dark:hover:border-zinc-700 transition"
              >
                <div className="space-y-4">
                  {/* Pattern Header */}
                  <div className="flex items-center justify-between border-b border-slate-100 dark:border-zinc-900 pb-3">
                    <div>
                      <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                        {pattern.name}
                      </h3>
                      <span className="text-[10px] font-mono text-blue-600 dark:text-blue-400 font-bold uppercase tracking-wider">
                        Mnemonic: {pattern.mnemonic}
                      </span>
                    </div>
                  </div>

                  {/* Trigger Keywords */}
                  <div className="p-3 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-xs">
                    <span className="text-[10px] font-mono font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider block">
                      Target Recognition Signals (Trigger):
                    </span>
                    <p className="text-slate-800 dark:text-zinc-200 font-bold font-sans mt-0.5">
                      {pattern.trigger}
                    </p>
                  </div>

                  {/* Custom Animated SVG Blueprint */}
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono font-bold uppercase text-slate-500 flex items-center gap-1">
                      <Activity className="w-3 h-3 text-blue-500" />
                      <span>Custom Animated Blueprint:</span>
                    </span>
                    <PatternAnimatedSvg patternId={pattern.id} />
                  </div>

                  {/* ASCII Execution Schematic */}
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono font-bold uppercase text-slate-500">
                      Execution Trace Schematic:
                    </span>
                    <pre className="p-3 rounded-xl bg-slate-900 text-blue-300 font-mono text-[11px] overflow-x-auto leading-relaxed border border-slate-800">
                      <code>{pattern.schematicText}</code>
                    </pre>
                  </div>

                  {/* Logic Explanation */}
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono font-bold uppercase text-slate-500">
                      Core Pattern Strategy:
                    </span>
                    <p className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed font-sans">
                      {pattern.explanation}
                    </p>
                  </div>

                  {/* Java Implementation Template */}
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono font-bold uppercase text-slate-500">
                      Production Implementation Template:
                    </span>
                    <pre className="p-3 rounded-xl bg-slate-900 text-emerald-400 font-mono text-[11px] overflow-x-auto leading-relaxed border border-slate-800">
                      <code>{pattern.codeSnippet}</code>
                    </pre>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DsaRevision;
