export const SYSTEM_DESIGN_DOMAINS = [
  {
    id: "hld",
    name: "High-Level Design (HLD)",
    desc: "Architect scalable distributed systems: TinyURL, Rate Limiter, WhatsApp Chat, Netflix Video Streaming, Uber & Web Crawler.",
    icon: "Network",
    badge: "Architecture",
    color: "text-blue-500 font-bold",
    questionCount: 8,
    tags: ["TinyURL", "Rate Limiter", "WhatsApp", "Netflix", "Uber", "Web Crawler"]
  },
  {
    id: "lld",
    name: "Low-Level Design (LLD) & OOD",
    desc: "Design Patterns (GoF), SOLID Principles, Object-Oriented Schema Design, Elevator Control, Parking Lot & Notification Systems.",
    icon: "Cpu",
    badge: "Object-Oriented",
    color: "text-purple-500 font-bold",
    questionCount: 6,
    tags: ["Elevator OOD", "Parking Lot", "Design Patterns", "SOLID", "Tic-Tac-Toe"]
  },
  {
    id: "patterns",
    name: "Architectural & System Patterns",
    desc: "Catalog of essential system patterns: Circuit Breaker, CQRS, Event Sourcing, Cache-Aside, Outbox, Bulkhead & Sidecar.",
    icon: "Zap",
    badge: "Design Patterns",
    color: "text-indigo-500 font-bold",
    questionCount: 12,
    tags: ["Circuit Breaker", "CQRS", "Event Sourcing", "Cache-Aside", "Bulkhead", "Sidecar"]
  },
  {
    id: "interview-qa",
    name: "System Design Interview Q&A",
    desc: "Fundamental trade-offs: CAP Theorem, PACELC, Load Balancing (L4 vs L7), Database Sharding, and Replication Latency.",
    icon: "BookOpen",
    badge: "Core Q&A",
    color: "text-amber-500 font-bold",
    questionCount: 55,
    tags: ["CAP Theorem", "PACELC", "Load Balancers", "Sharding", "Read Replicas"]
  },
  {
    id: "distributed-storage",
    name: "Distributed Storage & DBs",
    desc: "SQL vs NoSQL trade-offs, ACID vs BASE, Consistent Hashing, Redis In-Memory Eviction (LRU/LFU) & Consensus Protocols.",
    icon: "Database",
    badge: "Data Layer",
    color: "text-emerald-500 font-bold",
    questionCount: 7,
    tags: ["Consistent Hashing", "Cassandra", "Redis LRU", "Raft Consensus", "NoSQL"]
  },
  {
    id: "microservices",
    name: "Microservices & Cloud Patterns",
    desc: "Saga Pattern (Choreography vs Orchestration), CQRS, Service Mesh, Circuit Breakers, Rate Limiting & Outbox Pattern.",
    icon: "Server",
    badge: "Microservices",
    color: "text-orange-500 font-bold",
    questionCount: 6,
    tags: ["Saga Pattern", "CQRS", "Outbox Pattern", "Event-Driven", "Kafka"]
  },
  {
    id: "security-api",
    name: "API & Security Architecture",
    desc: "API Gateway design, OAuth 2.0 / OIDC Authorization, JWT Token Revocation, TLS Handshakes & DDoS Protection.",
    icon: "ShieldCheck",
    badge: "API & Security",
    color: "text-rose-500 font-bold",
    questionCount: 5,
    tags: ["OAuth 2.0", "JWT Revocation", "API Gateway", "TLS 1.3", "Rate Limit"]
  }
];

