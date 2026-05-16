"use client";

const emptyEntry = {
  company: "",
  role: "",
  startDate: "",
  endDate: "",
  current: false,
  description: "",
};

function ExperienceCard({ entry, index, onChange, onRemove }) {
  const update = (field, value) => {
    onChange(index, { ...entry, [field]: value });
  };

  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-[#7c6dfa] uppercase tracking-wider">
          Experience #{index + 1}
        </span>
        <button
          onClick={() => onRemove(index)}
          className="text-white/30 hover:text-red-400 transition-colors text-xs"
        >
          ✕ Remove
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {[
          { label: "Company", field: "company", placeholder: "Google" },
          { label: "Role / Title", field: "role", placeholder: "Software Engineer" },
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
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col gap-1">
          <label className="text-xs text-white/40">Start Date</label>
          <input
            type="month"
            value={entry.startDate}
            onChange={(e) => update("startDate", e.target.value)}
            className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#7c6dfa] transition-all"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs text-white/40">End Date</label>
          <input
            type="month"
            value={entry.endDate}
            disabled={entry.current}
            onChange={(e) => update("endDate", e.target.value)}
            className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#7c6dfa] transition-all disabled:opacity-40"
          />
        </div>
      </div>

      <label className="flex items-center gap-2 text-sm text-white/60 cursor-pointer">
        <input
          type="checkbox"
          checked={entry.current}
          onChange={(e) => update("current", e.target.checked)}
          className="accent-[#7c6dfa]"
        />
        Currently working here
      </label>

      <div className="flex flex-col gap-1">
        <label className="text-xs text-white/40">Description / Achievements</label>
        <textarea
          value={entry.description}
          onChange={(e) => update("description", e.target.value)}
          rows={3}
          placeholder="• Led development of X feature, improving Y by Z%..."
          className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-[#7c6dfa] transition-all resize-none"
        />
      </div>
    </div>
  );
}

export default function ExperienceSection({ data, onChange }) {
  const handleChange = (index, updated) => {
    const newData = [...data];
    newData[index] = updated;
    onChange(newData);
  };

  const handleRemove = (index) => {
    onChange(data.filter((_, i) => i !== index));
  };

  const handleAdd = () => {
    onChange([...data, { ...emptyEntry, id: Date.now() }]);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-sm font-semibold text-white/70">Work Experience</h2>
      {data.length === 0 && (
        <p className="text-sm text-white/30 py-6 text-center border border-dashed border-white/10 rounded-xl">
          No experience added yet. Click below to add your first role.
        </p>
      )}
      {data.map((entry, i) => (
        <ExperienceCard
          key={entry.id || i}
          entry={entry}
          index={i}
          onChange={handleChange}
          onRemove={handleRemove}
        />
      ))}
      <button
        onClick={handleAdd}
        className="w-full border border-dashed border-[#7c6dfa]/40 hover:border-[#7c6dfa] text-[#7c6dfa] hover:bg-[#7c6dfa]/5 text-sm py-3 rounded-xl transition-all duration-200"
      >
        + Add Experience
      </button>
    </div>
  );
}