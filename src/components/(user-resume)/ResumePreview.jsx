"use client";

import ModernTemplate from "@/components/(user-resume)/templates/ModernTemplate";
import ClassicTemplate from "@/components/(user-resume)/templates/ClassicTemplate";
import MinimalTemplate from "@/components/(user-resume)/templates/MinimalTemplate";

export default function ResumePreview({ resumeData, activeTemplate }) {
  const isEmpty =
    !resumeData.personalInfo.fullName &&
    !resumeData.personalInfo.email &&
    resumeData.experience.length === 0 &&
    resumeData.education.length === 0;

  return (
    <div className="p-6 flex flex-col items-center">
      <p className="text-xs text-white/30 mb-4 uppercase tracking-widest">
        Live Preview
      </p>

      {isEmpty ? (
        <div className="w-full max-w-[680px] aspect-[1/1.414] bg-white/5 border border-dashed border-white/10 rounded-2xl flex flex-col items-center justify-center gap-3 text-white/20">
          <svg
            className="w-12 h-12 opacity-30"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          <p className="text-sm">Start filling the form to see your resume</p>
        </div>
      ) : (
        <div
         id="resume-preview-root"
         style={{ width: "680px", maxWidth: "100%" }}
         className="shadow-2xl rounded-lg overflow-hidden"
        >
          {activeTemplate === "modern" && (
            <ModernTemplate data={resumeData} />
          )}
          {activeTemplate === "classic" && (
            <ClassicTemplate data={resumeData} />
          )}
          {activeTemplate === "minimal" && (
            <MinimalTemplate data={resumeData} />
          )}
        </div>
      )}
    </div>
  );
}