export const SYSTEM_DESIGN_TOPICS = [
  // --- Architectural & System Patterns ---
  {
    id: "pattern-1",
    title: "Circuit Breaker Pattern",
    category: "Architectural & System Patterns",
    difficulty: "Medium",
    companies: ["Netflix", "Amazon", "Uber", "Microsoft"],
    summary: "Prevent cascading failures in distributed systems by failing fast when downstream services are degraded (Closed -> Open -> Half-Open).",
    readTime: "10 min read",
    architecture: {
      client: "API Gateway / Service Client",
      states: ["Closed (Normal operation)", "Open (Tripped - immediate error)", "Half-Open (Testing recovery)"],
      library: "Resilience4j / Netflix Hystrix"
    },
    keyConcepts: [
      "Failure Rate Threshold (e.g., >50% failure in 10s trips the circuit)",
      "Fallback Mechanism (returning cached or default data)",
      "Half-Open state testing with limited probe requests"
    ],
    detailedGuide: `### Circuit Breaker State Machine
1. **Closed**: Normal traffic flow. Requests are passed to downstream service.
2. **Open**: Downstream service failed repeatedly. Requests trip breaker and immediately return fallback response without hitting network.
3. **Half-Open**: After sleep window (e.g. 30s), breaker allows trial requests.`
  },
  {
    id: "pattern-2",
    title: "CQRS Pattern (Command Query Responsibility Segregation)",
    category: "Architectural & System Patterns",
    difficulty: "Hard",
    companies: ["Microsoft", "AWS", "Salesforce"],
    summary: "Separate read operations (Queries) from write operations (Commands) using independent data models and databases optimized for performance.",
    readTime: "12 min read",
    architecture: {
      writeSide: "Command API -> Relational DB (Normalized for ACID)",
      sync: "Event Bus (Kafka / CDC)",
      readSide: "Query API -> Elasticsearch / Redis (Denormalized)"
    },
    keyConcepts: [
      "Decoupling Write models (ACID, normalized) from Read models (fast, denormalized)",
      "Eventual Consistency between Write DB and Read DB"
    ],
    detailedGuide: `### Why CQRS?
In high-scale systems, read patterns differ vastly from write patterns. CQRS allows scaling read replicas independently.`
  },

  // --- High-Level Design (HLD) ---
  {
    id: "hld-1",
    title: "Design a URL Shortener (TinyURL)",
    category: "High-Level Design (HLD)",
    difficulty: "Medium",
    companies: ["Google", "Amazon", "Microsoft", "Uber", "Meta"],
    summary: "Convert long URLs to short 6-7 character strings using Base62 encoding, KGS (Key Generation Service), and Redis Caching.",
    readTime: "12 min read",
    architecture: {
      client: "Web/Mobile Client",
      gateway: "API Gateway (Rate Limiter)",
      services: ["URL Shortening Service", "KGS (Key Gen Service)"],
      cache: "Redis / Memcached (LRU Eviction)",
      database: "Cassandra / MongoDB (NoSQL Key-Value Store)"
    },
    keyConcepts: [
      "Base62 Encoding vs MD5/SHA-256 Hashing",
      "Key Generation Service (KGS) pre-allocating keys in memory",
      "Redis LRU cache for 20% hot links handling 80% traffic",
      "Database Sharding by short key hash"
    ],
    detailedGuide: `### System Requirements
1. **Functional**: Shorten long URL to unique alias, redirect short URL with HTTP 301/302.
2. **Non-Functional**: High Availability (99.99%), Low Latency (<50ms).`
  },

  // --- Low-Level Design (LLD) & OOD ---
  {
    id: "lld-1",
    title: "LLD: TinyURL Key Generation & Storage Engine",
    category: "Low-Level Design (LLD) & OOD",
    difficulty: "Medium",
    companies: ["Google", "Amazon", "Meta", "Uber"],
    summary: "OOD Class Diagram, PostgreSQL ER Schema, Base62 Encoder Strategy, and REST API specification for TinyURL.",
    readTime: "10 min read",
    keyConcepts: [
      "KeyGenerationService Singleton Buffer",
      "Base62 Encoding Strategy",
      "PostgreSQL url_mappings & kgs_keys ER Tables",
      "REST POST /api/v1/data/shorten Endpoint Specs"
    ]
  },
  {
    id: "lld-2",
    title: "LLD: Distributed API Rate Limiter Engine",
    category: "Low-Level Design (LLD) & OOD",
    difficulty: "Medium",
    companies: ["Stripe", "Cloudflare", "Shopify", "AWS"],
    summary: "Token Bucket & Sliding Window Log Classes, Redis Lua Script Execution, and Middleware Interceptor.",
    readTime: "12 min read",
    keyConcepts: [
      "TokenBucketStrategy Class",
      "RateLimiterMiddleware Interceptor",
      "Atomic Redis Lua Execution",
      "HTTP 429 Retry-After Headers"
    ]
  },
  {
    id: "lld-3",
    title: "LLD: WhatsApp WebSocket Chat & Presence Engine",
    category: "Low-Level Design (LLD) & OOD",
    difficulty: "Hard",
    companies: ["Meta", "Telegram", "Discord", "Slack"],
    summary: "WebSocket Session Manager, Message Packet Parser, Cassandra Partitioned Message Log & Redis Presence Heartbeat.",
    readTime: "15 min read",
    keyConcepts: [
      "WebSocketSessionManager Session Registry",
      "Binary Protobuf MessagePacket",
      "Cassandra Columnar Messages Table",
      "Redis Ephemeral TTL Presence Key"
    ]
  },
  {
    id: "lld-4",
    title: "LLD: Video Transcoding Pipeline & HLS Playlist Engine",
    category: "Low-Level Design (LLD) & OOD",
    difficulty: "Hard",
    companies: ["YouTube", "Netflix", "Twitch"],
    summary: "Chunk Splitter, FFmpeg Encoder Worker, HLS Manifest Builder & Presigned S3 Upload Contract.",
    readTime: "15 min read",
    keyConcepts: [
      "TranscodingTask Job Entity",
      "HlsPlaylistBuilder .m3u8 Generator",
      "PostgreSQL videos ER Schema",
      "Presigned S3 Upload Endpoints"
    ]
  },
  {
    id: "lld-5",
    title: "LLD: Uber Geospatial H3 Index & Driver Matching Engine",
    category: "Low-Level Design (LLD) & OOD",
    difficulty: "Hard",
    companies: ["Uber", "Lyft", "Grab", "DoorDash"],
    summary: "Hexagonal H3 Spatial Cell Indexing, Driver State Machine, and Dispatch Strategy Pattern.",
    readTime: "14 min read",
    keyConcepts: [
      "DriverLocation H3 Spatial Point",
      "SpatialMatchEngine Radius Search",
      "PostgreSQL trips ER Table",
      "POST /api/v1/rides/request Contract"
    ]
  },
  {
    id: "lld-6",
    title: "LLD: Web Crawler URL Frontier & HTML Extractor",
    category: "Low-Level Design (LLD) & OOD",
    difficulty: "Hard",
    companies: ["Google", "Microsoft", "Baidu"],
    summary: "Politeness Queue Manager, Bloom Filter Deduplicator, Robots.txt Parser & Raw HTML Persistence.",
    readTime: "14 min read",
    keyConcepts: [
      "DomainPolitenessQueueManager Rate Limiter",
      "BloomFilterDeduplicator Bit Array",
      "Cassandra crawled_pages ER Table",
      "POST /api/v1/crawler/seed Endpoint"
    ]
  },
  {
    id: "lld-7",
    title: "LLD: Social News Feed Fan-out & Timeline Engine",
    category: "Low-Level Design (LLD) & OOD",
    difficulty: "Hard",
    companies: ["Twitter", "Instagram", "Meta"],
    summary: "Hybrid Fan-out Processor, Redis Timeline ZSET Cache & Celebrity Pull Aggregator.",
    readTime: "14 min read",
    keyConcepts: [
      "HybridFanoutEngine Strategy",
      "TimelineFeedAggregator Redis Fetcher",
      "PostgreSQL posts ER Schema",
      "GET /api/v1/feed/user/{id} Contract"
    ]
  },
  {
    id: "lld-8",
    title: "LLD: Parking Lot Management System (OOD Classic)",
    category: "Low-Level Design (LLD) & OOD",
    difficulty: "Medium",
    companies: ["Amazon", "Google", "Microsoft", "Uber"],
    summary: "Vehicle Inheritance, Spot Allocation Strategy, Multi-Floor Billing Engine & Ticket Gate Handlers.",
    readTime: "12 min read",
    keyConcepts: [
      "Vehicle Abstract Class & Concrete Subclasses",
      "ParkingSpot Assignment & Hourly Pricing Strategy",
      "parking_tickets MySQL ER Schema",
      "POST /api/v1/parking/entry Endpoint"
    ]
  },
  {
    id: "lld-9",
    title: "LLD: Elevator Control System (OOD Classic)",
    category: "Low-Level Design (LLD) & OOD",
    difficulty: "Hard",
    companies: ["Amazon", "Google", "Microsoft", "Goldman Sachs"],
    summary: "Elevator Car State Machine, Dispatcher Algorithm (LOOK/SCAN), Floor Hall Buttons & Request Queues.",
    readTime: "13 min read",
    keyConcepts: [
      "ElevatorCar State Machine (Idle, Moving Up, Down)",
      "ElevatorController LOOK/SCAN Scheduler",
      "Multi-car Hall Request Dispatcher",
      "POST /api/v1/elevator/request Endpoint"
    ]
  },
  {
    id: "lld-10",
    title: "LLD: LRU / LFU Thread-Safe Cache Engine",
    category: "Low-Level Design (LLD) & OOD",
    difficulty: "Medium",
    companies: ["Meta", "Google", "Amazon", "Apple"],
    summary: "DoublyLinkedList Nodes, ConcurrentHashMap Index, ReentrantReadWriteLock & O(1) Eviction Policy.",
    readTime: "12 min read",
    keyConcepts: [
      "DoublyLinkedList Node Pointers",
      "ConcurrentHashMap for O(1) Get/Put",
      "ReentrantReadWriteLock Thread Safety",
      "O(1) Eviction Policy Execution"
    ]
  },

  {
    id: "hld-2",
    title: "Design an API Rate Limiter",
    category: "High-Level Design (HLD)",
    difficulty: "Medium",
    companies: ["Stripe", "Twitter", "Google", "AWS"],
    summary: "Control API traffic using Token Bucket, Leaky Bucket, Fixed Window Counter, and Sliding Window Log algorithms with Redis Lua scripts.",
    readTime: "15 min read",
    architecture: {
      client: "Client App",
      gateway: "Rate Limiter Middleware / Envoy Proxy",
      cache: "Distributed Redis Cluster (INCR & EXPIRE / Sorted Sets)",
      database: "Rules Storage (S3 / DB Config)"
    },
    keyConcepts: [
      "Token Bucket Algorithm (refill rate & capacity)",
      "Sliding Window Counter using Redis Sorted Sets (ZADD, ZREMRANGEBYSCORE)",
      "Race conditions in distributed counters solved via Lua Scripts",
      "HTTP Headers: X-Ratelimit-Remaining, X-Ratelimit-Retry-After"
    ],
    detailedGuide: `### Rate Limiter Overview
Control incoming traffic to protect backend services from starvation, brute-force attacks, and DDoS spikes.`
  },
  {
    id: "hld-3",
    title: "Design a Chat Application (WhatsApp / Telegram)",
    category: "High-Level Design (HLD)",
    difficulty: "Hard",
    companies: ["Meta", "Telegram", "Discord", "Slack"],
    summary: "Real-time 1-on-1 and Group messaging using WebSockets, Cassandra Message Store, User Presence Service, and End-to-End Encryption.",
    readTime: "20 min read",
    architecture: {
      gateway: "WebSocket Gateway (Long-lived TCP Connections)",
      presence: "Redis Key-Value with Heartbeat TTL",
      messageStore: "Apache Cassandra (Clustered by Partition Key chat_id)",
      notifications: "Push Notification Service (APNS / FCM)"
    },
    keyConcepts: [
      "WebSockets for full-duplex real-time communication",
      "Cassandra Columnar DB for high write throughput",
      "Presence Service using Redis Key expiration heartbeats",
      "Signal Protocol for End-to-End Encryption (E2EE)"
    ],
    detailedGuide: `### Real-time Messaging
1. Client connects via WebSocket Gateway.
2. Messages saved to Cassandra with composite key \`(chat_id, message_id)\`.`
  },
  {
    id: "hld-4",
    title: "Design a Video Streaming Platform (YouTube / Netflix)",
    category: "High-Level Design (HLD)",
    difficulty: "Hard",
    companies: ["Google", "Netflix", "Amazon", "Disney+"],
    summary: "Video Upload processing pipeline, Transcoding (HLS/DASH), CDN caching, and Adaptive Bitrate Streaming.",
    readTime: "22 min read",
    architecture: {
      storage: "Amazon S3 (Raw Video) + CDN (Edge Cache)",
      transcoding: "Distributed Transcoding Workers (FFmpeg / AWS Elemental)",
      metadata: "PostgreSQL / DynamoDB (Video Info & Comments)"
    },
    keyConcepts: [
      "Adaptive Bitrate Streaming (HLS / MPEG-DASH)",
      "CDN Edge Server Caching for popular video chunks (.ts files)",
      "Blob Storage + Event Notification for asynchronous transcoding"
    ],
    detailedGuide: `### Video Transcoding Pipeline
Raw video uploaded to S3 triggers async workers to transcode into 1080p, 720p, 480p chunks.`
  },
  {
    id: "hld-5",
    title: "Design Uber / Lyft (Ride Sharing & Location Tracking)",
    category: "High-Level Design (HLD)",
    difficulty: "Hard",
    companies: ["Uber", "Lyft", "Grab", "DoorDash"],
    summary: "Geospatial indexing (QuadTree / Uber H3 / Google S2), real-time driver location tracking, and driver-rider matching.",
    readTime: "20 min read",
    architecture: {
      locationService: "Driver Location Service (WebSockets / UDP)",
      geospatialIndex: "Redis Geospatial (GEOADD) / Uber H3 Hexagonal Grid",
      matchingService: "Driver Match Engine (Ring Buffer Queue)"
    },
    keyConcepts: [
      "Geospatial Indexing (QuadTree vs Geohash vs Uber H3 Hexagons)",
      "Real-time location updates every 4 seconds from driver phones",
      "Consistent Hashing for Driver Location Servers"
    ],
    detailedGuide: `### Geospatial Indexing
Dividing map into Hexagonal cells (Uber H3) allows O(1) lookup of nearby drivers within k-ring radius.`
  },
  {
    id: "hld-6",
    title: "Design a Distributed Web Crawler",
    category: "High-Level Design (HLD)",
    difficulty: "Hard",
    companies: ["Google", "Bing", "DuckDuckGo", "Baidu"],
    summary: "Scalable URL Frontier queue, DNS Resolver caching, HTML Downloader, Bloom Filters for deduplication, and politeness policies.",
    readTime: "18 min read",
    architecture: {
      frontier: "URL Frontier Queue (Priority & Politeness Queues)",
      fetcher: "Async HTML Fetcher (Libcurl / Netty)",
      dedup: "Bloom Filter (In-memory URL hash check)",
      storage: "HDFS / Amazon S3 (Raw HTML Data)"
    },
    keyConcepts: [
      "Politeness Policy (limiting requests per domain to prevent DDoS)",
      "Bloom Filters for O(1) duplicate URL detection with zero false negatives",
      "DNS Caching to eliminate DNS resolution bottlenecks"
    ],
    detailedGuide: `### URL Frontier Architecture
Maintains host-specific queues to enforce politeness delays (e.g. 1 request / 500ms per domain).`
  },
  {
    id: "hld-7",
    title: "Design News Feed / Social Timeline (Twitter / Instagram)",
    category: "High-Level Design (HLD)",
    difficulty: "Hard",
    companies: ["Meta", "Twitter", "LinkedIn", "TikTok"],
    summary: "Fan-out on Write (Push model) vs Fan-out on Read (Pull model) for celebrity users, timeline generation, and Redis caching.",
    readTime: "18 min read",
    architecture: {
      feedService: "Timeline Service (Redis Sorted Sets)",
      fanoutService: "Async Fan-out Workers (RabbitMQ / Kafka)",
      storage: "User Graph DB (Neo4j / Cassandra)"
    },
    keyConcepts: [
      "Fan-out on Write (Push) for normal users: write to all followers' inbox feeds",
      "Fan-out on Read (Pull) for celebrity users (>1M followers) to avoid write amplification",
      "Hybrid Fan-out Model"
    ],
    detailedGuide: `### Hybrid Fan-out Strategy
Normal users push posts to followers. Celebrity posts are pulled asynchronously during timeline requests.`
  },

  // --- Low-Level Design (LLD / OOD) ---
  {
    id: "lld-1",
    title: "Design Elevator System (OOD / LLD)",
    category: "Low-Level Design (LLD)",
    difficulty: "Medium",
    companies: ["Amazon", "Microsoft", "Google", "Flipkart"],
    summary: "Object-Oriented Design for Elevator Control System utilizing State Pattern, Strategy Pattern, and Dispatcher Algorithms.",
    readTime: "14 min read",
    architecture: {
      components: ["ElevatorController", "ElevatorCar", "InternalButton", "ExternalButton", "Display"],
      patterns: ["State Pattern (Idle, Moving_Up, Moving_Down)", "Strategy Pattern (SCAN / LOOK Scheduling algorithm)"]
    },
    keyConcepts: [
      "State Pattern for handling elevator movement state transitions",
      "Strategy Pattern to plug in different elevator scheduling algorithms"
    ],
    detailedGuide: `### Classes & Enums
- **Enums**: \`Direction (UP, DOWN, IDLE)\`, \`ElevatorState (MOVING, STOPPED)\`.`
  },

  // --- System Design Interview Q&A ---
  {
    id: "qa-1",
    title: "CAP Theorem vs PACELC Theorem",
    category: "System Design Interview Q&A",
    difficulty: "Medium",
    companies: ["Google", "Amazon", "Microsoft", "Uber"],
    summary: "Understand Consistency, Availability, Partition Tolerance trade-offs in distributed systems and PACELC extension for normal latency trade-offs.",
    readTime: "10 min read",
    keyConcepts: [
      "CAP: In case of Partition (P), choose Consistency (C) or Availability (A)",
      "PACELC: Else (E), choose Latency (L) or Consistency (C)"
    ],
    detailedGuide: `### CAP Theorem Breakdown
- **Consistency**: Every read receives the most recent write or an error.
- **Availability**: Every request receives a non-error response.`
  }
];
