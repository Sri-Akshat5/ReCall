export const DEV_TOPICS = [
    {
        id: "frontend-react",
        title: "Frontend Architecture & Modern React 19",
        category: "Frontend",
        icon: "Layout",
        description: "Master React Server Components, Fiber Reconciliation Engine, Hooks, Concurrent Rendering, and performance optimization patterns.",
        items: [
            {
                id: "rsc-vs-client",
                question: "React Server Components (RSC) vs Client Components: Core Mechanics",
                summary: "RSC executes exclusively on the server at request/build time, outputting JSON payloads to zero JS bundle size, while Client Components handle DOM events and state.",
                details: "RSC allows components to access backend resources (DB, FS) directly without exposing API endpoints or shipping JS to the client. Server components stream HTML & JSON over the wire via React Flight Protocol. Client components ('use client') are hydrated on the browser for interactivity.",
                code: `// Server Component (Default in Next.js App Router)
async function UserProfile({ userId }) {
  const user = await db.users.findUnique({ where: { id: userId } });
  return <div className="p-4 bg-zinc-900 text-white">{user.name}</div>;
}

// Client Component
"use client";
import { useState } from "react";
export function LikeButton() {
  const [likes, setLikes] = useState(0);
  return <button onClick={() => setLikes(l => l + 1)}>Likes: {likes}</button>;
}`,
                tags: ["React 19", "RSC", "Next.js", "Architecture"]
            },
            {
                id: "react-fiber",
                question: "React Fiber Architecture & Concurrent Mode Mechanics",
                summary: "Fiber is a ground-up rewrite of React's core algorithm enabling incremental rendering, work prioritization, and time-slicing.",
                details: "Prior to Fiber, updates were synchronous and stack-based (uncancelable). Fiber represents work units as a linked list of Fiber nodes. It allows React to pause rendering during heavy computational trees to yield to high-priority events like input typing and animations.",
                code: `// Concurrent Rendering with useTransition
import { useState, useTransition } from "react";

function SearchInput({ onSearch }) {
  const [isPending, startTransition] = useTransition();
  const [query, setQuery] = useState("");

  const handleChange = (e) => {
    setQuery(e.target.value); // High priority: update input field immediately
    startTransition(() => {
      onSearch(e.target.value); // Low priority: heavy filtering transition
    });
  };
}`,
                tags: ["React Core", "Fiber", "Performance", "Concurrent"]
            },
            {
                id: "custom-hooks-memo",
                question: "Memoization Pitfalls: useMemo, useCallback & React Compiler",
                summary: "Memoization prevents unnecessary recalculations and re-renders, but over-use adds garbage collection overhead and code complexity.",
                details: "useMemo caches computed values; useCallback caches function references across re-renders. With the React Compiler (React 19), automatic memoization extracts the manual dependencies array requirement, performing auto-memoization at build time.",
                code: `// Manual Memoization vs Auto Optimization
const memoizedValue = useMemo(() => computeHeavyData(data), [data]);
const memoizedCallback = useCallback((id) => handleClick(id), [handleClick]);`,
                tags: ["Hooks", "Optimization", "React 19"]
            }
        ]
    },
    {
        id: "backend-apis",
        title: "Backend Engineering & API Design Patterns",
        category: "Backend",
        icon: "Server",
        description: "RESTful architecture, GraphQL resolvers, WebSockets, gRPC, and Microservices communication strategies.",
        items: [
            {
                id: "rest-idempotency",
                question: "RESTful API Idempotency & HTTP Method Contracts",
                summary: "An operation is idempotent if executing it multiple times produces the exact same server state as a single execution.",
                details: "GET, PUT, DELETE, HEAD, and OPTIONS are idempotent by design. POST is NOT idempotent because repeating a POST creates duplicate entities unless explicitly protected via Idempotency-Keys (e.g. Stripe API idempotency headers).",
                code: `// Idempotent Request Middleware using Redis
async function idempotencyMiddleware(req, res, next) {
  const key = req.headers["x-idempotency-key"];
  if (!key) return next();
  
  const cachedResponse = await redis.get(\`idempotency:\${key}\`);
  if (cachedResponse) {
    return res.status(200).json(JSON.parse(cachedResponse));
  }
  next();
}`,
                tags: ["REST", "API Design", "HTTP", "Idempotency"]
            },
            {
                id: "graphql-n1",
                question: "GraphQL Resolvers & Solving the N+1 Query Problem",
                summary: "The N+1 problem occurs when fetching a list of items and executing individual database queries for each nested child relationship.",
                details: "If you query 100 Posts and their Authors, a naive resolver fires 1 query for Posts + 100 queries for Authors. DataLoader solves this by batching concurrent resolver calls within a single event loop tick into a single SQL \`WHERE id IN (...)\` query.",
                code: `import DataLoader from "dataloader";

// Batch function for loading users by IDs
const userBatchLoader = new DataLoader(async (userIds) => {
  const users = await db.users.findMany({ where: { id: { in: userIds } } });
  return userIds.map(id => users.find(u => u.id === id));
});

// Resolver using DataLoader
const resolvers = {
  Post: {
    author: (post) => userBatchLoader.load(post.authorId)
  }
};`,
                tags: ["GraphQL", "DataLoader", "Node.js", "Performance"]
            },
            {
                id: "websockets-sse",
                question: "WebSockets vs Server-Sent Events (SSE) vs Long Polling",
                summary: "WebSockets provide bi-directional full-duplex TCP communication, while SSE provides lightweight uni-directional server-to-client streaming over HTTP.",
                details: "Use WebSockets for interactive chat apps and multiplayer collaborative tools. Use SSE for live dashboard updates, AI token streaming (ChatGPT response streams), and notification feeds due to built-in HTTP auto-reconnection and HTTP/2 multiplexing support.",
                code: `// Server-Sent Events (SSE) in Express
app.get('/events', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  
  setInterval(() => {
    res.write(\`data: \${JSON.stringify({ timestamp: Date.now() })}\\n\\n\`);
  }, 1000);
});`,
                tags: ["WebSockets", "SSE", "Real-Time", "Networking"]
            }
        ]
    },
    {
        id: "web-security",
        title: "Web Application Security & Authentication",
        category: "Security",
        icon: "Shield",
        description: "JWT vs Session tokens, OAuth2 / OIDC PKCE flows, XSS mitigation, CSRF tokens, and Content Security Policy (CSP).",
        items: [
            {
                id: "jwt-vs-sessions",
                question: "Stateless JWT vs Stateful Database Sessions: Tradeoffs & Revocation",
                summary: "JWTs eliminate server DB session lookups but are difficult to revoke instantly without a Redis blacklist, whereas Sessions offer instant revocation at the cost of DB overhead.",
                details: "Security best practice: Store JWTs in HttpOnly, SameSite=Strict secure cookies rather than LocalStorage to prevent XSS theft. Use short-lived Access Tokens (15m) paired with long-lived Refresh Tokens stored in secure DB.",
                code: `// Secure Cookie Configuration for Auth Tokens
res.cookie('access_token', token, {
  httpOnly: true, // Prevents JS XSS access
  secure: process.env.NODE_ENV === 'production', // Requires HTTPS
  sameSite: 'strict', // Protects against CSRF
  maxAge: 15 * 60 * 1000 // 15 minutes
});`,
                tags: ["Security", "JWT", "OAuth2", "Cookies"]
            },
            {
                id: "cors-xss-csrf",
                question: "Security Triad: CORS, XSS, and CSRF Protection Strategies",
                summary: "CORS controls cross-origin requests; XSS is script injection into client DOM; CSRF tricks victim browsers into executing unwanted actions on authenticated sites.",
                details: "Mitigate XSS: Sanitize inputs, encode outputs, use React auto-escaping, and set strict Content Security Policy headers (CSP). Mitigate CSRF: Use SameSite cookies and Anti-CSRF token headers for mutating POST/PUT requests.",
                code: `// Express Security Middleware (Helmet + CORS)
import helmet from "helmet";
import cors from "cors";

app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "https://trusted-cdn.com"]
    }
  }
}));

app.use(cors({
  origin: "https://recall-prep.vercel.app",
  credentials: true
}));`,
                tags: ["Security", "XSS", "CSRF", "CORS", "Helmet"]
            }
        ]
    },
    {
        id: "databases-devops",
        title: "Databases, Caching & DevOps CI/CD",
        category: "Infrastructure",
        icon: "Database",
        description: "PostgreSQL indexing, Redis caching patterns, Docker containerization, Kubernetes, and Git production workflows.",
        items: [
            {
                id: "sql-indexing",
                question: "Database Indexing Mechanics: B-Tree vs Hash vs GIN Indexes",
                summary: "Indexes speed up read operations by providing fast lookup pointers, at the cost of additional write latency and memory usage.",
                details: "B-Tree indexes support equality and range queries (\`<, <=, =, >=, >\`). Hash indexes only support equality checks (\`=\`). GIN (Generalized Inverted Index) is optimized for array attributes and JSONB text searches in PostgreSQL.",
                code: `-- Creating optimized B-Tree and GIN indexes in PostgreSQL
CREATE INDEX idx_users_email ON users USING btree (email);
CREATE INDEX idx_logs_metadata ON logs USING gin (metadata jsonb_path_ops);

-- Inspecting Query Execution Plan
EXPLAIN ANALYZE SELECT * FROM users WHERE email = 'dev@recall.com';`,
                tags: ["PostgreSQL", "Database", "Indexing", "SQL"]
            },
            {
                id: "docker-multistage",
                question: "Docker Multi-stage Builds & Production Container Hardening",
                summary: "Multi-stage builds reduce image size by compiling code in a build stage and copying artifacts into a minimal runtime image (e.g. Alpine/Distroless).",
                details: "Hardening containers: Never run containers as root user, leverage layer caching by putting package.json installs before source code copies, and use minimal distroless base images to reduce vulnerability surface area.",
                code: `# Multi-stage Dockerfile for Node.js App
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
USER node
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
EXPOSE 3000
CMD ["node", "dist/server.js"]`,
                tags: ["Docker", "DevOps", "Containers", "Security"]
            }
        ]
    }
];
