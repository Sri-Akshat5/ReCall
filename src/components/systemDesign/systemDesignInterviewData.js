// ============================================================================
// SYSTEM DESIGN & DISTRIBUTED SYSTEMS INTERVIEW QUESTION BANK (55 MASTER QUESTIONS)
// WITH PRODUCTION EXAMPLES & DIRECT HLD/LLD BLUEPRINT LINKS
// ============================================================================

export const SYSTEM_DESIGN_QUESTIONS = [
  // --------------------------------------------------------------------------
  // 1. CORE ARCHITECTURAL PRINCIPLES & TRADE-OFFS (Q1 - Q8)
  // --------------------------------------------------------------------------
  {
    id: "sd-q1",
    question: "1. Explain the CAP Theorem and its real-world implications in distributed systems.",
    topic: "Core Architecture",
    level: "Basic",
    type: "Theory",
    summary: "In a distributed network partition (P), a system must trade off between Consistency (C) and Availability (A). You cannot achieve both simultaneously during network splits.",
    properAnswer: "The CAP Theorem states that any distributed data store can simultaneously provide at most two out of three guarantees: Consistency (all nodes see the exact same data at the same time), Availability (every non-failing node returns a response), and Partition Tolerance (the system operates despite network dropouts). Since network partitions (P) are unavoidable in distributed hardware, real-world systems must choose between CP (Consistency + Partition Tolerance, e.g., HBase, MongoDB) or AP (Availability + Partition Tolerance, e.g., Cassandra, DynamoDB).",
    realWorldExample: "During an undersea cable cut between AWS US-East and EU-West regions (Network Partition), an e-commerce checkout platform using CP (MongoDB) blocks payment writes in EU to prevent double-spending. Meanwhile, Instagram using AP (Cassandra) allows users in both regions to keep liking posts, syncing likes asynchronously once the cable is repaired.",
    relatedBlueprint: {
      id: "hld-3",
      title: "Design WhatsApp / Telegram (Cassandra AP Message Store)",
      path: "/system-design/hld-3",
      badge: "HLD Blueprint #3"
    },
    explanation: [
      "Consistency (C): Reads return the most recent write or an error. Implemented via synchronous replication or consensus protocols (Raft/Paxos).",
      "Availability (A): Every non-failing node returns a non-error response without guarantee of latest write. Implemented via asynchronous replication.",
      "Partition Tolerance (P): Mandatory requirement for distributed systems. If network cables drop between data centers, the system must handle the split."
    ],
    tableData: {
      headers: ["Dimension", "CP Systems (e.g., MongoDB, HBase)", "AP Systems (e.g., Cassandra, DynamoDB)"],
      rows: [
        ["Network Split Behavior", "Rejects reads/writes on partitioned nodes to prevent dirty reads", "Accepts reads/writes on all partitions; syncs asynchronously later"],
        ["Consistency Guarantee", "Strong Consistency (Linearizability)", "Eventual Consistency"],
        ["Primary Use Cases", "Financial transactions, inventory booking, payment gateways", "Social media feeds, chat presence, live view counters"]
      ]
    },
    interviewLines: [
      "Network partitions are inevitable; CAP forces a choice between serving stale data (AP) or throwing an error (CP) during a network split.",
      "Never say 'we pick CA'—in distributed systems, P is mandatory!"
    ],
    keywords: [{ word: "CAP Theorem" }, { word: "Consistency" }, { word: "Availability" }, { word: "Partition Tolerance" }]
  },

  {
    id: "sd-q2",
    question: "2. What is the PACELC Theorem, and how does it extend CAP?",
    topic: "Core Architecture",
    level: "Intermediate",
    type: "Theory",
    summary: "PACELC extends CAP: If there is a Partition (P), trade off Availability (A) vs Consistency (C); Else (E), trade off Latency (L) vs Consistency (C).",
    properAnswer: "PACELC (formulated by Daniel Abadi) addresses CAP's limitation of only describing behavior during rare network partitions. PACELC states: If there is a Partition (P), how does the system trade off Availability (A) vs Consistency (C); Else (E) when system operates normally, how does it trade off Latency (L) vs Consistency (C)? For example, Amazon DynamoDB is PA/EL (prioritizes availability during partitions and low latency during normal operation), whereas MongoDB is PC/EC (prioritizes consistency in both states).",
    realWorldExample: "In normal steady state (Else), DynamoDB returns sub-5ms writes by writing to a local memory buffer and replicating asynchronously (PA/EL). Google Spanner uses atomic GPS clocks to force synchronous cross-region consensus on every write, sacrificing latency to guarantee strict global serializability (PC/EC).",
    relatedBlueprint: {
      id: "hld-1",
      title: "Design TinyURL (Cassandra PA/EL Storage)",
      path: "/system-design/hld-1",
      badge: "HLD Blueprint #1"
    },
    explanation: [
      "Normal Operation Trade-off (EL vs EC): Even when no network split exists, maintaining strong consistency across replicas incurs network round-trip latency.",
      "PA/EL Example (Cassandra/DynamoDB): Chooses Availability during splits, and low Latency (async replication) during normal runs."
    ],
    interviewLines: [
      "PACELC captures the trade-offs of normal distributed operation (Latency vs Consistency) that the CAP theorem ignores.",
      "Systems like Cassandra are PA/EL; relational DBs with sync read-replicas are PC/EC."
    ],
    keywords: [{ word: "PACELC Theorem" }, { word: "Normal State Trade-offs" }, { word: "Latency vs Consistency" }]
  },

  {
    id: "sd-q3",
    question: "3. How does Consistent Hashing work, and why is it superior to Modulo Hashing?",
    topic: "Core Architecture",
    level: "Intermediate",
    type: "Internal Working",
    summary: "Consistent Hashing maps both servers and keys onto a 2^32 hash ring. Adding/removing a server remaps only K/N keys instead of re-hashing all keys.",
    properAnswer: "Standard Modulo Hashing (hash(key) % N) breaks completely when scaling: adding or removing a server changes N, causing ~100% of cached keys to remap to wrong servers, triggering catastrophic cache stampedes. Consistent Hashing maps both server nodes and data keys onto a virtual ring (0 to 2^32-1) using a uniform hash function (like MD5). A key is assigned to the first server encountered moving clockwise. When a server node is added or removed, only K/N keys (where K is total keys, N is server count) need to be reassigned.",
    realWorldExample: "In Discord's gateway routing, when 10 new WebSocket gateway servers are added to handle a surge of gamers during a tournament, Consistent Hashing ensures 90% of existing user WebSocket sessions stay pinned to their existing servers, preventing millions of simultaneous reconnect drops.",
    relatedBlueprint: {
      id: "hld-3",
      title: "Design WhatsApp / Telegram (Consistent Hashing WebSocket Gateway)",
      path: "/system-design/hld-3",
      badge: "HLD Blueprint #3"
    },
    explanation: [
      "Hash Ring Space: Both keys and server IP hashes are placed on a 360-degree ring [0, 2^32 - 1].",
      "Clockwise Node Lookup: To find a key's server, hash the key and traverse clockwise until hitting the first server node.",
      "Virtual Nodes (V-Nodes): Solves hot-spotting/non-uniform distribution by assigning multiple virtual points on the ring per physical server."
    ],
    tableData: {
      headers: ["Property", "Modulo Hashing (hash % N)", "Consistent Hashing"],
      rows: [
        ["Key Remapping on Node Change", "Remaps ~100% of keys (Catastrophic Cache Misses)", "Remaps only ~K/N keys (Minimal Cache Misses)"],
        ["Scalability", "Poor (Requires expensive full cache warming)", "Excellent (Linear scaling without cache collapse)"]
      ]
    },
    interviewLines: [
      "Consistent Hashing minimizes key remapping to K/N during cluster resizing, preserving cache hit ratios.",
      "Virtual Nodes (V-Nodes) prevent hot-spotting by evenly distributing physical server footprints across the hash ring."
    ],
    keywords: [{ word: "Consistent Hashing" }, { word: "Hash Ring" }, { word: "Virtual Nodes" }]
  },

  {
    id: "sd-q4",
    question: "4. What are Virtual Nodes (V-Nodes) in Consistent Hashing, and what problem do they solve?",
    topic: "Core Architecture",
    level: "Intermediate",
    type: "Internal Working",
    summary: "Virtual Nodes map a single physical server to multiple points on the hash ring to prevent data skew and hot-spotting.",
    properAnswer: "In basic Consistent Hashing, physical servers hashed onto the ring may be unevenly spaced, creating large ring segments where one server receives 70% of keys while others sit idle (Data Skew). Virtual Nodes solve this by creating multiple virtual entries (e.g. 100 to 250 V-Nodes per physical server) scattered across the ring. This spreads data randomly and uniformly across all physical nodes and allows hardware with higher capacity to host proportionally more V-Nodes.",
    realWorldExample: "In Apache Cassandra clusters, a powerful 64-core 256GB RAM bare-metal node is assigned 256 V-Nodes, while an older 16-core 64GB RAM node is assigned 64 V-Nodes. This balances data storage and read traffic proportional to physical hardware capacity.",
    relatedBlueprint: {
      id: "hld-5",
      title: "Design Uber / Lyft (Consistent Hashing Driver Location Ring)",
      path: "/system-design/hld-5",
      badge: "HLD Blueprint #5"
    },
    interviewLines: [
      "Virtual nodes eliminate hotspot data skew and ensure smooth load redistribution when nodes join or leave."
    ],
    keywords: [{ word: "Virtual Nodes" }, { word: "Data Skew" }, { word: "Load Balancing Ring" }]
  },

  {
    id: "sd-q5",
    question: "5. Compare Latency vs Throughput and explain how to optimize both.",
    topic: "Core Architecture",
    level: "Basic",
    type: "Theory",
    summary: "Latency is the time taken to complete a single operation (ms). Throughput is the number of operations processed per unit time (RPS/TPS).",
    properAnswer: "Latency is the time delay required to process a single request end-to-end (measured in milliseconds, e.g. p99 latency = 15ms). Throughput is the total volume of work completed by the system per unit time (measured in Requests Per Second - RPS). Optimizing for low latency often requires adding RAM caching and fast SSDs; optimizing for high throughput requires asynchronous processing, batching, and horizontal partitioning.",
    realWorldExample: "At payment processors like Stripe, API checkout endpoints optimize for ultra-low p99 latency (<20ms) using Redis caches. Meanwhile, log processing engines like Apache Kafka optimize for massive throughput (2 Million logs/sec) by batching 10,000 log events into single compressed disk writes.",
    relatedBlueprint: {
      id: "hld-2",
      title: "Design an API Rate Limiter (Low Latency <2ms Redis Evaluation)",
      path: "/system-design/hld-2",
      badge: "HLD Blueprint #2"
    },
    interviewLines: [
      "Always measure latency using p99 percentiles rather than averages, as averages hide critical user-impacting spikes."
    ],
    keywords: [{ word: "Latency" }, { word: "Throughput" }, { word: "Percentile Metrics (p99)" }]
  },

  {
    id: "sd-q6",
    question: "6. Differentiate between Vertical Scaling (Scale Up) and Horizontal Scaling (Scale Out).",
    topic: "Core Architecture",
    level: "Basic",
    type: "Theory",
    summary: "Scale-Up adds hardware resources (RAM/CPU) to a single machine; Scale-Out adds more commodity servers to a cluster.",
    properAnswer: "Vertical Scaling (Scale-Up) upgrades a single server's CPU, RAM, or NVMe storage. It is simple to implement without architectural changes but hits hard hardware ceilings and creates a single point of failure (SPOF). Horizontal Scaling (Scale-Out) adds more servers to a distributed pool. It requires load balancers, stateless app servers, and sharded databases, but provides near-infinite scale and high availability.",
    realWorldExample: "Stack Overflow operated for years by vertically scaling a pair of gigantic 64-core 1.5TB RAM SQL Server machines. In contrast, Netflix horizontally scales 100,000+ stateless AWS EC2 microservice instances behind Application Load Balancers to handle prime-time video playback surges.",
    relatedBlueprint: {
      id: "hld-4",
      title: "Design Video Streaming (Horizontal Auto-scaling Microservice Workers)",
      path: "/system-design/hld-4",
      badge: "HLD Blueprint #4"
    },
    interviewLines: [
      "Vertical scaling is limited by hardware bounds; horizontal scaling provides fault-tolerant elasticity."
    ],
    keywords: [{ word: "Vertical Scaling" }, { word: "Horizontal Scaling" }, { word: "Stateless Architecture" }]
  },

  {
    id: "sd-q7",
    question: "7. What is Eventual Consistency, and how is it achieved in NoSQL datastores?",
    topic: "Core Architecture",
    level: "Intermediate",
    type: "Theory",
    summary: "Eventual Consistency guarantees that, if no new updates occur, all replicas will eventually return the identical data.",
    properAnswer: "Eventual Consistency is a weak consistency model where updates to a data item are replicated asynchronously across cluster nodes. The system does not guarantee that immediate subsequent reads will return the latest write, but guarantees that all replicas will converge to the exact same value eventually (typically within milliseconds). It is achieved using techniques like Read Repair, Anti-Entropy (Merkle Trees), Vector Clocks, and hinted handoff in databases like Apache Cassandra and Amazon DynamoDB.",
    realWorldExample: "When a user updates their Twitter profile picture, follower feeds across different global regions may show the old picture for 2-3 seconds while background asynchronous replication syncs secondary Redis replicas. The system converges eventually.",
    relatedBlueprint: {
      id: "hld-7",
      title: "Design News Feed (Eventual Read Sync across Timeline Replicas)",
      path: "/system-design/hld-7",
      badge: "HLD Blueprint #7"
    },
    interviewLines: [
      "Eventual consistency prioritizes low latency and high availability by allowing temporary replica divergence."
    ],
    keywords: [{ word: "Eventual Consistency" }, { word: "Read Repair" }, { word: "Merkle Trees" }]
  },

  {
    id: "sd-q8",
    question: "8. Explain Strong Consistency vs Eventual Consistency trade-offs.",
    topic: "Core Architecture",
    level: "Intermediate",
    type: "Theory",
    summary: "Strong Consistency blocks reads/writes until all replicas acknowledge the update; Eventual Consistency responds fast and syncs in background.",
    properAnswer: "Strong Consistency (Linearizability) guarantees that any read operation immediately returns the absolute latest write, regardless of which replica handles the query. This requires synchronous two-phase commits (2PC) or Raft quorum consensus, adding round-trip latency and risk of failure if replicas drop. Eventual Consistency accepts background async replication, delivering sub-millisecond response times at the risk of temporary stale reads.",
    realWorldExample: "An ATM withdrawal service requires Strong Consistency (Relational DB 2PC) so a user cannot withdraw $500 twice from two ATMs simultaneously. A YouTube video view counter uses Eventual Consistency (Cassandra/Redis counter) where seeing 1,000,050 vs 1,000,052 views makes zero user impact.",
    relatedBlueprint: {
      id: "hld-4",
      title: "Design Video Streaming (Eventual View Count vs Strong User Subscription DB)",
      path: "/system-design/hld-4",
      badge: "HLD Blueprint #4"
    },
    interviewLines: [
      "Use Strong Consistency for financial balances; use Eventual Consistency for social feeds and view counters."
    ],
    keywords: [{ word: "Strong Consistency" }, { word: "Linearizability" }, { word: "Quorum Tuning" }]
  },

  // --------------------------------------------------------------------------
  // 2. DATA LAYER & STORAGE ARCHITECTURE (Q9 - Q16)
  // --------------------------------------------------------------------------
  {
    id: "sd-q9",
    question: "9. Compare Relational SQL vs NoSQL databases. When would you use each?",
    topic: "Data Layer",
    level: "Basic",
    type: "Theory",
    summary: "SQL DBs (ACID, normalized tables, complex JOINs) fit structured transactional data. NoSQL DBs (BASE, flexible schema, horizontally sharded) fit massive unstructured scale.",
    properAnswer: "SQL databases (PostgreSQL, MySQL) store data in structured tables with strict schemas, enforcing ACID properties (Atomicity, Consistency, Isolation, Durability) and supporting complex multi-table JOINs. They scale vertically well. NoSQL databases (Cassandra, MongoDB, Redis, DynamoDB) sacrifice strict JOINs and schema constraints for horizontal elasticity, high write throughput, and BASE (Basically Available, Soft-state, Eventual consistency) properties.",
    realWorldExample: "Uber uses PostgreSQL (via Schemaless sharding layer) for payment billing ledgers and user account metadata where ACID compliance is non-negotiable, while using Redis and Cassandra to store billions of real-time GPS coordinate pings per day.",
    relatedBlueprint: {
      id: "hld-5",
      title: "Design Uber / Lyft (PostgreSQL Billing + Cassandra GPS Tracking)",
      path: "/system-design/hld-5",
      badge: "HLD Blueprint #5"
    },
    tableData: {
      headers: ["Category", "SQL (Relational)", "NoSQL (Non-Relational)"],
      rows: [
        ["Data Model", "Normalized tables with foreign key relationships", "Key-Value, Document, Columnar, or Graph models"],
        ["ACID / Transaction Guarantee", "Strict ACID compliance for complex multi-row transactions", "Eventual Consistency (BASE) or single-document ACID"],
        ["Scaling Mechanics", "Primarily Vertical (Scale Up); Sharding is complex", "Native Horizontal Sharding (Scale Out across commodity nodes)"]
      ]
    },
    interviewLines: [
      "Choose SQL when ACID transactions and complex relational queries are mandatory.",
      "Choose NoSQL when write volume exceeds single-node disk caps and horizontal auto-sharding is required."
    ],
    keywords: [{ word: "SQL vs NoSQL" }, { word: "ACID vs BASE" }, { word: "Database Selection" }]
  },

  {
    id: "sd-q10",
    question: "10. How do B+ Trees differ from Log-Structured Merge (LSM) Trees, and why are LSM Trees faster for writes?",
    topic: "Data Layer",
    level: "Experienced",
    type: "Internal Working",
    summary: "B+ Trees organize data on disk into balanced tree blocks (fast reads, slow random write disk I/O). LSM Trees buffer writes in RAM Memtables and flush sequentially to SStables (fast writes).",
    properAnswer: "B+ Trees (used by InnoDB MySQL, PostgreSQL) store data in fixed-size disk pages arranged in a balanced tree. Updates require random disk I/O to locate and rewrite target disk blocks, causing heavy disk write amplification. LSM Trees (used by Cassandra, RocksDB, LevelDB) append all writes sequentially to an in-memory Memtable and a Write-Ahead Log (WAL). When Memtable fills up, it flushes sequentially to immutable disk files called SStables (Sorted String Tables). Because sequential disk I/O is 100x faster than random I/O, LSM Trees deliver vastly higher write throughput.",
    realWorldExample: "Apache Cassandra and RocksDB (used by Meta for key-value stores) leverage LSM Trees to ingest 500,000 chat messages or telemetry logs per second per node with sub-5ms latency, avoiding disk head random seek bottlenecks.",
    relatedBlueprint: {
      id: "hld-3",
      title: "Design WhatsApp / Telegram (Cassandra LSM Tree Message Store)",
      path: "/system-design/hld-3",
      badge: "HLD Blueprint #3"
    },
    tableData: {
      headers: ["Property", "B+ Tree (e.g. MySQL, PostgreSQL)", "LSM Tree (e.g. Cassandra, RocksDB)"],
      rows: [
        ["Primary Workload Optimization", "Read-Heavy Workloads (O(log N) direct disk page lookup)", "Write-Heavy Workloads (Sub-millisecond sequential appends)"],
        ["Write Disk Pattern", "Random Disk I/O (Page splits and overwrites)", "Sequential Disk I/O (Memtable flushes to SStables)"]
      ]
    },
    interviewLines: [
      "B+ Trees suffer from random disk write overhead; LSM Trees turn all writes into hyper-fast sequential append operations.",
      "LSM Trees use Bloom Filters to prevent unnecessary disk reads across multiple SStables."
    ],
    keywords: [{ word: "B+ Trees" }, { word: "LSM Trees" }, { word: "Sequential vs Random I/O" }]
  },

  {
    id: "sd-q11",
    question: "11. What is Database Sharding, and what are the trade-offs of Range vs Hash Sharding?",
    topic: "Data Layer",
    level: "Intermediate",
    type: "Theory",
    summary: "Sharding partitions large database tables horizontally across multiple physical servers based on a Shard Key.",
    properAnswer: "Database Sharding breaks a monolithic database table into smaller horizontal subsets (shards) distributed across multiple independent database servers. Range-based Sharding routes rows based on value ranges (e.g. User IDs 1-1M -> Shard A, 1M-2M -> Shard B). It makes range queries easy but causes write hotspots on current ranges. Hash-based Sharding passes the shard key through hash(key) % N to distribute data uniformly, eliminating hotspots but making range queries expensive across all shards.",
    realWorldExample: "Instagram sharded PostgreSQL using Hash Sharding on `user_id`. Every table row query (`SELECT * FROM posts WHERE user_id = 4591`) routes directly to Shard 14, while preventing user sign-up surges from overwhelming a single database node.",
    relatedBlueprint: {
      id: "hld-1",
      title: "Design TinyURL (Database Sharding by Short Key Hash)",
      path: "/system-design/hld-1",
      badge: "HLD Blueprint #1"
    },
    interviewLines: [
      "Range sharding simplifies range scans but creates write hotspots; Hash sharding distributes writes evenly but breaks easy range queries.",
      "Pick a high-cardinality shard key like user_id to avoid data unevenness."
    ],
    keywords: [{ word: "Database Sharding" }, { word: "Shard Key" }, { word: "Range Sharding" }, { word: "Hash Sharding" }]
  },

  {
    id: "sd-q12",
    question: "12. Explain Quorum Reads and Writes in Cassandra / DynamoDB (W + R > N).",
    topic: "Data Layer",
    level: "Experienced",
    type: "Internal Working",
    summary: "Configuring Write count (W) + Read count (R) > Replica count (N) guarantees strong consistency in masterless distributed databases.",
    properAnswer: "In masterless distributed databases (Cassandra/DynamoDB), data is replicated across N nodes. When a client performs a write, W replicas must acknowledge before success is returned. When reading, R replicas must respond. According to the Pigeonhole Principle, if W + R > N, the set of write nodes and read nodes must overlap by at least one node. That overlapping node guarantees the client will read the latest written timestamp.",
    realWorldExample: "In Apache Cassandra with Replication Factor N=3, configuring `LOCAL_QUORUM` (W=2, R=2) guarantees that out of 3 replicas, at least 1 node in the read set contains the latest written timestamp (2 + 2 = 4 > 3), preventing stale chat message reads.",
    relatedBlueprint: {
      id: "hld-3",
      title: "Design WhatsApp / Telegram (Cassandra Quorum W=2, R=2 Read/Write)",
      path: "/system-design/hld-3",
      badge: "HLD Blueprint #3"
    },
    interviewLines: [
      "W + R > N guarantees that the read set and write set overlap by at least one fresh replica.",
      "Tuning W=1 and R=QUORUM prioritizes write throughput while maintaining strong read correctness."
    ],
    keywords: [{ word: "Quorum Consistency" }, { word: "W + R > N" }, { word: "Replication Factor" }]
  },

  {
    id: "sd-q13",
    question: "13. What is Database Replication? Compare Single-Leader, Multi-Leader, and Leaderless Topologies.",
    topic: "Data Layer",
    level: "Intermediate",
    type: "Theory",
    summary: "Replication copies data across servers. Single-Leader (Primary/Replica) simplifies writes; Multi-Leader handles multi-region writes; Leaderless (Cassandra) eliminates single points of failure.",
    properAnswer: "Database Replication copies data across multiple machines for fault tolerance and read scaling. Single-Leader routes all writes to a primary master node, which streams replication logs to read-only secondaries (simple, but Primary is write bottleneck). Multi-Leader allows write operations at multiple data center primary nodes (great for multi-region apps, but requires complex conflict resolution like LWW). Leaderless (Dynamo style) allows clients to write to any node in the cluster, resolving conflicts via Vector Clocks or Quorum consensus.",
    realWorldExample: "GitHub uses Single-Leader MySQL (with Orchestrator for primary failover); Google Docs uses Multi-Leader operational transformation engines for multi-region collaborative editing; Cassandra uses Leaderless ring replication for global write availability.",
    relatedBlueprint: {
      id: "hld-6",
      title: "Design Distributed Web Crawler (Leaderless Storage Ring for Raw HTML)",
      path: "/system-design/hld-6",
      badge: "HLD Blueprint #6"
    },
    interviewLines: [
      "Single-Leader architecture simplifies write ordering; Leaderless architecture provides ultimate write availability."
    ],
    keywords: [{ word: "Single-Leader Replication" }, { word: "Multi-Leader Replication" }, { word: "Leaderless Replication" }]
  },

  {
    id: "sd-q14",
    question: "14. What is a Write-Ahead Log (WAL), and why is it critical for database durability?",
    topic: "Data Layer",
    level: "Intermediate",
    type: "Internal Working",
    summary: "WAL is an append-only log file on disk where database operations are recorded BEFORE committing changes to data files.",
    properAnswer: "A Write-Ahead Log (WAL) guarantees durability (the 'D' in ACID) and crash recovery. Before any database table page or index is modified in RAM memory, the mutation command is appended to an immutable disk log file. If the database server suffers a power failure or crash mid-transaction, during reboot the database engine reads the WAL to replay committed transactions (Redo) and rollback uncommitted transactions (Undo).",
    realWorldExample: "PostgreSQL uses Write-Ahead Logging (WAL) to enable Point-In-Time Recovery (PITR) and streaming physical replication to read-only replica nodes.",
    relatedBlueprint: {
      id: "hld-1",
      title: "Design TinyURL (WAL Commit Logs for Fast Crash Recovery)",
      path: "/system-design/hld-1",
      badge: "HLD Blueprint #1"
    },
    interviewLines: [
      "WAL ensures zero data loss during power outages by flushing sequential append logs to disk before modifying RAM pages."
    ],
    keywords: [{ word: "Write-Ahead Log" }, { word: "Crash Recovery" }, { word: "ACID Durability" }]
  },

  {
    id: "sd-q15",
    question: "15. Compare Database Normalization vs Denormalization in high-scale architectures.",
    topic: "Data Layer",
    level: "Basic",
    type: "Theory",
    summary: "Normalization reduces data redundancy via split tables (great for write integrity); Denormalization duplicates data (great for fast single-query reads).",
    properAnswer: "Database Normalization (3NF) structures tables to eliminate duplicate data using foreign key references. This minimizes storage footprint and prevents update anomalies, but requires expensive multi-table JOIN operations. Denormalization intentionally duplicates related data inside a single table or document. It increases storage usage and write updating complexity, but provides lightning-fast reads by eliminating JOIN operations.",
    realWorldExample: "In Twitter's news feed, the user's handle `@username` and avatar URL are denormalized and stored directly inside each timeline post JSON in Redis. When a feed is fetched, the frontend renders instantly without joining the `Users` table.",
    relatedBlueprint: {
      id: "hld-7",
      title: "Design News Feed (Denormalized Redis Timeline Feeds)",
      path: "/system-design/hld-7",
      badge: "HLD Blueprint #7"
    },
    interviewLines: [
      "Normalize relational databases to maintain transactional data integrity.",
      "Denormalize high-scale read workloads (NoSQL/CQRS) to avoid expensive distributed JOINs."
    ],
    keywords: [{ word: "Normalization" }, { word: "Denormalization" }, { word: "Read Optimization" }]
  },

  {
    id: "sd-q16",
    question: "16. What is Database Connection Pooling, and why is it mandatory?",
    topic: "Data Layer",
    level: "Basic",
    type: "Theory",
    summary: "Connection Pooling maintains a reusable pool of open database connections to avoid TCP handshakes and process creation overhead per request.",
    properAnswer: "Opening a raw database connection involves expensive network operations: TCP 3-way handshake, TLS negotiation, authentication, and backend database process spawning (e.g. PostgreSQL process allocation). Under high traffic, opening a new connection per request quickly crashes the database due to thread memory exhaustion. A Connection Pool (e.g., HikariCP) pre-allocates a fixed pool of open connections (e.g. 50 connections). Incoming worker threads borrow an active connection, execute their query, and immediately return it to the pool.",
    realWorldExample: "Spring Boot services use HikariCP with a default max pool size of 10-20 connections per instance. This allows 50 microservice instances to handle 100,000 requests/sec while keeping total PostgreSQL connections under 1,000.",
    relatedBlueprint: {
      id: "hld-2",
      title: "Design an API Rate Limiter (HikariCP Connection Pool Isolation)",
      path: "/system-design/hld-2",
      badge: "HLD Blueprint #2"
    },
    interviewLines: [
      "HikariCP connection pools eliminate TCP handshake overhead and cap maximum concurrent database connections."
    ],
    keywords: [{ word: "Connection Pooling" }, { word: "HikariCP" }, { word: "Resource Reuse" }]
  },

  // --------------------------------------------------------------------------
  // 3. CACHING & IN-MEMORY STRATEGIES (Q17 - Q24)
  // --------------------------------------------------------------------------
  {
    id: "sd-q17",
    question: "17. Detail the 5 core Caching Strategies: Cache-Aside, Write-Through, Write-Back, Read-Through, and Refresh-Ahead.",
    topic: "Caching",
    level: "Intermediate",
    type: "Theory",
    summary: "Cache-Aside (application manages cache & DB); Write-Through (writes hit cache then sync DB); Write-Back (async batched DB writes); Read-Through (cache loads DB miss); Refresh-Ahead (pre-fetches expiring items).",
    properAnswer: "1. **Cache-Aside (Lazy Loading)**: Application inspects cache first. On miss, reads DB, populates cache, and returns. Simple, but vulnerable to cache misses on cold starts.\n2. **Read-Through**: Application queries cache framework; cache layer transparently fetches from DB on miss.\n3. **Write-Through**: Application writes to cache; cache synchronously writes to DB before acknowledging. Zero stale data, but higher write latency.\n4. **Write-Back (Write-Behind)**: Application writes to cache; cache acknowledges instantly and updates DB asynchronously in background batches. Ultra-fast writes, but risk of data loss if cache crashes.\n5. **Refresh-Ahead**: Cache predicts key expiration and reloads hot keys from DB automatically before TTL expires.",
    realWorldExample: "E-commerce apps like Amazon use Cache-Aside for product catalog details (99% read ratio). Video view counters use Write-Back (Write-Behind) in Redis memory, flushing view counts to PostgreSQL in background batches every 10 seconds.",
    relatedBlueprint: {
      id: "hld-1",
      title: "Design TinyURL (Redis LRU Cache-Aside Architecture)",
      path: "/system-design/hld-1",
      badge: "HLD Blueprint #1"
    },
    tableData: {
      headers: ["Caching Strategy", "Read / Write Latency", "Data Loss Risk", "Complexity"],
      rows: [
        ["Cache-Aside", "Fast reads; slow on cache miss", "None (DB is source of truth)", "Low (App logic handles fallback)"],
        ["Write-Through", "Higher write latency (Sync DB write)", "None (Synchronous DB persist)", "Medium (Requires cache plugin provider)"],
        ["Write-Back (Write-Behind)", "Ultra-low write latency", "High (If cache node dies before async DB flush)", "High (Requires write queue buffering)"]
      ]
    },
    interviewLines: [
      "Cache-Aside is the default workhorse pattern for most web applications.",
      "Use Write-Back for extreme write throughput (e.g. analytics counters) where small data loss risk is acceptable."
    ],
    keywords: [{ word: "Cache-Aside" }, { word: "Write-Through" }, { word: "Write-Back" }, { word: "Read-Through" }]
  },

  {
    id: "sd-q18",
    question: "18. Explain Cache Eviction Policies: LRU, LFU, ARC, and FIFO.",
    topic: "Caching",
    level: "Intermediate",
    type: "Internal Working",
    summary: "LRU evicts least recently accessed items; LFU evicts least frequently accessed items; ARC adapts dynamically between recency and frequency.",
    properAnswer: "When cache memory is exhausted, eviction policies determine which items to delete:\n- **LRU (Least Recently Used)**: Evicts keys that haven't been accessed for the longest time. Implemented via Doubly Linked List + HashMap.\n- **LFU (Least Frequently Used)**: Tracks access counts per key and evicts items used least often. Vulnerable to stale historical frequency spikes.\n- **ARC (Adaptive Replacement Cache)**: Dynamically tunes balance between LRU and LFU, outperforming both.\n- **FIFO (First In First Out)**: Evicts oldest inserted items regardless of usage popularity.",
    realWorldExample: "Redis configured with `maxmemory-policy volatile-lru` evicts oldest unused short URLs when RAM reaches 80% capacity, keeping the 20% most popular viral links cached in memory.",
    relatedBlueprint: {
      id: "hld-1",
      title: "Design TinyURL (Redis maxmemory Volatile-LRU Eviction)",
      path: "/system-design/hld-1",
      badge: "HLD Blueprint #1"
    },
    interviewLines: [
      "LRU is the standard default for Redis and Memcached due to O(1) time complexity."
    ],
    keywords: [{ word: "LRU Eviction" }, { word: "LFU Eviction" }, { word: "ARC Cache" }]
  },

  {
    id: "sd-q19",
    question: "19. What is a Cache Stampede (Thundering Herd), and how do you prevent it?",
    topic: "Caching",
    level: "Experienced",
    type: "Architectural Pattern",
    summary: "Cache Stampede happens when a hot cached key expires, causing thousands of concurrent requests to hit the database simultaneously.",
    properAnswer: "A Cache Stampede occurs when a heavily accessed cached key expires (or is evicted). Thousands of concurrent user requests encounter a cache miss at the exact same millisecond and all flood the backend database simultaneously to recompute the value. This creates catastrophic database connection exhaustion and CPU spikes. Mitigations include: Distributed Mutex Locks (Redis lock/SingleFlight), Probabilistic Early Expiration (XFetch algorithm), and Pre-warming cache background jobs.",
    realWorldExample: "During Super Bowl breaking news, when a viral news post cache key expires, Go's `golang.org/x/sync/singleflight` guarantees that out of 50,000 concurrent web requests, only 1 request queries PostgreSQL while the remaining 49,999 wait for the singleflight result.",
    relatedBlueprint: {
      id: "hld-7",
      title: "Design News Feed (SingleFlight Lock Defense on Hot Celebrity Timelines)",
      path: "/system-design/hld-7",
      badge: "HLD Blueprint #7"
    },
    interviewLines: [
      "Prevent Cache Stampedes using SingleFlight/Mutex locks so only 1 request queries the DB on cache miss."
    ],
    keywords: [{ word: "Cache Stampede" }, { word: "Thundering Herd" }, { word: "SingleFlight Lock" }]
  },

  {
    id: "sd-q20",
    question: "20. Compare Redis vs Memcached for distributed caching.",
    topic: "Caching",
    level: "Basic",
    type: "Theory",
    summary: "Memcached is simple, multi-threaded memory-only cache. Redis is single-threaded event-driven store supporting rich data structures, persistence, and Pub/Sub.",
    properAnswer: "Memcached is a lightweight, multi-threaded memory caching system for simple key-value strings. Redis is an advanced in-memory data store supporting rich data structures (Strings, Hashes, Lists, Sets, Sorted Sets, Bitmaps, Geospatial), disk persistence (RDB/AOF), Pub/Sub messaging, Lua scripting, and master-replica replication.",
    realWorldExample: "Twitter uses Redis Sorted Sets (ZSET) to maintain reverse-chronological user timeline feeds in memory, whereas Netflix historically used Memcached clusters to cache serialized user session strings.",
    relatedBlueprint: {
      id: "hld-7",
      title: "Design News Feed (Redis Sorted Sets for Timeline Caches)",
      path: "/system-design/hld-7",
      badge: "HLD Blueprint #7"
    },
    tableData: {
      headers: ["Feature", "Redis", "Memcached"],
      rows: [
        ["Data Structures", "Strings, Hashes, Lists, Sets, Sorted Sets, Bitmaps, Geo", "Simple Key-Value Strings only"],
        ["Threading Architecture", "Single-threaded I/O multiplexed event loop", "Multi-threaded memory allocation"],
        ["Persistence Support", "YES (RDB Snapshots + AOF Append-Only Logs)", "NO (Volatile RAM memory only)"]
      ]
    },
    interviewLines: [
      "Use Redis for rich data structures, atomic Lua scripts, and high availability."
    ],
    keywords: [{ word: "Redis vs Memcached" }, { word: "In-Memory Datastores" }, { word: "Persistence Options" }]
  },

  {
    id: "sd-q21",
    question: "21. How does Redis achieve high throughput despite being single-threaded?",
    topic: "Caching",
    level: "Intermediate",
    type: "Internal Working",
    summary: "Redis uses RAM memory speeds combined with Non-blocking I/O Multiplexing (epoll/kqueue) to process 100,000+ operations/sec.",
    properAnswer: "Redis executes commands on a single main execution thread, completely eliminating expensive multi-threading context switches, lock contention, and race conditions. High throughput is achieved because: 1) Data resides entirely in ultra-fast RAM memory (nanosecond access), and 2) It leverages operating system Non-Blocking I/O Multiplexing (epoll on Linux, kqueue on macOS) to listen to thousands of active client socket connections concurrently.",
    realWorldExample: "GitHub uses a single Redis primary node executing sub-millisecond `epoll` multiplexing to handle 120,000 rate-limiting and session validation queries per second.",
    relatedBlueprint: {
      id: "hld-2",
      title: "Design an API Rate Limiter (Redis epoll Single-Threaded Performance)",
      path: "/system-design/hld-2",
      badge: "HLD Blueprint #2"
    },
    interviewLines: [
      "Redis eliminates lock overhead by executing commands sequentially on an I/O-multiplexed event loop."
    ],
    keywords: [{ word: "Redis Single-Threaded" }, { word: "I/O Multiplexing" }, { word: "epoll Event Loop" }]
  },

  {
    id: "sd-q22",
    question: "22. What is Cache Penetration, Cache Breakdown, and Cache Avalanche?",
    topic: "Caching",
    level: "Intermediate",
    type: "Theory",
    summary: "Penetration (queries for non-existent keys bypass cache); Breakdown (single hot key expires); Avalanche (mass cache keys expire simultaneously).",
    properAnswer: "1. **Cache Penetration**: Attacker queries keys that exist neither in cache nor database (e.g. id = -999). Every request hits DB directly. *Fix: Use Bloom Filters or cache null objects with short TTL.*\n2. **Cache Breakdown**: A single super-hot key expires, causing temporary DB traffic spike. *Fix: Use Mutex locks or non-expiring key with background refresh.*\n3. **Cache Avalanche**: Thousands of cached keys expire at the exact same time, flooding DB. *Fix: Add random jitter (e.g. 5-10 minutes) to TTL expiration times.*",
    realWorldExample: "In Web Crawlers, a Bloom Filter prevents Cache Penetration by blocking requests for invalid or un-indexed URLs before touching backend database storage.",
    relatedBlueprint: {
      id: "hld-6",
      title: "Design Distributed Web Crawler (Bloom Filter for Cache Penetration)",
      path: "/system-design/hld-6",
      badge: "HLD Blueprint #6"
    },
    interviewLines: [
      "Cache Penetration fix: Bloom Filters or caching null results.",
      "Cache Avalanche fix: Add random time jitter to TTL values to stagger key expirations."
    ],
    keywords: [{ word: "Cache Penetration" }, { word: "Cache Breakdown" }, { word: "Cache Avalanche" }]
  },

  {
    id: "sd-q23",
    question: "23. Explain Redis Persistence mechanisms: RDB vs AOF.",
    topic: "Caching",
    level: "Intermediate",
    type: "Internal Working",
    summary: "RDB takes compact point-in-time binary snapshots; AOF logs every write command sequentially.",
    properAnswer: "Redis provides two persistence options: 1) **RDB (Redis Database)**: Creates point-in-time compact binary snapshots of dataset at specified intervals (e.g., every 15 minutes). Fast restarts, but risk of losing data between snapshots. 2) **AOF (Append Only Log)**: Logs every write operation to disk sequentially. Higher durability (fsync every second), but larger log file size. Most production setups use both RDB and AOF in hybrid mode.",
    realWorldExample: "Payment rate limiters configure Redis with AOF (`appendfsync everysec`) so that if a power outage occurs, at most 1 second of rate-limiting counter updates is lost.",
    relatedBlueprint: {
      id: "hld-2",
      title: "Design an API Rate Limiter (Redis AOF Log Persistence)",
      path: "/system-design/hld-2",
      badge: "HLD Blueprint #2"
    },
    interviewLines: [
      "RDB snapshots are fast for backup & recovery; AOF logs guarantee near-zero data loss."
    ],
    keywords: [{ word: "Redis Persistence" }, { word: "RDB Snapshot" }, { word: "AOF Log" }]
  },

  {
    id: "sd-q24",
    question: "24. How do Redis Sentinel and Redis Cluster differ in High Availability?",
    topic: "Caching",
    level: "Experienced",
    type: "Architecture",
    summary: "Sentinel provides failover & monitoring for Single-Master setups; Redis Cluster provides horizontal data sharding across multiple Masters.",
    properAnswer: "Redis Sentinel manages High Availability for single-master topologies by monitoring nodes, alerting, and executing automatic failover if the master dies. However, all writes still hit a single master server. Redis Cluster provides true horizontal sharding: it splits keys across 16,384 Hash Slots distributed over multiple master nodes, enabling scale-out writes and automatic failover.",
    realWorldExample: "Uber uses Redis Cluster with 1,000+ master nodes sharded across 16,384 hash slots to store driver real-time locations, scaling far beyond single-server RAM limits.",
    relatedBlueprint: {
      id: "hld-5",
      title: "Design Uber / Lyft (Redis Cluster 16,384 Hash Slot Sharding)",
      path: "/system-design/hld-5",
      badge: "HLD Blueprint #5"
    },
    interviewLines: [
      "Redis Sentinel manages primary-replica failover; Redis Cluster provides 16,384 hash slots for horizontal write sharding."
    ],
    keywords: [{ word: "Redis Sentinel" }, { word: "Redis Cluster" }, { word: "Hash Slots (16384)" }]
  },

  // --------------------------------------------------------------------------
  // 4. NETWORKING, APIS & TRAFFIC ROUTING (Q25 - Q33)
  // --------------------------------------------------------------------------
  {
    id: "sd-q25",
    question: "25. Compare Layer 4 (L4) vs Layer 7 (L7) Load Balancing.",
    topic: "Networking & APIs",
    level: "Intermediate",
    type: "Theory",
    summary: "L4 balances traffic at Transport Layer (TCP/UDP IP:Port); L7 balances traffic at Application Layer (HTTP Headers, Cookies, URL paths).",
    properAnswer: "Layer 4 Load Balancers (e.g., HAProxy TCP mode, AWS NLB) operate at the transport layer, inspecting packet IP addresses and ports without decrypting HTTP content. They are extremely fast and process millions of requests/sec with low CPU overhead. Layer 7 Load Balancers (e.g., NGINX, AWS ALB, Envoy) inspect application layer payload (HTTP headers, cookies, URL path `/api/v1/users`). They enable smart routing, SSL termination, and rate-limiting, but consume more CPU.",
    realWorldExample: "Cloudflare uses L4 Maglev load balancers at edge ingress to filter SYN flood DDoS attacks at 100 Gbps, then forwards clean traffic to Envoy L7 proxies for HTTP path-based microservice routing.",
    relatedBlueprint: {
      id: "hld-4",
      title: "Design Video Streaming (AWS NLB L4 Ingress + NGINX L7 Video Edge)",
      path: "/system-design/hld-4",
      badge: "HLD Blueprint #4"
    },
    tableData: {
      headers: ["Property", "Layer 4 (L4) Load Balancer", "Layer 7 (L7) Load Balancer"],
      rows: [
        ["OSI Layer", "Transport Layer (TCP / UDP)", "Application Layer (HTTP / HTTPS / gRPC)"],
        ["Awareness", "IP address and Port numbers only", "URL paths, HTTP headers, cookies, query params"]
      ]
    },
    interviewLines: [
      "L4 operates on raw TCP/IP packets for maximum speed; L7 inspects HTTP paths and headers for intelligent microservice routing."
    ],
    keywords: [{ word: "Layer 4 Load Balancer" }, { word: "Layer 7 Load Balancer" }, { word: "SSL Termination" }]
  },

  {
    id: "sd-q26",
    question: "26. Detail the 4 core Rate Limiting Algorithms: Token Bucket, Leaky Bucket, Fixed Window, and Sliding Window Counter.",
    topic: "Networking & APIs",
    level: "Intermediate",
    type: "Algorithms",
    summary: "Token Bucket allows burst traffic; Leaky Bucket smooths output traffic; Fixed Window suffers from edge spikes; Sliding Window Counter gives smooth precision.",
    properAnswer: "1. **Token Bucket**: Tokens added to bucket at constant rate. Requests consume tokens. Accommodates traffic bursts up to bucket capacity. *Used by AWS API Gateway & Stripe*.\n2. **Leaky Bucket**: Requests queue in FIFO bucket and leak out at constant speed. Smooths bursty traffic into uniform flow.\n3. **Fixed Window Counter**: Divides time into fixed windows (e.g., 1 min). Easy to implement, but allows 2x limit at window boundaries.\n4. **Sliding Window Counter**: Combines current and previous window counts using weighted overlap percentage. Prevents boundary spikes with minimal memory.",
    realWorldExample: "Stripe API Gateway uses Token Bucket to allow merchants to burst up to 100 req/sec for short flash sales, while maintaining a steady refill rate of 20 tokens/sec.",
    relatedBlueprint: {
      id: "hld-2",
      title: "Design an API Rate Limiter (Token Bucket & Sliding Window Log HLD)",
      path: "/system-design/hld-2",
      badge: "HLD Blueprint #2"
    },
    interviewLines: [
      "Token Bucket accommodates traffic bursts; Leaky Bucket enforces a smooth, constant egress rate."
    ],
    keywords: [{ word: "Token Bucket" }, { word: "Leaky Bucket" }, { word: "Fixed Window" }, { word: "Sliding Window Counter" }]
  },

  {
    id: "sd-q27",
    question: "27. How do you implement an atomic distributed Rate Limiter in Redis using Lua scripts?",
    topic: "Networking & APIs",
    level: "Experienced",
    type: "Coding / Practical",
    summary: "Executing Rate Limiting logic inside a Redis Lua script guarantees atomic execution, avoiding race conditions without distributed locks.",
    properAnswer: "In multi-server distributed environments, fetching a key counter from Redis, incrementing in application code, and checking limit introduces race conditions (Time-of-Check to Time-of-Use). Executing the counter logic inside a Redis Lua script guarantees atomicity because Redis executes Lua scripts sequentially on its single-threaded event loop. No other request can intervene between checking current count and incrementing.",
    realWorldExample: "Stripe and Shopify run Redis Lua scripts to execute `ZREMRANGEBYSCORE` and `ZCARD` in a single atomic network round-trip, processing 25,000 rate checks per second with zero race conditions.",
    relatedBlueprint: {
      id: "hld-2",
      title: "Design an API Rate Limiter (Atomic Redis Lua Scripting)",
      path: "/system-design/hld-2",
      badge: "HLD Blueprint #2"
    },
    codeSnippet: `-- Atomic Sliding Window Rate Limiter in Redis Lua
local key = KEYS[1]
local limit = tonumber(ARGV[1])
local current_time = tonumber(ARGV[2])
local window_size = tonumber(ARGV[3])

redis.call('ZREMRANGEBYSCORE', key, 0, current_time - window_size)
local current_requests = redis.call('ZCARD', key)

if current_requests < limit then
    redis.call('ZADD', key, current_time, current_time)
    redis.call('EXPIRE', key, math.ceil(window_size / 1000))
    return 1 -- Allowed
else
    return 0 -- Rate Limited
end`,
    interviewLines: [
      "Redis Lua scripts execute atomically inside the Redis event loop, eliminating multi-server race conditions."
    ],
    keywords: [{ word: "Redis Lua Scripting" }, { word: "Atomic Rate Limiting" }, { word: "TOCTOU Race Condition" }]
  },

  {
    id: "sd-q28",
    question: "28. Compare WebSockets vs Server-Sent Events (SSE) vs HTTP Long Polling vs Short Polling.",
    topic: "Networking & APIs",
    level: "Intermediate",
    type: "Theory",
    summary: "WebSockets (bidirectional full-duplex TCP); SSE (unidirectional server-to-client streaming); Long Polling (holds HTTP request open until data arrives).",
    properAnswer: "WebSockets establish a persistent full-duplex TCP connection allowing real-time bidirectional messaging (ideal for chat & multiplayer games). Server-Sent Events (SSE) maintain a single HTTP connection for unidirectional server-to-client streaming (ideal for stock tickers & AI response streaming). HTTP Long Polling holds an HTTP request open until server has new data, closing connection immediately after response. Short Polling repeatedly sends HTTP GET requests at fixed intervals, wasting bandwidth.",
    realWorldExample: "WhatsApp and Slack use WebSockets for full-duplex chat messages and typing indicators; ChatGPT uses Server-Sent Events (SSE) to stream generated tokens to the browser line-by-line.",
    relatedBlueprint: {
      id: "hld-3",
      title: "Design WhatsApp / Telegram (WebSocket Gateway Infrastructure)",
      path: "/system-design/hld-3",
      badge: "HLD Blueprint #3"
    },
    tableData: {
      headers: ["Protocol", "Communication Direction", "Connection Type", "Best Use Case"],
      rows: [
        ["Server-Sent Events (SSE)", "Server -> Client (Unidirectional stream)", "Single persistent HTTP connection", "Live news feeds, AI text streaming (ChatGPT), stock prices"],
        ["WebSockets", "Full-Duplex Bidirectional", "Single persistent TCP connection", "Real-time chat (WhatsApp), multiplayer gaming"]
      ]
    },
    interviewLines: [
      "Use WebSockets for bidirectional real-time communication like chat apps.",
      "Use Server-Sent Events (SSE) for simple unidirectional server-to-client streaming like LLM token streaming."
    ],
    keywords: [{ word: "WebSockets" }, { word: "Server-Sent Events (SSE)" }, { word: "HTTP Long Polling" }]
  },

  {
    id: "sd-q29",
    question: "29. Compare REST vs GraphQL vs gRPC / Protocol Buffers.",
    topic: "Networking & APIs",
    level: "Intermediate",
    type: "Theory",
    summary: "REST (HTTP/1.1 JSON resources); GraphQL (Flexible query language for client-driven data fetching); gRPC (HTTP/2 binary Protobuf for microservices).",
    properAnswer: "REST is a standard architectural style using HTTP verbs (GET, POST) and JSON format. It is public-API friendly but suffers from over-fetching/under-fetching. GraphQL provides a single endpoint where clients specify exact fields needed in a query, eliminating over-fetching but adding backend resolver complexity. gRPC uses HTTP/2 multiplexing and binary Protocol Buffers serialization. It is 7-10x faster than REST/JSON, making it the industry standard for internal microservice-to-microservice RPC communication.",
    realWorldExample: "Netflix uses GraphQL at its mobile API edge gateway to allow iOS/Android apps to fetch exact UI fields in 1 query, while using gRPC internally between 1,000+ microservices for ultra-fast binary communication.",
    relatedBlueprint: {
      id: "hld-4",
      title: "Design Video Streaming (gRPC Microservice RPCs + GraphQL Gateway)",
      path: "/system-design/hld-4",
      badge: "HLD Blueprint #4"
    },
    interviewLines: [
      "Use REST for external public APIs; GraphQL for complex mobile frontend aggregations; gRPC for ultra-fast internal microservice RPCs."
    ],
    keywords: [{ word: "REST" }, { word: "GraphQL" }, { word: "gRPC" }, { word: "Protocol Buffers" }]
  },

  {
    id: "sd-q30",
    question: "30. What is an API Gateway, and what cross-cutting concerns does it handle?",
    topic: "Networking & APIs",
    level: "Basic",
    type: "Theory",
    summary: "An API Gateway acts as the single entry point for client requests, handling routing, auth, rate limiting, and SSL termination.",
    properAnswer: "An API Gateway is an architectural proxy positioned between external clients and internal microservices. It abstracts backend service topology and handles cross-cutting concerns: Request Routing, Authentication/Authorization (OAuth2/JWT validation), Rate Limiting, SSL/TLS Termination, Response Caching, Request Retries & Circuit Breaking, and Protocol Translation (HTTP to gRPC).",
    realWorldExample: "Kong API Gateway (built on NGINX) sits at the edge of Stripe's architecture, validating JWT signatures and enforcing token rate limits before forwarding requests to internal Scala payment services.",
    relatedBlueprint: {
      id: "hld-2",
      title: "Design an API Rate Limiter (API Gateway Middleware Architecture)",
      path: "/system-design/hld-2",
      badge: "HLD Blueprint #2"
    },
    interviewLines: [
      "API Gateways centralize security, rate limiting, and routing away from individual microservices."
    ],
    keywords: [{ word: "API Gateway" }, { word: "Reverse Proxy" }, { word: "Cross-Cutting Concerns" }]
  },

  {
    id: "sd-q31",
    question: "31. Explain HTTP/1.1 vs HTTP/2 vs HTTP/3 (QUIC).",
    topic: "Networking & APIs",
    level: "Experienced",
    type: "Theory",
    summary: "HTTP/1.1 (Sequential text requests, HOL blocking); HTTP/2 (Multiplexed streams over 1 TCP connection); HTTP/3 (QUIC over UDP eliminating TCP HOL blocking).",
    properAnswer: "HTTP/1.1 requires separate TCP connections or pipeline queuing, suffering from Head-of-Line (HOL) blocking. HTTP/2 introduced binary frame multiplexing over a single TCP connection and header compression (HPACK). However, TCP-level packet loss still stalls all HTTP/2 streams. HTTP/3 replaces TCP with QUIC protocol built on UDP, eliminating TCP Head-of-Line blocking completely and enabling fast zero-RTT connection resumption.",
    realWorldExample: "Google Search and YouTube serve over 70% of mobile traffic over HTTP/3 (QUIC), allowing video streaming to resume instantly when a user switches from Wi-Fi to cellular 5G networks.",
    relatedBlueprint: {
      id: "hld-4",
      title: "Design Video Streaming (HTTP/3 QUIC Video Chunk Delivery)",
      path: "/system-design/hld-4",
      badge: "HLD Blueprint #4"
    },
    interviewLines: [
      "HTTP/2 multiplexes streams over 1 TCP connection; HTTP/3 uses QUIC/UDP to eliminate TCP Head-of-Line blocking."
    ],
    keywords: [{ word: "HTTP/2 Multiplexing" }, { word: "HTTP/3 QUIC" }, { word: "Head-of-Line Blocking" }]
  },

  {
    id: "sd-q32",
    question: "32. What is Fail-Open vs Fail-Closed in API Rate Limiters and Security Gateways?",
    topic: "Networking & APIs",
    level: "Intermediate",
    type: "Theory",
    summary: "Fail-Open allows traffic through when security/rate-limit services fail; Fail-Closed blocks all traffic to guarantee security.",
    properAnswer: "When an infrastructure dependency (like a Redis Rate Limiter cluster) experiences a total outage: **Fail-Open** allows incoming user requests to pass directly to backend microservices. This preserves user experience and uptime at the risk of backend overload. **Fail-Closed** blocks all incoming requests and returns HTTP 500 errors, protecting database security and system state at the cost of complete application downtime.",
    realWorldExample: "Twitter rate limiters fail-open during Redis outages so users can still read tweets, while Stripe payment authentication gateways fail-closed to prevent un-authenticated credit card charges.",
    relatedBlueprint: {
      id: "hld-2",
      title: "Design an API Rate Limiter (Fail-Open vs Fail-Closed Policy)",
      path: "/system-design/hld-2",
      badge: "HLD Blueprint #2"
    },
    interviewLines: [
      "Use Fail-Open for non-critical rate limiters; use Fail-Closed for authentication & payment gateways."
    ],
    keywords: [{ word: "Fail-Open" }, { word: "Fail-Closed" }, { word: "Graceful Degradation" }]
  },

  {
    id: "sd-q33",
    question: "33. How does Forward Proxy differ from Reverse Proxy?",
    topic: "Networking & APIs",
    level: "Basic",
    type: "Theory",
    summary: "Forward Proxy protects and hides clients accessing the internet; Reverse Proxy protects and balances traffic to backend servers.",
    properAnswer: "A **Forward Proxy** sits in front of client devices (e.g. corporate network proxy). It intercepts outgoing client requests to bypass geo-restrictions, filter web content, and mask client IP addresses. A **Reverse Proxy** (e.g. NGINX, HAProxy) sits in front of backend servers. It intercepts incoming client requests to load balance traffic, terminate SSL, cache responses, and hide server IP topologies.",
    realWorldExample: "Cloudflare operates as a reverse proxy for 20% of the internet, shielding origin Web servers from DDoS attacks and serving cached static assets.",
    relatedBlueprint: {
      id: "hld-6",
      title: "Design Distributed Web Crawler (Forward Proxy Pool for IP Masking)",
      path: "/system-design/hld-6",
      badge: "HLD Blueprint #6"
    },
    interviewLines: [
      "Forward Proxy acts on behalf of clients; Reverse Proxy acts on behalf of backend servers."
    ],
    keywords: [{ word: "Forward Proxy" }, { word: "Reverse Proxy" }, { word: "NGINX" }]
  },

  // --------------------------------------------------------------------------
  // 5. MICROSERVICES, MESSAGING & EVENT-DRIVEN PATTERNS (Q34 - Q42)
  // --------------------------------------------------------------------------
  {
    id: "sd-q34",
    question: "34. Compare Kafka vs RabbitMQ vs AWS SQS. When do you use a Distributed Commit Log vs AMQP Message Queue?",
    topic: "Messaging & Microservices",
    level: "Intermediate",
    type: "Theory",
    summary: "Kafka is a distributed append-only commit log (replayable, high-throughput streaming); RabbitMQ is an AMQP broker (complex routing, deletes on ack); SQS is managed cloud queue.",
    properAnswer: "Apache Kafka is a distributed append-only commit log. Messages are persisted on disk topics and retained for a configured TTL. Multiple consumer groups track their own offsets and can replay historical events. Ideal for high-throughput event streaming and CDC. RabbitMQ is a traditional AMQP message broker where messages are routed via exchanges to queues and deleted as soon as consumers acknowledge. Ideal for complex routing, task queues, and individual message delivery guarantees.",
    realWorldExample: "Uber uses Kafka to stream 1 Trillion location events per day for real-time driver tracking and fraud detection. An e-commerce warehouse uses RabbitMQ to route specific order items to specialized packaging worker queues based on AMQP topic routing keys.",
    relatedBlueprint: {
      id: "hld-4",
      title: "Design Video Streaming (Kafka Transcoding Event Pipeline)",
      path: "/system-design/hld-4",
      badge: "HLD Blueprint #4"
    },
    tableData: {
      headers: ["Dimension", "Apache Kafka", "RabbitMQ", "AWS SQS"],
      rows: [
        ["Architecture", "Distributed Append-Only Commit Log", "AMQP Exchange / Queue Broker", "Managed Cloud Queue"],
        ["Message Retention", "Persistent on disk (Replayable historical events)", "Deleted immediately after consumer ACK", "Deleted after ACK (Max 14 days)"]
      ]
    },
    interviewLines: [
      "Use Kafka for persistent event streaming and event replayability; use RabbitMQ for complex queue routing."
    ],
    keywords: [{ word: "Apache Kafka" }, { word: "RabbitMQ" }, { word: "AWS SQS" }]
  },

  {
    id: "sd-q35",
    question: "35. Explain the Saga Pattern for distributed transactions: Choreography vs Orchestration.",
    topic: "Messaging & Microservices",
    level: "Experienced",
    type: "Architectural Pattern",
    summary: "Saga manages distributed transactions as a sequence of local transactions with compensating actions. Choreography uses event pub/sub; Orchestration uses a central coordinator.",
    properAnswer: "Traditional 2PC (Two-Phase Commit) locks database rows across microservices, causing performance degradation and deadlocks. The Saga Pattern breaks a global transaction into a series of local microservice transactions. If a step fails, the Saga executes compensating undo transactions in reverse order.\n- **Choreography**: Each microservice listens to events (Kafka/RabbitMQ) and triggers its local transaction independently. Decentralized, but hard to track.\n- **Orchestration**: A central Saga Orchestrator service tells each microservice which local transaction to execute. Easy to monitor, but Orchestrator can become a single point of failure.",
    realWorldExample: "In Uber ride booking, a Saga Orchestrator executes: 1) Reserve Driver -> 2) Hold Credit Card -> 3) Dispatch Driver. If Credit Card hold fails, Orchestrator executes compensating transaction: `Release Driver Reservation`.",
    relatedBlueprint: {
      id: "hld-5",
      title: "Design Uber / Lyft (Saga Pattern Ride Booking & Dispatch)",
      path: "/system-design/hld-5",
      badge: "HLD Blueprint #5"
    },
    interviewLines: [
      "Sagas replace blocking 2PC locks with local transactions paired with compensating rollback actions."
    ],
    keywords: [{ word: "Saga Pattern" }, { word: "Choreography" }, { word: "Orchestration" }, { word: "Compensating Transactions" }]
  },

  {
    id: "sd-q36",
    question: "36. Explain Event Sourcing and CQRS (Command Query Responsibility Segregation).",
    topic: "Messaging & Microservices",
    level: "Experienced",
    type: "Architectural Pattern",
    summary: "Event Sourcing stores state changes as an immutable sequence of events; CQRS decouples write models from read-optimized view stores.",
    properAnswer: "Event Sourcing instead of storing current entity state in a database row, records every state change as an immutable append-only sequence of events (e.g. `AccountCreated`, `MoneyDeposited`, `MoneyWithdrawn`). System state is reconstructed by replaying events. CQRS separates Write operations (Commands) from Read operations (Queries). Writes update the Event Store (e.g. EventStoreDB/Kafka), which streams updates to denormalized Read DBs (e.g. Elasticsearch/Redis) for sub-millisecond queries.",
    realWorldExample: "Banking ledger engines (like Revolut) use Event Sourcing to store every debit/credit event for compliance audits, while CQRS projects current balance views into Redis for instant mobile app loading.",
    relatedBlueprint: {
      id: "hld-7",
      title: "Design News Feed (CQRS Architecture: PostgreSQL Write + Redis Timeline Read)",
      path: "/system-design/hld-7",
      badge: "HLD Blueprint #7"
    },
    interviewLines: [
      "Event Sourcing provides a 100% complete audit log because state is derived by replaying immutable events."
    ],
    keywords: [{ word: "Event Sourcing" }, { word: "CQRS" }, { word: "Immutable Event Log" }]
  },

  {
    id: "sd-q37",
    question: "37. What is the Transactional Outbox Pattern, and why is it necessary?",
    topic: "Messaging & Microservices",
    level: "Experienced",
    type: "Architectural Pattern",
    summary: "Outbox Pattern writes business data AND outbound message events to the same database in a single local transaction, eliminating dual-write inconsistencies.",
    properAnswer: "In microservices, updating a database and publishing a message to Kafka in the same API request suffers from the Dual-Write Problem: if the DB commit succeeds but Kafka network fails, data becomes inconsistent. The Transactional Outbox Pattern solves this by saving the message into an `Outbox` table in the exact same local database ACID transaction. A background process (or Change Data Capture - CDC tool like Debezium) reads the Outbox table and publishes events to Kafka reliably.",
    realWorldExample: "Shopify order processing writes `Order` record and `OutboxEvent` into MySQL in 1 transaction. Debezium CDC tails MySQL binary log (binlog) and pushes order events to Kafka with zero dual-write message loss.",
    relatedBlueprint: {
      id: "hld-4",
      title: "Design Video Streaming (Transactional Outbox for Video Upload Events)",
      path: "/system-design/hld-4",
      badge: "HLD Blueprint #4"
    },
    interviewLines: [
      "Outbox Pattern avoids dual-write failures by persisting outbox messages in the local DB transaction.",
      "CDC engines like Debezium tail the DB WAL log to publish outbox events to Kafka with zero loss."
    ],
    keywords: [{ word: "Transactional Outbox" }, { word: "Dual-Write Problem" }, { word: "Change Data Capture (CDC)" }]
  },

  {
    id: "sd-q38",
    question: "38. Explain the Circuit Breaker Pattern state machine (Closed, Open, Half-Open).",
    topic: "Messaging & Microservices",
    level: "Intermediate",
    type: "Architectural Pattern",
    summary: "Circuit Breakers prevent cascading failures by tripping when downstream services fail, returning fast fallbacks.",
    properAnswer: "A Circuit Breaker (e.g., Resilience4j) wraps network calls to downstream microservices:\n1. **Closed**: Normal state. Requests flow to downstream service. Tracks failure rates.\n2. **Closed -> Open**: If downstream service failure rate exceeds threshold (e.g., >50% errors), circuit trips Open! Requests fail fast with fallback data.\n3. **Half-Open**: After sleep window (e.g. 30s), lets trial requests pass to test recovery.",
    realWorldExample: "Netflix Hystrix / Resilience4j wraps recommendation service calls. If Recommendation service drops, Circuit Breaker trips Open and immediately returns static Top 10 Popular Movies fallbacks, preventing movie playback from failing.",
    relatedBlueprint: {
      id: "hld-4",
      title: "Design Video Streaming (Resilience4j Circuit Breaker for Recommendations)",
      path: "/system-design/hld-4",
      badge: "HLD Blueprint #4"
    },
    interviewLines: [
      "Circuit Breakers prevent degraded downstream dependencies from exhausting thread pools upstream."
    ],
    keywords: [{ word: "Circuit Breaker" }, { word: "Resilience4j" }, { word: "Closed Open Half-Open" }]
  },

  {
    id: "sd-q39",
    question: "39. What is Idempotency, and how do you guarantee idempotent API execution?",
    topic: "Messaging & Microservices",
    level: "Intermediate",
    type: "Coding / Practical",
    summary: "An idempotent operation produces the exact same system state regardless of how many times it is executed with identical parameters.",
    properAnswer: "In distributed networks, requests can retry due to network timeouts (e.g., payment request retries). To prevent double-charging users, APIs must be Idempotent. Clients generate a unique `Idempotency-Key` (UUIDv4) sent in HTTP headers. The backend uses Redis/Database with a unique constraint: if the key exists, return the cached prior response immediately; if not, execute transaction and save result under the key atomically.",
    realWorldExample: "Stripe requires an `Idempotency-Key: key_123` header on `POST /v1/charges`. If a network glitch causes the mobile app to retry the charge 3 times, Stripe processes the charge once and returns the exact same charge ID response.",
    relatedBlueprint: {
      id: "hld-2",
      title: "Design an API Rate Limiter (Idempotency Key Verification Middleware)",
      path: "/system-design/hld-2",
      badge: "HLD Blueprint #2"
    },
    interviewLines: [
      "Clients pass a unique Idempotency-Key header; backends store response payloads in Redis to prevent duplicate processing."
    ],
    keywords: [{ word: "Idempotency" }, { word: "Idempotency Key" }, { word: "At-Least-Once Delivery" }]
  },

  {
    id: "sd-q40",
    question: "40. What is a Service Mesh, and how does the Sidecar Pattern work?",
    topic: "Messaging & Microservices",
    level: "Experienced",
    type: "Architecture",
    summary: "Service Mesh (Istio/Envoy) offloads networking, mTLS security, and telemetry into a proxy container (Sidecar) running alongside application containers.",
    properAnswer: "A Service Mesh (e.g. Istio, Linkerd) handles inter-service communication infrastructure. It uses the Sidecar Pattern: an Envoy proxy container runs in the same Kubernetes pod as the application code. All ingress and egress network traffic is intercepted by the sidecar proxy, which automatically provides Mutual TLS (mTLS) encryption, traffic splitting (Canary deployments), distributed tracing headers, and circuit breaking without code modifications.",
    realWorldExample: "Lyft deployed Envoy sidecars across 500+ microservices, automatically enforcing mutual TLS (mTLS) encryption and gathering p99 latency metrics without developers writing networking code in Java/Python.",
    relatedBlueprint: {
      id: "hld-5",
      title: "Design Uber / Lyft (Istio & Envoy Sidecar Microservice Mesh)",
      path: "/system-design/hld-5",
      badge: "HLD Blueprint #5"
    },
    interviewLines: [
      "Service Mesh decouples microservice networking, mTLS security, and metrics from application business code."
    ],
    keywords: [{ word: "Service Mesh" }, { word: "Sidecar Pattern" }, { word: "Istio" }, { word: "Envoy Proxy" }]
  },

  {
    id: "sd-q41",
    question: "41. What is the Bulkhead Pattern in microservices?",
    topic: "Messaging & Microservices",
    level: "Intermediate",
    type: "Architectural Pattern",
    summary: "Bulkhead isolates resource pools (thread pools/connection pools) so failure in one component does not crash the entire application.",
    properAnswer: "Named after ship bulkheads that seal compartments to prevent total sinking during a hull breach, the Bulkhead Pattern isolates application resources into independent pools. For example, assigning separate thread pools for Payment Service calls vs Recommendation Service calls ensures that if Recommendation Service hangs and exhausts its 20 threads, the Payment Service thread pool remains healthy.",
    realWorldExample: "In Netflix playback engines, recommendation calls are allocated 10 threads while video license verification is allocated 30 threads. Slow recommendations cannot starve license checks.",
    relatedBlueprint: {
      id: "hld-4",
      title: "Design Video Streaming (Bulkhead Thread Pool Segregation)",
      path: "/system-design/hld-4",
      badge: "HLD Blueprint #4"
    },
    interviewLines: [
      "Bulkhead pattern segregates thread pools per downstream service to prevent resource starvation."
    ],
    keywords: [{ word: "Bulkhead Pattern" }, { word: "Resource Isolation" }, { word: "Thread Pool Segregation" }]
  },

  {
    id: "sd-q42",
    question: "42. How does Distributed Tracing work (Jaeger / Zipkin)?",
    topic: "Messaging & Microservices",
    level: "Intermediate",
    type: "Observability",
    summary: "Distributed Tracing injects a unique Trace ID and Span IDs into HTTP/gRPC headers to track requests across microservices.",
    properAnswer: "In a microservice architecture, a single user request traverses dozens of services. Distributed Tracing (OpenTelemetry, Jaeger, Zipkin) tracks this lifecycle by generating a unique `Trace ID` at the ingress API gateway. As the request moves downstream via HTTP headers (W3C Trace Context `traceparent`), each service records a `Span ID` detailing execution start/end time. Tracing backends aggregate these spans into a visual timeline identifying latency bottlenecks.",
    realWorldExample: "Uber uses Jaeger distributed tracing to profile ride requests traversing 40 microservices, instantly pinpointing that a 2-second delay was caused by a slow geospatial query in the Driver Match engine.",
    relatedBlueprint: {
      id: "hld-5",
      title: "Design Uber / Lyft (Jaeger OpenTelemetry Tracing Pipeline)",
      path: "/system-design/hld-5",
      badge: "HLD Blueprint #5"
    },
    interviewLines: [
      "Distributed Tracing uses Trace IDs and Span IDs propagated via HTTP headers to visualize cross-microservice latencies."
    ],
    keywords: [{ word: "Distributed Tracing" }, { word: "Trace ID & Span ID" }, { word: "OpenTelemetry" }]
  },

  // --------------------------------------------------------------------------
  // 6. DISTRIBUTED SYSTEMS RELIABILITY & CONSENSUS (Q43 - Q48)
  // --------------------------------------------------------------------------
  {
    id: "sd-q43",
    question: "43. Explain Redlock and Distributed Locking using Redis vs Zookeeper.",
    topic: "Distributed Reliability",
    level: "Experienced",
    type: "Theory",
    summary: "Distributed Locks synchronize access across cluster nodes. Redlock uses multi-master Redis voting; Zookeeper uses ephemeral sequential nodes.",
    properAnswer: "When multiple microservice instances compete for exclusive resource access, distributed locks are required. **Redlock (Redis)** acquires locks across N independent Redis masters using `SET key uuid NX PX 30000`. If a majority (N/2 + 1) nodes grant the lock, it is acquired. **Apache ZooKeeper** creates Ephemeral Sequential Nodes (`/lock/request-001`). The node with the lowest sequence number holds the lock; others set watches on previous nodes. ZooKeeper locks are more reliable under GC pauses because session heartbeats handle node crashes automatically.",
    realWorldExample: "Flash sale inventory reservation engines use Redis Redlock to ensure that only 1 user successfully claims the final remaining iPhone stock item across 100 API application nodes.",
    relatedBlueprint: {
      id: "hld-2",
      title: "Design an API Rate Limiter (Redis Redlock Distributed Locking)",
      path: "/system-design/hld-2",
      badge: "HLD Blueprint #2"
    },
    interviewLines: [
      "Redis Redlock provides high-speed locking via multi-master quorum; ZooKeeper provides rock-solid lock guarantees via ephemeral sequential nodes."
    ],
    keywords: [{ word: "Distributed Lock" }, { word: "Redis Redlock" }, { word: "ZooKeeper Ephemeral Nodes" }]
  },

  {
    id: "sd-q44",
    question: "44. How does Twitter Snowflake generate unique 64-bit IDs at scale without a central DB?",
    topic: "Distributed Reliability",
    level: "Intermediate",
    type: "System Design Component",
    summary: "Snowflake IDs encode 41-bit Timestamp, 10-bit Worker/Datacenter ID, and 12-bit Sequence counter into a k-ordered 64-bit integer.",
    properAnswer: "Auto-increment IDs in relational databases create a single bottleneck. Twitter Snowflake generates unique 64-bit integers locally in memory across distributed servers without network calls. The 64 bits are structured as:\n- 1 bit: Unused sign bit (0)\n- 41 bits: Epoch timestamp in milliseconds (gives 69 years of IDs)\n- 10 bits: Machine ID (5 bits Datacenter ID + 5 bits Worker ID = 1,024 nodes)\n- 12 bits: Sequence counter per node (supports 4,096 IDs per millisecond per node)",
    realWorldExample: "Twitter and Discord generate 64-bit Snowflake IDs for every tweet and message (`125489765432101234`). Because top bits contain timestamps, database indexes keep tweets sorted chronologically automatically.",
    relatedBlueprint: {
      id: "hld-7",
      title: "Design News Feed (Snowflake 64-bit Tweet ID Generation)",
      path: "/system-design/hld-7",
      badge: "HLD Blueprint #7"
    },
    interviewLines: [
      "Snowflake encodes timestamp, datacenter/worker ID, and sequence bits to generate 64-bit k-ordered IDs locally without database lock calls."
    ],
    keywords: [{ word: "Snowflake ID" }, { word: "Distributed ID Generator" }, { word: "64-bit Integer Layout" }]
  },

  {
    id: "sd-q45",
    question: "45. What is a Bloom Filter, and how does it achieve O(1) membership checks using minimal memory?",
    topic: "Distributed Reliability",
    level: "Intermediate",
    type: "Data Structure",
    summary: "A Bloom Filter is a space-efficient probabilistic data structure that tests if an element is DEFINITELY NOT in a set or PROBABLY IS in a set.",
    properAnswer: "A Bloom Filter consists of a bit array of size M and K independent hash functions. To insert an item, hash it through K functions and set the corresponding bit array indices to 1. To query an item, check if all K bit indices are 1. If any bit is 0, the item is **Definitely Not in the Set** (Zero False Negatives). If all bits are 1, the item **Probably Is in the Set** (Controlled False Positive rate). Uses 99% less RAM memory than HashSets.",
    realWorldExample: "Google Chrome uses Bloom Filters to check if a URL is a known malicious phishing site before opening. Distributed Web Crawlers use 1GB Bloom Filters to verify if 1 Billion URLs have already been crawled.",
    relatedBlueprint: {
      id: "hld-6",
      title: "Design Distributed Web Crawler (Bloom Filter URL Deduplication)",
      path: "/system-design/hld-6",
      badge: "HLD Blueprint #6"
    },
    interviewLines: [
      "Bloom Filters guarantee ZERO False Negatives: if it says no, the item definitely does not exist."
    ],
    keywords: [{ word: "Bloom Filter" }, { word: "Probabilistic Data Structure" }, { word: "Zero False Negatives" }]
  },

  {
    id: "sd-q46",
    question: "46. Explain Raft Consensus Protocol: Leader Election, Log Replication, and Safety.",
    topic: "Distributed Reliability",
    level: "Experienced",
    type: "Consensus",
    summary: "Raft elects a single leader via randomized election timers. The leader accepts client writes, appends to log, and replicates to follower majority.",
    properAnswer: "Raft is an understandable consensus algorithm for managing replicated logs across cluster nodes:\n1. **Leader Election**: Nodes exist in Follower, Candidate, or Leader states. If followers miss heartbeats, randomized election timers trigger candidates to request votes. Node receiving majority votes becomes Leader.\n2. **Log Replication**: Leader receives commands, appends to log, and broadcasts `AppendEntries` RPC to followers. Once majority acknowledge, leader commits command and notifies followers.",
    realWorldExample: "etcd (the distributed key-value store powering Kubernetes cluster state) uses Raft consensus to guarantee that all master nodes agree on pod deployments and config state.",
    relatedBlueprint: {
      id: "hld-6",
      title: "Design Distributed Web Crawler (Raft Consensus for Master Scheduler)",
      path: "/system-design/hld-6",
      badge: "HLD Blueprint #6"
    },
    interviewLines: [
      "Raft achieves consensus via Leader Election, Log Replication, and Majority Quorum voting."
    ],
    keywords: [{ word: "Raft Consensus" }, { word: "Leader Election" }, { word: "Log Replication" }]
  },

  {
    id: "sd-q47",
    question: "47. What is the Gossip Protocol, and how does it manage cluster membership in Cassandra?",
    topic: "Distributed Reliability",
    level: "Experienced",
    type: "Internal Working",
    summary: "Gossip Protocol is a decentralized peer-to-peer communication mechanism where nodes periodically exchange cluster state with random neighbors.",
    properAnswer: "In masterless distributed clusters (like Apache Cassandra), there is no central server to track node health. The Gossip Protocol operates peer-to-peer: every second, each node picks a small number of random neighbor nodes and exchanges node state digests (heartbeat sequence numbers, IP addresses, ring tokens). Information spreads exponentially across the cluster in O(log N) rounds, enabling automatic node discovery and failure detection without a central coordinator.",
    realWorldExample: "Cassandra clusters of 1,000 nodes use Gossip protocol to detect dead nodes within 1-2 seconds without needing a central ZooKeeper coordinator.",
    relatedBlueprint: {
      id: "hld-3",
      title: "Design WhatsApp / Telegram (Cassandra Gossip Protocol Ring)",
      path: "/system-design/hld-3",
      badge: "HLD Blueprint #3"
    },
    interviewLines: [
      "Gossip Protocol spreads node health and cluster state metadata exponentially across peer-to-peer nodes in O(log N) time."
    ],
    keywords: [{ word: "Gossip Protocol" }, { word: "Peer-to-Peer Cluster" }, { word: "Failure Detection" }]
  },

  {
    id: "sd-q48",
    question: "48. What are Vector Clocks, and how do they resolve concurrent write conflicts?",
    topic: "Distributed Reliability",
    level: "Experienced",
    type: "Theory",
    summary: "Vector Clocks assign a dictionary of (Node, Counter) pairs to data items to detect causality and concurrent write conflicts.",
    properAnswer: "In distributed systems without synchronized physical clocks, Vector Clocks capture causal relationships between events. A Vector Clock is an array/map of counters `[Node_A: 2, Node_B: 1]`. When a node updates a key, it increments its own counter. If Clock X dominates Clock Y across all node counters, X causally succeeded Y. If neither clock dominates, a concurrent write conflict occurred, prompting application-level merge or Last-Write-Wins (LWW) resolution.",
    realWorldExample: "Amazon Shopping Cart (Dynamo) uses Vector Clocks. If a user adds an item on their phone while removing an item on their laptop offline, Vector Clocks flag concurrent branch conflicts so the shopping cart merges both items upon re-connecting.",
    relatedBlueprint: {
      id: "hld-3",
      title: "Design WhatsApp / Telegram (Vector Clock Conflict Resolution)",
      path: "/system-design/hld-3",
      badge: "HLD Blueprint #3"
    },
    interviewLines: [
      "Vector Clocks detect causality and concurrent conflicting writes in distributed databases."
    ],
    keywords: [{ word: "Vector Clocks" }, { word: "Causality Tracking" }, { word: "Conflict Resolution" }]
  },

  // --------------------------------------------------------------------------
  // 7. REAL-WORLD SYSTEM DESIGN TOPIC DEEP-DIVES (Q49 - Q55)
  // --------------------------------------------------------------------------
  {
    id: "sd-q49",
    question: "49. TinyURL: How does Key Generation Service (KGS) eliminate runtime hash collisions?",
    topic: "Real-World HLD",
    level: "Intermediate",
    type: "Architecture",
    summary: "KGS pre-generates 6-character Base62 keys offline and maintains two database tables (used & unused), serving keys to app servers in memory buffers.",
    properAnswer: "Generating short URLs using runtime MD5/Base62 encoding of long URLs creates hash collisions that require database lookup loops. The Key Generation Service (KGS) eliminates this completely by pre-generating 6-character Base62 keys offline (62^6 = 56.8 Billion unique keys) and storing them in two tables: `UnusedKeys` and `UsedKeys`. KGS loads key blocks into app server RAM memory buffers. When a user requests a short URL, the app server assigns a pre-generated key instantly from memory buffer in O(1) time without runtime hashing or database lock loops.",
    realWorldExample: "Bitly and TinyURL pre-allocate blocks of 5,000 Base62 keys into app server memory buffers (`aB3x9Z`). URL creation completes in sub-5ms without touching disk.",
    relatedBlueprint: {
      id: "hld-1",
      title: "Design TinyURL (Full Key Generation Service HLD Blueprint)",
      path: "/system-design/hld-1",
      badge: "HLD Blueprint #1"
    },
    interviewLines: [
      "KGS pre-generates Base62 keys offline, allowing app servers to pop unique keys from RAM buffers with zero collision checks."
    ],
    keywords: [{ word: "Key Generation Service (KGS)" }, { word: "Base62 Encoding" }, { word: "Offline Key Buffer" }]
  },

  {
    id: "sd-q50",
    question: "50. API Rate Limiter: How do you handle multi-datacenter synchronization without latency spikes?",
    topic: "Real-World HLD",
    level: "Experienced",
    type: "Architecture",
    summary: "Use local edge Redis rate limiters for fast sub-millisecond enforcement, combined with async global counter synchronization batching.",
    properAnswer: "Executing synchronous cross-datacenter Redis calls on every API request adds 100ms+ network latency. To enforce rate limits globally across regions: 1) Deploy local Redis clusters in each region for sub-millisecond local rate check. 2) Local instances maintain rate counter limits. 3) Background sync threads asynchronously batch local usage deltas across region Redis clusters using Kafka or Redis Pub/Sub. Minor temporary over-budget leeway is accepted to keep global API latency under 5ms.",
    realWorldExample: "Cloudflare and Stripe evaluate rate limits locally in 200+ edge data centers in <1ms, syncing usage counter deltas asynchronously globally to prevent global network latency penalties.",
    relatedBlueprint: {
      id: "hld-2",
      title: "Design an API Rate Limiter (Full Multi-Region Distributed Limiter HLD)",
      path: "/system-design/hld-2",
      badge: "HLD Blueprint #2"
    },
    interviewLines: [
      "Perform sub-millisecond rate limit checks against regional Redis clusters, syncing counter deltas asynchronously globally."
    ],
    keywords: [{ word: "Multi-datacenter Rate Limiting" }, { word: "Local Edge Redis" }, { word: "Async Counter Sync" }]
  },

  {
    id: "sd-q51",
    question: "51. WhatsApp: How does the Presence Service handle 500M user heartbeat status updates efficiently?",
    topic: "Real-World HLD",
    level: "Experienced",
    type: "Architecture",
    summary: "Clients send periodic WebSocket heartbeats. Presence Service updates Redis key TTLs. Expiration triggers offline state.",
    properAnswer: "500M active users sending status updates directly to database would crash storage. WhatsApp handles presence via ephemeral Redis key expiration: 1) Active mobile clients send a lightweight TCP heartbeat every 5 seconds. 2) Presence Service sets Redis key `presence:user_123 = ONLINE` with a 10-second TTL (`SET key val EX 10`). 3) As long as heartbeats arrive, TTL resets. 4) If client loses signal or app closes, Redis TTL expires, triggering a Pub/Sub event notifying friends that user is offline.",
    realWorldExample: "Discord and WhatsApp run in-memory Redis clusters managing 500 Million active user presence heartbeats using ephemeral key TTL expirations.",
    relatedBlueprint: {
      id: "hld-3",
      title: "Design WhatsApp / Telegram (Full Presence Service & WebSockets HLD)",
      path: "/system-design/hld-3",
      badge: "HLD Blueprint #3"
    },
    interviewLines: [
      "Presence status is managed via Redis keys with short TTLs refreshed by client TCP heartbeats."
    ],
    keywords: [{ word: "WhatsApp Presence" }, { word: "Redis TTL Expiration" }, { word: "Heartbeat Protocol" }]
  },

  {
    id: "sd-q52",
    question: "52. YouTube: How does the Video Transcoding Pipeline process uploaded 4K raw videos asynchronously?",
    topic: "Real-World HLD",
    level: "Experienced",
    type: "Architecture",
    summary: "Raw video uploads to S3 trigger Kafka event. Transcoding workers split video into chunks and encode into HLS resolution variants (1080p, 720p, 480p).",
    properAnswer: "Uploading a 4K video raw file takes gigabytes of storage and cannot be streamed directly. The architecture executes async pipeline: 1) Client uploads raw video directly to S3 bucket via presigned URL. 2) S3 upload completion fires an S3 Event Notification to a Kafka topic. 3) Video Preprocessor splits video into 10-second GOP (Group of Pictures) chunks. 4) Auto-scaling worker nodes (FFmpeg) encode chunks in parallel into HLS (.m3u8 index file + .ts segment files) across resolutions (1080p, 720p, 480p, 360p). 5) Transcoded segments push to Cloudflare CDN edge nodes.",
    realWorldExample: "YouTube and Netflix transcode 500 hours of video uploaded every minute using distributed Kubernetes worker pools running parallelized FFmpeg encoder tasks.",
    relatedBlueprint: {
      id: "hld-4",
      title: "Design Video Streaming (Full Transcoding Pipeline & HLS HLD)",
      path: "/system-design/hld-4",
      badge: "HLD Blueprint #4"
    },
    interviewLines: [
      "Async pipeline: Presigned S3 upload -> Kafka notification -> Video chunking -> Parallel FFmpeg transcoding -> CDN edge cache."
    ],
    keywords: [{ word: "Video Transcoding Pipeline" }, { word: "HLS Protocol (.m3u8)" }, { word: "Parallel FFmpeg Workers" }]
  },

  {
    id: "sd-q53",
    question: "53. Uber: Why did Uber adopt Hexagonal Spatial Indexing (Uber H3) over traditional QuadTrees?",
    topic: "Real-World HLD",
    level: "Experienced",
    type: "Architecture",
    summary: "Uber H3 partitions the globe into hexagonal cells where all 6 neighbor centroids are at exact equal distance, enabling O(1) lookup without tree lock contention.",
    properAnswer: "QuadTrees and Geohashes partition map areas into square grids. Square grids have a major flaw: diagonal neighbor centroids are 1.414x (√2) further away than cardinal neighbors, causing inaccurate radius searches. Uber H3 partitions earth into a hierarchical hexagonal grid. Hexagons have 6 neighbors that are all at the exact same centroid distance. Furthermore, Lat/Long coordinates convert directly to a 64-bit H3 cell integer index in memory, allowing O(1) k-ring neighbor lookups without lock contention or spatial tree node rebalancing.",
    realWorldExample: "Uber dispatches drivers by converting rider lat/long to H3 Hexagon Resolution 8 (`8828308281fffff`). The dispatch engine fetches all drivers in the k-ring 1 neighbor hexagons in O(1) memory time.",
    relatedBlueprint: {
      id: "hld-5",
      title: "Design Uber / Lyft (Full Geospatial H3 & Dispatch Engine HLD)",
      path: "/system-design/hld-5",
      badge: "HLD Blueprint #5"
    },
    interviewLines: [
      "Uber H3 Hexagons ensure equal distance to all 6 neighbor centroids, eliminating square grid diagonal distance distortion."
    ],
    keywords: [{ word: "Uber H3 Hexagonal Grid" }, { word: "Equal Centroid Distance" }, { word: "Geospatial Indexing" }]
  },

  {
    id: "sd-q54",
    question: "54. Distributed Web Crawler: How does the URL Frontier enforce Domain Politeness and Bloom Filter deduplication?",
    topic: "Real-World HLD",
    level: "Experienced",
    type: "Architecture",
    summary: "URL Frontier uses FIFO queues mapped per host domain to delay requests; Bloom Filters prevent duplicate URL crawls in O(1) RAM.",
    properAnswer: "Crawling millions of pages can unintentionally launch a Distributed Denial of Service (DDoS) attack against target servers. The URL Frontier solves this using a two-tier queue structure: 1) Priority Queues order URLs by importance/PageRank. 2) Politeness Queues map unique host domains (e.g., wikipedia.org) to dedicated FIFO queues with a delayed worker execution policy (e.g. max 1 req / 500ms per host). Before inserting new links, a 1GB in-memory Bloom Filter checks if URL was previously crawled in O(1) time with zero disk reads.",
    realWorldExample: "Googlebot uses URL Frontier politeness queues to respect target website `robots.txt` rate caps, preventing search indexing spiders from overwhelming web servers.",
    relatedBlueprint: {
      id: "hld-6",
      title: "Design Distributed Web Crawler (Full URL Frontier & Politeness HLD)",
      path: "/system-design/hld-6",
      badge: "HLD Blueprint #6"
    },
    interviewLines: [
      "URL Frontier uses domain-mapped politeness queues to rate-limit crawls per domain, avoiding target site crashes."
    ],
    keywords: [{ word: "URL Frontier" }, { word: "Domain Politeness Policy" }, { word: "Bloom Filter Deduplication" }]
  },

  {
    id: "sd-q55",
    question: "55. Twitter / Instagram News Feed: How does Hybrid Fan-out architecture balance celebrity write amplification?",
    topic: "Real-World HLD",
    level: "Experienced",
    type: "Architecture",
    summary: "Use Push model (Fan-out on Write) for regular users; use Pull model (Fan-out on Read) for celebrity users (>10k followers) to prevent write storms.",
    properAnswer: "In social networks, Fan-out on Write (Push) pushes a new post ID into all follower Redis timeline caches (`ZADD timeline:user_id`). This works great for normal users, but if a celebrity with 100 Million followers posts, Push mode triggers 100 Million simultaneous Redis write operations (Write Amplification disaster!). The solution is Hybrid Fan-out: 1) Regular users (<10k followers) use Push model to pre-compute follower feeds in Redis. 2) Celebrity users (>10k followers) use Pull model: celebrity posts are NOT pushed. When a user opens their timeline, the app fetches their pre-computed Redis feed AND pulls latest posts from celebrities they follow, merging them on the fly.",
    realWorldExample: "Twitter and Instagram use Hybrid Fan-out. When Elon Musk tweets, it is NOT fan-out pushed to 180M followers. Instead, followers pull his tweets on-the-fly when opening their feed.",
    relatedBlueprint: {
      id: "hld-7",
      title: "Design News Feed (Full Hybrid Fan-out Architecture HLD)",
      path: "/system-design/hld-7",
      badge: "HLD Blueprint #7"
    },
    interviewLines: [
      "Hybrid Fan-out uses Push for regular users and Pull for celebrity accounts (>10k followers) to eliminate write amplification."
    ],
    keywords: [{ word: "Hybrid Fan-out" }, { word: "Fan-out on Write vs Read" }, { word: "Celebrity Write Amplification" }]
  }
];
