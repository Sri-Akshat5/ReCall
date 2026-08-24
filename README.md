# ReCall • Learn Once, Recall When It Matters

<div align="center">

[![React 19](https://img.shields.io/badge/React-19.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)
[![SEO Ready](https://img.shields.io/badge/SEO-JSON--LD%20%26%20Sitemap-success?style=for-the-badge&logo=google)](public/sitemap.xml)

<p align="center">
  <b>The ultimate active recall revision workspace and problem bank for Senior Software Engineers.</b><br/>
  Master Core Java, Spring Boot, System Design, SQL, and Data Structures & Algorithms with 3D flashcards, curated Q&A masterclasses, and topic-grouped problem sets.
</p>

</div>

---

## Table of Contents

- [What is ReCall?](#what-is-recall)
- [How ReCall Helps Candidates](#how-recall-helps-candidates)
- [Key Features](#key-features)
  - [1. Technical Interview Q&A Bank](#1-technical-interview-qa-bank)
  - [2. Active Recall 3D Flashcards (Leitner System)](#2-active-recall-3d-flashcards-leitner-system)
  - [3. DSA Practice & Problem Bank](#3-dsa-practice--problem-bank)
  - [4. Encrypted Local Notes Workspace](#4-encrypted-local-notes-workspace)
  - [5. Interactive Self-Quiz Engine](#5-interactive-self-quiz-engine)
  - [6. Production SEO & Clean Sub-URLs](#6-production-seo--clean-sub-urls)
- [Tech Stack & Architecture](#tech-stack--architecture)
- [Directory Structure](#directory-structure)
- [Quick Start & Setup](#quick-start--setup)
- [SEO & Production Optimization](#seo--production-optimization)
- [Future Enhancements & Roadmap](#future-enhancements--roadmap)
- [License & Author](#license--author)

---

## What is ReCall?

**ReCall** is an open-source, privacy-first developer revision engine engineered to solve **candidate memory degradation**—the common problem where experienced software engineers forget core fundamentals, edge cases, and architectural phrasing prior to high-stakes interviews.

Instead of passively reading static docs or long blogs, ReCall provides a **structured active recall system** paired with curated **interview-ready responses** ("What to say in front of the interviewer") and **DSA problem banks** grouped by technical topic.

---

## How ReCall Helps Candidates

* **Eliminates Blanking Out**: Teaches you exact verbal phrasing (*"What to say"*) for complex topics like `ConcurrentHashMap` bucket locking, `G1GC` regional collection, and `@Transactional` propagation.
* **Locks Knowledge in Long-Term Memory**: Utilizes the **Leitner 5-Box Spaced Repetition** algorithm to revisit weak concepts automatically.
* **Topic-Categorized DSA Prep**: Eliminates context switching by grouping **Top 75, Top 150, Top 250 LeetCode** problems and **Striver's A2Z Sheet** into clean topic accordions (*Arrays, Binary Search, DP, Graphs, Trees*).
* **100% Offline & Private**: All notes, sticky widgets, and flashcard progress are saved in local browser storage without external tracking.
* **Mobile & Desktop Optimized**: Responsive glassmorphism interface with instant Dark/Light mode toggle.

---

## Key Features

### 1. Technical Interview Q&A Bank
* **370+ Curated Engineering Questions**: Covering Core Java, JVM Memory, Multithreading, Spring Boot, Microservices, SQL, and Web Security.
* **Dual-Layer Answers**:
  * **Key One-Line Summary**: Quick summary for rapid scanning.
  * **Technical Interview Response**: Spoken response script formatted for senior developer interviews.
* **Interactive Active Recall Triggers**: Clickable inline technical keywords (*e.g., `ConcurrentHashMap`, `Metaspace`, `JIT`*) open instant definition cards and link directly to Flashcard decks.

### 2. Active Recall 3D Flashcards (Leitner System)
* **3D Flip Motion**: Interactive flip animation revealing core concepts and memory triggers.
* **5-Box Leitner Algorithm**: Mastered cards advance to higher boxes; missed cards return to Box 1 for review.
* **Deck Filters**: Filter by Java Collections, Concurrency, JVM, Spring Boot, or System Design.

### 3. DSA Practice & Problem Bank
* **Curated Problem Sheets**: Top 75 LeetCode, Top 150 LeetCode, Top 250 SDE Bank, and Striver's 16-Step A2Z Sheet.
* **Topic-Based Accordions**: Dynamically split problems into topic sections (*Arrays & Hashing, Two Pointers, Binary Search, Dynamic Programming, Graphs, Trees*).
* **Multi-Filter & Sort Grid**: Filter by Topic, Company (*Amazon, Google, Meta, Microsoft, Flipkart, etc.*), Difficulty (*Easy, Medium, Hard*), or Sort by Difficulty order.
* **Direct LeetCode Links**: One-click deep link to official LeetCode problem pages.

### 4. Encrypted Local Notes Workspace
* **Sticky Notes & Workspace**: Quick floating note widget accessible across any route + full rich markdown notes editor.
* **Category Tags & Search**: Filter notes by tags (*Java, Spring, DSA, System Design, SQL*).
* **Browser Encrypted Storage**: Zero server latency with client-side persistence.

### 5. Interactive Self-Quiz Engine
* **Knowledge Verification**: Practice multiple-choice questions with instant feedback and explanations.

### 6. Production SEO & Clean Sub-URLs
* **Clean Hierarchical URLs**:
  * `/interview/java/collections`
  * `/interview/java/concurrency`
  * `/interview/java/jvm`
  * `/interview/java/spring-boot`
  * `/dsa/top75`, `/dsa/top150`, `/dsa/top250`, `/dsa/a2z`
* **JSON-LD Schemas**: Automated injection of `WebSite`, `Organization`, `FAQPage`, `TechArticle`, and `BreadcrumbList` schemas.
* **Dynamic Canonical Tags & Sitemap**: Auto-managed canonical URL tags and full `public/sitemap.xml` + `public/robots.txt`.

---

## Tech Stack & Architecture

| Layer | Technology |
| :--- | :--- |
| **Framework** | [React 19](https://react.dev/) + [Vite 6](https://vitejs.dev/) |
| **Styling** | [Tailwind CSS v3](https://tailwindcss.com/) (Vanilla CSS Tokens, Dark/Light Mode) |
| **Routing** | [React Router DOM v7](https://reactrouter.com/) |
| **Icons** | [Lucide React](https://lucide.dev/) |
| **SEO & Schemas** | Native Head Manager (`SeoHead.jsx`), Dynamic JSON-LD, XML Sitemap |
| **State & Persistence** | React Hooks (`useMemo`, `useEffect`), `localStorage` |

---

## Directory Structure

```text
ReCall/
├── public/
│   ├── robots.txt              # Crawler permissions
│   ├── sitemap.xml             # XML Sitemap for indexing
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── common/
│   │   │   ├── Breadcrumbs.jsx  # Breadcrumbs with JSON-LD schema
│   │   │   ├── CustomDropdown.jsx
│   │   │   └── SeoHead.jsx      # Canonical URLs & JSON-LD schemas
│   │   ├── dsa/
│   │   │   ├── dsaData.js       # Top 75/150/250 & A2Z Question sets
│   │   │   └── DsaPractice.jsx  # Main DSA UI & topic split view
│   │   ├── java/
│   │   │   ├── javaData.js      # 370+ Java & Engineering Q&A data
│   │   │   ├── javaKeywordsData.js
│   │   │   └── JavaInterview.jsx
│   │   ├── notes/               # Sticky note & notes workspace
│   │   └── Navbar.jsx           # Global sticky/shrinking Navbar
│   ├── pages/
│   │   ├── Landingpage.jsx      # Hero landing page
│   │   ├── Interviewqa.jsx      # Main Q&A container
│   │   ├── Revision.jsx         # 3D Flashcards Leitner view
│   │   ├── Notes.jsx            # Notes workspace
│   │   ├── Dsa.jsx              # DSA Route page
│   │   └── NotFound.jsx         # Custom 404 Catch-all page
│   ├── App.jsx                  # Main routing & state container
│   └── index.css                # Custom CSS design system
└── README.md
```

---

## Quick Start & Setup

### Prerequisites
* **Node.js**: v18.0.0 or higher
* **npm**: v9.0.0 or higher

### Installation Steps

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/Sri-Akshat5/ReCall.git
   cd ReCall
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Start Development Server**:
   ```bash
   npm run dev
   ```
   Open your browser at `http://localhost:5173` to explore ReCall!

4. **Build for Production**:
   ```bash
   npm run build
   ```

---

## SEO & Production Optimization

ReCall is pre-configured for search engines and performance:
* **Canonical Link Tags**: Automatically updated on route changes via `SeoHead.jsx`.
* **Structured Data**: Injects Google-friendly `FAQPage` and `BreadcrumbList` schemas.
* **XML Sitemap**: Accessible at `/sitemap.xml` for immediate submission to **Google Search Console**.

---

## Future Enhancements & Roadmap

- [ ] **AI Voice Mock Interviewer**: Web Audio voice feedback for practicing spoken responses out loud.
- [ ] **Encrypted Cloud Sync**: Multi-device sync using Supabase/Web Crypto API.
- [ ] **LeetCode Submission Tracker**: Sync progress directly with personal LeetCode accounts.
- [ ] **Interactive System Design Canvas**: High-Level Architecture (HLA) and Low-Level Design (LLD) interactive block diagrams.
- [ ] **Code Sandbox Executer**: Embedded JavaScript / Java snippet executor inside question rows.

---

## License & Author

Crafted by **Akshat Srivastava**.

Distributed under the **MIT License**. See `LICENSE` for more information.
