import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

export const SeoHead = ({ activeTab = "" }) => {
  const location = useLocation();

  useEffect(() => {
    const baseUrl = "https://recall-iota-two.vercel.app";
    const currentPath = location.pathname;
    const fullCanonicalUrl = `${baseUrl}${currentPath === "/" ? "" : currentPath}`;

    // 1. Update Dynamic Title & Description Map
    const seoMap = {
      "/": {
        title: "ReCall • Learn Once, Recall When It Matters | Technical Interview Prep",
        desc: "Master Core Java, React 19, System Design, SQL, and Web Security with active recall flashcards, curated technical Q&A banks, and encrypted local notes."
      },
      "/interview": {
        title: "Java & Core Software Engineering Q&A Bank | ReCall Masterclass",
        desc: "Explore 370+ curated technical interview questions and responses for Core Java, JVM Internals, Multithreading, Spring Boot, SQL, and System Design."
      },
      "/interview/java": {
        title: "Core Java & JVM Engineering Interview Q&A Bank | ReCall",
        desc: "Curated Java interview Q&A with one-line summaries and senior engineering spoken responses formatted for senior developer interviews."
      },
      "/interview/java/collections": {
        title: "Java Collections Framework Interview Questions & Architecture | ReCall",
        desc: "Master Java Collections Framework: List, Set, Map, Queue, ConcurrentHashMap, HashMap hashing, and Fail-Fast vs Fail-Safe iterators."
      },
      "/interview/java/concurrency": {
        title: "Java Concurrency, Multithreading & Memory Model Q&A | ReCall",
        desc: "Deep dive into Java Concurrency: ExecutorService, CompletableFuture, ReentrantLock, volatile, atomic classes, and Thread Safety."
      },
      "/interview/java/jvm": {
        title: "JVM Memory Model & Garbage Collection Mechanics | ReCall",
        desc: "Understand Heap vs Metaspace, GC algorithms (G1GC, ZGC), JIT Compilation, ClassLoader hierarchy, and Memory Leak debugging."
      },
      "/interview/java/spring-boot": {
        title: "Spring Boot, Dependency Injection & REST API Architecture | ReCall",
        desc: "Spring Boot interview questions: IoC Container, Bean Scopes, @Transactional propagation, Spring Security, and Microservices patterns."
      },
      "/dsa": {
        title: "DSA Interview Practice Hub • Top 75, 150, 250 & Striver's A2Z Sheet | ReCall",
        desc: "Practice Top 75, 150, 250 LeetCode interview questions and Striver's A2Z DSA sheet with topic splitting, company tags, and difficulty filters."
      },
      "/dsa/top75": {
        title: "Top 75 LeetCode Interview Questions | Akshat's SDE Practice Bank | ReCall",
        desc: "Curated 75 high-frequency LeetCode interview problems categorized by topic with company tags and direct problem links."
      },
      "/dsa/top150": {
        title: "Top 150 LeetCode Interview Problems | SDE Mastery Bank | ReCall",
        desc: "Complete 150 LeetCode SDE problem set covering Arrays, Binary Search, Trees, Graphs, DP, and System Design."
      },
      "/dsa/top250": {
        title: "Top 250 Master DSA Questions | Senior SDE Interview Prep | ReCall",
        desc: "250 top Data Structures and Algorithms interview questions for software engineering interviews at FAANG and top tech companies."
      },
      "/dsa/a2z": {
        title: "Striver's A2Z DSA Sheet • 16-Step Curriculum | ReCall",
        desc: "Step-by-step 16 module DSA curriculum from basics to advanced Graphs, Dynamic Programming, and Tries."
      },
      "/system-design": {
        title: "System Design Masterclass • HLD, LLD & Distributed Systems | ReCall",
        desc: "Master High-Level Design (HLD), Low-Level Design (LLD), Microservices, Load Balancers, and Distributed Databases for Senior SDE interviews."
      },
      "/system-design/hld-1": {
        title: "Design TinyURL (URL Shortener) • High-Level System Architecture | ReCall",
        desc: "Architecting a high-throughput URL Shortener processing 50 Billion redirects/day with Base62 encoding, Key Generation Service (KGS), Redis LRU cache, and Cassandra NoSQL."
      },
      "/system-design/hld-2": {
        title: "Design an API Rate Limiter • Token Bucket & Redis Lua Scripting | ReCall",
        desc: "High-level design for a distributed API Rate Limiter using Token Bucket, Sliding Window Log, and atomic Redis Lua scripts to process 25k req/sec with sub-millisecond overhead."
      },
      "/system-design/hld-3": {
        title: "Design WhatsApp / Telegram Chat App • WebSockets & Cassandra HLD | ReCall",
        desc: "Architecting a real-time messaging app with WebSockets, Cassandra message store, Redis user presence heartbeats, and End-to-End Encryption (E2EE) at 500M DAU scale."
      },
      "/system-design/hld-4": {
        title: "Design YouTube / Netflix • Video Transcoding, HLS & CDN Architecture | ReCall",
        desc: "Scaling video streaming platforms for 1B viewers with HLS Adaptive Bitrate Streaming, Kafka transcoding pipelines, S3 object storage, and Cloudflare CDN caching."
      },
      "/system-design/hld-5": {
        title: "Design Uber / Lyft • Uber H3 Hexagonal Grid & Geospatial Indexing | ReCall",
        desc: "Real-time ride-matching and driver tracking system design using Uber H3 hexagonal spatial indexing, Redis GEOADD, and Ring Buffer dispatch engines."
      },
      "/system-design/hld-6": {
        title: "Design Distributed Web Crawler • Bloom Filters & Politeness Queues | ReCall",
        desc: "Building a scalable Web Crawler processing 1B pages/month with Bloom Filter link deduplication, DNS local caching, and per-host politeness rate-limiting."
      },
      "/system-design/hld-7": {
        title: "Design Twitter / Instagram News Feed • Hybrid Push/Pull Fan-out HLD | ReCall",
        desc: "Social media timeline generation engine using Hybrid Push/Pull Fan-out, pre-computed Redis Sorted Sets, and Neo4j social graph follower lookup."
      },
      "/system-design/lld-1": {
        title: "LLD: TinyURL Key Generation & Storage Engine • Low-Level Design | ReCall",
        desc: "Low-Level Design for TinyURL with OOD class diagrams, PostgreSQL ER schema, Base62 encoder strategy, and REST API contracts."
      },
      "/system-design/lld-2": {
        title: "LLD: Distributed API Rate Limiter Engine • Low-Level Design | ReCall",
        desc: "Low-Level Design for Rate Limiter with Token Bucket classes, Redis Lua script execution, and middleware interceptor specs."
      },
      "/system-design/lld-3": {
        title: "LLD: WhatsApp WebSocket Chat Engine • Low-Level Design | ReCall",
        desc: "Low-Level Design for WhatsApp Chat with WebSocket session manager, Protobuf packet parser, Cassandra message table, and Redis presence heartbeats."
      },
      "/system-design/lld-4": {
        title: "LLD: Video Transcoding & HLS Playlist Engine • Low-Level Design | ReCall",
        desc: "Low-Level Design for Video Transcoding pipeline with FFmpeg worker tasks, HLS .m3u8 builder, and S3 upload contracts."
      },
      "/system-design/lld-5": {
        title: "LLD: Uber Geospatial H3 Index & Driver Matcher • Low-Level Design | ReCall",
        desc: "Low-Level Design for Uber driver matching with Hexagonal H3 spatial index, driver state machine, and dispatch strategy pattern."
      },
      "/system-design/lld-6": {
        title: "LLD: Web Crawler URL Frontier & HTML Parser • Low-Level Design | ReCall",
        desc: "Low-Level Design for Web Crawler with politeness queue manager, Bloom filter deduplicator, and Cassandra HTML storage."
      },
      "/system-design/lld-7": {
        title: "LLD: Social News Feed Fan-out Engine • Low-Level Design | ReCall",
        desc: "Low-Level Design for News Feed timeline generation with Hybrid fan-out strategy, Redis ZSET cache, and celebrity pull aggregator."
      },
      "/system-design/lld-8": {
        title: "LLD: Parking Lot Management System (OOD Classic) • Low-Level Design | ReCall",
        desc: "Classic Object-Oriented Design for Parking Lot with Vehicle hierarchy, Spot allocation strategy, and MySQL billing ER schema."
      },
      "/system-design/lld-9": {
        title: "LLD: Elevator Control System (OOD Classic) • Low-Level Design | ReCall",
        desc: "Object-Oriented Design for Elevator Control System with LOOK/SCAN scheduling algorithm, ElevatorCar state machine, and multi-car dispatcher."
      },
      "/system-design/lld-10": {
        title: "LLD: LRU / LFU Thread-Safe Cache Engine • Low-Level Design | ReCall",
        desc: "High-performance O(1) thread-safe LRU/LFU cache design using DoublyLinkedList pointers, ConcurrentHashMap, and ReentrantReadWriteLock."
      },
      "/revise": {
        title: "Active Recall 3D Flashcards • Leitner Spaced Repetition | ReCall",
        desc: "Interactive 3D active recall flashcards using Leitner spaced repetition to lock software engineering knowledge into long-term memory."
      },
      "/development": {
        title: "Full-Stack Development & Engineering Hub | ReCall",
        desc: "Master Full-Stack Software Development: React 19, RSC, Node.js, Spring Boot, Databases, REST/GraphQL APIs, DevOps, Docker, and Web Security."
      },
      "/notes": {
        title: "My Notes Workspace • Encrypted Local Study Notes | ReCall",
        desc: "Create and organize custom technical study notes with offline privacy-first local browser storage."
      },
      "/quiz": {
        title: "Self Quiz Module • Software Engineering Technical Test | ReCall",
        desc: "Test your software engineering knowledge with interactive self-quizzes across Java, React, SQL, and System Design."
      }
    };

    const currentSeo = seoMap[currentPath] || {
      title: `ReCall • ${activeTab.toUpperCase() || "Mastery"} Module`,
      desc: "ReCall - Active revision, DSA practice, and technical interview prep for software engineers."
    };

    // Update document title
    document.title = currentSeo.title;

    // Update Meta Description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement("meta");
      metaDesc.name = "description";
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute("content", currentSeo.desc);

    // 2. Dynamic Canonical URL Tag Injection
    let canonicalTag = document.querySelector('link[rel="canonical"]');
    if (!canonicalTag) {
      canonicalTag = document.createElement("link");
      canonicalTag.rel = "canonical";
      document.head.appendChild(canonicalTag);
    }
    canonicalTag.setAttribute("href", fullCanonicalUrl);

    // 3. Inject Structured Data JSON-LD Schemas
    const injectJsonLd = (id, data) => {
      let script = document.getElementById(id);
      if (!script) {
        script = document.createElement("script");
        script.id = id;
        script.type = "application/ld+json";
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(data);
    };

    // WebSite Schema with Sitelinks SearchBox
    injectJsonLd("jsonld-website", {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "ReCall Technical Interview Prep",
      "alternateName": ["ReCall", "ReCall System Design & Architecture Hub"],
      "url": baseUrl,
      "potentialAction": {
        "@type": "SearchAction",
        "target": `${baseUrl}/system-design?q={search_term_string}`,
        "query-input": "required name=search_term_string"
      }
    });

    // TechArticle Schema for System Design HLD Pages
    if (currentPath.startsWith("/system-design/hld-")) {
      injectJsonLd("jsonld-article", {
        "@context": "https://schema.org",
        "@type": "TechArticle",
        "headline": currentSeo.title,
        "description": currentSeo.desc,
        "mainEntityOfPage": fullCanonicalUrl,
        "author": {
          "@type": "Organization",
          "name": "ReCall System Design Engineering Team"
        },
        "publisher": {
          "@type": "Organization",
          "name": "ReCall",
          "logo": {
            "@type": "ImageObject",
            "url": `${baseUrl}/favicon.ico`
          }
        }
      });
    }

  }, [location.pathname, activeTab]);

  return null;
};

export default SeoHead;
