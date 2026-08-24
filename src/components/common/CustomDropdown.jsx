import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, Check, Search } from "lucide-react";

export const CustomDropdown = ({
  options = [],
  value,
  onChange,
  placeholder = "Select Option",
  icon: Icon
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filterText, setFilterText] = useState("");
  const dropdownRef = useRef(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredOptions = options.filter((opt) => {
    const label = typeof opt === "string" ? opt : opt.label || opt.value;
    return label.toLowerCase().includes(filterText.toLowerCase());
  });

  const selectedLabel = (() => {
    if (!value) return placeholder;
    const found = options.find((opt) => (typeof opt === "string" ? opt === value : opt.value === value));
    if (!found) return value;
    return typeof found === "string" ? found : found.label || found.value;
  })();

  return (
    <div className="relative w-full" ref={dropdownRef}>
      {/* Dropdown Toggle Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between gap-2 bg-white border border-slate-300 text-xs text-slate-900 dark:bg-black dark:border-zinc-800 dark:text-white px-3.5 py-3 rounded-xl focus:outline-none focus:border-slate-500 dark:focus:border-zinc-500 transition cursor-pointer font-medium"
      >
        <div className="flex items-center gap-2 truncate">
          {Icon && <Icon className="w-3.5 h-3.5 text-slate-400 dark:text-zinc-500 flex-shrink-0" />}
          <span className="truncate">{selectedLabel}</span>
        </div>
        <ChevronDown className={`w-4 h-4 text-slate-400 dark:text-zinc-500 transition-transform duration-200 flex-shrink-0 ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {/* Options Scrollable Menu Popover (Shows max ~5 items visible, scroll all) */}
      {isOpen && (
        <div className="absolute left-0 right-0 top-full mt-1.5 z-50 rounded-2xl bg-white border border-slate-300 dark:bg-zinc-950 dark:border-zinc-800 shadow-2xl p-1.5 space-y-1 animate-in fade-in slide-in-from-top-1 duration-150">
          
          {/* Quick Filter Search if options count > 5 */}
          {options.length > 5 && (
            <div className="relative p-1">
              <Search className="w-3 h-3 text-slate-400 dark:text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Filter options..."
                value={filterText}
                onChange={(e) => setFilterText(e.target.value)}
                onClick={(e) => e.stopPropagation()}
                className="w-full pl-7 pr-3 py-1.5 text-[11px] rounded-lg bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 dark:bg-zinc-900 dark:border-zinc-800 dark:text-white focus:outline-none focus:border-slate-400 dark:focus:border-zinc-600"
              />
            </div>
          )}

          {/* Scrollable List Container (max-h-52 fits ~5 items comfortably) */}
          <div className="max-h-52 overflow-y-auto space-y-0.5 pr-1 scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-zinc-800">
            {filteredOptions.length === 0 ? (
              <div className="p-3 text-center text-xs text-slate-400 dark:text-zinc-500">
                No matching options
              </div>
            ) : (
              filteredOptions.map((opt, idx) => {
                const optValue = typeof opt === "string" ? opt : opt.value;
                const optLabel = typeof opt === "string" ? opt : opt.label || opt.value;
                const isSelected = value === optValue;

                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      onChange(optValue);
                      setIsOpen(false);
                      setFilterText("");
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 text-xs rounded-xl text-left transition cursor-pointer ${
                      isSelected
                        ? "bg-slate-900 text-white dark:bg-white dark:text-black font-bold"
                        : "text-slate-700 hover:bg-slate-100 dark:text-zinc-300 dark:hover:bg-zinc-900"
                    }`}
                  >
                    <span className="truncate">{optLabel}</span>
                    {isSelected && <Check className="w-3.5 h-3.5 flex-shrink-0" />}
                  </button>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomDropdown;
