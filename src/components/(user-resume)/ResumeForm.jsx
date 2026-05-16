"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import { useSession } from "next-auth/react";
import PersonalInfoSection from "@/components/(user-resume)/form-sections/PersonalInfoSection";
import ExperienceSection from "@/components/(user-resume)/form-sections/ExperienceSection";
import EducationSection from "@/components/(user-resume)/form-sections/EducationSection";
import SkillsSection from "@/components/(user-resume)/form-sections/SkillsSection";
import ProjectsSection from "@/components/(user-resume)/form-sections/ProjectsSection";
import CertificationsSection from "@/components/(user-resume)/form-sections/CertificationsSection";

const SECTIONS = [
  { id: "personal", label: "Personal Info", icon: "👤" },
  { id: "experience", label: "Experience", icon: "💼" },
  { id: "education", label: "Education", icon: "🎓" },
  { id: "skills", label: "Skills", icon: "⚡" },
  { id: "projects", label: "Projects", icon: "🚀" },
  { id: "certifications", label: "Certifications", icon: "🏆" },
];

export default function ResumeForm({ resumeData, updateResumeData }) {
  const [activeSection, setActiveSection] = useState("personal");
  const { data: session } = useSession();

  // Save to localStorage on every change
useEffect(() => {
  localStorage.setItem("resumeBuilderData", JSON.stringify(resumeData));
}, [resumeData]);
 
  const sectionContent = useMemo(() => ({
    personal: (
      <PersonalInfoSection
        data={resumeData.personalInfo}
        onChange={(val) => updateResumeData("personalInfo", val)}
      />
    ),
    experience: (
      <ExperienceSection
        data={resumeData.experience}
        onChange={(val) => updateResumeData("experience", val)}
      />
    ),
    education: (
      <EducationSection
        data={resumeData.education}
        onChange={(val) => updateResumeData("education", val)}
      />
    ),
    skills: (
      <SkillsSection
        data={resumeData.skills}
        onChange={(val) => updateResumeData("skills", val)}
      />
    ),
    projects: (
      <ProjectsSection
        data={resumeData.projects}
        onChange={(val) => updateResumeData("projects", val)}
      />
    ),
    certifications: (
      <CertificationsSection
        data={resumeData.certifications}
        onChange={(val) => updateResumeData("certifications", val)}
      />
    ),
  }), [resumeData, updateResumeData]);

  return (
    <div className="flex flex-col h-full">
      {/* Section Nav */}
      <div className="flex overflow-x-auto border-b border-white/10 bg-[#0f0f14]">
        {SECTIONS.map((s) => (
          <button
            key={s.id}
            onClick={() => setActiveSection(s.id)}
            className={`flex-shrink-0 flex items-center gap-1.5 px-4 py-3 text-sm border-b-2 transition-all duration-200 whitespace-nowrap ${
              activeSection === s.id
                ? "border-[#7c6dfa] text-white font-medium"
                : "border-transparent text-white/40 hover:text-white/70"
            }`}
          >
            <span>{s.icon}</span>
            <span>{s.label}</span>
          </button>
        ))}
      </div>

      {/* Section Content */}
      <div className="flex-1 overflow-y-auto p-6">
        {sectionContent[activeSection]}
      </div>
    </div>
  );
}