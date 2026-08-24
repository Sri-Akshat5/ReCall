import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Landingpage from "./pages/Landingpage";
import Interviewqa from "./pages/Interviewqa";
import Revision from "./pages/Revision";
import Notes from "./pages/Notes";
import Dsa from "./pages/Dsa";
import SystemDesign from "./pages/SystemDesign";
import NotFound from "./pages/NotFound";
import SeoHead from "./components/common/SeoHead";
import Breadcrumbs from "./components/common/Breadcrumbs";
import ScrollToTop from "./components/ScrollToTop";
import QuickStickyNote from "./components/notes/QuickStickyNote";

export function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const [searchTerm, setSearchTerm] = useState("");
  const [targetRecallKey, setTargetRecallKey] = useState(null);
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("recall_theme") || "dark";
  });

  // Derived active tab from route path
  const currentPath = location.pathname;
  const activeTab = currentPath === "/" ? "landing" : currentPath.substring(1).split("/")[0];

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    localStorage.setItem("recall_theme", nextTheme);
  };

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme]);

  const handleSelectRecallCard = (key) => {
    setTargetRecallKey(key);
    navigate("/revise");
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-black dark:text-zinc-100 flex flex-col font-sans selection:bg-zinc-300 dark:selection:bg-zinc-700 transition-colors duration-200">
      {/* Dynamic SEO Meta, Canonical URL & JSON-LD Schemas */}
      <SeoHead activeTab={activeTab} />

      {/* Fixed Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={(tab) => navigate(tab === "landing" ? "/" : `/${tab}`)}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        theme={theme}
        toggleTheme={toggleTheme}
      />

      {/* Main Body Routing */}
      <main className="flex-1">
        <Routes>
          <Route
            path="/"
            element={<Landingpage onNavigate={(tab) => navigate(tab === "landing" ? "/" : `/${tab}`)} />}
          />

          <Route
            path="/dsa"
            element={<Dsa globalSearchTerm={searchTerm} setGlobalSearchTerm={setSearchTerm} />}
          />

          <Route
            path="/dsa/*"
            element={<Dsa globalSearchTerm={searchTerm} setGlobalSearchTerm={setSearchTerm} />}
          />

          <Route
            path="/interview"
            element={
              <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
                <Breadcrumbs />
                <Interviewqa onSelectRecallCard={handleSelectRecallCard} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
              </div>
            }
          />

          <Route
            path="/interview/*"
            element={
              <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
                <Breadcrumbs />
                <Interviewqa onSelectRecallCard={handleSelectRecallCard} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
              </div>
            }
          />

          <Route
            path="/system-design"
            element={<SystemDesign />}
          />

          <Route
            path="/system-design/*"
            element={<SystemDesign />}
          />

          <Route
            path="/revise"
            element={
              <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-3 sm:py-5">
                <Breadcrumbs />
                <Revision
                  targetRecallKey={targetRecallKey}
                  onClearTargetKey={() => setTargetRecallKey(null)}
                  onNavigateToInterview={() => navigate("/interview")}
                  searchTerm={searchTerm}
                  setSearchTerm={setSearchTerm}
                />
              </div>
            }
          />

          <Route
            path="/notes"
            element={
              <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-3 sm:py-5">
                <Breadcrumbs />
                <Notes onNavigateToTab={(tab) => navigate(tab === "landing" ? "/" : `/${tab}`)} globalSearchTerm={searchTerm} />
              </div>
            }
          />

          <Route
            path="*"
            element={<NotFound />}
          />
        </Routes>
      </main>

      {/* Global Scroll To Top Button */}
      <ScrollToTop />

      {/* Floating Quick Sticky Note Widget */}
      <QuickStickyNote
        activeTab={activeTab}
        onNavigateToNotes={() => navigate("/notes")}
      />
    </div>
  );
}

export default App;
