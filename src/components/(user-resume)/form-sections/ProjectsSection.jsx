"use client";

const emptyProject = { title: "", description: "", techStack: "", link: "" };

function ProjectCard({ entry, index, onChange, onRemove }) {
  const update = (field, value) => onChange(index, { ...entry, [field]: value });

  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-[#7c6dfa] uppercase tracking-wider">
          Project #{index + 1}
        </span>
        <button onClick={() => onRemove(index)} className="text-white/30 hover:text-red-400 transition-colors text-xs">
          ✕ Remove
        </button>
      </div>

      {[
        { label: "Project Title", field: "title", placeholder: "Rezumix" },
        { label: "Tech Stack", field: "techStack", placeholder: "Next.js, MongoDB, Gemini API" },
        { label: "Live Link / GitHub", field: "link", placeholder: "https://github.com/..." },
      ].map(({ label, field, placeholder }) => (
        <div key={field} className="flex flex-col gap-1">
          <label className="text-xs text-white/40">{label}</label>
          <input
            value={entry[field]}
            onChange={(e) => update(field, e.target.value)}
            placeholder={placeholder}
            className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-[#7c6dfa] transition-all"
          />
        </div>
      ))}

      <div className="flex flex-col gap-1">
        <label className="text-xs text-white/40">Description</label>
        <textarea
          value={entry.description}
          onChange={(e) => update("description", e.target.value)}
          rows={2}
          placeholder="What does this project do? What problem does it solve?"
          className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-[#7c6dfa] transition-all resize-none"
        />
      </div>
    </div>
  );
}

export default function ProjectsSection({ data, onChange }) {
  return (
    <div className="space-y-4">
      <h2 className="text-sm font-semibold text-white/70">Projects</h2>
      {data.length === 0 && (
        <p className="text-sm text-white/30 py-6 text-center border border-dashed border-white/10 rounded-xl">
          No projects added yet.
        </p>
      )}
      {data.map((entry, i) => (
        <ProjectCard
          key={entry.id || i}
          entry={entry}
          index={i}
          onChange={(idx, val) => {
            const u = [...data];
            u[idx] = val;
            onChange(u);
          }}
          onRemove={(idx) => onChange(data.filter((_, j) => j !== idx))}
        />
      ))}
      <button
        onClick={() => onChange([...data, { ...emptyProject, id: Date.now() }])}
        className="w-full border border-dashed border-[#7c6dfa]/40 hover:border-[#7c6dfa] text-[#7c6dfa] hover:bg-[#7c6dfa]/5 text-sm py-3 rounded-xl transition-all duration-200"
      >
        + Add Project
      </button>
    </div>
  );
}