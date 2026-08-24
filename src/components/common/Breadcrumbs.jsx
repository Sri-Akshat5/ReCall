import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";

export const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  // Friendly segment names
  const segmentLabels = {
    interview: "Interview Q&A",
    java: "Core Java",
    collections: "Collections Framework",
    concurrency: "Concurrency & Multithreading",
    jvm: "JVM Memory & GC",
    "spring-boot": "Spring Boot Framework",
    dsa: "DSA Practice",
    top75: "Top 75 LeetCode",
    top150: "Top 150 LeetCode",
    top250: "Top 250 SDE Bank",
    a2z: "Striver's A2Z Sheet",
    revise: "Revision Flashcards",
    notes: "My Notes",
    quiz: "Self Quiz"
  };

  const breadcrumbItems = pathnames.map((value, index) => {
    const to = `/${pathnames.slice(0, index + 1).join("/")}`;
    const label = segmentLabels[value] || value.replace(/-/g, " ");
    const isLast = index === pathnames.length - 1;

    return { label, to, isLast };
  });

  // Inject BreadcrumbList JSON-LD Schema
  useEffect(() => {
    const schema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://recall-prep.vercel.app/"
        },
        ...breadcrumbItems.map((item, idx) => ({
          "@type": "ListItem",
          "position": idx + 2,
          "name": item.label,
          "item": `https://recall-prep.vercel.app${item.to}`
        }))
      ]
    };

    let script = document.getElementById("jsonld-breadcrumbs");
    if (!script) {
      script = document.createElement("script");
      script.id = "jsonld-breadcrumbs";
      script.type = "application/ld+json";
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(schema);
  }, [location.pathname]);

  if (pathnames.length === 0) return null;

  return (
    <nav aria-label="Breadcrumb" className="mb-4">
      <ol className="flex items-center gap-1.5 text-xs font-mono text-slate-500 dark:text-zinc-400 flex-wrap">
        <li>
          <Link
            to="/"
            className="flex items-center gap-1 hover:text-slate-900 dark:hover:text-white transition"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Home</span>
          </Link>
        </li>

        {breadcrumbItems.map((item, index) => (
          <li key={index} className="flex items-center gap-1.5">
            <ChevronRight className="w-3.5 h-3.5 text-slate-300 dark:text-zinc-700" />
            {item.isLast ? (
              <span className="font-bold text-slate-900 dark:text-white capitalize">
                {item.label}
              </span>
            ) : (
              <Link
                to={item.to}
                className="hover:text-slate-900 dark:hover:text-white transition capitalize"
              >
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
