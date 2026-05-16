"use client";

import { useState } from "react";
import { exportToPDF } from "@/lib/exportPDF";

const TEMPLATES = [
  { id: "modern", label: "Modern" },
  { id: "classic", label: "Classic" },
  { id: "minimal", label: "Minimal" },
];

export default function BuilderHeader({
  resumeData,
  activeTemplate,
  setActiveTemplate,
  mobileView,
  setMobileView,
  onSave,
  saving,
  saveMsg,
  onGetSuggestions,
  suggesting,
}) {
  const [exporting, setExporting] = useState(false);

  const handleExport = async () => {
    setExporting(true);
    try {
      await exportToPDF(
        "resume-preview-root",
        resumeData.personalInfo.fullName || "resume"
      );
    } finally {
      setExporting(false);
    }
  };

  return (
    <header className="h-16 bg-[#0f0f14] border-b border-white/10 flex items-center justify-between px-4 md:px-6 sticky top-0 z-50">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <span className="text-xl font-bold tracking-tight">
          <span className="text-white">rezu</span>
          <span className="text-[#7c6dfa]">mix</span>
        </span>
        <span className="hidden sm:inline text-xs text-white/40 border border-white/10 rounded-full px-2 py-0.5">
          Builder
        </span>
      </div>

      
      <div className="hidden md:flex items-center gap-1 bg-white/5 rounded-lg p-1">
        {TEMPLATES.map((t) => (
          <button
            key={t.id}
            onClick={() => setActiveTemplate(t.id)}
            className={`px-3 py-1.5 text-sm rounded-md transition-all duration-200 ${
              activeTemplate === t.id
                ? "bg-[#7c6dfa] text-white font-medium shadow"
                : "text-white/50 hover:text-white"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Right: Mobile toggle + Export */}
      <div className="flex items-center gap-2">
        {/* Mobile view toggle */}
        <div className="flex md:hidden items-center bg-white/5 rounded-lg p-1">
          <button
            onClick={() => setMobileView("form")}
            className={`px-3 py-1 text-sm rounded-md transition-all ${
              mobileView === "form"
                ? "bg-[#7c6dfa] text-white"
                : "text-white/50"
            }`}
          >
            Form
          </button>
          <button
            onClick={() => setMobileView("preview")}
            className={`px-3 py-1 text-sm rounded-md transition-all ${
              mobileView === "preview"
                ? "bg-[#7c6dfa] text-white"
                : "text-white/50"
            }`}
          >
            Preview
          </button>
        </div>
        {/* Save Message */}
        {saveMsg && (
        <span className="text-xs text-white/60">{saveMsg}</span>
        )}
        {/* AI Suggestions Button */}
        <button
          onClick={onGetSuggestions}
          disabled={suggesting}
          className="flex items-center gap-2 bg-purple-600/20 hover:bg-purple-600/30 border border-purple-500/30 text-purple-300 text-sm font-medium px-4 py-2 rounded-lg transition-all duration-200"
        >
          {suggesting ? "Analyzing..." : "✨ AI Suggestions"}
        </button>

        {/* Save Button */}
        <button
          onClick={onSave}
          disabled={saving}
          className="flex items-center gap-2 bg-white/10 hover:bg-white/20 disabled:opacity-60 text-white text-sm font-medium px-4 py-2 rounded-lg transition-all duration-200"
       >
          {saving ? "Saving..." : "Save Resume"}
        </button>
        {/* Export Button */}
        <button
          onClick={handleExport}
          disabled={exporting}
          className="flex items-center gap-2 bg-[#7c6dfa] hover:bg-[#6a5ce8] disabled:opacity-60 disabled:cursor-not-allowed text-white text-sm font-medium px-4 py-2 rounded-lg transition-all duration-200"
        >
          {exporting ? (
            <>
              <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
              </svg>
              Exporting…
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5 5-5M12 15V3" />
              </svg>
              Export PDF
            </>
          )}
        </button>
      </div>
    </header>
  );
}