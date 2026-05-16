"use client";

function Field({ label, name, value, onChange, type = "text", placeholder = "" }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-medium text-white/50 uppercase tracking-wide">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(name, e.target.value)}
        placeholder={placeholder}
        className="bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-[#7c6dfa] focus:ring-1 focus:ring-[#7c6dfa]/30 transition-all"
      />
    </div>
  );
}

export default function PersonalInfoSection({ data, onChange }) {
  const handleChange = (field, value) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div className="space-y-4">
      <h2 className="text-sm font-semibold text-white/70 mb-4">
        Personal Information
      </h2>

      <Field
        label="Full Name"
        name="fullName"
        value={data.fullName}
        onChange={handleChange}
        placeholder="John Doe"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field
          label="Email"
          name="email"
          value={data.email}
          onChange={handleChange}
          type="email"
          placeholder="john@example.com"
        />
        <Field
          label="Phone"
          name="phone"
          value={data.phone}
          onChange={handleChange}
          placeholder="+1 (555) 000-0000"
        />
      </div>
      <Field
        label="Location"
        name="location"
        value={data.location}
        onChange={handleChange}
        placeholder="City, State, Country"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field
          label="LinkedIn URL"
          name="linkedin"
          value={data.linkedin}
          onChange={handleChange}
          placeholder="linkedin.com/in/johndoe"
        />
        <Field
          label="Portfolio / GitHub"
          name="portfolio"
          value={data.portfolio}
          onChange={handleChange}
          placeholder="github.com/johndoe"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-medium text-white/50 uppercase tracking-wide">
          Professional Summary
        </label>
        <textarea
          value={data.summary}
          onChange={(e) => handleChange("summary", e.target.value)}
          rows={4}
          placeholder="A brief 2-3 sentence summary highlighting your key skills and goals..."
          className="bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-[#7c6dfa] focus:ring-1 focus:ring-[#7c6dfa]/30 transition-all resize-none"
        />
      </div>
    </div>
  );
}