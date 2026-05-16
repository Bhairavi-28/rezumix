"use client";

const emptyEntry = {
  institution: "",
  degree: "",
  field: "",
  startDate: "",
  endDate: "",
  gpa: "",
};

function EducationCard({ entry, index, onChange, onRemove }) {
  const update = (field, value) => onChange(index, { ...entry, [field]: value });

  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-[#7c6dfa] uppercase tracking-wider">
          Education #{index + 1}
        </span>
        <button onClick={() => onRemove(index)} className="text-white/30 hover:text-red-400 transition-colors text-xs">
          ✕ Remove
        </button>
      </div>

      {[
        { label: "Institution", field: "institution", placeholder: "MIT" },
        { label: "Degree", field: "degree", placeholder: "Bachelor of Science" },
        { label: "Field of Study", field: "field", placeholder: "Computer Science" },
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

      <div className="grid grid-cols-3 gap-3">
        <div className="flex flex-col gap-1">
          <label className="text-xs text-white/40">Start</label>
          <input type="month" value={entry.startDate}
            onChange={(e) => update("startDate", e.target.value)}
            className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#7c6dfa] transition-all" />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs text-white/40">End</label>
          <input type="month" value={entry.endDate}
            onChange={(e) => update("endDate", e.target.value)}
            className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#7c6dfa] transition-all" />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs text-white/40">GPA</label>
          <input value={entry.gpa} onChange={(e) => update("gpa", e.target.value)}
            placeholder="3.8"
            className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-[#7c6dfa] transition-all" />
        </div>
      </div>
    </div>
  );
}

export default function EducationSection({ data, onChange }) {
  return (
    <div className="space-y-4">
      <h2 className="text-sm font-semibold text-white/70">Education</h2>
      {data.length === 0 && (
        <p className="text-sm text-white/30 py-6 text-center border border-dashed border-white/10 rounded-xl">
          No education added yet.
        </p>
      )}
      {data.map((entry, i) => (
        <EducationCard
          key={entry.id || i}
          entry={entry}
          index={i}
          onChange={(idx, val) => {
            const updated = [...data];
            updated[idx] = val;
            onChange(updated);
          }}
          onRemove={(idx) => onChange(data.filter((_, j) => j !== idx))}
        />
      ))}
      <button
        onClick={() => onChange([...data, { ...emptyEntry, id: Date.now() }])}
        className="w-full border border-dashed border-[#7c6dfa]/40 hover:border-[#7c6dfa] text-[#7c6dfa] hover:bg-[#7c6dfa]/5 text-sm py-3 rounded-xl transition-all duration-200"
      >
        + Add Education
      </button>
    </div>
  );
}