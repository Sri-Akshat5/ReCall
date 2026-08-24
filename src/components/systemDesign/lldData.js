// ============================================================================
// LOW-LEVEL DESIGN (LLD) & OBJECT-ORIENTED DESIGN (OOD) MASTER DATASET
// Features: Multi-language code (Java, Python, TypeScript, JS), Design Pattern Breakdown,
// Concurrency & Lock Analysis, and Production Edge Cases.
// ============================================================================

export const LLD_BLUEPRINTS = {
  "lld-1": {
    id: "lld-1",
    hldId: "hld-1",
    hldTitle: "Design TinyURL (URL Shortener HLD)",
    hldPath: "/system-design/hld-1",
    title: "LLD: TinyURL Key Generation & Storage Engine",
    subtitle: "Low-Level Class Design, Database ER Schema, Base62 Encoder & REST API Specification",
    category: "Low-Level Design (LLD)",
    difficulty: "Medium",
    designPatterns: ["Singleton (KGS Buffer)", "Strategy (Base62 vs Hash)", "Factory (URL Entity Creation)"],
    oodClasses: [
      {
        name: "UrlMapping",
        type: "Entity",
        description: "Core domain model representing shortened URL entity.",
        attributes: [
          "id: String (PK / UUID)",
          "shortKey: String (Unique 6-char Base62)",
          "originalUrl: String (Max 2048 chars)",
          "userId: String (FK -> User.id)",
          "createdAt: Timestamp",
          "expiresAt: Timestamp",
          "clickCount: AtomicLong"
        ],
        methods: [
          "+ isExpired(): boolean",
          "+ incrementClicks(): void"
        ]
      },
      {
        name: "KeyGenerationService",
        type: "Service / Singleton",
        description: "Pre-fetches unused Base62 keys in local memory buffer from DB.",
        attributes: [
          "- keyBuffer: ConcurrentLinkedQueue<String>",
          "- BUFFER_SIZE: int = 1000",
          "- keyRepository: KeyRepository"
        ],
        methods: [
          "+ getInstance(): KeyGenerationService",
          "+ getNextKey(): String",
          "- refillBufferAsync(): void"
        ]
      },
      {
        name: "Base62Encoder",
        type: "Utility / Strategy",
        description: "Converts auto-incrementing 64-bit ID to Base62 alphanumeric string.",
        attributes: [
          "- BASE62_CHARS: char[] = [0-9a-zA-Z]"
        ],
        methods: [
          "+ encode(numericId: long): String",
          "+ decode(base62Str: String): long"
        ]
      }
    ],
    databaseSchema: {
      dbEngine: "PostgreSQL / Cassandra",
      tables: [
        {
          tableName: "url_mappings",
          description: "Stores mapping between Base62 key and original long URL.",
          columns: [
            { name: "short_key", type: "VARCHAR(7)", constraints: "PRIMARY KEY", desc: "Base62 unique short key" },
            { name: "original_url", type: "TEXT", constraints: "NOT NULL", desc: "Destination long URL" },
            { name: "user_id", type: "VARCHAR(64)", constraints: "INDEXED", desc: "Creator user ID" },
            { name: "created_at", type: "TIMESTAMP", constraints: "NOT NULL DEFAULT NOW()", desc: "Creation timestamp" },
            { name: "expires_at", type: "TIMESTAMP", constraints: "INDEXED", desc: "TTL expiration timestamp" }
          ],
          indexes: ["CREATE UNIQUE INDEX idx_short_key ON url_mappings(short_key);", "CREATE INDEX idx_user_expires ON url_mappings(user_id, expires_at);"]
        },
        {
          tableName: "kgs_keys",
          description: "Offline pre-generated Base62 key pool.",
          columns: [
            { name: "key_val", type: "VARCHAR(7)", constraints: "PRIMARY KEY", desc: "Pre-generated Base62 key" },
            { name: "is_used", type: "BOOLEAN", constraints: "NOT NULL DEFAULT FALSE", desc: "Key allocation status" }
          ],
          indexes: ["CREATE INDEX idx_unused_keys ON kgs_keys(is_used) WHERE is_used = FALSE;"]
        }
      ]
    },
    apiEndpoints: [
      {
        method: "POST",
        path: "/api/v1/data/shorten",
        description: "Creates a shortened URL alias for long URL.",
        requestBody: `{\n  "originalUrl": "https://example.com/very/long/path?query=123",\n  "customAlias": "optional-custom-key",\n  "ttlSeconds": 86400\n}`,
        responseBody: `{\n  "shortUrl": "https://tiny.url/aB3x9Z",\n  "shortKey": "aB3x9Z",\n  "expiresAt": "2026-08-26T00:00:00Z"\n}`,
        statusCodes: "201 Created, 400 Bad Request, 409 Conflict (Custom Alias Taken)"
      },
      {
        method: "GET",
        path: "/{shortKey}",
        description: "Redirects short URL key to long URL destination.",
        requestBody: "None",
        responseBody: "HTTP 301 Permanent Redirect (Location: https://example.com/...)",
        statusCodes: "301 Moved Permanently, 404 Not Found, 410 Gone (Expired)"
      }
    ],
    detailedExplanation: "In a high-throughput URL shortener, generating keys on-the-fly via database auto-increment produces lock contention at scale. The Key Generation Service (KGS) solves this by pre-generating Base62 keys offline and keeping a lock-free queue (ConcurrentLinkedQueue / asyncio queue) of unused keys in memory. When the memory buffer drops below 25% capacity, an asynchronous background thread refills the buffer without blocking incoming client HTTP requests.",
    designPatternDetails: [
      {
        pattern: "Singleton Pattern",
        whyUsed: "Ensures only a single instance of KeyGenerationService memory buffer exists per application instance, avoiding key duplication across worker threads.",
        codeRole: "Manages lock-free queue `ConcurrentLinkedQueue<String>` buffer."
      },
      {
        pattern: "Strategy Pattern",
        whyUsed: "Decouples URL encoding implementation (Base62 auto-increment vs MD5/SHA-256 hash truncation).",
        codeRole: "Encapsulates `encodeBase62(numericId)` algorithm."
      },
      {
        pattern: "Factory Pattern",
        whyUsed: "Standardizes creation of `UrlMapping` domain entities with default TTLs and timestamps.",
        codeRole: "Creates immutable URL mapping value objects."
      }
    ],
    concurrencyAnalysis: [
      "Lock-Free Buffer Access: Uses ConcurrentLinkedQueue which relies on Lock-free CAS (Compare-And-Swap) operations for `poll()` and `offer()`, preventing thread blocking under 100,000+ concurrent requests.",
      "Asynchronous Buffer Refill: Uses CompletableFuture.runAsync() / asyncio.create_task() when buffer size drops under 25% capacity, so worker threads serving API calls never wait for database network I/O.",
      "Fallback Synchronization: Synchronized `refillBuffer()` method ensures only ONE background thread fetches a batch from the KGS SQL repository at any given moment, avoiding duplicate DB queries."
    ],
    edgeCases: [
      {
        issue: "KGS Memory Buffer Exhaustion",
        consequence: "Buffer runs out of pre-generated keys before async refill completes.",
        resolution: "Fallback to synchronous database key allocation query using SELECT FOR UPDATE SKIP LOCKED."
      },
      {
        issue: "Application Server Crash with Loaded Buffer",
        consequence: "Keys currently buffered in RAM are lost upon process crash.",
        resolution: "Acceptable loss! Base62 keys are marked 'used' in DB during batch allocation. 1000 lost keys out of 3.5 Trillion (6-char Base62 = 62^6 = 56.8 Billion) is negligible."
      },
      {
        issue: "Custom Alias Collision",
        consequence: "User passes a custom shortKey that already exists in DB.",
        resolution: "Check unique database constraint `idx_short_key` and return HTTP 409 Conflict with descriptive payload."
      }
    ],
    codeExamples: {
      java: `// Java 17+ Thread-Safe Key Generation Service & Base62 Strategy
import java.util.concurrent.ConcurrentLinkedQueue;
import java.util.concurrent.CompletableFuture;
import java.util.List;

public class KeyGenerationService {
    private static final int BUFFER_SIZE = 1000;
    private static final String BASE62 = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    private final ConcurrentLinkedQueue<String> keyBuffer = new ConcurrentLinkedQueue<>();
    private final KeyRepository keyRepository;

    public KeyGenerationService(KeyRepository keyRepository) {
        this.keyRepository = keyRepository;
        refillBuffer();
    }

    public String getNextKey() {
        String key = keyBuffer.poll();
        if (keyBuffer.size() < BUFFER_SIZE / 4) {
            CompletableFuture.runAsync(this::refillBuffer);
        }
        if (key == null) {
            return keyRepository.fetchAndMarkKeyUsed(); // Fallback sync fetch
        }
        return key;
    }

    private synchronized void refillBuffer() {
        if (keyBuffer.size() < BUFFER_SIZE / 2) {
            List<String> freshKeys = keyRepository.fetchBatchUnusedKeys(BUFFER_SIZE);
            keyBuffer.addAll(freshKeys);
        }
    }

    public static String encodeBase62(long numericId) {
        StringBuilder sb = new StringBuilder();
        while (numericId > 0) {
            sb.append(BASE62.charAt((int) (numericId % 62)));
            numericId /= 62;
        }
        return sb.reverse().toString();
    }
}`,
      python: `# Python 3.11+ Async Key Generation Service & Base62 Encoder
import asyncio
from collections import deque
from typing import Optional, List

BASE62_CHARS = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"

class KeyGenerationService:
    def __init__(self, key_repository, buffer_size: int = 1000):
        self.key_repository = key_repository
        self.buffer_size = buffer_size
        self.buffer = deque()
        self._lock = asyncio.Lock()
        
    async def get_next_key(self) -> str:
        async with self._lock:
            if not self.buffer:
                await self._refill_buffer()
            
            key = self.buffer.popleft()
            if len(self.buffer) < self.buffer_size // 4:
                asyncio.create_task(self._refill_buffer())
            return key

    async def _refill_buffer(self):
        fresh_keys: List[str] = await self.key_repository.fetch_batch_unused_keys(self.buffer_size)
        self.buffer.extend(fresh_keys)

def encode_base62(numeric_id: int) -> str:
    if numeric_id == 0:
        return "0"
    chars = []
    while numeric_id > 0:
        numeric_id, rem = divmod(numeric_id, 62)
        chars.append(BASE62_CHARS[rem])
    return "".join(reversed(chars))`,
      typescript: `// TypeScript Thread-Safe KGS Buffer & Base62 Encoder
export class Base62Encoder {
  private static readonly BASE62 = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

  public static encode(numericId: number): string {
    if (numericId === 0) return "0";
    let sb = "";
    while (numericId > 0) {
      sb = Base62Encoder.BASE62[numericId % 62] + sb;
      numericId = Math.floor(numericId / 62);
    }
    return sb;
  }
}

export class KeyGenerationService {
  private keyBuffer: string[] = [];
  private readonly bufferSize = 1000;
  private isRefilling = false;

  constructor(private readonly keyRepository: any) {
    this.refillBuffer();
  }

  public async getNextKey(): Promise<string> {
    if (this.keyBuffer.length === 0) {
      await this.refillBuffer();
    }
    const key = this.keyBuffer.shift()!;
    if (this.keyBuffer.length < this.bufferSize / 4 && !this.isRefilling) {
      this.refillBuffer(); // Fire & forget async refill
    }
    return key;
  }

  private async refillBuffer(): Promise<void> {
    this.isRefilling = true;
    try {
      const freshKeys = await this.keyRepository.fetchBatchUnusedKeys(this.bufferSize);
      this.keyBuffer.push(...freshKeys);
    } finally {
      this.isRefilling = false;
    }
  }
}`,
      javascript: `// JavaScript ES6 Key Generation Buffer & Base62 Strategy
const BASE62 = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

export class KeyGenerationService {
  constructor(keyRepository, bufferSize = 1000) {
    this.keyRepository = keyRepository;
    this.bufferSize = bufferSize;
    this.buffer = [];
    this.isRefilling = false;
    this.refillBuffer();
  }

  async getNextKey() {
    if (this.buffer.length === 0) {
      await this.refillBuffer();
    }
    const key = this.buffer.shift();
    if (this.buffer.length < this.bufferSize / 4 && !this.isRefilling) {
      this.refillBuffer();
    }
    return key;
  }

  async refillBuffer() {
    this.isRefilling = true;
    try {
      const keys = await this.keyRepository.fetchBatchUnusedKeys(this.bufferSize);
      this.buffer.push(...keys);
    } finally {
      this.isRefilling = false;
    }
  }

  static encodeBase62(num) {
    if (num === 0) return "0";
    let res = "";
    while (num > 0) {
      res = BASE62[num % 62] + res;
      num = Math.floor(num / 62);
    }
    return res;
  }
}`
    }
  },

  "lld-2": {
    id: "lld-2",
    hldId: "hld-2",
    hldTitle: "Design an API Rate Limiter HLD",
    hldPath: "/system-design/hld-2",
    title: "LLD: Distributed API Rate Limiter Engine",
    subtitle: "Token Bucket & Sliding Window Log Classes, Redis Lua Script Execution & Middleware Interceptor",
    category: "Low-Level Design (LLD)",
    difficulty: "Medium",
    designPatterns: ["Strategy Pattern (Token Bucket vs Sliding Window)", "Decorator (Middleware Interceptor)", "Singleton (Redis Client Manager)"],
    oodClasses: [
      {
        name: "RateLimiterMiddleware",
        type: "Interceptor",
        description: "Intercepts HTTP requests at API Gateway tier to evaluate rate limits.",
        attributes: [
          "- rateLimitStrategy: RateLimitStrategy",
          "- configProvider: RateLimitConfigProvider"
        ],
        methods: [
          "+ handleRequest(request: HttpServletRequest): boolean",
          "- extractClientKey(request: HttpServletRequest): String"
        ]
      },
      {
        name: "TokenBucketStrategy",
        type: "Strategy Implementation",
        description: "Evaluates token capacity using atomic Redis Lua script.",
        attributes: [
          "- redisClient: RedisClusterClient",
          "- luaScriptSha: String"
        ],
        methods: [
          "+ isAllowed(clientKey: String, limit: int, windowSec: int): boolean"
        ]
      },
      {
        name: "RateLimitRule",
        type: "Value Object",
        description: "Encapsulates endpoint rate limit configuration.",
        attributes: [
          "endpointPattern: String (e.g. /api/v1/checkout)",
          "maxRequests: int",
          "windowSeconds: int",
          "tier: ClientTier (FREE, PRO, ENTERPRISE)"
        ],
        methods: [
          "+ matches(requestPath: String): boolean"
        ]
      }
    ],
    databaseSchema: {
      dbEngine: "Redis In-Memory Key-Value Store",
      tables: [
        {
          tableName: "rate_limit:{clientId}:{endpoint}",
          description: "Redis Hash / Sorted Set storing timestamp tokens.",
          columns: [
            { name: "key", type: "STRING / ZSET", constraints: "TTL = Window Seconds", desc: "Client identifier + endpoint composite key" },
            { name: "score", type: "DOUBLE", constraints: "Timestamp ms", desc: "Request arrival epoch timestamp" }
          ],
          indexes: ["Redis ZSET score sorting for O(log N + M) sliding window pruning."]
        }
      ]
    },
    apiEndpoints: [
      {
        method: "ANY",
        path: "/api/*",
        description: "Rate-limited API proxy endpoint.",
        requestBody: "Standard API payload",
        responseBody: "Header: X-RateLimit-Limit: 100\nHeader: X-RateLimit-Remaining: 99\nHeader: X-RateLimit-Reset: 1770000000",
        statusCodes: "200 OK, 429 Too Many Requests (Retry-After: 30)"
      }
    ],
    detailedExplanation: "Evaluating rate limit logic in application code introduces race conditions when requests arrive simultaneously across distributed nodes. Running atomic Lua scripts directly inside Redis guarantees single-threaded atomic execution (Token calculation, counter increment, and key expiration happen in a single step with zero lock overhead).",
    designPatternDetails: [
      {
        pattern: "Strategy Pattern",
        whyUsed: "Allows switching between Token Bucket, Leaky Bucket, and Sliding Window Log algorithms cleanly via configuration without modifying Gateway interceptor code.",
        codeRole: "Defines `RateLimitStrategy` interface implemented by `TokenBucketStrategy`."
      },
      {
        pattern: "Decorator Pattern",
        whyUsed: "Wraps HTTP request processing pipeline with rate limiting checks as middleware.",
        codeRole: "Acts as API Gateway filter interceptor."
      }
    ],
    concurrencyAnalysis: [
      "Single-Threaded Redis Event Loop: Redis executes Lua scripts atomically in a single thread, guaranteeing read-evaluate-write operations cannot be interrupted by parallel API server requests.",
      "Zero Application Locks: Eliminates synchronized Java locks or distributed Redlock locking, achieving <1ms rate limiter check overhead at 500,000 requests/sec."
    ],
    edgeCases: [
      {
        issue: "Redis Node Outage / Cache Failures",
        consequence: "Centralized Redis instance or shard crashes or becomes unreachable.",
        resolution: "Fail-Open policy (by default allow request through and log warning) or Fallback Local Memory Rate Limiter to prevent blocking all legitimate traffic."
      },
      {
        issue: "Clock Skew in Distributed Systems",
        consequence: "Application server system timestamps differ by several seconds.",
        resolution: "Use Redis server time (`TIME` command inside Lua script) rather than local application server clock."
      }
    ],
    codeExamples: {
      java: `// Java 17+ Token Bucket Rate Limiter with Redis Lua Script Execution
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.data.redis.core.script.RedisScript;
import java.util.Collections;
import java.util.List;

public class TokenBucketRateLimiter implements RateLimitStrategy {
    private final StringRedisTemplate redisTemplate;
    private final RedisScript<Long> luaScript;

    public TokenBucketRateLimiter(StringRedisTemplate redisTemplate, RedisScript<Long> luaScript) {
        this.redisTemplate = redisTemplate;
        this.luaScript = luaScript;
    }

    @Override
    public boolean isAllowed(String clientKey, int capacity, int refillRatePerSec) {
        List<String> keys = Collections.singletonList("rate_limit:" + clientKey);
        Long result = redisTemplate.execute(
            luaScript, 
            keys, 
            String.valueOf(capacity), 
            String.valueOf(refillRatePerSec), 
            String.valueOf(System.currentTimeMillis() / 1000)
        );
        return result != null && result == 1L;
    }
}`,
      python: `# Python 3.11+ Redis Lua Token Bucket Rate Limiter
import time
import aioredis

LUA_TOKEN_BUCKET_SCRIPT = """
local key = KEYS[1]
local capacity = tonumber(ARGV[1])
local refill_rate = tonumber(ARGV[2])
local now = tonumber(ARGV[3])

local data = redis.call("HMGET", key, "tokens", "last_update")
local tokens = tonumber(data[1]) or capacity
local last_update = tonumber(data[2]) or now

local delta = math.max(0, now - last_update)
tokens = math.min(capacity, tokens + delta * refill_rate)

if tokens >= 1 then
    tokens = tokens - 1
    redis.call("HMSET", key, "tokens", tokens, "last_update", now)
    redis.call("EXPIRE", key, 60)
    return 1
else
    return 0
end
"""

class RedisRateLimiter:
    def __init__(self, redis_client: aioredis.Redis):
        self.redis = redis_client
        self.lua_script = self.redis.register_script(LUA_TOKEN_BUCKET_SCRIPT)

    async def is_allowed(self, client_key: str, capacity: int, refill_rate: int) -> bool:
        now = int(time.time())
        res = await self.lua_script(keys=[f"rate_limit:{client_key}"], args=[capacity, refill_rate, now])
        return res == 1`,
      typescript: `// TypeScript Express Rate Limiter Middleware
import { Request, Response, NextFunction } from "express";

export interface RateLimiter {
  isAllowed(key: string, limit: number, windowSec: number): Promise<boolean>;
}

export class RateLimitMiddleware {
  constructor(private limiter: RateLimiter, private limit: number = 100, private windowSec: number = 60) {}

  public getHandler() {
    return async (req: Request, res: Response, next: NextFunction) => {
      const clientIp = req.ip || req.headers["x-forwarded-for"] || "unknown";
      const allowed = await this.limiter.isAllowed(clientIp.toString(), this.limit, this.windowSec);

      if (!allowed) {
        res.status(429).json({
          error: "Too Many Requests",
          retryAfterSeconds: 30
        });
        return;
      }
      next();
    };
  }
}`,
      javascript: `// JavaScript ES6 Sliding Window Rate Limiter
export class LocalSlidingWindowRateLimiter {
  constructor(limit = 100, windowMs = 60000) {
    this.limit = limit;
    this.windowMs = windowMs;
    this.requests = new Map();
  }

  isAllowed(clientId) {
    const now = Date.now();
    if (!this.requests.has(clientId)) {
      this.requests.set(clientId, []);
    }
    const timestamps = this.requests.get(clientId);
    
    // Filter timestamps within window
    while (timestamps.length > 0 && timestamps[0] <= now - this.windowMs) {
      timestamps.shift();
    }

    if (timestamps.length < this.limit) {
      timestamps.push(now);
      return true;
    }
    return false;
  }
}`
    }
  },

  "lld-3": {
    id: "lld-3",
    hldId: "hld-3",
    hldTitle: "Design WhatsApp / Telegram HLD",
    hldPath: "/system-design/hld-3",
    title: "LLD: WhatsApp WebSocket Chat & Presence Engine",
    subtitle: "WebSocket Connection Handler, Message Packet Parser, Cassandra Persistence & Redis Presence Heartbeat",
    category: "Low-Level Design (LLD)",
    difficulty: "Hard",
    designPatterns: ["Observer Pattern (Presence Event Pub/Sub)", "Command Pattern (Message Handlers)", "Flyweight (Connection Sessions)"],
    oodClasses: [
      {
        name: "WebSocketSessionManager",
        type: "Manager / Singleton",
        description: "Maintains active WebSocket TCP connections in memory map.",
        attributes: [
          "- userSessions: ConcurrentHashMap<String, WebSocketSession>",
          "- presenceClient: RedisPresenceClient"
        ],
        methods: [
          "+ registerSession(userId: String, session: WebSocketSession): void",
          "+ removeSession(userId: String): void",
          "+ sendToUser(recipientId: String, packet: MessagePacket): boolean"
        ]
      },
      {
        name: "MessagePacket",
        type: "Value Object",
        description: "Encapsulates chat payload transmitted over WebSocket frame.",
        attributes: [
          "messageId: String (Snowflake ID)",
          "senderId: String",
          "recipientId: String",
          "chatType: ChatType (SINGLE, GROUP)",
          "content: byte[] (End-to-End Encrypted)",
          "timestamp: long",
          "status: MessageStatus (SENT, DELIVERED, READ)"
        ],
        methods: [
          "+ serialize(): byte[]",
          "+ deserialize(bytes: byte[]): MessagePacket"
        ]
      }
    ],
    databaseSchema: {
      dbEngine: "Apache Cassandra (Columnar)",
      tables: [
        {
          tableName: "messages",
          description: "Partitioned chat message log.",
          columns: [
            { name: "chat_id", type: "UUID", constraints: "PARTITION KEY", desc: "Composite user_a + user_b ID" },
            { name: "message_id", type: "TIMEUUID", constraints: "CLUSTERING KEY (DESC)", desc: "Time-sortable UUID" },
            { name: "sender_id", type: "VARCHAR", constraints: "NOT NULL", desc: "Sender user ID" },
            { name: "encrypted_content", type: "BLOB", constraints: "NOT NULL", desc: "E2EE ciphertext" },
            { name: "status", type: "VARCHAR", constraints: "NOT NULL", desc: "Message delivery status" }
          ],
          indexes: ["PRIMARY KEY ((chat_id), message_id) WITH CLUSTERING ORDER BY (message_id DESC);"]
        }
      ]
    },
    apiEndpoints: [
      {
        method: "WS",
        path: "/ws/v1/chat",
        description: "WebSocket bidirectional chat connection upgrade.",
        requestBody: "Sec-WebSocket-Protocol: Bearer <JWT_TOKEN>",
        responseBody: "Binary WebSocket frames (Protobuf MessagePacket)",
        statusCodes: "101 Switching Protocols, 401 Unauthorized"
      }
    ],
    detailedExplanation: "Chat applications maintain stateful TCP sockets in memory using ConcurrentHashMap. When User A sends a message to User B, the session manager looks up User B's active socket. If connected, it pushes the message immediately (<20ms). If disconnected, it routes the message to APNs/FCM push notification queue.",
    designPatternDetails: [
      {
        pattern: "Observer Pattern",
        whyUsed: "Publishes presence updates (User Online / Offline) across WebSocket gateway nodes via Redis Pub/Sub.",
        codeRole: "Notifies friend client sockets of online status changes."
      },
      {
        pattern: "Command Pattern",
        whyUsed: "Encapsulates incoming WebSocket message packets as executable commands.",
        codeRole: "Dispatches packet handlers (`SingleChatCommand`, `GroupMessageCommand`)."
      }
    ],
    concurrencyAnalysis: [
      "ConcurrentHashMap Session Storage: Allows thread-safe concurrent socket reads and writes without full map lock contention.",
      "Non-blocking Event Loops (Netty / Tokio): Handles 500,000+ open idle WebSocket TCP connections per Gateway server with low RAM overhead."
    ],
    edgeCases: [
      {
        issue: "Gateway Server Crash during Active Connection",
        consequence: "WebSocket sockets abruptly drop.",
        resolution: "Client mobile app automatically re-establishes connection to Load Balancer, updating Redis presence mapping."
      },
      {
        issue: "Out-of-Order Delivery in Cellular Networks",
        consequence: "Message 2 arrives before Message 1 over poor 3G connection.",
        resolution: "Client orders messages by 64-bit Snowflake / TimeUUID `message_id` on device UI."
      }
    ],
    codeExamples: {
      java: `// Java WebSocket Session & Chat Handler
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.handler.TextWebSocketHandler;
import java.util.concurrent.ConcurrentHashMap;

public class WebSocketSessionManager {
    private static final WebSocketSessionManager INSTANCE = new WebSocketSessionManager();
    private final ConcurrentHashMap<String, WebSocketSession> userSessions = new ConcurrentHashMap<>();

    private WebSocketSessionManager() {}

    public static WebSocketSessionManager getInstance() { return INSTANCE; }

    public void registerSession(String userId, WebSocketSession session) {
        userSessions.put(userId, session);
    }

    public void removeSession(String userId) {
        userSessions.remove(userId);
    }

    public boolean sendToUser(String recipientId, String jsonPayload) {
        WebSocketSession session = userSessions.get(recipientId);
        if (session != null && session.isOpen()) {
            try {
                session.sendMessage(new TextMessage(jsonPayload));
                return true;
            } catch (Exception e) {
                userSessions.remove(recipientId);
            }
        }
        return false; // User offline
    }
}`,
      python: `# Python Async WebSockets Session Manager
import asyncio
from typing import Dict
from websockets.server import WebSocketServerProtocol

class ChatSessionManager:
    def __init__(self):
        self.active_sessions: Dict[str, WebSocketServerProtocol] = {}

    async def register(self, user_id: str, websocket: WebSocketServerProtocol):
        self.active_sessions[user_id] = websocket

    async def unregister(self, user_id: str):
        self.active_sessions.pop(user_id, None)

    async def send_message(self, recipient_id: str, message_data: str) -> bool:
        ws = self.active_sessions.get(recipient_id)
        if ws:
            try:
                await ws.send(message_data)
                return True
            except Exception:
                await self.unregister(recipient_id)
        return False`,
      typescript: `// TypeScript WebSocket Gateway Session Registry
import WebSocket from "ws";

export class WsSessionManager {
  private static instance: WsSessionManager;
  private sessions = new Map<string, WebSocket>();

  public static getInstance(): WsSessionManager {
    if (!WsSessionManager.instance) {
      WsSessionManager.instance = new WsSessionManager();
    }
    return WsSessionManager.instance;
  }

  public register(userId: string, socket: WebSocket): void {
    this.sessions.set(userId, socket);
  }

  public unregister(userId: string): void {
    this.sessions.delete(userId);
  }

  public send(recipientId: string, payload: object): boolean {
    const socket = this.sessions.get(recipientId);
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify(payload));
      return true;
    }
    return false;
  }
}`,
      javascript: `// JavaScript ES6 Socket Manager
export class SocketManager {
  constructor() {
    this.clients = new Map();
  }

  addClient(userId, socket) {
    this.clients.set(userId, socket);
  }

  removeClient(userId) {
    this.clients.delete(userId);
  }

  broadcastToUser(recipientId, data) {
    const client = this.clients.get(recipientId);
    if (client && client.readyState === 1) { // 1 = OPEN
      client.send(JSON.stringify(data));
      return true;
    }
    return false;
  }
}`
    }
  },

  "lld-4": {
    id: "lld-4",
    hldId: "hld-4",
    hldTitle: "Design Video Streaming (YouTube/Netflix HLD)",
    hldPath: "/system-design/hld-4",
    title: "LLD: Video Transcoding Pipeline & HLS Playlist Engine",
    subtitle: "Chunk Splitter, FFmpeg Encoder Worker, HLS Manifest Builder & Presigned S3 Upload",
    category: "Low-Level Design (LLD)",
    difficulty: "Hard",
    designPatterns: ["Pipeline / Chain of Responsibility (Transcoding steps)", "Producer-Consumer (Kafka Worker queue)", "Builder (HLS .m3u8 playlist generator)"],
    oodClasses: [
      {
        name: "TranscodingTask",
        type: "Job Entity",
        description: "Represents video chunk encoding job sent to worker queue.",
        attributes: [
          "videoId: String",
          "chunkId: int",
          "s3RawChunkPath: String",
          "targetResolution: Resolution (1080p, 720p, 480p)",
          "codec: Codec (H264, AV1)",
          "status: JobStatus (PENDING, PROCESSING, COMPLETED)"
        ],
        methods: [
          "+ getFormattedCommand(): String"
        ]
      },
      {
        name: "HlsPlaylistBuilder",
        type: "Builder",
        description: "Constructs HLS .m3u8 master index and resolution variant playlists.",
        attributes: [
          "- masterIndexLines: List<String>",
          "- segmentDurationSec: int = 10"
        ],
        methods: [
          "+ addVariant(resolution: String, bitrate: long, url: String): void",
          "+ addSegment(tsFilename: String, duration: double): void",
          "+ buildMasterManifest(): String"
        ]
      }
    ],
    databaseSchema: {
      dbEngine: "PostgreSQL + Amazon S3",
      tables: [
        {
          tableName: "videos",
          description: "Metadata table for uploaded videos.",
          columns: [
            { name: "id", type: "UUID", constraints: "PRIMARY KEY", desc: "Unique video ID" },
            { name: "uploader_id", type: "VARCHAR(64)", constraints: "INDEXED", desc: "User ID" },
            { name: "title", type: "VARCHAR(255)", constraints: "NOT NULL", desc: "Video title" },
            { name: "hls_master_url", type: "VARCHAR(512)", constraints: "NULLABLE", desc: "CDN URL to master.m3u8" },
            { name: "status", type: "VARCHAR(32)", constraints: "NOT NULL", desc: "PROCESSING, READY, FAILED" }
          ],
          indexes: ["CREATE INDEX idx_uploader ON videos(uploader_id);"]
        }
      ]
    },
    apiEndpoints: [
      {
        method: "POST",
        path: "/api/v1/videos/upload-url",
        description: "Generates S3 presigned URL for direct video raw file upload.",
        requestBody: `{\n  "title": "My 4K Video",\n  "fileSizeBytes": 1073741824\n}`,
        responseBody: `{\n  "videoId": "v_99812",\n  "presignedUploadUrl": "https://s3.amazonaws.com/raw-bucket/v_99812.mp4?signature=..."\n}`,
        statusCodes: "200 OK, 400 Bad Request"
      }
    ],
    detailedExplanation: "Transcoding raw high-bitrate video into multi-resolution HTTP Live Streaming (HLS) formats uses the Builder Pattern to construct `.m3u8` playlists and asynchronous worker queues to parallelize FFmpeg CPU tasks across thousands of distributed worker nodes.",
    designPatternDetails: [
      {
        pattern: "Chain of Responsibility",
        whyUsed: "Passes raw video uploaded tasks through sequential processing steps (1. Splitting -> 2. Audio Extraction -> 3. Multi-resolution Encoding -> 4. HLS Packaging).",
        codeRole: "Pipeline stage execution interface."
      },
      {
        pattern: "Builder Pattern",
        whyUsed: "Constructs complex multi-line HLS `.m3u8` index manifests step-by-step.",
        codeRole: "Assembles `#EXT-X-STREAM-INF` playlist file content."
      }
    ],
    concurrencyAnalysis: [
      "Distributed Producer-Consumer Queue: Kafka decouples video upload HTTP request handling from CPU-intensive FFmpeg transcoding node pools.",
      "Parallel Chunk Transcoding: 2-hour video is split into 10-second MP4 chunks; 720 chunks are encoded simultaneously across 50 worker nodes."
    ],
    edgeCases: [
      {
        issue: "Corrupted Input Video Upload",
        consequence: "FFmpeg throws exit code 1 during encoding.",
        resolution: "Worker catches exception, updates `video.status = FAILED` in DB, and emits notification to uploader."
      }
    ],
    codeExamples: {
      java: `// Java HLS .m3u8 Master Playlist Generator
import java.util.ArrayList;
import java.util.List;

public class HlsPlaylistBuilder {
    private final List<String> variants = new ArrayList<>();

    public HlsPlaylistBuilder addVariant(String resolution, long bandwidth, String playlistUrl) {
        variants.add(String.format("#EXT-X-STREAM-INF:BANDWIDTH=%d,RESOLUTION=%s%n%s", bandwidth, resolution, playlistUrl));
        return this;
    }

    public String buildMasterManifest() {
        StringBuilder sb = new StringBuilder();
        sb.append("#EXTM3U\n#EXT-X-VERSION:3\n");
        for (String v : variants) {
            sb.append(v).append("\n");
        }
        return sb.toString();
    }
}`,
      python: `# Python Transcoding Worker Task Processor
import subprocess
import os

class FfmpegTranscoder:
    @staticmethod
    def encode_to_hls_segment(input_file: str, output_dir: str, resolution: str = "1280x720") -> str:
        os.makedirs(output_dir, exist_ok=True)
        output_m3u8 = os.path.join(output_dir, "playlist.m3u8")
        
        cmd = [
            "ffmpeg", "-i", input_file,
            "-vf", f"scale={resolution}",
            "-c:v", "h264", "-c:a", "aac",
            "-hls_time", "10",
            "-hls_playlist_type", "vod",
            "-hls_segment_filename", os.path.join(output_dir, "segment_%03d.ts"),
            output_m3u8
        ]
        subprocess.run(cmd, check=True)
        return output_m3u8`,
      typescript: `// TypeScript HLS Playlist Manifest Builder
export class HlsManifestBuilder {
  private masterLines: string[] = ["#EXTM3U", "#EXT-X-VERSION:3"];

  public addVariantStream(bandwidth: number, resolution: string, uri: string): this {
    this.masterLines.push(\`#EXT-X-STREAM-INF:BANDWIDTH=\${bandwidth},RESOLUTION=\${resolution}\`);
    this.masterLines.push(uri);
    return this;
  }

  public render(): string {
    return this.masterLines.join("\\n");
  }
}`,
      javascript: `// JavaScript HLS Playlist Generator
export class HlsPlaylistGenerator {
  static createMasterPlaylist(streams) {
    let manifest = "#EXTM3U\\n#EXT-X-VERSION:3\\n";
    for (const s of streams) {
      manifest += \`#EXT-X-STREAM-INF:BANDWIDTH=\${s.bandwidth},RESOLUTION=\${s.resolution}\\n\${s.url}\\n\`;
    }
    return manifest;
  }
}`
    }
  },

  "lld-5": {
    id: "lld-5",
    hldId: "hld-5",
    hldTitle: "Design Uber / Lyft HLD",
    hldPath: "/system-design/hld-5",
    title: "LLD: Uber Geospatial H3 Index & Driver Matching Engine",
    subtitle: "Hexagonal H3 Spatial Cell Indexing, Driver State Machine & Dispatch Strategy Pattern",
    category: "Low-Level Design (LLD)",
    difficulty: "Hard",
    designPatterns: ["Strategy Pattern (Match algorithm: Nearest vs Batch Optimization)", "State Pattern (Driver Availability State)", "Observer (Driver Location Broadcast)"],
    oodClasses: [
      {
        name: "DriverLocation",
        type: "Entity / Spatial Point",
        description: "Represents real-time driver coordinates and H3 cell index.",
        attributes: [
          "driverId: String",
          "latitude: double",
          "longitude: double",
          "h3IndexHex: String (Resolution 8 Hexagon)",
          "lastUpdatedMs: long",
          "status: DriverState (IDLE, EN_ROUTE, ON_TRIP)"
        ],
        methods: [
          "+ computeH3Cell(): String",
          "+ getDistanceTo(riderLat: double, riderLng: double): double"
        ]
      },
      {
        name: "SpatialMatchEngine",
        type: "Service",
        description: "Searches neighbor H3 hexagons to locate candidate drivers.",
        attributes: [
          "- redisGeoClient: RedisGeoClient",
          "- SEARCH_RADIUS_KM: double = 3.0"
        ],
        methods: [
          "+ findNearbyDrivers(riderLat: double, riderLng: double): List<DriverLocation>",
          "- getRingHexagons(h3Cell: String, radiusRing: int): List<String>"
        ]
      }
    ],
    databaseSchema: {
      dbEngine: "Redis In-Memory GEO / H3 + PostgreSQL Spatial (PostGIS)",
      tables: [
        {
          tableName: "trips",
          description: "Stores completed and active ride trips.",
          columns: [
            { name: "trip_id", type: "UUID", constraints: "PRIMARY KEY", desc: "Unique trip ID" },
            { name: "rider_id", type: "VARCHAR(64)", constraints: "NOT NULL", desc: "Rider user ID" },
            { name: "driver_id", type: "VARCHAR(64)", constraints: "INDEXED", desc: "Assigned driver ID" },
            { name: "status", type: "VARCHAR(32)", constraints: "NOT NULL", desc: "REQUESTED, ACCEPTED, IN_PROGRESS, COMPLETED" },
            { name: "fare_amount", type: "NUMERIC(10,2)", constraints: "NOT NULL", desc: "Calculated trip price" }
          ],
          indexes: ["CREATE INDEX idx_active_driver_trips ON trips(driver_id, status);"]
        }
      ]
    },
    apiEndpoints: [
      {
        method: "POST",
        path: "/api/v1/rides/request",
        description: "Requests a ride pick-up and triggers spatial driver dispatch.",
        requestBody: `{\n  "pickupLat": 37.7749,\n  "pickupLng": -122.4194,\n  "dropoffLat": 37.7833,\n  "dropoffLng": -122.4167,\n  "vehicleType": "UBER_X"\n}`,
        responseBody: `{\n  "tripId": "t_9901",\n  "matchedDriverId": "d_4421",\n  "etaMinutes": 4,\n  "fareEstimate": 18.50\n}`,
        statusCodes: "200 OK, 404 No Drivers Nearby"
      }
    ],
    detailedExplanation: "Uber uses Uber H3 hexagonal spatial indexing to discretize continuous GPS coordinates into hexagonal grid cells (~0.73 km2 for Resolution 8). Spatial lookup queries look up the rider's H3 hexagon and expand `kRing` neighbor hexagons to query nearby idle drivers in Redis with O(1) time complexity.",
    designPatternDetails: [
      {
        pattern: "Strategy Pattern",
        whyUsed: "Decouples ride matching strategies (`GreedyNearestDriverStrategy` vs `BatchHungarianOptimizationStrategy`).",
        codeRole: "Matches rider request to optimal candidate driver."
      },
      {
        pattern: "State Pattern",
        whyUsed: "Manages driver lifecycle state transitions cleanly (IDLE -> MATCHED -> EN_ROUTE -> TRIP_IN_PROGRESS -> IDLE).",
        codeRole: "Prevents assigning trips to drivers who are already on a trip."
      }
    ],
    concurrencyAnalysis: [
      "Atomic Ride Acceptance: Driver acceptance uses Redis `SETNX trip_lock:trip_id driver_id` to guarantee only the first driver who clicks 'Accept' gets assigned the ride.",
      "High GPS Ingestion Throughput: 1 Million drivers ping GPS coordinates every 4 seconds. Redis GEO spatial structures handle 250,000 write ops/sec."
    ],
    edgeCases: [
      {
        issue: "Driver Rejects Ride Request",
        consequence: "Rider waiting state is delayed.",
        resolution: "Dispatch engine immediately re-queries next closest driver in H3 neighbor kRing."
      }
    ],
    codeExamples: {
      java: `// Java Haversine Distance & Driver Matching Engine
public class SpatialMatchEngine {
    private static final double EARTH_RADIUS_KM = 6371.0088;

    public static double haversineKm(double lat1, double lon1, double lat2, double lon2) {
        double dLat = Math.toRadians(lat2 - lat1);
        double dLon = Math.toRadians(lon2 - lon1);
        double a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                   Math.cos(Math.toRadians(lat1)) * Math.cos(Math.toRadians(lat2)) *
                   Math.sin(dLon / 2) * Math.sin(dLon / 2);
        double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return EARTH_RADIUS_KM * c;
    }
}`,
      python: `# Python Haversine & Spatial Driver Matching
import math
from typing import List, Tuple

def haversine_distance(coord1: Tuple[float, float], coord2: Tuple[float, float]) -> float:
    lat1, lon1 = coord1
    lat2, lon2 = coord2
    R = 6371.0  # Earth radius km

    dlat = math.radians(lat2 - lat1)
    dlon = math.radians(lon2 - lon1)
    a = math.sin(dlat / 2)**2 + math.cos(math.radians(lat1)) * math.cos(math.radians(lat2)) * math.sin(dlon / 2)**2
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))
    return R * c`,
      typescript: `// TypeScript Haversine Spatial Distance Calculator
export function calculateHaversineKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Earth Radius KM
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  return R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
}`,
      javascript: `// JavaScript Haversine Distance
export function haversineKm(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon/2) * Math.sin(dLon/2);
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}`
    }
  },

  "lld-6": {
    id: "lld-6",
    hldId: "hld-6",
    hldTitle: "Design Distributed Web Crawler HLD",
    hldPath: "/system-design/hld-6",
    title: "LLD: Web Crawler URL Frontier & HTML Extractor",
    subtitle: "Politeness Queue Manager, Bloom Filter Deduplicator, Robots.txt Parser & HTML Parser",
    category: "Low-Level Design (LLD)",
    difficulty: "Hard",
    designPatterns: ["Producer-Consumer Queue", "Flyweight Pattern (Bloom Filter BitMap)", "Strategy (Domain Fetch Politeness)"],
    oodClasses: [
      {
        name: "UrlFrontier",
        type: "Queue Controller",
        description: "Manages domain politeness queues and priority link scheduling.",
        attributes: [
          "- domainQueues: ConcurrentHashMap<String, Queue<CrawlUrl>>",
          "- lastAccessMap: ConcurrentHashMap<String, Long>",
          "- DELAY_MS_PER_DOMAIN: long = 500"
        ],
        methods: [
          "+ addUrl(url: CrawlUrl): void",
          "+ fetchNextPoliteUrl(): CrawlUrl"
        ]
      },
      {
        name: "BloomFilterDeduplicator",
        type: "Utility",
        description: "Checks if URL was previously crawled using bit array.",
        attributes: [
          "- bitArray: BitSet",
          "- hashFunctions: List<HashFunction>"
        ],
        methods: [
          "+ contains(url: String): boolean",
          "+ add(url: String): void"
        ]
      }
    ],
    databaseSchema: {
      dbEngine: "Apache Cassandra (Raw HTML Store) + RocksDB (Frontier)",
      tables: [
        {
          tableName: "crawled_pages",
          description: "Stores downloaded raw HTML documents.",
          columns: [
            { name: "url_hash", type: "VARCHAR(64)", constraints: "PRIMARY KEY", desc: "SHA-256 hash of URL" },
            { name: "url", type: "TEXT", constraints: "NOT NULL", desc: "Full target URL" },
            { name: "raw_html", type: "BLOB", constraints: "NOT NULL", desc: "Gzip compressed HTML" },
            { name: "http_status", type: "INT", constraints: "NOT NULL", desc: "HTTP status code (200)" },
            { name: "crawled_at", type: "TIMESTAMP", constraints: "NOT NULL", desc: "Fetch timestamp" }
          ],
          indexes: ["PRIMARY KEY (url_hash);"]
        }
      ]
    },
    apiEndpoints: [
      {
        method: "POST",
        path: "/api/v1/crawler/seed",
        description: "Seeds new root URLs into the crawler URL Frontier queue.",
        requestBody: `{\n  "seedUrls": ["https://wikipedia.org", "https://news.ycombinator.com"],\n  "maxDepth": 3\n}`,
        responseBody: `{\n  "jobId": "crawl_7712",\n  "urlsEnqueued": 2\n}`,
        statusCodes: "202 Accepted"
      }
    ],
    detailedExplanation: "Crawling billions of web pages requires respecting domain politeness (e.g. max 1 request every 500ms per domain host). The URL Frontier isolates queues per domain host and tracks `lastFetchTimestamp` per domain map.",
    designPatternDetails: [
      {
        pattern: "Producer-Consumer Pattern",
        whyUsed: "HTML Link Extractor threads produce extracted URLs into Frontier queue; Crawler Worker threads consume URLs politely.",
        codeRole: "Manages URL Frontier enqueue/dequeue flow."
      },
      {
        pattern: "Flyweight Pattern",
        whyUsed: "Bloom Filter bit set stores 10 Billion URL hashes in RAM using 1.2 GB of memory instead of 640 GB required by strings.",
        codeRole: "Efficient URL deduplication bit array."
      }
    ],
    concurrencyAnalysis: [
      "Lock-free Politeness Tracking: ConcurrentHashMap with `computeIfPresent()` updates domain fetch timestamps atomically without blocking other worker threads crawling distinct domains."
    ],
    edgeCases: [
      {
        issue: "Spider Trap / Infinite URL Loop",
        consequence: "Dynamic URLs (e.g. `/page?date=2026-08-25&next=...`) cause infinite crawl loops.",
        resolution: "Enforce maximum URL path length (e.g. max 2048 chars) and max depth limit (e.g. max 10 depth from seed URL)."
      }
    ],
    codeExamples: {
      java: `// Java Domain Politeness Queue Manager
import java.util.concurrent.ConcurrentHashMap;
import java.util.Queue;
import java.util.LinkedList;

public class DomainPolitenessQueueManager {
    private final ConcurrentHashMap<String, Queue<String>> domainQueues = new ConcurrentHashMap<>();
    private final ConcurrentHashMap<String, Long> domainLastFetch = new ConcurrentHashMap<>();
    private static final long CRAWL_DELAY_MS = 500;

    public synchronized String pollPoliteUrl(String domain) {
        long lastFetch = domainLastFetch.getOrDefault(domain, 0L);
        if (System.currentTimeMillis() - lastFetch < CRAWL_DELAY_MS) {
            return null; // Polite throttle
        }
        Queue<String> queue = domainQueues.get(domain);
        if (queue != null && !queue.isEmpty()) {
            domainLastFetch.put(domain, System.currentTimeMillis());
            return queue.poll();
        }
        return null;
    }
}`,
      python: `# Python Async Domain Politeness Frontier
import asyncio
import time
from typing import Dict, Optional

class AsyncUrlFrontier:
    def __init__(self, delay_sec: float = 0.5):
        self.delay_sec = delay_sec
        self.last_fetch: Dict[str, float] = {}

    async def can_fetch(self, domain: str) -> bool:
        now = time.time()
        last = self.last_fetch.get(domain, 0.0)
        if now - last >= self.delay_sec:
            self.last_fetch[domain] = now
            return True
        return False`,
      typescript: `// TypeScript Web Crawler Politeness Router
export class PolitenessFrontier {
  private lastFetch = new Map<string, number>();

  constructor(private readonly delayMs: number = 500) {}

  public isAllowed(domain: string): boolean {
    const now = Date.now();
    const last = this.lastFetch.get(domain) || 0;
    if (now - last >= this.delayMs) {
      this.lastFetch.set(domain, now);
      return true;
    }
    return false;
  }
}`,
      javascript: `// JavaScript Domain Politeness Manager
export class PolitenessManager {
  constructor(delayMs = 500) {
    this.delayMs = delayMs;
    this.lastFetchMap = new Map();
  }

  isPolite(domain) {
    const now = Date.now();
    const last = this.lastFetchMap.get(domain) || 0;
    if (now - last >= this.delayMs) {
      this.lastFetchMap.set(domain, now);
      return true;
    }
    return false;
  }
}`
    }
  },

  "lld-7": {
    id: "lld-7",
    hldId: "hld-7",
    hldTitle: "Design News Feed (Twitter/Instagram HLD)",
    hldPath: "/system-design/hld-7",
    title: "LLD: Social News Feed Fan-out & Timeline Engine",
    subtitle: "Hybrid Fan-out Processor, Redis Timeline Cache & Celebrity Pull Aggregator",
    category: "Low-Level Design (LLD)",
    difficulty: "Hard",
    designPatterns: ["Strategy (Push Fan-out vs Pull Fan-out)", "Composite (Timeline Feed Aggregator)", "Observer (Follow Event Listener)"],
    oodClasses: [
      {
        name: "FanoutProcessor",
        type: "Service",
        description: "Determines whether to push post to followers or rely on pull model.",
        attributes: [
          "- CELEBRITY_FOLLOWER_THRESHOLD: int = 10000",
          "- redisTimelineService: RedisTimelineService",
          "- followRepository: FollowRepository"
        ],
        methods: [
          "+ processPost(post: TweetPost): void",
          "- pushToFollowers(post: TweetPost, followerIds: List<String>): void"
        ]
      },
      {
        name: "TimelineFeedAggregator",
        type: "Aggregator",
        description: "Fetches Redis timeline ZSET and merges active celebrity posts on-the-fly.",
        attributes: [
          "- redisClient: RedisClusterClient"
        ],
        methods: [
          "+ getUserFeed(userId: String, page: int, limit: int): List<TweetPost>"
        ]
      }
    ],
    databaseSchema: {
      dbEngine: "PostgreSQL (Tweets/Users) + Redis Cluster (Timelines)",
      tables: [
        {
          tableName: "posts",
          description: "Stores created tweets/posts.",
          columns: [
            { name: "id", type: "BIGINT", constraints: "PRIMARY KEY", desc: "64-bit Snowflake ID" },
            { name: "author_id", type: "VARCHAR(64)", constraints: "INDEXED", desc: "User ID of creator" },
            { name: "content", type: "VARCHAR(280)", constraints: "NOT NULL", desc: "Tweet text" },
            { name: "created_at", type: "TIMESTAMP", constraints: "NOT NULL", desc: "Creation timestamp" }
          ],
          indexes: ["CREATE INDEX idx_author_created ON posts(author_id, created_at DESC);"]
        }
      ]
    },
    apiEndpoints: [
      {
        method: "GET",
        path: "/api/v1/feed/user/{userId}",
        description: "Fetches personalized news feed timeline.",
        requestBody: "None",
        responseBody: `{\n  "posts": [\n    { "id": "17890123", "author": "@elonmusk", "content": "Starship launch update", "createdAt": "2026-08-25T00:10:00Z" }\n  ],\n  "nextCursor": "17890100"\n}`,
        statusCodes: "200 OK"
      }
    ],
    detailedExplanation: "To handle social network scale, posts from normal users with <10,000 followers are pre-computed via Push Fan-out into Redis ZSET timelines (`ZADD timeline:user_id timestamp post_id`). Celebrity users with millions of followers use Pull Fan-out, where posts are fetched at timeline reading time.",
    designPatternDetails: [
      {
        pattern: "Strategy Pattern",
        whyUsed: "Switches dynamically between `PushFanoutStrategy` (for standard users) and `PullFanoutStrategy` (for high-follower celebrities).",
        codeRole: "Executes fan-out processing based on follower count threshold."
      }
    ],
    concurrencyAnalysis: [
      "Redis Pipeline / Batch ZADD: When pushing a tweet to 5,000 followers, commands are bundled into a Redis Pipeline to execute in 1 network round trip instead of 5,000 individual network calls."
    ],
    edgeCases: [
      {
        issue: "Hotkey Memory Explosion in Redis",
        consequence: "Followers with 800+ followed accounts bloat timeline ZSET past 1000 items.",
        resolution: "Trim Redis ZSET timelines to max 800 posts (`ZREMRANGEBYRANK timeline:user_id 0 -801`). Older posts are fetched from PostgreSQL."
      }
    ],
    codeExamples: {
      java: `// Java Hybrid Fan-out Processor
import java.util.List;

public class HybridFanoutEngine {
    private static final int CELEBRITY_THRESHOLD = 10_000;
    private final FollowService followService;
    private final RedisTimelineCache redisCache;

    public HybridFanoutEngine(FollowService followService, RedisTimelineCache redisCache) {
        this.followService = followService;
        this.redisCache = redisCache;
    }

    public void onNewPost(String authorId, String postId, long timestampMs) {
        int followerCount = followService.getFollowerCount(authorId);
        if (followerCount < CELEBRITY_THRESHOLD) {
            List<String> followerIds = followService.getFollowerIds(authorId);
            redisCache.pushToTimelineCaches(followerIds, postId, timestampMs);
        }
        // Celebrities are pulled on-the-fly when followers render their feed!
    }
}`,
      python: `# Python Hybrid Fan-out Engine
class HybridFanoutEngine:
    CELEBRITY_THRESHOLD = 10_000

    def __init__(self, follow_service, redis_cache):
        self.follow_service = follow_service
        self.redis_cache = redis_cache

    async def on_new_post(self, author_id: str, post_id: str, timestamp_ms: int):
        follower_count = await self.follow_service.get_follower_count(author_id)
        if follower_count < self.CELEBRITY_THRESHOLD:
            followers = await self.follow_service.get_follower_ids(author_id)
            await self.redis_cache.push_batch_timeline(followers, post_id, timestamp_ms)`,
      typescript: `// TypeScript News Feed Fan-out Strategy
export class HybridFanoutEngine {
  private readonly CELEBRITY_THRESHOLD = 10000;

  constructor(private followService: any, private redisCache: any) {}

  public async onNewPost(authorId: string, postId: string, timestampMs: number): Promise<void> {
    const followerCount = await this.followService.getFollowerCount(authorId);
    if (followerCount < this.CELEBRITY_THRESHOLD) {
      const followers = await this.followService.getFollowerIds(authorId);
      await this.redisCache.pushToTimelines(followers, postId, timestampMs);
    }
  }
}`,
      javascript: `// JavaScript Hybrid Fan-out
export class HybridFanoutEngine {
  constructor(followService, redisCache) {
    this.followService = followService;
    this.redisCache = redisCache;
  }

  async onNewPost(authorId, postId, timestampMs) {
    const followerCount = await this.followService.getFollowerCount(authorId);
    if (followerCount < 10000) {
      const followers = await this.followService.getFollowerIds(authorId);
      await this.redisCache.pushToTimelines(followers, postId, timestampMs);
    }
  }
}`
    }
  },

  "lld-8": {
    id: "lld-8",
    title: "LLD: Parking Lot Management System (OOD Classic)",
    subtitle: "Vehicle Inheritance, Spot Allocation Strategy, Multi-Floor Billing Engine & Gate Handlers",
    category: "Object-Oriented Design (OOD)",
    difficulty: "Medium",
    designPatterns: ["Factory Method (Vehicle creation)", "Strategy Pattern (Parking Spot Assignment & Billing calculation)", "Singleton (ParkingLot Manager)"],
    oodClasses: [
      {
        name: "Vehicle",
        type: "Abstract Base Class",
        description: "Abstract representation of parked vehicle.",
        attributes: [
          "licensePlate: String",
          "type: VehicleType (BIKE, CAR, TRUCK)"
        ],
        methods: [
          "+ getRequiredSpotType(): SpotType"
        ]
      },
      {
        name: "ParkingSpot",
        type: "Entity",
        description: "Represents individual parking slot.",
        attributes: [
          "spotId: String",
          "floorNumber: int",
          "spotType: SpotType (COMPACT, LARGE, MOTORCYCLE)",
          "isOccupied: boolean",
          "currentVehicle: Vehicle"
        ],
        methods: [
          "+ assignVehicle(v: Vehicle): boolean",
          "+ removeVehicle(): void"
        ]
      },
      {
        name: "Ticket",
        type: "Value Object",
        description: "Issued at entry gate for billing.",
        attributes: [
          "ticketId: String",
          "spotId: String",
          "entryTime: LocalDateTime",
          "exitTime: LocalDateTime",
          "totalFee: BigDecimal"
        ],
        methods: [
          "+ calculateFee(pricingStrategy: PricingStrategy): BigDecimal"
        ]
      }
    ],
    databaseSchema: {
      dbEngine: "MySQL / PostgreSQL",
      tables: [
        {
          tableName: "parking_tickets",
          description: "Active and archived parking tickets.",
          columns: [
            { name: "ticket_id", type: "VARCHAR(64)", constraints: "PRIMARY KEY", desc: "UUID" },
            { name: "license_plate", type: "VARCHAR(32)", constraints: "NOT NULL", desc: "Vehicle license plate" },
            { name: "spot_id", type: "VARCHAR(32)", constraints: "NOT NULL", desc: "Assigned spot ID" },
            { name: "entry_time", type: "TIMESTAMP", constraints: "NOT NULL", desc: "Entry timestamp" },
            { name: "exit_time", type: "TIMESTAMP", constraints: "NULLABLE", desc: "Exit timestamp" },
            { name: "fee_paid", type: "DECIMAL(10,2)", constraints: "NULLABLE", desc: "Total payment fee" }
          ],
          indexes: ["CREATE INDEX idx_plate_active ON parking_tickets(license_plate) WHERE exit_time IS NULL;"]
        }
      ]
    },
    apiEndpoints: [
      {
        method: "POST",
        path: "/api/v1/parking/entry",
        description: "Issues ticket and assigns parking spot.",
        requestBody: `{\n  "licensePlate": "KA-01-AB-1234",\n  "vehicleType": "CAR"\n}`,
        responseBody: `{\n  "ticketId": "tkt_501",\n  "assignedSpot": "Floor-2-Spot-14"\n}`,
        statusCodes: "201 Created, 409 Lot Full"
      }
    ],
    detailedExplanation: "Parking Lot OOD uses Strategy Pattern for pricing models (e.g. flat rate vs hourly vs peak pricing) and Factory Pattern for instantiating different vehicle objects (Car, Bike, Truck).",
    designPatternDetails: [
      {
        pattern: "Factory Method Pattern",
        whyUsed: "Instantiates concrete `Vehicle` types (`Car`, `Bike`, `Truck`) cleanly based on incoming string payload.",
        codeRole: "`VehicleFactory.createVehicle(type, licensePlate)`"
      },
      {
        pattern: "Strategy Pattern",
        whyUsed: "Decouples pricing algorithm (`HourlyPricingStrategy`, `FlatRatePricingStrategy`, `PeakHourPricingStrategy`).",
        codeRole: "Computes total ticket exit fee."
      }
    ],
    concurrencyAnalysis: [
      "Thread-Safe Spot Allocation: Uses `ReentrantLock` or synchronized method on `FloorManager.allocateSpot()` to ensure two cars arriving at separate gates simultaneously do not get assigned the exact same parking spot."
    ],
    edgeCases: [
      {
        issue: "Parking Lot Full for Specific Vehicle Type",
        consequence: "Car arrives but compact spots are full while large truck spots are free.",
        resolution: "Spot Allocation Strategy can fallback to upgrade car to a large spot or refuse entry with HTTP 409 Lot Full."
      }
    ],
    codeExamples: {
      java: `// Java Parking Lot Hourly Billing Strategy & Vehicle Model
import java.math.BigDecimal;
import java.time.Duration;
import java.time.LocalDateTime;
import java.util.Map;

public class HourlyPricingStrategy implements PricingStrategy {
    private static final Map<VehicleType, BigDecimal> RATES = Map.of(
        VehicleType.BIKE, new BigDecimal("10.00"),
        VehicleType.CAR, new BigDecimal("30.00"),
        VehicleType.TRUCK, new BigDecimal("50.00")
    );

    @Override
    public BigDecimal calculateFee(LocalDateTime entry, LocalDateTime exit, VehicleType type) {
        long hours = Math.max(1, Duration.between(entry, exit).toHours());
        return RATES.get(type).multiply(BigDecimal.valueOf(hours));
    }
}`,
      python: `# Python Parking Pricing Strategy
from datetime import datetime
from enum import Enum

class VehicleType(Enum):
    BIKE = 10.0
    CAR = 30.0
    TRUCK = 50.0

class PricingStrategy:
    @staticmethod
    def calculate_fee(entry_time: datetime, exit_time: datetime, v_type: VehicleType) -> float:
        hours = max(1, int((exit_time - entry_time).total_seconds() / 3600))
        return v_type.value * hours`,
      typescript: `// TypeScript Parking Spot & Vehicle Hierarchy
export enum VehicleType { BIKE, CAR, TRUCK }

export abstract class Vehicle {
  constructor(public licensePlate: string, public type: VehicleType) {}
}

export class Car extends Vehicle {
  constructor(licensePlate: string) { super(licensePlate, VehicleType.CAR); }
}

export class HourlyPricingStrategy {
  private rates = { [VehicleType.BIKE]: 10, [VehicleType.CAR]: 30, [VehicleType.TRUCK]: 50 };

  public calculateFee(entry: Date, exit: Date, type: VehicleType): number {
    const hours = Math.max(1, Math.ceil((exit.getTime() - entry.getTime()) / 3600000));
    return this.rates[type] * hours;
  }
}`,
      javascript: `// JavaScript Parking Lot Billing
export class HourlyBilling {
  constructor() {
    this.rates = { BIKE: 10, CAR: 30, TRUCK: 50 };
  }

  calculateFee(entryMs, exitMs, vehicleType) {
    const hours = Math.max(1, Math.ceil((exitMs - entryMs) / 3600000));
    return (this.rates[vehicleType] || 30) * hours;
  }
}`
    }
  },

  "lld-9": {
    id: "lld-9",
    title: "LLD: Elevator Control System (OOD Classic)",
    subtitle: "Elevator Car State Machine, Dispatcher Algorithm (LOOK/SCAN), Floor Buttons & Requests",
    category: "Object-Oriented Design (OOD)",
    difficulty: "Hard",
    designPatterns: ["State Pattern (Idle, Moving Up, Moving Down)", "Strategy Pattern (Elevator Selection Algorithm)", "Observer (Display update)"],
    oodClasses: [
      {
        name: "ElevatorCar",
        type: "Entity",
        description: "Represents individual elevator cabin.",
        attributes: [
          "id: int",
          "currentFloor: int",
          "direction: Direction (UP, DOWN, IDLE)",
          "status: ElevatorStatus (MOVING, STOPPED, MAINTENANCE)",
          "upRequests: PriorityQueue<Integer>",
          "downRequests: PriorityQueue<Integer>"
        ],
        methods: [
          "+ move(): void",
          "+ addRequest(floor: int): void",
          "+ stopAtFloor(): void"
        ]
      },
      {
        name: "ElevatorController",
        type: "Service / Manager",
        description: "Dispatches requests to most optimal elevator car.",
        attributes: [
          "- cars: List<ElevatorCar>",
          "- dispatchStrategy: DispatchStrategy"
        ],
        methods: [
          "+ handleExternalRequest(floor: int, dir: Direction): void",
          "+ handleInternalRequest(carId: int, floor: int): void"
        ]
      }
    ],
    databaseSchema: {
      dbEngine: "Redis (Real-time telemetry) + PostgreSQL (Audit logs)",
      tables: [
        {
          tableName: "elevator_events",
          description: "Elevator dispatch logs.",
          columns: [
            { name: "event_id", type: "UUID", constraints: "PRIMARY KEY", desc: "Event ID" },
            { name: "car_id", type: "INT", constraints: "NOT NULL", desc: "Elevator Car ID" },
            { name: "floor", type: "INT", constraints: "NOT NULL", desc: "Target floor" },
            { name: "direction", type: "VARCHAR(10)", constraints: "NOT NULL", desc: "UP / DOWN" }
          ],
          indexes: ["CREATE INDEX idx_car_events ON elevator_events(car_id);"]
        }
      ]
    },
    apiEndpoints: [
      {
        method: "POST",
        path: "/api/v1/elevator/request",
        description: "Presses external up/down hall button at floor.",
        requestBody: `{\n  "floor": 7,\n  "direction": "UP"\n}`,
        responseBody: `{\n  "assignedCarId": 2,\n  "estimatedEtaSeconds": 12\n}`,
        statusCodes: "200 OK"
      }
    ],
    detailedExplanation: "The Elevator System uses the LOOK/SCAN scheduling algorithm (similar to disk head scheduling) where an elevator continues moving in its current direction serving all requests until no more requests exist in that direction, then reverses direction.",
    designPatternDetails: [
      {
        pattern: "State Pattern",
        whyUsed: "Encapsulates elevator states (`IdleState`, `MovingUpState`, `MovingDownState`) to prevent invalid state transitions (e.g. moving down while in UP direction).",
        codeRole: "Controls elevator movement state behavior."
      },
      {
        pattern: "Strategy Pattern",
        whyUsed: "Allows plugging in different dispatching algorithms (`ShortestSeekTimeFirst`, `LOOKScanAlgorithm`, `ZoneBasedDispatch`).",
        codeRole: "Selects best elevator car for external hall requests."
      }
    ],
    concurrencyAnalysis: [
      "Synchronized PriorityQueues: PriorityQueues tracking UP (min-heap) and DOWN (max-heap) requests are guarded by synchronized locks to prevent concurrent modification exceptions when passengers press buttons while the car is moving."
    ],
    edgeCases: [
      {
        issue: "Passenger Presses Current Floor Button",
        consequence: "Elevator is already at floor 5 and passenger inside presses 5.",
        resolution: "Ignore request or open doors immediately without adding to request queue."
      }
    ],
    codeExamples: {
      java: `// Java Elevator Car State Machine & LOOK/SCAN Dispatcher
import java.util.PriorityQueue;
import java.util.Collections;

public enum Direction { UP, DOWN, IDLE }

public class ElevatorCar {
    private final int id;
    private int currentFloor = 1;
    private Direction direction = Direction.IDLE;
    private final PriorityQueue<Integer> upRequests = new PriorityQueue<>();
    private final PriorityQueue<Integer> downRequests = new PriorityQueue<>(Collections.reverseOrder());

    public ElevatorCar(int id) { this.id = id; }

    public synchronized void addRequest(int floor) {
        if (floor > currentFloor) {
            upRequests.add(floor);
            if (direction == Direction.IDLE) direction = Direction.UP;
        } else if (floor < currentFloor) {
            downRequests.add(floor);
            if (direction == Direction.IDLE) direction = Direction.DOWN;
        }
    }

    public synchronized void step() {
        if (direction == Direction.UP) {
            if (!upRequests.isEmpty()) {
                currentFloor = upRequests.poll();
            } else if (!downRequests.isEmpty()) {
                direction = Direction.DOWN;
                currentFloor = downRequests.poll();
            } else {
                direction = Direction.IDLE;
            }
        } else if (direction == Direction.DOWN) {
            if (!downRequests.isEmpty()) {
                currentFloor = downRequests.poll();
            } else if (!upRequests.isEmpty()) {
                direction = Direction.UP;
                currentFloor = upRequests.poll();
            } else {
                direction = Direction.IDLE;
            }
        }
    }

    public int getCurrentFloor() { return currentFloor; }
    public Direction getDirection() { return direction; }
}`,
      python: `# Python Elevator State Machine & Controller
import heapq
from enum import Enum

class Direction(Enum):
    UP = "UP"
    DOWN = "DOWN"
    IDLE = "IDLE"

class ElevatorCar:
    def __init__(self, car_id: int):
        self.car_id = car_id
        self.current_floor = 1
        self.direction = Direction.IDLE
        self.up_min_heap = []
        self.down_max_heap = [] # Invert values for max heap

    def add_request(self, floor: int):
        if floor > self.current_floor:
            heapq.heappush(self.up_min_heap, floor)
            if self.direction == Direction.IDLE:
                self.direction = Direction.UP
        elif floor < self.current_floor:
            heapq.heappush(self.down_max_heap, -floor)
            if self.direction == Direction.IDLE:
                self.direction = Direction.DOWN`,
      typescript: `// TypeScript Elevator Controller & LOOK Algorithm
export enum Direction { UP = "UP", DOWN = "DOWN", IDLE = "IDLE" }

export class ElevatorCar {
  public currentFloor = 1;
  public direction = Direction.IDLE;
  private upRequests: number[] = [];
  private downRequests: number[] = [];

  constructor(public readonly id: number) {}

  public addRequest(floor: number): void {
    if (floor > this.currentFloor && !this.upRequests.includes(floor)) {
      this.upRequests.push(floor);
      this.upRequests.sort((a, b) => a - b);
      if (this.direction === Direction.IDLE) this.direction = Direction.UP;
    } else if (floor < this.currentFloor && !this.downRequests.includes(floor)) {
      this.downRequests.push(floor);
      this.downRequests.sort((a, b) => b - a);
      if (this.direction === Direction.IDLE) this.direction = Direction.DOWN;
    }
  }
}`,
      javascript: `// JavaScript Elevator Class
export class ElevatorCar {
  constructor(id) {
    this.id = id;
    this.currentFloor = 1;
    this.direction = "IDLE";
    this.targets = [];
  }

  addFloor(floor) {
    if (!this.targets.includes(floor)) {
      this.targets.push(floor);
      this.targets.sort((a, b) => a - b);
    }
  }
}`
    }
  },

  "lld-10": {
    id: "lld-10",
    title: "LLD: LRU / LFU Thread-Safe Cache Engine (O(1) ops)",
    subtitle: "DoublyLinkedList Nodes, ConcurrentHashMap Index, ReentrantReadWriteLock & Eviction Policy",
    category: "Object-Oriented Design (OOD)",
    difficulty: "Medium",
    designPatterns: ["Strategy Pattern (Eviction: LRU vs LFU vs FIFO)", "Decorator (Thread-Safe Lock Decorator)"],
    oodClasses: [
      {
        name: "CacheNode<K, V>",
        type: "Entity / Node",
        description: "Doubly linked list node storing key-value and frequency.",
        attributes: [
          "key: K",
          "value: V",
          "frequency: int",
          "prev: CacheNode<K, V>",
          "next: CacheNode<K, V>"
        ],
        methods: [
          "+ unlink(): void"
        ]
      },
      {
        name: "LruCache<K, V>",
        type: "Data Structure",
        description: "Thread-safe LRU cache with O(1) get and put time complexity.",
        attributes: [
          "- capacity: int",
          "- map: ConcurrentHashMap<K, CacheNode<K, V>>",
          "- head: CacheNode<K, V>",
          "- tail: CacheNode<K, V>",
          "- lock: ReentrantReadWriteLock"
        ],
        methods: [
          "+ get(key: K): V",
          "+ put(key: K, value: V): void",
          "- moveToHead(node: CacheNode<K, V>): void",
          "- removeTail(): CacheNode<K, V>"
        ]
      }
    ],
    databaseSchema: {
      dbEngine: "In-Memory Data Structure",
      tables: [
        {
          tableName: "N/A (In-Memory DoublyLinkedList)",
          description: "Doubly Linked List + HashMap",
          columns: [
            { name: "head / tail dummy nodes", type: "Pointers", constraints: "O(1) insertion/deletion", desc: "Fast eviction pointers" }
          ],
          indexes: ["HashMap key -> Node pointer for O(1) lookup."]
        }
      ]
    },
    apiEndpoints: [
      {
        method: "GET / POST",
        path: "In-Memory SDK API",
        description: "O(1) cache get and put operations.",
        requestBody: "cache.put('user_100', UserDataObj)",
        responseBody: "UserDataObj",
        statusCodes: "N/A"
      }
    ],
    detailedExplanation: "An LRU Cache uses a HashMap for O(1) key lookups combined with a Doubly-Linked List to track recency. When a key is accessed (`get`), its node is unlinked and moved to the head of the list in O(1) time. When capacity is exceeded, the node at the tail (least recently used) is evicted in O(1) time.",
    designPatternDetails: [
      {
        pattern: "Strategy Pattern",
        whyUsed: "Decouples cache eviction algorithms (`LruEvictionPolicy` vs `LfuEvictionPolicy` vs `FifoEvictionPolicy`).",
        codeRole: "Determines which node gets evicted when capacity is reached."
      },
      {
        pattern: "Decorator Pattern",
        whyUsed: "Wraps non-thread-safe LRU cache with `ReentrantReadWriteLock` synchronization decorator.",
        codeRole: "Provides safe concurrent read/write access."
      }
    ],
    concurrencyAnalysis: [
      "ReentrantReadWriteLock: Allows multiple concurrent reader threads to execute `get()` simultaneously while exclusive write locks are held only during node unlinking/relinking during `put()` or LRU updates.",
      "O(1) Time Complexity: Both `get()` and `put()` operations complete in strictly O(1) time because pointer manipulation on a DoublyLinkedList does not require traversing array elements."
    ],
    edgeCases: [
      {
        issue: "Memory Leak from Stale Keys",
        consequence: "References held in DoublyLinkedList prevent garbage collection.",
        resolution: "Explicitly set `node.prev = null` and `node.next = null` upon node eviction."
      }
    ],
    codeExamples: {
      java: `// Java 17+ Thread-Safe O(1) LRU Cache Implementation
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.locks.ReentrantReadWriteLock;

public class ThreadSafeLruCache<K, V> {
    private class Node {
        K key;
        V value;
        Node prev, next;
        Node(K k, V v) { this.key = k; this.value = v; }
    }

    private final int capacity;
    private final ConcurrentHashMap<K, Node> map = new ConcurrentHashMap<>();
    private final Node head = new Node(null, null);
    private final Node tail = new Node(null, null);
    private final ReentrantReadWriteLock rwLock = new ReentrantReadWriteLock();

    public ThreadSafeLruCache(int capacity) {
        this.capacity = capacity;
        head.next = tail;
        tail.prev = head;
    }

    public V get(K key) {
        rwLock.writeLock().lock();
        try {
            Node node = map.get(key);
            if (node == null) return null;
            moveToHead(node);
            return node.value;
        } finally {
            rwLock.writeLock().unlock();
        }
    }

    public void put(K key, V value) {
        rwLock.writeLock().lock();
        try {
            Node node = map.get(key);
            if (node != null) {
                node.value = value;
                moveToHead(node);
            } else {
                if (map.size() >= capacity) {
                    Node lru = tail.prev;
                    removeNode(lru);
                    map.remove(lru.key);
                }
                Node newNode = new Node(key, value);
                map.put(key, newNode);
                addHead(newNode);
            }
        } finally {
            rwLock.writeLock().unlock();
        }
    }

    private void addHead(Node node) {
        node.next = head.next;
        node.next.prev = node;
        head.next = node;
        node.prev = head;
    }

    private void removeNode(Node node) {
        node.prev.next = node.next;
        node.next.prev = node.prev;
    }

    private void moveToHead(Node node) {
        removeNode(node);
        addHead(node);
    }
}`,
      python: `# Python O(1) LRU Cache using Doubly Linked List + Dict
class Node:
    def __init__(self, key=None, val=None):
        self.key = key
        self.val = val
        self.prev = None
        self.next = None

class LRUCache:
    def __init__(self, capacity: int):
        self.capacity = capacity
        self.cache = {}
        self.head = Node()
        self.tail = Node()
        self.head.next = self.tail
        self.tail.prev = self.head

    def get(self, key: int) -> int:
        if key in self.cache:
            node = self.cache[key]
            self._move_to_head(node)
            return node.val
        return -1

    def put(self, key: int, value: int) -> None:
        if key in self.cache:
            node = self.cache[key]
            node.val = value
            self._move_to_head(node)
        else:
            if len(self.cache) >= self.capacity:
                lru = self.tail.prev
                self._remove(lru)
                del self.cache[lru.key]
            new_node = Node(key, value)
            self.cache[key] = new_node
            self._add_head(new_node)

    def _add_head(self, node):
        node.next = self.head.next
        node.next.prev = node
        self.head.next = node
        node.prev = self.head

    def _remove(self, node):
        node.prev.next = node.next
        node.next.prev = node.prev

    def _move_to_head(self, node):
        self._remove(node)
        self._add_head(node)`,
      typescript: `// TypeScript O(1) LRU Cache
class CacheNode<K, V> {
  public prev: CacheNode<K, V> | null = null;
  public next: CacheNode<K, V> | null = null;
  constructor(public key: K, public val: V) {}
}

export class LruCache<K, V> {
  private map = new Map<K, CacheNode<K, V>>();
  private head: CacheNode<K, V>;
  private tail: CacheNode<K, V>;

  constructor(private capacity: number) {
    this.head = new CacheNode<any, any>(null, null);
    this.tail = new CacheNode<any, any>(null, null);
    this.head.next = this.tail;
    this.tail.prev = this.head;
  }

  public get(key: K): V | null {
    const node = this.map.get(key);
    if (!node) return null;
    this.moveToHead(node);
    return node.val;
  }

  public put(key: K, val: V): void {
    if (this.map.has(key)) {
      const node = this.map.get(key)!;
      node.val = val;
      this.moveToHead(node);
    } else {
      if (this.map.size >= this.capacity) {
        const lru = this.tail.prev!;
        this.removeNode(lru);
        this.map.delete(lru.key);
      }
      const newNode = new CacheNode(key, val);
      this.map.set(key, newNode);
      this.addHead(newNode);
    }
  }

  private addHead(node: CacheNode<K, V>) {
    node.next = this.head.next;
    node.next!.prev = node;
    this.head.next = node;
    node.prev = this.head;
  }

  private removeNode(node: CacheNode<K, V>) {
    node.prev!.next = node.next;
    node.next!.prev = node.prev;
  }

  private moveToHead(node: CacheNode<K, V>) {
    this.removeNode(node);
    this.addHead(node);
  }
}`,
      javascript: `// JavaScript ES6 O(1) LRU Cache
export class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.map = new Map();
  }

  get(key) {
    if (!this.map.has(key)) return -1;
    const val = this.map.get(key);
    this.map.delete(key);
    this.map.set(key, val); // Move to recent (end of Map)
    return val;
  }

  put(key, value) {
    if (this.map.has(key)) {
      this.map.delete(key);
    } else if (this.map.size >= this.capacity) {
      const oldestKey = this.map.keys().next().value;
      this.map.delete(oldestKey);
    }
    this.map.set(key, value);
  }
}`
    }
  }
};
