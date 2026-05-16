"use client";

const emptyCert = { name: "", issuer: "", date: "", url: "" };

export default function CertificationsSection({ data, onChange }) {
  return (
    <div className="space-y-4">
      <h2 className="text-sm font-semibold text-white/70">Certifications</h2>
      {data.length === 0 && (
        <p className="text-sm text-white/30 py-6 text-center border border-dashed border-white/10 rounded-xl">
          No certifications added yet.
        </p>
      )}
      {data.map((entry, i) => (
        <div key={entry.id || i} className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#7c6dfa] uppercase tracking-wider">
              Certification #{i + 1}
            </span>
            <button
              onClick={() => onChange(data.filter((_, j) => j !== i))}
              className="text-white/30 hover:text-red-400 transition-colors text-xs"
            >
              ✕ Remove
            </button>
          </div>
          {[
            { label: "Certificate Name", field: "name", placeholder: "AWS Certified Developer" },
            { label: "Issuing Organization", field: "issuer", placeholder: "Amazon Web Services" },
            { label: "Credential URL", field: "url", placeholder: "https://..." },
          ].map(({ label, field, placeholder }) => (
            <div key={field} className="flex flex-col gap-1">
              <label className="text-xs text-white/40">{label}</label>
              <input
                value={entry[field]}
                placeholder={placeholder}
                onChange={(e) => {
                  const u = [...data];
                  u[i] = { ...entry, [field]: e.target.value };
                  onChange(u);
                }}
                className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-[#7c6dfa] transition-all"
              />
            </div>
          ))}
          <div className="flex flex-col gap-1">
            <label className="text-xs text-white/40">Date Issued</label>
            <input
              type="month"
              value={entry.date}
              onChange={(e) => {
                const u = [...data];
                u[i] = { ...entry, date: e.target.value };
                onChange(u);
              }}
              className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#7c6dfa] transition-all"
            />
          </div>
        </div>
      ))}
      <button
        onClick={() => onChange([...data, { ...emptyCert, id: Date.now() }])}
        className="w-full border border-dashed border-[#7c6dfa]/40 hover:border-[#7c6dfa] text-[#7c6dfa] hover:bg-[#7c6dfa]/5 text-sm py-3 rounded-xl transition-all duration-200"
      >
        + Add Certification
      </button>
    </div>
  );
}