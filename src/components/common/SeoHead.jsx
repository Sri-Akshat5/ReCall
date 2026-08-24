import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

export const SeoHead = ({ activeTab = "" }) => {
  const location = useLocation();

  useEffect(() => {
    const baseUrl = "https://recall-prep.vercel.app";
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
      "/revise": {
        title: "Active Recall 3D Flashcards • Leitner Spaced Repetition | ReCall",
        desc: "Interactive 3D active recall flashcards using Leitner spaced repetition to lock software engineering knowledge into long-term memory."
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
      "alternateName": ["ReCall", "ReCall DSA & Java Masterclass"],
      "url": baseUrl,
      "potentialAction": {
        "@type": "SearchAction",
        "target": `${baseUrl}/interview?q={search_term_string}`,
        "query-input": "required name=search_term_string"
      }
    });

    // Organization Schema
    injectJsonLd("jsonld-org", {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "ReCall",
      "url": baseUrl,
      "logo": `${baseUrl}/favicon.ico`,
      "sameAs": [
        "https://github.com/",
        "https://leetcode.com/"
      ]
    });

    // FAQPage Schema for Interview QA
    if (currentPath.startsWith("/interview")) {
      injectJsonLd("jsonld-faq", {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Why does Map interface not extend Collection in Java?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "The Map interface in Java does not extend Collection because Collection operates on single elements (add(E)), whereas Map operates on key-value pairs (put(K,V)). Their method signatures and data structures are incompatible."
            }
          },
          {
            "@type": "Question",
            "name": "How does HashMap work internally in Java 8+?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Java 8 HashMap uses an array of Node buckets. Hash collisions are resolved via linked lists. When a bucket exceeds TREEIFY_THRESHOLD (8 items) and array capacity is at least 64, the linked list transforms into a Red-Black Tree for O(log N) lookup."
            }
          }
        ]
      });
    }

  }, [location.pathname, activeTab]);

  return null;
};

export default SeoHead;
