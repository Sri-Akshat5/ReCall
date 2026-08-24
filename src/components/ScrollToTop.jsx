import React, { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

export const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility, { passive: true });
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button
        type="button"
        onClick={scrollToTop}
        aria-label="Scroll to top of page"
        className={`group p-3 sm:p-3.5 rounded-2xl transition-all duration-300 flex items-center justify-center cursor-pointer border backdrop-blur-md active:scale-95 ${
          isVisible
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 translate-y-4 pointer-events-none"
        } bg-slate-900/90 text-white border-slate-700 hover:bg-slate-900 hover:border-slate-500 hover:scale-110 hover:-translate-y-1 dark:bg-white/90 dark:text-black dark:border-zinc-300 dark:hover:bg-white dark:hover:border-white`}
      >
        <ArrowUp className="w-5 h-5 transition-transform duration-200 group-hover:-translate-y-0.5" />
      </button>
    </div>
  );
};

export default ScrollToTop;
